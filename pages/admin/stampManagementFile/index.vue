<script setup lang="ts">
import { ElMessage } from 'element-plus'
import SingleUpload from '~/components/admin/SingleUpload.vue'

const { $api } = useNuxtApp()

const guid1 = ref([])
const guid2 = ref([])
const guid3 = ref([])
const guid4 = ref([])
const guid5 = ref([])

const fileList1 = ref([])
const fileList2 = ref([])
const fileList3 = ref([])
const fileList4 = ref([])
const fileList5 = ref([])

const jobTitle1 = '課長'
const jobTitle2 = '主辦出納人員'
const jobTitle3 = '單位主管'
const jobTitle4 = '主辦會計人員'
const jobTitle5 = '機關長官'

definePageMeta({ layout: 'admin' })
const filesRemoved = [
  { guid: guid1.value[0], jobTitle: jobTitle1, encryptionId: guid1.value[0]?.encryptionId, item: fileList1.value[0] },
  { guid: guid2.value[0], jobTitle: jobTitle2, encryptionId: guid2.value[0]?.encryptionId, item: fileList2.value[0] },
  { guid: guid3.value[0], jobTitle: jobTitle3, encryptionId: guid3.value[0]?.encryptionId, item: fileList3.value[0] },
  { guid: guid4.value[0], jobTitle: jobTitle4, encryptionId: guid4.value[0]?.encryptionId, item: fileList4.value[0] },
  { guid: guid5.value[0], jobTitle: jobTitle5, encryptionId: guid5.value[0]?.encryptionId, item: fileList5.value[0] },
]
async function uploadFiles() {
  const files = [
    { guid: guid1.value[0], jobTitle: jobTitle1, encryptionId: guid1.value[0]?.encryptionId, item: fileList1.value[0] },
    { guid: guid2.value[0], jobTitle: jobTitle2, encryptionId: guid2.value[0]?.encryptionId, item: fileList2.value[0] },
    { guid: guid3.value[0], jobTitle: jobTitle3, encryptionId: guid3.value[0]?.encryptionId, item: fileList3.value[0] },
    { guid: guid4.value[0], jobTitle: jobTitle4, encryptionId: guid4.value[0]?.encryptionId, item: fileList4.value[0] },
    { guid: guid5.value[0], jobTitle: jobTitle5, encryptionId: guid5.value[0]?.encryptionId, item: fileList5.value[0] },
  ]
  // 過濾掉 guid 為 undefined 的項目
  const validFiles = files.filter(file => file.guid !== undefined)
  const criteria = {
    guids: validFiles.map(file => file.guid),
    jobTitles: validFiles.map(file => file.jobTitle),
  }

  try {
    const encryptionIds = filesRemoved.filter(file => file.removed).map(file => file.encryptionId).join(',')
    if (encryptionIds.length > 0) {
      const { status } = await $api.v1.StampManagementFile.Remove(encryptionIds)
      if (status && status !== 200)
        throw new Error('刪除失敗')
      ElMessage.success('已刪除')
    }

    if (criteria.guids.length > 0) {
      const { status } = await $api.v1.StampManagementFile.Post(criteria)
      if (status && status !== 200)
        throw new Error('新增失敗')
      ElMessage.success('已新增')
    }
  }
  catch (error) {
    ElMessage.error(error.message)
  }
}
const getfiles = [
  { jobTitle: jobTitle1 },
  { jobTitle: jobTitle2 },
  { jobTitle: jobTitle3 },
  { jobTitle: jobTitle4 },
  { jobTitle: jobTitle5 },
]

const criteriaget = {

  jobTitles: getfiles.map(getfiles => getfiles.jobTitle),
}

onActivated(() => {
  (async () => {
    const response = await $api.v1.StampManagementFile.Get(criteriaget)
    const stampManagementFileResponse = response.items || []
    fileList1.value = []
    fileList2.value = []
    fileList3.value = []
    fileList4.value = []
    fileList5.value = []
    Object.assign(filesRemoved, stampManagementFileResponse)
    stampManagementFileResponse.forEach((item) => {
      const fileData = {
        name: item.sysFile.displayName,
        item,
      }

      switch (item.jobTitle) {
        case jobTitle1: // "課長"
          fileList1.value.push(fileData)
          break
        case jobTitle2: // "主辦出納人員"
          fileList2.value.push(fileData)
          break
        case jobTitle3: // "單位主管"
          fileList3.value.push(fileData)
          break
        case jobTitle4: // "主辦會計人員"
          fileList4.value.push(fileData)
          break
        case jobTitle5: // "機關長官"
          fileList5.value.push(fileData)
          break
        default:
          // 如果 jobTitle 不符合上述條件，可以在這裡處理其他情況（例如，紀錄錯誤或跳過）
          console.warn(`Unknown job title: ${item.jobTitle}`)
          break
      }
    })
  })()
})
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="圖章管理">
          <el-form label-width="auto">
            <el-row :gutter="20">
              <el-col class="m-auto" :span="18">
                <el-row :gutter="20">
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="課長">
                      <SingleUpload v-model:guids="guid1" v-model:fileList="fileList1" v-model:stampManagementFile.jobTitle="jobTitle1" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="主辦出納人員">
                      <SingleUpload v-model:guids="guid2" v-model:fileList="fileList2" v-model:stampManagementFile.jobTitle="jobTitle2" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="單位主管">
                      <SingleUpload v-model:guids="guid3" v-model:fileList="fileList3" v-model:stampManagementFile.jobTitle="jobTitle3" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="主辦會計人員">
                      <SingleUpload v-model:guids="guid4" v-model:fileList="fileList4" v-model:stampManagementFile.jobTitle="jobTitle4" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="12" :xl="12" :xs="24" :sm="24">
                    <el-form-item label="機關長官">
                      <SingleUpload v-model:guids="guid5" v-model:fileList="fileList5" v-model:stampManagementFile.jobTitle="jobTitle5" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col class="m-auto" align="center" :span="16">
                <ClientOnly>
                  <el-button type="primary" plain @click="uploadFiles()">
                    <AdminIcon name="i-carbon:save" class="pr-1" />
                    上傳全部檔案
                  </el-button>
                </ClientOnly>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
