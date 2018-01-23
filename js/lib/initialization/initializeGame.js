function initializeView() {
  document.getElementById('game').appendChild(renderer.view);
  window.onresize = function() {
    renderer.view.style.width = window.innerWidth + 'px';
    renderer.view.style.height = window.innerHeight + 4 + 'px';
    renderer.resize(window.innerWidth, window.innerHeight + 4);
  };
}
function initializeLoading() {
  var loader = PIXI.loader;
  var loadingGif = new LoadingImage('assets/loader.gif', 50, 50, 'loadingAssets');
  loadingGif.display();
  addResourcesForLoading(loader);
  loader.on('progress', function(state) {
    loadingGif.updateText(Math.ceil(state.progress).toString() + '%');
  });
  loader.once('complete', function(loader, resources) {
    loadingGif.updateText('Assets loaded.  Preparing game objects.');
    for (i = 1; i < countSpecificKeyValuePairs(resources, 'player') + 1; i++) playerTextures.push(resources['player' + i.toString()].texture);
    player = new Player(playerTextures, window.innerWidth / 2, window.innerHeight / 3 * 2, 150, 150, 75, 75, 0, 0, stage, renderer, true);
    var particleSystemSettings = {
			'alpha': { 'start': 1, 'end': 0.31 },
			'scale': { 'start': 0.5, 'end': 1 },
			'color': { 'start': 'ffffff', 'end': '9ff3ff' },
			'speed': { 'start': 1000, 'end': 200 },
			'startRotation': { 'min': 225, 'max': 320	},
			'rotationSpeed': { 'min': 0, 'max': 20 },
			'lifetime': { 'min': 0.25, 'max': 0.5 },
			'blendMode': 'normal',
			'frequency': 0.001,
			'emitterLifetime': 0,
			'maxParticles': 1000,
			'pos': { 'x': 0, 'y': 0 },
			'addAtBack': false,
			'spawnType': 'circle',
			'spawnCircle': { 'x': 0, 'y': 0, 'r': 0 }
    };
    // particleSystem = new ParticleSystem('assets/particles/demo.png', particleSystemSettings, stage);
    loadingGif.remove();
    renderGame();
    var maxParticlesInSystem = 0;
    window.addEventListener('mousemove', function(event) {
      particleSystem.position(event.clientX, event.clientY);
    });
  });
  loader.load();
}
