import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/pages/dashboardPage.css";
import UserSection from "../components/UserSection";
import CollegeSection from "../components/CollegeSection";
import AddCollegeSection from "../components/AddCollegeSection";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const DashBoardPage = () => {
	const [activeCard, setActiveCard] = useState("users");
	const { user } = useSelector(selectUser);
	const navigate = useNavigate();
	useEffect(() => {
		if (user.role !== "admin") {
			navigate("/");
		}
	}, []);

	return (
		<div className='dashboard-main'>
			<Sidebar setActiveCard={setActiveCard} activeCard={activeCard} />
			<div className='dashboard-content'>
				{activeCard === "users" ? <UserSection /> : ""}
				{activeCard === "colleges" ? <CollegeSection /> : ""}
				{activeCard === "addCollege" ? <AddCollegeSection /> : ""}
			</div>
		</div>
	);
};

export default DashBoardPage;
