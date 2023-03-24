import type { ReactElement } from 'react'
import styles from '../../styles/Conversation.module.css'

const Conversation = ():ReactElement => {
    const year = new Date().getFullYear()
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Ma conversation</h1>

        <main className={styles.main}>
            <section className={styles.header}>
                <div>User xXx - You</div>
                <div>Last message : today at 2h45 PM</div>
            </section>

            <section className={styles.messages}>
                <div className={styles.messageWrap}>
                    <div className={styles.user}>Username</div>
                    <div className={styles.message}>Is this the app for leboncoin ?</div>
                </div>

                <div className={styles.messageWrap}>
                    <div className={styles.user}>Username</div>
                    <div className={styles.message}>Yeah !</div>
                </div>

                <div className={styles.messageWrap}>
                    <div className={styles.user}>Username</div>
                    <div className={styles.message}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
                </div>
            </section>

            <form className={styles.messageForm}>
                <input
                    type='text'
                    required
                    placeholder='Send message'
                />
                <button type="submit">&#12297;</button>
            </form>
        </main>
  
        <footer className={styles.footer}>
            &copy; leboncoin - {year}
        </footer>
      </div>
    )
}

export default Conversation