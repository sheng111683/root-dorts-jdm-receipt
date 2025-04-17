<script setup lang="ts">
import {

} from '~/models'

definePageMeta({ layout: 'admin' })
// const criteria = reactive(getSysUserCriteria())
const criteria = reactive({
  datas: {
    sysAccount: 'fg342',
    sysName: '王明',
    currentEmployer: '工程部',
    gender: '男',
    phone: '0987654321',
    email: '123e@sss.com',
    holidayRecently: '2024/06/10',
    isAccountEnabled: '是',
    isMember: '否',
  },
})
const isAccountEnabledOptions = ref([
  { value: 'TRUE', label: '是' },
  { value: 'FALSE', label: '否' },
])
const isMemberOptions = ref([
  { value: 'TRUE', label: '是' },
  { value: 'FALSE', label: '否' },
])
const genderOptions = ref([
  { value: 'MAN', label: '男' },
  { value: 'WOMAN', label: '女' },
])
const unitOptions = [
  {
    value: 'Option1',
    label: '管理部門',
  },
  {
    value: 'Option2',
    label: 'QQ1',
  },
  {
    value: 'Option3',
    label: 'QQ2',
  },
  {
    value: 'Option4',
    label: 'QQ3',
  },
  {
    value: 'Option5',
    label: 'QQ4',
  },
]
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="帳號維護">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="帳號">
              <el-input v-model="criteria.datas.sysAccount" />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="criteria.datas.sysName" />
            </el-form-item>
            <el-form-item label="性別">
              <!-- <el-input v-model="criteria.stateType" /> -->
              <el-radio-group v-model="criteria.datas.gender" class="ml-4">
                <el-radio v-for="genderOption in genderOptions" :value="genderOption.value">
                  {{
                    genderOption.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="電話">
              <el-input v-model="criteria.datas.phone" />
            </el-form-item>
            <el-form-item label="電子信箱">
              <el-input v-model="criteria.datas.email" />
            </el-form-item>
            <el-form-item label="現職機關/單位">
              <el-select v-model="criteria.datas.currentEmployer" placeholder="請選擇" size="large">
                <el-option
                  v-for="item in unitOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="帳號是否啟用">
              <!-- <el-input v-model="criteria.stateType" /> -->
              <el-radio-group v-model="criteria.datas.isAccountEnabled" class="ml-4">
                <el-radio v-for="option in isAccountEnabledOptions" :value="option.value">
                  {{
                    option.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否為委員">
              <!-- <el-input v-model="criteria.stateType" /> -->
              <el-radio-group v-model="criteria.datas.isMember" class="ml-4">
                <el-radio v-for="option in isMemberOptions" :value="option.value">
                  {{
                    option.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-form-item>
            <ClientOnly>
              <el-button type="primary" plain native-type="submit">
                新增/修改密碼通知信
              </el-button>
              <el-button plain @click="$router.back()">
                回上一頁
              </el-button>
            </ClientOnly>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
