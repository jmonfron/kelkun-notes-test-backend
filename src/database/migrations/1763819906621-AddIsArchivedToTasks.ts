import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsArchivedToTasks1763819906621 implements MigrationInterface {
    name = 'AddIsArchivedToTasks1763819906621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "isArchived" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "isArchived"`);
    }

}
