var Graphic = function(texture, x, y, width, height, stage) {
  this.sprite = new PIXI.Sprite(texture);
  this.sprite.position.x = x;
  this.sprite.position.y = y;
  var intialWidth = texture.width;
  var initialHeight = texture.height;
  var xs = width / texture.width;
  var ys = height / texture.height;
  this.width = width;
  this.height = height;
  this.sprite.scale.x = xs;
  this.sprite.scale.y = ys;
  this.stage = stage;
  this.stage.addChild(this.sprite);
};
