const donate = [
    {"name": "Education", "descript": "Please Donate Book for Me!!" , "image": "book.jpg"},
    {"name": "Wildfire", "descript": "Please Donate Book for Me!!" , "image": "fire.jpg"},
    {"name": "Donate", "descript": "Please Donate Book for Me!!" , "image": "book.jpg"},
    {"name": "Poor", "descript": "Please Donate Book for Me!!" , "image": "fire.jpg"},
    {"name": "Building", "descript": "Please Donate Book for Me!!" , "image": "book.jpg"},
    {"name": "Poor", "descript": "Please Donate Book for Me!!" , "image": "fire.jpg"},

];

function template(data){
    let donateAll = "";
    for(let i = 0; i< data.length; i++){
        let donateCard = "<div class = 'card p-2 text-center'>";
        donateCard += `<img class = "card-img-top" src= "./public/img/${data[i].image}" width: 250px; height 250px;" >`
        donateCard += '<div class = "card-body">'
        donateCard += `<h4 class = "card-title"> ${data[i].name}</h4>`
        donateCard += `<p class = "card-body"> ${data[i].descript}</p>`
        donateCard += '<input type = "button" class = "btn btn-warning" value = "See More">'
        donateCard += '</div></div>'
        donateAll += donateCard
    }
    return donateAll;
    
}

$(document).ready(function(){
    $("#btn-Login").on("click", function(){
        $("#darkModalForm").modal("show");
    })

    $("#pg").pagination({
        dataSource: donate,
        pageSize: 6,
        className: "paginations-theme-blue paginations-big",
        callback: function(data, pagination){
            const html = template(data);
            $("#dataDonate").html(html);
        }
    });
})