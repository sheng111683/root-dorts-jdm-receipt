<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { downloadFile } from '~/utils/downloadFile'
import {
  getDefaultPageList,
  getDefaultagencyapply,
  getDefulatMonthReportCriteria,
  memoListMapper,
  type MemoList,
  type PagedList,
} from '~/models'
import { MonthReportPrintTypeSearch, MonthReportHandleType } from '~/enums'

const { $api } = useNuxtApp()
definePageMeta({ layout: 'admin' })
const runtimeConfig = useRuntimeConfig()
const { baseURL } = runtimeConfig.public
const criteria = reactive(getDefulatMonthReportCriteria())

const addMemo = ref(false)
const queryResult = reactive(getDefaultPageList<any>())

const drawerprint = ref(false)

const agencyapply = reactive([getDefaultagencyapply()])

const agencyselect = await $api.v1.JdmMonthReport.GetApplyAgency({})

Object.assign(agencyapply, agencyselect)

async function search() {
  
  if(checkQuery())
  {
    formatMonth(criteria.certDate)
    const jdmReceiptMemoResponse = await $api.v1.JdmMonthReport.Get(criteria) as PagedList<MemoList>
    Object.assign(queryResult, jdmReceiptMemoResponse)
    if(criteria.handleType == '備註摘要')
    {
      if(Array.isArray(jdmReceiptMemoResponse.items) && jdmReceiptMemoResponse.items.length > 0 && jdmReceiptMemoResponse.items[0].memo != '')
      {
        addMemo.value = false
      }
      else
      {
        addMemo.value = true
      }
      return jdmReceiptMemoResponse
    }
    else if(criteria.handleType == '列印')
    {
      queryResult.items = []
      PrintMonthReport()
    }
  }
}

function formatMonth(certDate) {
  if (certDate) {
    const certDateObj = new Date(certDate)
    const year = certDateObj.getFullYear()
    const month = String(certDateObj.getMonth() + 1).padStart(2, '0')
    criteria.certDate = `${year}-${month}`
  }

  return criteria
}

function checkQuery() {
  const returnFlag = ref(true);
  if(criteria.agency == '')
  {
    ElMessage.error('請選擇支用機關')
    returnFlag.value = false
  }
  if(criteria.handleType == '')
  {
    ElMessage.error('請選擇處理類別')
    returnFlag.value =  false
  }
  if(criteria.certDate == '')
  {
    ElMessage.error('請選擇列印年月')
    returnFlag.value =  false
  }
  if(criteria.handleType == '列印' && criteria.printType == '')
  {
    ElMessage.error('請選擇列印類別')
    returnFlag.value =  false
  }

  return returnFlag.value
}

async function saveMemo() {
  const items = Array.isArray(queryResult.items) ? queryResult.items : []
  const memoList = items.map(item => ({...memoListMapper(item), certDate: criteria.certDate, type: 'Month', agency: criteria.agency }))
  Object.assign(criteria, queryResult.items)
  try {
    if(addMemo.value)
    {
      const { status }: any = await $api.v1.JdmMonthReport.Post(memoList)
      if (status && status !== 200)
        throw new Error('新增失敗')
      ElMessage.success('已新增')
    }
    else
    {
      const { status }: any = await $api.v1.JdmMonthReport.Put(memoList)
      if (status && status !== 200)
        throw new Error('更新失敗')
      ElMessage.success('已更新')
    }
  } catch (err) {
    alert('儲存失敗')
  }
}

async function PrintMonthReport() {
  try {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '')
    // 取得時分秒，並將其加入檔案名稱
    const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false }).replace(/:/g, '') // 去掉冒號
    const fileName = `收據月報表_${formattedDate}_${formattedTime}.pdf`

    const { status } = await downloadFile(`${baseURL}/api/v1/jdmMonthReport/PrintMonthReport?agency=${criteria.agency.trim()}
    &printType=${criteria.printType.trim()}&type=${criteria.type.trim()}&certDate=${criteria.certDate.trim()}`, fileName)

    if (status && status !== 200) {
      throw new Error('下載失敗')
    }
    else {
      ElMessage.success('PDF 下載成功')
      drawerprint.value = false
    }
  }
  catch {
    ElMessage.error('下載失敗')
  }
}


function resetForm() {
  criteria.agency = ''
  criteria.handleType = ''
  criteria.printType = ''
  criteria.certDate = ''
  queryResult.items = []
}

</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="收據月報表表單">
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
                </el-row>
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="列印類別">
                      <el-radio-group v-model="criteria.printType" class="ml-4">
                        <el-radio v-for="option in MonthReportPrintTypeSearch.values()" :key="option" :value="option">
                          {{ MonthReportPrintTypeSearch.display(option) }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="列印年月">
                      <div class="block">
                        <el-date-picker v-model="criteria.certDate" type="month" placeholder="" size="default" />
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="處理類別">
                      <el-radio-group v-model="criteria.handleType" class="ml-4">
                        <el-radio v-for="option in MonthReportHandleType.values()" :key="option" :value="option">
                          {{ MonthReportHandleType.display(option) }}
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
                    列印
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

        <el-card v-if="queryResult && queryResult.items && queryResult.items.length > 0" header="查詢結果" class="mt-4">
          <!-- <el-row>
            <el-col :lg="12" :xl="12" :xs="24" :sm="24">
              <el-pagination
                v-if="queryResult.totalItemCount > 0"
                v-model:current-page="queryResult.pageNumber" v-model:page-size="queryResult.pageSize"
                layout="total, prev, pager, next, jumper" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row> -->
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <el-table-column label="#" width="55">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="row" label="行號" align="center">
              <template #default="scope">
                <el-input v-model="scope.row.row" placeholder="輸入內容" />
              </template>
            </el-table-column>
            <el-table-column prop="memo" label="摘要" align="center">
              <template #default="scope">
                <el-input v-model="scope.row.memo" placeholder="輸入內容" />
              </template>
            </el-table-column>
          </el-table>

          <el-button type="primary" class="mt-4" @click="saveMemo">儲存</el-button>
          <!-- <el-row class="mt-4">
            <el-col :span="16">
              <el-pagination
                v-if="queryResult.totalItemCount > 0"
                v-model:current-page="queryResult.pageNumber" v-model:page-size="queryResult.pageSize"
                layout="total, prev, pager, next, jumper" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row> -->
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
