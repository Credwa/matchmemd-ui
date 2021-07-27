# MatchMeMD User Interface

Figma mockup: https://www.figma.com/file/l8hHyBEiayCW4XYrJmo5r4/MatchMeMD?node-id=1%3A2
Figma low-fi designs: https://www.figma.com/file/lxl6DsHz8ocWYtqpzL5hsm/App-wireframe?node-id=0%3A1

## Project setup and usage

Install dependencies:

```
yarn
```

Run development server:

```
yarn dev
```

Open Cypress test runner:

```
yarn test
```

Run Cypress tests in headless mode:

```
yarn test:ci
```

Get `cypress open` up and running in a VS Code Devcontainer backed by WSL2 and Docker using a X11 server.
https://github.com/cypress-io/cypress-documentation/issues/2956#issuecomment-704115471

Install VcXsrv from https://sourceforge.net/projects/vcxsrv/ on the Windows host
Run VcXsrv's XLaunch program on the host. Use the default settings, but make sure to uncheck Native opengl and check Disable access control
Run cypress open in your VS Code terminal inside of the devcontainer
