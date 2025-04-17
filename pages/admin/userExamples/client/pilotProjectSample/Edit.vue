<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

const activeName = ref('first')
function handleClick(tab: TabsPaneContext, event: Event) {
  console.log(tab, event)
}
definePageMeta({ layout: 'admin' })
const criteria = reactive({
  pilotProjects: '',
  remark: '',
  specification: '',
  specificationValue: '',
  equipment: '',
  equipmentValue: '',
  report: '',
  sampleName: '',
  kilogram: '',
  bag: '',
  experimentalManuscript: '',
  manuscriptEquipment: '',
  openType: '',

  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())
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
const experimentalManuscriptOptions = [
  {
    value: 'MQ03-04-05粗粒料分次篩析紀錄表',
    label: 'MQ03-04-05粗粒料分次篩析紀錄表',
  },
  {
    value: 'MQ03-04-01粗粒料篩分析試驗紀錄表',
    label: 'MQ03-04-01粗粒料篩分析試驗紀錄表',
  },
]
const pilotProjectsOptions = [
  {
    value: '鋼筋外觀尺寸試驗',
    label: '鋼筋外觀尺寸試驗',
  },
  {
    value: '鋼筋抗拉試驗',
    label: '鋼筋抗拉試驗',
  },
  {
    value: '鋼筋抗彎試驗',
    label: '鋼筋抗彎試驗',
  },
]
const sampleNameOptions = [
  {
    value: '竹節鋼筋',
    label: '竹節鋼筋',
  },
  {
    value: '細沙',
    label: '細沙',
  },
  {
    value: '粗砂',
    label: '粗砂',
  },
  {
    value: '粗細沙',
    label: '粗細沙',
  },
]
const reportOptions = [
  {
    value: '鋼筋混泥土用竹節鋼筋試驗報告',
    label: '鋼筋混泥土用竹節鋼筋試驗報告',
  },
  {
    value: '鋼筋混凝土用竹節鋼筋洛氏硬度試驗報告',
    label: '鋼筋混凝土用竹節鋼筋洛氏硬度試驗報告',
  },
  {
    value: '鋼筋混凝土用竹節鋼筋化性試驗報告',
    label: '鋼筋混凝土用竹節鋼筋化性試驗報告',
  },
]
const equipmentOptions = [
  {
    value: '混和機',
    label: '混和機',
  },
  {
    value: '磅秤',
    label: '磅秤',
  },
  {
    value: '顯微鏡',
    label: '顯微鏡',
  },
]

const datas = [
  { pilotProjects: '', remark: '', specificationValue: '' },
]
interface PilotProject {
  pilotProject: string
}
const pilotProjectsTableData = reactive<PilotProject[]>([])
function addPilotProjectToTable() {
  addToTable(pilotProjectsTableData, criteria.pilotProjects, 'pilotProject')
}

interface Specification {
  specification: string
}
const specificationTableData = reactive<Specification[]>([])
function addSpecificationToTable() {
  addToTable(specificationTableData, criteria.specification, 'specification')
}

interface Sample {
  sampleName: string
}
const samplTableData = reactive<Sample[]>([])
function addSampleToTable() {
  // if (criteria.sampleName) {
  //   const exists = samplTableData.some(sample => sample.sampleName === criteria.sampleName)
  //   if (!exists) {
  //     const newSample: Sample = {
  //       sampleName: criteria.sampleName,
  //     }
  //     samplTableData.push(newSample)
  //   }
  //   else {
  //     ElMessage.warning('該樣本已經存在於表格中。')
  //   }
  // }
  addToTable(samplTableData, criteria.sampleName, 'sampleName')
}
interface Equipment {
  equipment: string
}
const equipmentTableData = reactive<Equipment[]>([])
function addToEquipment() {
  addToTable(equipmentTableData, criteria.equipment, 'equipment')
}
interface Report {
  contentOfReport: string
}
const reportTableData = reactive<Report[]>([])

function addToReport() {
  addToTable(reportTableData, criteria.report, 'contentOfReport')
}
interface Manuscript {
  manuscriptTitle: string
}
const manuscriptTableData = reactive<Manuscript[]>([
  { manuscriptTitle: 'MQ03-04-05粗粒料分次篩析紀錄表' },
])
function addToExperimentalManuscript() {
  addToTable(manuscriptTableData, criteria.experimentalManuscript, 'manuscriptTitle')
}
const manuscriptDialogVisible = ref(false)

function handleClose(done: () => void) {
  ElMessageBox.confirm('即將離開視窗?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const manuscriptEquipmentTableData = [
  {
    equipment: '混和機',
  },
]
// interface ManuscriptEquipment {
//   equipment: string
// }
// const manuscriptEquipmentTableData = reactive<ManuscriptEquipment[]>([])
// function addToManuscriptEquipment() {
//   addToTable(manuscriptEquipmentTableData, criteria.manuscriptEquipment, 'equipment')
// }
// function resetManuscriptEquipment() {
//   criteria.manuscriptEquipment = ''
//   manuscriptEquipmentTableData.length = 0
// }
function addToTable<T extends { title: string }>(tableData: T[], criteria: string, fieldName: keyof T) {
  if (criteria) {
    const exists = tableData.some(e => e[fieldName] === criteria)
    if (!exists) {
      const newItem = { [fieldName]: criteria } as T
      tableData.push(newItem)
    }
    else {
      ElMessage.warning('內容已經存在於表格中。')
    }
  }
}
function sendSave() {
  ElMessageBox.confirm('即將送出資料', '請確認', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('資料已送出')
    history.back()
    reset()
  }).catch(() => {
    ElMessage.info('取消送出')
  })
}
function reset() {
  // sequenceNumber = 1
  criteria.pilotProjects = ''
  criteria.remark = ''
  criteria.specification = ''
  criteria.specificationValue = ''
  criteria.equipment = ''
  criteria.equipmentValue = ''
  criteria.report = ''
  criteria.sampleName = ''
  criteria.kilogram = ''
  criteria.bag = ''
  criteria.openType = ''
  specificationTableData.length = 0
  samplTableData.length = 0
  equipmentTableData.length = 0
  reportTableData.length = 0
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="編輯頁" class="mt-4">
          <el-tabs v-model="activeName" class="demo-tabs" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="基本資訊" name="first">
              <el-card header="基本資訊" class="mt-4">
                <el-form label-width="auto" class="form-max-width">
                  <el-row :gutter="20">
                    <el-col :span="18">
                      <el-form-item label="試驗項目">
                        <el-input v-model="criteria.pilotProjects" />
                        <!-- <el-select v-model="criteria.pilotProjects" placeholder="請選擇">
                          <el-option
                            v-for="item in pilotProjectsOptions" :key="item.value"
                            :label="item.label" :value="item.value"
                          />
                        </el-select> -->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="">
                        <el-button @click="addPilotProjectToTable">
                          加入
                        </el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="">
                        <el-table :data="pilotProjectsTableData" border style="width: 100%">
                          <el-table-column label="#" width="55">
                            <template #default="scope">
                              {{ scope.$index + 1 }}
                            </template>
                          </el-table-column>
                          <el-table-column prop="pilotProject" label="試驗項目" />
                        </el-table>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="上架狀態">
                        <el-select v-model="criteria.openType" placeholder="請選擇">
                          <el-option
                            v-for="item in openTypes" :key="item.value"
                            :label="item.label" :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="備註">
                        <!-- <el-input v-model="criteria.remark" type="textarea" :autosize="true" /> -->
                        <el-input v-model="criteria.remark" type="textarea" :rows="3" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="試驗規範" name="second">
              <el-card header="試驗規範" class="mt-4">
                <el-form label-width="auto" class="form-max-width">
                  <el-row :gutter="20">
                    <el-col :span="18">
                      <el-form-item label="規範選單">
                        <el-input v-model="criteria.specification" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="">
                        <el-button @click="addSpecificationToTable">
                          加入
                        </el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item>
                        <!-- <el-input v-model="criteria.specificationValue" type="textarea" :rows="3" /> -->
                        <el-table :data="specificationTableData" border style="width: 100%">
                          <el-table-column label="#" width="55">
                            <template #default="scope">
                              {{ scope.$index + 1 }}
                            </template>
                          </el-table-column>
                          <el-table-column prop="specification" label="試驗規範" />
                        </el-table>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="試樣" name="third">
              <el-card header="試樣" class="mt-4">
                <el-form label-width="auto" class="form-max-width">
                  <el-row :gutter="20">
                    <el-col :span="18">
                      <el-form-item label="試樣選單">
                        <el-select v-model="criteria.sampleName" placeholder="請選擇">
                          <el-option
                            v-for="item in sampleNameOptions" :key="item.value"
                            :label="item.label" :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="">
                        <el-button @click="addSampleToTable">
                          加入
                        </el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item>
                        <el-table :data="samplTableData" border style="width: 100%">
                          <el-table-column label="#" width="55">
                            <template #default="scope">
                              {{ scope.$index + 1 }}
                            </template>
                          </el-table-column>
                          <el-table-column prop="sampleName" label="試樣名稱" />
                        </el-table>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="試驗手稿" name="six">
              <el-card header="試驗手稿" class="mt-4">
                <el-form label-width="auto" class="form-max-width">
                  <el-row :gutter="20">
                    <el-col :span="18">
                      <el-form-item label="試驗手稿選單">
                        <!-- <el-input v-model="criteria.report" type="textarea" :rows="3" /> -->
                        <el-select v-model="criteria.experimentalManuscript" placeholder="請選擇">
                          <el-option
                            v-for="item in experimentalManuscriptOptions" :key="item.value"
                            :label="item.label" :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="">
                        <el-button @click="addToExperimentalManuscript">
                          加入
                        </el-button>
                      </el-form-item>
                    </el-col>
                    <el-dialog
                      v-model="manuscriptDialogVisible"
                      title="設備清單"
                      :before-close="handleClose"
                      center
                    >
                      <el-card header="試驗設備" class="mt-4">
                        <el-form label-width="auto" class="form-max-width">
                          <!-- <el-row :gutter="20">
                            <el-col :span="18">
                              <el-form-item label="設備選單">
                                <el-select v-model="criteria.manuscriptEquipment" placeholder="請選擇">
                                  <el-option
                                    v-for="item in equipmentOptions" :key="item.value"
                                    :label="item.label" :value="item.value"
                                  />
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="">
                                <el-button @click="addToManuscriptEquipment">
                                  加入
                                </el-button>
                              </el-form-item>
                            </el-col>
                          </el-row> -->
                          <el-form-item>
                            <el-col :span="24">
                              <el-form-item label="">
                                <el-table :data="manuscriptEquipmentTableData" border style="width: 100%">
                                  <el-table-column label="#" width="55">
                                    <template #default="scope">
                                      {{ scope.$index + 1 }}
                                    </template>
                                  </el-table-column>
                                  <el-table-column prop="equipment" label="設備名稱" />
                                </el-table>
                              </el-form-item>
                            </el-col>
                          </el-form-item>
                        </el-form>
                      </el-card>
                      <template #footer>
                        <div class="dialog-footer">
                          <!-- <el-button type="primary" @click="manuscriptDialogVisible = false">
                            確定
                          </el-button>
                          <el-button @click="resetManuscriptEquipment()">
                            重設
                          </el-button> -->
                          <el-button @click="manuscriptDialogVisible = false">
                            取消
                          </el-button>
                        </div>
                      </template>
                    </el-dialog>
                    <el-col :span="24">
                      <el-form-item label="">
                        <el-table :data="manuscriptTableData" border style="width: 100%">
                          <el-table-column label="#" width="55">
                            <template #default="scope">
                              {{ scope.$index + 1 }}
                            </template>
                          </el-table-column>
                          <el-table-column prop="manuscriptTitle" label="手稿名稱" />
                          <el-table-column label="動作" align="center" width="170">
                            <template #default="scope">
                              <el-button
                                type="primary" @click="manuscriptDialogVisible = true"
                              >
                                <AdminIcon name="i-carbon:cloud-service-management" class="pr-1" />
                                設備清單
                              </el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="試驗報告" name="five">
              <el-card header="試驗報告" class="mt-4">
                <el-form label-width="auto" class="form-max-width">
                  <el-row :gutter="20">
                    <el-col :span="18">
                      <el-form-item label="試驗報告選單">
                        <!-- <el-input v-model="criteria.report" type="textarea" :rows="3" /> -->
                        <el-select v-model="criteria.report" placeholder="請選擇">
                          <el-option
                            v-for="item in reportOptions" :key="item.value"
                            :label="item.label" :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="">
                        <el-button @click="addToReport">
                          加入
                        </el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="">
                        <el-table :data="reportTableData" border style="width: 100%">
                          <el-table-column label="#" width="55">
                            <template #default="scope">
                              {{ scope.$index + 1 }}
                            </template>
                          </el-table-column>
                          <el-table-column prop="contentOfReport" label="報告內容" />
                        </el-table>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <el-card>
          <el-row :gutter="20">
            <el-col :span="16">
              <ClientOnly>
                <el-button type="primary" plain @click="sendSave()">
                  儲存
                </el-button>
                <el-button type="info" plain @click="reset()">
                  <AdminIcon name="i-carbon:reset" class="pr-1" />
                  重設
                </el-button>
                <el-button plain @click="$router.back()">
                  回上一頁
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
