const express = require('express');
const app = express();
const port = 8080;

// Rota principal com a aplicação simples
app.get('/', (req, res) => {
    // Pega o parâmetro 'busca' da URL
    const termoBusca = req.query.busca || '';

    // VULNERABILIDADE PROPOSITAL 
    // Estamos pegando o que o usuário digita e jogando direto na tela, sem limpar (sanitizar).
    // Isso cria uma falha crítica conhecida como Reflected XSS (Cross-Site Scripting).
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>ClickSeguro - Serviços</title>
        </head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Bem-vindo ao ClickSeguro</h1>
            <p>Agende seus serviços residenciais com rapidez.</p>
            
            <form method="GET" action="/">
                <label>Buscar serviço:</label>
                <input type="text" name="busca" placeholder="Ex: Encanador">
                <button type="submit">Pesquisar</button>
            </form>

            <div style="margin-top: 20px;">
                <p>Resultados para: <b>${termoBusca}</b></p>
            </div>
        </body>
        </html>
    `);
});

// Inicia o servidor na porta 8080
app.listen(port, () => {
    console.log(`Aplicação ClickSeguro rodando em http://localhost:${port}`);
});