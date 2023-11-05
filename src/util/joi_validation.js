import joi from "joi";

const updateUserData = (data) => {
  const schema = joi.object({
    email: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().required(),
  });

  return schema.validate(data);
};

const vehicleValidation = (data) => {
  const schema = joi.object({
    userId: joi.string().required(),
    vehicleName: joi.string().required(),
    platNumber: joi.string().required(),
    vehicleType: joi.string().required(),
  });

  return schema.validate(data);
};

export default { updateUserData, vehicleValidation };
