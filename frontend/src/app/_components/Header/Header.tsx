import Image from 'next/image'

export const Header = () => (
	<div className='box-border rounded-2xl p-4'>
		<Image
			src='/images/123.png'
			alt='header'
			width='2500'
			height='488'
			priority={true}
			style={{ overflow: 'hidden', margin: '3px' }}
		/>
	</div>
)

export default Header
