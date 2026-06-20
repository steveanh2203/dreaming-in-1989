# After School Arcade Tee

- Canvas: 4500 x 5400 px, transparent PNG.
- Main copy: `AFTER SCHOOL ARCADE CLUB`.
- Supporting copy: `TOKENS • HIGH SCORES • 1989`.
- Brand mark: exact existing Dreaming in 1989 logo, preserved without redrawing.
- Artwork style: distressed late-1980s mall arcade screen print.

`arcade-scene-source.png` is the generated chroma-key source. The build script removes only chroma connected to the outer canvas, preserving interior neon details, then composites deterministic typography and the original logo.

Build:

```bash
node ops/printful/scripts/build-after-school-arcade-artwork.mjs
```
