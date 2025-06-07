import { ConsoleLogger } from './logger';

export class Calculator {
  private readonly consoleLogger: ConsoleLogger;

  constructor(consoleLogger: ConsoleLogger) {
    this.consoleLogger = consoleLogger;
  }

  calculateTotal(price: number, quantity: number): number {
    const result = price * quantity;
    this.consoleLogger.info(`[Calculator] calculateTotal, result: ${result}`);
    return result;
  }
}
