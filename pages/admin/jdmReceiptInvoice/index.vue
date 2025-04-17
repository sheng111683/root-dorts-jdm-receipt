<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'

import { ReceiptInvoiceType, ReceiptPrintModel, ReceiptPrintReason, ReceiptPrintType } from '~/enums'
import {
  getDefaultPageList,
  getDefulatJDMReceiptInvoiceCriteria,

} from '~/models'

const { $api } = useNuxtApp()

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  QueryType: '帳務日',
  Daterange: '',
  S_DATE: '',
  E_DATE: '',
  pageNumber: 1,
  pageSize: 20,
})
const queryResult = reactive(getDefaultPageList<any>())
// function handleCurrentChange(val) {
// search(val)
// }
async function search() {
  criteria.S_DATE = formatDates(criteria.S_DATE)
  criteria.E_DATE = formatDates(criteria.E_DATE)

  const jdmReceiptInvoiceResponse = await $api.v1.JdmReceiptInvoice.Get(criteria)
  Object.assign(queryResult, jdmReceiptInvoiceResponse)
  // queryResult.items = queryResult.items.map((item) => {
  //   for (const key in item) {
  //     if (item[key] && key !== 'rentAmt' && key !== 'salesType' && key !== 'invoiceStatus' && key !== 'invoiceWorkType' && key !== 'tsId' && key !== 'receipttsId' && isValidDate(item[key])) {
  //       item[key] = dateFormat(item[key])
  //     }
  //   }
  //   return item
  // })
}
function dateFormat(dateString) {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return null
  }
  return date.toISOString().split('T')[0].replace(/-/g, '/')
}
function isValidDate(value) {
  if (value instanceof Date) {
    return !isNaN(value.getTime())
  }
  const date = new Date(value)
  return !isNaN(date.getTime())
}
watch(
  () => criteria.Daterange,
  (newRange) => {
    if (newRange && newRange.length === 2) {
      criteria.S_DATE = newRange[0]
      criteria.E_DATE = newRange[1]
    }
    else {
      criteria.S_DATE = ''
      criteria.E_DATE = ''
    }
  },
)
function formatDates(dateFormat) {
  let formattedDate = ''
  if (dateFormat) {
    const DateObj = new Date(dateFormat)
    const year = DateObj.getFullYear()
    const month = String(DateObj.getMonth() + 1).padStart(2, '0')
    const day = String(DateObj.getDate()).padStart(2, '0')
    formattedDate = `${year}/${month}/${day}`
  }
  return formattedDate
}
function resetForm() {
  criteria.QueryType = ''
  criteria.S_DATE = ''
  criteria.E_DATE = ''
  criteria.Daterange = ''
  queryResult.items = []
  queryResult.totalItemCount = 0
}

// const batchRemovedList = ref([getDefulatJDMReceiptInvoiceCriteria()])

const PrintReceiptInvoice = reactive({
  jdmReceiptInvices: [],
})
function handleSelectionChange(items) {
  PrintReceiptInvoice.jdmReceiptInvices = items
}
const drawerprint = ref(false)
async function sendSave() {
  const existingInvoice = PrintReceiptInvoice.jdmReceiptInvices.some(item => item.receiptno || item.invoicE_NO)
  if (existingInvoice) {
    ElMessage.warning('該筆資料已開立發票或收據，無法重複開立')
    return
  }

  await ElMessageBox.confirm(
    '您要開立收據?',
    '開立收據',
    {
      cancelButtonText: '取消',
    },
  )
  const response: any = await $api.v1.JdmReceiptInvoice.PrintInvoiceReceipt(PrintReceiptInvoice.jdmReceiptInvices)
  const { status, saveCount } = response
  if (status && status !== 200)
    throw new Error('新增失敗')
  ElMessage.success(`已新增${saveCount}筆`)
}
function handleCurrentChange(val: number) {
  criteria.pageNumber = val
  search()
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="收據發票處理">
          <el-form label-width="auto">
            <el-row :gutter="20">
              <el-col class="m-auto" :span="18">
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="日期設定:">
                      <el-radio-group v-model="criteria.QueryType" class="ml-4">
                        <el-radio v-for="option in ReceiptInvoiceType.values()" :key="option" :value="option">
                          {{ ReceiptInvoiceType.display(option) }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="日期範圍:">
                      <div class="block">
                        <el-date-picker
                          v-model="criteria.Daterange" type="daterange" range-separator="至"
                          start-placeholder="開始日期" end-placeholder="結束日期"
                        />
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col class="m-auto" align="center" :span="16">
                <ClientOnly>
                  <el-button type="primary" plain @click="search()">
                    <AdminIcon name="i-carbon:search" class="pr-1" />
                    查詢
                  </el-button>
                </ClientOnly>
                <el-button plain @click="resetForm()">
                  <AdminIcon name="i-carbon:reset" class="pr-1" />
                  重設
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card header="查詢結果" class="mt-4">
          <el-row>
            <el-col :span="16">
              <el-pagination
                v-if="queryResult.totalItemCount > 0"
                v-model:current-page="queryResult.pageNumber" v-model:page-size="queryResult.pageSize"
                layout="total, prev, pager, next, jumper" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
            <el-col :span="8">
              <ClientOnly>
                <el-button
                  type="primary" class="ms-1" float="right"
                  @click="drawerprint = true"
                >
                  <AdminIcon name="i-carbon:add" class="pr-1" />
                  開立
                </el-button>
              </clientonly>
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" prop="selected" width="55" />
            <el-table-column label="#" width="55">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="saleS_NO" label="應收序號" align="center" />
            <el-table-column prop="buildinG_NAME" label="建物名稱" align="center" />
            <el-table-column label="承租人/承辦人" align="center">
              <template #default="{ row }">
                <td>
                  <p>{{ row.lesS_NAME }}</p>
                  <p>{{ row.empL_NAME }}</p>
                </td>
              </template>
            </el-table-column>
            <el-table-column prop="saleS_TYPE" label="繳款項目" align="center">
              <template #default="scope">
                <span v-if="scope.row.saleS_TYPE === '01'">租金</span>
                <span v-if="scope.row.saleS_TYPE === '02'">罰金</span>
                <span v-if="scope.row.saleS_TYPE === '03'">預開發票</span>
                <span v-if="scope.row.saleS_TYPE === '04'">水費</span>
                <span v-if="scope.row.saleS_TYPE === '05'">水電費</span>
                <span v-if="scope.row.saleS_TYPE === '06'">瓦斯費</span>
                <span v-if="scope.row.saleS_TYPE === '07'">管理費</span>
                <span v-if="scope.row.saleS_TYPE === '08'">會計應收</span>
              </template>
            </el-table-column>

            <el-table-column prop="payableD_DATE" label="繳納期限" align="center" />
            <el-table-column prop="renT_AMT" label="應繳金額" align="center" />
            <el-table-column label="計費期間" align="center">
              <template #default="scope">
                <p>{{ scope.row.renT_START_DATE }}</p>
                <p>{{ scope.row.renT_END_DATE }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="paymenT_DATE" label="實繳日期(交易日)" align="center" />
            <el-table-column prop="accT_DATE" label="帳務日" align="center" />
            <el-table-column prop="offseT_DATE" label="銷帳日" align="center" />
            <el-table-column
              label="資料編號/作業階段/作業狀態/開立日期/單據號碼"
              align="center"
            >
              <template #header>
                <span>
                  資料編號
                  <hr class="hr">
                  作業階段
                  <hr class="hr">
                  作業狀態
                  <hr class="hr">
                  開立日期
                  <hr class="hr">
                  單據號碼
                </span>
              </template>
              <template #default="scope">
                <div>
                  <!-- 資料編號 -->
                  {{ scope.row.tsid > 0 ? parseInt(scope.row.receiptno, 10) : parseInt(scope.row.invoicE_NO, 10) || '' }}
                  <hr class="hr">

                  <!-- 作業階段 -->
                  <div>
                    <span v-if="scope.row.tsid > 0" style="color:Orange"><b>鎖定</b></span>
                    <span v-else-if="scope.row.invoicE_STATUS === '尚未傳送'" style="color:black"><b>尚未傳送</b></span>
                    <span v-else-if="scope.row.invoicE_STATUS === '1'" style="color:Blue"><b>待開</b></span>
                    <span v-else-if="scope.row.invoicE_STATUS === '2'" style="color:Orange"><b>鎖定</b></span>
                    <span v-else-if="scope.row.invoicE_STATUS === '3'" style="color:green"><b>完成</b></span>
                    <span v-else-if="scope.row.invoicE_STATUS === '9'" style="color:red"><b>失敗</b></span>
                  </div>
                  <hr class="hr">

                  <!-- 作業狀態 -->
                  <div>
                    <span v-if="scope.row.invoicE_WORK_TYPE === '10'" style="color:green">開立發票</span>
                    <span v-if="scope.row.invoicE_WORK_TYPE === '11'" style="color:red">作廢</span>
                    <span v-if="scope.row.invoicE_WORK_TYPE === '12'" style="color:Orange">折讓</span>
                    <span v-if="scope.row.invoicE_WORK_TYPE === '13'" style="color:red">折讓作廢</span>
                    <span v-if="scope.row.tsid > 0" style="color:blue">開立收據</span>
                  </div>
                  <hr class="hr">

                  <!-- 開立日期 -->
                  {{ scope.row.tsid > 0 ? formatDates(scope.row.makeDate) : scope.row.invoicE_DATE }}
                  <hr class="hr">

                  <!-- 單據號碼 -->
                  {{ scope.row.tsid > 0 ? scope.row.receiptNumber : scope.row.invoicE_NUMBER }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="mt-4">
            <el-col :span="16">
              <el-pagination
                v-if="queryResult.totalItemCount > 0"
                v-model:current-page="queryResult.pageNumber" v-model:page-size="queryResult.pageSize"
                layout="total, prev, pager, next, jumper" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-drawer
      v-model="drawerprint"
      title="開立"
      :append-to-body="true" size="80%"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card header="開立">
            <el-form label-width="auto">
              <el-row :gutter="20">
                <el-col class="m-auto" :span="18">
                  <el-row :gutter="20">
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24" />
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24" />
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24" />
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col class="m-auto" align="center" :span="16">
                  <ClientOnly>
                    <el-button type="primary" plain @click="sendSave()">
                      <AdminIcon name="i-carbon:save" class="pr-1" />
                      開立
                    </el-button>
                  </ClientOnly>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-drawer>
  </AdminContainer>
</template>
