import React from 'react'

const SingleSelectDropDown = ({array}) => {
    return (
        <div>
            <select id="countries" className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold" >
                <option defaultValue>Choose a brand</option>
                {array.map((data)=>(
                    <option key={data} value="US">{data}</option>
                ))}
            </select>
        </div>
    )
}

export default SingleSelectDropDown