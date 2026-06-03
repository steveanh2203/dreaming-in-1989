# Mug Workflow Test

Last updated: 2026-06-03

Goal: prove the fast operations workflow from Codex-created artwork to Printful mockup generation.

## What Was Created

Codex generated a test mug wrap artwork using the built-in image generation tool.

Prompt summary:

- Retro 1989 diner counter mug wrap
- Text: `DINER COUNTER CLUB`
- Small text: `1989 SUPPLY CO.`
- Palette: cream, diner red, teal, black ink, warm yellow
- Product use: Printful mug sublimation pilot

Workspace files:

- Source image: `ops/printful/artwork/diner-counter-mug/diner-counter-club-ai-source.png`
- Print test file: `ops/printful/artwork/diner-counter-mug/diner-counter-club-11oz-print-test.png`
- Public test URL: `https://raw.githubusercontent.com/steveanh2203/dreaming-in-1989/main/ops/printful/artwork/diner-counter-mug/diner-counter-club-11oz-print-test.png`

Print test dimensions:

- `2700 x 1050 px`
- Target Printful variant: `White Glossy Mug 11 oz`
- Catalog product ID: `19`
- Catalog variant ID: `1320`
- Placement: `default`
- Technique: `sublimation`
- Print area: `9.0 x 3.5 in`

## Printful Mockup Setup

Live Printful mockup styles selected for `1320`:

- `10423`: Default / Front view
- `10421`: Default / Handle on Right
- `10422`: Default / Handle on Left

Scripts:

- `ops/printful/scripts/create-mug-mockup-task.ps1`
- `ops/printful/scripts/get-mockup-task.ps1`

Run after the artwork has a public URL:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\ops\printful\scripts\create-mug-mockup-task.ps1 -ArtworkUrl "https://..."
```

Then retrieve the task:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\ops\printful\scripts\get-mockup-task.ps1 -TaskId "TASK_ID"
```

## Current Blocker

Resolved for this pilot. The generated print file was pushed to the project GitHub repo and is reachable through a raw public URL.

Tried:

- Temporary host `0x0.st`: rejected upload because public uploads are disabled.
- Temporary host `transfer.sh`: did not return a usable URL.

Clean next options:

- Deploy a tiny static artifact folder to Netlify/Vercel.
- Use a tunnel/public asset host controlled by the project.

## Printful Mockup Result

Mockup task:

- Task ID: `928149957`
- Status: `completed`
- Variant: `1320`
- Product: `White Glossy Mug 11 oz`

Downloaded mockups:

- `ops/printful/mockups/diner-counter-mug/front-view.jpg`
- `ops/printful/mockups/diner-counter-mug/handle-left.jpg`
- `ops/printful/mockups/diner-counter-mug/handle-right.jpg`

## Important API Notes

- Printful v2 supports mockup task creation via `POST /v2/mockup-tasks`.
- The mockup request uses catalog product ID, catalog variant IDs, design placement/layers, and mockup style IDs.
- Printful v2 docs state product management via sync products/product templates is not available in v2 yet, so actual store product creation/sync may need v1 Products API or dashboard/product-template workflow.
