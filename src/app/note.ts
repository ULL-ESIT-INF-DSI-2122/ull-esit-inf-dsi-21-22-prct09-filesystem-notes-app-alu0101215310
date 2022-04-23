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
