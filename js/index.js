
const apiKey = 'AIzaSyCpro4j_nV_R0AG3hCUwDHTi6qGsQ2R3o4'
const clientId = '33677304791-eun8ku65lkpej605n6qac9ilbadhkji4.apps.googleusercontent.com'  // id client sur google API console

const displayUser = document.getElementById('user')
const displayName = document.getElementById('name')
const btnLogin = document.getElementById('login')
const btnLogout = document.getElementById('logout')

let auth
let user

function initGAuth () {
  console.log('init')
  auth = gapi.auth2.getAuthInstance()
  auth.isSignedIn.listen(sigin)
  sigin()
}

function sigin () {
  const isSignedIn = auth.isSignedIn.get()
  if (isSignedIn) {
    user = auth.currentUser.get()
    displayUser.style.display = 'inline-block' // affiche quand t'es connecté
    document.getElementById('name').
    textContent = user.getBasicProfile().getName()
    btnLogin.style.display = 'none'
    btnLogout.style.display = 'inline-block'
  } else {
    user = null
    displayUser.style.display = 'none'
    btnLogin.style.display = 'inline-block'
    btnLogout.style.display = 'none'

  }
  console.log(user)
}

function loginGoogle () {
  auth.signIn()
}

function logoutGoogle () {
  auth.signOut();
}

if (typeof gapi === 'object' && gapi.load) { // pour tester le type de la variable // si type gapi = object et que gapi est une méthode.load
  gapi.load('client', () => {
    gapi.client.init({ // c'est une promise, appelle une méthode, si ok => then() sion catch()
      apiKey: apiKey,
      clientId: clientId,
      scope: 'profile', // scope, c'est ce qu'on veut récuperer sur google et afficher le profil
    }).
    then(initGAuth)
  })
}
