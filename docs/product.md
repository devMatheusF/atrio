# Architecture

# Visão geral

O app é uma plataforma de venda de tickets para eventos cristãos. Através dele, queremos garantir a melhor experiência de compra a torná-la uma experiência de fé. Utilizaremos os melhores padrōes da web para resolver os problemas relativos a tecnologia e entregar a melhor experiência de UI e UX possível.

# Tecnologias

O app é composto pelas tecnologias: 
- Next + App Router.
- React hook form + Zod.
- Material UI + Storybook.
- Zustand

# Roteamento

Usaremos para construir as rotas o app router contido no Next. Teremos a principio esta listagem de rotas
- `/` - representado pelo arquivo `page.tsx`
- `/login`
- `/eventos`
- `/eventos/${id}`
- `/meus-eventos`
- `/meus-eventos/id`
- `/checkout`
- `/meus-pedidos`
- `/dashboard`
- `/minha-conta`


# Features

Organizando as features, temos um modelo de site de compra de tickets.
Teremos apenas 1 perfil de usuário. O mesmo usuário que pode comprar um ticket também pode criar um evento. Logo teremos user e admin (que será apenas para mim a princípio)
Cada usuário poderá:
  - Comprar tickets
    - Verificar os tickets ativos (o evento ainda acontecerá), utilizados (evento já aconteceu), todos,
    - Receber via e-mail o ticket comprado
    - Validar o ticket através de um QR Code na portaria do evento 
  - Cadastrar eventos
    - Cadastrar evento
    - Cadastrar lotes e valores de ingresso, tal como quantidade disponível
    - Excluir evento (caso nao houver nenhum ingresso comprado para o mesmo)
    - Ter o histórico dos eventos criados
    - Ter um dashboard de todos os eventos e por cada um dos eventos
    - Ter métricas das vendas
    - Verificar faturamento
    - Ter um comparativo percentual de quantos ingressos tem disponível, total de receita prevista com sould out e total faturado
  - Verificar eventos que acontecerão
    - Poder filtrar os eventos por categoria, data e cidade
    - Acessar informaçōes especificas de um evento
    - Comprar o evento
  - Ter acesso a seus dados de usuário e conta
  - Se autenticar
    - Cadastrar as informaçōes de usuário comum
    - Cadastrar as informaçōes de promotor de eventos
  - Ter checkout para PIX e cartão de crédito/débito

A aplicação terá:
  - Envio de e-mail SMTP 
  - Integração com gateway de pagamentos para checkout
  