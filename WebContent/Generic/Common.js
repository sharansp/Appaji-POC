jQuery.sap.declare("com.test.Generic.Common");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("com.test.Generic.InteractiveNetwork");



com.test.Generic.Common= {
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		
		navback : function(evt){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("overview");
		},
		handleNavButtonPress: function (oSplitApp) {
			/*if(!oSplitApp){
		    	var oSplitApp = this.getView().getParent().getParent();
		    }*/
		    //commenting above assignment based on condition, since it's giving error
		    var oSplitApp = this.getView().getParent().getParent();
			var oMaster = oSplitApp.getMasterPages()[0];
		    oSplitApp.toMaster(oMaster);
		},
		isPhone : function () {
			return sap.ui.Device.system.phone;	
		},
		
};

