function onPageDetailsReceived(pageDetails)  { 
    document.getElementById('title').value = pageDetails.title; 
    document.getElementById('url').value = pageDetails.url; 
    document.getElementById('price').value = pageDetails.price;
  
    if (pageDetails.image == "no image" || pageDetails.image == '') {
        document.getElementById('image').style.display = "none"

    }else{
        document.getElementById('image').src = pageDetails.image;
    }
} 

function addItem(){
    var table = document.getElementById('list');
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = document.getElementById('title').value
    cell2.innerHTML = document.getElementById('url').value
    cell3.innerHTML = document.getElementById('price').value
    console.log(document.getElementById('title').value)
}
var statusDisplay = null;



window.addEventListener('load', function(evt) {
    
    statusDisplay = document.getElementById('status-display');
   
    document.getElementById('addbtn').addEventListener('click', addItem);

    chrome.runtime.getBackgroundPage(function(eventPage) {
        
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});