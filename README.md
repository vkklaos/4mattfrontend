Demo: https://4mattfrontend.vercel.app/


Como executar a aplicação
1. Baixe e instale o NPM https://nodejs.org/en/download
2. Clone o repositório: https://github.com/vkklaos/4mattfrontend
3. Abra o console na pasta do projeto
4. Execute: ‘npm install’
5. Execute: ‘npm start’
6. Pronto! D


Considerações

Meus testes

- Após alguns testes em outros monitores, percebi que a saturação está muito
alta, gerando uma diferença de cores entre telas oiled e amoled.
- A base de dados não tinha dados suficientes para criação do ‘Application spend
increase’, fiz um ajuste nos valores do mês de agosto na base de dados para
termos conteúdo que demonstrasse essa funcionalidade.
- Filtro de data e aplicação: OK
- Filtro de data e categoria: OK
- Filtro de categoria e aplicação não podem ser utilizados juntos, diminuindo a
chance de erro no código e gerando mais usabilidade com limitação dos
campos.
- Também por causa do problema de saturação, é capaz que o contraste não
esteja funcionando da maneira correta para alguém que tenha algum tipo de
daltonismo (ponto a melhorar).


UI/UX

Objetivos:
- O usuário deve permanecer no site durante horas sem desconforto visual;
- O usuário deve conseguir aplicar filtros sem qualquer esforço;
- O usuário deve conseguir obter os resultados necessários de forma visual;

Decisões:
- Natureza de cor: Fria: Trabalhando com cores frias na natureza da cor da logo
(azul - púrpura) vai permitir que o usuário encontre fácil as ações dentro da
aplicação e dar uma sensação de transparência e assertividade.
- Natureza do site: Grade: Trabalhando com design em grade nós permitimos
que o usuário tenha uma experiência familiar gerando mais conhecimento sobre
a ‘cultura da aplicação’, trazendo um sentimento de estabilidade.
- Formas: Levemente arredondadas 2.5 Como a aplicação tem como objetivo
fazer o usuário permanecer online durante algumas horas sem incômodos
visuais, as formas levemente arredondadas vão dar uma sensação de
sobriedade e familiaridade com a interface levando o layout em consideração.
- Sombras: Eixo Y com pouco desfoque: Usando a sombra somente no eixo Y
com pouco desfoque e seguindo a natureza da cor da aplicação, damos ao
usuário o sentimento de profissionalismo, pois a sombra indica que a luz vem
de cima deixando as coisas naturais ‘como ao meio dia’ e dando a sensação de
que o aplicativo é algo rotineiro.


Frontend

index.js:
- Renderiza o cliente DOM via ID #root e retorna o componente ‘App.js’.
App.js:
- Cria o tema com as predefinições de padronização, seta o contexto da
aplicação e renderiza o componente ‘ShellApp.js’;
Estruturação:
- Assets: Pasta onde ficam os recursos visuais (pngs e svgs);
- Classes: Pasta onde fica a classe que organiza e trata os dados da base;
- Context: Pasta onde fica a base em .json e o nosso contexto da aplicação;
- Views: Pasta onde fica tudo que será imprimido na tela;
- Views/ShellApp: Estrutura base da aplicação, onde engloba o cabeçalho,
navegação e layout principal;
- Views/HelloWorldPage: Página com ‘hello world’ centralizado;
- Views/Dashboard: Página inicial onde está a grade e é feita a
componentização;
- Views/Components: Pasta com os componentes que serão renderizados de
forma dinâmica;


DevOps

CRA - NPM v8.19.2 - Node v18.12.1
Pacotes e versões:

- react: 18.2.0
- react-dom: 18.2.0
- react-router-dom: 6.16.0
- react-scripts: 5.0.1
- @mantine/core: 7.0.0
- @mantine/dates: 7.0.0
- @mantine/hooks: 7.0.0
- chart.js: 4.4.0
- react-chartjs-2 5.2.0
- dayjs: 1.11.10
