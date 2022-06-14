import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import * as yup from 'yup'
import React from "react";
import { useForm } from "react-hook-form";
import { useStyles } from "../LoginPage/LoginPage";

const schema = yup.object().shape({
	title: yup.string().required(),
	description: yup.string().required(),
	tag: yup.string().required()
})

export const CreateEditEvent = ({ mode, ...props }) => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

	const classes = useStyles()

	const [image, setImage] = React.useState(null)
	const [tags, setTags] = React.useState([])

	const onSubmit = (data) => {
		console.log(data);
		console.log(image);
	}

	const addTag = () => {
		console.log(tag);
	}

	return (
		<>
			<form
				enctype="multipart/form-data"
				className={classes.form}
				onSubmit={handleSubmit(onSubmit)}
			>

				<TextField id="outlined-basic" {...register('title')} label="Title" variant="outlined" InputProps={{
					className: classes.input,
				}}
					error={errors.username ? true : false} />
				<div className={classes.error}>{errors.username?.message}</div>
				<textarea id="outlined-basic2" {...register('description')} label="Description" maxLength="512"
					//onSubmit={handleSubmit(onSubmit)}
					style={{
						marginBottom: "15px",
						height: "70px",
						textAlign: "left",
						resize: "none",
						borderColor: "#C0C0C0",
						borderRadius: "5px",
						fontSize: "16px",
						fontFamily: "Roboto"
					}} error={errors.password ? true : false} />
				<div className={classes.error}>{errors.password?.message}</div>
				<input type="file" id="image-input" accept="image/jpeg, image/png, image/jpg" onChange={e => {
					setImage(e.target.files[0].name)
				}}
					style={{
						marginBottom: "15px"
					}}></input>
				{image && <img src={require(`../images/${image}`)} style={{
					marginBottom: "15px",
					maxWidth: "300px",
					maxHeight: "150px"
				}} />}
				<div style={{
					display: "flex",
					flexDirection: "column"
				}}>
					<div style={{
						display: "flex",
						flexDirection: "column"
					}}>
						<TextField id="outlined-basic" {...register('tag')} label="Add tag" variant="outlined" value={tag} onChange={e => { setTag(e.target.value) }} InputProps={{
							className: classes.input,
						}} />
						<button style={{
							width: "70px",
						}} onClick={addTag}>Add tag</button>
					</div>
					<div style={{
						display: "flex"
					}}>
						<p>Your tags:</p>
					</div>
				</div>
				<Button id="button-basic" className={classes.loginBtn} sx={{
					color: "white"
				}} type="submit" /*onSubmit={handleSubmit(onSubmit)}*/>{"Send"}</Button>

			</form>
		</>
	)
}