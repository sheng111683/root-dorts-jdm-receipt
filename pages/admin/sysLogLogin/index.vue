<script setup lang="ts">
import {
  getDefulatSysLogLoginCriteria,
  getSysLogLoginQueryResult,
} from '~/models'

definePageMeta({ layout: 'admin' })
const title = useRouteMetaTitle()
const { $api } = useNuxtApp()

const criteria = reactive(getDefulatSysLogLoginCriteria())
const queryResult = reactive(getSysLogLoginQueryResult())

const loginTimeValue = ref<string[]>([])
// 設定日期格式
function dateChenge() {
  let startDate = loginTimeValue.value[0]
  let endDate = loginTimeValue.value[1]
  if (startDate) {
    const startDateObj = new Date(startDate)
    const year = startDateObj.getFullYear()
    const month = String(startDateObj.getMonth() + 1).padStart(2, '0')
    const day = String(startDateObj.getDate()).padStart(2, '0')
    startDate = `${year}/${month}/${day}`
    criteria.startCreateDate = startDate
  }
  if (endDate) {
    const endDateObj = new Date(endDate)
    endDateObj.setDate(endDateObj.getDate() + 1)// 加一天
    const year = endDateObj.getFullYear()
    const month = String(endDateObj.getMonth() + 1).padStart(2, '0')
    const day = String(endDateObj.getDate()).padStart(2, '0')
    endDate = `${year}/${month}/${day}`
    criteria.endCreateDate = endDate
  }
}
async function search() {
  const sysLogLoginResponse = await $api.v1.SysLogLogin.Get(criteria)
  Object.assign(queryResult, sysLogLoginResponse)
  // 日期格式化
  queryResult.items = queryResult.items.map((item) => {
    if (item.createDate) {
      const date = new Date(item.createDate)
      item.createDate = date.toISOString().split('T')[0].replace(/-/g, '/')
    }
    return item
  })
}
function reset() {
  Object.assign(criteria, getDefulatSysLogLoginCriteria())
  loginTimeValue.value = []
}
function handleCurrentChange(val: number) {
  criteria.pageNumber = val
  search()
}
const loginStatusOptions = [
  {
    value: 'SUCCESS',
    label: '成功',
  },
  {
    value: 'FAIL',
    label: '失敗',
  },
  {
    value: 'ACCOUNT_FAIL',
    label: '帳號錯誤',
  },
  {
    value: 'PASSWORD_FAIL',
    label: '密碼輸入錯誤',
  },
  {
    value: 'VALIDCODE_FAIL',
    label: '圖形驗證碼輸入錯誤',
  },
  {
    value: 'ACCOUNT_LOCK',
    label: '帳號鎖定中',
  },
]
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card :header="title">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="登入時間">
              <el-date-picker
                v-model="loginTimeValue"
                :clearable="false" type="daterange" range-separator="至" start-placeholder="開始日期"
                end-placeholder="結束日期" size="default"
                @change="dateChenge"
              />
            </el-form-item>
            <el-form-item label="帳號">
              <el-input v-model="criteria.accessUserId" />
            </el-form-item>
            <el-form-item label="登入IP">
              <el-input v-model="criteria.loginIp" />
            </el-form-item>
            <el-form-item label="備註">
              <el-input v-model="criteria.remark" />
            </el-form-item>
            <el-form-item label="登入狀態">
              <el-select v-model="criteria.loginStatus" placeholder="請選擇" size="large">
                <el-option
                  v-for="item in loginStatusOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <el-row :gutter="20">
            <el-col :span="16">
              <ClientOnly>
                <el-button type="primary" plain @click="search">
                  <AdminIcon name="i-carbon:search" class="pr-1" />
                  查詢
                </el-button>
              </ClientOnly>
              <el-button plain @click="reset()">
                <AdminIcon name="i-carbon:reset" class="pr-1" />
                重設
              </el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card header="查詢結果" class="mt-4">
          <el-row>
            <el-col :span="16">
              <el-pagination
                v-if="queryResult.totalItemCount > 0" v-model:current-page="queryResult.pageNumber"
                v-model:page-size="queryResult.pageSize" layout="total, prev, pager, next, jumper"
                :total="queryResult.totalItemCount" @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <el-table-column label="#">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="accessUserId" label="帳號" />
            <el-table-column prop="loginIp" label="登入IP" />
            <el-table-column prop="loginStatus" label="登入狀態" />
            <el-table-column prop="remark" label="備註" />
            <el-table-column prop="createDate" label="登入時間" />
          </el-table>
          <el-row class="mt-4">
            <el-col :span="16">
              <el-pagination
                v-if="queryResult.totalItemCount > 0" v-model:current-page="queryResult.pageNumber"
                v-model:page-size="queryResult.pageSize" layout="total, prev, pager, next, jumper"
                :total="queryResult.totalItemCount" @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
