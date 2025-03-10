import forge from 'node-forge'

interface ProcessId {
  process_name: string,
  package_name: string,
  publisher_node: string,
}

const processFromString = (process: string): ProcessId => {
  const [process_name, package_name, publisher_node] = process.split(':')
  return { process_name, package_name, publisher_node }
}

function getCookie(name: string) {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length + 1)
    }
  }
}

function stringifyAndEncode(data: any) {
  const json = JSON.stringify(data)
  const encoder = new TextEncoder();
  const bytes = encoder.encode(json);
  return bytes
}

interface SendParams {
  data: any // eslint-disable-line
  channelId?: string
  encrypted?: boolean
  target?: { node: string, process: ProcessId }
}

export default class UqbarEncryptorApi {
  // 1. Generate a keypair
  nodeId?: string;
  processId: ProcessId;
  channelId: number | undefined;
  _secret: string | undefined;
  _cipher: forge.cipher.BlockCipher | undefined; // eslint-disable-line
  _decipher: forge.cipher.BlockCipher | undefined; // eslint-disable-line
  _ws: WebSocket;

  constructor({
    nodeId,
    processId,
    channelId,
    uri = `${window.location.protocol.replace('http', 'ws')}//${window.location.host}/${processId}/`,
    onMessage = () => null,
    onOpen = () => null,
    onClose = () => null,
    onError = () => null,
  }: {
    nodeId: string,
    processId: string,
    channelId?: number,
    uri?: string,
    onMessage?: (data: any, api: UqbarEncryptorApi) => void, // eslint-disable-line
    onOpen?: (ev: Event, api: UqbarEncryptorApi) => void,
    onClose?: (ev: CloseEvent) => void,
    onError?: (ev: Event) => void,
  }) {
    this._secret = undefined;
    this.processId = processFromString(processId);
    this.channelId = channelId;
    this.nodeId = nodeId;
    this._ws = new WebSocket(uri)
    this._ws.onmessage = async (ev: MessageEvent<string | Blob>) => { // eslint-disable-line
      onMessage(ev.data, this)
    }
    this._ws.onopen = (ev: Event) => {
      onOpen(ev, this)
    }
    this._ws.onclose = onClose
    this._ws.onerror = onError
  }

  // methods
  _encrypt = (_message: string) => {
    return null
  }
  _decrypt = (_dataAndNonce: Uint8Array): any => { // eslint-disable-line
  }
  send = ({ data }: SendParams) => {
    //const auth_token = getCookie(`hyperware-auth_${this.nodeId}`) // eslint-disable-line
    //const ws_auth_token = getCookie(`hyperware-ws-auth_${this.nodeId}`) // eslint-disable-line

      this._ws.send(stringifyAndEncode(
        data
      ))
  }
  fetchJson = async <T>(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<T> => {
    console.log('Fetching JSON:', input)
    const response = await fetch(input, init)
    const json: T = await (response.json() as Promise<T>)
    return json
  }
}
