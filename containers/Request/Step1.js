import React from 'react'
import styled, {css, keyframes } from 'styled-components'
import { inject, observer } from 'mobx-react'
import Router from "next/router";

import RequestCardContainer from './RequestCard';
import * as Title from 'components/Title';
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'
import SelectComponent from 'components/Select';
import InputComponent from 'components/Input2';
import PhoneInputComponent from 'components/PhoneInput';
import CheckBoxComponent from 'components/CheckBox';
import AnimatedSelectBox from 'components/AnimatedSelectBox';
import { BoxBufferGeometry } from 'three';
import { NonceProvider } from 'react-select';

const customStyles = {
  dropdownIndicator: () => ({
    color: '#555555',
    width: 40,
    height: 40,
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
    fontSize: 16,
  }),
  control: () => ({
    fontSize: 16,
    border: '1px solid #e6e6e6',
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 6,
    padding: 4,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition};
  }
}



@inject('Request', 'Partner')
@observer
class Step1Container extends React.Component {
  
  state = {
    step: 1,
    activeCount: 0,
    currentCount: 0,
    // list:[false,false,false,false,],
    check:'none',
  }
  selectCheck = (idx) =>{
    const{check} = this.state;
    if(check==idx){
      this.setState({check: 'none'})
    }
    else{
      this.setState({check: idx})
    }
  }
  selectBlur = () =>{
    const{check} = this.state;
    this.setState({check: 'none'})
  }
  activeHandler = (idx) =>{
    const{check} = this.state;
    if(check == idx){
      return true;
    }
    else{
      return false;
    }
  }


  // selectClick = (idx) => {
  //   const{list} = this.state;
  //   this.setState({list: list.map((item, j) => {if(j==idx){return true;}})});

  // }

  // selectOut= (idx) =>{
  //   const{list} = this.state;
  //   this.setState({list: list.map((item, j) => {if(j==idx){return false;}})});

  // }

  handleChange = (value) => {
    const { Request } = this.props;
    Request.setInputPhone(value);
  }

  content1 = () => {
    const {Request, Partner} = this.props;
    const {check} = this.state;
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
       
     <>
       <Header> 
         ?????? ??????
       </Header>

        <SelectRow>      
        <AnimatedSelectBox onClick ={()=>this.selectCheck(0)} onBlur = {this.selectBlur} active={this.activeHandler(0)}> 
          <input style={{display: 'none'}} value={Request.select_big ? Request.select_big.maincategory : ''} class="Input"/>   
          <SelectComponent
            styles={customStyles} options={Request.big_category_list} value={Request.select_big} 
            getOptionLabel={(option) => option.maincategory} placeholder='????????? ??????????????????' onChange={Request.setBigCategory}
          
          />
        </AnimatedSelectBox >
        <div style={{marginRight: 38}}/>
  
        <AnimatedSelectBox onClick ={()=>this.selectCheck(1)} onBlur = {this.selectBlur} active={this.activeHandler(1)}>
        <input style={{display: 'none'}} value={Request.select_mid ? Request.select_mid.category : ''} class="Input"/>
        <SelectComponent
             styles={customStyles} options={Request.mid_category_list} value={Request.select_mid}
            getOptionLabel={(option) => option.category} placeholder='????????? ??????????????????' onChange={Request.setMidCategory}
          />
        </AnimatedSelectBox>
        </SelectRow>
       <Header style={{marginTop: 30}}> 
            ?????? ??????
        </Header>
        <SelectRow style={{width: 380}}>
          <AnimatedSelectBox onClick ={()=>this.selectCheck(2)} onBlur = {this.selectBlur} active={this.activeHandler(2)}>
          <input style={{display: 'none'}} value={Request.input_price ? Request.input_price.value : ''} class="Input"/>
          <SelectComponent
             styles={customStyles} options={costArray} value={Request.input_price}
            getOptionLabel={(option) => option.label} placeholder='????????? ????????? ?????????.' onChange={Request.setPrice}
          />
          </AnimatedSelectBox>
        </SelectRow>
          <Header style={{marginTop: 30}}>
            ?????? ??????
          </Header>
        <SelectRow >
          <AnimatedSelectBox onClick ={()=>this.selectCheck(3)} onBlur = {this.selectBlur} active={this.activeHandler(3)} >
          <input style={{display: 'none'}} value={Request.input_day ? Request.input_day.value : ''} class="Input"/>
          <SelectComponent
            styles={customStyles} options={dueArray} value={Request.input_day}
            getOptionLabel={(option) => option.label} placeholder='??????' onChange={Request.setDue}
          />
          </AnimatedSelectBox>
        </SelectRow>

       {/* <SelectRow>      
        <AnimatedSelectBox active={this.state.list[0]===true} onClick ={()=>this.state.list[0]? this.selectOut(0):this.selectClick(0)}  onBlur = {()=>this.selectOut(0)} >
          <input style={{display: 'none'}} value={Request.select_big ? Request.select_big.maincategory : ''} class="Input"/>   
          <SelectComponent
             styles={customStyles} options={Request.big_category_list} value={Request.select_big} 
          getOptionLabel={(option) => option.maincategory} placeholder='????????? ??????????????????' onChange={Request.setBigCategory}
          />
        </AnimatedSelectBox>
        <div style={{marginRight: 38}}/>
  
        <AnimatedSelectBox active={this.state.list[1]===true} onClick ={()=>this.state.list[1]? this.selectOut(1):this.selectClick(1)}  onBlur = {()=>this.selectOut(1)} >
        <input style={{display: 'none'}} value={Request.select_mid ? Request.select_mid.category : ''} class="Input"/>
        <SelectComponent
             styles={customStyles} options={Request.mid_category_list} value={Request.select_mid}
            getOptionLabel={(option) => option.category} placeholder='????????? ??????????????????' onChange={Request.setMidCategory}
          />
        </AnimatedSelectBox>
        </SelectRow>
        <Header style={{marginTop: 30}}> 
            ?????? ??????
        </Header>
        <SelectRow style={{width: 380}}>
          <AnimatedSelectBox active={this.state.list[2]===true} onClick ={()=>this.state.list[2]? this.selectOut(2):this.selectClick(2)}  onBlur = {()=>this.selectOut(2)}>
          <input style={{display: 'none'}} value={Request.input_price ? Request.input_price.value : ''} class="Input"/>
          <SelectComponent
             styles={customStyles} options={costArray} value={Request.input_price}
            getOptionLabel={(option) => option.label} placeholder='????????? ????????? ?????????.' onChange={Request.setPrice}
          />
          </AnimatedSelectBox>
        </SelectRow>
          <Header style={{marginTop: 30}}>
            ?????? ??????
          </Header>
        <SelectRow >
          <AnimatedSelectBox active={this.state.list[3]===true} onClick ={()=>this.state.list[3]? this.selectOut(3):this.selectClick(3)}  onBlur = {()=>this.selectOut(3)}>
          <input style={{display: 'none'}} value={Request.input_day ? Request.input_day.value : ''} class="Input"/>
          <SelectComponent
            styles={customStyles} options={dueArray} value={Request.input_day}
            getOptionLabel={(option) => option.label} placeholder='??????' onChange={Request.setDue}
          />
          </AnimatedSelectBox>
        </SelectRow>  */}
     </>
    );
  }
  content2 = () => {
    const {Request, Partner} = this.props;

    return(
     <>
       <Header> 
         ?????????
       </Header>
       <SelectRow>
         <InputComponent
            class="Input"
            placeholder="ex) ??????????????? ?????? ??? ??? ????????? ?????? ??????"
            value={Request.input_name}
            onChange={Request.setInputName}
          />
       </SelectRow>
       <Header style={{marginTop: 30}}> 
            ????????????
       </Header>
       <SelectRow>
          <PhoneInputComponent
            phd1 = "010"
            phd2 = "1234"
            phd3 = "5678"
            space = {18}
            updater = {Request.input_phone}
            onChange={this.handleChange.bind(this)}
          />
       </SelectRow>
       <Header style={{marginTop: 30}}>
         ?????? ?????? ??????
       </Header>

       <SelectRow style={{width: "100%"}}>
         <InputComponent
            file={true}
          />
       </SelectRow>
     </>
    );
  }
  contenthandler = () => {
    const { page } = this.props;
    const content1  = this.content1();
    const content2 = this.content2();
    return (
      <div style={{width: '100%', height: 470}}>
        { page == 1 ? ( content1 ) : ( content2 ) }
      </div>
    )
  }

  render() {
    const { Request, Partner } = this.props;
    const content1  = this.content1();
    const content2 = this.content2();
    const content = this.contenthandler();

    return (
      <RequestCardContainer title={"?????? ?????? ??????"} content = {content}>
      </RequestCardContainer>
    )
  }
}
export default Step1Container;

const Header = styled(Title.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
`
const SelectRow = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  > span {
    margin-right: 23px;
    margin-left: 23px;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: -0.24px;
    text-align: left;
    color: #282c36;
  }
`
const Select = styled(SelectComponent)`
cursor: pointer;
  width: 380px;
  @keyframes fadeIn {  
    0% {
      opacity:0.5;
      transform: translateY(-10px);
    }
    100% {
      opacity:1;
      transform: translateY(0);
    }
  }

  >div: nth-of-type(2){
    -webkit-font-smoothing: antialiased;
    animation: fadeIn 0.2s ease-out;
  }
  ${ props => props.active && css`
  svg{
    @keyframes select{
      0% {
        transform: skewY(-180deg);
      }
    }

    animation: select 0.4s ease-out;
    transform: rotate(-180deg);
  }
  `}

  ${props => !props.active && css`
  svg{
    @keyframes selectOut{
      0% {
        transform: rotate(-180deg);
      }
    }
    animation: selectOut 0.4s ;
  }
`}

`

const Box = styled.div`
`
