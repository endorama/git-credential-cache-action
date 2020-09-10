<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# NOTE

`credential-cache` cannot be used because "each step runs in a separate process". As steps cannot share env variables, is legit to think they can't share memory too.

# git-credential-cache-action

This action aim to improve git credential usage inside GitHub Actions by leveraging the git built-in credential cache helper.

[`gitcredentials`] is the mechanism git uses to get credentials when needed. This method is alternative to providing SSH keys and can be especially useful in non-interactives environment like CIs.

[`git-credential-cache`] is the git built-in helper for storing credentials temporarily in memory.

By leveraging this action is possible to set credentials for specific host/username pairs without touching the filesystem in any way. Credentials will be readable only by the git process itself and as they live only in memory there should be no need for manual removal.

This is an alternative to using `git config ...` or `git-credential-store` helper.

If you need to remove credentials after use you can use `git credential-cache erase` (you'll find an example in the tests) to manually remove credential pairs from the cache.

[gitcredentials]: https://git-scm.com/docs/gitcredentials
[git-credential-cache]: https://git-scm.com/docs/git-credential-cache
