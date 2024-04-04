import react from 'react'
import { Link } from 'react-router-dom';
import successTick from '../../Assets/images/successTick.jpg';

export default function SuccessTick() {

    return (
        <>
        <div className="flex justify-center items-center w-full ">
            <div className="bg-white px-4 pt-5 ">
                <div className="sm:flex sm:items-start ">
                    <div className="mt-3 w-full text-center mr-0 md:mr-4 mb-8 ">
                        <div className="mt-2 text-center flex flex-col gap-20 items-center justify-center">
                            <img className='w-40 h-40' src={successTick} alt='Success' />
                            <h3>Email sent successfully</h3>
                        </div>
                    </div>
                </div>
        <Link to={'/'} className='p-4 bg-blue-500 rounded-lg text-white font-semibold'>
            Go back
        </Link>
            </div>
        </div>
        </>

    );
}
