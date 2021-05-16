import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";

const image1 = "/static/images/Home/Banner2/image1.jpg";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";

class Banner2Container extends React.Component {
  render() {
    return (
      <Background backgroundColor="#f6f6f6">
        <Containerv1
          style={{
            paddingBottom: 306,
            paddingTop: 308,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div>
            <Header>골프장 리뷰 확인</Header>
              <Middle>
                <span>국내 모든 골프장</span><br/>
                <span>정보와 리뷰</span>
              </Middle>
              <Body>
                전국 500 여 개 골프장 리뷰를
                <br />
                확인해보세요
              </Body>
            </div>
            <div>
              <img src={image1} style={{ transform: "scaleX(-1)" }} />
            </div>
          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default Banner2Container;

const Header = styled(Title.FontSize20)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin-bottom: 16px;
`;
const Middle = styled(Title.FontSize56)`
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 128px;
  width: 105%;

  > span {
    display: inline;
    font-weight: bold;
  }
`;
const Body = styled(Title.FontSize24)`
  white-space: nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
`;
