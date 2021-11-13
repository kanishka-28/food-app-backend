import joi from "joi";



export const ValidateOrder = (orderObj) => {

  const Schema = joi.object({

    orderDetails: joi.array().items(joi.object({
      restaurant: joi.string().required(),
      food: joi.string().required(),
      quantity: joi.number().required(),
      itemTotal: joi.number().required(),
    })),

  });

  return Schema.validateAsync(orderObj);
};


