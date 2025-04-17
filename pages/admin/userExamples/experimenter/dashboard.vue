<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const experimenterTable = reactive([
  { sampleCollectionDate: '2024-01-15', assignmentDate: '2024-01-07', testNumber: '240502', testName: '鋼筋硬度試驗' },
  { sampleCollectionDate: '2024-01-15', assignmentDate: '2024-01-07', testNumber: '240503', testName: '鋼筋化性試驗' },
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
          <el-card class="mb-3" header="待試驗(試驗者畫面)">
            <el-table border :data="experimenterTable" stripe style="width: 100%">
              <el-table-column align="center" label="#" width="55">
                <template #default="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="sampleCollectionDate" label="收樣日期" />
              <el-table-column align="center" prop="assignmentDate" label="分派日期" />
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
