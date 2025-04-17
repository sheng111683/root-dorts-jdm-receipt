<script setup lang="ts">
import * as yup from 'yup'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CircleClose } from '@element-plus/icons-vue'
import { Availability, Gender, MessageType } from '~/enums'
import {
  getDefaultSysDepartment,
  getDefaultSysUser,
  getSysUserCriteria,
  getSysUserQueryResult,
} from '~/models'

definePageMeta({ layout: 'admin' })
const { $api } = useNuxtApp()
const notification = useNotification()
const permissionStore = usePermissionStore()
const { isAdd, isEdit, isRemoved } = storeToRefs(permissionStore)
const editDrawer = ref(false)
const criteria = reactive(getSysUserCriteria())
const queryResult = reactive(getSysUserQueryResult())

const isTrueOrFalse = ref([
  { value: true, label: '是' },
  { value: false, label: '否' },
])
const department = await $api.v1.SysDepartment.GetList()
const departmentSelect = reactive([getDefaultSysDepartment()])
Object.assign(departmentSelect, department)

const { setValues, resetForm, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    content: yup.string().trim(),
    createUser: yup.string().trim(),
  }),
})
let itemId = ''
const encryptionId = ref(itemId || '')
const veeFields: any = reactive(useGenerateVeeFields(Object.keys(getDefaultSysUser()), defineField))
const sysUser = reactive(getDefaultSysUser())
const batchRemovedList = ref([getDefaultSysUser()])
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
    Object.assign(sysUser, values)
    if (sysUser.encryptionId.length > 0) {
      const { status }: any = await $api.v1.SysUser.Put(sysUser)
      if (status && status !== 200)
        throw new Error('儲存失敗')
      ElMessage.success('已儲存')
    }
    else {
      const { status }: any = await $api.v1.SysUser.Post(sysUser)
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
async function handleRemove(encryptionId: string) {
  try {
    await ElMessageBox.confirm('您確定要移除這筆資料?', '移除資料', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: MessageType.display(MessageType.Warning),
    })
    const { status }: any = await $api.v1.SysUser.Remove(
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

async function search() {
  const sysUserResponse = await $api.v1.SysUser.Get(criteria)
  Object.assign(queryResult, sysUserResponse)
  queryResult.items = queryResult.items.map((item) => {
    return item
  })
}
async function editId(id) {
  editDrawer.value = true
  itemId = id
  encryptionId.value = (itemId || '')
  if (id.length > 0) {
    const sysUserIdResponse = await $api.v1.SysUser.GetByEncryptionId(id)
    Object.assign(sysUser, sysUserIdResponse)

    setValues(sysUser)
  }
  else {
    Object.assign(sysUser, getDefaultSysUser())
    resetForm({ values: sysUser })
  }
}
async function batchRemoved() {
  try {
    await ElMessageBox.confirm('您確定要移除以勾選資料?', '移除資料', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: MessageType.display(MessageType.Warning),
    })
    const encryptionIds = batchRemovedList.value.map(item => item.encryptionId)
    const { status }: any = await $api.v1.SysUser.Remove(
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

function handleCurrentChange(val: number) {
  criteria.pageNumber = val
  search()
}
function reset() {
  Object.assign(criteria, getSysUserCriteria())
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="使用者帳號維護">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="帳號">
              <el-input v-model="criteria.userId" />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="criteria.name" />
            </el-form-item>
            <el-form-item label="現職機關/單位">
              <el-select v-model="criteria.currentEmployer" placeholder="請選擇" size="large">
                <el-option
                  v-for="item in departmentSelect" :key="item.departmentId" :label="item.departmentName"
                  :value="item.departmentId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="帳號是否啟用">
              <!-- <el-input v-model="criteria.stateType" /> -->
              <el-radio-group v-model="criteria.isAccountEnabled" class="ml-4">
                <el-radio v-for="option in Availability.values()" :key="option" :value="option">
                  {{
                    Availability.display(option) }}
                </el-radio>
              </el-radio-group>
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
            <el-table-column type="selection" prop="selected" width="55" />
            <el-table-column label="#">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="userId" label="帳號" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="currentEmployer" label="現職機關/單位" />
            <el-table-column prop="agent" label="代理人" />
            <el-table-column prop="holidayRecently" label="最近請假日" />
            <el-table-column prop="isAccountEnabled" label="是否啟用">
              <template #default="scope">
                {{ scope.row.isAccountEnabled }}
              </template>
            </el-table-column>
            <el-table-column label="動作" width="160">
              <template #default="scope">
                <ClientOnly>
                  <el-button
                    v-if="isEdit"
                    type="primary" size="small"
                    @click="editId(scope.row.encryptionId)"
                  >
                    <AdminIcon name="i-carbon:edit" class="pr-1" />
                    編輯
                  </el-button>
                  <el-button v-if="isRemoved" size="small" type="danger" @click="handleRemove(scope.row.encryptionId)">
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
          <el-card header="編輯帳號">
            <el-form label-width="auto" @submit="onSubmit">
              <el-tabs v-model="veeFields.userId.f" type="border-card" class="demo-tabs">
                <el-tab-pane label="使用者基本資料" name="first" aria-selected="true">
                  <el-form label-width="auto" class="form-max-width">
                    <el-form-item label="帳號">
                      <el-input v-bind="veeFields.userId.field" v-model="veeFields.userId.value" />
                    </el-form-item>
                    <el-form-item label="姓名">
                      <el-input v-bind="veeFields.name.field" v-model="veeFields.name.value" />
                    </el-form-item>
                    <el-form-item label="性別">
                      <!-- <el-input v-model="criteria.stateType" /> -->
                      <el-radio-group v-bind="veeFields.gender.field" v-model="veeFields.gender.value" class="ml-4">
                        <el-radio v-for="option in Gender.values()" :key="option" :value="option">
                          {{
                            Gender.display(option) }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="電話">
                      <el-input v-bind="veeFields.phone.field" v-model="veeFields.phone.value" />
                    </el-form-item>
                    <el-form-item label="電子信箱">
                      <el-input v-bind="veeFields.email.field" v-model="veeFields.email.value" />
                    </el-form-item>
                    <el-form-item label="現職機關/單位">
                      <el-select v-bind="veeFields.departmentId.field" v-model="veeFields.departmentId.value" placeholder="請選擇" size="large">
                        <el-option
                          v-for="item in departmentSelect" :key="item.departmentName" :label="item.departmentName"
                          :value="item.departmentId"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="帳號是否啟用">
                      <!-- <el-input v-model="criteria.stateType" /> -->
                      <el-radio-group v-bind="veeFields.enabled.field" v-model="veeFields.enabled.value" class="ml-4">
                        <el-radio v-for="option in isTrueOrFalse" :key="option.label" :value="option.value">
                          {{
                            option.label }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否為委員">
                      <!-- <el-input v-model="criteria.stateType" /> -->
                      <el-radio-group v-bind="veeFields.isCommittee.field" v-model="veeFields.isCommittee.value" class="ml-4">
                        <el-radio v-for="option in isTrueOrFalse" :key="option.label" :value="option.value">
                          {{
                            option.label }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                  <el-form-item>
                    <ClientOnly>
                      <el-button type="primary">
                        新增/修改密碼通知信
                      </el-button>
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
                </el-tab-pane>
                <el-tab-pane label="經歷專長" name="second">
                  <el-form label-width="auto" class="form-max-width">
                    <el-form-item label="經歷">
                      <el-input v-bind="veeFields.experience.field" v-model="veeFields.experience.value" />
                    </el-form-item>
                    <el-form-item label="專長1">
                      <el-input v-bind="veeFields.specialty1.field" v-model="veeFields.specialty1.value" />
                    </el-form-item>
                    <el-form-item label="專長2">
                      <el-input v-bind="veeFields.specialty2.field" v-model="veeFields.specialty2.value" />
                    </el-form-item>
                    <el-form-item label="專長3">
                      <el-input v-bind="veeFields.specialty3.field" v-model="veeFields.specialty3.value" />
                    </el-form-item>
                  </el-form>
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
                </el-tab-pane>
              </el-tabs>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-drawer>
  </AdminContainer>
</template>
