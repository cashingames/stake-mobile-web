import React from "react";
import AppButton from "../../../components/AppButton/AppButton";
import AuthBanner from "../../../components/AuthBanner/AuthBanner";
import AuthTitle from "../../../components/AuthTitle/AuthTitle";
import GoogleSignUp from "../../../components/GoogleSignUp/GoogleSignUp";
import Input from "../../../components/Input/Input";
import styles from './SignUp.module.scss'

const SignUp: React.FC = () => {
    return (
        <div className={styles.signupContainer}>
            <AuthBanner />
            <AuthTitle titleText="Create an account" />
            <div className={styles.socialLinkContainer}>
                <p className={styles.socialLinkText}>Use your social link</p>
                <div>
                    <GoogleSignUp buttonText="Sign up" />
                </div>
                <p className={styles.socialLinkText}>or</p>
            </div>
            <div className={styles.inputsContainer}>
                <Input inputLabelText='Email'
                    placeholderText='johndoe@example.com'
                    inputType='email'
                />
                <Input inputLabelText='Phone number'
                    placeholderText='80xxxxxxxxxx'
                    inputType='number'
                    minLength='4'
                    maxLength='3'
                />
                <Input inputLabelText='Password'
                    placeholderText='Enter password'
                    inputType='password'
                    minLength='8'
                />
                <Input inputLabelText='Confirm password'
                    placeholderText='Confirm password'
                    inputType='password'
                />
            </div>
            <div className={styles.agreementsContainer}>
                <input type='checkbox' className={styles.agreementsCheckbox} />
                <div className={styles.agreementsTextContainer}>
                    <span className={styles.agreementsText}>I agree to the</span>
                    <a className={styles.agreementsLink} href="">terms & conditions</a>
                    <span className={styles.agreementsText}>and</span>
                    <a className={styles.agreementsLink} href="">privacy policy</a>
                </div>
            </div>
            <div className={styles.appButtonContainer}>
                <AppButton buttonText='Continue' />
            </div>
        </div>
    )
}
export default SignUp