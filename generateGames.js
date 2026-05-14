const fs = require("fs");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

async function run() {
  const tokenRes = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials"
    })
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const now = new Date();
  const start = Math.floor(new Date(now.setHours(0,0,0,0)).getTime() / 1000);
  const end = start + 86400;

  const res = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": CLIENT_ID,
      "Authorization": `Bearer ${accessToken}`
    },
    body: `
      fields name,summary,first_release_date,platforms.name,cover.image_id;
      where date < 1538129354; sort date desc;
      limit 20;
    `
  });

  const data = await res.json();

  const games = data.map(g => ({
    title: g.name,
    desc: g.summary || "No description available",
    releaseDate: g.first_release_date,
    cover: g.cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${g.cover.image_id}.jpg` : null
  }));

  fs.writeFileSync("games.json", JSON.stringify(games, null, 2));

  console.log("games.json updated!");
}

run();
