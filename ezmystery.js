const VERSION = "0.0.1";

const Shapes = {
  Rectangle: 0,
  Ellipse: 3,
  Pointer: 5,
};

const MouseButtons = {
  Left: 1,
  Right: 2,
};

var mysteryDataTool = tiled.registerTool("MysteryData", {
  name: "Place Mystery Data",
  icon: "mysterydata.png",
  tile: null,

  mousePressed: function (button, x, y, modifiers) {
    if (button != MouseButtons.Left) {
      return;
    }

    let tile = this.selectedTile ? this.selectedTile : this.tile;

    if (tile == null || tile == undefined) {
      tiled.alert(
        'Please select a tile to place a mystery data. After placing a mystery data you can use the "Place Mystery Option"-Tool'
      );
    }

    var objectLayer = this.map.currentLayer;
    if (objectLayer && objectLayer.isObjectLayer) {
      let object = createMapObjectWithName(this.map, "MysteryData", x, y, true);
      object.type = "Mystery Datum";
      object.tile = tile;
      object.width = tile.width;
      object.height = tile.height;
      objectLayer.addObject(object);
      object.selected = true;
      object.setProperty("Type", "Choose one: money|keyitem|random");
      object.setProperty("Amount", 0);
      object.setProperty(
        "Name",
        "name of the key item to give the player (the item will be created automatically by ezmystery if it does not exist)"
      );
      object.setProperty(
        "Description",
        "description of the key item to give the player, if keyitems with the same name already exist, all of them will be updated with the new description"
      );
    }
  },

  activated: function () {
    this.updateStatus();
    if (tiled.mapEditor.tilesetsView.selectedTiles !== null) {
      this.tile = tiled.mapEditor.tilesetsView.selectedTiles[0];
    }
  },

  updateStatus: function () {
    this.statusInfo =
      'Please select a tile to place a mystery data. After placing a mystery data you can use the "Place Mystery Option"-Tool';
  },
});

var mysteryDataTool = tiled.registerTool("MysteryOption", {
  name: "Place Mystery Option",
  icon: "mysteryoption.png",

  activated: function () {
    this.statusInfo =
      "Add a mystery option that can be picked up by a mystery data of type random";

    if (
      this.map.selectedObjects.length > 0 &&
      this.map.selectedObjects[0].type == "Mystery Datum"
    ) {
      var objectLayer = this.map.currentLayer;
      if (objectLayer && objectLayer.isObjectLayer) {
        let mysteryData = this.map.selectedObjects[0];
        let nextCount = 1;
        let didReachLast = false;
        while (didReachLast == false) {
          if (mysteryData.properties()["Next " + nextCount] == null) {
            didReachLast = true;
          } else {
            tiled.warn("Did find Next " + nextCount);
            nextCount++;
          }
        }

        let object = createMapObjectWithName(
          this.map,
          "MysteryOption",
          -20,
          mysteryData.y + (nextCount - 1) * mysteryData.height,
          false
        );
        object.type = "Mystery Option";
        object.shape = Shapes.Pointer;
        objectLayer.addObject(object);
        object.setProperty("Type", "Choose one: money|keyitem");
        object.setProperty("Amount", 0);
        object.setProperty(
          "Name",
          "name of the key item to give the player (the item will be created automatically by ezmystery if it does not exist)"
        );
        object.setProperty(
          "Description",
          "description of the key item to give the player, if keyitems with the same name already exist, all of them will be updated with the new description"
        );

        mysteryData.setProperty("Next " + nextCount.toString(), object);

        this.map.selectedObjects = [];
        object.selected = true;
      }
    } else {
      tiled.alert(
        'Select an object of type "Mystery Data" to add a Mystery Option'
      );
    }
  },
});
