import * as React from 'react';
import * as I from 'immutable';

import {default as FileBrowser} from './file-browser';


export default function App ({data, dispatch}) {
    switch (data.get('route').first()) {
        case 'loading':
            return (
                <div className="placeholder">
                    <h1><i className="fa fa-spinner fa-spin fa-4x" /></h1>
                </div>
            );
        case 'not-found':
            return (
                <div className="placeholder">
                    <h1>We could not find what you're looking for. Go to <a href="#/">/root</a> dir.</h1>
                </div>
            );
        case 'node-list':
            return <FileBrowser data={data} dispatch={dispatch} />;
        default: return <div>Not implemented yet...</div>
    }
}