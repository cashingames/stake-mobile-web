import React from "react";
import AuthTitle from "../../../components/AuthTitle/AuthTitle";

const SignUp:React.FC = () => {
return (
    <div>
        <AuthTitle titleText = "Create Account" />
    <div>
        <div>
            <label>Email</label>
            <input type="text" />
        </div>
        <div>
            <label>Password</label>
            <input type="text" />
        </div>
    </div>
    </div>
)
}
export default SignUp