## icCube Dashboards Integration with Vue3

A working example for embedding an icCube Dashboards instance via an `iframe` or a `div` in Vue3.

This example is inspired by the React demo https://github.com/ic3-software/ic3-demo-embedded-react
that is a more complete version. Check this version for more information and better documentation.

We are not Vue.js experts be indulgent.

#### DIV Example

Notice how icCube is not reloaded when switching to the DIV page (as opposed to the iframe version).
This will give end user a better experience.

## Getting Started

Clone this Git repository.

Use `npm` to install the dependencies:

    npm install

A JetBrains IntelliJ project is available for a quick start.

The `package.json` file is containing common scripts:

    dev : start a Vite server 

### Develop

This example starts a host application `@localhost` that is embedding and driving a bunch of dashboards
available `@livedemo.icCube.com` via an HTTP proxy setup in `vite.config.js`.

```sh
npm run dev
```

### Documentation

See this [page](https://github.com/ic3-software/ic3-reporting-api/blob/main/doc/embed/Overview.md)
for a detailed documentation of the API.

- ic3 Reporting API : [link](https://github.com/ic3-software/ic3-reporting-api)
- Div/Frame Loader classes : [link](https://github.com/ic3-software/ic3-reporting-api/blob/main/src/Loader.ts)

_