const express = require('express');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Simple data array to act as a database (for now)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// GET route to read all items
app.get('/items', (req, res) => {
  res.json(items); // Sends back the array of items as JSON
});

// POST route to create a new item
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,  // Simple way to generate new ID
    name: req.body.name
  };
  items.push(newItem); // Add the new item to the array
  res.status(201).json(newItem); // Send the created item back
});

// PUT route to update an existing item
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }

  // Update the item name
  items[itemIndex].name = req.body.name;
  res.json(items[itemIndex]);
});

// DELETE route to remove an item
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId); // Filter out the deleted item
  res.status(200).send({msg:`Succesfully deleted ${itemId}`});
});

// Set up the server to listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
