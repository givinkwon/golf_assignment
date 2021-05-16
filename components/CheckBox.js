import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { WHITE, PRIMARY } from "static/style";

const WhiteCheckbox = withStyles({
  root: {
    padding: 0,
    paddingRight: 10,
    color: "#c7c7c7",
    borderRadius: "3px",
    "&$checked": {
      color: WHITE,
    "input:hover ~ &": {
      boederColor: "#0933b3",
    },
    "&$checked": {
      color: "#0933b3",
    },
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const PrimaryCheckbox = withStyles({
  root: {
    color: '#404040',
    "&$checked": {
      color: PRIMARY,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

class CheckBoxComponent extends React.Component {
  handleChange = (e) => {
    this.props.onChange(e.target.checked);
  };
  render() {
    const { checked } = this.props;
    const { primary, placeholder, label, disabled, ...props } = this.props;
    if (primary) {
      return (
        <FormControlLabel
          control={
            <PrimaryCheckbox
              checked={checked}
              onChange={this.handleChange}
              disabled={disabled}
            />
          }
          label={this.props.children}
        />
      );
    }
    return (
      <FormControlLabel
        control={
          <WhiteCheckbox checked={checked} onChange={this.handleChange} />
        }
        label={this.props.children}
      />
    );
  }
}

export default CheckBoxComponent;
