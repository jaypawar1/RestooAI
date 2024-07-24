

import './App.css'

import Menupage from '../src/pages/menupage'
import axios from 'axios'
import { useState } from 'react';
function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');


  return (
    <>

    <div className='App'>

       <Menupage/>
    </div>
    </>
  )
}

export default App
