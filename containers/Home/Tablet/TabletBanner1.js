import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Fade from "react-reveal/Fade";

const Img = "/static/images/Home/Banner1/image1.jpg";

class TabletBanner1Container extends React.Component {
  render() {
    return (
      <Background backgroundColor={"#ffffff"}>
        <Containerv1
          style={{
            paddingBottom: 150,
            paddingTop: 150,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div style={{ marginRight: "-50px" }}>
              <img src={Img} style={{
                  width: 347,
                  height: 255,
                  borderRadius: 7,
                }} />
            </div>

            <div>
              <Header>골프장 리뷰 확인</Header>
              <Middle style={{ fontSize: "32px" }}>
                <span>국내 모든 골프장</span><br/>
                <span>정보와 리뷰</span>
              </Middle>
              <Body>
                전국 500 여 개 골프장 리뷰를 온라인에서
                <br />
                한 번에 확인해보세요
              </Body>
            </div>
          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default TabletBanner1Container;

const Header = styled(Title.FontSize17)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: normal;
  margin-bottom: 2px;
`;
const Middle = styled(Content.FontSize24)`
  //color: #f6f6f6;
  color: #282c36;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 62px;
  font-size: 32px; !important;
`;

const Body = styled(Content.FontSize17)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  //color: #cedafe;
  color: #282c36;
`;
