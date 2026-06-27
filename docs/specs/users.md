# Users

## Objetivo

Definir o comportamento base dos usuários da plataforma: cadastro, autenticação,
verificação de e-mail, sessões, reset de senha, atualização de dados e
desativação lógica da conta.

O mesmo usuário pode comprar ingressos e criar eventos ao preencher um perfil de
promotor. O perfil `ADMIN` é interno e usado apenas para administração da
plataforma.

## Escopo

- Cadastro com e-mail e senha.
- Login com e-mail e senha.
- Social login com Google e Facebook via NextAuth.
- Verificação de e-mail.
- Sessões persistidas em banco com JWT.
- Múltiplas sessões por usuário.
- Reset de senha.
- Bloqueio temporário após tentativas inválidas em fluxos sensíveis.
- Atualização de dados pessoais.
- Alteração de e-mail mediante nova confirmação.
- Alteração de senha.
- Desativação lógica da conta.
- Papéis `USER` e `ADMIN`.

## Fora de escopo

- Exclusão física de usuário.
- Fluxo público para criação do primeiro admin.
- Aprovação manual de usuário comum.
- MFA/2FA.
- Auditoria de login/logout/falhas.
- Gestão avançada de permissões além de `USER` e `ADMIN`.
- Vinculação avançada de providers além da vinculação automática por e-mail
  verificado.

## Entidades envolvidas

- `User`
- `Account`
- `Session`
- `VerificationToken`
- `PasswordResetToken`
- `PromoterProfile`
- `Order`
- `Ticket`
- `Event`
- `IdempotencyKey`

## Regras de negócio

1. O cadastro inicial exige nome, e-mail, telefone e senha.
2. O telefone é obrigatório para qualquer usuário da plataforma.
3. Usuários criados por social login sem telefone devem completar um segundo
   step obrigatório antes de continuar.
4. O e-mail deve ser único.
5. O documento deve ser único quando informado.
6. O campo `document` pode representar CPF ou CNPJ.
7. O usuário precisa ter e-mail verificado antes de comprar ingressos.
8. Um usuário com papel `USER` pode comprar ingressos e também criar eventos.
9. Para criar eventos, o usuário deve preencher `PromoterProfile`.
10. Para atuar como promotor, o usuário deve aceitar os termos de uso relativos a
    responsabilidades do evento e resoluções fora da plataforma quando aplicável.
11. Informações públicas do organizador devem usar `PromoterProfile.displayName`,
    não `User.name`.
12. O papel `ADMIN` é interno e deve ser atribuído manualmente no banco na
    primeira versão.
13. A exclusão de conta deve ser lógica, mantendo o registro do usuário inativo
    no banco.
14. A desativação do usuário não deve apagar pedidos, tickets, eventos,
    pagamentos, check-ins ou registros de idempotência.
15. O usuário pode editar nome, telefone, documento, e-mail e senha.
16. A alteração de e-mail só deve ser efetivada após confirmação do novo e-mail.
17. Usuários inativos não devem conseguir autenticar ou executar ações
    protegidas.
18. A autenticação deve usar NextAuth.
19. A aplicação deve manter contas, sessões e tokens no banco da aplicação.
20. Login com e-mail/senha e social login têm o mesmo peso na experiência.
21. Social login deve suportar Google e Facebook na primeira versão.
22. Usuários criados apenas via social login devem ter `passwordHash = null`.
23. Senhas devem ser armazenadas apenas como hash.
24. Senhas devem ter no mínimo 8 caracteres, 1 número e 1 caractere especial.
25. Usuário autenticado por e-mail/senha entra logado antes de verificar o
    e-mail, mas fica limitado até confirmar o endereço.
26. Usuário autenticado por social login com e-mail verificado pelo provider deve
    ser considerado com e-mail verificado.
27. Social login só pode criar ou vincular conta automaticamente quando o
    provider retornar e-mail verificado.
28. Se o Facebook não retornar e-mail ou retornar e-mail não verificado, o login
    social deve ser bloqueado e o usuário deve usar o fluxo padrão.
29. Contas com mesmo e-mail verificado devem ser vinculadas automaticamente entre
    senha, Google e Facebook.
30. Tokens sensíveis devem ser armazenados hasheados.
31. Token de verificação de e-mail deve expirar em 24 horas.
32. Reenvio de verificação de e-mail deve ser limitado a 1 solicitação por hora.
33. Sessões devem durar 30 dias.
34. O refresh token deve durar 30 dias e ser armazenado hasheado.
35. Mesmo com JWT válido, o acesso deve ser negado se a sessão não existir,
    estiver expirada ou estiver revogada no banco.
36. Logout deve limpar cookie/token e revogar a sessão no banco.
37. A aplicação deve permitir múltiplas sessões por usuário/dispositivo.
38. Qualquer fluxo sensível de auth deve bloquear temporariamente a conta na 4ª
    tentativa inválida.
39. O bloqueio temporário deve durar 2 horas.
40. Após 2 horas, o usuário pode solicitar desbloqueio via e-mail.
41. Usuário bloqueado ou inativo não deve conseguir autenticar ou executar ações
    protegidas.
42. Checkout, área do usuário, criação e gestão de eventos exigem usuário
    autenticado, ativo e com e-mail verificado.
43. Usuário autenticado sem e-mail verificado pode navegar e interagir com
    eventos até antes de prosseguir no checkout.
44. Após login, o usuário deve voltar para a última URL que exigiu autenticação;
    se não houver URL anterior, deve ir para a home.

## Fluxos principais

### Cadastro com senha

1. Usuário informa nome, e-mail, telefone e senha.
2. Sistema valida obrigatoriedade, unicidade do e-mail e força mínima da senha.
3. Sistema salva apenas o hash da senha.
4. Sistema cria o usuário com papel `USER`.
5. Sistema gera token de verificação de e-mail com expiração de 24h.
6. Sistema autentica o usuário.
7. Usuário pode navegar eventos, mas ações sensíveis ficam bloqueadas até
   confirmação do e-mail.

### Social login

1. Usuário escolhe Google ou Facebook.
2. Sistema exige e-mail verificado retornado pelo provider.
3. Se o e-mail já existir, sistema vincula automaticamente o provider à conta.
4. Se o e-mail não existir, sistema cria usuário com `passwordHash = null`.
5. Sistema preenche `emailVerifiedAt` quando o provider confirma o e-mail.
6. Se o telefone estiver ausente, usuário é enviado ao step obrigatório de
   telefone antes de continuar.
7. Após completar telefone, usuário volta para a última URL solicitada ou para a
   home.

### Verificação de e-mail

1. Sistema gera token aleatório, salva apenas o hash e define expiração de 24h.
2. Usuário recebe link por e-mail.
3. Ao confirmar, sistema define `emailVerifiedAt`.
4. Usuário pode pedir reenvio no máximo 1 vez por hora.

### Login com senha

1. Usuário informa e-mail e senha.
2. Sistema bloqueia login se usuário estiver inativo ou temporariamente
   bloqueado.
3. Sistema valida senha contra `passwordHash`.
4. Em sucesso, sistema zera tentativas inválidas, atualiza `lastLoginAt` e cria
   sessão persistida.
5. Em falha sensível, sistema incrementa tentativas inválidas.
6. Na 4ª tentativa inválida, sistema bloqueia a conta por 2 horas.

### Sessão

1. Sistema emite JWT e refresh token.
2. Sistema salva a sessão no banco.
3. A cada acesso protegido, sistema valida JWT e existência/status da sessão no
   banco.
4. Se a sessão não existir, estiver expirada ou revogada, o acesso é negado.
5. Logout limpa cookie/token e revoga a sessão.

### Reset de senha

1. Usuário solicita reset por e-mail.
2. Sistema aplica limite de tentativas dos fluxos sensíveis.
3. Sistema gera token aleatório, salva apenas o hash e envia link por e-mail.
4. Usuário informa nova senha válida.
5. Sistema atualiza `passwordHash` e invalida o token usado.

### Desbloqueio

1. Usuário bloqueado aguarda 2 horas.
2. Após esse prazo, pode solicitar desbloqueio por e-mail.
3. Sistema envia token de desbloqueio hasheado no banco.
4. Ao confirmar, sistema remove o bloqueio e zera tentativas inválidas.

### Atualização de dados

1. Usuário altera dados pessoais permitidos.
2. Sistema valida unicidade de documento quando informado.
3. Se o e-mail for alterado, o novo e-mail precisa ser confirmado.
4. Até a confirmação, o e-mail anterior deve continuar sendo a referência segura
   da conta.

### Desativação de conta

1. Usuário solicita exclusão da conta.
2. Sistema marca a conta como inativa.
3. Sistema preserva os vínculos históricos com pedidos, tickets, eventos e
   demais entidades.

## Critérios de aceite

- Deve ser possível criar usuário com nome, e-mail, telefone e senha válidos.
- Não deve ser possível cadastrar senha fraca.
- Não deve ser possível cadastrar dois usuários com o mesmo e-mail.
- Não deve ser possível cadastrar dois usuários com o mesmo documento informado.
- Usuário sem e-mail verificado deve conseguir navegar eventos.
- Usuário sem e-mail verificado não deve conseguir usar checkout, área do
  usuário, criação ou gestão de eventos.
- Usuário ativo com e-mail verificado deve conseguir comprar ingresso.
- Social login com e-mail verificado deve preencher `emailVerifiedAt`.
- Social login sem e-mail verificado deve ser bloqueado.
- Social login sem telefone deve redirecionar para step obrigatório de telefone.
- Contas com mesmo e-mail verificado devem ser vinculadas automaticamente.
- Sessão deve ser negada se estiver ausente, expirada ou revogada no banco.
- Logout deve revogar a sessão e limpar cookie/token.
- Deve ser possível manter múltiplas sessões por usuário.
- Na 4ª tentativa inválida em fluxo sensível, usuário deve ser bloqueado por 2h.
- Após 2h, usuário deve conseguir solicitar desbloqueio por e-mail.
- Reset de senha deve usar token hasheado e permitir definir nova senha válida.
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
- Rejeitar cadastro com senha fraca.
- Rejeitar e-mail duplicado.
- Rejeitar documento duplicado quando informado.
- Bloquear compra para usuário com e-mail não verificado.
- Permitir compra para usuário ativo com e-mail verificado.
- Bloquear login ou sessão de usuário inativo.
- Bloquear login de usuário temporariamente bloqueado.
- Bloquear conta na 4ª tentativa inválida em fluxo sensível.
- Permitir solicitação de desbloqueio após 2h.
- Criar sessão persistida no banco no login.
- Negar acesso com JWT válido mas sessão revogada/ausente no banco.
- Revogar sessão no logout.
- Permitir múltiplas sessões por usuário.
- Vincular provider social automaticamente por e-mail verificado.
- Bloquear social login sem e-mail ou com e-mail não verificado.
- Exigir telefone no segundo step para usuário social sem telefone.
- Hashear tokens de verificação, reset, desbloqueio e refresh.
- Expirar verificação de e-mail após 24h.
- Limitar reenvio de verificação a 1 por hora.
- Executar reset de senha com token válido e senha forte.
- Desativar usuário sem remover seus pedidos, tickets e eventos.
- Alterar e-mail mantendo a conta pendente de nova confirmação.
- Garantir que listagens públicas de eventos não exponham `User.name`.

## Decisões pendentes

- Confirmar o schema final das tabelas `Account`, `Session`,
  `VerificationToken` e `PasswordResetToken`.
- Definir se tokens de desbloqueio usam tabela própria ou tabela genérica de
  tokens.
- Definir onde registrar o aceite dos termos para criação de eventos.
