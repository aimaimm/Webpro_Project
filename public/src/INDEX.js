
function template(data) {
    let donateAll = "";
    for (let i = 0; i < data.length; i++) {
        let donateCard = "<div class = 'card p-2 text-center'>";
        donateCard += `<img class = "card-img-top" src= "Upload/${data[i].FileImage}" width: 200px; height 200px;" >`
        donateCard += '<div class = "card-body">'
        donateCard += `<h4 class = "card-title"> ${data[i].Post_Title}</h4>`
        donateCard += `<p class = "card-body"> ${data[i].Post_Description}</p>`
        donateCard += '<input type = "button" class = "btn btn-warning btn-detail" value = "See More">'
        donateCard += '</div></div>'
        donateAll += donateCard
    }
    return donateAll;

}

$(document).ready(function () {

    //Login and Register function
    $("#btn-Login").on("click", function () {
        $("#darkModalForm").modal("show");

        //Go to Register Page
        $("#btnRegister").on("click", function () {
            window.location.replace("/register");
        })

        //Login to System
        $("#btnSignIn").on("click", function () {
            const Username = $("#txtUsername").val();
            const Password = $("#txtPassword").val();

            //Link to Back end
            $.ajax({
                type: "POST",
                url: "/signin",
                data: { Username: Username, Password: Password },
            }).done(function (data, state, xhr) {
                window.location.replace(data)
            }).fail(function (xhr, state) {
                Swal.fire({
                    icon: 'error',
                    title: xhr.responseText
                })
            })

        })
    })
    // If User don't Login User can't go to another Page
    $("#btnPost").on("click", function () {
        Swal.fire({
            icon: 'info',
            title: 'Please Login to the system before using the service'
        })
    })

    $("#btnBox").on("click", function () {
        Swal.fire({
            icon: 'info',
            title: 'Please Login to the system before using the service'
        })
    })

    $("#btnBell").on("click", function () {
        Swal.fire({
            icon: 'info',
            title: 'Please Login to the system before using the service'
        })
    })

    $("#btnUs").on("click" , function(){
        window.location.replace("/AboutUs")
    })


    //Create Pagination Page
    $("#pg").pagination({
        dataSource: function(done){
            $.ajax({
                type: "GET",
                url: "/showPost",
                success: function (response){
                    done(response)
                }
            });
        },
        pageSize: 6,
        className: 'paginationjs-theme-blue pagination-big',
        callback: function (data , pagination){
            const myHtml = template(data);
            $("#dataDonate").html(myHtml)
            $(".btn-detail").on("click" , function(){
                window.location.replace("/userpost")
            })
        }

    });
});



