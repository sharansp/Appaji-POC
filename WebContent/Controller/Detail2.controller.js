sap.ui.controller("com.test.Controller.Detail2", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf loginapp.App
*/
	onInit: function() {
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.getRoute("StudentSessions").attachPatternMatched(this._onObjectMatched, this);
	},
	_onObjectMatched: function(oEvent){
		debugger;
		var that=this;
			if(oEvent==undefined){
				var model=sap.ui.getCore().getModel();
				var modelData=model.getData();
				var page = this.oView.byId("dd");
		length=modelData.SalesOrder[0].drill.length;
		var i=0,tile="";
		if(length && modelData.SalesOrder[0].drill[i].theory != undefined){
			for(i;i<length;i++){
					tile=new sap.m.GenericTile({
						header:modelData.SalesOrder[0].drill[i].theory,
						press:function(evt){
							var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
							/*var obj = {
									key1 : modelData.SalesOrder[0].key
							}*/
							oRouter.navTo("Questions",
								{obj1:modelData.SalesOrder[0].key,
								 obj2: evt.getSource().getHeader()
								}
							);
						},
						tileContent:{
							unit:"",
							
						},
						headerImage:"sap-icon://"+modelData.SalesOrder[0].drill[i].icon,
						backgroundImage:"Images/"+Math.floor(Math.random()*30)+".jpg"
						
					
					});
					tile.addStyleClass("tileClass");
					page.addContent(tile);
				}
			}
		
		
		
		
		
		
		
	}
		var val = oEvent.mParameters.arguments.IV;
		var model=sap.ui.getCore().getModel();

		if(model){
			var modelData=model.getData();
			var length="";
			var page = this.oView.byId("dd");
			page.removeAllContent();
			if(val == undefined){
			//	this.getDefaultData(undefined,that);
			}
			
			if(val == 0){
				debugger;
				length=modelData.SalesOrder[val].drill.length;
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
				//if(length && modelData.SalesOrder[val].drill[i].theory != undefined){
					//for(i;i<length;i++){
							/*tile=new sap.m.GenericTile({
								header:modelData.SalesOrder[val].drill[i].theory,
								press:function(evt){
									var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
									var obj = {
											key1 : modelData.SalesOrder[0].key
									}
									oRouter.navTo("Questions",
										{obj1:modelData.SalesOrder[0].key,
										 obj2: evt.getSource().getHeader()
										}
									);
								},
								tileContent:{
									unit:"",
									
								},
								headerImage:"sap-icon://"+modelData.SalesOrder[val].drill[i].icon,
								backgroundImage:"Images/"+Math.floor(Math.random()*30)+".jpg"
								
							
							});*/
							//tile.addStyleClass("tileClass");
							//page.addContent(tile);
						//}
					//}
			}
			
			else if(val=="2"){
				
				
				
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
				    
//				    var col3 = new sap.m.Column("col3",{header: new sap.m.Label({text:"Price"})});
//				    oTable.addColumn(col3);    
				    
				    var colItems = new sap.m.ColumnListItem({type:"Active"});
				    oTable.bindAggregation("items","/",colItems);
				    
				    var txtNAME = new sap.m.Text({text:"{Place}"});
				    colItems.addCell(txtNAME); 
				        
				    var txtNAME2 = new sap.m.Text({text:"{Mutt_Address}"});
				    colItems.addCell(txtNAME2); 
				       
//				    var txtNAME3 = new sap.m.Text("txtNAME3",{text:"{UnitsInStock}"});
//				    colItems.addCell(txtNAME3);
				    
				    
				/*var oTable = new sap.ui.table.TreeTable("idTreeTable",{
					rows:"{path:'/catalog/clothing', parameters: {arrayNames:['categories']}}",
	                    selectionMode:"MultiToggle",
	                    enableSelectAll:false,
	                    ariaLabelledBy:"title"
				});*/
				
				var oModel = new sap.ui.model.json.JSONModel( );
				oModel.setData(oModel.loadData("json/Mutts.json"));
				oModel.refresh();
				oTable.setModel(oModel);
				//oTable.addItem(tile);
				page.addContent(oTable);
			}
			
			}
		
		
		},
		
		getDefaultData(oEvent,that){
			if(oEvent==undefined){
				var model=sap.ui.getCore().getModel();
				var modelData=model.getData();
				var page = this.oView.byId("dd");
		length=modelData.SalesOrder[0].drill.length;
		var i=0,tile="";
		if(length && modelData.SalesOrder[0].drill[i].theory != undefined){
			for(i;i<length;i++){
					tile=new sap.m.GenericTile({
						header:modelData.SalesOrder[0].drill[i].theory,
						press:function(){
							var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
							oRouter.navTo("Questions",{key:modelData.SalesOrder[0].key});
						},
						tileContent:{
							unit:"",
							
						},
						headerImage:"sap-icon://"+modelData.SalesOrder[0].drill[i].icon,
						backgroundImage:"Images/"+Math.floor(Math.random()*30)+".jpg"
						
					
					});
					tile.addStyleClass("tileClass");
					page.addContent(tile);
				}
			}
		
		
		
		
		
		
		
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