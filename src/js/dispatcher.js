import {default as csp} from 'js-csp';
import * as I from 'immutable';


export function createDispatchFn (store, actions) {
    const ch = csp.chan();

    let dispatchFn = function (actionName, actionData, cb) {
        csp.putAsync(ch, [actionName, actionData], cb);
    };

    csp.go(function* dispatcherLoop () {
        while (true) {
            let pair = yield csp.take(ch);
            let actionName = pair[0], actionData = pair[1];
            let handler = actions[actionName];
            if (!handler) {
                console.warn(`No handler found for "${actionName}". Doing nothing.`);
                console.warn(`Data was:`);
                console.warn((actionData && typeof actionData.toJS == "function") ? actionData.toJS() : actionData);
                return;
            }
            store.cursor().update(() => handler(store.cursor().deref(), actionData, dispatchFn));
        }
    });

    return dispatchFn;
}