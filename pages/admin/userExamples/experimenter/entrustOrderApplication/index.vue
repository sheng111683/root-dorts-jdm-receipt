<script setup lang="ts">
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const permissionStore = usePermissionStore()
const { isAdd, isEdit, isRemoved } = storeToRefs(permissionStore)
const loginTimeNow = new Date().toLocaleString()
const criteria = reactive({
  registrationNumber: '',
  requester: '',
  orderName: '',
  checkeOrderStatus: ref([]),
  sampleName: ref([]),
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())
// 委託者--看不到此筆=[0]、編輯=[1]、刪除=[2]、開始呈核=[3]、呈核=[4]、瀏覽=[5]、領取報告=[6]、通知=[7]
// 送樣者--看不到此筆=[0]、編輯=[1]、刪除=[2]、開始呈核=[3]、呈核=[4]、瀏覽=[5]、領取報告=[6]、通知=[7]
// 收樣者--看不到此筆=[0]、編輯=[1]、刪除=[2]、開始呈核=[3]、呈核=[4]、瀏覽=[5]、領取報告=[6]、通知=[7]
// 初核者--看不到此筆=[0]、編輯=[1]、刪除=[2]、開始呈核=[3]、呈核=[4]、瀏覽=[5]、領取報告=[6]、通知=[7]
// 試驗者--看不到此筆=[0]、編輯=[1]、刪除=[2]、開始呈核=[3]、呈核=[4]、瀏覽=[5]、領取報告=[6]、通知=[7]
// 報告繕打者--看不到此筆=[0]、編輯=[1]、刪除=[2]、開始呈核=[3]、呈核=[4]、瀏覽=[5]、領取報告=[6]、通知=[7]
// 報告簽署人--看不到此筆=[0]、編輯=[1]、刪除=[2]、開始呈核=[3]、呈核=[4]、瀏覽=[5]、領取報告=[6]、通知=[7]
// 報告通知者--看不到此筆=[0]、編輯=[1]、刪除=[2]、開始呈核=[3]、呈核=[4]、瀏覽=[5]、領取報告=[6]、通知=[7]
const datas = [
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#409EFF', samples: '竹節鋼筋', orderStatus: '草稿', placeOrderker: ['1', '2'], sendSampleker: ['0'], receiveSampleker: ['0'], checkSampleker: ['0'], testSampleker: ['0'], signReportker: ['0'], printReportker: ['0'], notifyker: ['0'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#E6A23C', samples: '竹節鋼筋', orderStatus: '試驗送樣中', placeOrderker: ['5'], sendSampleker: ['1', '2'], receiveSampleker: ['1', '2'], checkSampleker: ['0'], testSampleker: ['0'], signReportker: ['0'], printReportker: ['0'], notifyker: ['0'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#E6A23C', samples: '竹節鋼筋', orderStatus: '工作分派中', placeOrderker: ['5'], sendSampleker: ['5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['0'], signReportker: ['0'], printReportker: ['0'], notifyker: ['0'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#E6A23C', samples: '竹節鋼筋', orderStatus: '試驗者確認中', placeOrderker: ['5'], sendSampleker: ['5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['0'], signReportker: ['0'], printReportker: ['0'], notifyker: ['0'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#409EFF', samples: '竹節鋼筋', orderStatus: '試驗開始', placeOrderker: ['5'], sendSampleker: ['5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['1'], signReportker: ['0'], printReportker: ['0'], notifyker: ['0'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#E6A23C', samples: '竹節鋼筋', orderStatus: '試驗數據確認中', placeOrderker: ['5'], sendSampleker: ['5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['1'], signReportker: ['0'], printReportker: ['0'], notifyker: ['0'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#67C23A', samples: '竹節鋼筋', orderStatus: '試驗數據已確認', placeOrderker: ['5'], sendSampleker: ['5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['5'], signReportker: ['0'], printReportker: ['0'], notifyker: ['0'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#E6A23C', samples: '竹節鋼筋', orderStatus: '試驗報告繕打中', placeOrderker: ['5'], sendSampleker: ['5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['5'], signReportker: ['5'], printReportker: ['0'], notifyker: ['0'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#E6A23C', samples: '竹節鋼筋', orderStatus: '試驗報告簽署中', placeOrderker: ['5'], sendSampleker: ['5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['5'], signReportker: ['5'], printReportker: ['5'], notifyker: ['0'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#67C23A', samples: '竹節鋼筋', orderStatus: '試驗報告已簽署', placeOrderker: ['5'], sendSampleker: ['5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['5'], signReportker: ['5'], printReportker: ['3', '5'], notifyker: ['0'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#E6A23C', samples: '竹節鋼筋', orderStatus: '試驗報告呈核中', placeOrderker: ['5'], sendSampleker: ['5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['5'], signReportker: ['5'], printReportker: ['4', '5'], notifyker: ['0'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#67C23A', samples: '竹節鋼筋', orderStatus: '試驗報告完成', placeOrderker: ['5'], sendSampleker: ['5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['5'], signReportker: ['5'], printReportker: ['5'], notifyker: ['7', '5'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#E6A23C', samples: '竹節鋼筋', orderStatus: '試驗報告通知領取中', placeOrderker: ['6', '5'], sendSampleker: ['6', '5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['5'], signReportker: ['5'], printReportker: ['5'], notifyker: ['7', '5'] },
  { orderName: '竹節鋼筋委託試驗登錄表', color: '#67C23A', samples: '竹節鋼筋', orderStatus: '試驗報告已領取', placeOrderker: ['6', '5'], sendSampleker: ['6', '5'], receiveSampleker: ['5'], checkSampleker: ['5'], testSampleker: ['5'], signReportker: ['5'], printReportker: ['5'], notifyker: ['7', '5'] },
]

const requesterOptions = [
  {
    value: 'Option1',
    label: '一一股份有限公司',
  },
  {
    value: 'Option2',
    label: '山山股份有限公司',
  },
  {
    value: 'Option3',
    label: '委託單位3',
  },
  {
    value: 'Option4',
    label: '委託單位4',
  },
  {
    value: 'Option5',
    label: '委託單位5',
  },
]
const orderNameOptions = [
  {
    value: 'Option1',
    label: '竹節鋼筋委託試驗登錄表',
  },
  {
    value: 'Option2',
    label: '粗細砂級配料委託試驗登錄表',
  },
]
const sampleNameOptions = [
  {
    value: 'Option1',
    label: '竹節鋼筋',
  },
  {
    value: 'Option2',
    label: '粗中料沙',
  },
]
const orderStatus = ref(['', ''])
const orderStatusOptions = ['已送出', '試驗中', '試驗完成', '退回']
const checkAll = ref(false)
const isIndeterminate = ref(true)
function handleCheckAllChange(val: boolean) {
  orderStatus.value = val ? orderStatusOptions : []
  isIndeterminate.value = false
}
function handlecheckeOrderStatusChange(value: string[]) {
  const checkedCount = value.length
  checkAll.value = checkedCount === orderStatusOptions.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < orderStatusOptions.length
}
function handleCurrentChange(val) {
  search(val)
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
  criteria.registrationNumber = ''
  criteria.requester = ''
  criteria.orderName = ''
  criteria.sampleName.length = 0
  criteria.checkeOrderStatus.length = 0
  queryResult.items = []
  queryResult.totalItemCount = 0
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="委託單申請">
          <el-form label-width="auto" class="form-max-width">
            <!-- <el-form-item label="登錄編號：">
                            <el-input v-model="criteria.registrationNumber" />
                        </el-form-item> -->
            <el-form-item label="委託單位：">
              <el-select v-model="criteria.requester" placeholder="請選擇">
                <el-option
                  v-for="item in requesterOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="委託單名稱：">
              <el-select v-model="criteria.orderName" placeholder="請選擇">
                <el-option
                  v-for="item in orderNameOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="試樣名稱：">
              <el-select v-model="criteria.sampleName" placeholder="請選擇" multiple>
                <el-option
                  v-for="item in sampleNameOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="委託單狀態：">
              <el-checkbox
                v-model="checkAll" :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                全部
              </el-checkbox>
              <el-checkbox-group
                v-model="orderStatus" class="ms-2"
                @change="handlecheckeOrderStatusChange"
              >
                <el-checkbox
                  v-for="status in orderStatusOptions" :key="status" :label="status"
                  :value="status"
                >
                  {{ status }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="24">
                <ClientOnly>
                  <el-button type="primary" plain @click="search('')">
                    <AdminIcon name="i-carbon:search" class="pr-1" />
                    查詢
                  </el-button>
                </ClientOnly>
                <el-button plain @click="resetForm()">
                  <AdminIcon name="i-carbon:reset" class="pr-1" />
                  重設
                </el-button>
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
            <el-col :span="8">
              <ClientOnly>
                <el-button
                  type="primary" float="right"
                  @click="navigateTo({ path: '/admin/entrustOrderApplication/EditTrunk' })"
                >
                  <AdminIcon name="i-carbon:add" class="pr-1" />
                  新增
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <el-table-column label="#" width="50">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <!-- <el-table-column prop="registrationNumber" label="登錄編號" /> -->
            <el-table-column prop="orderName" label="委託單名稱" />
            <el-table-column prop="samples" label="試樣" />
            <el-table-column label="委託單狀態">
              <template #default="{ row }">
                <div :style="{ color: row.color }">
                  {{ row.orderStatus }}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="testSampleker" label="試驗者" align="center">
              <template #default="{ row }">
                <ClientOnly v-for="(testSampleker) in row.testSampleker" :key="testSampleker">
                  <el-col :span="24">
                    <a v-if="testSampleker === '0'">看不到此筆</a>
                    <el-button
                      v-if="testSampleker === '1'" type="primary"
                      @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })"
                    >
                      <AdminIcon name="i-carbon:edit" class="pr-1" />
                      編輯
                    </el-button>
                    <el-button v-if="testSampleker === '2'" type="danger">
                      <AdminIcon name="i-carbon:delete" class="pr-1" />
                      刪除
                    </el-button>
                    <el-button v-if="testSampleker === '3'" type="warning">
                      <AdminIcon name="i-carbon:arrow-right" class="pr-1" />
                      開始呈核
                    </el-button>
                    <el-button v-if="testSampleker === '4'" type="warning">
                      <AdminIcon name="i-carbon:airline-rapid-board" class="pr-1" />
                      呈核
                    </el-button>
                    <el-button
                      v-if="testSampleker === '5'" type="success"
                      @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })"
                    >
                      <AdminIcon name="i-carbon:view" class="pr-1" />
                      瀏覽
                    </el-button>
                    <el-button v-if="testSampleker === '6'" type="primary">
                      <AdminIcon name="i-carbon:connection-receive" class="pr-1" />
                      領取報告
                    </el-button>
                    <el-button v-if="testSampleker === '7'" type="warning">
                      <AdminIcon name="i-carbon:email" class="pr-1" />
                      通知
                    </el-button>
                  </el-col>
                </ClientOnly>
              </template>
            </el-table-column>

            <!-- <el-table-column label="動作" width="360">
                            <template #default="scope">
                                <ClientOnly v-if="scope.row.orderStatus === '工作分派中'">
                                    <el-button type="primary"
                                        @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })">
                                        <AdminIcon name="i-carbon:edit" class="pr-1" />
                                        編輯
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else-if="scope.row.orderStatus === '試驗者確認中'">
                                    <el-button type="primary"
                                        @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })">
                                        <AdminIcon name="i-carbon:edit" class="pr-1" />
                                        編輯
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else-if="scope.row.orderStatus === '試驗開始'">
                                    <el-button type="primary"
                                        @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })">
                                        <AdminIcon name="i-carbon:edit" class="pr-1" />
                                        編輯
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else-if="scope.row.orderStatus === '試驗數據確認中'">
                                    <el-button type="primary"
                                        @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })">
                                        <AdminIcon name="i-carbon:edit" class="pr-1" />
                                        編輯
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else-if="scope.row.orderStatus === '試驗數據已確認'">
                                    <el-button type="primary"
                                        @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })">
                                        <AdminIcon name="i-carbon:edit" class="pr-1" />
                                        編輯
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else-if="scope.row.orderStatus === '試驗報告簽署中'">
                                    <el-button type="primary"
                                        @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })">
                                        <AdminIcon name="i-carbon:edit" class="pr-1" />
                                        編輯
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else-if="scope.row.orderStatus === '試驗報告繕打中'">
                                    <el-button type="primary"
                                        @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })">
                                        <AdminIcon name="i-carbon:edit" class="pr-1" />
                                        編輯
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else-if="scope.row.orderStatus === '試驗報告已簽署'">
                                    <el-button type="warning">
                                        <AdminIcon name="i-carbon:email" class="pr-1" />
                                        開始呈核
                                    </el-button>
                                    <el-button type="primary"
                                        @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })">
                                        <AdminIcon name="i-carbon:edit" class="pr-1" />
                                        編輯
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else-if="scope.row.orderStatus === '試驗報告呈核中'">
                                    <el-button type="warning">
                                        <AdminIcon name="i-carbon:email" class="pr-1" />
                                        呈核
                                    </el-button>
                                    <el-button type="primary"
                                        @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })">
                                        <AdminIcon name="i-carbon:edit" class="pr-1" />
                                        編輯
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else-if="scope.row.orderStatus === '試驗報告完成'">
                                    <el-button type="warning">
                                        <AdminIcon name="i-carbon:email" class="pr-1" />
                                        通知
                                    </el-button>
                                    <el-button type="success">
                                        <AdminIcon name="i-carbon:view" class="pr-1" />
                                        瀏覽
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else-if="scope.row.orderStatus === '試驗報告通知領取中'">
                                    <el-button type="warning">
                                        <AdminIcon name="i-carbon:email" class="pr-1" />
                                        通知
                                    </el-button>
                                    <el-button type="primary">
                                        <AdminIcon name="i-carbon:email" class="pr-1" />
                                        領取報告
                                    </el-button>
                                    <el-button type="success">
                                        <AdminIcon name="i-carbon:view" class="pr-1" />
                                        瀏覽
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else-if="scope.row.orderStatus === '試驗報告已領取'">
                                    <el-button type="warning">
                                        <AdminIcon name="i-carbon:email" class="pr-1" />
                                        通知
                                    </el-button>
                                    <el-button type="success">
                                        <AdminIcon name="i-carbon:view" class="pr-1" />
                                        瀏覽
                                    </el-button>
                                </ClientOnly>
                                <ClientOnly v-else>
                                    <el-button type="primary"
                                        @click="navigateTo({ path: '/admin/entrustOrderApplication/Edit' })">
                                        <AdminIcon name="i-carbon:edit" class="pr-1" />
                                        編輯
                                    </el-button>
                                    <el-button type="danger">
                                        <AdminIcon name="i-carbon:delete" class="pr-1" />
                                        刪除
                                    </el-button>
                                </ClientOnly>
                            </template>
                        </el-table-column> -->
          </el-table>
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
  </AdminContainer>
</template>
