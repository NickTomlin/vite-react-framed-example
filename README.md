React framed
---

This is a toy showing some cross domain `iframe` patterns in React.

### Features

- [x] Communication between host and frame
- [x] Routing in frame -> bubbling up to host
    - Child cannot modify host URL directly
    - Child cannot redirect to a different domain
- [x] Downloads in frame