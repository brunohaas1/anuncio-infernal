# 🔥 AnúncioInfernal - Site mais irritante da internet

Um site satírico com anúncios intermináveis, popups, sons irritantes e confete. A única forma de escapar? **Pagar R$ 2,00 via Stripe!**

## 🎯 Características

- ✅ 25 anúncios visuais diferentes com emojis
- ✅ 20+ interações engraçadas e absurdas ao clicar nos anúncios
- ✅ 20+ popups com mensagens hilárias
- ✅ Som irritante contínuo (após clique)
- ✅ Confete ao pagar
- ✅ Pagamento real via Stripe
- ✅ Ranking de resistência em localStorage
- ✅ Modo escuro com animações
- ✅ Modo teste integrado

## 🚀 Deploy no Vercel

### 1. Preparar para GitHub

```bash
# Inicializar git
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Inicial: AnúncioInfernal com Stripe"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/SEU_USER/anuncio-infernal.git
git branch -M main
git push -u origin main
```

### 2. Deploy no Vercel

**Opção A: Via Vercel CLI**

```bash
npm i -g vercel
vercel
```

**Opção B: Via Dashboard**

1. Acesse [vercel.com](https://vercel.com)
2. Login com GitHub
3. Clique "Add New" > "Project"
4. Selecione o repositório `anuncio-infernal`
5. Configure variáveis de ambiente:
   - `STRIPE_PUBLIC_KEY` = sua chave pública
   - `STRIPE_SECRET_KEY` = sua chave secreta
6. Clique "Deploy"

### 3. Configurar URLs de Callback no Stripe

No [dashboard Stripe](https://dashboard.stripe.com/settings/checkout):

1. Vá em **Settings > Checkout Sessions**
2. Configure URLs de redirecionamento:
   - Success: `https://seu-app.vercel.app/?payment=success`
   - Cancel: `https://seu-app.vercel.app/?payment=cancelled`

## 📦 Instalação Local

```bash
# Clonar repositório
git clone https://github.com/SEU_USER/anuncio-infernal.git
cd anuncio-infernal

# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env

# Editar .env e adicionar suas chaves Stripe:
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_PUBLIC_KEY=pk_test_...

# Iniciar servidor local
npm start

# Acessar em http://localhost:3000
```

## 🧪 Testar Localmente

Use cartões de teste do Stripe:
- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 0002`
- Data: Qualquer futura
- CVV: Qualquer 3 dígitos

## 🔐 Segurança

- ✅ `.env` com chaves nunca é commitado (.gitignore)
- ✅ Chave secreta APENAS no servidor
- ✅ Chave pública carregada do `/config` endpoint
- ✅ CORS adequadamente configurado
- ✅ Sem exposição de dados sensíveis

## 📁 Estrutura do Projeto

```
anuncio-infernal/
├── index.html           # Frontend (HTML + CSS + JS)
├── server.js            # Backend Express + Stripe
├── package.json         # Dependências
├── vercel.json          # Configuração Vercel
├── .env.example         # Template de variáveis
├── .env                 # Variáveis reais (NÃO commitar)
├── .gitignore          # Arquivos a ignorar no git
└── README_STRIPE.md    # Documentação detalhada Stripe
```

## 🌍 URLs Importantes

- **Local**: http://localhost:3000
- **Vercel**: https://seu-app.vercel.app
- **Stripe Dashboard**: https://dashboard.stripe.com
- **GitHub**: https://github.com/seu-user/anuncio-infernal

## 💰 Stripe Test Keys

Para testar, use estas chaves de teste (obtidas em dashboard.stripe.com):

```
Chave Pública:  pk_test_51T59sMBT9tnX...
Chave Secreta:  sk_test_51T59sMBT9tnX...
```

**⚠️ NUNCA commitar chaves reais!** Use sempre variáveis de ambiente.

## 🐛 Troubleshooting

### "Backend não configurado"
- Certifique-se que `npm start` está rodando
- Verifique se o servidor está em `localhost:3000`
- Abra o DevTools > Console para ver erros

### Pagamento não funciona no Vercel
- Verificar se variáveis de ambiente estão configuradas
- Confirmar URLs de callback no Stripe
- Verificar logs do Vercel: `vercel logs`

### CORS Error
- Backend já está configurado para aceitar requisições cross-origin
- Se modificar, adicionar `cors` middleware

## 📝 Próximos Passos

- [ ] Adicionar webhook para confirmar pagamentos
- [ ] Salvar histórico de pagamentos em banco de dados
- [ ] Integrar com analytics
- [ ] Adicionar mais idiomas
- [ ] Mobile optimization

## 📄 Licença

MIT - Sinta-se livre para usar, modificar e distribuir!

---

**Criado com ❤️ (e muita irritação)** 🔥
