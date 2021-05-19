import React from "react";
import styled from "styled-components";

//Components
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Fade from "react-reveal/Fade";

//Image
const image1 = "/static/images/Home/Banner2/image1.jpg";

class TabletBanner2Container extends React.Component {
  render() {

    return (
      <Background>
        <Containerv1
          style={{
            paddingBottom: 150,
            paddingTop: 150,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div>
              <Header>골프장 정보 확인</Header>
              <Middle style={{ fontSize: "32px" }}>
              가격, 시설 정보부터 <br />
              잔디 상태까지
              </Middle>

              <Body>
                전국 500 여 개 골프장의 모든
                <br />
                정보를 확인해보세요
              </Body>
            </div>
            <div>
              <img
                src={image1}
                style={{
                  width: 347,
                  height: 255,
                  borderRadius: 7,
                }}
              />
            </div>
          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default TabletBanner2Container;

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
