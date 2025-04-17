<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  businessMailbox: '',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())
const datas = [
  { higherOffice: '', departmentName: '' },
]
const fileList = ref<UploadUserFile[]>([
  {
    name: '測試檔案1.svg',
    url: '#',
  },
  {
    name: '測試檔案2.svg',
    url: '#',
  },
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
        `最多上傳10個, 您這次選擇了 ${files.length} 個新檔案, 總共會有 ${files.length + uploadFiles.length
        } 個, 已超過`,
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
        `確定刪除 ${uploadFile.name} ?`,
  ).then(
    () => true,
    () => false,
  )
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="檔案功能">
          <el-form label-width="auto" class="form-max-width">
            <el-upload
              v-model:file-list="fileList" class="upload-demo"
              action="#" multiple
              :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
              :limit="10" :on-exceed="handleExceed"
            >
              <!-- limit 可設定最大上傳數 -->
              <el-button type="primary">
                上傳檔案
              </el-button>
            </el-upload>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
