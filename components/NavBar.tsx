import NavbarItem from "./NavBarItem"
import { FaChevronDown, FaLastfmSquare } from "react-icons/fa";
import MobileMenu from "./mobileMenu";
import { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import AccountMenu from "./AccountMenu";
const TOP_OFFSET = 66

const Navbar = () => {




    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)


    useEffect(() => {
        const handleScroll = () => {
            console.log(window.scrollY)
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            }
            else {
                setShowBackground(false)
            }
            console.log(showBackground)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])






    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, [])


    return (
        <nav className="w-full fixed z-40">
            <div className={`
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
                ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
            `}>
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />

                <div className="
                    flex-row
                    ml-8
                    gap-7
                    hidden
                    lg:flex
                ">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Movies" />
                    <NavbarItem label="About us" />
                    <NavbarItem label="Contacts" />

                </div>
                <div
                    onClick={toggleMobileMenu}
                    className="
                     lg:hidden
                     flex 
                     flex-row 
                     items-center 
                     gap-2 
                     ml-8 
                     cursor-pointer 
                     relative">
                    <p className="text-white text-sm">Browse</p>
                    <FaChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'} `} />
                    <MobileMenu visible={showMobileMenu} />

                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <FaSearch />

                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <FaBell />

                    </div>
                    <div
                        onClick={toggleAccountMenu}
                        className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="" />
                        </div>
                        <FaChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'} `} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar