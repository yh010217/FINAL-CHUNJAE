async function errorstatus(errorId) {
    await fetch('/errorstatus/' + errorId, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }).then(response => {
        if (!response.ok)
            throw new Error();
        else
            return response.text();
    }).then(data => {
        alert(data);
        location.href = "/admin/error";
    }).catch(error => {
        console.log(error);
    });
}