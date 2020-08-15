import config from './config/index.js';
import app from './app.js';

const { PORT } = config;

app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`);
});