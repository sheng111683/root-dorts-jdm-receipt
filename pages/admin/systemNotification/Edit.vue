<script setup lang="ts">
import { ElMessage } from 'element-plus'

import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  announcementScope: 'DG',
  scope: 'DG',
  announcementCode: '20240430-DG-001',
  startTime: '2023-06-21 15:20:00',
  endTime: '2024-05-19 15:20:00',
  relatedLinks: '',
  announcementTextarea: '主機異常，已解決，可正常使用',
  postedBy: '11695/王大明/J8/技術處 第五課',
  disableChecked: '',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())

function handleSave() {
  // ElMessageBox.alert(
  //     '您確定要更新當前資料?',
  //     '送出資料提醒',
  //     {
  //         confirmButtonText: '確定',
  //         cancelButtonText: '取消',
  //         type: 'warning',
  //     }
  // )
  ElMessage.success('已儲存')
}
async function search(val) {
  criteria.pageNumber = val || 1
  const start = (criteria.pageNumber - 1) * criteria.pageSize
  const end = criteria.pageNumber * criteria.pageSize
  Object.assign(queryResult, {
    pageNumber: criteria.pageNumber,
    totalItemCount: datas.length,
    pageCount: 1,
    items: datas.slice(start, end),
  })
}
function addToScope() {
  if (criteria.announcementScope && !isScopeOptionAdded(criteria.announcementScope)) {
    if (criteria.scope) {
      criteria.scope += `,${criteria.announcementScope}`
    }
    else {
      criteria.scope = criteria.announcementScope
    }
  }
}

function isScopeOptionAdded(option) {
  if (!criteria.scope) {
    return false
  }
  const scopes = criteria.scope.split(',')
  return scopes.includes(option)
}
function removeFromScope() {
  if (criteria.scope) {
    const scopes = criteria.scope.split(',')
    const index = scopes.indexOf(criteria.announcementScope)
    if (index !== -1) {
      scopes.splice(index, 1)
      criteria.scope = scopes.join(',')
    }
  }
}
const announcementScopeOptions = [
  { value: 'DG', label: 'DG-捷運團隊專區' },
  { value: 'PG', label: 'PG-呵呵' },
  { value: 'PT', label: 'PT-委外專區' },
]
const datas = [
  { announcementScope: 'QQeeRRow', scope: 'DG', loginPassword: '' },
]

function reset() {

}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="系統公告編輯">
          <el-form label-width="auto" class="form-max-width">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="公告範圍">
                  <el-select v-model="criteria.announcementScope" placeholder="Select">
                    <el-option
                      v-for="item in announcementScopeOptions" :key="item.value"
                      :label="item.label" :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item label="">
                  <el-button type="success" plain class="p-1" @click="addToScope()">
                    ＋
                  </el-button>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item label="">
                  <el-button type="success" plain class="p-1" @click="removeFromScope()">
                    －
                  </el-button>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="">
                  <el-input v-model="criteria.scope" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="公告代碼">
                  <el-input v-model="criteria.announcementCode" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="起始時間">
                  <div class="block">
                    <el-date-picker
                      v-model="criteria.startTime" type="datetime"
                      placeholder="選擇日期時間"
                    />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="結束時間">
                  <div class="block">
                    <el-date-picker
                      v-model="criteria.endTime" type="datetime"
                      placeholder="選擇日期時間"
                    />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="相關連結">
                  <el-input v-model="criteria.relatedLinks" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="公告內容">
                  <el-input
                    v-model="criteria.announcementTextarea"
                    :autosize="{ minRows: 6, maxRows: 4 }" type="textarea" placeholder="內容"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18">
                <el-form-item label="發佈人員">
                  <el-input v-model="criteria.postedBy" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否停用">
                  <el-checkbox v-model="disableChecked" label="停用" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <ClientOnly>
                <el-button type="primary" plain @click="handleSave()">
                  儲存
                </el-button>
                <el-button plain @click="$router.push({ path: '/admin/systemNotification' })">
                  取消
                </el-button>
              </ClientOnly>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
