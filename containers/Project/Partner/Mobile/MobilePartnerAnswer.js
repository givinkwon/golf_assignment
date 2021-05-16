import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import Router from "next/router";
import { inject, observer } from "mobx-react";
import {toJS} from "mobx";
import DownloadFile from "components/DownloadFile";
import Answer from "stores/Answer";
const infoImg = "static/images/info.svg";
const file_img = "/static/images/project/fileimg.svg";
@inject("Project", "Answer","Auth")
@observer
class PartnerAnswer extends React.Component {
  state = {
    value: null,
    partnerDetailList: [],
    minRows: 1,
    maxRows: 100,
  };

  downloadFile(urls) {
    console.log(urls);

    const blob = new Blob([this.content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = `${urls}`;
    a.download = `${urls}`;
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
  
  cancel = () => {
    const {Project} = this.props;
    Project.newIndex = 1;
  }

  submit = () => {
    const {Project, Answer, Auth} = this.props;
    //console.log(Project.projectDataList[0].id);
    //console.log(Project.projectDataList[0].request_set[0].id);
    //console.log(toJS(Auth.logged_in_partner.id));
    //console.log(Answer.content1);
    Answer.CreateAnswer(Project.projectDataList[0].id,toJS(Auth.logged_in_partner.id),Project.projectDataList[0].request_set[0].id,Answer.content1); // project, partner, request, content1
    Project.newIndex = 3;
  }
  
  answercontent = async (event) => {
    const textareaLineHeight = 34;
    const { minRows, maxRows } = this.state;
    const { ManufactureProcess } = this.props;
    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      publicValue: event.target.value,
      publicRows: currentRows < maxRows ? currentRows : maxRows,
    });

    Answer.content1 = event.target.value;
  }

  render() {
    const { Project, ManufactureProcess, user } = this.props;
    const { projectDetailData } = Project;
    let name = "";
    let date = "";
    let period = "";
    let estimate = "";
    let applicantnumber = "";
    let category = Project.category;
    let maincategory = "";
    let categoryname = "";
    let maincategoryname = "";

    Project.projectDataList &&
    Project.currentPage > 0 &&
    Project.projectDataList.map((item, idx) => {
      if (idx === 0) {
        name = item.request_set[0].name ? item.request_set[0].name : "미지정";
        date = item.request_set[0].createdAt
          ? item.request_set[0].createdAt.substr(0, 10).replaceAll("-", ".")
          : "미지정";
        period = item.request_set[0].period
          ? item.request_set[0].period + " 달"
          : "미지정";
        estimate = item.request_set[0].price
          ? item.request_set[0].price
          : "미지정";
        category = Project.category;
        maincategory = Project.maincategory;
        categoryname = Project.categoryname;
        maincategoryname = Project.maincategoryname;
        console.log(toJS(item));
      }
    });
    const openPlaceHolderText = `<프로젝트와 관련된 보유 기술>
    예시) 보유 기술명, 기술 사용 기간, 기술 숙련도
    
    <유사 프로젝트 진행 경험>
    예시) 프로젝트 설명, 사용한 기술, 담당 업무
    
    <프로젝트 진행 제안>
    예시) 개발 작업 순서와 일정
    
    <착수 가능일 및 계약 결정 기한>
    예시) n월 n일부터 착수 가능하고, n월 n일까지는 계약 결정을 희망합니다.`;
    
    return (
      <Background>

        <Containerv1>
          <Wrap>
            <MainBox>
              <MainInnerBox>
                <FontSize18>{projectDetailData.request_set[0].name}</FontSize18>
                <ProjectInfoBox>
                  <InlineDiv>
                    <FontSize14 style={{ color: "#86888c" }}>
                      예상견적
                    </FontSize14>
                    <FontSize14 style={{ color: "#414550", marginLeft: 20 }}>
                      {projectDetailData && 
                    projectDetailData.request_set[0].price ?  
                    projectDetailData.request_set[0].price.toLocaleString("ko-KR")+"원" : "미정"}
                    </FontSize14>
                    <FontSize14 style={{ color: "#86888c", marginLeft: 90 }}>
                      납기 기간
                    </FontSize14>
                    <FontSize14 style={{ color: "#414550", marginLeft: 20 }}>
                    {projectDetailData &&
                      projectDetailData.request_set[0].deadline
                        .slice(2, 10)
                        .replace(/-/gi, ".")}
                    </FontSize14>
                  </InlineDiv>
                </ProjectInfoBox>
                <FontSize18>프로젝트 설명 및 요청사항</FontSize18>
                <RequestSubContainer>
                  <FontSize14>공개 내용</FontSize14>
                  <RequestBox>
                    <RequestContent>
                      <pre style={{ whiteSpace: "break-spaces" }}>
                        {projectDetailData &&
                          projectDetailData.request_set[0].order_request_open}
                        {/* {Project.projectDetailData.request_set[0].order_request_open} */}
                      </pre>
                    
                    <File>
                      {projectDetailData &&
                        projectDetailData.request_set[0].requestfile_set.map(
                          (item, idx) => {
                            if (item.share_inform) {
                              return (
                                <div>
                                  <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <img src={file_img} />
                                    {/* <DownloadFile
                              file={item.file}
                              href={decodeURI(item.file)}
                              download
                            ></DownloadFile> */}
                                    <span
                                      onClick={() =>
                                        this.downloadFile(item.file)
                                      }
                                      style={{ cursor: "pointer" }}
                                    >
                                      {decodeURI(item.file.split("/").pop())}
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                          }
                        )}
                    </File>
                    </RequestContent>
                  </RequestBox>
                </RequestSubContainer>
                {/* 프로젝트 답변하기 */}
                <RequestSubContainer>
                  <FontSize14>프로젝트 답변하기</FontSize14>
                  <RequestBox>
                    <RequestContent>
                      <TextAreaContent>
                        <textarea
                          placeholder={`${openPlaceHolderText}`}
                          onFocus={(e) =>
                            (e.target.placeholder = `${openPlaceHolderText}`)
                          }
                          onBlur={(e) =>
                            (e.target.placeholder = `${openPlaceHolderText}`)
                          }
                          rows={8}
                          value={this.state.value}
                          className={"textarea"}
                          placeholderStyle={{ fontWeight: "400" }}
                          onChange={this.answercontent}
                        />
                      </TextAreaContent>
                    </RequestContent>
                  </RequestBox>
                </RequestSubContainer>
                {/* 버튼 2개 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 50,
                  }}
                >
                  <ButtonBox>
                    <HomeBtn onClick={() => this.cancel()}>
                      취소
                    </HomeBtn>

                    <MyProjectBtn onClick={() => this.submit()}>프로젝트 답변 등록</MyProjectBtn>
                  </ButtonBox>
                </div>

                {/* 버튼 2개 */}
              </MainInnerBox>
            </MainBox>
            
          </Wrap>
        </Containerv1>
      </Background>
    );
  }
}

export default PartnerAnswer;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 520px;
`;

const TextAreaContent = styled.div`
  // width: 1200px;
  // display: ${(props) => (props.checkFileUpload ? "static" : "none")};
  // background-color: #f6f6f6;
  // border: 1px solid black;
  border-radius: 5px;
  // padding: 26px 24px 22px 24px;
  box-sizing: border-box;
  margin-bottom: 40px;
  margin-top: 16px;
  position: relative;

  > div:nth-of-type(1) {
    > span:nth-of-type(1) {
      height: 27px;
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #282c36;
      font-weight: bold;
      margin-bottom: 16px;
      margin-right: 7px;
    }

    > span:last-child {
      width: 20px;
      height: 20px;
      border: 1px solid #000000;
      border-radius: 10px;
      display: inline-block;
      text-align: center;
      font-size: 16px;
      letter-spacing: -0.4px;
      color: #414550;
      font-weight: bold;
      box-sizing: border-box;
    }
  }
  // > div:nth-of-type(2) {
  //    width: 600px;
  //    height: 180px;
  //    border: 3px solid green;
  //    position: absolute;
  //    top: 13%;
  //    left: 70px;
  //    background-color: #ffffff;
  // }
  > textarea {
    resize: none;
    border: 1px solid #ffffff;
    width: 100%;
    padding: 14px 16px;
    margin-top: 12px;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 34px;
    letter-spzcing: -0.45px;
    color: #282c36;
    border-radius: 5px;
    overflow: auto;
    height: auto;

    font-family: inherit;
    :focus {
      outline: none;
    }
    :placeholder {
      font-weight: 300;
    }
    white-space: pre-line;
  }
`;
const RequestSubContainer = styled.div`
  width: 100%;
`;
const RequestBox = styled.div`
  //height: 383px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  // padding: 26px 43px;
  box-sizing: border-box;
`;

const RequestContent = styled.div`
  //border: 1px solid red;
  margin-bottom: 52px;
  padding: 26px 24px 26px 24px;
`;

const File = styled.div`
  //border: 1px solid blue;
  > div {
    > div {
      > span {
        font-size: 15px;
        font-weight: normal;
        line-height: 40px;
        letter-spacing: -0.45px;
        color: #767676;
      }
    }
  }
`;

const Font20 = styled(Title.FontSize20)`
  line-height: 1.7;
  font-weight: normal;
  letter-spacing: -0.5px !important;
  color: #414550;
  margin-bottom: 12px;
`;

// global
const InlineDiv = styled.div`
  display: inline-flex;
  margin-left: 30px;
`;

// fontsize
const FontSize26 = styled(Title.FontSize26)`
  font-weight: bold;
  line-height: 1.31;
  letter-spacing: -0.65px;
  color: #282c36;
`;

const FontSize24 = styled(Title.FontSize24)`
  font-weight: bold;
  line-height: 1.67;
  letter-spacing: -0.6px;
  color: #282c36;
`;

const FontSize22 = styled(Title.FontSize22)`
  font-weight: normal;
  line-height: 1.82;
  letter-spacing: -0.55px;
  color: #282c36;
`;

const FontSize20 = styled(Title.FontSize20)`
  font-weight: bold;
  line-height: 2.6;
  letter-spacing: -0.5px;
  color: #ffffff;
`;

const FontSize18 = styled(Title.FontSize18)`
  font-weight: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #111111;
`;

const FontSize14 = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.86;
  letter-spacing: -0.14px;
  color: #282c36;
`;

// body
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 43px;
`;

const MainBox = styled.div`
  padding
  display: flex;
  justify-content: center;
  // align-items: center;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  background-color: #ffffff;
`;

const MainInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 94px 0;
  margin-left : 5%;
  margin-right : 5%;
`;

const SubBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 180px;
  height: 137px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
`;

const HomeBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 242px;
	height: 61px;
	border-radius: 5px;
	border: solid 1px #0933b3;
	cursor: pointer;
	font-size: 20px;
	font-weight: bold;
	line-height: 2.6;
	letter-spacing: -0.5px;
	color: #0933b3;
	}
	&:hover {
		transition: all 0.5s;
		border: solid 1px #0a2165;
		background-color: #f6f6f6;
		color: #0a2165;
	}
`;

const MyProjectBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 61px;
  border-radius: 5px;
  border: solid 1px #0933b3;
  cursor: pointer;
  background-color: #0933b3;
  font-size: 18px;
  font-weight: bold;
  line-height: 2.6;
  letter-spacing: -0.5px;
  margin-left : 5%;
  margin-right : 5%;
  color: #ffffff;
  &:hover {
    transition: all 0.5s;
    background-color: #0a2165;
  }
`;

const ProjectInfoBox = styled.div`
  display: inline-flex;
  // justify-content: center;
  align-items: center;
  // width: 932px;
  width: 100%;
  height: 63px;
  border-radius: 5px;
  border: solid 1px #c6c7cc;
  margin: 26px 0 90px 0;
`;
