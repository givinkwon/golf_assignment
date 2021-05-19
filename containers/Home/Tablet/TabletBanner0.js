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

//Image
const background = "static/images/Home/main.jpg";


class TabletBanner0Container extends React.Component {
 
  render() {

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
            onClick={() => Router.push("/manufacturer")}
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
