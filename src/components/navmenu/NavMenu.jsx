import { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

 

    render() {
        return (

            <nav className="navbar">
                <div className="navbar-brand">Amila Onboarding</div>
                <ul className="navbar-nav">
                    {/* Notice the active link text is changed to "Stores" for this view */}
                    <li>
                        <Link to="/NavMenu">Home</Link>
                     </li>
                     <li>
                        <Link to="/CustomerTable">Customer</Link>
                     </li>
                    <li>
                        <a href="#">Products</a>
                        </li>
                    <li>
                        <Link to="/StoreTable">Stores</Link>
                        </li>
                    <li>
                        <a href="#">Sales</a>
                        </li>
                </ul>
            </nav>
            
            
        );
}
}
 

