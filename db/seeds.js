const mongoose = require('mongoose')
const Book = require('../api/models/book')
const User = require('../api/models/user')
const config = require('../nodemon.json')
const bcrypt = require('bcrypt')

const reset = async() => {
    mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })
    const stevePassword = await bcrypt.hash('passywordy', 10)
    await User.deleteMany()
    await User.create([{
            username: 'steve',
            password: stevePassword,
            admin: true
        }, {
            username: 'dave',
            password: stevePassword,
            admin: false
        }

    ])
    await Book.deleteMany() // Deletes all records
    return await Book.create([{
            title: 'The Colour of Magic',
            published: 1983,
            authors: [{
                name: 'Sir Terry Pratchett',
                dob: '04-28-1948'
            }]
        },
        {
            title: 'Stardust',
            published: 1997,
            authors: [{
                name: 'Neil Gaiman',
                dob: '11-10-1960'
            }]
        },
        {
            title: 'Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch',
            published: 1990,
            authors: [{
                    name: 'Neil Gaiman',
                    dob: '11-10-1960'
                },
                {
                    name: 'Sir Terry Pratchett',
                    dob: '04-28-1948'
                }
            ]
        }
    ])
}

reset().catch(console.error).then((response) => {
    console.log(`Seeds successful! ${response.length} records created.`)
    return mongoose.disconnect()
})