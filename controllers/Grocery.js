const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aysnc');
const Grocery = require('../models/Grocery');

//@desc     Add Grocery Item
//@routes   POST/api/v1/grocery/addGrocery
//@access   private
exports.addGroceryItem = asyncHandler(async(req, res, next) => {
    const { itemName, quantity, addedBy, purchasedBy, purchasedAt } = req.body;

    const grocery = await Grocery.create({ itemName, quantity, addedBy, purchasedBy, purchasedAt });

    res.status(200).json({
        success: true,
        data: grocery,
    });
});

//@desc     Update Grocery list
//@route    POST/api/v1/grocery/updateGrocery/:id
//@access   private
exports.updateGroceryList = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate= {
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        addedBy: req.body.addedBy,
        purchasedBy: req.body.purchasedBy,
        purchasedAt: req.body.purchaseAt
    };
   
    const grocery= await Grocery.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: grocery,
    });
});

//@desc     Delete item from Grocery list
//@routes   DELETE/api/v1/grocery/deleteGroceryItem/:id
//@access   private
exports.deleteGroceryItem = asyncHandler(async (req, res, next) => {
    const grocery = await Grocery.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: { },
    });
});

//@desc     get grocery item
//@routes   GET/api/v1/grocery/getGroceryItem
//@access   private
exports.getGroceryItem= asyncHandler(async (req, res, next) => {
    const grocery = await Grocery.find();

    res.status(200).json({
        success: true,
        count: grocery.length,
        data: grocery,
    });
})