import { useState } from 'react'
import Home from './Component/Home/Home'
import About from './Component/About/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <About/>
    </>
  )
}

export default App
