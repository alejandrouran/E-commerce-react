import { Button, CircularProgress, Typography } from '@mui/material';
import Review from './Review'
import Divider from '@mui/material/Divider';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { actionTypes, getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import { accounting } from "accounting";
import axios from "axios";
import { useState } from 'react';

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
  const [{basket, paymentMessage }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    setLoading(true);
    if (!error){
      const { id } = paymentMethod;
      try{
        const { data } = await axios.post("http://localhost:3001/api/checkout",
        { 
        id,
        amount: getBasketTotal(basket) * 100,
      });
      alert(data.message)
      dispatch ({
        type: actionTypes.SET_PAYMENT_MESSAGE,
        paymentMessage: data.message
      })

      if (data.message === "Successful Payment"){
        dispatch({
          type: actionTypes.EMPTY_BASKET,
          basket: [],
        });
      }
      elements.getElement(CardElement).clear();
      nextStep();
      }catch(error){
        console.log(error);
        nextStep();
      }
    
      setLoading(false)
    }
  };

  return (
  
  <form onSubmit={handleSubmit}>
    <CardElement options={CARD_ELEMENT_OPTIONS}/>
    <div style={{display: "flex", justifyContent: "space-between", marginTop: "1rem"}}>
    <Button variant='outlined' onClick={backStep}>Back</Button>
    <Button disabled={false} type='submit' variant='contained' color='primary'>{loading ? (<CircularProgress/>) : (`Pay ${accounting.formatMoney(getBasketTotal(basket), "$")}`)}</Button>
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