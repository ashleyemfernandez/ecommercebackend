const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [Product] });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    if (!category) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//new category
router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update by id
router.put("/:id", async (req, res) => {
  try {
    const [updatedRows] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.json({ message: "Category updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deletedRows === 0) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.json({ message: "Category deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;