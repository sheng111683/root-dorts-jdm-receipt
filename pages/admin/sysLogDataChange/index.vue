<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus'
import {
  getDefulatSysLogDataChangeCriteria,
  getSysLogDataChangeQueryResult,
} from '~/models'

definePageMeta({ layout: 'admin' })
const title = useRouteMetaTitle()
const { $api } = useNuxtApp()
const permissionStore = usePermissionStore()
const { isView } = storeToRefs(permissionStore)
const { isSmAndUp } = useGlobal()
const criteria = reactive(getDefulatSysLogDataChangeCriteria())

const queryResult = reactive(getSysLogDataChangeQueryResult())

const changeTimeValue = ref<string[]>([])
function dateChenge() {
  let startDate = changeTimeValue.value[0]
  let endDate = changeTimeValue.value[1]
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
    // endDateObj.setDate(endDateObj.getDate() + 1)// 加一天
    const year = endDateObj.getFullYear()
    const month = String(endDateObj.getMonth() + 1).padStart(2, '0')
    const day = String(endDateObj.getDate()).padStart(2, '0')
    endDate = `${year}/${month}/${day}`
    criteria.endCreateDate = endDate
  }
}
async function search() {
  const sysLogDataChangeResponse = await $api.v1.SysLogDataChange.Get(criteria)
  Object.assign(queryResult, sysLogDataChangeResponse)
  queryResult.items = queryResult.items.map((item) => {
    if (item.createDate) {
      const date = new Date(item.createDate)
      item.createDate = date.toISOString().split('T')[0].replace(/-/g, '/')
    }
    return item
  })
}
function reset() {
  changeTimeValue.value = []
  Object.assign(criteria, getDefulatSysLogDataChangeCriteria())
}
function handleCurrentChange(val: number) {
  criteria.pageNumber = val
  search()
}
function handleView(encryptionId: string) {
  navigateTo({ path: '/admin/sysLogDataChange/ViewPage', query: { encryptionId } })
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card :header="title">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="帳號">
              <el-input v-model="criteria.sysUser" />
            </el-form-item>
            <el-form-item label="資料表名稱">
              <el-input v-model="criteria.tableName" />
            </el-form-item>
            <el-form-item label="修改欄位">
              <el-input v-model="criteria.keyValues" />
            </el-form-item>
            <el-form-item label="建立日期">
              <div class="demo-date-picker">
                <div class="block">
                  <el-date-picker
                    v-model="changeTimeValue"
                    :clearable="false" type="daterange" range-separator="至"
                    start-placeholder="開始日期" end-placeholder="結束日期" @change="dateChenge"
                  />
                </div>
              </div>
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
                v-if="queryResult.totalItemCount > 0"
                v-model:current-page="queryResult.pageNumber" v-model:page-size="queryResult.pageSize"
                :layout="`total, prev${isSmAndUp ? ', pager' : ''}, next, jumper`" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%" :fit="true">
            <el-table-column label="#">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="sysUser" label="帳號" />
            <el-table-column prop="tableName" label="資料表名稱" />
            <el-table-column prop="keyValues" label="修改欄位" />
            <el-table-column prop="requestId" label="系統請求序號" />
            <el-table-column prop="createDate" label="建立時間" />
            <el-table-column label="動作" width="160">
              <template #default="scope">
                <ClientOnly>
                  <el-button v-if="isView" type="success" size="small" @click="handleView(scope.row.encryptionId)">
                    <AdminIcon name="i-carbon:view" class="pr-1" />
                    查看
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
  </AdminContainer>
</template>
