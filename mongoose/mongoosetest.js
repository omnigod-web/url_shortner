import mongoose, { Schema } from 'mongoose'


try {
    await mongoose.connect("mongodb://localhost:27017/mongoose_db");
    mongoose.set("debug",true)
} catch (error) {
    console.error(error);
    process.exit();
    
}

// step 2:create Schema

const Userschema=mongoose.Schema({
    name:{type:String , required:true },
    email:{type: String ,required:true , unique:true},
    age:{type:Number , required:true , min:5},
    createdAt:{type:Date , default:Date.now()},
})

//step 3 :model creation

 const users =mongoose.model('user', Userschema);

 await users.create({name:'nishant', age:56,email:'nn@Gar.com'})

 await mongoose.connection.close()