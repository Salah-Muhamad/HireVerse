import { useState } from 'react'
import Home from './Component/Home/Home'
import About from './Component/About/About'
import JobDetails from './Component/JobDetails/JobDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JobDetails/>
    </>
  )
}

export default App
