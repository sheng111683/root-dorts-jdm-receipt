<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const permissionStore = usePermissionStore()
const { isAdd, isEdit, isRemoved } = storeToRefs(permissionStore)
const holidayOptions = [
  {
    value: 'Option1',
    label: '調整放假日',
  },
  {
    value: 'Option2',
    label: '星期六星期日',
  },
  {
    value: 'Option3',
    label: '補假',
  },
]
const selectedHoliday = ref('')
const holidayValue = ref(new Date())
</script>

<template>
  <AdminContainer>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card header="行事曆頁面">
          <el-form label-width="auto" class="form-max-width">
            <el-form-item label="假日類型:">
              <el-select v-model="selectedHoliday" placeholder="請選擇" size="large">
                <el-option
                  v-for="item in holidayOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-calendar>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
          {{ data.isSelected ? '✔️' : '' }}
        </p>
      </template>
    </el-calendar>
  </AdminContainer>
</template>
