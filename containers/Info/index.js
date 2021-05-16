import React from "react";
import Head from "next/head";
import { inject, observer } from 'mobx-react'
import BannerContainer from "./Banner";
import TabContainer from "./Tab";


import ManufacturerContainer from "./Manufacturer";
import SearchContainer from "./Search";
import ProductContainer from "./Product";


@inject('Request')
@observer
class AnswerConatiner extends React.Component {
  state = {
    tab: 0,
  };
  // tab값 전달받아야돼
  setTab = (val) => {
    const {Request } = this.props;
    Request.tab = val
  };
  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    if (prevProps.query != query) {
      this.setState({ tab: parseInt(query.tab) });
    }
  }
  componentDidMount() {
    const { query, Request } = this.props;

    if (query.tab) {
      this.setState({ tab: parseInt(query.tab) });
    }
  }
  render() {
    const { Request } = this.props;
    return (
      <>
        <BannerContainer/>
        <TabContainer setTab={this.setTab} />
        {Request.tab == 0 && <ManufacturerContainer/>}
        {(Request.tab == 1 ||Request.tab == 2) && <ProductContainer/>}
        {Request.tab == 3 && <SearchContainer/>}

      </>
    );
  }
}

export default AnswerConatiner;
