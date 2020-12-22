$(document).ready(function () {
    
    $.ajax({
        type: "POST",
        url: "/showdetail",
        data: {ID : localStorage.Confirm},
        success: function(data){
            console.log(localStorage.ID)
            $("#imgDonate").prop("src" , "Upload/" + data[0].FileImage)
            $("#Title").text(data[0].Post_Title);
            $("#Description").text(data[0].Post_Description);
            $("#Address").text(data[0].Address);
            $("#Amountmoney").text(data[0].AmountMoney);
            $("#BankAccount").text(data[0].BankAccount);
            $("#textThings").text(data[0].Things_Name);
            $("#AmountThings").text(data[0].Things_Number);
            $("#countConfirm").text(data[0].Count);
            $("#nameDonate").text(data[0].FirstName);
        },
        error: function(xhr){
            alert(xhr.responseText);
        }
    })

    // --------------- Confirm ----------------------
    $("#btnConfirm").on("click" , function(){
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure',
            text: "You won't to be able to revert this!!!",
            showCancelButton: true,
            confirmBouttonText: 'Yes, Confirm',
            cancelButtonText: 'No, Cancel',
        }).then((result)=>{
            if(result.isConfirmed){
                $.ajax({
                    type: "POST",
                    url: "/checkAuthen",
                    success: function(data){
                        if(data[0].Upload_Status == null || data[0].Upload_Status == 1){
                            Swal.fire({
                                icon: 'info',
                                title: 'Please Confirm Identity',
                                text: 'You have not verified your identity, Please verify your identity first',
                                showCancelButton: true,
                                confirmButtonText: 'OK' 
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.replace("/profile");
                                }
                            })
                        }
                        else{
                            $.ajax({
                                type: "POST",
                                url: "/confirm",
                                data:{ID: localStorage.Confirm},
                                success: function(response){
                                    
                                    alert("You confirm Success")
                                },
                                error:function(xhr){
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'You have Confirmed',
                                        cinfirmButtonText: 'OK'
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    })


    $("#btnsignOut").on("click" , function(){
        $.ajax({
            type: "GET",
            url: "/signout",
            success: function(data){
                window.location.replace(data)
            },
            fail: function(xhr){
                alert(xhr.responseText);
            }
        })
    })


    $("#btnHome").on("click" , function(){
        window.location.replace("/welcome")
    })


    // -------------------- Report Function -----------------------
    $("#btnReport").on("click", function(){
        $("#modalReport").modal("show");
        $("#sendReport").on("click" , function(){
            const Report = $("#areaReport").val();
            
            $.ajax({
                type : "POST",
                url: "/report",
                data: {ID: localStorage.Confirm , description: Report},
                success: function(response){
                    Swal.fire({
                        icon: 'question',
                        title: 'Are you sure ?',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel',
                        confirmBouttonText: 'Sure'
                    }).then((result)=>{
                        if(result.isConfirmed){
                            Swal.fire({
                                icon: 'success',
                                title: 'Report Success',
                                confirmBouttonText: 'OK'
                            }).then((result)=>{
                                if(result.isConfirmed){
                                    window.location.replace("/welcome");
                                }
                            })
                        }
                    })
                },
                error: function(xhr){
                    alert(xhr.responseText);
                }
            })
        })
    })
});


// $.ajax({
//     type: "POST",
//     url: "confirm",
//     data: {ID: localStorage.ID},
//     success: function(response){
//         Swa.fire({
//             icon: 'warning',
//             title: 'Are you sure',
//             text: "You won't to be able to revert this!!",
//             showCancelButton: true,
//             confirmButtonText: 'Yes, Confirm',
//             cancelButtonText: 'No, Cancel',
//             reverseButtons: true,
//         }).then((result) =>{
//             if(result.isConfirmed){
                
//             }
//         })
//     },
//     error: function(xhr){
//         alert(xhr.responseText);
//     }
// })