import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../container/ContentWrapper";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

    const handleNavbarVisibility = () => {
      if(window.scrollY > 200) {
        if(window.scrollY > lastScrollY && !mobileMenu) {
            setShow('hide')
        } else {
            setShow('show')
        }
      } else {
        setShow('top')
      }
      setLastScrollY(window.scrollY);
    }

  useEffect(() => {
    window.addEventListener('scroll', handleNavbarVisibility);
    return () => {
        window.removeEventListener('scroll', handleNavbarVisibility);
    }
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu();
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.length > 0) {
      navigate(`/search/${search}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000)
    }
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img
            src="./images/movix-logo.png"
            className="logo-image"
            alt="movie-wave-logo"
          />
          <p className="logo-text">Movie-Wave</p>
        </div>

        <ul className="menu-items">
          <li onClick={() => {
            navigate(`explore/movie`);
            setMobileMenu(false);
          }} className="menu-item">Movies</li>
          <li onClick={() => {
            navigate(`explore/tvShow`);
            setMobileMenu(false);
          }} className="menu-item">TV Shows</li>
          <li className="menu-item">
            <HiOutlineSearch onClick={() => setShowSearch(true)} />
          </li>
        </ul>

        <div className="mobile-menu-items">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="search-bar">
          <ContentWrapper>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search for a movies or TV show..."
                onKeyUp={handleSearch}
                onChange={(e) => setSearch(e.target.value)}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
