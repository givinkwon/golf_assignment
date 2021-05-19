import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";

const image1 = "/static/images/Home/Banner3/image1.jpg";

class Banner3Container extends React.Component {
  render() {
    return (
      <Background backgroundColor={"#ffffff"}>
        <Containerv1
          style={{
            paddingBottom: 300,
            paddingTop: 300,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div style={{ marginRight: "126px" }}>
              <img src={image1} style={{ height: "100%" }} />
            </div>
            <div>
            <Header>골프장 찾아보기</Header>
              <Middle>
                <span>원하는 골프장</span><br/>
                <span> 검색이 한 번에</span>
              </Middle>
              <Body>
                내가 원하는 골프장을 찾아보세요. 
                <br />
                지역별, 특징별 필터로 원하는 골프장을 찾을 수 있습니다.
              </Body>
            </div>
          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default Banner3Container;

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
