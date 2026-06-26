import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.warn('Warning: STRIPE_SECRET_KEY is not set. Stripe checkout will not work until this environment variable is configured.');
}

const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2022-11-15',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 4242;
const distDir = path.join(__dirname, 'dist');

app.use(express.json());
app.use(express.static(distDir));

const createCheckoutSession = async (req, res) => {
  const { priceId } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: 'Missing priceId. Set VITE_STRIPE_PRICE_ID or pass a priceId payload.' });
  }

  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Stripe secret key not configured on the server.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.protocol}://${req.get('host')}/?checkout=success`,
      cancel_url: `${req.protocol}://${req.get('host')}/pricing`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Checkout session creation failed.' });
  }
};

app.post('/api/create-checkout-session', createCheckoutSession);
app.post('/create-checkout-session', createCheckoutSession);

app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Stripe backend listening on http://localhost:${port}`);
});
