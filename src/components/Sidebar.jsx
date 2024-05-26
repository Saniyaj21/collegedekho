import { FaUsers } from "react-icons/fa";
import { MdAddBusiness } from "react-icons/md";
import { GiVikingLonghouse } from "react-icons/gi";
import "../styles/components/sidebar.css";

const Sidebar = ({ activeCard, setActiveCard }) => {
	console.log(activeCard);
	return (
		<div className='sidebar-main'>
			<div
				onClick={() => setActiveCard("users")}
				className={`${activeCard === "users" ? "active" : ""} font-p`}
			>
				<FaUsers />
				<span className='dash-menu-text'>Users</span>
			</div>
			<div
				onClick={() => setActiveCard("colleges")}
				className={`${activeCard === "colleges" ? "active" : ""} font-p`}
			>
				<GiVikingLonghouse />
				<span className='dash-menu-text'>Colleges</span>
			</div>
			<div
				onClick={() => setActiveCard("addCollege")}
				className={`${activeCard === "addCollege" ? "active" : ""} font-p`}
			>
				<MdAddBusiness />
				<span className='dash-menu-text'>AddCollege</span>
			</div>
		</div>
	);
};

export default Sidebar;
