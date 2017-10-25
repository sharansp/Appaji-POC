

jQuery.sap.require("com.test.Generic.InteractiveNetwork");
sap.ui.controller("com.test.Controller.Contacts", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf loginapp.App
*/
	/*onInit: function() {
		var page = this.oView.byId("idContactsDetailView");
		  if(sap.ui.Device.system.phone){
				page.setShowNavButton(true);
			}
		var i=0,tile="";
		tile = new sap.m.FormattedText ({
			htmlText: "<h3 style=\"color:green; font-weight:600;\">Contacts</h3>" 

		})
		
		var vbox = new sap.m.VBox();
		vbox.addItem(tile);
		if(page)
		page.addContent(vbox);
		//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		//oRouter.getRoute("StudentSessions").attachPatternMatched(this._onObjectMatched, this);
	},*/
	
	onInit: function() {
			// Get data:
			debugger;
			//com.test.Generic.InteractiveNetwork
			//idFlexBoxFL
			fl = new com.test.Generic.InteractiveNetwork();
			var sBaseUrl = {
							  "graph": {
							    "nodes": [{
							      "id": 11111,
							      "name": "Mickey Mouse",
							      "weight": 4
							    }, {
							      "id": 22222,
							      "name": "Donald Duck",
							      "weight": 3
							    },{
							      "id": 33333,
							      "name": "Minnie Mouse",
							      "weight": 5
							    }],
							   "links": [{
							      "source": 11111,
							      "target": 33333,
							      "weight": 2
							    }, {
							      "source": 22222,
							      "target": 33333,
							      "weight": 4
							    }, {
							      "source": 33333,
							      "target": 11111,
							      "weight": 2
							    }]
							  }
							};
			var oGraphModel =  new sap.ui.model.json.JSONModel(sBaseUrl);
			var oViewModel =  new sap.ui.model.json.JSONModel({
				graphMeasure: "weight"
			});
			fl.setModel(oViewModel);
			fl.setModel(oGraphModel, "graphModel");

			a = this.getView().byId('idFlexBoxFL');
			
			fl.setInteractive(false)
			// fl.setGraph({path: 'graphModel>/graph'})
			// fl.setMeasure('{/graphMeasure}')
			a.addItem(fl);
		},
		
		onNodeSelected: function(oEvent) {
			var oSelectedNode = oEvent.getParameter("selectedNode");
			MessageToast.show("You clicked " + oSelectedNode.name);
		},

		onSwitchMeasure: function(oEvent) {
			var oButton = oEvent.getSource();
			var sButtonId = oButton.getId().replace("__xmlview0--","");
			var oViewModel = this.getView().getModel();
			switch (sButtonId){
				case "btnWeight":
					oViewModel.setProperty("/graphMeasure", "weight");
					break;
				case "btnBetweenness":
					oViewModel.setProperty("/graphMeasure", "betweenness");
					break;
				case "btnCloseness":
					oViewModel.setProperty("/graphMeasure", "closeness");
					break;
				case "btnRank":
					oViewModel.setProperty("/graphMeasure", "rank");
					break;
				default:
					oViewModel.setProperty("/graphMeasure", "weight");
					break;	
			}
		}
		
	

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