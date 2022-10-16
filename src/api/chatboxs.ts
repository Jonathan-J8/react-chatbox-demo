import LocalStorage from '@/utils/LocalStorage';
import type { ChatboxItem } from '@/components/Chatbox/type';

const COLLECTION = 'chatboxs';
interface DB {
  userId: string;
  clientId: string;
}
interface ItemDB extends DB {
  item: ChatboxItem;
}
interface ItemsRangeDB extends DB {
  from: number;
  to: number;
  prevItem?: ChatboxItem;
}

export const getDb = ({ clientId, userId }: DB) =>
  new LocalStorage(`${COLLECTION}-${userId}-${clientId}`, { immutable: true, type: Array });

export const getItems = ({ clientId, userId }: DB) => {
  const db = getDb({ userId, clientId });
  return db.data;
};
export const getItemsLength = ({ clientId, userId }: DB) => {
  const db = getDb({ userId, clientId });
  return db.data.length;
};
export const flush = ({ clientId, userId }: DB) => {
  const db = getDb({ userId, clientId });
  db.flush();
};
export const pushItem = ({ clientId, userId, item }: ItemDB) => {
  const db = getDb({ userId, clientId });
  db.data = [item];
};
export const getItem = ({ clientId, userId, item }: ItemDB) => {
  const db = getDb({ userId, clientId });
  return db.data?.find((obj: any) => obj?.id === item.id);
};

export const getPreviousItemsFromTo = ({ clientId, userId, from, to }: ItemsRangeDB) => {
  const db = getDb({ userId, clientId });
  const itemsDB = db.data;
  return itemsDB.slice(from, to);
};

// export const getPreviousItemsFromItemRange = ({ clientId, userId, prevItem, range }: ItemsRangeDB) => {
//   // if (!prevItem) return getPreviousItemsFromRange({ clientId, userId, range });

//   const db = getDb({ userId, clientId });
//   const itemsDB = db.data;
//   const itemsFilteredByDate = itemsDB.filter((obj: any) => obj?.createdAt < prevItem?.createdAt);
//   const limit = itemsFilteredByDate.length - 1 - range;
//   const itemsFilteredByRange = itemsFilteredByDate.filter((obj: any, i: number) => i > range);
//   return itemsFilteredByRange;
// };
