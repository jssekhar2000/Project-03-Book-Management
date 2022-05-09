const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const route = require("./routes/route")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://Murlidhar1999:O4n7QkIgSx4LYyAG@cluster0.vghet.mongodb.net/Project03", 
{useNewUrlParser: true
}).then(() => console.log("MongoDb is connected")).catch(err => console.log(err));

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
