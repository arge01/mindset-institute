lint staged config
  npx mrm lint-staged

eslint config
  npx husky-init && yarn
  npx husky add .husky/pre-commit "yarn format"

  * package.josn
    "format": "yarn lint --fix",
    "format:no-path": "yarn lint:no-path --fix",
    "lint": "eslint --ext .js,.jsx ./",
    "lint:no-path": "eslint",
    "prepare": "husky install"

  * .husky
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"

    yarn format
    echo

when you create a file
  you run in 
  * yarn format