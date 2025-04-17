<script setup lang="ts">
import type { ComponentSize, FormInstance, FormRules, VNode, VNodeProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  orderName: '',
  sampleName: '',
  specimenType: '',
  quantity: '',
  openType: '',
  ...getDefaultCriteria(),
})
const specimenTypeOptions = [
  { value: '竹節鋼筋', label: '竹節鋼筋' },
  { value: '粗中粒料', label: '粗中粒料' },
  { value: '圓柱試體', label: '圓柱試體' },
]
interface RuleForm {
  orderName: string
  sampleName: string
  specimenType: string
  openType: string
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  orderName: '',
  sampleName: '',
  specimenType: '',
  openType: '',
})
const rules = reactive<FormRules<RuleForm>>({
  orderName: [
    { required: true, message: '請輸入內容', trigger: 'blur' },
    { min: 1, max: 99, message: '', trigger: 'blur' },
  ],
  sampleName: [
    { required: true, message: '請輸入內容', trigger: 'blur' },
    { min: 1, max: 99, message: '', trigger: 'blur' },
  ],
  specimenType: [
    { required: true, message: '請輸入內容', trigger: 'blur' },
    { min: 1, max: 99, message: '', trigger: 'blur' },
  ],
})
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
interface TestProjectOption {
  key: number
  label: string
  disabled: boolean
}
const testProjectShuttleBox = [
  { key: 1, label: '鋼筋外觀尺寸試驗&鋼筋抗拉試驗&鋼筋抗彎試驗', disabled: false },
  { key: 2, label: '鋼筋抗彎試驗', disabled: false },
  { key: 3, label: '工程材料輻射量檢測', disabled: false },
  { key: 4, label: '鋼筋硬度試驗', disabled: false },
  { key: 5, label: '鋼筋化性試驗', disabled: false },
  { key: 6, label: '竹節鋼筋尺寸試驗', disabled: false },
  { key: 7, label: '鋼筋抗拉試驗', disabled: false },
  { key: 8, label: '鋼筋抗彎試驗', disabled: false },
  { key: 9, label: '工程材料輻射量檢測', disabled: false },
  { key: 10, label: '鋼筋硬度試驗', disabled: false },
  { key: 11, label: '鋼筋化性試驗', disabled: false },
  { key: 12, label: '粗粒料篩分析試驗', disabled: false },
  { key: 13, label: '粒料內小於75μm(No.200)篩材料含量試驗', disabled: false },
  { key: 14, label: '粗粒料密度、相對密度(比重)及吸水率試驗', disabled: false },
  { key: 15, label: '粗粒料中扁平、細長、扁長粒料試驗', disabled: false },
  { key: 16, label: '粗粒料磨損率(洛杉磯)試驗', disabled: false },
  { key: 17, label: '混泥土試體強度試驗', disabled: false },
  { key: 18, label: '水溶液中氯離子含量試驗', disabled: false },
  { key: 19, label: '水溶液pH值試驗', disabled: false },
]
const testProjectShuttleBoxLength = Number(testProjectShuttleBox.length)
function generateData(): TestProjectOption[] {
  const data: TestProjectOption[] = []
  for (let i = 0; i <= 18; i++) {
    data.push({
      key: testProjectShuttleBox[i].key,
      label: testProjectShuttleBox[i].label,
      disabled: testProjectShuttleBox[i].disabled,
    })
  }
  return data
}

const data = ref(generateData())
const leftValue = ref([1])
function renderFunc(h: (type: string, props: VNodeProps | null, children?: string) => VNode, option: Option) {
  return h('span', null, option.label)
}
function handleChange(value: number[] | string[], direction: 'left' | 'right', movedKeys: string[] | number[]) {
  console.log(value, direction, movedKeys)
}

const centerDialogVisible = ref(false)
const typesOfSteelBarsOptions = [
  {
    value: 'CNS SD420W',
    label: 'CNS SD420W',
  },
  {
    value: 'CNS SD420',
    label: 'CNS SD420',
  },
  {
    value: 'CNS SD280W',
    label: 'CNS SD280W',
  },
  {
    value: 'CNS SD280',
    label: 'CNS SD280',
  },
]
const rebarNumberOptions = [
  {
    value: 'D10',
    label: 'D10',
  },
  {
    value: 'D13',
    label: 'D13',
  },
  {
    value: 'D16',
    label: 'D16',
  },
  {
    value: 'D19',
    label: 'D19',
  },
  {
    value: 'D22',
    label: 'D22',
  },
]
function increaseTheAmount() {
  const amount = Number(criteria.quantity)
  if (criteria.quantity !== '') {
    for (let i = 0; i < amount; i++) {
      const bambooSteelBarsSampleDatas = {
        sampleNumber: '',
        typesOfSteelBars: '',
        rebarNumber: '',
        supplier: '',
        steelBarFurnaceNumber: '',
        appearanceMeasurementChecked: false,
        tensileTestChecked: false,
        bendingTestChecked: false,
        radiationMeasurementChecked: false,
        hardnessTestChecked: false,
        chemistryTestChecked: false,
      }
      sampleTableDatas.push(bambooSteelBarsSampleDatas)
    }
  }
}
// 竹節鋼筋
const sampleTableDatas = reactive([
  {
    sampleNumber: '1',
    typesOfSteelBars: 'CNS SD280W',
    rebarNumber: 'D10',
    supplier: '',
    steelBarFurnaceNumber: '',
    appearanceMeasurementChecked: true,
    tensileTestChecked: false,
    bendingTestChecked: false,
    radiationMeasurementChecked: true,
    hardnessTestChecked: true,
    chemistryTestChecked: false,
  },
  {
    sampleNumber: '2',
    typesOfSteelBars: 'CNS SD420W',
    rebarNumber: 'D10',
    supplier: '',
    steelBarFurnaceNumber: '',
    appearanceMeasurementChecked: false,
    tensileTestChecked: true,
    bendingTestChecked: false,
    radiationMeasurementChecked: false,
    hardnessTestChecked: true,
    chemistryTestChecked: true,
  },
])

function sendSave() {
  ElMessageBox.confirm('即將送出資料', '請確認', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('資料已送出')
    history.back()
    // navigateTo({ path: '/admin/entrustOrderApplication' })
    reset()
  }).catch(() => {
    ElMessage.info('取消送出')
  })
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="製作委託單">
          <el-form ref="ruleFormRef" label-width="auto" :rules="rules" :model="ruleForm">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="委託單名稱：" prop="orderName">
                  <el-input v-model="ruleForm.orderName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上架狀態:">
                  <el-select v-model="ruleForm.openType" placeholder="請選擇">
                    <el-option
                      v-for="item in openTypes" :key="item.value"
                      :label="item.label" :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="試樣名稱：" prop="sampleName">
                  <el-input v-model="ruleForm.sampleName" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="試樣類型：" prop="specimenType">
                  <el-select v-model="ruleForm.specimenType" placeholder="請選擇">
                    <el-option
                      v-for="item in specimenTypeOptions" :key="item.value"
                      :label="item.label" :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button @click="centerDialogVisible = true">
                  瀏覽
                </el-button>
              </el-col>
              <el-dialog v-model="centerDialogVisible" title="瀏覽" width="60%" top="21vh" center>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="試樣名稱：">
                      <el-text size="large" tag="b" class="mb-3" style="color:#73767a;background: #ecf5ff;">
                        竹節鋼筋
                      </el-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="數量：">
                      <el-col :span="4">
                        <el-input v-model="criteria.quantity" />
                      </el-col>
                      <el-col :span="2">
                        <el-text>支</el-text>
                      </el-col>
                      <el-col :span="18">
                        <el-button @click="increaseTheAmount()">
                          確定
                        </el-button>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-table :data="sampleTableDatas" border class="mb-3" style="width: 100%">
                  <el-table-column prop="sampleNumber" label="試樣編號">
                    <template #default="{ row }">
                      <el-input v-model="row.sampleNumber" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="typesOfSteelBars" label="鋼筋種類">
                    <template #default="{ row }">
                      <el-select v-model="row.typesOfSteelBars" placeholder="請選擇">
                        <el-option
                          v-for="item in typesOfSteelBarsOptions" :key="item.value" :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="rebarNumber" label="鋼筋號數">
                    <template #default="{ row }">
                      <el-select v-model="row.rebarNumber" placeholder="請選擇">
                        <el-option
                          v-for="item in rebarNumberOptions" :key="item.value" :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="supplier" label="供料商">
                    <template #default="{ row }">
                      <el-input v-model="row.supplier" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="steelBarFurnaceNumber" label="鋼筋爐號">
                    <template #default="{ row }">
                      <el-input v-model="row.steelBarFurnaceNumber" />
                    </template>
                  </el-table-column>
                  <el-table-column label="外觀量測" width="55" align="center">
                    <template #default="{ row }">
                      <el-checkbox v-model="row.appearanceMeasurementChecked" />
                    </template>
                  </el-table-column>
                  <el-table-column label="抗拉試驗" width="55" align="center">
                    <template #default="{ row }">
                      <el-checkbox v-model="row.tensileTestChecked" />
                    </template>
                  </el-table-column>
                  <el-table-column label="抗彎試驗" width="55" align="center">
                    <template #default="{ row }">
                      <el-checkbox v-model="row.bendingTestChecked" />
                    </template>
                  </el-table-column>
                  <el-table-column label="輻射量測" width="55" align="center">
                    <template #default="{ row }">
                      <el-checkbox v-model="row.radiationMeasurementChecked" />
                    </template>
                  </el-table-column>
                  <el-table-column label="硬度試驗" width="55" align="center">
                    <template #default="{ row }">
                      <el-checkbox v-model="row.hardnessTestChecked" />
                    </template>
                  </el-table-column>
                  <el-table-column label="化性試驗" width="55" align="center">
                    <template #default="{ row }">
                      <el-checkbox v-model="row.chemistryTestChecked" />
                    </template>
                  </el-table-column>
                </el-table>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">
                      取消
                    </el-button>
                  </div>
                </template>
              </el-dialog>
              <el-col :span="3" />
              <el-col :span="18">
                <el-transfer
                  v-model="leftValue"
                  filterable
                  :left-default-checked="[2, 3]"
                  :right-default-checked="[1]"
                  :render-content="renderFunc"
                  :titles="['試驗項目', '已選擇']"
                  :button-texts="['取消', '加入']"
                  :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}',
                  }"
                  :data="data"
                  @change="handleChange"
                >
                  <template #left-footer>
                    <el-button class="transfer-footer" size="small">
                      Operation
                    </el-button>
                  </template>
                  <template #right-footer>
                    <el-button class="transfer-footer" size="small">
                      Operation
                    </el-button>
                  </template>
                </el-transfer>
              </el-col>
              <el-col :span="3" />
            </el-row>
            <el-row class="mt-5" :gutter="20">
              <el-col :span="16">
                <ClientOnly>
                  <el-button plain @click="$router.back()">
                    回上一頁
                  </el-button>
                  <el-button plain type="primary" @click="sendSave()">
                    儲存
                  </el-button>
                </ClientOnly>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
