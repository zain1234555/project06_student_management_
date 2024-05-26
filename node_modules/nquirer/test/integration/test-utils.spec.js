
import { expect, sinon } from '../support/test-utils';

describe('test-utils integration tests', function() {

  it('"describe" and "it" are defined', function() {
    // if here without errors, they are defined
  });

  it('"expect" is defined', function() {
    expect(expect).to.not.be.undefined;
    expect(true).to.equal(true);
  });

  it('"sinon" is defined', function() {
    expect(sinon).to.not.be.undefined;
    const spy = sinon.spy();
    spy();
    expect(spy).to.be.calledOnce;
  });

  it('"chai-as-promised" used with expect', function() {
    expect(Promise.resolve(true)).to.eventually.equal(true);
  });

});
