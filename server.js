const express = require('express')
const cors = require('cors')
require('dotenv').config()

const db = require('./config/db')

const app = express()

// Middlewares
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Create
app.post('/create', async(req, res) => {
  const { name, ingredients, directions } = req.body

  if(!name || !ingredients || !directions) {
    res.redirect('/')
    return
  }

  await db.query('INSERT INTO recipes (name, ingredients, directions) VALUES($1, $2, $3) RETURNING*', [name, ingredients, directions])
  res.redirect('/')
})

// Read
app.get('/', async(req, res) => {
  const { rows } = await db.query('SELECT * FROM recipes')
  res.render('index', { recipes: rows })
})

// Upadte
app.post('/update/:id', async(req, res) => {
  const { id } = req.params
  const { name, ingredients, directions } = req.body

  const { rows } = await db.query('SELECT * FROM recipes')

  if(!name || !ingredients || !directions) {
    res.render('index', { recipes: rows, recipeId: id })
    return
  }

  const { rows: rowsUpdated } = await db.query('UPDATE recipes SET name = $1, ingredients = $2, directions = $3 WHERE id = $4 RETURNING*', [name, ingredients, directions, id])

  if(rowsUpdated[0]) res.redirect('/')
})

// Delete
app.post('/delete/:id', async(req, res) => {
  const { id } = req.params
  const { rows } = await db.query('DELETE FROM recipes WHERE id = $1 RETURNING*', [id])

  if(rows[0]) res.redirect('/')
})

app.listen(5000, () => console.log('Server listen o port 5000'))
