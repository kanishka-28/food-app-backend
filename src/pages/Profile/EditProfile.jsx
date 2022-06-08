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
export default function EditProfile() {
  return (
    <>
      <Navbar />
      <div className="lg:mx-28 shadow-lg border border-gray-100 mx-auto">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden flex-col items-center justify-center">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6 items-center gap-20">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-gray-700">
                      Name
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        required
                        type="email"
                        placeholder="Email"
                        className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded-md"
                        value={'Email'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="pl-2 relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Choose Photo</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                      </div>
                    </div>
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
                      className="p-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="you@example.com"
                      defaultValue={''}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="text-center inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
