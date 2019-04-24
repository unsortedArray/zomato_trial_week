//console.log('print ' + localStorage.mail);

var email = '';
var count =0;
var dbref = '';
var database = firebase.database()

 $('.tap-target').tapTarget('open');

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
            document.getElementById('zuser').innerHTML = disp;
            document.getElementById('zuser1').innerHTML = disp;
            user.getIdToken().then(function(accessToken) {
                addFirstTimeUser();
                email = user.email.substring(0,email.lastIndexOf("@"))
                email = email.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
                retrieve();
                $('.modal').modal();
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
    testDatabaseBackend()
    var out = document.getElementById('out');
    out.onclick= SignOut ;

});
function addFirstTimeUser(){
    var user=firebase.auth().currentUser

    console.log(user);
    console.log("actual_email "+user.email);
    var actual_email=user.email;
    console.log(actual_email+" 2");
    var new_email = actual_email.substring(0,actual_email.lastIndexOf("@"))
    new_email = new_email.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');

    firebase.database().ref("users/"+new_email).once('value',function(snapshot){

        var check=snapshot.exists();

        console.log(check);
        if(check){
            console.log("visited earlier also ");
        }
        else{
            console.log("visited first time");
            var userObject={
                Name:user.displayName,
                Contact:user.phoneNumber,
                actual_email : actual_email
               // PhotoURL:user.PhotoURL,

            }
            firebase.database().ref('users/'+new_email).set(userObject);
            console.log("new user inserted");
        }
    })

}

function addDashboard()
{

    var check=boardValidity();
    if(check==1){
        var board_name=$('#board_name').val();
        var board_desc=$('#board_desc').val();

        
        var email=firebase.auth().currentUser.email;
        var new_email = email.substring(0,email.lastIndexOf("@"))
        new_email = new_email.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
        console.log(new_email);
        insertIntoDatabase(board_name, board_desc,0);
        print_latest_task(board_name ,board_desc,0, db_ref);
    }else{
        //toast for task not inserted
         Materialize.toast('Task not inserted', 4000);
    }
}
function boardValidity(){
    var check=1;
    var board_name_ele=document.getElementById('board_name');
    var board_desc_ele=document.getElementById('board_desc');
    if(!board_name_ele.checkValidity()){
        check=0;
        Materialize.toast('Invalid Name', 4000);
    }
    
    if(!board_desc_ele.checkValidity()){
        check=0;
        Materialize.toast('Invalid board_desc', 4000);
    }
    return check;

}
function insertIntoDatabase(board_name, board_desc)
{
	queries = ['none'];
    var taskObject={
        board_name: board_name,

        description:board_desc,
        queries_count:0,
        queries: queries
    };
    insertIntoTask(taskObject,email);
}
function insertIntoTask(taskObject,email){
    db_ref=database.ref('dashboard/'+email).push().key;
    database.ref('dashboard/'+email+"/"+db_ref).set(taskObject).then(function(){
        console.log('inserted task');
        $('#board_name').val('');
        $('#board_desc').val('');
        
         Materialize.toast('Task inserted successfully!!', 4000)
    }).catch(function(error){
        console.log(error);
        Materialize.toast('Task not inserted due to error!!', 4000)
    });
}

function  SignOut() {

    console.log('HEy');
    firebase.auth().signOut().then(function() {
        window.location = 'index.html';
    }).catch(function(error) {
        // An error happened.
    });
}

function showMessage(){

    var name=firebase.auth().currentUser.displayName;
    Materialize.toast('Welcome '+name+" !", 4000)
    return;
}

function yourData(data)
{
    console.log(data.key);
    printTable(data,data.key);
    //console.log(use);
}
function print_latest_task(task_name,desc,count ,key)
{
  var task_row = $('#dashboard_list');
  var data = "";
  {
      data += '<tr id = "'+key+'">\
          <td>\
            <a class="friends-name black-text" onclick="displayTaskDetails(\''+key+'\')">'+task_name+'</a></td>\
            <td>\
            <a class="friends-name black-text" onclick="displayTaskDetails(\''+key+'\')">'+desc+'</a></td>\
            <td>\
            <a class="friends-name black-text" onclick="displayTaskDetails(\''+key+'\')">'+count+'</a></td>\
            <td>\
              <button class="tooltipped btn-floating btn-medium waves-effect waves-light blue" onclick = "EditBoard(\''+key+'\')" ><i class="medium material-icons">create</i></button>\
            </td>\
            <td>\
              <button class="tooltipped btn-floating btn-medium waves-effect waves-light red" onclick = "removeTask(\''+key+'\')" ><i class="medium material-icons">clear</i></button>\
            </td>\
          </tr>';
  }
  
  task_row.append(data);
}
function printTable(object,key)
{

  var task_row = $('#dashboard_list');
  var queries = object.val().queries.length -1 
  
  var data = "";
  {
      data += '<tr id = "'+key+'">\
          <td>\
            <a class="friends-name black-text" onclick="displayTaskDetails(\''+key+'\')">'+object.val().board_name+'</a></td>\
            <td>\
            <a class="friends-name black-text" onclick="displayTaskDetails(\''+key+'\')">'+object.val().description+'</a></td>\
            <td>\
            <a class="friends-name black-text" onclick="displayTaskDetails(\''+key+'\')">'+  queries+'</a></td>\
            <td>\
              <button class="tooltipped btn-floating btn-medium waves-effect waves-light blue" onclick = "EditBoard(\''+key+'\')" ><i class="medium material-icons">create</i></button>\
            </td>\
            <td>\
              <button class="tooltipped btn-floating btn-medium waves-effect waves-light red" onclick = "removeTask(\''+key+'\')" ><i class="medium material-icons">clear</i></button>\
            </td>\
          </tr>';
  }
  
  task_row.append(data);
}
function displayTaskDetails(key)
{
  firebase.database().ref('dashboard/' + email + '/' + key).once('value',function(snap){
  	console.log(snap.val())
    document.getElementById('NameDetail').innerHTML = snap.val().board_name;
    document.getElementById('Description').innerHTML = snap.val().description;
    document.getElementById('queries_count').innerHTML = snap.val().queries_count;
    document.getElementById('Queries').innerHTML = snap.val().queries
    $('#modal5').modal('open');
  });
}
function removeTask(key)
{
    firebase.database().ref("dashboard/" + email + "/" + key).remove();
    var x = document.getElementById(key);
    x.style.display = "none";
}
function retrieve() {
    firebase.database().ref("dashboard/"+email ).once('value', function(snap){
        snap.forEach(yourData);
        console.log('In retrieve function')
        if(snap.val() == null)
        {
            console.log('Empty database');
        }
        else console.log('Not Empty database');
    });
}
function EditBoard(key){
	window.location = "viewdashboard.html?key="+key

}
function testDatabaseBackend(){


	$.get('http://127.0.0.1:8080/order',function(data)
	{
		console.log(data)
	})
	//console.log(data)

	//console.log( Object.keys(data))
}
