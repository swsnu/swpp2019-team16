<<<<<<< HEAD
export const mockGroup = {
  groupId: 1,
  from: 'from',
  to: 'to',
};
=======
import { createMockRider, mockDriver } from './user';

export const mockGroup = {
  groupId: 1,
  driver: mockDriver,
  riders: [
    createMockRider(1, 1, 'a@gmail.com'),
    createMockRider(2, 1, 'b@gmail.com'),
    createMockRider(3, 1, 'c@gmail.com'),
  ],
  fromLocation: 'A',
  toLocation : 'B',
};
>>>>>>> feat: implement group onTaxi/goTaxi features
