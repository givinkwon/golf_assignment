import React from 'react';
import styled from 'styled-components';
import Background from '../../../components/Background';
import Containerv1 from '../../../components/Containerv1';
import * as Title from '../../../components/Title';
import InputComponent from '../../../components/Input2';

const pass3 = 'static/images/pass3.png';

class MobilePaymentPageContainer extends React.Component {
	state = {
		checkbox1: false,
		checkbox2: false,
		selectedIdx: 0,
		defaultNum: '010',
	};

	// checkbox
	checkboxHandler1 = () => {
		if (this.state.checkbox1 === false) {
			this.setState({ checkbox1: true });
		} else {
			this.setState({ checkbox1: false });
		}
	};

	checkboxHandler2 = () => {
		if (this.state.checkbox2 === false) {
			this.setState({ checkbox2: true });
		} else {
			this.setState({ checkbox2: false });
		}
	};

	// paymentway
	paymentWayClick = idx => {
		this.setState({ selectedIdx: idx });
	};

	activeHandler = idx => {
		if (this.state.selectedIdx === idx) {
			return true;
		} else {
			return false;
		}
	};

	render() {
		return (
			<MobiletestDiv>
				<MarginDiv />
				<Background>
					<Containerv1 style={{ flexDirection: 'column' }}>
						<DeliveryInfoBox>
							<InlineDiv style={{ justifyContent: 'flex-start' }}>
								<FontSize18>배송지</FontSize18>
							</InlineDiv>

							<InlineDiv style={{ marginTop: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
								<FontSize14 style={{ width: '39px' }}>수취인</FontSize14>
								<InputComponent
									class='Input'
									placeholder='박찬아'
									onChange={() => {
										console.log('r');
									}}
									width='274px'
								/>
							</InlineDiv>

							<InlineDiv style={{ marginTop: '14px', justifyContent: 'space-between', alignItems: 'center' }}>
								<FontSize14 style={{ width: '39px' }}>연락처</FontSize14>

								<InnerBox>
									<InputComponent
										class='Input'
										value={this.state.defaultNum}
										onChange={e => {
											this.setState({ defaultNum: e });
										}}
										width='68px'
									/>

									<PhoneNumDash />

									<InputComponent
										class='Input'
										placeholder='1234'
										onChange={() => {
											console.log('r');
										}}
										width='68px'
									/>

									<PhoneNumDash />

									<InputComponent
										class='Input'
										placeholder='5678'
										onChange={() => {
											console.log('r');
										}}
										width='68px'
									/>
								</InnerBox>
							</InlineDiv>

							<InlineDiv style={{ marginTop: '14px', justifyContent: 'space-between', alignItems: 'center' }}>
								<FontSize14 style={{ width: '39px' }}>배송지</FontSize14>

								<InnerBox style={{ textAlign: 'center' }}>
									<InlineDiv style={{ justifyContent: 'space-between' }}>
										<InputComponent
											class='Input'
											placeholder='06356'
											onChange={() => {
												console.log('r');
											}}
											width='173px'
										/>
										<AddressSearchBtn>
											<FontSize14 style={{ color: '#0933b3' }}>주소 검색</FontSize14>
										</AddressSearchBtn>
									</InlineDiv>
								</InnerBox>
							</InlineDiv>

							<InlineDiv style={{ justifyContent: 'flex-end', marginTop: '14px' }}>
								<InputComponent
									class='Input'
									placeholder='서울 강남구 일원로 120'
									onChange={() => {
										console.log('r');
									}}
									width='274px'
								/>
							</InlineDiv>

							<InlineDiv style={{ justifyContent: 'flex-end', marginTop: '14px', marginBottom: '26px' }}>
								<InputComponent
									class='Input'
									placeholder='11동 33호'
									onChange={() => {
										console.log('r');
									}}
									width='274px'
								/>
							</InlineDiv>
						</DeliveryInfoBox>

						<PaymentInfoBox>
							<InlineDiv style={{ justifyContent: 'flex-start' }}>
								<FontSize18>결제정보</FontSize18>
							</InlineDiv>

							<InlineDiv style={{ marginTop: '20px', justifyContent: 'space-between' }}>
								<FontSize14 style={{ color: '#767676' }}>배송비</FontSize14>
								<FontSize14 style={{ color: '#282c36' }}>5,850원</FontSize14>
							</InlineDiv>

							<InlineDiv style={{ marginTop: '12px', justifyContent: 'space-between' }}>
								<FontSize14 style={{ color: '#767676' }}>부품갯수</FontSize14>
								<FontSize14 style={{ color: '#282c36' }}>3개</FontSize14>
							</InlineDiv>

							<InlineDiv style={{ marginTop: '12px', justifyContent: 'space-between' }}>
								<FontSize14 style={{ color: '#767676' }}>부품가격</FontSize14>
								<FontSize14 style={{ color: '#282c36' }}>2,979,850원</FontSize14>
							</InlineDiv>

							<InlineDiv style={{ marginTop: '4px', justifyContent: 'flex-end' }}>
								<FontSize12>(부가세 포함)</FontSize12>
							</InlineDiv>
						</PaymentInfoBox>

						<ResultPriceBox>
							<InlineDiv style={{ justifyContent: 'space-between' }}>
								<FontSize15>총 결제금액</FontSize15>
								<FontSize18 style={{ color: '#0933b3' }}>2,979,850원</FontSize18>
							</InlineDiv>
						</ResultPriceBox>

						<PaymentWayBox>
							<InlineDiv style={{ justifyContent: 'flex-start' }}>
								<FontSize18>결제수단</FontSize18>
							</InlineDiv>

							<InlineDiv style={{ justifyContent: 'space-between', marginTop: '20px', alignItems: 'center' }}>
								<PaymentBtn onClick={() => this.paymentWayClick(1)} active={this.activeHandler(1)}>
									<PaymentBtnText active={this.activeHandler(1)}>신용카드/체크카드</PaymentBtnText>
								</PaymentBtn>
								<PaymentBtn onClick={() => this.paymentWayClick(2)} active={this.activeHandler(2)}>
									<PaymentBtnText active={this.activeHandler(2)}>가상계좌 (무통장)</PaymentBtnText>
								</PaymentBtn>
							</InlineDiv>

							<InlineDiv style={{ justifyContent: 'space-between', marginTop: '8px', marginBottom: '26px', alignItems: 'center' }}>
								<PaymentBtn onClick={() => this.paymentWayClick(3)} active={this.activeHandler(3)}>
									<PaymentBtnText active={this.activeHandler(3)}>실시간 계좌이체</PaymentBtnText>
								</PaymentBtn>
								<PaymentBtn onClick={() => this.paymentWayClick(4)} active={this.activeHandler(4)}>
									<PaymentBtnText active={this.activeHandler(4)}>후불걸제</PaymentBtnText>
								</PaymentBtn>
							</InlineDiv>
						</PaymentWayBox>

						<AgreementBox>
							<InlineDiv style={{ marginTop: '26px' }}>
								<CheckBox
									active={this.state.checkbox1}
									onClick={() => {
										this.checkboxHandler1();
									}}
								>
									<div active={this.state.checkbox1}>
										<img src={pass3} active={this.state.checkbox1} />
									</div>
								</CheckBox>
								<FontSize14 stlye={{ color: '#414550' }}>결제 대행 서비스 약관 동의</FontSize14>
							</InlineDiv>

							<InlineDiv style={{ marginTop: '6px' }}>
								<CheckBox
									active={this.state.checkbox2}
									onClick={() => {
										this.checkboxHandler2();
									}}
								>
									<div active={this.state.checkbox2}>
										<img src={pass3} active={this.state.checkbox2} />
									</div>
								</CheckBox>
								<FontSize14 stlye={{ color: '#414550' }}>결제 내용 확인 및 동의</FontSize14>
							</InlineDiv>
							<InlineDiv style={{ marginTop: '5px', justifyContent: 'flex-end' }}>
								<FontSize14 style={{ color: '#999999', width: '317px' }}>선택한 상품의 종류, 금액, 배송기간 등을 확인하였으며, 결제에 동의합니다. (전자상거래법 제 8조 2항)</FontSize14>
							</InlineDiv>
						</AgreementBox>
					</Containerv1>
				</Background>
			</MobiletestDiv>
		);
	}
}

export default MobilePaymentPageContainer;

//test
const MarginDiv = styled.div`
	margin-top: 70px;
`;

const MobiletestDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
`;

//div
const InlineDiv = styled.div`
	display: inline-flex;
	width: 347px;
`;

//fontsize
const FontSize12 = styled.p`
	font-size: 12px;
	font-family: NotoSansCJKkr;
	font-weight: normal;
	line-height: 1.43;
	letter-spacing: normal;
	color: #282c36;
`;

const FontSize14 = styled(Title.FontSize14)`
	font-weight: normal;
	line-height: 1.43;
	letter-spacing: normal;
	color: #444444;
`;

const FontSize15 = styled.p`
	font-size: 15px;
	font-family: NotoSansCJKkr;
	font-weight: normal;
	line-height: 1.43;
	letter-spacing: normal;
	color: #282c36;
`;

const FontSize18 = styled(Title.FontSize18)`
	font-weight: bold;
	line-height: 1.5;
	letter-spacing: normal;
	color: #282c36;
`;

//body
const DeliveryInfoBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	border-bottom: 5px solid #f2f2f2;
`;

const PhoneNumDash = styled.div`
	width: 8px;
	border: solid 1px #282c36;
`;

const InnerBox = styled.div`
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	width: 274px;
`;

const AddressSearchBtn = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 89px;
	height: 36px;
	border-radius: 3px;
	border: solid 1px #0933b3;
	background-color: #ffffff;
`;

const PaymentInfoBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	margin-top: 26px;
	margin-bottom: 18px;
`;

const ResultPriceBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 375px;
	height: 55px;
	background-color: #f6f6f6;
	border-top: 1px solid #c6c7cc;
	border-bottom: 1px solid #c6c7cc;
`;

const PaymentWayBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 375px;
	margin-top: 26px;
	border-bottom: 1px solid #c6c7cc;
`;

const PaymentBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 158px;
	height: 38px;
	border-radius: 19px;
	border: solid 1px #d5d5d5;
	background-color: ${props => (props.active ? '#0933b3' : '#ffffff')};
`;

const PaymentBtnText = styled(Title.FontSize14)`
	font-weight: normal;
	line-height: 1.43;
	letter-spacing: normal;
	color: ${props => (props.active ? '#ffffff' : '#000000')};
`;

const AgreementBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const CheckBox = styled.div`
  display: flex;
	justify-content: center;
  align-items: center;
  > div{
    width: 14px;
    height: 14px;
    background-color: ${props => (props.active ? '#0933b3' : '#ffffff')};
    margin-right: 16px;    
    position: relative;
    cursor: pointer;
    border: 1px solid #c6c7cc;
    border-radius: 3px;
    box-sizing: border-box;
    > img{
      display: ${props => (props.active ? 'static' : 'none')};
      position: absolute;
      top: 17%;
      left: 10%;
    }
  }
}
`;
