
// import dependencies
import {EventEmitter} from 'events';
import qs             from 'querystring';
import fetch,
       {Response}     from 'node-fetch';
import WebSocket      from 'ws';
import singleLine     from './utils/singleline';

const VALID_TOKEN = /^([a-z]*)\-([0-9]*)\-([0-9a-zA-Z]*)/;
const VALID_URL   = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

/**
 * @class BaseAPI
 * @classdesc provides a promise-based async API for working with Slack
 */
export default class BaseAPI extends EventEmitter {

  baseURL        = 'https://slack.com/api/';
  connection     = null;
  socketMsgId    = 0;
  callbacks      = {};
  events         = ['open', 'close', 'message', 'error'];

  /**
   * @constructs BaseAPI
   * @param {String|Object} opts - pass in a Slack API token,
   * incoming webhook URL, a slackbot URL, or an
   * object containing Slack options. Any option keys will be used
   * as the default for the key of the same name in any Slack method
   * options. The keys are named the same as they are on the Slack docs.
   */
  constructor(opts) {
    super();

    if (opts == null || !opts) {
      // bail if no options supplied. can't connect to an API without
      // access, now can we?
      throw new Error(
        singleLine`
          [fatal] missing options. please provide a token, webhook,
          slackbot url or settings object.
        `
      );
    } else if (typeof opts === 'string') {
      if (VALID_TOKEN.test(opts)) {
        // set default token if only string was supplied
        this.defaults = { token: opts };
      } else if (opts.includes('hooks.slack')) {
        // set default webhook
        this.defaults = { webhook: opts };
      } else if (opts.includes('slackbot?')) {
        this.defaults = { slackbot: opts };
      } else {
        throw new Error(
          singleLine`
            [fatal] unrecognized option "${opts}". please specify
            a valid API token, slackbot URL, webhook URL
            or an object containing these properties.
          `
        );
      }
    } else if (typeof opts === 'object') {
      this.defaults = opts;
    } else {
      throw new Error(
        singleLine`
          [fatal] expected options to be of type "string" or
          "object", but instead got "${typeof opts}".
        `
      );
    }
    validateOptions(this.defaults);
  }

  /**
   * sends a socket event with a payload to Slack's RTM API.
   * Slack requires that each event contain an ID, any responses
   * from the Slack API will contain a `reply_to` key that identifies
   * which sent message ID the response is replying to.
   * This API abstracts away the need to maintain that ID,
   * but it is returned if you need it. Overriden IDs are allowed
   * and are also returned.
   * @param  {Object} opts={} - the payload you wish to send
   * @param  {Function} callback - optional, is passed to the socket send method
   * @return {Number} - the ID of the message
   */
  send(opts = {}, callback) {
    // increment the maintained id
    let id = opts.id || this.socketMsgId++;
    // encode the payload as a JSON string
    let encode = JSON.stringify({ ...opts, id });
    // slack will bail on us if the message is > 16kb.
    if (encode.length > 4000) {
      throw new Error(
        `message needs to be under 16kb. try chunking your ".send" calls.`
      );
    }
    this.ws.send(encode, callback);
    return id;
  }

  /**
   * shorthand method that calls rtm.start and initiates
   * websocket listeners for events sent from Slack's RTM API
   * @param  {Object} opts={} options to be passed to rtm.start
   * @return {Promise} - a promise for the parsed reply from rtm.start
   */
  async connect(opts = {}) {
    // call the rtm.start method
    let connection = await this.method('rtm.start', opts);
    // if the response is ok, set up websocket stuff
    if (connection.ok) {
      this.ws         = new WebSocket(connection.url);
      this.connection = connection;
      // bind websocket events to base class
      // and emit events of the same name
      this.events.forEach(event => {
        this.ws.on(event, (data = null) => {
          // if the event is a message event, parse the
          // JSON payload before emitting from base class
          if (event === 'message') data = JSON.parse(data);
          this.emit(event, data);
        });
      });
      // only resolve once the connection has been opened
      return new Promise(resolve => {
        this.on('open', () => resolve(this.connection));
      });
    } else {
      // the response was not ok, return rejected promise
      return Promise.reject(this.connection.error);
    }
  }

  /**
   * asynchronously sends a querystring payload to the endpoint for the given
   * Slack Web API method
   * @param  {String} method - the name of the method https://api.slack.com/methods
   * @param  {Object} opts={} - the payload to send to the method
   * @return {Promise} - a promise for the parsed JSON response
   */
  async method(method, opts = {}) {
    // merge given opts with defaults
    opts = { ...this.defaults, ...opts };
    for (let option of Object.keys(opts)) {
      // if the option is an array, stringify it,
      // as slack uses a weird query string syntax
      // that mixes JSON strings
      if (typeof opts[option] === 'array') {
        opts[option] = JSON.stringify(opts[option]);
      }
    }
    return (
      await this.api(`${this.baseURL + method}?${qs.stringify(opts)}`)
    );
  }

  /**
   * sends a JSON payload to an incoming webhook URL (set as opts.webhook)
   * https://api.slack.com/incoming-webhooks
   * @param  {Object} opts={} object to be sent as the JSON payload
   * @return {Promise} the parsed JSON response
   */
  async submit(opts = {}) {
    opts = { ...this.defaults, ...opts };
    let webhook = opts.webhook;
    // delete the webhook key as Slack doesn't know WTF that is
    delete opts.webhook;
    return (
      await this.api(webhook, {
        method: 'post',
        body: JSON.stringify(opts)
      })
    );
  }

  /**
   * posts a message to slack as slackbot
   * @param  {Object} opts={} an object containing a channel
   *                          text you wish to send
   * @return {Promise} the parsed JSON response
   */
  async slackbot(opts = {}) {
    let channel = qs.stringify({
      channel: opts.channel
    });
    let url = `${this.defaults.slackbot}?${channel}`;
    return (
      await this.api(url, {
        method: 'post',
        body: opts.text
      })
    );
  }

  /**
   * sends an HTTP request and resolves to the parsed JSON
   * response
   * @param  {String} endpoint - the URL to send the request to
   * @param  {Object} opts - request options
   * @return {Promise} - the resolved & parsed JSON response
   */
  async api(endpoint, opts) {
    let response;
    try {
      response = await fetch(endpoint, opts || null);
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

}

function validateOptions(opts) {
  const invalid_token    = opts.token != null &&
                           !VALID_TOKEN.test(opts.token);
  const invalid_webhook  = opts.webhook != null &&
                           !VALID_URL.test(opts.webhook);
  const invalid_slackbot = opts.slackbot != null &&
                           !VALID_URL.test(opts.slackbot);
  if (invalid_webhook) {
    throw new Error(
      singleLine`
        [fatal] "${opts.webhook}" is not a valid webhook URL.
      `
    );
  }
  if (invalid_token) {
    throw new Error(
      singleLine`
        [fatal] "${opts.token}" is not a valid Slack API token.
      `
    );
  }
  if (invalid_slackbot) {
    throw new Error(
      singleLine`
        [fatal] "${opts.slackbot}" is not a valid slackbot URL.
      `
    );
  }
}
