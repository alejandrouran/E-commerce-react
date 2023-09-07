import { Typography } from "@mui/material";
import React from "react";

const Confirmation = ({message}) => {
    return (
        <>
            <Typography variant="h6">{message}</Typography>
            <Divider />
        </>
    )
}

export default Confirmation;
