import { OrderModel } from "../../database/order"
import { ObjectId } from "mongodb";
export const getOrderDetailsUser = async (user)=>{
   
        const orders = await OrderModel.aggregate([
            {
                $match:{
                    $expr:{
                        $eq:['$user',ObjectId(user)]
                      }
                }
            },
            {
                $lookup:{
                    from:"foods",
                    foreignField:"_id",
                    localField:"orderDetails.food",
                    as:'foodItems'
                }
            },
            {
                $lookup:{
                    from:"restaurants",
                    let:{restaurant: "$restaurant"},
                    pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $eq:['$_id',"$$restaurant"]
                                  }
                            }
                        },{
                            $project:{
                                name:1
                            }
                        }
                    ],
                    as:"restaurant"
                }
            },
            {
                $unwind:"$restaurant"
            },
            {
                $sort:{
                    updatedAt: -1
                }
            }
        ])
      
        return orders;
   
    
}
export const getOrderDetailsRestaurant = async (restaurant)=>{
   
        const orders = await OrderModel.aggregate([
            {
                $match:{
                    $expr:{
                        $eq:['$restaurant',ObjectId(restaurant)]
                      }
                }
            },
            {
                $lookup:{
                    from:"foods",
                    foreignField:"_id",
                    localField:"orderDetails.food",
                    as:'foodItems'
                }
            },
            {
                $lookup:{
                    from:"users",
                   let:{user:"$user"},
                   pipeline:[
                    {
                        $match:{
                            $expr:{
                                $eq:['$_id',"$$user"]
                              }
                        }
                    },
                    {
                        $project:{
                            userName:1,
                            address:1,
                            city:1
                        }
                    }
                   ],
                   as: "user"
                }
            },
            {
                $sort:{
                    updatedAt: -1
                }
            }
        ])
      
        return orders;
   
    
}