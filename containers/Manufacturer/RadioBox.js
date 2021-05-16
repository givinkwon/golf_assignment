import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox } from "@material-ui/core";

import * as Content from "components/Content";
import Partner from "../../stores/Partner";

const pass3 = "static/images/pass3.png";

@inject("Partner")
@observer
class RadioBoxContainer extends React.Component {
  state = {
    index: 1,
    checked: false,
  };

  componentDidMount() {}

  onClickFilterHandler = (item, idx, filter) => {
    const { Partner } = this.props;
    console.log(idx);

    if (filter === "region") {
      if (Partner.radiobox_checked_idx !== idx) {
        this.setState({ index: idx });
        Partner.radiobox_checked_idx = idx;
        Partner.filter_region = item.id;
        Partner.partner_next = null;
        Partner.partner_count = null;
        // this.count = 0;
        Partner.currentPage = 1;
        // console.log(Partner.filter_region)
        // if(Partner.filter_region === "전체"){
        //   Partner.getPartnerByPrice()
        // }else{
        //   Partner.getPartnerByPrice()
        // }
        //Partner.getPartnerByRegion(Partner.search_text);
        console.log(Partner.radiobox_checked_idx);
        Partner.category_dic = {};
        //Partner.search_text = "";
        //Partner.setCategory();
        Partner.getPartner();
      }
    } else {
      if (Partner.radiobox_category_checked_idx !== idx) {
        this.setState({ index: idx });
        Partner.radiobox_category_checked_idx = idx;
        Partner.filter_category = item.id;
        Partner.partner_next = null;
        Partner.partner_count = null;
        // this.count = 0;
        Partner.currentPage = 1;
        // console.log(Partner.filter_region)
        // if(Partner.filter_region === "전체"){
        //   Partner.getPartnerByPrice()
        // }else{
        //   Partner.getPartnerByPrice()
        // }
        //Partner.getPartnerByRegion(Partner.search_text);
        console.log(Partner.radiobox_category_checked_idx);
        Partner.category_dic = {};
        Partner.getPartner();
      }
    }
  };

  activeHandler = (idx, filter) => {
    // console.log(`this.state.index : ${this.state.index}`)
    // console.log(`idx : ${idx}`)
    if (filter === "region") {
      if (idx === Partner.radiobox_checked_idx) {
        // console.log("equal")
        return true;
      } else {
        return false;
      }
    } else {
      if (idx === Partner.radiobox_category_checked_idx) {
        // console.log("equal")
        return true;
      } else {
        return false;
      }
    }
  };

  handleChange = (e) => {
    this.props.onChange(e.target.checked);
  };
  render() {
    const { checked, data, filter } = this.props;
    const { placeholder, label, disabled, ...props } = this.props;

    return (
      <FormControl component="fieldset">
        {/* <FormLabel component="legend" style={{marginTop: '28px'}}>금액</FormLabel> */}
        {filter === "region" ? <Font16>지역</Font16> : <Font16>분야</Font16>}
        {/* <RadioGroup aria-label="number" name="number1">
          <FormControlLabel value="one" control={<Checkbox />} label="정제의뢰" />
          <FormControlLabel value="two" control={<Checkbox />} label="정제의뢰" />
          <FormControlLabel value="three" control={<Radio />} label="" />                                
        </RadioGroup> */}
        {data.map((item) => {
          return (
            <Item
              onClick={() => {
                this.onClickFilterHandler(item, item.id, filter);
                console.log(item);
              }}
              active={this.activeHandler(item.id, filter)}
            >
              <div active={this.activeHandler(item.id, filter)}>
                <img src={pass3} active={this.activeHandler(item.id, filter)} />
              </div>
              {filter === "region" ? (
                <span>{item.city}</span>
              ) : (
                <span>{item.category}</span>
              )}
            </Item>
          );
        })}
      </FormControl>
    );
  }
}

export default RadioBoxContainer;

const Item = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  padding-left: 4px;
  align-items: center;

  > div {
    width: 16px;
    height: 16px;
    background-color: ${(props) => (props.active ? "#0933b3" : "#e1e2e4")};
    margin-right: 10px;
    position: relative;
    border-radius: 2px;
    cursor: pointer;
    > img {
      display: ${(props) => (props.active ? "static" : "none")};
      position: absolute;
      top: 17%;
      left: 15%;
    }
  }
  > span {
    font-size: 16px;
    text-align: left;
    line-height: 30px;
    letter-spacing: -0.16px;
    font-weight: 500;
    cursor: pointer;
    color: ${(props) => (props.active ? "#0933b3" : "#999999")};
  }
`;

const Font16 = styled(Content.FontSize16)`
  font-weight: 500 !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 1.25 !important;
  letter-spacing: -0.4px !important;
  color: #282c36;
  margin-top: 28px;
  margin-bottom: 29px;
`;
