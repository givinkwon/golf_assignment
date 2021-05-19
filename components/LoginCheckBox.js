import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { WHITE, PRIMARY } from "static/style";

const WhiteCheckbox = withStyles({
  root: {
    color: "#c7c7c7",
    borderRadius: "3px",
    //hover 해야됌
    "input:hover ~ &": {
      boederColor: "#068d18",
    },
    "&$checked": {
      color: "#068d18",
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
