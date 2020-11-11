import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import NotificationSound from '../Assets/Sound.mp3';
import {Howl, Howler} from 'howler';
import 'react-toastify/dist/ReactToastify.css';
import './home.scss'

const Home = () => {
    Howler.volume(1.0);
    const [minutes, setMinutes] = useState('');

    let breakTimer = (timeGiven) => {
        setInterval(() => {
            let soundToPlay = new Howl({
                src: [NotificationSound]
            });
            soundToPlay.play();
            toast.info('Get some rest buddy. You deserve it!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }, Number(timeGiven) * 60 * 1000);
    }

    const validateTime = () => {
        let validTime = true;
        console.log('Hmm', minutes);
        if(minutes.trim().length === 0) {
            toast.error('Time cannot be empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
            setMinutes('');
            validTime = false;
        }

        if(Number(minutes) === 0 && minutes.trim().length !== 0) {
            toast.error('Time cannot be 0 minutes', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
            setMinutes('');
            validTime = false;
        }

        return validTime;
    }


    const submitValue = (event) => {
        event.preventDefault();
        if(validateTime()) {
            breakTimer(minutes); 
            toast.success(`Timer has been set for ${minutes} minute(s).`);
            setMinutes('')
        }
    }

    const handleChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) setMinutes(e.target.value);
    }

    const stopTimer = () => clearInterval(breakTimer);

    return (
        <div>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            />
            <form>
                <label>
                    <input id="fname" type="text" placeholder="Enter minute interval for timer"  onChange={handleChange} value={minutes} />
                    <span>Minutes</span>
                </label>
                <input type="submit" value="Set" onClick={submitValue} />
                <button className="stopTimerBtn" onClick={stopTimer}>Stop</button>
            </form>
        </div>
    )
}


export default Home;