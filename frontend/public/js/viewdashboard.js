var email = '';
var count =0;
var dbref = '';
var database = firebase.database()
var key = ""

 $('.tap-target').tapTarget('open');

initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        	var displayName = user.displayName;
            email = user.email;
            email = user.email.substring(0,email.lastIndexOf("@"))
    		email = email.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
            showMessage();
            document.getElementById('zuser').innerHTML = displayName;
            document.getElementById('zuser1').innerHTML = displayName;
            retrive();
             $('.modal').modal();
        }
      })
 }

window.addEventListener('load', function() {
	var urlString = window.location.href;
    var url = new URL(urlString);
    key = url.searchParams.get('key');
    
    initApp()
    //testDatabaseBackend()
    var out = document.getElementById('out');
    out.onclick= SignOut ;

});

function  SignOut() {

    
    firebase.auth().signOut().then(function() {
        window.location = 'index.html';
    }).catch(function(error) {
        // An error happened.
    });
}
function retrive() {
	
    firebase.database().ref("dashboard/"+email+'/'+key +'/queries' ).once('value', function(snap){
        snap.forEach(yourData);
        console.log('In retrive function')
        if(snap.val() == null)
        {
            console.log('Empty database');
        }
        else console.log('Not Empty database');
    });
}
function yourData(data)
{
  var object = data.val()
  var task_row = $('#query_list');
  var queries = object;
  var key   = data.key
  console.log(key)
  count = count+1
  var data = "";
  {
      data += '<tr id = "'+key+'">\
          <td>\
            <a class="friends-name black-text"><a> '+count+'</a></td>\
            <td>\
            <td>\
            <a class="friends-name black-text" onclick="ExecuteQuery(\''+key+'\')">'+object.query+'</a></td>\
            <td>\
            <td>\
              <button class="tooltipped btn-floating btn-medium waves-effect waves-light blue" onclick = "EditQuery(\''+key+'\')" ><i class="medium material-icons">create</i></button>\
            </td>\
            <td>\
              <button class="tooltipped btn-floating btn-medium waves-effect waves-light red" onclick = "DeleteQuery(\''+key+'\')" ><i class="medium material-icons">clear</i></button>\
            </td>\
          </tr>';
  }
  task_row.append(data)
}
function showMessage(){

    var name=firebase.auth().currentUser.displayName;
    Materialize.toast('Welcome to DashBoard Editor  '+name+" !", 4000)
    return;
}
function addQuery()
{
	var query = document.getElementById('query')
	if(!query.checkValidity())
	{
		Materialize.toast("Please enter a Valid query",4000);

	}
	else{
		insertIntoDB(query);

	}
}
function insertIntoDB(query){
	console.log(query.value)
	var taskObject = {
		query : query.value
	}
	db_ref=database.ref("dashboard/"+email+'/'+key +'/queries/').push().key;
	console.log(db_ref)
	 database.ref('dashboard/'+email+'/'+key+'/queries'+"/"+db_ref).set(taskObject).then(function(){
        console.log('inserted task');
        
        
         Materialize.toast('Task inserted successfully!!', 4000)
    }).catch(function(error){
        console.log(error);
        Materialize.toast('Task not inserted due to error!!', 4000)
    });
}
function printLatestQuery()
{
	$
}
function EditQuery(value)
{
	
	$('#modal2').modal('open');
}
function submitUpdatequery()
{

}
function DeleteQuery(value)
{
	database.ref('dashboard/'+email+'/'+key+'/queries'+"/"+value).remove();
    var x = document.getElementById(value);
    x.style.display = "none";
}
function ExecuteQuery(value)
{
	var query =""
	var x = 'dashboard/'+email+'/'+key+'/queries'+"/"+value
	firebase.database().ref(x).once('value', function(snap){
        query =snap.val().query 
        window.location = "viewchart.html?dbref="+query+'&key=' +x;
    });
	
}
