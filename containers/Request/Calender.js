import styled from 'styled-components';
import React, { Component, useRef } from 'react';
import moment from "moment";
import { inject, observer } from 'mobx-react';
import Step3Container from './Step3';
import Step4Container from './Step4';
import Containerv1 from '../../components/Containerv1';
const prevMonth = "/static/images/request/Calendar/prevMonth.png";
const nextMonth = "/static/images/request/Calendar/nextMonth.png";
const dropdown = '/static/images/request/Step4/dropdown.png';

@inject('Request', 'Schedule')
@observer
class Week extends Component {
  state = {
    now: moment()
  }
  Days = (firstDayFormat) => {
    const { Schedule } = this.props;
    const days = [];

    for (let i = 0; i < 7; i++) {
      const Day = moment(firstDayFormat).add('d', i);
      days.push({
        yearMonthDayFormat: Day.format("YYYY-MM-DD"),
        holyDayCompare: Day.format("MM-DD"),
        getDay: Day.format('D'),
        getMonth: Day.format('M'),
        getYear: Day.format('YYYY'),
        isHolyDay: false
      });
    }
    return days;
  }
  calendarOnOff = (e) => {
    const { Request, Schedule } = this.props;
      if (Schedule.calendarOnOff == true) {
        Schedule.calendarOnOff = false;
      }
      else {
        Schedule.calendarOnOff = true;
      }
      let day = e.currentTarget.innerHTML.replace(/[^0-9]/g,'');
      const dayValue = Schedule.nowMoment;

      Schedule.clickDay = dayValue.date(day).format("YYYY년 M월 D일");
      Schedule.setTodayDate(dayValue.date(day).format("YYYY-MM-DD "));
  }

  mapDaysToComponents = (Days, fn = () => { }) => {
    const { Schedule } = this.props;
    const { now } = this.state;
    const occupied = Schedule.date_occupied;

    return Days.map((dayInfo, i) => {
      let className = "date-weekday-label";
      let thisMoment = moment();
      if (!Schedule.nowMoment.isSame(dayInfo.yearMonthDayFormat,'month')) {
        className = "not-month";
      }
      else if (i === 0) {
        className = "date-sun";
      }
      else if (i === 6) {
        className = "date-sat";
      }
      else if (parseInt(thisMoment.format('D')) > parseInt(dayInfo.getDay) && parseInt(thisMoment.format("M")) == parseInt(dayInfo.getMonth) && parseInt(thisMoment.format("Y")) == parseInt(dayInfo.getYear)) {
        className = "not-day";
      }
      else if (parseInt(thisMoment.format('M')) > parseInt(dayInfo.getMonth)) {
        className = "not-day";
      }
      else if (parseInt(thisMoment.format('YYYY')) > parseInt(dayInfo.getYear)) {
        className = "not-day";
      }
      else if (occupied.includes(dayInfo.yearMonthDayFormat)) {
        className = "not-book";
      }
      if (dayInfo.yearMonthDayFormat === moment().format("YYYY-MM-DD") && Schedule.nowMoment.format('M') === dayInfo.getMonth) {
        className += "today";
        console.log(className);
        return (
          <div className={className} onClick={ this.calendarOnOff }>
            {dayInfo.getDay}
            <div>오늘</div>
          </div>
        )
      }
      else {
        return (
          <div className={className} onClick={ this.calendarOnOff }>
            {dayInfo.getDay}
          </div>
        )
      }
    })
  }
  render() {
    return (
      <>
        {this.mapDaysToComponents(this.Days(this.props.firstDayOfThisWeekformat))}
      </>
    )
  }
}
@inject('Schedule')
@observer
class Calendar extends Component {
  state= {
    now: moment(),
  }
  componentDidMount() {
    const { Schedule } = this.props;
    this.setState({
      now : Schedule.nowMoment,
    })
  }
  moveMonth = (month) => {
    const { Schedule } = this.props;
    Schedule.nowMoment.add(month, 'M');
    Schedule.setTodayDate(this.state.now.format("YYYY-MM-01 "));
    this.setState({
      now : Schedule.nowMoment,
    })
  }
  //요일
  dateToArray = (dates) => {
    if (Array.isArray(dates)) {
      return dates;
    }
    else if (typeof dates === "string") {
      return dates.split(',')
    }
    else{
      return ["일", "월", "화", "수", "목", "금", "토"]
    }
  }
  mapArrayToDate = (dateArray) => {
    if (dateArray.length !== 7){
      dateArray = ["일", "월", "화", "수", "목", "금", "토"];
    }
    return dateArray.map((date, index) => {
      const className = () => {
        if (index === 0){
          return "date-sun";
        }
        else if(index === 6) {
          return "date-sat";
        }
        else {
          return "date-weekday";
        }
      }
      return (
        <div className={className()}>
          {date}
        </div>
      )
    })
  }
  calendarOnOff = () => {
    const { Schedule } = this.props;
    if (Schedule.calendarOnOff == true) {
      Schedule.calendarOnOff = false;
    }
    else {
      Schedule.calendarOnOff = true;
    }
  }

  // 날짜 입력
  Weeks = (monthYear) => {
    const firstDayOfMonth = moment(monthYear).startOf('month');
    const firstDateOfMonth = firstDayOfMonth.get('d');
    const firstDayOfWeek = firstDayOfMonth.clone().add('d', -firstDateOfMonth);
    const Weeks = [];
    for (let i = 0; i < 6; i++) {
      Weeks.push((
        <Week firstDayOfThisWeekformat={firstDayOfWeek.clone().add('d', i * 7).format("YYYY-MM-DD")} />
      ))
    }
    return Weeks;
  }
  render() {
    const { now } = this.state;
    const { Schedule } = this.props;
    return (
      <>
        { Schedule.calendarOnOff == true &&
          <MainContainer display1={ this.state.hid }>
            <Header>
              <div onClick={() => this.moveMonth(-1)}><img src={ prevMonth }/></div>
              <HeaderText>{now.format("YYYY.MM")}</HeaderText>
              <div onClick={() => this.moveMonth(1)}><img src={ nextMonth }/></div>
            </Header>
            <DateContainer>
              {this.mapArrayToDate(this.dateToArray(this.props.dates))}
            </DateContainer>
            <CalendarContainer>
              {this.Weeks(now)}
            </CalendarContainer>
          </MainContainer>
        }
        { Schedule.calendarOnOff == false &&
        <FoldedComponent onClick={ this.calendarOnOff }>
          { Schedule.clickDay }
          <img src={dropdown} />
        </FoldedComponent>
        }
      </>
    )
  }
}

export default Calendar;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  width: 798px;
  height: 639px;
  margin-top: 6px;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 176px;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 40px;
`
const HeaderText = styled.div`
  height: auto;
  font-family: AppleSDGothicNeoB00;
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.7px;
  text-align: left;
  color: #282c36;
`
const DateContainer = styled.div`
  width: 714px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 25px;
  > div {
    text-align: center;
    width: 102px;
    font-family: NotoSansCJKkr;
    font-size: 22px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.55px;
    color: #282c36;
  }
  .date-sun {
    color: #c6c7cc;
  }
  .date-sat {
    color: #c6c7cc;
  }
`
const CalendarContainer = styled.div`
  width: 700px;
  display: grid;
  height: 432px;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-left: 25px;
    margin-top: 11px;
    //border: solid 0.5px rgba(198,199,204,0.5);
    //border-collapse: collapse;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.18px;
    color: #282c36;
    > div {
      font-family: Roboto;
      line-height: 1.4;
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.12px;
      color: #282c36;
    }
    :hover {
      background-color: #e1e2e4;
      color: black;
      > div {
        color: black;
        display: none;
      }
    }
    :focus {
      background-color: #0933b3;
      color: white;    
    }
  }
  .date-sun {
    color: #c6c7cc;
    pointer-events: none;
  }
  .date-sat {
    color: #c6c7cc;
    pointer-events: none;
  }
  .not-month {
    visibility: hidden;
    pointer-events: none;
    color: #c6c7cc;
    }
  .not-day {
    pointer-events: none;
    color: #c6c7cc;
  }
  .date-weekday-labeltoday {
    pointer-events: none;
    color: #c6c7cc;
    > div {
      position: absolute;
      margin-top: 38px;
      color: #c6c7cc;
    }
  }
  .not-book {
    pointer-events: none;
    color: #c6c7cc;
  }
  .not-booktoday {
    pointer-events: none;
    color: #c6c7cc;
    > div {
      position: absolute;
      margin-top: 38px;
      color: #c6c7cc;
    }
    //pointer-events: none;
    //background-color: #e1e2e4;
    //> div {
    //  position: absolute;
    //  margin-top: 38px;
    //  color: #e1e2e4;
    //}
  }
`
const FoldedComponent = styled.div`
  width: fit-content;
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 8px 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: var(--white);
  margin-top : 6px;
  line-height: 1.3;
  > img {
    width: 14px;
    height: 8px;
    margin-left: 22px;
  }
`
