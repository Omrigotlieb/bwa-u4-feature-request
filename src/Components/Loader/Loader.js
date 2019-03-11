import React from 'react';
import './Loader.css'
import loading from './loading.gif'

class Loader extends React.Component {

  render() {
    return (
      <div id="loading">
        <img id="loading-image" src={loading} alt="Loading..." />
      </div>
    );
  }
}


export default Loader;
