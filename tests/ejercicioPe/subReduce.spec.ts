import 'mocha';
import {assert} from 'chai';
import {SubReduce} from '../../src/ejercicioPe/subReduce';

const add = new SubReduce([1, 2, 11, 12]);
describe('SubReduce class test', () => {
  it('instanceOf SubReduce object', () => {
    assert.instanceOf(add, SubReduce);
  });
  it('return filter() function', () => {
    assert.isNotNull(add.filter());
  });
  it('return map() function', () => {
    assert.isNotNull(add.map());
  });
  it('return reduce() function', () => {
    assert.equal(add.reduce(), -26);
  });
});
