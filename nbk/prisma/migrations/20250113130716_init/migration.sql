/*
  Warnings:

  - You are about to drop the `bank_operations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chart_of_accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doc_settlement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `warehouses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bank_operations" DROP CONSTRAINT "bank_operations_client_id_fkey";

-- DropForeignKey
ALTER TABLE "bank_operations" DROP CONSTRAINT "bank_operations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "chart_of_accounts" DROP CONSTRAINT "chart_of_accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_user_id_fkey";

-- DropForeignKey
ALTER TABLE "doc_settlement" DROP CONSTRAINT "doc_settlement_client_id_fkey";

-- DropForeignKey
ALTER TABLE "doc_settlement" DROP CONSTRAINT "doc_settlement_user_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_user_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_client_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_user_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_warehouse_id_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_client_id_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_warehouse_id_fkey";

-- DropForeignKey
ALTER TABLE "warehouses" DROP CONSTRAINT "warehouses_client_id_fkey";

-- DropForeignKey
ALTER TABLE "warehouses" DROP CONSTRAINT "warehouses_responsible_person_id_fkey";

-- DropForeignKey
ALTER TABLE "warehouses" DROP CONSTRAINT "warehouses_user_id_fkey";

-- DropTable
DROP TABLE "bank_operations";

-- DropTable
DROP TABLE "chart_of_accounts";

-- DropTable
DROP TABLE "clients";

-- DropTable
DROP TABLE "doc_settlement";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "purchases";

-- DropTable
DROP TABLE "sales";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "warehouses";

-- DropEnum
DROP TYPE "ClientEntityType";

-- DropEnum
DROP TYPE "ClientType";

-- DropEnum
DROP TYPE "currency";

-- DropEnum
DROP TYPE "warehouse_status";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
