let user_access_token = '';
let expirationTime = '';
const client_id = 'd04611563d9e41f481bdcc0d7449f260';
const redirectURI = 'http://localhost:3000/';
// const redirectURI = 'https://omrijam.surge.sh/';

const Spotify = {

  getAccessToken() {
    if (user_access_token) {
      return user_access_token;
    }
    const url = document.location.href;
    user_access_token = url.match(/access_token=([^&]+)/) ? url.match(/access_token=([^&]+)/)[1] : '';
    expirationTime = url.match(/expires_in=([^&]+)/) ? url.match(/expires_in=([^&]+)/)[1] : '';
    if (user_access_token && expirationTime) {
      window.setTimeout(() => user_access_token = '', expirationTime * 100000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
    return user_access_token;
  },

  async search(term) {
    try {
      this.getAccessToken();
      const searchResult = [];
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: { Authorization: `Bearer ${user_access_token}` } });
      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson);
        if (responseJson.tracks.items.length > 0) {
          responseJson.tracks.items.map((track) => {
            return searchResult.push({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
              preview_url: track.preview_url
            });
          });
        }
        return searchResult;
      }
      throw new Error('Could not search spotify');
    } catch (error) {
      console.log(error);
    }
  },

  async savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }
    const accessToken = user_access_token;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    try {
      let userId = '';
      let playlistID = '';
      await fetch('https://api.spotify.com/v1/me', { headers }).then(async (response) => {
        if (response.ok) {
          const responseJson = await response.json();
          userId = responseJson.id;
          await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers,
            method: 'POST',
            body: JSON.stringify({
						            name: playlistName,
            }),
          }).then(async (response) => {
            if (response.ok) {
              const responseJson = await response.json();
              playlistID = responseJson.id;
              return playlistID;
            }
          }).then(async playlistID => await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
            {
              headers,
              method: 'POST',
              body: JSON.stringify({ uris: trackURIs }),
            }))
            .then(async (response) => {
              if (response.ok) {
                const resJson = await response.json();
                console.log(resJson);
              }
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
export default Spotify;
