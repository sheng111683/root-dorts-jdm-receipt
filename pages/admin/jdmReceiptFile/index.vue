<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'

import { getDefaultjdmReceiptFile } from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive(getDefaultjdmReceiptFile())
const { $api } = useNuxtApp()
async function Save() {
  formatDates(criteria.treferDate)
  const response: any = await $api.v1.JdmReceiptFile.Post([criteria])
  const { status, saveCount } = response
  if (status && status !== 200)
    throw new Error('新增失敗')
  ElMessage.success(`已新增${saveCount}筆`)
}
function formatDates(treferDate) {
  if (treferDate) {
    const treferDateObj = new Date(treferDate)
    const year = treferDateObj.getFullYear()
    const month = String(treferDateObj.getMonth() + 1).padStart(2, '0')
    const day = String(treferDateObj.getDate()).padStart(2, '0')
    criteria.treferDate = `${year}/${month}/${day}`
  }
}
function resetForm() {
  criteria.agency = ''
  criteria.year = ''
  criteria.startYear = ''
  criteria.startMonth = ''
  criteria.endYear = ''
  criteria.endMonth = ''
  criteria.treferDate = ''
  criteria.receiptType = '停車費'
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="停車費轉檔處理">
          <el-form label-width="auto">
            <el-row :gutter="20">
              <el-col class="m-auto" :span="18">
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="開立機關:">
                      <el-input v-model="criteria.agency" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="會計年度:">
                      <el-input v-model="criteria.year" maxlength="3" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="起始年月:">
                      <el-input v-model="criteria.startYear" placeholder="起始年" maxlength="3" />/
                      <el-input v-model="criteria.startMonth" placeholder="起始月" maxlength="2" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="截止年月:">
                      <el-input v-model="criteria.endYear" placeholder="截止年" maxlength="3" />
                      /
                      <el-input v-model="criteria.endMonth" placeholder="截止月" maxlength="2" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="轉檔日期:">
                      <div class="block">
                        <el-date-picker v-model="criteria.treferDate" type="date" placeholder="" size="default" />
                      </div>
                    </el-form-item>
                    <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                      <el-form-item label="收據類別:">
                        <el-radio-group v-model="criteria.receiptType" class="ml-4">
                          <el-radio value="停車費">
                            停車費
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col class="m-auto" align="center" :span="16">
                    <ClientOnly>
                      <el-button type="primary" plain @click="Save()">
                        <AdminIcon name="i-carbon:save" class="pr-1" />
                        轉檔
                      </el-button>
                    </ClientOnly>
                    <el-button plain @click="resetForm()">
                      <AdminIcon name="i-carbon:reset" class="pr-1" />
                      重設
                    </el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
