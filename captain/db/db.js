import mongoose from 'mongoose'
function connect() {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Captain service connected to MongoDB');
    }).catch(err => {
        console.log(err);
    });
}
export default connect;