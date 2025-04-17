<script setup lang="ts">
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const permissionStore = usePermissionStore()
const { isAdd, isEdit, isRemoved } = storeToRefs(permissionStore)
const loginTimeNow = new Date().toLocaleString()
const criteria = reactive({
  pilotProjects: '',
  openType: '',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())
const datas = [
  { pilotProjects: '鋼筋外觀尺寸試驗', test: '竹節鋼筋', remark: '', openType: '上架', creationDate: '2024/06/20' },
  { pilotProjects: '鋼筋抗拉試驗', test: '竹節鋼筋', remark: '', openType: '上架', creationDate: '2024/01/17' },
  { pilotProjects: '鋼筋抗彎試驗', test: '竹節鋼筋', remark: '', openType: '上架', creationDate: '2023/12/01' },
  { pilotProjects: '工程材料輻射量檢測', test: '竹節鋼筋', remark: '', openType: '上架', creationDate: '2023/11/29' },
  { pilotProjects: '鋼筋硬度試驗	', test: '竹節鋼筋', remark: '', openType: '上架', creationDate: '2023/07/28' },
]
const openTypes = [
  {
    value: 'ALL',
    label: '全部',
  },
  {
    value: 'OPEN',
    label: '上架',
  },
  {
    value: 'NOOPEN',
    label: '下架',
  },
]
function handleCurrentChange(val) {
  search(val)
}

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

function resetForm() {
  criteria.pilotProjects = ''
  criteria.openType = ''
  queryResult.items = []
  queryResult.totalItemCount = 0
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="試驗項目樣板">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="試驗項目：">
              <el-input v-model="criteria.pilotProjects" />
            </el-form-item>
            <el-form-item label="上架狀態：">
              <el-select v-model="criteria.openType" placeholder="請選擇">
                <el-option
                  v-for="item in openTypes" :key="item.value"
                  :label="item.label" :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="24">
                <ClientOnly>
                  <el-button type="primary" plain @click="search('')">
                    <AdminIcon name="i-carbon:search" class="pr-1" />
                    查詢
                  </el-button>
                </ClientOnly>
                <el-button plain @click="resetForm()">
                  <AdminIcon name="i-carbon:reset" class="pr-1" />
                  重設
                </el-button>
              </el-col>
            </el-row>
          </el-form>
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
                  @click="navigateTo({ path: '/admin/pilotProjectSample/Edit' })"
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
            <el-table-column prop="pilotProjects" label="試驗項目" />
            <el-table-column prop="test" label="試驗" />
            <el-table-column prop="remark" label="備註" />
            <el-table-column prop="openType" label="上架狀態" align="center" />
            <el-table-column prop="creationDate" label="建立日期" />
            <el-table-column label="動作" width="160">
              <ClientOnly>
                <el-button-group>
                  <el-col :span="24">
                    <el-button
                      type="primary"
                      @click="navigateTo({ path: '/admin/pilotProjectSample/Edit' })"
                    >
                      <AdminIcon name="i-carbon:edit" class="pr-1" />
                      編輯
                    </el-button>
                  </el-col>
                  <el-col :span="24">
                    <el-button type="danger">
                      <AdminIcon name="i-carbon:delete" class="pr-1" />
                      刪除
                    </el-button>
                  </el-col>
                </el-button-group>
              </ClientOnly>
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
