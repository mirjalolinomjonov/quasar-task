<script setup>
import { ref, computed, watch } from 'vue'
import { debounce } from 'quasar'

// ===* PROPS *===
const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
})

// ===* EMITS *===
const emit = defineEmits(['filter', 'has-filters'])

// ===* DATA *===
const titleFilter = ref('')
const userFilter = ref(null)

const debouncedTitleFilter = ref('')
const debouncedUserFilter = ref(null)

// ===* DEBOUNCE LOGIC *===
const updateTitleFilter = debounce((val) => {
  debouncedTitleFilter.value = val
}, 500)

const updateUserFilter = debounce((val) => {
  debouncedUserFilter.value = val
}, 300)

// ===* COMPUTED *===
// compute unique user options from posts
const userOptions = computed(() => {
  const ids = Array.from(new Set(props.posts.map((p) => p.userId))).filter((v) => v != null)
  return ids.sort((a, b) => a - b).map((id) => ({ label: `user id = ${id}`, value: id }))
}) // Outpus: { label:string, value:number }[]

// filtered posts by userId and title (using debounced values)
const filteredPosts = computed(() => {
  let rows = props.posts || []

  if (debouncedUserFilter.value !== null && debouncedUserFilter.value !== undefined) {
    rows = rows.filter((item) => item.userId === debouncedUserFilter.value)
  }

  const q = (debouncedTitleFilter.value || '').toString().trim().toLowerCase()
  if (q) {
    rows = rows.filter((item) => (item.title || '').toString().toLowerCase().includes(q))
  }

  return rows
})
const hasActiveFilters = computed(() => {
  return !!(titleFilter.value || userFilter.value !== null)
})

// ===* WATCH *===
watch(titleFilter, (newVal) => {
  updateTitleFilter(newVal)
})
watch(userFilter, (newVal) => {
  updateUserFilter(newVal)
})
watch(
  hasActiveFilters,
  (newVal) => {
    emit('has-filters', newVal)
  },
  { immediate: true },
)
watch(
  filteredPosts,
  (newVal) => {
    emit('filter', newVal)
  },
  { immediate: true },
)

// ===* METHODS *===
const resetFilters = () => {
  titleFilter.value = ''
  userFilter.value = null
  debouncedTitleFilter.value = ''
  debouncedUserFilter.value = null
}

// expose reset method to parent
defineExpose({ resetFilters })
</script>

<template>
  <div class="row items-center q-gutter-lg">
    <q-select
      v-model="userFilter"
      dense
      clearable
      :options="userOptions"
      label="Filter by user"
      style="min-width: 150px"
      emit-value
      map-options
    />
    <q-input
      dense
      clearable
      v-model="titleFilter"
      label="Filter by title"
      style="min-width: 300px"
    />
  </div>
</template>
