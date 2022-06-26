import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import * as yup from 'yup'
import React from "react";
import { useForm } from "react-hook-form";
import { useStyles } from "../LoginPage/LoginPage";
import { createEditEventAPI } from "../API/api";
import ImageUploading from "react-images-uploading";
import { useSearchParams, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
	title: yup.string().required(),
	description: yup.string().required(),
	tag: yup.string()
})

export const CreateEditEvent = ({ mode, posterId, ...props }) => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

	const [searchParams, setSearchParams] = useSearchParams();

	const navigate = useNavigate()

	const classes = useStyles()

	const [image, setImage] = React.useState("")
	const [tags, setTags] = React.useState([])
	const [tag, setTag] = React.useState("")
	const [poster, setPoster] = React.useState(null)

	const getPosters = async () => {
		try {
			const res = await createEditEventAPI.getPosterData(props.posterId)
			setPoster(res)
			setTags(res.tags)
			setImage(res.avatarLink)
		}
		catch (e) {
			alert("Something went wrong. Try to send message to our support support@gmail.com")
		}
	}

	const onChangeImage = (imageList) => {
		// data for submit
		if (imageList.length > 0) {
			setImage(imageList[0].data_url);
		} else {
			setImage("")
		}
	};

	React.useEffect(() => {
		if (searchParams.get("uuid")) {
			getPosters()
		}
		//getPosters()
	}, [searchParams])


	const onSubmit = async (data) => {
		const dataObj = {
			avatarLink: image,
			title: data.title,
			description: data.description,
			tags: tags,
			createdAt: "2022-06-16T16:17:05.840Z"
		}
		try {
			if (!searchParams.get("uuid")) {
				const res = await createEditEventAPI.createEvent(dataObj)

				if (res.status === 200) {
					navigate("/events")
				}
			} else {
				const res = await createEditEventAPI.editEvent(dataObj)

				if (res.status === 200) {
					navigate("/events")
				}
			}
		}
		catch (e) {
			alert("Something went wrong. Try to send message to our support support@gmail.com")
		}

	}

	const addTag = () => {
		if (!tags.includes(tag) && tag !== "") {
			setTags(prev => [...prev, tag])
			setTag("")
		} else {
			alert("This tag already included")
		}
	}

	const deleteTag = (tag) => {
		setTags(prev => {
			return prev.filter(item => item !== tag)
		})
	}

	return (
		<>
			<form
				encType="multipart/form-data"
				className={classes.form}
				onSubmit={handleSubmit(onSubmit)}
			>

				<input style={{
					border: "1px solid #C0C0C0",
					borderRadius: "5px",
					padding: "5px",
					margin: "15px 0 15px 0",
					height: "35px",
					fontSize: "16px",
					fontWeight: "bold"
				}} placeholder="Title" id="outlined-basic" {...register('title')} value={poster && `${poster.title}`} onChange={e => {
					if (poster) { setPoster(prev => { return { ...prev, title: e.target.value } }) }
				}} label="Title" variant="outlined" InputProps={{
					className: classes.input,
				}}
					error={errors.username ? true : false} />
				<div className={classes.error}>{errors.username?.message}</div>
				<textarea id="outlined-basic2" {...register('description')} value={poster && poster.description} onChange={e => {
					if (poster) { setPoster(prev => { return { ...prev, description: e.target.value } }) }
				}} placeholder="Description" maxLength="512"
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
				{<ImageUploading
					value={image}
					onChange={onChangeImage}
					dataURLKey="data_url"
				>
					{({
						onImageUpload,
						onImageRemoveAll,
						dragProps
					}) => (
						<div className="upload__image-wrapper">
							<button
								style={{
									background: "#FAC164",
									borderColor: "#FAC164",
									borderRadius: "5px",
									color: "#5F544D",
									cursor: "pointer",
									marginRight: "10px"
								}}
								onClick={e => {
									e.preventDefault()
									onImageUpload()
								}
								}
								{...dragProps}
							>
								Click here
							</button>
							&nbsp;
							<button style={{
								background: "#FAC164",
								borderColor: "#FAC164",
								borderRadius: "5px",
								color: "#5F544D",
								cursor: "pointer",
							}} onClick={e => {
								e.preventDefault()
								onImageRemoveAll()
							}}>Remove image</button>
							<div className="image-item">
								<img style={{
									margin: "15px 0px 15px 0"
								}} src={image} alt="" width="100" />
								<div className="image-item__btn-wrapper"></div>
							</div>
						</div>
					)}
				</ImageUploading>}
				<div style={{
					display: "flex",
					flexDirection: "column"
				}}>
					<div style={{
						display: "flex",
						flexDirection: "column"
					}}>
						<TextField id="outlined-basic" {...register('tag')} label="Add tag" variant="outlined" value={tag}
							onChange={e => {
								if (e.target.value.length <= 15) {
									setTag(e.target.value)
								} else {
									alert("Tag should be less then 15 characters")
								}
							}}
							InputProps={{
								className: classes.input,
							}} />
						<button style={{
							width: "70px",
							background: "#FAC164",
							borderColor: "#FAC164",
							borderRadius: "5px",
							color: "#5F544D",
							cursor: "pointer",
						}} onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							addTag()
						}}>Add tag</button>
					</div>
					<div style={{
						display: "flex",
						border: "1px solid #C0C0C0",
						borderRadius: "5px",
						padding: "5px",
						margin: "15px 0 15px 0",
						flexWrap: "wrap"
					}}>
						<div style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							marginRight: "5px"
						}}>Your tags:</div>{
							tags.map((tag, i) => {
								return <span key={i} style={{
									marginRight: "5px",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									backgroundColor: "blue",
									borderRadius: "5px",
									marginTop: "5px",
									maxHeight: "20px",
									padding: "3px",
									color: "white",
									cursor: "pointer"
								}}
									onClick={
										e => {
											e.preventDefault()
											e.stopPropagation()
											deleteTag(e.target.innerText)
										}
									}>{tag}</span>
							})
						}
					</div>
				</div>
				<Button id="button-basic" className={classes.loginBtn} sx={{
					color: "white"
				}} type="submit" /*onSubmit={handleSubmit(onSubmit)}*/>{"Send"}</Button>

			</form>
		</>
	)
}