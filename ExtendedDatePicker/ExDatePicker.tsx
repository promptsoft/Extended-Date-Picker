import * as React from "react";
import {
  DatePicker,
  IDatePickerStrings
} from "office-ui-fabric-react/lib/DatePicker";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Icon} from "office-ui-fabric-react/lib/Icon";
import { Stack, IStackItemStyles,IStackTokens } from 'office-ui-fabric-react/lib/Stack';

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
}
const outerStackTokens: IStackTokens = { childrenGap: 2 };
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

    this.state = {
      inputDate: props.inputDate,
     CurrentDate: new Date(),
     varreadOnly:props.varreadOnly,
     AllowPastDate:props.Allowpastdate
    };
  }

  render(): JSX.Element {
    return ( 
      <Stack {...outerStackTokens}>
        <Stack horizontal>
        <Stack.Item  disableShrink styles={nonShrinkingStackItemStyles} >
            <Icon className="colorIcon" style={{ color: this.state.inputDate < this.state.CurrentDate ? "red" :"green"}}  iconName="CircleShapeSolid" aria-hidden="true" /> 
          </Stack.Item>
          <Stack.Item grow >
                <DatePicker
                strings={DayPickerStrings}
                firstWeekOfYear={1}
                placeholder="Select a date..."
                ariaLabel="Select a date"
                minDate={this.state.AllowPastDate=="0"?null:this.state.CurrentDate}
                value={this.state.inputDate}
                formatDate={date =>
                  `${date.toLocaleDateString(
                    navigator.languages && navigator.languages[0]
                  )}`
                }
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
