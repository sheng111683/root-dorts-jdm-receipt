<style>
.borderVue {
  border: 1px solid;
  /* border-top:1px solid #c8c9cc; */
}
</style>
<script setup lang="ts">
import {
  getDefaultCriteria,
  getDefaultPageList,
  getSysUserQueryResult,
  getSysUserCriteria,
} from '~/models'
definePageMeta({ layout: 'admin' })
import { ElMessage, ElMessageBox } from 'element-plus'
const criteria = reactive({
  testNumber: '',
  testSpecifications: '',
  measurer: '',
  testDateStart: '',
  testDateEnd: '',
  rebarSerialNumber: '',
  typesOfSteelBars: '',
  rebarFurnaceNumber: '',
  rebarNumber: '',
  sampleWeightKg: '',
  sampleLengthM: '',
  unitMass: '',
  tenKnotsOnSideA: '',
  oneKnotsOnSideA: '',
  tenKnotsOnSideB: '',
  oneKnotsOnSideB: '',
  ...getDefaultCriteria()
})
const unitMassCalculation = () => {
  criteria.unitMass = ''
  var mass = (parseFloat(criteria.sampleWeightKg) / parseFloat(criteria.sampleLengthM)).toFixed(2)
  criteria.unitMass = mass.toString()
}
const tenToOne = () => {
  if (criteria.tenKnotsOnSideA !== '') {
    const sideA = Number(criteria.tenKnotsOnSideA) / 10
    criteria.oneKnotsOnSideA = sideA.toString()
  }
  if (criteria.tenKnotsOnSideB !== '') {
    const sideB = Number(criteria.tenKnotsOnSideB) / 10
    criteria.oneKnotsOnSideB = sideB.toString()
  }

}
const aSideNumber = reactive({
  side1: '',
  side2: '',
  side3: '',
  side4: '',
  side5: '',
  side6: '',
  side7: '',
  side8: '',
  side9: '',
  side10: '',
  side11: '',
  side12: '',
  sideNumberAverage: '',
})
const bSideNumber = reactive({
  side1: '',
  side2: '',
  side3: '',
  side4: '',
  side5: '',
  side6: '',
  side7: '',
  side8: '',
  side9: '',
  side10: '',
  side11: '',
  side12: '',
  sideNumberAverage: '',
})

const aGapWidth = reactive({
  side1: '',
  side2: '',
  side3: '',
  side4: '',
  side5: '',
  side6: '',
  sideNumberAverage: '',
})
const bGapWidth = reactive({
  side1: '',
  side2: '',
  side3: '',
  side4: '',
  side5: '',
  side6: '',
  sideNumberAverage: '',
})
const sectionHeightArray = []
const averageSectionHeight = (sideNumber) => {
  sectionHeightArray.length = 0
  let average = 0;
  for (let i = 1; i <= 12; i++) {
    const key = `side${i}`
    if (sideNumber[key] !== '') {
      sectionHeightArray.push(parseFloat(sideNumber[key]))
    }
  }
  for (let n = 0; n < sectionHeightArray.length; n++) {
    average += sectionHeightArray[n]
    sideNumber.sideNumberAverage = (average / sectionHeightArray.length).toFixed(2)
  }
  console.log(sectionHeightArray + '長度' + sectionHeightArray.length + '總計' + sideNumber.sideNumberAverage);
}
const averageSectionWidth = (sideNumber) => {
  sectionHeightArray.length = 0
  let average = 0;
  for (let i = 1; i <= 6; i++) {
    const key = `side${i}`
    if (sideNumber[key] !== '') {
      sectionHeightArray.push(parseFloat(sideNumber[key]))
    }
  }
  for (let n = 0; n < sectionHeightArray.length; n++) {
    average += sectionHeightArray[n]
    sideNumber.sideNumberAverage = (average / sectionHeightArray.length).toFixed(2)
  }
  console.log(sectionHeightArray + '長度' + sectionHeightArray.length + '總計' + sideNumber.sideNumberAverage);
}
const getDate = (startEnd) => {
  const testDate = `testDate${startEnd}`;
  if (criteria[testDate] !== '') {
    const year = criteria[testDate].getFullYear();
    const month = criteria[testDate].getMonth() + 1;
    const day = criteria[testDate].getDate();
    const date = `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
    criteria[testDate] = date
  }
}
const calculateAll = () => {
  unitMassCalculation()
  tenToOne()
  averageSectionHeight(aSideNumber)
  averageSectionHeight(bSideNumber)
  averageSectionWidth(aGapWidth)
  averageSectionWidth(bGapWidth)
}
const recordTablePreviewDialogVisible = ref(false)

const restNumberSide = () => {
  for (let i = 1; i <= 12; i++) {
    aSideNumber[`side${i}`] = '';
  }
  for (let i = 1; i <= 12; i++) {
    bSideNumber[`side${i}`] = '';
  }
  for (let i = 1; i <= 6; i++) {
    aGapWidth[`side${i}`] = '';
  }
  for (let i = 1; i <= 6; i++) {
    bGapWidth[`side${i}`] = '';
  }
  aSideNumber.sideNumberAverage = ''
  bSideNumber.sideNumberAverage = ''
  aGapWidth.sideNumberAverage = ''
  bGapWidth.sideNumberAverage = ''
}
const reset = () => {
  Object.keys(criteria).forEach(key => {
    criteria[key] = '';
  });
  restNumberSide();
}
</script>
<template>
  <AdminContainer>
    <el-row>
      <el-col :span="24">
        <el-card header="粗粒料分次篩紀錄表">
          <el-form label-width="auto">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-card header="鋼筋外觀量測記錄表">
                  <el-form label-width="auto" class="form-max-width">
                    <el-card header="一、基本資料" class="mb-1" shadow="never">
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
                          <el-form-item label="試驗規範：">
                            <el-input v-model="criteria.testSpecifications" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="量測者：">
                            <el-input v-model="criteria.measurer" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="試驗日期(起)：">
                            <el-date-picker v-model="criteria.testDateStart" type="date" placeholder="選擇日期"
                              size="default" @change="getDate('Start')" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="試驗日期(迄)：">
                            <el-date-picker v-model="criteria.testDateEnd" type="date" placeholder="選擇日期" size="default"
                              @change="getDate('End')" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="鋼筋序號：">
                            <el-input v-model="criteria.rebarSerialNumber" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="鋼筋種類：">
                            <el-input v-model="criteria.typesOfSteelBars" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="鋼筋爐號：">
                            <el-input v-model="criteria.rebarFurnaceNumber" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="鋼筋號數：">
                            <el-input v-model="criteria.rebarNumber" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-card>
                    <el-card header="二、單位質量" class="mb-1" shadow="never">
                      <el-row :gutter="20">
                        <el-col :span="8">
                          <el-form-item label="試樣重(kg)：">
                            <el-input v-model="criteria.sampleWeightKg" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="試樣長(m)：">
                            <el-input v-model="criteria.sampleLengthM" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="單位質量(kg/m)：">
                            <el-input v-model="criteria.unitMass" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-card>
                    <el-card header="三、節距(mm)" class="mb-1" shadow="never">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="A側10節量測值：">
                            <el-input v-model="criteria.tenKnotsOnSideA" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="A側1節平均值：">
                            <el-input v-model="criteria.oneKnotsOnSideA" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="B側10節量測值：">
                            <el-input v-model="criteria.tenKnotsOnSideB" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="B側1節平均值：">
                            <el-input v-model="criteria.oneKnotsOnSideB" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-card>
                    <el-card header="四、節高(mm)" class="mb-1" shadow="never">
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item label="A側：">
                            <el-row :gutter="20">
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side1" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side2" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side3" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side4" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side5" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side6" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side7" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side8" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side9" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side10" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side11" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aSideNumber.side12" />
                              </el-col>
                            </el-row>
                          </el-form-item>
                          <el-form-item label="B側：">
                            <el-row :gutter="20">
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side1" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side2" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side3" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side4" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side5" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side6" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side7" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side8" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side9" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side10" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side11" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bSideNumber.side12" />
                              </el-col>
                            </el-row>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="A側平均值：">{{ aSideNumber.sideNumberAverage }}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="B側平均值：">{{ bSideNumber.sideNumberAverage }}</el-form-item>
                        </el-col>
                      </el-row>
                    </el-card>
                    <el-card header="五、間隙寬度(mm)" class="mb-1" shadow="never">
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item label="A側：">
                            <el-row :gutter="20">
                              <el-col :span="4">
                                <el-input v-model="aGapWidth.side1" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aGapWidth.side2" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aGapWidth.side3" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aGapWidth.side4" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aGapWidth.side5" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="aGapWidth.side6" />
                              </el-col>
                            </el-row>
                          </el-form-item>
                          <el-form-item label="B側：">
                            <el-row :gutter="20">
                              <el-col :span="4">
                                <el-input v-model="bGapWidth.side1" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bGapWidth.side2" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bGapWidth.side3" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bGapWidth.side4" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bGapWidth.side5" />
                              </el-col>
                              <el-col :span="4">
                                <el-input v-model="bGapWidth.side6" />
                              </el-col>
                            </el-row>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="A側平均值：">{{ aGapWidth.sideNumberAverage }}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="B側平均值：">{{ bGapWidth.sideNumberAverage }}</el-form-item>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-form>
                  <el-row :gutter="20">
                    <el-col :span="16">
                      <ClientOnly>
                        <el-button type="primary" plain
                          @click="navigateTo({ path: '/admin/experimentalProjectFeatures/EditTestSteps' })">儲存</el-button>
                        <el-button plain @click="calculateAll()">計算</el-button>
                        <el-button plain @click="recordTablePreviewDialogVisible = true">預覽</el-button>
                        <el-button plain @click="reset()">重設</el-button>
                        <el-button plain @click="$router.back()">回上一頁</el-button>
                      </ClientOnly>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
            <!-- 預覽彈跳窗 -->
            <el-dialog v-model="recordTablePreviewDialogVisible" title="預覽鋼筋外觀量測記錄表" center>
              <el-form label-width="auto">
                <el-card header="一、基本資料" class="mb-1" shadow="never">
                  <el-row class="borderVue mb-0">
                    <el-col :span="24">
                      <el-form-item class="borderVue mb-0" label="量測者：">
                        <el-text v-model="criteria.measurer">
                          {{ criteria.measurer }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="試驗編號：">
                        <el-text v-model="criteria.testNumber">
                          {{ criteria.testNumber }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="試驗規範：">
                        <el-text v-model="criteria.testSpecifications">
                          {{ criteria.testSpecifications }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="試驗日期(起)：">
                        <el-text>
                          {{ criteria.testDateStart }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="試驗日期(迄)：">
                        <el-text>
                          {{ criteria.testDateEnd }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="鋼筋序號：">
                        <el-text v-model="criteria.rebarSerialNumber">
                          {{ criteria.rebarSerialNumber }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="鋼筋種類：">
                        <el-text v-model="criteria.typesOfSteelBars">
                          {{ criteria.typesOfSteelBars }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="鋼筋爐號：">
                        <el-text v-model="criteria.rebarFurnaceNumber">
                          {{ criteria.rebarFurnaceNumber }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="鋼筋號數：">
                        <el-text v-model="criteria.rebarNumber">
                          {{ criteria.rebarNumber }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
                <el-card header="二、單位質量" class="mb-1" shadow="never">
                  <el-row class="borderVue mb-0">
                    <el-col :span="8">
                      <el-form-item class="borderVue mb-0" label="試樣重(kg)：">
                        <el-text v-model="criteria.sampleWeightKg">
                          {{ criteria.sampleWeightKg }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item class="borderVue mb-0" label="試樣長(m)：">
                        <el-text v-model="criteria.sampleLengthM">
                          {{ criteria.sampleLengthM }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item class="borderVue mb-0" label="單位質量(kg/m)：">
                        <el-text v-model="criteria.unitMass">
                          {{ criteria.unitMass }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
                <el-card header="三、節距(mm)" class="mb-1" shadow="never">
                  <el-row class="borderVue">
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="A側10節量測值：">
                        <el-text v-model="criteria.tenKnotsOnSideA">
                          {{ criteria.tenKnotsOnSideA }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="A側1節平均值：">
                        <el-text v-model="criteria.oneKnotsOnSideA">
                          {{ criteria.oneKnotsOnSideA }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="B側10節量測值：">
                        <el-text v-model="criteria.tenKnotsOnSideB">
                          {{ criteria.tenKnotsOnSideB }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="borderVue mb-0" label="B側1節平均值：">
                        <el-text v-model="criteria.oneKnotsOnSideB">
                          {{ criteria.oneKnotsOnSideB }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
                <el-card header="四、節高(mm)" class="mb-1" shadow="never">
                  <el-row class="borderVue mb-0">
                    <el-col :span="24">
                      <el-form-item class="mb-0" label="A側：">
                        <el-row class="w-100 text-center">
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-if="aSideNumber.side1 === ''" v-model="aSideNumber.side1">
                              　
                            </el-text>
                            <el-text v-else v-model="aSideNumber.side1">
                              {{ aSideNumber.side1 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aSideNumber.side2">
                              {{ aSideNumber.side2 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aSideNumber.side3">
                              {{ aSideNumber.side3 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aSideNumber.side4">
                              {{ aSideNumber.side4 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aSideNumber.side5">
                              {{ aSideNumber.side5 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aSideNumber.side6">
                              {{ aSideNumber.side6 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-if="aSideNumber.side7 === ''" v-model="aSideNumber.side7">
                              　
                            </el-text>
                            <el-text v-else v-model="aSideNumber.side7">
                              {{ aSideNumber.side7 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aSideNumber.side8">
                              {{ aSideNumber.side8 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aSideNumber.side9">
                              {{ aSideNumber.side9 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aSideNumber.side10">
                              {{ aSideNumber.side10 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aSideNumber.side11">
                              {{ aSideNumber.side11 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aSideNumber.side12">
                              {{ aSideNumber.side12 }}
                            </el-text>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="A側平均值：">{{ aSideNumber.sideNumberAverage
                          }}</el-form-item>
                      </el-col>
                      <el-form-item class="borderVue mb-0" label="B側：">
                        <el-row class="w-100 text-center">
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-if="bSideNumber.side1 === ''" v-model="bSideNumber.side1">
                              　
                            </el-text>
                            <el-text v-else v-model="bSideNumber.side1">
                              {{ bSideNumber.side1 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bSideNumber.side2">
                              {{ bSideNumber.side2 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bSideNumber.side3">
                              {{ bSideNumber.side3 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bSideNumber.side4">
                              {{ bSideNumber.side4 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bSideNumber.side5">
                              {{ bSideNumber.side5 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bSideNumber.side6">
                              {{ bSideNumber.side6 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-if="bSideNumber.side7 === ''" v-model="bSideNumber.side7">
                              　
                            </el-text>
                            <el-text v-else v-model="bSideNumber.side7">
                              {{ bSideNumber.side7 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bSideNumber.side8">
                              {{ bSideNumber.side8 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bSideNumber.side9">
                              {{ bSideNumber.side9 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bSideNumber.side10">
                              {{ bSideNumber.side10 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bSideNumber.side11">
                              {{ bSideNumber.side11 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bSideNumber.side12">
                              {{ bSideNumber.side12 }}
                            </el-text>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item class="borderVue mb-0" label="B側平均值：">{{ bSideNumber.sideNumberAverage
                        }}</el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
                <el-card header="五、間隙寬度(mm)" class="mb-1" shadow="never">
                  <el-row class="borderVue mb-0">
                    <el-col :span="24">
                      <el-form-item class="borderVue mb-0" label="A側：">
                        <el-row class="w-100 text-center">
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-if="aGapWidth.side1 === ''" v-model="aGapWidth.side1">
                              　
                            </el-text>
                            <el-text v-else v-model="aGapWidth.side1">
                              {{ aGapWidth.side1 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aGapWidth.side2">
                              {{ aGapWidth.side2 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aGapWidth.side3">
                              {{ aGapWidth.side3 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aGapWidth.side4">
                              {{ aGapWidth.side4 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aGapWidth.side5">
                              {{ aGapWidth.side5 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="aGapWidth.side6">
                              {{ aGapWidth.side6 }}
                            </el-text>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="A側平均值：">{{ aGapWidth.sideNumberAverage
                          }}</el-form-item>
                      </el-col>
                      <el-form-item class="borderVue mb-0" label="B側：">
                        <el-row class="w-100 text-center">
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-if="bGapWidth.side1 === ''" v-model="bGapWidth.side1">
                              　
                            </el-text>
                            <el-text v-else v-model="bGapWidth.side1">
                              {{ bGapWidth.side1 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bGapWidth.side2">
                              {{ bGapWidth.side2 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bGapWidth.side3">
                              {{ bGapWidth.side3 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bGapWidth.side4">
                              {{ bGapWidth.side4 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bGapWidth.side5">
                              {{ bGapWidth.side5 }}
                            </el-text>
                          </el-col>
                          <el-col class="borderVue mb-0" :span="4">
                            <el-text v-model="bGapWidth.side6">
                              {{ bGapWidth.side6 }}
                            </el-text>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <el-col :span="24">
                        <el-form-item class="borderVue mb-0" label="B側平均值：">{{ bGapWidth.sideNumberAverage
                          }}</el-form-item>
                      </el-col>
                    </el-col>
                  </el-row>
                </el-card>
              </el-form>
              <template #footer>
                <div class="dialog-footer">
                  <el-button @click="recordTablePreviewDialogVisible = false">關閉</el-button>
                  <el-button type="primary" @click="recordTablePreviewDialogVisible = false">
                    列印?
                  </el-button>
                </div>
              </template>
            </el-dialog>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
