import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";

const image = "/static/images/Home/Banner3/image1.jpg";

class TabletBanner3Container extends React.Component {
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
              <img src={image} style={{
                  width: 347,
                  height: 255,
                  borderRadius: 7,
                }} />
            </div>
            <div>
              <Header>골프장 찾아보기</Header>
              <Middle style={{ fontSize: "32px" }}>
                <p>
                원하는 모든 골프장을 <br />  한 번에 검색하세요.
                </p>
              </Middle>
            
              <Body>
              내가 원하는 골프장을 찾아보세요. 
                <br />
                지역별, 특징별 필터로 원하는 
                <br/>
                골프장을 찾을 수 있습니다.
              </Body>
            </div>
          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default TabletBanner3Container;
const ContentContainer = styled(Containerv1)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled(Title.FontSize20)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  //margin: 100px 0px 2px 0px;
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 17px;
  }
`;
const Middle = styled(Title.FontSize56)`
  //text-align: center;
  color: #282c36;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.55px;
  margin-bottom: 55px;
  > p {
    display: inline;
    font-weight: bold;
  }
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 28px;
  }
`;
const ImgContainer = styled.div`
  margin: 30px 0px 22px 0px;
`;
const Body = styled(Title.FontSize24)`
  //text-align: center;
  white-space: nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.38px;
  color: #555963;
  //margin-bottom: 100px;
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 17px;
  }
`;
