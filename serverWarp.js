const VERSION = "0.0.1";

tiled.activeAssetChanged.connect(function (asset) {
  tiled.error(asset);
});

var tool = tiled.registerTool("ServerWarp", {
  name: "Place Server Warp",
  tile: null,

  mousePressed: function (button, x, y, modifiers) {
    var objectLayer = this.map.currentLayer;
    if (objectLayer && objectLayer.isObjectLayer) {
      let object = this.createMapObjectWithName("ServerWarp", x, y);

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
      this.selected = false;
    }
  },

  createMapObjectWithName: function (name, x, y) {
    let object = new MapObject(name);
    object.setProperty("_version", VERSION);
    object.x = this.map.screenToPixel(x, y).x;
    object.y = this.map.screenToPixel(x, y).y;
    object.width = 16;
    object.height = 16;

    return object;
  },

  activated: function () {
    // Make sure to try n get the currently selected tile... Tiled doesnt do this it seems
    //this.tile = tiled.mapEditor.tilesetsView.selectedTiles[0];
  },
});
