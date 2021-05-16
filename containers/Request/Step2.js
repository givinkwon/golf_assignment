import React from "react";
import styled from "styled-components";
import * as Title from "components/Title";
import RequestCardContainer from "./RequestCard";
import { inject, observer } from "mobx-react";
import "intersection-observer"; // polyfill
import DetailQuestion from "../../stores/DetailQuestion";
import ProductInfoContainer from "./ProductInfo";

const Qimage = "static/images/request/Step2/Q.png";
const fileImage = "static/images/components/Input2/Mask.png";

@inject("DetailQuestion", "Request", "ManufactureProcess")
@observer
class Step2Container extends React.Component {
  onChangeFile = (e, data, idx) => {
    const { Request } = this.props;
    let fileNameAvailable = ["stl", "stp"];
    let fileName;
    if (e.currentTarget.files[0]) {
      if (
        !fileNameAvailable.includes(
          e.currentTarget.files[0].name.split(".")[e.currentTarget.files.length]
        )
      ) {
        return alert("파일 확장자명 (stl, stp만 가능) 을 확인해주세요.");
      }
      fileName = e.currentTarget.files[0].name;
      Request.setDrawFile(e.currentTarget.files[0]);
      DetailQuestion.SelectChecked = idx;
      DetailQuestion.nextPage = data.nextTitle;
    } else {
      fileName = null;
      Request.setDrawFile(null);
      DetailQuestion.SelectChecked = "";
      DetailQuestion.nextPage = data.nextTitle;
    }

    this.setState({
      ...this.state,
      fileName: fileName,
    });
  };

  state = {
    fileName: "",
  };

  componentDidMount() {
    // if(DetailQuestion.select)
    //   DetailQuestion.index=1;
    DetailQuestion.pageCount = 0;
  }

  content = () => {
    const { DetailQuestion, Request, ManufactureProcess } = this.props;

    let test = (e, idx) => {
      if (DetailQuestion.SelectChecked === idx) {
        DetailQuestion.nextPage = null;
        DetailQuestion.SelectChecked = "";
        DetailQuestion.SelectId = null;
      } else {
        DetailQuestion.SelectChecked = idx;
        DetailQuestion.nextPage = e.nextTitle;
        DetailQuestion.SelectId = e.id;
        Request.drawFile = null;
      }
    };

    let fileActiveHandler = (idx) => {
      if (Request.drawFile) {
        return true;
      } else {
        return false;
      }
    };

    let activeHandler = (idx) => {
      if (idx === DetailQuestion.SelectChecked) {
        return true;
      } else {
        return false;
      }
    };
    return (
      <>
        <TitleContainer>
          <img src={Qimage} />

          {DetailQuestion.title_list && (
            <TitleQue>
              {DetailQuestion.title_list[DetailQuestion.index - 1] &&
                DetailQuestion.title_list[DetailQuestion.index - 1].question}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {Request.request_type === "development" && (
                <>{DetailQuestion.pageCount + 1}/5</>
              )}
            </TitleQue>
          )}
        </TitleContainer>
        <input
          value={
            DetailQuestion.index < 8
              ? DetailQuestion.SelectChecked
              : ManufactureProcess.SelectChecked
          }
          class="Input"
          style={{ display: "none" }}
        />
        <SelectContainer index={DetailQuestion.index}>
          {
            /* 
            [아랫줄 코드에서 매우 주의할 점]
            DetailQuestion.select까지만 조건부 렌더링을 걸면 안된다.
            꼭 직접 사용할 변수까지 조건을 걸어두어야 에러가 뜨지 않는다. 물론 아래에서 사용하는 'data'는 select 내부에 있는 요소이지만
            select까지만 조건을 걸면 에러가 발생함. 아마 데이터가 들어오는 속도와 렌더링되는 속도에 차이가 있어서 발생하는 문제가 아닐까 싶은데 아무튼 
            조건은 꼭 끝까지 달아주자. 나도 어이없었음
            */
            DetailQuestion.select.data &&
              DetailQuestion.index < 8 &&
              DetailQuestion.select.data.map((data, idx) => {
                return (
                  <div style={{ marginLeft: 33 }}>
                    {DetailQuestion.index == 4 && (
                      <>
                        <FileSelect
                          active={fileActiveHandler(1)}
                          onClick={() =>
                            document.getElementById("FileInput").click()
                          }
                        >
                          <Text id={"queText"} color={"#282c36"}>
                            {Request.drawFile
                              ? this.state.fileName
                              : "파일을 선택해 주세요. 부품별로 첨부해야 정확한 견적이 나옵니다"}
                            {/* { Request.drawFile ? "파일이 있음" : "파일을 선택해 주세요." } */}
                          </Text>
                          <img src={fileImage} />
                          <input
                            id="FileInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              this.onChangeFile(e, { nextTitle: 8 }, 1)
                            }
                            // onClick={(event) => fileSelector({nextTitle: 8}, 1)}
                          />
                        </FileSelect>
                      </>
                    )}

                    {Request.request_type === "development" && (
                      <Select
                        onClick={() => {
                          test(data, idx);
                        }}
                        active={activeHandler(idx)}
                      >
                        <Text
                          active={activeHandler(idx)}
                          id={"queText"}
                          color={"#282c36"}
                        >
                          {data.select}
                        </Text>
                      </Select>
                    )}
                  </div>
                );
              })
          }
          {DetailQuestion.index === 8 && (
            <ProductInfoContainer
              updater={this.props.ManufactureProcess.SelectChecked}
            />
          )}
        </SelectContainer>
      </>
    );
  };

  render() {
    const content = this.content();

    return (
      <RequestCardContainer
        title={"제품 정보 선택"}
        content={content}
      ></RequestCardContainer>
    );
  }
}

export default Step2Container;

const TitleContainer = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TitleQue = styled(Title.FontSize24)`
  font-weight: bold;
  letter-spacing: -0.6px;
  color: #282c36;
  display: inline;
  margin-left: 10px;
`;
const SelectContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  // margin-left: 33px;
  // height:374px;
  height: ${(props) => (props.index == 8 ? "auto" : "374px")};
`;
const Text = styled(Title.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.16px;
  color: ${(props) => (props.active ? "#0933b3" : "black")};
  margin-left: 10px;
`;
const Select = styled.button`
  border: none;
  width: 686px;
  height: 46px;
  background-color: #ffffff;
  object-fit: contain;
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  outline: 0;
  border: ${(props) => (props.active ? "solid 2px #0933b3" : "none")};
  &:hover {
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
  > input {
    width: 100%;
    height: 100%;
  }
  > img {
    margin-left: 10px;
  }
`;
const FileSelect = styled.div`
  border: none;
  width: 686px;
  height: 46px;
  background-color: #ffffff;
  object-fit: contain;
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  outline: 0;
  border: ${(props) => (props.active ? "solid 2px #0933b3" : "none")};
  &:hover {
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
  > input {
    width: 100%;
    height: 100%;
  }
  > img {
    margin-left: 10px;
  }
`;
