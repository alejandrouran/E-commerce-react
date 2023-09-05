import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AddShoppingCart } from '@mui/icons-material';
import accounting from 'accounting';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider'

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

export default function Product({product : {id, name, productType, image, price, rating, description}}) {
  const [expanded, setExpanded] = React.useState(false);
  const [{basket}, dispatch] = useStateValue();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToBasket = () => {
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        id,
        name,
        productType,
        image,
        price,
        rating,
        description
      }
    })
  }

  return (
    <Card sx={{ maxWidth: 345, margin: '2px' }}>
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
        alt="Products"
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {productType}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='Add to Cart' onClick={addToBasket}>
          <AddShoppingCart fontSize='large'/>
        </IconButton>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
          <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet sed dolor auctor scelerisque.
          </Typography>
          <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac augue in nulla bibendum condimentum ac vel felis. Praesent in est at leo congue sagittis in et magna. Nulla accumsan ligula non risus maximus luctus. Nullam vitae eros pulvinar, commodo massa sit amet, tristique nibh. Donec congue pulvinar elementum. Aliquam erat volutpat. Nunc non rhoncus mauris. Donec gravida neque ut mi bibendum, nec tincidunt metus lacinia. Sed lacinia suscipit porta. Fusce rhoncus metus purus, ac finibus felis feugiat vel. 
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
