<script setup lang="ts">
const menuList = [
  { name: 'Dashboard', icon: 'dashboard', route: '#' },
  { name: 'Posts', icon: 'article', route: '/' },
  { name: 'Users', icon: 'people', route: '#' },
]
</script>

<template>
  <q-list style="height: 100dvh; display: flex; flex-direction: column">
    <!-- header -->
    <q-item-label header>
      <q-avatar size="32px">
        <img src="/public/icons/favicon-32x32.png" />
      </q-avatar>
      Admin Panel
    </q-item-label>

    <!-- menu top -->
    <q-item
      v-for="(menu, index) in menuList"
      :key="index"
      clickable
      :to="menu.route"
      :active="$route.path === menu.route"
    >
      <q-item-section avatar>
        <q-icon :name="menu.icon" />
      </q-item-section>
      <q-item-section> {{ menu.name }} </q-item-section>
    </q-item>

    <!-- menu bottom -->
    <q-item clickable color="red" class="q-mt-auto">
      <q-item-section avatar>
        <q-icon name="settings" />
      </q-item-section>
      <q-item-section> Settings </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped></style>
