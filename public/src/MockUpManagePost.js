$(document).ready(function () {
    
    $("#btnHome").on("click" , function(){
        alert("JI")
    })
    
    var dataSet = [{
        "id": "001",
        "name" : "Edward",
        "status": "User",
        "comment": "He lie"
    },
    {
        "id": "002",
        "name" : "Rola",
        "status": "User",
        "comment": "He lie"
    },
    {
        "id": "003",
        "name" : "Olaf",
        "status": "User",
        "comment": "He lie"
    },
    {
        "id": "004",
        "name" : "Lily",
        "status": "User",
        "comment": "He lie"
    },
    {
        "id": "005",
        "name" : "Mona",
        "status": "User",
        "comment": "He lie"
    }
    ];
    $("#myTable").DataTable({
        data: dataSet,
        columns:[
            {data: "id" , title: "ID"},
            {data: "name" , title: "NAME"},
            {data: "status", title: "STATUS"},
            {data: "comment", title: "COMMENT"},
            {title: "MANAGE", defaultContent: "<input type = 'button' class = 'btn btn-danger' value = 'BAN'>"}
        ]
    });

});