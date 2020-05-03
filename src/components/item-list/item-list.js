import React, { Component } from 'react';

import './item-list.css';
import ErrorIndicator from '../error-indicator';
import CurrentList from './current-list'
import Spinner from '../spinner';

export default class ItemList extends Component {

    state = {
        itemList: null,
        loading: true,
        error: false
    }

    componentDidMount = () => {
        const { getData } = this.props;
        getData()
            .then(this.onLoaded)
            .catch(this.onError);
    }

    onLoaded = (itemList) => {
        this.setState({
            itemList,
            error: false,
            loading: false
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    render() {

        const { itemList, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const list = hasData
            ? <CurrentList
                list={itemList}
                onItemSelected={this.props.onItemSelected}
                renderItem={this.props.children}/>
            : null;

        return (
            <React.Fragment>
                { errorMessage }
                { spinner }
                { list }
            </React.Fragment>
        );
    }
}
