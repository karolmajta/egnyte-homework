import * as React from 'react';
import * as I from 'immutable';

import {default as Navbar} from './navbar';
import {default as FileList} from './file-list';
import {default as FilePreview} from './file-preview';
import {default as DeleteConfirm} from './delete-confirm';


export default function FileBrowser ({data, dispatch}) {
    let focus = data.getIn(['route', 1, 'focus']) || null;
    let cwd = !focus
                ? null
                : focus.get('isDir') ? focus : focus.get('parent');
    let nodes = data.get('nodes').filter((n) => I.is(n.get('parent'), cwd));
    return (
        <div>
            <Navbar data={I.fromJS({cwd: cwd, selected: data.get('selectedNodes'), edited: data.get('editedNode')})}
                    dispatch={dispatch} />
            <FileList data={I.fromJS({nodes: nodes, selected: data.get('selectedNodes'), edited: data.get('editedNode')})}
                      dispatch={dispatch} />
            {(focus && !focus.get('isDir'))
                ? <FilePreview data={focus} onDismiss={() => dispatch('redirect', `${cwd ? '/' + cwd.get('cid') : ''}`)} />
                : null}
            {(data.get('scheduledForDeletion').count() != 0)
                ? <DeleteConfirm data={data.get('scheduledForDeletion')}
                                 onDismiss={() => dispatch('toggle-for-deletion', data.get('scheduledForDeletion'))}
                                 onAccept={() => dispatch('delete-scheduled', null)}/>
                : null}
        </div>
    );
}