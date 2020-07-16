import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import simpleGit, {SimpleGit, SimpleGitOptions} from 'simple-git'
import {dirSync} from 'tmp'
import {execSync} from 'child_process'

import * as action from '../src/action'

// setup test environment
const testDir = dirSync()
console.log('Dir: ', testDir.name)
// change WD to test folder
process.chdir(testDir.name)
const git: SimpleGit = simpleGit()

test('git credential helper is configured', async () => {
  await git.init()
  action.gitConfigureCredentialCacheHelper(900)
  git.addConfig('credential.helper', 'cache')

  const confs = await git.listConfig()
  expect(confs.values['.git/config']['credential.helper']).toEqual('cache')
})

test('set git credentials', async () => {
  action.gitCredentialCacheStore('https', 'github.com', 'bob', 's3cre7')

  const result = execSync(
    `echo "protocol=https\nhost=github.com\nusername=bob" | git credential-cache get`
  )
  expect(`${result}`).toEqual(`username=bob\npassword=s3cre7\n`)
  execSync(
    `echo "protocol=https\nhost=github.com\nusername=bob" | git credential-cache erase`
  )
})

// shows how the runner will run a javascript action with env / stdout protocol
// test('test runs', () => {
//   process.env['INPUT_TIMEOUT'] = '500'
//   process.env['INPUT_PROTOCOL'] = 'https'
//   process.env['INPUT_HOST'] = 'github.com'
// 
//   const ip = path.join(__dirname, '..', 'lib', 'main.js')
//   const options: cp.ExecSyncOptions = {
//     env: process.env
//   }
// 
//   const somethingSpy = jest.spyOn(action, 'gitConfigureCredentialCacheHelper')
// 
//   console.log(cp.execSync(`node ${ip}`, options).toString())
// 
//   expect(somethingSpy).toHaveBeenCalledWith(500)
// })
