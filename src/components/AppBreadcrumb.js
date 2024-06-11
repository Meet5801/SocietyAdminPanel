import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import routes from '../routes';
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';

const AppBreadcrumb = () => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const currentLocation = useLocation().pathname;

    useEffect(() => {
        const getRouteName = (pathname) => {
            const matchingRoute = routes.find(route => {
                const routePathSegments = route.path.split('/');
                const pathnameSegments = pathname.split('/');
                return routePathSegments.length === pathnameSegments.length &&
                    routePathSegments.every((seg, idx) => seg === pathnameSegments[idx] || seg.startsWith(':'));
            });
            return matchingRoute ? (['BesnuInfo', 'CareerInfo', 'BusinessInfo'].includes(matchingRoute.name) ? matchingRoute.name.slice(0, -4) : matchingRoute.name) : false;
        };

        const getBreadcrumbs = (location) => {
            const breadcrumbs = [];
            location.split('/').reduce((prev, curr, index, array) => {
                const currentPathname = `${prev}/${curr}`;
                const routeName = getRouteName(currentPathname);

                const breadcrumbItems = {
                    '/': [{ pathname: '/', name: 'Home', active: false }],
                    '/Home': [{ pathname: '/Home', name: 'Home', active: false }],
                    '/dashboard': [
                        { pathname: '/Home', name: 'Home', active: false },
                        { pathname: currentPathname, name: 'Dashboard', active: true }
                    ],
                    '/Home/Profile': [
                        { pathname: '/dashboard', name: 'Dashboard', active: false },
                        { pathname: currentPathname, name: 'Profile', active: true }
                    ],
                    '/Home/Change-Password': [
                        { pathname: '/dashboard', name: 'Dashboard', active: false },
                        { pathname: currentPathname, name: 'Change-Password', active: true }
                    ],
                    '/Home/Users': [{ pathname: '/Home', name: 'Home', active: false }, { pathname: currentPathname, name: 'Users', active: true }],
                    '/Home/Besnu': [{ pathname: '/Home', name: 'Home', active: false }, { pathname: currentPathname, name: 'Besnu', active: true }],
                    '/Home/pragatimandal': [{ pathname: '/Home', name: 'Home', active: false }, { pathname: currentPathname, name: 'Pragatimandal', active: true }],
                    '/Home/Career': [{ pathname: '/Home', name: 'Home', active: false }, { pathname: currentPathname, name: 'Career', active: true }],
                    '/Home/News': [{ pathname: '/Home', name: 'Home', active: false }, { pathname: currentPathname, name: 'News', active: true }],
                    '/Home/Business': [{ pathname: '/Home', name: 'Home', active: false }, { pathname: currentPathname, name: 'Business', active: true }],
                    '/Home/Country': [{ pathname: '/Home', name: 'Home', active: false }, { pathname: currentPathname, name: 'Country', active: true }],
                    '/Home/State': [{ pathname: '/Home', name: 'Home', active: false }, { pathname: currentPathname, name: 'State', active: true }],
                    '/Home/City': [{ pathname: '/Home', name: 'Home', active: false }, { pathname: currentPathname, name: 'City', active: true }],
                    '/Home/Village': [{ pathname: '/Home', name: 'Home', active: false }, { pathname: currentPathname, name: 'Village', active: true }],
                    'UserInfo': [{ pathname: '/Home/Users', name: 'Users', active: false }, { pathname: currentPathname, name: 'Details', active: index + 1 === array.length }],
                    'NewsInfo': [{ pathname: '/Home/News', name: 'News', active: false }, { pathname: currentPathname, name: 'Details', active: index + 1 === array.length }],
                    'Business': [{ pathname: '/Home/Business', name: 'Business', active: false }, { pathname: currentPathname, name: 'Details', active: index + 1 === array.length }],
                    'Besnu': [{ pathname: '/Home/Besnu', name: 'Besnu', active: false }, { pathname: currentPathname, name: 'Details', active: index + 1 === array.length }],
                    'Career': [{ pathname: '/Home/Career', name: 'Career', active: false }, { pathname: currentPathname, name: 'Details', active: index + 1 === array.length }],
                    'MemberInfo': [{ pathname: '/Home/Member', name: 'Member', active: false }, { pathname: currentPathname, name: 'Details', active: index + 1 === array.length }],
                };

                const specialPaths = ['/dashboard', '/Home/Profile', '/Home/Change-Password', '/Home/Users', '/Home/Besnu', '/Home/pragatimandal', '/Home/Career', '/Home/News', '/Home/Business', '/Home/Country', '/Home/State', '/Home/City', '/Home/Village'];
                if (specialPaths.includes(currentPathname)) {
                    breadcrumbs.push(...breadcrumbItems[currentPathname]);
                } else if (breadcrumbItems[routeName]) {
                    breadcrumbs.push(...breadcrumbItems[routeName]);
                } else {
                    routeName && breadcrumbs.push({ pathname: currentPathname.includes('/Home') ? currentPathname.substring(5) : currentPathname, name: routeName, active: index + 1 === array.length });
                }
                return currentPathname;
            });
            return breadcrumbs;
        };

        setBreadcrumbs(getBreadcrumbs(currentLocation));
    }, [currentLocation]);

    return (
        <CBreadcrumb className="my-0">
            {breadcrumbs.map((breadcrumb, index) => (
                <CBreadcrumbItem key={index} active={breadcrumb.active}>
                    {breadcrumb.active ? breadcrumb.name : <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>}
                </CBreadcrumbItem>
            ))}
        </CBreadcrumb>
    );
};

export default React.memo(AppBreadcrumb);
