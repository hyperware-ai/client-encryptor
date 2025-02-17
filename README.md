# client-api

A library for handling encryption and decryption of WebSocket data (and later HTTP) for Hyperware.

## Installation

```
npm install @hyperware-ai/client-api
```
or
```
yarn add @hyperware-ai/client-api
```

## How to use

Import and instantiate the HyperwareClientApi:

```
import HyperwareClientApi from '@hyperware-ai/client-api'
const api = new HyperwareClientApi({
  nodeId, // You should set this on the window and then pass in. See the apps_home html for an example.
  channelId, // The channel that WS messages will come over, usually the process name or ID.
  uri = 'ws://' + window.location.host,
  onMessage = () => null, // Handle WS message
  onEncryptionReady = () => null, // Called when end-to-end encryption with Hyperware is ready. Recommended to use this instead of onOpen
  onOpen = () => null, // Handle WS open
  onClose = () => null, // Handle WS close
  onError = () => null, // Handle WS error
})
```
