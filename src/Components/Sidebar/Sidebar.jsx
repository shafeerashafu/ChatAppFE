import Conversations from "./AllConversation.jsx";
import LogoutButton from "./LogoutButton.jsx"
import SearchInput from "./SearchInput.jsx"

const Sidebar = () => {
	return (
		<div className='flex flex-col p-4 border-r border-slate-500'>
			<SearchInput />
			<div className='px-3 divider'></div>
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;