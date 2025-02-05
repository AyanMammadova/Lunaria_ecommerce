import React, { createContext, useEffect, useState } from "react";
import { getDataAll, getDataCategories } from "../services/api";
import { useLocation } from "react-router-dom";
export const DATA = createContext(null);
function DataContext({ children }) {
  const loca = useLocation();
  const [quickId, setQuickId] = useState(null)
  const [showQuick,setShowQuick]=useState(false)
  const [showFilter, setShowFilter] = useState(false);
  const [dataCategory, setDataCategory] = useState(null);
  const [dataByCategory, setDataByCategory] = useState(null);
  const [dataAll, setDataAll] = useState(null);
  const [dataDiscounted, setDataDiscounted] = useState(null);
  const [dataFav, setDataFav] = useState(
    JSON.parse(localStorage.getItem("favData")) || []
  );

  useEffect(() => {
    getDataCategories().then((res) => {
      setDataCategory(res);
    });
    getDataAll().then((res) => {
      setDataAll(
        res.data.map((item) => ({
          ...item,
        }))
      );
    });
  }, []);
  function handleFavs(id) {
    if (dataFav) {
      if (!dataFav.find((item) => item.id == id)) {
        setDataFav([...dataFav, ...dataAll.filter((item, i) => item.id == id)]);
      } else {
        setDataFav(dataFav.filter((item) => item.id != id));
      }
    } else {
      setDataFav(dataAll.filter((item, i) => item.id == id));
    }
  }
  useEffect(() => {
    localStorage.setItem("favData", JSON.stringify(dataFav));
  }, [dataFav]);
  useEffect(() => {
    setDataDiscounted(
      dataAll
        ?.filter((item) => item.discount > 1)
        .sort((a, b) => b.discount - a.discount)
    );
  }, [dataAll]);
  const footerData = [
    {
      "category": "Emporium",
      "shown":false,
      "subcats": ["About us", "Store Information"]
    },
    {
      "category": "Customer service",
      "shown":false,
      "subcats": ["Gift cards", "Loyalty program", "FAQ", "Contact us"]
    },
    {
      "category": "Online shopping",
      "shown":false,
      "subcats": ["Delivery terms", "Return and exchange", "Payment methods"]
    },
    {
      "category": "Store Contact",
      "shown":false,
      "subcats": ["+994 51 225 96 96", "51, 153 Neftchiler Avenue"]
    }
  ]
  const dataFilter = [
    {
      name: "colors",
      isOpen: false,
      id: 2
    },
    {
      name: "brands",
      isOpen: false,
      id: 3
    },
    {
      name: "discount",
      isOpen: true,
      id: 4
    },
    {
      name: "sizes",
      isOpen: false,
      id: 5
    },
    {
      name: "price",
      isOpen: false,
      id: 6
    }
  ];
  const imgsforsubcats = [
    [
      "https://www.emporium.az/b/home/0609triple-banner-1-.gif?v=2224",
      "https://www.emporium.az/b/home/0609triple-banner-2.jpg?v=1001",
      "https://www.emporium.az/b/home/0609Triple-banner-3-.gif?v=2224",
    ],
    [
      "https://tradium.ibradev.me/img/24Triple-man-1_.jpeg",
      "https://tradium.ibradev.me/img/24triple-man-2.gif",
      "https://tradium.ibradev.me/img/24triple-man-3.jpg",
    ],
    [
      "https://www.emporium.az/b/home/24triple-kids-banner-1.jpg?v=0412",
      "https://www.emporium.az/b/home/24triple-kids-banner-2.jpg?v=0412",
      "https://www.emporium.az/b/home/24triple-kids-banner-3.jpg?v=0412",
    ],
    [
      "https://www.emporium.az/b/home/24triple-jewelry-1.jpg?v=2310",
      "https://www.emporium.az/b/home/jewellery_triple_banner_2.jpg?v=140324",
      "https://www.emporium.az/b/home/jewellery_triple_banner_3.jpg?v=140324",
    ],
    [
      "https://www.emporium.az/b/home/24triple-banner-beauty-1.jpg?v=0412",
      "https://www.emporium.az/b/triple-banner-2.jpg?v=12345",
      "https://www.emporium.az/b/home/24triple-banner-3.jpg?v=0412",
    ],
    [
      "https://tradium.ibradev.me/img/24triple-home-12.jpg",
      "https://tradium.ibradev.me/img/24triple-home-2.jpg",
      "https://tradium.ibradev.me/img/24triple-home-11.jpg",
    ],
  ];
  const imgsforfooter = [
    "https://www.emporium.az/i/social/instagram-1.jpg?v=120724",
    "https://www.emporium.az/i/social/instagram-2.jpg?v=120724",
    "https://www.emporium.az/i/social/instagram-3.jpg?v=120724",
    "https://www.emporium.az/i/social/instagram-4.jpg?v=120724",
    "https://www.emporium.az/i/social/instagram-5.jpg?v=120724  ",
    "https://www.emporium.az/i/social/instagram-6.jpg?v=120724",
    "https://tradium.ibradev.me/img/instagram-1.jpg",
    "https://tradium.ibradev.me/img/instagram-3.jpg",
    "https://tradium.ibradev.me/img/instagram-5.jpg",
    "https://tradium.ibradev.me/img/instagram-4.jpg",
    "https://tradium.ibradev.me/img/instagram-6.jpg",
  ];
  const imgsformenu = [
    "https://www.emporium.az/b/cat/28-81-women-accessories.jpg?v=140324",
    "https://www.emporium.az/b/cat/29-313-men-clothing.jpg?v=140324",
    "https://www.emporium.az/b/cat/23-547-girls.jpg?v=140324",
    "https://www.emporium.az/b/cat/16-611-necklaces.jpg?v=140324",
    "https://www.emporium.az/b/cat/8-269-skin-care.jpg?v=140324",
    "https://www.emporium.az/b/cat/1-586-bathroom.jpg?v=140324",
  ];
  const imgsfordeps = [
    "https://www.emporium.az/i/maincard/cat_65.jpg?v=1.8.23",
    "https://www.emporium.az/i/maincard/cat_1.jpg?v=1.8.23",
    "https://www.emporium.az/i/maincard/cat_189.jpg?v=1.8.23",
    "https://www.emporium.az/i/maincard/cat_297.jpg?v=1.8.23",
    "https://www.emporium.az/b/beauty-page-main-banner-desktop.jpg?v=140324",
    "https://www.emporium.az/i/maincard/cat_228.jpg?v=1.8.23",
  ];

  return (
    <>
      <DATA.Provider
        value={{
          dataAll,
          dataCategory,
          setDataCategory,
          dataByCategory,
          imgsformenu,
          imgsfordeps,
          imgsforfooter,
          dataDiscounted,
          setDataDiscounted,
          imgsforsubcats,
          dataFilter,
          handleFavs,
          setDataFav,
          dataFav,
          showFilter,
          setShowFilter,
          footerData,
          showQuick,
          setShowQuick,
          quickId, 
          setQuickId
        }}
      >
        {children}
      </DATA.Provider>
    </>
  );
}

export default DataContext;
