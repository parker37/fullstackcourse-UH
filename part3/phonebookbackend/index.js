const express = require('express')
const morgan = require('morgan')

morgan.format('tinyWithData', (tokens, req, res) => {
    // Function to get request in tiny fmt
    const getTinyFmt = morgan.compile(
        ':method :url :status :res[content-length] - :response-time ms'
    )
    const outputTinyFmt = getTinyFmt(tokens, req, res)

    // If request method is POST, return log with POST data
    return outputTinyFmt.concat(
        req.method === 'POST'
            ? ` ${JSON.stringify(req.body)}\n---`
            : '\n---'
    )

})

const app = express()

app.use(express.json())
app.use(morgan('tinyWithData'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const now = new Date().toString()
    const people = persons.length === 1 ? `person` : `people`

    response.send(
        `<p>Phonebook has info for ${persons.length} ${people}</p>\n<p>${now}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (!person) {
        return response.status(404).end()
    }

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const newId = Math.floor(Math.random() * 10000)
    return String(newId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    if (persons.find((p => p.name === body.name))) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    console.log('Adding person:', newPerson)
    persons = persons.concat(newPerson)

    response.json(newPerson)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})