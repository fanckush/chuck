<template>
  <vs-navbar class="main-nav" center-collapsed square>
    <template #left> JOKE LOGO </template>

    <h5 v-text="currentJoke" />

    <template #right>
      <vs-button flat warn gradient @click="fetchJoke">Next Joke</vs-button>
    </template>
  </vs-navbar>
</template>

<script>
export default {
  data: () => ({
    active: 'guide',
    currentJoke: '',
  }),
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
