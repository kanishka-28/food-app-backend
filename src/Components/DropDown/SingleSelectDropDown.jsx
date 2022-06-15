import React from 'react'

const SingleSelectDropDown = ({array}) => {

    return (
        <div>
            <select id="countries" className="p-2 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black border border-gray-300 rounded " value={'k'}>
                <option defaultValue className='text-gray-400'>Choose a brand</option>
                {array.map((data)=>(
                    <option className='text-black' key={data} value={data}>{data}</option>
                ))} 
            </select>
        </div>
    )
}

export default SingleSelectDropDown