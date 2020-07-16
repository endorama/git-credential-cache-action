import * as core from '@actions/core'
import * as action from './action'

async function run(): Promise<void> {
  try {
    const timeout: number = parseInt(core.getInput('timeout'))
    const protocol: string = core.getInput('protocol')
    const host: string = core.getInput('host')
    const username: string = core.getInput('username')
    const password: string = core.getInput('password')

    action.gitConfigureCredentialCacheHelper(timeout)
    core.info('Set git credential helper to: cache')
    core.info(`Credentials timeout set to ${timeout}`)

    action.gitCredentialCacheStore(protocol, host, username, password)
    core.debug(
      `Stored credentials for ${protocol}://${username}:REDACTED@${host}`
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
