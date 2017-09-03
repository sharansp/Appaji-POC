sap.ui.controller("com.test.Controller.Blogs", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf loginapp.App
*/
	onInit: function() {
		var page = this.oView.byId("idBlogsDetailView");
		if(sap.ui.Device.system.phone){
			page.setShowNavButton(true);
		}
		var i=0,tile="";
		tile = new sap.m.FormattedText ({
			htmlText: "<h3 style=\"color:blue; font-weight:600;\">Blogs</h3>"
		})
		
		var vbox = new sap.m.VBox();
		vbox.addItem(tile);
		page.addContent(vbox);
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