import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { serviceGet } from '../../../utlis/api';

const Menu = () => {

    const [menus, setmenus] = useState();
    const { id } = useParams();

    const getAllMenus = async () => {
        const { menu } = await serviceGet(`menu/${id}`);
        console.log(menu);
        setmenus(menu);
    }

    // const addMenu = async (e) => {
    //     e.preventDefault();
    //     if(!isLoggedIn){
    //         toast.error('Login to add review');
    //         return;
    //     }
    //     try {
    //         await servicePost(`review/add`, details);
    //         settoggle(!toggle);
    //         toast.success('Review is posted successfully');
    //     } catch (error) {
    //         console.log({error});
    //         toast.error('Some error occured while posting your review');
    //     }
    // }

    useEffect(() => {
        getAllMenus();
    }, [])

    return (
        <>
            <div className="text-xl font-dark ">CAD(M) CAD(B) Menu</div>
            <div className="w-full md:w-1/3 flex items-center justify-center">
                <img src={menus} className="w-4/5 h-full my-6" alt="menu"/>
            </div>
        </>
    )
}

export default Menu
