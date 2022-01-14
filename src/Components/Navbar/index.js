import React, {useState, useEffect} from 'react'
import {FaBars, FaTimes} from 'react-icons/fa'
import './navbar.css'
import Loading from './Loading'
import axios from 'axios'
const Navbar = () => {
    const [mobile, setMobile] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] =useState(false);

    const [like, setLike] = useState(false);

    const handleClickChange = () => {
        setLike((previous) => {
            return !previous;
        });
    }

    useEffect(()=> {
        if(window.innerWidth < 1065) {
            setMobile(true);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1065) {
                setMobile(true);
            }
            else {
                setMobile(false);
                setSidebar(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return() => {
            window.addEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=upGKmQfgrvuARup5hy934lPb5jcuezziIEIEub16`).then(response => {
            console.log(response.data)
        setResult(response.data);
        setIsLoading(true);
        })
    }, [])

    return (
        <div className="shopify-container">
        
            <div className="navbar bg-green-300 py-5 flex justify-between px-20 md:px-40 lg:px-40">
                <div className="navbar-brand">
                    <h1 className="navbar-name font-black text-2xl">SHOPIFY</h1>
                </div>
                {!mobile && (
                    <div className="navbar-links" >
                        <ul className="links flex direcion-row justify-between">
                            <li className="navbar-link cursor-pointer font-bold">Home</li>
                        </ul>
                    </div>
                )}

                {mobile && (
                    <div className="mobile-icom">
                        {sidebar ? (
                            <FaTimes className="fa-times" onClick={() => setSidebar(!sidebar)} />
                        ) : (
                            <FaBars className="fa-bars" onClick={() => setSidebar(!sidebar)} />
                        )}
                    </div>
                )}
            </div>
            <div className={sidebar? "sidebar active" : "sidebar"}>
                <div className="sidebar-items">
                    <a className="sidebar-link" href="#" onClick={() => setSidebar(false)}>Home</a>
                </div>
            </div>

            <div className="result-container">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-black-500 font-semibold py-20">Result</h1>
                </div>
                
                <div className="flex flex-wrap justify-center -m-4 px-20 md:px-40 lg:px-40 mb-20">
                
                    {isLoading ? (
                        <div className="max-w-sm shadow-lg rounded-lg overflow-hidden mx-1.5 my-3" >
                            <img className="w-full" src={result.hdurl} alt="Sea" />
                            <div className="px-6 py-4">
                                <h2 className="title font-bold mb-4">{result.title}</h2>
                                <p className="text-gray-700 text-base ">
                                    {result.explanation}
                                </p>
                            </div>
                            <div className="like-button px-6 py-4 flex flex wrap justify-between">
                                <p className="text-gray-700 text-base font-bold">
                                    {result.date}
                                </p>
                                {like ? (
                                    <input type="submit" className="bg-red-600 text-white cursor-pointer p-2 rounded-md" 
                                    onClick={handleClickChange} value="Like"/>
                                ) : (
                                    <input type="submit" className="bg-green-500 text-white cursor-pointer p-2 rounded-md" 
                                    onClick={handleClickChange} value="Like"/>
                                )}
                            </div>
                    </div>
                    ): <Loading />}  
                </div>
            </div>
        </div>
    )
}

export default Navbar
