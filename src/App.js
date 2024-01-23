import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {

  state = {
    progress : 0,
  }

  setProgress = (progress) =>
  {
    this.setState({progress: progress})
}
  render() {
    return (
      <div>
        <BrowserRouter>
        <LoadingBar
              color='#f11946'
              progress={this.state.progress}
              />
            <NavBar/>
            
            <Routes>
                <Route path="/" element={<News setProgress = {this.setProgress}  key="general" pageSize={5} category="general" country="in"/>}></Route>
                <Route path="/business" element={<News setProgress = {this.setProgress}  Key='business' pageSize={5} category="business" country="in"/>}></Route>
                <Route path="/entertainment" element={<News setProgress = {this.setProgress}  key="entertainment" pageSize={5} category="entertainment" country="in"/>}></Route>
                <Route path="/general" element={<News setProgress = {this.setProgress}  Key="general" pageSize={5} category="general" country="in"/>}></Route>
                <Route path="/health" element={<News setProgress = {this.setProgress}  key="health" pageSize={5} category="health" country="in"/>}></Route>
                <Route path="/science" element={<News setProgress = {this.setProgress}  key="science" pageSize={5} category="science" country="in"/>}></Route>
                <Route path="/sports" element={<News setProgress = {this.setProgress}  key="sports" pageSize={5} category="sports" country="in"/>}></Route>
                <Route path="/technology" element={<News setProgress = {this.setProgress}  key="technology" pageSize={5} category="technology" country="in"/>}></Route>
            </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;
