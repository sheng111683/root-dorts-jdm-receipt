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
  testOverDate: '',
  writingOverDate: '',
  signOverDate: '',
  reportTemplate: '',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())
// 繕打者功能--看不到此筆=[0]、開始繕打=[1]、修改=[2]、分派簽署=[3]、瀏覽=[4]
// 簽署者功能--看不到此筆=[0]、簽署=[1]、退回=[2]、瀏覽=[3]
const datas = [
  { testNumber: '2024001', color: '#67C23A', testName: 'ph值檢驗', testOverDate: '20240106', experimenter: '郭嘉富', writingOverDate: '', writingker: '', signOverDate: '', signker: '', writingStatus: '已核定', writingkerFunction: ['1'], signkerFunction: ['0'] },
  { testNumber: '2024002', color: '#67C23A', testName: '鋼筋外觀尺寸試驗', testOverDate: '20240106', experimenter: '方大同', writingOverDate: '', writingker: '', signOverDate: '', signker: '', writingStatus: '已核定', writingkerFunction: ['1'], signkerFunction: ['0'] },
  { testNumber: '2024004', color: '#409EFF', testName: '鋼筋抗彎試驗', testOverDate: '20240104', experimenter: '王小奕', writingOverDate: '', writingker: '林植根', signOverDate: '', signker: '', writingStatus: '繕打中', writingkerFunction: ['2', '3'], signkerFunction: ['0'] },
  { testNumber: '2024003', color: '#409EFF', testName: '鋼筋抗拉試驗', testOverDate: '20240105', experimenter: '鍋蓋頭', writingOverDate: '', writingker: '法蘭克', signOverDate: '', signker: '', writingStatus: '繕打中', writingkerFunction: ['2', '3'], signkerFunction: ['0'] },
  { testNumber: '2024007', color: '#F56C6C', testName: '鋼筋化性試驗', testOverDate: '20240102', experimenter: '陳方會', writingOverDate: '', writingker: '趙活', signOverDate: '', signker: '', writingStatus: '退回繕打', writingkerFunction: ['2', '3'], signkerFunction: ['0'] },
  { testNumber: '2024005', color: '#E6A23C', testName: '工程材料輻射量測驗', testOverDate: '20240103', experimenter: '李衛泰', writingOverDate: '20240104', writingker: '張阿三', signOverDate: '', signker: '', writingStatus: '未簽署', writingkerFunction: ['4'], signkerFunction: ['1', '2'] },
  { testNumber: '2024006', color: '#67C23A', testName: '鋼筋硬度試驗', testOverDate: '20240101', experimenter: '張一人', writingOverDate: '20240102', writingker: '雨超達', signOverDate: '20240103', signker: '課長', writingStatus: '已簽署', writingkerFunction: ['4'], signkerFunction: ['3'] },
]
function handleCurrentChange(val) {
  search(val)
}

const checkAll = ref(true)
const isIndeterminate = ref(false)
const checkedStatus = ref(['已核定', '繕打中', '未簽署', '已簽署', '退回繕打'])
const status = ['已核定', '繕打中', '未簽署', '已簽署', '退回繕打']

function handleCheckAllChange(val: boolean) {
  checkedStatus.value = val ? status : []
  isIndeterminate.value = false
}
function handleCheckedStatusChange(value: string[]) {
  const checkedCount = value.length
  checkAll.value = checkedCount === status.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < status.length
}
// 報告繕打DialogVisible
const reportingDialogVisible = ref(false)
const reportTemplateOptions = [
  { value: 'Concrete', label: '鋼筋混泥土用竹節鋼筋試驗' },
  { value: 'Exterior', label: '鋼筋外觀尺寸試驗' },
  { value: 'Tensile', label: '鋼筋抗拉試驗' },
  { value: 'BendingResistance', label: '鋼筋抗彎試驗' },
]
function reportingHandleClose(done: () => void) {
  ElMessageBox.confirm('即將離開視窗?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
function reportingJump(fillInTheDataType: string) {
  reportingDialogVisible.value = false
  navigateTo({ path: '/admin/experimentalProjectFeatures/FillInTheData', query: { fillInTheDataType } })
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
  criteria.testOverDate = ''
  criteria.writingOverDate = ''
  criteria.signOverDate = ''
  checkedStatus.value = ['已核定', '繕打中', '未簽署', '已簽署', '退回繕打']
  checkAll.value = true
  isIndeterminate.value = false
  queryResult.items = []
  queryResult.totalItemCount = 0
}
const dispatchVisible = ref(false)
const dispatchDatas = ref([{ testNumber: '', testName: '', experimenter: '', writingker: '', signker: '' }])
const signkers = [
  { value: 'ChenFanghui', label: '課長' },
]
function getRow(row) {
  dispatchDatas.value = [{
    testNumber: row.testNumber,
    testName: row.testName,
    experimenter: row.experimenter,
    writingker: row.writingker,
    signker: '',
  }]
  dispatchVisible.value = true
}
function handleClose(done: () => void) {
  ElMessageBox.confirm('不儲存離開?')
    .then(() => {
      done()
    })
    .catch(() => {
    })
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="撰寫報告功能">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="試驗編號：">
              <el-input v-model="criteria.testNumber" />
            </el-form-item>
            <el-form-item label="試驗名稱：">
              <el-input v-model="criteria.testName" />
            </el-form-item>
            <el-form-item label="試驗完成日期：">
              <el-date-picker
                v-model="criteria.testOverDate"
                type="daterange"
                range-separator="~"
                start-placeholder="起"
                end-placeholder="迄"
              />
            </el-form-item>
            <el-form-item label="繕打完成日期：">
              <el-date-picker
                v-model="criteria.writingOverDate"
                type="daterange"
                range-separator="~"
                start-placeholder="起"
                end-placeholder="迄"
              />
            </el-form-item>
            <el-form-item label="簽署完成日期：">
              <el-date-picker
                v-model="criteria.signOverDate"
                type="daterange"
                range-separator="~"
                start-placeholder="起"
                end-placeholder="迄"
              />
            </el-form-item>
            <el-form-item label="撰寫狀態：">
              <el-col :span="24">
                <ElCheckbox
                  v-model="checkAll" :indeterminate="isIndeterminate"
                  @change="handleCheckAllChange"
                >
                  全部
                </ElCheckbox>
              </el-col>
              <el-col :span="24">
                <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                  <ElCheckbox
                    v-for="statusCheck in status" :key="statusCheck" :label="statusCheck"
                    :value="statusCheck"
                  >
                    {{ statusCheck }}
                  </ElCheckbox>
                </el-checkbox-group>
              </el-col>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="24">
                <ClientOnly>
                  <el-button type="primary" plain @click="search('')">
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
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <el-table-column label="#" width="55">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="testNumber" label="試驗編號" sortable />
            <el-table-column prop="testName" label="試驗名稱" sortable />
            <el-table-column prop="testOverDate" label="試驗完成日期" sortable />
            <el-table-column prop="experimenter" label="試驗者" sortable />
            <el-table-column prop="writingOverDate" label="繕打完成日期" sortable />
            <el-table-column prop="writingker" label="繕打者" sortable />
            <el-table-column prop="signOverDate" label="簽署完成日期" sortable />
            <el-table-column prop="signker" label="簽署者" sortable />
            <el-table-column prop="writingStatus" label="撰寫狀態" sortable>
              <template #default="{ row }">
                <div :style="{ color: row.color }">
                  {{ row.writingStatus }}
                </div>
              </template>
            </el-table-column>
            <!-- 繕打者功能--看不到此筆=[0]、開始繕打=[1]、修改=[2]、分派簽署=[3]、瀏覽=[4] -->
            <el-table-column prop="writingkerFunction" label="繕打者功能" align="center" width="170">
              <template #default="{ row }">
                <ClientOnly v-for="(writingkerFunction) in row.writingkerFunction" :key="writingkerFunction">
                  <el-col :span="24">
                    <a v-if="writingkerFunction === '0'">看不到此筆</a>
                    <el-button v-if="writingkerFunction === '1'" type="success" @click="reportingDialogVisible = true">
                      開始繕打
                    </el-button>
                    <el-button v-if="writingkerFunction === '2'" type="success" @click="reportingJump('edit')">
                      修改
                    </el-button>
                    <el-button v-if="writingkerFunction === '3'" type="warning" @click="getRow(row)">
                      分派簽署
                    </el-button>
                    <el-button v-if="writingkerFunction === '4'" type="primary" @click="reportingJump('sign')">
                      瀏覽
                    </el-button>
                  </el-col>
                </ClientOnly>
              </template>
            </el-table-column>
          </el-table>
          <!-- ---------報告繕打對話框--------- -->
          <el-dialog
            v-model="reportingDialogVisible" title="選擇報告樣板" :before-close="reportingHandleClose"
            align-center
          >
            <el-select v-model="criteria.reportTemplate" placeholder="選擇報告樣板">
              <el-option
                v-for="item in reportTemplateOptions" :key="item.value" :label="item.label"
                :value="item.value"
              />
            </el-select>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="reportingDialogVisible = false">
                  取消
                </el-button>
                <el-button type="primary" @click="reportingJump('sign')">
                  確定
                </el-button>
              </div>
            </template>
          </el-dialog>
          <!-- ---------報告繕打對話框--------- -->
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
        <el-table-column prop="experimenter" label="試驗者" />
        <el-table-column prop="writingker" label="繕打者" />
        <el-table-column prop="signker" label="簽署者">
          <template #default="{ row }">
            <el-select v-model="row.signker" placeholder="請選擇">
              <el-option
                v-for="item in signkers" :key="item.value" :label="item.label"
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
