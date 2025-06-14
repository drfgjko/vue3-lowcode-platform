<script setup>
import { ref, onMounted } from 'vue'
import { ElTable, ElTableColumn, ElButton, ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import { getLeaveListAPI, deleteLeaveAPI } from '@/api/leave'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const leaveList = ref([])

// 类型映射
const typeLabels = {
  personal: '事假',
  sick: '病假',
  annual: '年假',
  other: '其他'
}

// 状态映射
const statusLabels = {
  pending: '待审批',
  approved: '已审批',
  rejected: '已拒绝'
}

const fetchLeaves = async () => {
  try {
    const userId = store.userInfo?.id
    const res = await getLeaveListAPI(userId)
    if (res.code === 200) {
      leaveList.value = res.data
    }
  } catch (e) {
    ElMessage.error('获取请假记录失败')
  }
}

const handleDelete = async id => {
  try {
    await deleteLeaveAPI(id)
    ElMessage.success('删除成功')
    fetchLeaves()
  } catch (e) {
    ElMessage.error('删除失败')
  }
}

// 格式化日期
function formatDate(row, column, cellValue) {
  return cellValue ? dayjs(cellValue).format('YYYY-MM-DD') : ''
}

// 格式化类型
function formatType(row, column, cellValue) {
  return typeLabels[cellValue] || cellValue
}

// 格式化状态
function formatStatus(row, column, cellValue) {
  return statusLabels[cellValue] || cellValue
}

onMounted(() => {
  fetchLeaves()
})
</script>

<template>
  <el-table :data="leaveList" style="width: 100%">
    <el-table-column prop="type" label="类型" width="120" :formatter="formatType" />
    <el-table-column prop="startDate" label="开始时间" width="120" :formatter="formatDate" />
    <el-table-column prop="endDate" label="结束时间" width="120" :formatter="formatDate" />
    <el-table-column prop="reason" label="事由" />
    <el-table-column prop="status" label="状态" width="100" :formatter="formatStatus" />
    <el-table-column label="操作" width="100">
      <template #default="{ row }">
        <el-button size="small" @click="handleDelete(row.id)">撤销</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
