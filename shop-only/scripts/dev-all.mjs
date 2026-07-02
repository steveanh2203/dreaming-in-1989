import { spawn } from 'node:child_process'
import console from 'node:console'
import process from 'node:process'
import { setTimeout } from 'node:timers'

const isWindows = process.platform === 'win32'
const npmCommand = isWindows ? 'npm.cmd' : 'npm'
const children = new Set()
let shuttingDown = false

const stopAll = (exitCode = 0) => {
  if (shuttingDown) return
  shuttingDown = true

  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM')
  }

  setTimeout(() => process.exit(exitCode), 300)
}

const start = (name, command, args) => {
  const child = spawn(command, args, {
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: process.env.FORCE_COLOR ?? '1' },
  })

  children.add(child)

  child.on('exit', (code, signal) => {
    children.delete(child)
    if (shuttingDown) return

    const exitCode = typeof code === 'number' ? code : 1
    console.error(`[dev:all] ${name} exited${signal ? ` from ${signal}` : ''}.`)
    stopAll(exitCode)
  })

  child.on('error', (error) => {
    console.error(`[dev:all] Could not start ${name}: ${error.message}`)
    stopAll(1)
  })
}

process.on('SIGINT', () => stopAll(0))
process.on('SIGTERM', () => stopAll(0))

start('local API', process.execPath, ['server/auth-server.js'])
start('Vite storefront', npmCommand, ['run', 'dev'])
