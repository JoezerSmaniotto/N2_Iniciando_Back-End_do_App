import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; // Para dizer que este Appointment esta relacionado com Uma tabela no banco de dados
// Desta forma importo uma Entity = E N T I D A D E ! ! !
// Esta me diz que vai ser algo que vai ser salvo no banco de dados

// @Entity('appointments') passo o appointments q é nome da tabela
@Entity('appointments') // O decoratior funciona como se fosse uma função, e como paramentro da função ele envia a classe abaixo dele como um Paramento
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  updated_at: Date;
}

export default User;
