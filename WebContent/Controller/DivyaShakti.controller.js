sap.ui.controller("com.test.Controller.DivyaShakti", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf loginapp.App
*/
	onInit: function() {
		
		var page = this.oView.byId("idDivyaShaktiDetailView");
		var oModel = new sap.ui.model.json.JSONModel( );
		oModel.setData(oModel.loadData("json/Jagadgurus.json"),"model");
		modelData = oModel.getData();
		var that = this;
		if(sap.ui.Device.system.phone){
			page.setShowNavButton(true);
		}
		oModel.attachRequestCompleted(function(){
			
			var oNewsContent = new sap.m.NewsContent({contentText:"Test1"});
			 var modelData = oModel.getData();
			var length =  oModel.getData().length;
			var i=0;
			for(i;i<length;i++){
				tile=new sap.m.GenericTile({
					header:modelData[i].name,
					frameType:"OneByOne",
					backgroundImage:modelData[i].backgroundImage,
					press:function(evt){
						 var src = evt.getSource();
						 var key = src.getBackgroundImage();
						var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
						//oRouter.navTo("SiddalingaAppaji");
						var arrAppaji = ["SiddalingaAppaji","MurugharajAppaji","SiddaramShivayogi","YallalingaAppaji"];
						arrAppaji.forEach(function(val,i){
							if(key.includes(val)){
								oRouter.navTo(val);
								return;
							}
							});
						
					},
					tileContent:{
						unit:"Click Here",
						//content:oNewsContent
						
					}
				});
				tile.addStyleClass("tileClass");
				page.addContent(tile);
			}
			
			// page.addContent(oFragment);
			
			
		});
		
		
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
	onAfterRendering: function(oEvent) {
		/*var classname = ".sapMTileCntFooterTextColorNeutral sapMTileCntFtrTxt";
		$(classname).css('color','white');*/

		var idEle = "#__content1-footer-text";
		for(var i=1; i<=4;i++){
			$(idEle.replace('1',i)).css('color','white');
		}
		
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf loginapp.App
*/
//	onExit: function() {
//
//	}

});