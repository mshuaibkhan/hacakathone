let storage = firebase.storage();
let auth = firebase.auth();
let db = firebase.firestore();



let userNameEl = document.getElementById('user-name');
let emailEl = document.getElementById('email');
let passwordEl = document.getElementById('psw');
let passwordRepeatEl = document.getElementById('psw-repeat');
let userRoleEl = document.getElementsByName('user-role');


async function regiserUser() {

    let userCreated = await auth.createUserWithEmailAndPassword(emailEl.value, passwordEl.value);
    let UID = userCreated.user.uid;
    let user = {
        userName: userNameEl.value,
        email: emailEl.value,
        userRole: giveCheckedRadio(),
        uid: UID
        
    }

    await db.collection('users').doc(UID).set(user);

}


function giveCheckedRadio() {
    let checkedProp;
    for (var i = 0; i < userRoleEl.length; i++) {
        if (userRoleEl[i].checked) {
            checkedProp = userRoleEl[i].value;
        }
    }
    return checkedProp;
}


auth.onAuthStateChanged((user) => {
    let pageLocArr = window.location.href.split('/');
    let pageName = pageLocArr[pageLocArr.length - 1];
    let authenticatedPages = ['./customer/home.customer.html', './restrant.html'];

    if (user && authenticatedPages.indexOf(pageName) === -1) {
        window.location = './customer./homecustomer.html';
    }
    else if (!user && pageName === './customer./home.html') {
        window.location = './signup.html';
    }
});

async function signout() {
    await auth.signOut()
    {
        window.location = "indexsignup.html"
    }



async function signinUser() {
    await auth.signInWithEmailAndPassword(emailEl.value, passwordEl.value);
}


function redicstk(){
    window.location.href = "./dishes./stake";
}

