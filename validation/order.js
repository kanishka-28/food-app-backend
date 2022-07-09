import joi from "joi";

export const ValidateOrderId = (resId) => {
  const Schema = joi.object({
    _id: joi.string().required()
  });
  
  return Schema.validateAsync(resId);
  };

export const ValidateOrder = (orderObj) => {

  const Schema = joi.object({

   
      user: joi.string().required(),
      restaurant: joi.string().required(),
      orderDetails: joi.object({
        food: joi.string().required(),
        quantity: joi.number().required(),
        price: joi.number().required()
      }),
      itemTotal: joi.number().required(),
   

  });

  return Schema.validateAsync(orderObj);
};


