import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavbarDashboard = () => {
    const {user, users, loading, error} = useSelector((state) => state.user);
     
    return(
        <div>
            {
                user.role === 'hr' && 
            }

        </div>
    )
}



export default NavbarDashboard;