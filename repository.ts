export class Repository<T extends {id: number}> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  addItem(item: T): void {
    this.items.push(item);
  }

  remove(index: number): void {
    if (index >= 0 && index < this.items.length) this.items.splice(index, 1);
  }

  getAll(): T[] {
    return this.items;
  }

  findById(id: number): T | undefined{
    return this.items.find((item) => item.id === id);
  }
}