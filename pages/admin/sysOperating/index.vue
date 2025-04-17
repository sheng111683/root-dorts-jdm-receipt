<script setup lang="ts">
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  registrationInquiry: '',
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
  { systemCode: 'BR', systemName: '禁限建範圍公告查詢系統', maintenancePersonnel: '唐經魁', contactNumber: '8020', email: 'tjk@gov.taipei', sharedAccount: '否', state: '使用中' },
  { systemCode: 'DBI', systemName: '損鄰事件管理系統', maintenancePersonnel: '蔡定智', contactNumber: '8020', email: '---', sharedAccount: '是', state: '已停用' },
  { systemCode: 'DG', systemName: '捷運團隊專區', maintenancePersonnel: '李俊德', contactNumber: '02-25215550-8021', email: 'tms_chunte@gov.taipei', sharedAccount: '是', state: '使用中' },
  { systemCode: 'EN', systemName: '委託監造廠商專區', maintenancePersonnel: '李俊德', contactNumber: '02-25215550-8021', email: 'tms_chunte@gov.taipei', sharedAccount: '是', state: '使用中' },
  { systemCode: 'EN_BL', systemName: '建物巡查管理系統(委外監造)', maintenancePersonnel: '唐經魁', contactNumber: '8020', email: 'tjk@gov.taipei', sharedAccount: '是', state: '已停用' },
  { systemCode: 'EN_DCS', systemName: '督工管理系統(委外監造)', maintenancePersonnel: '唐經魁', contactNumber: '02-25215550-8020', email: 'tjk@gov.taipei', sharedAccount: '是', state: '已停用' },
]
function reset() {
  criteria.registrationInquiry = ''
  queryResult.items = []
  queryResult.totalItemCount = 0
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="應用系統清單維護">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="查詢">
              <el-input v-model="criteria.registrationInquiry" />
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
                layout="total, prev, pager, next, jumper" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
            <el-col :span="8">
              <ClientOnly>
                <el-button
                  type="primary" float="right"
                  @click="navigateTo({ path: '/admin/sysOperating/AddManufacturerPersonnel' })"
                >
                  <AdminIcon name="i-carbon:add" class="pr-1" />
                  新增
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <el-table-column label="#" width="55">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="systemCode" label="系統代碼" />
            <el-table-column prop="systemName" label="系統名稱" />
            <el-table-column prop="maintenancePersonnel" label="維護人員" />
            <el-table-column prop="contactNumber" label="連絡電話" />
            <el-table-column prop="email" label="電子郵件" />
            <el-table-column prop="state" label="系統狀態" />
            <el-table-column label="動作" width="160">
              <template #default="scope">
                <ClientOnly>
                  <el-button
                    type="primary" size="small"
                    @click="navigateTo({ path: '/admin/sysOperating/Edit' })"
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
