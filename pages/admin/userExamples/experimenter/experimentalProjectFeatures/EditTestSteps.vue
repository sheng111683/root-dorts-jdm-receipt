<script setup lang="ts">
import {
  getDefaultCriteria,
  getDefaultPageList,
  getSysUserQueryResult,
  getSysUserCriteria,
} from '~/models'
definePageMeta({ layout: 'admin' })
import { ElMessage, ElMessageBox, ElCheckbox, } from 'element-plus'
const criteria = reactive({
  sort: '',
  testRecordSheet: '',
  ...getDefaultCriteria()
})
const queryResult = reactive(getDefaultPageList<any>())

const datas = reactive([
  { sort: '1', manuscriptTitle: 'MQ03-35-01試樣減量縮樣試驗紀錄表', testDateTime: '2024/01/01 12:55 至 2024/01/02 11:59', },
  { sort: '2', manuscriptTitle: 'MQ03-35-01試樣減量縮樣試驗紀錄表', testDateTime: '2024/01/01 12:55 至 2024/01/02 11:59', },
  { sort: '3', manuscriptTitle: 'MQ03-05-01粒料內小於75um(No.200)篩材料含量試驗紀錄表(粗)', testDateTime: '2024/01/01 12:55 至 2024/01/02 11:59', },
  { sort: '4', manuscriptTitle: 'MQ03-05-02粒料內小於75um(No.200)篩材料含量試驗紀錄表(中)', testDateTime: '2024/01/01 12:55 至 2024/01/02 11:59', },
  { sort: '5', manuscriptTitle: 'MQ03-04-05粗粒料分次篩析紀錄表', testDateTime: '2024/01/01 12:55 至 2024/01/02 11:59', },
  { sort: '6', manuscriptTitle: 'MQ03-04-05粗粒料分次篩析紀錄表', testDateTime: '2024/01/01 12:55 至 2024/01/02 11:59', },
])
const testOptions = [
  { value: 'none', label: '無(新增一筆)' },
  { value: 'T240511', label: '試驗編號：T240511，MQ03-05-01粒料小於75um(No.200)篩材料含量試驗紀錄表' },
  { value: 'T240512', label: '試驗編號：T240511，MQ03-05-01粒料小於75um(No.200)篩材料含量試驗紀錄表' },
]

const dialogFormVisible = ref(false)

const jumpRecordSheet = () => {
  dialogFormVisible.value = false
  navigateTo({ path: '/admin/experimentalProjectFeatures/recordSheet' })
}
</script>
<template>
  <AdminContainer>
    <el-row>
      <el-col :span="24">
        <el-card header="編輯試驗步驟">
          <el-form label-width="auto">
            <el-row>
              <el-col>
                <el-button @click="dialogFormVisible = true">減量縮樣紀錄表</el-button>
                <el-button @click="dialogFormVisible = true">75um(No.200)篩材料含量紀錄表(粗)</el-button>
                <el-button @click="dialogFormVisible = true">75um(No.200)篩材料含量紀錄表(中)</el-button>
                <el-button @click="dialogFormVisible = true">粗粒料分次篩析紀錄表</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-dialog v-model="dialogFormVisible" title="相同MQ03-05-01粒小於75um(No.200)篩材料含量試驗紀錄表資料">
          <el-select v-model="criteria.testRecordSheet">
            <el-option v-for="item in testOptions" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <template #footer>
            <div class="dialog-footer">
              <el-button type="success" @click="dialogFormVisible = false">
                瀏覽
              </el-button>
              <el-button type="primary" @click="jumpRecordSheet()">
                確定
              </el-button>
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
          </template>
        </el-dialog>
        <el-card header="" class="mt-4">
          <el-table :data="datas" border stripe style="width: 100%">
            <el-table-column label="步驟順序" width="120">
              <template #default="scope">
                <el-input v-model="scope.row.sort" />
              </template>
            </el-table-column>
            <el-table-column prop="manuscriptTitle" label="手稿名稱" />
            <el-table-column prop="testDateTime" label="試驗日期(時間)" />
            <el-table-column label="動作" width="160">
              <template #default="">
                <ClientOnly>
                  <el-button size="small" type="primary" @click="navigateTo({ path: '/admin/experimentalProjectFeatures/recordSheet' })">
                    <AdminIcon name="i-carbon:edit" class="pr-1"/>
                    編輯
                  </el-button>
                  <el-button size="small" type="danger">
                    <AdminIcon name="i-carbon:delete" class="pr-1" />
                    刪除
                  </el-button>
                </ClientOnly>
              </template>
            </el-table-column>
          </el-table>
          <el-col class="mt-3" :span="16">
            <el-button plain @click="navigateTo({ path: '/admin/experimentalProjectFeatures/FillIn' })">
              儲存
            </el-button>
          </el-col>
        </el-card>
        <el-row class="mt-3" :gutter="20">
          <el-col :span="16">
            <el-button plain @click="$router.back()">
              回上一頁
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </AdminContainer>
</template>
