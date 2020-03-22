sap.ui.define([
	'sap/m/UploadCollectionParameter', 'sap/m/MessageToast',
	'jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/ui/model/Filter', 'sap/ui/model/json/JSONModel', 'sap/m/Label',
	'sap/ui/model/FilterOperator', 'sap/ui/core/util/Export', 'sap/viz/ui5/api/env/Format', 'sap/viz/ui5/format/ChartFormatter',
	'sap/ui/core/util/ExportTypeCSV', 'sap/m/MessageBox', 'sap/m/Token', "sap/ui/core/format/DateFormat", "sap/m/MenuItem"
], function (UploadCollectionParameter, MessageToast, jQuery, Controller, Filter, JSONModel, ChartFormatter, InitPageUtil, Label, Format,
	FilterOperator, Export, ExportTypeCSV,
	MessageBox, Token, DateFormat, MenuItem) {
	"use strict";

	return Controller.extend("cs.Cruscotto.controller.Master", {

			onInit: function () {
				var view = this.getView();
				var model = new sap.ui.model.json.JSONModel({
					"ItemSet": [{
						"T": "Project Italy",
						"Flag":  jQuery.sap.getModulePath("cs.Cruscotto", "/images/it.png"),
						"expanded": "no",
						"Zexpanded": "no",
						"Content": []
					}, {
						"T": "Project India",
						"Flag":  jQuery.sap.getModulePath("cs.Cruscotto", "/images/in.png"),
						"expanded": "no",
						"Zexpanded": "no",
						"Content": []
					}, {
						"T": "Project Germany",
						"Flag":  jQuery.sap.getModulePath("cs.Cruscotto", "/images/ge.jpg"),
						"expanded": "no",
						"Zexpanded": "no",
						"Content": []
					}]
				});

				view.setModel(model, "ModelloPanel");

				var model2 = new sap.ui.model.json.JSONModel(
					[{

							"key": "A",
							"text": "January"

						}, {
							"key": "B",
							"text": "February"
						}, {
							"key": "C",
							"text": "March"
						}, {
							"key": "D",
							"text": "April"
						}, {
							"key": "D",
							"text": "May"
						}, {
							"key": "D",
							"text": "June"
						}, {
							"key": "D",
							"text": "July"
						}, {
							"key": "D",
							"text": "August"
						}, {
							"key": "D",
							"text": "September"
						}, {
							"key": "D",
							"text": "October"
						}, {
							"key": "D",
							"text": "November"
						}, {
							"key": "D",
							"text": "December"
						}

					]);
				this.getView().setModel(model2, "modelloBox");
				this.getView().byId("comboId").setSelectedKey("A");
			},
			
			
			//Function Triggered when the panel is expanded
			OnexpandPanel: function (oEvent) {
				var row = oEvent.getSource();

				var context = row.getBindingContext("ModelloPanel");

				// get binding object (reference to an object of the original array)
				var datahead = context.oModel.getProperty(context.sPath);
				if (datahead.T === "Project Italy" && datahead.expanded === "no") {
					datahead.expanded = "yes";
					datahead.Content.push({

						"A": "Marco Pace",
						"B": "Tech. Leader",
						"C": "Fiori/UI5",
						"Icon": "sap-icon://sap-ui5",
						"D": "10",
						"E": "100",
						"F": "90",
						"G": "30$"

					}, {

						"A": "Johana Gonzalez",
						"B": "Project Manager",
						"C": "Finance",
						"Icon": "sap-icon://activity-items",
						"D": "10",
						"E": "100",
						"F": "90",
						"G": "300$"

					}, {

						"A": "Lucas Crazy",
						"B": "Developer",
						"C": "Java/SQL",
						"Icon": "sap-icon://developer-settings",
						"D": "10",
						"E": "100",
						"F": "90",
						"G": "10$"

					}, {

						"A": "Cesar Flavicon",
						"B": "Functional An.",
						"C": "Meeting",
						"Icon": "sap-icon://call",
						"D": "10",
						"E": "100",
						"F": "90",
						"G": "120$"

					});
				} else if (datahead.T === "Project India" && datahead.expanded === "no") {
					datahead.expanded = "yes";
					datahead.Content.push({

						"A": "Raul Duke",
						"B": "Arch. Leader",
						"C": "Cloud Foundry",
						"Icon": "sap-icon://cloud",
						"D": "10",
						"E": "110",
						"F": "100",
						"G": "30$"
					}, {

						"A": "Milena Deus",
						"B": "Project Manager",
						"C": "Finance",
						"Icon": "sap-icon://activity-items",
						"D": "0",
						"E": "100",
						"F": "100",
						"G": "370$"

					}, {
						"A": "Simon Numis",
						"B": "Developer",
						"C": "ABAP",
						"Icon": "sap-icon://customer",
						"D": "10",
						"E": "200",
						"F": "190",
						"G": "120$"
					});

				}
				this.getView().getModel("ModelloPanel").updateBindings(true);
			},
			
			
			//Live Search
			onSearchContract: function (oEvent) {
				var view = this.getView();
				var list = view.byId("idList");
				var searchString = view.byId("idSearchField").getValue();
				var filter = new sap.ui.model.Filter("T", sap.ui.model.FilterOperator.Contains, searchString);
				list.getBinding("items").filter([filter], sap.ui.model.FilterType.Application);
			}

		}

	);
});