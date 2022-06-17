const Cart = require("../models/Cart");
const {
  VerifyToken,
  verifyTokenandAuthorization,
  verifyTokenandAdmin,
} = require("./VerifyToken");

const router = require("express").Router();
//<<<<<<<<<<Create>>>>>>>>>>>>
router.post("/", VerifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const saveCart = await newCart.save();
    res.status(200).json(saveCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//<<<<<<<<<<<<<<<<Update-Cart>>>>>>>>>>>>>
router.put("/:id", verifyTokenandAuthorization, async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
}); //
//   // <<<<<<<<<<<<<<<Delete-Cart>>>>>>>>>>>>>>>>>>

router.delete("/:id", verifyTokenandAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart is Empty Successfully!!");
  } catch (err) {
    req.status(500).json(err);
  }
});
// <<<<<<<<<<<<<<<Get-User-Cart>>>>>>>>>>>>>>>>>>

router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json(cart);
  } catch (err) {
    req.status(500).json(err);
  }
});
// <<<<<<<<<<<<<<<Get-All-Product-In-Cart>>>>>>>>>>>>>>>>>>

router.get("/", verifyTokenandAuthorization, async (req, res) => {
  try {
    const carts = await Cart.find();

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
