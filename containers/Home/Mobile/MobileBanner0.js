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
import { toJS } from "mobx"
import { inject, observer } from "mobx-react";

//Image
const background = "static/images/Home/main.jpg";
const layer = "static/images/Home/Mobile/MobileBanner9/MobileBanner9_bg2.png";
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
class MobileBanner0Container extends React.Component {
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
        class="Image"
        src={background}
        style={{
          paddingBottom: 74,
          paddingTop: 54,
          marginTop: 100,
          justifyContent: "center",
        }}
      >
        <BackgroundImage>
          <img src={layer} />
        </BackgroundImage>
        <Fade bottom>

          <Header color={WHITE} fontWeight={"bold"}>
            골프장 리뷰는 골프로!
          </Header>

          <div>
            <Explanation>
              <Font16>국내 500 여개 모든 골프장 정보와 리뷰 확인</Font16>
            </Explanation>
          </div>
            
          <Buttonv1
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              fontWeight: 700,
              width: "202px",
              height: "49px",

            }}
            onClick={() => Router.push("/request")}
          >
            <p style={{ paddingBottom: 0.2 }}>지금 바로 확인하기</p>
          </Buttonv1>

            
            
          
          
        
        </Fade>
      </Background>
    );
  }
}

export default MobileBanner0Container;

const Header = styled(Title.FontSize23)`
  text-align: center;
  margin-bottom: 24px;
  height: 70px;
`
const Title1 = styled(Content.FontSize16)`
  text-align: center;
  letter-spacing: -0.4px;
  object-fit: contain;
  font-weight: normal;
  height: 20px;
  font-size: 17px !important;
`;
const Content1 = styled(Content.FontSize17)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  margin-top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 25px;
  }
  > span {
    font-weight: 400;
  }
`;
const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  > img {
    width: 100%;
    height: 100%;
    opacity: 0.65;
  }
`;
const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 29px 0 50px 0;
`;

const Font16 = styled(Content.FontSize16)`
  font-weight: normal;
  text-align: center;
  //margin-bottom: 10px;
  color: #ffffff;
`;
