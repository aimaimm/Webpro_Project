$(document).ready(function () {
    $("#btnsignOut").on("click", function () {
        $.ajax({
            type: "GET",
            url: "/signout",
            success: function (data) {
                window.location.replace(data)
            },
            fail: function (xhr) {
                alert(xhr.responseText);
            }
        })
    })
    $("#btnPost").on("click", function () {
        $.ajax({
            type: "POST",
            url: "/checkAuthen",
            success: function (data) {
                if (data[0].Upload_Status == null || data[0].Upload_Status == 1) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Please Confirm Identity',
                        text: 'You have not verified your identity, Please verify your identity first',
                        showCancelButton: true,
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.replace("/profile");
                        }
                    })
                }
                else {
                    window.location.replace("/postPage");
                }
            },
            fail: function (xhr) {
                Swal.fire(xhr.responseText)
            }
        })
    })

    $("#btnUs").on("click" , function(){
        window.location.replace("/AboutUs")
    })

    // ---------------- Show Count Confirm ------------------------
    $.ajax({
        type: "GET",
        url: "/countWait",
        success: function(data){
            $("#countConfirm").text(data[0].COUNT)
        },
        error: function(xhr){
            alert(xhr.responseText);
        }
    })


    // -------------------- Show Modal Box ------------------------
    $("#btnRing").on("click", function () {
        $("#modalBoxShow").modal("show")
    })


    // ---------------------- To Profile Page --------------------------
    $("#btnProfile").on("click", function () {
        window.location.replace("/profile")
    })



    // -------------------------- Box to Confirm Post ------------------------
    $("#pagination").pagination({
        dataSource: function(done){
            $.ajax({
                type: "GET",
                url: "/detailCard",
                success: function(response){
                    done(response)
                }
            })
        },pageSize: 6,
        className: 'paginationjs-theme-blue pagination-big',
        callback: function(data , pagination){
            const HT = cardConfirm(data);
            $("#confirm").html(HT);
            $(".btn-confirm").on("click" , function(req , res){
                const ID_confirm = $(this).attr("id")
                localStorage.Confirm = ID_confirm
                window.location.replace("/confirmpage");
            });
        }

    })

    function cardConfirm(data) {
        var create_card = " "
        for (let i = 0; i < data.length; i++) {
            let cardConfirm = "<div class = 'card p-2 text-center'>";
            cardConfirm += `<img class = "card-img-top" src= "Upload/${data[i].FileImage}" width: 150px; height 150px;" >`
            cardConfirm += '<div class = "card-body">'
            cardConfirm += `<h4 class = "card-title"> ${data[i].Post_Title}</h4>`
            cardConfirm += `<p class = "card-body"> ${data[i].Post_Description}</p>`
            cardConfirm += "<input type = 'button' class = 'btn btn-warning btn-confirm' id ='" + [data[i].Post_ID] + "' value = 'See More'>"
            cardConfirm += '</div></div>'
            create_card += cardConfirm
        }
        return create_card;
    }



    // Post for wait to donate(Pagination Page)
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
