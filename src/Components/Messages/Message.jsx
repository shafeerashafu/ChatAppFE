import PropTypes from 'prop-types';

import { useAuthContext } from "../../Context/AuthContext.jsx";
import { extractTime } from "../../Utils/extractTime.js";
//import useConversation from "../../Zustand/useConversation.js";
// import { profileimage } from '../base64Image.js';
import  profileimage  from './profile.png'

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	//const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	//const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profileimage}/>
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='flex items-center gap-1 text-xs opacity-50 chat-footer'>{formattedTime}</div>
		</div>
	);
};


Message.propTypes = {
	message: PropTypes.shape({
		senderId: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		shouldShake: PropTypes.bool,
	}).isRequired,
};

export default Message;
