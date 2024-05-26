import { Link } from "react-router-dom";
import TextOverFlowHandle from "../helpers/TextOverFlowHandle";
import "../styles/components/collegeCard.css";
import { MdDelete } from "react-icons/md";

const CollegeCard = ({ college, handleDelete }) => {
	console.log(college);
	return (
		<div className='college-card-main gb-shadow'>
			<Link Link to={`/college/${college?._id}`}>
				<img src={college?.logo?.url} alt='' />
				<div>
					<span className='font-p'>{college?.collegeName}</span>
					<span>
						<TextOverFlowHandle text={college?.address} size={60} />
					</span>
				</div>
			</Link>

			<button
				onClick={() => handleDelete(college?._id)}
				className='font-p flex-center'
			>
				<MdDelete />
			</button>
			{/* <button className="font-p">Make User</button> */}
		</div>
	);
};

export default CollegeCard;
