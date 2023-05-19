import {useCallback, useEffect, useRef, useState} from "react";
import {FRAME_SOURCE, HOST_SOURCE} from "../shared.js";

function HostApp () {
    const [messages, setMessages] = useState([])
    const frameRef = useRef();

    const listeners = useCallback((e) => {
        if (e.data.source !== FRAME_SOURCE) { return }
        setMessages((messages) => [...messages, JSON.stringify(e.data)])
        console.log('host message', e.data)

        if (e.data.type === "route") {
            console.log(e.data)
            if (/bad/.test(e.data.location.pathname)) {
                setMessages((messages) => [...messages, `BAD STATE ${e.data.location.pathname}`])
            } else {
                window.history.pushState({}, '', e.data.location.pathname + e.data.location.search)
            }
        }
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
        }, '*') // `null` origin of sandboxed frame necessitates this since the origin of the frame is `null`
    }, [frameRef])

    const clickHandler = useCallback(() => {
        const currentFrame = frameRef.current
        if (!currentFrame?.contentWindow) { return }
        currentFrame.contentWindow.postMessage({
            source: HOST_SOURCE,
            message: 'click!' + new Date().toISOString()
        }, '*') // `null` origin of sandboxed frame necessitates this since the origin of the frame is `null`
    }, [frameRef])

    const sandboxAttributes = [
        // for any JS in the iframe
        "allow-scripts",
        // allow opening external links
        "allow-popups",
        // allow us to trigger download handlers
        "allow-downloads",
    ].join(" ")


    const hostOrigin = window.location.origin

    return (
        <>
            <h1>Host</h1>
            <button onClick={clickHandler}>send message to frame</button>
            {JSON.stringify(messages, null, 2)}
            <iframe sandbox={sandboxAttributes} onLoad={onLoad} ref={frameRef} style={{ height:"100vh", width: "100vw"}}  src={`/frame.html?hostOrigin=${hostOrigin}`} />
        </>
    )
}

export default HostApp
