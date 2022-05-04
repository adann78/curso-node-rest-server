const mongoose=require('mongoose');
const dbConnection=async()=>{

    try{

        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
           
            
        });
        console.log('base de datos online!!')

    }catch(error){
        console.log(error)
        throw new Error('Error al iniciar la BD!!')

    }

}
module.exports={
    dbConnection
}