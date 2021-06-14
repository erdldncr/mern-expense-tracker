const Transaction = require("../models/Transaction");

// @desc get all getTransactions
// @route get api/route/transactions
// @access public
exports.getTransactions = (req, res, next) => {
  Transaction.find()
    .then((respond) => {
      return res.status(200).json({
        success: true,
        count: respond.length,
        data: respond,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    });
};

// @desc post add a addTransaction
// @route get api/route/transactions
// @access public
exports.addTransaction = (req, res, next) => {
  const transaction = new Transaction(req.body);
  Transaction.create(transaction)
    .then((respond) => {
      return res.status(200).send({
        success: true,
        data: transaction,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((val) => val.message);
        return res.status(400).json({
          success: false,
          error: messages,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "Server Error",
        });
      }
    });
};

// @desc post delete a addTransaction
// @route delete api/route/transactions/:id
// @access public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction= await Transaction.findById(req.params.id)

    if(!transaction){
        return res.status(404).json({
            success:false,
            error:"no transacction found"
        })
    }
    await transaction.remove()

    return res.status(200).json({
        success:true,
        data:{}
    })

  } catch (err) {
    return res.status(500).json({
        success: false,
        error: "Server Error",
      });

  }
};
