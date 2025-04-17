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
    experience: '一些經歷',
    expertise1: '',
    expertise2: '',
    expertise3: '',
  },
})
const activeName = ref('first')
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
  { value: 'OTHER', label: '其它' },
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
        <el-card header="編輯帳號">
          <el-tabs v-model="activeName" type="border-card" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="使用者基本資料" name="first">
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
                    <!-- <AdminIcon name="i-carbon:search" class="pr-1" /> -->
                    新增/修改密碼通知信
                  </el-button>
                  <el-button type="primary" plain native-type="submit">
                    <!-- <AdminIcon name="i-carbon:search" class="pr-1" /> -->
                    儲存
                  </el-button>
                  <el-button plain @click="$router.back()">
                    <!-- <AdminIcon name="i-carbon:reset" class="pr-1" /> -->
                    回上一頁
                  </el-button>
                </ClientOnly>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="經歷專長" name="second">
              <el-form label-width="auto" class="form-max-width">
                <el-form-item label="經歷">
                  <el-input v-model="criteria.datas.experience" />
                </el-form-item>
                <el-form-item label="專長1">
                  <el-input v-model="criteria.datas.expertise1" />
                </el-form-item>
                <el-form-item label="專長2">
                  <el-input v-model="criteria.datas.expertise2" />
                </el-form-item>
                <el-form-item label="專長3">
                  <el-input v-model="criteria.datas.expertise3" />
                </el-form-item>
              </el-form>
              <el-form-item>
                <ClientOnly>
                  <el-button type="primary" plain native-type="submit">
                    <!-- <AdminIcon name="i-carbon:search" class="pr-1" /> -->
                    儲存
                  </el-button>
                  <el-button plain @click="$router.back()">
                    <!-- <AdminIcon name="i-carbon:reset" class="pr-1" /> -->
                    回上一頁
                  </el-button>
                </ClientOnly>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
