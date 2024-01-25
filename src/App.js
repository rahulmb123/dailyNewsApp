import './App.css';

import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const pageSize = 5;
  const [progress, setProgress] = useState(0)
  // state = {
  //   progress : 0,
  // }

  // setProgress = (progress) =>
  // {
  //   setProgress(progress = progress)
  // }
    return (
      <div>
        <BrowserRouter>
        <LoadingBar
              color='#f11946'
              progress = {progress}
              />
            <NavBar/>
            
            <Routes>
                <Route path="/" element={<News setProgress = {setProgress}  key="general" pageSize={pageSize} category="general" country="in"/>}></Route>
                <Route path="/business" element={<News setProgress = {setProgress}  Key='business' pageSize={pageSize} category="business" country="in"/>}></Route>
                <Route path="/entertainment" element={<News setProgress = {setProgress}  key="entertainment" pageSize={pageSize} category="entertainment" country="in"/>}></Route>
                <Route path="/general" element={<News setProgress = {setProgress}  Key="general" pageSize={pageSize} category="general" country="in"/>}></Route>
                <Route path="/health" element={<News setProgress = {setProgress}  key="health" pageSize={pageSize} category="health" country="in"/>}></Route>
                <Route path="/science" element={<News setProgress = {setProgress}  key="science" pageSize={pageSize} category="science" country="in"/>}></Route>
                <Route path="/sports" element={<News setProgress = {setProgress}  key="sports" pageSize={pageSize} category="sports" country="in"/>}></Route>
                <Route path="/technology" element={<News setProgress = {setProgress}  key="technology" pageSize={pageSize} category="technology" country="in"/>}></Route>
            </Routes>
        </BrowserRouter>
      </div>
    )
  
}
export default App;
