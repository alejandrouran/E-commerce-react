import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm, FormProvider } from 'react-hook-form';
import AddressInput from './AddressInput';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AddressForm() {
  const methods = useForm();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form>
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
        <Button component={Link} to="/checkout-page">Back to the checkout Page</Button>
        <Button type="submit" variant="contained" color="primary"> Next</Button>
      </form>
      </FormProvider>
    </>
  );
}