import mongoose,{Schema} from 'mongoose';

mongo().catch(err => console.log(err));

async function mongo() {
    const MONGO_DB = process.env.DATABASE_URL || 'mongodb+srv://abhichary01:VZF9QvSiNFpAVBTl@cluster0.zbp60.mongodb.net/?retryWrites=true&w=majority';
    await mongoose.connect(MONGO_DB);
    console.log("Connected to database");
}

export {mongo}