function AssetPool() {
	this.pool = new Array(1000);
	this.nextAllocation = 0;
}

AssetPool.prototype.saveAsset = function (asset) {
	this.pool[this.nextAllocation] = asset;

	return this.nextAllocation++;
};

AssetPool.prototype.getAsset = function(assetHandle) {
	return this.pool[assetHandle];
};

module.exports = {
	AssetPool: AssetPool
};