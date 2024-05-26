import { useEffect } from "react";
import "../styles/pages/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
	getAllCollegesSlice,
	selectCollege,
} from "../redux/slices/collegeSlice";
import TextOverFlowHandle from "../helpers/TextOverFlowHandle";

const Home = () => {
	const { user, isAuthenticated } = useSelector(selectUser);
	const { allColleges } = useSelector(selectCollege);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllCollegesSlice());
	}, [isAuthenticated]);

	return (
		<div className='home-container'>
			{isAuthenticated ? (
				<div className='college-container'>
					<h1 className='font-p flex-center'>Suggested Colleges</h1>

					<div className='search-section-main'>
						{allColleges &&
							allColleges?.map((college) => {
								return (
									<div className='college-card-main gb-shadow'>
										<Link to={`/college/${college?._id}`}>
											<img src={college?.logo?.url} alt='' />
											<div>
												<span className='font-p'>{college?.collegeName}</span>
												<span>
													<TextOverFlowHandle
														text={college?.address}
														size={60}
													/>
												</span>
											</div>
										</Link>
									</div>
								);
							})}
					</div>
				</div>
			) : (
				<div className='tagline-container'>
					<h1 className='tagline font-p'>
						Find Your Dream College
						<br /> with CollegeDekho
					</h1>
					<p className='sub-tagline font-p'>
						Empowering Students to Discover Their Future
					</p>
					<Link className='cta font-p flex-center gap-8' to={"/search"}>
						Search Now <FaSearch />
					</Link>
				</div>
			)}
		</div>
	);
};

export default Home;
