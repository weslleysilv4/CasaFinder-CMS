<p align="center">
  <a href="" rel="noopener">
 <img height="100%" src="https://utfprbg.wordpress.com/wp-content/uploads/2018/03/logo-utfpr.jpg" alt="Project logo"></a>
</p>

<h3 align="center">CMS Casafinder - BackEnd</h3>
<h4 align="center">Prof. Adriano Rivolli</h4>

<p align="center"> O objetivo deste desafio era criar um Content Manger System utilizando Template Engines, NodeJs, Cookies e Sessions, desenvolvendo todas as rotas necessários para um CRUD.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Built Using](#built_using)
- [Usage](#usage)
- [Team](#team)

## 🧐 About <a name = "about"></a>

O desafio incluiu as seguintes etapas:
- ### 1. 🔐 Sistema de Login para o Administrador de Conteúdo.
  - **Nome de Usuário e Senha Fixos**: Armazenados de forma segura em um arquivo de configuração (.env).
  - **Autenticação de Usuário**: Gerenciada via sessões.
  - **Rota de Logout**: Desconecte-se do sistema facilmente.
- ### 2. 🌐 Criação Dinâmica de Páginas.
  - **Login Necessário**: Apenas usuários logados podem criar páginas.
  - **Especificar URL e Conteúdo**: O conteúdo pode ser HTML ou estilizado com Markdown
- ### 3. ✏️ Edição do Conteúdo de uma Página.
  - **Login Necessário**: Apenas usuários logados podem editar páginas.
  - **Modificação de Conteúdo**: Usuários podem alterar o conteúdo da página, mas não a URL.
- ### 4. ❌ Exclusão de uma Página.
  - **Login Necessário**: Apenas usuários logados podem excluir páginas.
  - **Exclusão Permanente**: Tanto o conteúdo quanto a rota são removidos permanentemente.
- ### 5. 🏠 Página Inicial do Site.
  - **Acesso Público**: Não é necessário estar logado.
  - **Listagem de Páginas**: Lista todas as páginas criadas com links para acessá-las.
- ### 6. 📄 Visualizador das Páginas Criadas.
  - **Acesso Público**: Não é necessário estar logado.
  - **Visualização de Conteúdo**: Acesse o conteúdo da página via a URL definida.
- ### 7. 🌟 Recurso Extra
  - **Recurso Exclusivo da Equipe**: Cada equipe deve adicionar um recurso único para tornar seu CMS exclusivo.
  - **Exemplos**: Customização visual, upload de imagens, comentários, classificação de páginas, múltiplos administradores, uso de tags nas páginas, categorias de páginas, etc.

<div align="center">
  <img height="100%" src="https://i.imgur.com/ik9rC8z.png">
</div>

## ⛏️ Built Using <a name = "built_using"></a>

![NODEJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![EXPRESSJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)&nbsp;

## 🚀 Usage <a name="usage"></a>
Para rodar o projeto localmente, siga os seguintes passos:

1. Clone o repositório:
```bash
git clone https://github.com/weslleysilv4/cms-casafinder.git
```
2. Navegue até o diretório do projeto:
```bash
cd /cms-casafinder
```
3. Instale as dependências:
```bash
npm install
```

5. Configure o arquivo .env com as variáveis necessárias (exemplo abaixo):
```bash
ADMIN_USERNAME=seu_usuario
ADMIN_PASSWORD=sua_senha
```

5. Inicie o servidor:
```bash
npm start
```
6. Acesse o sistema em `http://localhost:3000`.

## ✍️ Team <a name = "team"></a>

- [Prof. Dr. Adriano Rivolli](mailto:rivolli@utfpr.edu.br) - Teacher
- [Leonardo Fasano](https://github.com/Fasano18) - Developer
- [Victor Gabriel Lucio](https://github.com/ieVictor) - Developr
- [Weslley silva](https://github.com/weslleysilv4) - Developer

