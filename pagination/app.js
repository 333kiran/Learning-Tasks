const express = require('express');
const app = express();

// demo list of items
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
  { id: 7, name: 'Item 7' },
  { id: 8, name: 'Item 8' },
  { id: 9, name: 'Item 9' }
];


app.get('/items', (req, res) => {
    try{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  
  const totalPages = Math.ceil(items.length / limit);
  const totalItems = items.length;
  
  res.status(200).json({
    items: paginatedItems,
    totalItems,
    totalPages,
    currentPage: page
  });
}catch(error){
    res.status(500).json({message:error.message});
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
