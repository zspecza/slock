
// import dependencies
import Bacon       from 'baconjs';
import BaseAPI     from './base';
import RTM_EVENTS  from './rtm-events';
import WEB_METHODS from './web-methods';

export default class Slack {

  constructor(opts) {

    this.slack  = new BaseAPI(opts);
    this.events = {};

    for (let event of RTM_EVENTS) {
      Object.defineProperty(this.events, event, {
        get: Slack.getEventOfType.bind(this, event)
      });
    }

    for (let method of WEB_METHODS) {
      let name = method.name;
      let [namespace, submethod] = name.split('.');
      if (this[namespace] == null) this[namespace] = {};
      this[namespace][submethod] = opts => {
        return Bacon.fromPromise(
          this.slack.method(name, opts)
        );
      }
    }

  }

  static getEventOfType(type) {
    return Bacon
      .fromEvent(this.slack, 'message')
      .filter(event => event.type === type);
  }

  getChannelName(message) {
    if (this.slack.connection.channels != null) {
      return this.slack.connection.channels
        .filter(channel => channel.id === message.channel)
        .map(channel => channel.name)[0];
    }
  }

  getUserName(message) {
    if (this.slack.connection.users != null) {
      return this.slack.connection.users
        .filter(user => user.id === message.user)
        .map(user => user.name)[0];
    }
  }

  connect(opts) {
    return Bacon.fromPromise(this.slack.connect(opts));
  }

  send(opts) {
    return Bacon.fromCallback(::this.slack.send, opts);
  }
}
