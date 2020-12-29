<template>
  <div class="center examplex">
    <vs-navbar class="main-nav" center-collapsed square v-model="active">
      <template #left> JOKE LOGO </template>

      <h5 v-text="currentJoke" />

      <template #right>
        <vs-button flat warn gradient @click="fetchJoke">Next Joke</vs-button>
      </template>
    </vs-navbar>
  </div>
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

      try {
        const res = await this.$axios.get(
          'https://api.chucknorris.io/jokes/random'
        )
        this.loading = false
        this.currentJoke = res.data.value
      } catch (err) {
        console.log('err')
        this.loading = false
        this.currentJoke = 'Try again..'
        return false
      }
    },
  },
  mounted() {
    this.fetchJoke()
  },
}
</script>

<style lang="scss" scoped>
.main-nav {
  background-color: lightgray;
}
</style>
