<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus'
import {
  getDefulatSysLogAccessCriteria,
  getSysLogAccessQueryResult,
} from '~/models'

definePageMeta({ layout: 'admin' })
const title = useRouteMetaTitle()
const { $api } = useNuxtApp()
const permissionStore = usePermissionStore()
const { isView } = storeToRefs(permissionStore)
const { isSmAndUp } = useGlobal()
const criteria = reactive(getDefulatSysLogAccessCriteria())

const queryResult = reactive(getSysLogAccessQueryResult())
const accessTimeValue = ref<string[]>([])
function dateChenge() {
  let startDate = accessTimeValue.value[0]
  let endDate = accessTimeValue.value[1]
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
  const sysLogAccessResponse = await $api.v1.SysLogAccess.Get(criteria)
  Object.assign(queryResult, sysLogAccessResponse)
  queryResult.items = queryResult.items.map((item) => {
    if (item.createDate) {
      const date = new Date(item.createDate)
      item.createDate = date.toISOString().split('T')[0].replace(/-/g, '/')
    }
    return item
  })
}
function reset() {
  accessTimeValue.value = []
  Object.assign(criteria, getDefulatSysLogAccessCriteria())
}
function handleCurrentChange(val: number) {
  criteria.pageNumber = val
  search()
}
function handleEdit(encryptionId: string) {
  navigateTo({ path: '/admin/sysLogAccess/ViewPage', query: { encryptionId } })
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
            <el-form-item label="來源IP">
              <el-input v-model="criteria.remoteIp" />
            </el-form-item>
            <el-form-item label="控制器顯示名稱">
              <el-input v-model="criteria.controllerDisplayName" />
            </el-form-item>
            <el-form-item label="方法顯示名稱">
              <el-input v-model="criteria.actionDisplayName" />
            </el-form-item>
            <el-form-item label="訪問時間">
              <div class="demo-date-picker">
                <div class="block">
                  <el-date-picker
                    v-model="accessTimeValue"
                    :clearable="false" type="daterange" range-separator="至" start-placeholder="開始日期"
                    end-placeholder="結束日期" @change="dateChenge"
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
                v-if="queryResult.totalItemCount > 0" v-model:current-page="queryResult.pageNumber"
                v-model:page-size="queryResult.pageSize" :layout="`total, prev${isSmAndUp ? ', pager' : ''}, next, jumper`"
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
            <el-table-column prop="sysUser" label="帳號" />
            <el-table-column prop="controllerName" label="控制器名稱" />
            <el-table-column prop="actionName" label="方法名稱" />
            <el-table-column prop="areaName" label="區域名稱" />
            <el-table-column prop="controllerDisplayName" label="控制器顯示名稱" />
            <el-table-column prop="actionDisplayName" label="方法顯示名稱" />
            <el-table-column prop="remoteIp" label="來源IP" />
            <el-table-column label="動作" width="160">
              <template #default="scope">
                <ClientOnly>
                  <el-button v-if="isView" type="success" size="small" @click="handleEdit(scope.row.encryptionId)">
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
