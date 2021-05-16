import React from 'react';
import styled from 'styled-components';
import Background from '../../components/Background';
import Container from '../../components/Container';
import * as Title from 'components/Title';

const BackImg = 'static/images/request/Banner0/BackgroundImg.png';
class BannerContainer extends React.Component {
	render() {
		return (
			<Background src={BackImg} backgroundColor={'#000000'} style={{ height: 208, opacity: 0.9 }}>
				<CustomContainer>
					<Head>의뢰하기</Head>
					<Content>전문적이고 안전하고 빠른 당신을 위한 최적의 견적시스템</Content>
				</CustomContainer>
			</Background>
		);
	}
}

export default BannerContainer;

const CustomContainer = styled(Container)`
	height: 208px;
	display: flex;
	flex-direction: column;
`;
const Head = styled(Title.FontSize48)`
	color: #ffffff;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.63;
	letter-spacing: -1.2px;
	margin: 35px 0px 10px 0px;
`;
const Content = styled(Title.FontSize24)`
	color: #ffffff;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.67;
	letter-spacing: -0.6px;
`;
