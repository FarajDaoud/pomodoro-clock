import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionLength: 25,
            breakLength: 5,
            timerMin: '25',
            timerSec: '00',
            timerActive: false,
            timerStarted: false,
            timerType: 'Session',
        };
        this.startTimer = this.startTimer.bind(this);
        this.timerTick = this.timerTick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    startTimer() {
        this.sessionTimer = setInterval(this.timerTick, 1000);
        this.setState({
            timerActive: true,
        });
    }

    stopTimer() {
        clearInterval(this.sessionTimer);
        this.setState({
            timerActive: false,
        });
    }

    timerTick() {
        let {timerMin, timerSec, timerType} = this.state;
        timerMin = parseInt(timerMin);
        timerSec = parseInt(timerSec);
        //decrement timerMin
        if(timerSec === 0 && timerMin >= 1){
            timerMin -= 1;
            timerMin = '0' + timerMin.toString();
            timerMin = timerMin.slice(-2);
            timerSec = '59';
            this.setState({
                timerMin: timerMin,
                timerSec: timerSec,
            });
        }
        //decrement timerSec
        else if(timerSec > 0){
            timerSec -= 1;
            timerSec = '0' + timerSec.toString();
            timerSec = timerSec.slice(-2);
            this.setState({
                timerSec: timerSec,
            });
        }
        //timerMin = 0 and timerSec = 01
        else{
            this.stopTimer();
            this.playBeep();
            timerType === 'Session' ? this.startBreak() : this.restartSession();
        }
    }

    

    startBreak() {
        document.getElementById('timer-label').innerHTML = 'Break';
        let breakLength = '0' + this.state.breakLength.toString();
        breakLength =  breakLength.slice(-2);
        this.setState({
            timerMin: breakLength,
            timerSec: '00',
            timerType: 'Break',
        });
        this.startTimer();
    }

    restartSession() {
        document.getElementById('timer-label').innerHTML = 'Session';
        let sessionLength = '0' + this.state.sessionLength.toString();
        sessionLength = sessionLength.slice(-2);
        this.setState({
            timerMin: sessionLength,
            timerSec: '00',
            timerType: 'Session',
        });
        this.startTimer();
    }

    playBeep() {
        const clip = document.getElementById('beep');
        clip.currentTime = 0;
        clip.play();
    }
    
    handleClick(event){
        let {sessionLength, breakLength, timerMin, timerStarted, timerActive} = this.state;
        switch(event.target.id){
            case 'break-decrement':
                if(breakLength >= 2){
                    if(!timerActive){
                        this.setState({
                            breakLength: breakLength - 1,
                            timerType: 'Session',
                        });
                        document.getElementById('timer-label').innerHTML = 'Session';
                    }
                }
                break;
            case 'break-increment':
                if(breakLength <= 59){
                    if(!timerActive){
                        this.setState({
                            breakLength: breakLength + 1,
                            timerType: 'Session',
                        });
                        document.getElementById('timer-label').innerHTML = 'Session';
                    }
                }
                break;
            case 'session-decrement':
                if(sessionLength >= 2){
                    //timer is not active.
                    if(!timerActive){
                        sessionLength -= 1;
                        timerMin = '0' + sessionLength.toString();
                        timerMin = timerMin.slice(-2);
                        this.setState({
                            sessionLength: sessionLength,
                            timerMin: timerMin,
                            timerSec: '00',
                            timerType: 'Session',
                        });
                        document.getElementById('timer-label').innerHTML = 'Session';
                    }
                }
                break;
            case 'session-increment':
                if(sessionLength <= 59){
                    if(!timerActive){
                        sessionLength += 1;
                        timerMin = '0' + sessionLength.toString();
                        timerMin = timerMin.slice(-2);
                        this.setState({
                            sessionLength: sessionLength,
                            timerMin: timerMin,
                            timerSec: '00',
                            timerType: 'Session',
                        });
                        document.getElementById('timer-label').innerHTML = 'Session';
                    }
                }
                break;
            case 'start_stop':
                if(event.target.innerHTML === "Start"){
                    if(!timerStarted){
                        this.setState({
                            timerMin: sessionLength.toString(),
                            timerStarted: !timerStarted,
                        });
                    }
                    //start or resume timer
                    this.startTimer();
                    event.target.innerHTML = 'Pause';
                }else{
                    //pause timer
                    this.stopTimer();
                    event.target.innerHTML = 'Start';
                }
                break;
            case 'reset':
                //stop timer
                this.stopTimer();
                this.setState({
                    sessionLength: 25,
                    breakLength: 5,
                    timerMin: '25',
                    timerSec: '00',
                    timerStarted: false,
                    timerType: 'Session',
                });
                const clip = document.getElementById('beep');
                clip.pause();
                clip.currentTime = 0;
                document.getElementById('timer-label').innerHTML = 'Session';
                document.getElementById('start_stop').innerHTML = 'Start';
                break;
            default:
                break;
        }
    }



    render() {
        return(
            <div id="app-wrapper">
                <div id="break-container">
                    <span id="break-label" className="labels">Break Length</span>
                    <div className="controls-container">
                        <button id="break-decrement" onClick={this.handleClick}>&#9660;</button>
                        <span id="break-length">{this.state.breakLength}</span>
                        <button id="break-increment" onClick={this.handleClick}>&#9650;</button>
                    </div>
                </div>
                <div id="session-container">
                    <span id="session-label" className="labels">Session Length</span>
                    <div className="controls-container">
                        <button id="session-decrement" onClick={this.handleClick}>&#9660;</button>
                        <span id="session-length">{this.state.sessionLength}</span>
                        <button id="session-increment" onClick={this.handleClick}>&#9650;</button>
                    </div>
                </div>
                <div id="timer-container">
                    <span className="labels" id="timer-label">Session</span>
                    <span id="time-left">{this.state.timerMin + ':' + this.state.timerSec}</span>
                    <div id="start_stop-container">
                        <button id="start_stop" onClick={this.handleClick}>Start</button>
                    </div>
                    <button id="reset" onClick={this.handleClick}>Reset</button>
                </div>
                <audio id="beep" className="clip" src="https://farajdaoud.com/subsite/pomodoro-clock/audio/error-alert.mp3">
                    <source src="https://farajdaoud.com/subsite/pomodoro-clock/audio/error-alert.mp3" type="audio/mpeg"></source>
                </audio>
                
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));