import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

function StoreSessionKeys(parent, results, errorMessage, redirectPage) {
    if ("tokens" in results) {
        sessionStorage.setItem("refreshToken", results.tokens.refresh);
        sessionStorage.setItem("accessToken", results.tokens.access);
        if (results.user.role) {
            sessionStorage.setItem("role", results.user.role);
        }
        if (results.user.email_address) {
            sessionStorage.setItem("email", results.user.email_address);
            parent.props.history.push({
                pathname: redirectPage,
                state: { email: results.user.email_address }
            })
        }
    }
    else {
        toastr.error('Error', errorMessage)
    }
}

export default StoreSessionKeys;