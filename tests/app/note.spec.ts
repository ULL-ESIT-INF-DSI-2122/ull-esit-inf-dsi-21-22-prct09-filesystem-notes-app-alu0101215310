import 'mocha';
import {assert} from 'chai';
import {Note} from '../../src/app/note';

const redNote = new Note('nota roja', 'soy una nota roja', 'red');
const blueNote = new Note('nota azul', 'soy una nota azul', 'blue');
const yellowNote = new Note('nota amarilla', 'soy una nota amarilla', 'yellow');
const greenNote = new Note('nota verde', 'soy una nota verde', 'green');
const blackNote = new Note('nota negra', 'soy una nota negra', 'black');

describe('Note class test', () => {
  it('instanceOf Note object', () => {
    assert.instanceOf(redNote, Note);
    assert.instanceOf(blueNote, Note);
    assert.instanceOf(yellowNote, Note);
    assert.instanceOf(greenNote, Note);
  });
  it('json() function test', () => {
    assert.typeOf(redNote.json(), 'string');
    assert.typeOf(blueNote.json(), 'string');
    assert.typeOf(yellowNote.json(), 'string');
    assert.typeOf(greenNote.json(), 'string');
    assert.typeOf(blackNote.json(), 'string');
  });
});
