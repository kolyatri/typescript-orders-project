import { Calculator } from '../calculator';
import { ConsoleLogger } from '../logger';

describe('Calculator', () => {
  it('calculates total correctly', () => {
    const logger = new ConsoleLogger();
    const calculator = new Calculator(logger);
    expect(calculator.calculateTotal(10, 3)).toBe(30);
  });
});
