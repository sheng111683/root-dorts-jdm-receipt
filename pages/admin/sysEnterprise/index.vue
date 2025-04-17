<script setup lang="ts">
import * as yup from 'yup'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CircleClose } from '@element-plus/icons-vue'
import { MessageType } from '~/enums'
import {
  getDefaultSysEnterprise,
  getDefulatSysEnterpriseCriteria,
  getSysEnterpriseQueryResult,

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
const { isAdd, isEdit } = storeToRefs(permissionStore)
const editDrawer = ref(false)
// const title = useRouteMetaTitle()
const criteria = reactive(getDefulatSysEnterpriseCriteria())
const sysEnterprise = reactive(getDefaultSysEnterprise())
const queryResult = reactive(getSysEnterpriseQueryResult())
const veeFields: any = reactive(useGenerateVeeFields(Object.keys(getDefaultSysEnterprise()), defineField))
let itemId = ''
const encryptionId = ref(itemId || '')

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
    Object.assign(sysEnterprise, values)
    if (sysEnterprise.encryptionId.length > 0) {
      const { status }: any = await $api.v1.SysEnterprise.Put(sysEnterprise)
      if (status && status !== 200)
        throw new Error('儲存失敗')
      ElMessage.success('已儲存')
    }
    else {
      const { status }: any = await $api.v1.SysEnterprise.Post(sysEnterprise)
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
const debugOrNotOptions = [
  {
    value: true,
    label: '是',
  },
  {
    value: false,
    label: '否',
  },
]
const debugOrNotOptionsCriteria = [
  {
    value: '',
    label: '請選擇',
  },
  {
    value: '1',
    label: '是',
  },
  {
    value: '0',
    label: '否',
  },
]

async function search() {
  const sysEnterprisesResponse = await $api.v1.SysEnterprise.Get(criteria)
  Object.assign(queryResult, sysEnterprisesResponse)
  queryResult.items = queryResult.items.map((item) => {
    return item
  })
}
function handleCurrentChange(val: number) {
  criteria.pageNumber = val
  search()
}

async function editId(id) {
  editDrawer.value = true
  itemId = id
  encryptionId.value = (itemId || '')
  if (id.length > 0) {
    const sysEnterpriseIdResponse = await $api.v1.SysEnterprise.GetByEncryptionId(id)
    Object.assign(sysEnterprise, sysEnterpriseIdResponse)

    setValues(sysEnterprise)
  }
  else {
    Object.assign(sysEnterprise, getDefaultSysEnterprise())
    resetForm({ values: sysEnterprise })
  }
}
async function handleRemove(encryptionId: string) {
  try {
    await ElMessageBox.confirm('您確定要移除這筆資料?', '移除資料', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: MessageType.display(MessageType.Warning),
    })
    const { status }: any = await $api.v1.SysEnterprise.Remove(
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
  Object.assign(criteria, getDefulatSysEnterpriseCriteria())
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="企業資訊頁面">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="網域路徑">
              <el-input v-model="criteria.domainName" />
            </el-form-item>
            <el-form-item label="網域路徑(對外前台網站)">
              <el-input v-model="criteria.webDomainName1" />
            </el-form-item>
            <el-form-item label="網域路徑(內部前台網站)">
              <el-input v-model="criteria.webDomainName2" />
            </el-form-item>
            <el-form-item label="企業名稱">
              <el-input v-model="criteria.companyName" />
            </el-form-item>
            <el-form-item label="是否除錯">
              <el-select v-model="criteria.isDeBug" placeholder="請選擇" size="large">
                <el-option
                  v-for="item in debugOrNotOptionsCriteria" :key="item.label" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="電子郵件-1">
              <el-input v-model="criteria.email1" />
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
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <el-table-column label="#">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="domainName" label="網域路徑" />
            <el-table-column prop="webDomainName1" label="對外前台網站" />
            <el-table-column prop="webDomainName2" label="內部前台網站)" />
            <el-table-column prop="companyName" label="企業名稱" />
            <el-table-column prop="isDeBugString" label="是否除錯">
              <template #default="scope">
                {{ scope.row.isDeBugString }}
              </template>
            </el-table-column>
            <el-table-column prop="email1" label="電子郵件-1" />
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
                  <el-button size="small" type="danger" @click="handleRemove(scope.row.encryptionId)">
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
          <el-card header="企業資訊編輯頁面">
            <el-form label-width="auto" @submit="onSubmit">
              <el-form-item label="網域路徑">
                <el-input v-bind="veeFields.domainName.field" v-model="veeFields.domainName.value" />
              </el-form-item>
              <el-form-item label="網域路徑(對外前台網站)">
                <el-input v-bind="veeFields.webDomainName1.field" v-model="veeFields.webDomainName1.value" />
              </el-form-item>
              <el-form-item label="網域路徑(內部前台網站)">
                <el-input v-bind="veeFields.webDomainName2.field" v-model="veeFields.webDomainName2.value" />
              </el-form-item>
              <el-form-item label="企業名稱">
                <el-input v-bind="veeFields.companyName.field" v-model="veeFields.companyName.value" />
              </el-form-item>
              <el-form-item label="是否除錯">
                <el-select v-bind="veeFields.isDeBug.field" v-model="veeFields.isDeBug.value" placeholder="請選擇" size="large">
                  <el-option
                    v-for="item in debugOrNotOptions" :key="item.label" :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="電子郵件-1">
                <el-input v-bind="veeFields.email1.field" v-model="veeFields.email1.value" />
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
