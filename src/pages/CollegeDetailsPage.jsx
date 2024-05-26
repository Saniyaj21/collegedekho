import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	getCollegeDetailsSlice,
	selectCollege,
} from "../redux/slices/collegeSlice";
import '../styles/pages/CollegeDetailsPage.css'


const CollegeDetailsPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { selectedCollege } = useSelector(selectCollege);
	useEffect(() => {
		dispatch(getCollegeDetailsSlice(id));
	}, [id]);

	return (
		<div className="details-page">
			<div className='head-college-details'>
				<div>
					<img
						src={selectedCollege?.logo?.url}
						alt={selectedCollege?.collegeName}
					/>
				</div>
				<div>
					<h1 className="font-p">{selectedCollege?.collegeName}</h1>
					<p className="font-p">{selectedCollege?.address}</p>
				</div>
			</div>
			<div className='course-details'>
				<table>
					<tr>
						<th>Course Name</th>
						<th>Course Fess</th>
						<th>Sit Capacity</th>
					</tr>
					{selectedCollege?.courses?.map((course) => (
						<tr>
							<td>{course.courseName}</td>
							<td>Rs. {course.courseFees}</td>
							<td>{course.sit}</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
};

export default CollegeDetailsPage;
