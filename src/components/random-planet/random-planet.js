import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';
import Spinner from '../spinner';
import PlanetView from './planet-view';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    componentDidMount () {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 10000);
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            error: false,
            loading: false
        });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        });
    }

    updatePlanet = () => {
        const id = Math.floor(Math.random()*25) + 3;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    render() {
        const { planet, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PlanetView planet={ planet } /> : null;

        return (
            <div className="random-planet jumbotron rounded">
                { errorMessage }
                { spinner }
                { content }
            </div>
        );
    }
}