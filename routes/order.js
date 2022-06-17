const Order = require("../models/Order");
const {
  VerifyToken,
  verifyTokenandAuthorization,
  verifyTokenandAdmin,
} = require("./VerifyToken");

const router = require("express").Router();
//<<<<<<<<<<Create>>>>>>>>>>>>
router.post("/", VerifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
//<<<<<<<<<<<<<<<<Update-Order>>>>>>>>>>>>>
router.put("/:id", verifyTokenandAdmin, async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
}); //
//   // <<<<<<<<<<<<<<<Delete-Order>>>>>>>>>>>>>>>>>>

router.delete("/:id", verifyTokenandAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order is Deleted Successfully!!");
  } catch (err) {
    req.status(500).json(err);
  }
});
// <<<<<<<<<<<<<<<Get-User-Order>>>>>>>>>>>>>>>>>>

router.get("/find/:userId", async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });

    res.status(200).json(order);
  } catch (err) {
    req.status(500).json(err);
  }
});
// <<<<<<<<<<<<<<<Get-All-Orders>>>>>>>>>>>>>>>>>>

router.get("/", verifyTokenandAdmin, async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }

  //<<<<<<<<<Get-Monthly-Income>>>>>>>>>>>>>>
  router.get("/Income", verifyTokenandAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth) - 1);
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth) - 1);
    try {
      const income = await Order.aggregate;
      [
        { $match: { createdAt: { gte: previousMonth } } },

        {
          $project: { month: { $month: "createdAt" } },
          sales: "$amount",
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ];
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});
module.exports = router;
