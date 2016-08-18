# Example UI Integration app

*The purpose of this repository is to showcase basics of UI Integration Framework apps development to users of any programming language or technology.*

*The Implementation is purposefully simplified. If you want to bootstrap a new Egnyte UI integration in node, contact us - we're in the process of creating tools for that*

This app is available by default in all Egnyte sandbox environments in `*.qa-egnyte.com` so you can test it straight away.


## How to run my own copy

Update URLs in definition.json and index.js, run the app with node.js
```
npm install
node index.js
```

 and put a https reverse-proxy on top of it.

Then you can install its definition.json in your sandbox environment.

Don't have a sandbox? Contact us and start a partner relationship with Egnyte!


## Table of contents

 file | description
 --- | ---
 index.js | The whole back-end of this example integration. Read it line-by-line to learn about writing an integration with UI Integration Framework
 definition.json | Definition file for the app - this is what allows the app to work with Egnyte UI. This is the exact one we installed in all sandbox environments.
 public/ | Statically hosted screens for the example app. In normal circumstances these would be more advanced
 package.json | Node.js specific configuration file. It specifies dependencies etc.
 deploy.json | A file we need to deploy this repository to the sandbox you'll be working with. You can ignore it.
