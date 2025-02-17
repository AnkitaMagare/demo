import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth-route';
import {port} from './secrets'
import route from './routes/product-route'


  

const app = express();

app.use(express.json());

app.use(cors());
app.use('/auth',authRoutes);
app.use('/product', route);


app.listen(port, () => console.log(`Server running on ${port}`));