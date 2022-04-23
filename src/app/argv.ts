import * as yargs from 'yargs';
import {Manager} from './manager';

/**
 * Comando para añadir una nota
 */
yargs.command({
  command: 'add',
  describe: 'add note',
  builder: {
    user: {
      describe: 'note user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
      typeof argv.body === 'string' && typeof argv.color === 'string') {
      const manager = new Manager(argv.user);
      manager.add(argv.title, argv.body, argv.color);
    }
  },
});

/**
 * Comando para modificar una nota
 */
yargs.command({
  command: 'modify',
  describe: 'modify note',
  builder: {
    user: {
      describe: 'note user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
      typeof argv.body === 'string' && typeof argv.color === 'string') {
      const manager = new Manager(argv.user);
      manager.modify(argv.title, argv.body, argv.color);
    }
  },
});

/**
 * Comando para eliminar una nota
 */
yargs.command({
  command: 'remove',
  describe: 'remove note',
  builder: {
    user: {
      describe: 'note user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const manager = new Manager(argv.user);
      manager.remove(argv.title);
    }
  },
});

/**
 * Comando para leer una nota
 */
yargs.command({
  command: 'read',
  describe: 'read note',
  builder: {
    user: {
      describe: 'note user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const manager = new Manager(argv.user);
      manager.read(argv.title);
    }
  },
});

/**
 * Comando para listar las notas de un usuario
 */
yargs.command({
  command: 'list',
  describe: 'list notes',
  builder: {
    user: {
      describe: 'note user',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const manager = new Manager(argv.user);
      manager.list();
    }
  },
});

yargs.parse();
