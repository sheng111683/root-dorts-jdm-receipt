<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import * as yup from 'yup'
import { downloadFile } from '~/utils/downloadFile'
import {

  getDefaultPageList,
  getDefaultagencyapply,
  getDefaultjdmReceipt,
  getDefulatJDMReceiptAddCriteria,
  getDefulatJDMReceiptCriteria,
  getDefulatJDMReceiptPrintCriteria,
} from '~/models'
import { ReceiptPrintModel, ReceiptPrintReason, ReceiptPrintType, ReceiptType, ReceiptTypeSearch, RemovedType } from '~/enums'

const { $api } = useNuxtApp()
definePageMeta({ layout: 'admin' })
const runtimeConfig = useRuntimeConfig()
const { baseURL } = runtimeConfig.public
const criteria = reactive(getDefulatJDMReceiptCriteria())
const criteriaprint = reactive(getDefulatJDMReceiptPrintCriteria())
const criteriaEdit = reactive(getDefaultjdmReceipt())
const criteriaAdd = reactive(getDefulatJDMReceiptAddCriteria())
const queryResult = reactive(getDefaultPageList<any>())
const queryEditResult = reactive(getDefaultPageList<any>())
const jdmReceipt = reactive(getDefaultjdmReceipt())
const notification = useNotification()
const drawer = ref(false)
const draweredit = ref(false)
const drawerprint = ref(false)
const { setValues } = useForm({
  validationSchema: yup.object({
    content: yup.string().trim(),
    createUser: yup.string().trim(),
  }),
})
const agencyapply = reactive([getDefaultagencyapply()])
const agencyapplyadd = reactive([getDefaultagencyapply()])
const agencyapplyedit = reactive([getDefaultagencyapply()])
const agencyselect = await $api.v1.JdmReceipt.GetApplyAgency({})

Object.assign(agencyapply, agencyselect)
Object.assign(agencyapplyadd, agencyselect)
Object.assign(agencyapplyedit, agencyselect)
async function search() {
  formatDates(criteria.makeDate)
  const jdmReceiptResponse = await $api.v1.JdmReceipt.Get(criteria)
  Object.assign(queryResult, jdmReceiptResponse)
  queryResult.AMT = 0
  queryResult.items = queryResult.items.map((item) => {
    if (item.makeDate) {
      item.makeDate = formatDates(item.makeDate)
    }
    queryResult.AMT += item.payMoney || 0
    return item
  })
}
function formatDates(makeDate) {
  if (makeDate) {
    criteria.makeDate = dateFormats(makeDate)
  }

  return criteria
}
function dateFormats(dateString) {
  if (dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  }
  return ''
}

function dateFormat(dateString) {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0].replace(/-/g, '/')
}
async function handleEdit(encryptionId: string) {
  draweredit.value = true
  criteriaEdit.encryptionId = encryptionId
  if (criteriaEdit.encryptionId.length > 0) {
    const { data } = await useAsyncData(() => {
      return $api.v1.JdmReceipt.GetByEncryptionId(criteriaEdit.encryptionId)
    })
    Object.assign(criteriaEdit, data.value)
    setValues(criteria)
    criteriaprint.jdmReceiptId = encryptionId

    const jdmReceiptPrintResponse = await $api.v1.JdmReceiptPrint.Get(criteriaprint)
    Object.assign(queryEditResult, jdmReceiptPrintResponse)
    queryEditResult.items = queryEditResult.items.map((item) => {
      if (item.printDate) {
        item.printDate = formatDates(item.printDate)
      }
      queryResult.AMT += item.payMoney || 0
      return item
    })
  }
  else {
    Object.assign(criteriaEdit, getDefulatJDMReceiptCriteria())
  }
}

async function handleRemove(encryptionId: string) {
  try {
    await ElMessageBox.confirm(
      '您確定要移除這筆資料?',
      '移除資料',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
    const { status }: any = await $api.v1.JdmReceipt.Remove(encryptionId)
    if (status && status !== 200)
      throw new Error('移除失敗')
    notification.success('已移除')
    search()
  }
  catch (e: any) {
    if (e.toString() !== 'cancel')
      throw e
  }
}
function resetForm() {
  criteria.agency = ''
  criteria.year = ''
  criteria.receiptNumber = ''
  criteria.payNumber = ''
  criteria.payName = ''
  criteria.paymentName = ''
  criteria.payMoney = ''
  criteria.makeDate = ''
  criteria.receiptType = 'ALL'
  criteria.removed = 'false'
  queryResult.items = []
  queryResult.totalItemCount = 0
  queryResult.AMT = 0
}
function resetAddForm() {
  const currentYear = new Date().getFullYear() // 取得西元年
  const currentROCYear = currentYear - 1911 // 轉換為民國年
  criteriaAdd.agency = ''
  criteriaAdd.year = currentROCYear.toString()
  criteriaAdd.receiptNumber = ''
  criteriaAdd.payNumber = ''
  criteriaAdd.payName = ''
  criteriaAdd.paymentName = ''
  criteriaAdd.payMoney = ''
  criteriaAdd.receiptType = ''
  criteriaAdd.makeDate = dateFormats(new Date());
  criteriaAdd.paymentDate = dateFormats(new Date());
  criteriaAdd.removed = false
}

async function SaveAdd() {
  Object.assign(jdmReceipt, criteriaAdd)
  jdmReceipt.makeDate = dateFormats(criteriaAdd.makeDate)
  jdmReceipt.paymentDate = dateFormats(criteriaAdd.paymentDate)
  console.log(jdmReceipt)
  const { status }: any = await $api.v1.JdmReceipt.Post([jdmReceipt])
  if (status && status !== 200)
    throw new Error('新增失敗')
  ElMessage.success('已新增')
}

async function SaveEdit() {
  try {
    await ElMessageBox.confirm(
      '您確定要更新當前資料?',
      '送出資料提醒',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )

    if (criteriaEdit.encryptionId.length > 0) {
      formatEditDates(criteriaEdit.makeDate)
      criteriaEdit.paymentDate = dateFormats(criteriaAdd.paymentDate)

      const { status }: any = await $api.v1.JdmReceipt.Put(criteriaEdit.encryptionId, criteriaEdit)
      if (status && status !== 200)
        throw new Error('儲存失敗')

      ElMessage.success('已儲存')
      draweredit.value = false
    }
  }
  catch (e: any) {
    if (e.toString() !== 'cancel')
      throw e
  }
}
function formatEditDates(makeDate) {
  if (makeDate) {
    const makeDateObj = new Date(makeDate)
    const year = makeDateObj.getFullYear()
    const month = String(makeDateObj.getMonth() + 1).padStart(2, '0')
    const day = String(makeDateObj.getDate()).padStart(2, '0')
    criteriaEdit.makeDate = `${year}/${month}/${day}`
  }

  return criteriaEdit
}
const RePrintReceipt = reactive({
  receiptPrintType: '全部',
  receiptPrintReason: '其他',
  receiptPrintModel: '一頁一聯',
  jdmReceipts: [],
  jdmReceiptIds: [],
})

function handleSelectionChange(items) {
  RePrintReceipt.jdmReceipts = items
  RePrintReceipt.jdmReceiptIds = items
    .filter(item => item.encryptionId) // 過濾掉沒有 encryptionId 的項目
    .map(item => ({ encryptionId: item.encryptionId }))
}
// function handleCurrentChange(val) {
// search()
// }
function resetPrintFrom() {
  RePrintReceipt.receiptPrintType = ''
  RePrintReceipt.receiptPrintReason = ''
  RePrintReceipt.receiptPrintModel = ''
}
async function PrintReceipt() {
  // const data = await $api.v1.JdmReceiptPrint.PrintReceipt(RePrintReceipt)
  try {
    await ElMessageBox.confirm(
      '您要列/重印收據?',
      '列/重印收據',
      {
        cancelButtonText: '取消',
      },
    )
    const payload = JSON.stringify(RePrintReceipt.jdmReceiptIds)
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '')
    // 取得時分秒，並將其加入檔案名稱
    const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false }).replace(/:/g, '') // 去掉冒號
    const fileName = `${formattedDate}_${formattedTime}.pdf`

    const { status } = await downloadFile(`${baseURL}/api/v1/jdmReceiptPrint/printReceipt?receiptPrintType=${RePrintReceipt.receiptPrintType.trim()}
    &receiptPrintReason=${RePrintReceipt.receiptPrintReason.trim()}&receiptPrintModel=${RePrintReceipt.receiptPrintModel.trim()}&jdmReceiptIds=${payload}`, fileName)

    if (status && status !== 200) {
      throw new Error('下載失敗')
    }
    else {
      ElMessage.success('PDF 下載成功')
      drawerprint.value = false
      search()
    }
  }
  catch {
    ElMessage.error('下載失敗')
  }
}

async function RePrint() {
  drawerprint.value = true

  // 檢查 jdmReceipts 是否為空
  if (RePrintReceipt.jdmReceipts.length === 0) {
    RePrintReceipt.receiptPrintModel = '一頁一聯'
    return
  }

  // 使用 .every() 方法檢查所有收據是否都是「停車費」
  const allParkingFees = RePrintReceipt.jdmReceipts.every(
    receipt => receipt.receiptType === '停車費',
  )

  // 根據是否全部為「停車費」來設定 receiptPrintModel
  if (allParkingFees) {
    RePrintReceipt.receiptPrintModel = '一頁六聯'
  }
  else {
    RePrintReceipt.receiptPrintModel = '一頁一聯'
  }
}
function handleCurrentChange(val: number) {
  criteria.pageNumber = val
  search()
}
async function handleAdd() {
  const currentYear = new Date().getFullYear() // 取得西元年
  const currentROCYear = currentYear - 1911 // 轉換為民國年
  drawer.value = true
  criteriaAdd.year = currentROCYear.toString()
  criteriaAdd.makeDate = dateFormats(new Date());
  criteriaAdd.paymentDate = dateFormats(new Date());

}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="收據查詢列印">
          <el-form label-width="auto">
            <el-row :gutter="20">
              <el-col class="m-auto" :span="18">
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="支用機關:">
                      <el-select v-model="criteria.agency" placeholder="請選擇">
                        <el-option
                          v-for="item in agencyapply" :key="item.text" :label="item.text"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="年度:">
                      <el-input v-model="criteria.year" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="收據類別">
                      <el-radio-group v-model="criteria.receiptType" class="ml-4">
                        <el-radio v-for="option in ReceiptTypeSearch.values()" :key="option" :value="option">
                          {{ ReceiptTypeSearch.display(option) }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="收據編號:">
                      <el-input v-model="criteria.receiptNumber" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="繳款人代號:">
                      <el-input v-model="criteria.payNumber" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="繳款人姓名:">
                      <el-input v-model="criteria.payName" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="繳款名稱:">
                      <el-input v-model="criteria.paymentName" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="繳款金額:">
                      <el-input v-model="criteria.payMoney" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="製單日期:">
                      <div class="block">
                        <el-date-picker v-model="criteria.makeDate" type="date" placeholder="" size="default" />
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="作廢:">
                      <el-radio-group v-model="criteria.removed" class="ml-4">
                        <el-radio v-for="option in RemovedType.values()" :key="option" :value="option">
                          {{ RemovedType.display(option) }}
                        </el-radio>
                      </el-radio-group>
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
            <el-col :lg="12" :xl="12" :xs="24" :sm="24">
              <el-pagination
                v-if="queryResult.totalItemCount > 0"
                v-model:current-page="queryResult.pageNumber" v-model:page-size="queryResult.pageSize"
                layout="total, prev, pager, next, jumper" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
            <el-col :lg="12" :xl="12" :xs="24" :sm="24">
              <p>總繳款金額:{{ queryResult.AMT }}</p>
              <ClientOnly>
                <el-button
                  type="primary" float="right" class="ms-1"
                  @click="handleAdd()"
                >
                  <AdminIcon name="i-carbon:add" class="pr-1" />
                  新增
                </el-button>
                <el-button
                  type="primary" class="ms-1" float="right"
                  @click="RePrint()"
                >
                  <AdminIcon name="i-carbon:add" class="pr-1" />
                  列/重印收據
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" prop="selected" width="55" />
            <el-table-column label="#" width="55">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="agency" label="支用機關" align="center" />
            <el-table-column prop="year" label="年度" align="center" />
            <el-table-column prop="receiptType" label="收據類別" align="center" />
            <el-table-column prop="receiptNumber" label="收據編號" align="center" />
            <el-table-column prop="payNumber" label="繳款人代號" align="center" />
            <el-table-column prop="payName" label="繳款人姓名" align="center" />
            <el-table-column prop="paymentName" label="繳款名稱" align="center" />
            <el-table-column prop="payMoney" label="繳款金額" align="center" />
            <el-table-column prop="makeDate" label="製單日期" align="center" />
            <el-table-column prop="receipt_count" label="列印次數" align="center" />
            <el-table-column label="動作" width="220" align="center">
              <template #default="scope">
                <ClientOnly>
                  <el-col :span="24">
                    <el-button
                      v-if="scope.row.removed !== true"
                      type="primary"
                      @click="handleEdit(scope.row.encryptionId)"
                    >
                      <AdminIcon name="i-carbon:edit" class="pr-1" />
                      編輯
                    </el-button>
                  </el-col>
                  <el-button
                    v-if="scope.row.removed !== true"
                    type="danger"
                    @click="handleRemove(scope.row.encryptionId)"
                  >
                    <el-icon>
                      <Delete />
                    </el-icon>
                    作廢
                  </el-button>
                </ClientOnly>
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
      v-model="drawer"
      title="收據新增"
      :append-to-body="true" size="85%"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card header="收據新增">
            <el-form label-width="auto">
              <el-row :gutter="20">
                <el-col class="m-auto" :span="18">
                  <el-row :gutter="20">
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="支用機關:">
                        <el-select v-model="criteriaAdd.agency" placeholder="請選擇">
                          <el-option
                            v-for="item in agencyapplyadd" :key="item.text" :label="item.text"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="年度:">
                        <el-input v-model="criteriaAdd.year" maxlength="3" />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="收據類別:">
                        <el-radio-group v-model="criteriaAdd.receiptType" class="ml-4">
                          <el-radio v-for="option in ReceiptType.values()" :key="option" :value="option">
                            {{ ReceiptType.display(option) }}
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="繳款人代號:">
                        <el-input v-model="criteriaAdd.payNumber" />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="繳款人姓名:">
                        <el-input v-model="criteriaAdd.payName" />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="繳款名稱:">
                        <el-input v-model="criteriaAdd.paymentName" />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="繳款金額:">
                        <el-input v-model="criteriaAdd.payMoney" />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="製單日期:">
                        <div class="block">
                          <el-date-picker v-model="criteriaAdd.makeDate" type="date" placeholder="" size="default" />
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="繳庫日期:">
                        <div class="block">
                          <el-date-picker v-model="criteriaAdd.paymentDate" type="date" placeholder="" size="default" />
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col class="m-auto" align="center" :span="16">
                  <ClientOnly>
                    <el-button type="primary" plain @click="SaveAdd()">
                      <AdminIcon name="i-carbon:save" class="pr-1" />
                      儲存
                    </el-button>
                  </ClientOnly>
                  <el-button plain @click="resetAddForm()">
                    <AdminIcon name="i-carbon:reset" class="pr-1" />
                    重設
                  </el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-drawer>
    <el-drawer
      v-model="draweredit"
      title="收據編輯"
      :append-to-body="true" size="85%"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card header="收據編輯">
            <el-form label-width="auto" class="form-max-width">
              <el-form-item label="支用機關:">
                <el-select v-model="criteriaEdit.agency" placeholder="請選擇">
                  <el-option
                    v-for="item in agencyapplyedit" :key="item.text" :label="item.text"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="年度:">
                <el-input v-model="criteriaEdit.year" maxlength="3" />
              </el-form-item>
              <el-form-item label="收據類別:">
                <el-radio-group v-model="criteriaEdit.receiptType" class="ml-4" disabled>
                  <el-radio v-for="option in ReceiptType.values()" :key="option" :value="option">
                    {{ ReceiptType.display(option) }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="收據編號:">
                <el-input v-model="criteriaEdit.receiptNumber" disabled />
              </el-form-item>
              <el-form-item label="繳款人代號:">
                <el-input v-model="criteriaEdit.payNumber" />
              </el-form-item>
              <el-form-item label="繳款人姓名:">
                <el-input v-model="criteriaEdit.payName" />
              </el-form-item>
              <el-form-item label="繳款金額:">
                <el-input v-model="criteriaEdit.payMoney" />
              </el-form-item>
              <el-form-item label="製單日期:">
                <div class="block">
                  <el-date-picker v-model="criteriaEdit.makeDate" type="date" placeholder="" size="default" />
                </div>
              </el-form-item>
              <el-form-item label="繳庫日期:">
                <div class="block">
                  <el-date-picker v-model="criteria.paymentDate" type="date" placeholder="" size="default" />
                </div>
              </el-form-item>
              <el-row :gutter="20">
                <el-col :span="24">
                  <ClientOnly>
                    <el-button type="primary" plain @click="SaveEdit()">
                      <AdminIcon name="i-carbon:save" class="pr-1" />
                      儲存
                    </el-button>
                  </ClientOnly>
                </el-col>
              </el-row>
            </el-form>

            <hr style="border-top: 1px dashed #000; margin: 50px 0;">
            列印紀錄

            <el-table :data="queryEditResult.items" stripe style="width: 100%" max-height="400px">
              <el-table-column label="#" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="printDate" label="列印日期" align="center" />
              <el-table-column prop="printReason" label="重印原因" align="center" />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-drawer>
    <el-drawer
      v-model="drawerprint"
      title="收據 列/重印"
      :append-to-body="true" size="80%"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card header="收據 列/重印">
            <el-form label-width="auto">
              <el-row :gutter="20">
                <el-col class="m-auto" :span="18">
                  <el-row :gutter="20">
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="選項:">
                        <el-radio-group v-model="RePrintReceipt.receiptPrintType" class="ml-4">
                          <el-radio v-for="option in ReceiptPrintType.values()" :key="option" :value="option">
                            {{ ReceiptPrintType.display(option) }}
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="重印原因:">
                        <el-radio-group v-model="RePrintReceipt.receiptPrintReason" class="ml-4">
                          <el-radio v-for="option in ReceiptPrintReason.values()" :key="option" :value="option">
                            {{ ReceiptPrintReason.display(option) }}
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="列印模式:">
                        <el-radio-group v-model="RePrintReceipt.receiptPrintModel" class="ml-4">
                          <el-radio v-for="option in ReceiptPrintModel.values()" :key="option" :value="option">
                            {{ ReceiptPrintModel.display(option) }}
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col class="m-auto" align="center" :span="16">
                  <ClientOnly>
                    <el-button type="primary" plain @click="PrintReceipt()">
                      <AdminIcon name="i-carbon:save" class="pr-1" />
                      開立
                    </el-button>
                  </ClientOnly>
                  <el-button plain @click="resetPrintFrom()">
                    <AdminIcon name="i-carbon:reset" class="pr-1" />
                    重設
                  </el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-drawer>
  </AdminContainer>
</template>
