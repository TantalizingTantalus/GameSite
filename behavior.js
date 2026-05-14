document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("backToTop").style.display = "none";
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
				
				var textDate = new Date(game.releaseDate * 1000)
					.toLocaleDateString("en-US", {
					timeZone: "UTC",
					year: "numeric",
					month: "long",
					day: "numeric"
					});
				container.innerHTML += `
				<section class="vh-100 d-flex flex-column justify-content-center align-items-center text-center" id="game-${index}">
					
					<img style="width:40%;height:60%;" src="${game.cover}"></img>
					<div style="height:5%;"></div>
					<h1>${index+1}. -- ${game.title} -- ${textDate}</h1>
					<p class="text-muted" style="font-size:2rem;">
						${game.desc}
					</p>

					${index < games.length - 1 ? `
						<a href="#game-${index + 1}">
							<img src="arrow.png" class="ArrowPNGStyle fading-arrow">
						</a>
					` : ""}
					<div style="height:15%;"></div>
				</section>
				`;
			});
		});
});

function testFunc() {
	console.log("hello world");
}

function ScrollToTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}



window.onscroll = function(e)
{
	const backToTopButton = document.getElementById("backToTop");
	if(window.scrollY > 0)
	{
		backToTopButton.style.display = "block";
	}else{
		backToTopButton.style.display = "none";
	}
}
