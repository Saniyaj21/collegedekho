import { FaSearch } from "react-icons/fa";
import "../styles/pages/searchpage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearSearch,
	searchCollegeByCourseSlice,
	selectCollege,
} from "../redux/slices/collegeSlice";
import TextOverFlowHandle from "../helpers/TextOverFlowHandle";
import { Link } from "react-router-dom";

const SearchPage = () => {
	const [keyword, setKeyword] = useState("");

	const dispatch = useDispatch();
	const { searchResult } = useSelector(selectCollege);
	console.log("test", searchResult);

	useEffect(() => {}, [searchResult?.length]);
	useEffect(() => {
		dispatch(clearSearch());
	}, []);

	return (
		<div className='search-page '>
			<h1 className='font-p'>Search Colleges</h1>
			<div className='search-container gb-shadow'>
				<input
					onChange={(e) => setKeyword(e.target.value)}
					value={keyword}
					className='font-p'
					type='text'
				/>
				<button
					onClick={() => dispatch(searchCollegeByCourseSlice({ keyword }))}
					className='flex-center'
				>
					<span className='font-p '>Search</span>
					<FaSearch />
				</button>
			</div>

			<div className='search-section-main'>
				{keyword && (
					<h2 className='font-p section-head'>Colleges has {keyword}</h2>
				)}
				{searchResult &&
					searchResult?.map((college) => {
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
	);
};

export default SearchPage;
