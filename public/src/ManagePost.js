$(document).ready(function () {
    $("#btnHome").on("click" , function(){
         window.location.replace("/Admin")
        
    })

    $("#btnManageUser").on("click" , function(){
        window.location.replace("/manageuserPage")
    })

    // -------------- Show Count Report -----------------
    $.ajax({
        type: "GET",
        url: "/countReport",
        success: function(data){
            $("#manageCount").text(data[0].COUNTREPORT)
            $("#reportCount").text(data[0].COUNTREPORT)
        }
    }) 

    // -------------- Show Report Post ----------------
    $("#pg").pagination({
        dataSource: function (done) {
            $.ajax({
                type: "GET",
                url: "/reportPost",
                success: function (response) {
                    done(response)
                }
            });
        },
        pageSize: 6,
        className: 'paginationjs-theme-blue pagination-big',
        callback: function (data, pagination) {
            const myHtml = template(data);
            $("#dataDonate").html(myHtml)
            $(".btn-detail").on("click", function () {
                const btn = $(this).attr("ID")
                localStorage.ID = btn;
                console.log(localStorage.ID);
                window.location.replace("/MockupmanagepostPage")

            })
        }

    });
});

function template(data) {
    let donateAll = "";
    for (let i = 0; i < data.length; i++) {
        let donateCard = "<div class = 'card p-2 text-center'>";
        donateCard += `<img class = "card-img-top" src= "Upload/${data[i].FileImage}" width: 200px; height 200px;" >`
        donateCard += '<div class = "card-body">'
        donateCard += `<h4 class = "card-title"> ${data[i].Post_Title}</h4>`
        donateCard += `<p class = "card-body"> ${data[i].Post_Description}</p>`
        donateCard += "<input type = 'button' class = 'btn btn-warning btn-detail' ID ='" + [data[i].Post_ID] + "' value = 'See More'>"
        donateCard += '</div></div>'
        donateAll += donateCard
    }
    return donateAll;

}