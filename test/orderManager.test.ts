import { OrderManager } from '../orderManager';
import { Repository } from '../repository';
import { Order, OrderStatus } from '../models';
import { ConsoleLogger } from '../logger';

describe('OrderManager', () => {
  const logger = new ConsoleLogger();
  let repo: Repository<Order>;
  let manager: OrderManager;

  beforeEach(() => {
    repo = new Repository<Order>();
    repo.addItem({
      id: 1,
      user: { id: 1, name: 'u', email: 'u@e.com' },
      product: { id: 1, name: 'p', price: 2 },
      quantity: 1,
      status: OrderStatus.Pending,
    });
    manager = new OrderManager(repo, logger);
  });

  it('updates status of existing order', () => {
    manager.updateStatus(1, OrderStatus.Delivered);
    expect(repo.findById(1)?.status).toBe(OrderStatus.Delivered);
  });

  it('filters orders by status', () => {
    manager.updateStatus(1, OrderStatus.Shipped);
    const shipped = manager.filterByStatus(OrderStatus.Shipped);
    expect(shipped).toHaveLength(1);
  });
});
