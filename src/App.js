//@flow
import React, { Component } from 'react';
import Search from './components/search/Search'
import PlacesList from './components/placesList/PlacesList'
import css from './App.module.css';

const foundLocations = [
  {
    id: "1",
    name: "Woolshed"
  },
  {
    id: "2",
    name: "Aussie Bar"
  },
  {
    id: "3",
    name: "Aussie Bar Club"
  },
  {
    id: "4",
    name: "Baari karpanen"
  }
]

type Location = {
  id: string,
  name: string,
}

type State = {
  filteredLocations: Array<Location>
}
class App extends Component<{}, State> {
  
  state = {
    filteredLocations: foundLocations
  }

  onSearch = (value: string) => {
    const searchName = value.toLowerCase()
    const filteredLocations = foundLocations.filter(item => {
      const name = item.name.toLowerCase()
      return name.includes(searchName)
    })
    this.setState({filteredLocations})    
  }

  render() {
    const {filteredLocations} = this.state
    return (
      <div className={css.app}>
        <h1 className={css.title}>Search for place</h1>
        <Search onChange={(value) => this.onSearch(value)} />
        <PlacesList foundLocations={filteredLocations} />
      </div>
    );
  }
}

export default App;
