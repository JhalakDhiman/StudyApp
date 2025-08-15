const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payment');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {cloudinaryConnect} = require('./config/cloudinary');
const dbConnect = require('./config/database');
const fileUpload = require('express-fileupload');


const PORT = process.env.PORT || 8000;

dbConnect();

cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
)
app.use(
        fileUpload({
            useTempFiles:true,
            tempFileDir:"/tmp/",
        })
)

app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/payment',paymentRoutes);

app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is running.......",
    })
})

app.listen(PORT,()=>{
    console.log(`App is listening to ${PORT}`);
})