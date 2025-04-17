<script setup lang="ts">
import { ElMessage, ElMessageBox, type UploadInstance, type UploadProps } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { downloadFile } from '~/utils/downloadFile'

const props = defineProps({
  guids: {
    type: Array<string>,
    default: [],
  },
  fileList: {
    type: Array<{ name: string, url: string }>,
    default: [],
  },
})
const emits = defineEmits(['update:guids', 'update:fileList'])
const runtimeConfig = useRuntimeConfig()
const { baseURL } = runtimeConfig.public
const authToken = useCookie('auth-token')
const upload = ref<UploadInstance>()

const uploadHeaders = computed(() => {
  return {
    Authorization: `Bearer ${authToken.value}`,
  }
})

const guidsLength = computed(() => {
  return props.guids.length + props.fileList.length
})

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt500kb = file.size / 1024 <= 500

  if (!isJPGorPNG) {
    ElMessage.error('只能上傳 JPG 或 PNG 格式的文件')
    return false
  }
  if (!isLt500kb) {
    ElMessage.error('文件大小不能超過 500KB')
    return false
  }
  return true
}

const handleSuccess: UploadProps['onSuccess'] = (response) => {
  const guid: string = response.data[0].sysFile.guid
  emits('update:guids', [...props.guids, guid])
}

const handlePreview: UploadProps['onPreview'] = async (uploadFile) => {
  try {
    await ElMessageBox.confirm(
      '您要下載檔案?',
      '檔案下載',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
    downloadFile(`${baseURL}/api/v1/sysFile/downloadFile?encryptionId=${uploadFile.item.sysFile.encryptionId}`, uploadFile.name)
  }
  catch (e: any) {
    if (e.toString() !== 'cancel')
      throw e
  }
}

const handleRemove: UploadProps['onRemove'] = (file) => {
  if (file.response) {
    const guid: string = file.response.data[0].sysFile.guid
    emits('update:guids', props.guids.filter(item => item !== guid))
  }
  else {
    file.item.removed = true
  }
}

onActivated(() => {
  emits('update:guids', [])
  emits('update:fileList', [])
})
</script>

<template>
  <el-upload
    ref="upload"
    :drag="guidsLength === 0" class="upload" name="iFormFiles"
    :action="`${baseURL}/api/v1/sysFile/uploadFile?isMemoryCache=true`" :file-list="props.fileList"
    :headers="uploadHeaders" :limit="1" :before-upload="beforeUpload" :on-success="handleSuccess" :on-preview="handlePreview"
    :on-remove="handleRemove"
  >
    <el-icon v-show="guidsLength === 0" class="el-icon--upload">
      <UploadFilled />
    </el-icon>
    <div v-show="guidsLength === 0" class="el-upload__text">
      將文件拖曳到此處，或<em>點擊上傳</em>
    </div>
    <!-- <el-button :disabled="guidsLength > 0" type="primary">
      請選擇檔案
    </el-button> -->
    <template #tip>
      <div v-show="guidsLength === 0" class="el-upload__tip">
        只能上傳jpg/png文件，且不超過500kb
      </div>
    </template>
  </el-upload>
</template>

<style scoped>
.upload {
  width: 100%;
}
</style>
