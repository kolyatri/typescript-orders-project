import { User, Product, Order, OrderStatus } from './models';
import { Repository } from './repository';
import { OrderManager } from './orderManager';
import { Calculator } from './calculator';
import { ConsoleLogger } from './logger';
import {CreditCardPayment} from './payment';
import { createOrder, createProduct, createUser } from './helpers';

const consoleLogger: ConsoleLogger = new ConsoleLogger();

const userRepository: Repository<User> = new Repository<User>();
const productRepository: Repository<Product> = new Repository<Product>();
const orderRepository: Repository<Order> = new Repository<Order>();

userRepository.addItem(createUser( 0, 'Nick', 'kolyatri@gmail.com' ));
productRepository.addItem(createProduct(  0,  'mouse',  1 ));
productRepository.addItem(createProduct( 1,  'keyboard',  2 ));


orderRepository.addItem(createOrder(
  0,
  userRepository.findById(0),
  productRepository.findById(0),
  2,
  OrderStatus.Pending
));
orderRepository.addItem(createOrder(
 1,
 userRepository.findById(0),
 productRepository.findById(1),
 1,
 OrderStatus.Delivered,

));

const orderManager: OrderManager = new OrderManager(orderRepository, consoleLogger);
orderManager.filterByStatus(OrderStatus.Delivered);
orderManager.updateStatus(0, OrderStatus.Delivered);

const calculator: Calculator = new Calculator(consoleLogger);

const creditCardPayment: CreditCardPayment = new CreditCardPayment(consoleLogger);
orderRepository.getAll().forEach((item) => {
  const total = calculator.calculateTotal(item.product.price, item.quantity);
  creditCardPayment.amount = total;
  creditCardPayment.processPayment();
});
