<script setup lang="ts">
import {

} from '~/models'
import { ElMessage } from 'element-plus'

definePageMeta({ layout: 'admin' })
// const criteria = reactive(getSysUserCriteria())
const criteria = reactive({
  higherOffice: '',
  departmentName: '',
  datas: {
    higherOffice: 'QQ1',
    departmentName: '管理部門',
  },
})
const higherOfficeOptions = [
  {
    value: 'Option1',
    label: 'QQ1',
  },
  {
    value: 'Option2',
    label: 'QQ2',
  },
]
function handleSave() {
  ElMessage.success('已儲存')
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="部門資料編輯頁面">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="上級部門">
              <el-select v-model="criteria.datas.higherOffice" placeholder="請選擇" size="large">
                <el-option
                  v-for="item in higherOfficeOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="部門名稱">
              <el-input v-model="criteria.datas.departmentName" />
            </el-form-item>
          </el-form>
          <el-form-item>
            <ClientOnly>
              <el-button type="primary" plain native-type="submit" @click="handleSave()">
                儲存
              </el-button>
            </ClientOnly>
            <el-button plain @click="$router.back()">
              回上一頁
            </el-button>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
