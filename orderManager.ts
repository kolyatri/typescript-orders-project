import { ConsoleLogger } from './logger';
import { Order, OrderStatus } from './models';
import { Repository } from './repository';

export class OrderManager {
  private orderRepository: Repository<Order>;
  private readonly consoleLogger: ConsoleLogger;

  constructor(
    orderRepository: Repository<Order>,
    consoleLogger: ConsoleLogger,
  ) {
    this.orderRepository = orderRepository;
    this.consoleLogger = consoleLogger;
  }

  filterByStatus(status: OrderStatus): Order[] {
    return this.orderRepository
      .getAll()
      .filter((item) => item.status === status);
  }

  updateStatus(id: number, status: OrderStatus): void {
    const order = this.orderRepository.findById(id);

    if (order) {
      order.status = status;
    } else {
      this.consoleLogger.log(
        `[OrderManage] UpdateStatus, Error, no order with such id`,
      );
    }
  }
}
