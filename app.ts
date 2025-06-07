import { User, Product, Order, OrderStatus } from './models';
import { Repository } from './repository';
import { OrderManager } from './orderManager';
import { Calculator } from './calculator';
import { ConsoleLogger } from './logger';
import { CreditCardPayment } from './payment';
import { createOrder, createProduct, createUser } from './helpers';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const consoleLogger: ConsoleLogger = new ConsoleLogger();

const userRepository: Repository<User> = new Repository<User>();
const productRepository: Repository<Product> = new Repository<Product>();
const orderRepository: Repository<Order> = new Repository<Order>();

const usersFile = process.env.USERS_FILE || './config/users.json';
if (!process.env.USERS_FILE) {
  consoleLogger.warn(`USERS_FILE not set, using default ${usersFile}`);
}
const productsFile = process.env.PRODUCTS_FILE || './config/products.json';
if (!process.env.PRODUCTS_FILE) {
  consoleLogger.warn(`PRODUCTS_FILE not set, using default ${productsFile}`);
}

let usersData: User[] = [];
try {
  const rawUsers = fs.readFileSync(usersFile, 'utf8');
  usersData = JSON.parse(rawUsers) as User[];
  usersData.forEach((u) =>
    userRepository.addItem(createUser(u.id, u.name, u.email)),
  );
} catch (err) {
  consoleLogger.error(`Unable to load ${usersFile}: ${err}`);
}

let productsData: Product[] = [];
try {
  const rawProducts = fs.readFileSync(productsFile, 'utf8');
  productsData = JSON.parse(rawProducts) as Product[];
  productsData.forEach((p) =>
    productRepository.addItem(createProduct(p.id, p.name, p.price)),
  );
} catch (err) {
  consoleLogger.error(`Unable to load ${productsFile}: ${err}`);
}

consoleLogger.info(JSON.stringify(productRepository.getAll()));

const firstUser = userRepository.findById(0);
const firstProduct = productRepository.findById(0);
if (firstUser && firstProduct) {
  orderRepository.addItem(
    createOrder(0, firstUser, firstProduct, 2, OrderStatus.Pending),
  );
} else {
  consoleLogger.error(
    '[App] Failed to create order 0: user or product not found',
  );
}

const secondUser = userRepository.findById(0);
const secondProduct = productRepository.findById(1);
if (secondUser && secondProduct) {
  orderRepository.addItem(
    createOrder(1, secondUser, secondProduct, 1, OrderStatus.Delivered),
  );
} else {
  consoleLogger.error(
    '[App] Failed to create order 1: user or product not found',
  );
}

const orderManager: OrderManager = new OrderManager(
  orderRepository,
  consoleLogger,
);
orderManager.filterByStatus(OrderStatus.Delivered);
orderManager.updateStatus(0, OrderStatus.Delivered);

const calculator: Calculator = new Calculator(consoleLogger);

const creditCardPayment: CreditCardPayment = new CreditCardPayment(
  consoleLogger,
);
orderRepository.getAll().forEach((item) => {
  const total = calculator.calculateTotal(item.product.price, item.quantity);
  creditCardPayment.amount = total;
  creditCardPayment.processPayment();
});
