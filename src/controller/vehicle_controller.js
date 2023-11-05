import vehicleModel from "../model/vehicle.js";
import joiValidation from "../util/joi_validation.js";

const getVehicles = async (req, res) => {
  try {
    let userId = req.body.userId;

    if (!userId) return res.status(400).json({ message: "userId kosong" });

    let vehicles = await vehicleModel.find({ userId: userId });

    vehicles = vehicles.map((user) => {
      const newVehicle = user.toObject();
      newVehicle.id = newVehicle._id;
      delete newVehicle._id;
      delete newVehicle.__v;
      return newVehicle;
    });
    res.status(200).json({ data: vehicles });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createVehicle = async (req, res) => {
  try {
    const { error } = joiValidation.vehicleValidation(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const isExist = await vehicleModel.findOne({
      userId: req.body.userId,
      vehicleName: req.body.vehicleName,
      platNumber: req.body.platNumber,
      vehicleType: req.body.vehicleType,
    });

    if (isExist)
      return res.status(400).json({ message: "Kendaraan ini sudah ada" });
    await vehicleModel.create(req.body);

    res.status(200).json({ message: "Kendaraan berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deletevehicle = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(400).json({ message: "id kosong" });

    await vehicleModel.findByIdAndDelete(id).then((data) => {
      console.log(data);
      if (data) {
        return res.status(200).json({ message: "Kendaraan berhasil dihapus" });
      } else {
        return res.status(404).json({ message: "Kendaraan tidak ditumakan" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default { getVehicles, createVehicle, deletevehicle };
