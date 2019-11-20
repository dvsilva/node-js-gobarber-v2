import Mail from '../../lib/Mail';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  // tarefa a ser executada quando o processo for executado
  // a ser chamado para cada envio de email
  async handle({ data }) {
    const { appointment } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      //text: 'Você tem um novo cancelamento', // para texto comum abaixo usando template engine
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "dd 'de' MMMM', às 'H:MM'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancellationMail();

// import CancellationMail from '..'
// CancellationMail.key
