import React from "react";
import styled, { css } from "styled-components";

import Banner0Container from "./Banner0";
import Banner1Conatiner from "./Banner1";
import Banner2Container from "./Banner2";
import Banner3Container from "./Banner3";
import Banner4Container from "./Banner4";
import BarContainer from "./Bar";

// Mobile Container
import MobileBanner0Container from "./Mobile/MobileBanner0";
import MobileBanner1Container from "./Mobile/MobileBanner1";
import MobileBanner3Container from "./Mobile/MobileBanner3";
import MobileBanner2Container from "./Mobile/MobileBanner2";
import MobileBanner4Container from "./Mobile/MobileBanner4";


// Tablet Container
import TabletBanner0Container from "./Tablet/TabletBanner0";
import TabletBanner1Container from "./Tablet/TabletBanner1";
import TabletBanner2Container from "./Tablet/TabletBanner2";
import TabletBanner3Container from "./Tablet/TabletBanner3";
import TabletBanner4Container from "./Tablet/TabletBanner4";



import { inject, observer } from "mobx-react";

@inject("Home")
@observer
class HomeConatiner extends React.Component {
  state = {
    next: true,
    prev: false,
    width: 0,
    tab: 0,
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const { width, reqList } = this.props;

    return (
      <>
        {width < 767.98 ? (
          <>
            <CustomContainer>
              <MobileBanner0Container />
              <MobileBanner1Container />
              <MobileBanner2Container width={width} />
              <MobileBanner3Container />
              <MobileBanner4Container />
            </CustomContainer>
          </>
        ) : 767.99 < width && width < 1279.98 ? (
          <>
            <CustomContainer>
              <TabletBanner0Container />
              <TabletBanner1Container />
              <TabletBanner2Container />
              <TabletBanner3Container />
              <TabletBanner4Container />
            </CustomContainer>
          </>
        ) : (
          <>
            <div style={{ overflow: "hidden" }}>
              <Banner0Container />
              <Banner1Conatiner />
              <Banner2Container />
              <Banner3Container />
              <Banner4Container />
            </div>
          </>
        )}
      </>
    );
  }
}

export default HomeConatiner;

const CustomContainer = styled.div`
  background-color: #ffffff;
  overflow: hidden;
`;
