import React, {Component} from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import CloseModalButton from "components/CloseModalButton"
import {inject, observer} from "mobx-react";

class CheckBrowserModal extends Component {
  render() {
    const {open, handleClose} = this.props

    return (
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="check-update-modal"
        aria-describedby="check-update-modal"
      >
        <DialogBody>
          <CloseModalButton handleClose={handleClose} />
          <Text.FontSize32 color="#404040" fontWeight={600}>
            Internet Explorer로 접속 시 기능이 제한될 수 있습니다.<br/><br/>
            크롬과 같은 다른 브라우저를 이용 부탁드립니다
          </Text.FontSize32>
        </DialogBody>
      </StyledDialog>
    )
  }
}

export default CheckBrowserModal

const StyledDialog = styled(Dialog)`
	@media (min-width: 0px) and (max-width: 767.98px) {
    > div {
    	:nth-of-type(3) {
    		> div {
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
const DialogBody = styled(DialogContent)`
	position: relative;
	background-color: #f5f5f5;
	padding: 60px 50px 40px !important;
	display: flex;
	justify-content: center;
	> p {
	  max-width: 530px;
		word-break: keep-all;
		text-align: center;
		line-height: 1.25em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    padding: 60px 30px 40px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	padding: 60px 30px 40px !important;
  }
`