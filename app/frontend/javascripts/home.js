import Vue from './vue'

new Vue({
  el: '#app',
  data: {
    message: 'Wat',
  },
  mounted() {
    this.$http.get('/api/user')
      .then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
  }
})
