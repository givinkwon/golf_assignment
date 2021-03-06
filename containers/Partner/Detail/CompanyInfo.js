import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style' 


@inject('Partner')
@observer
class CompanyInfoConatiner extends React.Component {
   render(){
    const { Partner } = this.props
    return (
      <div style={{marginTop: 10}}>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>íėŽėę°</Text.FontSize20>
        </Header>
        <Content>
            <Text.FontSize20
            color="#4d4f5c"
            dangerouslySetInnerHTML={{__html: Partner.detail.info_company.replace(/(?:\r\n|\r|\n)/g, '<br />')}}
            />
        </Content>        
      </div>
    )
  }
}

export default CompanyInfoConatiner

const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;

  padding: 0 15px;
`
const Content = styled.div`
  background-color: #f2f2f2;
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  > p {
    line-height: 1.3;
  }
`
