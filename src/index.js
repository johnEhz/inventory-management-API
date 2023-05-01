import app from "./app"
import './database'
import Config from './config'

app.listen(Config.PORT || 5000)
console.log('Server listening...')
