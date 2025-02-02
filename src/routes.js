  import React from 'react'

  const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
  const Users = React.lazy(() => import('./views/Home/Users/Users'))
  const pragatimandal = React.lazy(() => import('./views/Home/Pragatimandal/pragatimandal'))
  const Besnu = React.lazy(() => import('./views/Home/Besnu/Besnu'))
  const Country = React.lazy(() => import('./views/Home/Country/Country'))
  const State = React.lazy(() => import('./views/Home/State/State'))
  const City = React.lazy(() => import('./views/Home/City/City'))
  const Village = React.lazy(() => import('./views/Home/Village/Village'))
  const Career = React.lazy(() => import('./views/Home/Career/Career'))
  const MemberAdd = React.lazy(() => import('./views/Home/Member/Add'))
  const MemberUpdate = React.lazy(() => import('./views/Home/Member/Update'))
  const UserInfo = React.lazy(() => import('./views/Home/Info/UserInfo'))
  const NewsInfo = React.lazy(() => import('./views/Home/Info/NewsInfo'))
  const BusinessInfo = React.lazy(() => import('./views/Home/Info/BusinessInfo'))
  const BensuInfo = React.lazy(() => import('./views/Home/Info/BesnuInfo'))
  const careerInfo = React.lazy(() => import('./views/Home/Info/CareerInfo'))
  const MemberInfo = React.lazy(() => import('./views/Home/Info/MemberInfo'))
  const News = React.lazy(() => import('./views/Home/News/News'))
  const business = React.lazy(() => import('./views/Home/Business/business'))
  const Profile = React.lazy(() => import('./views/Home/Profile/Profile'))
  const ChangePassword = React.lazy(() => import('./views/pages/Change-Password'))

  // Base
  const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
  const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
  const Cards = React.lazy(() => import('./views/base/cards/Cards'))
  const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
  const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
  const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
  const Navs = React.lazy(() => import('./views/base/navs/Navs'))
  const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
  const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
  const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
  const Progress = React.lazy(() => import('./views/base/progress/Progress'))
  const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
  const Tables = React.lazy(() => import('./views/base/tables/Tables'))
  const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

  // Buttons
  const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
  const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
  const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

  //Forms
  const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
  const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
  const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
  const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
  const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
  const Range = React.lazy(() => import('./views/forms/range/Range'))
  const Select = React.lazy(() => import('./views/forms/select/Select'))
  const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

  const Charts = React.lazy(() => import('./views/charts/Charts'))

  // Icons
  const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
  const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
  const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

  // Notifications
  const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
  const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
  const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
  const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

  const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

  const routes = [
    { path: '/', exact: true, name: 'Home'  },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    // { path: '/home', name: 'Dashboard', element: Dashboard },
    { path: '/Home/Users', name: 'Users', element: Users },
    { path: '/Home/Member', name: 'Users', element: Users },
    { path: '/Home/Change-Password', name: 'Change-password', element: ChangePassword },
    { path: '/Home/pragatimandal', name: 'pragatimandal', element: pragatimandal },
    { path: '/Home/Besnu', name: 'Besnu', element: Besnu },
    { path: '/Home/Career', name: 'Career', element: Career },
    { path: '/Home/Profile', name: 'Profile', element: Profile },
    { path: '/Home/News', name: 'News', element: News },
    { path: '/Home/Business', name: 'business', element: business },
    { path: '/Home/Country', name: 'Country', element: Country },
    { path: '/Home/State', name: 'State', element: State },
    { path: '/Home/City', name: 'City', element: City },
    { path: '/Home/Village', name: 'Village', element: Village },
    { path: '/Home/Member/:id', name: 'Add', element: MemberAdd },
      { path: '/Home/Member/:userId/:memberId', name: 'MemberUpdate', element: MemberUpdate },
      { path: '/Users/Details/:id', name: 'UserInfo', element: UserInfo },
      { path: '/News/Details/:id', name: 'NewsInfo', element: NewsInfo },
      { path: '/Besnu/Details/:id', name: 'BesnuInfo', element: BensuInfo },
      { path: '/Career/Details/:id', name: 'CareerInfo', element: careerInfo },
      { path: '/Member/Details/:id', name: 'MemberInfo', element: MemberInfo },
      { path: '/Business/Details/:id', name: 'BusinessInfo', element: BusinessInfo },
    { path: '/base', name: 'Base', element: Cards, exact: true },
    { path: '/base/accordion', name: 'Accordion', element: Accordion },
    { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
    { path: '/base/cards', name: 'Cards', element: Cards },
    { path: '/base/carousels', name: 'Carousel', element: Carousels },
    { path: '/base/collapses', name: 'Collapse', element: Collapses },
    { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
    { path: '/base/navs', name: 'Navs', element: Navs },
    { path: '/base/paginations', name: 'Paginations', element: Paginations },
    { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
    { path: '/base/popovers', name: 'Popovers', element: Popovers },
    { path: '/base/progress', name: 'Progress', element: Progress },
    { path: '/base/spinners', name: 'Spinners', element: Spinners },
    { path: '/base/tables', name: 'Tables', element: Tables },
    { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
    { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
    { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
    { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
    { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
    { path: '/charts', name: 'Charts', element: Charts },
    { path: '/forms', name: 'Forms', element: FormControl, exact: true },
    { path: '/forms/form-control', name: 'Form Control', element: FormControl },
    { path: '/forms/select', name: 'Select', element: Select },
    { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
    { path: '/forms/range', name: 'Range', element: Range },
    { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
    { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
    { path: '/forms/layout', name: 'Layout', element: Layout },
    { path: '/forms/validation', name: 'Validation', element: Validation },
    { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
    { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
    { path: '/icons/flags', name: 'Flags', element: Flags },
    { path: '/icons/brands', name: 'Brands', element: Brands },
    { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
    { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
    { path: '/notifications/badges', name: 'Badges', element: Badges },
    { path: '/notifications/modals', name: 'Modals', element: Modals },
    { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
    { path: '/widgets', name: 'Widgets', element: Widgets },


  ]

  export default routes
