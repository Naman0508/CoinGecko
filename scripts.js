let data;

function fetchDataWithThen(){
    let response=fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    response.then((serverResponse)=>{
        result=serverResponse.json();
        result.then((data)=>{
            renderTable(data);
        });
        result.catch((error)=>{
            console.log(error);
        })
    });
    response.catch((error)=>{
        console.log(error);
    })
}


async function fetchData(){
    try{
        let response=await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        data=await response.json();
        
        renderTable(data);
    }catch(error){
        console.log(error);
    }
}
fetchData();


function renderTable(data) {
    let table = document.getElementById("table");
    table.innerHTML = "";
    console.log(data);
    data.forEach((element)=>{
        let data1=element;

        let priceChangeClass = "positive";
        if (data1.price_change_percentage_24h < 0) {
          priceChangeClass = "negative";
        }

        let innerHtml = `
        <td class="image"><img src=${data1.image}></td>
        <td class="name">${data1.name}</td>
        <td class="symbol">${data1.symbol.toUpperCase()}</td>
        <td class="currentprice">${data1.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).split('.')[0]}</td>
        <td class="volume">${data1.total_volume.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).split('.')[0]}</td>
        <td class="percentage ${priceChangeClass}">${data1.price_change_percentage_24h.toFixed(2)}%</td>
        <td class="marketcap">Mkt Cap: ${data1.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).split('.')[0]}</td>
      `;
      
      let row = document.createElement("tr");
      row.innerHTML = innerHtml;
      table.append(row);
      let nextrow=document.createElement("tr");
      nextrow.innerHTML=`
        <td colspan="7"><hr></td>
      `;
      
      table.append(nextrow);
    });
  
}

let search=document.getElementById("searchInput");
search.addEventListener("keydown",function(event){
    if(event.keyCode===13){
        event.preventDefault();
        let searchItem=search.value;
        performSearch(searchItem);
    }
});

function performSearch(searchItem){
    let filteredData = data.filter((element) => {
        return (
          searchItem.toLowerCase() === element.name.toLowerCase() ||
          searchItem.toLowerCase() === element.symbol.toLowerCase()
        );
      });
      renderTable(filteredData);
}
// Function to sort data by market cap
function sortByMarketCap() {
    const sortedData = data.slice().sort((a, b) => a.market_cap - b.market_cap);
    renderTable(sortedData);
  }
  
  // Function to sort data by percentage change
  function sortByPercentageChange() {
    const sortedData = data.slice().sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
    renderTable(sortedData);
  }

console.log(data.slice());