import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import accounting from 'accounting';
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CheckoutCard({product : {id, name, productType, image, price, rating, description}}) {
  const [expanded, setExpanded] = React.useState(false);
  const [{basket}, dispatch] = useStateValue();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const removeItem = ()=> dispatch({
    type: actionTypes.REMOVE_ITEM,
    id: id,
    
  })

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        
        action={
          
            <Typography variant='h5' color='textSecondary'>
              {accounting.formatMoney(price, "$")}
            </Typography>
  
        }
        title={name}
        subheader="In Stock"
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
        title={name}
      />
    
      <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
       
       <div>
        {Array(rating)
        .fill()
        .map((_, i) => (
            <p>&#11088;</p>
        ))}
      </div>
        
      </CardActions>
      <IconButton>
          <DeleteIcon fontSize='large' onClick={removeItem}/>
      </IconButton>
    
    </Card>
  );
}