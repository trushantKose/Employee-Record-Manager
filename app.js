// Get references to all necessary DOM elements
var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    post = document.getElementById("post"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")

// Load data from localStorage if available, otherwise use empty array
let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

// Flags for edit mode
let isEdit = false, editId

// Initially display existing user data
showInfo()

// On clicking "New User", reset the form and setup for new entry
newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "./image/Profile Icon.webp"
    form.reset()
})

// Handle image input preview and size check (limit: 1MB)
file.onchange = function(){
    if(file.files[0].size < 1000000){
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}

// Display user information as table rows
function showInfo(){
    // Clear existing table rows
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())

    // Loop through each user and display in table
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>

            <td>
                <!-- Read (View) button -->
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <!-- Edit button -->
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <!-- Delete button -->
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo() // Call to display existing data initially

// Show full user details in modal for viewing only
function readInfo(pic, name, age, city, email, phone, post, sDate){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showName').value = name,
    document.querySelector("#showAge").value = age,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showPhone").value = phone,
    document.querySelector("#showPost").value = post,
    document.querySelector("#showsDate").value = sDate
}

// Fill form with existing data for editing
function editInfo(index, pic, name, Age, City, Email, Phone, Post, Sdate){
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    age.value = Age
    city.value = City
    email.value = Email,
    phone.value = Phone,
    post.value = Post,
    sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}

// Delete selected user info
function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1) // remove item
        localStorage.setItem("userProfile", JSON.stringify(getData)) // update localStorage
        showInfo() // re-render table
    }
}

// Handle form submission (create or update)
form.addEventListener('submit', (e)=> {
    e.preventDefault() // Prevent page reload

    // Create user info object
    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeePost: post.value,
        startDate: sDate.value
    }

    // Check if editing or adding new
    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(getData))

    // Reset form and UI
    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"
    showInfo()
    form.reset()
    imgInput.src = "./image/Profile Icon.webp"

    // Optional: Close modal manually if not using Bootstrap auto-close
    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})
