import { observable, action } from "mobx";

import * as ProjectAPI from "axios/Project";
import * as AccountAPI from "axios/Account";
import { toJS } from "mobx";

class Project {
  constructor() {
    //makeObservable(this);
  }
  @observable project_existence = true;

  // 프로젝트 데이터 관련 변수
  @observable projectDataList = [];
  @observable projectData = [];
  @observable project_next = null;
  @observable project_count = null;
  @observable project_status = "";
  @observable projectDetailData = "";
  @observable selectedProjectId = null;
  // 페이지 관련 변수
  @observable project_page = ["", "", "", "", ""];
  @observable currentPage = 1;
  // 필터 & 라디오박스 관련 변수
  @observable filter_price = "전체";
  @observable radiobox_checked_idx = "1";
  // 카테고리 데이터 관련 변수
  @observable input_category = null;
  @observable product_idx = 0;
  @observable middle_category_idx = [0, 0, 0, 0, 0];
  @observable middle_category_name = ["", "", "", "", ""];
  @observable main_category_idx = [0, 0, 0, 0, 0];
  @observable main_category_name = ["", "", "", "", ""];
  @observable newIndex = 0;
  @observable myIndex = 0;
  @observable chattingIndex = 0;
  // * 삭제 예정 * 옛날 데이터 관련 변수
  @observable data_dt = [];
  // 검색 관련 변수
  @observable search_text = "";

  //채팅 관련 변수
  @observable chatModalActive = false;
  @observable chatMessages = [];

  // 제안서 별 채팅방 연결 관련 변수
  @observable answerDetailList = [];

  @action setCategory = (val) => {
    this.input_category = val;
  };
  @action category_reset = () => {
    this.middle_category_idx = [0, 0, 0, 0, 0];
    this.middle_category_name = ["", "", "", "", ""];
    this.main_category_idx = [0, 0, 0, 0, 0];
    this.main_category_name = ["", "", "", "", ""];
  };
  /* 삭제 검토 중 */
  @action getNextPage = (clientId, callback = null) => {
    if (!this.project_next) {
      return;
    }
    const token = localStorage.getItem("token");
    const req = {
      nextUrl: this.project_next,
      params: {
        client: clientId,
        // page: page
      },
      headers: {
        //  Authorization: `Token ${token}`,
      },
    };
    ProjectAPI.getNextPage(req)
      .then((res) => {
        console.log(res.data.results);
        this.projectData = this.projectData.concat(res.data.results);
        this.project_next = res.data.next;
        //this.project_page = parseInt(this.project_count/5) + 1
        if (callback) {
          callback();
        }
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
  /* 클라이언트 - project API 데이터 가져오기 */
  @action getPage = (clientId, page = 1) => {
    this.projectDataList = [];

    console.log(toJS(clientId));
    if (!clientId) {
      return;
    }
    const token = localStorage.getItem("token");
    const req = {
      params: {
        request__client: clientId,
        page: page,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    ProjectAPI.getProjects(req)
      .then((res) => {
        this.projectDataList = res.data.results;
        console.log(res.data.results);
        this.project_next = res.data.next;
        this.project_count = res.data.count;
        this.project_page = parseInt((this.project_count - 1) / 5) + 1;
        this.getCategory();
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  /* 해당 클라이언트의 모든 프로젝트 가져오기 */
  @action getAllProject = async (clientId) =>{
    this.projectDataList = [];
    console.log(toJS(clientId));
    if (!clientId) {
      return;
    }
    const token = localStorage.getItem("token");
    const req = {
      params: {
        request__client: clientId,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    await ProjectAPI.getProjects(req)
      .then((res) => {
        this.projectDataList = res.data.results;
        console.log(res.data.results);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };


  /* 파트너 - 전체 + 가격 별 + search별 다 포함시켰음 */
  @action getProjectByPrice = (search_text, page = 1) => {
    this.projectDataList = [];
    this.data_dt = [];
    const token = localStorage.getItem("token");
    const req = {
      params: {
        request__request_state: this.filter === "전체" ? "" : this.filter,
        search: search_text,
        page: page,
        ordering: "-id",
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    ProjectAPI.getProjects(req)
      .then((res) => {
        this.projectDataList = [];
        /* 오래된 데이터 제외하기 위함 */

        this.projectDataList = res.data.results;
        this.project_next = res.data.next;
        this.project_count = res.data.count;
        this.project_page = parseInt((this.project_count - 1) / 5) + 1;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
  @action getProjectDetail = async (id) => {
    console.log(id);
    const req = {
      id: id,
    };
    console.log(req);
    await ProjectAPI.getProjectDetail(req)
      .then((res) => {
        this.projectDetailData = res.data;
        console.log(res.data);
        console.log(toJS(this.projectDetailData));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action setProjectDetailData = (data) => {
    // this.projectDetailData = data;
    // Router.push(`/project/${data.id}`);
  };

  @action exitProject = (id) => {
    const req = {
      id: id,
      data: {
        status: "모집종료",
      },
    };
    ProjectAPI.exitProject(req)
      .then((res) => {
        this.projectDetailData = res.data;
        console.log(res.data);
        console.log(toJS(this.projectDetailData));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
}

export default new Project();
