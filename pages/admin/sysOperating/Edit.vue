<script setup lang="ts">
import { ElMessage } from 'element-plus'
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  systemCode: 'TARF2',
  systemName: '技術文件線上簽核系統',
  systemPath: '/tarf2/prog',
  startProgram: 'TmNetGetUserRight.aspx',
  systemRemarks: '',
  maintenancePersonnel: '',
  belong: '',
  systemCategory: '一般使用者(共用帳號)',
  isDisable: '',
  sharedAccountCheck: '',
  useProjectTags: '',
  systemHost: '',
  displayOrder: '',

  // -----參數區---
  parameterPath: '/test/prog',
  parametricProgram: 'PutSession.aspx',
  parameterSettings: 'Lemplsern;Lempname;DortsTeam;Y',
  remark: '',
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
const datas = []
const systemHostOptions = [
  {
    value: 'Option1',
    label: 'AQ0123',
  },
  {
    value: 'Option2',
    label: 'AQ0548',
  },
]
const systemCodeOptions = [
  {
    value: 'Option1',
    label: 'TARF2',
  },
  {
    value: 'Option2',
    label: 'TQZR7',
  },
]
const maintenancePersonnelOptions = [
  {
    value: '唐先生/0987-654321/jejk@ov.tw',
    label: '11695',
  },
  {
    value: '王小姐/0987-654321/jejk@ov.tw',
    label: '11698',
  },
]
const belongOptions = [
  {
    value: '工務系統類',
    label: 'EPM',
  },
  {
    value: '整合管理',
    label: 'EGH',
  },
]
const systemCategoryOptions = [
  {
    value: 'Option1',
    label: '一般使用者(共用帳號)',
  },
  {
    value: 'Option2',
    label: '一般使用者',
  },
]

function handleSave() {
  ElMessage.success('資料已儲存')
}

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
        <el-card header="基本資料">
          <el-form label-width="auto" class="form-max-width">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="系統代碼">
                  <el-select v-model="criteria.systemCode" placeholder="請選擇">
                    <el-option
                      v-for="item in systemCodeOptions" :key="item.value"
                      :label="item.label" :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="系統名稱">
                  <el-input v-model="criteria.systemName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-text>(團隊專區應用系統清單顯示用，可自行適當調整)</el-text>
              </el-col>
            </el-row>
            <el-form-item label="系統路徑">
              <el-input v-model="criteria.systemPath" />
            </el-form-item>
            <el-form-item label="起始程式">
              <el-input v-model="criteria.startProgram" />
            </el-form-item>
            <el-form-item label="備註">
              <el-input v-model="criteria.systemRemarks" />
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="維護人員">
                  <el-select v-model="criteria.maintenancePersonnel" placeholder="請選擇">
                    <el-option
                      v-for="item in maintenancePersonnelOptions" :key="item.value"
                      :label="item.label" :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="0" label="-">
                  <el-input v-model="criteria.maintenancePersonnel" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所屬群組">
                  <el-select v-model="criteria.belong" placeholder="請選擇">
                    <el-option
                      v-for="item in belongOptions" :key="item.value" :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="0" label="-">
                  <el-input v-model="criteria.belong" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="顯示順序">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input v-model="criteria.displayOrder" />
                    </el-col>
                    <el-col :span="12">
                      <el-button type="success">
                        調整
                      </el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否停用">
                  <el-checkbox v-model="criteria.isDisable" label="停用" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="使用共用帳號/工程標號">
                  <el-checkbox v-model="criteria.sharedAccountCheck" label="是" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="系統類別">
              <el-select v-model="criteria.systemCategory" placeholder="請選擇">
                <el-option
                  v-for="item in systemCategoryOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card header="參數資料">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="系統主機">
              <el-select v-model="criteria.systemHost" placeholder="---不設定---" size="large">
                <el-option
                  v-for="item in systemHostOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="參數路徑">
              <el-input v-model="criteria.parameterPath" />
            </el-form-item>
            <el-form-item label="參數程式">
              <el-input v-model="criteria.parametricProgram" />
            </el-form-item>
            <el-form-item label="參數設定">
              <el-input v-model="criteria.parameterSettings" />
            </el-form-item>
            <el-form-item label="備註">
              <el-input v-model="criteria.remark" />
            </el-form-item>
          </el-form>
        </el-card>
        <el-card shadow="never">
          <el-row :gutter="20">
            <el-col :span="16">
              <ClientOnly>
                <el-button type="primary" plain @click="handleSave()">
                  儲存
                </el-button>
                <el-button plain @click="$router.back()">
                  取消
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
