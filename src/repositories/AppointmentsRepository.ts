import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment) // Passa o model como parametro no caso Appointment
class AppointmentsRepository extends Repository<Appointment> {
  // Essa interface recebe por paramento o model do meu repositorio Repository<Appointment> no caso o Appointment
  // Aqui do extendes para o AppointmentsRepository ter acesso aos metodos, como create, remove, all que tenho acesso atraves do Repository do typeorm
  public async findByDate(date: Date): Promise<Appointment | null> {
    // Como tranformeu o meotodo findByDate em uma função assincrona este metodo sera uma promisse por este motivo uso Promise<Appointment | null> para dizer o retorno da PROMISE

    const findAppointment = await this.findOne({
      // FindOne é uma Promise o por isso uso o Async Await
      where: { date }, // Como uso short syntax ficamos como esta  where: { dateBanco : dateOqueEstou passando Nalinha 9 }
    });
    return findAppointment || null; // Se tiver o findAppointment retorna, se não retorna null
  }
}

export default AppointmentsRepository;
