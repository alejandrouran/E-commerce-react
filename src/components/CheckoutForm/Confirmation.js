import { Button, Typography } from "@mui/material";
import React from "react";
import Divider from '@mui/material/Divider';
import {Link} from "react-router-dom";

const Confirmation = ({ message }) => {
    return (
        <>
            <Typography variant="h6">{message}</Typography>
            <Divider />
            <Typography variant='subtitle2' gutterBottom>
            { message === "Successful Payment"
                ? "Your booking reference : Rgh8787878lkj"
                : ""}
            </Typography>
            <Button component={Link} to='/' variant='outlined' type='button'>
                Back to Home Page
            </Button>
        </>
    )
}

export default Confirmation;
