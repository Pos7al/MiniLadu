const express = require('express');
const router = express.Router();

// Пример маршрута для проверки
router.get('/', (req, res) => {
    res.json({ message: 'Auth route working' });
});

module.exports = router;
