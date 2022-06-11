import React, { useState } from 'react'

const EditUser = ({profile,setedit}) => {
    const [newProfile, setnewProfile] = useState(profile);
    const handleSubmit = (e) => {
        e.preventDefault();
        setedit(false);
        console.log(newProfile);
        // use api to give this profile to backend
      };
  return (
    <>
                <form onSubmit={handleSubmit} >
                  <input required value={newProfile.name} onChange={(e)=>setnewProfile({...profile,name: e.target.value})} placeholder="Name" type="text" className="outline-none text-3xl  mt-8 ml-24 lg:pt-0 lg:ml-0 bg-mainContainer"/>
                  <div className="mx-auto lg:mx-0 w-4/5 pt-3 mb-2 border-b-2 border-megenta-400 opacity-25"></div>
                  <input required value={newProfile.email} onChange={(e)=>setnewProfile({...profile,email: e.target.value})} placeholder="Email" type="email" className="outline-none text-xl  pt-8 lg:pt-0 bg-mainContainer"/>
                  <div className="mx-auto lg:mx-0 w-4/5 pt-3 mb-2 border-b-2 border-megenta-400  opacity-25"></div>
                  
                  <input required value={newProfile.city} onChange={(e)=>setnewProfile({...profile,city: e.target.value})} placeholder="City" type="text" className=" outline-none text-xl  pt-8 lg:pt-0 bg-mainContainer"/>
                  <div className="mx-auto lg:mx-0 w-4/5 pt-3 mb-2 border-b-2 border-megenta-400 opacity-25"></div>
                  
                  <input required value={newProfile.address} onChange={(e)=>setnewProfile({...profile,address: e.target.value})} placeholder="Address" type="text" className=" outline-none text-xl  pt-8 lg:pt-0 bg-mainContainer"/>
                  <div className="mx-auto lg:mx-0 w-4/5 pt-3 mb-2 border-b-2 border-megenta-400 opacity-25"></div>
                 
                  
                  <div className="pt-12 pb-8">
                    <div className="flex mt-5 justify-between w-full">
                      <button
                        onClick={() => setedit(false)}
                        className="bg-gray-800 w-28 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full"
                      >
                        cancel
                      </button>
                      <button type="submit" className="bg-megenta-400 w-28 hover:bg-megenta-600 text-white font-bold py-2 px-4 rounded-full">
                        submit
                      </button>
                    </div>
                  </div>
                  </form>
                </>
  )
}

export default EditUser