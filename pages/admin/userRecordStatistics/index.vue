<script setup lang="ts">
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  operatingSystem: 'DG',
  unitOfUse: '',
  dateValue: '',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())

const showDateTime = ref(false)
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
  showDateTime.value = true
  updateDateTime()
}
const operatingSystemOptions = [
  {
    value: 'DG',
    label: 'DG-捷運團隊專區',
  },
  {
    value: 'PG',
    label: 'PG-團隊專區',
  },
]
const unitOfUseOptions = [
  {
    value: '捷運團隊專區',
    label: 'DG',
  },
  {
    value: '團隊專區',
    label: 'PG',
  },
]

function handleCurrentChange(val) {
  search(val)
}

const datas = [
  { systemCode: 'DG', systemName: '捷運團隊專區', quantityLastMonth: '7842', thisMonthQuantity: '5699', fullQuantity: '53283' },
  { systemCode: 'EN', systemName: '委託監造廠商專區', quantityLastMonth: '0', thisMonthQuantity: '0', fullQuantity: '2' },
  { systemCode: 'EN BL', systemName: '建物巡查管理系統(委外監造)', quantityLastMonth: '4', thisMonthQuantity: '0', fullQuantity: '12' },
]

const currentDateTime = ref('')

onMounted(() => {
  updateDateTime()
})

function updateDateTime() {
  const now = new Date()
  const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
  currentDateTime.value = formattedDateTime
}

function reset() {
  criteria.operatingSystem = ''
  criteria.unitOfUse = ''
  criteria.dateValue = ''
  queryResult.items = []
  queryResult.totalItemCount = 0
  showDateTime.value = false
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="使用紀錄資料統計">
          <el-form label-width="auto" class="form-max-width">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="應用系統">
                  <el-select
                    v-model="criteria.operatingSystem" placeholder="---不篩選---"
                    style="width: 240px"
                  >
                    <el-option
                      v-for="item in operatingSystemOptions" :key="item.value"
                      :label="item.label" :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="使用單位">
              <el-select v-model="criteria.unitOfUse" placeholder="請選擇" style="width: 240px">
                <el-option
                  v-for="item in unitOfUseOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="日期">
                  <div class="demo-date-picker">
                    <div class="block">
                      <el-date-picker
                        v-model="criteria.dateValue" type="daterange"
                        range-separator="至" start-placeholder="起" end-placeholder="迄"
                        :size="size"
                      />
                    </div>
                  </div>
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
            <el-col v-if="showDateTime" :span="20">
              <el-text>查詢日期/時間 : {{ currentDateTime }}</el-text>
            </el-col>
          </el-row>
        </el-card>
        <el-card header="查詢結果" class="mt-4">
          <el-row>
            <el-col :span="16">
              <el-pagination
                v-if="queryResult.totalItemCount > 0"
                v-model:current-page="queryResult.pageNumber" v-model:page-size="queryResult.pageSize"
                layout="total" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <el-table-column label="#">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="systemCode" label="系統代碼" />
            <el-table-column prop="systemName" label="系統名稱" />
            <el-table-column prop="quantityLastMonth" label="上月數量(人次)" />
            <el-table-column prop="thisMonthQuantity" label="本月數量(人次)" />
            <el-table-column prop="fullQuantity" label="全部數量(人次)" />
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
  </AdminContainer>
</template>
