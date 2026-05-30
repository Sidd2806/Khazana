import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({amount,onSuccess,onError}) => {
  // Ensure amount is a valid number
  const validAmount = parseFloat(amount) || 0;
  
  // Check if in development mode for testing
  const isDevelopment = import.meta.env.MODE === 'development';
  
  if (!import.meta.env.VITE_PAYPAL_CLIENT_ID) {
    return <p className="text-red-500">PayPal Client ID is not configured</p>;
  }

  if (validAmount <= 0) {
    return <p className="text-red-500">Invalid amount for payment</p>;
  }

  // Mock success handler for development testing
  const handleMockPayment = () => {
    const mockDetails = {
      id: `MOCK_${Date.now()}`,
      status: "COMPLETED",
      payer: {
        email_address: "test@example.com"
      }
    };
    onSuccess(mockDetails);
  };

  return (
    <>
      {isDevelopment && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded text-sm">
          <p className="font-semibold">🧪 Development Mode</p>
          <p>Using Mock Payment for testing. Use PayPal Sandbox account for real testing.</p>
        </div>
      )}
      <PayPalScriptProvider
        options={{
          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
          currency: "USD"
        }}
      >
        {isDevelopment ? (
          <button
            onClick={handleMockPayment}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Pay with PayPal (Mock)
          </button>
        ) : (
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2) } }],
              });
            }}
            onApprove={(data,actions)=>{
                return actions.order.capture().then(onSuccess);
            }}
            onError={onError}
          />
        )}
      </PayPalScriptProvider>
    </>
  );
};

export default PayPalButton;

// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// const PayPalButton = ({amount,onSuccess,onError}) => {
//   return (
//     <PayPalScriptProvider
//       options={{
//         "client-id":import.meta.env.VITE_PAYPAL_CLIENT_ID
//       }}
//     >
//       <PayPalButtons
//         style={{ layout: "vertical" }}
//         createOrder={(data, actions) => {
//           return actions.order.create({
//             purchase_units: [{ amount: { value: amount } }],
//           });
//         }}
//         onApprove={(data,actions)=>{
//             return actions.order.capture().then(onSuccess);
//         }}
//         onError={onError}
//       />
//     </PayPalScriptProvider>
//   );
// };

// export default PayPalButton;
