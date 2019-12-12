
const apiKey = 'AIzaSyCpro4j_nV_R0AG3hCUwDHTi6qGsQ2R3o4'
const clientId = '33677304791-eun8ku65lkpej605n6qac9ilbadhkji4.apps.googleusercontent.com'  // id client sur google API console

const displayUser = document.getElementById('user')
const displayName = document.getElementById('name')
const btnLogin = document.getElementById('login')
const btnLogout = document.getElementById('logout')

let auth
let user

function initGAuth () {
  auth = gapi.auth2.getAuthInstance()
  auth.isSignedIn.listen(loginStatus)
  loginStatus()
}

function loginStatus () {
  const isSignedIn = auth.isSignedIn.get()
  if (isSignedIn) {

    user = auth.currentUser.get()

    const idToken = user.getAuthResponse().id_token

    const xhr = new XMLHttpRequest() //prépare une requête AJAX qu'on envoie vers Google.php qu'on a fait. //debut de la requette HTTP
    xhr.onreadystatechange = function(){
      if (this.readyState === 4){
        console.log(this.response)
      }

    }
    xhr.open('POST', 'google.php', true)
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded") // type d'envoi = json
    xhr.send(`id_token=${idToken}`)  // fin de la requête http

    displayUser.style.display = 'block'
    document.getElementById('name').
    textContent = user.getBasicProfile().getName()
    btnLogin.style.display = 'none'
    btnLogout.style.display = 'block'
  } else {
    user = null
    displayUser.style.display = 'none'
    btnLogin.style.display = 'block'
    btnLogout.style.display = 'none'
  }
  console.log(user)
}

function loginGoogle () {
  auth.signIn()
}

function logoutGoogle () {
  auth.signOut().then(() => {
    auth.disconnect()
    auth.isSignedIn.set(null)
    loginStatus()
  });
}

if (typeof gapi === 'object' && gapi.load) {
  gapi.load('client', () => {
    gapi.client.init({
      apiKey: apiKey,
      clientId: clientId,
      scope: 'profile',
    }).
    then(initGAuth)
  })
}
