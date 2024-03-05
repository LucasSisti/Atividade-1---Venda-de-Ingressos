import express from 'express';
import process from 'process';
import path from 'path';


const host = '0.0.0.0'; //O IP 0.0.0.0 representa todas as interfaces (placas de rede) do computador onde essa aplicação onde essa aplicação for executada
const porta = '3000'; //A porta identifica um programa em execução no host hospedeiro

const app = express ();

/*
app.get('/', (requisição, resposta) => {
    resposta.write('<h1>Seja bem vindo ao site de venda de ingressos </h1>');
    resposta.end();
} ); //arrow function

app.get('/index.html', (requisição, resposta) => {
    resposta.write('<h1>Essa é a tela inicial</h1>');
    resposta.end();
} );
*/

//O express oferece funcionalidades para permitir que conteúdo estático seja fornecido
app.use(express.static (path.join (process.cwd (), 'publico')));

const eventos = [
    {
        id: 1,
        nome: 'Evento 1',
        data: '10 de Março de 2024',
        local: 'Local 1',
        preco: 50.00,
        descricao: 'Descrição do Evento 1',
    },
    {
        id: 2,
        nome: 'Evento 2',
        data: '15 de Março de 2024',
        local: 'Local 2',
        preco: 40.00,
        descricao: 'Descrição do Evento 2',
    },

];

app.use(express.static(path.join(process.cwd(), 'publico')));

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'publico', 'index.html'));
});

app.get('/evento/:id', (req, res) => {
    const eventoId = parseInt(req.params.id);
    
    // Encontrar o evento com o ID correspondente
    const eventoSelecionado = eventos.find(evento => evento.id === eventoId);

    if (eventoSelecionado) {
        res.sendFile(path.join(process.cwd(), 'publico', 'DetalhesdoEvento.html'));
    } else {
        res.status(404).send('Evento não encontrado');
    }
});

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});