import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ResultView from './ResultView';
import Client from './Client';

class App extends Component {

    constructor() {
        super();
        this.state = {
            address: '4033 42nd Ave. S',
            zipCode: '55406',
            senators: [],
            representatives: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    }

    handleSubmit(event) {
        Client.search(`${this.state.address} ${this.state.zipCode}`, (civicData) => {
            this.setState({
                // 0:p 1:vp 2:s1 3:s2 4-n:r's
                senators: civicData.officials.slice(2, 2 + civicData.offices[2].officialIndices.length)
            });
            this.setState({
               representatives: civicData.officials.slice(4, 4 + civicData.offices[3].officialIndices.length)
            });
        });
        event.preventDefault();
    }

    handleAddressChange(event) {
        this.setState({address: event.target.value});
    }

    handleZipCodeChange(event) {
        this.setState({zipCode: event.target.value});
    }

    render() {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Who represents you?</h2>
            </div>
              <form className="form-inline">
                  <label htmlFor="inlineFormInput">Address</label>
                  <input onChange={this.handleAddressChange}
                         type="text"
                         className="form-control input-lg mb-2 mr-sm-2 mb-sm-0"
                         id="inlineFormInput"
                         placeholder="Address" />

                  <label htmlFor="inlineFormInput">Zip Code</label>
                  <input onChange={this.handleZipCodeChange}
                      type="text"
                      className="form-control input-lg mb-2 mr-sm-2 mb-sm-0"
                      id="inlineFormInput"
                      placeholder="Zip code" />

                  <button type="button" className="btn btn-lg btn-primary" onClick={this.handleSubmit}>Go</button>

              </form>
              {
                  this.state.senators.length > 0 &&
                  <ResultView {...this.state} />
              }
          </div>
    );
  }
}

export default App;