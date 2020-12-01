const List = [
    {"name" : "Mario", "ID" : "00001" , "img" : "ICON MAN.png"},
    {"name" : "Pattric", "ID" : "00002", "img" : "ICON MAN.png"},
    {"name" : "Uno", "ID" : "00003" , "img" : "ICON MAN.png"},
    {"name" : "Emma", "ID" : "00004", "img": "ICON MAN.png"},
    {"name" : "Bella", "ID" : "00005", "img" : "ICOn MAN.png"},
    {"name" : "Tena", "ID" : "00006", "img" : "ICON MAN.png"},
]


function template(data){
    let Listall = "";
    for(let i =0; i<data.length; i++){
        let Listcard = '<div class = "card p-2 text-center">';
        Listcard += `<img class = "card-img-top" src = "./public/img/${data[i].img}" style = "width:50%">`
        Listcard += `<div class = "card-body">`
        Listcard += `<h4 class = "card-title">${data[i].ID} </h>`
        Listcard += `<p class = "card-text">${data[i].name}</p> <input type = "button" class = "btn btn-danger" value = "BAN">`
        Listcard += '</div></div>'
        Listall += Listcard;
    }
    return Listall;
}

//Main Script
$(document).ready(function(){
    $("#pg").pagination({
        dataSource: List,
        pageSize : 6,
        className: 'paginationjs-theme-blue paginationjs-big',
        callback: function(data, pagination){
            const html = template(data);
            $("#data").html(html);
        }
    })
})