import React from 'react'
import ReactDOM from 'react-dom/client'

// what we wnat to do is have the frame loaded in a srcDoc but still be able to talk to the bundle...
function Wrapper () {
    return <div>HI from frame!!</div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Wrapper/>
  </React.StrictMode>,
)
