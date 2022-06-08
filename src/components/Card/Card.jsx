import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isAuthenticated, isReady } from '../../redux/features/auth/selector/selector';
import { serviceGet } from '../../utlis/api';
import FoodCards from './FoodCard';


const AllCards = ({search = false}) => {
       const ready = useSelector(isReady);
       const auth = useSelector(isAuthenticated);
       const {searchString} = useParams();
        const [restaurant, setrestaurant] = useState([]);
        const getRestaurent = async ()=>{
            try {
                // const {restaurants} = await serviceGet('restaurant',{auth : `bearer ${localStorage.getItem("token")}`});
               
                if(auth){
                    const {restaurants} = await serviceGet('restaurant');
                    if(search){
                        const arr = restaurants?.filter((e)=>e.name.includes(searchString) );
                        setrestaurant(arr);
                    }
                    else{
                       setrestaurant(restaurants);
                    }
                }
                else{
                        //change this to a condition where we will use latitude longitutde
                        setrestaurant([]);
                }
            } catch (error) {
                // toast.error(error.response.data.message);
                console.log(error.response.data.message);
            }
          
            
        }
     
        useEffect(() => {
            if(ready){
                getRestaurent();
            }
           
        }, [ready,auth,searchString])
        
    return (
        <>
        {
            restaurant?.length!==0 ?
            <>
            <div className="md:hidden mb-24">
                {
                    restaurant?.map(oneRestaurant=>{
                      
                        return <FoodCards key={oneRestaurant._id} restaurant= {oneRestaurant} />
                    })
                }
            </div>
            <div className="hidden md:block">
                <div className="w-full flex  flex-wrap gap-3 justify-evenly ">
                
                {
                    restaurant?.map(oneRestaurant=>{
                        return (
                            <div key={oneRestaurant._id} className="w-1/3 lg:1/4">

                                <FoodCards restaurant= {oneRestaurant} />
                            </div>
                        )
                        
                        
                    })
                }
            </div>
                </div>
                </>
                :
                search?
                    <h4 className='text-center'>No Restaurants Match Your Search</h4>
                : <h4 className='text-center'>No Restaurants Found Near You</h4>
        }
            
           
        </>
    )
}

export default AllCards;