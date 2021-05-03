# API-Rentx
> um projeto desenvolvido no bootcamp `Ignite` da [Rocketset](https://rocketseat.com.br), ministrado pela [Dani](https://www.linkedin.com/in/daniele-le%C3%A3o-evangelista-5540ab25/?originalSubdomain=br).

> Ao longo no desenvolvimento do projeto foram abordados `testes automatizados`, `DDD (Domain Driven Design)`, `TDD (Test Driven Development)`, `Orientação a objetos`, `Conceito de Singleton`, `Documentação`, `CI (Continuous Integration)`, `CD (Continuous Deployment)`, `Typescript`, `Docker`, `Docker Compose`

## Sobre

rentx é uma aplicação de alugel de carros, onde temos partes que são acessíveis somente por adminstradores, outra por todos ou usuários e outra somente por usuários cadastrados e que tenha feito login.

## Tenha instalado

- [ ] NodeJS
- [ ] Docker
- [ ] Docker Compose

## Como Executar o projeto

> Use um ternimal unix para executar os comandos. Todos os comandos usando `yarn` podem ser substituídos por `npm` tomando os devidos cuidados, pois pode haver pequenas diferenças.

```bash
  # clone o repositório
  git clone https://github.com/luiz21goncalves/ignite-rentx api-rentx

  # acesse o diretório do projeto
  cd api-rentx

  # instale as dependências
  yarn

  # configuração de conexão com bando de dados
  cp ormconfig.example.json ormconfig.json

  # configure as váriaveis de ambiente para rodar em ambiente de desenvolvimento
  cp .env.example .env

  # execute container do banco de dados
  docker-compose up -d

  # execute as alterações no bando de dados
  yarn typeorm migrations:run

  # popule o bando de dados
  yarn seed:admin

  # execute a aplicação
  yarn dev
```

> Para executar os testes é necessário criar uma base de dados com o nome `rentx_test`.

Você pode ver a documentação por acessando [http://localhost:3333/api-docs](http://localhost:3333/api-docs)
