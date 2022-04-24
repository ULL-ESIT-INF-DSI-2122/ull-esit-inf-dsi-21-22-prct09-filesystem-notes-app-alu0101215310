# Práctica 9 - Aplicación de procesamiento de notas de texto

El objetivo de la práctica consistirá en implementar un sistema de notas de texto. Este prmitirá a diferentes usuarios manejar sus notas mediante diferentes comandos pasados por la línea de comando.

Para conseguir esto se hara uso de las funciones de yargs, que permitirán leer los comandos pasados por el usuario. Además haremos uso del paquete chalk para mantener informado al usuario, además de para mostrar las notas por pantalla.

## Directorio notes

Existirá un directorio donde se almacenarán todas las notas del sistema, que a su vez se divirá en subdirectorios con los nombres de usuarios que tengan almacenadas notas. Estos subdirectorio contendrán un fichero json por cada una de las notas.

## Clase Note

La clase Note representará la estructura de una nota dentro del sistema. Esta estará formada por un título, un cuerpo, o dicho de otra forma, el contenido de la nota, y un color, que representará el formato con el que se le muestre al usuario por pantalla.

Además, la clase contará con un método llamado json() que devolverá la nota en un formato adecuado para que sea alamcenada en un fichero json.

```typescript
/**
 * Clase Note, representa un nota dentro del sistema
 */
export class Note {
  /**
   * @param title Título de la nota
   * @param body Contenido de la nota
   * @param color Color de la nota
   */
  constructor(private title : string,
    private body : string, private color : string) {}

  /**
   * @returns Devuelve la nota en formato json
   */
  json() {
    return `
    {
      "title": "${this.title}",
      "body": "${this.body}",
      "color": "${this.color}"
    }`;
  }
}
```

## Clase Manager

La clase manager representará el gestor del sistema que se encargará de realizar las llamadas a las funciones que se ajusten a las peticiones del usuario. Como única propiedad de la clase tendremos un string que contendrá el numbre del usuario que ejecutó el programa.

```typescript
/**
 * Clase Manager, gestiona los diferentes métodos que utilizará el sistema
 * para la gestión de notas
 */
export class Manager {
  /**
   * @param user Usuario que ejecuta el programa y además nombre del directorio
   * de notas que se analizará
   */
  constructor(private user : string) {}
}
```

Además, la clase Manager contará con las diferentes funciones de manejo de notas, las cuales se explicarán a continuación.

### Función add()

La función add() será la encargada de crear una nueva nota y almacenarla en el directorio de sus creador. Para ello en primer lugar comprobará si ya existe dicho directorio, en caso contrario lo crea. A continuación creará la nota con los datos correspondientes, siempre y cuando no exista una nota con un título igual, y la guardará en un nuevo fichero json con el formato adecuado.

```typescript
/**
   * @method Añade una nota al sistema con sus respectivos parámetros
   * @param title Título de la nota
   * @param body Constenido de la nota
   * @param color Color de la nota
   */
  add(title : string, body : string, color : string) {
    if (!fs.existsSync(`src/app/notes/${this.user}`)) {
      fs.mkdirSync(`src/app/notes/${this.user}`);
    }
    if (!fs.existsSync(`src/app/notes/${this.user}/${title}.json`)) {
      const note = new Note(title, body, color);
      fs.writeFileSync(`src/app/notes/${this.user}/${title}.json`, note.json());
      console.log(chalk.green('Se añadió la nota correctamente'));
    } else console.log(chalk.red('Ya existe una nota con ese nombre'));
  }
```

### Función modify()

La función modify() será la encargada de modificar una nota existente en el fichero. Para ello, en primer lugar deberá asegurarse de que tanto el directorio del usuario como la nota existen, ya que si no no sería posible. A continuación reescribirá la nota a modificar con los datos pertinentes.

```typescript
modify(title : string, body : string, color : string) {
    if (fs.existsSync(`src/app/notes/${this.user}`)) {
      if (fs.existsSync(`src/app/notes/${this.user}/${title}.json`)) {
        const note = new Note(title, body, color);
        fs.writeFileSync(`src/app/notes/${this.user}/${title}.json`,
            note.json());
        console.log(chalk.green('Se modificó la nota correctamente'));
      } else console.log(chalk.red('No existe una nota con ese nombre'));
    } else console.log(chalk.red('No existe registro del usuario'));
  }
```

### Función remove()

La función remove() se encargará de eliminar una nota del sistema. Para ello la nota deberá existir en el directorio del usuario que ejecuta el programa. La función simplemente eliminará el fichero json que contine la función, y en caso de ser la última del usuario, borrar el directorio de dicho usuario también.

```typescript
/**
   * @method Elimina una nota del sistema
   * @param title Título de la nota
   */
  remove(title : string) {
    if (fs.existsSync(`src/app/notes/${this.user}`)) {
      if (fs.existsSync(`src/app/notes/${this.user}/${title}.json`)) {
        fs.rmSync(`src/app/notes/${this.user}/${title}.json`);
        console.log(chalk.green('Se eliminó la nota correctamente'));
      } else console.log(chalk.red('No existe una nota con ese nombre'));
    } else console.log(chalk.red('No existe registro del usuario'));
    if (fs.existsSync(`src/app/notes/${this.user}`)) {
      if (fs.readdirSync(`src/app/notes/${this.user}`).length === 0) {
        fs.rmdirSync(`src/app/notes/${this.user}`);
      }
    }
  }
```

### Función read()

La función read() mostrará por pantalla el título y contenido, con el formato adecuado, de la nota que el usuario ha pedido. La función leera el fichero json que contiene la nota y la mostrará por pantalla con el formato addecuado metiante el uso del paquete chalk. Recordar que la nota debe existir en el directorio del usuario.

```typescript
/**
   * @method Muestra una nota del sistema
   * @param title Título de la nota
   */
  read(title : string) {
    if (fs.existsSync(`src/app/notes/${this.user}`)) {
      if (fs.existsSync(`src/app/notes/${this.user}/${title}.json`)) {
        const json =fs.readFileSync(`src/app/notes/${this.user}/${title}.json`);
        const note = JSON.parse(json.toString());
        switch (note.color) {
          case 'red':
            console.log(chalk.red(`${note.title}`));
            console.log(chalk.red(`${note.body}`));
            break;
          case 'blue':
            console.log(chalk.blue(`${note.title}`));
            console.log(chalk.blue(`${note.body}`));
            break;
          case 'yellow':
            console.log(chalk.yellow(`${note.title}`));
            console.log(chalk.yellow(`${note.body}`));
            break;
          case 'green':
            console.log(chalk.green(`${note.title}`));
            console.log(chalk.green(`${note.body}`));
            break;
          default:
            console.log(`${note.title}`);
            console.log(`${note.body}`);
            break;
        }
      } else console.log(chalk.red('No existe una nota con ese nombre'));
    } else console.log(chalk.red('No existe registro del usuario'));
  }
```

### Función list()

La función list() actuará de forma parecida a la función read(). La diferencia estaŕa en que directametne mostrará todos los títulos de todas las notas del directorio del usuario, manteniendo el formato de la nota al mostrarse por pantalla.

## Lista de comandos

Para controlar las peticiones del usuario se hará uso del paquete yargs, el cual permite leer las entradas por línea de comandos, de forma que el programa sea capaz de diferenciar los diferentes comandos, así como los diferentes parámetros que se le pasen al mismo.

Como cada uno de los diferentes comandos van a necesitar de un usuario para hacer las llamadas a las funciones de la clase gestor, el primer argumento que reciba siempre será el nombre del mismo.

### Comando add

El comando add invocará a la función add() de la clase manager, y será utilizado cuando el usuario quiera añadir una nota, por lo que necesitará que se le pase como agumentos el título de la nota, el cuerpo de la misma, y el color.

```typescript
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
```

### Comando modify

El comando modify invocará a la función modify() de la clase manager, y será utilizado cuando el usuario quiera modificar una nota, por lo que necesitará que se le pase como agumentos el título de la nota, el cuerpo modificado de la misma, y el color.

```typescript
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
```

### Comando remove

El comando remove invocará a la función remove() de la clase manager, y será utilizado cuando el usuario quiera eliminar una nota, por lo que necesitará que se le pase como agumentos el título de la nota que se quiere borrar.

```typescript
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
```

### Comando read

El comando read invocará a la función read() de la clase manager, y será utilizado cuando el usuario quiera mostrar una nota, por lo que necesitará que se le pase como agumentos el título de la nota que se quiere ver.

```typescript
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
```

### Comando list

El comando list invocará a la función list() de la clase manager, y será utilizado cuando el usuario quiera mostrar todas las notas que ha creado, por lo que bastará con pasarle el nombre del usuario.

```typescript
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
```
