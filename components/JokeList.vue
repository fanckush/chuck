<template>
  <div class="jokes-list">
    <div class="center content-inputs">
      <vs-input v-model="searchStr" placeholder="Find joke" @input="searchJoke">
        <i slot="icon" class="bx bx-search" />
      </vs-input>
    </div>

    <div>
      <ul class="jokes" ref="jokes">
        <li v-for="joke in paginatedJokes" :key="joke.id" class="joke">
          {{ joke.value }}
        </li>
      </ul>
    </div>

    <vs-pagination v-model="currentPage" :length="numberOfPages" />
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      jokes: [],
      currentPage: 1,
      itemsPerPage: 5,
      searchStr: '',
      loading: null,
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.jokes.length / this.itemsPerPage) || 1
    },
    paginatedJokes() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.jokes.slice(start, end)
    },
  },
  methods: {
    openLoading() {
      if (this.loading === null) {
        this.loading = this.$vs.loading({
          target: this.$refs.jokes,
          text: 'Loading...',
        })
      }
    },
    closeLoading() {
      if (this.loading) {
        this.loading.close()
        this.loading = null
      }
    },
    async searchJoke(str) {
      // don't try to search for less than 3 chars
      if (this.searchStr.length < 3 && str.length < 3) return

      this.openLoading()

      this.jokes = await this.$store.dispatch(
        'joke/searchJokes',
        str || this.searchStr
      )
      this.closeLoading()
    },
  },
  mounted() {
    // emulate "all" jokes by searching for 'chuck'
    this.searchJoke('Chuck')
  },
}
</script>

<style lang="scss" scoped>
.jokes-list {
  padding: 16px;
}
.jokes {
  padding-left: 0;
  list-style-type: none;
  margin: 16px 0;
}

.joke {
  padding: 16px;
  margin: 8px 0;
  border-radius: 8px;
  background-color: #f7f7f7;
}
</style>
