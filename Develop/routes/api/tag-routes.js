const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

//THIS WILL PULL ALL TAG DATA
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
      });
});

//THIS WILL PULL BACK DATA BASED ON THIS ID
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .suppressUnhandledRejections(dbTagData => {
      if(!dbTagData) {
        res.status(404).json({message: 'no tag found with this id'});
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//THIS WILL ADD A NEW TAG TO THE TABLE
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json
  })
});

//THIS WILL UPDATE A TAG BASED ON THE ID
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
      where: {
        id: req.params.id
      }
  })
  .then(dbTagData => {
    if (!dbTagData[0]) {
      res.status(404).json({message: 'No tag found with this id'});
      return;
    }
    res.json(dbTagData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//THIS WILL DELETE AN TAG BASED ON THE ID
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if(!dbTagData) {
    res.status(404).json({message: 'no tag found with this id'});
    return;
  }
  res.json(dbTagData);
})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
