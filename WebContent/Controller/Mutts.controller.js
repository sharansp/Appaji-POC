sap.ui.controller("com.test.Controller.Mutts", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf loginapp.App
*/
	onInit: function() {
		var page = this.oView.byId("idMuttsDetailView");
		var oTable = new sap.m.Table({   
		      inset : true, 
		      headerText : "List of Mutts",
		      headerDesign : sap.m.ListHeaderDesign.Standard, 
		      mode : sap.m.ListMode.None,   
		      includeItemInSelection : false,   
		    });
		    
		    var col1 = new sap.m.Column({header: new sap.m.Label({text:"Place"})});
		    oTable.addColumn(col1); 
		    
		    var col2 = new sap.m.Column({header: new sap.m.Label({text:"Address"})});
		    oTable.addColumn(col2); 
		    
		    var col3 = new sap.m.Column({header: new sap.m.Label({text:"Contacts"})});
		    oTable.addColumn(col3); 
		    
		    var colItems = new sap.m.ColumnListItem({type:"Active"});
		    oTable.bindAggregation("items","/",colItems);
		    
		    var txtNAME = new sap.m.Text({text:"{Place}"});
		    colItems.addCell(txtNAME); 
		        
		    var txtNAME2 = new sap.m.Text({text:"{Mutt_Address}"});
		    colItems.addCell(txtNAME2);
		    
		    var ContactsText = new sap.m.Text({text:"{Contacts}"});
		    colItems.addCell(ContactsText);
		       

		var oModel = new sap.ui.model.json.JSONModel( );
		oModel.setData(oModel.loadData("json/Mutts.json"));
		oModel.refresh();
		oTable.setModel(oModel);
		//oTable.addItem(tile);
		page.addContent(oTable);
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