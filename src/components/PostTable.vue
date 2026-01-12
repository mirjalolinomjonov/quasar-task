<script setup>
import { ref, computed } from 'vue'
import { COLUMNS } from 'src/constants'
import PostsFilter from 'src/components/PostsFilter.vue'

// ===* PROPS *===
defineProps({
  posts: Array,
  loading: Boolean,
})

// ===* DATA *===
const pagination = ref({
  page: 1,
  rowsPerPage: 20,
})
const filteredPosts = ref([])
const hasFilters = ref(false)
const filterRef = ref(null)

// ===* COMPUTED *===
const pagesNumber = computed(() =>
  Math.ceil(filteredPosts.value.length / pagination.value.rowsPerPage),
)

// ===* METHODS *===
const handleFilter = (filtered) => {
  filteredPosts.value = filtered
  pagination.value.page = 1
}
const handleHasFilters = (value) => {
  hasFilters.value = value
}

const clearAllFilters = () => {
  filterRef.value?.resetFilters()
}
</script>

<template>
  <div>
    <!-- filter -->
    <div class="q-mb-md row items-end q-gutter-lg">
      <PostsFilter
        ref="filterRef"
        :posts="posts"
        @filter="handleFilter"
        @has-filters="handleHasFilters"
      />
      <q-btn v-if="hasFilters" @click="clearAllFilters">Clear All Filters</q-btn>
    </div>

    <!-- table -->
    <q-table
      flat
      bordered
      row-key="id"
      :rows="filteredPosts"
      :columns="COLUMNS"
      :grid="$q.screen.lt.md"
      :loading="loading"
      v-model:pagination="pagination"
      hide-pagination
    >
      <template #body-cell-actions="{ row }">
        <!-- action cell -->
        <q-td align="right">
          <q-btn flat icon="edit" @click="$emit('edit', row)" />
          <q-btn flat icon="delete" color="negative" @click="$emit('delete', row.id)" />
        </q-td>
      </template>
      <!-- Grid (responsive) mode uchun -->
      <template #item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section>
              <div v-for="col in props.cols" :key="col.name">
                <div v-if="col.name !== 'actions'" class="text-caption text-grey">
                  {{ col.label }}
                </div>
                <div v-if="col.name !== 'actions'" class="q-mb-sm">
                  {{ col.value }}
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat icon="edit" @click="$emit('edit', props.row)" />
              <q-btn flat icon="delete" color="negative" @click="$emit('delete', props.row.id)" />
            </q-card-actions>
          </q-card>
        </div>
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
