import React, { useContext, useEffect, useState } from "react";
import { DATA } from "../../context/DataContext";
import { IoCloseSharp, IoMenu, IoPersonOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { BsBag } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import CategorySlide from "../offcanvas/CategorySlide";
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchBar from "../offcanvas/SearchBar";
import ShoppingBag from "../offcanvas/ShoppingBag";
import { BASKET } from "../../context/BasketContext";
import QuickView from "../main/QuickView";
import FullLoader from "../main/FullLoader";
import LoginPopUp from "../userinfo/login/LoginPopUp";

function Header() {
  const location = useLocation();
  const [showCategorySlide, setShowCategorySlide] = useState(false);
  const { dataCategory, imgsformenu, dataFav, showQuick, setShowQuick } = useContext(DATA);
  const { basket } = useContext(BASKET);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showBag, setShowBag] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const savedLogin = JSON.parse(localStorage.getItem('registerData'));
  useEffect(() => {
    setShowLogin(false);
    setShowCategorySlide(false);
    setShowBag(false);
    setShowSearchBar(false)
  }, [location.pathname]);

  return (
    <>
      <header className=" fixed w-[100%] bg-white z-50">
        <div className={`${dataCategory ? 'hidden' : 'block'} z-50`}>
          <FullLoader />
        </div>
        <div
          onClick={() => setShowQuick(false)}
          className={`${showQuick ? 'block' : 'hidden'} w-[100vw] bg-[#53525280] flex justify-center items-center  fixed h-[100vh] z-50`}>
          <QuickView setShowBag={setShowBag} />
        </div>
        <div
          onClick={() => {
            setShowSearchBar(false);
            setShowBag(false);
          }}
          className={`${showBag || showSearchBar ? "block" : "hidden"
            } w-full h-full bg-[#53525280] fixed z-30`}
        ></div>
        <div
          className={` w-[300px] bp600:w-[400px] absolute transition-all duration-300 ${showBag ? "right-0" : "-right-[100%]"
            }`}
        >
          <ShoppingBag setShowBag={setShowBag} />
        </div>

        <div
          className={`z-50 absolute w-[100%] transition-all duration-300  ${showSearchBar ? "top-0" : "-top-[100vh]"
            }`}
        >
          <SearchBar setShowSearchBar={setShowSearchBar} showSearchBar={showSearchBar} />
        </div>
        <div
          className={`absolute top-[90px] translate-x-0 duration-300 ${showCategorySlide ? "left-0" : "-left-[170%]"
            }  bp1200:hidden`}
        >
          <CategorySlide />
        </div>

        <section className=" w-[100%] z-50 bg-white p-[10px]  md:px-[40px]  bp1200:pt-[30px]">
          <div className="flex w-[100%] items-center h-[90px] justify-between">
            <div className="w-[45%]">
              <ul className="flex bp1200:hidden text-[1.6em]">
                <li
                  className="cursor-pointer"
                  onClick={() => {
                    setShowCategorySlide(!showCategorySlide);
                  }}
                >
                  {showCategorySlide ? <IoCloseSharp /> : <IoMenu />}
                </li>
                <li>
                  <MdOutlineSearch
                    onClick={() => {
                      setShowSearchBar(true);
                    }}
                  />
                </li>
              </ul>
              <ul className="bp1200:flex hidden font-montserrat">
                {dataCategory &&
                  dataCategory.map((item, i) => {
                    return (
                      <div key={i} className="cathead">
                        <NavLink
                          to={`/category/${item.name}`}
                          className="hover:bg-[rgb(228,228,228)] navlarim rounded p-[10px]  text-[1.1em] cursor-pointer"
                        >
                          {item.name}
                        </NavLink>
                        <div className="bg-white  absolute mt-[10px] p-[40px] left-0 w-screen hidden justify-between catim shadow-[0_10px_10px_0_rgba(0,0,0,0.3)]">
                          <div>
                            <ul className="flex  flex-col gap-[5px]">
                              {item.Subcategory.map((subitem, subi) => {
                                return (
                                  <NavLink
                                    key={subi}
                                    to={`/products/${item.name}/${subitem.name}`}
                                    className="relative  w-max mx-[10px] cursor-pointer group"
                                  >
                                    <span className="">{subitem.name}</span>
                                    <span className="absolute  -bottom-1 left-1/2 w-0 transition-all h-[1px] bg-black group-hover:w-3/6"></span>
                                    <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-[1px] bg-black group-hover:w-3/6"></span>
                                  </NavLink>
                                );
                              })}
                            </ul>
                          </div>
                          <div>
                            <img
                              src={imgsformenu[i]}
                              alt="imgforthatcategory"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </ul>
            </div>

            <div>
              <Link to={"/"}>
                <img
                  className="lg:h-[40px] mb-[10px]  object-cover"
                  src="/img/logo.png"
                  alt="Lunaria.logo"
                />
              </Link>
            </div>

            <div onClick={() => { setShowLogin(false) }}
              className={` z-10  top-0 w-[100%] h-[100vh] ${showLogin ? "fixed" : "hidden"}`}></div>

            <div className="text-[1.6em] relative w-[43%] justify-end flex gap-[10px]  ">
              <div
                className={`${showLogin ? "absolute" : "hidden"
                  }  top-[50px] z-50 ring-0 `}
              >
                <LoginPopUp setShowLogin={setShowLogin} />
              </div>
              <div className="hidden bp1200:flex  justify-end  pr-[40px] ">
                <div
                  onClick={() => {
                    setShowSearchBar(true);
                  }}
                  className="bg-white flex  justify-between items-center py-[5px] w-[200px] border-[1px] border-gray-300"
                >
                  <input
                    type="text"
                    className="w-[100px] text-[.7em] px-[6px] h-[30px] focus:outline-none  text-gray-200 px-[10px]focus:outline-none"
                    placeholder="Search"
                  />
                  <MdOutlineSearch className="text-[1.1em] text-gray-600" />
                </div>
              </div>
              <div className="flex items-center">
                <Link to={'/cabinet'} className={`${savedLogin ? 'block' : 'hidden'} flex items-center justify-center`}>
                  <div className="font-cormorant hidden bg-gray-200 relative  bp1200:flex text-[.6em] border-[1px] border-gray-600  h-[30px]  items-center justify-center w-[30px] rounded-full p-[16px]">
                    
                     <span>{savedLogin?.name[0]}.{savedLogin?.lastname[0]}</span> 

                  </div>
                </Link>
                <IoPersonOutline
                  onClick={() => {
                    setShowLogin(savedLogin ? false : !showLogin)
                  }}
                  className={`hidden cursor-pointer bp1200:block`}
                />

              </div>
              <div className="flex items-center gap-[12px]">
                <Link to={"/wishlist"}>
                  <div className="relative z-10">
                    <GoHeart className="cursor-pointer" />
                    {dataFav.length > 0 ? (
                      <div className="absolute top-[15px] right-0 text-[.5em] px-[5px] py-[2px] rounded-full bg-black text-white">
                        <p>{dataFav.length}</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
                <div
                  onClick={() => {
                    setShowBag(true);
                  }}
                  className="cursor-pointer relative"
                >
                  <BsBag className="cursor-pointer" />

                  {basket.length > 0 ? (
                    <div className="absolute top-[15px] right-0 text-[.5em] px-[5px] py-[2px] rounded-full bg-black text-white">
                      <p>{basket.length}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  );
}

export default Header;
