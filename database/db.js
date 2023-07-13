import mongoose from 'mongoose';
mongoose.set("strictQuery",true);

export const connection = async(URL) => {
    try{
       await mongoose.connect(URL, {
          useUnifiedTopology:true,
          useNewUrlParser:true
       })
       console.log("database connected successfully");
    }catch(error){
        console.log(`Error while connecting with db :${error.message}`);
    }
}

export default connection;