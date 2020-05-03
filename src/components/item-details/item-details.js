import React, { Component } from 'react';

import './item-details.css';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        loading: true
    };

    updateItem = () => {
        const { itemId } = this.props;
        if (!itemId) {
            return;
        }
        this.props.getDetails(this.props.itemId)
            .then(this.onItemLoaded);
    }

    onItemLoaded = (item) => {
        this.setState({
            item,
            loading: false
        });
    };

    componentDidMount () {
        this.updateItem();
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    render() {

        if (!this.state.item) {
            return <span>Selected an item from a list!</span>;
        }

        const {
            item: { id, name, gender, birthYear, eyeColor },
            loading
        } = this.state;

        const spinner = loading ? <Spinner /> : null;
        const itemDetail = !loading
            ? <div className="item-details card">
                <img className="item-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
                <div className="card-body">
                    <h4>{ name }</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{ gender }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{ birthYear }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{ eyeColor }</span>
                        </li>
                    </ul>
                    <ErrorButton />
                </div>
            </div>
            : null;

        return (
            <React.Fragment>
                { spinner }
                { itemDetail }
            </React.Fragment>
        )
    }
}
