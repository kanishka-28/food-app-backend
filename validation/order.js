import joi from "joi";



export const ValidateOrder = (orderObj) => {

  const Schema = joi.object({

    orderDetails: joi.array().items(joi.object({
      user: joi.string().required(),
      restaurant: joi.string().required(),
      orderDetails: joi.object({
        food: joi.string().required(),
        quantity: joi.number().required(),
        price: joi.number().required()
      }),
      itemTotal: joi.number().required(),
    })),

  });

  return Schema.validateAsync(orderObj);
};


