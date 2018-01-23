var ParticleSystem = function(particleTexture, config, stage) {
	this.elapsed = Date.now();
	this.emitterContainer = new PIXI.Container();
	stage.addChild(this.emitterContainer);
	this.emitter = new cloudkid.Emitter(this.emitterContainer, [PIXI.Texture.fromImage(particleTexture)], config);
	this.emitter.updateOwnerPos(window.innerWidth / 2, (window.innerHeight + 4) / 2);
	console.log(this);
	var that = this;
	this.update = window.setInterval(function() {
		var now = Date.now();
		that.emitter.update((now - that.elapsed) * 0.001);
		that.elapsed = now;
	}, 10);
};
ParticleSystem.prototype.remove = function() {
	clearInterval(this.update);
	this.emitter.destroy();
	this.emitter = null;
};
ParticleSystem.prototype.position = function(x, y) {
	this.emitter.updateOwnerPos(x, y);
};
ParticleSystem.prototype.maxParticles = function(value) {
	if (typeof value !== undefined) this.emitter.maxParticles = value;
	return this.emitter.maxParticles;
};
ParticleSystem.prototype.emitterLifetime = function(value) {
	if (typeof value !== undefined) this.emitter.emitterLifetime = value;
	return this.emitter.emitterLifetime;
};
ParticleSystem.prototype.frequency = function(value) {
	if (typeof value !== undefined) this.emitter.frequency = value;
	return this.emitter.frequency;
};
ParticleSystem.prototype.minLifetime = function(value) {
	if (typeof value !== undefined) this.emitter.minLifetime = value;
	return this.emitter.minLifetime;
};
ParticleSystem.prototype.maxLifetime = function(value) {
	if (typeof value !== undefined) this.emitter.maxLifetime = value;
	return this.emitter.maxLifetime;
};
ParticleSystem.prototype.startSpeed = function(value) {
	if (typeof value !== undefined) this.emitter.startSpeed = value;
	return this.emitter.startSpeed;
};
ParticleSystem.prototype.endSpeed = function(value) {
	if (typeof value !== undefined) this.emitter.endSpeed = value;
	return this.emitter.endSpeed;
};
ParticleSystem.prototype.startAlpha = function(value) {
	if (typeof value !== undefined) this.emitter.startAlpha = value;
	return this.emitter.startAlpha;
};
ParticleSystem.prototype.endAlpha = function(value) {
	if (typeof value !== undefined) this.emitter.endAlpha = value;
	return this.emitter.endAlpha;
};
ParticleSystem.prototype.startScale = function(value) {
	if (typeof value !== undefined) this.emitter.startScale = value;
	return this.emitter.startScale;
};
ParticleSystem.prototype.endScale = function(value) {
	if (typeof value !== undefined) this.emitter.endScale = value;
	return this.emitter.endScale;
};
ParticleSystem.prototype.startColor = function(value) {
	if (typeof value !== undefined) this.emitter.startColor = value;
	return this.emitter.startColor;
};
ParticleSystem.prototype.endColor = function(value) {
	if (typeof value !== undefined) this.emitter.endColor = value;
	return this.emitter.endColor;
};
ParticleSystem.prototype.minStartRotation = function(value) {
	if (typeof value !== undefined) this.emitter.minStartRotation = value;
	return this.emitter.minStartRotation;
};
ParticleSystem.prototype.maxStartRotation = function(value) {
	if (typeof value !== undefined) this.emitter.maxStartRotation = value;
	return this.emitter.maxStartRotation;
};
ParticleSystem.prototype.minRotationSpeed = function(value) {
	if (typeof value !== undefined) this.emitter.minRotationSpeed = value;
	return this.emitter.minRotationSpeed;
};
ParticleSystem.prototype.maxRotationSpeed = function(value) {
	if (typeof value !== undefined) this.emitter.maxRotationSpeed = value;
	return this.emitter.maxRotationSpeed;
};
