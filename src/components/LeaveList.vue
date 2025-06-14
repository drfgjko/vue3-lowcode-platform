<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import { getLeaveListAPI, deleteLeaveAPI } from '@/api/leave'
import { useUserStore } from '@/stores/user'
import EditLeaveDialog from '@/components/EditLeaveDialog.vue'

const store = useUserStore()
const leaveList = ref([])
const dialogVisible = ref(false)
const currentRow = ref(null)

const typeLabels = {
  personal: '事假',
  sick: '病假',
  annual: '年假',
  other: '其他'
}

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

const handleEdit = row => {
  if (row.status !== 'pending') {
    ElMessage.warning('只有待审批的记录可以修改')
    return
  }
  currentRow.value = { ...row }
  dialogVisible.value = true
}

const handleUpdate = updatedRow => {
  const index = leaveList.value.findIndex(item => item.id === updatedRow.id)
  if (index !== -1) {
    leaveList.value[index] = { ...leaveList.value[index], ...updatedRow }
    localStorage.setItem('leaves', JSON.stringify(leaveList.value)) // mock 数据更新
    ElMessage.success('修改成功')
  }
}

const formatDate = (row, column, cellValue) =>
  cellValue ? dayjs(cellValue).format('YYYY-MM-DD') : ''

const formatType = (row, column, cellValue) => typeLabels[cellValue] || cellValue

const formatStatus = (row, column, cellValue) => statusLabels[cellValue] || cellValue

onMounted(() => {
  fetchLeaves()
})
</script>
<template>
  <div>
    <el-table :data="leaveList" style="width: 100%">
      <el-table-column prop="type" label="类型" width="120" :formatter="formatType" />
      <el-table-column prop="startDate" label="开始时间" width="120" :formatter="formatDate" />
      <el-table-column prop="endDate" label="结束时间" width="120" :formatter="formatDate" />
      <el-table-column prop="reason" label="事由" />
      <el-table-column prop="status" label="状态" width="100" :formatter="formatStatus" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(row)"
            :disabled="row.status !== 'pending'"
            >修改</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(row.id)">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <EditLeaveDialog v-model="dialogVisible" :data="currentRow" @submit="handleUpdate" />
  </div>
</template>
