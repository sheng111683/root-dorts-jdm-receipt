<script setup lang="ts">
import {
  type SysUser,
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const permissionStore = usePermissionStore()
const { isAdd, isEdit, isRemoved } = storeToRefs(permissionStore)
// const title = useRouteMetaTitle()
const criteria = reactive({
  permissionName: '',
  useRoleAccount: '',
  ...getDefaultCriteria(),
})
// const queryResult = reactive(getSysUserQueryResult())
const queryResult = reactive(getDefaultPageList<any>())
const datas = [
  { permissionName: 'QQQ', useRoleAccount: 'admin1' },
  { permissionName: 'BBB', useRoleAccount: 'admin1' },

]

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

// const search = async () => {
//   const committeeMemberResponse = await $api.v1.CommitteeMember.Get(criteria)
//   Object.assign(queryResult, committeeMemberResponse)
// }

function handleCurrentChange(val: SysUser) {
  search(val)
}
function resetForm() {
  criteria.useRoleAccount = ''
  criteria.permissionName = ''
  queryResult.items = []
  queryResult.totalItemCount = 0
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="角色權限資訊">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="使用者帳號">
              <el-input v-model="criteria.useRoleAccount" />
            </el-form-item>
            <el-form-item label="權限名稱">
              <el-input v-model="criteria.permissionName" />
            </el-form-item>
          </el-form>
          <el-row :gutter="20">
            <el-col :span="16">
              <ClientOnly>
                <el-button type="primary" plain @click="search('')">
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
                  type="primary" float="right"
                  @click="navigateTo({ path: '/admin/sysRoles/Edit' })"
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
            <el-table-column prop="permissionName" label="權限名稱" />
            <el-table-column prop="useRoleAccount" label="使用者帳號" />
            <el-table-column label="動作" width="160">
              <template #default="scope">
                <ClientOnly>
                  <el-button-group>
                    <el-button size="small" type="primary" @click="navigateTo({ path: '/admin/sysRoles/Edit' })">
                      <AdminIcon name="i-carbon:edit" class="pr-1" />
                      編輯
                    </el-button>
                    <el-button size="small" type="danger">
                      <AdminIcon name="i-carbon:delete" class="pr-1" />
                      移除
                    </el-button>
                    <el-button
                      size="small" type="warning"
                      @click="navigateTo({ path: '/admin/sysRoles/AddAuthorization' })"
                    >
                      <AdminIcon class="pr-1" />
                      授權新增
                    </el-button>
                  </el-button-group>
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
  </AdminContainer>
</template>
