import { useDispatch } from "react-redux";
import "../styles/components/userCard.css";
import {
	getAllUserSlice,
	makeAdminSlice,
	makeUserSlice,
} from "../redux/slices/adminSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

const UserCard = ({ user, setRefresh, refresh }) => {
	const dispatch = useDispatch();

	const handleAdmin = () => {
		dispatch(makeAdminSlice(user?._id));
		setRefresh(!refresh);
		toast.success('admin')
	};
	const handleUser = () => {
		setRefresh(!refresh);
		dispatch(makeUserSlice(user?._id));
		toast.success('user')
	};

	return (
		<div className='user-card-main gb-shadow'>
			<div>
				<img src={user?.profilePic} alt='' />
				<div>
					<span className='font-p'>{user?.name}</span>
					<span>{user?.role}</span>
				</div>
			</div>
			{user?.role === "admin" ? (
				<button onClick={() => handleUser()} className='font-p'>
					Make User
				</button>
			) : (
				<button onClick={() => handleAdmin()} className='font-p'>
					Make Admin
				</button>
			)}
		</div>
	);
};

export default UserCard;
