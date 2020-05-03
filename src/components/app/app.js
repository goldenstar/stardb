import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        hasError: false,
        showRandomPlanet: true
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch (error, errorInfo) {
        this.setState({ hasError: true });
    }

    render () {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        const planetItemList = (
            <ItemList onItemSelected={ this.onPersonSelected }
                      getData={ this.swapiService.getAllPlanets }>
                { (i) => `${i.name} (${i.diameter})` }
            </ItemList>
        );

        const planetDetails = (
            <ItemDetails personId={ this.state.selectedPerson } />
        );

        const starshipItemList = (
            <ItemList
                onItemSelected={ this.onPersonSelected }
                getData={ this.swapiService.getAllStarships }>
                { (i) => `${i.name} (${i.model})` }
            </ItemList>
        );

        const starshipDetails = (<ItemDetails personId={ this.state.selectedPerson } />);

        return (
            <div className="stardb-app">
                <Header />
                {planet}
                <div className="row mb2 button-row">
                    <button
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <ErrorButton />
                </div>

                <PeoplePage />

                <Row left={ planetItemList } right={ planetDetails } />

                <Row left={ starshipItemList } right={ starshipDetails } />
            </div>
        )
    };
};