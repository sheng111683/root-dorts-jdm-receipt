<script setup lang="ts">
import {

} from '~/models'

definePageMeta({ layout: 'admin' })
// const criteria = reactive(getSysUserCriteria())
const criteria = reactive({
  permissionName: '',
  useRoleAccount: '',
  datas: {
    permissionName: 'admin',
  },
})
const checkAllDashboard = ref(false)
const isIndeterminateDashboard = ref(true)
const checkedPermissionsDashboard = ref([])

const checkAllCommittee = ref(false)
const isIndeterminateCommittee = ref(true)
const checkedPermissionsCommittee = ref([])

const checkAllFileFunction = ref(false)
const isIndeterminateFileFunction = ref(true)
const checkedPermissionsFileFunction = ref([])

const permissions = ['查詢/瀏覽', '新增', '修改', '審核', '報表', '系統管理員', '刪除']

function handleCheckAllChangeDashboard(val) {
  checkedPermissionsDashboard.value = val ? permissions : []
  isIndeterminateDashboard.value = false
}

function handleCheckedPermissionsChangeDashboard(value) {
  const checkedCount = value.length
  checkAllDashboard.value = checkedCount === permissions.length
  isIndeterminateDashboard.value = checkedCount > 0 && checkedCount < permissions.length
}

function handleCheckAllChangeCommittee(val) {
  checkedPermissionsCommittee.value = val ? permissions : []
  isIndeterminateCommittee.value = false
}

function handleCheckedPermissionsChangeCommittee(value) {
  const checkedCount = value.length
  checkAllCommittee.value = checkedCount === permissions.length
  isIndeterminateCommittee.value = checkedCount > 0 && checkedCount < permissions.length
}

function handleCheckAllChangeFileFunction(val) {
  checkedPermissionsFileFunction.value = val ? permissions : []
  isIndeterminateFileFunction.value = false
}
function handleCheckedPermissionsChangeFileFunction(value) {
  const checkedCount = value.length
  checkAllFileFunction.value = checkedCount === permissions.length
  isIndeterminateFileFunction.value = checkedCount > 0 && checkedCount < permissions.length
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="編輯角色權限">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="權限名稱">
              <el-input v-model="criteria.datas.permissionName" />
            </el-form-item>
          </el-form>
          <el-form label-width="auto" class="form-max-width">
            <el-form-item class="d-flex" label="角色權限">
              <el-form-item label="功能">
                <el-checkbox label="權限" value="Value A" />
              </el-form-item>
              <el-form-item class="d-flex" label="儀表板">
                <el-checkbox
                  v-model="checkAllDashboard" :indeterminate="isIndeterminateDashboard"
                  @change="handleCheckAllChangeDashboard"
                >
                  全選
                </el-checkbox>
                <el-checkbox-group
                  v-model="checkedPermissionsDashboard"
                  @change="handleCheckedPermissionsChangeDashboard"
                >
                  <el-checkbox
                    v-for="permission in permissions" :key="`${permission}_dashboard`"
                    :label="permission" :value="permission"
                  >
                    {{ permission }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item class="d-flex" label="委員管理">
                <el-checkbox
                  v-model="checkAllCommittee" :indeterminate="isIndeterminateCommittee"
                  @change="handleCheckAllChangeCommittee"
                >
                  全選
                </el-checkbox>
                <el-checkbox-group
                  v-model="checkedPermissionsCommittee"
                  @change="handleCheckedPermissionsChangeCommittee"
                >
                  <el-checkbox
                    v-for="permission in permissions" :key="`${permission}_committee`"
                    :label="permission" :value="permission"
                  >
                    {{ permission }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item class="d-flex" label="檔案功能">
                <el-checkbox
                  v-model="checkAllFileFunction" :indeterminate="isIndeterminateFileFunction"
                  @change="handleCheckAllChangeFileFunction"
                >
                  全選
                </el-checkbox>
                <el-checkbox-group
                  v-model="checkedPermissionsFileFunction"
                  @change="handleCheckedPermissionsChangeFileFunction"
                >
                  <el-checkbox
                    v-for="permission in permissions" :key="`${permission}_fileFunction`"
                    :label="permission" :value="permission"
                  >
                    {{ permission }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form-item>
          </el-form>
          <el-form-item>
            <ClientOnly>
              <el-button type="primary" plain native-type="submit">
                <!-- <AdminIcon name="i-carbon:search" class="pr-1" /> -->
                儲存
              </el-button>
            </ClientOnly>
            <el-button plain @click="$router.back()">
              <!-- <AdminIcon name="i-carbon:reset" class="pr-1" /> -->
              回上一頁
            </el-button>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
