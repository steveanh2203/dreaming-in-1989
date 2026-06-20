const defaultWait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

export const retryOn429 = async (
  operation,
  { maxAttempts = 6, delayMs = 5000, wait = defaultWait } = {},
) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation()
    } catch (error) {
      if (error.status !== 429 || attempt === maxAttempts) throw error
      await wait(delayMs * attempt)
    }
  }

  throw new Error('Rate-limit retry loop exited unexpectedly.')
}

