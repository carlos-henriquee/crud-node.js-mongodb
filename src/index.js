import Url from '../connection.js';
import  express  from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
const port = 3000;


const Film = mongoose.model('Film', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
});


app.get('/', (req,res)=>{
     return res.send('Hello World');
})
app.get('/films', async (req,res)=>{
    const films = await Film.find();
    return res.send(films)
})

app.post('/cad', async (req,res)=>{
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })
    await film.save();
    return res.send(film)
})

app.put("/:id", async(req,res)=>{
    const film = await Film.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    },{
        new:true //para mostrar logo de cara a mudança
    });
    return res.send(film);
})

app.delete("/:id", async (req,res)=>{
    const film = await Film.findByIdAndDelete(req.params.id);
    return res.send(film)
})




app.listen(port, ()=>{
    mongoose.connect(Url);
    console.log('deu certo')
})