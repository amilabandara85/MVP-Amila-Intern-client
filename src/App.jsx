import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../src/styles/App.css';
import { Layout } from './Layout';
import { NavMenu } from './components/navmenu/NavMenu';

import { StoreTable } from './pages/stores/StoreTable';
import CustomerTable from './pages/customer/CustomerTable';
//import { CustomerTable } from './pages/customer/CustomerTable';
import { ProductTable } from './pages/product/ProductTable';
import { SalesTable } from './pages/sales/SalesTable';



function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    

    return (
      <BrowserRouter>
        
       

        <div className="min-h-screen bg-auto flex flex-col">
        <nav className="navbar">
        <div className="navbar-brand"><Link to="/NavMenu">Amila Onboarding</Link></div>
        <ul className="navbar-nav">
       
        <li><Link to="/CustomerTable">Customers</Link></li>
        <li><Link to="/ProductTable">Product</Link></li>
        <li><Link to="/StoreTable">Stores</Link></li>
        <li><Link to="/SalesTable">Sales</Link></li>
      </ul>
    </nav>

        <Routes>

                    
        <Route path="/CustomerTable" element={<CustomerTable />} />
        <Route path="/ProductTable" element={<ProductTable />} />
        <Route path="/StoreTable" element={<StoreTable /> }/>
        <Route path="/SalesTable" element={<SalesTable />} />

       </Routes>

        </div>
        
     </BrowserRouter >
    );

   
}

export default App;
