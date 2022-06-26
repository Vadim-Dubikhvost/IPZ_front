import React from 'react';
import { useNavigate } from "react-router-dom"


export const AboutUs = () => {

	const navigate = useNavigate()

	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			margin: "300px auto"
		}}>
			<div>
				Роботу виконали учні групи КІУКІ-19-8:
			</div>
			<div>
				Воронін Роман,Гончаров Данило,Довгаль Владислав, Дубихвіст Вадим
			</div>
			<div>
				СЛАВА УКРАЇНІ!
			</div>
			<div>
				<img src={require(`../images/1.webp`)} style={{
					marginBottom: "15px",
					maxWidth: "300px",
					maxHeight: "150px"
				}} />
			</div>
			<div>
				<button style={{
					background: "#FAC164",
					borderColor: "#FAC164",
					borderRadius: "5px",
					color: "#5F544D",
					cursor: "pointer",
					marginRight: "10px"
				}} onClick={e => {
					e.preventDefault()
					navigate("/events")
				}}>Back</button>
			</div>
		</div>
	)
}