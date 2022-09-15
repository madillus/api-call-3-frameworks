<script>
  import { onMount } from "svelte";
  let joke = "";
  let loading = false;

  const fetchJoke = async () => {
    loading = true;
    let dadJoke = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json"
      }
    });
    const dadJokeJSON = await dadJoke.json();
    joke = dadJokeJSON.joke;
    loading = false;
  };

  onMount(fetchJoke);
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  #main-app {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
    padding: 50px 20px;
    text-align: center;
    max-width: 100%;
    width: 800px;
  }
  #joke {
    font-size: 30px;
    letter-spacing: 1px;
    line-height: 40px;
    margin: 50px auto;
    max-width: 600px;
  }

  #btn {
    background-color: #000;
    color: #fff;
    border: 0;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
    padding: 14px 40px;
    font-size: 16px;
    cursor: pointer;
  }
  #btn:active {
    transform: scale(0.98);
  }

  #btn:focus {
    outline: 0;
  }
</style>

<div id="main-app">
  <div id="joke">{loading ? 'Loading...' : joke}</div>
  <button id="btn" on:click={fetchJoke} disabled={loading}>New Joke</button>
</div>