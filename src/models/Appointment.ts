import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; // Para dizer que este Appointment esta relacionado com Uma tabela no banco de dados
// Desta forma importo uma Entity = E N T I D A D E ! ! !
// Esta me diz que vai ser algo que vai ser salvo no banco de dados

// @Entity('appointments') passo o appointments q é nome da tabela
@Entity('appointments') // O decoratior funciona como se fosse uma função, e como paramentro da função ele envia a classe abaixo dele como um Paramento
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  // constructor({ provider, date }: Omit<Appointment, 'id'>) { // Qunado criou uma entidade do typeorm esse constructor é criado automatico  usaremos metodos especificos do Typeorm
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
