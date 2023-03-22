# HubLocal Challenge

## Repositório criado para resolução do case para a vaga de desenvolvedor na HubLocal

## Explicando o case

    Implementação de um sistema que deve Logar e Criar usuários, Criar, Listar, Editar e Deletar empresas (quando o usuário estiver logado) e Criar, Listar, Editar e Deletar locais (quando o usuário estiver logado).

## Tecnologias/Ambiente

NestJS, Prisma, Postgres, Migrations, Docker, JWT para autenticação

## Como rodar na sua máquina

### Tecnologias necessárias

Node
npm
Docker
Docker-compose

### Clone o repositório

```bash
git clone https://github.com/bruch0/hubLocalBack.git
```

### Acesse o projeto pelo terminal

```bash
cd hubLocalBack
```

### Abra na sua IDE favorita

```bash
code .
```

### Instale as dependências

```bash
npm i
```

### Preencha os dados em um arquivo .env.development

```bash
DATABASE_URL=
JWT_SECRET=
PORT=
```

### Use a linha de comando para rodar os scripts

```bash
npm run db:migrate -> Roda as migrations
npm run start:dev -> Inicia o app
npm run test:cov -> Roda os testes criados com Jest e retorna a cobertura de testes
```

## Acessar documentação da API

A documentação foi feita utilizando Swagger, então é possível acessar via localhost:PORT/api.
