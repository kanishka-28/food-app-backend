import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function EditRestaurant() {


  const [name, setname] = useState()
  const [address, setaddress] = useState()
  const [image, setimage] = useState()

  const handleFile = (e) => {
    let file = e.target.files[0];
    console.log('====================================');
    console.log(e.target.files[0]);
    console.log('====================================');
    // formData.append('image', e.target.files[0]);
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);
    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      console.log("Called", reader);
      baseURL = reader.result;
      setimage(baseURL);
    };
  };

  return (
    <>
      <Navbar />
      <div className="lg:mx-28 shadow-lg border border-gray-100 mx-auto">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div className="shadow sm:rounded sm:overflow-hidden flex-col items-center justify-center">
              <div className="px-4 py-5 bg-white space-y-3 sm:p-6">
                <div className="col-span-3 sm:col-span-2">
                  <label htmlFor="company-website" className="block text-gray-700">
                    Name
                  </label>
                  <div className="mt-1 flex rounded shadow-sm">
                    <input
                      required
                      type="text"
                      placeholder="Name"
                      className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
                      value={name}
                      onChange={(e)=>setname(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="about" className="block text-gray-700">
                    Address
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="p-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded"
                      placeholder="Address"
                      defaultValue={''}
                      value={address}
                      onChange={(e)=>setaddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="">
                  <label className="block text-gray-700 mb-2">Profile Photo</label>
                  <div className="lg:w-1/4 justify-center h-32 focus:border-none focus:outline-none focus:ring-1 focus:ring-black border border-gray-300 rounded mt-1 flex items-center">
                    <img src={image} className='w-full h-32'/>
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="pl-2 cursor-pointer bg-white rounded font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 flex gap-4"
                    >
                      <span>Choose Photo</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFile} />
                    </label>
                  </div>
                  {/* {image} */}
                </div>
              </div>
              <div className="flex justify-center px-4 py-1 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="text-center inline-flex self-center justify-center py-2 px-8 border border-transparent shadow-sm font-medium rounded text-white bg-zomato-400 hover:bg-zomato-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zomato-500">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
