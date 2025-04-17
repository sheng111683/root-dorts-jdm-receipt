<script setup lang="ts">
import * as yup from 'yup'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CircleClose } from '@element-plus/icons-vue'
import { MessageType } from '~/enums'
import {
  getDefaultSysDepartment,
  getDefulatSysDepartmentCriteria,
  getSysDepartmentQueryResult,

} from '~/models'

const { setValues, resetForm, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    content: yup.string().trim(),
    createUser: yup.string().trim(),
  }),
})

definePageMeta({ layout: 'admin' })
const { $api } = useNuxtApp()
const notification = useNotification()
const permissionStore = usePermissionStore()
const { isAdd, isEdit, isRemoved } = storeToRefs(permissionStore)
const editDrawer = ref(false)
// const title = useRouteMetaTitle()
const criteria = reactive(getDefulatSysDepartmentCriteria())
const SysDepartment = reactive(getDefaultSysDepartment())
const queryResult = reactive(getSysDepartmentQueryResult())
const veeFields: any = reactive(useGenerateVeeFields(Object.keys(getDefaultSysDepartment()), defineField))
let itemId = ''
const encryptionId = ref(itemId || '')
const batchRemovedList = ref([getDefaultSysDepartment()])
const departmentSelect = reactive([getDefaultSysDepartment()])

const onSubmit = handleSubmit(async (values) => {
  try {
    await ElMessageBox.confirm(
      '您確定要更新當前資料?',
      '送出資料提醒',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: MessageType.display(MessageType.Warning),
      },
    )
    Object.assign(SysDepartment, values)
    if (SysDepartment.departmentId.length > 0) {
      const { status }: any = await $api.v1.SysDepartment.Put(SysDepartment)
      if (status && status !== 200)
        throw new Error('儲存失敗')
      ElMessage.success('已儲存')
    }
    else {
      const { status }: any = await $api.v1.SysDepartment.Post(SysDepartment)
      if (status && status !== 200)
        throw new Error('新增失敗')
      ElMessage.success('已新增')
    }
    // router.back()
    editDrawer.value = false
    search()
  }
  catch (e: any) {
    if (e.toString() !== 'cancel')
      throw e
  }
})

async function search() {
  const SysDepartmentsResponse = await $api.v1.SysDepartment.Get(criteria)
  Object.assign(queryResult, SysDepartmentsResponse)
  queryResult.items = queryResult.items.map((item) => {
    return item
  })
}

function handleCurrentChange(val: number) {
  criteria.pageNumber = val
  search()
}

async function batchRemoved() {
  try {
    await ElMessageBox.confirm('您確定要移除以勾選資料?', '移除資料', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: MessageType.display(MessageType.Warning),
    })
    const encryptionIds = batchRemovedList.value.map(item => item.departmentId)
    const { status }: any = await $api.v1.SysDepartment.Remove(
      encryptionIds,
    )
    if (status && status !== 200)
      throw new Error('移除失敗')
    notification.success('已移除')
    search()
  }
  catch (e: any) {
    if (e.toString() !== 'cancel')
      throw e
  }
}
function handleSelectionChange(items) {
  batchRemovedList.value = items
}

async function editId(id) {
  editDrawer.value = true
  itemId = id
  encryptionId.value = (itemId || '')
  if (id.length > 0) {
    const department = await $api.v1.SysDepartment.GetParentSelectList(id)
    Object.assign(departmentSelect, getDefaultSysDepartment())
    Object.assign(departmentSelect, department)
    const SysDepartmentIdResponse = await $api.v1.SysDepartment.GetByEncryptionId(id)
    Object.assign(SysDepartment, SysDepartmentIdResponse)
    setValues(SysDepartment)
  }
  else {
    const department = await $api.v1.SysDepartment.GetAllSelectList()
    Object.assign(departmentSelect, getDefaultSysDepartment())
    Object.assign(departmentSelect, department)
    Object.assign(SysDepartment, getDefaultSysDepartment())
    resetForm({ values: SysDepartment })
  }
}
async function handleRemove(encryptionId: string) {
  try {
    await ElMessageBox.confirm('您確定要移除這筆資料?', '移除資料', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: MessageType.display(MessageType.Warning),
    })
    const { status }: any = await $api.v1.SysDepartment.Remove(
      [encryptionId],
    )
    if (status && status !== 200)
      throw new Error('移除失敗')
    notification.success('已移除')
    search()
  }
  catch (e: any) {
    if (e.toString() !== 'cancel')
      throw e
  }
}

function reset() {
  Object.assign(criteria, getDefulatSysDepartmentCriteria())
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="部門資料管理">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="部門名稱">
              <el-input v-model="criteria.departmentName" />
            </el-form-item>
          </el-form>
          <el-row :gutter="20">
            <el-col :span="16">
              <ClientOnly>
                <el-button type="primary" plain @click="search()">
                  <AdminIcon name="i-carbon:search" class="pr-1" />
                  查詢
                </el-button>
              </ClientOnly>
              <el-button plain @click="reset()">
                <AdminIcon name="i-carbon:reset" class="pr-1" />
                重設
              </el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card header="查詢結果" class="mt-4">
          <el-row>
            <el-col :span="16">
              <el-pagination
                v-if="queryResult.totalItemCount > 0"
                v-model:current-page="queryResult.pageNumber" v-model:page-size="queryResult.pageSize"
                layout="total, prev, pager, next, jumper" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
            <el-col :span="8">
              <ClientOnly>
                <el-button type="danger" class="ms-1" float="right" @click="batchRemoved">
                  <AdminIcon name="i-carbon:delete" class="pr-1" />
                  批次刪除
                </el-button>
                <el-button
                  v-if="isAdd"
                  type="primary" float="right"
                  @click="editId"
                >
                  <AdminIcon name="i-carbon:add" class="pr-1" />
                  新增
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="#">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="parentDepartmentName" label="上級部門" />
            <el-table-column prop="departmentName" label="部門名稱" />
            <el-table-column label="動作" width="160">
              <template #default="scope">
                <ClientOnly>
                  <el-button
                    v-if="isEdit"
                    type="primary" size="small"
                    @click="editId(scope.row.departmentId)"
                  >
                    <AdminIcon name="i-carbon:edit" class="pr-1" />
                    編輯
                  </el-button>
                  <el-button v-if="isRemoved" size="small" type="danger" @click="handleRemove(scope.row.departmentId)">
                    <AdminIcon name="i-carbon:delete" class="pr-1" />
                    移除
                  </el-button>
                </ClientOnly>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="mt-4">
            <el-col :span="16">
              <el-pagination
                v-if="queryResult.totalItemCount > 0"
                v-model:current-page="queryResult.pageNumber" v-model:page-size="queryResult.pageSize"
                layout="total, prev, pager, next, jumper" :total="queryResult.totalItemCount"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 編輯抽屜 -->
    <el-drawer v-model="editDrawer" :append-to-body="true" size="85%" title="編輯" :with-header="false">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card header="部門資料編輯頁面">
            <el-form label-width="auto" class="form-max-width" @submit="onSubmit">
              <el-form-item label="上級部門">
                <el-select v-bind="veeFields.parentDepartmentId.field" v-model="veeFields.parentDepartmentId.value" placeholder="請選擇" size="large">
                  <el-option
                    v-for="item in departmentSelect" :key="item.parentDepartmentName" :label="item.parentDepartmentName"
                    :value="item.parentDepartmentId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="部門名稱">
                <el-input v-bind="veeFields.departmentName.field" v-model="veeFields.departmentName.value" />
              </el-form-item>
              <el-form-item>
                <ClientOnly>
                  <el-button type="primary" plain native-type="submit">
                    <!-- <AdminIcon name="i-carbon:search" class="pr-1" /> -->
                    儲存
                  </el-button>
                  <el-button plain @click="editDrawer = false">
                    <el-icon class="pr-1">
                      <CircleClose />
                    </el-icon>
                    取消
                  </el-button>
                </ClientOnly>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-drawer>
  </AdminContainer>
</template>
