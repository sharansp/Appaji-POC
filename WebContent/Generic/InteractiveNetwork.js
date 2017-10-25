
/*eslint no-return-assign: 0, sap-no-dom-insertion: 0*/

jQuery.sap.declare("com.test.Generic.InteractiveNetwork");

sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/FlexBox",
	"sap/ui/thirdparty/d3"
], function(Control, FlexBox, d3) {

	"use-strict";

	return Control.extend("com.test.Generic.InteractiveNetwork", {

		// METADATA
		metadata: {

			/* List of Component Properties: */
			properties: {

				// Width of the SVG component
				width: {
					type: "sap.ui.core.CSSSize",
					defaultValue: 960
				},

				// Height of the SVG component
				height: {
					type: "sap.ui.core.CSSSize",
					defaultValue: 600
				},

				// Switch to define if the network can be interactive or not
				interactive: {
					type: "boolean",
					defaultValue: true
				},

				// Defineable number of visualization clusters - this will determine the colors
				clusters: {
					type: "int",
					defaultValue: 5
				},

				// Measure to use to render node radius
				measure: {
					type: "string",
					defaultValue: "weight"
				},

				/* Force Layout Options */

				// Minimum distance for each edge:
				linkDistance: {
					type: "int",
					defaultValue: 200
				},

				// Gravity correction factor (pushes nodes to the center of the container)
				gravity: {
					type: "int",
					defaultValue: .5
				},

				// Magnetic charge of the network model:
				// Positive charge "attracts" nodes each other while Negative "rejects" nodes
				charge: {
					type: "int",
					defaultValue: -350
				},

				/* Graph */
				graph: {
					type: "object"
				}

			},

			/* Usable Events */
			events: {
				nodeSelected: {
					enablePreventDefault: true
				}
			},

			aggregations: {
				/* HTML Aggregation */
				_html: {
					type: "sap.ui.core.HTML",
					multiple: false,
					visibility: "hidden"
				}
			}
		},

		/* Private Properties */

		// Nodes and Links arrays taken from public graph property
		_nodes: [],
		_links: [],
		_linkedByIndex: {},
		_currentNodes: [],
		_currentLinks: [],

		// Node and Link object from D3
		_vis: null,
		_color: null,
		_nodesG: null,
		_linksG: null,
		_node: null,
		_link: null,
		_force: null,
		_nodeDrag: null,

		/* Control Hooks */
		init: function() {

			// Some Initializations:
			this._sContainerId = this.getId() + "--container";
			this.setAggregation("_html", new sap.ui.core.HTML({
				content: "<svg id='" + this._sContainerId + "'></svg>"
			}));

			// Setup some D3 code for force layout rendering:
			this._initForceLayout();

			// Set the rendered indicator
			this._bIsRendered = false;
		},

		onBeforeRendering: function() {

			// Resizing:
			sap.ui.core.ResizeHandler.deregister(this._sResizeHandlerId);
		},

		onAfterRendering: function() {

			// Register resizing handler:
			this._sResizeHandlerId = sap.ui.core.ResizeHandler.register(this, jQuery.proxy(this._onResize, this));

			// Check if we need to render:
			if (!this._bIsRendered) {
				this._createSvg();
				this._bIsRendered = true;
			}

			// Prepare the data:
			var mGraph = this._makeGraphLocalCopy();
			if (mGraph && mGraph !== null) {
				this._nodes = null;
				this._links = null;
				this._setupData(mGraph);
			}

			/* 
			   Do layout update: the update can be done any number of times we want, as here
			   we just update the visualization.
			*/
			this._update();
		},

		exit: function() {

			// Deregister resize handler:
			sap.ui.core.ResizeHandler.deregister(this._sResizeHandlerId);

			// Remove SVG
			d3.select(this._vis).remove();
			this._bIsRendered = false;
		},

		renderer: function(oRenderManager, oControl) {

			// Let's render the generated FlexBox that will act as container
			// for our D3 code
			oRenderManager.write("<div");
			oRenderManager.writeControlData(oControl);
			oRenderManager.writeClasses();
			oRenderManager.write(">");
			oRenderManager.renderControl(oControl.getAggregation("_html"));
			oRenderManager.write("</div>");
		},

		/* Private Methods */
		_createSvg: function() {

			/* In this hook we start drawing our Force Layout with D3 */
			this._vis =
				d3.select("#" + this._sContainerId)
				.attr("width", this.getWidth())
				.attr("height", this.getHeight());

			this._linksG =
				this._vis.append("g")
				.attr("id", "links");

			this._nodesG =
				this._vis.append("g")
				.attr("id", "nodes");
		},

		_initForceLayout: function() {

			// Setup node colors interpolation:
			this._color = d3.scale.category20().domain(d3.range(0, 20));

			// Setup Force layout:
			this._force = d3.layout.force();
			this._force.size([this.getWidth(), this.getHeight()]);
			this._force
				.gravity(this.getGravity())
				.charge(this.getCharge())
				.linkDistance(this.getLinkDistance()).on("tick", this._onForceTick);

			// And Drag Behavior
			this._nodeDrag = this._force.drag().on("dragstart", this._dragStart);
		},

		_makeGraphLocalCopy: function() {

			// As we manipulate the objects within the incoming graph stream
			// it's better to have a local copy of the object. With this, the original
			// model will not be touched and each rendering will start from the original
			// situation.
			// Note that this method is temporary and it is not optimized (memory consumption)
			var oGraph = this.getGraph();
			if (oGraph && oGraph !== null) {
				return JSON.parse(JSON.stringify(oGraph));
			}
		},

		/* Important: following D3 convention, parameter of anonymous functions is always named */
		/*            as "d" (aka "datum" in D3 naming convention)                              */
		_setupData: function(oGraph) {

			// Fill in our Nodes and Links
			this._nodes = oGraph.nodes;
			this._links = oGraph.links;

			var iWidth = this.getWidth();
			var iHeight = this.getHeight();
			var sMeasure = this.getMeasure();
			var oNodeRadiusExtent = d3.extent(this._nodes, function(d) {

				// Weight contains the specific node radius, which is calculated by
				// the caller (usually a Graph Engine). It might be the value of the node
				// betweenness or the value of the node ranking
				return d[sMeasure];
			});

			// We level node radius by scaling calculated values and aligning them in a
			// value included in a range from 1 to 15 (small nodes = 1 / huge nodes = 15)
			var oNodeRadius = d3.scale.sqrt().domain(oNodeRadiusExtent).range([1, 15]);

			// Do the initial node positioning:
			this._nodes.forEach(function(oNode) {

				// Set a dummy X/Y coordinates:
				oNode.x = Math.floor(Math.random() * iWidth);
				oNode.y = Math.floor(Math.random() * iHeight);

				// Add the radius property to the nodes
				oNode.weight = oNodeRadius(oNode[sMeasure]);
			});

			// Now map node ID's to node objects: this is needed as D3 by default does not
			// match nodes based on their IDs but on their index position in the node array
			var mNodesMap = this._mapNodes(oGraph.nodes);

			// Switch links to point towards node objects rather then their internal index
			var mLinkedByIndex = this._linkedByIndex;
			this._links.forEach(function(oLink) {

				// Check consistency
				if (oLink.source && oLink.target) {
					oLink.source = mNodesMap.get(oLink.source);
					oLink.target = mNodesMap.get(oLink.target);
					return mLinkedByIndex[oLink.source.id + "," + oLink.target.id] = 1;
				}
			});
		},

		/* Update visualization */
		_update: function() {

			// Filter links
			this._currentLinks = this._filterLinks();
			this._currentNodes = this._filterNodes();

			// Calculate the top node:
			this._currentNodes.sort(function(x, y) {

				// Sort by weight, as this property contains the value of the requested measure
				// see method this._setupData
				return d3.descending(x.weight, y.weight);
			});

			// Reset nodes in force layout
			this._force.nodes(this._currentNodes);
			this._updateNodesVisualization();

			// Reset links in force layout
			this._force.links(this._currentLinks);
			this._updateLinksVisualization();

			// Bang!
			this._force.start();

		},

		/* Updates the display of nodes */
		_updateNodesVisualization: function() {

			// Define node design
			this._node =
				this._nodesG.selectAll("circle.node")
				.data(this._currentNodes, function(d) {
					return d.id;
				});

			// Function to return colors:
			var iClusters = this.getClusters();
			var fnNodeColors = function(iIndex) {

				// Scale the number of available colors from sapUiChart<n> to the number
				// of available clusters:
				var linearScale = d3.scale.linear().domain([1, 12]).range([0, iClusters]);

				// Round to avoid decimals:
				var i = Math.round(linearScale(iIndex));

				// There's no sapUiChart0 color code, so move it to 1...
				if (i < 1) {
					// Return the Fiori theme color code for this index:
					i = 1;
					// And darker this a little:
					return d3.rgb(sap.ui.core.theming.Parameters.get("sapUiChart" + i))
						.darker()
						.toString();
				} else {
					// Return the Fiori theme color code for this index
					return d3.rgb(sap.ui.core.theming.Parameters.get("sapUiChart" + i))
						.brighter()
						.toString();
				}
			};

			// Customize Entering nodes (nodes that are going to be appended)
			// Nodes are always sorted descending based on the currently requested measure
			var oTopNode = this._currentNodes[0];
			this._node.enter()
				.append("circle")
				.attr("class", "node")
				.attr("cx", function(d) {
					return d.x;
				})
				.attr("cy", function(d) {
					return d.y;
				})
				.style("stroke", function() {
					return "#777";
				});

			// Customize all nodes (everything that is on screen) by setting their dimension and color
			this._node.attr("r", function(d) {
					// NOTE: Weight could have been overwritten by the value requested by this.getMeasure() property
					//		 The default setting is the property "weight" of the original graph data, but in method
					//		 _setupData we might be overwrite it by checking the requested measure.
					return d.weight;
				})
				.style("fill", function(d) {
					if (d.id === oTopNode.id) {
						return d3.rgb("green").brighter().toString();
					} else {
						return fnNodeColors(d.type);
					}
				})
				.style("stroke-width", function() {
					return 1.5;
				});

			// Attach events:
			this._node.call(this._force.drag());

			// Keep a reference to "me" and provide it to the event handler:
			var that = this;
			this._node.on("dblclick", function(d) {
				that._raiseDoubleClick(d);
			});

			// Process exiting nodes by fading them
			this._node.exit()
				.style("opacity", 1)
				.transition()
				.duration(1000)
				.style("opacity", 0)
				.remove();
		},

		/* Updates the display of connecting links */
		_updateLinksVisualization: function() {

			// Customize Links
			this._link =
				this._linksG.selectAll("line.link")
				.data(this._currentLinks, function(d) {
					return d.source.id + "_" + d.target.id;
				});

			// Entering Links:
			this._link.enter()
				.append("line")
				.attr("class", "link")
				.attr("stroke", "#666")
				.attr("opacity", .7)
				.attr("x1", function(d) {
					return d.source.x;
				})
				.attr("y1", function(d) {
					return d.source.y;
				})
				.attr("x2", function(d) {
					return d.target.x;
				})
				.attr("y2", function(d) {
					return d.target.y;
				});

			// Exiting
			this._link.exit().remove();
		},

		/* Internal Event called while force layout is running: updates the coordinates of nodes and links on the screen */
		_onForceTick: function() {

			/* This function is called within the context of D3 event handling, so we
			   we do not have access to private properties and members of our control.
			   To play with the visualization we need to use D3 accessors
			*/

			// It should be better to avoid the continous selection of nodes and links
			// Consider to refactor the function
			var oNodes = d3.select("#nodes").selectAll("circle.node");
			var oLinks = d3.select("#links").selectAll("line.link");

			// Update nodes position
			oNodes
				.attr("cx", function(d) {
					return d.x;
				})
				.attr("cy", function(d) {
					return d.y;
				});

			// Update links
			oLinks
				.attr("x1", function(d) {
					return d.source.x;
				})
				.attr("y1", function(d) {
					return d.source.y;
				})
				.attr("x2", function(d) {
					return d.target.x;
				})
				.attr("y2", function(d) {
					return d.target.y;
				});
		},

		/* Creates a map between the node id and the owner object */
		_mapNodes: function(aNodes) {
			var nodesMap = d3.map();
			aNodes.forEach(function(n) {
				nodesMap.set(n.id, n);
			});
			return nodesMap;
		},

		/* Returns only those links that connects existing nodes */
		_filterLinks: function() {

			// Show links only if they connect existing nodes
			this._currentNodes = this._mapNodes(this._nodes);

			// Copy reference to be used in anon function:
			var mCurrentNodes = this._currentNodes;
			return this._links.filter(function(oLink) {

				return mCurrentNodes.get(oLink.source.id) && mCurrentNodes.get(oLink.target.id);

			});
		},

		/* Use this method to apply node filtering if needed (i.e. only nodes with a weight > than x) */
		_filterNodes: function() {

			return this._nodes;
		},

		_neighboring: function(oNodeA, oNodeB) {
			return this._linkedByIndex[oNodeA.id + "," + oNodeB.id] ||
				this._linkedByIndex[oNodeB.id + "," + oNodeA.id];
		},

		/* Internal Events */
		_raiseDoubleClick: function(oNode) {
			this.fireNodeSelected({
				selectedNode: oNode
			});
		},

		/* Check sizes of the control: called whenever the window/parent/current control changes sizes */
		_onResize: function(oEvent) {

			// Resize width
			if (oEvent.oldSize.width !== oEvent.size.width) {
				this._vis.attr("width", oEvent.size.width);
				this._force.size([oEvent.size.width, oEvent.oldSize.height]);
			}

			// Resize height
			if (oEvent.oldSize.height !== oEvent.size.height) {
				this._vis.attr("height", oEvent.size.height);
				this._force.size([oEvent.oldSize.width, oEvent.size.height]);
			}
		}
	});
});