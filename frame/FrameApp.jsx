import {useState} from 'react'
import './App.css'

function FrameApp({ name }) {
  const [count, setCount] = useState(0)
    console.log(name)

  return (
    <>
      <h1>Frame</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count} and name is {name}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default FrameApp
