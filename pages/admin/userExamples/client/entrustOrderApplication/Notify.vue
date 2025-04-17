<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
  getSysUserCriteria,
  getSysUserQueryResult,
} from '~/models'

definePageMeta({ layout: 'admin' })
const permissionStore = usePermissionStore()
const { isAdd, isEdit, isRemoved } = storeToRefs(permissionStore)

const criteria = reactive({
  index: '',
  questionnaireStyle: '',
  receiptInterval: [],
  recipient: [],
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())

const notifyDatas = reactive([
  { orderNumber: '20240701110011', orderName: '竹節鋼筋委託試驗登錄表', informer: '王曉明', notificationTime: '20240701', receiptInterval: ['20240701', '20240730'], recipient: ['方大同：20240702 12:00:00', '李小龍：'], questionnaireStyle: '一般', state: '歷程' },
  { orderNumber: '20240701110011', orderName: '竹節鋼筋委託試驗登錄表', informer: '王曉明', notificationTime: '20240705', receiptInterval: ['20240705', '20240804'], recipient: ['方大同：', '李小龍：'], questionnaireStyle: '一般', state: '已通知，領取中' },
  { orderNumber: '20240701110011', orderName: '竹節鋼筋委託試驗登錄表', informer: '王曉明', notificationTime: '20240705', receiptInterval: ['20240705', '20240804'], recipient: ['方大同：20240702 12:00:00', '李小龍：20240711 09:30:50'], questionnaireStyle: '一般', state: '已領取' },
])
const questionnaireStyleOptions = reactive([
  { value: '一般問卷', label: '一般問卷' },
  { value: '實驗問卷', label: '實驗問卷' },
])
const recipientOptions = reactive([
  { value: '方大同：', label: '方大同：' },
  { value: '李小龍：', label: '李小龍：' },
])

function formatDate(date) {
  const year = date.getFullYear()
  const month = (`0${date.getMonth() + 1}`).slice(-2)
  const day = (`0${date.getDate()}`).slice(-2)
  return `${year}${month}${day}`
}
const addNotificationsDialog = ref(false)
const editNotificationsDialog = ref(false)
const newNotifyDatas = [{ orderNumber: '20240701110011', orderName: '竹節鋼筋委託試驗登錄表', informer: '王曉明', notificationTime: '20240701', receiptInterval: [], recipient: [], questionnaireStyle: '', state: '歷程' }]
function openSetNotificationsDialog() {
  addNotificationsDialog.value = true
  criteria.questionnaireStyle = ''
  criteria.receiptInterval = []
  criteria.recipient = []
}
function addNewNotify() {
  if (criteria.receiptInterval.length !== 0 && criteria.questionnaireStyle !== '' && criteria.recipient.length !== 0) {
    // if (criteria.receiptInterval.length < 2) {
    //     criteria.receiptInterval.push('　')
    // }
    // if (criteria.recipient.length < 2) {
    //     criteria.recipient.push('　')
    // }
    ElMessage({
      showClose: true,
      dangerouslyUseHTMLString: true,
      message: '<div><strong>警告</strong></br></br><p>此委託申請單，簽署自然人憑證尚未補登，請完成補登後，再發通知謝謝。</p></div>',
      // message: '此委託申請單，簽署自然人憑證尚未補登，請完成補登後，再發通知謝謝。',
      type: 'warning',
    })
    const receiptDates = criteria.receiptInterval
    const formattedDates = receiptDates.map((date) => {
      const formattedDate = formatDate(date)
      return formattedDate
    })
    criteria.receiptInterval = formattedDates

    const newNotify = { orderNumber: '20240701110011', orderName: '竹節鋼筋委託試驗登錄表', informer: '王曉明', notificationTime: '20240701', receiptInterval: criteria.receiptInterval, recipient: criteria.recipient, firstCollectionDate: [], questionnaireStyle: criteria.questionnaireStyle, state: '歷程' }
    notifyDatas.push(newNotify)
  }

  addNotificationsDialog.value = false
}
function editNewNotify() {
  const index = Number(criteria.index)
  console.log(notifyDatas[index].recipient)
  console.log(criteria.recipient)
  if (criteria.receiptInterval !== notifyDatas[index].receiptInterval) {
    const receiptDates = criteria.receiptInterval
    const formattedDates = receiptDates.map((date) => {
      const formattedDate = formatDate(date)
      return formattedDate
    })
    criteria.receiptInterval = formattedDates
    notifyDatas[index].receiptInterval = criteria.receiptInterval
    // notifyDatas[index].recipient = criteria.recipient
  }

  notifyDatas[index].recipient = criteria.recipient
  // if (notifyDatas[index].recipient.length < 2) {
  //     notifyDatas[index].recipient.push('　')
  // }
  notifyDatas[index].questionnaireStyle = criteria.questionnaireStyle
  editNotificationsDialog.value = false
}
function handleEdit(row, index) {
  editNotificationsDialog.value = true
  criteria.index = index
  criteria.questionnaireStyle = row.questionnaireStyle
  criteria.recipient = row.recipient
  criteria.receiptInterval = row.receiptInterval
}
function handleClose(done: () => void) {
  ElMessageBox.confirm('即將離開視窗')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="通知歷程" class="mt-4">
          <el-row>
            <el-col>
              <ClientOnly>
                <el-button
                  type="primary" class="mb-3" float="right"
                  @click="openSetNotificationsDialog()"
                >
                  <AdminIcon name="i-carbon:add" class="pr-1" />
                  新增通知
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
          <el-table :data="notifyDatas" stripe border class="wp-100">
            <el-table-column label="#" width="40">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="委託單編號" />
            <el-table-column prop="orderName" label="委託單名稱" />
            <el-table-column prop="reportPreview" label="報告樣版" align="center">
              <template #default="scope">
                <el-button type="success" @click="navigateTo({ path: '/admin/questionnaireTemplate/Edit' })">
                  預覽
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="informer" label="通知者" />
            <el-table-column prop="notificationTime" label="通知時間" />
            <el-table-column prop="receiptInterval" label="領取時間(起~迄)" width="110">
              <template #default="scope">
                <el-col v-for="item in scope.row.receiptInterval" truncated>
                  {{ item }}
                </el-col>
              </template>
            </el-table-column>
            <el-table-column prop="recipient" label="領取者：第一次領取時間" width="220">
              <template #default="scope">
                <el-col v-for="item in scope.row.recipient" truncated>
                  {{ item }}
                </el-col>
              </template>
            </el-table-column>
            <el-table-column prop="questionnaireStyle" label="問卷樣式" />
            <el-table-column prop="state" label="狀態" />
            <el-table-column label="功能" align="center">
              <template #default="scope">
                <ClientOnly v-if="scope.row.state === '歷程'" />
                <ClientOnly v-if="scope.row.state === '已通知，領取中'">
                  <el-col>
                    <el-button
                      type="primary"
                      @click="handleEdit(scope.row, scope.$index)"
                    >
                      <AdminIcon name="i-carbon:edit" class="pr-1" />
                      設定
                    </el-button>
                  </el-col>
                  <el-col>
                    <el-button
                      type="warning"
                      @click="navigateTo({ path: '/admin/questionnaireManagement/View' })"
                    >
                      <AdminIcon name="i-carbon:view" class="pr-1" />
                      瀏覽
                    </el-button>
                  </el-col>
                  <el-col>
                    <el-button type="danger">
                      <AdminIcon name="i-carbon:delete" class="pr-1" />
                      刪除
                    </el-button>
                  </el-col>
                </ClientOnly>
                <ClientOnly v-if="scope.row.state === '已領取'">
                  <el-col>
                    <el-button
                      type="warning"
                      @click="navigateTo({ path: '/admin/questionnaireManagement/View' })"
                    >
                      <AdminIcon name="i-carbon:view" class="pr-1" />
                      瀏覽
                    </el-button>
                  </el-col>
                  <el-col>
                    <el-button type="danger">
                      <AdminIcon name="i-carbon:delete" class="pr-1" />
                      刪除
                    </el-button>
                  </el-col>
                </ClientOnly>
              </template>
            </el-table-column>
          </el-table>
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
        <!-- 對話框 -->
        <el-dialog
          v-model="addNotificationsDialog" title="新增通知" class="wp-80" align="center"
          :before-close="handleClose"
        >
          <el-table :data="newNotifyDatas" border stripe class="wp-100">
            <el-table-column prop="reportPreview" label="報告樣版">
              <template #default="scope">
                <el-button size="small" type="success" @click="navigateTo({ path: '/admin/questionnaireTemplate/Edit' })">
                  預覽
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="receiptInterval" label="領取時間(起~迄)">
              <el-date-picker
                v-model="criteria.receiptInterval" type="daterange" style="width: 100%;"
                range-separator="~" start-placeholder="起" end-placeholder="迄"
              />
            </el-table-column>
            <el-table-column prop="questionnaireStyle" label="問卷樣式">
              <el-select v-model="criteria.questionnaireStyle" placeholder="請選擇">
                <el-option
                  v-for="item in questionnaireStyleOptions" :key="item.value"
                  :label="item.label" :value="item.value"
                />
              </el-select>
            </el-table-column>
            <el-table-column prop="recipient" label="領取者">
              <el-select v-model="criteria.recipient" multiple placeholder="Select">
                <el-option
                  v-for="item in recipientOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-table-column>
          </el-table>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="addNotificationsDialog = false">
                取消
              </el-button>
              <el-button type="primary" @click="addNewNotify()">
                確定
              </el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog
          v-model="editNotificationsDialog" title="編輯通知" class="wp-80" align="center"
          :before-close="handleClose"
        >
          <el-table :data="newNotifyDatas" border stripe class="wp-100">
            <el-table-column prop="reportPreview" label="報告樣版">
              <template #default="scope">
                <el-button type="success" @click="navigateTo({ path: '/admin/questionnaireTemplate/Edit' })">
                  預覽
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="receiptInterval" label="領取時間(起~迄)">
              <el-date-picker
                v-model="criteria.receiptInterval" type="daterange" style="width: 100%;"
                range-separator="~" start-placeholder="起" end-placeholder="迄"
              />
            </el-table-column>
            <el-table-column prop="questionnaireStyle" label="問卷樣式">
              <el-select v-model="criteria.questionnaireStyle" placeholder="請選擇">
                <el-option
                  v-for="item in questionnaireStyleOptions" :key="item.value"
                  :label="item.label" :value="item.value"
                />
              </el-select>
            </el-table-column>
            <el-table-column prop="recipient" label="領取者">
              <el-select v-model="criteria.recipient" multiple placeholder="Select">
                <el-option
                  v-for="item in recipientOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-table-column>
          </el-table>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="editNotificationsDialog = false">
                取消
              </el-button>
              <el-button type="primary" @click="editNewNotify()">
                確定
              </el-button>
            </div>
          </template>
        </el-dialog>
      </el-col>
    </el-row>
  </AdminContainer>
</template>

<style>
.wp-100 {
    width: 100%;
}

.wp-80 {
    width: 80%;
}
</style>
