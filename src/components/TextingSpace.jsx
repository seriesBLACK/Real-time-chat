import { useEffect, useState } from "react";
import "../css files/chatStyle.css";
import { auth, db } from "../firebase";
import { FaTrashAlt, FaPoo } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";

export default function TextingSpace({ newMessage, userId }) {
  const [sender, setSender] = useState(false);
  const [poop, setPoop] = useState(0);


  useEffect(() => {
    if (auth.currentUser.uid == userId) { setSender(true) };

  }, [])



  async function onDelete() {
    await deleteDoc(doc(db, "messages", newMessage.id))
  };


  async function poopedToDeath() {
    if (poop >= 4) {
      await deleteDoc(doc(db, "messages", newMessage.id));
      setPoop(0);
    } else { setPoop(poop + 1) };

  };


  return (
    <div className={sender ? 'sender' : 'receiver'}>

      <div className="chatPupple">
        <h3 className="chatTexting">{newMessage.userName ? newMessage.userName : "unKnown User"} :</h3>
        <p>{newMessage.text}</p>
        {sender ? <FaTrashAlt className="FaTrashAlt" onClick={onDelete} /> : <FaPoo className="FaPoo" onClick={poopedToDeath} />}
        <p className="poopCounter">{poop > 0 ? poop : ''}</p>
      </div>
    </div>
  )
};