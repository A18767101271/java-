import React from 'react';
import Router from './Router';
import './sass/App.scss';

import './js/console.log';

interface AppProps {
    // initArgs: InitAppArgs;
    // init: (args: InitAppArgs) => {};
}

class App extends React.Component<AppProps, {}>{

    constructor(props: AppProps) {
        super(props);
    }

    render() {

        return (

            <Router />

        )

    }
}

export default App;