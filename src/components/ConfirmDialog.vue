<script setup>
import { computed } from 'vue'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'confirm'])

// ===* COMPUTED *===
const dialogValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// ===* METHODS *===
const confirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}
</script>

<template>
  <q-dialog v-model="dialogValue">
    <q-card style="width: 300px">
      <q-card-section class="text-h6"> Are you sure? </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn color="negative" label="Delete" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
