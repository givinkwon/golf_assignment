import React from "react";
import styled from "styled-components";
import * as Text from "components/Text";
import { DARKGRAY } from "static/style";
import * as Content from "components/Content";
import { inject, observer } from "mobx-react";
import { CompressedPixelFormat } from "three";
import { toJS } from "mobx";

const addButtonImg = "static/images/components/Input2/Mask.png";
const deleteButtonImg = "/static/images/delete.png";

@inject("Request", "ManufactureProcess", "Project")
@observer
class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.file = React.createRef();
  }
  state = {
    fileArray: [],
    fileName: "",
    file: "",
    checkFileUpload: false,
  };

  async componentDidMount() {
    const { ManufactureProcess, Project } = this.props;
    console.log("AddFile2AddFile2AddFile2AddFile2AddFile2AddFile2");
    if (ManufactureProcess.changeProject) {
      this.setState({ checkFileUpload: true });

      // await Project.projectDetailData.request_set[0].requestfile_set.map(
      //   (item, idx) => {
      //     console.log(toJS(item));
      //     if (item.share_inform) {
      //       ManufactureProcess.openFileArray.push(item);
      //     } else {
      //       ManufactureProcess.privateFileArray.push(item);
      //     }
      //   }
      // );
      // await ManufactureProcess.openFileArray.push(
      //   Project.projectDetailData.request_set[0].requestfile_set
      // );
    }
    console.log(toJS(ManufactureProcess.openFileArray));
  }
  onChange = (e) => {
    if (this.props.type === "file") {
      this.props.onChange(e.currentTarget.files[0]);
    } else {
      this.props.onChange(e.currentTarget.value);
    }
  };

  openOnChangeFile = (e) => {
    const { Request, ManufactureProcess } = this.props;
    var file = document.getElementById("inputFile");

    var filePath = file.value;
    console.log(filePath);

    const reader = new FileReader();
    reader.readAsDataURL(e.currentTarget.files[0]);
    reader.addEventListener("load", () => {
      this.setState({ src: reader.result });
      //console.log(reader);
      //console.log(reader.result);
    });

    // var reader = new FileReader();
    // reader.readAsText(e.currentTarget.files[0]);
    // reader.onload = function (event) {
    //   // The file's text will be printed here
    //   console.log(event.target.result);
    // };

    if (e && e.currentTarget.files[0]) {
      console.log(e.currentTarget.files[0]);
      for (var item in e.currentTarget.files) {
        console.log(item);
        if (typeof e.currentTarget.files[item] === "object") {
          ManufactureProcess.openFileArray.push(e.currentTarget.files[item]);
        } else {
          break;
        }
      }

      const fileName = e.currentTarget.files[0].name;
      // this.setState({ fileArray: this.state.fileArray.push({ file: e.currentTarget.files[0] }) });
      //ManufactureProcess.openFileArray.push({ file: e.currentTarget.files[0] });

      this.setState({
        ...this.state,
        file: e.currentTarget.files[0],
        fileName: fileName,
        checkFileUpload: true,
      });

      const formData = new FormData();
      const files = e.target.files;

      //formData.append('file', ManufactureProcess.openFileArray)
      // for (let i = 0; i < ManufactureProcess.openFileArray.length; i++) {
      //   formData.append(`file[${i}]`, ManufactureProcess.openFileArray[i].file);
      //   console.log(toJS(ManufactureProcess.openFileArray[i]).file);
      //   console.log(toJS(ManufactureProcess.openFileArray[i]));
      // }
      // for (let value of formData.values()) {
      //   console.log(value);
      // }

      //console.log(formData.values);
      //console.log(formData);

      Request.setCommonFile(e.currentTarget.files[0]);
      console.log(toJS(ManufactureProcess.openFileArray));
    }
  };

  privateOnChangeFile = (e) => {
    const { Request, ManufactureProcess } = this.props;

    if (e && e.currentTarget.files[0]) {
      for (var item in e.currentTarget.files) {
        if (typeof e.currentTarget.files[item] === "object") {
          ManufactureProcess.privateFileArray.push(e.currentTarget.files[item]);
        } else {
          break;
        }
      }

      //console.log(e.currentTarget.files[0]);
      //console.log(e.currentTarget.files[1]);
      const fileName = e.currentTarget.files[0].name;
      // this.setState({ fileArray: this.state.fileArray.push({ file: e.currentTarget.files[0] }) });

      this.setState({
        ...this.state,
        file: e.currentTarget.files[0],
        fileName: fileName,
        checkFileUpload: true,
      });
      Request.setCommonFile(e.currentTarget.files[0]);
    }
    console.log(ManufactureProcess.privateFileArray);
    console.log(toJS(ManufactureProcess.privateFileArray));
  };

  render() {
    const {
      onChange,
      children,
      label,
      file,
      Request,
      ManufactureProcess,
      isOpen,
      mobile,
      ...props
    } = this.props;
    const { fileName, checkFileUpload } = this.state;

    if (!file) {
      return (
        <Wrap width={this.props.width}>
          {label && (
            <Text.FontSize20 color={DARKGRAY} fontWeight={500}>
              {label}
            </Text.FontSize20>
          )}
          <InputBox marginTop={label ? 12 : 0}>
            <Input>
              <input {...props} onChange={this.onChange} />
            </Input>
            {children}
          </InputBox>
        </Wrap>
      );
    }

    return (
      <Wrap width={this.props.width}>
        <FileText mobile={mobile} checkFileUpload={this.state.checkFileUpload}>
          <InputBox
            mobile={mobile}
            style={{ width: "100%", display: "inline-flex" }}
          >
            <div>
              <input
                type="file"
                multiple={"multiple"}
                fileName={"fileName[]"}
                style={{ display: "none" }}
                onChange={
                  isOpen ? this.openOnChangeFile : this.privateOnChangeFile
                }
                id="inputFile"
                ref={this.file}
                value=""
                placeholder={"파일을 선택해 주세요."}
              />

              <div
                onClick={() => {
                  console.log(this.file);
                  this.file.current.click();
                }}
              >
                <span>파일첨부</span>
                <img src={addButtonImg} />
              </div>
              <div>
                {isOpen ? (
                  <>
                    {ManufactureProcess.openFileArray.map((item, idx) => {
                      return (
                        <>
                          <span
                            onClick={() => {
                              if (checkFileUpload) {
                                ManufactureProcess.openFileArray.splice(idx, 1);
                                const inputFile = document.getElementById(
                                  "inputFile"
                                );
                                console.log(
                                  toJS(ManufactureProcess.openFileArray)
                                );
                                inputFile.innerHTML = "";

                                if (
                                  ManufactureProcess.openFileArray.length === 0
                                ) {
                                  this.setState({ checkFileUpload: false });
                                }
                              }
                            }}
                          >
                            <span>
                              <span>
                                {!item.name
                                  ? decodeURI(item.file.split("/").pop())
                                  : item.name}
                              </span>
                              <DeleteFile
                                src={deleteButtonImg}
                                style={{
                                  display: this.state.checkFileUpload
                                    ? "inline"
                                    : "none",
                                }}
                              />
                            </span>
                          </span>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {ManufactureProcess.privateFileArray.map((item, idx) => {
                      return (
                        <>
                          <span
                            onClick={() => {
                              if (checkFileUpload) {
                                ManufactureProcess.privateFileArray.splice(
                                  idx,
                                  1
                                );
                                const inputFile = document.getElementById(
                                  "inputFile"
                                );
                                inputFile.innerHTML = "";

                                if (
                                  ManufactureProcess.privateFileArray.length ===
                                  0
                                ) {
                                  this.setState({ checkFileUpload: false });
                                }
                              }
                            }}
                          >
                            <span>
                              <span>
                                {!item.name
                                  ? decodeURI(item.file.split("/").pop())
                                  : item.name}
                              </span>
                              <DeleteFile
                                src={deleteButtonImg}
                                style={{
                                  display: this.state.checkFileUpload
                                    ? "inline"
                                    : "none",
                                }}
                              />
                            </span>
                          </span>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </InputBox>
        </FileText>
      </Wrap>
    );
  }
}

export default InputComponent;

const InputBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;  
  border: solid 1px #ffffff;
  color: #404040;
  border-radius: 3px;
  box-sizing: border-box;

  >div{
    display: ${(props) => (props.mobile ? "" : "inline-flex")};
    width: ${(props) => (props.mobile ? "100%" : "")};

    >div:nth-of-type(1){        
      margin-right: 40px;
      cursor: pointer;
      width: ${(props) => (props.mobile ? "100%" : "")};

      >span{
        font-size: ${(props) => (props.mobile ? "14px" : "18px")};
        line-height: 40px;
        letter-sacing: ${(props) => (props.mobile ? "-0.35px" : "-0.45px")};
        color: #0933b3;
        font-weight: normal;
        box-sizing: border-box;
        margin-right: 5px;
      }
      >img {
        vertical-align : baseline;
        width: ${(props) => (props.mobile ? "20px" : "")};
        height: ${(props) => (props.mobile ? "18px" : "")};
      }      
    }
      
    >div:nth-of-type(2){      
      width: 950px;   
      word-wrap: break-word;
      word-break:break-all;
      
      >span{      
        >span{          
          >span{
            margin-right: 10px;
            font-size: 18px;
            line-height: 40px;
            letter-spacing: -0.45px;
            color: #282c36;
            font-weight: normal;
            cursor: pointer;
          }
        }
      }
    }
  }
}

  // @media (min-width: 0px) and (max-width: 767.98px) { 
  //   height: 100%;
  //   height: 34px;
  //   object-fit: contain;
  //   border-radius: 3px;
  //   background-color: #ffffff;
  //   > img {
  //     position: relative;
  //     padding-top: 8px;
  //     padding-bottom: 8px;
  //     padding-right: 20px;
  //     padding-left: 0;
  //     width: 20px;
  //     height: 18px;
  //   }
  // }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "100%")};
`;
const Input = styled.div`
  width: 100%;
  margin-top: ${(props) => props.marginTop}px;
  color: #404040;
  font-weight: 400;
  padding-left: 2.3%;
  :focus {
    outline: none;
  }
  > input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 !important;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.18px;
    text-align: left;
    font-size: 18px;
    :focus {
      outline: none;
    }
    ::placeholder {
      font-weight: 400;
      color: #c6c7cc;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding-left: 2.3% !important;
  > input {
    width: 100%;
    height: 100%;
    border: none;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.18px;
    text-align: left;
    font-size: 14px;
    :focus {
      outline: none;
    }
    ::placeholder {  
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.43;
      letter-spacing: -0.35px;
      text-align: left;
      color: #999999;
      padding-left: 0;
    }
  }
`;
const FileText = styled(Content.FontSize18)`
  //width: 1152px;
  width: ${(props) => (props.mobile ? "100%" : "1152px")}
  font-stretch: normal;
  font-style: normal;
  line-height: 40px;
  letter-spacing: -0.18px;
  text-align: left;
  color: #c6c7cc;
  display: inline-flex;
  align-items: center;
  padding: ${(props) => (props.mobile ? "0 0 0 14px" : "14px 16px")};
  flex-wrap: wrap;
  background-color: #ffffff;
  box-sizing: border-box;
  height: ${(props) => (props.mobile ? "100%" : "")}
  > span:nth-of-type(1) {
    > span {
      > img {
        margin: auto;
      }
    }
  }
  > span {
    align-self: center;

    > span {
      margin-right: 10px;
      color: #282c36;
      font-weight: normal;
    }

    > img:last-child {
      margin-right: 20px;
    }
  }
  // @media (min-width: 0px) and (max-width: 767.98px) {
  //   font-size: 14px !important;
  //   padding-top: 0px;
  //   font-weight: normal;
  //   font-stretch: normal;
  //   font-style: normal;
  //   line-height: 2.43;
  //   letter-spacing: -0.35px;
  //   text-align: left;
  //   color: #999999;
  // }
`;
const DeleteFile = styled.img`
  width: 18px;
  height: 18px;
  padding: 2px;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 9px;
  background-color: #e1e2e4;
  align-self: center;
  line-height: 40px;
  letter-spacing: -0.45px;
  margin-right: 29px;
  vertical-align: middle;
  cursor: pointer;
`;
