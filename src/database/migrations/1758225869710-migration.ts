import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1758225869710 implements MigrationInterface {
    name = 'Migration1758225869710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "valor" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP COLUMN "preco_venda"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD "preco_venda" numeric NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "valor_total"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "valor_total" numeric NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "valor_total"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "valor_total" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP COLUMN "preco_venda"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD "preco_venda" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "valor" integer NOT NULL`);
    }

}
