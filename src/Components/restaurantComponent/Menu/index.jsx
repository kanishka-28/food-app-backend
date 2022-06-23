import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { GiTireIronCross } from 'react-icons/gi';
import { ImBin } from 'react-icons/im';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setloadingFalse, setloadingTrue } from '../../../Redux/Features/Loader/Slice';
import { serviceGet, servicePut } from '../../../Utils/Api/Api';
import { resizeFile } from '../../../Utils/Functions/imageResizer';
import FullImageModal from '../../Modal/Fullimage';

const MenuImage = ({ image, uploaded, state, ModalState }) => {

    const [toggle, settoggle] = state;
    const [modalState, setModalState] = ModalState;
    const { id } = useParams();
    const dispatch = useDispatch();

    const deletePhoto = async () => {
        dispatch(setloadingTrue());
        try {
            const res = await servicePut(`menu/delete/${image._id}`, { _id: id });
            toast.success('Deleted successfully');
            settoggle(!toggle)
        } catch (error) {
            console.log(error);
        }
        finally {
            dispatch(setloadingFalse());
        }
    }

    return (
        <div className='m-4'>
            <div onClick={() => setModalState({ ...modalState, open: true, image: image?.url || image })} className='cursor-pointer w-48 h-56 rounded shadow-md'>
                <img
                    src={image?.url || image}
                    alt="Burger"
                    className="w-full h-full rounded object-cover"
                />
            </div>
            {uploaded && <ImBin onClick={deletePhoto} className='cursor-pointer relative left-40 bg-white rounded-md -top-56 p-2 text-4xl' color='red' />}
        </div>
    )
}

const Menu = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const [images, setimages] = useState([]);
    const [uploadedImages, setuploadedImages] = useState([]);
    const [toggle, settoggle] = useState(false);
    const [modalState, setModalState] = useState({
        open: false,
        image: '',
    })

    const getMenu = async () => {
        dispatch(setloadingTrue());
        try {
            const { menu } = await serviceGet(`menu/${id}`);
            console.log(menu);
            setuploadedImages(menu.menuImage);
        } catch (error) {
            console.log({ error });
        }
        finally {
            dispatch(setloadingFalse());
        }
    }

    useEffect(() => {
        getMenu();
    }, [toggle])


    const handleFile = async (e) => {
        let file = e.target.files;
        //convert files list into array
        file = Array.from(file);
        //then use promise all to resolve each promise
        file = Promise.all(file.map(async (element, i) => {

            if (element.size > 3000000) {
                toast.error(`Size of ${element.name} should be less than 3 MB`);
                return;
            }
            return new Promise((resolve, reject) => {
                resizeFile(element)
                    .then(res => resolve(res));
            });
        })).then(el => setimages(el));

    };

    const onSave = async () => {
        dispatch(setloadingTrue());
        try {
            const payload = images.map(img => ({ url: img }));
            const res = await servicePut(`menu/${id}`, { menuImage: payload });
            console.log(res);
            toast.success('Menu has been uploaded');
            setimages([]);
            settoggle(!toggle);
        } catch (error) {
            console.log(error);
        }
        finally {
            dispatch(setloadingFalse());
        }
    }

    const onCancel = async () => {
        setimages([]);
    }


    return (
        <>
            <FullImageModal ModalState={[modalState, setModalState]} />
            <div>
                <p className="text-xl font-dark mt-6">Upload More</p>
                <div className='block sm:flex gap-4'>
                    <div className="lg:w-1/4 lg:mx-12 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded h-fit mt-6 ">
                        <div className="space-y-1 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input multiple id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFile} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                    <div className="bg-white rounded flex flex-wrap justify-center pb-6 w-full overflow-x-auto ">
                        {
                            images?.length !== 0 &&
                            images?.map((image, i) => (
                                <MenuImage key={i} image={image} uploaded={false} state={[toggle, settoggle]} ModalState={[modalState, setModalState]} />
                            ))
                        }
                    </div>
                </div>
                {images.length !== 0 &&
                    <div className='flex items-center gap-3'>
                        <button onClick={onSave} className=' py-2 px-8 font-semibold text-center rounded items-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white flex gap-3 hover:scale-110 ease-in duration-200'><p>Save</p><IoCheckmarkDoneOutline size={'1.5rem'} /></button>
                        <button onClick={onCancel} className=' py-2 px-8 font-semibold text-center rounded items-center border border-gray-500 text-gray-500 flex gap-3 hover:scale-110 ease-in duration-200'><p>Cancel</p><GiTireIronCross color='red' size={'1.2rem'} /></button>
                    </div>
                }
            </div>
            <div className="text-xl font-dark mt-6">Menu</div>
            <div className="w-full flex items-center justify-center">
                {
                    uploadedImages?.length !== 0 ?
                        <div className="bg-white rounded flex pb-6 w-full flex-wrap ">
                            {uploadedImages?.map((image, i) => (
                                <MenuImage key={i} image={image} uploaded={true} state={[toggle, settoggle]} ModalState={[modalState, setModalState]} />
                            ))}
                        </div>
                        :
                        <h4 className='text-center'>No Menu uploaded</h4>
                }
            </div>
        </>
    )
}

export default Menu
