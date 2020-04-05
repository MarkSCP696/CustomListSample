sap.ui.define([
	'jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/ui/model/Filter', 'sap/ui/model/json/JSONModel'
], function (jQuery, Controller, Filter, JSONModel) {
	"use strict";

	return Controller.extend("cs.Cruscotto.controller.Master", {

			//Loading project names and main data form local json (model folder)
			onInit: function () {
				var view = this.getView();
				var oDataModelProjects = this.getOwnerComponent().getModel("DataProjects").getData();
				this._setImages(oDataModelProjects);
				var model = new sap.ui.model.json.JSONModel(oDataModelProjects);
				view.setModel(model, "PanelModel");
				var oDataModelMonths = this.getOwnerComponent().getModel("Months").getData();
				var model2 = new sap.ui.model.json.JSONModel(oDataModelMonths);
				view.setModel(model2, "modelBox");
				view.byId("comboId").setSelectedKey("A");
			},
			//Set Flag images
			_setImages: function (data) {
				var arr = data.ItemSet;
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].T.includes("Italy")) {
						arr[i].Flag = jQuery.sap.getModulePath("cs.Cruscotto", "/images/it.png");
					} else if (arr[i].T.includes("India")) {
						arr[i].Flag = jQuery.sap.getModulePath("cs.Cruscotto", "/images/in.png");
					} else {
						arr[i].Flag = jQuery.sap.getModulePath("cs.Cruscotto", "/images/ge.jpg");
					}
				}
			},
			//Function Triggered when the panel is expanded to load data specifly related to the panel expanded
			_onexpandPanel: function (oEvent) {
				var row = oEvent.getSource();
				var context = row.getBindingContext("PanelModel");
				// get binding object (reference to an object of the original array)
				var datahead = context.oModel.getProperty(context.sPath);
				if (datahead.T.includes("Italy") && (!datahead.expanded)) {
					datahead.expanded = true;
					var oDataModelItaly = this.getOwnerComponent().getModel("DataItaly").getData().Italy;
					datahead.Content = oDataModelItaly;
				} else if (datahead.T.includes("India") && (!datahead.expanded)) {
					datahead.expanded = true;
					var oDataModelIndia = this.getOwnerComponent().getModel("DataIndia").getData().India;
					datahead.Content = oDataModelIndia;
				}
				this.getView().getModel("PanelModel").updateBindings(true);
			},
			//Live Search
			_onSearchContract: function (oEvent) {
				var view = this.getView();
				var list = view.byId("idList");
				var searchString = view.byId("idSearchField").getValue();
				var filter = new sap.ui.model.Filter("T", sap.ui.model.FilterOperator.Contains, searchString);
				list.getBinding("items").filter([filter], sap.ui.model.FilterType.Application);
			}
		}
	);
});