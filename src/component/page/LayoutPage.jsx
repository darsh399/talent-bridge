import {Outlet }from 'react-router-dom';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';
const LayoutPage = () => {
    return(
        <div>
           <Header/>
           <Outlet/>
           <Footer/>
        </div>
    )
}

export default LayoutPage;