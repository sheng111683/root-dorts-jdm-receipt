<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

import { ReceiptType } from '~/enums'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  agency: '',
  year: '',
  receiptTypeQueryConditions: '',
  receiptNumber: '',
  payNumber: '',
  payName: '',
  PayMoney: '',
  makeDate: '',
  removedTypeConditions: '',
  ...getDefaultCriteria(),
})

function resetForm() {
  criteria.agency = ''
  criteria.year = ''
  criteria.receiptNumber = ''
  criteria.payNumber = ''
  criteria.payName = ''
  criteria.PayMoney = ''
  criteria.makeDate = ''
  criteria.removedTypeConditions = ''
  criteria.receiptTypeQueryConditions = ''
}
const datas = []
function sendSave() {
  ElMessageBox.confirm('即將送出資料', '請確認', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('資料已送出')
    history.back()
    resetForm()
  }).catch(() => {
    ElMessage.info('取消送出')
  })
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="收據新增">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="支用機關:">
              <el-input v-model="criteria.agency" />
            </el-form-item>
            <el-form-item label="年度:">
              <el-input v-model="criteria.year" />
            </el-form-item>
            <el-form-item label="收據類別:">
              <el-radio-group v-model="criteria.removedTypeConditions" class="ml-4">
                <el-radio v-for="option in ReceiptType.values()" :key="option" :value="option">
                  {{ ReceiptType.display(option) }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="收據編號:">
              <el-input v-model="criteria.receiptNumber" />
            </el-form-item>
            <el-form-item label="繳款人代號:">
              <el-input v-model="criteria.payNumber" />
            </el-form-item>
            <el-form-item label="繳款人姓名:">
              <el-input v-model="criteria.payName" />
            </el-form-item>
            <el-form-item label="繳款金額:">
              <el-input v-model="criteria.PayMoney" />
            </el-form-item>
            <el-form-item label="製單日期:">
              <div class="block">
                <el-date-picker v-model="criteria.makeDate" type="date" placeholder="" size="default" />
              </div>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="24">
                <ClientOnly>
                  <el-button type="primary" plain @click="sendSave()">
                    <AdminIcon name="i-carbon:search" class="pr-1" />
                    儲存
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
      </el-col>
    </el-row>
    <el-row class="mt-5" :gutter="20">
      <el-col :span="16">
        <ClientOnly>
          <el-button plain @click="$router.back()">
            回上一頁
          </el-button>
        </ClientOnly>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
