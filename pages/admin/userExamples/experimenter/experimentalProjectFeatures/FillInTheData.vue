<script setup lang="ts">
import { ElCheckbox, ElMessage, ElMessageBox } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
  getSysUserCriteria,
  getSysUserQueryResult,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  sort: '2024001',
  dataVersion: '',
  manuscript: [],
  manuscriptEquipment: '',
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
  { sort: '1', selectedManuscriptName: ['MQ03-04-05粗粒料分次篩析紀錄表'] },
  { sort: '2', selectedManuscriptName: ['MQ03-04-01粗粒料篩分析試驗紀錄表'] },
  { sort: '3', selectedManuscriptName: ['MQ03-04-01粗粒料篩分析試驗紀錄表', '步驟：無'] },
  { sort: '4', selectedManuscriptName: ['MQ03-04-01粗粒料篩分析試驗紀錄表', '步驟：', '　　　1.MQ03-35-01試樣減量縮樣試驗紀錄表', '　　　2.MQ03-35-01試樣減量縮樣試驗紀錄表', '　　　3.MQ03-05-01粒料內小於75um(No.200)篩材料含量試驗紀錄表(粗)', '　　　4.MQ03-05-01粒料內小於75um(No.200)篩材料含量試驗紀錄表(細)', '　　　5.MQ03-04-05粗粒料分次篩析紀錄表', '　　　6.MQ03-04-05粗粒料分次篩析紀錄表'] },
])

function handleCurrentChange(val) {
  search(val)
}

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
// interface ManuscriptEquipment {
//   equipment: string
// }
// const manuscriptEquipmentTableData = reactive<ManuscriptEquipment[]>([])
const manuscriptEquipmentTableData = [
  {
    equipment: '混和機',
  },
]
// function addToManuscriptEquipment() {
//   addToTable(manuscriptEquipmentTableData, criteria.manuscriptEquipment, 'equipment')
// }
// function resetManuscriptEquipment() {
//   criteria.manuscriptEquipment = ''
//   manuscriptEquipmentTableData.length = 0
// }
// function addToTable<T extends { title: string }>(tableData: T[], criteria: string, fieldName: keyof T) {
//   if (criteria) {
//     const exists = tableData.some(e => e[fieldName] === criteria)
//     if (!exists) {
//       const newItem = { [fieldName]: criteria } as T
//       tableData.push(newItem)
//     }
//     else {
//       ElMessage.warning('內容已經存在於表格中。')
//     }
//   }
// }
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
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="編輯手稿">
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
              <el-col :span="22">
                <el-form-item>
                  <el-select v-model="criteria.manuscript" multiple placeholder="選擇手稿(多選)">
                    <el-option
                      v-for="item in manuscriptOptions" :key="item.value"
                      :label="item.label" :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button>加入</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card header="" class="mt-4">
          <el-table :data="datas" border stripe style="width: 100%">
            <el-table-column label="排序" width="60">
              <template #default="scope">
                <el-input v-model="scope.row.sort" />
              </template>
            </el-table-column>
            <el-table-column prop="selectedManuscriptName" label="已選的手稿名稱">
              <template #default="scope">
                <el-col v-for="item in scope.row.selectedManuscriptName">
                  {{ item }}
                </el-col>
              </template>
            </el-table-column>
            <el-table-column label="動作" width="200" align="center">
              <template #default="">
                <ClientOnly>
                  <el-button type="primary" @click="manuscriptDialogVisible = true">
                    <AdminIcon name="i-carbon:cloud-service-management" class="pr-1" />
                    設備清單
                  </el-button>
                  <el-button type="danger">
                    <AdminIcon name="i-carbon:delete" class="pr-1" />
                    刪除
                  </el-button>
                </ClientOnly>
              </template>
            </el-table-column>
          </el-table>
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
          <el-col class="mt-3" :span="16">
            <el-button plain type="primary" @click="navigateTo({ path: '/admin/experimentalProjectFeatures/FillIn' })">
              確定
            </el-button>
          </el-col>
        </el-card>
        <el-row class="mt-3" :gutter="20">
          <el-col :span="16">
            <el-button plain @click="$router.back()">
              回上一頁
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
