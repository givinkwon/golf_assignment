import React from 'react'

import Container from 'components/Container'
import Section from 'components/Section'

import BannerConatiner from './Banner'
import ContentConatiner from './Content'

class NoticeConatiner extends React.Component {
  render(){
    return (
      <>
      <BannerConatiner/>
      <Section>
        <Container>
          <ContentConatiner/>
        </Container>
      </Section>
      </>
    )
  }
}

export default NoticeConatiner
