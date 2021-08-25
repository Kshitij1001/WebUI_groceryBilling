let det=null,codes=null,list={};

$.getJSON('data.json', function(data){
    det = data["productsByCodes"];
    codes = Object.keys(det);
    let child=null;
    for(let i=0;i<codes.length;i++){
        child = $("<option></option>").text(codes[i]);
        $("#suggestions").append(child);
    }   
});


$("#codeInput").on('input',()=>{
    if(codes.includes($("#codeInput").val())){
        $("#quant").prop('disabled',false)
        $("#addBtn").prop('disabled',false)
    }
    else{
        $("#quant").prop('disabled',true)
        $("#addBtn").prop('disabled',true)
    }
});

$("#addBtn").click(()=>{
    let proCode=$("#codeInput").val();
    if(proCode in list){
        alert('This product is already added');
        return null;
    }
    list[proCode]=Number($("#quant").val());
    let prod = det[proCode];
    let row=`<tr><td>${prod.details.name}</td><td>${prod.details['net weight']}</td>
        <td>${prod.details.category}</td><td>${prod.details.company}</td>
        <td>${prod.details.dateOfManufacture}</td><td>${prod.details['best before']}</td>
        <td>${prod.price}</td><td>${$("#quant").val()}</td></tr>`;

    $("tbody").append(row);
})

$("#billbtn").click(()=>{
    if(Object.keys(list).length==0){
        alert('The cart is empty');
        return null
    }
    sessionStorage.setItem("proList",JSON.stringify(list));
    window.location.replace('./billing.html');
})