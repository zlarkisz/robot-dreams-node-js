const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const port = 3000;
const jwtSecret = 'your_secret_key';

// SQL-запити для створення таблиць у PostgreSQL:
/* CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL,
  token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); */

// Налаштування підключення до PostgreSQL
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'admin',
  database: 'test_db',
});

app.use(bodyParser.json());

// Логін користувача
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Пошук користувача в базі даних
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Перевіряємо, чи існує вже токен для користувача
    const tokenResult = await pool.query('SELECT * FROM tokens WHERE user_id = $1', [user.id]);

    if (tokenResult.rowCount > 0) {
      const existingToken = tokenResult.rows[0].token;
      try {
        jwt.verify(existingToken, jwtSecret);
        return res.json({ accessToken: existingToken }); // Повертаємо існуючий токен, якщо він валідний
      } catch {
        // Якщо токен не валідний, видаляємо його
        await pool.query('DELETE FROM tokens WHERE user_id = $1', [user.id]);
      }
    }

    // Створюємо новий токен
    const newToken = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // Зберігаємо новий токен в базі даних
    await pool.query('INSERT INTO tokens (user_id, token) VALUES ($1, $2)', [user.id, newToken]);

    return res.json({ accessToken: newToken });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Логаут користувача
app.post('/logout', async (req, res) => {
  const { userId } = req.body;

  try {
    // Видаляємо токен користувача
    await pool.query('DELETE FROM tokens WHERE user_id = $1', [userId]);
    return res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
