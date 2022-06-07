
import { useEffect, useRef, useState } from 'react';
import Footer from './components/Footer'
import './App.scss';

import { MdCheckCircleOutline, MdHighlightOff } from "react-icons/md";
import { countryService } from './services/CountryService';

const ChoiceContext = {
	CORRECT: 'correct',
	INCORRECT: 'incorrect',
	NEUTRE: 'neutre'
};

const TargetChoiceContext = {
	A: 'A',
	B: 'B',
	C: 'C',
	D: 'D'
};

function App() {
	const [choiceA, setChoiceA] = useState('');
	const [choiceB, setChoiceB] = useState('');
	const [choiceC, setChoiceC] = useState('');
	const [choiceD, setChoiceD] = useState('');
	const [choices, setChoices] = useState([
		setChoiceA,
		setChoiceB,
		setChoiceC,
		setChoiceD,
	]);

	const [choiceAContext, setChoiceAContext] = useState(ChoiceContext.NEUTRE);
	const [choiceBContext, setChoiceBContext] = useState(ChoiceContext.NEUTRE);
	const [choiceCContext, setChoiceCContext] = useState(ChoiceContext.NEUTRE);
	const [choiceDContext, setChoiceDContext] = useState(ChoiceContext.NEUTRE);

	const btnResponseA = useRef();
	const btnResponseB = useRef();
	const btnResponseC = useRef();
	const btnResponseD = useRef();

	const [currentCorrectResponse, setCurrentCorrectResponse] = useState('Vietnam');
	const [correctBtnContext, setCorrectBtnContext] = useState(TargetChoiceContext.A);

	const [responseAlreadySelected, setResponseAlreadySelected] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [countries, setCountries] = useState([]);
	const [currentCountry, setCurrentCountry] = useState();

	const [indexUsed, setIndexUsed] = useState([]);
	const [goodResponsesCount, setGoodResponsesCount] = useState(0);

	useEffect(() => {
		countryService.findAll().then(data => {
			const targetIndex = Math.floor(Math.random() * (data.length - 1));
			const targetCountry = data[targetIndex];
			setCurrentCountry(targetCountry);

			let updatedCountries = data.filter((it, index) => index !== targetIndex);

			const targetChoiceIndex = Math.floor(Math.random() * 4);
			choices[targetChoiceIndex](targetCountry.name.common);

			let i = 0;
			choices
				.filter((it, index) => index !== targetChoiceIndex)
				.map(it => it(updatedCountries[i++].name.common));

			setCurrentCorrectResponse(targetCountry.name.common);
			setCountries(updatedCountries);
			setIsReady(true);
		});
	}, [])

	function loadIconChoiceResult(targetContext) {
		let targetChoiceContext;
		if (targetContext === TargetChoiceContext.A) { targetChoiceContext = choiceAContext; }
		else if (targetContext === TargetChoiceContext.B) { targetChoiceContext = choiceBContext; }
		else if (targetContext === TargetChoiceContext.C) { targetChoiceContext = choiceCContext; }
		else if (targetContext === TargetChoiceContext.D) { targetChoiceContext = choiceDContext; }

		if (targetChoiceContext === ChoiceContext.NEUTRE) { return ''; }
		if (targetChoiceContext === ChoiceContext.CORRECT) { return <MdCheckCircleOutline size={20} className='ml-auto' /> }
		if (targetChoiceContext === ChoiceContext.INCORRECT) { return <MdHighlightOff size={20} className='ml-auto' /> }
	}

	function restoreCssClassesForBtn() {
		btnResponseA.current.classList.remove('response-btn--correct');
		btnResponseA.current.classList.remove('response-btn--incorrect');
		btnResponseA.current.classList.add('response-btn--neutre');
		setChoiceAContext(ChoiceContext.NEUTRE);

		btnResponseB.current.classList.remove('response-btn--correct');
		btnResponseB.current.classList.remove('response-btn--incorrect');
		btnResponseB.current.classList.add('response-btn--neutre');
		setChoiceBContext(ChoiceContext.NEUTRE);

		btnResponseC.current.classList.remove('response-btn--correct');
		btnResponseC.current.classList.remove('response-btn--incorrect');
		btnResponseC.current.classList.add('response-btn--neutre');
		setChoiceCContext(ChoiceContext.NEUTRE);

		btnResponseD.current.classList.remove('response-btn--correct');
		btnResponseD.current.classList.remove('response-btn--incorrect');
		btnResponseD.current.classList.add('response-btn--neutre');
		setChoiceDContext(ChoiceContext.NEUTRE);
	}

	function removeResponseNeutreCssClassFromAllButtons() {
		btnResponseA.current.classList.remove('response-btn--neutre');
		btnResponseB.current.classList.remove('response-btn--neutre');
		btnResponseC.current.classList.remove('response-btn--neutre');
		btnResponseD.current.classList.remove('response-btn--neutre');
	}

	function showCorrectResponse() {
		if (correctBtnContext === TargetChoiceContext.A) {
			btnResponseA.current.classList.add('response-btn--correct');
			setChoiceAContext(ChoiceContext.CORRECT);
			loadIconChoiceResult(TargetChoiceContext.A);
		}
		else if (correctBtnContext === TargetChoiceContext.B) {
			btnResponseB.current.classList.add('response-btn--correct');
			setChoiceBContext(ChoiceContext.CORRECT);
			loadIconChoiceResult(TargetChoiceContext.B);
		}
		else if (correctBtnContext === TargetChoiceContext.C) {
			btnResponseC.current.classList.add('response-btn--correct');
			setChoiceCContext(ChoiceContext.CORRECT);
			loadIconChoiceResult(TargetChoiceContext.C);

		}
		else if (correctBtnContext === TargetChoiceContext.D) {
			btnResponseD.current.classList.add('response-btn--correct');
			setChoiceDContext(ChoiceContext.CORRECT);
			loadIconChoiceResult(TargetChoiceContext.D);
		}
	}

	function handleBtnChoiceA(e) {
		e.preventDefault();
		console.log('btnChoiceA');

		if (responseAlreadySelected) { return; }

		// remove neutre on all buttons
		removeResponseNeutreCssClassFromAllButtons();

		if (choiceA === currentCorrectResponse) {
			btnResponseA.current.classList.add('response-btn--correct');
			setGoodResponsesCount(goodResponsesCount + 1);
			setChoiceAContext(ChoiceContext.CORRECT);
		}
		else {
			btnResponseA.current.classList.add('response-btn--incorrect');
			setChoiceAContext(ChoiceContext.INCORRECT);
			showCorrectResponse();
		}

		setResponseAlreadySelected(true);
	}

	function handleBtnChoiceB(e) {
		e.preventDefault();
		console.log('btnChoiceB');
		if (responseAlreadySelected) { return; }
		// remove neutre on all buttons
		removeResponseNeutreCssClassFromAllButtons();

		if (choiceB === currentCorrectResponse) {
			btnResponseB.current.classList.add('response-btn--correct');
			setGoodResponsesCount(goodResponsesCount + 1);
			setChoiceBContext(ChoiceContext.CORRECT);
		}
		else {
			btnResponseB.current.classList.add('response-btn--incorrect');
			setChoiceBContext(ChoiceContext.INCORRECT);
			showCorrectResponse();
		}

		setResponseAlreadySelected(true);
	}

	function handleBtnChoiceC(e) {
		e.preventDefault();
		console.log('btnChoiceC');
		if (responseAlreadySelected) { return; }

		// remove neutre on all buttons
		removeResponseNeutreCssClassFromAllButtons();

		if (choiceC === currentCorrectResponse) {
			btnResponseC.current.classList.add('response-btn--correct');
			setGoodResponsesCount(goodResponsesCount + 1);
			setChoiceCContext(ChoiceContext.CORRECT);
		}
		else {
			btnResponseC.current.classList.add('response-btn--incorrect');
			setChoiceCContext(ChoiceContext.INCORRECT);
			showCorrectResponse();
		}

		setResponseAlreadySelected(true);
	}

	function handleBtnChoiceD(e) {
		e.preventDefault();
		console.log('btnChoiceD');
		if (responseAlreadySelected) { return; }
		// remove neutre on all buttons
		removeResponseNeutreCssClassFromAllButtons();

		if (choiceD === currentCorrectResponse) {
			btnResponseD.current.classList.add('response-btn--correct');
			setGoodResponsesCount(goodResponsesCount + 1);
			setChoiceDContext(ChoiceContext.CORRECT);
		}
		else {
			btnResponseD.current.classList.add('response-btn--incorrect');
			setChoiceDContext(ChoiceContext.INCORRECT);
			showCorrectResponse();
		}

		setResponseAlreadySelected(true);
	}

	function handleBtnNext(e) {
		e.preventDefault();
		console.log('btn next ', currentCountry.name.common);
		console.log('btn next ', currentCountry.capital[0]);
		console.log('btn next ', goodResponsesCount);

		restoreCssClassesForBtn();
		setResponseAlreadySelected(false);

		const targetIndex = Math.floor(Math.random() * (countries.length - 1));
		const targetCountry = countries[targetIndex];
		setCurrentCountry(targetCountry);

		let updatedCountries = countries.filter((it, index) => index !== targetIndex);

		const targetChoiceIndex = Math.floor(Math.random() * 4);
		choices[targetChoiceIndex](targetCountry.name.common);

		console.log('targetChoiceIndex: ', targetChoiceIndex);

		let i = 0;
		choices
			.filter((it, index) => index !== targetChoiceIndex)
			.map(it => it(updatedCountries[i++].name.common));

		setCurrentCorrectResponse(targetCountry.name.common);
		setCountries(updatedCountries);
	}

	return (
		<div className="app-background font-sans">

			<div className='flex flex-col gap-3 mx-auto max-w-[500px] p-4'>
				<div className='relative'>
					<h1 className='pt-8 text-xl md:text-3xl text-white font-bold'>COUNTRY QUIZ</h1>
					<img className='absolute top-0 right-0' src="./images/undraw_adventure_4hum.svg" alt="" />
				</div>
				{isReady ?
					<div className='px-4 py-8 rounded-xl min-h-[400px] bg-[#f2f2f2]'>
						<h2 className='py-8 text-[#2F527B] font-bold text-lg md:text-2xl'>{currentCountry.capital[0]} is the capital of </h2>
						<div className='flex flex-col gap-6'>
							<button ref={btnResponseA} onClick={handleBtnChoiceA} className='response-btn response-btn--neutre'>
								<span className='text-lg'>A</span>
								<span className='text-md'>{choiceA}</span>
								{loadIconChoiceResult(TargetChoiceContext.A)}
							</button>
							<button ref={btnResponseB} onClick={handleBtnChoiceB} className='response-btn response-btn--neutre'>
								<span className='text-lg'>B</span>
								<span className='text-md'>{choiceB}</span>
								{loadIconChoiceResult(TargetChoiceContext.B)}
							</button>
							<button ref={btnResponseC} onClick={handleBtnChoiceC} className='response-btn response-btn--neutre'>
								<span className='text-lg'>C</span>
								<span className='text-md'>{choiceC}</span>
								{loadIconChoiceResult(TargetChoiceContext.C)}
							</button>
							<button ref={btnResponseD} onClick={handleBtnChoiceD} className='response-btn response-btn--neutre'>
								<span className='text-lg'>D</span>
								<span className='text-md'>{choiceD}</span>
								{loadIconChoiceResult(TargetChoiceContext.D)}
							</button>
							<button onClick={handleBtnNext} className='bg-[#F9A826] hover:text-white hover:border-[#F9A826] font-sans font-semibold text-white flex items-center gap-4 border-[1px] border-slate-100 rounded-xl py-3 px-8 ml-auto'>
								<span className='text-lg'>Next</span>
							</button>

						</div>
					</div> : <div className='px-4 py-8 rounded-xl min-h-[400px] bg-[#f2f2f2]'><h2 className='py-8 text-[#2F527B] font-bold text-lg md:text-2xl'>Loading...</h2></div>
				}
			</div>


			<Footer></Footer>
		</div>
	)
}

export default App;
