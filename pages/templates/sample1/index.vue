<script setup lang="ts">
import { getDefaultCriteria, getDefaultPageList } from '~/models'

const notification = useNotification()
const configStore = useConfigStore()
const { setThemeColor } = configStore
const { config } = storeToRefs(configStore)

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  sysNumber: '',
  stateTypeE: '',
  ...getDefaultCriteria(),
})

const queryResult = reactive(getDefaultPageList<any>())

const options = ref([
  { value: 'ONE', label: '選項一' },
  { value: 'TWO', label: '選項二' },
])

const themeColor = computed(() => config.value.themeColor)

function changeThemeColor(color: string) {
  setThemeColor(color)
}

const datas = [
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
  { sysNumber: '', stateType: '', orderDate: '' },
]

async function search(val) {
  criteria.pageNumber = val || 1
  const start = (criteria.pageNumber - 1) * criteria.pageSize
  const end = criteria.pageNumber * criteria.pageSize
  Object.assign(queryResult, {
    pageNumber: criteria.pageNumber,
    totalItemCount: datas.length,
    pageCount: Number.parseInt(datas / criteria.pageSize) + (datas % criteria.pageSize > 0 ? 1 : 0),
    items: datas.slice(start, end),
  })
}

function handleCurrentChange(val: number) {
  search(val)
}

function success() {
  notification.success('這是成功訊息')
}
function warning() {
  notification.warning('這是警告訊息')
}
function info() {
  notification.info('這是消息訊息')
}
function error() {
  notification.error('這是錯誤訊息')
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="範例1">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="訂單編號">
              <el-input v-model="criteria.sysNumber" />
            </el-form-item>
            <el-form-item label="訂單狀態">
              <!-- <el-input v-model="criteria.stateType" /> -->
              <el-radio-group v-model="criteria.stateTypeE" class="ml-4">
                <el-radio v-for="option in options" :key="option.value" :value="option.value">
                  {{
                    option.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-row :gutter="20">
            <el-col :span="16">
              <ClientOnly>
                <el-button type="primary" @click="search()">
                  <AdminIcon name="i-carbon:search" class="pr-1" />
                  查詢
                </el-button>
              </ClientOnly>
              <el-button>
                <AdminIcon name="i-carbon:reset" class="pr-1" />
                重設
              </el-button>
              <el-button @click="success">
                成功
              </el-button>
              <el-button @click="warning">
                警告
              </el-button>
              <el-button @click="info">
                消息
              </el-button>
              <el-button @click="error">
                錯誤
              </el-button>
              <el-button style="color: #009bc8" @click="setThemeColor('#009bc8')">
                變更主題色
              </el-button>
              <el-button style="color: #236239" @click="setThemeColor('#236239')">
                變更主題色
              </el-button>
              <el-button style="color: #1429a2" @click="setThemeColor('#1429a2')">
                變更主題色
              </el-button>
              <ClientOnly>
                <el-color-picker v-model="themeColor" @change="changeThemeColor" />
              </ClientOnly>
            </el-col>
          </el-row>
        </el-card>
        <el-card header="查詢結果" class="mt-4">
          <el-row>
            <el-col :span="16">
              <el-pagination
                v-if="queryResult.totalItemCount > 0" v-model:current-page="queryResult.pageNumber"
                v-model:page-size="queryResult.pageSize" layout="total, prev, pager, next, jumper"
                :total="queryResult.totalItemCount" @current-change="handleCurrentChange"
              />
            </el-col>
            <el-col :span="8">
              <ClientOnly>
                <el-button type="primary" float="right">
                  <AdminIcon name="i-carbon:add" class="pr-1" />
                  新增
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe border style="width: 100%">
            <el-table-column label="#">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="sysNumber" label="訂單編號" />
            <el-table-column prop="stateType" label="訂單狀態">
              <template #default="scope">
                {{ scope.row.stateType }}
              </template>
            </el-table-column>
            <el-table-column prop="orderDate" label="訂單時間">
              <template #default="scope">
                {{ scope.row.orderDate }}
              </template>
            </el-table-column>
            <el-table-column label="動作" width="240">
              <template #default>
                <ClientOnly>
                  <el-button>
                    <AdminIcon name="i-carbon:edit" class="pr-1" />
                    編輯
                  </el-button>
                  <el-button>
                    <AdminIcon name="i-carbon:delete" class="pr-1" />
                    移除
                  </el-button>
                </ClientOnly>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="mt-4">
            <el-col :span="16">
              <el-pagination
                v-if="queryResult.totalItemCount > 0" v-model:current-page="queryResult.pageNumber"
                v-model:page-size="queryResult.pageSize" layout="total, prev, pager, next, jumper"
                :total="queryResult.totalItemCount" @current-change="handleCurrentChange"
              />
            </el-col>
            <el-col :span="8">
              <ClientOnly>
                <el-button type="primary" float="right">
                  <AdminIcon name="i-carbon:add" class="pr-1" />
                  新增
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
