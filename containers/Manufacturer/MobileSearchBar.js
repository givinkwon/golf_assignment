import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
// import SelectComponent from "./Select";
import SelectComponent from "./MobileSelect";
import ButtonComponent from "components/Buttonv2";

import Background from "components/Background";
import Container from "components/Containerv1";

import { toJS } from "mobx";

// import RadioButton from "./RadioButton";

import { PRIMARY2 } from "static/style";

const filter_img = "static/images/manufacturer/filter.png";
const search_img = "static/images/manufacturer/search.png";

@inject("Auth", "Project", "Request", "Partner")
@observer
class MobileSearchBarConatiner extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
    radioValue: true,
    filter_active: false,
  };

  selectClick = () => {
    const { list } = this.state;
    this.setState({ list: true });
  };

  selectOut = () => {
    const { list } = this.state;
    this.setState({ list: false });
  };

  searchText = (e) => {
    const { Partner } = this.props;
    // this.props.Partner.search_text = e.target.value;
    this.setState({ search: e.target.value });
    Partner.search_text = e.target.value;
  };
  search = () => {
    const { Partner } = this.props;

    Partner.currentPage = 1;
    Partner.category_dic = {};
    Partner.getPartner();
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      modal_open: false,
    });
  };
  handleKeyDown = (e) => {
    const { Partner } = this.props;
    if (e.key === "Enter") {
      Partner.currentPage = 1;
      Partner.category_dic = {};
      Partner.getPartner();
    }
  };
  async componentDidMount() {
    await this.props.Auth.checkLogin();
    console.log(this.props.Project.input_category);
  }

  onClickHandler = (idx) => {
    console.log("click");
    const { Partner } = this.props;
    console.log(idx);
    console.log(Partner.filter_checked_idx);
    if (Partner.filter_checked_idx !== idx) {
      this.setState({ index: idx });
      Partner.filter_checked_idx = idx;

      Partner.filter_region = idx;
      Partner.partner_next = null;
      Partner.partner_count = null;
      // this.count = 0;
      Partner.currentPage = 1;
      Partner.getPartner();
    }
  };
  activeHandler = (idx) => {
    const { Partner } = this.props;

    if (idx === Partner.filter_checked_idx) {
      console.log("ture");
      return true;
    } else {
      console.log("false");
      return false;
    }
  };

  filterActiveHandler = () => {
    if (this.state.filter_active) {
      this.setState({ filter_active: false });
      this.props.Partner.check_click_filter = false;
    } else {
      this.setState({ filter_active: true });
      this.props.Partner.check_click_filter = true;
    }
  };
  render() {
    const { Partner } = this.props;
    return (
      <Form active={this.state.filter_active}>
        <Box
          active={this.state.list === true}
          onClick={() =>
            this.state.list ? this.selectOut() : this.selectClick()
          }
          onBlur={() => this.selectOut()}
        >
          {/* <input
            placeholder="원하는 분야의 제조업체를 검색하세요"
            // value={Partner.search_text}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder = "원하는 분야의 제조업체를 검색하세요")
            }
            onChange={this.searchText}
            class="Input"
            onKeyDown={this.handleKeyDown}
          /> */}
        </Box>
        <SearchFilterBox>
          <SearchBar>
            <div>
              <input
                style={{ display: "none" }}
                // value={
                //   Request.select_big ? Request.select_big.maincategory : ""
                // }
                class="Input"
              />
              <Select
                placeholder="전체"
                options={categoryArray}
                getOptionLabel={(option) => option.label}
                value={Partner.input_category}
                onChange={Partner.setCategory}
              />
            </div>
            <div>
              <input
                // placeholder="원하는 분야의 제조업체를 검색하세요"
                // // value={Partner.search_text}
                // onFocus={(e) => (e.target.placeholder = "")}
                // onBlur={(e) =>
                //   (e.target.placeholder = "원하는 분야의 제조업체를 검색하세요")
                // }
                onChange={this.searchText}
                class="Input"
                onKeyDown={this.handleKeyDown}
              />
            </div>
            <div>
              {" "}
              <SearchButton
                width={50}
                style={{ height: "36px", width: "20px", margin: "0 auto" }}
                borderColor={PRIMARY2}
                borderRadius={0}
                onClick={this.search}
              >
                <img style={{ width: 18, height: 18 }} src={search_img} />
              </SearchButton>
            </div>
          </SearchBar>
          <Filter
            onClick={() => {
              this.filterActiveHandler();
            }}
          >
            <img src={filter_img} />
          </Filter>
        </SearchFilterBox>
        <FilterContainer
          style={{ flex: "0 auto" }}
          active={this.state.filter_active}
        >
          {Partner.filter_city_ary.map((item, idx) => {
            return (
              <>
                {console.log(toJS(item))}
                <FilterContent
                  onClick={() => {
                    this.onClickHandler(item.id);
                  }}
                  active={this.activeHandler(item.id)}
                >
                  <div active={this.activeHandler(item.id)}>
                    <div active={this.activeHandler(item.id)}></div>
                  </div>
                  <span>{item.city}</span>
                </FilterContent>
              </>
            );
          })}
        </FilterContainer>
      </Form>
    );
  }
}

export default MobileSearchBarConatiner;

const filterArray = [
  { label: "카테고리", value: 0, checked: true },
  { label: "카테고리", value: 1, checked: false },
  { label: "카테고리", value: 2, checked: false },
  { label: "카테고리", value: 3, checked: false },
  { label: "카테고리", value: 4, checked: false },
];
const categoryArray = [
  { label: "전체", value: "전체" },
  { label: "만든 제품", value: "만든 제품" },
  // { label: "제목", value: "제목" },
  // { label: "내용", value: "내용" },
];
const region_data = [
  {
    id: 0,
    name: "전체",
    checked: "false",
  },
  {
    id: 1,
    name: "인천 남동|시화|반월공단",
    checked: "false",
  },
  {
    id: 2,
    name: "인천 서구",
    checked: "false",
  },
  {
    id: 3,
    name: "경기도 화성",
    checked: "false",
  },
  {
    id: 4,
    name: "경기도 부천",
    checked: "false",
  },
  {
    id: 5,
    name: "경기도 파주|양주|고양",
    checked: "false",
  },
  {
    id: 6,
    name: "서울 문래동",
    checked: "false",
  },
  {
    id: 7,
    name: "서울 성수동",
    checked: "false",
  },
  {
    id: 8,
    name: "서울 을지로",
    checked: "false",
  },
];

const SearchBar = styled.div`
  display: flex;
  width: 75%;
  height: 43px;
  box-sizing: border-box;
  margin 0 24px;
  border: 1px solid #c6c7cc;
  border-radius: 3px;
  >div:nth-of-type(1){
    //border: 1px solid blue;
    flex-grow:1;
    //width:calc(40% - 20px);
    width: 70px;
  }

  >div:nth-of-type(2){
    //border: 1px solid green;
    flex-grow:5;
    input {
        width: 95%;
        height: 36px;
        //padding: 0 14px;
        padding-left: 10px;
    
        //border: 1px solid #c6c7cc;
        border: none;
        border-radius: 3px;
        :focus {
          outline: none;
        }
        ::placeholder{
          color: #c1bfbf;
        }
      }
}
>div:nth-of-type(3){
    //border: 1px solid black;
    flex-grow:1;

    
}


@media (min-width: 0px) and (max-width: 380px) {
  //margin-top: 30px;    
  input {
    font-size: 12px;
    width: 100%;
  }

  >div:nth-of-type(1){
    width: 70px;
  }

  >div:nth-of-type(2){
    //border: 1px solid green;
    flex-grow:5;
    input {
      
        padding-left: 15px;
    
    }
      
}

}


@media (min-width: 380px) and (max-width: 480px) {
  //margin-top: 30px;    
  input {
    font-size: 12px;
    width: 100%;
  }

  >div:nth-of-type(1){
    width: 70px;
  }
}

@media (min-width: 480px) and (max-width: 580px) {
  //margin-top: 30px;    
  input {
    font-size: 12px;
    width: 100%;
  }

  >div:nth-of-type(1){
    width: 60px;
  }
}

  @media (min-width: 580px) and (max-width: 767.98px) {
    //margin-top: 30px;    
    input {
      font-size: 12px;
      width: 100%;
    }
    >div:nth-of-type(1){
      width: 50px;
    }

  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 30px;
    input {
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 40px;
    input {
      font-size: 17px;
    }
  }
  @media (min-width: 1300px) {
    input {
      font-size: 18px;
    }
  }
`;
const Form = styled.div`
  //margin-top: 90px;
  width: 100%;
  // display: flex;
  // justify-content: flex-start;
  //height: 43px;
  box-shadow: ${(props) =>
    props.active ? "0 4px 2px -2px rgba(0, 0, 0, 0.2)" : ""};
  position: ${(props) => (props.active ? "fixed" : "static")};
  top: ${(props) => (props.active ? "53px" : "")};
  z-index: 1;
  background-color: #ffffff;
  padding-top: ${(props) => (props.active ? "12px" : "")};
`;

const SearchButton = styled(ButtonComponent)`
  border-radius: 3px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 70px;
    border: 1px solid #ffffff;
    img {
      margin-right: 0 !important;
    }
    > p {
      display: none;
    }
  }
`;

const Select = styled(SelectComponent)`
  //   width: 220px;
  height: 36px;
  box-sizing: border-box;

  option {
    color: #c1bfbf;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 0;
    padding: 0;
    margin-right: 8px;
    width: 100%;
    height: 36px;
    object-fit: contain;
    border-radius: 2px;
    //border: solid 0.5px #c7c7c7;
    background-color: #ffffff;
    position: relative;
  }
`;
const SearchFilterBox = styled.div`
  //border: 2px solid green;
  display: flex;
  align-items: center;
`;
const Filter = styled.div`
  //border: 2px solid red;

  > img {
    width: 36px;
    height: 36px;
  }
`;

const FilterContainer = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  flex-wrap: wrap;
  padding: 0 24px;
  box-sizing: border-box;
  margin-top: 14px;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);
`;
const FilterContent = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  text-align: center;
  margin-bottom: 14px;
  > div {
    width: 13px;
    height: 13px;
    border: ${(props) =>
      props.active ? "1px solid #0933b3" : "1px solid #999999"};
    border-radius: 12px;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    > div {
      display: ${(props) => (props.active ? "block" : "none")};
      width: 7px;
      height: 7px;
      //border: 1px solid #0933b3;
      border-radius: 6px;
      background-color: #0933b3;
      // position: absolute;
      // top: 50%;
      // left: 50%;
    }
  }
  > span {
    margin-left: 11px;
    font-size: 14px;
    line-height: 15px;
    letter-spacing: -0.35px;
    color: #999999;
  }
`;

const Box = styled.div`
  //   width: 220px;

  ${(props) =>
    props.active &&
    css`
      svg {
        @keyframes select {
          0% {
            transform: skewY(-180deg);
          }
        }

        animation: select 0.4s ease-out;
        transform: rotate(-180deg);
      }
    `}

  ${(props) =>
    !props.active &&
    css`
      svg {
        @keyframes selectOut {
          0% {
            transform: rotate(-180deg);
          }
        }
        animation: selectOut 0.4s;
      }
    `}
`;
