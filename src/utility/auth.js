const clientId = 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w'; 
const clientSecret = '2ve6ivha5hc7ki52xsmtbmfzqhp280'; 

export async function getAccessToken() {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'client_id': clientId,
            'client_secret': clientSecret,
            'grant_type': 'client_credentials',
        }),
    });

    const data = await response.json();
    return data.access_token;
}

export async function fetchGameData(gameName) {
    const accessToken = await getAccessToken();

    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            search: gameName,
            fields: 'name, summary',
            limit: 5,
        }),
    });

    const data = await response.json();
    return data;
}

fetchGameData('The Legend of Zelda')
    .then(data => {
        // Handle the data (e.g., update UI)
        console.log('Game data:', data);
    })
    .catch(error => {
        console.error('Error fetching game data:', error);
    });