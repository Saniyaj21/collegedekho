import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, selectUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login.css";

const Login = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const dispatch = useDispatch();

	const { isAuthenticated } = useSelector(selectUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
		handleRegister();
	}, [isAuthenticated, profilePic]);

	const handleRegister = () => {
		if (name && email && profilePic) {
			dispatch(register({ name, email, profilePic }));
		}
	};

	const handleSignup = (credentialResponse) => {
		let decoded = jwtDecode(credentialResponse.credential);
		let name2 = decoded.given_name + " " + decoded.family_name;

		setName(name2);
		setEmail(decoded.email);
		setProfilePic(decoded.picture);
	};

	return (
		<>
			<div className='login_page'>
				<div className='login_img gb-shadow'>
					<div className='login'>
						<div>
							<h2 className='font-p flex-center'>College Dekho</h2>
							<p className='font-p flex-center'>
								Empowering Students to Discover Their Future
							</p>
						</div>
						<h4 className='font-p  '>Continue with Google</h4>
						<GoogleLogin
							className='button '
							onSuccess={handleSignup}
							onError={() => {
								console.log("Login Failed");
							}}
						/>
					</div>

					<div className='login-footer' id='benifit'>
						<h3 className='font-p'>Join us for more insights.</h3>
						<p className='font-p'>
							Unlock extra features with login or signup.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
