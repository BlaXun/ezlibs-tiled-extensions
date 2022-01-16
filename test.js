var tool = tiled.registerTool("ServerWarp", {
    name: "Place Server Warp",

    mousePressed: function(button, x, y, modifiers) {
		
		var objectLayer = this.map.currentLayer
		if (objectLayer && objectLayer.isObjectLayer) {
				
			var object = new MapObject("Server Warp")
            object.x = this.map.screenToPixel(x,y).x
            object.y = this.map.screenToPixel(x,y).y
            object.width = tiled.mapEditor.tilesetsView.currentTileset.tileWidth
            object.height = tiled.mapEditor.tilesetsView.currentTileset.tileHeight
			object.type = "Server Warp"
			object.visible = true
			object.tile = this.selectedTile
			
			object.setProperty("Direction","Up")
			
            objectLayer.addObject(object)
			object.selected = true
			this.selected = false
        }
    }
})