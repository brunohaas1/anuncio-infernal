# 💳 Integração Stripe - AnúncioInfernal

## 📋 Pré-requisitos

1. **Conta Stripe**: Crie em [stripe.com](https://stripe.com)
2. **Node.js**: Instale em [nodejs.org](https://nodejs.org)

## 🚀 Configuração Rápida

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar chaves Stripe

1. Acesse: https://dashboard.stripe.com/test/apikeys
2. Copie suas chaves de teste
3. Crie arquivo `.env` baseado em `.env.example`:

```env
STRIPE_SECRET_KEY=sk_test_SUA_CHAVE_SECRETA_AQUI
STRIPE_PUBLIC_KEY=pk_test_SUA_CHAVE_PUBLICA_AQUI
PORT=3000
```

### 3. Atualizar chave pública no HTML

Edite `index.html` linha ~1490:
```javascript
const stripe = Stripe('pk_test_SUA_CHAVE_PUBLICA_AQUI');
```

### 4. Iniciar servidor
```bash
npm start
```

Acesse: http://localhost:3000

## 🧪 Testar Pagamento

Use cartões de teste do Stripe:
- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 0002`
- **Data**: Qualquer data futura
- **CVV**: Qualquer 3 dígitos

## 📝 Como Funciona

1. Usuário clica em "PAGAR COM STRIPE"
2. `iniciarPagamentoStripe()` chama `/create-checkout-session`
3. Backend cria sessão Stripe e retorna `session.id`
4. Frontend redireciona para página de checkout Stripe
5. Após pagamento, Stripe redireciona para `?payment=success`
6. `verificarPagamentoStripe()` detecta sucesso e libera o site

## 🔒 Segurança

- ✅ Chave secreta APENAS no backend
- ✅ Chave pública no frontend
- ✅ Pagamento processado pelo Stripe (PCI compliant)
- ⚠️ Nunca commitar arquivo `.env`

## 🌍 Produção

### Deploy no Heroku/Vercel/Railway:

1. Configure variáveis de ambiente no dashboard
2. Use chaves de produção (começam com `sk_live_` e `pk_live_`)
3. Configure webhook para `/webhook`
4. Adicione `STRIPE_WEBHOOK_SECRET`

### Webhook (recomendado):
```bash
stripe listen --forward-to localhost:3000/webhook
```

## 💰 Preços

- Stripe cobra: **2.99% + R$ 0,39** por transação no Brasil
- Pagamento de R$ 5,00 = você recebe ~R$ 4,46

## 📚 Documentação

- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [API Stripe](https://stripe.com/docs/api)
- [Webhooks](https://stripe.com/docs/webhooks)

## ❓ Modo DEMO (sem backend)

Se o backend não estiver rodando, o código tem fallback:
- Mostra alerta "Backend não configurado"
- Permite teste com confirmação fictícia
- **Remova isso em produção!**

## 🐛 Debug

Console do navegador mostra:
- Erros de conexão com backend
- Respostas do Stripe
- Status de pagamento

Console do servidor mostra:
- Requisições recebidas
- Sessões criadas
- Pagamentos confirmados
