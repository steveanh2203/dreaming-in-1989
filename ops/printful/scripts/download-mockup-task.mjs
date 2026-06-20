import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '../../..')
const envPath = path.join(repoRoot, 'shop-only/.env.local')
const taskId = process.argv[2]
const outputDirectory = path.resolve(
  process.argv[3] ?? path.join(repoRoot, 'ops/printful/mockups/late-night-rewind-club-mug'),
)
if (!taskId) throw new Error('Usage: node download-mockup-task.mjs TASK_ID [OUTPUT_DIRECTORY]')

const env = Object.fromEntries(
  fs
    .readFileSync(envPath, 'utf8')
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const separator = line.indexOf('=')
      return [line.slice(0, separator), line.slice(separator + 1)]
    }),
)
const headers = { Authorization: `Bearer ${env.PRINTFUL_API_TOKEN}` }
if (env.PRINTFUL_STORE_ID) headers['X-PF-Store-Id'] = env.PRINTFUL_STORE_ID

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))
let task
for (let attempt = 0; attempt < 24; attempt += 1) {
  const response = await fetch(`https://api.printful.com/v2/mockup-tasks?id=${taskId}`, { headers })
  const json = await response.json()
  if (!response.ok) throw new Error(`Mockup task failed (${response.status}): ${JSON.stringify(json).slice(0, 800)}`)
  task = json.data?.[0]
  if (task?.status === 'completed' || task?.status === 'failed') break
  await wait(5000)
}
if (task?.status !== 'completed') {
  throw new Error(`Mockup task did not complete: ${JSON.stringify(task?.failure_reasons ?? task)}`)
}

fs.mkdirSync(outputDirectory, { recursive: true })
const mockups = task.catalog_variant_mockups.flatMap((variant) => variant.mockups)
const filenames = ['front-view.png', 'handle-right.png', 'handle-left.png']
for (const [index, mockup] of mockups.entries()) {
  const response = await fetch(mockup.mockup_url)
  if (!response.ok) throw new Error(`Download failed (${response.status}): ${mockup.mockup_url}`)
  const filename = filenames[index] ?? `view-${index + 1}.png`
  fs.writeFileSync(path.join(outputDirectory, filename), Buffer.from(await response.arrayBuffer()))
}

fs.writeFileSync(
  path.join(outputDirectory, 'task-result.json'),
  `${JSON.stringify({ ...task, catalog_variant_mockups: task.catalog_variant_mockups }, null, 2)}\n`,
)
console.log(
  JSON.stringify(
    {
      taskId: Number(taskId),
      status: task.status,
      files: fs.readdirSync(outputDirectory).sort(),
    },
    null,
    2,
  ),
)
