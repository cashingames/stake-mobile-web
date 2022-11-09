import Head from 'next/head'
import Image from 'next/image'
import Privacy from '../src/features/screens/Agreements/PrivacyPolicy'
import SignUp from '../src/features/screens/SignUp/signUp'
import styles from '../styles/Home.module.css'

export default function privacy() {
  return (
    <div className={styles.container}>
      <Head>
        <title>cashingames About</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Privacy />
      </main>
    </div>
  )
}