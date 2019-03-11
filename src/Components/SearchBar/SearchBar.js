import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarTerm: ''
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  search() {
    this.props.onSearch(this.state.searchBarTerm);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
        this.search(this.state.searchBarTerm);
    }
  }

  handleTermChange(event) {
    const searchBarTerm = event.target.value;
    window.localStorage.setItem('searchBarTerm',searchBarTerm);
    this.setState({ searchBarTerm });
  }

  componentDidMount() {
    const searchBarTerm = window.localStorage.getItem('searchBarTerm');
    this.setState({ searchBarTerm });
  }

  render() {
    const { searchBarTerm } = this.state;
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange}
          placeholder="Enter A Song, Album, or Artist"
          onKeyUp={this.handleKeyPress}
          value={searchBarTerm} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
