export const fcose_layout = {
  name: "fcose",
  avoidOverlap: true,
  // 'draft', 'default' or 'proof'
  // - "draft" only applies spectral layout
  // - "default" improves the quality with incremental layout (fast cooling rate)
  // - "proof" improves the quality with incremental layout (slow cooling rate)
  quality: "default",
  // Use random node positions at beginning of layout
  // if this is set to false, then quality option must be "proof"
  randomize: false,
  // Whether or not to animate the layout
  animate: true,
  // Duration of animation in ms, if enabled
  animationDuration: 1000,
  // Easing of animation, if enabled
  animationEasing: undefined,
  // Fit the viewport to the repositioned nodes
  fit: true,
  // Padding around layout
  padding: 15,
  // Whether to include labels in node dimensions. Valid in "proof" quality
  nodeDimensionsIncludeLabels: true,
  // Whether or not simple nodes (non-compound nodes) are of uniform dimensions
  uniformNodeDimensions: false,
  // Whether to pack disconnected components - cytoscape-layout-utilities extension should be registered and initialized
  packComponents: true,
  // Layout step - all, transformed, enforced, cose - for debug purpose only
  step: "cose",

  /* spectral layout options */

  // False for random, true for greedy sampling
  samplingType: true,
  // Sample size to construct distance matrix
  sampleSize: 100,
  // Separation amount between nodes
  nodeSeparation: 300,
  // Power iteration tolerance
  piTol: 0.0000001,

  /* incremental layout options */

  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: (node) => 4500,
  // Ideal edge (non nested) length
  idealEdgeLength: (edge) => 50,
  // Divisor to compute edge forces
  edgeElasticity: (edge) => 0.45,
  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor: 0.1,
  // Maximum number of iterations to perform - this is a suggested value and might be adjusted by the algorithm as required
  numIter: 2500,
  // For enabling tiling
  tile: true,
  // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
  tilingPaddingVertical: 10,
  // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
  tilingPaddingHorizontal: 10,
  // Gravity force (constant)
  gravity: 0.25,
  // Gravity range (constant) for compounds
  gravityRangeCompound: 1.5,
  // Gravity force (constant) for compounds
  gravityCompound: 1.0,
  // Gravity range (constant)
  gravityRange: 3.8,
  // Initial cooling factor for incremental layout
  initialEnergyOnIncremental: 0.3,

  /* constraint options */

  // Fix desired nodes to predefined positions
  // [{nodeId: 'n1', position: {x: 100, y: 200}}, {...}]
  fixedNodeConstraint: undefined,
  // Align desired nodes in vertical/horizontal direction
  // {vertical: [['n1', 'n2'], [...]], horizontal: [['n2', 'n4'], [...]]}
  alignmentConstraint: undefined,
  // Place two nodes relatively in vertical/horizontal direction
  // [{top: 'n1', bottom: 'n2', gap: 100}, {left: 'n3', right: 'n4', gap: 75}, {...}]
  relativePlacementConstraint: undefined,
  stop: function() {}, // on layoutstop
};
export const dagre_layout = {
  name: "dagre",
  avoidOverlap: true,
  // dagre algo options, uses default value on undefined
  nodeSep: 50, // the separation between adjacent nodes in the same rank
  edgeSep: undefined, // the separation between adjacent edges in the same rank
  rankSep: undefined, // the separation between each rank in the layout
  rankDir: "LR", // 'TB' for top to bottom flow, 'LR' for left to right,
  align: "UR", // alignment for rank nodes. Can be 'UL', 'UR', 'DL', or 'DR', where U = up, D = down, L = left, and R = right
  acyclicer: undefined, // If set to 'greedy', uses a greedy heuristic for finding a feedback arc set for a graph.
  // A feedback arc set is a set of edges that can be removed to make a graph acyclic.
  ranker: undefined, // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
  minLen: function(edge) {
    return 3;
  }, // number of ranks to keep between the source and target of the edge
  edgeWeight: function(edge) {
    return 3;
  }, // higher weight edges are generally made shorter and straighter than lower weight edges
  // general layout options
  fit: true, // whether to fit to viewport
  padding: 10, // fit padding
  spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node
  animate: true, // whether to transition the node positions
  animateFilter: function(node, i) {
    return true;
  }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
  animationDuration: 500, // duration of animation in ms if enabled
  animationEasing: undefined, // easing of animation if enabled
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  transform: function(node, pos) {
    return pos;
  },
};
export const cytoStyle = [
  {
    selector: "node",
    style: {
      content: function(node) {
        const type =
          node.data("type")[0].toUpperCase() + node.data("type").slice(1);
        return node.data("label") == "parent"
          ? `${type} (${node.data("id")})`
          : node.data("name") != null
          ? `${node.data("name")}`
          : `${node.data("id")}`;
      },
      "text-valign": "top",
      "text-halign": "center",
      "text-margin-y": -6,
      // 'text-margin-x': -25,
      "font-size": 18,
      "text-wrap": "wrap",
      "text-rotation": "autorotate",
      "background-image": "data(url)",
      shape: "rectangle",
      "background-fit": "cover",
      height: "50px",
      width: "50px",
      color: function(node) {
        return node.data("mode") == "test" ? "#0928c6" : "#000";
      },
    },
  },
  {
    selector: ":parent",
    style: {
      // width: 4,
      shape: "roundrectangle",
      "border-width": "5px",
      "border-radius": "20%",
      "text-valign": "top",
      "text-halign": "left",
      "background-color": "#fff",
      // "border-color": "#be0e8d",
      "border-color": function(node) {
        const type = node.data("type");
        const group = node.data("group");
        return group == "group"
          ? "#828a89"
          : type == "account_id"
          ? "#000"
          : type == "region"
          ? "#11789a"
          : type == "structure"
          ? "green"
          : type.includes("tag.")
          ? "#f1860b"
          : type == ("resourceGroup")
          ? "#2794a5"
          : type.toLowerCase() == ("subnet")
          ? "rgb(144, 217, 123)"
          : type.toLowerCase() == ("vpc")
          ? "rgb(162, 91, 233)"
          : "#be0e8d";
      },
      "text-margin-x": 20,
      "text-margin-y": -15,
      "font-size": "22px",
      "font-weight": 700,
      padding: "35px",
      content: function(node) {
        const type = node.data("type");
        const id = node.data("id");
        return node.data("label") == "parent" 
          ? `${node.data("text")} ( $${node.data("cost_for_month")} USD/month )`
          : node.data("label") == "parent" && (type == "subnet" || type == "vpc")
          ? `${type}:${node.data("id").spilt("/")[1]} ( $${node.data("cost_for_month")} USD/month )`
          : type == "subnet" || type == "vpc"
          ? `${type} (${id.spilt("/")[1]})`
          : type == "account_id"
          ? `Account (${id})`
          : type == "region"
          ? `Region (${id})`
          : type == "structure"
          ? `${id}`
          : node.data("name");
      },
      "background-position-x": "0",
      "background-position-y": "0",
      "background-fit": "none",
    },
  },
  {
    selector: ".hidden",
    css: {
      display: "none",
    },
  },
  {
    selector: ".fitComp",
    style: {
      color: "#449737",
      "font-weight": "bold"
    },
  },
  {
    selector: ":selected",
    style: {
      "background-color": "#adadad",
      "line-color": "#adadad",
      "target-arrow-color": "#adadad",
      "source-arrow-color": "#adadad",
      "border-color": "#adadad",
      "border-width": "3px",
    },
  },
  {
    selector: "edge",
    style: {
      width: 2,
      "target-arrow-shape": "triangle",
      // 'source-arrow-shape': 'triangle',
      "line-color": "#adadad",
      "target-arrow-color": "#adadad",
      "curve-style": "straight",
    },
  },
  {
    selector: "node.target_highlight",
    style: {
      "border-color": "rgb(96, 178, 240)",
      "border-width": "4px",
    },
  },
  {
    selector: "node.income_highlight",
    style: {
      "border-color": "#50b44d",
      "border-width": "4px",
    },
  },
  {
    selector: "node.target_clickstyle",
    style: {
      "border-color": "rgb(96, 178, 240)",
      "border-width": "4px",
    },
  },
  {
    selector: "node.income_clickstyle",
    style: {
      "border-color": "#50b44d",
      "border-width": "4px",
    },
  },
  {
    selector: "node.semitransp",
    style: {
      opacity: "0.4",
    },
  },
  {
    selector: "node.click_semitransp",
    style: {
      opacity: "0.4",
    },
  },
  {
    selector: "node.notfilter",
    style: {
      // opacity: "0.4",
      color: "red",
    },
  },
  {
    selector: "node.fitfilter",
    style: {
      width: "60px",
      height: "60px",
    },
  },
  {
    selector: "edge.target_highlight",
    style: {
      width: 5,
      "mid-target-arrow-color": "#FFF",
      "line-color": "rgb(96, 178, 240)",
      "target-arrow-color": "rgb(96, 178, 240)",
    },
  },
  {
    selector: "edge.income_highlight",
    style: {
      width: 5,
      "mid-target-arrow-color": "#FFF",
      "line-color": "#50b44d",
      "target-arrow-color": "#50b44d",
    },
  },
  {
    selector: "edge.target_clickstyle",
    style: {
      width: 5,
      "mid-target-arrow-color": "#FFF",
      "line-color": "rgb(96, 178, 240)",
      "target-arrow-color": "rgb(96, 178, 240)",
    },
  },
  {
    selector: "edge.income_clickstyle",
    style: {
      width: 5,
      "mid-target-arrow-color": "#FFF",
      "line-color": "#50b44d",
      "target-arrow-color": "#50b44d",
    },
  },
  {
    selector: "edge.semitransp",
    style: {
      opacity: "0.4",
    },
  },
  {
    selector: "edge.click_semitransp",
    style: {
      opacity: "0.4",
    },
  },
];
