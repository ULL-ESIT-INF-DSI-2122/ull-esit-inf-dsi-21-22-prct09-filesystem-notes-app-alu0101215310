/**
 * Clase TemplateMethod, representa la super clase abstracta que define
 * los métodos filter y map por defecto y reduce de forma abstracta
 */
export abstract class TemplateMethod {
  /**
   * @param list Lista de números con la que se trabajará
   */
  constructor(protected list : number[]) {};

  /**
   * @param num Número que será evaluado
   * @returns Devuelve si el número ha pasado o no la condición
   */
  private filterFunction(num : number) : boolean {
    return num > 10;
  }
  /**
   * @returns Devuelve la lista de números que han pasado el filtro
   */
  filter() : number[] {
    const filterList : number[] = [];
    this.list.forEach((num) => {
      if (this.filterFunction(num)) filterList.push(num);
    });
    return filterList;
  }

  /**
   * @param num Número que será operado
   * @returns Devuelve el número operado
   */
  private mapFunction(num : number) : number {
    return num * 10;
  }
  /**
   * @returns Devuelve una nueva lista con los números mapeados
   */
  map() {
    const mapList : number[] = [];
    this.list.forEach((num) => {
      mapList.push(this.mapFunction(num));
    });
    return mapList;
  }

  /**
   * Función abstracta que representa el método redudce()
   */
  abstract reduce() : number;
}
