/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQA7yaIk9zNpOggVL8y10qtdlCpCzYKytJs_hiFtwq9CT3ilz7dsremaiyLa7bS2AXZVNKTOJmHa3NYB1hfxVjbR86OKqY4QnD1gQU_pUG59WMgoJiBad9HEfZ39zi--4wfeIUN3z6uKMn6NSHgYany_mDgzRtb1_fYKeO1Bb6ED';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  console.log(array)
  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class AlbumCover extends Component {
  render() {
    const track = this.props.track;
    const src = track.album.images[0].url;
    return (<img src={src} style={{ width: 400, height: 400 }} />);
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: "",
      data: [],
      songsLoaded: false,
      currentTrack: null,
      tableau: []
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
        this.setState({ text: "J'ai reçu " + this.state.data.length + " musiques." });
        this.getNewSongs();
        this.setState({ songsLoaded: true });
        console.log(this.state.tableau)
      })
      
    ;
  }

  getNewSongs() {
    const length = this.state.data.length;
    const i1 = getRandomNumber(length);
    const i2 = getRandomNumber(length);
    const i3 = getRandomNumber(length);
    this.setState({ currentTrack: this.state.data[i1].track });
    this.setState({ tableau: shuffleArray([this.state.data[i1].track, this.state.data[i2].track, this.state.data[i3].track]) });
  }

  checkAnswer(id) {
    if (this.state.currentTrack == id) {
      this.getNewSongs();
      return (
        swal('Bravo', 'TU as gagné !', 'success')
      )
    } else {
      swal('Alerte !!', 'Mauvaise réponse', 'error')
    }
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
            <AlbumCover track={this.state.currentTrack} />
            <Sound url={this.state.currentTrack.preview_url} playStatus={Sound.status.PLAYING} />
          </div>
          <div className="App-buttons">
            {this.state.tableau.map(item => (
              <Button onClick={() => this.checkAnswer(item)}>{item.name}</Button>
            ))}
          </div>
        </div>
      )
    };
  }
}

export default App;
