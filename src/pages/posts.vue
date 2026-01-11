<script setup>
import { ref, onMounted } from 'vue'
import PostTable from 'src/components/PostTable.vue'
import PostForm from 'src/components/PostForm.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import { getPosts, createPost, updatePost, deletePost } from 'src/services/post.service'
import { useQuasar } from 'quasar'

// ===* COMPOSABLES *===
const $q = useQuasar()

// ===* DATA *===
const posts = ref([])
const loading = ref(false)

const showForm = ref(false)
const selectedPost = ref(null)

const showDelete = ref(false)
const deleteId = ref(null)

// ===* METHODS *===
const fetchPosts = async () => {
  loading.value = true
  try {
    const { data } = await getPosts()
    console.log('data = ', data)

    // posts.value = data.slice(0, 10)
    posts.value = data
  } catch (error) {
    $q.notify({ type: 'negative', message: error.message || 'Failed to load posts' })
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  selectedPost.value = null
  showForm.value = true
}

const openEdit = (post) => {
  selectedPost.value = post
  showForm.value = true
}

const submitForm = async (formData) => {
  loading.value = true
  try {
    if (selectedPost.value) {
      await updatePost(selectedPost.value.id, formData)
      Object.assign(selectedPost.value, formData)
      $q.notify('Post updated')
    } else {
      const { data } = await createPost(formData)
      posts.value.unshift({ ...data, id: Date.now() })
      $q.notify('Post created')
    }
  } catch (error) {
    $q.notify({ type: 'negative', message: error.message || 'Failed to submit form' })
  } finally {
    loading.value = false
  }
}

const openDelete = (id) => {
  deleteId.value = id
  showDelete.value = true
}

const confirmDelete = async () => {
  loading.value = true
  try {
    await deletePost(deleteId.value)
    posts.value = posts.value.filter((p) => p.id !== deleteId.value)
    $q.notify({ type: 'negative', message: 'Post deleted' })
  } catch (error) {
    $q.notify({ type: 'negative', message: error.message || 'Failed to delete post' })
  } finally {
    loading.value = false
  }
}

// ===* LIFECYCLE HOOKS *===
onMounted(fetchPosts)
</script>

<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5">Posts Management</div>
        <div class="text-caption text-grey">Lorem ipsum dolor sit amet.</div>
      </div>

      <q-btn color="primary" icon="add" label="New Post" @click="openCreate" />
    </div>
    <PostTable
      :posts="posts"
      :loading="loading"
      @add="openCreate"
      @edit="openEdit"
      @delete="openDelete"
    />
    <PostForm v-model="showForm" :post="selectedPost" @submit="submitForm" />
    <ConfirmDialog v-model="showDelete" @confirm="confirmDelete" />
  </q-page>
</template>
