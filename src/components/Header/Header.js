import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {  useHistory} from 'react-router'
import { GiHamburgerMenu, GiFiles } from "react-icons/gi";
import { RiContactsBookLine } from "react-icons/ri";
import { BsQuestionSquare,BsInfoSquare,BsFillPlusSquareFill } from "react-icons/bs";
import {BsFillEyeFill,BsFillHouseDoorFill,BsFillStarFill,BsChatFill,BsFillPeopleFill,BsCardList,BsFilm,BsChevronRight,BsEnvelope } from "react-icons/bs";
import {IoNotificationsOutline} from 'react-icons/io5';
import '../../styles/header.css'

export default function Header() {

    const history = useHistory()
 
    const [adminInfo,setAdminInfo]=useState('') 
    
    
    
    const [sidebarClass,setSidebarClass]=useState(true)
    
    const [profileInfoClass,setProfileInfoClass]=useState(false)
    
    const[donationsClassname,setDonationsClassname]=useState(false)
    const[newsClassname,setNewsClassname]=useState(false)
    const[pagesClassname,setPagesClassname]=useState(false)
    const[faqClassname,setFaqClassname]=useState(false) 
    
    const[donationsArrowClass,setDonationsArrowClass]=useState(true)
    const[newsArrowClass,setNewsArrowClass]=useState(true)
    const[pagesArrowClass,setPagesArrowClass]=useState(true)
    const[faqArrowClass,setFaqArrowClass]=useState(true)
    
    const toggleSidebarClass=()=>{ 
      setSidebarClass(!sidebarClass)
    }
    const toggleProfileClass=()=>{
      setProfileInfoClass(!profileInfoClass)
    }
    
    const toggleDropdown=(section)=>{ 
      switch(section){
        case "news":
          setNewsClassname(!newsClassname)
          setNewsArrowClass(!newsArrowClass)
        break;
        case "donations":
          setDonationsClassname(!donationsClassname)
          setDonationsArrowClass(!donationsArrowClass)
        break;
        case "faq":
          setFaqClassname(!faqClassname)
          setFaqArrowClass(!faqArrowClass)
        break;
        case "pages":
          setPagesClassname(!pagesClassname)
          setPagesArrowClass(!pagesArrowClass)
        break;
       default: return null
      }
    }


    return (
        <div className="header-container"> 
          <div className="top-header-container">
            <div className="header-logo-container">
                <a href="/dashboard" className="logo-text">HELPING HANDS</a>
                <div className="hamburger-icon" onClick={toggleSidebarClass}>
                  <GiHamburgerMenu/>
                </div>
            </div>
          
            <div className="header-profile-container">
                <IoNotificationsOutline className="notification-icon" />
                <BsEnvelope className="envelope-icon"/>
                {/* <img className="header-profile-img" src={url} alt="pic" onClick={toggleProfileClass}/> */}
                <div className={profileInfoClass ? "profile-info-container-open" : "profile-info-container-closed"}>
                    {/* <div>Welcome {adminInfo.firstname}</div> */}
                    {/* <div className="logout-text"><p onClick={logout}>Logout</p></div> */}
                </div>
            </div>
          </div>
         
          <div className={sidebarClass===true?"sidebar-container":"sidebar-container-overlay"}>
              <div className="menu-item"><a href="/dashboard"><BsFillHouseDoorFill/> Dashboard</a></div>
              <div className="menu-item">      
                       <div> <BsFilm/> News</div>
                       <div>
                         <BsChevronRight className={newsArrowClass===true?"sidebar-right-arrow":"sidebar-down-arrow"} onClick={(e)=>{toggleDropdown("news")}}/>
                       </div>             
              </div>
              <div className={newsClassname===false?"dropdown-closed":"dropdown-open"}>
                        <div className="dropdown-item"> <BsFillPlusSquareFill/> <a href="/addnews">Add News</a></div>
                        <div className="dropdown-item"> <BsFillEyeFill/> <a href="/news">News List</a></div>
              </div> 
              <div className="menu-item" onClick={(e)=>{toggleDropdown("donations")}} >
                       <div><BsCardList/> Donations</div> 
                       <div>
                         <BsChevronRight className={donationsArrowClass===true?"sidebar-right-arrow":"sidebar-down-arrow"}  onClick={(e)=>{toggleDropdown("donations")}}/>
                       </div>
              </div>
              <div className={donationsClassname===false?"dropdown-closed":"dropdown-open"}>    
                        <div className="dropdown-item"> <BsFillEyeFill/> <a href="/ambassadors"> Ambassadors</a></div>
                        <div className="dropdown-item"> <BsFillEyeFill/> <a href="/goods-donations"> Goods Donations</a></div>
                        <div className="dropdown-item"> <BsFillEyeFill/> <a href="/time-donations"> Time Donations</a></div>
                        <div className="dropdown-item"> <BsFillEyeFill/> <a href="/giftcard-donations"> Gift Cards</a></div>
              </div>
              <div className="menu-item"><a href="/sliders"> <BsFillStarFill/> Sliders</a></div>
              <div className="menu-item"><a href="/users"> <BsFillPeopleFill/> Users</a></div>
              <div className="menu-item"><a href="/emaillist"> <BsFillPeopleFill/> Email List</a></div>
              <div className="menu-item"> <RiContactsBookLine/> <a href="/messages">&nbsp;Messages</a></div>
              <div className={faqClassname===false?"dropdown-closed":"dropdown-open"}>
                        <div className="dropdown-item"> <BsFillPlusSquareFill/> <a href="/addfaq">Add FAQ</a></div>
                        <div className="dropdown-item"> <BsFillEyeFill/> <a href="/faqs">FAQ List</a></div>
              </div>
              <div className="menu-item">
                       <div> <GiFiles/> Pages </div>
                       <div>
                         <BsChevronRight className={pagesArrowClass===true?"sidebar-right-arrow":"sidebar-down-arrow"}  onClick={(e)=>{toggleDropdown("pages")}}/>
                       </div>
              </div> 
              <div className={pagesClassname===false?"dropdown-closed":"dropdown-open"}>
                        <div className="dropdown-item"> <BsInfoSquare/> <a href="/about">About Us</a></div>
                        <div className="dropdown-item"> <BsInfoSquare/> <a href="/privacypolicy">Privacy Policy</a></div>
                        <div className="dropdown-item"> <BsInfoSquare/> <a href="/termsofuse">Terms of Use</a></div>
                        <div className="dropdown-item"> <BsInfoSquare/> <a href="/contactinfo">Contact Info</a></div>
              </div>             
          </div>
        </div>
    )
}
