import * as React from 'react';
import * as I from 'immutable';

import {default as NameEdit} from './name-edit';


function CheckboxTh ({data, onClick}) {
    let selectedCount = data.get('selected').count();
    var className;
    if (selectedCount === 0) {
        className = "fa fa-square-o";
    } else if (selectedCount == data.get('nodes').count()) {
        className = "fa fa-check-square-o";
    } else {
        className = "fa fa-plus-square-o";
    }
    return (
        <th className="icon-container"
            onClick={onClick}>
            <i className={className}></i>
        </th>
    );
}

export default class FileList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {orderBy: 'name', desc: false}
    }
    render () {
        let {data, dispatch} = this.props;
        var sortedNodes = I.List(data.get('nodes').values()).sortBy((n) => n.get(this.state.orderBy));
        if (this.state.desc) { sortedNodes = sortedNodes.reverse() }
        return (
            <table className="table table-striped table-condensed table-hover table-bordered table-file-list">
                <thead>
                <tr>
                    <CheckboxTh data={data} onClick={() => dispatch('toggle-global-selection', null)} />
                    <th className="icon-container"
                        onClick={() => this.setState({orderBy: 'type', desc: this.state.orderBy == 'type' ? !this.state.desc : false})}>
                        Type
                        {this.state.orderBy == 'type'
                          ? !this.state.desc
                            ? <i className="fa fa-arrow-down" />
                            : <i className="fa fa-arrow-up" />
                          : null}
                    </th>
                    <th onClick={() => this.setState({orderBy: 'name', desc: this.state.orderBy == 'name' ? !this.state.desc : false})}>
                        Filename
                        {this.state.orderBy == 'name'
                          ? !this.state.desc
                            ? <i className="fa fa-arrow-down" />
                            : <i className="fa fa-arrow-up" />
                          : null}
                    </th>
                    <th onClick={() => this.setState({orderBy: 'createdAt', desc: this.state.orderBy == 'createdAt' ? !this.state.desc : false})}>
                        Created At
                        {this.state.orderBy == 'createdAt'
                          ? !this.state.desc
                            ? <i className="fa fa-arrow-down" />
                            : <i className="fa fa-arrow-up" />
                          : null}
                    </th>
                    <th onClick={() => this.setState({orderBy: 'modifiedAt', desc: this.state.orderBy == 'modifiedAt' ? !this.state.desc : false})}>
                        Modified At
                        {this.state.orderBy == 'modifiedAt'
                          ? !this.state.desc
                            ? <i className="fa fa-arrow-down" />
                            : <i className="fa fa-arrow-up" />
                          : null}
                    </th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedNodes.map((f) => {
                    return (
                        <tr key={f.get('cid') + '-row'}
                            className={data.get('selected').has(f) ? "info" : null}
                            onClick={() => dispatch('toggle-selection', f)}>
                            <td className="icon-container">
                                {data.get('selected').has(f)
                                    ? <i className="fa fa-check-square-o"></i>
                                    : <i className="fa fa-square-o"></i>}
                            </td>
                            <td className="icon-container">
                                {f.get('isDir')
                                    ? <i className="fa fa-folder"></i>
                                    : <i className="fa fa-file"></i>}
                            </td>
                            <td>{I.is(data.get('edited'), f)
                                ? <NameEdit className="in"
                                            baseName={f.get('name')}
                                            onChange={(name) => dispatch('rename-node', f.set('name', name))} />
                                : <a href={`#/${f.get('cid')}`}
                                     onClick={(e) => e.stopPropagation()}>{f.get('name')}</a>}
                            </td>
                            <td>{f.get('createdAt')}</td>
                            <td>{f.get('modifiedAt')}</td>
                            <td>
                                <button className="btn btn-xs btn-default"
                                        disabled={data.get('edited')}
                                        onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch('toggle-edited', I.fromJS({node: f, value: true}));
                                    }}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-xs btn-default"
                                        disabled={data.get('edited')}
                                        onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch('toggle-for-deletion', I.Set.of(f))
                                    }}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    );
                })}
                {data.get('nodes').count() === 0
                    ? <tr><td colSpan="6">This directory is empty. Use icons in top right cornet to create stuff.</td></tr>
                    : null}
                </tbody>
            </table>
        );
    }
}
