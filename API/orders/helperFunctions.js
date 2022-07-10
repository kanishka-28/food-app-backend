import { OrderModel } from "../../database/order"
import { ObjectId } from "mongodb";
export const getOrderDetails = async (user)=>{
   
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
                $sort:{
                    updatedAt: -1
                }
            }
        ])
      
        return orders;
   
    
}