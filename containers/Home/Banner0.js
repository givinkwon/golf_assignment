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

class Banner0Container extends React.Component {


  render() {
    
    return (
      <Background src={background}>
        <Layer />
        <Containerv1
          style={{
            paddingBottom: 132,
            paddingTop: 224,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Title.FontSize56
                color={WHITE}
                shadow={"0 3px 6px rgba(0,0,0,0.61);"}
                fontWeight={"bold"}
                style={{ lineHeight: 1.49, fontSize: "52px" }}
              >
                골프장 리뷰는 골프로!
              </Title.FontSize56>

              <Explanation>
                <Font24>국내 500 여개 모든 골프장 정보와 리뷰 확인</Font24>
              </Explanation>

              <Buttonv1 onClick={() => Router.push("/manufacturer")}>
                지금 바로 확인하기
              </Buttonv1>
            </div>

          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default Banner0Container;

const Info = styled.div`
  display: table;
  padding-top: 140px;
  margin-left: 30pxa;
  div:nth-of-type(1) {
    padding-right: 23.5px;
  }
  div:nth-of-type(2) {
    width: 216px;
    border: 2px;
    border-left: solid white 1px;
    border-right: solid white 1px;
  }
  div:nth-of-type(3) {
    width: 204px;
    //padding-left: 37.5px;
  }
`;

const InfoCell = styled.div`
  display: table-cell;
  text-align: center;
  height: 91px;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
`;

const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 71px 0;
`;

const Font24 = styled(Content.FontSize24)`
  font-weight: normal;
  text-align: center;
  margin-bottom: 34px;
  color: #ffffff;
`;
const Layer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.45);
`;
