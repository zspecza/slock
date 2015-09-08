
import {EventEmitter} from 'events';
import chai           from 'chai';
import asPromised     from 'chai-as-promised';
import nock           from 'nock';
import BaseAPI        from '../lib/base-api';

chai.use(asPromised);

/*
  do not attempt to use these credentials, they are fake
 */
const {expect}   = chai;
const token      = 'xoxb-9545181767-KLtao5iiYssThypRBQ5CBHeX';
const webhook    = 'https://hooks.slack.com/services/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';
const slackbot   = 'https://99anime.slack.com/services/hooks/slackbot?token=9hoUdHCcXZaxgSr8IY2512EB';
const base_token = new BaseAPI(token);
const base_hook  = new BaseAPI(webhook);
const base_bot   = new BaseAPI(slackbot);
const base_all   = new BaseAPI({ slackbot, token, webhook });

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
    let err = '[fatal] unrecognized option "banana". please specify a valid API token, slackbot URL, webhook URL or an object containing these properties.';
    expect(() => new BaseAPI('banana')).to.throw(err);
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

describe('BaseAPI object settings', () => {
  it('should throw an error if opts.token is invalid', () => {
    let err = '[fatal] "1234" is not a valid Slack API token.';
    expect(() => new BaseAPI({
      token: '1234'
    })).to.throw(err);
  });

  it('should throw an error if opts.webhook is invalid', () => {
    let err = '[fatal] "1234" is not a valid webhook URL.';
    expect(() => new BaseAPI({
      webhook: '1234'
    })).to.throw(err);
    expect(() => new BaseAPI({
      webhook: 'hooks.slack'
    })).to.throw(err.replace('1234', 'hooks.slack'));
  });

  it('should throw an error if opts.slackbot is invalid', () => {
    let err = '[fatal] "1234" is not a valid slackbot URL.';
    expect(() => new BaseAPI({
      slackbot: '1234'
    })).to.throw(err);
    expect(() => new BaseAPI({
      slackbot: 'slackbot?'
    })).to.throw(err.replace('1234', 'slackbot?'));
  });
});

describe('BaseAPI', () => {

  describe('method calling', () => {

    it('should allow you to call slack web api methods', () => {

      nock.cleanAll();
      nock('https://slack.com')
        .get(`/api/api.test?foo=bar&bar=%5B%22fizz%22%2C%22buzz%22%5D`)
        .reply(200, {
          ok: true,
          args: {
            foo: 'bar',
            bar: '["fizz","buzz"]'
          }
        });

      return expect(base_all.method('api.test', {
        foo: 'bar',
        bar: ['fizz', 'buzz']
      })).to.eventually.deep.equal({
        ok: true,
        args: {
          foo: 'bar',
          bar: '["fizz","buzz"]'
        }
      });
    });

    it('should reject when an error is returned from the api', () => {

      nock.cleanAll();
      nock('https://slack.com')
        .get(`/api/api.test?error=fake_error`)
        .reply(200, {
          ok: false,
          error: 'fake_error'
        });

      return expect(base_all.method('api.test', {
        error: 'fake_error'
      })).to.be.rejectedWith(
        '[error] the response returned with error "fake_error"'
      );
    });

  });

  describe('webhooks', () => {

    it('should allow sending messages to an incoming webhook', () => {

      let payload = {
        username: 'botty',
        text: 'hello, my name is botty!'
      };

      nock.cleanAll();
      nock('https://hooks.slack.com')
        .post(`/services/T07S5PUC9/B0A89FLF4/SIAXbUiaYuuSEY0JzW1DjAE9`, payload)
        .reply(200, 'ok');

      return expect(base_all.submit(payload))
        .to.eventually.equal('ok');
    });

    it('should error out if data is malformed or missing', () => {

      let payload = { invalid: 'data' };

      nock.cleanAll();
      nock('https://hooks.slack.com')
        .post(`/services/T07S5PUC9/B0A89FLF4/SIAXbUiaYuuSEY0JzW1DjAE9`, payload)
        .reply(500, 'No text specified');

      return expect(base_all.submit(payload)).to.be.rejectedWith(
        '[error] the response returned with error "No text specified"'
      );
    });

  });

});
