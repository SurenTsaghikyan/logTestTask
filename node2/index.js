const express = require('express')
const cors = require('cors')

const app = express()
const { SendLog } = require('./model')
const { User } = require("./model")
const { Country } = require('./model')
const { sequelize } = require('./model')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/getLogs', async (req, res) => {
    let sendLog = await SendLog.findAll()
    res.send({ sendLog })
})

app.get('/getUsers', async (req, res) => {
    let users = await User.findAll()
    res.send({ users })
})

app.get('/getCountries', async (req, res) => {
    let countries = await Country.findAll()
    res.send({ countries })
})
app.post('/', async (req, res) => {

    let logMess = await sequelize.query(`select count(*) as countOfSuccess,sendlog.createdAt,sendlog.success from sendlog 
    inner join number on number.id=sendlog.NumberId 
    inner join country on country.id=number.CountryId
    where country.id=${+req.body.country} 
    and sendlog.UserId=${+req.body.user} 
    and sendlog.createdAt > '${req.body.startDate}'
    and sendlog.createdAt < '${req.body.endDate} '
    group by sendlog.success`)
    res.send({ logMess: logMess[0] })

})

app.listen(5000)
