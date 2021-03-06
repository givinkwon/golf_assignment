import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'
import Router from "next/router";

import MobileRequestCardContainer from './MobileRequestCard';
import * as Title from 'components/Title';
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'
import SelectComponent from 'components/Select';
import InputComponent from 'components/Input2';
import PhoneInputComponent from 'components/PhoneInput';
import CheckBoxComponent from 'components/CheckBox';
import * as Content from 'components/Content';

const customStyles = {
  root: () => ({
    width: '100%',
  }),
  dropdownIndicator: () => ({
    color: '#555555',
    width: 30,
    height: 21,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000000' : '#555555',
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 16,
    fontSize: 14,
  }),
  control: () => ({
    fontSize: 14,
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 6,
    height: '100%',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  },
  placeholder: () => ({
    fontSize: 14,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.35,
    textAlign: 'left',
    color: '#999999',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    whiteSpace: 'nowrap',
    width: 'auto',
  }),
  indicatorSeparator: () => ({
      display: 'none'
  })
}

@inject('Request', 'Partner')
@observer
class MobileStep1Container extends React.Component {
  state = {
    step: 1,
    activeCount: 0,
    currentCount: 0,
  }

  handleChange = (value) => {
    const { Request } = this.props;
    Request.setInputPhone(value);
  }

  content1 = () => {
    const {Request, Partner} = this.props;
    const dueArray = [
      {label: '1 ??????', value: 1},
      {label: '2 ??????', value: 2},
      {label: '3 ??????', value: 3},
      {label: '4 ??????', value: 4},
      {label: '5 ??????', value: 5},
      {label: '6 ??????', value: 6},
      {label: '7 ??????', value: 7},
      {label: '8 ??????', value: 8},
      {label: '9 ??????', value: 9},
      {label: '10 ??????', value: 10},
      {label: '11 ??????', value: 11},
      {label: '12 ??????', value: 12},
    ];
    const costArray = [
      {label: '100 ?????? ??????', value: '100 ?????? ??????'},
      {label: '100 ?????? ~ 300 ??????', value: '100 ?????? ~ 300 ??????'},
      {label: '300 ?????? ~ 500 ??????', value: '300 ?????? ~ 500 ??????'},
      {label: '500 ?????? ~ 1000 ??????', value: '500 ?????? ~ 1000 ??????'},
      {label: '1000 ?????? ~ 2000 ??????', value: '1000 ?????? ~ 2000 ??????'},
      {label: '2000 ?????? ~ 3000 ??????', value: '2000 ?????? ~ 3000 ??????'},
      {label: '3000 ?????? ~ 5000 ??????', value: '3000 ?????? ~ 5000 ??????'},
      {label: '5000 ?????? ~ 1 ??????', value: '5000 ?????? ~ 1 ??????'},
      {label: '1 ?????? ~ 2 ??????', value: '1 ?????? ~ 2 ??????'},
      {label: '2 ?????? ??????', value: '2 ?????? ??????'}
    ];
     return(
     <div style={{width: '100%'}}>
       <Header>
         ?????? ??????
       </Header>
       <SelectRow>
        <input style={{display: 'none'}} value={Request.select_big ? Request.select_big.maincategory : ''} class="Input"/>
        <Select
            width={'100%'}
            styles={customStyles} options={Request.big_category_list} value={Request.select_big}
            getOptionLabel={(option) => option.maincategory} placeholder='????????? ??????????????????' onChange={Request.setBigCategory}
          />
        <div style={{marginRight: 8}}/>

        <input style={{display: 'none'}} value={Request.select_mid ? Request.select_mid.category : ''} class="Input"/>
        <Select
            width={'100%'}
            styles={customStyles} options={Request.mid_category_list} value={Request.select_mid}
            getOptionLabel={(option) => option.category} placeholder='????????? ??????????????????' onChange={Request.setMidCategory}
          />
        </SelectRow>
        <Header style={{marginTop: 22}}>
            ?????? ??????
        </Header>
        <SelectRow style={{width: '50%'}}>
          <input style={{display: 'none'}} value={Request.input_price ? Request.input_price.value : ''} class="Input"/>
          <Select
            width={'100%'}
            styles={customStyles} options={costArray} value={Request.input_price}
            getOptionLabel={(option) => option.label} placeholder='????????? ??????????????????.' onChange={Request.setPrice}
          />
        </SelectRow>
          <Header style={{marginTop: 22}}>
            ?????? ?????? ??????
          </Header>
        <SelectRow style={{width: '50%'}}>
          <input style={{display: 'none'}} value={Request.input_day ? Request.input_day.value : ''} class="Input"/>
          <Select
            width={'100%'}
            styles={customStyles} options={dueArray} value={Request.input_day}
            getOptionLabel={(option) => option.label} placeholder='??????' onChange={Request.setDue}
          />
        </SelectRow>
     </div>
    );
  }
  content2 = () => {
    const {Request, Partner} = this.props;

    return(
     <div style={{width: '100%'}}>
       <Header>
         ?????????
       </Header>
       <SelectRow>
         <InputComponent
            width="100%"
            class="Input"
            placeholder="ex) ??????????????? ?????? ??? ??? ????????? ?????? ??????"
            value={Request.input_name}
            onChange={Request.setInputName}
          />
       </SelectRow>
       <Header style={{marginTop: 22}}>
            ????????????
       </Header>
       <SelectRow>
          <PhoneInputComponent
            width = {'100%'}
            height = {34}
            phd1 = "010"
            phd2 = "1234"
            phd3 = "5678"
            space = {8}
            updater = {Request.input_phone}
            onChange={this.handleChange.bind(this)}
          />
       </SelectRow>
       <Header style={{marginTop: 22}}>
        ?????? ?????? ??????
       </Header>

       <SelectRow style={{width: "100%"}}>
         <InputComponent
            file={true}
          />
       </SelectRow>
     </div>
    );
  }
  contenthandler = () => {
    const { page } = this.props;
    const content1  = this.content1();
    const content2 = this.content2();
    return (
      <RequestInfoBox>
        { page == 1 ? ( content1 ) : ( content2 ) }
      </RequestInfoBox>
    )
  }

  render() {
    const { Request } = this.props;
    const content = this.contenthandler();

    return (
      <MobileRequestCardContainer title={"?????? ?????? ?????? " + Request.step1_index + "/2"} content = {content}>
      </MobileRequestCardContainer>
    )
  }
}
export default MobileStep1Container;

const Header = styled(Content.FontSize15)`
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: -0.38px;
    text-align: left;
    color: #282c36;
    height: 22px;
    margin-top: 32px;
    display: flex;
    align-items: center;
`
const SelectRow = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`
const Select = styled(SelectComponent)`
    width: 100%;
    height: 34px;
    object-fit: contain;
    border-radius: 3px;
    border: solid 1px #c6c7cc;
    background-color: #ffffff;
`
const RequestInfoBox = styled.div`
  width: 100%;
  height: 256px;
  margin-bottom: 114px;
  display: inline-flex;
  justify-content: center;
  > div {
    width: 100%;
    @media (min-width: 0px) and (max-width: 375px) {
      width: 100%;
    }
  }
`

