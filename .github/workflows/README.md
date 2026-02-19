# Data

## Anvil Image

- `foundry-rs/foundry-toolchain@v1`
- fuente https://github.com/grossiwm/foundry-deploy-action/blob/main/action.yml


# Some learned lessons

* Using `foundryup` will collide with the already running instance of anvil that service provides. That's why we resorted to using the download.
* The download also has the advantage of happening inside the pnpm image, which saves us from the bigger install that getting pnpm would imply.
* We can get the deployed contract's address from the `out` folder, as is done currently in the action.

# Some needed improvements

* Cache the downloads, mostrly foundryup and pnpm, plus the repo dependencies.


