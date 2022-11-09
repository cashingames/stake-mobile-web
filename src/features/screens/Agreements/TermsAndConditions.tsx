import React, { useState, useEffect } from "react";
import AuthTitle from "../../../components/AuthTitle/AuthTitle";
import styles from './Agreements.module.scss'

const TermsAndConditions: React.FC = () => {
    return (
        <div className={styles.container}>
            <AuthTitle titleText='Terms & Conditions' />
            <div>
                <h3>1 Introduction</h3>
                <p>These are the Terms of Use ("Terms") which govern our websites, mobile applications, and APIs (each, a "Service" or collectively the “Services”) owned and/or operated by Cashingames Limited ("we", "us", "our", "Cashingames"). By accessing and/or using the Services, you agree to be bound by these Terms, our Privacy Policy, and any Additional Service Terms governing your use of a particular Service, all of which are incorporated by reference. <br />
                    <span>IF YOU DO NOT AGREE TO ALL THESE TERMS YOU SHOULD NOT USE OUR SERVICES OR VISIT OUR WEBSITE.</span></p>
            </div>
            <div>
                <h3>2 Basic Terms</h3>
                <p>2.1 Eligibility for Use:<br />
                    You represent and warrant that you are at least 18 years of age, of legal competence to enter into this agreement, and are not a person barred from receiving services under the laws of the Federal Republic of Nigeria or other applicable jurisdiction. We reserve the right to deny, at our sole discretion, any access or use of the Services without notice for any or no reason. <br />
                    2.2 Accounts and Logins:<br />
                    You represent and warrant that all information you provide in connection with the creation of your Cashingames account (“Account”) is accurate and true. You agree that, if any information changes, you will update your Account to maintain accurate information.<br />
                    When you create an Account, you may be required to create a login and password. You will agree that you will not distribute your login or password to any other person, and you understand that you cannot authorize any other person to use your Account. You agree that you will not transfer, sub-license, sell, or assign your rights in your Account to any other person. <br />
                    2.3 Passwords and Unauthorized Use:<br />
                    You are responsible for safeguarding the password for accessing the Services and any activities or actions under your account credentials. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower-case letters, numbers and symbols) for your Account. We will not be liable for any loss or damage arising from your failure to comply with the above.<br />
                    If you believe that a third party has gained access to your Account, you must notify us promptly by sending an email tohello@cashingames.com. Failure to do so may result in your account being suspended without prior notice. You expressly agree that you will be responsible for any costs arising from a data breach caused by unauthorized use of your Account credentials, including, if applicable, notice to affected individuals. <br />
                    2.4 User Provided Content: <br />
                    Any User Content provided by you remains your property. However, by submitting content (“Your Content”), you grant us a royalty-free, perpetual, irrevocable, non-exclusive, unrestricted, worldwide license to reproduce, prepare derivative works, or distribute copies of Your Content in any medium for the sole purpose of providing or marketing the Services to you and others. You agree that you have the right to submit any content submitted and you are not violating any party’s intellectual property rights or any other right that could lead to a cause of action against you or us.
                    You represent and warrant that: (i) you either are the sole and exclusive owner of all Your Content or you have all rights, licenses, consents and releases necessary to grant us the license to the Your Content as set forth above; and (ii) neither the Your Content nor your submission, uploading, publishing or otherwise making available of Your Content nor our use of the Your Content as permitted herein will infringe, misappropriate or violate a third party’s intellectual property or proprietary rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation.
                    You agree to not provide content that is defamatory, libelous, hateful, violent, obscene, pornographic, unlawful, or otherwise offensive, as determined by us in our sole discretion, whether or not such material may be protected by law. We may, but will not be obligated to, review, monitor, or remove Your Content, at our sole discretion and at any time and for any reason, without notice to you.<br />
                    2.5 Network Access and Devices: <br />
                    You are responsible for obtaining the data network access necessary to use the Services. Your mobile network’s data and messaging rates and fees may apply if you access or use the Services from a wireless-enabled device and you shall be responsible for such rates and fees. You are responsible for acquiring and updating compatible hardware or devices necessary to access and use the Services and Applications and any updates. We do not guarantee that the Services will function on any particular hardware or devices. In addition, the Services may be subject to malfunctions and delays inherent in the use of the Internet and electronic communications. <br />
                    2.6 Connection with Third Parties: <br />
                    The Services may contain links to third-party websites or resources. You acknowledge and agree that we are not responsible or liable (directly or indirectly) for the availability of such websites or resources, the content, advertising, products, or services on or available from such websites or resources, or any damage, loss, claim, or complaint caused by, arising from, or in connection with your use of or reliance on any such content, advertising, products, or services available on or through any such website or resource. Links to such websites or resources do not imply any endorsement by us of such websites or resources or the content, advertising, products, or services available from such websites or resources. You acknowledge sole responsibility for and assume all risk arising from your use of any such websites or resources. <br />
                    2.7 Communication from Us: <br />
                    Once you create an Account or otherwise provide your email address to us, you may, from time to time, receive email communications from us about your account, and occasional marketing emails. You may elect to opt out of receiving marketing emails at any time by following the instructions and link provided within the email. Please allow up to 5 days for your marketing communication preferences to fully take effect within our systems.</p>
            </div>
            <div>
                <h3>3 License to Use the Service</h3>
                <p>3.1 Limited License: <br />
                    Subject to these Terms and any Additional Service Terms, we grant you a limited, revocable, non-transferable, nonexclusive license to access and use our Services. You agree that you will not copy, display, distribute, or resell any part of the Content or Services, in any medium, without our prior written consent. To the extent any component of the Content or Services may be offered under an open source license, we will make that license available to you and the provisions of that license may expressly override some of these Terms. <br />
                    3.2 Access Restrictions: <br />
                    You may not access or search or attempt to access or search the Services by any means (automated or otherwise) other than through our currently available, published interfaces that are provided by us (and only pursuant to these Terms), without our express prior written consent.
                    In addition, you may not do any of the following while accessing or using the Services: <br />
                    i) Use any automated devices, such as spiders, robots or data mining techniques to download, store or otherwise reproduce, store or distribute content or to manipulate the Services; <br />
                    ii) Access, tamper with or use non-public aspects of the Service, Cashingames’ computer systems or technical delivery systems of Cashingames’ providers; <br />
                    iii) Probe, scan, or test the vulnerability of any system or network or breach or circumvent any security or authentication measures; <br />
                    iv) Forge any TCP/IP packet header or any part of the header information in any email, or in any way use the Services to send altered, deceptive, or false source of identifying information; or <br />
                    v) interfere with, or disrupt (or attempt to do so), the access of any user, host or network, including, without limitation, sending virus, overloading, flooding, spamming, mail-bombing the Services, or using the Services in such a manner as to interfere with or create an undue burden on the Services <br />
                    3.3 Usage Restrictions: <br />
                    You agree to use the Services only for appropriate, legal purposes and in compliance with applicable laws and regulations. <br />
                    3.4 User-Generated Content Restrictions: <br />
                    We may allow users, including you, to post certain user generated content (“UGC”) to the service. We reserve the rightto monitor or review any UGC at any time for any readily apparent violation of these Terms. We also reserve the right to conduct a limited review of the UGC for the sole purpose of identifying and rejecting UGC which violates these Terms.
                    All UGC must not: <br />
                    i) Impersonate another person or entity or misrepresents your affiliation with a person or entity <br />
                    ii) Contain the private information of any third party, including but not limited to addresses, phone numbers, email addresses etc. <br />
                    iii) Be commercial in nature; <br />
                    iv) Infringe on a third party’s intellectual property right; <br />
                    v) Be threatening, incite violence or promote illegal activity; <br />
                    vi) Promote or endorse drug use, child pornography or other illegal activities; or <br />
                    vii) Contain hate speech, nudity or graphic or gratuitous violence.</p>
            </div>
            <div>
                <h3>4 Our Intellectual Property</h3>
                <p>All rights, title, interest to the Service (excluding user provided content) are and remain the exclusive property of Cashingames. We are the exclusive owner of the trademark right to Cashingames logo and our website mark and other intellectual property that may be created from time to time during your use. The Services are protected by copyright, trademark and other laws of the Federal Republic of Nigeria. <br />
                    Nothing in these Terms gives you a right to use our intellectual property, except expressly authorized by us. You are hereby prohibited from copying, distributing, framing or creating any derivative work from our intellectual property. <br />
                    We may use third-party trademarks on our website to identify the owners of these marks. Use of such third-party trademark is intended only to identify the owner and its goods and services and not to imply any association or sponsorship between us and the owner.</p>
            </div>
            <div>
                <h3>5 Our Intellectual Property Protection</h3>
                <p>We respect the rights of all intellectual property owners. Kindly contact hello@cashingames.com if you believe your intellectual property is being violated by sending a notice detailing the nature of the violation and proof of ownership. We will conduct our investigation on such claims and if validated, will take down the allegedly infringing content.</p>
            </div>
            <div>
                <h3>6 Disclaimers and Limitations of Liability</h3>
                <p>Your use of the services is solely at your own risk (including but not limited to any damage to your computer, loss of data, damage from reliance on information from our website etc). Even if we advise you or are aware of the risk of such damage, all information and the Services provided is “as is’ “with faults” “without warranty” except expressly set forth in this Terms. We specifically disclaim all warranties and conditions, express or limited, including but not limited to limited warranties and/or condition of merchantability, fitness for a particular purpose or non-infringement. <br />
                    To the maximum extent permitted by law, we shall not be liable for any indirect, incident, special, consequential or punitive damages or any loss of profits or revenues whether incurred directly or indirectly or any loss of data, use, goodwill or other intangible losses resulting from your access to our use or inability to access or use the services, or any conduct or content of a third party on the Services. In no event shall our aggregate liability exceed Ten Thousand Naira (N10,000) or the amount you paid, if any, in the past six months for the Services giving rise to the claim. <br />
                    These limitations apply to any liability, whether based on warranty, contract, statute, tort or otherwise, whether or not we have been informed of the possibility of any such damage and even if the remedy set forth is found to have failed of its essential purpose.</p>
            </div>
            <div>
                <h3>7 Indemnity</h3>
                <p>You agree to defend, indemnify, and hold us harmless from and against any claims, actions or demands, liabilities and settlements including without limitation, reasonable legal and related fees and expenses, resulting from, or alleged to result from, your violation of these Terms or your use of the Services. <br />
                    We reserve the right to assume exclusive control of our defense in any matter subject to your indemnification, which shall not excuse your obligation to indemnify us. You shall not settle any dispute subject to your indemnification under these Terms without written consent from us</p>
            </div>
            <div>
                <h3>8 General Terms</h3>
                <p>8.1 Governing Law and Dispute Resolution: <br />
                    These Terms will be governed by the laws of the Federal Republic of Nigeria. All claims arising will be resolved by the he Federal High Court or any other Court of coordinate jurisdiction in Nigeria. <br />
                    8.2 Term and Termination: <br />
                    These Terms will remain in full force and effect while you use the Services. You may terminate your use of the Services at any time. We can suspend or terminate your access to or use of the Services, in whole or in part, at any time, immediately and without notice. In all such cases, the Terms terminate, including, without limitation, your license to use the Services. <br />
                    8.3 Changes to the Services: <br />
                    We reserve the right, at any time and in our sole discretion, to amend, modify, suspend, or terminate the Services, the Content, and any part thereof without notice to you. We will have no liability to you or any other person or entity for any modification, suspension, termination, or loss of information. <br />
                    8.4 Modification of Terms: <br />
                    From time to time, and in our sole discretion, we may revise these Terms. If the revision, in our sole discretion, is material we will notify you via an email sent to the email address associated with your account, or by means of a notice posted on this website. By continuing to access or use the Services after those revisions become effective, you agree to be bound by the revised Terms. <br />
                    8.5 Assignment: <br />
                    You may not assign any of your rights under these Terms, and any such attempt will be void. We may assign its rights to any of its affiliates or subsidiaries, or to any successor in interest of any business associated with the Services. <br />
                    8.6 Notice: <br />
                    By entering into and accepting these Terms, you agree and consent to receive electronically all communications, agreements, notices, documents and disclosures relating to these Terms and your use of the Services (collectively, “Communications”). Communications include agreements and policies you agree to (for example, and not by way of limitation, these Terms, including the Privacy Policy), including updates to these agreements or policies; annual disclosures; transaction receipts or confirmations; statements and transaction history; and any other transaction information or other information related to the Services. You have the right to withdraw your consent at any time. To withdraw consent, you may send a written request to hello@cashingames.com. If consent is withdrawn, we reserves the right to discontinue your access to the Services, terminate any and all agreements with you. <br />
                    8.7 Waiver: <br />
                    Our failure to enforce a provision is not a waiver of its right to do so later. <br />
                    8.8 Severability: <br />
                    If a provision is found invalid or unenforceable, the remaining provisions of the Terms will remain in full effect and an enforceable term will be substituted reflecting our intent as closely as possible. <br />
                    8.9 Entire Agreement: <br />
                    These Terms, as well as the incorporated Privacy Policy and any additional Service Terms you agree to, are the entire and exclusive agreement between you and us, and these Terms supersede and replace any prior agreements between you and us regarding the Services. <br />
                    However, the foregoing does not supersede or replace any Master Services Agreement, Order Form, or other written agreement between you and us, which is explicitly in addition to or replaces these Terms. These Terms create no third-party beneficiary right.</p>
            </div>
        </div>
    )
}

export default TermsAndConditions;