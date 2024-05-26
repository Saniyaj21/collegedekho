import React, { useEffect, useState } from "react";
import "../styles/components/addCollegeSection.css";
import { useDispatch, useSelector } from "react-redux";
import {
	addCollegeSlice,
	clearStatus,
	selectCollege,
} from "../redux/slices/collegeSlice";
import toast from "react-hot-toast";

const AddCollegeSection = () => {
	const [courses, setcourses] = useState([
		{ id: 1, courseName: "", courseFees: "", sit: "" },
	]);
	const [nextId, setNextId] = useState(2);
	const [collegeName, setCollegeName] = useState("");
	const [address, setAddress] = useState("");
	const [logo, setLogo] = useState("./media/default_profile.svg");

	const dispatch = useDispatch();
	const { status } = useSelector(selectCollege);
	console.log(status.addcollegeStatus);

	useEffect(() => {
		if (status.addcollegeStatus === "success") {
			toast.success("College added");
			setCollegeName("");
			setAddress("");
			setcourses([]);
			setNextId(2);
			setLogo("./media/default_profile.svg");
		}
	}, [status.addcollegeStatus]);
	useEffect(() => {
		dispatch(clearStatus());
	}, []);

	const handleAddTextField = (e) => {
		e.preventDefault();
		setcourses([
			...courses,
			{ id: nextId, courseName: "", courseFees: "", sit: "" },
		]);
		setNextId(nextId + 1);
	};

	const handleChange = (id, e) => {
		const updatedcourses = courses.map((textField) =>
			textField.id === id
				? { ...textField, [e.target.name]: e.target.value }
				: textField
		);
		setcourses(updatedcourses);
	};

	function fileHandle(event) {
		const image = event.target.files[0];

		if (image) {
			const readar = new FileReader();

			readar.addEventListener("load", function () {
				setLogo(readar.result);
			});

			readar.readAsDataURL(image);
		}
	}

	const handleAddCollege = () => {
		if (!collegeName || !courses || courses.length === 0) {
			toast.error("Please enter college details");
			return;
		}
		if (logo == "./media/default_profile.svg") {
			toast.error("Please upload college Logo");
			return;
		}
		
		dispatch(addCollegeSlice({ collegeName, address, logo, courses }));
	};

	return (
		<div className='add-college-main'>
			<h2 className='font-p section-head'>Add College</h2>
			<div>
				<div>
					<input
						type='text'
						onChange={(e) => setCollegeName(e.target.value)}
						value={collegeName}
						placeholder='College Name'
					/>
				</div>
				<div>
					<input
						type='text'
						onChange={(e) => setAddress(e.target.value)}
						value={address}
						placeholder='Address'
					/>
				</div>
				<div className='logo-div'>
					<img src={logo} alt='' />
					<label htmlFor='imageUpload' className='font-p custom-file-upload'>
						Upload Logo
					</label>
					<input
						id='imageUpload'
						type='file'
						accept='image/*'
						onChange={fileHandle}
					/>
				</div>

				<div className='course-div'>
					{courses.map((textField) => (
						<div key={textField.id}>
							<input
								type='text'
								value={textField.courseName}
								name='courseName'
								required
								onChange={(e) => handleChange(textField.id, e)}
								placeholder='Course Name'
							/>
							<input
								type='number'
								value={textField.courseFees}
								name='courseFees'
								onChange={(e) => handleChange(textField.id, e)}
								placeholder='Course Fees'
							/>
							<input
								type='number'
								value={textField.sit}
								name='sit'
								onChange={(e) => handleChange(textField.id, e)}
								placeholder='Course Sit Capacity'
							/>
						</div>
					))}
					<button
						className='font-p'
						onClick={handleAddTextField}
						disabled={courses.some(
							(field) => field.post === "" || field.courseFees === ""
						)}
					>
						Add Course
					</button>
				</div>

				{status.addcollegeStatus !== "loading" ? (
					<button onClick={handleAddCollege} className='add-college-btn font-p'>
						Add College
					</button>
				) : (
					<button className='add-college-btn font-p'>Creating..</button>
				)}
			</div>
		</div>
	);
};

export default AddCollegeSection;
