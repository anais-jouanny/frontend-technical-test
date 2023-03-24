import type { ReactElement } from 'react'
import Image from 'next/image'
import Avatar from '../assets/avatar.webp'
import styles from '../styles/Home.module.css'

const Home = ():ReactElement => {
  const year = new Date().getFullYear()

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Mes conversations</h1>

        <main className={styles.main}>
            <article className={styles.card}>
                <Image src={Avatar} alt="avatar"/>
                <section>
                    <h2>User xXx</h2>
                    <time dateTime='2011-11-18'>November 18</time>
                </section>
            </article>

            <article className={styles.card}>
                <Image src={Avatar} alt="avatar"/>
                <section>
                    <h2>User xXx</h2>
                    <time dateTime='2011-11-18'>November 18</time>
                </section>
            </article>
        </main>

        <footer className={styles.footer}>
            &copy; leboncoin - {year}
        </footer>
    </div>
  )
}

export default Home