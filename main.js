var OneWebsite;
var arr = [];

if (localStorage.getItem("website") != null) {
    arr = JSON.parse(localStorage.getItem("website"));
    displayWebsites(); 
}

function test() {

    var siteName = document.getElementById("siteName-id").value;
    var siteUrl = document.getElementById("siteUrl-id").value;
    if (!siteName || !siteUrl) {
        Swal.fire({
            title: `
            Your Site Name or Url is not valid, Please follow the rules below :
Site name must contain at least 3 characters
Site URL must be a valid one
            `,
            showClass: {
                popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                `
            },
            hideClass: {
                popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                `
            }
        });
        return; 
    }

    OneWebsite = {
        name: siteName,
        url: siteUrl
    };

    arr.push(OneWebsite);

    // Update localStorage with the new data
    localStorage.setItem("website", JSON.stringify(arr));
    displayWebsites(); 
    clearInputs();
}


function displayWebsites() {
    var content = "";
    for (var i = 0; i < arr.length; i++) {
        content += `
            <tr>
                <td>${arr[i].name}</td>
                <td>${arr[i].url}</td>
                <td><button class="btn bg-success" onclick="windowOpen('${arr[i].url}', '_blank');"><i class="bi bi-eye-fill me-1"></i>Visit</button></td>
                <td><button onclick="DeleteSite(${i})" class="btn bg-danger"><i class="bi bi-trash3 me-1"></i>Delete</button></td>
            </tr>
        `;
    }
    document.getElementById("tableContent").innerHTML = content;
}

function clearInputs() {
    document.getElementById("siteName-id").value = "";
    document.getElementById("siteUrl-id").value = "";
}

function DeleteSite(index) {
    arr.splice(index, 1); 
    localStorage.setItem("website", JSON.stringify(arr));
    displayWebsites(); 
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Bookmark has been deleted",
        showConfirmButton: false,
        timer: 1500
    });
}


function windowOpen(url, target) {
    window.open(url, target);
}
