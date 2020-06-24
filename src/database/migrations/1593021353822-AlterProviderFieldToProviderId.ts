import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1593021353822
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider'); // Aqui deleta a columa

    // Aqui cria um novo columa
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true, // Aqui é para quando o prestador de serviço sai, ai fica como null
      }),
    );

    // Chave estrangeira
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider', // Nome da Chave Estrangeira
        columnNames: ['provider_id'], // coluna que vai receber a chave estrangeira
        referencedColumnNames: ['id'], // Qual o nome da coluna na tabela de usuario que vai representar, estar relacionar é ID
        referencedTableName: 'users', // Nome d atable que vai fazer referencia com esse C A M P O
        onDelete: 'SET NULL', // Se deletar o usuario que prestou o serviço fico cmm nulo.
        onUpdate: 'CASCADE', //  Se o usuario tiver o id alterado deleto
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
