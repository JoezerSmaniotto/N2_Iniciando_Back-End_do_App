import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';
// import appointmentsRouter from '../routes/appointments.routes';

interface Request {
  // DTO
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async exceute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    // Apartir disto agora o appointmentsRepository tem todos os metodos, Create,Delete,... para ser executado

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked'); // Aqui não passo statusCode pq quero quer de default ele use o status 400 da classe AppError
    }

    // Cria a instancia mais não salva no banco por esta motivo tenho que usar o save() abaixo
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    // Aqui com o save() estou salvando no Banco, coisa que não acontecia  com o create, pois ele gera apenas uma instancia

    return appointment;
  }
}

export default CreateAppointmentService;
