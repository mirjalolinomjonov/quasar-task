<script setup>
import { ref, reactive, watch, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  post: Object,
})

const emit = defineEmits(['update:modelValue', 'submit'])

// ===* DATA *===
const form = reactive({
  title: '',
  body: '',
})
const submitting = ref(false)

// ===* COMPUTED *===
const isEdit = computed(() => !!props.post)
const dialogValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

watch(
  () => props.post,
  (val) => {
    if (val) {
      form.title = val.title
      form.body = val.body
    } else {
      form.title = ''
      form.body = ''
    }
  },
  { immediate: true },
)

const onSubmit = () => {
  submitting.value = true
  emit('submit', { ...form })
  emit('update:modelValue', false)
  reset()
  submitting.value = false
}
const reset = () => Object.assign(form, { title: '', body: '' })
</script>

<template>
  <q-dialog v-model="dialogValue">
    <q-card style="min-width: 500px">
      <q-card-section>
        <div class="text-h6">
          {{ isEdit ? 'Edit Post' : 'Create Post' }}
        </div>
      </q-card-section>

      <q-form @submit="onSubmit">
        <q-card-section>
          <q-input
            v-model="form.title"
            label="Title"
            outlined
            :rules="[(val) => !!val || 'Title is required']"
          />

          <q-input v-model="form.body" label="Body" type="textarea" outlined class="q-mt-md" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            color="primary"
            type="submit"
            :loading="submitting"
            :disable="submitting"
            :label="isEdit ? 'Update' : 'Create'"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
