const Stripe = require('stripe');

async function getJsonBody(req) {
  if (req.body) {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  if (!chunks.length) {
    return {};
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  if (!rawBody) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return {};
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Stripe secret key not configured on the server.' });
  }

  const payload = await getJsonBody(req);
  const { priceId } = payload || {};
  if (!priceId) {
    return res.status(400).json({ error: 'Missing priceId. Pass a JSON payload with a priceId value.' });
  }

  try {
    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });
    const host = req.headers.host || 'localhost:3000';
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const origin = `${proto}://${host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/pricing`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Checkout session creation failed.' });
  }
};
