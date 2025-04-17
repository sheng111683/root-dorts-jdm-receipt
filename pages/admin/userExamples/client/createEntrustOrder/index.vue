<script setup lang="ts">
import {
  getDefaultCriteria,
  getDefaultPageList,
} from '~/models'

definePageMeta({ layout: 'admin' })
const criteria = reactive({
  orderName: '',
  pilotProjects: [],
  sample: [],
  openType: '',
  ...getDefaultCriteria(),
})
const queryResult = reactive(getDefaultPageList<any>())
function handleCurrentChange(val) {
  search(val)
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
function resetForm() {
  criteria.orderName = ''
  criteria.pilotProjects = []
  criteria.sample = []
  criteria.openType = ''
  queryResult.items = []
  queryResult.totalItemCount = 0
}
const openTypes = [
  {
    value: 'ALL',
    label: '全部',
  },
  {
    value: 'OPEN',
    label: '上架',
  },
  {
    value: 'NOOPEN',
    label: '下架',
  },
]
const pilotProjectsOptions = [
  { value: '竹節鋼筋尺寸試驗', label: '竹節鋼筋尺寸試驗' },
  { value: '鋼筋抗拉試驗', label: '鋼筋抗拉試驗' },
  { value: '鋼筋抗彎試驗', label: '鋼筋抗彎試驗' },
  { value: '工程材料輻射量檢測', label: '工程材料輻射量檢測' },
  { value: '鋼筋硬度試驗', label: '鋼筋硬度試驗' },
  { value: '鋼筋化性試驗', label: '鋼筋化性試驗' },
  { value: '粗粒料篩分析試驗', label: '粗粒料篩分析試驗' },
  { value: '粒料內小於75μm(No.200)篩材料含量試驗', label: '粒料內小於75μm(No.200)篩材料含量試驗' },
  { value: '粗粒料密度、相對密度(比重)及吸水率試驗', label: '粗粒料密度、相對密度(比重)及吸水率試驗' },
  { value: '粗粒料中扁平、細長、扁長粒料試驗', label: '粗粒料中扁平、細長、扁長粒料試驗' },
  { value: '粗粒料磨損率(洛杉磯)試驗', label: '粗粒料磨損率(洛杉磯)試驗' },
  { value: '混泥土試體強度試驗', label: '混泥土試體強度試驗' },
  { value: '水溶液中氯離子含量試驗', label: '水溶液中氯離子含量試驗' },
  { value: '水溶液pH值試驗', label: '水溶液pH值試驗' },
]
const sampleOptions = [
  { value: '竹節鋼筋', label: '竹節鋼筋' },
  { value: '粗中粒料', label: '粗中粒料' },
  { value: '圓柱試體', label: '圓柱試體' },
]
const datas = [
  { orderName: '竹節鋼筋委託試驗登錄表', pilotProjects: ['竹節鋼筋尺寸試驗', '鋼筋抗拉試驗', '鋼筋抗彎試驗', '工程材料輻射量檢測', '鋼筋硬度試驗', '鋼筋化性試驗'], sample: ['竹節鋼筋'], openType: '上架', creationDate: '2024/01/01' },
  { orderName: '粗中粒料及配料委託試驗登錄表', pilotProjects: ['粗粒料篩分析試驗', '粒料內小於75μm(No.200)篩材料含量試驗', '粗粒料密度、相對密度(比重)及吸水率試驗', '粗粒料中扁平、細長、扁長粒料試'], sample: ['粗中粒料'], openType: '上架', creationDate: '2024/01/02' },
  { orderName: '粗粒料磨損率(洛杉磯)委託試驗登錄表', pilotProjects: ['粗粒料磨損率(洛杉磯)試驗'], sample: ['粗中粒料'], openType: '上架', creationDate: '2024/01/02' },
  { orderName: '混凝土圓柱模型試驗體委託試驗登錄表', pilotProjects: ['混泥土試體強度試驗'], sample: ['圓柱試體'], openType: '上架', creationDate: '2024/01/03' },
  { orderName: '混凝土拌和水委託試驗登錄表', pilotProjects: ['水溶液pH值試驗'], sample: ['圓柱試體'], openType: '下架', creationDate: '2024/01/03' },
]
function copy(row) {
  const newEntry = {
    orderName: `${row.orderName}(複製)`,
    pilotProjects: row.pilotProjects,
    sample: row.sample,
    creationDate: row.creationDate,
  }
  queryResult.items = [newEntry, ...datas]
  datas.unshift(newEntry)
}
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="製作委託單">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="委託單名稱：">
              <el-input v-model="criteria.orderName" />
            </el-form-item>
            <el-form-item label="試驗項目：">
              <el-select v-model="criteria.pilotProjects" multiple placeholder="請選擇">
                <el-option
                  v-for="item in pilotProjectsOptions" :key="item.value"
                  :label="item.label" :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="試樣：">
              <el-select v-model="criteria.sample" multiple placeholder="請選擇">
                <el-option
                  v-for="item in sampleOptions" :key="item.value"
                  :label="item.label" :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="上架狀態：">
              <el-select v-model="criteria.openType" placeholder="請選擇">
                <el-option
                  v-for="item in openTypes" :key="item.value"
                  :label="item.label" :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="24">
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
          </el-form>
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
                  @click="navigateTo({ path: '/admin/createEntrustOrder/Edit' })"
                >
                  <AdminIcon name="i-carbon:add" class="pr-1" />
                  新增
                </el-button>
              </ClientOnly>
            </el-col>
          </el-row>
          <el-table :data="queryResult.items" stripe style="width: 100%">
            <el-table-column label="#" width="55">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="orderName" label="委託單名稱" align="center" />
            <el-table-column prop="pilotProjects" label="試驗項目" align="center">
              <template #default="scope">
                <el-text v-for="item in scope.row.pilotProjects">
                  {{ item }} <br>
                </el-text>
              </template>
            </el-table-column>
            <el-table-column prop="sample" label="試樣" align="center">
              <template #default="scope">
                <el-text v-for="item in scope.row.sample">
                  {{ item }} <br>
                </el-text>
              </template>
            </el-table-column>
            <el-table-column prop="openType" label="上架狀態" align="center" />
            <el-table-column prop="creationDate" label="建立日期" align="center" />
            <el-table-column label="動作" width="220" align="center">
              <template #default="{ row }">
                <ClientOnly>
                  <el-col :span="24">
                    <el-button
                      type="primary"
                      @click="navigateTo({ path: '/admin/createEntrustOrder/Edit' })"
                    >
                      <AdminIcon name="i-carbon:edit" class="pr-1" />
                      編輯
                    </el-button>
                  </el-col>
                  <el-col :span="24">
                    <el-button type="warning" @click="copy(row)">
                      <AdminIcon name="i-carbon:copy" class="pr-1" />
                      複製
                    </el-button>
                  </el-col>
                  <el-col :span="24">
                    <el-button type="danger">
                      <AdminIcon name="i-carbon:delete" class="pr-1" />
                      刪除
                    </el-button>
                  </el-col>
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
