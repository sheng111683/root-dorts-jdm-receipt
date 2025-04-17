<script setup lang="ts">
import * as yup from 'yup'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getDefaultSysLogDataChange,
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
const veeFields: any = reactive(useGenerateVeeFields(Object.keys(getDefaultSysLogDataChange()), defineField))

const sysLogDataChange = reactive(getDefaultSysLogDataChange())
if (encryptionId.value.length > 0) {
  const { data } = await useAsyncData(() => {
    return $api.v1.SysLogDataChange.GetByEncryptionId(encryptionId.value)
  })
  Object.assign(sysLogDataChange, data.value)
  setValues(sysLogDataChange)
  // sysLogDataChangeTimeValue.value[0] = (sysLogDataChange.sysLogDataChangeDateStart).toString()
  // sysLogDataChangeTimeValue.value[1] = (sysLogDataChange.sysLogDataChangeDateEnd).toString()
  const date = new Date(veeFields.createDate.value)
  veeFields.createDate.value = date.toISOString().split('T')[0].replace(/-/g, '/')
}
onActivated(() => {
  (async () => {
    encryptionId.value = (route.query.encryptionId || '')
    if (encryptionId.value.length > 0) {
      const sysLogDataChangeIdResponse = await $api.v1.SysLogDataChange.GetByEncryptionId(encryptionId.value)
      Object.assign(sysLogDataChange, sysLogDataChangeIdResponse)
      setValues(sysLogDataChange)
      // sysLogDataChangeTimeValue.value[0] = (sysLogDataChange.sysLogDataChangeDateStart).toString()
      // sysLogDataChangeTimeValue.value[1] = (sysLogDataChange.sysLogDataChangeDateEnd).toString()
      const date = new Date(veeFields.createDate.value)
      veeFields.createDate.value = date.toISOString().split('T')[0].replace(/-/g, '/')
    }
    else {
      Object.assign(sysLogDataChange, getDefaultSysLogDataChange())
      resetForm({ values: sysLogDataChange })
    }
  })()
})
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="瀏覽異動資訊">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="異動前">
              <el-text>{{ veeFields.oldData.value }}</el-text>
            </el-form-item>
            <el-form-item label="異動後">
              <el-text>{{ veeFields.newData.value }}</el-text>
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
