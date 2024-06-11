import React from 'react'
import CIcon from '@coreui/icons-react'
// import logo from '../src/assets/images/image.png';
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilUser,
  cilSpeedometer,
  cilStar,
  cilLocationPin,
  cilNewspaper,
  cilInfo,
  cilBuilding,
  cilInstitution,
  cilUserX,
  cilSquare,
  cilHome,
  cilBriefcase,
  cilCircle,
  cilLoopCircular,
  cibAmazon,
  cilGlobeAlt,
  cilMap,
  cilOpacity,
  cilHouse,
  cilSitemap,
  cilBullhorn,
  cilWallet,

} from '@coreui/icons'
import { CHeader, CHeaderBrand, CHeaderNav, CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import logo from '../src/assets/images/image.png'
import { Title } from 'chart.js'
import { to } from 'react-spring'

const _nav = [
  // {
  //   component: () => (
  //     <div className="d-flex align-items-center">
  //       <img src={logo} alt="Logo" style={{ width: '32px', height: '32px', marginLeft: '10px' }} />
  //       <span style={{ marginLeft: '10px' }}>NanaBar Samaj</span>
  //     </div>
  //   ),
  // },
  {
    component: CHeader,
    name: <span style={{color:'initial',marginLeft:'0px',marginTop:'5px', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif'}}>NanaBar-Samaj</span>, // Set the title here
    to: '/dashboard',
    icon: <img src={logo} alt="Logo" className="nav-icon" style={{ marginLeft: '2px', width: '35px', height: '35px' }} />,
    style: { backgroundColor: 'blur', color: 'white', padding: '5px',marginTop:'-5px',marginLeft:'-5px' }
  }, 
  {
    component: CNavTitle,
    name: 'Home',
  },
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    component: CNavItem,
    name: 'Users',
    to: '/Home/Users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Profile',
  //   to: '/Home/Profile',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'News',
    to: '/Home/News',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Business',
    to: '/Home/Business',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pragati Mandal',
    to: '/Home/pragatimandal',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Besnu',
    to: '/Home/Besnu',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Career',
    to: '/Home/Career',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Location',
  },
  {
    component: CNavItem,
    name: 'Country',
    to: '/Home/Country',
    icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'State',
    to: '/Home/State',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'City',
    to: '/Home/City',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Village',
    to: '/Home/Village',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
  },
]

export default _nav
