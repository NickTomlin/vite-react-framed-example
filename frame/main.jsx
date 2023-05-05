import React, {useCallback, useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import {createMemoryRouter, Link, RouterProvider} from "react-router-dom";
import {FRAME_SOURCE, HOST_SOURCE, TYPES} from "../shared.js";


// what we wnat to do is have the frame loaded in a srcDoc but still be able to talk to the bundle...
function Wrapper () {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        console.log('hi')
        window.parent.postMessage({
            source: FRAME_SOURCE,
            message: "frame initialized"
        }, 'http://localhost:5173') // we need this because we can't access `parent`
    }, [])

    const handleHostMessage = useCallback((e) => {
        console.log('frame::handler', e)
        if (e.data.source !== HOST_SOURCE) { return }
        setMessages((messages) => [...messages, e.data.message])
    }, [setMessages])

    // listen for postMessage from host
    useEffect(() => {
        window.addEventListener('message', handleHostMessage)
        return () => {
            window.removeEventListener('message', handleHostMessage)
        }
    }, [setMessages, handleHostMessage])

    const router = createMemoryRouter([
        {
            path: '/',
            element: <div>
                <h1>Home</h1>
                <ul>
                    <li>
                        <Link to={"/example"}>Example</Link>
                    </li>
                    <li>
                        <Link to={"/bad"}>Bad</Link>
                    </li>
                </ul>
            </div>
        },
        {
            path: '/example',
            element: <div>
                <h1>Example</h1>
                <Link to={"/"}>Home</Link>
            </div>
        },
        {
            path: '/bad',
            element: <div>
                <h1>Bad page (should not be in parent url)</h1>
                <Link to={"/"}>Home</Link>
            </div>
        }
    ], {
        initialEntries: ['/']
    })

    router.subscribe(({ location }) => {
        console.log("Frame::location", location);
        window.parent.postMessage({
            type: TYPES.route,
            source: FRAME_SOURCE,
            location: {
                pathname: location.pathname,
                search: location.search,
            },
        }, '*');
    });

    // requires `allow-downloads` in sandbox
    const onDownload = useCallback(() => {
        const blob = new Blob(['hi'], {type: 'text/plain'})
        const link = document.createElement("a");
        link.download = name;
        link.rel = "noopener";
        link.href = URL.createObjectURL(blob.slice(0, blob.size));
        setTimeout(() => {
            link.dispatchEvent(new MouseEvent("click"));
        });
    }, [])

    const onLocationChange = () => {
        window.location.href = "http://www.google.com"
    }

    return <>
        <h1>Inside Frame</h1>
        <div style={{ display: "flex"}}>
            <a href={"https://www.google.com"} target={"_blank"}>Google (requires `allow-popups`)</a>
            <button onClick={onDownload}>Download</button>
            <button onClick={onLocationChange}>Try to change to another location (should not work)</button>
        </div>
        <RouterProvider router={router} />
        <div>
            <h2>Messages</h2>
            <pre><code>{JSON.stringify(messages, null, 2)}</code></pre>
        </div>
    </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Wrapper/>
  </React.StrictMode>,
)