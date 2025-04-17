<script setup lang="ts">
import { ElCheckbox, ElMessageBox } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  testNumber: '',
  testName: '',
  experimenter: '',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())
// 初核者button   無=0 分派=1 取消分派=2 退回、核定、瀏覽=3 退回=4 瀏覽=5
// 試驗者button   無=0 退回、開始試驗=1 填寫數據、結束試驗=2 被退回再次試驗=3 瀏覽=4
const datas = [
  { testNumber: '2024001', color: '#E6A23C', testName: 'ph值檢驗', sampleCollectionDate: '20240101', completionDate: '20240102', testSpecifications: 'CNS 10006:1984', experimenter: '', pilotProjectStatus: '未分派', beginnerFunction: '1', experimenterFunction: '0' },
  { testNumber: '2024002', color: '#67C23A', testName: '鋼筋外觀尺寸試驗', sampleCollectionDate: '20240102', completionDate: '20240103', testSpecifications: 'CNS 10007:2000', experimenter: '方大同', pilotProjectStatus: '已分派', beginnerFunction: '2', experimenterFunction: '1' },
  { testNumber: '2024003', color: '#F56C6C', testName: '鋼筋抗拉試驗', sampleCollectionDate: '20240103', completionDate: '20240104', testSpecifications: 'CNS 10006:1981', experimenter: '', pilotProjectStatus: '退回分派', beginnerFunction: '1', experimenterFunction: '0' },
  { testNumber: '2024004', color: '#409EFF', testName: '鋼筋抗彎試驗', sampleCollectionDate: '20240104', completionDate: '20240105', testSpecifications: 'CNS 10005:1980', experimenter: '王小弈', pilotProjectStatus: '試驗中', beginnerFunction: '0', experimenterFunction: '2' },
  { testNumber: '2024005', color: '#409EFF', testName: '工程材料輻射量測驗', sampleCollectionDate: '20240105', completionDate: '20240106', testSpecifications: 'CNS 10006:1984', experimenter: '李衛泰', pilotProjectStatus: '初核中', beginnerFunction: '3', experimenterFunction: '4' },
  { testNumber: '2024006', color: '#F56C6C', testName: '鋼筋硬度試驗', sampleCollectionDate: '20240106', completionDate: '20240107', testSpecifications: 'CNS 10006:1988', experimenter: '張一人', pilotProjectStatus: '退回試驗', beginnerFunction: '2', experimenterFunction: '1' },
  { testNumber: '2024007', color: '#67C23A', testName: '鋼筋化性試驗', sampleCollectionDate: '20240107', completionDate: '20240108', testSpecifications: 'CNS 10006:1990', experimenter: '陳方會', pilotProjectStatus: '已核定', beginnerFunction: '5', experimenterFunction: '4' },
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
const dispatchVisible = ref(false)
function handleClose(done: () => void) {
  ElMessageBox.confirm('不儲存離開?')
    .then(() => {
      done()
    })
    .catch(() => {
    })
}
const dispatchDatas = ref([{ testNumber: '', testName: '', testSpecifications: '', completionDate: '', samplingTime: '', experimenter: '' }])
const experimenterOptions = [
  { value: 'ChenFanghui', label: '陳方慧' },
  { value: 'KhalilFong', label: '方大同' },
  { value: 'WangXiaoyi', label: '王小奕' },
  { value: 'LiWeitai', label: '李衛泰' },
  { value: 'ZhangYiren', label: '張一人' },
]
function getRow(row) {
  dispatchDatas.value = [{
    testNumber: row.testNumber,
    testName: row.testName,
    testSpecifications: row.testSpecifications,
    completionDate: row.completionDate,
    samplingTime: '',
    experimenter: '',
  }]
  console.log(row)
  console.log(dispatchDatas.value)
  dispatchVisible.value = true
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
            <el-form-item label="試驗編號：">
              <el-input v-model="criteria.testNumber" />
            </el-form-item>
            <el-form-item label="試驗名稱：">
              <el-input v-model="criteria.testName" />
            </el-form-item>
            <el-form-item label="試驗狀態：">
              <ElCheckbox
                v-model="checkAll" :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                全部
              </ElCheckbox>
              <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                <ElCheckbox
                  v-for="statusCheck in status" :key="statusCheck" :label="statusCheck"
                  :value="statusCheck"
                >
                  {{ statusCheck }}
                </ElCheckbox>
              </el-checkbox-group>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="24">
                <ClientOnly>
                  <el-button plain type="primary" @click="search('')">
                    <AdminIcon name="i-carbon:search" class="pr-1" />
                    查詢
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
            <el-col :span="8" />
          </el-row>
          <el-table :data="queryResult.items" border stripe style="width: 100%">
            <el-table-column label="#" width="55">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="testNumber" label="試驗編號" />
            <el-table-column prop="testName" label="試驗名稱" />
            <el-table-column label="收樣日期　完成日期" width="150">
              <template #default="{ row }">
                <el-text>{{ row.sampleCollectionDate }}</el-text><br>
                <el-text>{{ row.completionDate }}</el-text>
              </template>
            </el-table-column>
            <el-table-column prop="experimenter" label="試驗者" />
            <el-table-column prop="pilotProjectStatus" label="試驗項目狀態">
              <template #default="{ row }">
                <div :style="{ color: row.color }">
                  {{ row.pilotProjectStatus }}
                </div>
              </template>
            </el-table-column>

            <!-- 試驗者button   無=[0]﹎ 退回、開始試驗=[1]﹎ 填寫數據、結束試驗=[2]﹎ 被退回再次試驗=[3]﹎ 瀏覽=[4]  -->
            <el-table-column prop="experimenterFunction" label="試驗者功能" align="center">
              <template #default="{ row }">
                <ClientOnly v-if="row.experimenterFunction === '0'" />
                <ClientOnly v-if="row.experimenterFunction === '1'">
                  <el-button type="success">
                    開始試驗
                  </el-button><br>
                  <el-button type="danger">
                    退回
                  </el-button>
                </ClientOnly>
                <ClientOnly v-if="row.experimenterFunction === '2'">
                  <el-button type="info" @click="navigateTo({ path: '/admin/experimentalProjectFeatures/FillInTheData' })">
                    填寫數據
                  </el-button><br>
                  <el-button type="warning">
                    結束試驗
                  </el-button>
                </ClientOnly>
                <ClientOnly v-if="row.experimenterFunction === '3'">
                  <el-button type="success">
                    開始試驗
                  </el-button>
                </ClientOnly>
                <ClientOnly v-if="row.experimenterFunction === '4'">
                  <el-button type="primary" @click="navigateTo({ path: '/admin/experimentalProjectFeatures/FillIn' })">
                    瀏覽
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
    <el-dialog v-model="dispatchVisible" title="分派作業" :before-close="handleClose" center>
      <el-table :data="dispatchDatas" stripe style="width: 100%">
        <el-table-column prop="testNumber" label="試驗編號" />
        <el-table-column prop="testName" label="試驗項目" />
        <el-table-column prop="testSpecifications" label="試驗規範" />
        <el-table-column prop="samplingTime" label="分樣時間" />
        <el-table-column prop="experimenter" label="試驗者">
          <template #default="{ row }">
            <el-select v-model="row.experimenter" placeholder="請選擇">
              <el-option
                v-for="item in experimenterOptions" :key="item.value" :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dispatchVisible = false">
            確定分派
          </el-button>
          <el-button @click="dispatchVisible = false">
            取消分派
          </el-button>
        </div>
      </template>
    </el-dialog>
  </AdminContainer>
</template>
