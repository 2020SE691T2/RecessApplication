function doRefreshToken(fetchResults) {
    if ("code" in fetchResults && fetchResults.code === "token_not_valid") {
        var url = "https://recess-api.herokuapp.com/api/token/refresh/";
        fetch(url, {
            method: "POST",
            headers: new Headers({
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
            }),
            body: ({
                'refresh': sessionStorage.getItem("refreshToken")
            })
        })
            .then((resp) => resp.json())
            .then((results) => {
                if ("access" in results) {
                    sessionStorage.setItem("accessToken", results.access);
                    return true;
                }
                else {
                    window.location.replace("/login");
                    return false;
                }
            });
    }
    return true;
}

export default doRefreshToken;