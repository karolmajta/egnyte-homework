import * as React from 'react';
import * as I from 'immutable';

import * as dataUtils from '../data';


export default function Navbar ({data, dispatch}) {
    const path = dataUtils.fullPath(data.get('cwd'));
    const chunks = path
                            .map((d) => <button className="btn btn-link"
                                                key={d.get('cid') + '-chunk'}
                                                onClick={() => dispatch('redirect', `/${d.get('cid')}`)}>{d.get('name')}</button>)
                            .unshift(<button className="btn btn-link"
                                             key="root-chunk"
                                             onClick={() => dispatch('redirect', '/')}>root</button>);
    const separators = path.map((d) => <span key={d.get('cid') + '-separator'}>/</span>)
                           .unshift(<span key="root-separator">/</span>);
    return (
        <div>
            {separators.interleave(chunks)}
            <div className="action-icons">
                <button className="btn btn-sm btn-default"
                        onClick={() => dispatch('add-file', I.fromJS({parent: data.get('cwd')}))}>
                    <i className="fa fa-plus" /> <i className="fa fa-file" />
                </button>
                <button className="btn btn-sm btn-default"
                        onClick={() => dispatch('add-directory', I.fromJS({parent: data.get('cwd')}))}>
                    <i className="fa fa-plus" /> <i className="fa fa-folder" />
                </button>
                <button className="btn btn-sm btn-default"
                        disabled={data.get('selected').count() == 0 || data.get('edited')}
                        onClick={() => dispatch('toggle-for-deletion', data.get('selected'))}>
                    <i className="fa fa-trash" />
                </button>
            </div>
        </div>
    );
}