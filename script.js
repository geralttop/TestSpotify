//Данные моего приложения
const client_id = 'b1f2f839bee74b818813d23dfe33a048'
const client_secret = '850cb5d402fa40dba0d0079ee495f89c'
let accessToken = '';

//
const liUserName = document.querySelector('.userName');
const liUserFollowers = document.querySelector('.userFollowers')
const buttonSP = document.querySelector(".showProfile");
//Штука для получения токена

async function getToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
        'grant_type': 'client_credentials',
    }),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)//(Buffer.from(client_id + ':' + client_secret).toString('base64')),
    },
    });

    const data = await response.json();
    accessToken = data.access_token;
}
//штука для получения инфы о треке
async function getTrackInfo(track_id) {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + accessToken },
    });
  
    return await response.json();
  }

async function getArtistInfo(artist_id) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artist_id}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken },
    });

    return await response.json();
}


async function logTrackInfo(artist_id){


    let data = await getArtistInfo(artist_id)
    console.log(data);
}

async function getUserProfile(username){
    const response = await fetch(`https://api.spotify.com/v1/users/${username}`,{
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });

    return await response.json();
}

async function showUserProfile(){
    await getToken();
    let userID = document.querySelector('.inpProfile')
    let user = await getUserProfile(userID.value)
    liUserName.textContent += user.display_name;
    liUserFollowers.textContent += user.followers.total;
}

buttonSP.addEventListener("click", ()=>{
    showUserProfile()
})