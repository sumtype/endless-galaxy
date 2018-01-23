var Player = function(textures, x, y, width, height, accelerationFrequency, decelerationFrequency, xSpeed, ySpeed, stage, renderer, movementBound) {
  this.textures = [];
  for (var i = 0; i < textures.length; i++) this.textures.push(new PIXI.Texture(textures[i]));
  this.textureIndexPadding = (textures.length - 1) / 2;
  this.graphic = new Graphic(textures[0], x, y, width, height, stage);
  this.type = 'PLAYER';
  this.decelerationXSpeed = 0.1;
  this.decelerationYSpeed = 0.1;
  this.accelerationXSpeed = 0.2;
  this.accelerationYSpeed = 0.2;
  this.decelerateXSpeed = true;
  this.decelerateYSpeed = true;
  this.accelerationFrequency = accelerationFrequency;
  this.decelerationFrequency = decelerationFrequency;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.minSpeedX = -2;
  this.minSpeedY = -2;
  this.maxSpeedX = 2;
  this.maxSpeedY = 1;
  this.wPress = false;
  this.aPress = false;
  this.sPress = false;
  this.dPress = false;
  this.shooting = false;
  this.movementBound = movementBound;
  this.renderer = renderer;
  this.stage = stage;
  this.inViewport = true;
  this.initialize();
};
Player.prototype.initialize = function() {
  if (this.xSpeed !== 0) this.decelerateXSpeed = true;
  if (this.ySpeed !== 0) this.decelerateYSpeed = true;
  this.movement(this);
};
Player.prototype.isInViewport = function() {
  return this.inViewport;
};
Player.prototype.movement = function(player) {
  // Update position.
  window.setInterval(function() {
    var x = player.graphic.sprite.position.x + player.xSpeed;
    var y = player.graphic.sprite.position.y + player.ySpeed;
    // Reset x and y values if the player is outside the rendering area and has its movement bound.
    if (x > player.renderer.width - player.graphic.width && player.movementBound) x = player.renderer.width - player.graphic.width;
    if (x < 0 && player.movementBound) x = 0;
    if (y > player.renderer.height - player.graphic.height && player.movementBound) y = player.renderer.height - player.graphic.height;
    if (y < 0 && player.movementBound) y = 0;
    // Update texture based on speed.  Slow needs to be replaced with a sprite sheet update method.
    // player.graphic.sprite.texture = player.textures[(function() {
    //   if (player.xSpeed > 0) return Math.ceil(player.textureIndexPadding * (player.xSpeed / player.maxSpeedX)) - 1;
    //   if (player.xSpeed < 0) return player.textureIndexPadding + -1 * Math.ceil(player.textureIndexPadding * (player.xSpeed / player.maxSpeedX));
    //   return 0;
    // })()];
    // Update the player's position.
    player.graphic.sprite.position.x = x;
    player.graphic.sprite.position.y = y;
    //
    if (x < -player.graphic.width || x > player.renderer.width || y < -player.graphic.height || y > player.renderer.height) {
      player.inViewport = true;
    } else {
      player.inViewport = false;
    }
  }, 17);
  // Start movement triggers.
  window.onkeydown = function(event) {
    // w
    if (event.keyCode === 87) {
      player.wPress = true;
      player.decelerateYSpeed = false;
    }
    // a
    if (event.keyCode === 65) {
      player.aPress = true;
      player.decelerateXSpeed = false;
    }
    // s
    // if (event.keyCode === 83) {
    //   player.sPress = true;
    //   player.decelerateYSpeed = false;
    // }
    // d
    if (event.keyCode === 68) {
      player.dPress = true;
      player.decelerateXSpeed = false;
    }
    // up arrow
    if (event.keyCode === 38) {
      player.wPress = true;
      player.decelerateYSpeed = false;
    }
    // left arrow
    if (event.keyCode === 37) {
      player.aPress = true;
      player.decelerateXSpeed = false;
    }
    // down arrow
    // if (event.keyCode === 40) {
    //   player.sPress = true;
    //   player.decelerateYSpeed = false;
    // }
    // right arrow
    if (event.keyCode === 39) {
      player.dPress = true;
      player.decelerateXSpeed = false;
    }
    // spacebar
    if (event.keyCode === 32) {
      player.shooting = true;
    }
  };
  // Stop movement triggers.
  window.onkeyup = function(event) {
    // w
    if (event.keyCode === 87) {
      player.wPress = false;
      player.decelerateYSpeed = true;
    }
    // a
    if (event.keyCode === 65) {
      player.aPress = false;
      player.decelerateXSpeed = true;
    }
    // s
    // if (event.keyCode === 83) {
    //   player.sPress = false;
    //   player.decelerateYSpeed = true;
    // }
    // d
    if (event.keyCode === 68) {
      player.dPress = false;
      player.decelerateXSpeed = true;
    }
    // up arrow
    if (event.keyCode === 38) {
      player.wPress = false;
      player.decelerateYSpeed = true;
    }
    // left arrow
    if (event.keyCode === 37) {
      player.aPress = false;
      player.decelerateXSpeed = true;
    }
    // down arrow
    // if (event.keyCode === 40) {
    //   player.sPress = false;
    //   player.decelerateYSpeed = true;
    // }
    // right arrow
    if (event.keyCode === 39) {
      player.dPress = false;
      player.decelerateXSpeed = true;
    }
    // spacebar
    if (event.keyCode === 32) {
      player.shooting = false;
    }
  };
  // Acceleration
  window.setInterval(function() {
    if (player.wPress) {
      if (player.ySpeed > 0) player.ySpeed = 0;
      player.ySpeed -= player.accelerationYSpeed;
      if (player.ySpeed < player.minSpeedY) player.ySpeed = player.minSpeedY;
    }
    if (player.aPress) {
      player.xSpeed -= player.accelerationXSpeed;
      if (player.xSpeed < player.minSpeedX) player.xSpeed = player.minSpeedX;
    }
    if (player.dPress) {
      player.xSpeed += player.accelerationXSpeed;
      if (player.xSpeed > player.maxSpeedX) player.xSpeed = player.maxSpeedX;
    }
  }, player.accelerationFrequency);
  // Deceleration
  window.setInterval(function() {
    if (player.xSpeed > 0 && player.decelerateXSpeed) {
      player.xSpeed -= player.decelerationXSpeed;
      if (player.xSpeed - player.decelerationXSpeed < 0) player.xSpeed = 0;
    }
    if (player.xSpeed < 0 && player.decelerateXSpeed) {
      player.xSpeed += player.decelerationXSpeed;
      if (player.xSpeed + player.decelerationXSpeed > 0) player.xSpeed = 0;
    }
    if (player.decelerateYSpeed) {
      if (player.ySpeed < player.maxSpeedY) player.ySpeed += player.decelerationYSpeed;
      if (player.ySpeed > player.maxSpeedY) player.ySpeed = player.maxSpeedY;
      if (player.graphic.sprite.position.y === window.innerHeight + 4 - player.graphic.height) player.ySpeed = 0;
    }
  }, player.decelerationFrequency);
};
