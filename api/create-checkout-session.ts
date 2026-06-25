import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2022-11-15',
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Stripe secret key not configured on the server.' });
  }

  const { priceId } = req.body;
  if (!priceId) {
    return res.status(400).json({ error: 'Missing priceId. Set VITE_STRIPE_PRICE_ID or pass a priceId payload.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/?checkout=success`,
      cancel_url: `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/pricing`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Checkout session creation failed.' });
  }
}
