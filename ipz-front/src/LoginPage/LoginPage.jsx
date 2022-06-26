import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField } from '@mui/material'
import { makeStyles } from '@material-ui/styles'
import { authAPI } from '../API/api'
import { useNavigate } from "react-router-dom"

const schema = yup.object().shape({
	username: yup.string().required(),
	email: yup.string().email(),
	password: yup.string().required().min(5).max(11),
	confirmPassword: yup.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const useStyles = makeStyles({
	form: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		width: "500px",
		margin: "0 auto",
		marginTop: "100px",
	},
	input: {
		marginBottom: "15px",
		borderRadius: "10px",
		//height: "30px",

		textAlign: "center",
		fontSize: "16px",
	},
	loginBtn: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		height: 48,
		padding: '0 30px',
	},
	error: {
		color: "red",
		textTransform: "uppercase",
		fontSize: "12px",
		fontWeight: "bold",
		textAlign: "center",
		marginTop: "-10px",
		marginBottom: "10px",
	}
}
)


export const LoginPage = ({ mode, ...props }) => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

	const [isRegister, setIsRegister] = React.useState(false)

	const classes = useStyles()

	const navigate = useNavigate()

	const onSubmit = async (data) => {
		if (isRegister) {
			const dataObj = {
				login: data.username,
				email: isRegister ? data.email : null,
				password: data.password
			}
			try {
				const res = await authAPI.registerUser(dataObj)


				if (res.status === 200) {
					window.localStorage.setItem('token', res.data.token)

					navigate(`/events`)
				}
			} catch (e) {
				alert("Something went wrong. Try to send message to our support support@gmail.com")
			}
		} else {
			const validation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (validation.test(data.username)) {
				const dataObj = {
					email: data.username,
					password: data.password
				}
				try {
					const res = await authAPI.loginUser(dataObj)

					if (res.status === 200) {
						window.localStorage.setItem('token', res.data.token)

						navigate(`/events`)
					}
				} catch (e) {
					alert("Something went wrong. Try to send message to our support support@gmail.com")
				}
			} else {
				const dataObj = {
					login: data.username,
					password: data.password
				}
				try {
					const res = await authAPI.loginUser(dataObj)

					if (res.status === 200) {
						window.localStorage.setItem('token', res.data.token)

						navigate(`/events`)
					}
				} catch (e) {
					alert("Something went wrong. Try to send message to our support support@gmail.com")
				}
			}
		}
	}

	return (
		<>
			<Box component="form"
				className={classes.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<TextField id="outlined-basic" {...register('username')} label="Username" variant="outlined" InputProps={{
					className: classes.input,
				}}
					error={errors.username ? true : false} />
				<div className={classes.error}>{errors.username?.message}</div>
				{isRegister && <TextField id="outlined-basic3" {...register('email')} label="Email" variant="outlined"
					onSubmit={handleSubmit(onSubmit)} InputProps={{
						className: classes.input,
					}} error={errors.email ? true : false} />}
				{isRegister && <div className={classes.error}>{errors.email?.message}</div>}
				<TextField id="outlined-basic2" {...register('password')} label="Password" variant="outlined" type="password"
					onSubmit={handleSubmit(onSubmit)} InputProps={{
						className: classes.input,
					}} error={errors.password ? true : false} />
				<div className={classes.error}>{errors.password?.message}</div>
				{isRegister && <TextField id="outlined-basic3" {...register('confirmPassword')} label="Confirm password" variant="outlined" type="password"
					onSubmit={handleSubmit(onSubmit)} InputProps={{
						className: classes.input,
					}} error={errors.password ? true : false} />}
				{isRegister && <div className={classes.error}>{errors.confirmPassword?.message}</div>}
				<Button id="button-basic" className={classes.loginBtn} sx={{
					color: "white"
				}} type="submit" onSubmit={handleSubmit(onSubmit)}>{isRegister ? "Sign up" : "Log in"}</Button>
				<div style={{ marginTop: "20px" }}>
					{isRegister ? (<span>Already have an account? You can <span style={{
						color: "blue",
						cursor: "pointer"
					}} onClick={() => { setIsRegister(false) }}>log in</span> here </span>) : (<span>Haven`t account? You can <span style={{
						color: "blue",
						cursor: "pointer"
					}} onClick={() => { setIsRegister(true) }}>sign up</span> here</span>)}

				</div>
			</Box>
		</>
	)
}