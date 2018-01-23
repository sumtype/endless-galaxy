var LoadingImage = function(imageURL, x, y, id) {
  this.figureTag = document.createElement('figure');
  this.figureTag.style.position = 'absolute';
  this.figureTag.style.top = y.toString() + '%';
  this.figureTag.style.left = x.toString() + '%';
  this.figureTag.id = id;
  this.imgTag = document.createElement('img');
  this.imgTag.src = imageURL;
  this.captionTag = document.createElement('figcaption');
  this.captionTag.style.color = 'white';
  this.captionTagText = document.createTextNode('0%');
  this.captionTag.appendChild(this.captionTagText);
  this.figureTag.appendChild(this.imgTag);
  this.figureTag.appendChild(this.captionTag);
  this.figureParent = document.getElementById('game');
};
LoadingImage.prototype.display = function() {
  this.figureParent.appendChild(this.figureTag);
};
LoadingImage.prototype.remove = function() {
  this.figureTag.parentNode.removeChild(this.figureTag);
};
LoadingImage.prototype.updateText = function(text) {
  this.captionTagText.parentNode.removeChild(this.captionTagText);
  this.captionTagText = document.createTextNode(text);
  this.captionTag.appendChild(this.captionTagText);
};
LoadingImage.prototype.setX = function(x) {
  this.figureTag.style.left = x.toString() + '%';
};
LoadingImage.prototype.setY = function(y) {
  this.figureTag.style.top = y.toString() + '%';
};
