import { NavLink, Link, useResolvedPath, useMatch } from 'react-router-dom'
import type { LinkProps } from "react-router-dom";
import styled from 'styled-components'


const Navbar = () => {

  const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
  `

  const LinkWrapper = styled.a`
    display: inline;
    margin-right: 30px;
    `

  const CustomLink = ({ children, to }: LinkProps) => {
    const resolved = useResolvedPath(to);
    //useMatch to match the current location with the url
    const match = useMatch({ path: resolved.pathname });

    return <LinkWrapper>
      <div className={`${match ? "text-red-600" : ""}`}>
        <NavLink
          to={to}
        >
          {children}
        </NavLink>
      </div>
    </LinkWrapper>
  }


  return (
    <div className='navbar shadow-outline h-16 pt-5 pb-5 bg-white shadow-lg'>
      <Wrapper>
        <CustomLink to={'/'}>
          Home
        </CustomLink>
        <CustomLink to={'/store'}>Store</CustomLink>
        <CustomLink to={'/about'}>About</CustomLink>
      </Wrapper>
    </div>
  );
};

export default Navbar;