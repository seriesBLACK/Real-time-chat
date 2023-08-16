import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import "../css files/home.css";
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { FiLogOut } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import TextingSpace from "../components/TextingSpace";

export default function Home() {
	const ref = useRef(null);
	const navigate = useNavigate();
	const cookie = new Cookies();
	const [message, setMessage] = useState("");
	const [newMessage, setNewMessage] = useState([]);
	const messageRef = collection(db, "messages");

	async function onSubmit(e) {
		e.preventDefault();
		if (message === "") return;
		await addDoc(messageRef, {
			text: message,
			messageTime: serverTimestamp(),
			userName: auth.currentUser.displayName,
			userId: auth.currentUser.uid,
		});
		setMessage("");



	};



	useEffect(() => {
		const q = query(messageRef, orderBy("messageTime"), limit(30))
		const save = onSnapshot(q, (snapShot) => {
			let messages = [];
			snapShot.forEach((snap) => {
				messages.push({
					...snap.data(),
					id: snap.id,
				});
				setNewMessage(messages);
			});
			ref.current.scrollIntoView({ behavior: 'smooth' })
		});
		return () => save();
	}, []);




	function logOut() {
		auth.signOut();
		cookie.remove("auth-token");
		navigate('sign-in/')

	};


	return (
		<div className="chat-app">

			<div className="messages">


				{newMessage && newMessage.map((newMessage) => (

					<TextingSpace newMessage={newMessage} key={newMessage.id} userId={newMessage.userId} />

				))}
				<span ref={ref}></span>
			</div>
			<form onSubmit={onSubmit} className="chat-app-form">
				<FiLogOut onClick={logOut} className="FiLogOut" />
				<input type="text" placeholder="Send a massage" value={message} onChange={(e) => setMessage(e.target.value)} />
				<button className="hiddenBtn" type="submit">

					<BiSend className="chatApp-icon" />
				</button>

			</form>


		</div>
	);
};
