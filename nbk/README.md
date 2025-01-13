# Solar Project

This project consists of two main components:
1. npmfr - The user interface of the application
2. npmfr - The backend/server-side component

## Setup

- Clone the repository
- Set up the [npmfr](https://github.com/Solarpaletten/npmfr)
- Set up the ****

## Run the npmfr project

1. Install dependencies
```
npm i
```
2. Start the project or start the project in a `dev` mode
```
npm start
```
or
```
npm run dev
```



generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DATABASE_URL")
}

model accounts {
  id          Int       @id @default(autoincrement())
  code        String    @db.VarChar(20)
  name        String    @db.VarChar(255)
  parent_code String?   @db.VarChar(20)
  is_reserve  Boolean?  @default(false)
  is_advance  Boolean?  @default(false)
  cost_center String?   @db.VarChar(50)
  user_id     Int?
  created_at  DateTime? @default(now()) @db.Timestamptz(6)
  is_active   Boolean?  @default(true)
  users       users?    @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
}

model bank_import_rules {
  id                   Int                 @id @default(autoincrement())
  name                 String              @db.VarChar(200)
  description          String?
  match_type           String?             @db.VarChar(20)
  match_description    String?
  match_counterparty   String?             @db.VarChar(200)
  match_account        String?             @db.VarChar(50)
  match_purpose        String?
  match_amount_min     Decimal?            @db.Decimal
  match_amount_max     Decimal?            @db.Decimal
  debit_account        String?             @db.VarChar(20)
  credit_account       String?             @db.VarChar(20)
  cost_center_id       Int?
  financial_article_id Int?
  is_active            Boolean?            @default(true)
  priority             Int?                @default(0)
  created_by           Int?
  created_at           DateTime?           @default(now()) @db.Timestamp(6)
  updated_at           DateTime?           @default(now()) @db.Timestamp(6)
  debit_type           String              @default("D") @db.Char(1)
  credit_type          String              @default("K") @db.Char(1)
  transaction_type     String              @default("D") @db.Char(1)
  default_currency     String?             @db.VarChar(3)
  cost_centers         cost_centers?       @relation(fields: [cost_center_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  users                users?              @relation(fields: [created_by], references: [id], onDelete: NoAction, onUpdate: NoAction)
  financial_articles   financial_articles? @relation(fields: [financial_article_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([is_active], map: "idx_bank_rules_active")
  @@index([priority], map: "idx_bank_rules_priority")
}

model bank_import_settings {
  id                  Int       @id @default(autoincrement())
  bank_code           String    @db.VarChar(20)
  bank_name           String    @db.VarChar(100)
  file_format         String    @db.VarChar(10)
  delimiter           String?   @db.VarChar(5)
  date_format         String?   @db.VarChar(20)
  decimal_separator   String?   @db.VarChar(1)
  encoding            String?   @db.VarChar(20)
  date_column         String?   @db.VarChar(50)
  amount_column       String?   @db.VarChar(50)
  currency_column     String?   @db.VarChar(50)
  description_column  String?   @db.VarChar(50)
  reference_column    String?   @db.VarChar(50)
  counterparty_column String?   @db.VarChar(50)
  account_column      String?   @db.VarChar(50)
  skip_rows           Int?      @default(0)
  default_account     String?   @db.VarChar(20)
  default_currency    String?   @db.VarChar(3)
  is_active           Boolean?  @default(true)
  created_at          DateTime? @default(now()) @db.Timestamp(6)
  updated_at          DateTime? @default(now()) @db.Timestamp(6)

  @@index([is_active, bank_code], map: "idx_bank_settings_active_code")
}

model bank_operations {
  id                     Int             @id @default(autoincrement())
  date                   DateTime        @db.Date
  type                   String          @db.VarChar(1)
  amount                 Decimal         @db.Decimal(15, 2)
  client                 String          @db.VarChar(255)
  description            String?
  account                String?         @default("271") @db.VarChar(20)
  corresponding_account  String          @db.VarChar(20)
  user_id                Int?
  created_at             DateTime?       @default(now()) @db.Timestamp(6)
  reference_number       String?         @db.VarChar(255)
  value_date             DateTime?       @db.Date
  transaction_id         String?         @db.VarChar(100)
  currency               String?         @default("EUR") @db.VarChar(3)
  counterparty_name      String?         @db.VarChar(200)
  counterparty_account   String?         @db.VarChar(50)
  counterparty_bank_code String?         @db.VarChar(20)
  purpose                String?
  document_number        String?         @db.VarChar(50)
  status                 String?         @default("new") @db.VarChar(20)
  is_processed           Boolean?        @default(false)
  general_ledger_id      Int?
  updated_at             DateTime?       @default(now()) @db.Timestamp(6)
  initial_client         String?         @db.VarChar(255)
  initial_customer_code  String?         @db.VarChar(50)
  transfer_no            String?         @db.VarChar(50)
  purpose_of_payment     String?         @db.VarChar(255)
  users                  users?          @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  general_ledger         general_ledger? @relation(fields: [general_ledger_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_bank_operations_ledger")

  @@index([date], map: "idx_bank_operations_date")
  @@index([reference_number], map: "idx_bank_operations_reference")
  @@index([status], map: "idx_bank_operations_status")
  @@index([transaction_id], map: "idx_bank_operations_transaction")
}

model chart_of_accounts {
  id           Int       @id @default(autoincrement())
  code         String    @unique(map: "uq_chart_of_accounts_code") @db.VarChar(50)
  name         String    @db.VarChar(255)
  account_type String?   @db.VarChar(50)
  parent_code  String?   @db.VarChar(50)
  is_active    Boolean?  @default(true)
  created_at   DateTime? @default(now()) @db.Timestamp(6)
  updated_at   DateTime? @default(now()) @db.Timestamp(6)

  @@index([code], map: "idx_chart_of_accounts_code")
}

model chart_of_accounts_import_history {
  id                          Int                          @id @default(autoincrement())
  template_id                 Int?
  user_id                     Int?
  file_name                   String?                      @db.VarChar(255)
  status                      String?                      @db.VarChar(50)
  error_message               String?
  created_at                  DateTime?                    @default(now()) @db.Timestamptz(6)
  chart_of_accounts_templates chart_of_accounts_templates? @relation(fields: [template_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  users                       users?                       @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
}

model chart_of_accounts_templates {
  id                               Int                                @id @default(autoincrement())
  name                             String                             @db.VarChar(100)
  description                      String?
  is_active                        Boolean?                           @default(true)
  created_at                       DateTime?                          @default(now()) @db.Timestamptz(6)
  updated_at                       DateTime?                          @default(now()) @db.Timestamptz(6)
  chart_of_accounts_import_history chart_of_accounts_import_history[]
}

model clients {
  id                                       Int              @id @default(autoincrement())
  name                                     String           @db.VarChar(100)
  email                                    String           @db.VarChar(100)
  phone                                    String?          @db.VarChar(20)
  created_at                               DateTime?        @default(now()) @db.Timestamp(6)
  updated_at                               DateTime?        @default(now()) @db.Timestamp(6)
  code                                     String?          @db.VarChar(50)
  vat_code                                 String?          @db.VarChar(50)
  user_id                                  Int
  is_main                                  Boolean?         @default(false)
  users                                    users            @relation(fields: [user_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "fk_user_id")
  doc_settlement                           doc_settlement[]
  purchases_purchases_client_idToclients   purchases[]      @relation("purchases_client_idToclients")
  purchases_purchases_supplier_idToclients purchases[]      @relation("purchases_supplier_idToclients")
  sales                                    sales[]
  warehouses                               warehouses[]

  @@index([created_at], map: "idx_clients_created_at")
}

model company_accounts {
  id           Int       @id @default(autoincrement())
  company_name String    @db.VarChar(255)
  user_id      Int
  is_active    Boolean?  @default(true)
  created_at   DateTime? @default(now()) @db.Timestamp(6)
  users        users     @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
}

model cost_centers {
  id                 Int                 @id @default(autoincrement())
  code               String              @db.VarChar(20)
  name               String              @db.VarChar(255)
  parent_id          Int?
  description        String?
  is_active          Boolean?            @default(true)
  created_by         Int?
  created_at         DateTime?           @default(now()) @db.Timestamp(6)
  bank_import_rules  bank_import_rules[]
  users              users?              @relation(fields: [created_by], references: [id], onDelete: NoAction, onUpdate: NoAction)
  cost_centers       cost_centers?       @relation("cost_centersTocost_centers", fields: [parent_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  other_cost_centers cost_centers[]      @relation("cost_centersTocost_centers")

  @@index([code], map: "idx_cost_centers_code")
}

model countries {
  id          Int     @id @default(autoincrement())
  name        String  @db.VarChar(255)
  code        String? @db.VarChar(3)
  description String?
  items       items[]
}

model currency_rates {
  id            Int       @id @default(autoincrement())
  currency_from String    @db.VarChar(3)
  currency_to   String    @db.VarChar(3)
  rate          Decimal   @db.Decimal(15, 6)
  valid_from    DateTime  @db.Date
  valid_to      DateTime? @db.Date
  is_active     Boolean?  @default(true)
  created_by    Int?
  created_at    DateTime? @default(now()) @db.Timestamp(6)
  updated_at    DateTime? @default(now()) @db.Timestamp(6)
  users         users?    @relation(fields: [created_by], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([valid_from], map: "idx_currency_rates_date")
}

model doc_settlement {
  id              Int       @id @default(autoincrement())
  document_number String    @db.VarChar(50)
  settlement_date DateTime  @db.Date
  client_id       Int?
  amount          Decimal?  @db.Decimal(15, 2)
  currency        String?   @default("EUR") @db.VarChar(3)
  status          String?   @default("pending") @db.VarChar(20)
  settlement_type String?   @db.VarChar(50)
  notes           String?
  created_by      Int?
  created_at      DateTime? @default(now()) @db.Timestamp(6)
  clients         clients?  @relation(fields: [client_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  users           users?    @relation(fields: [created_by], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([settlement_date], map: "idx_doc_settlement_date")
}

model employees {
  id                                 Int       @id @default(autoincrement())
  ref_user_id                        Int?
  position                           String?   @db.VarChar(100)
  hire_date                          DateTime? @db.Date
  salary_rate                        Decimal?  @db.Decimal(10, 2)
  currency                           String?   @default("EUR") @db.VarChar(3)
  tax_rate                           Decimal?  @db.Decimal(5, 2)
  insurance_rate                     Decimal?  @db.Decimal(5, 2)
  status                             String?   @default("active") @db.VarChar(50)
  created_at                         DateTime? @default(now()) @db.Timestamp(6)
  updated_at                         DateTime? @default(now()) @db.Timestamp(6)
  user_id                            Int?
  users_employees_ref_user_idTousers users?    @relation("employees_ref_user_idTousers", fields: [ref_user_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "employees_user_id_fkey")
  users_employees_user_idTousers     users?    @relation("employees_user_idTousers", fields: [user_id], references: [id], onDelete: Cascade, map: "fk_user_id")
  payroll                            payroll[]
}

model financial_articles {
  id                       Int                  @id @default(autoincrement())
  code                     String               @db.VarChar(20)
  name                     String               @db.VarChar(255)
  type                     String?              @db.VarChar(50)
  parent_id                Int?
  description              String?
  is_active                Boolean?             @default(true)
  created_at               DateTime?            @default(now()) @db.Timestamp(6)
  bank_import_rules        bank_import_rules[]
  financial_articles       financial_articles?  @relation("financial_articlesTofinancial_articles", fields: [parent_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  other_financial_articles financial_articles[] @relation("financial_articlesTofinancial_articles")
}

model general_ledger {
  id               Int               @id @default(autoincrement())
  account_id       Int?
  transaction_date DateTime          @db.Date
  document_id      Int?
  document_type    String?           @db.VarChar(50)
  debit_amount     Decimal?          @default(0) @db.Decimal(15, 2)
  credit_amount    Decimal?          @default(0) @db.Decimal(15, 2)
  balance          Decimal?          @db.Decimal(15, 2)
  currency         String?           @default("EUR") @db.VarChar(3)
  created_at       DateTime?         @default(now()) @db.Timestamp(6)
  bank_operations  bank_operations[]

  @@index([account_id], map: "idx_general_ledger_account")
  @@index([transaction_date], map: "idx_general_ledger_date")
}

model general_register {
  id              Int       @id @default(autoincrement())
  document_number String    @db.VarChar(50)
  document_date   DateTime  @db.Date
  document_type   String    @db.VarChar(50)
  description     String?
  debit_amount    Decimal?  @db.Decimal(15, 2)
  credit_amount   Decimal?  @db.Decimal(15, 2)
  currency        String?   @default("EUR") @db.VarChar(3)
  created_by      Int?
  created_at      DateTime? @default(now()) @db.Timestamp(6)
  updated_at      DateTime? @default(now()) @db.Timestamp(6)
  users           users?    @relation(fields: [created_by], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([document_date], map: "idx_general_register_date")
}

model item_attributes {
  id          Int     @id @default(autoincrement())
  name        String  @db.VarChar(255)
  description String?
  items       items[]
}

model item_groups {
  id                Int           @id @default(autoincrement())
  name              String        @db.VarChar(255)
  parent_group_id   Int?
  created_at        DateTime?     @default(now()) @db.Timestamp(6)
  updated_at        DateTime?     @default(now()) @db.Timestamp(6)
  is_active         Boolean?      @default(true)
  sort_order        Int?
  group_code        String?       @db.VarChar(50)
  item_groups       item_groups?  @relation("item_groupsToitem_groups", fields: [parent_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  other_item_groups item_groups[] @relation("item_groupsToitem_groups")
  items             items[]

  @@index([name], map: "idx_itemgroups_name")
  @@index([parent_group_id], map: "idx_itemgroups_parent")
}

model item_price_history {
  id                Int       @id @default(autoincrement())
  item_id           Int?
  price_date        DateTime? @db.Timestamp(6)
  price_without_vat Decimal?  @db.Decimal(15, 2)
  price_with_vat    Decimal?  @db.Decimal(15, 2)
  created_at        DateTime? @default(now()) @db.Timestamp(6)
  created_by        Int?
  items             items?    @relation(fields: [item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([price_date], map: "idx_pricehistory_date")
  @@index([item_id], map: "idx_pricehistory_item")
}

model item_units {
  id          Int      @id @default(autoincrement())
  item_id     Int?
  unit_id     Int?
  coefficient Decimal? @db.Decimal(15, 5)
  is_default  Boolean? @default(false)
  items       items?   @relation(fields: [item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  units       units?   @relation(fields: [unit_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@unique([item_id, unit_id])
}

model items {
  id                    Int                  @id @default(autoincrement())
  name                  String               @db.VarChar(255)
  code                  String?              @db.VarChar(50)
  item_attribute_id     Int?
  group_id              Int?
  unit_id               Int
  price_without_vat     Decimal?             @db.Decimal(15, 2)
  price_with_vat        Decimal?             @db.Decimal(15, 2)
  vat_rate_id           Int?
  min_quantity          Decimal?             @db.Decimal(15, 3)
  manufacturer_id       Int?
  country_of_origin_id  Int?
  net_weight            Decimal?             @db.Decimal(15, 3)
  gross_weight          Decimal?             @db.Decimal(15, 3)
  cost                  Decimal?             @db.Decimal(15, 2)
  stock_quantity        Decimal?             @db.Decimal(15, 3)
  description           String?
  created_at            DateTime?            @default(now()) @db.Timestamp(6)
  updated_at            DateTime?            @default(now()) @db.Timestamp(6)
  is_active             Boolean?             @default(true)
  sku                   String?              @db.VarChar(50)
  barcode               String?              @db.VarChar(50)
  reorder_point         Decimal?             @db.Decimal(15, 3)
  max_stock             Decimal?             @db.Decimal(15, 3)
  last_purchase_price   Decimal?             @db.Decimal(15, 2)
  last_purchase_date    DateTime?            @db.Timestamp(6)
  last_sale_date        DateTime?            @db.Timestamp(6)
  customs_tariff_number String?              @db.VarChar(50)
  warranty_months       Int?
  shelf_life_days       Int?
  item_price_history    item_price_history[]
  item_units            item_units[]
  countries             countries?           @relation(fields: [country_of_origin_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  item_groups           item_groups?         @relation(fields: [group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  item_attributes       item_attributes?     @relation(fields: [item_attribute_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  manufacturers         manufacturers?       @relation(fields: [manufacturer_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  units                 units                @relation(fields: [unit_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  vat_rates             vat_rates?           @relation(fields: [vat_rate_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([code], map: "idx_items_code")
  @@index([group_id, manufacturer_id, country_of_origin_id], map: "idx_items_common")
  @@index([group_id], map: "idx_items_group")
  @@index([name], map: "idx_items_name")
}

model manufacturers {
  id           Int       @id @default(autoincrement())
  name         String    @db.VarChar(255)
  description  String?
  contact_info String?
  created_at   DateTime? @default(now()) @db.Timestamp(6)
  updated_at   DateTime? @default(now()) @db.Timestamp(6)
  is_active    Boolean?  @default(true)
  website      String?   @db.VarChar(255)
  email        String?   @db.VarChar(255)
  phone        String?   @db.VarChar(50)
  address      String?
  items        items[]

  @@index([name], map: "idx_manufacturers_name")
}

model payroll {
  id                              Int             @id @default(autoincrement())
  employee_id                     Int?
  period_start                    DateTime?       @db.Date
  period_end                      DateTime?       @db.Date
  base_salary                     Decimal?        @db.Decimal(10, 2)
  bonus                           Decimal?        @default(0) @db.Decimal(10, 2)
  overtime_hours                  Int?            @default(0)
  overtime_rate                   Decimal?        @default(0) @db.Decimal(10, 2)
  gross_salary                    Decimal?        @db.Decimal(10, 2)
  tax_amount                      Decimal?        @db.Decimal(10, 2)
  insurance_amount                Decimal?        @db.Decimal(10, 2)
  net_salary                      Decimal?        @db.Decimal(10, 2)
  payment_status                  String?         @default("pending") @db.VarChar(50)
  payment_date                    DateTime?       @db.Date
  currency                        String?         @default("EUR") @db.VarChar(3)
  created_by                      Int?
  updated_by                      Int?
  created_at                      DateTime?       @default(now()) @db.Timestamp(6)
  updated_at                      DateTime?       @default(now()) @db.Timestamp(6)
  users_payroll_created_byTousers users?          @relation("payroll_created_byTousers", fields: [created_by], references: [id], onDelete: NoAction, onUpdate: NoAction)
  employees                       employees?      @relation(fields: [employee_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  users_payroll_updated_byTousers users?          @relation("payroll_updated_byTousers", fields: [updated_by], references: [id], onDelete: NoAction, onUpdate: NoAction)
  payroll_items                   payroll_items[]

  @@index([employee_id], map: "idx_payroll_employee")
  @@index([period_start, period_end], map: "idx_payroll_period")
  @@index([payment_status], map: "idx_payroll_status")
}

model payroll_items {
  id          Int       @id @default(autoincrement())
  payroll_id  Int?
  type        String?   @db.VarChar(50)
  description String?
  amount      Decimal?  @db.Decimal(10, 2)
  created_at  DateTime? @default(now()) @db.Timestamp(6)
  payroll     payroll?  @relation(fields: [payroll_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([payroll_id], map: "idx_payroll_items_payroll")
}

model period_closure {
  id           Int       @id @default(autoincrement())
  period_start DateTime  @db.Date
  period_end   DateTime  @db.Date
  status       String?   @default("open") @db.VarChar(20)
  closed_by    Int?
  closed_at    DateTime? @db.Timestamp(6)
  notes        String?
  created_at   DateTime? @default(now()) @db.Timestamp(6)
  users        users?    @relation(fields: [closed_by], references: [id], onDelete: NoAction, onUpdate: NoAction)
}

model products {
  id         Int       @id(map: "product_pkey") @default(autoincrement())
  code       String    @unique(map: "product_code_key") @db.VarChar(50)
  name       String    @db.VarChar(255)
  unit       String?   @db.VarChar(10)
  created_at DateTime? @default(now()) @db.Timestamp(6)
  updated_at DateTime? @default(now()) @db.Timestamp(6)
}

model purchases {
  id                                     Int        @id @default(autoincrement())
  warehouse_id                           Int
  client_id                              Int
  purchase_date                          DateTime   @default(now()) @db.Date
  invoice_type                           String     @db.VarChar(50)
  invoice_number                         String     @db.VarChar(50)
  currency                               String     @db.VarChar(3)
  vat_rate                               Decimal?   @db.Decimal(5, 2)
  supplier_id                            Int
  products                               Json
  created_at                             DateTime   @default(now()) @db.Timestamp(6)
  total_amount                           Decimal    @default(0) @db.Decimal(10, 2)
  vat_amount                             Decimal?   @default(0.00) @db.Decimal(10, 2)
  user_id                                Int?
  updated_at                             DateTime?  @default(now()) @db.Timestamp(6)
  clients_purchases_client_idToclients   clients    @relation("purchases_client_idToclients", fields: [client_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "fk_client")
  users                                  users?     @relation(fields: [user_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "fk_user_id")
  warehouses                             warehouses @relation(fields: [warehouse_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_warehouses")
  clients_purchases_supplier_idToclients clients    @relation("purchases_supplier_idToclients", fields: [supplier_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([created_at], map: "idx_purchases_created_at")
}

model sales {
  id             Int        @id @default(autoincrement())
  warehouse_id   Int
  client_id      Int
  sale_date      DateTime   @default(now()) @db.Date
  invoice_type   String     @db.VarChar(50)
  invoice_number String     @db.VarChar(50)
  currency       String     @db.VarChar(3)
  vat_rate       Decimal?   @db.Decimal(5, 2)
  buyer_id       Int
  products       Json
  created_at     DateTime   @default(now()) @db.Timestamp(6)
  total_amount   Decimal    @default(0) @db.Decimal(10, 2)
  vat_amount     Decimal?   @default(0.00) @db.Decimal(10, 2)
  user_id        Int?
  updated_at     DateTime?  @default(now()) @db.Timestamp(6)
  clients        clients    @relation(fields: [client_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "fk_buyer")
  users          users?     @relation(fields: [user_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "fk_user_id")
  warehouses     warehouses @relation(fields: [warehouse_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_warehouses")

  @@index([created_at], map: "idx_sales_created_at")
}

model units {
  id          Int          @id @default(autoincrement())
  name        String       @db.VarChar(100)
  short_name  String?      @db.VarChar(10)
  description String?
  item_units  item_units[]
  items       items[]

  @@index([name], map: "idx_units_name")
  @@index([short_name], map: "idx_units_shortname")
}

model users {
  id                                                 Int                                @id @default(autoincrement())
  email                                              String                             @unique @db.VarChar(255)
  password_hash                                      String                             @db.VarChar(255)
  role                                               String?                            @default("user") @db.VarChar(50)
  created_at                                         DateTime?                          @default(now()) @db.Timestamp(6)
  last_login                                         DateTime?                          @db.Timestamp(6)
  updated_at                                         DateTime?                          @default(now()) @db.Timestamp(6)
  username                                           String                             @db.VarChar
  accounts                                           accounts[]
  bank_import_rules                                  bank_import_rules[]
  bank_operations                                    bank_operations[]
  chart_of_accounts_import_history                   chart_of_accounts_import_history[]
  clients                                            clients[]
  company_accounts                                   company_accounts[]
  cost_centers                                       cost_centers[]
  currency_rates                                     currency_rates[]
  doc_settlement                                     doc_settlement[]
  employees_employees_ref_user_idTousers             employees[]                        @relation("employees_ref_user_idTousers")
  employees_employees_user_idTousers                 employees[]                        @relation("employees_user_idTousers")
  general_register                                   general_register[]
  payroll_payroll_created_byTousers                  payroll[]                          @relation("payroll_created_byTousers")
  payroll_payroll_updated_byTousers                  payroll[]                          @relation("payroll_updated_byTousers")
  period_closure                                     period_closure[]
  purchases                                          purchases[]
  sales                                              sales[]
  warehouses_warehouses_responsible_person_idTousers warehouses[]                       @relation("warehouses_responsible_person_idTousers")
  warehouses_warehouses_user_idTousers               warehouses[]                       @relation("warehouses_user_idTousers")

  @@index([email], map: "idx_users_email")
  @@index([role], map: "idx_users_role")
}

model vat_rates {
  id          Int      @id @default(autoincrement())
  rate        Decimal  @db.Decimal(5, 2)
  description String?  @db.VarChar(255)
  is_default  Boolean? @default(false)
  items       items[]
}

model warehouses {
  id                                            Int         @id(map: "warehouse_pkey") @default(autoincrement())
  company_id                                    Int
  name                                          String      @db.VarChar(100)
  responsible_person_id                         Int
  created_at                                    DateTime?   @default(now()) @db.Timestamp(6)
  updated_at                                    DateTime?   @default(now()) @db.Timestamp(6)
  user_id                                       Int
  purchases                                     purchases[]
  sales                                         sales[]
  clients                                       clients     @relation(fields: [company_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "fk_company")
  users_warehouses_responsible_person_idTousers users       @relation("warehouses_responsible_person_idTousers", fields: [responsible_person_id], references: [id], onDelete: SetNull, onUpdate: NoAction, map: "fk_responsible_person")
  users_warehouses_user_idTousers               users       @relation("warehouses_user_idTousers", fields: [user_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "fk_user_id")
}

enum currency {
  EUR
  USD
}

enum warehouse_status {
  Active
  Inactive
}

http://localhost:3000/api/v1/

http://localhost:3000/api/v1/auth/login

http://localhost:3000/api/v1/auth/register

http://localhost:3000/api/v1/auth/logout

http://localhost:3000/api/v1/auth/refresh

http://localhost:3000/api/v1/auth/forgot-password

http://localhost:3000/api/v1/auth/reset-password