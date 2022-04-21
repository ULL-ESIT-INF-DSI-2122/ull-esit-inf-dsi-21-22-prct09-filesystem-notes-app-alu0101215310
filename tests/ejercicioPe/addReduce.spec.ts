import 'mocha';
import {assert} from 'chai';
import {AddReduce} from '../../src/ejercicioPe/addReduce';

const add = new AddReduce([1, 2, 11, 12]);
describe('AddReduce class test', () => {
  it('instanceOf AddReduce object', () => {
    assert.instanceOf(add, AddReduce);
  });
  it('return filter() function', () => {
    assert.isNotNull(add.filter());
  });
  it('return map() function', () => {
    assert.isNotNull(add.map());
  });
  it('return reduce() function', () => {
    assert.equal(add.reduce(), 26);
  });
});
