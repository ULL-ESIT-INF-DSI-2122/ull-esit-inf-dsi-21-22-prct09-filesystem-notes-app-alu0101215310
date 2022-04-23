import * as chalk from 'chalk';
import * as fs from 'fs';
import {Note} from './note';

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

  /**
   * @method Modifica una nota existente en el sistema
   * @param title Título de la nota
   * @param body Constenido de la nota
   * @param color Color de la nota
   */
  modify(title : string, body : string, color : string) {
    if (fs.existsSync(`src/app/notes/${this.user}`)) {
      if (fs.existsSync(`src/app/notes/${this.user}/${title}.json`)) {
        const note = new Note(title, body, color);
        fs.writeFileSync(`src/app/notes/${this.user}/${title}.json`,
            note.json());
        console.log(chalk.green('Se modificó la nota correctamente'));
      } else console.log('No existe una nota con ese nombre');
    } else console.log(chalk.red('No existe registro del usuario'));
  }

  /**
   * @method Elimina una nota del sistema
   * @param title Título de la nota
   */
  remove(title : string) {
    if (fs.existsSync(`src/app/notes/${this.user}`)) {
      if (fs.existsSync(`src/app/notes/${this.user}/${title}.json`)) {
        fs.rmSync(`src/app/notes/${this.user}/${title}.json`);
        console.log(chalk.green('Se eliminó la nota correctamente'));
      } else console.log('No existe una nota con ese nombre');
    } else console.log(chalk.red('No existe registro del usuario'));
    if (fs.readdirSync(`src/app/notes/${this.user}`).length === 0) {
      fs.rmdirSync(`src/app/notes/${this.user}`);
    }
  }

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
        }
      } else console.log('No existe una nota con ese nombre');
    } else console.log(chalk.red('No existe registro del usuario'));
  }

  /**
   * @method Lista las notas del directorio del usuario
   */
  list() {
    if (fs.existsSync(`src/app/notes/${this.user}`)) {
      console.log(chalk.green(`Notas de ${this.user}`));
      fs.readdirSync(`src/app/notes/${this.user}`).forEach((file) => {
        const json =fs.readFileSync(`src/app/notes/${this.user}/${file}`);
        const note = JSON.parse(json.toString());
        switch (note.color) {
          case 'red':
            console.log(chalk.red(`${note.title}`));
            break;
          case 'blue':
            console.log(chalk.blue(`${note.title}`));
            break;
          case 'yellow':
            console.log(chalk.yellow(`${note.title}`));
            break;
          case 'green':
            console.log(chalk.green(`${note.title}`));
            break;
        }
      });
    } else console.log(chalk.red('No existe registro del usuario'));
  }
}
