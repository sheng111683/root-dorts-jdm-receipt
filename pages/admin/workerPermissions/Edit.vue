<script setup lang="ts">
import { ElMessage } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  employeeID: '11695',
  employeeName: '唐先生',
  serviceDepartment: '技術處第三課',
  state: '在職中',
  userPermissionRole: '',
  scope: '',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())

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

const stateOptions = ref([
  { value: 'OnTheJob', label: '在職中' },
  { value: 'Resigned', label: '已離職' },
])

const userPermissionRoleOptions = [
  {
    value: 'Option1',
    label: '-應用系統負責人員',
  },
  {
    value: 'Option2',
    label: '-後台系統負責人員',
  },
]
const scopeOptions = [
  {
    value: 'Option1',
    label: '大地監測資料管理子系統',
  },
  {
    value: 'Option2',
    label: '技術文件審查管理系統',
  },
  {
    value: 'Option3',
    label: '技術文件線上簽核系統',
  },
  {
    value: 'Option4',
    label: '督工管理系統(委外監造)',
  },
  {
    value: 'Option4',
    label: '-',
  },
]

function handleCurrentChange(val) {
  search(val)
}
function handleSave() {
  ElMessage.success('已新增')
}
const datas = [
  { userPermissionRole: '-應用系統負責人員', scope: '大地監測資料管理子系統' },
  { userPermissionRole: '-應用系統負責人員', scope: '技術文件審查管理系統' },
  { userPermissionRole: '-應用系統負責人員', scope: '技術文件線上簽核系統' },
  { userPermissionRole: '-應用系統負責人員', scope: '督工管理系統' },
  { userPermissionRole: '-應用系統負責人員', scope: '-' },
]
function reset() {
  Object.keys(criteria).forEach((key) => {
    criteria[key] = ''
  })
  // queryResult.items = [];
  // queryResult.totalItemCount = 0;
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="作業人員權限維護">
          <el-form label-width="auto" class="form-max-width">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="員工編號">
                  <el-input v-model="criteria.employeeID" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="人員姓名">
                  <el-input v-model="criteria.employeeName" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="人員狀態">
                  <el-input v-model="criteria.state" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="服務部門">
                  <el-input v-model="criteria.serviceDepartment" disabled />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="mt-4">
          <el-table :data="datas" stripe style="width: 100%">
            <el-table-column prop="userPermissionRole" label="使用者權限腳色" />
            <el-table-column prop="scope" label="作用範圍" />
            <el-table-column label="動作" width="160">
              <template #default="scope">
                <ClientOnly>
                  <el-button size="small" type="danger">
                    <AdminIcon name="i-carbon:delete" class="pr-1" />
                    移除
                  </el-button>
                </ClientOnly>
              </template>
            </el-table-column>
          </el-table>
          <el-form>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="">
                  <el-select v-model="criteria.userPermissionRole" placeholder="請選擇">
                    <el-option
                      v-for="item in userPermissionRoleOptions" :key="item.value"
                      :label="item.label" :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="">
                  <el-select v-model="criteria.scope" placeholder="請選擇">
                    <el-option
                      v-for="item in scopeOptions" :key="item.value" :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <ClientOnly>
              <el-button type="primary" plain>
                新增
              </el-button>
            </ClientOnly>
          </el-form>
        </el-card>
        <el-card class="mt-4">
          <el-form>
            <el-form-item>
              <ClientOnly>
                <el-button plain @click="$router.push({ path: '/admin/workerPermissions' })">
                  返回
                </el-button>
              </ClientOnly>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
