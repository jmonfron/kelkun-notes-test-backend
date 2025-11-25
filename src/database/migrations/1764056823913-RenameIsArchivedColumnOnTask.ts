import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameIsArchivedColumnOnTask1764056823913 implements MigrationInterface {
    name = 'RenameIsArchivedColumnOnTask1764056823913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "isArchived" TO "is_archived"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "is_archived" TO "isArchived"`);
    }

}
