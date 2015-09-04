import fetch, {
       Response }     from 'node-fetch';
import qs             from 'querystring';
import WebSocket      from 'ws';
import {EventEmitter} from 'events';

export default class BaseAPI extends EventEmitter {

  baseURL        = 'https://slack.com/api/';
  connection     = null;
  socketMsgId    = 0;
  callbacks      = {};
  events         = ['open', 'close', 'message', 'error'];

  constructor(opts) {
    super();
    if (opts == null) {
      throw new Error(
        '[fatal] missing token argument. please provide the correct options'
      );
    }
    if (typeof opts === 'string') {
      this.defaults = { token: opts };
    } else {
      this.defaults = opts;
    }
  }

  send(opts = {}, callback) {
    let id = opts.id || this.socketMsgId++;
    let encode = JSON.stringify({ ...opts, id });
    if (encode.length > 4000) {
      throw new Error(
        `message needs to be under 16kb. try chunking your ".send" calls.`
      );
    }
    this.ws.send(encode, callback);
    return id;
  }

  async connect(opts = {}) {
    let connection = await this.method('rtm.start', opts);
    if (connection.ok) {
      this.ws         = new WebSocket(connection.url);
      this.connection = connection;
      this.events.forEach(event => {
        this.ws.on(event, (data = null) => {
          if (event === 'message') data = JSON.parse(data);
          this.emit(event, data);
        });
      });
      return new Promise(resolve => {
        this.on('open', () => resolve(this.connection));
      });
    } else {
      return this.connection;
    }
  }

  async method(method, opts = {}) {
    opts = { ...this.defaults, ...opts };
    for (let option of Object.keys(opts)) {
      if (typeof opts[option] === 'array') {
        opts[option] = JSON.stringify(opts[option]);
      }
    }
    return (
      await this.api(`${this.baseURL + method}?${qs.stringify(opts)}`)
    );
  }

  async submit(opts = {}) {
    opts = { ...this.defaults, ...opts };
    let webhook = opts.webhook;
    delete opts.webhook;
    return (
      await this.api(webhook, {
        method: 'post',
        body: JSON.stringify(opts)
      })
    );
  }

  async api(endpoint, opts) {
    let response = await fetch(endpoint, opts || null);
    return (
      await response.json()
    );
  }

}
