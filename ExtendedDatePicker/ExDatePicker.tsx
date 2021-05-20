import * as React from "react";
import {
  DatePicker,
  IDatePickerStrings
} from "office-ui-fabric-react/lib/DatePicker";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Icon} from "office-ui-fabric-react/lib/Icon";
import { Stack, IStackItemStyles,IStackTokens } from 'office-ui-fabric-react/lib/Stack';

import moment = require("moment");

initializeIcons(undefined, { disableWarnings: true });
const DayPickerStrings: IDatePickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  shortDays: ["S", "M", "T", "W", "T", "F", "S"],
  goToToday: "Go to today",
  prevMonthAriaLabel: "Go to previous month",
  nextMonthAriaLabel: "Go to next month",
  prevYearAriaLabel: "Go to previous year",
  nextYearAriaLabel: "Go to next year",
  closeButtonAriaLabel: "Close date picker"
};

export interface IDatePickerProps {
  inputDateChanged?: (newValue: Date) => void;
  inputDate?: Date;
  CurrentDate?: Date;
  varreadOnly?: string;
  Allowpastdate?: string;
  ShowExpirationForNullOnly?:string;
  DateLocaleFormat?:string;
}
const outerStackTokens: IStackTokens = { childrenGap:2 };
const nonShrinkingStackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 20,
  },
};

export interface IDatePickerState
  extends React.ComponentState,
    IDatePickerProps {}

export class ExDatePicker extends React.Component<
  IDatePickerProps,
  IDatePickerState
> {
  constructor(props: IDatePickerProps) {
    super(props);
    debugger;
    moment.locale('en');
    console.log("Date:" + props.inputDate);
    this.state = {
      inputDate: props.inputDate,
     CurrentDate: new Date(),
     varreadOnly:props.varreadOnly,
     AllowPastDate:props.Allowpastdate,
     DateLocaleFormat:props.DateLocaleFormat,
     ShowExpirationForNullOnly:props.ShowExpirationForNullOnly,
     
    };
  }
  formatDate(dt:Date){
    debugger;
    
    //console.log("format-"+ formatinfo);
    console.log("Date:" + dt);
    return moment(dt).format();
    //return  dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear().toString().substr(-2) ;
  }

  render(): JSX.Element {
    return ( 
      
      <Stack {...outerStackTokens}>
        <Stack horizontal>
          {this.state.ShowExpirationForNullOnly=="0"?
          
              <Stack.Item  disableShrink style={{visibility:this.state.inputDate ==null?'visible': 'hidden',width:this.state.inputDate ==null?20: 0}} styles={nonShrinkingStackItemStyles} >
              <Icon className="colorIcon"  style={{ color: this.state.inputDate ==null ? "red" :"green"}}  iconName="CircleShapeSolid" aria-hidden="true" /> 
            </Stack.Item>
          :
          <Stack.Item  disableShrink  styles={nonShrinkingStackItemStyles} >
            <Icon className="colorIcon"  style={{ color: this.state.inputDate < this.state.CurrentDate ? "red" :"green"}}  iconName="CircleShapeSolid" aria-hidden="true" /> 
          </Stack.Item>
          }
        
          <Stack.Item grow >
                <DatePicker
                formatDate={(date) => this.state.DateLocaleFormat}
                //formatDate={(date) => new Date(date).format(this.state.DateLocaleFormat)}
                strings={DayPickerStrings}
                firstWeekOfYear={1}
                placeholder="Select a date..."
                ariaLabel="Select a date"
                minDate={this.state.AllowPastDate=="0"?null:this.state.CurrentDate}
                value={this.state.inputDate}
                showWeekNumbers={true}
                onSelectDate={this.onSelectDate}
                disabled={this.state.varreadOnly=="0"? true : false }
              />
          </Stack.Item>
        </Stack>
        </Stack>
    );
  }

  private onSelectDate = (value: Date): void => {
    this.setState({ inputDate: value });

    if (this.props.inputDateChanged) {
      this.props.inputDateChanged(value);
    }
  };
}
