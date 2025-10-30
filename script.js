const BASE_URL="https://api.frankfurter.app/latest";

const dropdowns=document.querySelectorAll(".dropdown select");

const button=document.querySelector("button");

const fromCurr=document.querySelector(".from select");

const toCurr=document.querySelector(".to select");

const msg=document.querySelector(".msg");

for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
 let currCode=element.value;
  let countryCode=countryList[currCode];
  // Special case for Euro
  if (currCode === "EUR") {
    element.parentElement.querySelector("img").src =
      "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg";
    return;
  }
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
 let img= element.parentElement.querySelector("img");
 img.src=newSrc;
};

button.addEventListener("click",async (evt)=>{
evt.preventDefault();
let amount=document.querySelector(".amount input");
let amtVal=amount.value;
if(amtVal==="" || amtVal<1)
{
    amtVal=1;
    amount.value="1";
}
 if (fromCurr.value === toCurr.value) {
    msg.innerText = "Both currencies are the same!";
    return;
  }
 
const URL=`https://api.frankfurter.app/latest?from=${fromCurr.value.toUpperCase()}&to=${toCurr.value.toUpperCase()}`;
let response=await fetch(URL);
let data=await response.json();

let rate=data.rates[toCurr.value.toUpperCase()];
let finalAmount=(amtVal*rate).toFixed(2);
msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
});

window.addEventListener("load", () => {
  fromCurr.value = "USD"; // Set default from currency
  toCurr.value = "INR";   // Set default to currency (you can change this)
  updateFlag(fromCurr);   // Update "From" flag
  updateFlag(toCurr);     // Update "To" flag
});