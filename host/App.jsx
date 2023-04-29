import {useRef, useState} from "react";

function App() {
    // store ref to iframe
    const frameRef = useRef(null)
    const [showFrame, setShowFrame] = useState(true)
    // render a button that conditionally hides or shows the iframe

    // write a handler to respond to an enter key press
    // when the user presses enter, send a message to the iframe
    // the message should be an object with a type of "update"
    // and a payload of the input value
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            frameRef.current.contentWindow.postMessage({type: "update", props: {name: e.target.value}}, "*")
        }
    }


    return (
        <>
            <h1>Host</h1>
            <button onClick={() => setShowFrame((showFrame) => !showFrame)}>
                {showFrame ? "Hide" : "Show"} Frame
            </button>
            <input name={"name"} onKeyDown={handleKeyDown}  />
            {showFrame && <iframe ref={frameRef} style={{ height:"100vh", width: "100vw"}}  src="/frame.html" />}
        </>
    )
}

export default App
