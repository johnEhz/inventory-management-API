import mongoose from 'mongoose'
import Config from './config'

mongoose.connect(Config.DATABASE, {
    //Mongoose Config
})
    .then(db => console.log('Connected!'))
    .catch(error => console.log(error))

