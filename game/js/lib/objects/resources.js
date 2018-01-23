function addResourcesForLoading(loader) {
  // Add player images.
  // for (var i = 1; i < 200; i++) {
  //   var imagePath = 'assets/player/spaceship' + i.toString() + '.png';
  //   var imageResourceName = 'player' + i.toString();
  //   loader.add(imageResourceName, imagePath);
  // }
  loader.add('player', 'assets/player/spaceship.png');
  // Add particle images.
  loader.add('particleDemo', 'assets/particles/demo.png');
  loader.add('particleBg', 'assets/particles/bg.png');
}
