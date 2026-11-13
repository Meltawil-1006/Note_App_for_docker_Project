const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get('/api/notes', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM notes ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/notes', async (req, res) => {
  const { rows } = await pool.query(
    'INSERT INTO notes (text) VALUES ($1) RETURNING *',
    [req.body.text]
  );
  res.status(201).json(rows[0]);
});

app.delete('/api/notes/:id', async (req, res) => {
  await pool.query('DELETE FROM notes WHERE id = $1', [req.params.id]);
  res.sendStatus(204);
});

app.listen(3000, () => console.log('Backend running on port 3000'));
