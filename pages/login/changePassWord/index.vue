<script setup lang="ts">
import {
  getDefaultCriteria,
  getSysUserQueryResult,
} from '~/models'

definePageMeta({ layout: 'admin' })
const permissionStore = usePermissionStore()
const { isAdd, isEdit, isRemoved } = storeToRefs(permissionStore)
const criteria = reactive({
  businessMailbox: '',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getSysUserQueryResult())
const datas = [
  { higherOffice: '', departmentName: '王明' },
]
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="忘記密碼">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="請輸入您的公務信箱 :">
              <el-input v-model="criteria.businessMailbox" />
            </el-form-item>
          </el-form>
          <el-row :gutter="20">
            <el-col :span="16">
              <ClientOnly>
                <el-button type="primary" plain>
                  <AdminIcon name="i-carbon:send" class="pr-1" />
                  送出
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
