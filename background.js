
let first = "none";
let id = "";
chrome.runtime.onMessage.addListener(function(msg,sender) {
    if (msg.from == "index") {  
      id = msg.id;
       validteID();
    }
});
function notification(string1 , string2){
    console.log("Notification");
    console.log(string1 , string2);
    chrome.notifications.create({
        title : string1,
        message : string2 ,
        iconUrl : "search.png",
        type : "basic"
    });
    console.log("Here");
}
async function validteID(id){
    let response = await fetch('https://codeforces.com/api/user.status?handle='+id+'&from=1&count=3')
    let data = await response.json();
    if(data['status']==='FAILED'){
        notification("Invalid ID" , "Enter ID again");2
        return;
    }
    else
    setInterval(check , 3000);
    console.log("ID Verified!!");
}
var lastSub = "";
var lastSubVerdict = "";

async function check(){
    let response = await fetch('https://codeforces.com/api/user.status?handle='+id+'&from=1&count=3')
    let data = await response.json();
    let recentSub = data['result'][0]['id'];
    let recentSubVerdict = data['result'][0]['verdict']
    let string1 = data['result'][0]['problem']['index'] + " " + data['result'][0]['problem']['name']
    if(lastSubVerdict==="TESTING"){
        notification(string1,recentSubVerdict);
    }
    if(recentSub!==lastSub){
        console.log("Judging Answers");
        notification(string1, recentSubVerdict);
    }
    console.log("Chekced!!");
    lastSub = recentSub;
    lastSubVerdict = recentSubVerdict;
}