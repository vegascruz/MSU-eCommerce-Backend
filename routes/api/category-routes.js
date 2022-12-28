const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

//THIS WILL RETURN ALL CATEGORY DATA
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include:[
      {
        model: Product,
        attributes:['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
//THIS WILL GRAB ALL CATEGORY DATA THAT MATCHES THIS ID
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id'}); 
        return; 
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

//THIS WILL CREATE AND POST A NEW CATEGORY TO THE TABLE
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

//THIS WILL UPDATE A CATEGORY WITH THIS SPECIFIC ID
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
  })
  .then(dbCategoryData => {
      if (!dbCategoryData[0]) {
          res.status(404).json({ message: 'No category found with this id'});
          return;
      }
      res.json(dbCategoryData);
  })
  .catch(err => {
      console.log(err); 
      res.status(500).json(err);
  })
});

//THIS WILL DELETE DATA BASED ON THE ID
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {
        id: req.params.id
      }
    })

  })
  .then(dbCategoryData => {
      if (!dbCategoryData) {
          res.status(404).json({ message: 'No category found with this id'});
          return;
      }
      res.json(dbCategoryData);
})
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
});

module.exports = router;
