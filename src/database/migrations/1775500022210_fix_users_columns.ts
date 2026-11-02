import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUsersColumns1775500022210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL DEFAULT 'Unknown User'
    `);
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'PhnNo'
        ) THEN
          ALTER TABLE "users" RENAME COLUMN "PhnNo" TO "phn_no";
        END IF;

        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'isActive'
        ) THEN
          ALTER TABLE "users" RENAME COLUMN "isActive" TO "is_active";
        END IF;
      END $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" RENAME COLUMN "is_active" TO "isActive"',
    );
    await queryRunner.query(
      'ALTER TABLE "users" RENAME COLUMN "phn_no" TO "PhnNo"',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "name"');
  }
}
