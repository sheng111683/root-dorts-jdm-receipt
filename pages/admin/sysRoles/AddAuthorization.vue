<script setup lang="ts">
import {

} from '~/models'
import { ElMessageBox, ElTable } from 'element-plus'

definePageMeta({ layout: 'admin' })

// const criteria = reactive(getSysUserCriteria())
const criteria = reactive({
  permissionName: '',
  useRoleAccount: '',
  keyWord: '',
  datas: {
    permissionName: 'admin',
  },
})

interface User {
  account: string
  name: string
  unit: string
  state: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
function handleSelectionChange(val: User[]) {
  multipleSelection.value = val
}

const tableData: User[] = [
  {
    account: 'asd11',
    name: 'Ken',
    unit: '管理部門',
    state: '啟用',
  },
  {
    account: 'ffffs',
    name: 'Vicky',
    unit: '管理部門',
    state: '啟用',
  },
]

interface AllUser {
  account: string
  name: string
  unit: string
  state: string
}
const allUserTableRef = ref<InstanceType<typeof ElTable>>()
const allUserSelection = ref<AllUser[]>([])
function allUserSelectionChange(val: AllUser[]) {
  allUserSelection.value = val
}

const allUsertableData: AllUser[] = [
  { account: 'asd11', name: 'Ken', unit: '管理部門', state: '啟用' },
  { account: 'asd11', name: 'Ken', unit: '管理部門', state: '啟用' },
  { account: 'asd11', name: 'Ken', unit: '管理部門', state: '啟用' },
  { account: 'asd11', name: 'Ken', unit: '管理部門', state: '啟用' },
  { account: 'asd11', name: 'Ken', unit: '管理部門', state: '啟用' },
  { account: 'asd11', name: 'Ken', unit: '管理部門', state: '啟用' },
  { account: 'asd11', name: 'Ken', unit: '管理部門', state: '啟用' },
  { account: 'asd11', name: 'Ken', unit: '管理部門', state: '啟用' },
  { account: 'asd11', name: 'Ken', unit: '管理部門', state: '啟用' },
]
const dialogVisible = ref(false)
function handleClose(done: () => void) {
  ElMessageBox.confirm('確定關閉視窗?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="授權新增">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="權限名稱">
              <el-text class="mx-1">
                {{ criteria.datas.permissionName }}
              </el-text>
            </el-form-item>
          </el-form>
          <el-form>
            <el-row>
              <el-col :span="8">
                <ClientOnly>
                  <el-button type="primary" @click="dialogVisible = true">
                    <AdminIcon name="i-carbon:add" class="pr-1" />
                    新增
                  </el-button>
                  <el-button type="danger">
                    <AdminIcon name="i-carbon:delete" class="pr-1" />
                    移除
                  </el-button>
                </ClientOnly>
              </el-col>
            </el-row>
          </el-form>
          <!-- Modal -->
          <el-dialog v-model="dialogVisible" title="使用者帳號權限新增" width="500">
            <el-form-item label="關鍵字">
              <el-input v-model="input" class="me-1" style="width: 240px" placeholder="" />
              <el-button type="primary" plain>
                查詢
              </el-button>
            </el-form-item>
            <ElTable
              ref="allUserTableRef" :data="allUsertableData" style="width: 100%"
              @selection-change="allUserSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column property="account" label="帳號" width="120" />
              <el-table-column property="name" label="姓名" show-overflow-tooltip />
              <el-table-column property="unit" label="單位" show-overflow-tooltip />
              <el-table-column property="state" label="狀態" show-overflow-tooltip />
            </ElTable>
            <el-pagination small layout="prev, pager, next" :total="50" />
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogVisible = false">
                  關閉
                </el-button>
                <el-button type="primary" @click="dialogVisible = false">
                  儲存
                </el-button>
              </div>
            </template>
          </el-dialog>
          <!-- Modal -->
          <el-form label-width="auto" class="form-max-width">
            <el-form-item class="d-flex" label="使用者清單">
              <ElTable
                ref="multipleTableRef" :data="tableData" style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55" />
                <el-table-column property="account" label="帳號" width="120" />
                <el-table-column property="name" label="姓名" show-overflow-tooltip />
                <el-table-column property="unit" label="單位" show-overflow-tooltip />
                <el-table-column property="state" label="狀態" show-overflow-tooltip />
              </ElTable>
            </el-form-item>
          </el-form>
          <el-form-item>
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
