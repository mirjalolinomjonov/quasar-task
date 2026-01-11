<script setup>
import { ref, computed } from 'vue'
import { COLUMNS } from 'src/constants'

// ===* PROPS *===
const props = defineProps({
  posts: Array,
  loading: Boolean,
})

// ===* DATA *===
const pagination = ref({
  page: 1,
  rowsPerPage: 20,
})

// ===* COMPUTED *===
const pagesNumber = computed(() => Math.ceil(props.posts.length / pagination.value.rowsPerPage))
</script>

<template>
  <div>
    <q-table
      flat
      bordered
      row-key="id"
      :rows="posts"
      :columns="COLUMNS"
      :grid="$q.screen.lt.md"
      :loading="loading"
      v-model:pagination="pagination"
      hide-pagination
    >
      <template #body-cell-actions="{ row }">
        <q-td align="right">
          <q-btn flat icon="edit" @click="$emit('edit', row)" />
          <q-btn flat icon="delete" color="negative" @click="$emit('delete', row.id)" />
        </q-td>
      </template>

      <template #loading>
        <q-inner-loading showing>
          <q-spinner size="50px" />
        </q-inner-loading>
      </template>

      <template #no-data>
        <div class="column items-center q-pa-lg text-grey" style="flex: 1 0 0">
          <q-icon name="inbox" size="40px" />
          <div class="q-mt-sm">No posts available</div>
        </div>
      </template>
    </q-table>

    <!-- PAGINATION -->
    <div v-if="pagesNumber && pagesNumber > 1" class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        flat
        color="grey-8"
        active-color="primary"
        size="sm"
        direction-links
        boundary-numbers
        :max="pagesNumber"
        :max-pages="6"
      />
    </div>
  </div>
</template>
