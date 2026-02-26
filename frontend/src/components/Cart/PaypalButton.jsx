import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({amount,onSuccess,onError}) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "Af376cR2kznJ_ColG_fkVFLIlbWyqk1FoN61MeHUYuKaeF30ishE8QlZA5u7yJxJ4ye4cY7Ang77uhLx",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          });
        }}
        onApprove={(data,actions)=>{
            return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;