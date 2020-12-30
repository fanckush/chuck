export const actions = {
  /**
   * Fetch a random joke from the API
   * @returns {String|Boolean} the joke or false on failure
   */
  async fetchJoke() {
    try {
      const res = await this.$axios.get(
        'https://api.chucknorris.io/jokes/random'
      )
      return res.data.value
    } catch (err) {
      console.log('err: ', err)
      return false
    }
  },

  /**
   * Get a list of jokes using a search string
   * @param {String} searchStr the search string
   * @returns {Array} an array of jokes
   */
  async searchJokes(_, searchStr) {
    try {
      const res = await this.$axios.get(
        `https://api.chucknorris.io/jokes/search?query=${searchStr}`
      )
      return res.data.result
    } catch (err) {
      console.log('err: ', err)
      return []
    }
  },
}
