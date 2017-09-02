jQuery.sap.require("sap/ui/thirdparty/d3");
sap.ui.controller("com.test.Controller.LogIn", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf View.LogIn
*/
	onInit: function() {/*
		//setInterval(this.onPressChangeBG,10000);
		//alert("in login controller");
//		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//		this.oRouter = oRouter;
//		var appId = sap.ui.getCore().byId("__xmlview0--app");
//		this.appId = appId;
		var appId = sap.ui.getCore().byId("__xmlview0--app");
		this.appId = appId;
		this.appId.setBackgroundImage("");
		
		var oModel = new sap.ui.model.json.JSONModel( );
		this.getView().setModel(oModel);
		oModel.refresh();
		
		
		var that = this;
		//oModel.loadData("json/test.json");
		oModel.setData(oModel.loadData("json/test.json"),"model");
		//sap.ui.getCore().setModel(oModel.loadData("json/test.json"),"Jmodel");
		
		oModel.attachRequestCompleted(function(){
			console.log(oModel.getData());
			that.getView().setModel(oModel);
			sap.ui.getCore().setModel(oModel);
			 var id1=that.getView().byId('idListCourse');
			id1.setSelectedItem(id1.getItems()[0]);
			var view=that.getView().byId('detail').getController();
			view._onObjectMatched();
			oModel.refresh();
		});
		var id=this.getView().byId('idListCourse');
    	var oItemSelectTemplate = new sap.m.StandardListItem({
		               title: "{Concept}",
		               key:"{key}",
		               type : sap.m.ListType.Navigation
		              
		           });

		           id.setModel(oModel);
		           id.bindAggregation("items", "/SalesOrder", oItemSelectTemplate);
				oModel.refresh();*/
	},
	
	onPressChangeBG: function(){
		alert("onPressChangeBG");
		//var appId = sap.ui.getCore().byId("__xmlview0--app");
		//this.appId.setBackgroundImage("Images/"+Math.floor(Math.random()*30)+".jpg");
	},
	handleList: function(evt){
		var model=evt.getSource().getModel();
		var modelData=model.getData();
		var key="";
		
		var listRef =this.getView().byId("idListCourse");
		var value=listRef.getSelectedItem().oBindingContexts.undefined.sPath;
		key=value.split('/SalesOrder/');
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("StudentSessions",{IV:key[1]});
	},
	onPressStudentDetailsBack: function(){
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("overview");
	},
	
	onPressLogIn: function(evt){
		this.appId.setBackgroundImage("");
		this.oRouter.navTo("StudentSessions");
		/*if(this.getView().byId('RB1-2').getSelected())
			this.oRouter.navTo("StudentSessions");
		else if(this.getView().byId('RB1-1').getSelected())
			this.oRouter.navTo("StudentDetails");
		else
			sap.m.MessageToast.show("Kuch toh Select Kar Bhai", {
			    duration: 3000,                  // default
			    width: "15em",                   // default
			    my: "center bottom",             // default
			    at: "center bottom",             // default
			    of: window,                      // default
			    offset: "0 0",                   // default
			    collision: "fit fit",            // default
			    onClose: null,                   // default
			    autoClose: true,                 // default
			    animationTimingFunction: "ease", // default
			    animationDuration: 1000,         // default
			    closeOnBrowserNavigation: true   // default
			});*/

		
	},
	onPressCancel: function(evt){
		sap.m.MessageToast.show("Bhai Aandar Jaa Na...Dar mat..Kyunki Dar ke aage h Jeet h :)", {
		    duration: 3000,                  // default
		    width: "15em",                   // default
		    my: "center bottom",             // default
		    at: "center bottom",             // default
		    of: window,                      // default
		    offset: "0 0",                   // default
		    collision: "fit fit",            // default
		    onClose: null,                   // default
		    autoClose: true,                 // default
		    animationTimingFunction: "ease", // default
		    animationDuration: 1000,         // default
		    closeOnBrowserNavigation: true   // default
		});
	},
	
	handleResponsivePopoverPress: function (oEvent) {
		if (! this._oPopover) {
			this._oPopover = sap.ui.xmlfragment("com.test.fragments.Color_PopOver", this);
			this._oPopover.bindElement("/ProductCollection/0");
			this.getView().addDependent(this._oPopover);
		}

		this._oPopover.openBy(oEvent.getSource());
	},
	
	attachChangeColorPicker: function (oEvent) {
		//var appId = sap.ui.getCore().byId("__xmlview0--app");
		this.appId.setBackgroundImage("");
		this.appId.setBackgroundColor(oEvent.getParameter('colorString'));
	},
	
	navToDashBoard: function(oEvent) {
		this.oRouter.navTo("DashBoard");
	},
	handleTransitionBGColor: function(oEvent) {
		debugger;
		function makeWorker() {
			  let name = "Pete";

			  return function() {
			    alert(name);
			  };
			}

			let name = "John";

			// create a function
			let work = makeWorker();

			// call it
			work();
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

		this.getSplitAppObj().toDetail(this.createId(sToPageId));
	},

	onPressModeBtn : function(oEvent) {
		var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

		this.getSplitAppObj().setMode(sSplitAppMode);
		MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
	},

	getSplitAppObj : function() {
		var result = this.byId("SplitAppDemo");
		if (!result) {
			jQuery.sap.log.info("SplitApp object can't be found");
		}
		return result;
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf View.LogIn
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf View.LogIn
*/
	onAfterRendering: function() {
		/*var id="#__xmlview1--idSvgPanel";
		
		
		circleRadii = [40, 20, 10];
		var jsonCircles = [
			  { "x": 0, "y": 0, "radius": 5, "color" : "green"},
			  { "x": 400, "y": 0, "radius": 5, "color" : "purple"}];
		
		var lineData = [ { "x": 0,   "y": 0},  { "x": 400,  "y": 0}
			                 
			                 ];
		 
		var lineDataPlot = [ { "x": 1,   "y": 5,"color":"green"},  { "x": 20,  "y": 20,"color":"red"},
						                  { "x": 40,  "y": 10,"color":"green"}, { "x": 60,  "y": 40,"color":"yellow"},
						                  { "x": 80,  "y": 5,"color":"pink"},  { "x": 100, "y": 60,"color":"red"}];
		 var svgContainer = d3.select(id).append("svg")
		                                    .attr("width", '650')
		                                    .attr("height", '650')
		                                     .call(d3.behavior.zoom().on("zoom", function (e) {
		                                    	 //svgContainer.transition().duration(500).attr('transform', 'translate(' + zoom.translate() + ') scale(' + zoom.scale() + ')')
		                                    	 svgContainer.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
      }));
		 
		 var circleGroup = svgContainer.append("g").attr("transform", "translate(100,100)");
		 
		 var circles = circleGroup.selectAll("circle")
		                           .data(jsonCircles)
		                           .enter()
		                          .append("circle");
		 
		 var lineFunction = d3.svg.line()
		                        .x(function(d) { return d.x*1; })
		                         .y(function(d) { return d.y*1; })
		                         .interpolate("linear");
		 
		
		
		var path =  circleGroup.selectAll("path")
        .data(lineData)
        .enter().append("path")
        .attr("d",lineFunction(lineData))
        .attr("stroke","green")
        .attr("stroke-width","3")
        .attr("fill", "none");
		
		var lineLen = path.node().getTotalLength(); // 1. get length

		   path.attr("stroke-dasharray", // 2. pattern big enough to hide line
		                   lineLen + ", "+lineLen) 
		        .attr("stroke-dashoffset",lineLen); // 3. start with gap
		   path.transition()
		        .duration(2000)
		        .attr("stroke-dashoffset", 0); // 4. shift pattern to reveal
          
		                         
		
		var circleAttributes = circles
		                       .attr("cx",  function (d) { return d.x*1; })
		                       .attr("cy",  function (d) { return d.y*1; })
		                       .attr("r", function (d) { return '5'; })
		                       .style("fill",  function (d) { return 'black'; });
		
	
		
		
		
		a = d3.select(id);
		a.append("svg").attr("width", 50).attr("height", 50)
		.append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25)
		.style("fill", "purple");
		
		var p = d3.select("body").selectAll("p")
		 .data(theData)
		  .enter()
		 .append("p")
		
		//Animation tween
		var animID  = "#__xmlview1--idSvgPanelAnimation";
		 var container = d3.select(animID);
		
		var svg = container.append("svg")
		.attr("width", 5000).attr("height", 5000)
		.append("circle");
		
		var circle = svg.attr("cx", 25)
		.attr("cy", 25)
		.attr("r", 25)
		//.on("mouseover", ()=>alert("you"))
		.style("fill", "purple");
		
		circle
		.transition().duration(3000)
		// Add the tween function to the transition
		//.tween('track-position', tracker)
		.attr("cx", 500)
		.attr("cy", 25)
		.transition().duration(3000)
		.attr("cx", 25)
		.attr("cy", 25)
			;*/
//          .on("mouseout", handleMouseOut);
		
		/*var tracker = function(){
			  var lastX = 0;
			  var lastY = 0;
			   
			  // This function returned by tracker is what will execute at each 'tick'
			  // in the transition animation
			  return function(){
			    var curX = Math.floor(circle.attr('cx'));
			    var curY = Math.floor(circle.attr('cy'));
			    // only update if circle has moved at least a pixel in x and y
			    // directions'
			    console.log(curX,curY)
			    if(curX !== lastX && curY !== lastY){
			      d3.select('.position-track').text("X: " + curX + ", Y: " + curY);
			    }
			  }
			}*/
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf View.LogIn
*/
//	onExit: function() {
//
//	}

});