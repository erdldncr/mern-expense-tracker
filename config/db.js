const mongoose=require('mongoose')

const connectDb=()=>{
   mongoose.connect(process.env.URI,{useFindAndModify:true,useNewUrlParser:true,useUnifiedTopology:true}).then(res=>{
        console.log(`Mongo cconnected`)
    })
    .catch(err=>{
        console.log(`${err.message}`.red.bold)
    })
}
module.exports=connectDb