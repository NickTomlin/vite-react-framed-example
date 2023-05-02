import {useEffect, useRef} from "react";

function HostApp() {
    const frameRef = useRef();
    useEffect(() => {
        console.log(frameRef.current.contentWindow)
        window.postMessage('hello', '*')
    }, [])
    return (
        <>
            <h1>Host</h1>
            <iframe sandbox={"allow-scripts"} ref={frameRef} style={{ height:"100vh", width: "100vw"}}  src={"/frame.html"} />
        </>
    )
}

export default HostApp
