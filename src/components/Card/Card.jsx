import React from 'react'
import FoodCards from './FoodCard';


const AllCards = () => {
        const restaurant = [
            {
                "mapLocation": {
                    "latitude": 22.577426775020527,
                    "longitude": 77.85300449224522
                },
                "_id": "629a4e1d44ae6a9629bcdff0",
                "name": "balle balle restaurant",
                "city": "itarsi",
                "address": "add",
                "contactNumber": 1234567891,
                "amenities": [],
                "photos": [],
                "createdAt": "2022-06-03T18:08:29.197Z",
                "updatedAt": "2022-06-03T18:08:29.197Z",
                "__v": 0
            },
            {
                "mapLocation": {
                    "latitude": 22.577426775020527,
                    "longitude": 77.85300449224522
                },
                "_id": "629b87f3dfd82c7ed7cc27d5",
                "name": "dhalle dhalle",
                "city": "itarsi",
                "address": "1234",
                "contactNumber": 1328423434,
                "amenities": [],
                "photos": [],
                "createdAt": "2022-06-04T16:27:31.559Z",
                "updatedAt": "2022-06-04T16:27:31.559Z",
                "__v": 0
            }
        ]
    return (
        <>
      
            <>
            <div className="md:hidden mb-24">
                {
                    restaurant.map(oneRestaurant=>{
                      
                        return <FoodCards key={oneRestaurant._id} name={oneRestaurant.name} city={oneRestaurant.city} photos={oneRestaurant.photos} id={oneRestaurant._id} />
                    })
                }
            </div>
            <div className="hidden md:block">
                <div className="w-full flex  flex-wrap gap-3 justify-evenly">
                
                {
                    restaurant.map(oneRestaurant=>{
                       
                        return (
                            <div key={oneRestaurant._id} className="w-1/3">

                                <FoodCards name={oneRestaurant.name} city={oneRestaurant.city} photos={oneRestaurant.photos} id={oneRestaurant._id} />
                            </div>
                        )
                        
                        
                    })
                }
            </div>
                </div>
            
            </>
           
        </>
    )
}

export default AllCards;