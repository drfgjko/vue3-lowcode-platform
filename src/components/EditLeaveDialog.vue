<script setup>
import { reactive, watch, computed, ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: Boolean,
  data: Object
})
const emit = defineEmits(['update:modelValue', 'submit'])

const formRef = ref(null)

const form = reactive({
  id: null,
  type: '',
  startDate: '',
  endDate: '',
  reason: ''
})

const visible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

// 监听props.data变化，赋值form
watch(
  () => props.data,
  val => {
    if (val) {
      Object.assign(form, val)
    }
  },
  { immediate: true }
)

const rules = {
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  startDate: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endDate: [
    { required: true, message: '请选择结束时间', trigger: 'change' },
    {
      validator(_, value) {
        if (new Date(value) < new Date(form.startDate)) {
          return Promise.reject(new Error('结束时间不能早于开始时间'))
        }
        return Promise.resolve()
      },
      trigger: 'change'
    }
  ],
  reason: [{ required: true, message: '请输入事由', trigger: 'blur' }]
}

// 修改开始时间也触发结束时的校验
watch(
  () => form.startDate,
  () => {
    if (formRef.value) {
      formRef.value.validateField('endDate')
    }
  }
)

const onCancel = () => {
  visible.value = false
}

const onSubmit = () => {
  formRef.value.validate(valid => {
    if (valid) {
      emit('submit', { ...form })
      visible.value = false
    } else {
      ElMessage.error('请完善表单内容')
    }
  })
}
</script>

<template>
  <el-dialog v-model="visible" title="修改请假申请" width="500px" @close="onCancel">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="事假" value="personal" />
          <el-option label="病假" value="sick" />
          <el-option label="年假" value="annual" />
          <el-option label="其他" value="other" />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" prop="startDate">
        <el-date-picker
          v-model="form.startDate"
          type="date"
          placeholder="选择开始时间"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endDate">
        <el-date-picker
          v-model="form.endDate"
          type="date"
          placeholder="选择结束时间"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="事由" prop="reason">
        <el-input v-model="form.reason" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>
