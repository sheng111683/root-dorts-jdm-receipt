<script setup lang="ts">
import type { TableColumnCtx, TabsPaneContext } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { MouseMenuCtx, MouseMenuDirective } from '@howdyjs/mouse-menu'
import type { CustomMouseMenuOptions } from '@howdyjs/mouse-menu'
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

const vMouseMenu = MouseMenuDirective
const activeName = ref('first')
function handleClick(tab: TabsPaneContext, event: Event) {
  console.log(tab, event)
}
definePageMeta({ layout: 'admin' })
const loginTimeNow = new Date().toLocaleString()
const criteria = reactive({
  loginNumber: '20240703091303',
  loginTime: loginTimeNow,
  requester: '材試課查證組',
  loginPerson: '楊OO',
  labelNumber: '',
  telephone: '28969750 分機 652',
  contractor: '',
  fax: '28947627',
  supplier: '',
  mobilePhone: '0911649615',
  samplingLocation: '',
  address: '臺北市北投區大業路527巷86號',
  samplingPersonnel: '',
  samplingUnit: '材試課查證組',
  samplingDate: new Date(),
  sampleCollection: 'false',
  specification: '',
  sampleNumber: '',
  sampleName: '竹節鋼筋',
  steelBarFurnaceNumber: '',
  typesOfSteelBars: '',
  rebarNumber: '',
  appearanceMeasurementChecked: false,
  tensileTestChecked: false,
  bendingTestChecked: false,
  radiationMeasurementChecked: false,
  hardnessTestChecked: false,
  chemistryTestChecked: false,
  clientRemarks: '',
  sampleCollectionRemarks: '',
  placeSlotNumber: '11',
  quantity: '',
  signOffPersonnel: '',
  sign: '',
  signingOpinions: '',
  checkDocuments: '',
  receivingMethod: [],
  placeSlotNumberInput: '',
  reportTemplate: '',
  dataVersion: '無版次',
  ...getDefaultCriteria(),
})
const previewDialogVisible = ref(false)
const sampleCollectionOptions = ref([
  { value: 'true', label: '是' },
  { value: 'false', label: '否' },
])
const experimentMethodOptions = ref([
  { value: 'flat', label: '扁平' },
  { value: 'slender', label: '細長' },
  { value: 'flatAndLong', label: '扁長' },
])
const radioProportionOptions = ref([
  { value: '1:2', label: '1:2' },
  { value: '1:3', label: '1:3' },
  { value: '1:4', label: '1:4' },
  { value: '1:5', label: '1:5' },
])
const radioUseOptions = ref([
  { value: 'quality', label: '顆粒質量計算' },
  { value: 'quantity', label: '顆粒數量計算' },
])

const receivingMethodOptions = ['實驗室收件', '工地現場收件', '貨運收件']
interface Datas {
  type: string
  taf: boolean
  testNumber: string
  pilotProjects: string
  testSpecifications: string
  barcode: string
  testData: string
  experimentMethod: Array
  radioProportion: string
  radioUse: string
}
const datas: Datas[] = [
  { type: '', taf: true, testNumber: 'I240500', pilotProjects: '鋼筋外觀尺寸試驗', testSpecifications: 'CNS6492:2024', barcode: '', testData: '', experimentMethod: [], radioProportion: '', radioUse: '' },
  { type: '', taf: true, testNumber: 'I240500', pilotProjects: '鋼筋抗拉試驗', testSpecifications: 'CNS6492:2024', barcode: '', testData: '', experimentMethod: [], radioProportion: '', radioUse: '' },
  { type: '', taf: true, testNumber: 'I240500', pilotProjects: '鋼筋抗彎試驗', testSpecifications: 'CNS6492:2024', barcode: '', testData: '', experimentMethod: [], radioProportion: '', radioUse: '' },
  { type: '', taf: false, testNumber: 'I240501', pilotProjects: '工程材料輻射量檢測', testSpecifications: 'none', barcode: '', testData: '', experimentMethod: [], radioProportion: '', radioUse: '' },
  { type: '', taf: false, testNumber: 'I240502', pilotProjects: '鋼筋硬度試驗', testSpecifications: 'CNS6492:2024', barcode: '', testData: '', experimentMethod: [], radioProportion: '', radioUse: '' },
  { type: '', taf: true, testNumber: 'I240503', pilotProjects: '鋼筋化性試驗', testSpecifications: 'ISO16000:2021', barcode: '', testData: '', experimentMethod: [], radioProportion: '', radioUse: '' },
  { type: 'coarseAggregate', taf: true, testNumber: 'I240503', pilotProjects: '粗粒料中扁平、細長、扁長粒料試驗', testSpecifications: 'CNS 15171:2008', barcode: '', testData: '', experimentMethod: [], radioProportion: '', radioUse: '' },
]

interface SpanMethodProps {
  row: Datas
  column: TableColumnCtx<Datas>
  rowIndex: number
  columnIndex: number
}
function synchronizationSpecification() {
  datas[1].testSpecifications = datas[0].testSpecifications
  datas[2].testSpecifications = datas[0].testSpecifications
}
function objectSpanMethod({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) {
  if (columnIndex === 3) {
    if (rowIndex % 6 === 0) {
      return {
        rowspan: 6,
        colspan: 1,
      }
    }
    else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
  if (columnIndex === 2 && rowIndex === 0) {
    if (rowIndex % 3 === 0) {
      return {
        rowspan: 3,
        colspan: 1,
      }
    }
    else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
}

function testProcessSpanMethod({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) {
  if (columnIndex === 5 || columnIndex === 6 || columnIndex === 7) {
    if (rowIndex === 0) {
      if (rowIndex % 3 === 0) {
        return {
          rowspan: 3,
          colspan: 1,
        }
      }
      else {
        return {
          rowspan: 0,
          colspan: 0,
        }
      }
    }
  }
}
const specificationOptions = [
  {
    value: 'none',
    label: '[無規範]',
  },
  {
    value: 'CNS6492:2024',
    label: 'CNS6492:2024',
  },
  {
    value: 'CNS6492:2023',
    label: 'CNS6492:2023',
  },
  {
    value: 'CNS6493:2024',
    label: 'CNS6493:2024',
  },
  {
    value: 'ISO20000:2023',
    label: 'ISO20000:2023',
  },
  {
    value: 'ISO16000:2021',
    label: 'ISO16000:2021',
  },
  {
    value: 'CNS 15171:2008',
    label: 'CNS 15171:2008',
  },
]

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

// 管制表data
const controlOrderData = {
  sampleName: criteria.sampleName,
  placeSlotNumber: criteria.placeSlotNumber,
  logInTime: '2024/05/28 下午12:10:41',
  sampleCollector: '陳姵妤',
  sampleCollectionTime: '2024/05/30 下午02:58:27',
  estimatedCompletionDate: '2024/06/05(星期三)',
  clientRemarks: criteria.clientRemarks,
  sampleCollection: criteria.sampleCollection,
  remarksFromSampleRecipient: '1.試驗件描述：竹節鋼筋 2.確認試驗件之鋼種規格、數量與委託資訊相符，另試驗件長度亦符合試驗及收樣標準規定。 3.長度約為1.4M',
}
// 繕打編輯區
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
function reportingJump() {
  reportingDialogVisible.value = false
  navigateTo({ path: '/admin/entrustOrderApplication/Reporting' })
}
// 收樣區塊
const sampleCollectionArea = ref('first')
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

// 粗中粒料
const coarseAggregate = reactive({
  coarsePelletsKg: '',
  coarsePelletsBag: '',
  proportion: 'false',
  coarseScale: '',
  mediumRatio: '',
  mediumGrainKg: '',
  mediumGrainBag: '',
  typeOfGranules: 'none',
})
const proportionOptions = ref([
  { value: 'true', label: '有配比' },
  { value: 'false', label: '無配比' },
])
function coarseToMediumRatio() {
  const coarseScale = Number.parseFloat(coarseAggregate.coarseScale)
  const mediumRatio = 100 - coarseScale
  coarseAggregate.mediumRatio = mediumRatio.toFixed(2).toString()
  const coarsePelletsKg = Number.parseFloat(coarseAggregate.coarsePelletsKg)
  const totalKg = coarsePelletsKg / (coarseScale / 100)
  coarseAggregate.mediumGrainKg = (totalKg - coarsePelletsKg).toFixed(2).toString()
}
watch(
  () => coarseAggregate,
  (newValue) => {
    if (newValue.coarseScale !== '' && newValue.coarsePelletsKg !== '') {
      coarseToMediumRatio()
    }
    if (newValue.coarsePelletsBag !== '') {
      coarseAggregate.mediumGrainBag = newValue.coarsePelletsBag
    }
  },
  { deep: true },
)
const typeOfGranulesOptions = ref([
  { value: 'type1', label: 'TYPE Ⅰ' },
  { value: 'type2', label: 'TYPE Ⅱ' },
  { value: 'none', label: '無' },
])
// 圓柱試樣
const cylindricalSpecimen = reactive(
  {
    sampleName: '',
    moldMakingDate: '',
    designStrength: '',
    intensityUnit: '',
    productionUnit: '',
    maintenanceUnitFirst: '',
    maintenanceMethodFirst: '',
    maintenanceConditionsFirst: '',
    maintenanceStartAndEndTimeFirst: '',
    maintenanceUnitSecond: '',
    maintenanceMethodSecond: '',
    maintenanceConditionsSecond: '',
    maintenanceStartAndEndTimeSecond: '',
    maintenanceUnitThird: '',
    maintenanceMethodThird: '',
    maintenanceConditionsThird: '',
    maintenanceStartAndEndTimeThird: '',
    quantity: '',
    numberOfStressResistantDays: '',
    numberOfPieces: '',
  },
)
const sampleNameOptions = [
  { value: '1530', label: '15×30圓柱試體' },
  { value: '1515', label: '15×15圓柱試體' },
  { value: '2050', label: '20×50圓柱試體' },
  { value: '2055', label: '20×55圓柱試體' },
]

function disabledDate(time) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return time.getTime() >= today.getTime()
}

const intensityUnitOptions = [
  { value: 'kg', label: 'kgf/cm²' },
  { value: 'N', label: 'N/mm²' },
]
function handleChange(value: number) {
  console.log(value)
}

function GetAntiStressDate() {

}

function resetMaintenance(No) {
  const maintenanceUnitKey = `maintenanceUnit${No}`
  const maintenanceMethodKey = `maintenanceMethod${No}`
  const maintenanceConditionsKey = `maintenanceConditions${No}`
  const maintenanceStartAndEndTimeKey = `maintenanceStartAndEndTime${No}`
  cylindricalSpecimen[maintenanceUnitKey] = ''
  cylindricalSpecimen[maintenanceMethodKey] = ''
  cylindricalSpecimen[maintenanceConditionsKey] = ''
  cylindricalSpecimen[maintenanceStartAndEndTimeKey] = ''
}
// 簽核流程
const signOptions = ref([
  { value: 'notReviewed', label: '未審核' },
  { value: 'audited', label: '已審核' },
  { value: 'ok', label: '可' },
  { value: 'return', label: '退回' },
])
const signOffPersonnelOptions = [
  {
    label: '技術團',
    options: [
      {
        value: '駐馬拉威技術團',
        label: '駐馬拉威技術團',
      },
      {
        value: '駐史瓦帝',
        label: '駐史瓦帝',
      },
    ],
  },
  {
    label: '無',
    options: [
      {
        value: '國合會',
        label: '國合會',
      },
      {
        value: '工務局',
        label: '工務局',
      },
    ],
  },
]
interface dataTree {
  id: number
  label: string
  children?: dataTree[]
  approvalStatus?: string
  sign?: string
  sendTime?: string
  return?: string
}
const dataTree = ref<dataTree[]>([
  {
    id: 1,
    label: '20220930駐團測試',
    approvalStatus: '送出表單',
    sign: '送出表單',
    sendTime: '2024/01/29 11:16',
    children: [
      {
        id: 3,
        label: 'A技術團-團長',
        approvalStatus: '審核通過',
        sign: '通過',
        sendTime: '2024/02/29 16:16',
        children: [
          {
            id: 6,
            label: 'A技術團-隊員',
            approvalStatus: '未審核',
            sign: '未審核',
            sendTime: '2024/02/29 16:16',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '人力資源室-王OO',
    approvalStatus: '未審核',
    sign: '未審核',
    sendTime: '2024/02/29 16:16',
    children: [
      {
        id: 4,
        label: '人力資源室-林OO',
        approvalStatus: '審核中',
        sign: '審核中',
        sendTime: '2024/02/29 16:16',
      },
      {
        id: 5,
        label: '人力資源室-劉OO',
        approvalStatus: '未審核',
        sign: '未審核',
        sendTime: '2024/02/29 16:16',
        children: [
          {
            id: 7,
            label: '人力資源室-吳OO',
            approvalStatus: '退回',
            sign: '退回',
            sendTime: '2024/02/29 16:16',
            return: '1',
          },
        ],
      },
    ],
  },
])
const selectedNode = ref<dataTree | null>(null)
const defaultProps = {
  children: 'children',
  label: 'label',
}
function handleNodeClick(data: dataTree) {
  selectedNode.value = data
  const { parent, index } = findNodeIndexInParent(dataTree.value, data)
  console.log('Index in Parent:', index)
}
const editDialogVisible = ref(false)
const addSubPersonnelDialogVisible = ref(false)
const addSubPersonnelDownDialogVisible = ref(false)
const addSubPersonnelUpDialogVisible = ref(false)
function handleClose() {
  editDialogVisible.value = false
  addSubPersonnelDialogVisible.value = false
  addSubPersonnelDownDialogVisible.value = false
  addSubPersonnelUpDialogVisible.value = false
}
// -----------右鍵選單區-----------
const contextOptions: CustomMouseMenuOptions = {
  useLongPressInMobile: true,
  customClass: 'custom-howdy-menu',
  menuWrapperCss: {
    background: '#ffffff',
    borderRadius: '6px',
    padding: '8px 6px',
    boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)',
    lineColor: '#ccc',
    lineMargin: '5px 10px',
  },
  menuItemCss: {
    arrowSize: '10px',
    iconFontSize: '18px',
    labelColor: '#5E6370',
    iconColor: '#5E6370',
    hoverBackground: '#b1b3b8',
  },
  menuList: [
    {
      label: '編輯',
      // tips: 'Open',
      fn: (params, currentEl, bindingEl, e) => {
        // console.log('edit', params, currentEl, bindingEl, e);
        editDialogVisible.value = true
      },
    },
    {
      label: '向上插入人員',
      fn: (params, currentEl, bindingEl, e) => {
        addSubPersonnelUpDialogVisible.value = true
      },
    },
    {
      label: '向下插入人員',
      fn: (params, currentEl, bindingEl, e) => {
        addSubPersonnelDownDialogVisible.value = true
      },
    },
    {
      label: '新增子人員',
      fn: (params, currentEl, bindingEl, e) => {
        addSubPersonnelDialogVisible.value = true
      },
    },
    {
      label: '刪除',
      fn: (params, currentEl, bindingEl, e) => {
        console.log(`${e}分開：${selectedNode.value}`)

        if (selectedNode.value) {
          const { parent, index } = findNodeIndexInParent(dataTree.value, selectedNode.value)
          if (parent && index !== -1) {
            parent.children?.splice(index, 1)
          }
          else {
            dataTree.value.splice(index, 1)
          }
          selectedNode.value = null
        }
      },
    },
  ],
  onOpen: (params, currentEl, bindingEl) => {
    console.log('onOpen', params, currentEl, bindingEl)
  },
  onClose: (params, currentEl, bindingEl) => {
    console.log('onClose', params, currentEl, bindingEl)
  },
  longPressDuration: 300,
  longPressPreventDefault: (e, el) => {
    console.log({ e, el })
    return false
  },
}
// 找出父層以及陣列位置
function findNodeIndexInParent(tree: dataTree[], targetNode: dataTree): { parent: dataTree | undefined, index: number } {
  const isNodeEqual = (node1: dataTree, node2: dataTree): boolean => {
    return node1.id === node2.id
  }

  const findParentAndIndex = (nodes: dataTree[], parent: dataTree | undefined): { parent: dataTree | undefined, index: number } => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (isNodeEqual(node, targetNode)) {
        return { parent, index: i }
      }
      if (node.children) {
        const result = findParentAndIndex(node.children, node)
        if (result.parent) {
          return result
        }
      }
    }
    return { parent: undefined, index: -1 }
  }

  return findParentAndIndex(tree, undefined)
}
// 尋找當前的節點
function findNodeInTree(tree: dataTree[], targetNode: dataTree): dataTree | undefined {
  const isNodeEqual = (node1: dataTree, node2: dataTree): boolean => {
    return node1.id === node2.id
  }
  const findInChildren = (nodes: dataTree[]): dataTree | undefined => {
    for (const node of nodes) {
      if (isNodeEqual(node, targetNode)) {
        return node
      }
      if (node.children) {
        const foundInChildren = findInChildren(node.children)
        if (foundInChildren) {
          return foundInChildren
        }
      }
    }
    return undefined
  }
  return findInChildren(tree)
}

function editTreeData(data: dataTree) {
  if (selectedNode.value) {
    const nodeToUpdate = findNodeInTree(dataTree.value, selectedNode.value)
    if (nodeToUpdate) {
      nodeToUpdate.label = criteria.signOffPersonnel
    }
  }
  editDialogVisible.value = false
}
// 新增子層
function addNewNode(selectedNode: Ref<dataTree | null>, dataTree: Ref<dataTree[]>) {
  if (selectedNode.value) {
    const newNode: dataTree = {
      id: Date.now(),
      label: criteria.signOffPersonnel,
      approvalStatus: '未審核',
      sign: '未審核',
      sendTime: new Date().toLocaleString(),
    }
    if (!selectedNode.value.children) {
      selectedNode.value.children = []
    }
    selectedNode.value.children.push(newNode)
  }
  addSubPersonnelDialogVisible.value = false
}
function addTreeData(data: dataTree) {
  if (!criteria.signOffPersonnel) {
    alert('請選擇人員')
    return
  }
  addNewNode(selectedNode, dataTree)
  editDialogVisible.value = false
}
// 向下新增
function addNewNodeDown(selectedNode: Ref<dataTree | null>, dataTree: Ref<dataTree[]>) {
  if (selectedNode.value) {
    const newNode: dataTree = {
      id: Date.now(),
      label: criteria.signOffPersonnel,
      approvalStatus: '未審核',
      sign: '未審核',
      sendTime: new Date().toLocaleString(),
    }
    const { parent, index } = findNodeIndexInParent(dataTree.value, selectedNode.value)
    if (parent && index !== -1) {
      parent.children?.splice(index + 1, 0, newNode)
    }
    else {
      dataTree.value.splice(index + 1, 0, newNode)
    }
  }
}
function addTreeDataDown(data: dataTree) {
  if (!criteria.signOffPersonnel) {
    alert('請選擇人員')
    return
  }
  addNewNodeDown(selectedNode, dataTree)
  addSubPersonnelDownDialogVisible.value = false
}
// 向上新增
function addNewNodeUp(selectedNode: Ref<dataTree | null>, dataTree: Ref<dataTree[]>) {
  if (selectedNode.value) {
    const newNode: dataTree = {
      id: Date.now(),
      label: criteria.signOffPersonnel,
      approvalStatus: '未審核',
      sign: '未審核',
      sendTime: new Date().toLocaleString(),
    }
    const { parent, index } = findNodeIndexInParent(dataTree.value, selectedNode.value)
    if (parent && index !== -1) {
      parent.children?.splice(index, 0, newNode)
    }
    else {
      dataTree.value.splice(index, 0, newNode)
    }
  }
}
function addTreeDataUp(data: dataTree) {
  if (!criteria.signOffPersonnel) {
    alert('請選擇人員')
    return
  }
  addNewNodeUp(selectedNode, dataTree)
  addSubPersonnelUpDialogVisible.value = false
}
function reset() {
  criteria.labelNumber = ''
  criteria.contractor = ''
  criteria.supplier = ''
  criteria.samplingLocation = ''
  criteria.samplingPersonnel = ''
  criteria.samplingDate = new Date()
  criteria.sampleCollection = 'false'
  criteria.typesOfSteelBars = ''
  criteria.rebarNumber = ''
  criteria.appearanceMeasurementChecked = false
  criteria.tensileTestChecked = false
  criteria.bendingTestChecked = false
  criteria.radiationMeasurementChecked = false
  criteria.hardnessTestChecked = false
  criteria.chemistryTestChecked = false
  criteria.clientRemarks = ''
  criteria.sampleCollectionRemarks = ''
  criteria.quantity = ''
  criteria.signOffPersonnel = ''
  criteria.sign = ''
  criteria.signingOpinions = ''
  criteria.checkDocuments = ''
  criteria.receivingMethod = []
  criteria.placeSlotNumberInput = ''
  criteria.checkDocuments = ''
  criteria.placeSlotNumberInput = ''
  coarseAggregate.coarsePelletsKg = ''
  coarseAggregate.coarsePelletsBag = ''
  coarseAggregate.proportion = 'false'
  coarseAggregate.coarseScale = ''
  coarseAggregate.mediumRatio = ''
  coarseAggregate.mediumGrainKg = ''
  coarseAggregate.mediumGrainBag = ''
  coarseAggregate.typeOfGranules = 'none'
  cylindricalSpecimen.sampleName = ''
  cylindricalSpecimen.moldMakingDate = ''
  cylindricalSpecimen.designStrength = ''
  cylindricalSpecimen.intensityUnit = ''
  cylindricalSpecimen.productionUnit = ''
  cylindricalSpecimen.quantity = ''
  cylindricalSpecimen.numberOfStressResistantDays = '0'
  cylindricalSpecimen.numberOfPieces = '0'
  resetMaintenance('First')
  resetMaintenance('Second')
  resetMaintenance('Third')
}

// ----------問卷區-----------

const questionnaire = reactive({
  questionnaireNumber: 'Q2024001',
  signed: '不具名',
  collectionDate: '',
  score: '',
  fillInTheDate: '',
})

const questionnaireDatas = reactive([
  { projectNumber: '1', questionnaireQuestions: '對本實驗室之委託試驗自動化系統', answerType: '1~10分', score: '' },
  { projectNumber: '2', questionnaireQuestions: '對本實驗室之試驗作業效率', answerType: '1~10分', score: '' },
  { projectNumber: '3', questionnaireQuestions: '對本實驗室所出具試驗報告之正確性', answerType: '1~10分', score: '' },
  { projectNumber: '4', questionnaireQuestions: '對本實驗室之專業及服務事項答覆是否滿意', answerType: '1~10分', score: '' },
  { projectNumber: '5', questionnaireQuestions: '對本實驗室收樣人員之服務態度', answerType: '1~10分', score: '' },
  { projectNumber: '6', questionnaireQuestions: '對本實驗室顧客抱怨之處理方式是否滿意', answerType: '1~10分', score: '' },
  { projectNumber: '7', questionnaireQuestions: '對本實驗室所提供服務的整體滿意度', answerType: '1~10分', score: '' },
  { projectNumber: '8', questionnaireQuestions: '對專屬顧客之資訊保密是否滿意', answerType: '1~10分', score: '' },
  { projectNumber: '9', questionnaireQuestions: '對本實驗室執行實驗室活動之公正性是否滿意', answerType: '1~10分', score: '' },
  { projectNumber: '10', questionnaireQuestions: '對本實驗室是否有其他意見(建議)事項?', answerType: '自由填寫', score: '' },
])
questionnaireDatas.sort((a, b) => Number(a.projectNumber) - Number(b.projectNumber))
function handleSave() {
  ElMessage.success('資料已更新')
  getToday('填寫')
  console.log(questionnaireDatas)
}

function getToday(collection) {
  if (collection === '領取') {
    questionnaire.collectionDate = new Date().toLocaleString()
  }
  if (collection === '填寫') {
    questionnaire.fillInTheDate = new Date().toLocaleString()
  }
}
const scoreOptions = [
  { value: '10', label: '10' },
  { value: '9', label: '9' },
  { value: '8', label: '8' },
  { value: '7', label: '7' },
  { value: '6', label: '6' },
  { value: '5', label: '5' },
  { value: '4', label: '4' },
  { value: '3', label: '3' },
  { value: '2', label: '2' },
  { value: '1', label: '1' },
]
const dataVersionOptions = [
  { value: '無版次', label: '無版次' },
  { value: 'V1 - 2024/07/12 12:59:59', label: 'V1 - 2024/07/12 12:59:59' },
]
function noNaturalPerson() {
  ElMessage({
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: '<div><strong>警告</strong></br></br><p>之後需要自然人憑證補登後，才能進行發通知流程謝謝。</p></div>',
    // message: '此委託申請單，簽署自然人憑證尚未補登，請完成補登後，再發通知謝謝。',
    type: 'warning',
  })
  previewDialogVisible.value = false
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
        <el-card header="編輯頁" class="mt-4">
          <el-tabs v-model="activeName" class="demo-tabs" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="委託試驗登入表" name="first">
              <el-card class="mt-4">
                <el-form label-width="auto" style="max-width: 650px;">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="登入編號：">
                        <el-text v-model="criteria.loginNumber">
                          {{ criteria.loginNumber }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="登入時間：">
                        <el-text v-model="criteria.loginTime">
                          {{ criteria.loginTime }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="委託單位：">
                        <el-text v-model="criteria.requester">
                          {{ criteria.requester }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="登入者：">
                        <el-text v-model="criteria.loginPerson">
                          {{ criteria.loginPerson }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="標號：">
                        <el-input v-model="criteria.labelNumber" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="電話：">
                        <el-text v-model="criteria.telephone">
                          {{ criteria.telephone }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="承包商：">
                        <el-input v-model="criteria.contractor" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="傳真：">
                        <el-text v-model="criteria.fax">
                          {{ criteria.fax }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="供料商：">
                        <el-input v-model="criteria.supplier" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="手機：">
                        <el-text v-model="criteria.mobilePhone">
                          {{ criteria.mobilePhone }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="取樣地點：">
                        <el-input v-model="criteria.samplingLocation" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="地址：">
                        <el-text v-model="criteria.address">
                          {{ criteria.address }}
                        </el-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="取樣人員：">
                        <el-input v-model="criteria.samplingPersonnel" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="取樣單位：">
                        <el-input v-model="criteria.samplingUnit" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="取樣日期：">
                        <el-date-picker v-model="criteria.samplingDate" type="date" placeholder="選擇日期" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="" />
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <el-form-item label="試樣領回：">
                        <el-radio-group v-model="criteria.sampleCollection" class="ml-4">
                          <el-radio v-for="option in sampleCollectionOptions" :value="option.value">
                            {{
                              option.label }}
                          </el-radio>
                          <el-tag type="info">
                            (若無要求，試樣於試驗完成5日後直接送至『廢料儲存區』，等待銷毀運棄。)
                          </el-tag>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-table :data="datas" border style="width: 100%" :span-method="objectSpanMethod">
                  <el-table-column label="#" width="55">
                    <template #default="scope">
                      {{ scope.$index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="pilotProjects" label="試驗項目">
                    <template #default="{ row }">
                      <el-row v-if="row.type === 'coarseAggregate'">
                        <el-checkbox>
                          <el-text v-if="row.taf === true" type="danger" tag="b" size="large">
                            ※
                          </el-text>
                          <el-text>{{ row.pilotProjects }}</el-text>
                        </el-checkbox>
                        <el-col>
                          <el-form-item class="mb-0" label="試驗方法">
                            <el-checkbox
                              v-for="item in experimentMethodOptions" :key="item.value"
                              v-model="row.experimentMethod" :value="item.value" :label="item.label"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col />
                        <el-col>
                          <el-form-item class="mb-0" label="比例">
                            <el-radio-group v-model="row.radioProportion" class="ml-4">
                              <el-radio v-for="item in radioProportionOptions" :key="item.value" :value="item.value">
                                {{ item.label }}
                              </el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                        <el-col>
                          <el-form-item class="mb-0" label="採用">
                            <el-radio-group v-model="row.radioUse" class="ml-4">
                              <el-radio v-for="item in radioUseOptions" :key="item.value" :value="item.value">
                                {{ item.label }}
                              </el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-checkbox v-else>
                        <el-text v-if="row.taf === true" type="danger" tag="b" size="large">
                          ※
                        </el-text>
                        <el-text>{{ row.pilotProjects }}</el-text>
                      </el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column prop="testSpecifications" label="試驗規範">
                    <template #default="{ row }">
                      <el-select
                        v-model="row.testSpecifications" placeholder="請選擇"
                        @change="synchronizationSpecification()"
                      >
                        <el-option
                          v-for="item in specificationOptions" :key="item.value" :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="備註">
                    <ol>
                      <li>試樣長度1.2m以上</li>
                      <li>申請單註明放置槽號</li>
                      <li>同一號數、爐號做抗拉、抗彎時取兩支。</li>
                      <li>委託試驗單上請註明種類、型式、支數、供應商、爐號。</li>
                      <li>鋼筋應筆直，不能有目視明顯的翹曲現象。</li>
                      <li>實驗室之硬度試驗為HRA，非規範規定Hv之測試方法，其結果僅供參考，不能作為是否為線上熱處理鋼筋判定。</li>
                      <li>D10(No.3)鋼筋限於設備能量不接受化性委託試驗。</li>
                      <li>鋼筋硬度試驗僅接受D19(No.6)(含)以上鋼筋。</li>
                      <li>鋼筋機械性質不合格而須辦理重驗時，應另取2支鋼筋(同批原爐號)送驗，且需同時委託外觀尺度試驗。</li>
                    </ol>
                  </el-table-column>
                </el-table>
                <p style="background-color: #dedfe0;">
                  有"<el-text type="danger" tag="b" size="large">
                    ※
                  </el-text>"者為經TAF認可之試驗項目
                </p>
                <el-form-item label="委託者備註">
                  <el-input v-model="criteria.clientRemarks" type="textarea" :rows="3" />
                </el-form-item>
                <el-form class="mb-3">
                  <!-- 收樣區塊 -->
                  <el-tabs
                    v-model="sampleCollectionArea" type="border-card" class="demo-tabs mb-3"
                    @tab-click="handleClick"
                  >
                    <el-tab-pane label="竹節鋼筋" name="first">
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
                    </el-tab-pane>
                    <el-tab-pane label="粗中粒料" name="second">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="試樣名稱：">
                            <el-text :span="12" size="large" tag="b" style="color:#73767a;background: #ecf5ff;">
                              粗中粒料級配料
                            </el-text>
                            <el-col :span="12">
                              <el-radio-group v-model="coarseAggregate.proportion" class="ml-4">
                                <el-radio v-for="option in proportionOptions" :value="option.value">
                                  {{
                                    option.label }}
                                </el-radio>
                              </el-radio-group>
                            </el-col>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="粗粒料約：">
                            <el-row>
                              <el-col :span="6">
                                <!-- <el-input-number v-model="coarseAggregate.coarsePelletsKg" :precision="2" :step="0.1" :min="0" size="small"/> -->
                                <el-input
                                  v-model="coarseAggregate.coarsePelletsKg" type="number" :precision="2"
                                  :step="0.1" :min="0"
                                />
                              </el-col>
                              <el-col :span="6">
                                公斤
                              </el-col>
                              <el-col :span="6">
                                <!-- <el-input-number v-model="coarseAggregate.coarsePelletsBag" :step="1" :min="0" size="small"/> -->
                                <el-input v-model="coarseAggregate.coarsePelletsBag" type="number" :min="0" />
                              </el-col>
                              <el-col :span="6">
                                袋
                              </el-col>
                            </el-row>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="粗中配比：">
                            <el-row>
                              <el-col :span="2">
                                粗
                              </el-col>
                              <el-col :span="4">
                                <!-- <el-input-number v-model="coarseAggregate.coarseScale" :precision="2" :step="0.1" :min="0" size="small"/> -->
                                <el-input
                                  v-model="coarseAggregate.coarseScale" type="number" :precision="2" :step="0.1"
                                  min="0"
                                />
                              </el-col>
                              <el-col :span="2">
                                ％
                              </el-col>
                              <el-col :span="2">
                                ：
                              </el-col>
                              <el-col :span="2">
                                中
                              </el-col>
                              <el-col :span="4">
                                <!-- <el-input-number v-model="coarseAggregate.mediumRatio" :precision="2" :step="0.1" :min="0" size="small"/> -->
                                <el-input
                                  v-model="coarseAggregate.mediumRatio" type="number" :precision="2" :step="0.1"
                                  min="0"
                                />
                              </el-col>
                              <el-col :span="3">
                                ％
                              </el-col>
                              <el-col :span="3" />
                            </el-row>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="中粒料約：">
                            <el-row>
                              <el-col :span="6">
                                <el-input v-model="coarseAggregate.mediumGrainKg" disabled />
                              </el-col>
                              <el-col :span="6">
                                公斤
                              </el-col>
                              <el-col :span="6">
                                <el-input v-model="coarseAggregate.mediumGrainBag" disabled />
                              </el-col>
                              <el-col :span="6">
                                袋
                              </el-col>
                            </el-row>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="粒料種類：">
                            <el-radio-group v-model="coarseAggregate.typeOfGranules" class="ml-4">
                              <el-radio v-for="option in typeOfGranulesOptions" :value="option.value">
                                {{
                                  option.label }}
                              </el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="圓柱試體" name="third">
                      <el-row :gutter="20">
                        <el-col :span="8">
                          <el-form-item label="試樣名稱：">
                            <el-select v-model="cylindricalSpecimen.sampleName" placeholder="請選擇">
                              <el-option
                                v-for="item in sampleNameOptions" :key="item.value" :label="item.label"
                                :value="item.value"
                              />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="16">
                          <el-form-item label="製模日期：">
                            <div class="block">
                              <el-date-picker
                                v-model="cylindricalSpecimen.moldMakingDate" type="date" placeholder="請選擇"
                                :disabled-date="disabledDate"
                              />
                            </div>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="設計強度：">
                            <el-input v-model="cylindricalSpecimen.designStrength" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="16">
                          <el-form-item>
                            <el-radio-group v-model="cylindricalSpecimen.intensityUnit" class="ml-4">
                              <el-radio v-for="option in intensityUnitOptions" :value="option.value">
                                {{
                                  option.label }}
                              </el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="試體製作及養護資訊：">
                            <el-col :span="24">
                              <el-form-item label="製作單位">
                                <el-col :span="6">
                                  <el-input v-model="cylindricalSpecimen.productionUnit" />
                                </el-col>
                                <el-col :span="18">
                                  <el-button type="info" plain size="small">
                                    同供料商
                                  </el-button>
                                  <el-button type="info" plain size="small">
                                    查
                                  </el-button>
                                </el-col>
                              </el-form-item>
                            </el-col>
                            <!-- 第1階段 -->
                            <el-form-item>
                              <el-col :span="8">
                                <el-text tag="ins">
                                  (送本實驗室前第1段養護紀錄，若無則免填)
                                </el-text>
                              </el-col>
                              <el-col :span="16">
                                <el-button type="info" plain size="small" @click="resetMaintenance('First')">
                                  清除第1段養護資料
                                </el-button>
                              </el-col>
                              <el-col :span="24">
                                <el-form-item label="養護單位1">
                                  <el-col :span="6">
                                    <el-input v-model="cylindricalSpecimen.maintenanceUnitFirst" />
                                  </el-col>
                                  <el-col :span="18">
                                    <el-button type="info" plain size="small">
                                      同供料商
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      查
                                    </el-button>
                                  </el-col>
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="養護方式1">
                                  <el-col :span="8" style="min-width:120px;">
                                    <el-input v-model="cylindricalSpecimen.maintenanceMethodFirst" />
                                  </el-col>
                                  <el-col :span="16" style="min-width:200px;">
                                    <el-button type="info" plain size="small">
                                      水
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      乾
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      蒸
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      拌
                                    </el-button>
                                  </el-col>
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="養護條件1">
                                  <el-col :span="8" style="min-width:120px;">
                                    <el-input v-model="cylindricalSpecimen.maintenanceConditionsFirst" />
                                  </el-col>
                                  <el-col :span="16" style="min-width:200px;">
                                    <el-button type="info" plain size="small">
                                      (23.0±2.0)℃
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      大氣溫度
                                    </el-button>
                                  </el-col>
                                </el-form-item>
                              </el-col>
                              <el-col :spna="12">
                                <el-form-item label="養護起迄時間1">
                                  <el-col :span="24">
                                    <el-date-picker
                                      v-model="cylindricalSpecimen.maintenanceStartAndEndTimeFirst"
                                      type="datetimerange" range-separator="到" start-placeholder="起" end-placeholder="迄"
                                      date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss" placeholder="請選擇日期時間"
                                      format="YYYY-MM-DD HH:mm"
                                    />
                                  </el-col>
                                </el-form-item>
                              </el-col>
                            </el-form-item>
                            <!-- 第2階段 -->
                            <el-form-item>
                              <el-col :span="8">
                                <el-text tag="ins">
                                  (送本實驗室前第2段養護紀錄，若無則免填)
                                </el-text>
                              </el-col>
                              <el-col :span="16">
                                <el-button type="info" plain size="small" @click="resetMaintenance('Second')">
                                  清除第2段養護資料
                                </el-button>
                              </el-col>
                              <el-col :span="24">
                                <el-form-item label="養護單位2">
                                  <el-col :span="6" style="min-width:120px;">
                                    <el-input v-model="cylindricalSpecimen.maintenanceUnitSecond" />
                                  </el-col>
                                  <el-col :span="18">
                                    <el-button type="info" plain size="small">
                                      同供料商
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      查
                                    </el-button>
                                  </el-col>
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="養護方式2">
                                  <el-col :span="8" style="min-width:120px;">
                                    <el-input v-model="cylindricalSpecimen.maintenanceMethodSecond" />
                                  </el-col>
                                  <el-col :span="16" style="min-width:200px;">
                                    <el-button type="info" plain size="small">
                                      水
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      乾
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      蒸
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      拌
                                    </el-button>
                                  </el-col>
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="養護條件2">
                                  <el-col :span="8" style="min-width:120px;">
                                    <el-input v-model="cylindricalSpecimen.maintenanceConditionsSecond" />
                                  </el-col>
                                  <el-col :span="16" style="min-width:200px;">
                                    <el-button type="info" plain size="small">
                                      (23.0±2.0)℃
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      大氣溫度
                                    </el-button>
                                  </el-col>
                                </el-form-item>
                              </el-col>
                              <el-col :spna="12">
                                <el-form-item label="養護起迄時間2">
                                  <el-col :span="24">
                                    <el-date-picker
                                      v-model="cylindricalSpecimen.maintenanceStartAndEndTimeSecond"
                                      type="datetimerange" range-separator="到" start-placeholder="起" end-placeholder="迄"
                                      date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss" placeholder="請選擇日期時間"
                                      format="YYYY-MM-DD HH:mm"
                                    />
                                  </el-col>
                                </el-form-item>
                              </el-col>
                            </el-form-item>
                            <!-- 第3階段 -->
                            <el-form-item>
                              <el-col :span="8">
                                <el-text tag="ins">
                                  (送本實驗室前第3段養護紀錄，若無則免填)
                                </el-text>
                              </el-col>
                              <el-col :span="16">
                                <el-button type="info" plain size="small" @click="resetMaintenance('Third')">
                                  清除第3段養護資料
                                </el-button>
                              </el-col>
                              <el-col :span="24">
                                <el-form-item label="養護單位3">
                                  <el-col :span="6" style="min-width:120px;">
                                    <el-input v-model="cylindricalSpecimen.maintenanceUnitThird" />
                                  </el-col>
                                  <el-col :span="18">
                                    <el-button type="info" plain size="small">
                                      同供料商
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      查
                                    </el-button>
                                  </el-col>
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="養護方式3">
                                  <el-col :span="8" style="min-width:120px;">
                                    <el-input v-model="cylindricalSpecimen.maintenanceMethodThird" />
                                  </el-col>
                                  <el-col :span="16" style="min-width:200px;">
                                    <el-button type="info" plain size="small">
                                      水
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      乾
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      蒸
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      拌
                                    </el-button>
                                  </el-col>
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="養護條件3">
                                  <el-col :span="8" style="min-width:120px;">
                                    <el-input v-model="cylindricalSpecimen.maintenanceConditionsThird" />
                                  </el-col>
                                  <el-col :span="16" style="min-width:200px;">
                                    <el-button type="info" plain size="small">
                                      (23.0±2.0)℃
                                    </el-button>
                                    <el-button type="info" plain size="small">
                                      大氣溫度
                                    </el-button>
                                  </el-col>
                                </el-form-item>
                              </el-col>
                              <el-col :spna="12">
                                <el-form-item label="養護起迄時間3">
                                  <el-col :span="24">
                                    <el-date-picker
                                      v-model="cylindricalSpecimen.maintenanceStartAndEndTimeThird"
                                      type="datetimerange" range-separator="到" start-placeholder="起" end-placeholder="迄"
                                      date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss" placeholder="請選擇日期時間"
                                      format="YYYY-MM-DD HH:mm"
                                    />
                                  </el-col>
                                </el-form-item>
                              </el-col>
                            </el-form-item>
                            <el-form-item>
                              <el-col :span="6" style="min-width: 190px;">
                                <el-form-item label="抗壓天數">
                                  <el-input-number
                                    v-model="cylindricalSpecimen.numberOfStressResistantDays"
                                    class="mx-4" :min="0" :max="99" controls-position="right" size="small"
                                    @change="handleChange"
                                  />
                                </el-form-item>
                              </el-col>
                              <el-col :span="6" style="min-width: 190px;">
                                <el-form-item label="顆數">
                                  <el-input-number
                                    v-model="cylindricalSpecimen.numberOfPieces" class="mx-4" :min="0"
                                    :max="99" controls-position="right" size="small" @change="handleChange"
                                  />
                                </el-form-item>
                              </el-col>
                              <el-col :span="12" />
                              <el-col :span="24">
                                <el-button class="mt-5" @click="GetAntiStressDate()">
                                  取得抗壓日期
                                </el-button>
                              </el-col>
                            </el-form-item>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Task" name="fourth" />
                  </el-tabs>
                  <el-row class="borderVue mb-5">
                    <el-col :span="24">
                      <el-form-item class="borderVue mb-0" label="核對證件">
                        <el-checkbox
                          v-model="criteria.checkDocuments" class="borderVue ps-1" style="width:100%"
                          label="已核對身份證件。備註："
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item class="borderVue mb-0" label="收件方式">
                        <el-checkbox-group v-model="criteria.receivingMethod" class="borderVue ps-1" style="width:100%">
                          <el-checkbox
                            v-for="receive in receivingMethodOptions" :key="receive" :label="receive"
                            :value="receive"
                          >
                            {{ receive }}
                          </el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item class="borderVue mb-0 " label="放置槽號">
                        <el-input v-model="criteria.placeSlotNumberInput" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- 收樣備註 -->
                  <el-form-item label="收樣備註">
                    <el-input v-model="criteria.sampleCollectionRemarks" type="textarea" :rows="3" />
                  </el-form-item>
                </el-form>
                <el-row :gutter="20">
                  <el-col :span="16">
                    <ClientOnly>
                      <el-button type="primary" plain @click="sendSave()">
                        送出收樣資料
                      </el-button>
                      <el-button type="success" plain @click="sendSave()">
                        送出登入資料
                      </el-button>
                      <el-button type="primary" plain @click="sendSave()">
                        儲存
                      </el-button>
                      <el-button type="info" plain @click="reset()">
                        <AdminIcon name="i-carbon:reset" class="pr-1" />
                        重設
                      </el-button>
                    </ClientOnly>
                  </el-col>
                </el-row>
                <el-tag type="danger" class="mt-3">
                  依TAF規定：委託案工程名稱、委託單位及試驗項目等資訊將回報予TAF。
                </el-tag>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="試驗流程管制表" name="second">
              <el-row :gutter="20" class="borderVue mb-5" style="width: 100%">
                <el-col class="borderVue" :span="4">
                  <el-text size="large">
                    試樣名稱
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="20">
                  <el-text v-model="controlOrderData.sampleName" size="large">
                    {{
                      controlOrderData.sampleName
                    }}
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="4">
                  <el-text size="large">
                    放置槽號
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="20">
                  <el-text v-model="controlOrderData.placeSlotNumber" size="large">
                    第
                    {{ controlOrderData.placeSlotNumber }}
                    號槽
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="4">
                  <el-text size="large">
                    登錄時間
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="20">
                  <el-text size="large">
                    {{ controlOrderData.logInTime }}
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="4">
                  <el-text size="large">
                    收樣者
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="20">
                  <el-text size="large">
                    {{ controlOrderData.sampleCollector }}
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="4">
                  <el-text size="large">
                    收樣時間
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="20">
                  <el-text size="large">
                    {{ controlOrderData.sampleCollectionTime }}
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="4">
                  <el-text size="large">
                    預計完成日期
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="20">
                  <el-text size="large">
                    {{ controlOrderData.estimatedCompletionDate }}
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="4">
                  <el-text size="large">
                    報告類別
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="20">
                  <el-link type="primary" size="large">
                    請出具電子報告
                  </el-link>
                </el-col>
                <el-col class="borderVue" :span="4">
                  <el-text size="large">
                    委託者備註
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="20">
                  <el-text v-if="criteria.clientRemarks === ''" size="large">
                    [無資料]
                  </el-text>
                  <el-text v-if="criteria.clientRemarks !== ''" size="large">
                    {{ criteria.clientRemarks
                    }}
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="4">
                  <el-text size="large">
                    試樣領回
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="20">
                  <el-text v-if="controlOrderData.sampleCollection === 'false'" size="large">
                    本件試驗委託者無要求領回試樣
                  </el-text>
                  <el-text v-if="controlOrderData.sampleCollection === 'true'" size="large">
                    是
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="4">
                  <el-text size="large">
                    收樣者備註
                  </el-text>
                </el-col>
                <el-col class="borderVue" :span="20">
                  <el-text size="large">
                    {{ controlOrderData.remarksFromSampleRecipient }}
                  </el-text>
                </el-col>
              </el-row>
              <el-table :data="datas" border class="mb-3" style="width: 100%" :span-method="testProcessSpanMethod">
                <el-table-column label="#" width="55">
                  <template #default="scope">
                    {{ scope.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-cplumn prop="testNumber" label="試驗編號" />
                <el-table-column prop="pilotProjects" label="試驗項目" />
                <el-table-column prop="testSpecifications" label="試驗規範">
                  <template #default="{ row }">
                    <el-text v-if="row.testSpecifications === 'none'">
                      ---
                    </el-text>
                    <el-text v-else>
                      {{ row.testSpecifications }}
                    </el-text>
                  </template>
                </el-table-column>
                <el-table-column prop="testData" label="試驗數據" />
                <el-table-column label="開始及結束用條碼">
                  <template #default="{ row }">
                    <img src="./sample.png" alt="">
                  </template>
                </el-table-column>
                <el-table-column label="試驗數據" width="160" align="center">
                  <template #default="scope">
                    <el-col :span="24">
                      <el-button type="warning" @click="reportingDialogVisible = true">
                        開始試驗
                      </el-button>
                    </el-col>
                    <el-col :span="24">
                      <el-button
                        type="success"
                        @click="navigateTo({ path: '/admin/experimentalProjectFeatures/FillIn' })"
                      >
                        填寫數據
                      </el-button>
                    </el-col>
                  </template>
                </el-table-column>
                <el-table-column label="報告繕打" width="160" align="center">
                  <el-col :span="24">
                    <el-button type="warning" @click="reportingDialogVisible = true">
                      開始繕打
                    </el-button>
                  </el-col>
                  <el-col :span="24">
                    <el-button type="success" @click="reportingJump()">
                      修改
                    </el-button>
                  </el-col>
                </el-table-column>
                <el-table-column label="試驗報告" width="160" align="center">
                  <template #default="scope">
                    <el-button type="primary" @click="previewDialogVisible = true">
                      瀏覽
                    </el-button>
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
                    <el-button type="primary" @click="reportingJump()">
                      確定
                    </el-button>
                  </div>
                </template>
              </el-dialog>
              <!-- ---------報告繕打對話框--------- -->
              <el-table :data="sampleTableDatas" border class="mb-3" style="width: 100%">
                <el-table-column prop="sampleNumber" label="試樣編號" />
                <el-table-column prop="typesOfSteelBars" label="鋼筋種類" />
                <el-table-column prop="rebarNumber" label="鋼筋號數" />
                <el-table-column prop="steelBarFurnaceNumber" label="鋼筋爐號" />
                <el-table-column label="外觀量測" width="55" align="center">
                  <template #default="{ row }">
                    <el-text v-if="row.appearanceMeasurementChecked === false">
                      [無]
                    </el-text>
                    <el-text v-if="row.appearanceMeasurementChecked === true">
                      ●
                    </el-text>
                  </template>
                </el-table-column>
                <el-table-column label="抗拉試驗" width="55" align="center">
                  <template #default="{ row }">
                    <el-text v-if="row.tensileTestChecked === false">
                      [無]
                    </el-text>
                    <el-text v-if="row.tensileTestChecked === true">
                      ●
                    </el-text>
                  </template>
                </el-table-column>
                <el-table-column label="抗彎試驗" width="55" align="center">
                  <template #default="{ row }">
                    <el-text v-if="row.bendingTestChecked === false">
                      [無]
                    </el-text>
                    <el-text v-if="row.bendingTestChecked === true">
                      ●
                    </el-text>
                  </template>
                </el-table-column>
                <el-table-column label="輻射量測" width="55" align="center">
                  <template #default="{ row }">
                    <el-text v-if="row.radiationMeasurementChecked === false">
                      [無]
                    </el-text>
                    <el-text v-if="row.radiationMeasurementChecked === true">
                      ●
                    </el-text>
                  </template>
                </el-table-column>
                <el-table-column label="硬度試驗" width="55" align="center">
                  <template #default="{ row }">
                    <el-text v-if="row.hardnessTestChecked === false">
                      [無]
                    </el-text>
                    <el-text v-if="row.hardnessTestChecked === true">
                      ●
                    </el-text>
                  </template>
                </el-table-column>
                <el-table-column label="化性試驗" width="55" align="center">
                  <template #default="{ row }">
                    <el-text v-if="row.chemistryTestChecked === false">
                      [無]
                    </el-text>
                    <el-text v-if="row.chemistryTestChecked === true">
                      ●
                    </el-text>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <el-row :gutter="20">
                                <el-col :span="24" class="borderVue" align="center">流程表簽核欄</el-col>
                                <el-col :span="4" style="height: 80px;" class="borderVue">分樣者</el-col>
                                <el-col :span="20" class="borderVue">試驗者</el-col>
                            </el-row> -->
            </el-tab-pane>
            <el-tab-pane label="簽核流程" name="third">
              <el-card header="瀏覽稽核流程">
                <el-row>
                  <el-col :span="12">
                    <el-tree
                      v-mouse-menu="contextOptions" :data="dataTree" :props="defaultProps"
                      :highlight-current="true" :expand-on-click-node="false" node-key="id"
                      @node-click="handleNodeClick"
                    >
                      <template #default="{ node, data }">
                        <span class="custom-tree-node">
                          <span>{{ node.label }}</span>
                          <el-tag
                            v-if="data.approvalStatus === '未審核'" effect="light" type="info" class="ms-5"
                            size="small" round
                          >
                            {{ data.approvalStatus }}
                          </el-tag>
                          <el-tag
                            v-if="data.approvalStatus === '審核中'" effect="light" type="primary" class="ms-5"
                            size="small" round
                          >
                            {{ data.approvalStatus }}
                          </el-tag>
                          <el-tag
                            v-if="data.approvalStatus === '退回'" effect="light" type="danger" class="ms-5"
                            size="small" round
                          >
                            {{ data.approvalStatus }}
                          </el-tag>
                          <el-tag
                            v-if="data.approvalStatus === '審核通過'" effect="light" type="success" class="ms-5"
                            size="small" round
                          >
                            {{ data.approvalStatus }}
                          </el-tag>
                          <el-tag
                            v-if="data.approvalStatus === '送出表單'" effect="light" type="warning" class="ms-5"
                            size="small" round
                          >
                            {{ data.approvalStatus }}
                          </el-tag>
                        </span>
                        <el-dialog v-model="editDialogVisible" title="編輯" width="500" :before-close="handleClose">
                          <el-form-item label="簽核人員">
                            <el-select v-model="criteria.signOffPersonnel" placeholder="請選擇">
                              <el-option-group
                                v-for="group in signOffPersonnelOptions" :key="group.label"
                                :label="group.label"
                              >
                                <el-option
                                  v-for="item in group.options" :key="item.value" :label="item.label"
                                  :value="item.value"
                                />
                              </el-option-group>
                            </el-select>
                          </el-form-item>
                          <template #footer>
                            <div class="dialog-footer">
                              <el-button @click="editTreeData">
                                儲存
                              </el-button>
                              <el-button type="primary" @click="editDialogVisible = false">
                                取消
                              </el-button>
                            </div>
                          </template>
                        </el-dialog>
                        <el-dialog
                          v-model="addSubPersonnelDialogVisible" title="新增子人員" width="500"
                          :before-close="handleClose"
                        >
                          <el-form-item label="簽核人員">
                            <el-select v-model="criteria.signOffPersonnel" placeholder="請選擇">
                              <el-option-group
                                v-for="group in signOffPersonnelOptions" :key="group.label"
                                :label="group.label"
                              >
                                <el-option
                                  v-for="item in group.options" :key="item.value" :label="item.label"
                                  :value="item.value"
                                />
                              </el-option-group>
                            </el-select>
                          </el-form-item>
                          <template #footer>
                            <div class="dialog-footer">
                              <el-button @click="addTreeData">
                                儲存
                              </el-button>
                              <el-button type="primary" @click="addSubPersonnelDialogVisible = false">
                                取消
                              </el-button>
                            </div>
                          </template>
                        </el-dialog>
                        <el-dialog
                          v-model="addSubPersonnelDownDialogVisible" title="向下新增人員" width="500"
                          :before-close="handleClose"
                        >
                          <el-form-item label="簽核人員">
                            <el-select v-model="criteria.signOffPersonnel" placeholder="請選擇">
                              <el-option-group
                                v-for="group in signOffPersonnelOptions" :key="group.label"
                                :label="group.label"
                              >
                                <el-option
                                  v-for="item in group.options" :key="item.value" :label="item.label"
                                  :value="item.value"
                                />
                              </el-option-group>
                            </el-select>
                          </el-form-item>
                          <template #footer>
                            <div class="dialog-footer">
                              <el-button @click="addTreeDataDown">
                                儲存
                              </el-button>
                              <el-button type="primary" @click="addSubPersonnelDownDialogVisible = false">
                                取消
                              </el-button>
                            </div>
                          </template>
                        </el-dialog>
                        <el-dialog
                          v-model="addSubPersonnelUpDialogVisible" title="向上新增人員" width="500"
                          :before-close="handleClose"
                        >
                          <el-form-item label="簽核人員">
                            <el-select v-model="criteria.signOffPersonnel" placeholder="請選擇">
                              <el-option-group
                                v-for="group in signOffPersonnelOptions" :key="group.label"
                                :label="group.label"
                              >
                                <el-option
                                  v-for="item in group.options" :key="item.value" :label="item.label"
                                  :value="item.value"
                                />
                              </el-option-group>
                            </el-select>
                          </el-form-item>
                          <template #footer>
                            <div class="dialog-footer">
                              <el-button @click="addTreeDataUp">
                                儲存
                              </el-button>
                              <el-button type="primary" @click="addSubPersonnelUpDialogVisible = false">
                                取消
                              </el-button>
                            </div>
                          </template>
                        </el-dialog>
                      </template>
                    </el-tree>
                  </el-col>
                  <el-col :span="12">
                    <el-card style="max-width: 480px;" class="m-2">
                      <template #header>
                        <div class="card-header">
                          <span>簽核內容</span>
                        </div>
                      </template>

                      <div v-if="selectedNode">
                        <p>簽辦 ： {{ selectedNode.sign }}</p>
                        <p>送出時間 ： {{ selectedNode.sendTime }}</p>
                        <p v-if="selectedNode.return">
                          退回原因 ：{{ selectedNode.return }}
                        </p>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="問卷" name="fourth">
              <el-card class="mb-3">
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      class="mb-0"
                      label="問卷編號："
                    >
                      {{ questionnaire.questionnaireNumber }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-col align="center">
                      <p class="text-center font-size-5 fw-bold">
                        工管處材料試驗課實驗室顧客意見調查表
                      </p>
                    </el-col>
                  </el-col>
                  <el-col class="mb-3" :span="24">
                    <el-text size="large">
                      親愛的顧客，您好：<br>
                      　　感謝您對本實驗室的支持與協助，您寶貴的意見，將作為我們日後改進的方向，祝您身體健康、萬事如意！
                      <br>
                      <br>
                    </el-text>
                    <el-text float="right" size="large">
                      工管處材料試驗課　敬上
                    </el-text>
                  </el-col>
                  <el-col :span="24">
                    <el-table
                      :data="questionnaireDatas" stripe border class="mb-3"
                      style="width: 100%"
                    >
                      <el-table-column
                        prop="projectNumber" align="center" label="項目編號"
                        width="55"
                      />
                      <el-table-column
                        prop="questionnaireQuestions" label="依照您的個人滿意程度點選適當分數，謝謝!"
                        width="320"
                      />
                      <el-table-column prop="answerType" label="10分表示非常滿意～0分表示非常不滿意(請您用0到10來給分)">
                        <template #default="scope">
                          <el-radio-group
                            v-if="scope.row.answerType === '1~10分'"
                            v-model="scope.row.score" class="ml-4"
                          >
                            <el-radio v-for="item in scoreOptions" :value="item.value">
                              {{ item.label }}
                            </el-radio>
                          </el-radio-group>
                          <el-input
                            v-if="scope.row.answerType === '自由填寫'"
                            v-model="scope.row.score" type="textarea"
                            :rows="3"
                          />
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item class="mb-2" label="是否具名(若具名將回報本室之處理情況)：">
                      <el-input v-model="questionnaire.signed" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col class="mb-3" :span="24">
                    <el-text
                      tag="ins"
                    >
                      為充分瞭解您的心聲，您若給分低於8分者，請將您的寶貴意見填入建議事項內，以利作為實驗室改善之依據，感謝您的配合。
                    </el-text>
                  </el-col>
                  <el-col :span="24">
                    <p class="text-center font-size-5 fw-bold">
                      謝謝您的合作
                    </p>
                  </el-col>
                  <el-col :span="24">
                    <el-button
                      class="me-3" type="primary" plain
                      @click="handleSave()"
                    >
                      儲存
                    </el-button>
                    <el-text float="right" size="large">
                      填寫日期：{{ questionnaire.fillInTheDate
                      }}
                    </el-text>
                  </el-col>
                </el-row>
              </el-card>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-button type="primary" plain @click="getToday('領取')">
                    報告領取
                  </el-button>
                  <el-text float="right" size="large">
                    第一次領取時間：{{ questionnaire.collectionDate }}
                  </el-text>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="5" name="five" />
          </el-tabs>
        </el-card>
        <el-card header="簽核資訊">
          <el-form-item label="簽辦：">
            <el-radio-group v-model="criteria.sign" class="ml-4">
              <el-radio v-for="option in signOptions" :value="option.value">
                {{
                  option.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="mb-0" label="簽辦意見：">
            <el-input v-model="criteria.signingOpinions" type="textarea" :rows="3" />
            <el-text>(最大輸入長度為500字)</el-text>
          </el-form-item>
          <el-col>
            <el-text tag="b" type="danger">
              簽署尚未自然人憑證補登，請注意須補登完後，才可進行通知作業
            </el-text>
          </el-col>
        </el-card>
        <el-card>
          <el-row :gutter="20">
            <el-col :span="16">
              <ClientOnly>
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
  <!-- 對話框 -->
  <el-dialog v-model="previewDialogVisible" top="20vh" style="width: 1000px;" title="瀏覽" center>
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
        <el-col>
          <el-text>尚未使用自然人憑證簽署(a11f7262-176c-402b-adf3-148a29bf4c31)，請補登。</el-text>
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
          簽署(需要自然人憑證)
        </el-button>
        <el-button @click="noNaturalPerson()">
          簽署(不需要自然人憑證)
        </el-button>
        <el-button>
          補登自然人憑證
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style>
.borderVue {
  border: 1px solid #c8c9cc;
  /* border-top:1px solid #c8c9cc; */
}
</style>
