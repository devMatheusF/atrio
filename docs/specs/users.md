# Users

## Objetivo

Definir o comportamento base dos usuários da plataforma: cadastro, autenticação, verificação de e-mail, atualização de dados e desativação lógica da conta.

O mesmo usuário pode comprar ingressos e criar eventos ao preencher um perfil de promotor. O perfil `ADMIN` é interno e usado apenas para administração da plataforma.

## Escopo

- Cadastro de usuário com e-mail e senha.
- Login com e-mail e senha.
- Suporte a social login.
- Verificação de e-mail antes da compra de ingressos.
- Atualização de dados pessoais.
- Alteração de e-mail mediante nova confirmação.
- Alteração de senha.
- Desativação lógica da conta.
- Papéis `USER` e `ADMIN`.

## Fora de escopo

- Exclusão física de usuário.
- Fluxo público para criação do primeiro admin.
- Aprovação manual de usuário comum.
- Gestão avançada de permissões além de `USER` e `ADMIN`.
- Regras detalhadas de autenticação por provider social.

## Entidades envolvidas

- `User`
- `PromoterProfile`
- `Order`
- `Ticket`
- `Event`
- `IdempotencyKey`

## Regras de negócio

1. O cadastro inicial exige nome, e-mail, telefone e senha.
2. O telefone é obrigatório para qualquer usuário da plataforma.
3. O e-mail deve ser único.
4. O documento deve ser único quando informado.
5. O campo `document` pode representar CPF ou CNPJ.
6. O usuário precisa ter e-mail verificado antes de comprar ingressos.
7. Um usuário com papel `USER` pode comprar ingressos e também criar eventos.
8. Para criar eventos, o usuário deve preencher `PromoterProfile`.
9. Para atuar como promotor, o usuário deve aceitar os termos de uso relativos a responsabilidades do evento e resoluções fora da plataforma quando aplicável.
10. Informações públicas do organizador devem usar `PromoterProfile.displayName`, não `User.name`.
11. O papel `ADMIN` é interno e deve ser atribuído manualmente no banco na
primeira versão.
12. A exclusão de conta deve ser lógica, mantendo o registro do usuário inativo no banco.
13. A desativação do usuário não deve apagar pedidos, tickets, eventos,
pagamentos, check-ins ou registros de idempotência.
14. O usuário pode editar nome, telefone, documento, e-mail e senha.
15. A alteração de e-mail só deve ser efetivada após confirmação do novo e-mail.
16. Usuários inativos não devem conseguir comprar ingressos, criar eventos ou acessar áreas autenticadas.

## Fluxos principais

### Cadastro

1. Usuário informa nome, e-mail, telefone e senha.
2. Sistema valida obrigatoriedade e unicidade do e-mail.
3. Sistema cria o usuário com papel `USER`.
4. Sistema inicia o fluxo de verificação de e-mail.
5. Usuário só pode comprar ingressos após confirmar o e-mail.

### Login

1. Usuário autentica via e-mail e senha ou social login.
2. Sistema bloqueia acesso autenticado se a conta estiver inativa.
3. Sistema permite acesso conforme o papel do usuário.

### Atualização de dados

1. Usuário altera dados pessoais permitidos.
2. Sistema valida unicidade de documento quando informado.
3. Se o e-mail for alterado, o novo e-mail precisa ser confirmado.
4. Até a confirmação, o e-mail anterior deve continuar sendo a referência segura da conta.

### Desativação de conta

1. Usuário solicita exclusão da conta.
2. Sistema marca a conta como inativa.
3. Sistema preserva os vínculos históricos com pedidos, tickets, eventos e
demais entidades.

## Critérios de aceite

- Deve ser possível criar usuário com nome, e-mail, telefone e senha válidos.
- Não deve ser possível cadastrar dois usuários com o mesmo e-mail.
- Não deve ser possível cadastrar dois usuários com o mesmo documento informado.
- Usuário sem e-mail verificado não deve conseguir comprar ingresso.
- Usuário ativo com e-mail verificado deve conseguir comprar ingresso.
- Usuário `USER` deve poder se tornar promotor ao preencher `PromoterProfile`.
- Dados públicos do organizador devem exibir `PromoterProfile.displayName`.
- Usuário deve conseguir atualizar nome, telefone e documento.
- Alteração de e-mail deve exigir confirmação do novo endereço.
- Usuário deve conseguir alterar senha.
- Exclusão de conta deve apenas marcar o usuário como inativo.
- Usuário inativo não deve conseguir autenticar ou executar ações protegidas.
- Pedidos, tickets, eventos e pagamentos devem permanecer vinculados após a
  desativação do usuário.
- O primeiro `ADMIN` deve poder ser criado manualmente no banco.

## Testes críticos

- Criar usuário com payload válido.
- Rejeitar cadastro sem nome, e-mail, telefone ou senha.
- Rejeitar e-mail duplicado.
- Rejeitar documento duplicado quando informado.
- Bloquear compra para usuário com e-mail não verificado.
- Permitir compra para usuário ativo com e-mail verificado.
- Bloquear login ou sessão de usuário inativo.
- Desativar usuário sem remover seus pedidos, tickets e eventos.
- Alterar e-mail mantendo a conta pendente de nova confirmação.
- Garantir que listagens públicas de eventos não exponham `User.name`.

## Decisões pendentes

- Definir provider e modelo de implementação de autenticação.
- Definir formato de armazenamento dos campos necessários para verificação de
  e-mail.
- Atualizar o schema Prisma para incluir ao menos `active` e campos de
  verificação de e-mail.
- Definir onde registrar o aceite dos termos para criação de eventos.
