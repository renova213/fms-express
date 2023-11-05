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

const balanceValidation = (data) => {
  const schema = joi.object({
    totalBalance: joi.number().min(0),
    incomeBalance: joi.number().min(0),
    outcomeBalance: joi.number().min(0),
  });

  return schema.validate(data);
};

export default { updateUserData, vehicleValidation, balanceValidation };
