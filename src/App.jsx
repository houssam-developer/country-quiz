
import { useEffect, useRef, useState } from 'react';
import Footer from './components/Footer'
import './App.scss';

import { MdCheckCircleOutline, MdHighlightOff } from "react-icons/md";

const ChoiceContext = {
	CORRECT: 'correct',
	INCORRECT: 'incorrect',
	INVALID: 'invalid'
};

const TargetChoiceContext = {
	A: 'A',
	B: 'B',
	C: 'C',
	D: 'D'
};

function App() {
	const [choiceA, setChoiceA] = useState('Vietnam');
	const [choiceB, setChoiceB] = useState('Malaysia');
	const [choiceC, setChoiceC] = useState('Swedah');
	const [choiceD, setChoiceD] = useState('Austria');

	const [choiceAContext, setChoiceAContext] = useState(ChoiceContext.CORRECT);
	const [choiceBContext, setChoiceBContext] = useState(ChoiceContext.INVALID);
	const [choiceCContext, setChoiceCContext] = useState(ChoiceContext.INCORRECT);
	const [choiceDContext, setChoiceDContext] = useState(ChoiceContext.INVALID);

	function loadIconChoice(targetContext) {
		let targetChoiceContext;
		if (targetContext === TargetChoiceContext.A) { targetChoiceContext = choiceAContext; }
		if (targetContext === TargetChoiceContext.B) { targetChoiceContext = choiceBContext; }
		if (targetContext === TargetChoiceContext.C) { targetChoiceContext = choiceCContext; }
		if (targetContext === TargetChoiceContext.D) { targetChoiceContext = choiceDContext; }

		if (targetChoiceContext === ChoiceContext.INVALID) { return ''; }
		if (targetChoiceContext === ChoiceContext.CORRECT) { return <MdCheckCircleOutline size={20} className='ml-auto' /> }
		if (targetChoiceContext === ChoiceContext.INCORRECT) { return <MdHighlightOff size={20} className='ml-auto' /> }
	}
	return (
		<div className="app-background font-sans">

			<div className='flex flex-col gap-3 mx-auto max-w-[500px] p-4'>
				<div className='relative'>
					<h1 className='pt-8 text-xl md:text-3xl text-white font-bold'>COUNTRY QUIZ</h1>
					<img className='absolute top-0 right-0' src="./images/undraw_adventure_4hum.svg" alt="" />
				</div>
				<div className='px-4 py-8 rounded-xl min-h-[400px] bg-[#f2f2f2]'>
					<h2 className='py-8 text-[#2F527B] font-bold text-lg md:text-2xl'>Kuala Lumpur is the capital of </h2>
					<div className='flex flex-col gap-6'>
						<button className='hover:bg-[#F9A826] hover:text-white hover:border-[#F9A826] text-[#6066D0] font-sans font-semibold flex items-center gap-4 border-[1px] border-slate-400 rounded-xl py-3 px-4 w-full'>
							<span className='text-lg'>A</span>
							<span className='text-md'>{choiceA}</span>
							{loadIconChoice(TargetChoiceContext.A)}
						</button>
						<button className='hover:bg-[#F9A826] hover:text-white hover:border-[#F9A826] text-[#6066D0] font-sans font-semibold flex items-center gap-4 border-[1px] border-slate-400 rounded-xl py-3 px-4 w-full'>
							<span className='text-lg'>B</span>
							<span className='text-md'>{choiceB}</span>
							{loadIconChoice(TargetChoiceContext.B)}
						</button>
						<button className='hover:bg-[#F9A826] hover:text-white hover:border-[#F9A826] text-[#6066D0] font-sans font-semibold flex items-center gap-4 border-[1px] border-slate-400 rounded-xl py-3 px-4 w-full'>
							<span className='text-lg'>C</span>
							<span className='text-md'>{choiceC}</span>
							{loadIconChoice(TargetChoiceContext.C)}
						</button>
						<button className='hover:bg-[#F9A826] hover:text-white hover:border-[#F9A826] text-[#6066D0] font-sans font-semibold flex items-center gap-4 border-[1px] border-slate-400 rounded-xl py-3 px-4 w-full'>
							<span className='text-lg'>D</span>
							<span className='text-md'>{choiceD}</span>
							{loadIconChoice(TargetChoiceContext.D)}
						</button>
					</div>
				</div>
			</div>


			<Footer></Footer>
		</div>
	)
}

export default App;
