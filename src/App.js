/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQDFDtMglEcDl2bUx3roEJh4Tg1syDAur17nndc1S5iCuPmXc5tMYkt3MlVHg8KYnMpjBywemr2I8yAIqaJINks_zkmaUsifEnnb52N7bfHgNikmVUkhYs1srBfEjafXAaKzPg30cN_cBvyPhToV0JgYm3M-NQMAIt-8i9eatrih';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: "",
      data: [],
      songsLoaded: false
    };
  }

  componentDidMount() {
    this.setState({ text: "Bonjour !" });
    fetch('https://api.spotify.com/v1/playlists/1wCB2uVwBCIbJA9rar5B77/tracks', {
      method: 'GET',
      headers: {
      Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Réponse reçue ! Voilà les musiques reçues : ", data);
        this.setState({ data: data.items });
        console.log(this.state.data);
        this.setState({ songsLoaded: true });
        this.setState({ text: "J'ai reçu " + this.state.data.length + " musiques. La première est " + this.state.data[0].track.name +"." })
      })
      
    ;
  }

  render() {
    if (!this.state.songsLoaded) {
      return (
        <img src={logo} className="App-logo" alt="logo"/>
      )
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <p>{this.state.text}</p>
          </div>
          <div className="App-buttons">
          </div>
        </div>
      )
    };
  }
}

export default App;
