<script setup lang="ts">
import { ElCheckbox } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  testNumber: '2024001',
  testName: 'ph值檢驗',
  sampleCollectionDate: '20240101',
  completionDate: '20240105',
  experimenter: '',
  pilotProjectStatus: '未分派',
  novice: '分派',
  remark: '看不到此筆',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())

const datas = [
  { testNumber: '2024001', testName: 'ph值檢驗', sampleCollectionDate: '20240101', completionDate: '20240105', experimenter: '', pilotProjectStatus: '未分派', novice: '分派', remark: '看不到此筆' },
  { testNumber: '2024002', testName: '鋼筋外觀尺寸試驗', sampleCollectionDate: '20240102', completionDate: '20240106', experimenter: '方大同', pilotProjectStatus: '已分派', novice: '取消分派', remark: '退回、開始、試驗' },
  { testNumber: '2024003', testName: '鋼筋抗拉試驗', sampleCollectionDate: '20240103', completionDate: '20240107', experimenter: '', pilotProjectStatus: '退回分派', novice: '分派', remark: '看不到此筆' },
  { testNumber: '2024004', testName: '鋼筋抗彎試驗', sampleCollectionDate: '20240104', completionDate: '20240108', experimenter: '王小弈', pilotProjectStatus: '試驗中', novice: '無', remark: '結束試驗' },
  { testNumber: '2024005', testName: '工程材料輻射量測驗', sampleCollectionDate: '20240105', completionDate: '20240109', experimenter: '李衛泰', pilotProjectStatus: '初核中', novice: '退回、核定、瀏覽', remark: '瀏覽' },
  { testNumber: '2024006', testName: '鋼筋硬度試驗', sampleCollectionDate: '20240106', completionDate: '20240110', experimenter: '張一人', pilotProjectStatus: '退回試驗', novice: '退回', remark: '開始試驗' },
  { testNumber: '2024007', testName: '鋼筋化性試驗', sampleCollectionDate: '20240107', completionDate: '20240111', experimenter: '陳方會', pilotProjectStatus: '已核定', novice: '瀏覽', remark: '瀏覽' },
]
function handleCurrentChange(val) {
  search(val)
}

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedStatus = ref(['', ''])
const status = ['未分派', '已分派', '退回分派', '試驗中', '初核中', '退回試驗', '已核定']

function handleCheckAllChange(val: boolean) {
  checkedStatus.value = val ? status : []
  isIndeterminate.value = false
}
function handleCheckedStatusChange(value: string[]) {
  const checkedCount = value.length
  checkAll.value = checkedCount === status.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < status.length
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
  criteria.testNumber = ''
  criteria.testName = ''
  checkedStatus.value = []
  checkAll.value = false
  isIndeterminate.value = false
  queryResult.items = []
  queryResult.totalItemCount = 0
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="試驗項目功能">
          <el-form label-width="auto" class="form-max-width">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="試驗編號：">
                  <el-text v-model="criteria.testNumber">
                    {{ criteria.testNumber }}
                  </el-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="試驗名稱：">
                  <el-text v-model="criteria.testName">
                    {{ criteria.testName }}
                  </el-text>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="試驗狀態：">
                  <ElCheckbox
                    v-model="checkAll" :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange"
                  >
                    全部
                  </ElCheckbox>
                  <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                    <ElCheckbox
                      v-for="statusCheck in status" :key="statusCheck"
                      :label="statusCheck" :value="statusCheck"
                    >
                      {{ statusCheck }}
                    </ElCheckbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <ClientOnly>
                  <el-button type="primary" plain @click="search('')">
                    <AdminIcon name="i-carbon:search" class="pr-1" />
                    儲存
                  </el-button>
                  <el-button plain @click="resetForm()">
                    <AdminIcon name="i-carbon:reset" class="pr-1" />
                    重設
                  </el-button>
                </ClientOnly>
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
                  @click="navigateTo({ path: '/admin/experimentalProjectFeatures/Edit' })"
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
            <el-table-column prop="testNumber" label="試驗編號" />
            <el-table-column prop="testName" label="試驗名稱" />
            <el-table-column prop="sampleCollectionDate" label="收樣日期" />
            <el-table-column prop="completionDate" label="完成日期" />
            <el-table-column prop="experimenter" label="試驗者" />
            <el-table-column prop="pilotProjectStatus" label="試驗項目狀態" />
            <el-table-column prop="novice" label="初核者" />
            <el-table-column prop="remark" label="備註?" />
            <el-table-column label="動作" width="160">
              <template #default="">
                <ClientOnly>
                  <el-button-group>
                    <el-button
                      size="small" type="primary"
                      @click="navigateTo({ path: '/admin/experimentalProjectFeatures/Edit' })"
                    >
                      <AdminIcon name="i-carbon:edit" class="pr-1" />
                      編輯
                    </el-button>
                    <el-button size="small" type="danger">
                      <AdminIcon name="i-carbon:delete" class="pr-1" />
                      刪除
                    </el-button>
                  </el-button-group>
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
