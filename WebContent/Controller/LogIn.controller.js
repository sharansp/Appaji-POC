jQuery.sap.require("sap/ui/thirdparty/d3");
sap.ui.controller("com.test.Controller.LogIn", {

	
	onInit: function() {
			
	},
		
	navToDashBoard: function(oEvent) {
		this.oRouter.navTo("DashBoard");
	},
	
	onPressNavToDetail : function(oEvent) {
		this.getSplitAppObj().to(this.createId("detailDetail"));
	},

	onPressDetailBack : function() {
		this.getSplitAppObj().backDetail();
	},

	onPressMasterBack : function() {
		this.getSplitAppObj().backMaster();
	},

	onPressGoToMaster : function() {
		this.getSplitAppObj().toMaster(this.createId("master2"));
	},

	onListItemPress : function(oEvent) {
		var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
		var oApp = this.getSplitAppObj();
		oApp.toDetail(this.createId(sToPageId));
		
		 if(jQuery.device.is.phone)
			 this.hideShow(oEvent,true);
	},

	onPressModeBtn : function(oEvent) {
		var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

		this.getSplitAppObj().setMode(sSplitAppMode);
		sap.m.MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
	},

	getSplitAppObj : function() {
		var result = this.byId("SplitAppDemo");
		if (!result) {
			jQuery.sap.log.info("SplitApp object can't be found");
		}
		return result;
	},

	onAfterRendering: function() {
		
	},

	hideShow: function(evt,isMobile){
		 this.getView().byId('hideShowDashBoard').setTooltip("Hide Show");
		var oApp =  this.getSplitAppObj();//this.getView().byId('SplitAppDemo');
		if(oApp.getMode() === "ShowHideMode") {
       oApp.setMode("HideMode");
       oApp.hideMaster(0);
       oApp.attachAfterMasterOpen(function() {
               oApp.setMode(sap.m.SplitAppMode.ShowHideMode )
		      });
		}else {
		      oApp.setMode("ShowHideMode");
		 }
		/*a = this.getView().byId('__xmlview1--SplitAppDemo-MasterBtn')
		a.attachPress(function(e){
			debugger
			alert("??")})*/
	},
	
	onAfterRendering: function() {

	},

	
	onExit: function() {

	}
});