<script setup>
import { ref, onMounted, h } from 'vue'
import { ElMessage, ElButton, ElTableV2 } from 'element-plus'
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
      // console.log('data', leaveList.value)
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

const columns = [
  {
    key: 'type',
    title: '类型',
    width: 100,
    cellRenderer: params => {
      const value = params.rowData?.type
      return typeLabels[value] || value || ''
    }
  },
  {
    key: 'startDate',
    title: '开始时间',
    width: 120,
    cellRenderer: params => {
      const value = params.rowData?.startDate
      return value ? dayjs(value).format('YYYY-MM-DD') : ''
    }
  },
  {
    key: 'endDate',
    title: '结束时间',
    width: 120,
    cellRenderer: params => {
      const value = params.rowData?.endDate
      return value ? dayjs(value).format('YYYY-MM-DD') : ''
    }
  },
  {
    key: 'reason',
    title: '事由',
    width: 200,
    cellRenderer: params => params.rowData?.reason || ''
  },
  {
    key: 'status',
    title: '状态',
    width: 100,
    cellRenderer: params => {
      const value = params.rowData?.status
      return statusLabels[value] || value || ''
    }
  },
  {
    key: 'actions',
    title: '操作',
    width: 180,
    cellRenderer: params => {
      const row = params.rowData // 注意这里是 rowData
      if (!row) return ''

      return h('div', { style: 'display: flex; gap: 8px' }, [
        h(
          ElButton,
          {
            size: 'small',
            type: 'primary',
            disabled: row.status !== 'pending',
            onClick: () => handleEdit(row)
          },
          () => '修改'
        ),
        h(
          ElButton,
          {
            size: 'small',
            type: 'danger',
            onClick: () => handleDelete(row.id)
          },
          () => '撤销'
        )
      ])
    }
  }
]

onMounted(() => {
  fetchLeaves()
})
</script>

<template>
  <div>
    <el-table-v2
      :data="leaveList"
      :columns="columns"
      row-key="id"
      :width="900"
      :height="500"
      fixed
    />
    <EditLeaveDialog v-model="dialogVisible" :data="currentRow" @submit="handleUpdate" />
  </div>
</template>
