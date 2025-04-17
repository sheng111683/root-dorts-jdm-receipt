<script setup lang="ts">
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  overdueNotice: '',
  search: '',
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

function handleCurrentChange(val) {
  search(val)
}

const datas = [
  { announcementCode: '20240430-DG-001', startTime: '2024/04/30 08:00:00', endTime: '2024/05/30 08:00:00', releaseArea: 'DG', announcementContent: '主機異常，已解決，可正常使用', relatedLinks: '', deactivate: 'N' },
  { announcementCode: '20240430-DG-001', startTime: '2024/04/30 08:00:00', endTime: '2024/05/30 08:00:00', releaseArea: 'DG', announcementContent: '主機異常，已解決，可正常使用', relatedLinks: '', deactivate: 'N' },
  { announcementCode: '20240430-DG-001', startTime: '2024/04/30 08:00:00', endTime: '2024/05/30 08:00:00', releaseArea: 'DG', announcementContent: '主機異常，已解決，可正常使用', relatedLinks: '', deactivate: 'N' },
  { announcementCode: '20240430-DG-001', startTime: '2024/04/30 08:00:00', endTime: '2024/05/30 08:00:00', releaseArea: 'DG', announcementContent: '主機異常，已解決，可正常使用', relatedLinks: '', deactivate: 'N' },
]

function reset() {
  criteria.overdueNotice = ''
  criteria.search = ''
  queryResult.items = []
  queryResult.totalItemCount = 0
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="系統公告維護">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="顯示 : ">
              <el-checkbox v-model="criteria.overdueNotice" label="逾期公告" />
            </el-form-item>
            <el-form-item label="查詢">
              <el-input v-model="criteria.search" />
            </el-form-item>
          </el-form>
          <el-row :gutter="20">
            <el-col :span="16">
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
            <el-col :span="16">
              <el-pagination
                v-if="queryResult.totalItemCount > 0"
                v-model:current-page="queryResult.pageNumber" v-model:page-size="queryResult.pageSize"
                layout="total" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
            <el-col :span="8">
              <ClientOnly>
                <el-button
                  type="primary" float="right"
                  @click="navigateTo({ path: '/admin/systemNotification/Edit' })"
                >
                  <AdminIcon name="i-carbon:add" class="pr-1" />
                  新增
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <el-table-column prop="announcementCode" label="公告代碼" />
            <el-table-column prop="startTime" label="公告開始時間" />
            <el-table-column prop="endTime" label="公告結束時間" />
            <el-table-column prop="releaseArea" label="發布區域" />
            <el-table-column prop="announcementContent" label="公告內容" />
            <el-table-column prop="relatedLinks" label="相關連結" />
            <el-table-column prop="deactivate" label="停用" />
            <el-table-column label="動作" width="160">
              <template #default="scope">
                <ClientOnly>
                  <el-button
                    type="primary" size="small"
                    @click="navigateTo({ path: '/admin/systemNotification/Edit' })"
                  >
                    <AdminIcon name="i-carbon:edit" class="pr-1" />
                    編輯
                  </el-button>
                  <el-button size="small" type="danger">
                    <AdminIcon name="i-carbon:delete" class="pr-1" />
                    移除
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
