<script setup lang="ts">
import * as yup from 'yup'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getDefaultjdmReceipt,
  getDefulatJDMReceiptCriteria,
} from '~/models'

import { ReceiptType } from '~/enums'

definePageMeta({ layout: 'admin' })
const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const encryptionId = ref(route.query.encryptionId || '')
const criteria = reactive(getDefaultjdmReceipt())
const { setValues } = useForm({
  validationSchema: yup.object({
    content: yup.string().trim(),
    createUser: yup.string().trim(),
  }),
})

async function SaveEdit() {
  try {
    await ElMessageBox.confirm(
      '您確定要更新當前資料?',
      '送出資料提醒',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )

    if (criteria.encryptionId.length > 0) {
      formatDates(criteria.makeDate)
      const { status }: any = await $api.v1.JdmReceipt.Put(criteria.encryptionId, criteria)
      if (status && status !== 200)
        throw new Error('儲存失敗')
      ElMessage.success('已儲存')
    }
    router.back()
  }
  catch (e: any) {
    if (e.toString() !== 'cancel')
      throw e
  }
}
function formatDates(makeDate) {
  if (makeDate) {
    const makeDateObj = new Date(makeDate)
    const year = makeDateObj.getFullYear()
    const month = String(makeDateObj.getMonth() + 1).padStart(2, '0')
    const day = String(makeDateObj.getDate()).padStart(2, '0')
    criteria.makeDate = `${year}/${month}/${day}`
  }

  return criteria
}
if (encryptionId.value.length > 0) {
  const { data } = await useAsyncData(() => {
    return $api.v1.JdmReceipt.GetByEncryptionId(encryptionId.value)
  })
  Object.assign(criteria, data.value)
  setValues(criteria)
}
else {
  Object.assign(criteria, getDefulatJDMReceiptCriteria())
}
// 進頁面時
onActivated(() => {
  (async () => {
    encryptionId.value = (route.query.encryptionId || '')
    if (encryptionId.value.length > 0) {
      const jdmReceiptIdResponse = await $api.v1.JdmReceipt.GetByEncryptionId(encryptionId.value)
      Object.assign(criteria, jdmReceiptIdResponse)
      setValues(criteria)
    }
    else {
      Object.assign(criteria, getDefulatJDMReceiptCriteria())
    }
  })()
})
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="收據編輯">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="支用機關:">
              <el-input v-model="criteria.agency" />
            </el-form-item>
            <el-form-item label="年度:">
              <el-input v-model="criteria.year" />
            </el-form-item>
            <el-form-item label="收據類別:">
              <el-radio-group v-model="criteria.receiptType" class="ml-4">
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
              <el-input v-model="criteria.payMoney" />
            </el-form-item>
            <el-form-item label="製單日期:">
              <div class="block">
                <el-date-picker v-model="criteria.makeDate" type="date" placeholder="" size="default" />
              </div>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="24">
                <ClientOnly>
                  <el-button type="primary" plain @click="SaveEdit()">
                    <AdminIcon name="i-carbon:save" class="pr-1" />
                    儲存
                  </el-button>
                </ClientOnly>
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
