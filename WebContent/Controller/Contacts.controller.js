sap.ui.controller("com.test.Controller.HomeDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf loginapp.App
*/
	onInit: function() {
		var page = this.oView.byId("idHomeDetailView");
		  if(sap.ui.Device.system.phone){
				page.setShowNavButton(true);
			}
		var i=0,tile="";
		tile = new sap.m.FormattedText ({
			htmlText: "<h3 style=\"color:green; font-weight:600;\">Welcome to the Application of Mugalkhod Jidga Mutt</h3>" +
			"<p style=\"color:black; font-weight:400;\">The Mugalkhod sampradaya started by Sri Sri Sadguru Yallalinga Appaji Mugalkhod and continued by Sri Sri Shadakshari Shivayogi Siddarameshwara Appaji, pujya Appaji established 365 Mutts across India, namely in Karnataka, Andhra Pradesh, Maharashtra and Goa. The presiding deity of these mutt is Sri Sri Pujya Murugharajendra Appaji, the third in the illustrious and unbroken lineage of mutthadhipati of mugalkhod mutt and second in the Jidga mutt.</p>"+
			"<p style=\"color:black; font-weight:400;\">The Jagadguru upholds the activities of the mutt towards uniting all Dharma, Kula as manava kula Dharma while pervading the lives of many thousands of disciples as their spiritual guide..</p>"+
			"<p style=\"color:black; font-weight:400;\">Pujya Appaji, Mugalkhod and Jidga mutts are verily the wishing tree, divine jewel all in one , fulfilling the righteous desires to all those deserving souls who visit these mutts and pray for his benevolence. No one has disappointed as these mutts and pujya Appaji answers to all the prayers, grants all desires and makes the devotees happy.</p>"
		})
		
		var vbox = new sap.m.VBox();
		vbox.addItem(tile);
		page.addContent(vbox);
		//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		//oRouter.getRoute("StudentSessions").attachPatternMatched(this._onObjectMatched, this);
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