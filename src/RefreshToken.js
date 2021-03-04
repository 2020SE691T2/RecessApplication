import Environment from "./Components/Environment";

function RefreshToken(fetchResults) {
    var env = new Environment();
    if ("code" in fetchResults && fetchResults.code === "token_not_valid") {
        var url = env.getRootUrl() + "/api/token/refresh/";
        fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
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
                    window.location.replace("/logout");
                    return false;
                }
            });
    }
    return true;
}

export default RefreshToken;