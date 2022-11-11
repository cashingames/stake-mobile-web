import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AppButton from "../../../components/AppButton/AppButton";
import AuthBanner from "../../../components/AuthBanner/AuthBanner";
import AuthTitle from "../../../components/AuthTitle/AuthTitle";
import GoogleSignUp from "../../../components/GoogleSignUp/GoogleSignUp";
import Input from "../../../components/Input/Input";
import styles from './SignUpProfile.module.scss'

const SignUpProfile: React.FC = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        clearErrors
    } = useForm();

    const [canSend, setCanSend] = useState(true)



    return (
        <div className={styles.signupContainer}>
            <AuthBanner />
            <AuthTitle titleText="Let's get to know you" />
            <div className={styles.socialLinkContainer}>
                <p className={styles.socialLinkText}>Input your details below</p>
            </div>
            <form>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>First Name</label>
                        <input
                            {...register("first_name", { required: true })}
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            className={styles.inputBox}
                        />
                        <span className={styles.errorLabel}>
                            {errors.first_name &&
                                errors.first_name.type === "required" &&
                                " *required"}
                        </span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Last Name</label>
                        <input
                            {...register("last_name", { required: true })}
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            className={styles.inputBox}
                        />
                        <span className={styles.errorLabel}>
                            {errors.last_name &&
                                errors.last_name.type === "required" &&
                                " *required"}
                        </span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Username</label>
                        <input
                            {...register("username", { required: true })}
                            type="text"
                            name="username"
                            placeholder="Username"
                            className={styles.inputBox}
                        />
                        <span className={styles.errorLabel}>
                            {" "}
                            {errors.username &&
                                errors.username.type === "required" &&
                                " *required"}
                        </span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Referral Code</label>
                        <input
                            {...register("referrer", { required: false })}
                            type="text"
                            name="referrer"
                            placeholder="Referral Code (optional)"
                            className={styles.inputBox}
                        />
                    </div>
                </div>
                <div className={styles.appButtonContainer}>
                    {/* <AppButton disabled={!canSend} buttonText="Continue"  /> */}
                    <button className={styles.buttonContainer}
                        type="submit" disabled={!canSend}>
                        <span className={styles.buttonText}>Create Account</span>
                    </button>
                </div>
            </form>
        </div>
    )
}
export default SignUpProfile;