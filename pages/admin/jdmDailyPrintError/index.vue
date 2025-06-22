<script setup lang="ts">
import { ElMessage} from 'element-plus'
import { downloadFile } from '~/utils/downloadFile'
import {
  getDefaultagencyapply,
  getDefulatReceiptPrintErrorCriteria,
} from '~/models'
import { ReceiptType } from '~/enums'

const { $api } = useNuxtApp()
definePageMeta({ layout: 'admin' })
const runtimeConfig = useRuntimeConfig()
const { baseURL } = runtimeConfig.public
const criteria = reactive(getDefulatReceiptPrintErrorCriteria())

const drawerprint = ref(false)

const agencyapply = reactive([getDefaultagencyapply()])

const agencyselect = await $api.v1.JdmDailyPrintError.GetApplyAgency({})

Object.assign(agencyapply, agencyselect)

async function search() {
  
  if(checkQuery())
  {
    criteria.printDate = formatDate(criteria.printDate)
    criteria.type = '0'
    PrintReceiptPrintError()
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
  if(criteria.receiptType == '')
  {
    ElMessage.error('請選擇收據類別')
    returnFlag.value =  false
  }
  if(criteria.printDate == '')
  {
    ElMessage.error('請選擇列印年月')
    returnFlag.value =  false
  }

  return returnFlag.value
}


async function PrintReceiptPrintError() {
  try {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '')
    // 取得時分秒，並將其加入檔案名稱
    const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false }).replace(/:/g, '') // 去掉冒號
    const fileName = `列印異常明細表_${formattedDate}_${formattedTime}.pdf`

    const { status } = await downloadFile(`${baseURL}/api/v1/jdmDailyPrintError/PrintReceiptPrintError?agency=${criteria.agency.trim()}
    &receiptType=${criteria.receiptType.trim()}&printDate=${criteria.printDate.trim()}&type=${criteria.type.trim()}`, fileName)

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
  }
}


function resetForm() {
  criteria.agency = ''
  criteria.printDate = ''
  criteria.receiptType = ''
}

</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="列印異常明細表">
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
                    <el-form-item label="收據日期">
                      <div class="block">
                        <el-date-picker v-model="criteria.printDate" type="date" placeholder="" size="default" />
                      </div>
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
                    列印
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
