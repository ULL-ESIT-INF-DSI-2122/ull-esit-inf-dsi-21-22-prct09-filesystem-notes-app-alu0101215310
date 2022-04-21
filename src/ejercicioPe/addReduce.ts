import {TemplateMethod} from './abstract';

/**
 * Clase AddReduce, representa un ejemplo de sub clase que
 * implenta una variante del método reduce()
 */
export class AddReduce extends TemplateMethod {
  constructor(protected list : number[]) {
    super(list);
  }

  /**
   * @returns Devuelve la unificación de los elementos de la lista
   * tras ser sumados entre si
   */
  reduce(): number {
    let result : number = 0;
    this.list.forEach((num) => {
      result += num;
    });
    return result;
  }
}
