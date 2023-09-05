import { Grid } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";


const AddressInput = ({ name, label, requitred }) => {
    const { control } = useFormContext();
    return (
        <Grid item xs={12} sm={6}>
            <Controller as={TextField} 
                control={control}
                fullWidth
                defaultValue=''
                name={name}
                label={label}
                requitred={requitred}
            />
        </Grid>
    )
}

export default AddressInput;