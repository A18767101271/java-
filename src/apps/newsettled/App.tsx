import React from 'react';
import Router from './Router';
import FastClick from 'fastclick';
import './sass/App.scss';

FastClick.attach(window.document.body);

interface AppProps {
}

class App extends React.Component<AppProps>{

    constructor(props: AppProps) {
        super(props);
    }


    render() {
        return <Router />
    }
}

export default App;