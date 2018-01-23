// Global Variables
var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight + 4);
var stage = new PIXI.Container();
var player = null;
var playerTextures = [];
var playerTexturesLength = 0;
var particleSystems = [];
var particleSystem = null;
// Viewport and Resource Loading Initialization
initializeView(renderer);
initializeLoading();
