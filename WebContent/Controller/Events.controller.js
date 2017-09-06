sap.ui.controller("com.test.Controller.Events", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf loginapp.App
*/
	onInit: function() {
		var page = this.oView.byId("idEventsDetailView");
		if(sap.ui.Device.system.phone){
			page.setShowNavButton(true);
		}
		
		
		var oJSONModel = this.initSampleDataModel();
		var oView = this.getView();
		oView.setModel(oJSONModel);
		page.setModel(oJSONModel);
		/*var i=0,tile="";
		tile = new sap.m.FormattedText ({
			htmlText: "<h3 style=\"color:green; font-weight:600;\">Events</h3>"
		})
		
		var vbox = new sap.m.VBox();
		vbox.addItem(tile);
		page.addContent(vbox);*/
		//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		//oRouter.getRoute("StudentSessions").attachPatternMatched(this._onObjectMatched, this);
	},
	
	initSampleDataModel : function() {
		var JSONModel = sap.ui.model.json.JSONModel;
		//var DateFormat = sap.ui.core.format.DateFormat;
		//"sap/ui/core/format/DateFormat"
		var oModel = new JSONModel();

//		var oDateFormat = DateFormat.getDateInstance({source: {pattern: "timestamp"}, pattern: "dd/MM/yyyy"});
		var that = this
		var oModel = new sap.ui.model.json.JSONModel( );
		oModel.setData(oModel.loadData("json/Products.json"),"model");
		oData = oModel.getData();
		var aTemp1 = [];
		var aTemp2 = [];
		var aSuppliersData = [];
		var aCategoryData = [];
		oModel.attachRequestCompleted(function(){
			oData = oModel.getData();
			for (var i = 0; i < oData.ProductCollection.length; i++) {
				var oProduct = oData.ProductCollection[i];
				if (oProduct.SupplierName && jQuery.inArray(oProduct.SupplierName, aTemp1) < 0) {
					aTemp1.push(oProduct.SupplierName);
					aSuppliersData.push({Name: oProduct.SupplierName});
				}
				if (oProduct.Category && jQuery.inArray(oProduct.Category, aTemp2) < 0) {
					aTemp2.push(oProduct.Category);
					aCategoryData.push({Name: oProduct.Category});
				}
				oProduct.DeliveryDate = (new Date()).getTime() - (i % 10 * 4 * 24 * 60 * 60 * 1000);
				//oProduct.DeliveryDateStr = oDateFormat.format(new Date(oProduct.DeliveryDate));
				oProduct.Heavy = oProduct.WeightMeasure > 1000 ? "true" : "false";
				oProduct.Available = oProduct.Status == "Available" ? true : false;
			}

			oData.Suppliers = aSuppliersData;
			oData.Categories = aCategoryData;
			
			oModel.setData(oData);
			oModel.refresh();
			var page = that.oView.byId("idEventsDetailView");
			if(sap.ui.Device.system.phone){
				page.setShowNavButton(true);
			}
			
			
			//var oJSONModel = this.initSampleDataModel();
			//var oView = this.getView();
			//oView.setModel(oJSONModel);
			page.setModel(oModel);
		});
		
		
/*		jQuery.ajax(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"), {
			dataType: "json",
			success: function (oData) {
				var aTemp1 = [];
				var aTemp2 = [];
				var aSuppliersData = [];
				var aCategoryData = [];
				for (var i = 0; i < oData.ProductCollection.length; i++) {
					var oProduct = oData.ProductCollection[i];
					if (oProduct.SupplierName && jQuery.inArray(oProduct.SupplierName, aTemp1) < 0) {
						aTemp1.push(oProduct.SupplierName);
						aSuppliersData.push({Name: oProduct.SupplierName});
					}
					if (oProduct.Category && jQuery.inArray(oProduct.Category, aTemp2) < 0) {
						aTemp2.push(oProduct.Category);
						aCategoryData.push({Name: oProduct.Category});
					}
					oProduct.DeliveryDate = (new Date()).getTime() - (i % 10 * 4 * 24 * 60 * 60 * 1000);
					oProduct.DeliveryDateStr = oDateFormat.format(new Date(oProduct.DeliveryDate));
					oProduct.Heavy = oProduct.WeightMeasure > 1000 ? "true" : "false";
					oProduct.Available = oProduct.Status == "Available" ? true : false;
				}

				oData.Suppliers = aSuppliersData;
				oData.Categories = aCategoryData;

				oModel.setData(oData);
			},
			error: function () {
				jQuery.sap.log.error("failed to load json");
			}
		});*/

		return oModel;
	},
	

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf loginapp.App
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf loginapp.App
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf loginapp.App
*/
//	onExit: function() {
//
//	}

});