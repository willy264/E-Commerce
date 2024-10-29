import { loadStripe } from "@stripe/stripe-js";
import { store } from "../lib/store";
import { config } from "../../config";

const CheckoutBtn = ({ products }) => {
  const { currentUser } = store();
  const publishableKey = "pk_test_51QF4QsBrDAqFwedMD3S7H6bewkoeONa36trCh7QFQFlVHg4XDU9wZlWCffHyjwOfvYbVq1mvAEeEqe4p22ognAhD00fGnp6YFg";
  const stripePromise = loadStripe(publishableKey);

  const handleCheckout = async () => {
    console.log(products)
    const stripe = await stripePromise;
    console.log('stripe', stripe);
    
    const response = await fetch(`${config?.baseUrl}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: products,
        email: currentUser.email,
      }),
    });
    console.log('response', response)
    const checkoutSession = await response.json();
    console.log('checkoutSession', checkoutSession);
    
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    if (result.error) {
      window.alert(result.error.message);
    }
  };
  return (
    <div className="mt-6">
      {currentUser ? (
        <button
          onClick={handleCheckout}
          type="submit"
          className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 focus:ring-offset-gray-50 duration-200"
        >
          Checkout
        </button>
      ) : (
        <button className="w-full text-base text-white text-center rounded-md border border-transparent bg-gray-500 px-4 py-3 cursor-not-allowed">
          Checkout
        </button>
      )}
      {!currentUser && (
        <p className="mt-2 text-sm font-medium text-red-500 text-center">
          Need to sign in to make checkout
        </p>
      )}
    </div>
  );
};

export default CheckoutBtn;
