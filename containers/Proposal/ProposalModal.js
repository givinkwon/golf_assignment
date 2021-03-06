import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import InputComponent from 'components/Input2'
import SelectComponent from 'components/Select'

import * as Text from 'components/Text'
import RatioImage from "components/RatioImage"
import CloseModalButton from "components/CloseModalButton"




import {DARKGRAY, PRIMARY} from "static/style"

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
    marginTop: 12,
    border: '1px solid #e6e6e6',
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 6,
    padding: 4,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }
}

@inject('Proposal', 'Auth','Answer')
@observer
class ProposalModal extends Component {
  constructor(props) {
    super(props);
    this.file = React.createRef();
  }

  state = {
    fileValue: '',
    }

  onChangeFile = (e) => {
    if(e.currentTarget.files.length === 0) {
      this.setState({
        ...this.state,
        fileValue: '',
      })
      return
    }

    const fileName = e.currentTarget.files[0].name;
    this.setState({
      ...this.state,
      fileValue: fileName,
    })

    this.props.Proposal.setFile(e.currentTarget.files[0])
  }

  componentDidMount() {
    // const splitedUrl = window.location.pathname.split('/')
    // let pathname = splitedUrl[splitedUrl.length-2]
    // const requestId = pathname === 'detail' ? splitedUrl[splitedUrl.length-3] : splitedUrl[splitedUrl.length-1]

    // this.setState({
    //   ...this.state,
    //   requestId: requestId,
    // })
  }

  handleClick = async () => {
    const {Answer, Proposal, openNext} = this.props;
    const request = Proposal.current_request
    let mainCategory
    if(request) {
      const developObj = Answer.getDevelopCategoryById(request.category[0]);

      if(developObj) {
        mainCategory = Answer.getDevelopBigCategoryById(developObj.maincategory);

      }
    }

    var regexr1 = /^(\D*\d*\d{2,3}\D*\d{3,4}\D*\d{4}\D*\d*)|(\D*\d*[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}\D*\d*)$/g;

    let i1 = regexr1.test(this.props.Proposal.expert);
    //let i2 = regexr2.test(this.props.Proposal.expert);
    let i3 = regexr1.test(this.props.Proposal.strategy);
    //let i4 = regexr2.test(this.props.Proposal.strategy);
    let i5 = regexr1.test(this.props.Proposal.price);
    //let i6 = regexr2.test(this.props.Proposal.price);
    let i7 = regexr1.test(this.props.Proposal.period);
    //let i8 = regexr2.test(this.props.Proposal.period);

    if(i1) {
        alert('????????????, ????????? ?????? ?????? ?????? ?????? ??? ????????? ????????? ?????? ??? ????????????.');
        return;
    }

    if(mainCategory.maincategory == '??????'){
        if(i3 || i5 || i7) {
            alert('???????????? ?????? ?????? ?????? ?????? ??? ????????? ????????? ?????? ??? ????????????.');
        return;
        }

        if(!this.props.Proposal.strategy){
            alert("?????? ?????? ????????? ??????????????????.");
            return;
        }
        if(!this.props.Proposal.price){
            alert("?????? ????????? ??????????????????");
            return;
        }

        if(!this.props.Proposal.period){
            alert("?????? ????????? ??????????????????");
            return;
        }

    }

    if (!this.props.Proposal.day) {
      if(mainCategory.maincategory == '??????'){
      alert("??? ?????? ????????? ??????????????????");
      return;
      }
      alert("??? ?????? ????????? ??????????????????");
      return;
    }
    if (!this.props.Proposal.all_price) {
      alert("?????? ????????? ??????????????????.");
      return;
    }
    if (!this.props.Proposal.expert) {
      alert("?????? ?????? ??? ????????? ??????????????????");
      return;
    }

    openNext()
  }

  render() {
    const {Proposal, Answer, Auth, open, handleClose} = this.props;
    //const {requestId} = this.state
    const product = '????????????'
    const request = Proposal.current_request
    const subclass = request ? Answer.getSubclassById(request.product) : null
    let mainCategory = subclass ? Answer.getDevelopBigCategoryById(request.category[0]) : null
    const {select_saves} = Proposal

    if(request) {
      const developObj = Answer.getDevelopCategoryById(request.category[0]);

      if(developObj) {
        mainCategory = Answer.getDevelopBigCategoryById(developObj.maincategory);
        console.log(mainCategory);
      }
    }

    return (
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="call-modal"
        aria-describedby="call-modal"
      >
        <DialogHeader>
          <CloseModalButton handleClose={handleClose} />
          <Text.FontSize32 color={PRIMARY} fontWeight={600}>
            ?????????
          </Text.FontSize32>
        </DialogHeader>

        {/*????????? ?????? ???????????????*/}
        {mainCategory && mainCategory.maincategory == '??????' ?

        (  <DialogBody>
           <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ?????? ??????
            </Text.FontSize20>

            <div>
              <div>
                <Input
                  name="category"
                  type="text"
                  width="100%"
                  onChange={Proposal.setCategory}
                  placeholder="????????????, ????????????"
                />
              </div>
            </div>
          </div>

          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ?????? ?????? ??????
            </Text.FontSize20>

            <div>
              <div>
                <Input
                  name="people"
                  type="text"
                  width="100%"
                  onChange={Proposal.setPeople}
                  placeholder="???????????? 1???, ???????????? 2???"
                />
              </div>
            </div>
          </div>

          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ?????? ?????? ??????
            </Text.FontSize20>
            <TextArea
              onChange={Proposal.setStrategy}
              ref={input => this.strategy = input}
              rows={6}
              placeholder={`1. ????????????
2. Wifi ?????? ?????? ???????????? ??????
3. iso ???????????? ?????? ??????`}
            />
          </div>

           <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ?????? ??????
            </Text.FontSize20>
            <TextArea
              onChange={Proposal.setPrice}
              ref={input => this.price = input}
              rows={6}
              placeholder={`1. ????????????(300,000???/???)
2. ??????????????????(200,000???/???)
3. ?????????????????????(350,000???/???)`}
            />
          </div>

          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ?????? ?????? ??????
            </Text.FontSize20>
            <TextArea
              onChange={Proposal.setPeriod}
              ref={input => this.period = input}
              rows={6}
              placeholder={`1. ????????????(15???)
 2. ??????????????????(10???)
 3. ?????????????????????(25???)`}
            />
          </div>
          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ??? ?????? ??????
            </Text.FontSize20>

            <div>
              <div>
                <Input
                  name="day"
                  type="number"
                  width="100%"
                  onChange={Proposal.setDay}
                  placeholder="40"
                />
                <Text.FontSize20 color="#404040" fontWeight={300}>
                  &nbsp;?????????{/* ~&nbsp; */}
                </Text.FontSize20>
              </div>
            </div>
          </div>

          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ?????? ??????
            </Text.FontSize20>

            <div>
              <div>
                <Input
                  name="all_price"
                  type="number"
                  width="100%"
                  onChange={Proposal.setAll_price}
                  placeholder="2400"
                />
                <Text.FontSize20 color="#404040" fontWeight={300}>
                  &nbsp;??????{/* ~&nbsp; */}
                </Text.FontSize20>
              </div>
            </div>
          </div>

          {/* ?????? ?????? ??? ?????? */}
          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ?????? ?????? ??? ??????
            </Text.FontSize20>
            <TextArea
              onChange={Proposal.setExpert}
              ref={input => this.expert = input}
              rows={6}
              placeholder="????????? ??????????????????."
            />
          </div>


          {/* ?????? ?????? */}
          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ?????? ??????
            </Text.FontSize20>
              <div>
                <input
                    onChange={this.onChangeFile}
                    style={{display: 'none'}}
                    ref={this.file}
                    type='file'
                />
                    <InputBox onClick={() => this.file.current.click()}>
                        <Text.FontSize20 color="#767676" fontWeight={400}>
                            { this.state.fileValue ? this.state.fileValue : '????????? ?????? ??????' }
                        </Text.FontSize20>
                        <FileIcon src="/static/icon/download_file.svg" />
                    </InputBox>
              </div>
          </div>
        </DialogBody>
          ) : (
          <DialogBody>
            <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ??? ?????? ??????
            </Text.FontSize20>

            <div>
              <div>
                <Input
                  name="day"
                  type="number"
                  width="100%"
                  onChange={Proposal.setDay}
                  placeholder="40"
                />
                <Text.FontSize20 color="#404040" fontWeight={300}>
                  &nbsp;?????????{/* ~&nbsp; */}
                </Text.FontSize20>
              </div>
            </div>
          </div>

          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ?????? ??????
            </Text.FontSize20>

            <div>
              <div>
                <Input
                  name="all_price"
                  type="number"
                  width="100%"
                  onChange={Proposal.setAll_price}
                  placeholder="2400"
                />
                <Text.FontSize20 color="#404040" fontWeight={300}>
                  &nbsp;??????{/* ~&nbsp; */}
                </Text.FontSize20>
              </div>
            </div>
          </div>

          {/* ?????? ?????? ??? ?????? */}
          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ?????? ?????? ??? ??????
            </Text.FontSize20>
            <TextArea
              onChange={Proposal.setExpert}
              ref={input => this.expert = input}
              rows={6}
              placeholder="????????? ??????????????????."
            />
          </div>


          {/* ?????? ?????? */}
          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              ?????? ??????
            </Text.FontSize20>
              <div>
                <input
                    onChange={this.onChangeFile}
                    style={{display: 'none'}}
                    ref={this.file}
                    type='file'
                />
                    <InputBox onClick={() => this.file.current.click()}>
                        <Text.FontSize20 color="#767676" fontWeight={400}>
                            { this.state.fileValue ? this.state.fileValue : '????????? ?????? ??????' }
                        </Text.FontSize20>
                        <FileIcon src="/static/icon/download_file.svg" />
                    </InputBox>
              </div>
          </div>
        </DialogBody>
          )}



        <DialogFooter>
          <Button onClick={this.handleClick}>
            <Text.FontSize28 id="proposal_answer_submit" color="black" fontWeight={700}>
              ????????????
            </Text.FontSize28>
          </Button>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default ProposalModal



const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
		border-top-left-radius: 9px !important;
 		border-top-right-radius: 9px !important;
 		margin-left: 0;
 		margin-right: 0;
	}


	@media (min-width: 0px) and (max-width: 767.98px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    		  width: calc(100% - 30px);
    			max-width: 500px;
    		}
    	}
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	> div {
    	:nth-of-type(3) {
    		> div {
    			width: 720px;
    			max-width: 720px;
    		}
    	}
    }
  }
  @media (min-width: 992px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			width: 964px;
    			max-width: 964px;
    		}
    	}
    }
  }
`
const DialogHeader = styled(DialogTitle)`
	position: relative;
	background-color: #f9f9f9;
	padding: 40px 50px 25px !important;
	p {
		word-break: keep-all;
		line-height: 1.25em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    padding: 30px 15px 20px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	padding: 30px 40px 20px !important;
  }
`
const DialogBody = styled(DialogContent)`
  background-color: #e4e6ed;
  padding: 10px 50px !important;


  /* 
    border??? ???????????? ?????? 
    ?????? / ?????? / ?????? ?????? ??? ?????? / ...
  */
  > div {
    display: flex;
    align-items: center;
    padding: 36px 18px;
    border-bottom: 0.3px solid #c6c6c6;

    /* ?????? */
    > p {
      line-height: 1.25em;
      :nth-of-type(1) {
        flex-shrink: 0;
        width: 200px;
      }
    }
    /* ??????, ?????? */
    :nth-of-type(1),
    :nth-of-type(2),
    :nth-of-type(6),
    :nth-of-type(7) {
      > div {
        display: flex;
        align-items: baseline;

        > div {
          display: flex;
          align-items: center;
          > p {
            flex-shrink: 0;
          }
        }
      }
    }

    /* ?????? ?????? ??? ??????, ?????? ??????
    :nth-of-type(3),
    :nth-of-type(4),
    :nth-of-type(5) {
       align-items: flex-start;
       flex-direction: column;
      >p {
        width: 100% !important;
        margin-bottom: 12px;
      }
    } */

    :last-child {
      border-bottom: none;
    }
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 10px 15px !important;
    
    /* 
      border??? ???????????? ?????? 
      ???????????? / ???????????? / ???????????? ...
    */
    > div {
      flex-direction: column;
      align-items: flex-start;
      padding: 18px 0;
      > p {
        :nth-of-type(1) {
          width: 100px;
          margin-bottom: 12px;
        }
      }
      > div {
        flex-direction: column;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 10px 40px !important;
   
    /* 
      border??? ???????????? ?????? 
      ???????????? / ???????????? / ???????????? ...
    */
    > div {
      > p {
        /* ?????? */
        :nth-of-type(1) {
          width: 150px;
        }
      }
    }
  }
`
const DialogFooter = styled(DialogContent)`
  background-color: #001a56;
  flex-shrink: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0 !important;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 15px 0 !important;
  }
`
const Button = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 36px;
  padding: 10px 30px;
`

const Input = styled.input`
  background-color: white;
  font-family: inherit;
  font-size: 20px;
  box-sizing: border-box;
  width: ${props => props.width};
  padding: 5px 10px;
  border-radius: 5px;
  border: none;


  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 5px 5px;
  }
`
const TextArea = styled.textarea`
  resize: none;
  background-color: white;
  font-family: inherit;
  font-size: 20px;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 24px;
  border: 1px solid #c6c6c6;
  border-radius: 8px;
  outline: 0;

  
  /* copied from components/Text.js */
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    padding: 10px 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 18px;
  }
  @media (min-width: 1300px) { 
    font-size: 20px;
  }
`

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;

  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;

  border-radius: 6px;
  border: solid 1px #dddddd;
  padding: 15px;

  input {
    font-size: 16px;
  }
  > p {
    max-height: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 12px;
  }


  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`

const FileIcon = styled.img`
  width: 20px;
  height: 20px;
`
