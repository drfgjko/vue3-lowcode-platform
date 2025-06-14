<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { submitLeaveAPI } from '@/api/leave'
import { useUserStore } from '@/stores/user'
const store = useUserStore()

const formRef = ref()

const form = ref({
  type: '',
  startDate: '',
  endDate: '',
  reason: ''
})

const rules = {
  type: [{ required: true, message: '请选择请假类型', trigger: 'change' }],
  startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
  endDate: [
    { required: true, message: '请选择结束日期', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value && form.value.startDate && value < form.value.startDate) {
          callback(new Error('结束时间不能早于开始时间'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  reason: [{ required: true, message: '请填写请假事由', trigger: 'blur' }]
}

function handleSubmit() {
  formRef.value.validate(async valid => {
    if (!valid) {
      ElMessage.error('请检查表单填写内容')
      return
    }
    try {
      const userId = store.userInfo?.id
      const submitData = {
        ...form.value,
        userId
      }
      // console.log('userId', userId)
      // console.log('submitData', submitData)
      await submitLeaveAPI(submitData)
      ElMessage.success('请假申请提交成功！')
      resetForm()
    } catch (err) {
      // 错误提示由拦截器统一处理
    }
  })
}

function resetForm() {
  form.value = {
    type: '',
    startDate: null,
    endDate: null,
    reason: ''
  }
  // 同时重置表单校验状态
  formRef.value?.resetFields()
}

// 监听开始时间变化，手动触发结束时间校验
watch(
  () => form.value.startDate,
  () => {
    formRef.value?.validateField('endDate')
  }
)
</script>

<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
    <el-form-item label="类型" prop="type">
      <el-select v-model="form.type" placeholder="请选择请假类型">
        <el-option label="事假" value="personal" />
        <el-option label="病假" value="sick" />
        <el-option label="年假" value="annual" />
        <el-option label="其他" value="other" />
      </el-select>
    </el-form-item>

    <el-form-item label="开始时间" prop="startDate">
      <el-date-picker v-model="form.startDate" type="date" placeholder="请选择开始日期" />
    </el-form-item>

    <el-form-item label="结束时间" prop="endDate">
      <el-date-picker v-model="form.endDate" type="date" placeholder="请选择结束日期" />
    </el-form-item>

    <el-form-item label="请假事由" prop="reason">
      <el-input v-model="form.reason" type="textarea" placeholder="请输入原因" />
    </el-form-item>

    <el-form-item>
      <el-button @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
