import * as I from 'immutable';
import * as uuid from 'uuid';

import * as dataUtils from './data';


// this is a primitive router, bit hacky but I don't want
// to write a full fledged one
export function dispatchRoute (storeData, actionData, dispatch) {
    let cid = actionData.split("/").reverse()[0];
    let foundNode = storeData.get('nodes').get(cid);

    if (cid == 'not-found') {
        return storeData.set('route', I.fromJS(['not-found', {}]))
                        .set('selectedNodes', I.Set())
                        .set('scheduledForDeletion', I.Set());
    }

    if (!cid) {
        return storeData.set('route', I.fromJS(['node-list', {focus: foundNode}]))
            .set('selectedNodes', I.Set())
            .set('scheduledForDeletion', I.Set());
    }

    if (!foundNode) {
        dispatch('redirect', '/not-found');
        return storeData;
    }

    return storeData.set('route', I.fromJS(['node-list', {focus: foundNode}]))
                    .update('selectedNodes', (d) =>I.Set())
                    .update('scheduledForDeletion', (d) => I.Set());
}


export function redirect (storeData, actionData) {
    window.location.hash = actionData;
    return storeData;
}


export function toggleSelection (storeData, actionData) {
    return storeData.update('selectedNodes', (selection) => {
        if (selection.has(actionData)) {
            return selection.remove(actionData);
        } else {
            return selection.add(actionData);
        }
    });
}


export function toggleGlobalSelection (storeData, actionData) {
    let focus = storeData.getIn(['route', 1, 'focus']) || null;
    let possibleForSelection = I.List(storeData.get('nodes')
                                                 .values()).filter((n) => I.is(n.get('parent'), focus));
    if (possibleForSelection.count() == storeData.get('selectedNodes').count()) {
        return storeData.set('selectedNodes', I.Set());
    } else {
        return storeData.set('selectedNodes', I.Set(possibleForSelection));
    }
}


export function toggleForDeletion (storeData, actionData) {
    var transientData = storeData;
    actionData.forEach((f) => {
        transientData = transientData.update(
            'scheduledForDeletion',
            (scheduled) => scheduled.has(f) ? scheduled.remove(f) : scheduled.add(f)
        );
    });
    return transientData;
}


export function deleteScheduled (storeData, actionData) {
    return storeData
             .update('nodes', (nodes) => {
                var updatedNodes = dataUtils.deleteNodes(
                    storeData.get('scheduledForDeletion'),
                    I.Set(nodes.values())
                );
                return I.Map(updatedNodes.map((n) => [n.get('cid'), n]));
             })
             .set('scheduledForDeletion', I.Set())
             .update('selectedNodes', (selected) => selected.subtract(storeData.get('scheduledForDeletion')));
}

export function addDirectory (storeData, actionData) {
    let newDir = dataUtils.createDirectory(actionData.get('parent'), 'New Directory');
    return storeData.setIn(['nodes', newDir.get('cid')], newDir)
                    .set('editedNode', newDir);
}

export function addFile (storeData, actionData) {
    let newFile = dataUtils.createFile(actionData.get('parent'), 'New File');
    return storeData.setIn(['nodes', newFile.get('cid')], newFile)
                    .set('editedNode', newFile);
}

export function toggleEdited (storeData, actionData) {
    let node = actionData.get('node');
    let value = actionData.get('value');
    return storeData.update('editedNode', (editedNode) => value ? node : null);
}

export function renameNode (storeData, actionData) {
    return storeData.setIn(['nodes', actionData.get('cid')], actionData.set('modifiedAt', (new Date()).toISOString()))
                    .set('editedNode', null);
}