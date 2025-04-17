<script setup lang="ts">
import { Check, CircleClose, Delete, Edit, Message, RefreshLeft, Search, Star } from '@element-plus/icons-vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })

const criteria = reactive({
  projectName: '',
  testNumber: '',
  contractors: '',
  page: '',
  pageTotal: '',
  requester: '',
  dateOfReceipt: '',
  address: '',
  testDate: '',
  supplier: '',
  reportDate: '',
  sampleName: '',
  samplingDate: '',
  sampleItems: '',
  samplingLocation: '',
  testSpecifications: '',
  samplingPersonnel: '',
  productSpecifications: '',
  inspectionPersonnel: '',
  thickness: '',
  correctionDate: '',
  measureArea: '',
  note: '',
  dataVersion: '',
  ...getDefaultCriteria(),
})
const ruleFormRef = ref<FormInstance>()
interface RuleForm {
  name: string
  projectName: string
}

const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  projectName: '',
})
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '請輸入您的名子', trigger: 'blur' },
    { min: 3, max: 5, message: '長度為3-5', trigger: 'blur' },
  ],
  projectName: [
    { required: true, message: '請輸入內容', trigger: 'blur' },
    { type: 'number', message: 'age must be a number' },
  ],
})
const measuringTableData = reactive([
  { detectionPosition: '', firstTest: '', secondTest: '', thirdTest: '', fourthTest: '', fifthTest: '', averageValue: '(平均值)', area: '' },
  { detectionPosition: '', firstTest: '', secondTest: '', thirdTest: '', fourthTest: '', fifthTest: '', averageValue: '', area: '' },
  { detectionPosition: '', firstTest: '', secondTest: '', thirdTest: '', fourthTest: '', fifthTest: '', averageValue: '', area: '' },
  { detectionPosition: '', firstTest: '', secondTest: '', thirdTest: '', fourthTest: '', fifthTest: '', averageValue: '', area: '' },
  { detectionPosition: '', firstTest: '', secondTest: '', thirdTest: '', fourthTest: '', fifthTest: '', averageValue: '', area: '' },
])
const previewDialogVisible = ref(false)
const dataVersionOptions = [
  { value: '無版次', label: '無版次' },
  { value: 'V1 - 2024/07/12 12:59:59', label: 'V1 - 2024/07/12 12:59:59' },
]
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
                  <el-select v-model="criteria.dataVersion" placeholder="請選擇">
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
      </el-col>
      <el-col :span="24">
        <el-card class="mb-5" header="報告繕打">
          <el-form
            ref="ruleFormRef" style="max-width: 800px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" status-icon
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="工程名稱：" prop="name">
                  <el-input v-model="criteria.projectName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="試驗編號：">
                  <el-input v-model="criteria.testNumber" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="承包廠商：" prop="name">
                  <el-input v-model="criteria.contractors" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="頁次：">
                  <el-row :gutter="20">
                    <el-text>第</el-text>
                    <el-col :span="6">
                      <el-input v-model="criteria.page" />
                    </el-col>
                    <el-text>頁</el-text>
                    <el-text>共</el-text>
                    <el-col :span="6">
                      <el-input v-model="criteria.pageTotal" />
                    </el-col>
                    <el-text>頁</el-text>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="委託單位：" prop="name">
                  <el-input v-model="criteria.requester" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收件日期：">
                  <el-input v-model="criteria.dateOfReceipt" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址：" prop="name">
                  <el-input v-model="criteria.address" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="試驗日期：">
                  <el-input v-model="criteria.testDate" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="供料商：" prop="name">
                  <el-input v-model="criteria.supplier" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="報告日期：">
                  <el-input v-model="criteria.reportDate" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="試樣名稱：">
                  <el-input v-model="criteria.sampleName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="取樣日期：" prop="name">
                  <el-input v-model="criteria.samplingDate" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="試樣項目：">
                  <el-input v-model="criteria.sampleItems" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="取樣地點：" prop="name">
                  <el-input v-model="criteria.samplingLocation" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="試驗規範：">
                  <el-input v-model="criteria.testSpecifications" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="取樣人員：" prop="name">
                  <el-input v-model="criteria.samplingPersonnel" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="產品規範：" prop="name">
                  <el-input v-model="criteria.productSpecifications" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="送驗人員：">
                  <el-input v-model="criteria.inspectionPersonnel" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="試驗場所：">
                  <el-text>本實驗室</el-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="會驗人員：">
                  <el-text>NA</el-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="使用儀器：">
                  <el-text>美國DeFelsko膜厚計，型號：PosiTector 200C/STD</el-text>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="參考物質：">
                  <el-col :span="10">
                    <el-form-item label="標準膜厚片，厚度：">
                      <el-input v-model="criteria.thickness" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-form-item>
                      <el-text>μm</el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="校正有效日期：">
                      <el-input v-model="criteria.correctionDate" />
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="量測面積(共)：">
                  <el-col :span="12">
                    <el-input v-model="criteria.measureArea" />
                  </el-col>
                  <el-col :span="12">
                    <el-text>m²</el-text>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col class="mb-5" :span="24">
                <el-table :data="measuringTableData" border>
                  <el-table-column align="center" label="項次" width="55">
                    <template #default="scope">
                      {{ scope.$index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="點亮測膜厚值">
                    <el-table-column align="center" prop="detectionPosition" label="檢測位置">
                      <template #default="scope">
                        <el-input v-model="scope.row.detectionPosition" />
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="firstTest" label="1">
                      <template #default="scope">
                        <el-input v-model="scope.row.firstTest" />
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="secondTest" label="2">
                      <template #default="scope">
                        <el-input v-model="scope.row.secondTest" />
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="thirdTest" label="3">
                      <template #default="scope">
                        <el-input v-model="scope.row.thirdTest" />
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="fourthTest" label="4">
                      <template #default="scope">
                        <el-input v-model="scope.row.fourthTest" />
                      </template>
                    </el-table-column>
                    <el-table-column align="center" prop="fifthTest" label="5">
                      <template #default="scope">
                        <el-input v-model="scope.row.fifthTest" />
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column align="center" prop="averageValue" label="面積量測膜厚值">
                    <template #default="scope">
                      <el-text v-if="scope.row.averageValue === '(平均值)'">
                        {{ scope.row.averageValue }}
                      </el-text>
                      <el-input v-else v-model="scope.row.averageValue" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="area" label="面積m²">
                    <template #default="scope">
                      <el-input v-model="scope.row.area" />
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24">
                <el-form-item label="附註：">
                  <el-input v-model="criteria.note" type="textarea" :rows="3" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 對話框 -->
            <el-dialog v-model="previewDialogVisible" style="width: 1000px;" title="瀏覽" center>
              <el-card>
                <el-row>
                  <el-col>
                    <el-text float="right">
                      MQ03-73-05
                    </el-text>
                  </el-col>
                  <el-col>
                    <img style="width: 100%;" src="./MRTTitle.png">
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="工程名稱：" prop="name">
                      <el-text v-model="criteria.projectName">
                        {{ criteria.projectName }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="試驗編號：">
                      <el-text v-model="criteria.testNumber">
                        {{ criteria.testNumber }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="承包廠商：" prop="name">
                      <el-text v-model="criteria.contractors">
                        {{ criteria.contractors }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="頁次：">
                      <el-text>第</el-text>
                      <el-text v-if="criteria.page === ''" />
                      <el-text v-else v-model="criteria.page">
                        {{ criteria.page }}
                      </el-text>
                      <el-text>頁</el-text>
                      <el-text>共</el-text>
                      <el-text v-if="criteria.pageTotal === ''" />
                      <el-text v-else v-model="criteria.pageTotal">
                        {{ criteria.pageTotal }}
                      </el-text>
                      <el-text>頁</el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="委託單位：" prop="name">
                      <el-text v-model="criteria.requester">
                        {{ criteria.requester }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="收件日期：">
                      <el-text v-model="criteria.dateOfReceipt">
                        {{ criteria.dateOfReceipt }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="地址：" prop="name">
                      <el-text v-model="criteria.address">
                        {{ criteria.address }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="試驗日期：">
                      <el-text v-model="criteria.testDate">
                        {{ criteria.testDate }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="供料商：" prop="name">
                      <el-text v-model="criteria.supplier">
                        {{ criteria.supplier }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="報告日期：">
                      <el-text v-model="criteria.reportDate">
                        {{ criteria.reportDate }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="試樣名稱：">
                      <el-text v-model="criteria.sampleName">
                        {{ criteria.sampleName }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="取樣日期：" prop="name">
                      <el-text v-model="criteria.samplingDate">
                        {{ criteria.samplingDate }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="試樣項目：">
                      <el-text v-model="criteria.sampleItems">
                        {{ criteria.sampleItems }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="取樣地點：" prop="name">
                      <el-text v-model="criteria.samplingLocation">
                        {{ criteria.samplingLocation }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="試驗規範：">
                      <el-text v-model="criteria.testSpecifications">
                        {{ criteria.testSpecifications }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="取樣人員：" prop="name">
                      <el-text v-model="criteria.samplingPersonnel">
                        {{ criteria.samplingPersonnel }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="產品規範：" prop="name">
                      <el-text v-model="criteria.productSpecifications">
                        {{ criteria.productSpecifications }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="送驗人員：">
                      <el-text v-model="criteria.inspectionPersonnel">
                        {{ criteria.inspectionPersonnel }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="試驗場所：">
                      <el-text>本實驗室</el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="會驗人員：">
                      <el-text>NA</el-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="使用儀器：">
                      <el-text>美國DeFelsko膜厚計，型號：PosiTector 200C/STD</el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="參考物質：">
                      <el-col :span="10">
                        <el-form-item label="標準膜厚片，厚度：">
                          <el-text v-model="criteria.thickness">
                            {{ criteria.thickness }}
                          </el-text>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2">
                        <el-form-item>
                          <el-text>μm</el-text>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="校正有效日期：">
                          <el-text v-model="criteria.correctionDate">
                            {{ criteria.correctionDate }}
                          </el-text>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="量測面積(共)：">
                      <el-col :span="12">
                        <el-text v-model="criteria.measureArea">
                          {{ criteria.measureArea }}
                        </el-text>
                      </el-col>
                      <el-col :span="12">
                        <el-text>m²</el-text>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col class="mb-5" :span="24">
                    <el-table :data="measuringTableData" border>
                      <el-table-column align="center" label="項次" width="55">
                        <template #default="scope">
                          {{ scope.$index + 1 }}
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="點亮測膜厚值">
                        <el-table-column align="center" prop="detectionPosition" label="檢測位置">
                          <template #default="scope">
                            <el-text v-model="scope.row.detectionPosition">
                              {{ scope.row.detectionPosition }}
                            </el-text>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" prop="firstTest" label="1">
                          <template #default="scope">
                            <el-text v-model="scope.row.firstTest">
                              {{ scope.row.firstTest }}
                            </el-text>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" prop="secondTest" label="2">
                          <template #default="scope">
                            <el-text v-model="scope.row.secondTest">
                              {{ scope.row.secondTest }}
                            </el-text>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" prop="thirdTest" label="3">
                          <template #default="scope">
                            <el-text v-model="scope.row.thirdTest">
                              {{ scope.row.thirdTest }}
                            </el-text>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" prop="fourthTest" label="4">
                          <template #default="scope">
                            <el-text v-model="scope.row.fourthTest">
                              {{ scope.row.fourthTest }}
                            </el-text>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" prop="fifthTest" label="5">
                          <template #default="scope">
                            <el-text v-model="scope.row.fifthTest">
                              {{ scope.row.fifthTest }}
                            </el-text>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column align="center" prop="averageValue" label="面積量測膜厚值">
                        <template #default="scope">
                          <el-text v-if="scope.row.averageValue === '(平均值)'">
                            {{ scope.row.averageValue }}
                          </el-text>
                          <el-text v-else v-model="scope.row.averageValue">
                            {{ scope.row.averageValue }}
                          </el-text>
                        </template>
                      </el-table-column>
                      <el-table-column prop="area" label="面積m²">
                        <template #default="scope">
                          <el-text v-model="scope.row.area">
                            {{ scope.row.area }}
                          </el-text>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="附註：">
                      <el-text v-model="criteria.note">
                        {{ criteria.note }}
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-text class="mt-5 ps-5 pe-5 mb-5" style="border-top: 1px solid" tag="b" float="right">
                      報 告 簽 署 人
                    </el-text>
                  </el-col>
                  <el-col>
                    <img style="width: 100%;" src="./MRTEnd.png">
                  </el-col>
                </el-row>
              </el-card>

              <template #footer>
                <div class="dialog-footer">
                  <el-button @click="previewDialogVisible = false">
                    關閉
                  </el-button>
                  <el-button type="primary" @click="previewDialogVisible = false">
                    下載
                  </el-button>
                  <el-button @click="previewDialogVisible = false">
                    簽署
                  </el-button>
                </div>
              </template>
            </el-dialog>
            <!-- 對話框 -->
            <el-row>
              <el-col :span="24">
                <el-button type="primary" plain @click="$router.back()">
                  儲存
                </el-button>
                <el-button type="success" plain @click="previewDialogVisible = true">
                  瀏覽
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-row>
          <el-col :span="24">
            <el-button @click="$router.back()">
              回上一頁
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
