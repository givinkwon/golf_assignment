import React, { Component } from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Buttonv1 from "components/Buttonv1";
import TaskBarContainer from "./TaskBar"
import PaymentBox from "containers/Request/Payment"
//material-ui
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import STLViewer from 'stl-viewer'

//Slider
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import EstimateLogoSlider from './EstimateSheetLogoSlider'

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";
import ConsultantBoxContainer from './ConsultantBox'
import Select from '../../components/Select';
import PaymentContainer from './Payment';

//images
const ThumbImage = "/static/images/request/RequestCard/Thumb.png";
const HeaderImg = "/static/images/request/Step3/Step3_Header.png";
const DropdownArrow1 = "/static/images/request/Step3/Step3_Dropdown1.png";
const DropUpArrow1 = "static/images/request/Step3/Step3_DropUp1.png";
const DropdownArrow2 = "/static/images/request/Step3/Step3_Dropdown2.png";
const DropUpArrow2 = "/static/images/request/Step3/Step3_DropUp2.png";
const Consultant1 = "/static/images/request/Step3/Step3_Consultant1.png";
const Consultant2 = "/static/images/request/Step3/Step3_Consultant2.png";
const Consultant3 = "/static/images/request/Step3/Step3_Consultant3.png";



const styles = {
  table: {
    minWidth: 650
  },
  row:{
    height:'auto',
  },
  cell:{
    border:'1px solid #c6c7cc'
  }
};


function createData(title, content, note) {
  return { title, content, note };
}


@inject('Request','Proposal','DetailQuestion','ManufactureProcess')
@observer
class Step3Container extends Component {

  static defaultProps = { title: '??? ??? ???' };

  buttonClick = () => {
    const { Request } = this.props;
    dataLayer.push({'event':'Step3Complete'});
    Request.step_index = 4;
  }

  state = {
    percentage: 100,
    showEstimateDrop:false,
    showEstimateDetail:true,
    showConsultantDrop: true,
    showConsultantDetail: 'none',
    display: true,
  }

  ConsultantInfo=[
    {
      Img:Consultant1,
      Name:"?????????",
      Job:"????????????",
      Text1:"??? ???????????? ??????????????????/??????",
      Text2:"(?????????/????????????, ??????????????????, ESCO/BOT ???)",
      Text3:"???????????? ???????????? ???????????????(2002), ????????????/??????????????? 15??? ??????"
    },
    {
      Img:Consultant2,
      Name:"?????????",
      Job:"????????????",
      Text1:"???????????? ??????/?????????????????? ?????? 25???, ????????? ?????? ?????? ??????",
      Text2:"(????????????, ?????????, ????????????, ????????? ,BA SPEAKER, ?????????????????? ???)",
      Text3:"6-????????? Black belt(?????????????????? 2003)\n??????????????? ????????? ?????????(2007)\nCE-Show innovation Award(2016)"
    },
    {
      Img:Consultant3,
      Name:"?????????",
      Job:"????????????",
      Text1:"??????/?????? ?????? ?????? 29???, ??? ?????? ?????? ?????? ",
      Text2:"??????????????? (???)K.O.T.I ?????? ????????? ??????(2008)",
      Text3:"?????? (???) ???????????? ?????? ?????? ?????????(2011)"
    },
  ]
  handleChange = (event, newValue) => {
    this.setState({ percentage: newValue })
  }

  // handlePayment =() =>
  // {
  //   const {ManufactureProcess} = this.props;

  //   if(ManufactureProcess.process)
  // }
  CustomSliderThumbComponent = (props) => {
    const {percentage} = this.state;
    return (
      <div {...props}>
        <img src={ThumbImage} />
        <ThumbText> {percentage}% </ThumbText>
      </div>
    );
  }

  detailDown = (type) => {
    const { showEstimateDrop, showEstimateDetail,showConsultantDrop,showConsultantDetail } = this.state;
    if(type==1)
    {
      this.setState({ showEstimateDrop:'none', showEstimateDetail: true })
    }
    else
    {
      this.setState({ showConsultantDrop:'none', showConsultantDetail: true })
    }
  }

  detailUp = (type) => {
    const { showEstimateDrop, showEstimateDetail,showConsultantDrop,showConsultantDetail } = this.state;
    if(type==1)
    {
      this.setState({ showEstimateDrop:true, showEstimateDetail: 'none' })
    }
    else
    {
      this.setState({ showConsultantDrop:true, showConsultantDetail: 'none' })
    }
  }

  componentDidMount() {
    const { Proposal, DetailQuestion } = this.props;
    // Proposal.loadEstimateInfo(315);
  }

  render() {
    const { percentage, showEstimateDrop, showEstimateDetail,showConsultantDrop,showConsultantDetail } = this.state;
    const { Proposal, DetailQuestion,ManufactureProcess} = this.props;
    const estimateData = Proposal.estimateData;

    const rows1 = [
      createData('????????????', Proposal.estimate_year + '.' + Proposal.estimate_month + '.' + Proposal.estimate_day, ''),
      createData('????????????', 'C8-' + Proposal.estimate_year + Proposal.estimate_month + Proposal.estimate_day + '-' + estimateData.id, ''),
      //createData('?????????', estimateData.client, ''),
      createData('?????????', '????????? ?????? / (???)???????????????', 'TEL : 02 - 926 - 9967'),
      // createData('?????????', '????????? ?????? / (???) ???????????????', 'TEL : 02 - 926 - 9967')
    ];

    const rows2 = [
      createData('???????????????', estimateData.projectTitle, ''),
      createData('????????????', estimateData.period + '???', ''),
      createData('????????????', '?????? 50%, ?????? 50%', ''),
      createData('?????????', '??? '+Proposal.estimate_price, 'VAT ?????????'),
    ];

    const {classes} = this.props
    var message = '????????????';
    var rand2 = 28 + Math.floor(Math.random() * 38);

    if(DetailQuestion.message.includes(message) || ManufactureProcess.message.includes(message))
    {
      rows2.splice(1,1);
      rows2.pop();
      rows2.pop();
      rows2[3]= createData('?????? ??????', '?????? ??????????????? ????????? ???????????? ????????????.', 'VAT ?????????');
      rows2[4]= createData('?????? ??????', '?????? ??????????????? ????????? ???????????? ????????????.', 'VAT ?????????');
      if(ManufactureProcess.totalMinPrice > 0 && ManufactureProcess.MinPrice > 0){
        console.log(ManufactureProcess.totalMinPrice, 2)
        rows2.splice(1,1);
        rows2.pop();
        rows2.pop();
        rows2[3]= createData('?????? ??????', Math.round(ManufactureProcess.totalMinPrice/10000) +'??????' +' ~ ' + Math.round(ManufactureProcess.totalMaxPrice/10000) + '??????', 'VAT ?????????');
        rows2[4]= createData('?????? ??????', Math.round(ManufactureProcess.MinPrice/10)*10 +'???' +' ~ ' + Math.round(ManufactureProcess.MaxPrice/10)*10 + '???/???(MOQ 1000???)', 'VAT ?????????');
      }

      //??????????????? ????????? ?????? ?????? ?????????
      if(ManufactureProcess.SelectedItem.process!=1)
      {
        rows2.splice(3,1);
        rows2.splice(4,1);
        rows2[3]= createData('?????????', Math.round(ManufactureProcess.MinPrice/100)*100 +'???' + '/???', 'VAT ?????????');
      }

    }
    return (
      <Card>
        <HeaderBackground>
          <Logo>
            <img src={HeaderImg} />
          </Logo>
          <Header>
            {this.props.title}
          </Header>
          <HeaderTextBox>
            <Content.FontSize24 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#282c36'}>
              ?????????
            </Content.FontSize24>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Content.FontSize24 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#282c36'}>
              {(ManufactureProcess.totalMinPrice > 0 && ManufactureProcess.MinPrice > 0) ? '?????? ????????? ??????' :  Proposal.estimate_price + '???' }
              </Content.FontSize24>
              <div style={{ marginLeft: 20 }}>

              </div>
            </div>
          </HeaderTextBox>
          <DetailButtonBox>

            {showEstimateDrop == true ? (
                  <>
                    <Title.FontSize20 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                        ????????? ????????????
                    </Title.FontSize20>
                    <img src={DropdownArrow1} onClick={()=>{this.detailDown(1);}} style={{marginLeft:12}}/>
                  </>
                ) : (
                    <>
                      <Title.FontSize20 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                          ????????? ??????
                      </Title.FontSize20>
                      <img src={DropUpArrow1} onClick={()=>{this.detailUp(1);}} style={{marginLeft:20}}/>
                    </>
                  )
                }
          </DetailButtonBox>
          <DetailContainer style={{display: showEstimateDetail}}>
            <Table className={classes.table} size="small">
              <TableBody>
                  { rows1.map((row) => (
                <TableRow className ={classes.row} key={row.title}>
                  <TableCell className ={classes.cell} component="th" scope="row" width='154'>
                    <Font16 style={{marginRight:48,textAlign:'right'}}>{row.title}</Font16>
                  </TableCell>
                  <TableCell className ={classes.cell} width='472'>
                    <Font16 style={{marginLeft:20,textAlign:'left'}}>{row.content}</Font16>
                  </TableCell>
                  <TableCell className ={classes.cell} width='268'>
                    <Font16 style={{marginRight:52,textAlign:'right'}}>{row.note}</Font16>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>

            </Table>

            <Font16 style={{margin:'30px 0 30px 0',textAlign:'center',fontWeight:'bold'}}>
                  * ????????? ?????? ??????????????? ???????????????. ????????? ?????? ???????????? ????????? ??????????????? ?????? ????????????.
            </Font16>
            <Table className={classes.table} size="small">
              <TableBody>
                  {rows2.map((row) => (
                <TableRow className ={classes.row} key={row.title}>
                  <TableCell className ={classes.cell} component="th" scope="row" width='154'>
                    <Font16 style={{marginRight:48,textAlign:'right'}}>{row.title}</Font16>
                  </TableCell>
                  <TableCell className ={classes.cell} width='472'>
                  <Font16 style={{marginLeft:20,textAlign:'left'}}>{row.content}</Font16>
                    </TableCell>
                    <TableCell className ={classes.cell} width='268'>
                    <Font16 style={{marginRight:52,textAlign:'right'}}>{row.note}</Font16>
                  </TableCell>
                </TableRow>
              ))}


              </TableBody>

            </Table>

            <Font16 style={{marginTop:40,textAlign:'center',fontWeight:'bold',color:'#0a2165',marginBottom:40}}>
              *?????? ????????? ?????? ??????????????? ?????? ????????? ??? ????????????.<br/>
              ?????? ????????? ????????? ?????????????????? 1:1???????????? ??????????????????.
            </Font16>

            {/* ?????? ???????????? */}

            
            {(DetailQuestion.message.includes(message) || ManufactureProcess.message.includes(message)) ? 
              <StyledStlViewer
              model={ManufactureProcess.EstimateDataForDrawing.stl_file} // stl?????? ??????
              width={400}                                  // ??????
              height={400}                                 // ??????
              modelColor='red'                             // ???
              backgroundColor='white'                    // ?????????
              rotate={true}                                // ???????????? ??????
              orbitControls={true}                         // ????????? ?????? ??????
            />
           : (<TaskBarContainer/>)}
          </DetailContainer>

        </HeaderBackground>
        {
          (ManufactureProcess.SelectedItem && (ManufactureProcess.SelectedItem.process==2 || ManufactureProcess.SelectedItem.process==3))? (
            <PaymentBox/>
          ) :(
            <ContentBox>
              <ContentHeader>
                ????????????????????? ???????????? {estimateData.projectTitle}??? ????????????<br/>
                {rand2} ?????? ?????? ??????????????? ????????????.
              </ContentHeader>

              <CustomSlider value={percentage}/>
              <ThumbText> {percentage}% </ThumbText>
              <EstimateLogoSlider />
              <ConsultantHeader>
                ?????? ???????????? : ????????? ?????? ??????  ??? 2???
              </ConsultantHeader>

              <ConsultantBoxContainer Info={this.ConsultantInfo[0]}/>

              {/* ????????? ????????? ??????????????? ?????? map?????? ????????? */}
              <DetailContainer style={{display: showConsultantDetail,paddingBottom:20}}>
                <ConsultantBoxContainer Info={this.ConsultantInfo[1]}/>
                <ConsultantBoxContainer Info={this.ConsultantInfo[2]}/>
              </DetailContainer>

              <ConsultantDetailButtonBox>
                {showConsultantDrop == true ? (
                  <>
                    <Font18 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                      ??? ??????
                    </Font18>
                    <img src={DropdownArrow2} onClick={()=>{this.detailDown(2);}} />
                  </>
                ) : (
                  <>
                    <Font18 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                      ??????
                    </Font18>
                    <img src={DropUpArrow2} onClick={()=>{this.detailUp(2);}}/>
                  </>
                )
                }
              </ConsultantDetailButtonBox>

              <Font16 style={{marginTop:100,textAlign:'center'}}>
                ?????? ??????????????? ?????? ????????? ?????? ????????? ????????? ????????? ???????????????
              </Font16>
              <Buttonv1 onClick={ this.buttonClick } fontSize={20} style={{ margin: '0 auto', marginTop: 20, marginBottom: 60, width: 260, height: 50 }}>
                1:1 ????????? ??????
              </Buttonv1>
            </ContentBox>
          )
        }

      </Card>
    )
  }
}

export default withStyles(styles)(Step3Container);

const StyledStlViewer=styled(STLViewer)`
  margin:0 auto;
`

const Font16 = styled(Content.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  color: #282c36;
`

const Font18 = styled(Content.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.18px;
  color: #282c36;
`

const DetailButtonBox = styled.div`
  background-color:#f6f6f6;
  height:59px;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor: pointer;
`
const EstimateDetailContainer = styled.div`
  margin-left:63px;
  padding-bottom:20px;
`
const DetailContainer = styled.div`
  // margin-left:63px;
  margin-top:-1px;
  // padding-bottom:100px;
  background-color:white;

  .MuiTableCell-sizeSmall
  {
    padding:4px 0 4px 0;
  }

  .MuiTableCell-sizeSmall:last-child
  {
    padding-right:0;
  }

  
`

const ConsultantDetailButtonBox = styled.div`
  display:flex;
  width:727px;
  margin:0 auto;
  margin-top:20px;
  justify-content:flex-end;
  align-items:center;
  cursor: pointer;
  >img
  {
    width:13px;
    height:7px;
    margin-left:12px;
    margin-top:3px;
  }
`

const Card = styled.div`
  width: 894px;
  // height: 1170px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 200px 280px;
  display: inline;
  float: right;
`
const HeaderBackground = styled.div`
  // background-color: #0a2165;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`
const HeaderTextBox = styled.div`
  display:flex;
  justify-content:space-between;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-bottom:18px;
  padding-top:12px;
`

const Logo = styled.div`
    margin-left: 5.4%;
    padding-top:40px;
`

const History = styled(Title.FontSize16)`
  text-align:left;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  color: #282c36;
  margin-left:63px;
`
const Header = styled(Content.FontSize32)`
  width: auto;
  height: calc(6.7%);
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.8px;
  text-align: center;
  color: #282c36;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 27px;
  padding-bottom:41px;
  border-bottom: solid 1px #999999;
  object-fit: contain;
`

const ContentHeader = styled(Title.FontSize20)`
  width: auto;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.9;
  letter-spacing: -0.5px;
  text-align: center;
  color: #282c36;
  object-fit: contain;
`

const ContentBox = styled.div`
  // height: calc(46.3%);
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 100px;
`

const CustomSlider = withStyles({
  root: {
    color: '#0933b3',
    height: 7,
    width: '76%',
    marginLeft: '12%',
    marginRight: '12%',
    marginTop:'2%',
    borderRadius: 10,
    cursor:'default'
  },
  thumb: {
    // top: -10,
    // paddingRight: 20,
    // content: "apapap"
    display:'none'
  },
  track: {
    height: 7,
    borderRadius: 10,
  },
  rail: {
    color: '#c6c7cc',
    opacity: 1,
    height: 7,
    borderRadius: 10,
  },
})(Slider);


const ConsultantHeader = styled(Title.FontSize20)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
  object-fit: contain;
  // margin-left:63px;
  // margin-right:26px;
`

const ThumbText = styled(Content.FontSize18)`
  position: relative;
  text-align:center;
  color: #0933b3;
  font-weight: bold;
`
