import { List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from "../../reducer";
import accounting from "accounting";
import Product from "../Product";

const Review = () => {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {
          basket?.map(Product => (
            <ListItem key={Product.name}>
              <ListItemText primary={Product.name} secondary={`Qty : ${1}`}/>
              <Typography variant="body2">
              {accounting.formatMoney(Product.price, '$')}
              </Typography>
            </ListItem>
          ))
        }
        <ListItem>
          <ListItemText primary="Total"/>
          <Typography variant="subtitle1">
          {accounting.formatMoney(getBasketTotal(basket), '$')}
          </Typography>
        </ListItem>
      </List>
    </>
  )
}

export default Review;