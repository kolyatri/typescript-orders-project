import { Repository } from '../repository';

interface Item {
  id: number;
  name: string;
}

describe('Repository', () => {
  it('adds and retrieves items', () => {
    const repo = new Repository<Item>();
    repo.addItem({ id: 1, name: 'item1' });
    expect(repo.getAll()).toHaveLength(1);
    expect(repo.findById(1)).toEqual({ id: 1, name: 'item1' });
  });

  it('removes items', () => {
    const repo = new Repository<Item>();
    repo.addItem({ id: 1, name: 'item1' });
    repo.remove(0);
    expect(repo.getAll()).toHaveLength(0);
  });
});
