import {useRef} from "react";

function HostApp() {
    const frameRef = useRef()
    return (
        <>
            <h1>Host</h1>
            <iframe ref={frameRef} style={{ height:"100vh", width: "100vw"}}  srcDoc={`
                <!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Frame</title>
                  </head>
                  <body>
                    <div id="root"></div>
                    <script type="module" src="/frame/main.jsx"></script>
                  </body>
                </html>
             `} />
        </>
    )
}

export default HostApp
