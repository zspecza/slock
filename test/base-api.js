
import chai           from 'chai';
import {EventEmitter} from 'events';
import BaseAPI        from '../lib/base-api';

let {expect} = chai;

describe('BaseAPI class', () => {

  it('should be instance of EventEmitter', () => {
    expect(new BaseAPI('')).to.be.instanceOf(EventEmitter);
  });

  it('should throw an error if arguments are missing', () => {
    expect(() => new BaseAPI()).to.throw(
      `[fatal] missing token argument. please provide the correct options`
    );
  });

});
