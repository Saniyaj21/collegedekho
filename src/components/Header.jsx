import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectUser } from "../redux/slices/userSlice";
import { AiOutlineLogin } from "react-icons/ai";
import "../styles/components/Header.css";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const Header = () => {
	const { isAuthenticated, user } = useSelector(selectUser);
	const dispatch = useDispatch();
	
	return (
		<header>
			<nav >
				<div>
					<Link to={"/"} className='logo font-p'>
						<span>CollegeDekho</span>
					</Link>
				</div>

				<div>
				{isAuthenticated ? (
					<div className="flex-center">
						<Link className="flex-center gap-8" to={'/search'}>
                            <span className="font-p search-text">Search</span><FaSearch />
                        </Link>
						<button className='logout-btn font-p flex-center' onClick={() => dispatch(logout())}>
							Logout <RiLogoutCircleLine />
						</button>
						<Link className="flex-center" to={'/profile'}>
						<img
							// src='/media/default_profile.svg'
							src={user?.profilePic}
							alt={user?.name}
							className='profile-pic'
						/></Link>
					</div>
				) : (
					<Link to='/login' className='login-link font-p flex-center'>
						Login <AiOutlineLogin />
					</Link>
				)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
