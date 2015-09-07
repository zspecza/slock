import chai    from 'chai';
import Slack   from '../lib';
import BaseAPI from '../lib/base-api';

const {expect} = chai;
const token    = 'xoxb-9545181767-KLtao5iiYssThypRBQ5CBHeX';

describe('SlackFRP', () => {

  it('should have an instance of BaseAPI', () => {
    expect(new Slack(token)).to.have.property('slack').that.is.instanceOf(BaseAPI);
  });

});
