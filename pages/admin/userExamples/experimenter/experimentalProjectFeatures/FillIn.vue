<script setup lang="ts">
import { ElCheckbox, ElMessage, ElMessageBox } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
  getSysUserCriteria,
  getSysUserQueryResult,
} from '~/models'

definePageMeta({ layout: 'admin' })

const activeName = ref('first')
function handleClick(tab: TabsPaneContext, event: Event) {
  console.log(tab, event)
}
const criteria = reactive({
  sort: '2024001',
  dataVersion: '無版次',
  manuscript: [],
  testNumber: '',
  testDateStart: '',
  testDateEnd: '',
  testSpecifications: '',
  testEnvironmentTemperature: '',
  rebarNumber: '',
  steelBarFurnaceNumber: '',
  typesOfSteelBars: '',
  attached: '',
  pressureTool: '',
  rockwellHardness: '',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())
const dataVersionOptions = [
  { value: '無版次', label: '無版次' },
  { value: 'V1 - 2024/07/12 12:59:59', label: 'V1 - 2024/07/12 12:59:59' },
]

const manuscriptOptions = [
  { value: 'MQ03-35-01', label: 'MQ03-35-01試樣減量縮樣試驗紀錄表' },
  { value: 'MQ03-45-01', label: 'MQ03-45-01粗粒料中扁平、細長、扁長粒料試驗紀錄表' },
  { value: 'MQ03-04-01', label: 'MQ03-04-01粗粒料篩分析試驗紀錄表' },
]
const datas = reactive([
  { sort: '1', selectedManuscriptName: ['MQ03-35-01試樣減量縮樣試驗紀錄表', '　　MQ03-45-01粗粒料中扁平、細長、扁長粒料試驗紀錄表'] },
  { sort: '2', selectedManuscriptName: ['MQ03-04-01粗粒料篩分析試驗紀錄表'] },
])
// -----電子手稿區-----
function getDate(startEnd) {
  const testDate = `testDate${startEnd}`
  if (criteria[testDate] !== '') {
    const year = criteria[testDate].getFullYear()
    const month = criteria[testDate].getMonth() + 1
    const day = criteria[testDate].getDate()
    const date = `${year}/${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}`
    criteria[testDate] = date
  }
}
const typesOfSteelBarsOptions = [
  { value: 'SD280', label: 'SD280' },
  { value: 'SD280W', label: 'SD280W' },
  { value: 'SD420', label: 'SD420' },
  { value: 'SD420W', label: 'SD420W' },
]
const attachedOptions = [
  { value: '588.4(60)', label: '588.4(60)' },
  { value: 'none', label: '' },
]
const pressureToolOptions = [
  { value: '金剛石圓錐球', label: '金剛石圓錐球' },
  { value: 'none', label: '' },
]
const rockwellHardnessOptions = [
  { value: 'HRA', label: 'HRA' },
  { value: 'none', label: '' },
]
function handleCheckboxChange(checkbox) {
  if (checkbox === 'poorLicensingCheckedTrue' && hardness.poorLicensingCheckedTrue) {
    hardness.poorLicensingCheckedFalse = false
  }
  else if (checkbox === 'poorLicensingCheckedFalse' && hardness.poorLicensingCheckedFalse) {
    hardness.poorLicensingCheckedTrue = false
  }
}

const hardness = reactive({
  hardnessReading1: '54.5',
  hardnessReading2: '55.5',
  hardnessReading3: '55.0',
  hardnessReading4: '55.0',
  hardnessReadingAverage: '55.0',
  circumferentialEdgeHv: '183',
  centerPoint: '58.0',
  centerPointHv: '208',
  blockMarkedValue: '63.94',
  actualValue1: '62.0',
  actualValue2: '63.0',
  actualValue3: '62.5',
  actualValue4: '62.5',
  actualValue5: '62.5',
  actualValue6: '62.5',
  actualValueAverage: '62.5',
  betweenBlockMarkedValue: '',
  poorLicensingCheckedTrue: false,
  poorLicensingCheckedFalse: false,
})
const sectionHeightArray = []
function averageHardnessReading() {
  sectionHeightArray.length = 0
  let average = 0
  for (let i = 1; i <= 4; i++) {
    const key = `hardnessReading${i}`
    if (hardness[key] !== '') {
      sectionHeightArray.push(Number.parseFloat(hardness[key]))
    }
  }
  for (let n = 0; n < sectionHeightArray.length; n++) {
    average += sectionHeightArray[n]
    hardness.hardnessReadingAverage = (average / sectionHeightArray.length).toFixed(2)
  }
  console.log(`${sectionHeightArray}長度${sectionHeightArray.length}總計${hardness.hardnessReadingAverage}`)
}
function averageHardness() {
  sectionHeightArray.length = 0
  let average = 0
  for (let i = 1; i <= 6; i++) {
    const key = `actualValue${i}`
    if (hardness[key] !== '') {
      sectionHeightArray.push(Number.parseFloat(hardness[key]))
    }
  }
  for (let n = 0; n < sectionHeightArray.length; n++) {
    average += sectionHeightArray[n]
    hardness.actualValueAverage = (average / sectionHeightArray.length).toFixed(2)
  }
  console.log(`${sectionHeightArray}長度${sectionHeightArray.length}總計${hardness.actualValueAverage}`)
}
function calculateAll() {
  averageHardness()
  averageHardnessReading()
}
const steelBarHardnessDialogVisible = ref(false)

// -------手稿2

const rebar = reactive({
  testNumber: '',
  testDateStart: '',
  testDateEnd: '',
  testSpecifications: '',
  maximumLoad: '',
  tensileStrengthKg: '',
  yieldingLoad: '',
  surrenderPointKg: '',
  tensileStrengthN: '',
  tensionYield: '',
  surrenderPointN: '',
  stretchSeconds: '',
  markDistanceBefore: '',
  markDistanceAfter: '',
  elongation: '',
  fractureInterval: '',
  bendingTest: '',
  experimenter: '',
})

const deformationTable = reactive([
  { rebarNumber: '', sampleLengthM: '', sampleWeightKg: '', unitMass: '' },
  { rebarNumber: '', sampleLengthM: '', sampleWeightKg: '', unitMass: '' },
])
const signatureFormTable = [
  { serialNumber: '2', bendingTest: '無裂痕' },
  { serialNumber: '---', bendingTest: '---' },
]
const previewDialogVisible = ref(false)

function handleInput(row, field) {
  console.log(row + row[field])
  if (row.sampleLengthM !== '' && row.sampleWeightKg !== '') {
    massEquation(row)
  }
}
function massEquation(row) {
  const kg = row.sampleWeightKg
  const m = row.sampleLengthM
  const quality = (Number.parseFloat(kg) / Number.parseFloat(m)).toFixed(2)
  row.unitMass = quality.toString()
  console.log(quality)
}

function rebarGetDate(startEnd) {
  const testDate = `testDate${startEnd}`
  if (rebar[testDate] !== '') {
    const year = rebar[testDate].getFullYear()
    const month = rebar[testDate].getMonth() + 1
    const day = rebar[testDate].getDate()
    const date = `${year}/${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}`
    rebar[testDate] = date
  }
}
function reset() {
  Object.keys(rebar).forEach((key) => {
    rebar[key] = ''
  })
  Object.keys(hardness).forEach((key) => {
    hardness[key] = ''
  })
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="填寫數據">
          <el-form label-width="auto">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="數據版次：">
                  <el-select v-model="criteria.dataVersion" placeholder="請選擇" disabled>
                    <el-option
                      v-for="item in dataVersionOptions" :key="item.value"
                      :label="item.label" :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card header="" class="mt-4">
          <el-row class="mb-3">
            <el-col>
              <el-button
                float="right"
                @click="navigateTo({ path: '/admin/experimentalProjectFeatures/FillInTheData' })"
              >
                編輯手稿
              </el-button>
            </el-col>
          </el-row>
          <el-tabs v-model="activeName" class="demo-tabs" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="MQ03-04-01" name="first">
              <el-row>
                <el-col class="mb-3">
                  <ClientOnly>
                    <el-button
                      float="right"
                      @click="navigateTo({ path: '/admin/experimentalProjectFeatures/EditTestSteps' })"
                    >
                      編輯試驗步驟
                    </el-button>
                  </ClientOnly>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-card header="工程材料輻射量檢測紀錄表(實驗室內使用)">
                    <el-form label-width="auto" class="mb-5" style="max-width: 780px">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="試驗編號：">
                            <el-input v-model="criteria.testNumber" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-button>取得試驗資料</el-button>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="試驗日期(起)：">
                            <el-date-picker
                              v-model="criteria.testDateStart" type="date"
                              placeholder="選擇日期" size="default"
                              @change="getDate('Start')"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="試驗日期(迄)：">
                            <el-date-picker
                              v-model="criteria.testDateEnd" type="date"
                              placeholder="選擇日期" size="default"
                              @change="getDate('End')"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="試驗規範：">
                            <el-input v-model="criteria.testSpecifications" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="試驗環境溫度：">
                            <el-input v-model="criteria.testEnvironmentTemperature" />
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-card header="測量值" class="mb-1" shadow="never">
                        <el-row :gutter="20">
                          <el-col :span="12">
                            <el-form-item label="鋼筋號數：">
                              <el-input v-model="criteria.rebarNumber" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="鋼筋爐號：">
                              <el-input v-model="criteria.steelBarFurnaceNumber" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item label="鋼筋種類：">
                              <el-radio-group
                                v-model="criteria.typesOfSteelBars"
                                class="ml-4"
                              >
                                <el-radio
                                  v-for="item in typesOfSteelBarsOptions"
                                  :value="item.value"
                                >
                                  {{ item.label }}
                                </el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item label="試驗負載 N (kgf)：">
                              <el-radio-group v-model="criteria.attached" class="ml-4">
                                <el-radio
                                  v-for="item in attachedOptions"
                                  :value="item.value"
                                >
                                  {{ item.label }}
                                </el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item label="使用壓具：">
                              <el-radio-group
                                v-model="criteria.pressureTool"
                                class="ml-4"
                              >
                                <el-radio
                                  v-for="item in pressureToolOptions"
                                  :value="item.value"
                                >
                                  {{ item.label }}
                                </el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item label="洛氏硬度標度：">
                              <el-radio-group
                                v-model="criteria.rockwellHardness"
                                class="ml-4"
                              >
                                <el-radio
                                  v-for="item in rockwellHardnessOptions"
                                  :value="item.value"
                                >
                                  {{ item.label }}
                                </el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="量測位置：">
                              <el-text>圓周邊緣(Hv)</el-text>
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item label="硬度讀數(0.5HR)：">
                              <el-col :span="6">
                                <el-input
                                  v-model="hardness.hardnessReading1"
                                  @input="averageHardnessReading()"
                                />
                              </el-col>
                              <el-col :span="6">
                                <el-input
                                  v-model="hardness.hardnessReading2"
                                  @input="averageHardnessReading()"
                                />
                              </el-col>
                              <el-col :span="6">
                                <el-input
                                  v-model="hardness.hardnessReading3"
                                  @input="averageHardnessReading()"
                                />
                              </el-col>
                              <el-col :span="6">
                                <el-input
                                  v-model="hardness.hardnessReading4"
                                  @input="averageHardnessReading()"
                                />
                              </el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="平均值(0.1 HR)：">
                              <el-input v-model="hardness.hardnessReadingAverage" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="經換算 Hv：">
                              <el-input v-model="hardness.circumferentialEdgeHv" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="中心點(Hvₒ)：">
                              <el-input v-model="hardness.centerPoint" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="經換算 Hv：">
                              <el-input v-model="hardness.centerPointHv" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-card>
                      <el-card header="標準硬度塊硬度檢驗   單位：HR" class="mb-1" shadow="never">
                        <el-row :gutter="20">
                          <el-col :span="12">
                            <el-form-item label="標準硬度塊標示值：">
                              <el-input v-model="hardness.blockMarkedValue" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="24">
                            <el-form-item label="實測值：">
                              <el-col :span="4">
                                <el-input
                                  v-model="hardness.actualValue1"
                                  @input="averageHardness()"
                                />
                              </el-col>
                              <el-col :span="4">
                                <el-input
                                  v-model="hardness.actualValue2"
                                  @input="averageHardness()"
                                />
                              </el-col>
                              <el-col :span="4">
                                <el-input
                                  v-model="hardness.actualValue3"
                                  @input="averageHardness()"
                                />
                              </el-col>
                              <el-col :span="4">
                                <el-input
                                  v-model="hardness.actualValue4"
                                  @input="averageHardness()"
                                />
                              </el-col>
                              <el-col :span="4">
                                <el-input
                                  v-model="hardness.actualValue5"
                                  @input="averageHardness()"
                                />
                              </el-col>
                              <el-col :span="4">
                                <el-input
                                  v-model="hardness.actualValue6"
                                  @input="averageHardness()"
                                />
                              </el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="平均值：">
                              <el-input v-model="hardness.actualValueAverage" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="12" />
                          <el-col :span="10">
                            <el-form-item>
                              <el-text>
                                硬度測試值之平均值與參考用標準硬度塊之差：
                              </el-text>
                            </el-form-item>
                          </el-col>
                          <el-col :span="14">
                            <el-form-item>
                              <el-input v-model="hardness.betweenBlockMarkedValue" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item>
                              <el-text>
                                標準硬度塊硬度是否符合許可差：
                              </el-text>
                            </el-form-item>
                          </el-col>
                          <el-col :span="16">
                            <el-form-item>
                              <ElCheckbox
                                v-model="hardness.poorLicensingCheckedTrue"
                                label="是"
                                @change="handleCheckboxChange('poorLicensingCheckedTrue')"
                              />
                              <ElCheckbox
                                v-model="hardness.poorLicensingCheckedFalse"
                                label="否"
                                @change="handleCheckboxChange('poorLicensingCheckedFalse')"
                              />
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-card>
                    </el-form>
                    <el-row :gutter="20">
                      <el-col :span="16">
                        <ClientOnly>
                          <el-button type="primary" plain>
                            儲存
                          </el-button>
                          <el-button
                            plain
                            @click="steelBarHardnessDialogVisible = true"
                          >
                            預覽
                          </el-button>
                          <el-button plain @click="reset()">
                            重設
                          </el-button>
                        </ClientOnly>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
              </el-row>
              <!-- 對話框 -->
              <el-dialog v-model="steelBarHardnessDialogVisible" title="預覽畫面" center>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="試驗編號：">
                      <el-text>{{ criteria.testNumber }}</el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="試驗日期：">
                      <el-text
                        v-if="criteria.testDateStart === '' || criteria.testDateEnd === ''"
                      />
                      <el-text v-else>
                        {{ criteria.testDateStart }} ~ {{ criteria.testDateEnd
                        }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="試驗規範：">
                      <el-text>{{ criteria.testSpecifications }}</el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="試驗環境溫度：">
                      <el-text>{{ criteria.testEnvironmentTemperature }}℃</el-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form label-width="auto">
                  <el-card class="mb-1" shadow="never">
                    <el-row class="borderVue mb-0">
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="試樣編號">
                          <el-col
                            v-if="criteria.testNumber === ''"
                            class="borderVue mb-0 ps-1"
                          />
                          <el-col v-else class="borderVue mb-0 ps-1">
                            {{ criteria.testNumber }}
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="鋼筋號數">
                          <el-col
                            v-if="criteria.rebarNumber === ''"
                            class="borderVue mb-0 ps-1"
                          />
                          <el-col v-else class="borderVue mb-0 ps-1">
                            {{ criteria.rebarNumber }}
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="鋼筋爐號">
                          <el-col
                            v-if="criteria.steelBarFurnaceNumber === ''"
                            class="borderVue mb-0 ps-1"
                          />
                          <el-col v-else class="borderVue mb-0 ps-1">
                            {{ criteria.steelBarFurnaceNumber }}
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="鋼筋種類">
                          <el-col class="borderVue mb-0 ps-1">
                            <el-radio-group
                              v-model="criteria.typesOfSteelBars" class="ml-4"
                              disabled
                            >
                              <el-radio
                                v-for="item in typesOfSteelBarsOptions"
                                :value="item.value"
                              >
                                {{ item.label }}
                              </el-radio>
                            </el-radio-group>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="試驗負載 N (kgf)">
                          <el-col class="borderVue mb-0">
                            <el-radio-group
                              v-model="criteria.attached" class="ml-4"
                              disabled
                            >
                              <el-radio v-for="item in attachedOptions" :value="item.value">
                                {{ item.label }}
                              </el-radio>
                            </el-radio-group>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="使用壓具">
                          <el-col class="borderVue mb-0">
                            <el-radio-group
                              v-model="criteria.pressureTool" class="ml-4"
                              disabled
                            >
                              <el-radio
                                v-for="item in pressureToolOptions"
                                :value="item.value"
                              >
                                {{ item.label }}
                              </el-radio>
                            </el-radio-group>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="洛示硬度標度">
                          <el-col class="borderVue mb-0">
                            <el-radio-group
                              v-model="criteria.rockwellHardness" class="ml-4"
                              disabled
                            >
                              <el-radio
                                v-for="item in rockwellHardnessOptions"
                                :value="item.value"
                              >
                                {{ item.label }}
                              </el-radio>
                            </el-radio-group>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item label="量測位置" class="borderVue mb-0">
                          <el-col class="borderVue mb-0 ps-1">
                            <el-text>圓周邊緣(Hv)</el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0">
                          <el-col :span="12">
                            <el-form-item label="中心點(Hvₒ)">
                              <el-col
                                v-if="hardness.centerPoint === ''"
                                class="borderVue mb-0" align="center"
                              />
                              <el-col v-else class="borderVue mb-0" align="center">
                                {{ hardness.centerPoint }}
                              </el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="經換算 Hv">
                              <el-col
                                v-if="hardness.centerPointHv === ''"
                                class="borderVue mb-0" align="center"
                              />
                              <el-col v-else class="borderVue mb-0" align="center">
                                {{ hardness.centerPointHv }}
                              </el-col>
                            </el-form-item>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="硬度讀數">
                          <el-col
                            v-if="hardness.hardnessReading1 === ''" :span="6"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else :span="6" class="borderVue mb-0" align="center">
                            {{
                              hardness.hardnessReading1
                            }}
                          </el-col>
                          <el-col
                            v-if="hardness.hardnessReading2 === ''" :span="6"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else :span="6" class="borderVue mb-0" align="center">
                            {{
                              hardness.hardnessReading2
                            }}
                          </el-col>
                          <el-col
                            v-if="hardness.hardnessReading3 === ''" :span="6"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else :span="6" class="borderVue mb-0" align="center">
                            {{
                              hardness.hardnessReading3
                            }}
                          </el-col>
                          <el-col
                            v-if="hardness.hardnessReading4 === ''" :span="6"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else :span="6" class="borderVue mb-0" align="center">
                            {{
                              hardness.hardnessReading4
                            }}
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item class="borderVue mb-0" label="平均值(0.1HR)">
                          <el-col
                            v-if="hardness.hardnessReadingAverage === ''"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else class="borderVue mb-0" align="center">
                            {{ hardness.hardnessReadingAverage }}
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item class="borderVue mb-0" label="經換算 Hv">
                          <el-col
                            v-if="hardness.circumferentialEdgeHv === ''"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else class="borderVue mb-0" align="center">
                            {{ hardness.circumferentialEdgeHv }}
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0">
                          <el-col class="borderVue mb-0" align="center">
                            標準硬度快硬度查驗（單位：HR）
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              CNS 硬度範圍
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              A 20~75
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              A 75~88
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              ASTM 硬度範圍
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              A 20~65
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              A 70~78
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>

                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              許可差
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              ±2.0
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              ±1.5
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              許可差
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              ±1.0
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item class="borderVue mb-0">
                          <el-col align="center">
                            <el-text>
                              ±1.0
                            </el-text>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="標準硬度塊標示值">
                          <el-col class="borderVue mb-0" align="center">
                            {{ hardness.blockMarkedValue }} HRA (0.1HR)
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="實測值(0.5HR)">
                          <el-col
                            v-if="hardness.actualValue1 === ''" :span="4"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else :span="4" class="borderVue mb-0" align="center">
                            {{
                              hardness.actualValue1
                            }}
                          </el-col>

                          <el-col
                            v-if="hardness.actualValue2 === ''" :span="4"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else :span="4" class="borderVue mb-0" align="center">
                            {{
                              hardness.actualValue2
                            }}
                          </el-col>

                          <el-col
                            v-if="hardness.actualValue3 === ''" :span="4"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else :span="4" class="borderVue mb-0" align="center">
                            {{
                              hardness.actualValue3
                            }}
                          </el-col>

                          <el-col
                            v-if="hardness.actualValue4 === ''" :span="4"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else :span="4" class="borderVue mb-0" align="center">
                            {{
                              hardness.actualValue4
                            }}
                          </el-col>

                          <el-col
                            v-if="hardness.actualValue5 === ''" :span="4"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else :span="4" class="borderVue mb-0" align="center">
                            {{
                              hardness.actualValue5
                            }}
                          </el-col>

                          <el-col
                            v-if="hardness.actualValue6 === ''" :span="4"
                            class="borderVue mb-0" align="center"
                          />
                          <el-col v-else :span="4" class="borderVue mb-0" align="center">
                            {{
                              hardness.actualValue6
                            }}
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0">
                          <el-col :span="24">
                            <el-text>
                              硬度測試值之平均值與參考用標準硬度塊之差：{{
                                hardness.betweenBlockMarkedValue }}
                            </el-text>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item>
                              <el-text>
                                標準硬度塊硬度是否符合許可差：
                              </el-text>
                            </el-form-item>
                          </el-col>
                          <el-col :span="16">
                            <el-form-item>
                              <ElCheckbox
                                v-model="hardness.poorLicensingCheckedTrue"
                                label="是"
                                disabled
                                @change="handleCheckboxChange('poorLicensingCheckedTrue')"
                              />
                              <ElCheckbox
                                v-model="hardness.poorLicensingCheckedFalse"
                                label="否"
                                disabled
                                @change="handleCheckboxChange('poorLicensingCheckedFalse')"
                              />
                            </el-form-item>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-form>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="steelBarHardnessDialogVisible = false">
                      取消
                    </el-button>
                    <el-button type="primary" @click="steelBarHardnessDialogVisible = false">
                      確認
                    </el-button>
                  </div>
                </template>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="MQ03-04-05" name="second">
              <el-row>
                <el-col class="mb-3">
                  <ClientOnly>
                    <el-button
                      float="right"
                      @click="navigateTo({ path: '/admin/experimentalProjectFeatures/EditTestSteps' })"
                    >
                      編輯試驗步驟
                    </el-button>
                  </ClientOnly>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-card header="鋼筋拉伸及彎曲試驗記錄表">
                    <el-form label-width="auto" class="form-max-width">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="試驗編號：">
                            <el-input v-model="rebar.testNumber" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-button>取得試驗資料</el-button>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="試驗日期(起)：">
                            <el-date-picker
                              v-model="rebar.testDateStart" type="date"
                              placeholder="選擇日期" size="default"
                              @change="rebarGetDate('Start')"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="試驗日期(迄)：">
                            <el-date-picker
                              v-model="rebar.testDateEnd" type="date"
                              placeholder="選擇日期" size="default"
                              @change="rebarGetDate('End')"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="試驗規範：">
                            <el-input v-model="rebar.testSpecifications" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-table
                        class="mb-3" :data="deformationTable" border stripe
                        style="width: 100%"
                      >
                        <el-table-column label="#" width="55">
                          <template #default="scope">
                            {{ scope.$index + 1 }}
                          </template>
                        </el-table-column>
                        <el-table-column prop="rebarNumber" label="鋼筋號數">
                          <template #default="scope">
                            <el-input
                              v-model="scope.row.rebarNumber"
                              @input="handleInput(scope.row, 'rebarNumber')"
                            />
                          </template>
                        </el-table-column>
                        <el-table-column prop="sampleLengthM" label="試樣長(m)">
                          <template #default="scope">
                            <el-input
                              v-model="scope.row.sampleLengthM"
                              @input="handleInput(scope.row, 'sampleLengthM')"
                            />
                          </template>
                        </el-table-column>
                        <el-table-column prop="sampleWeightKg" label="試樣重(kg)">
                          <template #default="scope">
                            <el-input
                              v-model="scope.row.sampleWeightKg"
                              @input="handleInput(scope.row, 'sampleWeightKg')"
                            />
                          </template>
                        </el-table-column>
                        <el-table-column prop="unitMass" label="單位質量(kg/m)">
                          <template #default="scope">
                            <el-input v-model="scope.row.unitMass" />
                          </template>
                        </el-table-column>
                      </el-table>
                      <!-- 記錄區 -->
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="最大荷重(Kgf)">
                            <el-input v-model="rebar.maximumLoad" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="抗拉強度(Kgf/mm²)">
                            <el-input v-model="rebar.tensileStrengthKg" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="降伏荷重(Kgf)">
                            <el-input v-model="rebar.yieldingLoad" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="降伏點(Kgf/mm²)">
                            <el-input v-model="rebar.surrenderPointKg" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="抗拉強度 N/mm²">
                            <el-input v-model="rebar.tensileStrengthN" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="抗拉/降伏">
                            <el-input v-model="rebar.tensionYield" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="降伏點 N/mm²">
                            <el-input v-model="rebar.surrenderPointN" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="拉伸時間(秒)">
                            <el-input v-model="rebar.stretchSeconds" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- Total -->
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="試驗前標點距離(0.01mm)">
                            <el-input v-model="rebar.markDistanceBefore" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="試驗後標點距離(0.01mm)">
                            <el-input v-model="rebar.markDistanceAfter" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="伸長率(%)">
                            <el-input v-model="rebar.elongation" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="斷裂區間">
                            <el-input v-model="rebar.fractureInterval" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 試驗者 -->
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="彎曲試驗">
                            <el-input v-model="rebar.bendingTest" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="試驗者">
                            <el-input v-model="rebar.experimenter" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <el-row :gutter="20">
                      <el-col :span="24">
                        <el-form-item label="註：">
                          <ol>
                            <li>應力換算： 1kgf = 9.80665N ; 1kgf/mm² = 9.80665 N/mm²</li>
                            <li>有效位數： CNS560 取至 1 N/mm²(MPa)。</li>
                            <li>伸長率： (0-10) ％ (不含) 取至 0.5 ％ ，10 ％以上取至1 ％。</li>
                          </ol>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="16">
                        <ClientOnly>
                          <el-button type="primary" plain>
                            儲存
                          </el-button>
                          <el-button plain @click="previewDialogVisible = true">
                            預覽
                          </el-button>
                          <el-button plain @click="reset()">
                            重設
                          </el-button>
                        </ClientOnly>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
              </el-row>
              <!-- 對話框 -->
              <el-dialog v-model="previewDialogVisible" title="預覽鋼筋拉伸及彎曲試驗紀錄表" center>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-label>試驗編號：{{ rebar.testNumber }}</el-label>
                  </el-col>
                  <el-col :span="12">
                    <el-label
                      v-if="rebar.testDateStart === '' || rebar.testDateEnd === ''"
                    >
                      試驗日期：
                    </el-label>
                    <el-label v-else="rebar.testDateStart === '' || rebar.testDateEnd === ''">
                      試驗日期：{{
                        rebar.testDateStart }}～{{ rebar.testDateEnd }}
                    </el-label>
                  </el-col>
                  <el-col :span="12">
                    <el-label>試驗規範：{{ rebar.testSpecifications }}</el-label>
                  </el-col>
                  <el-table
                    class="mb-3 mt-3" :data="deformationTable" border stripe
                    style="width: 100%"
                  >
                    <el-table-column label="編號" width="55">
                      <template #default="scope">
                        {{ scope.$index + 1 }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="rebarNumber" label="鋼筋號數" />
                    <el-table-column prop="sampleLengthM" label="鋼筋長度(m)" />
                    <el-table-column prop="sampleWeightKg" label="鋼筋重量(kg)" />
                    <el-table-column prop="unitMass" label="單位質量(重量/長度)(kg/m)" />
                  </el-table>
                  <el-row class="mb-3" style="width: 100%;">
                    <el-container style="width: 100%;">
                      <el-aside class="borderVue" width="55px" align="center">
                        編號
                      </el-aside>
                      <el-main class="p-0">
                        <el-row style="width: 100%;">
                          <el-col class="borderVue" :span="8">
                            鋼筋號數
                          </el-col>
                          <el-col
                            v-if="deformationTable[0].rebarNumber === ''"
                            class="borderVue" :span="8"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="8">
                            {{
                              deformationTable[0].rebarNumber
                            }}
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            M043002
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            最大荷重(Kgf)
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            抗拉強度(Kgf/mm²)
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            抗拉強度 N/mm²
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            抗拉/降伏
                          </el-col>
                        </el-row>
                      </el-main>
                    </el-container>
                    <el-container align="center">
                      <el-aside class="borderVue" width="55px">
                        1
                      </el-aside>
                      <el-main class="p-0">
                        <el-row style="width: 100%;">
                          <el-col
                            v-if="rebar.maximumLoad === ''" class="borderVue"
                            :span="8"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="8">
                            {{ rebar.maximumLoad
                            }}
                          </el-col>

                          <el-col
                            v-if="rebar.tensileStrengthKg === ''" class="borderVue"
                            :span="8"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="8">
                            {{
                              rebar.tensileStrengthKg }}
                          </el-col>

                          <el-col
                            v-if="rebar.tensileStrengthN === ''" class="borderVue"
                            :span="4"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="4">
                            {{
                              rebar.tensileStrengthN }}
                          </el-col>

                          <el-col
                            v-if="rebar.tensionYield === ''" class="borderVue"
                            :span="4"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="4">
                            {{ rebar.tensionYield
                            }}
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            降伏荷重(Kgf)
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            降伏點(Kgf/mm²)
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            降伏點 N/mm²
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            拉伸時間(秒)
                          </el-col>
                          <el-col
                            v-if="rebar.yieldingLoad === ''" class="borderVue"
                            :span="8"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="8">
                            {{ rebar.yieldingLoad
                            }}
                          </el-col>

                          <el-col
                            v-if="rebar.surrenderPointKg === ''" class="borderVue"
                            :span="8"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="8">
                            {{
                              rebar.surrenderPointKg }}
                          </el-col>

                          <el-col
                            v-if="rebar.surrenderPointN === ''" class="borderVue"
                            :span="4"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="4">
                            {{
                              rebar.surrenderPointN }}
                          </el-col>

                          <el-col
                            v-if="rebar.stretchSeconds === ''" class="borderVue"
                            :span="4"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="4">
                            {{
                              rebar.stretchSeconds }}
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            試驗前標點去離(0.01mm)
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            試驗後標點去離(0.01mm)
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            伸長率(%)
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            斷裂區域
                          </el-col>
                          <el-col
                            v-if="rebar.markDistanceBefore === ''" class="borderVue"
                            :span="8"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="8">
                            {{
                              rebar.markDistanceBefore }}
                          </el-col>

                          <el-col
                            v-if="rebar.markDistanceAfter === ''" class="borderVue"
                            :span="8"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="8">
                            {{
                              rebar.markDistanceAfter }}
                          </el-col>

                          <el-col
                            v-if="rebar.elongation === ''" class="borderVue"
                            :span="4"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="4">
                            {{ rebar.elongation
                            }}
                          </el-col>

                          <el-col
                            v-if="rebar.fractureInterval === ''" class="borderVue"
                            :span="4"
                          >
                            ---
                          </el-col>
                          <el-col v-else class="borderVue" :span="4">
                            {{
                              rebar.fractureInterval }}
                          </el-col>
                        </el-row>
                      </el-main>
                    </el-container>
                  </el-row>

                  <el-row class="mb-3" style="width: 100%;">
                    <el-container style="width: 100%;">
                      <el-aside class="borderVue" width="55px" align="center">
                        編號
                      </el-aside>
                      <el-main class="p-0">
                        <el-row style="width: 100%;">
                          <el-col class="borderVue" :span="8">
                            鋼筋號數
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            D25(#8)
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            M043002
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            最大荷重(Kgf)
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            抗拉強度(Kgf/mm²)
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            抗拉強度 N/mm²
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            抗拉/降伏
                          </el-col>
                        </el-row>
                      </el-main>
                    </el-container>
                    <el-container align="center">
                      <el-aside class="borderVue" width="55px">
                        2
                      </el-aside>
                      <el-main class="p-0">
                        <el-row style="width: 100%;">
                          <el-col class="borderVue" :span="8">
                            34579
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            68.2
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            669
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            1.37
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            降伏荷重(Kgf)
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            降伏點(Kgf/mm²)
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            降伏點 N/mm²
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            拉伸時間(秒)
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            25273
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            49.9
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            489
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            69
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            試驗前標點去離(0.01mm)
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            試驗後標點去離(0.01mm)
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            伸長率(%)
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            斷裂區域
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            126.78
                          </el-col>
                          <el-col class="borderVue" :span="8">
                            156.94
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            24
                          </el-col>
                          <el-col class="borderVue" :span="4">
                            B區
                          </el-col>
                        </el-row>
                      </el-main>
                    </el-container>
                  </el-row>
                  <el-table :data="signatureFormTable" border style="width: 100%">
                    <el-table-column prop="serialNumber" label="編號" width="55px" />
                    <el-table-column prop="bendingTest" label="彎曲試驗" />
                    <el-table-column label="試驗者" />
                  </el-table>
                </el-row>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="previewDialogVisible = false">
                      離開
                    </el-button>
                    <el-button type="primary" @click="previewDialogVisible = false">
                      確認
                    </el-button>
                  </div>
                </template>
              </el-dialog>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <el-row class="mt-3" :gutter="20">
          <el-col :span="16">
            <el-button plain @click="$router.back()">
              回上一頁
            </el-button>
            <el-button
              plain
              @click="navigateTo({ path: '/admin/experimentalProjectFeatures' })"
            >
              回列表
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </AdminContainer>
</template>

<style>
.borderVue {
    border: 1px solid;
    /* border-top:1px solid #c8c9cc; */
}
</style>
