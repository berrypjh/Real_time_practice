<template>
  <main>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
    <Socket />
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'
import Socket from '@/components/Socket.vue'

export default {
  components: {
    RouterLink,
    Socket
  }
}
</script>
