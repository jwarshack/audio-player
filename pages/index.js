import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AudioPlayer from '../components/AudioPlayer'


export default function Home() {
  return (
    <div className={styles.containter}>
      <Head>
        <title>Audio Player</title>
      </Head>

      <main className={styles.main}>
        <AudioPlayer />
      </main>
  
    </div>
    

  )
}
