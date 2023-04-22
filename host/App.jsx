import {useState} from "react";

function App() {
    const [showFrame, setShowFrame] = useState(false)
    // render a button that conditionally hides or shows the iframe
    return (
        <>
            <h1>Host</h1>
            <button onClick={() => setShowFrame((showFrame) => !showFrame)}>
                {showFrame ? "Hide" : "Show"} Frame
            </button>
            {showFrame && <iframe style={{ height:"100vh", width: "100vw"}}  src="/frame.html" />}
        </>
    )
}

export default App
