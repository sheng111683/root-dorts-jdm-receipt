<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  getDefulatSysLogFileDownloadCriteria,
  getSysLogFileDownloadQueryResult,
} from '~/models'

definePageMeta({ layout: 'admin' })
const title = useRouteMetaTitle()
const { $api } = useNuxtApp()
const { isSmAndUp } = useGlobal()
const criteria = reactive(getDefulatSysLogFileDownloadCriteria())

const queryResult = reactive(getSysLogFileDownloadQueryResult())

async function search() {
  const sysLogFileDownloadResponse = await $api.v1.SysLogFileDownload.Get(criteria)

  Object.assign(queryResult, sysLogFileDownloadResponse)
}
function reset() {
  Object.assign(criteria, getDefulatSysLogFileDownloadCriteria())
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
        <el-card :header="title">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="帳號">
              <el-input v-model="criteria.accessUserId" />
            </el-form-item>
            <el-form-item label="來源IP">
              <el-input v-model="criteria.remoteIp" />
            </el-form-item>
            <el-form-item label="資料表名稱">
              <el-input v-model="criteria.tableName" />
            </el-form-item>
            <el-form-item label="檔案名稱">
              <el-input v-model="criteria.fileName" />
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
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <el-table-column label="#">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="accessUserId" label="帳號" />
            <el-table-column prop="remoteIp" label="來源IP" />
            <el-table-column prop="tableName" label="資料表名稱" />
            <el-table-column prop="fileName" label="檔案名稱" />
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
