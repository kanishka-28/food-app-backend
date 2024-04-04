import React from 'react'
import { Link } from 'react-router-dom'
import { IoReturnDownBack } from 'react-icons/io5'

const NotFound = () => {
    return (
        <div className='flex flex-col items-center gap-20 justify-center h-screen w-full'>
            <div className='flex gap-6'>
                <img src='https://media.baamboozle.com/uploads/images/24837/1583144101_6918' />
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcS6VEyZwmRO7kZx6vKt9MNl6_GrA_BM-7KXbhM-DCJGsdaF6bjM3vPYsSdgvBapJRNf0&usqp=CAU' />
                <img src='https://media.baamboozle.com/uploads/images/24837/1583144101_6918' />
            </div>
            <h2 className='font-serif'>Oops! Page Not Found</h2>
            <Link to={'/'} className="hover:scale-110 ease-in duration-200 py-2 px-8 text-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white font-semibold rounded flex items-center justify-center gap-4">
                <p>Go To Home Page </p><IoReturnDownBack size={'2rem'}/>
            </Link>
        </div>
    )
}

export default NotFound