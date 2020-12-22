$(document).ready(function () {
    $("#btnManageUser").on("click", function () {
        window.location.replace("/manageuserPage")
    })

    $("#btnManagePost").on("click", function () {
        window.location.replace("/managepostPage")
    })

    $("#btn-signout").on("click", function () {
        window.location.replace("/")
    })


    // ------------------ Show Bell ------------------------
    $("#btnBell").on("click" , function(req , res){
        $("#modalBell").modal("show")
    })

    $("#pagina").pagination({
        dataSource: function(done){
            $.ajax({
                type: "GET",
                url: "/getAuthen",
                success: function(response){
                    done(response)
                }
            });
        },
        pageSize: 10,
        className: 'pagination-theme-blue pagination-big',
        callback: function(data , pagination){
            const show = User(data);
            $("#userShow").html(show)
            $(".btn-User").on("click" , function(){
                const user = $(this).attr("UserID")
                localStorage.User = user
                console.log(localStorage.User)
                window.location.replace("/Autehnticatecheck")
            })
        }
    })



    // ------------------ Show All Post -------------------------
    $("#pg").pagination({
        dataSource: function (done) {
            $.ajax({
                type: "GET",
                url: "/allPost",
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
                window.location.replace("/userpost")

            })
        }

    });

    $("#all").on("click", function () {
        $("#pg").pagination({
            dataSource: function (done) {
                $.ajax({
                    type: "GET",
                    url: "/allPost",
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
                    window.location.replace("/userpost")

                })
            }

        });
    })


    // --------------------- Show Active Post -------------------------
    $("#active").on("click" , function(){
        $("#pg").pagination({
            dataSource: function (done) {
                $.ajax({
                    type: "GET",
                    url: "/showPost",
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
                    window.location.replace("/userpost")
                    
                })
            }
    
        });
    })


    // --------------------- Show Wait Confirm Post ----------------------------
    $("#wait").on("click", function () {
        $("#pg").pagination({
            dataSource: function (done) {
                $.ajax({
                    type: "GET",
                    url: "/detailCard",
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
                    window.location.replace("/confirmpage")

                })
            }

        });
    })


    // ------------------------ Show Close Post -----------------------
    $("#close").on("click" , function(){
        $("#pg").pagination({
            dataSource: function (done) {
                $.ajax({
                    type: "GET",
                    url: "/closePost",
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
                    window.location.replace("/closePosted")

                })
            }

        });
    })


    // ----------------------- Show Count --------------------------

        // ------------------ All Count --------------------
    $.ajax({
        type: "GET",
        url: "/countAll",
        success: function (data) { 
            $("#allCount").text(data[0].COUNTALL)
         },
         error: function(xhr){
             alert(xhr.responseText)
         }
    })

        // ---------------- Active Count --------------------
    $.ajax({
        type: "GET",
        url: "/countActive",
        success: function(data){
            $("#activeCount").text(data[0].COUNTACTIVE)
        },
        error: function(xhr){
            alert(xhr.responseText)
        }
    })

        // ------------- Wait Count --------------------
    $.ajax({
        type: "GET",
        url: "/countWait",
        success: function(data){
            $("#waitCount").text(data[0].COUNT)
        },
        error: function(xhr){
            alert(xhr.responseText)
        }
    })

        // ------------- Close Count ----------------
    $.ajax({
        type: "GET",
        url: "/countClose",
        success: function(data){
            $("#closeCount").text(data[0].COUNTCLOSE)
        },
        error: function(xhr){
            alert(xhr.responseText)
        }
    })

        // ----------- Report Count ---------------
        $.ajax({
            type: "GET",
            url: "/countReport",
            success: function(data){
                $("#manageCount").text(data[0].COUNTREPORT)
                $("#reportCount").text(data[0].COUNTREPORT)
            }
        })

        // --------------- User Count ----------------
        $.ajax({
            type: "GET",
            url: "/countUser",
            success: function(data){
                $("#countuser").text(data[0].COUNTUSER)
            }
        })
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

function User(data){
    let userAll = ""
    for(let i = 0; i<data.length; i++){
        let userCard =  "<div class = 'card p-2 text-center'>";
        userCard += `<img class = "card-img-top" src= "UploadProfile/${data[i].EvidenceFile}" width: 200px; height 200px;" >`
        userCard += '<div class = "card-body">'
        userCard += `<h4 class = "card-title">${data[i].FirstName}</h4>`
        userCard += `<p class = "card-body"></p>`
        userCard += "<input type = 'button' class = 'btn btn-info btn-User' UserID ='" + [data[i].User_ID] + "' value = 'See More'>"
        userCard += '</div></div>'
        userAll += userCard
    }
    return userAll;
}
