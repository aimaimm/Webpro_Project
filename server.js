const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const app = express();

//MYSQL
const mysql = require("mysql");
const config = require("./config/dbconfig.js");
const { join } = require("path");
const con = mysql.createConnection(config);


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser("myVerySecretKey"));

//Uploading
const upload = require("./config/Uploadconfig.js");
const UploadProfile = require("./config/UploadProfileconfig.js")
const { get } = require("http");
const { resourceLimits } = require("worker_threads");
const { signedCookie, signedCookies } = require("cookie-parser");
const { send } = require("process");



// -------------------------------------- PAGE ROUTE -------------------------------------------------
//------------------Root Service-------------------------
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/INDEX.html"));
});

//----------------Go to Welcome Page ----------------------
app.get("/welcome", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/welcome.html"));
})


//-----------------Sign Out Servie -------------------------------
app.get("/signout", function (req, res) {
    res.clearCookie("User_ID");
    res.send("/");
})


//------------------Change Page to Register Service---------------------------------
app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/Register.html"))
});


// ------------Go to POST Page ---------------------
app.get("/postPage", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/post.html"));

})


// ------------ History Page ------------------------
app.get("/history" , function(req , res){
    res.sendFile(path.join(__dirname , "./view/History.html"))
})


// ------------------- Waitconfirm Page --------------------
app.get("/waitconfirm", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/Waitconfirm.html"))
})

// ------------------------ Go to Confirm Page Service -------------------------------
app.get("/confirmpage", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/Confirm.html"));
})


// ---------------------------- Go to  User Post Page -------------------------------
app.get("/userpost", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/Userpost.html"))
})


// -------------------------------------- Go to Profile Page --------------------------------------------
app.get("/profile", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/profile.html"))
})


// -------------------- About Us --------------------------
app.get("/AboutUs", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/AboutUs.html"))
})


//------------------Admin Service -----------------------
app.get("/Admin", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/ADMIN.html"));
})


//--------------- Go to Manage User Page--------------------------
app.get("/manageuserPage", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/ManageUser.html"));
})


//---------------- Go to Manage Post Page --------------------
app.get("/managepostPage" , function(req , res){
    res.sendFile(path.join(__dirname , "./view/Managepost.html"))
}) 


// --------------Go to Mock Up Manage Post Page ------------------------
app.get("/MockupmanagepostPage", function (req, res) {
    res.sendFile(path.join(__dirname, "./view/MockUpManagePost.html"));
})

// ----------------- Show Close Post -----------------------------
app.get("/closePosted" , function(req , res){
    res.sendFile(path.join(__dirname , "./view/closePost.html"))
})

// ----------------- Check Authenticate ------------------------
app.get("/Autehnticatecheck" , function(req , res){
    res.sendFile(path.join(__dirname , "./view/checkAuthen.html"))
})


// ------------------------------------------------- SERVICE --------------------------------------------------
//------------------Signin Service-------------------------
app.post("/signin", function (req, res) {
    const Username = req.body.Username;
    const Password = req.body.Password;

    const sql = "SELECT User_ID , Password , User_Role, Status_User FROM users WHERE Username = ?"
    con.query(sql, [Username], function (err, result, fields) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Query Error");
        }
        else {
            if (result.length != 1) {
                console.log("Not find Username or Password")
                res.status(400).send("Not found Username or Password");
            }
            else {
                bcrypt.compare(Password, result[0].Password, function (err, same) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Server Error");
                    }

                    else if (same) {
                        res.cookie("User_ID", result[0].User_ID, { httpOnly: true, signed: true });
                        // console.log(result[0].User_ID);
                        if (result[0].User_Role != 1) {
                            if (result[0].Status_User == 1) {
                                res.send("/welcome")
                            }
                            else if (result[0].Status_User == 2) {
                                res.status(400).send("Your account has benn Banned !!")
                            }
                            else {
                                res.send("/welcome");
                            }
                        }
                        else {
                            res.send("/Admin");
                        }
                    }
                });
            }
        }
    });

});


// ------------------ Regiser User to System ------------------------------------
app.post("/signupuser", function (req, res) {
    const Username = req.body.Username;
    const Password = req.body.Password;
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname;
    const PhoneNumber = req.body.PhoneNumber;
    const Address = req.body.Address;

    bcrypt.hash(Password, 10, function (err, hash) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Hasing Error");
            return;
        }
        else {
            const sql = "INSERT INTO users(Username , Password , Firstname , Lastname , Address , PhoneNumber , Status_User , User_Role) VALUES (?, ?, ?, ?, ?, ?, 1 , 2 )"
            con.query(sql, [Username, hash, Firstname, Lastname, Address, PhoneNumber], function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send("Add Error");
                }
                else {
                    if (result.affectedRows != 1) {
                        console.log(err);
                        res.status(500).send("Database Error")
                    }
                    else {
                        res.send("Register Complete");
                    }
                }
            });
        }
    });
});


// ------------------------ Post Service ------------------------------------------
app.post("/post", function (req, res) {

    upload(req, res, function (err) {
        // Check Upload 
        if (err) {
            console.log(err)
            res.status(500).send("Database Error")
        }
        else {
            const filename = req.file.filename;
            const title = req.body.Title
            const description = req.body.Description
            const date = new Date();
            const Things_Name = req.body.Thingslist
            const Things_Number = req.body.Thingsnumber
            const Amountmoney = req.body.Amountmoney
            const Bankaccount = req.body.Bankaccount
            const ID = req.signedCookies["User_ID"];


            //StatusPost 1 = Wait Confirm,   2 = Showing,   3 = hiding
            const sql = "INSERT INTO post(Post_Title , Post_Description , Post_Status , Post_Date , FileImage , AmountMoney , BankAccount , Count ,User_ID_Post) VALUES  (? , ? , 1 , ? , ? , ? , ? , 0 , ? )"
            con.query(sql, [title, description, date, filename, Amountmoney, Bankaccount, ID], function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send("Database Error")
                }
                else {
                    const sql = "SELECT Post_ID FROM post WHERE User_ID_Post = ? "
                    con.query(sql, [ID], function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Database post Error")
                        }
                        else {
                            const sql = "INSERT INTO require_things(Things_Name , Things_Number , Post_ID) VALUES (? , ? , ?)"
                            con.query(sql, [Things_Name, Things_Number, result[0].Post_ID], function () {
                                if (err) {
                                    console.log(err)
                                    res.status(500).send("Can't Get Post_ID")
                                }
                                else {
                                    res.send("Post_Done !!!");
                                }
                            })
                        }
                    })
                }
            })

        }
    })
})



// ----------------------------- Detail Post(Show When Post Success) ----------------------------------
app.get("/detailPost", function (req, res) {
    const User_ID = req.signedCookies["User_ID"];

    const sql = "SELECT post.Post_Title , post.Post_Description , post.FileImage , post.AmountMoney , post.BankAccount , require_things.Things_Name , require_things.Things_Number , users.Address FROM post JOIN require_things , users WHERE post.Post_ID = require_things.Post_ID AND users.User_ID = post.User_ID_Post AND post.User_ID_Post = ?";
    con.query(sql, [User_ID], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database server Error");

        }
        res.json(result)
    })
});


// ---------------------------- Show Detail Post in Confirm Page(Show When another user come to confirm Post) ------------------------------------
app.post("/showdetail", function (req, res) {
    const Post_ID = req.body.ID
    const sql = "SELECT post.Post_Title , post.Post_Description , post.FileImage , post.AmountMoney , post.BankAccount , post.Count , require_things.Things_Name , require_things.Things_Number , users.FirstName ,users.Address  FROM post JOIN require_things , users WHERE post.Post_ID = require_things.Post_ID AND post.User_ID_Post = users.User_ID AND  post.Post_ID = ?";

    con.query(sql, [Post_ID], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database Error")
        }
        res.json(result);
    })
})


// ---------------------- Confirm Service Post ----------------------------------
app.post("/confirm", function (req, res) {
    const User_ID = req.signedCookies["User_ID"]
    const Post_ID = req.body.ID
    
    const sql = "UPDATE post SET Count = Count + 1 WHERE Post_ID = ?"
    con.query(sql, [Post_ID], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error");
        }
        else {
            const sql = "INSERT INTO confirm(User_ID_Confirm , Post_ID) VALUES (? , ?)"
            con.query(sql, [User_ID, Post_ID], function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send("Server Error!!")
                }
                else {
                    const sql = "SELECT Count FROM post WHERE Post_ID = ?"
                    con.query(sql, [Post_ID], function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Database Server has Error")
                        }
                        else {
                            if (result[0].Count == 5) {
                                const sql = "UPDATE post SET Post_Status = 2 WHERE Post_ID = ?"
                                con.query(sql, [Post_ID], function (err) {
                                    if (err) {
                                        console.log(err);
                                        res.status(500).send("Error")
                                    }
                                    else {
                                        res.send("Success");
                                    }
                                })
                            }
                        }
                    })

                }
            })
        }
    })
})


// --------------------- Show Post in Welcome Page --------------------------
app.get("/showPost", function (req, res) {
    const sql = "SELECT Post_ID , Post_Title , Post_Description , FileImage FROM post WHERE Post_Status = 2";
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        res.json(result)
    })
})

// ---------------------- Show Things ----------------------
app.post("/showThings", function (req, res) {
    const ID_Post = req.body.ID

    const sql = "SELECT Things_Name FROM require_things WHERE Post_ID = ?"
    con.query(sql, [ID_Post], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send("Database Server Error")
        }
        res.json(result);
    })

})

// --------------------- Get data to show in Card ---------------------------
app.get("/detailCard", function (req, res) {
    const sql = "SELECT Post_ID , Post_Title , Post_Description , FileImage FROM post WHERE Post_Status = 1"
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send("Database Error")
        }
        res.json(result)
    })
})


// --------------------- Donate Service ----------------------------
app.post("/donate", function (req, res) {
    const User_ID = req.signedCookies["User_ID"]
    const Post_ID = req.body.ID;
    const Recieve_Date = new Date();
    const Thing_Num = req.body.Thingname;
    const Amount_Mon = req.body.Amountmoney;

    const sql = "SELECT Things_Name FROM require_things WHERE Post_ID = ?"
    con.query(sql, [Post_ID], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send("Database Server Error")
        }
        else {

            const sql = "INSERT INTO donation(Post_ID , User_ID_Donate , Things_Name , Recieve_Date , Things_Number_Donate , Amount_Money_Donate) VALUES (? ,? , ? , ? , ? , ?)"
            con.query(sql, [Post_ID, User_ID, result[0].Things_Name, Recieve_Date, Thing_Num, Amount_Mon], function (err) {
                if (err) {
                    console.log(err)
                    res.status(500).send("Server Error")
                }
                else {
                    res.send("Donate Complete");
                    const sql = "SELECT post.AmountMoney , require_things.Things_Number , donation.Amount_Money_Donate , donation.Things_Number_Donate FROM post JOIN require_things , donation WHERE post.Post_ID = require_things.Post_ID AND require_things.Post_ID = donation.Post_ID AND post.Post_ID = ?"
                    con.query(sql, [Post_ID], function (err, result) {
                        if (err) {
                            console.log(err)
                            res.status(500).send("Server Error")
                        }
                        else {
                            if (result[0].AmountMoney == result[0].Amount_Money_Donate && result[0].Things_Number == result[0].Things_Number_Donate) {
                                const sql = "UPDATE post SET Post_Status = 3 WHERE Post_ID = ?"
                                con.query(sql, [Post_ID], function (err) {
                                    if (err) {
                                        console.log(err)
                                        res.status(500).send("Database Server")
                                    }
                                    else {
                                        console.log("Complete")
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    })
})

// -------------------------- Show Donation Number --------------------------
app.post("/recieve", function (req, res) {
    const Post_id = req.body.ID;

    const sql = "SELECT Things_Number_Donate , Amount_Money_Donate FROM donation WHERE Post_ID = ?"
    con.query(sql, [Post_id], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        res.json(result)
    })
})


// -------------------------- Report Post Service ---------------------------
app.post("/report" , function( req ,res){
    const id_post = req.body.ID;
    const id_user = req.signedCookies["User_ID"]
    const Description = req.body.description

    const sql = "INSERT INTO report(Report_Description , User_ID_Report , Post_ID) VALUES (? , ? , ?)"
    con.query(sql , [Description , id_user , id_post] , function(err){
        if(err){
            console.log(err)
            res.status(500).send("Database Server Error")
        }
        else{
            const sql = "UPDATE post SET Post_Status = 4 WHERE Post_ID = ?"
            con.query(sql , [id_post] , function(err , result){
                if(err){
                    console.log(err)
                    res.status(500).send("Server Error Cannot Change Status Post")
                }
                else{
                    res.send("Report Success")
                }
            })
        }
    })
})

// ---------------------------------- PROFILE PART -------------------------------------------


// ------------------- Details User ----------------------
app.post("/detailUser", function (req, res) {
    const ID_User = req.signedCookies["User_ID"];

    const sql = "SELECT FirstName , Username , Address , PhoneNumber , EvidenceFile , Upload_Status FROM users WHERE User_ID = ?";
    con.query(sql, [ID_User], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        res.json(result)
    });
})


// --------------------- Authentication -------------------------
app.post("/authenticate", function (req, res) {
    UploadProfile(req, res, function (err) {
        if (err) {
            console.log(err)
            res.status(500).send("Server Upload Error")
        }
        else {

            const Filename = req.file.filename;
            const user_ID = req.signedCookies["User_ID"];

            const sql = "UPDATE users SET EvidenceFile = ? WHERE User_ID = ?"
            console.log(Filename, user_ID)
            con.query(sql, [Filename, user_ID], function (err, result) {
                if (err) {
                    console.log("err")
                    res.status(500).send("Database Server Error")
                }
                else {
                    const sql = "UPDATE users SET Upload_Status = 1 WHERE User_ID = ?"
                    con.query(sql , [user_ID] , function(err){
                        if(err){
                            console.log(err)
                            res.status(500).send("Server Error")
                        }
                        else{
                            res.send("Authenticate Done");
                        }
                    })
                }
            })
        }
    })
})


// -------------------------------- Edit Profile ---------------------------------------
app.post("/editProfile", function (req, res) {

    const User_ID = req.signedCookies["User_ID"]
    const Name = req.body.Name
    const Password = req.body.Password
    const Address = req.body.Address
    const Phonenumber = req.body.Phonenumber

    //console.log(User_ID, Name , Password)
    bcrypt.hash(Password, 10, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(500).send("Hashing Error")
        }
        else {
            const sql = ("UPDATE users SET FirstName = ? , Password = ? , Address = ? , PhoneNumber = ? WHERE User_ID = ?")
            con.query(sql, [Name, hash, Address, Phonenumber, User_ID], function (err, rusult) {
                if (err) {
                    console.log(err)
                    res.status.send("Database Error")
                }
                else {
                    res.send("Complete")
                }
            })
        }
    })


})


// Check Evidence
app.get("/checkEvidence", function (req, res) {
    const User_ID = req.signedCookies["User_ID"]

    const sql = "SELECT EvidenceFile FROM users WHERE User_ID = ?"
    con.query(sql, [User_ID], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send("Database Server Error")
        }
        else {
            res.json(result)
        }
    })
})


// -------------------- Check Authenticate ---------------------------
app.post("/checkAuthen" , function(req , res){
    const user_ID = req.signedCookies["User_ID"]

    const sql = "SELECT Upload_Status FROM users WHERE User_ID = ?"
    con.query(sql , [user_ID] , function(err , result){
        if(err){
            console.log(err)
            res.status(500).send("Database Server Error")
        }
        res.json(result);
    })
})

// -------------------------------------------------------------------PART ADMIN -----------------------------------------------------

//---------------Manage user ---------------------------
app.get("/manageuser", function (req, res) {

    const sql = "SELECT User_ID , Username , FirstName FROM users WHERE User_ROle = 2 AND Status_User = 1"
    con.query(sql, function (err, result) {
        if (err) {
            res.status(500).send("Database Server Error")
        }
        else {
            res.json(result);
        }
    })
})

// ---------------- Show Ban User --------------------------
app.get("/Showuserban", function (req, res) {

    const sql = "SELECT User_ID , Username , FirstName FROM users WHERE User_Role = 2 AND Status_User = 2"
    con.query(sql, function (err, result) {
        if (err) {
            res.status(500).send("Database Server Error")
        }
        else {
            res.json(result)
        }
    })
})

// -------------------------- Ban User -----------------------------
app.post("/banUser/:User_ID", function (req, res) {
    const User_id = req.params.User_ID;

    const sql = "UPDATE users SET Status_User = 2 WHERE User_ID = ?"
    con.query(sql, [User_id], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send("Database Error")
        }
        else {
            if (result.affectedRows == 1) {
                res.send("Ban Done")
            }
            else {
                res.status(500).send("Delete Error")
            }
        }
    })
})

// --------------------- Unblock User ---------------------------
app.post("/unblock/:User_ID", function (req, res) {
    const User_ID = req.params.User_ID;

    const sql = "UPDATE users SET Status_User = 1 WHERE User_ID = ?"
    con.query(sql, [User_ID], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send("Database Error")
        }
        else {
            if (result.affectedRows == 1) {
                res.send("Unblock Done")
            }
            else {
                res.status(500).send("Unblock Error")
            }
        }
    })
})


app.get("/managepost", function (req, res) {

})

// -------------------- Show All Post ------------------
app.get("/allPost", function (req, res) {
    const sql = "SELECT Post_ID , Post_Title , Post_Description , FileImage FROM post";
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        res.json(result)
    })
})

// ----------------- Show Close Post ------------------------
app.get("/closePost" , function(req , res){
    const sql = "SELECT Post_ID , Post_Title , Post_Description , FileImage FROM post WHERE Post_Status = 3";
    con.query(sql , function(err , result){
        if(err){
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        res.json(result)
    })
})


// --------------- Show Report Post ----------------------
app.get("/reportPost" , function(req , res){
    const sql = "SELECT Post_ID , Post_Title , Post_Description , FileImage FROM post WHERE Post_Status = 4;"
    con.query(sql , function(err ,result){
        if(err){
            console.log(err);
            res.status(500).send("Database Server has Error")
        }
        res.json(result)
    })
})


// ------------------------- Show Count All Post -------------------------
app.get("/countAll" , function(req ,res){
    const sql = "SELECT COUNT(Post_ID) 'COUNTALL' FROM post"
    con.query(sql , function (err , result) { 
        if(err){
            console.log(err)
            res.status(500).send("Serevr Error")
        }
        res.json(result)
     })
})


// ---------------------- Show Count Active Post ------------------------
app.get("/countActive" , function(req , res){
    const sql = "SELECT COUNT(Post_ID) 'COUNTACTIVE' FROM post WHERE Post_Status = 2"
    con.query(sql , function(err ,result){
        if(err){
            console.log(err)
            res.status(500).send("Server Database Error");
        }
        res.json(result)
    })
})
  

// ------------------------- Show Count Wait Confirm ----------------------------
app.get("/countWait", function (req, res) {

    const sql = "SELECT COUNT(Post_ID) 'COUNT' FROM post WHERE Post_Status = 1"

    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send("Database Error Can't get Count ")
        }
        res.json(result);
    })
})


// ---------------------- Show Count Close Post --------------------
app.get("/countClose" , function(req , res){
    const sql = "SELECT COUNT(Post_ID) 'COUNTCLOSE' FROM post WHERE Post_Status = 3"
    con.query(sql , function(err , result){
        if(err){
            console.log(err)
            res.status(500).send("Database Server Error Cannot Count")
        }
        res.json(result);
    })
})


// ------------------ Show Count Report Post ----------------------
app.get("/countReport" , function(req , res){
    const sql = "SELECT COUNT(Post_ID) 'COUNTREPORT' FROM post WHERE Post_Status = 4"
    con.query(sql , function(err ,result){
        if(err){
            console.log(err)
            res.status(500).send("Database Serevr Error")
        }
        res.json(result)
    })
})


// ---------------- Get Authenticate User ----------------------
app.get("/getAuthen" , function(req, res){
    const sql = "SELECT User_ID , FirstName , EvidenceFile FROM users WHERE Upload_Status = 1"
    con.query(sql , function(err , result){
        if(err){
            console.log(err)
            res.status(500).send("Database Error")
        }
        res.json(result)
    })
})

// -------------- Get Data User ---------------------
app.post("/getdataUser" , function(req , res){
    const user_ID = req.body.User

    const sql = "SELECT FirstName , Username , Address , PhoneNumber , EvidenceFile , Upload_Status FROM users WHERE User_ID = ?";
    con.query(sql , [user_ID] , function(err , result){
        if(err){
            console.log(err)
            res.status(500).send("Server Error")
        }
        res.json(result)
    })
})

// -------------------- Confirm Authenticate --------------------
app.post("/confirmAuthen" , function(req , res){
    const user_id = req.body.User

    const sql = "UPDATE users SET Upload_Status = 2 WHERE User_ID = ?"
    con.query(sql , [user_id] , function(err){
        if(err){
            console.log(err)
            res.status(500).send("Database Error")
        }
        else{
            res.send("Authenticate Confirm")
        }
    })
})

// --------------------- Count User ---------------------------
app.get("/countUser" , function(req , res){
    const sql = "SELECT COUNT(User_ID) 'COUNTUSER' FROM users WHERE Upload_Status = 1"
    con.query(sql , function(err , result){
        if(err){
            console.log(err)
            res.status(500).send("Server Error")
        }
        res.json(result)
    })
})



//Create hash password
app.get("/Password/:pass", function (req, res) {
    const Password = req.params.pass;
    const saltRound = 10;
    bcrypt.hash(Password, saltRound, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(500).send("Can't Create hash password !!")
        }
        else {
            res.send(hash);
        }
    })
})



// ----------------- PORT SERVER RUN -----------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is run at PORT " + PORT);
})