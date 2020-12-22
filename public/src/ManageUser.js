

$(document).ready(function () {

    // Change Page to Manage Post
    $("#btnManagePost").on("click" , function(){
        window.location.replace("/managepostPage")
    })

    // Show Count Manage Post
    $.ajax({
        type: "GET",
        url: "/countReport",
        success: function(data){
            $("#manageCount").text(data[0].COUNTREPORT)
            $("#reportCount").text(data[0].COUNTREPORT)
        }
    }) 

    var table = $("#Mydatatable").DataTable({
        ajax: {
            url: "/manageuser",
            dataSrc: function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].role == 1) {
                        data[i].role = "ADMIN"
                    }
                    else {
                        data[i].role = "USER"
                    }
                }
                return data;
            }
        },
        columns: [
            { data: "User_ID", title: "USER_ID" },
            { data: "Username", title: "USERNAME" },
            { data: "FirstName", title: "NAME" },
            { title: "MANAGE", defaultContent: "<input type = 'button' class = 'btn btn-danger btn-ban' value='BAN' style = 'width: 30%' >" }
        ]
    })

    // ------------------------ Show User has Ban --------------------------------
    $("#btnBan").on("click", function () {
        table.clear();
        $("#Mydatatable").dataTable().fnDestroy();
        $("#Mydatatable").empty();
        table = $("#Mydatatable").DataTable({
            ajax: {
                url: "/Showuserban",
                dataSrc: function (data) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].role == 1) {
                            data[i].role = "ADMIN"
                        }
                        else {
                            data[i].role = "USER"
                        }
                    }
                    return data;
                }
            },
            columns: [
                { data: "User_ID", title: "USER_ID" },
                { data: "Username", title: "USERNAME" },
                { data: "FirstName", title: "NAME" },
                { title: "MANAGE", defaultContent: "<input type = 'button' class = 'btn btn-warning btn-un' value='UNBAN' style = 'width: 30%' >" }
            ]
        });
    })

    // ----------------------- Show All User --------------------------------

    $("#btnAll").on("click", function () {
        table.clear();
        $("#Mydatatable").dataTable().fnDestroy();
        $("#Mydatatable").empty();
        table = $("#Mydatatable").DataTable({
            ajax: {
                url: "/manageuser",
                dataSrc: function (data) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].role == 1) {
                            data[i].role = "ADMIN"
                        }
                        else {
                            data[i].role = "USER"
                        }
                    }
                    return data;
                }
            },
            columns: [
                { data: "User_ID", title: "USER_ID" },
                { data: "Username", title: "USERNAME" },
                { data: "FirstName", title: "NAME" },
                { title: "MANAGE", defaultContent: "<input type = 'button' class = 'btn btn-danger btn-band' value='BAN' style = 'width: 30%' >" }
            ]
        })
    })

    // ----------------------- BAN USER ------------------------------------
    $("#Mydatatable tbody").on("click", ".btn-ban", function () {
        const currentRow = $(this).parents("tr");
        const data = table.row(currentRow).data();
        Swal.fire({
            icon: 'info',
            title: "Ban " + data.Username + "?",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        }).then(function (result) {
            if (result.isConfirmed) {
                banUser(data.User_ID, currentRow)
            }
        })
    })

    // ----------------------- UNBLOCK USER -------------------------------

    $("#Mydatatable tbody").on("click" , ".btn-band" , function(){
        console.log("Hii")
    })

    // --------------------- FUNCTION BAN --------------------------------
    function banUser(User_ID, CurrentRow) {

        $.ajax({
            type: "POST",
            url: "/banUser/" + User_ID,
        }).done(function (data, state, xhr) {
            Swal.fire(data);
            table.row(currentRow).remove().draw(false);
        }).fail(function (xhr, state) {
            Swal.fire(xhr.responseText);
        })
    }

    // ------------------ Sign Out ----------------------------
    $("#btn-signout").on("click", function () {
        window.location.replace("/");
    })

    $("#btnHome").on("click", function () {

        window.location.replace("/Admin")

    })

});
