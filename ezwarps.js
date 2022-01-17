const VERSION = "0.0.1";

const MouseButtons = {
  Left: 1,
  Right: 2,
};

const Shapes = {
  Rectangle: 0,
  Ellipse: 3,
  Pointer: 5,
};

function createMapObjectWithName(map, name, x, y, deselectOtherObjects) {
  if (deselectOtherObjects) {
    map.selectedObjects = [];
  }

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
  icon: "serverwarp.png",

  mousePressed: function (button, x, y, modifiers) {
    if (button != MouseButtons.Left) {
      return;
    }

    var objectLayer = this.map.currentLayer;
    if (objectLayer && objectLayer.isObjectLayer) {
      let object = createMapObjectWithName(this.map, "ServerWarp", x, y, true);
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
  icon: "customwarp.png",

  mousePressed: function (button, x, y, modifiers) {
    if (button != MouseButtons.Left) {
      return;
    }

    var objectLayer = this.map.currentLayer;
    if (objectLayer && objectLayer.isObjectLayer) {
      let object = createMapObjectWithName(this.map, "CustomWarp", x, y, true);
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
  icon: "radiuswarp.png",
  radius: 16.0,

  mousePressed: function (button, x, y, modifiers) {
    tiled.warn(button);

    if (button != MouseButtons.Left) {
      return;
    }

    var objectLayer = this.map.currentLayer;
    if (objectLayer && objectLayer.isObjectLayer) {
      let object = createMapObjectWithName(this.map, "RadiusWarp", x, y, true);
      object.type = "Custom Warp";
      object.visible = true;
      object.width = this.radius;
      object.height = this.radius;
      object.shape = Shapes.Ellipse;

      object.setProperty("Incoming Data", "");
      object.setProperty("Warp In", true);
      object.setProperty("Warp Out", true);
      object.setProperty("Arrival Animation", "");
      object.setProperty("Leave Animation", "");
      object.setProperty("Dont Teleport", false);
      object.setProperty("Direction", "Up");
      object.setProperty("Activation Radius", this.radius);

      objectLayer.addObject(object);

      object.selected = true;
    }
  },

  keyPressed(key, modifiers) {
    if (key == Qt.Key_Up) {
      this.radius += 1;
    } else if (key == Qt.Key_Down && this.radius > 1) {
      this.radius -= 1;
    }

    this.refreshStatus();
  },

  activated() {
    this.refreshStatus();
  },

  refreshStatus() {
    this.statusInfo =
      "Place a radius warp with radius of size " +
      this.radius +
      " (Up/Down to increase/decrease size)";
  },
});
