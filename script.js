let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let total=document.getElementById("total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let submit=document.getElementById("submit")
let deleteAll=document.getElementById("deleteAll")
let mood='create'
let temp;

function getTotal(){
    if(price.value!==''){
        const result=(+price.value + +taxes.value+ +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background="#040"
    }else{
        // alert("Please Enter Price First")
        // taxes.value=""
        // ads.value=""
        // discount.value=""
        total.style.background="#a00d02"
        total.innerHTML='';
    }
   
}


let dataPro;
if(localStorage.product!=null){
    dataPro=JSON.parse(localStorage.product)
}else{
    dataPro= [] ;
}

submit.onclick=(()=>{
    let newPro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if(mood==='create'){
        if (newPro.count > 1) {
          for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
          }
        } else {
          dataPro.push(newPro);
        }
    }else{
        dataPro[temp]=newPro;
        mood='create';
        submit.innerHTML='Create'
        count.style.display="block"
    }
  

    localStorage.setItem('product',JSON.stringify(dataPro))
    clearData()
    readData()
    countItem()
})

function clearData(){
    title.value='';
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    category.value=''
}

function readData(){
    getTotal()
    let table=""
    for(let i=0;i<dataPro.length;i++){
        table+=`
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML=table
    if(dataPro.length>0){
        deleteAll.innerHTML=`
        <button onclick="deleteAllItem()">DeleteAll (${dataPro.length})</button>
        `
    }else{
        deleteAll.innerHTML=''

    }
}
readData()

function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product=JSON.stringify(dataPro)
    readData()
}


function deleteAllItem(){
    localStorage.clear()
    dataPro.splice(0)
    readData()
}




function updateData(i){
    title.value=dataPro[i].title
    price.value=dataPro[i].price
    taxes.value=dataPro[i].taxes
    ads.value=dataPro[i].ads
    discount.value=dataPro[i].discount
    getTotal()
    category.value=dataPro[i].category
    count.style.display="none"
    submit.innerHTML='Update'
    mood='Update'
    temp=i
    scroll({
        top:0,
        behavior:"smooth"
    })
}