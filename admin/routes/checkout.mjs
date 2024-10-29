import { Router } from "express";
import Stripe from "stripe";
const router = Router();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// console.log('key', stripeSecretKey)

router.post("/checkout", async (req, res) => {
  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-09-30.acacia",
  });
  try {
    const { items, email } = await req.body; // the items are the projects that are in the cart
    // const body = await req.body
    // console.log(body);

    const extractingItems = await items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.discountedPrice * 100,
        product_data: {
          name: item.name,
          description: item.description,
          images: item.images,
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({ // means we are getting the data
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url:'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
    //     "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        email,
      },
    });

    res.json({ // passing json data to frontend
      message: "Server is connected",
      success: true,
      id: session.id,
      // session,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
export default router;
