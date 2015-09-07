
import chai           from 'chai';
import {EventEmitter} from 'events';
import BaseAPI        from '../lib/base-api';

const {expect}   = chai;
const token      = 'xoxb-9545181767-KLtao5iiYssThypRBQ5CBHeX';
const webhook    = 'https://hooks.slack.com/services/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';
const slackbot   = 'https://99anime.slack.com/services/hooks/slackbot?token=9hoUdHCcXZaxgSr8IY2512EB';
const base_token = new BaseAPI(token);
const base_hook  = new BaseAPI(webhook);
const base_bot   = new BaseAPI(slackbot);

describe('BaseAPI class constructor', () => {

  it('should be instance of EventEmitter', () => {
    expect(base_token).to.be.instanceOf(EventEmitter);
  });

  it('should throw an error if arguments are missing', () => {
    let err = `[fatal] missing options. please provide a token, webhook, slackbot url or settings object.`;
    expect(() => new BaseAPI()).to.throw(err);
    expect(() => new BaseAPI('')).to.throw(err);
  });

  it('should throw an error if arguments are of the wrong type', () => {
    let err = '[fatal] expected options to be of type "string" or "object", but instead got "number".';
    expect(() => new BaseAPI(5)).to.throw(err);
  });

  it('should throw an error if string arguments is not a valid URL or token and does not match expected URL types', () => {
    let err = '[fatal] the string you provided as Slack options is invalid. expected an API token, slackbot URL or incoming webhook URL, but instead got "banana"';
    expect(() => new BaseAPI('banana').to.throw(err));
  });

});

describe('BaseAPI instance', () => {
  it('should have a method for accessing slack methods', () => {
    expect(base_token).to.have.property('method').that.is.a('function');
  });

  it('should have a shorthand method for connecting to the RTM api', () => {
    expect(base_token).to.have.property('connect').that.is.a('function');
  });

  it('should have a method for sending sockets', () => {
    expect(base_token).to.have.property('send').that.is.a('function');
  });

  it('should have a method for sending incoming webhooks', () => {
    expect(base_token).to.have.property('submit').that.is.a('function');
  });

  it('should have a method for sending messages as slackbot', () => {
    expect(base_token).to.have.property('slackbot').that.is.a('function');
  });

  it('should have a method for making http requests', () => {
    expect(base_token).to.have.property('api').that.is.a('function');
  });
});

describe('BaseAPI token', () => {
  it('passed token should be set as the default token', () => {
    expect(base_token).to.have.property('defaults').that.deep.equals({
      token
    });
  });
});

describe('BaseAPI webhook', () => {
  it('passed webhook should be set as the default webhook', () => {
    expect(base_hook).to.have.property('defaults').that.deep.equals({
      webhook
    });
  });
});

describe('BaseAPI slackbot', () => {
  it('passed slackbot should be set as the default slackbot', () => {
    expect(base_bot).to.have.property('defaults').that.deep.equals({
      slackbot
    });
  });
});
