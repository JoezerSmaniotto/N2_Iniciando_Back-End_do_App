import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm'; // Para dizer que este Appointment esta relacionado com Uma tabela no banco de dados
// Desta forma importo uma Entity = E N T I D A D E ! ! !
// Esta me diz que vai ser algo que vai ser salvo no banco de dados

import User from './User';

// @Entity('appointments') passo o appointments q é nome da tabela
@Entity('appointments') // O decoratior funciona como se fosse uma função, e como paramentro da função ele envia a classe abaixo dele como um Paramento
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  // eslint-disable-next-line camelcase
  provider_id: string;

  // 1 - Muitos
  @ManyToOne(() => User) // Aqui coloco uma funcão que retorno o model usado, quando essa variavel for chamada
  @JoinColumn({ name: 'provider_id' }) // Aqui estou identificando qual a columa que irá identicar qual é o prestador deste agendamento
  provder: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  updated_at: Date;

  // constructor({ provider, date }: Omit<Appointment, 'id'>) { // Qunado criou uma entidade do typeorm esse constructor é criado automatico  usaremos metodos especificos do Typeorm
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
