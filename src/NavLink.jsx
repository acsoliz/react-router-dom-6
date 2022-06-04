import { NavLink as NavLinkReactRouer } from 'react-router-dom';

export const NavLink = ({to, children, ...props}) => {
	return(
        <NavLinkReactRouer
            {...props}
            className={({isActive})=>isActive? 'is-active': undefined}
            to={to}
        >{children}
        </NavLinkReactRouer>)
};


