import { Generated, ColumnType } from 'kysely'

type TimestampType = ColumnType<Date, Date | string | undefined, Date | string>;

export interface OrdersTable {
  id: Generated<string>;
  order_number: string;
  color: string;
  wheel_type: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_cpf: string;
  payment_method: string;
  total_price: string | number;
  status: 'APROVADO' | 'REPROVADO' | 'EM_ANALISE';
  created_at: TimestampType;
  updated_at: TimestampType;
  optionals: string[];
}

export interface Database {
  orders: OrdersTable;
}
