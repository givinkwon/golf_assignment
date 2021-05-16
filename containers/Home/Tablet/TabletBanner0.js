import React from "react";
import styled from "styled-components";
import Router from "next/router";

//Components
import Button from "components/Button";
import * as Text from "components/Text";
import { WHITE } from "static/style";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Buttonv1 from "components/Buttonv1";
import Fade from "react-reveal/Fade";
import UseScrollCount from "containers/Home/UseScrollCount";

import { inject, observer } from "mobx-react";

//Image
const background = "static/images/Home/main.jpg";
const lock = "static/images/Home/lock.svg";

const CountFunc = ({ index, projCount = 0, partnerCount = 0 }) => {
  const countItem = {
    0: UseScrollCount(10787400000, 5000000000, 0, 0, 900000),
    1: UseScrollCount(projCount, 0, 0, 0, 5),
    2: UseScrollCount(4933, 0, 0, 0, 10),
  };

  return <p {...countItem[index]} style={{ display: "inline" }} />;
};

@inject("Proposal", "Partner","Auth")
@observer
class TabletBanner0Container extends React.Component {
  componentDidMount() {
    const { Proposal, Partner } = this.props;
    Proposal.loadProjects();
    Partner.loadPartnerCount();
  }

  render() {
    const ProjectCount = this.props.Proposal.projects_count;
    const PartnerCount = this.props.Partner.partner_count;
    const { Auth } = this.props;

    return (
      <Background
        src={background}
        style={{ paddingBottom: 58, paddingTop: 48, justifyContent: "center" }}
      >
      <Layer />
        <Fade bottom>
          <Header color={WHITE} fontWeight={"500"}>
             골프장 리뷰는 골프로!
          </Header>


          <Explanation>
            <Font20>국내 500 여개 모든 골프장 정보와 리뷰 확인</Font20>
          </Explanation>

          <Buttonv1
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              fontWeight: 700,
              shadow: "0 3px 6px rgba(0,0,0,0.61)",
            }}
            onClick={() => Router.push("/request")}
          >
            지금 바로 확인하기
          </Buttonv1>
  


        </Fade>
      </Background>
    );
  }
}

export default TabletBanner0Container;

const Header = styled(Title.FontSize32)`
  text-align: center;
  margin-bottom: 20px;
`;
const Title1 = styled(Title.FontSize24)`
  text-align: center;
  line-height: 0.94;
  letter-spacing: -0.4px;
  object-fit: contain;
`;
const Content1 = styled(Content.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  padding-top: 5px;
`;

const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 41px 0;
`;
const Font20 = styled(Title.FontSize20)`
  font-weight: normal;
  text-align: center;
  margin-bottom: 34px;
  color: #ffffff;
`;

const Layer = styled.div`
  width: 100%;
  height: 105%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.45);
`;
