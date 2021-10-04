import styles from '../styles/AudioPlayer.module.css'
import React, { useState, useRef, useEffect } from 'react'
import {BsArrowLeftShort} from "react-icons/bs"
import {BsArrowRightShort} from "react-icons/bs"
import {FaPlay} from "react-icons/fa"
import {FaPause} from "react-icons/fa"



export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const audioPlayer = useRef()
    const progressBar = useRef()
    const animationRef = useRef()

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds)
        progressBar.current.max = seconds


    },[audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60)
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(secs % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returnedMinutes}:${returnedSeconds}`
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying
        setIsPlaying(!prevValue)

        if (!prevValue) {
            audioPlayer.current.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause()
            cancelAnimationFrame(animationRef.current)
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime
        changePlayerCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying)


    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value
        changePlayerCurrentTime()
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty("--seek-before-width", `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    const backFive = () => {
        progressBar.current.value = Number(progressBar.current.value - 5)
        changeRange()
    }
    const forwardFive = () => {
        progressBar.current.value = Number(progressBar.current.value + 5)
        changeRange()
    }
    return(
        <div className={styles.audioPlayer}>
            <audio ref={audioPlayer} src="https://bafybeigtk5lky77i2vudvyavwyapyztw27ecdbpjmeqrncqujpqv7ny3xy.ipfs.infura-ipfs.io/" preload="metadata"></audio>
            <button className={styles.forwardBackward} onClick={backFive}><BsArrowLeftShort/> 5</button>
            <button className={styles.playPause} onClick={togglePlayPause}>{ isPlaying ? <FaPause /> : <FaPlay className={styles.play}/>}</button>
            <button className={styles.forwardBackward} onClick={forwardFive}>5 <BsArrowRightShort/></button>

            <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
            <div>
                <input className={styles.progressBar} type="range" defaultValue="0" ref={progressBar} onChange={changeRange}></input>
            </div>

            <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div>
    )
}