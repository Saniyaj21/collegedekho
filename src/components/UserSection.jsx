import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserSlice, selectAdmin } from "../redux/slices/adminSlice";
import '../styles/components/userSection.css'


const UserSection = () => {
	const dispatch = useDispatch();
	const { allUsers, status } = useSelector(selectAdmin);
	const [refresh, setRefresh] = useState(true);
	useEffect(() => {
		dispatch(getAllUserSlice());
	}, [refresh]);

	return (
		<div className='user-section'>
			<h2 className='font-p section-head flex-center'>All Users</h2>
			{allUsers &&
				allUsers.map((user) => (
					<UserCard user={user} key={user._id} setRefresh={setRefresh} refresh={refresh} />
				))}
		</div>
	);
};

export default UserSection;
