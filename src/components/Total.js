import React from "react";
import accounting from "accounting";
import { Button } from "@mui/material";
import { getBasketTotal } from "../reducer";
import { useStateValue } from '../StateProvider'

const Total = () => {
    const [{basket}, dispatch] = useStateValue();
    return (
        <div> 
            <h5>Total items: {basket?.length}</h5>
            <h5>{accounting.formatMoney(getBasketTotal(basket), "$")}</h5>
            <Button variant='outlined' sx={{ color: 'blue', marginTop: "2rem" }}>Check Out</Button>
        </div>
    )
}

export default Total