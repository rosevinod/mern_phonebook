// https://medium.com/@praveenkumarpalaboyina/mastering-mern-stack-crud-operations-a-step-by-step-guide-d42aea1e0dd

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const DB = 'mongodb://localhost:27017/kotak'
mongoose.connect(DB).then(() => {
    console.log('Database connected..')
})


app.use(express.json())
app.use(cors())



// -------------------------------------------------
const PhoneBook = require('./Model/PhoneBook')

app.post('/add-phone', async (req, res) => {
    console.log(req.body)
    const phoneNumber = new PhoneBook(req.body)

    try {
        await phoneNumber.save()
        res.status(201).json({
            status: 'Success',
            data: {
                phoneNumber
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})

// -------------------------------------------------

app.get('/get-phone', async (req, res) => {
    const phoneNumbers = await PhoneBook.find({})
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                phoneNumbers
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})

// -------------------------------------------------

app.patch('/update-phone/:id', async (req, res) => {
    const updatedPhone = await PhoneBook.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                updatedPhone
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// -------------------------------------------------

app.delete('/delete-phone/:id', async (req, res) => {
    await PhoneBook.findByIdAndDelete(req.params.id)

    try {
        res.status(204).json({
            status: 'Success',
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})

// -------------------------------------------------

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})