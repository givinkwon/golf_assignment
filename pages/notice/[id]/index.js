import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

import Nav from 'components/Nav'
import Footer from 'components/Footer'

import NoticeDetailConatiner from 'containers/Notice/Detail'
import {inject, observer} from "mobx-react";

@inject('Notice')
@observer
class Index extends React.Component {
  static getInitialProps({query}) {
    return {query}
  }

  componentDidMount() {
    const {Notice, query} = this.props;
    Notice.getNoticeDetail(query.id);
  }

  render(){
    return (
      <div>
        <Head>
          <title>골프로</title>
        </Head>
        <Nav />
        <NoticeDetailConatiner/>

      </div>
    )
  }
}

export default Index
