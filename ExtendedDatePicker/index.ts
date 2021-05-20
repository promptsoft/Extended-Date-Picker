import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IDatePickerProps, ExDatePicker } from "./ExDatePicker";
export class ExtendedDatePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private notifyOutputChanged: () => void;
	private _container: HTMLDivElement;
	private props: IDatePickerProps = {
	  inputDateChanged: this.inputDateChanged.bind(this)
	  
	};
	private inputDateChanged(newValue: Date) {
		if (this.props.inputDate !== newValue) {
		  this.props.inputDate = newValue;
		  this.props.varreadOnly= this.props.varreadOnly;
		  this.props.Allowpastdate = this.props.Allowpastdate;
		  this.props.ShowExpirationForNullOnly= this.props.ShowExpirationForNullOnly;
		  this.props.DateLocaleFormat = this.props.DateLocaleFormat;
		  this.notifyOutputChanged();
		}
	  }


	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		debugger;
		// Add control initialization code
		this._container = container;
		this.props.CurrentDate =new Date();
		this.props.inputDate = context.parameters.inputDate.raw || new Date();
		this.props.varreadOnly= context.parameters.readOnly.raw;
		this.props.Allowpastdate= context.parameters.Allowpastdate.raw;
		this.props.ShowExpirationForNullOnly= context.parameters.ShowExpirationForNullOnly.raw;
		this.props.DateLocaleFormat = context.parameters.inputDate.formatted;
		this.notifyOutputChanged = notifyOutputChanged;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		debugger;
		if (this.props.inputDate != context.parameters.inputDate.raw) {
			this.props.inputDate = context.parameters.inputDate.raw;
		  }
	  
		  ReactDOM.render(
			React.createElement(ExDatePicker, this.props),
			this._container
		  );
	}

	public getOutputs(): IOutputs
	{
		return {
			inputDate: this.props.inputDate
		  };
	}

	
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this._container);
	}
}