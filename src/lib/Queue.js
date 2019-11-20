import Bee from 'bee-queue';
import redisConfig from '../config/redis';
import CancellationMail from '../app/jobs/CancellationMail';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    // possui várias filas
    // cada tipo de serviço/background job vai ter sua propria fila
    // ex. e-mail de cancelamento e e-mail de recuperar senha
    this.queues = {};
    this.init();
  }

  init() {
    // pega os jobs da aplicação
    jobs.forEach(({ key, handle }) => {
      // armazenar jobs na variável this.queues
      this.queues[key] = {
        // fila que possui conexão com o banco redis para armazenar e recuperar dados
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        // método para processar o job, recebe informações para disparar o e-mail
        handle,
      };
    });
  }

  // adicionar novos trabalhos na fila para ser processado
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // pega os jobs e processa em tempo real / processando as filas
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.process(handle);
    });
  }
}

export default new Queue();
