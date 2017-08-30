sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";
 
	return UIComponent.extend("com.test.Component", {
 
		metadata: {
			manifest: "json"
		},
		
		init: function(){
			//this.getRouter().initialize();
			// call the init function of the parent 
			var msg = "In Component!";
			sap.m.MessageToast.show(msg);
			//alert(msg);
			UIComponent.prototype.init.apply(this, arguments);

			this.getRouter().initialize();
		}
 
	});
 
});