import './index.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [joke, setJoke] = useState('')
  const [isLoaded, setLoaded] = useState(false)

  async function fetchMyAPI() {
    setLoaded(false)
    let dadJoke = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    })
    const dadJokeJSON = await dadJoke.json()
    if (dadJokeJSON.status === 200) {
      setJoke(dadJokeJSON.joke)
    } else {
      return 'Error retrieving dad joke!'
    }
    setLoaded(true)
    console.log('fired 1')
  }

  useEffect(() => {
    fetchMyAPI()
  }, [])

  return (
    <div className="App">
      <div className="container">
        <h3>Don't Laugh Challenge</h3>
        <div className="joke">{joke}</div>

        {!isLoaded && <div>loading...</div>}
        {isLoaded && (
          <button className="btn" onClick={() => fetchMyAPI()}>
            Get Another Joke
          </button>
        )}
      </div>
    </div>
  )
}
