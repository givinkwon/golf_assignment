import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { withRouter } from "next/router";
import Router from "next/router";
// components
import * as Text from "./Text";
import * as Content from "./Content";
import Containerv1 from "components/Containerv1";

import { PRIMARY, WHITE, DARKGRAY } from "static/style";
import Buttonv1 from "components/Buttonv1";
import ChatTestContainer from "containers/Info2/ChatTest";
const close_ic = "/static/icon/close.svg";
const hamburger_ic = "/static/icon/hamburger.png";
const logo_ic = "/static/images/components/Nav/logo_ic.svg";
const profile = "/static/images/profile.png";

@inject("Auth", "Partner", "Project")
@observer
class Nav extends React.Component {
  state = {
    token: null,
    url: "/",
    is_profile: false,
    is_open: false,
    selectedRoom: null,
    partnerList: [],
    
  };

  alreadyLoggedin = ["login", "signup"];
  needPermission = ["profile", "answer", "proposal", "offered", "account"];
  logout = () => {
    localStorage.removeItem("token");
    if (localStorage.getItem("expiry")) {
      localStorage.removeItem("expiry");
    }
    window.location.href = "/";
  };

  async componentDidMount() {
    const { Auth, } = this.props;
    const token = await localStorage.getItem("token");
    const { route, pathname } = Router.router;
    const splitedRoute = route.split("/");
    const requestId = window.location.pathname.split("/").pop();

    // 사용자 접근 제어
    if (token) {
      this.alreadyLoggedin.forEach((url) => {
        if (url === splitedRoute[1]) {
          alert("이미 로그인한 사용자입니다");
          Router.push("/");
        }
        // /offered 에서 tab 1을 거치지 않고 tab 2로 들어온 사용자 리다이렉트
        else if ("offered" === splitedRoute[1]) {
          let currentTab = 0;
          const queryParams = window.location.href.split("?").pop();

          // 'http://localhost:3000/offered?tab=1&state=2'이면
          // queryParams = 'tab=1&state=2'
          queryParams.split("&").forEach((param) => {
            // name = 'tab', 'state'
            // value = '1', '2'
            const [name, value] = param.split("=");
            if (name === "tab") {
              currentTab = value;
            }
          });

          let prevTab = 0;
          const prevQueryParams = document.referrer.split("?").pop();

          prevQueryParams.split("&").forEach((param) => {
            const [name, value] = param.split("=");
            if (name === "tab") {
              prevTab = value;
            }
          });

          // 현재 tab이 2인데 이전 tab이 1이 아니면
          if (currentTab == 2 && prevTab != 1) {
            Router.push(pathname + "?tab=1");
          }
        }
      });
    } else {
      if (splitedRoute[1] === "partner") {
        alert("접근할 수 없는 페이지입니다");
        Router.push("/login");
      }

      // // 로그인 하지 않고 /partner/[id]로 들어오는 사용자 리다이렉트
      // if(splitedRoute[1] === 'partner' && splitedRoute.length >= 3) {
      //  alert("로그인이 필요합니다");
      //  Router.push("/login");
      // }
      this.needPermission.forEach((url) => {
        if (url === splitedRoute[1]) {
          if (requestId != 923) {
            alert("로그인이 필요합니다");
            Router.push("/login");
          }
        }
      });
    }

    // 토큰은 있는데 userInfo가 mobx에 없으면 리로딩
    await Auth.checkLogin();

    this.setState({
      url: route,
      token: token,
    });
    // 토큰은 있는데 userInfo가 mobx에 없으면 리로딩
    Auth.checkLogin();
    console.log(toJS(Auth.logged_in_user))

    
  }
  render() {
    const { Auth } = this.props;
    const { url, is_open, is_profile, token } = this.state;

    return (
      <>
        <NavBox>
          
          <Containerv1
            style={{ display: "inline", justifyContent: "space-between" }}
          >
            <NavWrap>
              <Logo src={logo_ic} onClick={() => Router.push("/")} />
              <Menu is_open={is_open}>
                <Close>
                  <Icon
                    src={close_ic}
                    onClick={() => this.setState({ is_open: false })}
                  />
                </Close>

                {this.props.Auth.logged_in_user ? (
                  this.props.Auth.logged_in_user.type === 0 ? (
                    /* client로 로그인 */

                    <Fragment>
                      <NavLink
                        onClick={() => Router.push("/project")}
                        active={url.indexOf("project") > -1}
                      >
                        <p class="line"> 프로젝트 관리 </p>
                      </NavLink>
                      <NavLink
                        onClick={() => Router.push("/manufacturer")}
                        active={url.indexOf("manufacturer") > -1}
                      >
                        <p class="line"> 제조사 찾기 </p>
                      </NavLink>
                      <NavLink
                        onClick={() => Router.push("/magazine")}
                        active={url.indexOf("magazine") > -1}
                      >
                        <p class="line"> 제조 인사이트 </p>
                      </NavLink>
                    </Fragment>
                  ) : (
                    /* partner로 로그인 */
                    <Fragment>
          
                      <NavLink
                        onClick={() => Router.push("/project")}
                        active={url.indexOf("project") > -1}
                      >
                        {console.log(url)}
                        <p class="line"> 프로젝트 찾기 </p>
                      </NavLink>
                      <NavLink
                        onClick={() => Router.push("/magazine")}
                        active={url.indexOf("magazine") > -1}
                      >
                        제조 인사이트
                      </NavLink>
                     
                    </Fragment>
                  )
                ) : (
                  /* 로그인 안되어있는 경우 */
                  <Fragment>

                    <NavLink
                      onClick={() => Router.push("/project")}
                      active={url.indexOf("project") > -1}
                    >
                      <p class="line"> 프로젝트 찾기 </p>
                    </NavLink>
                    <NavLink
                        onClick={() => Router.push("/manufacturer")}
                        active={url.indexOf("manufacturer") > -1}
                      >
                        <p class="line"> 제조사 찾기 </p>
                      </NavLink>
                    <NavLink
                      onClick={() => Router.push("/magazine")}
                      active={url.indexOf("magazine") > -1}
                    >
                      제조 인사이트
                    </NavLink>
                  </Fragment>
                )}
                {/* 로그인한/안한 경우 */}
                {token ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                      src={profile}
                      onClick={() => this.setState({ is_profile: !is_profile })}
                    />
                    {is_profile && (
                      <ProfileMenu>
                        <div>
                          {/* <Font17>
                            안녕하세요, 기빈님
                          </Font17> */}
                        </div>
                        <div>
                          <div onClick = {()=>Router.push('/chatting') }>
                            <Font16>
                            채팅하기
                            </Font16>
                          </div>

                          <div onClick={() => Router.push("/account?tab=1")}>
                            <Font16>
                              계정설정
                            </Font16>
                          </div>
                        </div>
                        <div style = {{backgroundColor: "#f3f3f3"}} onClick={this.logout}>
                          <Font16>
                            로그아웃
                          </Font16>
                        </div>
                      </ProfileMenu>
                    )}
                  </div>
                ) : (
                  <NavLink
                    onClick={() => {
                      Router.push("/login"), Auth.reset();
                    }}
                    active={url.indexOf("login") > -1}
                  >
                    로그인
                  </NavLink>
                )}

                {this.props.Auth.logged_in_user && this.props.Auth.logged_in_user.type === 1 ? 
                (
                    /* partner로 로그인 */
                    <ButtonContainer
                    first
                    onClick={() => Router.push("/project")}

                    active={url.indexOf("project") > -1}
                  >
                    프로젝트 관리
                  </ButtonContainer>

                ) : (
                <ButtonContainer
                  first
                  onClick={() => Router.push("/request")}

                  active={url.indexOf("request") > -1}
                >
                  상담 받기
                </ButtonContainer>
                )
              }
              </Menu>
              <Icon
                src={hamburger_ic}
                onClick={() => this.setState({ is_open: true })}
              />
              {is_open && (
                <BG onClick={() => this.setState({ is_open: false })} />
              )}
            </NavWrap>
          </Containerv1>
        </NavBox>
        <div style={{ height: 60 }} />
      </>
    );
  }
}
export default Nav;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #00000080;
`;
const ProfileMenu = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 50px;
  width: 14em;
  // > div {
  //   padding: 15px 20px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   cursor: pointer;
  //   > p {
  //     color: #414550;
  //     font-weight: 500;
  //   }
    // :hover {
    //   background-color: #f3f3f3;
    //   > p {
    //     color: ${PRIMARY};
    //   }
    // }
  // }
  // >div:nth-of-type(1){
  //   padding: 17px 20px;
  //   display: flex;
  //   align-items: center;
  // }
  >div:nth-of-type(2){
    cursor: pointer;
    padding: 17px 0;
    display: flex;
    flex-direction: column;
    >div{
      padding: 6px 20px;
      :hover {
          background-color: #f3f3f3;
          > p {
            color: ${PRIMARY};
          }
        }
    }
  }

  >div:nth-of-type(3){
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    color: #414550;
    font-weight: 500;
  }
`;
const Container = styled.div`
  padding-right: 0% !important;
  padding-left: 0% !important;
  margin-right: 0% !important;
  margin-left: 0% !important;
  width: 100%;
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  padding: 0px 15px;
  cursor: pointer;
`;
const NavBox = styled.div`
  position: fixed;
  z-index: 100;
  height: 60px;
  width: 100%;
  background-color: ${WHITE};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  justify-content: center;
`;
const NavWrap = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;
const Logo = styled.img`
  cursor: pointer;
  width: auto;
  height: auto;
`;
const Icon = styled.img`
  cursor: pointer;
  margin-left: auto;
  width: 40px;
  height: 40px;
  display: none;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
  }
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: none;
    flex-direction: column;

    width: 100%;
    max-width: 380px;
    height: 100vh;
    background-color: ${DARKGRAY};
    position: absolute;

    top: 0;
    right: -100%;
    transition: 0.8s;

    z-index: 900;
    ${(props) =>
      props.is_open &&
      css`
        display: flex;
        right: 0%;
      `}
  }
`;
const NavLink = styled.p`
  margin: 0px;
  height: 60px;
  cursor: pointer;
  color: #000000;
  display: flex;
  align-items: center;
  font-weight: 500;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    justify-content: center;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding-left: 12px;
    padding-right: 12px;
    font-size: 14px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding-left: 15px;
    padding-right: 15px;
    font-size: 14px;
  }
  @media (min-width: 1300px) and (max-width: 1599.98px) {
    padding-left: 17px;
    padding-right: 15px;
    font-size: 16px;
  }
  @media (min-width: 1600px) {
    padding-left: 19px;
    padding-right: 19px;
    font-size: 16px;
  }
  ${(props) =>
    props.first &&
    css`
      margin-left: 0px !important;
    `}
  ${(props) =>
    props.active
      ? css`
          font-weight: 700;
          background-color: rgba(255, 255, 255, 0.1);
          color: #0a2165;
          font-size: 22px;
          border-bottom: 4px solid #0a2165;
        `
      : css`
          font-weight: 500;
          background-color: rgba(255, 255, 255, 0.1);
          font-size: 20px;
          font-weight: 500;
        `}
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const BG = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 800;
  top: 0;
  left: 0;
`;
const Close = styled.div`
  margin: 10px;
  width: calc(100% - 20px);
  display: none;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: flex;
  }
`;

const ButtonContainer = styled(Buttonv1)`
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
  font-weight: bold !important;
  line-height: 0.69 !important;
  letter-spacing: -0.4px !important;

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 110px;
    height: 41px;
    font-size: 14px;
    margin-left: 22px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 120px;
    height: 41px;
    font-size: 14px;
    margin-left: 26px;
  }
  @media (min-width: 1300px) and (max-width: 1599.98px) {
    width: 130px;
    height: 41px;
    font-size: 16px;
    margin-left: 30px;
  }
  @media (min-width: 1600px) {
    width: 130px;
    height: 41px;
    font-size: 16px;
    margin-left: 34px;
  }
`;

const Font16 = styled(Content.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  text-align: left;
  color: #414550;
`


const Font17 = styled(Content.FontSize17)`
  font-stretch: normal;
  font-style: normal;
  line-height: 1.76;
  letter-spacing: -0.17px;
  text-align: left;
  

`