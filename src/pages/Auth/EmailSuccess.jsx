import react from 'react'
import successTick from '../../assets/images/successTick.jpg';

export default function SuccessTick() {

    return (
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
            </div>
        </div>
    );
}
