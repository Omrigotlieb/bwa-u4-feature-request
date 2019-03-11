import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import Loader from '../Loader/Loader';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistName: 'New playlist',
      playlistTracks: [{
        album: "L'amour En France",
        artist: 'Alain Chamfort',
        id: '5aFLrbiRTEaZuueEHNnhIZ',
        name: 'Madona',
        uri: 'spotify:track:5aFLrbiRTEaZuueEHNnhIZ',
        preview_url: 'https://p.scdn.co/mp3-preview/10bb4a9329613f57f6dbf757eeb67f42148524ab?cid=d04611563d9e41f481bdcc0d7449f260'
      }],
      searchResults: [
        {
          album: 'Recovery',
          artist: 'Eminem',
          id: '15JINEqzVMv3SvJTAXAKED',
          name: 'Love The Way You Lie',
          uri: 'spotify:track:15JINEqzVMv3SvJTAXAKED',
        },
        {
          album: 'Curtain Call',
          artist: 'Eminem',
          id: '1dWimOlV5KUHDerWZVDv5l',
          name: 'My Name Is',
          uri: 'spotify:track:1dWimOlV5KUHDerWZVDv5l',
        }],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const trackArray = this.state.playlistTracks ? this.state.playlistTracks.filter(current => current.id === track.id) : [];
    if (!trackArray.length) {
      const playlistTracks = this.state.playlistTracks ? this.state.playlistTracks : [];
      playlistTracks.push(track);
      window.localStorage.setItem('playlistTracks', JSON.stringify(playlistTracks));
      this.setState({ playlistTracks });
    }
  }

  removeTrack(track) {
    const trackArray = this.state.playlistTracks.filter(current => current.id === track.id);
    if (trackArray.length) {
      const { playlistTracks } = this.state;
      delete playlistTracks[this.state.playlistTracks.indexOf(track)];
      window.localStorage.setItem('playlistTracks', JSON.stringify(playlistTracks));
      this.setState({ playlistTracks });
    }
  }

  updatePlaylistName(playlistName) {
    window.localStorage.setItem('playlistName', playlistName);
    this.setState({ playlistName });
  }

  async savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri).flat();
    document.getElementById('loading').style.display = "block";
    await Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.updatePlaylistName('New Playlist');
    this.setState({ playlistTracks: [] });
    document.getElementById('loading').style.display = "none";
  }

  async search(term) {
    const searchResults = await Spotify.search(term);
    this.setState({ searchResults: searchResults });
  }


  componentDidMount() {
    Spotify.getAccessToken();
    let playlistTracks = window.localStorage.getItem('playlistTracks');
    if(playlistTracks) {
      playlistTracks = JSON.parse(playlistTracks);
    }
    const playlistName = window.localStorage.getItem('playlistName');
    this.setState({playlistTracks, playlistName});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <Loader />
          <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
          <Playlist
              onSave={this.savePlaylist}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
