import { OrderManager } from '../orderManager';
import { Repository } from '../repository';
import { Order, OrderStatus, Product, User } from '../models';
import { ConsoleLogger } from '../logger';

class TestLogger implements ConsoleLogger {
  infoMessages: string[] = [];
  warnMessages: string[] = [];
  errorMessages: string[] = [];

  info(msg: string) {
    this.infoMessages.push(msg);
  }
  warn(msg: string) {
    this.warnMessages.push(msg);
  }
  error(msg: string) {
    this.errorMessages.push(msg);
  }
}

describe('OrderManager', () => {
  const user: User = { id: 1, name: 'user', email: 'u@example.com' };
  const product: Product = { id: 1, name: 'p', price: 2 };

  it('updates status when order exists', () => {
    const repo = new Repository<Order>();
    repo.addItem({
      id: 1,
      user,
      product,
      quantity: 1,
      status: OrderStatus.Pending,
    });
    const logger = new TestLogger();
    const manager = new OrderManager(repo, logger);

    manager.updateStatus(1, OrderStatus.Shipped);
    expect(repo.findById(1)?.status).toBe(OrderStatus.Shipped);
    expect(logger.errorMessages).toHaveLength(0);
  });

  it('logs error when order not found', () => {
    const repo = new Repository<Order>();
    const logger = new TestLogger();
    const manager = new OrderManager(repo, logger);

    manager.updateStatus(99, OrderStatus.Shipped);
    expect(logger.errorMessages.length).toBe(1);
  });
});
