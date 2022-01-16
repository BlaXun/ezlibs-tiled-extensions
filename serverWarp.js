const VERSION = "0.0.1";

const Shapes = {
  Rectangle: 0,
  Ellipse: 3,
  Pointer: 5,
};

function createMapObjectWithName(map, name, x, y) {
  let object = new MapObject(name);
  object.setProperty("_version", VERSION);
  object.x = map.screenToPixel(x, y).x;
  object.y = map.screenToPixel(x, y).y;
  object.width = 16;
  object.height = 16;

  return object;
}

var serverWarpTool = tiled.registerTool("ServerWarp", {
  name: "Place Server Warp",

  mousePressed: function (button, x, y, modifiers) {
    var objectLayer = this.map.currentLayer;
    if (objectLayer && objectLayer.isObjectLayer) {
      let object = createMapObjectWithName(this.map, "ServerWarp", x, y);

      object.type = "Server Warp";
      object.visible = true;
      object.setProperty("Incoming Data", "");
      object.setProperty("Warp In", true);
      object.setProperty("Warp Out", true);
      object.setProperty("Arrival Animation", "");
      object.setProperty("Leave Animation", "");
      object.setProperty("Dont Teleport", false);
      object.setProperty("Direction", "Up");
      object.setProperty("Address", "IP address / hostname of server");
      object.setProperty("Data", "");

      objectLayer.addObject(object);
      object.selected = true;
    }
  },
});

var customWarpTool = tiled.registerTool("CustomWarp", {
  name: "Place Custom Warp",

  mousePressed: function (button, x, y, modifiers) {
    var objectLayer = this.map.currentLayer;
    if (objectLayer && objectLayer.isObjectLayer) {
      let object = createMapObjectWithName(this.map, "CustomWarp", x, y);

      object.type = "Custom Warp";
      object.visible = true;
      object.setProperty("Incoming Data", "");
      object.setProperty("Warp In", true);
      object.setProperty("Warp Out", true);
      object.setProperty("Arrival Animation", "");
      object.setProperty("Leave Animation", "");
      object.setProperty("Dont Teleport", false);
      object.setProperty("Direction", "Up");
      object.setProperty(
        "Target Area",
        "name of area you want to transfer to, (same as filename, minus the .tmx"
      );
      object.setProperty(
        "Target Object",
        "id of object you want to teleport to"
      );

      objectLayer.addObject(object);
      object.selected = true;
    }
  },
});

var radiusWarpTool = tiled.registerTool("RadiusWarp", {
  name: "Place Radius Warp",

  mousePressed: function (button, x, y, modifiers) {
    var objectLayer = this.map.currentLayer;
    if (objectLayer && objectLayer.isObjectLayer) {
      let object = createMapObjectWithName(this.map, "RadiusWarp", x, y);

      object.type = "Custom Warp";
      object.visible = true;
      object.setProperty("Incoming Data", "");
      object.setProperty("Warp In", true);
      object.setProperty("Warp Out", true);
      object.setProperty("Arrival Animation", "");
      object.setProperty("Leave Animation", "");
      object.setProperty("Dont Teleport", false);
      object.setProperty("Direction", "Up");
      object.setProperty("Activation Radius", 16.0);
      object.width = 16.0;
      object.height = 16.0;
      object.shape = Shapes.Pointer;
      objectLayer.addObject(object);
      object.selected = true;
    }
  },
});
