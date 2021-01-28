import Logo from '../Logo/logo';

const MainNav = () => (
    <header className="main-nav material material-black" >
        <a className="main-nav_logo-wrapper" href="/">
            <Logo color="white"/>
            <h4 className="main-nav_app-name" >Dossiers</h4>
        </a>
        <a href="/listing"> Listings</a>
    </header>
);

export default MainNav;