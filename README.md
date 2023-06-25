# App

Gympass Mockado

# Setup

#### Execute

```sh
# run database container
$ docker compose up -d

# run the api
$ npm run dev
```

#### Run tests


```sh
# run tests
$ npm run test

# run test on watch mode
$ npm run test:watch

# run test compose
$ npm run test:compose
```


## RF (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de chek-ins realizados pelo usuário logado;
- [ ] Deve ser possível para o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível para o usuário buscar academias próximas;
- [ ] Deve ser possível para o usuário buscar academias pelo nome;
- [ ] Deve ser possível para o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RN (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validade até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores; (autorização)
- [ ] A academia só pode ser cadastrada por administradores;

## RNF (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (Json Web Token);


## Techs

- Node.js
- Fastify
- PostgreSQL
- Docker
- Vitest
- Prisma


## Design Patterns 
- Repository pattern
- Factory Pattern
- In memory test database pattern 