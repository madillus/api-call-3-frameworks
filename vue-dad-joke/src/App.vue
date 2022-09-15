<template>
  <div id="app">
    <div class="wrapper">
      <h3>Don't laugh</h3>
      <p v-if="error">{{ error }}</p>

      <p class="question" v-if="question">{{ question }}</p>

      <p class="answer" v-if="reveal">{{ answer }}</p>
      <button class="btn" v-if="answer" v-show="!reveal" @click="revealAnswer">
        ?
      </button>
      <button class="btn" @click="fetchJoke">{{ button }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      button: 'Get A Dad Joke ',
      answer: null,
      question: null,
      reveal: false,
      error: null,
    }
  },
  methods: {
    splitJoke(str) {
      return str.joke.split('? ').map((j) => j.trim())
    },
    resetJokes() {
      this.question = false
      this.answer = false
      this.reveal = false
    },
    revealAnswer() {
      this.reveal = true
    },
    fetchJoke() {
      this.resetJokes()
      fetch('https://icanhazdadjoke.com', {
        headers: {
          Accept: 'application/json',
        },
      })
        .then((res) => {
          return res.json()
        })
        .then((resjson) => {
          const formatted = this.splitJoke(resjson)
          formatted.length > 1
            ? (this.question = formatted[0] + '?')
            : (this.question = formatted[0])
          this.answer = formatted[1]
          this.button = 'Meh. Another one please.'
        })
        .catch((error) => {
          this.error = 'Something went wrong. Try again later.'
        })
    },
  },
}
</script>
