<script setup lang="ts">
import * as yup from 'yup'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getDefaultSysLogAccess,
} from '~/models'

definePageMeta({ layout: 'admin' })
const { $api } = useNuxtApp()
const route = useRoute()

const encryptionId = ref(route.query.encryptionId || '')

const { setValues, resetForm, defineField } = useForm({
  validationSchema: yup.object({
    createUser: yup.string().trim(),
    createDate: yup.string().trim(),
  }),
})
const veeFields: any = reactive(useGenerateVeeFields(Object.keys(getDefaultSysLogAccess()), defineField))

const sysLogAccess = reactive(getDefaultSysLogAccess())
if (encryptionId.value.length > 0) {
  const { data } = await useAsyncData(() => {
    return $api.v1.SysLogAccess.GetByEncryptionId(encryptionId.value)
  })
  Object.assign(sysLogAccess, data.value)
  setValues(sysLogAccess)
  // sysLogAccessTimeValue.value[0] = (sysLogAccess.sysLogAccessDateStart).toString()
  // sysLogAccessTimeValue.value[1] = (sysLogAccess.sysLogAccessDateEnd).toString()
  const date = new Date(veeFields.createDate.value)
  veeFields.createDate.value = date.toISOString().split('T')[0].replace(/-/g, '/')
}
onActivated(() => {
  (async () => {
    encryptionId.value = (route.query.encryptionId || '')
    if (encryptionId.value.length > 0) {
      const sysLogAccessIdResponse = await $api.v1.SysLogAccess.GetByEncryptionId(encryptionId.value)
      Object.assign(sysLogAccess, sysLogAccessIdResponse)
      setValues(sysLogAccess)
      // sysLogAccessTimeValue.value[0] = (sysLogAccess.sysLogAccessDateStart).toString()
      // sysLogAccessTimeValue.value[1] = (sysLogAccess.sysLogAccessDateEnd).toString()
      const date = new Date(veeFields.createDate.value)
      veeFields.createDate.value = date.toISOString().split('T')[0].replace(/-/g, '/')
    }
    else {
      Object.assign(sysLogAccess, getDefaultSysLogAccess())
      resetForm({ values: sysLogAccess })
    }
  })()
})
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="瀏覽資訊">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="使用者">
              <el-text>{{ veeFields.sysUser.value }}</el-text>
            </el-form-item>
            <el-form-item label="瀏覽器類型">
              <el-text>{{ veeFields.browser.value }}</el-text>
            </el-form-item>
            <el-form-item label="來源IP">
              <el-text>{{ veeFields.remoteIp.value }}</el-text>
            </el-form-item>
            <el-form-item label="查詢內容">
              <el-text>{{ veeFields.queryString.value }}</el-text>
            </el-form-item>
            <el-form-item label="訪問時間">
              <el-text>{{ veeFields.createDate.value }}</el-text>
            </el-form-item>
            <el-form-item label="瀏覽器版本">
              <el-text>{{ veeFields.browserVersion.value }}</el-text>
            </el-form-item>
            <el-form-item label="作業系統平台">
              <el-text>{{ veeFields.os.value }}</el-text>
            </el-form-item>
            <el-form-item label="系統請求序號">
              <el-text>{{ veeFields.requestId.value }}</el-text>
            </el-form-item>
          </el-form>
          <el-row :gutter="20">
            <el-col :span="16">
              <ClientOnly>
                <el-button plain @click="$router.back()">
                  回上一頁
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
