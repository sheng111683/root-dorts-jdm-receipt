<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const title = useRouteMetaTitle()
const sampleCollectorTable = reactive([
  { orderCompletionDate: '2024-08-08', registrationNumber: '20240703091303', orderName: '竹節鋼筋委託試驗登錄表' },
])
const experimenterTable = reactive([
  { sampleCollectionDate: '2024-01-15', assignmentDate: '2024-01-07', testNumber: '240502', testName: '鋼筋硬度試驗' },
  { sampleCollectionDate: '2024-01-15', assignmentDate: '2024-01-07', testNumber: '240503', testName: '鋼筋化性試驗' },
])
const noviceTable = reactive([
  { trialCompletionDate: '2024-08-08', testNumber: '240502', testName: '鋼筋硬度試驗' },
])
const repairTable = reactive([
  { trialCompletionDate: '2024-08-08', initialReviewCompletionDate: '2024-08-09', testNumber: '240502', testName: '鋼筋硬度試驗' },
])
const signerTable = reactive([
  { restorationCompletionDate: '2024-08-08', testNumber: '240502', testName: '鋼筋硬度試驗' },
])
const naturalPersonTable = reactive([
  { restorationCompletionDate: '2024-08-08', testNumber: '240502', testName: '工程材料輻射量' },
])
const nucleatedTable = reactive([
  { restorationCompletionDate: '2024-08-08', signingCompletionDate: '2024-08-09', testNumber: '240502', testName: '鋼筋化性試驗', isSignatureOfNaturalPersonCertificate: '是' },
])
const notifierTable = reactive([
  { signingCompletionDate: '2024-08-08', submissionCompletionDate: '2024-08-09', registrationNumber: '20240703091303', orderName: '竹節鋼筋委託試驗登錄表' },
])
const receiveTable = reactive([
  { notificationCompletionDate: '2024-08-08', collectionTime: ['2024-07-01', '2024-07-30'], registrationNumber: '20240703091303', orderName: '竹節鋼筋委託試驗登錄表', daysRemaining: 1 },
  { notificationCompletionDate: '2024-08-08', collectionTime: ['2024-07-01', '2024-07-30'], registrationNumber: '20240703091303', orderName: '竹節鋼筋委託試驗登錄表', daysRemaining: 3 },
])
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <template #header>
            <span>{{ title }}</span>
          </template>
          <el-card class="mb-3" header="待收樣(收樣者畫面)">
            <el-table border :data="sampleCollectorTable" stripe style="width: 100%">
              <el-table-column align="center" label="#" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="orderCompletionDate" label="委託單申請完成日期" />
              <el-table-column align="center" prop="registrationNumber" label="登錄編號" />
              <el-table-column align="center" prop="orderName" label="委託單名稱" />
              <el-table-column align="center" label="動作">
                <template #default="scope">
                  <ClientOnly>
                    <el-button
                      type="primary"
                      @click="navigateTo({ path: '/admin/entrustOrderApplication' })"
                    >
                      前往
                    </el-button>
                  </ClientOnly>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="mb-3" header="待試驗(試驗者畫面)">
            <el-table border :data="experimenterTable" stripe style="width: 100%">
              <el-table-column align="center" label="#" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="sampleCollectionDate" label="收樣完成日期" />
              <el-table-column align="center" prop="assignmentDate" label="分派試驗日期" />
              <el-table-column align="center" prop="testNumber" label="試驗編號" />
              <el-table-column align="center" prop="testName" label="試驗名稱" />
              <el-table-column align="center" label="動作">
                <template #default="scope">
                  <ClientOnly>
                    <el-button
                      type="primary"
                      @click="navigateTo({ path: '/admin/experimentalProjectFeatures' })"
                    >
                      前往
                    </el-button>
                  </ClientOnly>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="mb-3" header="待初核(初核者畫面)">
            <el-table border :data="noviceTable" stripe style="width: 100%">
              <el-table-column align="center" label="#" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="trialCompletionDate" label="試驗完成日期" />
              <el-table-column align="center" prop="testNumber" label="試驗編號" />
              <el-table-column align="center" prop="testName" label="試驗名稱" />
              <el-table-column align="center" label="動作">
                <template #default="scope">
                  <ClientOnly>
                    <el-button
                      type="primary"
                      @click="navigateTo({ path: '/admin/experimentalProjectFeatures' })"
                    >
                      前往
                    </el-button>
                  </ClientOnly>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="mb-3" header="待繕打(繕打者畫面)">
            <el-table border :data="repairTable" stripe style="width: 100%">
              <el-table-column align="center" label="#" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="trialCompletionDate" label="試驗完成日期" />
              <el-table-column align="center" prop="initialReviewCompletionDate" label="初核完成日期" />
              <el-table-column align="center" prop="testNumber" label="試驗編號" />
              <el-table-column align="center" prop="testName" label="試驗名稱" />
              <el-table-column align="center" label="動作">
                <template #default="scope">
                  <ClientOnly>
                    <el-button
                      type="primary"
                      @click="navigateTo({ path: '/admin/experimentalWritingReportsFeatures' })"
                    >
                      前往
                    </el-button>
                  </ClientOnly>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="mb-3" header="待簽署(簽署者畫面)">
            <el-table border :data="signerTable" stripe style="width: 100%">
              <el-table-column align="center" label="#" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="restorationCompletionDate" label="繕打完成日期" />
              <el-table-column align="center" prop="testNumber" label="試驗編號" />
              <el-table-column align="center" prop="testName" label="試驗名稱" />
              <el-table-column align="center" label="動作">
                <template #default="scope">
                  <ClientOnly>
                    <el-button
                      type="primary"
                      @click="navigateTo({ path: '/admin/experimentalWritingReportsFeatures' })"
                    >
                      前往
                    </el-button>
                  </ClientOnly>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="mb-3" header="尚未補登自然人憑證(簽署者畫面)">
            <el-table border :data="naturalPersonTable" stripe style="width: 100%">
              <el-table-column align="center" label="#" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="restorationCompletionDate" label="繕打完成日期" />
              <el-table-column align="center" prop="testNumber" label="試驗編號" />
              <el-table-column align="center" prop="testName" label="試驗名稱" />
              <el-table-column align="center" label="動作">
                <template #default="scope">
                  <ClientOnly>
                    <el-button
                      type="primary"
                      @click="navigateTo({ path: '/admin/experimentalWritingReportsFeatures' })"
                    >
                      前往
                    </el-button>
                  </ClientOnly>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="mb-3" header="待呈核(呈核流程該簽的人畫面)">
            <el-table border :data="nucleatedTable" stripe style="width: 100%">
              <el-table-column align="center" label="#" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="restorationCompletionDate" label="繕打完成日期" />
              <el-table-column align="center" prop="signingCompletionDate" label="簽署完成日期" />
              <el-table-column align="center" prop="testNumber" label="試驗編號" />
              <el-table-column align="center" prop="testName" label="試驗名稱" />
              <el-table-column align="center" prop="isSignatureOfNaturalPersonCertificate" label="是否有登自然人憑證簽署" />
              <el-table-column align="center" label="動作">
                <template #default="scope">
                  <ClientOnly>
                    <el-button
                      type="primary"
                      @click="navigateTo({ path: '/admin/entrustOrderApplication' })"
                    >
                      前往
                    </el-button>
                  </ClientOnly>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="mb-3" header="待通知(通知者畫面)">
            <el-table border :data="notifierTable" stripe style="width: 100%">
              <el-table-column align="center" label="#" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="signingCompletionDate" label="簽署完成日期" />
              <el-table-column align="center" prop="submissionCompletionDate" label="呈核完成日期" />
              <el-table-column align="center" prop="registrationNumber" label="登錄編號" />
              <el-table-column align="center" prop="orderName" label="委託單名稱" />
              <el-table-column align="center" label="動作">
                <template #default="scope">
                  <ClientOnly>
                    <el-button
                      type="primary"
                      @click="navigateTo({ path: '/admin/entrustOrderApplication' })"
                    >
                      前往
                    </el-button>
                  </ClientOnly>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="mb-3" header="待領取(委託者、送樣者畫面)">
            <el-table border :data="receiveTable" stripe style="width: 100%">
              <el-table-column align="center" label="#" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="notificationCompletionDate" label="通知完成日期" />
              <el-table-column align="center" prop="collectionTime" label="領取時間(起)~(迄)">
                <template #default="scope">
                  <el-text v-for="item in scope.row.collectionTime" :key="item">
                    {{ item }}<br>
                  </el-text>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="registrationNumber" label="登錄編號" />
              <el-table-column align="center" prop="orderName" label="委託單名稱" />
              <el-table-column align="center" prop="daysRemaining" label="剩餘天數">
                <template #default="scope">
                  {{ scope.row.daysRemaining }}天
                </template>
              </el-table-column>
              <el-table-column align="center" label="動作">
                <template #default="scope">
                  <ClientOnly>
                    <el-button
                      type="primary"
                      @click="navigateTo({ path: '/admin/entrustOrderApplication' })"
                    >
                      前往
                    </el-button>
                  </ClientOnly>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
