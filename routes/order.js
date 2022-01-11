const router = require("express").Router();
//const req = require("express/lib/request");
const Order = require("../models/Order");

//const req = require("express/lib/request");
const { verifyToken, verifytokenandauthorization, verifytokenandadmin } = require("./verifyToken")

//Create
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }
})





//update
router.put("/:id", verifytokenandadmin, async (req, res) => {

    try {
        const updatedOrder = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        req.status(200).json(updatedOrder);
    }

    catch (err) {
        res.status(500).json(err);
    }
});

//delete
router.delete("/:id", verifytokenandauthorization, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted")
    }
    catch (err) {
        res.status(500).json(err);
    }
});
//get user Order
router.get("/find/:userid", verifytokenandauthorization, async (req, res) => {
    try {
        const Orders = await Order.find({ userid: req.params.userid });
        res.status(200).json(Orders)

    }
    catch (err) {
        res.status(500).json(err)
    }
});

//get all
router.get("/", verifytokenandadmin, async (req, res) => {
    try {
        const Orders = await Order.find();
        res.status(200).json(Orders);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// stats- monthly income
router.get("/income", verifytokenandadmin, async (req, res) => {
    const date = new Date();
    const lastmonth = new Date(date.setMonth(date.getMonth() - 1));
    const lasttolastmonth = new Date(date.setMonth(lastmonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: lasttolastmonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }

            },
        ]);
        res.status(200).json(income);
    }
    catch (err) { res.status(500).json(err); }

});

module.exports = router;
