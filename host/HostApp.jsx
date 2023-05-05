import {useCallback, useEffect, useRef, useState} from "react";
import {FRAME_SOURCE, HOST_SOURCE} from "../shared.js";

function HostApp () {
    const [messages, setMessages] = useState([])
    const frameRef = useRef();

    const listeners = useCallback((e) => {
        if (e.data.source !== FRAME_SOURCE) { return }
        setMessages((messages) => [...messages, JSON.stringify(e.data)])

        if (e.data.type === "route") {
            // push location and search to history

            window.history.pushState({}, '', e.data.location.pathname + e.data.location.search)
        }
        console.log('host message', e.data)
    }, [setMessages])

    useEffect(() => {
        window.addEventListener('message', listeners)
        return () => {
            window.removeEventListener('message', listeners)
        }
    }, [listeners])

    const onLoad = useCallback(() => {
        const currentFrame = frameRef.current
        if (!currentFrame?.contentWindow) { return }
        currentFrame.contentWindow.postMessage({
            source: HOST_SOURCE,
            message: 'init' + new Date().toISOString()
        }, '*') // TODO: this is necessary...
    }, [frameRef])

    const clickHandler = useCallback(() => {
        const currentFrame = frameRef.current
        if (!currentFrame?.contentWindow) { return }
        currentFrame.contentWindow.postMessage({
            source: HOST_SOURCE,
            message: 'click!' + new Date().toISOString()
        }, '*')
    }, [frameRef.current])


    return (
        <>
            <h1>Host</h1>
            <button onClick={clickHandler}>send message to frame</button>
            {JSON.stringify(messages, null, 2)}
            <iframe sandbox={"allow-scripts"} onLoad={onLoad} ref={frameRef} style={{ height:"100vh", width: "100vw"}}  src={"/frame.html"} />
        </>
    )
}

export default HostApp
