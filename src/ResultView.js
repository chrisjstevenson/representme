import React from 'react';
import './ResultView.css'

class ResultView extends React.Component {

    render() {
        const allTheThings = this.props.senators.concat(this.props.representatives);
        const allTheThingsFormatted = allTheThings.map((official, idx) => (
                <li key={idx}>
                    <div className="card">
                        <img className="card-img-top img" src={official.photoUrl} alt={official.name} />
                        <div className="card-block">
                            <h4 className="card-title">{official.name}</h4>
                            <p className="card-text">{official.party}</p>
                            <p className="card-text">{official.phones[0]}</p>
                        </div>
                    </div>
                </li>
        ));

        return (
            <div>
                <h3>Your State Senators</h3>
                <ul>{allTheThingsFormatted.slice(0,2)}</ul>
                <h3>Your State Representative(s)</h3>
                <ul>{allTheThingsFormatted.slice(2)}</ul>
            </div>
        )
    }
}

export default ResultView;