import React from 'react'
import {seeAsteroid} from '../api'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      err: null,
      currentData: null,
      url: 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-08-02&end_date=2017-08-02'
    }
  }
  receiveData(err, data) {
    console.log({err, data});
    this.setState({err, currentData: data, url: data.links.prev || this.state.url})
    //currentData is the data from the API
    //url has data and links inside the data. one of those links is the prev asteroid which shows the lasts asteroids that came closer to the earth
  }
  getNext() {
    seeAsteroid(this.state.url, this.receiveData.bind(this))
  } //this function gets the information from the api and makes it useful

  renderNearEarthObject(object, key) {
    console.log({object});
    return (
      <div key={key}>
        <h1>Object: {key}</h1>
        <h3>Name: {object.name}</h3>
        <h3>Potentially hazardous: {object.is_potentially_hazardous_asteroid}</h3>

        </div>
    )
  }
  renderDetails(data) {
    let day = Object.keys(data.near_earth_objects)[0] || null
    return (
      <div>
        <h1>Day: {day || "no data for this day"}</h1>
        <h1>Element Count: {data.element_count}</h1>
        {day && data.near_earth_objects[day].map(this.renderNearEarthObject)}
      </div>
    )
  }
  /*renderDetais, takes data (from the api) ...to be continued*/
  render() {
    let {currentData} = this.state

    return (
      <div>
        <h1>{this.state.err}</h1>
        <h1>List of Asteroids based on their closest approach date to Earth.</h1>
        <button onClick={this.getNext.bind(this)}>Next</button>
        {currentData && this.renderDetails(currentData)}

      </div>
    )
  }
}
