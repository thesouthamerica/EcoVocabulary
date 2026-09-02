<script setup>
import { useGameStore } from '~/stores/game'
import { useSupabaseClient } from '#imports'

const gameStore = useGameStore()
const supabase = useSupabaseClient()

// Ensure levels are loaded on app start
await gameStore.fetchLevels(supabase)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-eco-bg font-sans">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
