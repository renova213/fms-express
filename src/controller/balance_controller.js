import balanceModel from "../model/balance.js";
import joiValidation from "../util/joi_validation.js";

const getBalances = async (req, res) => {
  try {
    let userId = req.body.userId;

    if (!userId) return res.status(400).json({ message: "userId kosong" });

    let balance = await balanceModel.findOne({ userId: userId });

    if (!balance)
      return res
        .status(404)
        .json({ message: "balance dengan userid ini tidak ditemukan" });

    res.status(200).json({
      data: {
        id: balance._id,
        userId: balance.userId,
        totalBalance: balance.totalBalance,
        incomeBalance: balance.incomeBalance,
        outcomeBalance: balance.outcomeBalance,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateBalance = async (req, res) => {
  try {
    const id = req.params.id;

    const { error } = joiValidation.balanceValidation(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    await balanceModel
      .findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
      })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "id tidak ditemukan" });
        }
        return res.status(200).json({ message: "Balance berhasil diudate" });
      });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default { getBalances, updateBalance };
