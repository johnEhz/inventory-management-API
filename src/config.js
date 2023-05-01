import dotevn from 'dotenv'
import path from 'path'

dotevn.config({
    path: path.join(__dirname, '.env')
})

export default {
    SECRET_KEY: process.env.SECRET_KEY,
    DATABASE: process.env.DATABASE,
    PORT: process.env.PORT
}