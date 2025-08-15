import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logos/Light_Logo.png';
import { Link, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { FaChevronDown } from "react-icons/fa6";

const NavBar = () => {

    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [subLinks, setSubLinks] = useState([]);

    const fetchCategories = async () => {
        try {
            const result = await apiConnector('GET', categories.CATEGORIES_API);
            // console.log("result.data: ",result.data.data);
            // console.log(categories.CATEGORIES_API);
            setSubLinks(result.data.data);

        } catch (error) {

        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className=" border-b-[1px] w-[100vw] border-b-richblack-700">
            <div className="w-11/12 flex items-center mx-auto py-2 justify-between ">

                <div>
                    <Link to='/'>
                        <img src={logo} width={160}></img>
                    </Link>
                </div>

                {/* links section 1 */}
                <nav>
                    <ul className="flex text-richblack-25 font-[400] text-[16px] gap-5">
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog"
                                            ? (
                                                <div className="relative group">

                                                    <div className="flex gap-2 items-center">
                                                        <p>{link.title}</p>
                                                        <FaChevronDown />
                                                    </div>

                                                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5">
                                                        </div>
                                                        {
                                                            subLinks.length > 0
                                                                ? (
                                                                    <div className="flex flex-col">
                                                                        {
                                                                            subLinks.map((link, index) => (
                                                                                <Link to={`/catalog/${link.name
                                                                                    .split(" ")
                                                                                    .join("-")
                                                                                    .toLowerCase()}`}
                                                                                    key={index}
                                                                                    className="text-richblack-800 rounded-md  flex items-center p-3 hover:bg-richblack-100 text-[16px] ">
                                                                                    {link.name}
                                                                                </Link>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                )
                                                                : (<div>sorry</div>)
                                                        }

                                                    </div>

                                                </div>)
                                            : (
                                                <Link to={link.path}
                                                    className={`${link.path === location.pathname ? "text-yellow-25" : ""}`}>
                                                    <p>{link.title}</p>
                                                </Link>
                                            )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* links section 2 */}
                <nav>
                    <ul className="flex gap-3 items-center">
                        <li>
                            <Link to='/dashboard/cart'>
                                {
                                    user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                                        <div className="relative text-richblack-300 text-[19px]">
                                            <FaShoppingCart />
                                            <div className="absolute -top-2 left-3 bg-richblack-700 text-richblack-25 animate-bounce text-[13px] w-[16px] h-[16px] flex justify-center items-center rounded-full">
                                                {
                                                    totalItems > 0 && totalItems
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </Link>
                        </li>

                        <li>
                            {
                                token === null && (
                                    <Link to='/login'>
                                        <div className="text-richblack-100 cursor-pointer text-[16px] font-semibold border border-richblack-700 bg-richblack-800 px-3 py-2 rounded-lg">
                                            Log in
                                        </div>
                                    </Link>
                                )
                            }
                        </li>

                        <li>
                            {
                                token === null && (
                                    <Link to='/signup'>
                                        <div className="text-richblack-200 cursor-pointer text-[16px] font-semibold border border-richblack-700 bg-richblack-800 px-3 py-2 rounded-lg">
                                            Signup
                                        </div>
                                    </Link>
                                )
                            }
                        </li>

                        <li>
                            {
                                token !== null && <ProfileDropdown />
                            }
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    )
}

export default NavBar
