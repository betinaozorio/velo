import { db } from './database';
import { Insertable } from 'kysely';
import { OrdersTable } from './schema';

export async function insertOrder(order: Insertable<OrdersTable>) {
  await db.insertInto('orders').values(order).execute();
}

export async function deleteOrderByNumber(orderNumber: string) {
  await db.deleteFrom('orders').where('order_number', '=', orderNumber).execute();
}
