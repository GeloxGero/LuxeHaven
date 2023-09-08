import { Form, Formik, Field } from "formik";
import { useEffect } from "react";
import { useRegisterMutation } from "../../../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.auth);

	const [register, { isLoading }] = useRegisterMutation();

	useEffect(() => {
		if (userInfo.userInfo !== null) {
			navigate("/projects/crud/admin");
		}
	}, [navigate, userInfo]);

	const initialValues = {
		name: "",
		password: "",
		confirmpassword: "",
		email: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Required Name"),
		email: Yup.string().required("Required Email"),
		password: Yup.string().required(),
		confirmpassword: Yup.string().required(),
	});

	const handleSubmit = async (values, actions) => {
		console.log(values);
		if (values.password !== values.confirmpassword) return;

		try {
			const res = await register({
				name: values.name,
				email: values.email,
				password: values.password,
			}).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate("/");
		} catch (error) {
			console.log(error.data.message || error.error);
		}
	};

	let content;

	content = (
		<div className="update-item">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(props) => (
					<Form>
						<Field
							type="email"
							name="email"
							placeholder="Email"
							value={props.values.email}
						/>
						<Field
							type="text"
							name="name"
							placeholder="Username"
							value={props.values.name}
						/>
						<Field
							type="password"
							name="password"
							placeholder="Password"
							value={props.values.password}
						/>
						<Field
							type="password"
							name="confirmpassword"
							placeholder="Confirm Password"
							value={props.values.confirmpassword}
						/>

						<button type="submit">Register</button>
					</Form>
				)}
			</Formik>
		</div>
	);
	return content;
}
