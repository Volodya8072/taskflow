import { LogoutButton } from '../../ui/buttons/LogoutButton'
import { GlobalLoader } from './GlobalLoader'
import { Profile } from './profile/Profile'

export function Header() {
	return (
		<header>
			<GlobalLoader />
			<div className='flex items-center'>
				<Profile />
				<LogoutButton/>
			</div>
			
		</header>
	)
}
