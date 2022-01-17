# Macrometa JSC8 driver on Fastly Compute@Edge

This tutorial will demonstrate how you can use jsc8 driver with Fastly Compute edge

**Note**: Fastly Compute@Edge does not support websocket connection so you will not be able use JSC8 features such connecting to stream/collection streams.

## How to Run and Publish on Fastly Compute@Edge

> ```
> git clone git@github.com:Macrometacorp/tutorial-fastly-compute-jsc8.git
> cd tutorial-fastly-compute-jsc8
> npm install
> update `service_id` in fastly.toml file
> npm run dev
> npm run deploy
> ```

## Prerequisite for using JSC8 with Fastly Compute@Edge

1. Install below Packges

    > ```
    > npm install path-browserify
    > npm install url
    > ```

2. Add Following code snippet in webpack.config.js. This is to fix [Webpack 5 Node.js Polyfills Removed](https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-nodejs-polyfills-removed) issue

    > ```
    > resolve: {
    >    extensions: [".web.js", ".web.ts", ".js", ".ts", ".json"],
    >    fallback: {
    >        path: require.resolve("path-browserify"),
    >        url: require.resolve("url"),
    >    },
    > },
    > ```

3. Add below code snippet in fastly.toml file. This allows Fastly Compute to forward API requests from JSC8 driver to Macrometa GDN.
    > ```
    > [local_server]
    >  [local_server.backends]
    >    [local_server.backends.gdn_url]
    >      url = "https://api-gdn.paas.macrometa.io"
    > ```

## How to use JSC8

1. Create jsC8 client

    > ```
    > const jsC8 = require("jsc8")
    > jsc8Client = new jsC8({
    >    url: "https://gdn.paas.macrometa.io",
    >    fabricName: "xxxx",
    >    apiKey: "xxxx",
    >    agent: fetch,
    >    agentOptions: {
    >        backend: "gdn_url",
    >    },
    > })
    > ```
    >
    > For authentication, this tutorial uses JSC8 client's login method for but you can provide API key generated using Macrometa GDN GUI as show above.

    **Note: Please note the passing `backend` paramerter in `agentOptions` is required. Value of `backend` will be your server backend name(line 3) in above section point 3.**

2. Once you have created the jsC8 client, you will be able to use all the methods which will enable you read, write, manipulate data in Macrometa GDN.
    > Sample
    >
    > ```
    > const collectioName= "fastly_compute_tutorial"
    > await jsc8Client.hasCollection(collectionName) //Check if given collection exists or not
    > await jsc8Client.insertDocument(collectionName, content) //Insert data into collection
    > ```

## References

-   [JSC8 Driver](https://www.npmjs.com/package/jsc8)
-   [Fastly Compute@Edge JS Starter Kit](https://github.com/fastly/compute-starter-kit-javascript-default)
-   [Compute@Edge Examples](https://developer.fastly.com/solutions/examples/javascript/)
