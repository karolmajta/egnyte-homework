import * as React from 'react';

export default class NameEdit extends React.Component {
    constructor (props) {
        super(props);
        this.onChange = props.onChange;
        this.baseName = props.baseName;
        this.state = {editedName: props.baseName};
    }
    componentDidMount () {
        this._input.focus();
    }
    render () {
        return <input type="text" className="form-control"
                      value={this.state.editedName}
                      placeholder={this.baseName}
                      onClick={(e) => e.stopPropagation()}
                      onBlur={() => {
                        this.onChange(/^\s*$/.test(this.state.editedName) ? this.baseName : this.state.editedName);
                      }}
                      onKeyUp={(e) => {
                        let inputValid = !/^\s*$/.test(this.state.editedName);
                        let enter = e.key == 'Enter';
                        if (inputValid && enter) {
                            this.onChange(this.state.editedName);
                        }
                      }}
                      onChange={(e) => this.setState({editedName: e.target.value})}
                      ref={(c) => this._input = c}/>;
    }
}