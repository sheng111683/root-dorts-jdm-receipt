<script setup lang="ts">
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  registrationSystem: '',
  employeeID: '',
  employeeName: '',
  serviceDepartment: '',
  registrationInquiry: '',
  state: '',
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
  { employeeID: '115057', employeeName: '唐先生', serviceDepartment: 'PM', state: '在職中' },
  { employeeID: '115057', employeeName: '唐先生', serviceDepartment: 'PM', state: '在職中' },
  { employeeID: '115057', employeeName: '唐先生', serviceDepartment: 'PM', state: '在職中' },
  { employeeID: '115057', employeeName: '唐先生', serviceDepartment: 'PM', state: '在職中' },
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
        <el-card header="作業人員權限維護">
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
            <!-- <el-col :span="8">
                            <ClientOnly>
                                <el-button type="primary" float="right"
                                    @click="navigateTo({ path: '/admin/workerPermissions/Edit' })">
                                    <AdminIcon name="i-carbon:add" class="pr-1" />
                                    新增
                                </el-button>
                            </ClientOnly>
                        </el-col> -->
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <!-- <el-table-column label="#" width="55">
                            <template #default="scope">{{ scope.$index + 1 }}</template>
</el-table-column> -->
            <el-table-column prop="employeeID" label="員工編號" />
            <el-table-column prop="employeeName" label="人員姓名" />
            <el-table-column prop="serviceDepartment" label="服務部門" />
            <el-table-column prop="state" label="狀態" />
            <el-table-column label="動作" width="160">
              <template #default="scope">
                <ClientOnly>
                  <el-button
                    type="primary" size="small"
                    @click="navigateTo({ path: '/admin/workerPermissions/Edit' })"
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
