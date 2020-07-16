import {execSync} from 'child_process'

export function gitConfigureCredentialCacheHelper(timeout: number): void {
  execSync(`git config credential.helper 'cache --timeout=${timeout}'`)
}

export function gitCredentialCacheStore(
  protocol: string,
  host: string,
  username: string,
  password: string
): void {
  const credentials = `protocol=${protocol}\nhost=${host}\nusername=${username}\npassword=${password}`
  execSync(`echo "${credentials}" | git credential-cache store`)
  execSync(
    `echo "protocol=${protocol}\nhost=${host}\nusername=${username}" | git credential-cache get`
  )
}
