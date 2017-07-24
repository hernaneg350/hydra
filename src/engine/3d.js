module.exports = {
	identity: function() {
		return [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1
		];
	},
	quaternionRotation: function(axis, angle) {
		var halfAngle = angle / 2;
		var sinHalfAngle = Math.sin(halfAngle);

		var qi = axis[0] * sinHalfAngle;
		var qj = axis[1] * sinHalfAngle;
		var qk = axis[2] * sinHalfAngle;
		var qr = Math.cos(halfAngle);

		var qi2 = qi*qi;
		var qj2 = qj*qj;
		var qk2 = qk*qk;
		var s = 1 / (qi2 + qj2 + qk2 + qr*qr);
		var _2s = 2*s;

		var qiqj = qi*qj;
		var qkqr = qk*qr;
		var qiqk = qi*qk;
		var qjqr = qj*qr;
		var qiqr = qi*qr;
		var qjqk = qj*qk;

		return [
			1 - _2s*(qj2 + qk2), _2s*(qiqj - qkqr), _2s*(qiqk + qjqr),
			_2s*(qiqj + qkqr), 1 - _2s*(qi2 + qk2), _2s*(qjqk - qiqr),
			_2s*(qiqk - qjqr), _2s*(qjqk + qiqr), 1 - _2s*(qi2 + qj2)
		];
	},
	radians: function(degrees) {
		return degrees * Math.PI / 180;
	},
	axis: function(vector) {
		var x = vector[0];
		var y = vector[1];
		var z = vector[2];

		var norm = Math.sqrt(x*x + y*y + z*z);

		return [x / norm, y / norm, z / norm];
	}
};