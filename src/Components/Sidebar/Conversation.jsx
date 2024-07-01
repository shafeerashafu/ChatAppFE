import PropTypes from 'prop-types';
import { useSocketContext } from "../../Context/SocketContext.jsx";
import useConversation from "../../Zustand/useConversation.js";
import profileimage  from './profile.png';
const Conversation = ({ conversation, lastIdx }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext() || {};
const isOnline = onlineUsers && onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={profileimage} alt='user-profile' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex justify-between gap-3'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						{/* <span className='text-xl'>😶‍🌫️</span> */}
					</div>
				</div>
			</div>

			{!lastIdx && <div className='h-1 py-0 my-0 divider' />}
		</>
	);
};

Conversation.propTypes = {
    conversation: PropTypes.object.isRequired,
    lastIdx: PropTypes.bool.isRequired,
}; 

export default Conversation;


