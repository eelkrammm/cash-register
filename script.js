let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

price = 19.5
cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

const cash = document.getElementById("cash"); 
const purchaseBtn = document.getElementById("purchase-btn"); 
const wrapper2 = document.getElementById("wrapper-2");
const priceWrapper = document.getElementById("price"); 
const changeDue = document.getElementById("change-due");

priceWrapper.textContent = `Price: $${price}`;
wrapper2.innerHTML = cid.map((item) => {
  return `<p class="cid">${item[0].charAt(0).toUpperCase() + item[0].toLowerCase().slice(1)}: $${item[1]}</p>`
}).join("");

const value = [0.01, 0.05, 0.10, 0.25, 1, 5, 10, 20, 100]

const change = () => {
  let newCid = [];
  let i = 0; 
for(let char of cid){
  let obj = {}; 
  obj.type = char[0]; 
  obj.value = value[i]; 
  obj.total = char[1]; 
  newCid.push(obj);
  i++
}

let change = (cash.value - price).toFixed(2); 

const result = []; 
let status = '';
for(let i = newCid.length - 1; i >= 0; i--){
 let used = 0;
  while (
    change >= newCid[i].value &&
    newCid[i].total >= newCid[i].value
  ) {
    change = Number((change - newCid[i].value).toFixed(2));
    newCid[i].total = Number(
      (newCid[i].total - newCid[i].value).toFixed(2)
    );

    used += newCid[i].value;
  }

  if (used > 0) {
    result.push([newCid[i].type, Number(used.toFixed(2))]);
  }

  let drawerLeft = newCid.reduce((sum, item) => {
  return sum + item.total;
}, 0);

  if (change > 0) {
   status = "INSUFFICIENT_FUNDS"
}
else if (drawerLeft === 0) {
   status = "CLOSED"
}
else {
   status = "OPEN"
}
}

console.log(status)

if(cash.value < price){
  alert("Customer does not have enough money to purchase the item");
  return;
} else if(Number(cash.value) === price){
  changeDue.innerHTML = "No change due - customer paid with exact cash";
  return;
}

const innerHTML = result.map((item) => {
  return `${item[0].charAt(0).toUpperCase() + item[0].slice(1).toLowerCase()}: $${item[1]}`
}).join(" ");
console.log(result);
console.log(newCid);

changeDue.innerHTML = `Status: ${status} ${status === "OPEN" || status === "CLOSED" ? innerHTML : ``}`

return newCid;
}

purchaseBtn.addEventListener("click", change)
