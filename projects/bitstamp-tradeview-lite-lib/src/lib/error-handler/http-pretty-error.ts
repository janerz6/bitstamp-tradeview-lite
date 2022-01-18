export class HttpPrettyError implements Error {
  message: string;
  name: string;

  constructor(message: string, name = 'HttpPrettyError') {
    this.message = message;
    this.name = name;
  }
}
