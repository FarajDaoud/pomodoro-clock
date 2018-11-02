import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: '',
        };
    }

    render() {
        return(
            <div id="app-wrapper">
                <div id="break-container">
                    <span id="break-label">Break Length</span>
                    <span id="break-length"></span>
                    <button id="break-decrement">decrement</button>
                    <button id="break-increment">increment</button>
                </div>
                <div id="session-container">
                    <span id="session-label">Session Length</span>
                    <span id="session-length"></span>
                    <button id="session-decrement">decrement</button>
                    <button id="session-increment">increment</button>
                </div>
                <div id="timer-container">
                    <span id="timer-label">Session</span>
                    <span id="time-left"></span>
                    <div id="start_stop">
                        <button id="toggle_start_stop">Start</button>
                    </div>
                    <button id="reset">Reset</button>
                </div>
               
                
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));