import React from 'react';


export const AboutUs = () => {
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
		</div>
	)
}