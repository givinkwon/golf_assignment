import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Buttonv1 from "components/Buttonv1";
import TaskBarContainer from "./MobileTaskBar"

//material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import STLViewer from 'stl-viewer'

//Slider
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
// import EstimateLogoSlider from './EstimateSheetLogoSlider'
import EstimateLogoSlider from './MobileEstimateLogoSlider'

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";
// import ConsultantBoxContainer from './ConsultantBox'
import MobileStepContainer from '../../../components/MobileStep';

//images
const ThumbImage = "/static/images/request/RequestCard/Thumb.png";
const HeaderImg = "/static/images/request/Step3/Step3_Header.png";
const DropdownArrow1 = "/static/images/request/Step3/Step3_Dropdown1.png";
const DropUpArrow1 = "static/images/request/Step3/Step3_DropUp1.png";
const DropdownArrow2 = "/static/images/request/Mobile/MobileStep3/step3_dropdown2.png";
const DropUpArrow2 = "/static/images/request/Mobile/MobileStep3/step3_dropup2.png";
const Consultant1 = "/static/images/request/Step3/Step3_Consultant1.png";
const Consultant2 = "/static/images/request/Step3/Step3_Consultant2.png";
const Consultant3 = "/static/images/request/Step3/Step3_Consultant3.png";
const styles = {
  table: {
    // minWidth: 650
  },
  row:{
    // height:'49px',
  },
  cell:{
    border:'1px solid #c6c7cc',
    height:'49px'
  }
};


function createData(title, content, note) {
  return { title, content, note };
}


@inject('Request','Proposal','DetailQuestion','ManufactureProcess')
@observer
class MobileStep3Container extends Component {

  static defaultProps = { title: '??? ??? ???' };

  buttonClick = () => {
    const { Request } = this.props;
    window.scrollTo(0, 0)
    dataLayer.push({'event':'Step3Complete'});
    Request.step_index = 4;
  }

  state = {
    percentage: 100,
    showEstimateDrop:true,
    // showEstimateDetail:'none',
    showEstimateDetail:true,
    showConsultantDrop: true,
    showConsultantDetail: 'none',
    arrowChecked:null
  }

  ConsultantInfo=[
    {
      Img:Consultant1,
      Name:"?????????",
      Job:"????????????",
      Text1:"??? ???????????? ??????????????????/??????",
      Text2:"(?????????/????????????, ??????????????????, ESCO/BOT ???)",
      Text3:"???????????? ???????????? ???????????????(2002),\n ????????????/??????????????? 15??? ??????"
    },
    {
      Img:Consultant2,
      Name:"?????????",
      Job:"????????????",
      Text1:"???????????? ??????/?????????????????? ?????? 25???,\n????????? ?????? ?????? ??????",
      Text2:"(????????????, ?????????, ????????????,\n ????????? ,BA SPEAKER, ?????????????????? ???)",
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
  ];

  handleChange = (event, newValue) => {
    this.setState({ percentage: newValue })
  }
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

  consultantDetailDown=(idx)=>
  {
    if(idx==this.state.arrowChecked)
    {
      this.setState({ arrowChecked:null ,showConsultantDetail: 'none'})
    }
    else{
      this.setState({ arrowChecked:idx,showConsultantDetail: true})
    }

  }

  arrowHandler=(idx)=>
  {
    const {arrowChecked} = this.state;
    if(idx==arrowChecked)
    {
      return DropUpArrow2;
    }
    else{
      return DropdownArrow2;
    }
  }

  activeHandler=(idx)=>
  {
    const {arrowChecked} = this.state;
    if (arrowChecked == null) {
      return false;
    }
    if(idx==arrowChecked)
    {
      return false;
    }
    else{
      return true;
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
      createData('?????????', '????????? ?????? / \n (???)???????????????', '02 - 926 - 9967'),
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

    if(DetailQuestion.message.includes(message))
    {
      rows2.splice(1,1);
      rows2.pop();
      rows2.pop();
      rows2[3]= createData('?????? ??????', '?????? ??????????????? ????????? ???????????? ????????????.', 'VAT ?????????');
      rows2[4]= createData('?????? ??????', '?????? ??????????????? ????????? ???????????? ????????????.', 'VAT ?????????');
      console.log(ManufactureProcess.totalMinPrice, 1)
      if(ManufactureProcess.totalMinPrice > 0 && ManufactureProcess.MinPrice > 0){
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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
    <TopHeader>
        <span>?????? ????????? ??????</span>
        <MobileStepContainer/>
    </TopHeader>

      <Card>
        <HeaderBackground>
          <Header>
            {this.props.title}
          </Header>
          <HeaderTextBox>
            <Content.FontSize15 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#282c36'}>
              ?????????
            </Content.FontSize15>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Content.FontSize15 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#282c36'}>
                {Proposal.estimate_price} ???
              </Content.FontSize15>
            </div>
          </HeaderTextBox>
          <DetailButtonBox>

            {showEstimateDrop == true ? (
                  <>
                    <Content.FontSize15 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                        ????????? ????????????
                    </Content.FontSize15>
                    <img src={DropdownArrow1} onClick={()=>{this.detailDown(1);}} style={{marginLeft:12}}/>
                  </>
                ) : (
                    <>
                      <Content.FontSize15 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                          ????????? ??????
                      </Content.FontSize15>
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
                  <TableCell className ={classes.cell} component="th" scope="row" width='83'>
                    <Font13 style={{textAlign:'center',color:'#86888c'}}>{row.title}</Font13>
                  </TableCell>
                  <TableCell className ={classes.cell} width='144'>
                    <Font13 style={{marginLeft:20,textAlign:'left'}}>{row.content}</Font13>
                    {/* <Font13 style={{textAlign:'right',marginRight:14}}>{row.note}</Font13> */}
                  </TableCell>
                  <TableCell className ={classes.cell} width='120'>
                    <Font13 style={{marginRight:14,textAlign:'right',color:'#86888c'}}>{row.note}</Font13>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>

            </Table>

            <Font13 style={{margin:'30px 0 30px 0',textAlign:'center',fontWeight:'bold'}}>
                  * ????????? ?????? ??????????????? ???????????????.<br/>
                  ????????? ?????? ???????????? ????????? ??????????????? ?????? ????????????.
            </Font13>
            <Table className={classes.table} size="small">
              <TableBody>
                  {rows2.map((row) => (
                <TableRow className ={classes.row} key={row.title}>
                  <TableCell className ={classes.cell} component="th" scope="row" width='83'>
                    <Font13 style={{textAlign:'center',color:'#86888c'}}>{row.title}</Font13>
                  </TableCell>
                  <TableCell className ={classes.cell} width='144'>
                  <Font13 style={{marginLeft:20,textAlign:'left'}}>{row.content}</Font13>
                    </TableCell>
                    <TableCell className ={classes.cell} width='120'>
                    <Font13 style={{marginRight:14,textAlign:'right',color:'#86888c'}}>{row.note}</Font13>
                  </TableCell>
                </TableRow>
              ))}

              </TableBody>

            </Table>

            <Font13 style={{marginTop:35,textAlign:'center',fontWeight:'bold',color:'#0a2165',marginBottom:35}}>
              *?????? ???????????? ?????? ??????????????? <br/>
              ?????? ????????? ??? ????????????.<br/>
              ?????? ????????? ????????? ??????????????????<br/>
              1:1???????????? ??????????????????.
            </Font13>

            {/* ?????? ???????????? */}


            {DetailQuestion.message.includes(message) ?
            <StyledStlViewer
              model={ManufactureProcess.EstimateDataForDrawing.stl_file} // stl?????? ??????
              width={300}                                  // ??????
              height={300}                                 // ??????
              modelColor='red'                             // ???
              backgroundColor='white'                    // ?????????
              rotate={true}                                // ???????????? ??????
              orbitControls={true}                         // ????????? ?????? ??????
            />
           : (
            <TaskBarContainer/>
            )}
          </DetailContainer>


        </HeaderBackground>

        <ContentBox>
          <ContentHeader>
            ???????????? {estimateData.projectTitle} ?????? ?????????<br/>
            ???????????? <span style={{fontSize:16,color:'#0933b3'}}>{rand2}</span> ?????? ?????? ??????????????? ?????????????????????.
          </ContentHeader>

          <EstimateLogoSlider />

          {/* <ThumbText> {percentage}% </ThumbText>
          <CustomSlider value={percentage}/> */}



          {/* <ConsultantBoxContainer Info={this.ConsultantInfo[0]}/> */}
          <ConsultantBox>
            <ConsultantHeader>
                ?????? ???????????????<br/>
                ??????????????? ?????? ???????????? ????????? ????????????
            </ConsultantHeader>
            <ConsultantImgBox>
                {this.ConsultantInfo.map((Info,idx) => (
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <ConsultantImg active={this.activeHandler(idx)} onClick={()=>{this.consultantDetailDown(idx)}} src={Info.Img}/>
                        <Font15 fontWeight={'bold'} active={this.activeHandler(idx)}>{Info.Name}</Font15>
                        <Font13 active={this.activeHandler(idx)} style={{textAlign:'center'}}>{Info.Job}</Font13>
                        <img src={this.arrowHandler(idx)} onClick={()=>{this.consultantDetailDown(idx)}} style={{margin:'0 auto',marginTop:15}}/>
                    </div>
              ))}
            </ConsultantImgBox>
            <DetailContainer style={{display: showConsultantDetail,paddingTop:38}}>
                {this.state.arrowChecked!=null &&
                      <ConsultantTextBox>
                        <Font16>{this.ConsultantInfo[this.state.arrowChecked].Text1}</Font16>
                        <Font14>{this.ConsultantInfo[this.state.arrowChecked].Text2}</Font14>
                        <Font15 fontWeight={500} style={{marginTop: 34, color: '#414550',   lineHeight: '1.87', letterSpacing: '-0.38'}}>{this.ConsultantInfo[this.state.arrowChecked].Text3}</Font15>
                      </ConsultantTextBox>
                }
            </DetailContainer>
          </ConsultantBox>

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

          <Tail>
            1:1 ???????????? ???????????? ???????????? ?????? ????????????  <br/>
            ????????? ????????? ???????????????.
          </Tail>
          <Buttonv1 onClick={ this.buttonClick } style={{margin: 'auto', marginTop: 18, marginBottom: 42}}>
            1:1 ????????? ??????
          </Buttonv1>
        </ContentBox>
      </Card>
    </div>
    )
  }
}

export default withStyles(styles)(MobileStep3Container);

const ConsultantTextBox = styled.div`
  width:100%;
  display: flex;
  flex-direction:column;
  // margin-left:36px;
  // margin-top:72px;
  justify-content:center;
  
`

const ConsultantImg = styled.img`
  width:94px;
  height:109px;
  // opacity:0.5;
  opacity: ${(props) => (props.active ? '0.2' : '1')};
`
const Font14 = styled(Content.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.77 !important;
  letter-spacing: -0.33px !important;
  color: #999999;
  text-align:center;
  white-space: pre-wrap;
  margin-top: 10px;
`

const Font16 = styled(Content.FontSize16)`
  word-break: keep-all;
  white-space: pre-wrap;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.53 !important;
  letter-spacing: -0.38px;
  color: #282c36;
  text-align:center;
`

const Font15 = styled(Content.FontSize15)`
  font-weight: ${props=>props.fontWeight};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.38px;
  // color: #282c36;
  color: ${(props) => (props.active ? '#c6c7cc' : '#282c36')};
  white-space: pre-line;
  text-align:center;
`

const ConsultantImgBox = styled.div`
  display:flex;
//   align-items:center;
  justify-content:space-between;
//   padding:34px 36px 13px 40px;
  padding:38px 0 8px 0;
  >div >img:nth-of-type(1)
  {
      // width:94px;
      // height:109px;
      // opacity: ${(props) => (props.active ? '0.2' : '1')};
  }
`

const ConsultantBox=styled.div`
//   width:727px;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  margin:0 auto;
//   margin-top:20px;
//   display:flex;
  padding-top: 30px;
  padding-bottom:38px;
  border-bottom: solid 1px #c6c7cc;
  border-top: solid 1px #c6c7cc;
`

const StyledStlViewer=styled(STLViewer)`
  margin:0 auto;
`
const TopHeader = styled.div`
    font-family: Roboto;
    color: #0a2165;
    position: relative;
    width: auto;
    height: 46px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.13;
    letter-spacing: -0.4px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`
const Font13 = styled(Content.FontSize13)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: -0.13px;
  // color: #282c36;
  white-space: pre-line;
  color: ${(props) => (props.active ? '#c6c7cc' : '#282c36')};
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

  .MuiTableCell-root:nth-of-type(1)
  {
      border-right:none;
  }

  .MuiTableCell-root:last-child
  {
      border-left:none;
      border-right:none;
  }

  .MuiTableCell-root:first-child
  {
      border-left:none;
      border-right:none;
  }
  
`

const ConsultantDetailButtonBox = styled.div`
  display:flex;
  width:727px;
  margin:0 auto;
  margin-top:20px;
  justify-content:flex-end;
  align-items:center;
  >img
  {
    width:13px;
    height:7px;
    margin-left:12px;
    margin-top:3px;
  }
`

const Card = styled.div`
  width: 100%;
  object-fit: contain;
//   border-radius: 10px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 25px 0px 120px 0px;
  display: inline;
  float: right;
`
const HeaderBackground = styled.div`
//   background-color: #0a2165;
`
const HeaderTextBox = styled.div`
  display:flex;
  justify-content:space-between;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-bottom:24px;
  padding-top:18px;
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
const Header = styled(Content.FontSize18)`
  width: auto;
  height: calc(6.7%);
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -2px;
  text-align: center;
  color: #282c36;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 15px;
  padding-bottom:15px;
  border-bottom: solid 1px #c6c7cc;
  object-fit: contain;
`

const ContentHeader = styled(Title.FontSize14)`
  width: auto;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.64;
  letter-spacing: -0.35px;
  text-align: center;
  color: #282c36;
  object-fit: contain;
`

const ContentBox = styled.div`
  // height: calc(46.3%);
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 80px;
`

const CustomSlider = withStyles({
  root: {
    color: '#0933b3',
    height: 7,
    width: '76%',
    margin:'0.5% 12% 6.6% 12%',
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


const ConsultantHeader = styled(Content.FontSize15)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.53;
  letter-spacing: -0.38px;
  text-align: center;
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
  margin-top:25px;
`
const Tail = styled.div`
  object-fit: contain;
  font-size: 13px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54;
  letter-spacing: -0.33px;
  text-align: center;
  color: #0a2165;
`
