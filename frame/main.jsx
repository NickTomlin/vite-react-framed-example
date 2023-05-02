import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'

// what we wnat to do is have the frame loaded in a srcDoc but still be able to talk to the bundle...
function Wrapper () {
    useEffect(() => {
        console.log('send')
        window.postMessage('hello', '*')
    }, [])
    // listen for postMessage from host
    useEffect(() => {
        function hi (e) {
            console.log('message from host', e)
        }
        window.addEventListener('message', hi)
        return () => {
            window.removeEventListener('message', hi)
        }
    }, [])

    useEffect(() => {
        // fetch('https://example.com')
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               console.log(this.responseText.slice(0, 10));
            }
        }
        xhttp.open("GET", "https://httpbin.org/get?foo=bar", true);
        xhttp.send();

    }, [])
    return <div>
        HI from frame!!
        <a target={"_blank"} href={"http://www.google.com"}>Google</a>
    </div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Wrapper/>
  </React.StrictMode>,
)
