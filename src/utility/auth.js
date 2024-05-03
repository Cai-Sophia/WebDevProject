const clientId = 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w'; 
const clientSecret = '2ve6ivha5hc7ki52xsmtbmfzqhp280'; 

async function getAccessToken() {
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

module.exports = { getAccessToken };
