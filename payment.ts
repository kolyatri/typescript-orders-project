import { ConsoleLogger } from "./logger";

abstract class PaymentMethod {
  protected _amount: number;
  protected readonly consoleLogger: ConsoleLogger;

  constructor(consoleLogger: ConsoleLogger) {
    this._amount = 0;
    this.consoleLogger = consoleLogger;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(amount: number) {
    if (amount > 0) this._amount = amount;
  }

  abstract processPayment(): void;
}

export class CreditCardPayment extends PaymentMethod {
  processPayment(): void {
    this.consoleLogger.log(`[CreditCardPayment] processPayment, ${this.amount}`);
  }
}

export class PayPalPayment extends PaymentMethod {
  processPayment(): void {
    this.consoleLogger.log(`[PayPalPayment] processPayment, ${this.amount}`);
  }
}
