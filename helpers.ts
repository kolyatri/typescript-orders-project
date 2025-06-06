import { User, Product, Order, OrderStatus } from './models';

export function createUser(id: number, name: string, email: string): User {
  return { id, name, email };
}

export function createProduct(
  id: number,
  name: string,
  price: number,
): Product {
  return { id, name, price };
}

export function createOrder(
  id: number,
  user: User,
  product: Product,
  quantity: number,
  status: OrderStatus,
): Order {
  return { id, user, product, quantity, status };
}
