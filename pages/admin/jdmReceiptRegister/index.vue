<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { downloadFile } from '~/utils/downloadFile'
import {
  getDefaultagencyapply,
  getDefulatReceiptRegisterCriteria,
} from '~/models'
import { ReceiptType, ReceiptRegisterHandleType } from '~/enums'

const { $api } = useNuxtApp()
definePageMeta({ layout: 'admin' })
const runtimeConfig = useRuntimeConfig()
const { baseURL } = runtimeConfig.public
const criteria = reactive(getDefulatReceiptRegisterCriteria())

const addMemo = ref(false)

const drawerprint = ref(false)

const agencyapply = reactive([getDefaultagencyapply()])

const agencyselect = await $api.v1.JdmReceipt.GetApplyAgency({})

Object.assign(agencyapply, agencyselect)

async function search() {
  
  if(checkQuery())
  {
    criteria.receiptDateStart = formatDate(criteria.receiptDateStart)
    criteria.receiptDateEnd = formatDate(criteria.receiptDateEnd)
    if(criteria.handleType == '備註摘要')
    {
    }
    else if(criteria.handleType == '列印')
    {
      PrintReceiptRegister()
    }
  }
}

function formatDate(date) {
  if (date) {
    const DateObj = new Date(date)
    const year = DateObj.getFullYear()
    const month = String(DateObj.getMonth() + 1).padStart(2, '0')
    const day = String(DateObj.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}

function checkQuery() {
  const returnFlag = ref(true);
  if(criteria.agency == '')
  {
    ElMessage.error('請選擇支用機關')
    returnFlag.value = false
  }
  if(criteria.handleType == '')
  {
    ElMessage.error('請選擇處理類別')
    returnFlag.value =  false
  }
  if(criteria.receiptDateStart == '' || criteria.receiptDateEnd == '')
  {
    ElMessage.error('請選擇收據起迄日')
    returnFlag.value =  false
  }
  else if (criteria.receiptDateStart > criteria.receiptDateEnd)
  {
    ElMessage.error('收據起日不可大於迄日')
    returnFlag.value =  false
  }
  if(criteria.handleType == '列印' && criteria.receiptType == '')
  {
    ElMessage.error('請選擇收據類別')
    returnFlag.value =  false
  }

  return returnFlag.value
}


async function PrintReceiptRegister() {
  try {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '')
    // 取得時分秒，並將其加入檔案名稱
    const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false }).replace(/:/g, '') // 去掉冒號
    const fileName = `收據登記簿_${formattedDate}_${formattedTime}.pdf`

    const { status } = downloadFile(`${baseURL}/api/v1/jdmReceiptRegister/PrintReceiptRegister?agency=${criteria.agency.trim()}
    &receiptType=${criteria.receiptType.trim()}&type=${criteria.type.trim()}&receiptDateStart=${criteria.receiptDateStart.trim()}
    &receiptDateEnd=${criteria.receiptDateEnd.trim()}&startPage=${criteria.startPage.trim()}`, fileName)

    if (status && status !== 200) {
      throw new Error('下載失敗')
    }
    else {
      ElMessage.success('PDF 下載成功')
      drawerprint.value = false
    }
  }
  catch(error) {
    ElMessage.error('下載失敗')
    console.log(error)
  }
}


function resetForm() {
  criteria.agency = ''
  criteria.handleType = ''
  criteria.receiptType = ''
  criteria.receiptDateStart = ''
  criteria.receiptDateEnd = ''
  criteria.startPage = '1'
}

</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="收據登記簿">
          <el-form label-width="auto">
            <el-row :gutter="20">
              <el-col class="m-auto" :span="18">
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="支用機關:">
                      <el-select v-model="criteria.agency" placeholder="請選擇">
                        <el-option
                          v-for="item in agencyapply" :key="item.text" :label="item.text"
                          :value="item.value" 
                        />   
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="收據類別">
                      <el-radio-group v-model="criteria.receiptType" class="ml-4">
                        <el-radio v-for="option in ReceiptType.values()" :key="option" :value="option">
                          {{ ReceiptType.display(option) }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="收據起訖日期">
                      <div class="block">
                        <el-date-picker v-model="criteria.receiptDateStart" type="date" placeholder="" size="default" />
                        ~
                        <el-date-picker v-model="criteria.receiptDateEnd" type="date" placeholder="" size="default" />
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="起始頁次">
                      <div class="block">
                          <el-input v-model="criteria.startPage" />
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="處理類別">
                      <el-radio-group v-model="criteria.handleType" class="ml-4">
                        <el-radio v-for="option in ReceiptRegisterHandleType.values()" :key="option" :value="option">
                          {{ ReceiptRegisterHandleType.display(option) }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col class="m-auto" align="center" :span="16">
                <ClientOnly>
                  <el-button type="primary" plain @click="search()">
                    <AdminIcon name="i-carbon:search" class="pr-1" />
                    查詢
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
  </AdminContainer>
</template>
