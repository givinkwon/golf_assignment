import React from "react";
import Head from "next/head";
import { inject, observer } from "mobx-react";

import OfferedContainer from "containers/Offered";

import Nav from "components/Nav";
import Footer from "components/Footer";
import Spinner from "components/Spinner";
import Router from "next/router";

@inject("Loading", "Offered", "Answer", "Auth")
@observer
class Offered extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  async componentDidMount() {
    const { Loading, Offered, Auth, Answer, query } = this.props;

    if(parseInt(query.tab) === 2) {
      await Router.push('/offered?tab=1');
    }

    Loading.setOpen(true);
    setTimeout(() => Loading.setOpen(false), 500);

    await Auth.checkLogin();

    if(Auth.logged_in_partner) {
      Answer.loadCategories();

      console.log("파트너가 제안한 목록 로딩 시작");
      Offered.loadPartnerAnswerList(Auth.logged_in_partner.id, () => {
        console.log("파트너가 제안한 목록 로딩 끝");
      });
    }
  }
  render() {
    const { Answer, Loading } = this.props;
    return (
      <div>
        {Loading.is_open}
        {/* {Loading.is_open && <Spinner/>} */}
        <Head>
          <title>골프로</title>
        </Head>
        <Nav />
        <OfferedContainer />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Offered;
