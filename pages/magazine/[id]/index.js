import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

import Nav from 'components/Nav'
import Footer from 'components/Footer'

import MagazineDetailConatiner from 'containers/Magazine/Detail'
import {inject, observer} from "mobx-react";

@inject('Magazine')
@observer
class Index extends React.Component {
  static getInitialProps({query}) {
    return {query}
  }

  componentDidMount() {
    const {Magazine, query} = this.props;
    Magazine.getMagazineDetail(query.id);
  }

  render(){
    return (
      <div>
        <Head>
          {/* SEO */}
          <meta name="description" content="제조업 및 제조 인사이트를 위한 매거진. 볼트앤너트가 다양한 정보를 바탕으로 원하는 제품을 만들 수 있는 꿀팁을 전달해드립니다!" />
          <meta name="keywords" content="제조, 제조업, 제조업체, 제조회사, 제품개발, 외주용역, 제조업체찾기, 제품제작, ODM, 제품제조"/>
          {/* SEO - open graph*/}
          <meta property="og:type" content="website"/>
          <meta property="og:image" content="/static/images/thumbnail.png"/>
          <meta property="og:title" content="매거진|믿을 수 있는 제조 전문가" />
          <meta property="og:description" content="제조업 및 제조 인사이트를 위한 매거진. 볼트앤너트가 다양한 정보를 바탕으로 원하는 제품을 만들 수 있는 꿀팁을 전달해드립니다!"/>
          <meta property="og:url" content="https://www.boltnnut.com/magazine"/>           
          {/* Title */}
          <title>볼트앤너트|매거진</title>
        </Head>
        <Nav />
        <MagazineDetailConatiner/>
        
      </div>
    )
  }
}

export default Index
