import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const EMPRESA_ID = 'emp-001';
const DIA = 24 * 60 * 60 * 1000;

function dias(offset: number): Date {
  return new Date(Date.now() + offset * DIA);
}

async function limpar(): Promise<void> {
  await prisma.resposta.deleteMany();
  await prisma.opcao.deleteMany();
  await prisma.pergunta.deleteMany();
  await prisma.pesquisa.deleteMany();
  await prisma.empresa.deleteMany();
}

async function main(): Promise<void> {
  await limpar();

  await prisma.empresa.create({
    data: { id: EMPRESA_ID, nome: 'Txai (fictícia)' },
  });

  await prisma.pesquisa.create({
    data: {
      empresaId: EMPRESA_ID,
      nome: 'Pesquisa Ativa',
      descricao: 'Pesquisa de clima no período, ativa para respostas.',
      idPublico: 'pub-ativa',
      dataLancamento: dias(-3),
      dataEncerramento: dias(30),
      estaAtiva: true,
      perguntas: {
        create: [
          {
            nome: 'Conte como foi sua experiência',
            tipo: 'texto_grande',
            respostaObrigatoria: true,
            justificarResposta: false,
            permitirOutro: false,
          },
          {
            nome: 'Qual área você mais utiliza?',
            tipo: 'multipla_escolha',
            respostaObrigatoria: false,
            justificarResposta: true,
            permitirOutro: true,
            opcoes: {
              create: [
                { texto: 'Atendimento' },
                { texto: 'Financeiro' },
                { texto: 'Suporte' },
              ],
            },
          },
          {
            nome: 'Quais benefícios você usa?',
            tipo: 'opcoes_diversas',
            respostaObrigatoria: false,
            justificarResposta: false,
            permitirOutro: true,
            opcoes: {
              create: [
                { texto: 'Vale refeição' },
                { texto: 'Plano de saúde' },
                { texto: 'Gympass' },
              ],
            },
          },
          {
            nome: 'Como você avalia o ambiente (0 a 5)?',
            tipo: 'pontuacao_0_a_5',
            respostaObrigatoria: false,
            justificarResposta: false,
            permitirOutro: false,
          },
          {
            nome: 'O quanto recomendaria a empresa (0 a 10)?',
            tipo: 'pontuacao_0_a_10',
            respostaObrigatoria: false,
            justificarResposta: false,
            permitirOutro: false,
          },
          {
            nome: 'Qual seu nível de satisfação geral?',
            tipo: 'nivel_satisfacao',
            respostaObrigatoria: false,
            justificarResposta: false,
            permitirOutro: false,
          },
          {
            nome: 'Como você percebe a qualidade dos processos?',
            tipo: 'qualidade_percebida',
            respostaObrigatoria: false,
            justificarResposta: false,
            permitirOutro: false,
          },
        ],
      },
    },
  });

  await prisma.pesquisa.create({
    data: {
      empresaId: EMPRESA_ID,
      nome: 'Pesquisa Futura',
      descricao: 'Lançamento ainda no futuro.',
      idPublico: 'pub-futura',
      dataLancamento: dias(15),
      dataEncerramento: dias(45),
      estaAtiva: true,
      perguntas: {
        create: [
          {
            nome: 'Pergunta futura',
            tipo: 'texto_grande',
            respostaObrigatoria: false,
          },
        ],
      },
    },
  });

  await prisma.pesquisa.create({
    data: {
      empresaId: EMPRESA_ID,
      nome: 'Pesquisa Encerrada',
      descricao: 'Período de respostas encerrado.',
      idPublico: 'pub-encerrada',
      dataLancamento: dias(-30),
      dataEncerramento: dias(-5),
      estaAtiva: true,
      perguntas: {
        create: [
          {
            nome: 'Pergunta encerrada',
            tipo: 'nivel_satisfacao',
            respostaObrigatoria: false,
          },
        ],
      },
    },
  });

  await prisma.pesquisa.create({
    data: {
      empresaId: EMPRESA_ID,
      nome: 'Pesquisa Inativa',
      descricao: 'Desativada manualmente.',
      idPublico: 'pub-inativa',
      dataLancamento: dias(-2),
      dataEncerramento: dias(20),
      estaAtiva: false,
      perguntas: {
        create: [
          {
            nome: 'Pergunta inativa',
            tipo: 'qualidade_percebida',
            respostaObrigatoria: false,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
