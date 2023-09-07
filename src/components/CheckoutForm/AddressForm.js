import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm, FormProvider } from 'react-hook-form';
import AddressInput from './AddressInput';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useStateValue } from "../../StateProvider";
import { actionTypes } from '../../reducer';


const AddressForm = ({nextStep}) => {
  const methods = useForm();
  const [{ shippingData }, dispatch] = useStateValue();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => {
          dispatch({
            type: actionTypes.SET_SHIPPINGDATA,
            shippingData: data,
          });
          nextStep();
        })}>
      <Grid container spacing={3}>

          <AddressInput
            required
            name="firstName"
            label="First name" />

          <AddressInput
            required
            name="lastName"
            label="Last name"
            />

          <AddressInput
            required
            name="address1"
            label="Address"
            />

          <AddressInput
            name="email"
            label="Email Addres"/>
          <AddressInput
            required
            name="city"
            label="City"
            />
          
          <AddressInput
            required
            name="postCode"
            label="Postal code"
           />
        
        </Grid>
        <div style={{display: "flex", justifyContent: "space-between", marginTop: "1rem"}}>
        <Button component={Link} to="/checkout-page">Back to the checkout Page</Button>
        <Button type="submit" variant="contained" color="primary"> Next</Button>
        </div>
      </form>
      </FormProvider>
    </>
  );
}

export default AddressForm;