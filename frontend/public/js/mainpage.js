

var email = '';
var count =0;
var dbref = '';

initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            email = user.email;
            showMessage();
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            var disp = 'Welcome ' + displayName;
            //document.getElementById('zuser').innerHTML = disp;
            //document.getElementById('zuser1').innerHTML = disp;
            user.getIdToken().then(function(accessToken) {
                addFirstTimeUser();


                email = user.email.substring(0,email.lastIndexOf("@"))
                email = email.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
                //retrieve();
                // count=0; // random key latest task insert k liye
                $('.modal').modal();
               // console.log(email);
                // console.log( JSON.stringify({
                //     displayName: displayName,
                //     email: email,
                //     emailVerified: emailVerified,
                //     phoneNumber: phoneNumber,
                //     photoURL: photoURL,
                //     uid: uid,
                //     accessToken: accessToken,
                //     providerData: providerData
                // }, null, '  '));
            });
        } else {
            console.log('User is signed out.')
          window.location='index.html'
        }
    }, function(error) {
        console.log(error);
    });
};

window.addEventListener('load', function() {
    initApp()
    // var out = document.getElementById('out');
    // out.onclick= SignOut ;
    // var Btn =document.getElementById('Btn')
    //     Btn.onclick = addFriend;

});
function showMessage() {
	console.log(email);
}
function addFirstTimeUser() {
	console.log(email);
}