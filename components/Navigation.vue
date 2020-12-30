<template>
  <vs-navbar class="main-nav" center-collapsed square>
    <template #left>
      <!-- LOGO -->
      <h4>JOKE LOGO</h4>

      <!-- Nav pages -->
      <vs-navbar-item @click="$router.push('/')" :active="active === 'home'">
        Home
      </vs-navbar-item>
      <vs-navbar-item
        :active="active === 'about'"
        @click="$router.push('about')"
      >
        About
      </vs-navbar-item>
    </template>

    <!-- random joke -->
    <h5 v-text="currentJoke" />

    <template #right>
      <vs-button flat warn gradient @click="fetchJoke">Next Joke</vs-button>
    </template>
  </vs-navbar>
</template>

<script>
export default {
  data: () => ({
    currentJoke: '',
  }),
  computed: {
    active() {
      console.log('this.$route: ', this.$route)
      if (this.$route.path.includes('about')) return 'about'
      return 'home'
    },
  },
  methods: {
    async fetchJoke() {
      this.loading = true

      this.currentJoke = await this.$store.dispatch('joke/fetchJoke')
      if (!this.currentJoke) this.currentJoke = 'failed to load joke'

      this.loading = false
    },
  },
  mounted() {
    this.fetchJoke()
    setInterval(this.fetchJoke, 30 * 1000)
  },
}
</script>

<style>
.main-nav {
  position: initial;
  margin-bottom: 24px;
  background-color: lightgray;
}
</style>
