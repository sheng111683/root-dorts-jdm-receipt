<script setup lang="ts">
import { ElMessage } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  isDisable: '',
  personnelNumber: '',
  personnelName: '',
  serviceUnits: '',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())

async function search(val) {
  criteria.pageNumber = val || 1
  const start = (criteria.pageNumber - 1) * criteria.pageSize
  const end = criteria.pageNumber * criteria.pageSize
  Object.assign(queryResult, {
    pageNumber: criteria.pageNumber,
    totalItemCount: datas.length,
    pageCount: 1,
    items: datas.slice(start, end),
  })
}

const serviceUnitsOptions = [
  {
    value: '捷運團隊專區',
    label: 'DG',
  },
  {
    value: '團隊專區',
    label: 'PG',
  },
]
function handleSave() {
  ElMessage.success('已新增')
}
function handleCurrentChange(val) {
  search(val)
}

const datas = [
  { personnelNumber: 'A000000003', name: '郭添信', companyEditor: '', companyName: '', email: '', isDisable: 'true', checked: false },
  { personnelNumber: 'A000000004', name: '李貞慧', companyEditor: '', companyName: '', email: '', isDisable: 'true', checked: false },
  { personnelNumber: 'A000000005', name: '謝國霖', companyEditor: '7594900', companyName: '中華工程股份有限公司', email: 'asd@edu.gov.tw', isDisable: 'false', checked: false },
  { personnelNumber: 'A000000004', name: '李貞慧', companyEditor: '', companyName: '', email: '', isDisable: 'true', checked: false },
  { personnelNumber: 'A000000005', name: '謝國霖', companyEditor: '7594900', companyName: '中華工程股份有限公司', email: 'asd@edu.gov.tw', isDisable: 'false', checked: false },
]

function reset() {
  criteria.personnelNumber = ''
  criteria.personnelName = ''
  criteria.serviceUnits = ''
  queryResult.items.forEach((item) => {
    item.checked = false
  })
  selectAll.value = false
  queryResult.items = []
  queryResult.totalItemCount = 0
}
const selectAll = ref(false)
function handleSelectAll(val) {
  queryResult.items.forEach((item) => {
    if (item.isDisable !== 'true') {
      item.checked = val
    }
  })
}
function handleSelect(row) {
  row.checked = !row.checked
  selectAll.value = queryResult.items.every(item => item.checked)
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="【新增】應用系統清單">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="停權顯示">
              <el-checkbox v-model="criteria.isDisable" checked disabled />
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="人員編號">
                  <el-input v-model="criteria.personnelNumber" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="人員姓名">
                  <el-input v-model="criteria.personnelName" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="服務單位">
                  <el-select v-model="criteria.serviceUnits" placeholder="請選擇" style="width: 240px">
                    <el-option
                      v-for="item in serviceUnitsOptions" :key="item.value"
                      :label="item.label" :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="0" label="-">
                  <el-input v-model="criteria.serviceUnits" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row :gutter="20">
            <el-col :span="24">
              <ClientOnly>
                <el-button type="primary" plain @click="search('')">
                  <AdminIcon name="i-carbon:search" class="pr-1" />
                  查詢
                </el-button>
                <el-button plain @click="reset()">
                  <AdminIcon name="i-carbon:reset" class="pr-1" />
                  重設
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
        </el-card>
        <el-card header="查詢結果" class="mt-4">
          <el-row>
            <el-col :span="2">
              <el-pagination
                v-if="queryResult.totalItemCount > 0"
                v-model:current-page="queryResult.pageNumber" v-model:page-size="queryResult.pageSize"
                layout="total" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
            <el-col :span="22">
              <el-text style="color:gray">
                (人員資料為灰色系已停用帳號。)
              </el-text>
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <el-table-column width="55">
              <template #header>
                <el-checkbox v-model="selectAll" @change="handleSelectAll" />
              </template>
              <template #default="{ row }">
                <el-checkbox v-model="row.checked" :disabled="row.isDisable === 'true'" />
              </template>
            </el-table-column>
            <el-table-column prop="personnelNumber" label="人員編號">
              <template #default="{ row }">
                <span :style="{ color: row.isDisable === 'true' ? 'gainsboro' : '' }">{{
                  row.personnelNumber
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名">
              <template #default="{ row }">
                <span :style="{ color: row.isDisable === 'true' ? 'gainsboro' : '' }">{{ row.name
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="companyEditor" label="公司統編">
              <template #default="{ row }">
                <span :style="{ color: row.isDisable === 'true' ? 'gainsboro' : '' }">{{
                  row.companyEditor
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="companyName" label="公司名稱">
              <template #default="{ row }">
                <span :style="{ color: row.isDisable === 'true' ? 'gainsboro' : '' }">{{ row.companyName
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="email" label="電子郵件">
              <template #default="{ row }">
                <span :style="{ color: row.isDisable === 'true' ? 'gainsboro' : '' }">{{ row.email
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="選擇">
              <template #default="{ row }">
                <el-button
                  v-if="row.isDisable !== 'true'" type="primary" size="small"
                  @click="handleSelect(row)"
                >
                  選擇
                </el-button>
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
          <el-row :gutter="20">
            <el-col :span="16">
              <ClientOnly>
                <el-button type="primary" plain @click="handleSave()">
                  新增
                </el-button>
                <el-button plain @click="$router.back()">
                  取消
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
