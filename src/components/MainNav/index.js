import Logo from '../Logo/logo';

const MainNav = ({user}) => (
    <header className="main-nav material material-black" >
        <a className="main-nav_logo-wrapper" href="/">
            <Logo color="white"/>
            <h4 className="main-nav_app-name" >Dossiers</h4>
        </a>
        {user ? 
        <div className="main-nav_links">
            <a className="main-nav_link-button button material" href="/"> Listings</a> 
            <a className="main-nav_link-button button material" href="/profile"> Profile</a> 
        </div>
        : ''}
    </header>
);

export default MainNav;