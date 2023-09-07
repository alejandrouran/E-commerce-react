const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const stripe = new Stripe("sk_test_51NnTziHn0EHOvOiimoBOmR3zYG8P3LgIG8xZUb1VD525E7ijhaHIwWJtGojmdowa2BlqGuTNx4rkjoRk8CRTbGbI0000rE6JPJ")

const app = express();

app.use(cors({ origin: "http://localhost: 3000"}));
app.use(express.json())

app.post('/api/checkout', async (req, res) => {
    console.log(req.body);
    res.send("recibido");
    const { id, amount } = req.body;


    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Basket of products",
            payment_method: id,
            confirm: true,
        });
        console.log(payment)
        return res.status(2000).json({ message: "Succesful payment" })
    }   catch(error){
        return res.json({message: error.raw.message})
    }
});

app.listen(3001, () => {
    console.log("Server on port", 3001);
});