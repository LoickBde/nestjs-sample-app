import { Injectable } from '@nestjs/common';

const cats = [
  { id: 1, name: 'Milo' },
  { id: 2, name: 'Felix' },
];

@Injectable()
export class CatsRepository {
  findAll() {
    return cats;
  }

  findOne(id: number) {
    return cats.find((cat) => cat.id === id);
  }
}
