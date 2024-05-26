
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonLib from 'sinon';

chai.use(chaiAsPromised);

export const expect = chai.expect;
export const sinon = sinonLib;
