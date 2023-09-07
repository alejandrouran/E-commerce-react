import { Button, Typography } from '@mui/material';
import Review from './Review'
import Divider from '@mui/material/Divider';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import { accounting } from "accounting";
import axios from "axios";

const stripePromise = loadStripe('pk_test_51NnTziHn0EHOvOiicpR7pUgbqA1sSXKusrlx8i3DQAZqHTX4ufXADOpjejxagbcVLRwOS5wY4S4zpfnz0hB7WH4I00cCeP56c9')

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "#333",
      fontSize: "18px",
      "::placeholder": {
        color: "#ccc",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};


const CheckoutForm = ({backStep, nextStep}) => {
  const [{basket}, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })
    if (!error){
      const { id } = paymentMethod;
      try{
        const { data } = await axios.post("http://localhost:3001/api/checkout",
        { id,
        amount: getBasketTotal(basket) * 100,
      })
      console.log(data);

      }catch(error){console.log(error)}
    
      
    }
  }



  return (
  
  <form onSubmit={handleSubmit}>
    <CardElement options={CARD_ELEMENT_OPTIONS}/>
    <div style={{display: "flex", justifyContent: "space-between", marginTop: "1rem"}}>
    <Button variant='outlined' onClick={backStep}>Back</Button>
    <Button disabled={false} type='submit' variant='contained' color='primary'>{`Pay ${accounting.formatMoney(getBasketTotal(basket), "$")}`}</Button>
    </div>
  </form>
  
  )
}

const PaymentForm = ({backStep, nextStep}) => {
  return (
    <>
    <Review/>
    <Divider/>
    <Typography variant='h6' gutterBottom style={{ margin: "20px 0"}}>
      Payment method
    </Typography>
    <Elements stripe={stripePromise}>
      <CheckoutForm backStep={backStep} nextStep={nextStep}/>
    </Elements>
    </>
  )
}

export default PaymentForm;