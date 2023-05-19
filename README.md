React framed
---

This is a toy showcasing sandboxed `iframe` patterns in a React app with multiple `vite` entrypoints.

### Features

- [x] Communication between host and frame
- [x] Routing in frame -> bubbling up to host
    - [x] Child cannot modify host URL directly
    - [x] Child cannot redirect to a different domain
- [x] Downloads work in frame
