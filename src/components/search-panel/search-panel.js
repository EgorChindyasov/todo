import React from 'react'

import './search-panel.css';

export default class Search extends React.Component {

  state = {
    term: ''
  }

  onSearchChange = (e) => {
    const term = e.target.value
    this.setState({ term })
    this.props.onSearchChange(term)
  }

  render() {
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="поиск"
                value={this.state.term}
                onChange={this.onSearchChange} />
    )  
  }
}