import { Repository } from '../repository';

describe('Repository', () => {
  interface Item {
    id: number;
    value: string;
  }

  it('adds and retrieves item by id', () => {
    const repo = new Repository<Item>();
    const item = { id: 1, value: 'test' };
    repo.addItem(item);
    expect(repo.findById(1)).toBe(item);
  });

  it('returns undefined for missing item', () => {
    const repo = new Repository<Item>();
    expect(repo.findById(999)).toBeUndefined();
  });
});
