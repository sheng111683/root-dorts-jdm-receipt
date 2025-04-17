<script setup lang="ts">
import {

} from '~/models'

definePageMeta({ layout: 'admin' })
// const criteria = reactive(getSysUserCriteria())
const criteria = reactive({
  domainPath: '',
  externalFrontDeskWebsite: '',
  internalFrontDeskWebsite: '',
  companyName: '',
  debugOrNot: '',
  email: '',
  datas: {
    domainPath: '192.168.2.28',
    externalFrontDeskWebsite: '192.168.2.28',
    internalFrontDeskWebsite: '192.168.2.28',
    companyName: 'XX公司',
    debugOrNot: '是',
    email: '123e@sss.com',
  },
})
const debugOrNotOptions = [
  {
    value: 'Option1',
    label: '是',
  },
  {
    value: 'Option2',
    label: '否',
  },
]
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="企業資訊編輯頁面">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="網域路徑">
              <el-input v-model="criteria.datas.domainPath" />
            </el-form-item>
            <el-form-item label="網域路徑(對外前台網站)">
              <el-input v-model="criteria.datas.externalFrontDeskWebsite" />
            </el-form-item>
            <el-form-item label="網域路徑(內部前台網站)">
              <el-input v-model="criteria.datas.internalFrontDeskWebsite" />
            </el-form-item>
            <el-form-item label="企業名稱">
              <el-input v-model="criteria.datas.companyName" />
            </el-form-item>
            <el-form-item label="是否除錯">
              <el-select v-model="criteria.datas.debugOrNot" placeholder="請選擇" size="large">
                <el-option
                  v-for="item in debugOrNotOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="電子郵件-1">
              <el-input v-model="criteria.datas.email" />
            </el-form-item>
          </el-form>
          <el-form-item>
            <ClientOnly>
              <el-button type="primary" plain native-type="submit">
                <!-- <AdminIcon name="i-carbon:search" class="pr-1" /> -->
                儲存
              </el-button>
            </ClientOnly>
            <el-button plain @click="$router.back()">
              <!-- <AdminIcon name="i-carbon:reset" class="pr-1" /> -->
              回上一頁
            </el-button>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
