import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AppButton from "../../../components/AppButton/AppButton";
import AuthBanner from "../../../components/AuthBanner/AuthBanner";
import AuthTitle from "../../../components/AuthTitle/AuthTitle";
import GoogleSignUp from "../../../components/GoogleSignUp/GoogleSignUp";
import styles from './SignUp.module.scss'

const SignUp: React.FC = () => {
    console.log(process.env.NEXT_PUBLIC_API_URL, 'hhhhhhhh')
    console.log( 'weeee')
    const {
        register,
        formState: { errors },
        handleSubmit,
        clearErrors
    } = useForm();

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [canSend, setCanSend] = useState(true)
    const [passFailed, setPassFailed] = useState(false);
    const [emailFailed, setEmailFailed] = useState(false);
    const [phoneFailed, setPhoneFailed] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [confirmPasswordFailed, setConfirmPasswordFailed] = useState(false);
    const [checked, setChecked] = useState(false);

    const onChangeEmail = (event: any) => {
        const email = event.currentTarget.value;
        // eslint-disable-next-line
        const filter =
            /^([a-zA-Z0-9_/\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; /* eslint-disable-line */
        if (!filter.test(email)) {
            setEmailError("Email address is not valid.");
            setEmailFailed(true)
        } else {
            setEmailError("");
            setEmailFailed(false)
        }
    };

    const onChangePhone = (event: any) => {
        const phone = event.currentTarget.value;
        if (phone.length > 16 || phone.length < 4) {
            setPhoneError("Please input a valid phone number.");
            setPhoneFailed(true)
        }
        else {
            setPhoneError("");
            setPhoneFailed(false)
        }
    };

    const onChangePassword = (event: any) => {
        const password = event.currentTarget.value;
        // eslint-disable-next-line
        const filter = /^.{8,}$/; /* eslint-disable-line */
        if (!filter.test(password)) {
            setPasswordError("Password must contain at least 8 characters");
            setPassFailed(true)
        } else {
            setPasswordError("");
            setPassFailed(false)
        }
    };


    const onChangePasswordConfirmation = (event: any) => {
        const conFirmpassword = event.currentTarget.value;
        // eslint-disable-next-line
        const filter = /^.{8,}$/; /* eslint-disable-line */
        if (!filter.test(conFirmpassword)) {
            setConfirmPasswordError("Password does not match");
            setConfirmPasswordFailed(true)
        } else {
            setConfirmPasswordError("");
            setConfirmPasswordFailed(false)
        }
    };

    useEffect(() => {
        const invalid = passFailed || emailFailed || phoneFailed || confirmPasswordFailed;
        setCanSend(!invalid);
    }, [passFailed, emailFailed, phoneFailed])


    return (
        <div className={styles.signupContainer}>
            <AuthBanner />
            <AuthTitle titleText="Creat an account" />
            <div className={styles.socialLinkContainer}>
                <p className={styles.socialLinkText}>Use your social link</p>
                <div>
                    <GoogleSignUp buttonText="S up" />
                </div>
                <p className={styles.socialLinkText}>or</p>
            </div>
            <form>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            name="email"
                            placeholder="johndoe@example.com"
                            className={styles.inputBox}
                            onChange={(event) => {
                                onChangeEmail(event)
                                clearErrors('email')
                            }}
                        />
                        <span className={styles.errorLabel}>
                            {errors.email &&
                                !emailError &&
                                errors.email.type === "required" &&
                                " *required."}
                            {emailError && ` *${emailError}`}
                        </span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Phone number</label>
                        <input
                            {...register("phone_number", { required: true })}
                            type="number"
                            name="phone_number"
                            placeholder="80xxxxxxxxxx"
                            className={styles.inputBox}
                            onChange={(event) => {
                                onChangePhone(event)
                                clearErrors('phone_number')
                            }}
                        />
                        <span className={styles.errorLabel}>
                            {errors.phone_number &&
                                !phoneError &&
                                errors.phone_number.type === "required" &&
                                " *required"}
                            {phoneError && ` *${phoneError}`}
                        </span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            className={styles.inputBox}
                            onChange={(event) => {
                                onChangePassword(event)
                                clearErrors('password')
                            }}
                        />
                        <span className={styles.errorLabel}>
                            {errors["password"] && "  *password is required"}{" "}
                            {passwordError && ` *${passwordError}`}
                        </span>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Confirm password</label>
                        <input
                            {...register("password_confirmation", { required: true })}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            className={styles.inputBox}
                            onChange={(event) => {
                                onChangePasswordConfirmation(event)
                                clearErrors('password_confirmation')
                            }}
                        />
                        <span className={styles.errorLabel}>
                            {errors.password_confirmation &&
                                errors.password_confirmation.type === "required" &&
                                " *required"}
                                {confirmPasswordError &&  ` *${confirmPasswordError}`}
                        </span>
                    </div>
                </div>
                <div className={styles.agreementsContainer}>
                    <input type='checkbox' className={styles.agreementsCheckbox} defaultChecked
                        name="agree" required />
                    <div className={styles.agreementsTextContainer}>
                        <span className={styles.agreementsText}>I agree to the</span>
                        <a className={styles.agreementsLink} href="">terms & conditions</a>
                        <span className={styles.agreementsText}>and</span>
                        <a className={styles.agreementsLink} href="">privacy policy</a>
                    </div>
                </div>
                <div className={styles.appButtonContainer}>
                    {/* <AppButton disabled={!canSend} buttonText="Continue"  /> */}
                    <button className={styles.buttonContainer}
                        type="submit" disabled={!canSend}>
                        <span className={styles.buttonText}>Continue</span>
                    </button>
                </div>
            </form>
        </div>
    )
}
export default SignUp