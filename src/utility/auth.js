const clientId = 'gynkg0zhmuv2xlwdxxhq0fb8v6na9w'; 
const clientSecret = '2ve6ivha5hc7ki52xsmtbmfzqhp280'; 
// token = "161ak7a2oytcr8qtwdrgpuj5gjpnb0"

let accessToken = null;
let tokenExpiration = 0;

export async function getAccessToken() {
    if (accessToken && Date.now() < tokenExpiration) {
        return accessToken;
    }

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
    accessToken = data.access_token;
    tokenExpiration = Date.now() + (data.expires_in * 1000); 

    return accessToken;
}
