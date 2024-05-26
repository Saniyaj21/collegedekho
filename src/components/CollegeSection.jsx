import React, { useEffect, useState } from "react";
import CollegeCard from "./CollegeCard";
import { useDispatch, useSelector } from "react-redux";
import {
	clearStatus,
	deleteCollegeSlice,
	getAllCollegesSlice,
	selectCollege,
} from "../redux/slices/collegeSlice";
import "../styles/components/collegeSection.css";
import toast from "react-hot-toast";

const CollegeSection = () => {
	const dispatch = useDispatch();
	const { allColleges, status } = useSelector(selectCollege);

	useEffect(() => {
		dispatch(getAllCollegesSlice());
		dispatch(clearStatus());
		if (status.deleteCollegeStatus === "success") {
			toast.success("College deleted");
		}
	}, [allColleges?.length]);

	const handleDelete = (id) => {
		toast.success("Deleting..");

		dispatch(deleteCollegeSlice(id));
	};

	return (
		<div className='college-section-main'>
			<h2 className='font-p section-head'>All Colleges</h2>
			{allColleges &&
				allColleges.map((college) => (
					<CollegeCard
						college={college}
						key={college._id}
						handleDelete={handleDelete}
					/>
				))}
		</div>
	);
};

export default CollegeSection;
