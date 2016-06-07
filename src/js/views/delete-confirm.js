import * as React from 'react';


export default function DeleteConfirm ({data, onAccept, onDismiss}) {
    return (
        <div className="modal fade in" tabindex="-1" role="dialog" onClick={(e) => {e.stopPropagation(); onDismiss();}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" onClick={(e) => {e.stopPropagation(); onDismiss();}}>&times;</span>
                        </button>
                        <h4 className="modal-title">Warning!</h4>
                    </div>
                    <div className="modal-body">
                        <p>You are about to delete {data.count()} file(s) and/or directories!
                           This change cannot be reverted.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default"
                                onClick={(e) => {e.stopPropagation(); onDismiss();}}>Cancel</button>
                        <button type="button" className="btn btn-danger"
                                onClick={(e) => {e.stopPropagation(); onAccept();}}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
}