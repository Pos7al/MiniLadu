const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Убедись, что путь правильный

// Удаление товара
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item' });
    }
});

// Обновление количества товара
router.put('/:id', async (req, res) => {
    const { quantity } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item quantity' });
    }
});

// Поиск товара по названию или тегам
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const items = await Item.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error searching items' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, quantity, tags } = req.body;
        const newItem = new Item({ name, quantity, tags });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error creating item' });
    }
});

router.get('/', async (req, res) => {
    try {
        const items = await Item.find(); // Получаем все товары
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка товаров' });
    }
});


module.exports = router;
