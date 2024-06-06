import express from 'express';
import memberRouter from './src/Modules/Member/member.routes.js'
import trainerRouter from './src/Modules/Trainer/trainer.routes.js'
import revenuesRouter from './src/Modules/Revenues/revenues.routes.js'


import db_connection from "./DB/connection.js";

const app = express();
const port = 3000;
app.use(express.json());


app.use('/member', memberRouter);
app.use('/trainer', trainerRouter);
app.use('/revenues', revenuesRouter)



db_connection

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server is running on port ${port}!`));
