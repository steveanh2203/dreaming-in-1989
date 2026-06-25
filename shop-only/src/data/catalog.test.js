import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const catalogSource = await readFile(new URL('./catalog.js', import.meta.url), 'utf8')

test('wires the after hours tee into the storefront catalog', () => {
  assert.match(catalogSource, /id: 'after-hours-video-club-tee'/)
  assert.match(catalogSource, /name: 'After Hours Video Club Tee'/)
  assert.match(catalogSource, /category: 'T Shirt'/)
  assert.match(catalogSource, /printful-white\/01-front\.png/)
  assert.match(catalogSource, /printful-white\/11-printfile-front\.png/)
  assert.match(catalogSource, /12-hero-video-store-wide\.png/)
  assert.match(catalogSource, /12-lifestyle-video-store\.png/)
  assert.match(catalogSource, /13-lifestyle-rental-parking-lot\.png/)
  assert.match(catalogSource, /14-lifestyle-movie-night\.png/)
  assert.match(catalogSource, /15-lifestyle-arcade\.png/)
  assert.doesNotMatch(catalogSource, /\{ label: '12 Video Store'/)
  assert.match(catalogSource, /newArrivalIds = \['after-hours-video-club-tee'\]/)
  assert.match(catalogSource, /featuredDropProduct = products\[0\]/)
})
