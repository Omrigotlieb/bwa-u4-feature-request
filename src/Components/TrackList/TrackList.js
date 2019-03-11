import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {

  render() {
    const tracks = [];
    if (this.props.searchResults.length) {
      this.props.searchResults.map((currentTrack) => {
        tracks.push(<Track
                track={currentTrack}
                onAdd={this.props.onAdd}
                key={currentTrack.id}
                name={currentTrack.name}
                album={currentTrack.album}
                artist={currentTrack.artist}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval} />
        );
        return tracks;
      });
    }

    return (
      <div className="TrackList">
        {tracks.map((track, i) => <div key={track.key + i}>{track}</div>)}
      </div>
    );
  }
}

export default TrackList;
