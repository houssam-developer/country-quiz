
import { useEffect, useRef, useState } from 'react';
import Footer from './components/Footer'
import './App.scss';

function App() {

	return (
		<div className="app-background">

			<div className='flex flex-col gap-2 mx-auto max-w-[500px] p-4'>
				<div className='relative'>
					<h1 className='pt-8 text-xl text-white font-bold'>COUNTRY QUIZ</h1>
					<img className='absolute top-0 right-0' src="./images/undraw_adventure_4hum.svg" alt="" />
				</div>
				<div className='rounded-xl min-h-[400px] bg-[#f2f2f2]'>
					qwiz
				</div>
			</div>


			<Footer></Footer>
		</div>
	)
}

export default App;
