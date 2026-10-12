# sunset-sea

A physically based sunset over the sea, in one WebGL fragment shader.
No dependencies. One ES module. Put a `<canvas>` on your page and call `new Sunset(canvas)`.

It is made for calm, ambient scenes — a sunset that never quite finishes.

- The sky is **computed**, not painted: single scattering through a spherical atmosphere (Rayleigh + Mie + ozone). The reds of a low sun come from the long path through the air.
- The sea **mirrors the sky** (Fresnel), which is why it turns gold and lavender at sunset.
- The bright path under the sun uses the **Cox–Munk** slope distribution of wind-driven water, so it is smooth and never flickers.
- Optional hazy headlands on the horizon, mirrored in the water. One thin layer of cloud, lit from below.

**[Live demo](https://keensense.github.io/sunset-sea/)** · MIT licensed.

## Use it

```html
<canvas id="sky" style="position:fixed; inset:0; width:100%; height:100%"></canvas>
<script type="module">
  import { Sunset } from './src/sunset.js';
  const sunset = new Sunset(document.getElementById('sky'), {
    elevation: 2.4,   // degrees above the horizon
    drift: 0.35,      // the sun slowly rises and sinks by this much, so it never sets
  });
</script>
```

Open `index.html` through any static file server to try the controls
(`python -m http.server`, then <http://localhost:8000>). Press `H` to hide the panel.
Options can also be passed in the address: `?elevation=1&clouds=0.2&coast=false`.

React, Vue, Svelte — create it when the canvas mounts and call `destroy()` when it unmounts:

```js
useEffect(() => {
  const sunset = new Sunset(canvasRef.current, { elevation: 1.5 });
  return () => sunset.destroy();
}, []);
```

The canvas must have a size from CSS (`width`/`height`). The library sets the drawing-buffer size itself and follows the canvas when it resizes.

## Options

| option | default | what it does |
|---|---|---|
| `elevation` | `2.4` | Sun height above the horizon, in degrees. 0–6 is a sunset; below about −4 it is dusk; 10+ is a golden afternoon. |
| `azimuth` | `9` | Direction of the sun, degrees to the right of the view centre. |
| `drift` | `0.35` | The sun rises and sinks by this many degrees, slowly. `0` keeps it still. |
| `driftPeriod` | `480` | Seconds for one drift cycle. |
| `wind` | `3.5` | Wind speed (m/s). Sets wave size and the width of the glitter path. |
| `turbidity` | `1.25` | Haze. `1` is clear air; `2`–`3` is hazier and redder. |
| `clouds` | `0.45` | Cloud cover, `0`–`1`. |
| `coast` | `true` | Draw hazy headlands on the horizon. |
| `coastAzimuth` | `-38` | Where the coast is, in degrees from the view centre (negative = left). |
| `exposure` | `0.30` | Overall brightness. |
| `glitter` | `1` | Brightness of the sun glitter on the water. |
| `sunSize` | `2` | Size of the sun disc relative to life. `1` is real; about `2` looks like a photograph. |
| `fov` | `58` | Field of view in degrees across the shorter side of the canvas. |
| `horizon` | `0.38` | Where the horizon sits: `0` is the bottom of the canvas, `1` the top. |
| `cameraHeight` | `2` | Eye height above the water, in metres. |
| `speed` | `1` | Animation speed. `0` freezes the water. |
| `quality` | `'auto'` | Render scale. `'auto'` lowers the resolution if the GPU cannot keep up. Or a number `0.25`–`1`. |
| `maxPixelRatio` | `2` | Highest device pixel ratio to render at. |
| `respectReducedMotion` | `true` | Draw one still frame if the visitor asked for reduced motion. |
| `autoStart` | `true` | Start animating on creation. |

## Methods

```js
sunset.setOptions({ elevation: 0.8, clouds: 0.2 });  // change anything, any time
sunset.stop();      // pause (the last frame stays)
sunset.start();     // resume
sunset.render();    // draw one frame now
sunset.destroy();   // release everything
sunset.running;     // true while animating
Sunset.isSupported();   // false if WebGL is not available
```

It pauses by itself while the canvas is off screen or the tab is hidden, and recovers from a lost WebGL context.

## Performance

One full-screen pass. About 5 ms per frame at 1280×720 on a laptop RTX 4060; slower on phones, where
`quality: 'auto'` lowers the render scale until frames keep up. For a background that should stay cool and cheap,
use `quality: 0.6` and `maxPixelRatio: 1.5`.

## How it works, and what it leaves out

- **Atmosphere.** Single scattering with Rayleigh, Mie and ozone absorption, integrated per pixel along the view ray with samples packed near the camera (after Nishita et al. 1993; ozone coefficients after Hillaire 2020). The sun's own light is computed on the CPU and passed in.
- **Sea.** Eight travelling waves with deep-water dispersion give the normal. Waves smaller than a few pixels fade out with distance, so the far sea stays calm and does not shimmer.
- **Sun glitter.** Beckmann slope distribution with the Cox–Munk variance for wind speed (Cox & Munk 1954), Schlick Fresnel and a simple shadowing term, plus a soft shimmer.
- **Left out:** multiple scattering (the sky is a little too dark just above the horizon opposite the sun), the curvature of the sea, foam, and a volumetric cloud model.

## Browser support

Any browser with WebGL 1. Written in GLSL ES 1.00.

## License

MIT — see [LICENSE](./LICENSE).

Made by [keensense](https://keensense.net), a collection of quiet places to return to in the browser.
