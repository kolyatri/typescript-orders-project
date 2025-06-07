import { Calculator } from '../calculator';
import { ConsoleLogger } from '../logger';

class DummyLogger implements ConsoleLogger {
  info() {}
  warn() {}
  error() {}
}

describe('Calculator', () => {
  it('computes total', () => {
    const calc = new Calculator(new DummyLogger());
    expect(calc.calculateTotal(5, 3)).toBe(15);
  });
});
