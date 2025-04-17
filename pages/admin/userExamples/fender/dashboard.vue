<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const repairTable = reactive([
  { trialCompletionDate: '2024-08-08', initialReviewCompletionDate: '2024-08-09', testNumber: '240502', testName: '鋼筋硬度試驗' },
])
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <template #header>
            <span>儀錶板</span>
          </template>

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
                      @click="navigateTo({ path: '/admin/questionnaireTemplate' })"
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
