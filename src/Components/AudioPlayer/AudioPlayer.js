import React from 'react';
import './AudioPlayer.css'

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audio = new Audio(this.props.previewURL);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  play() {
    this.stopAll();
    this.audio.play();
  }

  stopAll() {
      const audioButtons = document.getElementsByClassName('stop');
      let i = audioButtons.length;
      while (i--) {
          audioButtons[i].click();
      }
  }

  pause() {
    this.audio.pause();
  }

  render() {
    return (
      <div>
        <div>
        <button className="actionButton audio" onClick={this.play}>&#9658;</button>
        </div>
        <div>
        <button className="actionButton stop" onClick={this.pause}>&#10073;&#10073;</button>
        </div>
      </div>
    );
  }
}

export default AudioPlayer;
