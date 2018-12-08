/* JavaScript Final Project

Girl Scout Cookie Order Form
Author: Terry Wells

*/

/* jslint node: true */
"use strict"; // interpret contents in JS strict mode 
var delivInfo = {};  //declared empty generic object using an object literal that encapsulates data
var delivSummary = document.getElementById( "deliverTo" ); // "deliverTo" references deliverTo element with delivInfo variable
var cookieInfo = {}; // declared empty generic object using the cookieInfo variable
var cookieSummary = document.getElementById( "order" ); // order string name references order element with the cookieInfo variable

// function to copy account address details into shipping info fieldset
function fillShipping(f) {
    if (f.shippingtoo.checked === true) {
        f.shippingaddress.value = f.acctaddress.value;
        f.shippingcity.value = f.acctcity.value;
        f.shippingstate.value = f.acctstate.value;
        f.shippingzip.value = f.acctzip.value;
    }
}

// function to clear shipping address field should user decide to enter a different shipping address after clicking Same as Shipping radio button
function clearFields() {
    document.getElementById("shipaddr").value = "";
    document.getElementById("shipcity").value = "";
    document.getElementById("shipstate").value = "";
    document.getElementById("shipzip").value = "";
}
// function to add the total of the cookie box input field values
function findTotal() {
    var arr = document.getElementsByName('qty');
    var sub = 0; // subtotal 
    var tot = 0; // total
    var ship = 0; // shipping
     
    for (var i = 0; i<arr.length; i++) {
        if(parseInt(arr[i].value))
            tot += parseInt(arr[i].value);
    }
    document.getElementById("total").value = tot; // total 

   // calculate subtotal of all boxes order * $3.50
    sub = tot * 3.5;

  // if over 10 boxes ordered, add shipping cost of 0.05%
     if (tot >= 10) {
    ship = 0;
    } else {
    ship = sub * .05;
    }

    // calculate total cost with or without shipping
    tot = sub + ship;
    
  // convert subtotal, shipping and totals to two decimals
    sub = sub.toFixed(2);
    ship = ship.toFixed(2);
    tot = tot.toFixed(2);

    // show totals on page at bottom beneath shipping address, city, state, zip 
    document.getElementById("sub").innerHTML = "Subtotal is: $" + sub;

    if(ship == 0) {
      document.getElementById("ship").innerHTML = "Shipping Cost: None";
    } else {
               document.getElementById("ship").innerHTML = "Shipping Cost: $" + ship; }
    document.getElementById("tot").innerHTML = "Total Cost: $" + tot;
}

function processCookie() { 
  var prop; // hold cookie order box entries 
  var cookieOpt = document.getElementsByName( "qty" ); //references "qty" elements in Cookie Fieldset
  cookieInfo.thin = document.getElementById( "thinmints" ).value;
  cookieInfo.do = document.getElementById( "dosidos" ).value;
  cookieInfo.lemon = document.getElementById( "lemoncremes" ).value;
  cookieInfo.sand = document.getElementById( "sandollars" ).value;
  cookieInfo.choc = document.getElementById( "chocolatechip" )
  for (prop in cookieInfo) {
    cookieSummary.innerHTML += "<p>" + cookieInfo[prop] + "<p>";
      document.getSelection("prop");
  }
}
  
// function processDelivery from shipping section to preview order section
function processDeliveryInfo() {
  var prop; // used to old input
  delivInfo.addr = document.getElementById ( "shipaddr" ).value;
  delivInfo.city = document.getElementById ( "shipcity" ).value;
  delivInfo.state = document.getElementById ( "shipstate" ).value;
  delivInfo.zip = document.getElementById ( "shipzip" ).value;
  
  for (prop in delivInfo) {
    delivSummary.innerHTML += "<p>" + delivInfo[prop] + "<p>";
  }
}

// function to previewOrder and change display style to block (page 470)
function previewOrder() {
    processDeliveryInfo();  
    processCookie();
     findTotal();
     document.querySelector("section").style.display = "block"; // method returns 1st occurance of section element which is deliver to
     document.getElementById("deliverTo").style.display = "block"; // method returns deliverTo div id under Order Information section 
   }

//event listener for the previewBtn that calls the previewOrder function
function createEventListener(){
  var pBtn = document.getElementById("pBtn");
  if (pBtn.addEventListener) {
    pBtn.addEventListener("click", previewOrder, false);
  } else if (pBtn.attachEvent) {
    pBtn.attachEvent("onclick", previewOrder, processCookie);
  }
}

if (window.addEventListener) {
  window.addEventListener("load", createEventListener, false);
} else if (window.attachEvent){
  window.attachEvent("onload", createEventListener);
}