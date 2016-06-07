import * as React from 'react';


export default function FilePreview ({data, onDismiss}) {
    return (
        <div className="modal fade in" tabindex="-1" role="dialog" onClick={(e) => {e.stopPropagation(); onDismiss();}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" onClick={(e) => {e.stopPropagation(); onDismiss();}}>&times;</span>
                        </button>
                        <h4 className="modal-title">
                            {data.get('name')}
                        </h4>
                    </div>
                    <div className="modal-body">
                        <h1><i className="fa fa-2x fa-file" /></h1>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Created at:</th>
                                    <td>{data.get('createdAt')}</td>
                                </tr>
                                <tr>
                                    <th>Modified at:</th>
                                    <td>{data.get('modifiedAt')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary"
                                onClick={(e) => {e.stopPropagation(); onDismiss();}}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
}