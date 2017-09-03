sap.ui.controller("com.test.Controller.DivyaShakti.SiddaramShivayogi", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf View.VideosHTML
*/
	onInit: function(e) {
		var that = this;
		var oView = e.getSource().byId('idSiddaramShivayogiView');
		oView.setShowNavButton(true);
		oView.attachNavButtonPress(function(navPress) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
			oRouter.navTo("Login");
			/*var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				oRouter.navTo("DivyaShakti", true);
			}*/
		});
	},
	
	navButtonPress: function() {
		alert("?");
	},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf View.VideosHTML
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf View.VideosHTML
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf View.VideosHTML
*/
//	onExit: function() {
//
//	}

});