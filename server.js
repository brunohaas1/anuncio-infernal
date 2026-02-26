// BACKEND NODE.JS PARA PROCESSAR PAGAMENTOS STRIPE
// Instale as dependências: npm install express stripe dotenv

require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());
app.use(express.static('.')); // Servir arquivos estáticos (index.html)

// Endpoint para fornecer chave pública Stripe
app.get('/config', (req, res) => {
    res.json({
        publicKey: process.env.STRIPE_PUBLIC_KEY
    });
});

// Endpoint para criar sessão de checkout
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: '💸 Libertação do Anúncio Infernal',
                            description: 'Pagamento único para remover todos os anúncios irritantes',
                            images: ['https://i.imgur.com/placeholder.png'],
                        },
                        unit_amount: 200, // R$ 2,00 em centavos
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/?payment=success`,
            cancel_url: `${req.headers.origin}/?payment=cancelled`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Erro ao criar sessão Stripe:', error);
        res.status(500).json({ error: error.message });
    }
});

// Webhook para confirmar pagamento (opcional, mas recomendado)
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Erro no webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Processar evento de pagamento bem-sucedido
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('💰 Pagamento confirmado:', session.id);
        // Aqui você pode salvar no banco de dados, enviar email, etc.
    }

    res.json({ received: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log('📝 Configure suas chaves Stripe no arquivo .env');
    console.log(`🌍 Publicado em: ${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}`);
});
