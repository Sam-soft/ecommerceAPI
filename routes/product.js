const Product = require("../models/Product");
const {
  VerifyToken,
  verifyTokenandAuthorization,
  verifyTokenandAdmin,
} = require("./VerifyToken");

const router = require("express").Router();
//<<<<<<<<<<Create>>>>>>>>>>>>
router.post("/", verifyTokenandAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update
router.put("/:id", verifyTokenandAdmin, async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}); //
//   // <<<<<<<<<<<<<<<Delete-User>>>>>>>>>>>>>>>>>>

router.delete("/:id", verifyTokenandAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Deleted Successfully!!");
  } catch (err) {
    req.status(500).json(err);
  }
});
// <<<<<<<<<<<<<<<Get-Product>>>>>>>>>>>>>>>>>>

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (err) {
    req.status(500).json(err);
  }
});
// <<<<<<<<<<<<<<<Get-ALl-Product>>>>>>>>>>>>>>>>>>

router.get("/", async (req, res) => {
  const qnew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qnew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      }).collation({ locale: "en", strength: 2 });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
