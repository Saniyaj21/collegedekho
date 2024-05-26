import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import "../styles/pages/Profilepage.css";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

const ProfilePage = () => {
	// Example data
	const { user } = useSelector(selectUser);

	return (
		<>
			<div className='profile-container'>
				<div className='profile-picture'>
					<img className='' src={user.profilePic} alt='Profile' />
				</div>
				<div className='profile-info font-p'>
					<h2>{user.name}</h2>
					<p>Email: {user.email}</p>
				</div>
			</div>

			{user.role === "admin" && (
				<div className='dashboard-link flex-center'>
					<Link className='flex-center gap-8 font-p' to={"/dashboard"}>
						{" "}
						<span>Manage Dashboards</span>
						<FaExternalLinkAlt />
					</Link>
				</div>
			)}
		</>
	);
};

export default ProfilePage;
