# Utils

The project includes a `/utils` folder which contains few helper functions.

- `helpers.js` - contains functions that might be used multiple times over different components.
- `use-isomorphic-layout-effect.js` - A React helper hook for scheduling a layout effect with a fallback to a regular effect.
```javascript
import useWindowDimensions from 'utils/use-isomorphic-layout-effect.js'
useLayoutEffect(() => {
 // some cool stuff to run on render/re-render
}, [])
```

- `useWindowDimensions.js` - A React helper hook to get window screen size in pixels.

```javascript
import useWindowDimensions from 'utils/useWindowDimensions'
const { width, height } = useWindowDimensions()
```