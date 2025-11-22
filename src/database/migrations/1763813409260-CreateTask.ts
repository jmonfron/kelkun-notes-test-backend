import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTask1763813409260 implements MigrationInterface {
    name = 'CreateTask1763813409260'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('todo', 'in_progress', 'done')`)
      await queryRunner.query(`CREATE TABLE "task" ("created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "status" "public"."task_status_enum" NOT NULL DEFAULT 'todo', "project_id" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`)
      await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29"`)
      await queryRunner.query(`DROP TABLE "task"`)
      await queryRunner.query(`DROP TYPE "public"."task_status_enum"`)
    }

}
