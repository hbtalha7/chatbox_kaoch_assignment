import React from 'react'

import {BrowserRouter ,Route} from 'react-router-dom'
import Chat from './components/Chat';
import Join from './components/Join';
import './index.css'
const App=()=>{
    return (
    <BrowserRouter>
        <Route path="/" component={Join} exact></Route>
        <Route path="/chat" component={Chat}></Route>
    </BrowserRouter>
    )
}

export default App;