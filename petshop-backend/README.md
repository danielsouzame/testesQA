# Petshop Backend – Gerenciamento de Vacinas

API REST simples para cadastro de animais, vacinas e registros de vacinação de um petshop.
Projeto **didático**: foi organizado para que os alunos escrevam **testes unitários** (Jest) com base nas regras de negócio. **Nenhum teste foi implementado** – a pasta `tests/` está vazia de propósito.

## Tecnologias

- Node.js (versão 18 ou superior)
- Express
- SQLite (via `better-sqlite3`)
- Jest e Supertest (testes)

## Pré-requisitos

- Node.js 18+ e npm instalados.

## Instalação

```bash
npm install
```

## Iniciar a aplicação

```bash
npm start
```

- Endereço da API: **http://localhost:3001/api**
- Na primeira execução o banco (`data/petshop.db`) é criado e preenchido com dados iniciais.
- Para zerar o banco e recarregar os dados iniciais: `npm run db:reset`
- Outra porta: `PORT=4000 npm start`. Outro arquivo de banco: `DB_PATH=/caminho/banco.db npm start`.

## Executar os testes

```bash
npm test
```

Como ainda não existem testes, o comando termina sem falhas. Os alunos devem criar arquivos `*.test.js` dentro de `tests/`.
Outros scripts: `npm run test:watch` e `npm run test:coverage`.

## Estrutura de pastas

```
petshop-backend/
├── src/
│   ├── controllers/    # traduzem HTTP <-> service (sem regras de negócio)
│   ├── services/       # regras que dependem do banco (RN02, RN08, RN09, RN12, RN13, RN17)
│   ├── validators/     # validações puras (RN01, RN03–RN07, RN10, RN11)
│   ├── repositories/   # acesso ao SQLite (apenas SQL)
│   ├── routes/         # definição dos endpoints
│   ├── middlewares/    # tratamento padronizado de erros
│   ├── database/       # conexão, schema, dados iniciais e reset
│   ├── utils/          # datas, texto, erros, mensagens e status da vacinação
│   ├── app.js          # monta o Express: criarApp(db)
│   └── server.js       # inicia o servidor
├── tests/              # testes dos alunos
├── data/               # arquivo do banco SQLite (gerado)
└── package.json
```

## Onde está cada regra de negócio

| Regra | Arquivo | Função |
|---|---|---|
| RN01 Nome da vacina obrigatório | `validators/vacinaValidator.js` | `validarVacina(dados)` |
| RN02 Vacina única | `validators/vacinaValidator.js` | `existeVacinaComMesmoNome(nome, vacinas, idIgnorado)` (usada em `vacinaService`) |
| RN03 Intervalo válido | `validators/vacinaValidator.js` | `validarVacina(dados)` |
| RN04 Nome do animal obrigatório | `validators/animalValidator.js` | `validarAnimal(dados, dataReferencia)` |
| RN05 Tutor obrigatório | `validators/animalValidator.js` | `validarAnimal(dados, dataReferencia)` |
| RN06 Espécie válida | `validators/animalValidator.js` | `validarAnimal(dados, dataReferencia)` |
| RN07 Nascimento não futuro | `validators/animalValidator.js` | `validarAnimal(dados, dataReferencia)` |
| RN08 Animal existente | `services/vacinacaoService.js` | `registrarVacinacao(dados)` |
| RN09 Vacina existente | `services/vacinacaoService.js` | `registrarVacinacao(dados)` |
| RN10 Data de vacinação obrigatória | `validators/vacinacaoValidator.js` | `validarRegistroVacinacao(dados)` |
| RN11 Próxima dose válida | `validators/vacinacaoValidator.js` | `validarRegistroVacinacao(dados)` |
| RN12 Vacinação duplicada | `services/vacinacaoService.js` | `registrarVacinacao(dados)` |
| RN13 Histórico do animal | `services/vacinacaoService.js` | `consultarHistoricoAnimal(animalId)` |
| RN14–RN16 Status da vacinação | `utils/statusVacinacao.js` | `calcularStatusVacinacao(dataProximaDose, dataReferencia)` |
| RN17 Exclusão protegida | `services/vacinaService.js`, `services/animalService.js` | `excluirVacina(id)` / `excluirAnimal(id)` |

## Como testar

- **Validators e utils** são funções puras. Elas lançam `ErroValidacao` (com a lista `erros`):
  `expect(() => validarVacina({ nome: '', intervalo_dias: 30 })).toThrow(ErroValidacao)`.
- **Status da vacinação** recebe a data de referência por parâmetro (sem depender do relógio).
- **Services** são criados por funções-fábrica que recebem os repositories. Podem ser testados com
  repositories falsos (`jest.fn()`) ou com banco em memória (`criarBancoEmMemoria()` em `src/database/connection.js`).
- **API**: use `supertest` com `criarApp(criarBancoEmMemoria())` (de `src/app.js`), sem abrir porta.
- As mensagens de erro estão em `src/utils/mensagens.js`; use essas constantes nas verificações.

## Formato dos dados

- Datas: texto `AAAA-MM-DD`. Espécies: `Cão`, `Gato`, `Outro`. Status: `Vencida`, `Em dia`, `Vence Hoje`.
- Ao registrar vacinação, se `data_proxima_dose` não for informada, ela é calculada como `data_vacinacao + intervalo_dias` da vacina.
- Erros: `{ "erro": "mensagem", "detalhes": [{ "campo": "...", "mensagem": "..." }] }`.

## Endpoints

| Método | Endpoint | Finalidade | Códigos |
|---|---|---|---|
| GET | `/api/vacinas` | Listar vacinas | 200 |
| GET | `/api/vacinas/:id` | Consultar vacina | 200, 404 |
| POST | `/api/vacinas` | Cadastrar vacina | 201, 400, 409 |
| PUT | `/api/vacinas/:id` | Editar vacina | 200, 400, 404, 409 |
| DELETE | `/api/vacinas/:id` | Excluir vacina | 200, 404, 409 |
| GET | `/api/animais` | Listar animais | 200 |
| GET | `/api/animais/:id` | Consultar animal | 200, 404 |
| POST | `/api/animais` | Cadastrar animal | 201, 400 |
| PUT | `/api/animais/:id` | Editar animal | 200, 400, 404 |
| DELETE | `/api/animais/:id` | Excluir animal | 200, 404, 409 |
| GET | `/api/animais/:id/vacinacoes` | Histórico do animal (com status) | 200, 404 |
| GET | `/api/vacinacoes` | Listar vacinações (com status) | 200 |
| POST | `/api/vacinacoes` | Registrar vacinação | 201, 400, 404, 409 |
| DELETE | `/api/vacinacoes/:id` | Excluir vacinação | 200, 404 |
