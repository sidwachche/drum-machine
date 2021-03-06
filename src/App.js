import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

const config = [
	{
		id: "Q",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
	},
	{
		id: "W",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
	},
	{
		id: "E",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
	},
	{
		id: "A",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
	},
	{
		id: "S",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
	},
	{
		id: "D",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
	},
	{
		id: "Z",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
	},
	{
		id: "X",
		src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
	},
	{
		id: "C",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
	},
];

const drumKeys = config.map(({ id }) => id);

function App() {
	const [display, setDisplay] = useState("");

	const setPlay = useCallback((audioElement) => {
		setDisplay(audioElement.id);
		audioElement.play();
	}, []);

	const handleClick = useCallback(
		(e) => {
			try {
				const audioElement = e.target.children[0];
				setPlay(audioElement);
			} catch (err) {
				console.log(err);
			}
		},
		[setPlay]
	);

	const handleKeyDown = useCallback(
		(e) => {
			try {
				const key = e.key && e.key.toUpperCase();

				if (drumKeys.includes(key)) {
					const audioElement = document.getElementById(key);
					setPlay(audioElement);
				}
			} catch (err) {
				console.error(err);
			}
		},
		[setPlay]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<main className="grid">
			<section id="drum-machine">
				<h1>
					DRUM <br></br> MACHINE
				</h1>
				<section id="display">{display}</section>
				<section className="keys" onClick={handleClick}>
					{config.map(({ id, src }) => (
						<button key={id} className="drum-pad" id={`btn-${id}`}>
							<audio id={id} src={src} className="clip"></audio>
							{id}
						</button>
					))}
				</section>
			</section>
		</main>
	);
}

export default App;
