import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import FrameApp from './FrameApp.jsx'
import './index.css'

function Wrapper () {
    const [stateProps, setStateProps] = useState({ name: "bob"})
    // store a dynamically loaded react component in state
    console.log(stateProps)
    React.useEffect(() => {
        // store props in state pass to FrameApp
        const listener = (event) => {
            console.log('message received', event.data)
            if (event.data.type === 'reload') {
                window.location.reload()
            }
            if (event.data.type === 'update') {
                setStateProps(prev => {
                    return ({...prev, ...event.data.props});
                })
            }
        }
        window.addEventListener('message', listener)
        return () => {
            window.removeEventListener('message', listener)
        }
    })
    return <FrameApp {...stateProps} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Wrapper/>
  </React.StrictMode>,
)
