import 'mocha';
import {assert} from 'chai';
import {Manager} from '../../src/app/manager';

const pepeManager = new Manager('pepe');
const joseManager = new Manager('jose');

describe('Manager class test', () => {
  it('instanceOf Manager object', () => {
    assert.instanceOf(pepeManager, Manager);
    assert.instanceOf(joseManager, Manager);
  });
  it('add() function test', () => {
    assert.isNotNull(pepeManager.add('red', 'red', 'red'));
    assert.isNotNull(pepeManager.add('blue', 'blue', 'blue'));
    assert.isNotNull(pepeManager.add('yellow', 'yellow', 'yello'));
    assert.isNotNull(pepeManager.add('green', 'green', 'green'));
    assert.isNotNull(pepeManager.add('black', 'black', 'black'));
    assert.isNotNull(pepeManager.add('black', 'black', 'black'));
  });
  it('modify() function test', () => {
    assert.isNotNull(pepeManager.modify('red', 'red', 'red'));
    assert.isNotNull(pepeManager.modify('blue', 'blue', 'blue'));
    assert.isNotNull(pepeManager.modify('yellow', 'yellow', 'yellow'));
    assert.isNotNull(pepeManager.modify('green', 'green', 'green'));
    assert.isNotNull(pepeManager.modify('black', 'black', 'black'));
    assert.isNotNull(pepeManager.modify('error', 'error', 'error'));
    assert.isNotNull(joseManager.modify('error', 'error', 'error'));
  });
  it('read() function test', () => {
    assert.isNotNull(pepeManager.read('red'));
    assert.isNotNull(pepeManager.read('blue'));
    assert.isNotNull(pepeManager.read('yellow'));
    assert.isNotNull(pepeManager.read('green'));
    assert.isNotNull(pepeManager.read('black'));
    assert.isNotNull(pepeManager.read('error'));
    assert.isNotNull(joseManager.read('error'));
  });
  it('list() function test', () => {
    assert.isNotNull(pepeManager.list());
    assert.isNotNull(joseManager.list());
  });
  it('remove() function test', () => {
    assert.isNotNull(joseManager.remove('error'));
    assert.isNotNull(pepeManager.remove('error'));
    assert.isNotNull(pepeManager.remove('red'));
    assert.isNotNull(pepeManager.remove('blue'));
    assert.isNotNull(pepeManager.remove('yellow'));
    assert.isNotNull(pepeManager.remove('green'));
    assert.isNotNull(pepeManager.remove('black'));
  });
});
