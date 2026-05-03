document.addEventListener("DOMContentLoaded", () => {

	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const d = new Date();
	let day = days[d.getDay()];
	document.getElementById("DateCard").innerHTML = day + ", " + d.getFullYear();

	console.log("Loading games...");

	fetch("https://raw.githubusercontent.com/TantalizingTantalus/GameSite/main/games.json")
		.then(res => res.json())
		.then(games => {
			const container = document.getElementById("gameContainer");
			console.log(container);
			games.forEach((game, index) => {
				container.innerHTML += `
				<section class="vh-100 d-flex flex-column justify-content-center align-items-center text-center" id="game-${index}">
					<h1>${index+1}. -- ${game.title} -- ${game.rating}</h1>
					<p class="text-muted" style="font-size:2rem;">
						${game.desc}
					</p>

					${index < games.length - 1 ? `
						<a href="#game-${index + 1}">
							<img src="arrow.png" class="ArrowPNGStyle fading-arrow">
						</a>
					` : ""}
				</section>
				`;
			});
		});
});