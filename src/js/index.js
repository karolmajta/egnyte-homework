import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as I from 'immutable';
import 'babel-polyfill';

import {createStore} from './store';
import {createDispatchFn} from './dispatcher';
import {isPersistenceFresh, reconcileAll, seed, getAllNodes} from './persistence';
import {default as App} from './views/app';

import * as actions from './actions';

if (isPersistenceFresh()) { seed(); }

const store = createStore(I.fromJS({
    route: ["loading", {}],
    nodes: getAllNodes(),
    selectedNodes: I.Set(),
    scheduledForDeletion: I.Set(),
    editedNode: null
}));

const dispatchFn = createDispatchFn(store, {
    'dispatch-route': actions.dispatchRoute,
    'redirect': actions.redirect,
    'toggle-selection': actions.toggleSelection,
    'toggle-global-selection': actions.toggleGlobalSelection,
    'toggle-for-deletion': actions.toggleForDeletion,
    'delete-scheduled': actions.deleteScheduled,
    'add-file': actions.addFile,
    'add-directory': actions.addDirectory,
    'toggle-edited': actions.toggleEdited,
    'rename-node': actions.renameNode
});

store.on('swap', (is, was, path) => {
    ReactDOM.render(<App data={store.cursor().deref()}
                         dispatch={dispatchFn}/>, document.getElementById('application'));
    reconcileAll(is, was);
});

window.onhashchange = function () {
    dispatchFn('dispatch-route', window.location.hash)
};

ReactDOM.render(<App data={store.cursor().deref()}
                     dispatch={dispatchFn}/>, document.getElementById('application'));

dispatchFn('dispatch-route', window.location.hash);
