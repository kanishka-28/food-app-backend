import joi from "joi";

export const ValidateSignup = (userData) => {

  const Schema = joi.object({
    userName: joi.string().min(2),
    email: joi.string().email(),
    password: joi.string().min(5),
    address: joi.string(),
    city: joi.string(),
    status: joi.string().required()
  });
  console.log(userData);

return Schema.validateAsync(userData);

};
export const ValidateSignin = (userData) => {

const Schema = joi.object({
  userName: joi.string(),
  password: joi.string().min(5).required(),
  email : joi.string().required()
});

return Schema.validateAsync(userData);

};