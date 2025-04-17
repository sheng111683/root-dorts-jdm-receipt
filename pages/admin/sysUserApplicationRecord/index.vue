<script setup lang="ts">
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  operatingSystem: 'DG',
  userAccount: '',
  userName: '',
  dateValue: '',
  serviceUnits: '',
  serviceUnitsOf: '',
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

function handleCurrentChange(val) {
  search(val)
}

const datas = [
  { dateTime: '2024/04/30 08:00:00', loginID: '00ae99538380a7853b91911ee990085v79', username: '鱻犇鼁', systemCode: 'DG', unitCode: 'C0000085', results: '成功[團隊專區登入]' },
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
  criteria.userAccount = ''
  criteria.dateValue = ''
  criteria.serviceUnits = ''
  criteria.userName = ''
  queryResult.items = []
  queryResult.totalItemCount = 0
  showDateTime.value = false
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="使用者申請紀錄查詢">
          <el-form label-width="auto" class="form-max-width">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="應用系統">
                  <el-select
                    v-model="criteria.operatingSystem" placeholder="請選擇"
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
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="使用者帳號">
                  <el-input v-model="criteria.userAccount" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="使用者姓名">
                  <el-input v-model="criteria.userName" />
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
            <el-table-column prop="dateTime" label="日期/時間" />
            <el-table-column prop="loginID" label="登入ID" />
            <el-table-column prop="username" label="使用者姓名" />
            <el-table-column prop="systemCode" label="系統代碼" />
            <el-table-column prop="unitCode" label="單位代碼" />
            <el-table-column prop="results" label="作業結果" />
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
