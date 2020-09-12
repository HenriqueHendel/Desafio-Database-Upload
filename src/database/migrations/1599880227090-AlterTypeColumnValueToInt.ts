import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTypeColumnValueToInt1599880227090
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'transactions',
      'value',
      new TableColumn({
        name: 'value',
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'transactions',
      'value',
      new TableColumn({
        name: 'value',
        type: 'decimal',
        precision: 10,
        scale: 2,
      }),
    );
  }
}
