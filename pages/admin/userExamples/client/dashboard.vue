<script setup lang="ts">
definePageMeta({ layout: 'admin' })
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
            <span>儀錶板</span>
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
          </template>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
