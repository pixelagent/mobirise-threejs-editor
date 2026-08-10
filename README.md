# Three.js Insert

Add an interactive **Three.js** section to any Mobirise page.

With this extension, Mobirise gets a new block (listed under the *Three.js Insert*
category in the **Add blocks** panel). Drag it onto a page and you have a
`<section>` that renders a Three.js canvas.

## How it works

The extension is deliberately split into two parts, exactly as you asked:

| What                              | Where it lands                      |
|-----------------------------------|-------------------------------------|
| External library scripts          | the page **footer** (before `</body>`) |
| Your scene JavaScript             | **inside the `<section>` tag**      |

* **External scripts** – every URL you list in the *External Scripts* gear panel is
  collected from the page and written, **de-duplicated**, into the HTML footer at
  publish time. Drop five Three.js sections on a page and `three.min.js` is still
  loaded only **once**.
* **Scene code** – the *Scene Code* panel holds the JavaScript that builds your
  scene. It is rendered inline inside the `<section>` and automatically waits for the
  footer libraries to be available before running.

## The gear panels (HTML-related controls)

Click the blue **gear** icon on a Three.js block to open the panels:

* **Scene Code** – the JavaScript that runs inside the section (a rotating cube is
  pre-filled). It always has a `container` variable in scope pointing at the canvas
  wrapper, e.g. `container.appendChild(renderer.domElement)`.
* **External Scripts** – one library URL per line, loaded once in the footer.
  Defaults to `three.min.js` from jsDelivr.
* **Height** – the section height in pixels.

## Default scene

The starter scene creates a `PerspectiveCamera`, a `WebGLRenderer` (with a transparent
canvas), a rotating `BoxGeometry` cube, a directional + ambient light, and an animation
loop. The canvas resizes with the container.

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 2.5;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x00ffff }));
scene.add(cube);
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
scene.add(new THREE.DirectionalLight(0xffffff, 0.8));
renderer.setAnimationLoop(() => { cube.rotation.x += 0.008; cube.rotation.y += 0.012; renderer.render(scene, camera); });
```

## Where to download?

This GitHub repository only contains the code for this Mobirise extension. If you want
the `.mbrext` file, build it with:

```bash
cd src
zip -r ../threejs-editor.mbrext .
```

and import `threejs-editor.mbrext` from Mobirise via *Extensions > Import*.

## Compatibility

Requires Mobirise **5.4.1**+. Works with Bootstrap 4/5 (M4/M5) themes.

## Contributing

Awesome — simply start coding and open a pull request.

## License

MIT — see [LICENSE](LICENSE).
