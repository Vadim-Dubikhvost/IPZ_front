import React from 'react'
import { EventPageAPI } from '../API/api'
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom"
import moment from 'moment';
import "../App.css"

export const EventPage = () => {
	return (
		<div style={{
			maxWidth: "1300px",
			width: "100%",
			display: "flex",
			margin: "0 auto",
			flexDirection: "column"
		}}>
			<Header />
			<Events />
		</div>
	)
}

const Header = () => {
	const navigate = useNavigate()
	return (
		<div style={{
			backgroundColor: "#E0783B",
			marginBottom: "10px",
			height: "100px",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center"
		}}>
			<div style={{
				marginLeft: "30px"
			}}>
				<img src={require('../images/logo.png')} />
			</div>
			<div style={{
				marginRight: "30px"
			}}>
				<button style={{
					background: "#FAC164",
					borderColor: "#FAC164",
					borderRadius: "5px",
					color: "#5F544D",
					cursor: "pointer",
					marginRight: "10px"
				}} onClick={e => {
					e.preventDefault()
					navigate("/event")
				}}>Create event</button>
				<button style={{
					background: "#FAC164",
					borderColor: "#FAC164",
					borderRadius: "5px",
					color: "#5F544D",
					cursor: "pointer",
					marginRight: "10px"
				}} onClick={e => {
					e.preventDefault()
					navigate("/about")
				}}>About us</button>
				<button style={{
					background: "#FAC164",
					borderColor: "#FAC164",
					borderRadius: "5px",
					color: "#5F544D",
					cursor: "pointer"
				}} onClick={e => {
					e.preventDefault()
					window.localStorage.setItem('token', "")
					navigate("/")
				}}>Logout</button>
			</div>
		</div>
	)
}

const Events = () => {
	const [menu, setMenu] = React.useState([{ id: 1, title: "Events" }, { id: 2, title: "My Events" }])
	const [selectedItem, setSelectedItem] = React.useState("Events")
	const [pageCount, setPageCount] = React.useState(1)
	const [posters, setPosters] = React.useState([])
	const [selectedEvent, setSelectedEvent] = React.useState(null)
	const [searchingText, setSearchingText] = React.useState("")
	const [isDesc, setIsDesc] = React.useState(false)
	const [isShowSupport, setIsShowSupport] = React.useState(false)
	const [supportData, setSupportData] = React.useState({ email: "", text: "" })
	const [validError, setValidError] = React.useState(false)

	const getEvents = async (pageCount) => {
		const res = await EventPageAPI.getPosters(pageCount, isDesc)
		setPosters(res)
	}

	const getMyEvents = async () => {
		const res = await EventPageAPI.getMyPosters(isDesc)
		setPosters(res)
	}

	const getEventsBySearch = async () => {
		const res = await EventPageAPI.getPostersSearch(searchingText)
		setPosters(res)
	}

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const navigate = useNavigate()

	React.useEffect(() => {
		if (selectedItem === "Events" && searchingText === "") {
			getEvents(pageCount - 1)
		} else if (selectedItem === "My Events") {
			getMyEvents()
		}
	}, [selectedItem, pageCount, searchingText, isDesc])

	React.useEffect(() => {
		if (searchingText !== "") {
			let timeoutId = setTimeout(() => {
				getEventsBySearch()
			}, 1000)

			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [searchingText])

	return (
		<div style={{
			display: "flex"
		}}>
			<div style={{
				maxWidth: "300px",
				width: "100%",
				fontSize: "18px",
				display: "flex",
				flexDirection: "column"
			}}>
				{menu.map(item => {
					return <div key={item.id} style={{
						marginTop: "15px",
						cursor: "pointer",
						borderRight: item.title === selectedItem && "2px solid #FAC164",
					}} onClick={e => {
						setSelectedItem(item.title)
					}}>
						{item.title}
					</div>
				})}
				<div style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginTop: "15px",
				}}>
					{pageCount > 1 && <div style={{
						width: "35px",
						height: "20px",
						backgroundColor: "#FAC164",
						fontSize: "12px",
						fontWeight: "bold",
						marginRight: "5px",
						cursor: "pointer"
					}}
						onClick={() => {
							setPageCount(prev => prev - 1)
						}}
					>Prev</div>}
					<div style={{
						width: "20px",
						height: "20px",
						backgroundColor: "#FAC164",
						fontSize: "12px",
						fontWeight: "bold",
						borderRadius: "50%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center"
					}}>{pageCount}</div>
					{posters.length > 0 && <div style={{
						width: "35px",
						height: "20px",
						backgroundColor: "#FAC164",
						fontSize: "12px",
						fontWeight: "bold",
						marginLeft: "5px",
						cursor: "pointer"
					}}
						onClick={() => {
							setPageCount(prev => prev + 1)
						}}
					>Next</div>}
				</div>
				<div style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginTop: "15px",
				}}>
					{isDesc && <div style={{
						width: "35px",
						height: "20px",
						backgroundColor: "#FAC164",
						fontSize: "12px",
						fontWeight: "bold",
						marginLeft: "5px",
						cursor: "pointer",
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}
						onClick={() => {
							setIsDesc(false)
						}}
					>
						<div className="arrow-up" />
					</div>}
					{!isDesc && <div style={{
						width: "35px",
						height: "20px",
						backgroundColor: "#FAC164",
						fontSize: "12px",
						fontWeight: "bold",
						marginLeft: "5px",
						cursor: "pointer",
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}
						onClick={() => {
							setIsDesc(true)
						}}
					>
						<div className="arrow-down" />
					</div>}
				</div>
				{selectedItem === "Events" && <div style={{
					marginTop: "15px"
				}}>
					<input style={{
						border: "2px solid #FAC164"
					}} value={searchingText} onChange={e => {
						setSearchingText(e.target.value)
					}} />
				</div>}
			</div>
			<div style={{
				marginLeft: "15px",
				borderLeft: "3px solid #E0783B",
				minHeight: "200px",
				display: "flex",
				flexDirection: "column",
				maxWidth: "900px",
				width: "100%"
			}}>{posters.map(poster => {
				return <Event event={poster} setSelectedEvent={setSelectedEvent} />
			})}</div>
			<Modal isOpen={selectedEvent !== null} style={{
				overlay: {

				},
				content: {
					maxHeight: "700px",
					maxWidth: "700px",
					height: "100%",
					width: "100%",
					margin: "0 auto"
				}
			}}>
				<div style={{
					display: "flex",
					flexDirection: "column",
					maxHeight: "100px",
					textAlign: "left",
				}}>
					<div style={{
						display: "flex",
						justifyContent: "center"
					}}>
						<img style={{
							width: "300px",
							height: "200px",

						}} src={selectedEvent?.avatarLink} />
					</div>
					<div style={{
						marginLeft: "15px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
					}}>
						<div style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							margin: "20px 0px 20px 0px",
							alignItems: "center"
						}}>
							{selectedEvent?.title}
						</div>
						<div style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							margin: "20px 0px 20px 0px"
						}}>
							{selectedEvent?.description}
						</div>
						<div style={{
							display: "flex",
							margin: "20px 0px 20px 0px"
						}}>
							{selectedEvent?.tags?.map((tag, i) => {
								return <span key={i} style={{
									marginRight: "5px",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									marginTop: "5px",
									maxHeight: "20px",
									padding: "3px",
									color: "blue",
								}}
								>{tag}</span>
							})}
						</div>
					</div>
					<div style={{
						display: "flex",
						justifyContent: "center"
					}}>
						{selectedItem === "My Events" && <button style={{
							background: "#FAC164",
							borderColor: "#FAC164",
							borderRadius: "5px",
							color: "#5F544D",
							cursor: "pointer",
							marginRight: "10px"
						}} onClick={e => {
							e.preventDefault()
							navigate(`/event?uuid=${selectedEvent.id}`)
						}}>
							Edit
						</button>}
						<button style={{
							background: "#FAC164",
							borderColor: "#FAC164",
							borderRadius: "5px",
							color: "#5F544D",
							cursor: "pointer",
						}} onClick={e => {
							e.preventDefault()
							setSelectedEvent(null)
						}}>
							Close
						</button>
					</div>
				</div>
			</Modal>
			<div style={{
				position: "fixed",
				right: "3%",
				bottom: "3%",
				width: "45px",
				height: "45px",
				backgroundColor: "#FAC164",
				borderRadius: "50%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				fontSize: "20px",
				cursor: "pointer"
			}}
				onClick={() => {
					setIsShowSupport(!isShowSupport)
				}}
			>
				?
			</div>
			{
				isShowSupport && <div style={{
					position: "fixed",
					right: "5%",
					bottom: "9%",
					width: "150px",
					maxHeight: "230px",
					backgroundColor: "#edeae1",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					fontSize: "20px",
					borderRadius: "10px 10px 0 10px"
				}}>
					<div style={{
						marginTop: "10px"
					}}>
						Your email:
					</div>
					<input style={{
						width: "100px",
						display: "flex",
						justifyContent: "center"
					}} value={supportData.email} onChange={(e) => {
						setSupportData(prev => {
							return {
								...prev,
								email: e.target.value
							}
						})
					}} />
					{validError && <div style={{
						marginTop: "10px",
						fontSize: "10px",
						color: "red"
					}}>
						You shoud enter a valid email
					</div>}
					<div style={{
						marginTop: "10px",
						fontSize: "12px"
					}}>
						Describe your problem:
					</div>
					<div>
						<textarea style={{
							width: "100px",
							height: "70px",
							display: "flex",
							justifyContent: "center",
							marginTop: "5px",
							resize: "none"
						}} value={supportData.text} onChange={(e) => {
							setSupportData(prev => {
								return {
									...prev,
									text: e.target.value
								}
							})
						}} />
					</div>
					<div>
						<button style={{
							marginTop: "10px",
							fontSize: "12px",
							background: "#FAC164",
							borderColor: "#FAC164",
							borderRadius: "5px",
							color: "#5F544D",
							cursor: "pointer",
							marginBottom: "10px"
						}} onClick={() => {
							if (validateEmail(supportData.email)) {
								setSupportData({ email: "", text: "" })
								setValidError(false)
							} else {
								setValidError(true)
							}
						}}>
							Send
						</button>
					</div>
				</div>
			}
		</div >
	)
}

const Event = ({ event, setSelectedEvent }) => {

	const date = moment(event.createdAt).format("LLL")

	return (
		<div style={{
			display: "flex",
			border: "2px solid #C0C0C0",
			margin: "15px 0px 15px 30px",
			maxHeight: "100px",
			textAlign: "left"
		}}>
			<div>
				<img style={{
					width: "150px",
					height: "100px"
				}} onClick={() => {
					setSelectedEvent(event)
				}} src={event.avatarLink} />
			</div>
			<div style={{
				marginLeft: "15px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-around"
			}}>
				<div style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center"
				}}>
					{event.title}
				</div>
				<div style={{ display: "flex" }}>
					{event.tags?.map((tag, i) => {
						return <span key={i} style={{
							marginRight: "5px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							marginTop: "5px",
							maxHeight: "20px",
							padding: "3px",
							color: "blue",
						}}
						>{tag}</span>
					})}
				</div>
				<div>
					{"Created at" + " " + date}
				</div>
			</div>
		</div>
	)
}