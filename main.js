! function (e) {
	function t(t) {
		for (var n, r, a = t[0], o = t[1], s = 0, l = []; s < a.length; s++) r = a[s], Object.prototype.hasOwnProperty.call(i, r) && i[r] && l.push(i[r][0]), i[r] = 0;
		for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
		for (c && c(t); l.length;) l.shift()()
	}
	var n = {},
		i = {
			0: 0
		};

	function r(t) {
		if (n[t]) return n[t].exports;
		var i = n[t] = {
			i: t,
			l: !1,
			exports: {}
		};
		return e[t].call(i.exports, i, i.exports, r), i.l = !0, i.exports
	}
	r.e = function (e) {
		var t = [],
			n = i[e];
		if (0 !== n)
			if (n) t.push(n[2]);
			else {
				var a = new Promise((function (t, r) {
					n = i[e] = [t, r]
				}));
				t.push(n[2] = a);
				var o, s = document.createElement("script");
				s.charset = "utf-8", s.timeout = 120, r.nc && s.setAttribute("nonce", r.nc), s.src = function (e) {
					return r.p + "" + ({}[e] || e) + ".js"
				}(e);
				var c = new Error;
				o = function (t) {
					s.onerror = s.onload = null, clearTimeout(l);
					var n = i[e];
					if (0 !== n) {
						if (n) {
							var r = t && ("load" === t.type ? "missing" : t.type),
								a = t && t.target && t.target.src;
							c.message = "Loading chunk " + e + " failed.\n(" + r + ": " + a + ")", c.name = "ChunkLoadError", c.type = r, c.request = a, n[1](c)
						}
						i[e] = void 0
					}
				};
				var l = setTimeout((function () {
					o({
						type: "timeout",
						target: s
					})
				}), 12e4);
				s.onerror = s.onload = o, document.head.appendChild(s)
			}
		return Promise.all(t)
	}, r.m = e, r.c = n, r.d = function (e, t, n) {
		r.o(e, t) || Object.defineProperty(e, t, {
			enumerable: !0,
			get: n
		})
	}, r.r = function (e) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}, r.t = function (e, t) {
		if (1 & t && (e = r(e)), 8 & t) return e;
		if (4 & t && "object" == typeof e && e && e.__esModule) return e;
		var n = Object.create(null);
		if (r.r(n), Object.defineProperty(n, "default", {
				enumerable: !0,
				value: e
			}), 2 & t && "string" != typeof e)
			for (var i in e) r.d(n, i, function (t) {
				return e[t]
			}.bind(null, i));
		return n
	}, r.n = function (e) {
		var t = e && e.__esModule ? function () {
			return e.default
		} : function () {
			return e
		};
		return r.d(t, "a", t), t
	}, r.o = function (e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, r.p = "dist", r.oe = function (e) {
		throw console.error(e), e
	};
	var a = window.webpackJsonp = window.webpackJsonp || [],
		o = a.push.bind(a);
	a.push = t, a = a.slice();
	for (var s = 0; s < a.length; s++) t(a[s]);
	var c = o;
	r(r.s = 7)
}([function (e, t) {
	e.exports = "precision highp float;\r\n\r\n#define PI 3.14159265359\r\n#define TWO_PI 6.28318530718\r\n#define HALF_PI 1.57079632679\r\n#define INV_PI 0.31830988618\r\n\r\n// When looking at the 'side' inside the wormhole there will be artifacts. We just fade to black to hide these artifacts\r\n#define THROAT_FADE_START 20.0\r\n#define THROAT_FADE_LENGTH 20.0\r\n\r\n\r\nattribute vec2 position;\r\n\r\nuniform vec2 uAngleRange;\r\n\r\nvarying float vTheta;\r\n\r\nvoid main() {\r\n  vTheta = mix(uAngleRange.x, uAngleRange.y, (position.x + 1.0) * 0.5);\r\n\r\n  gl_Position = vec4(position, 0.0, 1.0);\r\n}\r\n"
}, function (e, t) {
	e.exports = "precision highp float;\r\n\r\n#define PI 3.14159265359\r\n#define TWO_PI 6.28318530718\r\n#define HALF_PI 1.57079632679\r\n#define INV_PI 0.31830988618\r\n\r\n// When looking at the 'side' inside the wormhole there will be artifacts. We just fade to black to hide these artifacts\r\n#define THROAT_FADE_START 20.0\r\n#define THROAT_FADE_LENGTH 20.0\r\n\r\n\r\nuniform vec3 uCameraPosition;\r\n\r\nuniform float uRadiusSquared;\r\nuniform float uThroatLength;\r\n\r\nvarying float vTheta;\r\n\r\n// Not using structs for the intermediate state (position, direction, throatTravelDistance) because\r\n// for some reason that heavily impacts the visual quality\r\n\r\n// Do an integration step in 2D wormhole space.\r\nvoid step2D(inout vec2 position, inout vec2 direction, inout float throatTravelDistance) {\r\n  float distanceToWormhole = abs(position.x) - uThroatLength;\r\n\r\n  float delta;\r\n\r\n  if (distanceToWormhole >= 0.0) {\r\n    // We can take bigger integration steps when at a larger distance away from the wormhole.\r\n    delta = (0.1 + 0.02 * distanceToWormhole) / uRadiusSquared;\r\n\r\n    // Use backwards euler integration\r\n    float h = delta,\r\n          h2 = h * h,\r\n          x = sign(position.x) * distanceToWormhole,\r\n          x2 = x * x,\r\n          b2 = uRadiusSquared,\r\n          dx = direction.x,\r\n          dx2 = dx * dx,\r\n          dy = direction.y,\r\n          dy2 = dy * dy,\r\n\r\n          r2 = b2 + x2,\r\n          hdx = h * dx,\r\n          s = 2.0 * x * hdx,\r\n          t = h2 * (b2 - 3.0 * x2);\r\n\r\n    vec2 directionDelta = vec2(\r\n        dy * (x * r2 * r2 - 2.0 * x * t * dx2 + (b2 * b2 - x2 * x2) * hdx),\r\n        -2.0 * (x2 * (x - hdx) + b2 * (x + hdx)) * (dx + h * x * dy2)\r\n    ) * dy * h / (r2 * (r2 + s) - t * (r2 - s) * dy2);\r\n\r\n    direction += directionDelta;\r\n  }\r\n  else {\r\n    // Inside the wormhole spacetime is flat, so just compute the distance to the mouth.\r\n    if (direction.x < 0.0) {\r\n      delta = (position.x + uThroatLength) / -direction.x;\r\n    }\r\n    else {\r\n      delta = (uThroatLength - position.x) / direction.x;\r\n    }\r\n    throatTravelDistance += abs(delta);\r\n  }\r\n  position += direction * delta;\r\n}\r\n\r\n// Normalize the direction according to the curvature.\r\nvoid normalizeDirection2D(vec2 position, inout vec2 direction) {\r\n  float distanceToWormhole = max(0.0, abs(position.x) - uThroatLength);\r\n\r\n  float magnitude = sqrt(\r\n    direction.x * direction.x +\r\n    (distanceToWormhole * distanceToWormhole + uRadiusSquared) * direction.y * direction.y\r\n  );\r\n\r\n  direction /= magnitude;\r\n}\r\n\r\n// Integrate in 2D wormhole space.\r\nvoid integrate2D(inout vec2 position, inout vec2 direction, inout float throatTravelDistance) {\r\n  for (int i = 0; i < 200; i++) {\r\n    step2D(position, direction, throatTravelDistance);\r\n    // normalizeDirection2D(ray);\r\n  }\r\n}\r\n\r\nvoid main() {\r\n  float distanceToWormhole = max(0.0, abs(uCameraPosition.x) - uThroatLength);\r\n\r\n  float directionX = cos(vTheta);\r\n  float sinTheta = sin(vTheta);\r\n\r\n  vec2 position = vec2(uCameraPosition.x, 0.0);\r\n  vec2 direction = vec2(\r\n    directionX,\r\n    sqrt(sinTheta * sinTheta / (distanceToWormhole * distanceToWormhole + uRadiusSquared))\r\n  );\r\n  float throatTravelDistance = 0.0;\r\n\r\n  integrate2D(position, direction, throatTravelDistance);\r\n\r\n  // Compute the end-direction in cartesian space\r\n  distanceToWormhole = max(0.0, abs(position.x) - uThroatLength);\r\n  float r = distanceToWormhole * (position.x / abs(position.x));\r\n\r\n  vec2 finalDirection = vec2(\r\n    direction.x * cos(position.y) - r * direction.y * sin(position.y),\r\n    direction.x * sin(position.y) + r * direction.y * cos(position.y)\r\n  );\r\n\r\n  #if RENDER_TO_FLOAT_TEXTURE\r\n    gl_FragColor = vec4(finalDirection, position.x, throatTravelDistance);\r\n  #else\r\n    float distance = (throatTravelDistance - uThroatLength * THROAT_FADE_START) / (uThroatLength * THROAT_FADE_LENGTH);\r\n    gl_FragColor = vec4(\r\n      normalize(finalDirection) * 0.5 + 0.5,\r\n      clamp(position.x, -0.5, 0.5) + 0.5,\r\n      clamp(distance, 0.0, 1.0)\r\n    );\r\n  #endif\r\n}\r\n"
}, function (e, t) {
	e.exports = "precision highp float;\r\n\r\nattribute vec2 position;\r\n\r\nuniform mat4 uCameraOrientation;\r\n\r\nvarying vec3 vRayDir;\r\n\r\nvoid main() {\r\n  vRayDir = (uCameraOrientation * vec4(position.x, position.y, -1.0, 0.0)).xyz;\r\n\r\n  gl_Position = vec4(position, 0.0, 1.0);\r\n}\r\n"
}, function (e, t) {
	e.exports = "precision highp float;\r\n\r\n#define PI 3.14159265359\r\n#define TWO_PI 6.28318530718\r\n#define HALF_PI 1.57079632679\r\n#define INV_PI 0.31830988618\r\n\r\n// When looking at the 'side' inside the wormhole there will be artifacts. We just fade to black to hide these artifacts\r\n#define THROAT_FADE_START 20.0\r\n#define THROAT_FADE_LENGTH 20.0\r\n\r\n\r\nuniform vec3 uCameraPosition;\r\n\r\nuniform float uRadiusSquared;\r\nuniform float uThroatLength;\r\n\r\nuniform sampler2D uIntegrationBuffer;\r\nuniform samplerCube uSkybox1;\r\nuniform samplerCube uSkybox2;\r\n\r\nuniform vec2 uAngleRange;\r\n\r\nvarying vec3 vRayDir;\r\n\r\n/**\r\n *  Util\r\n */\r\nvoid sphericalToCartesian(vec2 position, vec2 direction, out vec3 outPos, out vec3 outDir) {\r\n  float sinY = sin(position.y),\r\n        cosY = cos(position.y),\r\n        sinX = sin(position.x),\r\n        cosX = cos(position.x);\r\n\r\n  outPos = vec3(sinY * cosX, -cosY, -sinY * sinX);\r\n  outDir = vec3(\r\n    -sinY * sinX * direction.x + cosY * cosX * direction.y,\r\n     sinY * direction.y,\r\n    -sinY * cosX * direction.x - cosY * sinX * direction.y\r\n  );\r\n}\r\n\r\n// Not using structs for the intermediate state (position, direction, throatTravelDistance) because\r\n// for some reason that heavily impacts the visual quality\r\n\r\n// Integrate!\r\nvoid integrate3D(inout vec3 position, vec3 direction, inout float throatTravelDistance, out vec3 cubeCoord) {\r\n  // We integrate in a 2D plane so we don't have to deal with the poles of spherical coordinates, where\r\n  // integration might go out of hand.\r\n\r\n  // Determine the X- and Y-axes in this plane\r\n  vec3 pos3D, dir3D, axisX, axisY, axisZ;\r\n  sphericalToCartesian(position.zy, direction.zy, pos3D, dir3D);\r\n\r\n  axisX = normalize(pos3D);\r\n  axisZ = cross(axisX, normalize(dir3D));\r\n  axisY = cross(axisZ, axisX);\r\n\r\n  float theta = acos(direction.x);\r\n  float x = (theta - uAngleRange.x) / (uAngleRange.y - uAngleRange.x);\r\n  vec4 finalIntegrationState = texture2D(uIntegrationBuffer, vec2(x, 0.5));\r\n\r\n  #if !RENDER_TO_FLOAT_TEXTURE\r\n    finalIntegrationState.xy = finalIntegrationState.xy * 2.0 - 1.0;\r\n    finalIntegrationState.z -= 0.5;\r\n    finalIntegrationState.w = uThroatLength * (THROAT_FADE_START + finalIntegrationState.w * THROAT_FADE_LENGTH);\r\n  #endif\r\n\r\n  // Compute the end-direction in cartesian space\r\n  cubeCoord = axisX * finalIntegrationState.x + axisY * finalIntegrationState.y;\r\n\r\n  // Transform the 2D position and direction back into 3D\r\n  // Though only position.x is used, we don't transform the other ray attributes\r\n  position.x = finalIntegrationState.z;\r\n  throatTravelDistance = finalIntegrationState.w;\r\n}\r\n\r\n// Transform a direction given in flat spacetime coordinates to one of the same angle\r\n// in wormhole spacetime coordinates.\r\nvoid adjustDirection(vec3 position, inout vec3 direction) {\r\n  float distanceToWormhole = max(0.0, abs(position.x) - uThroatLength);\r\n\r\n  float r = sqrt(distanceToWormhole * distanceToWormhole + uRadiusSquared);\r\n  direction.y /= r;\r\n  direction.z /= r * sin(position.y);\r\n}\r\n\r\n// Get the final color given a position and direction.\r\nvec4 getColor(vec3 position, float throatTravelDistance, vec3 cubeCoord) {\r\n  vec3 skybox1Color = textureCube(uSkybox1, cubeCoord).rgb;\r\n  vec3 skybox2Color = textureCube(uSkybox2, cubeCoord).rgb;\r\n\r\n  float merge = 0.5 - clamp(position.x, -0.5, 0.5);\r\n  vec3 color = mix(skybox1Color, skybox2Color, merge);\r\n\r\n  // Prettify the thing where everything becomes infinite\r\n  float cutoffStart = uThroatLength * THROAT_FADE_START;\r\n  float cutoffLength = uThroatLength * THROAT_FADE_LENGTH;\r\n\r\n  float blackFade = clamp((throatTravelDistance - cutoffStart) / cutoffLength, 0.0, 1.0);\r\n\r\n  return vec4(mix(color, vec3(0.0), blackFade), 1.0);\r\n}\r\n\r\nvoid main()\r\n{\r\n  vec3 position = uCameraPosition;\r\n  vec3 direction = normalize(vRayDir);\r\n  float throatTravelDistance = 0.0;\r\n\r\n  adjustDirection(position, direction);\r\n\r\n  vec3 cubeCoord;\r\n\r\n  // Integrate in wormhole space coordinates\r\n  integrate3D(position, direction, throatTravelDistance, cubeCoord);\r\n\r\n  gl_FragColor = getColor(position, throatTravelDistance, cubeCoord);\r\n}\r\n"
}, function (e, t) {
	e.exports = "varying vec2 vCoordinate;\r\nvarying float vPixelPos;\r\n\r\nvoid main() {\r\n  vCoordinate = uv;\r\n  vec4 vertex = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n  vPixelPos = length(vertex.xy) / vertex.w;\r\n  gl_Position = vertex;\r\n}\r\n"
}, function (e, t) {
	e.exports = "uniform sampler2D map;\r\n\r\nvarying vec2 vCoordinate;\r\nvarying float vPixelPos;\r\n\r\nvoid main() {\r\n  vec2 uv = vec2(\r\n    vCoordinate.x * 0.8,\r\n    vCoordinate.y * 8.0 * 0.15915494309\r\n  );\r\n  vec4 color = texture2D(map, uv);\r\n  color.rgb *= (1.0 - vPixelPos) * 2.0;\r\n  gl_FragColor = color;\r\n}\r\n"
}, , function (e, t, n) {
	"use strict";
	n.r(t), void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52)), void 0 === Number.isInteger && (Number.isInteger = function (e) {
		return "number" == typeof e && isFinite(e) && Math.floor(e) === e
	}), void 0 === Math.sign && (Math.sign = function (e) {
		return e < 0 ? -1 : e > 0 ? 1 : +e
	}), "name" in Function.prototype == !1 && Object.defineProperty(Function.prototype, "name", {
		get: function () {
			return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]
		}
	}), void 0 === Object.assign && (Object.assign = function (e) {
		if (null == e) throw new TypeError("Cannot convert undefined or null to object");
		for (var t = Object(e), n = 1; n < arguments.length; n++) {
			var i = arguments[n];
			if (null != i)
				for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
		}
		return t
	});

	function i() {}
	Object.assign(i.prototype, {
		addEventListener: function (e, t) {
			void 0 === this._listeners && (this._listeners = {});
			var n = this._listeners;
			void 0 === n[e] && (n[e] = []), -1 === n[e].indexOf(t) && n[e].push(t)
		},
		hasEventListener: function (e, t) {
			if (void 0 === this._listeners) return !1;
			var n = this._listeners;
			return void 0 !== n[e] && -1 !== n[e].indexOf(t)
		},
		removeEventListener: function (e, t) {
			if (void 0 !== this._listeners) {
				var n = this._listeners[e];
				if (void 0 !== n) {
					var i = n.indexOf(t); - 1 !== i && n.splice(i, 1)
				}
			}
		},
		dispatchEvent: function (e) {
			if (void 0 !== this._listeners) {
				var t = this._listeners[e.type];
				if (void 0 !== t) {
					e.target = this;
					for (var n = t.slice(0), i = 0, r = n.length; i < r; i++) n[i].call(this, e)
				}
			}
		}
	});
	for (var r = [], a = 0; a < 256; a++) r[a] = (a < 16 ? "0" : "") + a.toString(16);
	var o, s = {
		DEG2RAD: Math.PI / 180,
		RAD2DEG: 180 / Math.PI,
		generateUUID: function () {
			var e = 4294967295 * Math.random() | 0,
				t = 4294967295 * Math.random() | 0,
				n = 4294967295 * Math.random() | 0,
				i = 4294967295 * Math.random() | 0;
			return (r[255 & e] + r[e >> 8 & 255] + r[e >> 16 & 255] + r[e >> 24 & 255] + "-" + r[255 & t] + r[t >> 8 & 255] + "-" + r[t >> 16 & 15 | 64] + r[t >> 24 & 255] + "-" + r[63 & n | 128] + r[n >> 8 & 255] + "-" + r[n >> 16 & 255] + r[n >> 24 & 255] + r[255 & i] + r[i >> 8 & 255] + r[i >> 16 & 255] + r[i >> 24 & 255]).toUpperCase()
		},
		clamp: function (e, t, n) {
			return Math.max(t, Math.min(n, e))
		},
		euclideanModulo: function (e, t) {
			return (e % t + t) % t
		},
		mapLinear: function (e, t, n, i, r) {
			return i + (e - t) * (r - i) / (n - t)
		},
		lerp: function (e, t, n) {
			return (1 - n) * e + n * t
		},
		smoothstep: function (e, t, n) {
			return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t)) * e * (3 - 2 * e)
		},
		smootherstep: function (e, t, n) {
			return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t)) * e * e * (e * (6 * e - 15) + 10)
		},
		randInt: function (e, t) {
			return e + Math.floor(Math.random() * (t - e + 1))
		},
		randFloat: function (e, t) {
			return e + Math.random() * (t - e)
		},
		randFloatSpread: function (e) {
			return e * (.5 - Math.random())
		},
		degToRad: function (e) {
			return e * s.DEG2RAD
		},
		radToDeg: function (e) {
			return e * s.RAD2DEG
		},
		isPowerOfTwo: function (e) {
			return 0 == (e & e - 1) && 0 !== e
		},
		ceilPowerOfTwo: function (e) {
			return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2))
		},
		floorPowerOfTwo: function (e) {
			return Math.pow(2, Math.floor(Math.log(e) / Math.LN2))
		},
		setQuaternionFromProperEuler: function (e, t, n, i, r) {
			var a = Math.cos,
				o = Math.sin,
				s = a(n / 2),
				c = o(n / 2),
				l = a((t + i) / 2),
				h = o((t + i) / 2),
				u = a((t - i) / 2),
				p = o((t - i) / 2),
				d = a((i - t) / 2),
				f = o((i - t) / 2);
			"XYX" === r ? e.set(s * h, c * u, c * p, s * l) : "YZY" === r ? e.set(c * p, s * h, c * u, s * l) : "ZXZ" === r ? e.set(c * u, c * p, s * h, s * l) : "XZX" === r ? e.set(s * h, c * f, c * d, s * l) : "YXY" === r ? e.set(c * d, s * h, c * f, s * l) : "ZYZ" === r ? e.set(c * f, c * d, s * h, s * l) : console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order.")
		}
	};

	function c(e, t) {
		this.x = e || 0, this.y = t || 0
	}

	function l() {
		this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
	}
	Object.defineProperties(c.prototype, {
		width: {
			get: function () {
				return this.x
			},
			set: function (e) {
				this.x = e
			}
		},
		height: {
			get: function () {
				return this.y
			},
			set: function (e) {
				this.y = e
			}
		}
	}), Object.assign(c.prototype, {
		isVector2: !0,
		set: function (e, t) {
			return this.x = e, this.y = t, this
		},
		setScalar: function (e) {
			return this.x = e, this.y = e, this
		},
		setX: function (e) {
			return this.x = e, this
		},
		setY: function (e) {
			return this.y = e, this
		},
		setComponent: function (e, t) {
			switch (e) {
				case 0:
					this.x = t;
					break;
				case 1:
					this.y = t;
					break;
				default:
					throw new Error("index is out of range: " + e)
			}
			return this
		},
		getComponent: function (e) {
			switch (e) {
				case 0:
					return this.x;
				case 1:
					return this.y;
				default:
					throw new Error("index is out of range: " + e)
			}
		},
		clone: function () {
			return new this.constructor(this.x, this.y)
		},
		copy: function (e) {
			return this.x = e.x, this.y = e.y, this
		},
		add: function (e, t) {
			return void 0 !== t ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this)
		},
		addScalar: function (e) {
			return this.x += e, this.y += e, this
		},
		addVectors: function (e, t) {
			return this.x = e.x + t.x, this.y = e.y + t.y, this
		},
		addScaledVector: function (e, t) {
			return this.x += e.x * t, this.y += e.y * t, this
		},
		sub: function (e, t) {
			return void 0 !== t ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this)
		},
		subScalar: function (e) {
			return this.x -= e, this.y -= e, this
		},
		subVectors: function (e, t) {
			return this.x = e.x - t.x, this.y = e.y - t.y, this
		},
		multiply: function (e) {
			return this.x *= e.x, this.y *= e.y, this
		},
		multiplyScalar: function (e) {
			return this.x *= e, this.y *= e, this
		},
		divide: function (e) {
			return this.x /= e.x, this.y /= e.y, this
		},
		divideScalar: function (e) {
			return this.multiplyScalar(1 / e)
		},
		applyMatrix3: function (e) {
			var t = this.x,
				n = this.y,
				i = e.elements;
			return this.x = i[0] * t + i[3] * n + i[6], this.y = i[1] * t + i[4] * n + i[7], this
		},
		min: function (e) {
			return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this
		},
		max: function (e) {
			return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this
		},
		clamp: function (e, t) {
			return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this
		},
		clampScalar: function (e, t) {
			return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this
		},
		clampLength: function (e, t) {
			var n = this.length();
			return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)))
		},
		floor: function () {
			return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
		},
		ceil: function () {
			return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
		},
		round: function () {
			return this.x = Math.round(this.x), this.y = Math.round(this.y), this
		},
		roundToZero: function () {
			return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
		},
		negate: function () {
			return this.x = -this.x, this.y = -this.y, this
		},
		dot: function (e) {
			return this.x * e.x + this.y * e.y
		},
		cross: function (e) {
			return this.x * e.y - this.y * e.x
		},
		lengthSq: function () {
			return this.x * this.x + this.y * this.y
		},
		length: function () {
			return Math.sqrt(this.x * this.x + this.y * this.y)
		},
		manhattanLength: function () {
			return Math.abs(this.x) + Math.abs(this.y)
		},
		normalize: function () {
			return this.divideScalar(this.length() || 1)
		},
		angle: function () {
			return Math.atan2(-this.y, -this.x) + Math.PI
		},
		distanceTo: function (e) {
			return Math.sqrt(this.distanceToSquared(e))
		},
		distanceToSquared: function (e) {
			var t = this.x - e.x,
				n = this.y - e.y;
			return t * t + n * n
		},
		manhattanDistanceTo: function (e) {
			return Math.abs(this.x - e.x) + Math.abs(this.y - e.y)
		},
		setLength: function (e) {
			return this.normalize().multiplyScalar(e)
		},
		lerp: function (e, t) {
			return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this
		},
		lerpVectors: function (e, t, n) {
			return this.subVectors(t, e).multiplyScalar(n).add(e)
		},
		equals: function (e) {
			return e.x === this.x && e.y === this.y
		},
		fromArray: function (e, t) {
			return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this
		},
		toArray: function (e, t) {
			return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e
		},
		fromBufferAttribute: function (e, t, n) {
			return void 0 !== n && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this
		},
		rotateAround: function (e, t) {
			var n = Math.cos(t),
				i = Math.sin(t),
				r = this.x - e.x,
				a = this.y - e.y;
			return this.x = r * n - a * i + e.x, this.y = r * i + a * n + e.y, this
		}
	}), Object.assign(l.prototype, {
		isMatrix3: !0,
		set: function (e, t, n, i, r, a, o, s, c) {
			var l = this.elements;
			return l[0] = e, l[1] = i, l[2] = o, l[3] = t, l[4] = r, l[5] = s, l[6] = n, l[7] = a, l[8] = c, this
		},
		identity: function () {
			return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
		},
		clone: function () {
			return (new this.constructor).fromArray(this.elements)
		},
		copy: function (e) {
			var t = this.elements,
				n = e.elements;
			return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this
		},
		extractBasis: function (e, t, n) {
			return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this
		},
		setFromMatrix4: function (e) {
			var t = e.elements;
			return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this
		},
		multiply: function (e) {
			return this.multiplyMatrices(this, e)
		},
		premultiply: function (e) {
			return this.multiplyMatrices(e, this)
		},
		multiplyMatrices: function (e, t) {
			var n = e.elements,
				i = t.elements,
				r = this.elements,
				a = n[0],
				o = n[3],
				s = n[6],
				c = n[1],
				l = n[4],
				h = n[7],
				u = n[2],
				p = n[5],
				d = n[8],
				f = i[0],
				m = i[3],
				v = i[6],
				g = i[1],
				y = i[4],
				x = i[7],
				b = i[2],
				w = i[5],
				_ = i[8];
			return r[0] = a * f + o * g + s * b, r[3] = a * m + o * y + s * w, r[6] = a * v + o * x + s * _, r[1] = c * f + l * g + h * b, r[4] = c * m + l * y + h * w, r[7] = c * v + l * x + h * _, r[2] = u * f + p * g + d * b, r[5] = u * m + p * y + d * w, r[8] = u * v + p * x + d * _, this
		},
		multiplyScalar: function (e) {
			var t = this.elements;
			return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this
		},
		determinant: function () {
			var e = this.elements,
				t = e[0],
				n = e[1],
				i = e[2],
				r = e[3],
				a = e[4],
				o = e[5],
				s = e[6],
				c = e[7],
				l = e[8];
			return t * a * l - t * o * c - n * r * l + n * o * s + i * r * c - i * a * s
		},
		getInverse: function (e, t) {
			void 0 !== t && console.warn("THREE.Matrix3: .getInverse() can no longer be configured to throw on degenerate.");
			var n = e.elements,
				i = this.elements,
				r = n[0],
				a = n[1],
				o = n[2],
				s = n[3],
				c = n[4],
				l = n[5],
				h = n[6],
				u = n[7],
				p = n[8],
				d = p * c - l * u,
				f = l * h - p * s,
				m = u * s - c * h,
				v = r * d + a * f + o * m;
			if (0 === v) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
			var g = 1 / v;
			return i[0] = d * g, i[1] = (o * u - p * a) * g, i[2] = (l * a - o * c) * g, i[3] = f * g, i[4] = (p * r - o * h) * g, i[5] = (o * s - l * r) * g, i[6] = m * g, i[7] = (a * h - u * r) * g, i[8] = (c * r - a * s) * g, this
		},
		transpose: function () {
			var e, t = this.elements;
			return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this
		},
		getNormalMatrix: function (e) {
			return this.setFromMatrix4(e).getInverse(this).transpose()
		},
		transposeIntoArray: function (e) {
			var t = this.elements;
			return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
		},
		setUvTransform: function (e, t, n, i, r, a, o) {
			var s = Math.cos(r),
				c = Math.sin(r);
			this.set(n * s, n * c, -n * (s * a + c * o) + a + e, -i * c, i * s, -i * (-c * a + s * o) + o + t, 0, 0, 1)
		},
		scale: function (e, t) {
			var n = this.elements;
			return n[0] *= e, n[3] *= e, n[6] *= e, n[1] *= t, n[4] *= t, n[7] *= t, this
		},
		rotate: function (e) {
			var t = Math.cos(e),
				n = Math.sin(e),
				i = this.elements,
				r = i[0],
				a = i[3],
				o = i[6],
				s = i[1],
				c = i[4],
				l = i[7];
			return i[0] = t * r + n * s, i[3] = t * a + n * c, i[6] = t * o + n * l, i[1] = -n * r + t * s, i[4] = -n * a + t * c, i[7] = -n * o + t * l, this
		},
		translate: function (e, t) {
			var n = this.elements;
			return n[0] += e * n[2], n[3] += e * n[5], n[6] += e * n[8], n[1] += t * n[2], n[4] += t * n[5], n[7] += t * n[8], this
		},
		equals: function (e) {
			for (var t = this.elements, n = e.elements, i = 0; i < 9; i++)
				if (t[i] !== n[i]) return !1;
			return !0
		},
		fromArray: function (e, t) {
			void 0 === t && (t = 0);
			for (var n = 0; n < 9; n++) this.elements[n] = e[n + t];
			return this
		},
		toArray: function (e, t) {
			void 0 === e && (e = []), void 0 === t && (t = 0);
			var n = this.elements;
			return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e
		}
	});
	var h = {
			getDataURL: function (e) {
				var t;
				if ("undefined" == typeof HTMLCanvasElement) return e.src;
				if (e instanceof HTMLCanvasElement) t = e;
				else {
					void 0 === o && (o = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")), o.width = e.width, o.height = e.height;
					var n = o.getContext("2d");
					e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = o
				}
				return t.width > 2048 || t.height > 2048 ? t.toDataURL("image/jpeg", .6) : t.toDataURL("image/png")
			}
		},
		u = 0;

	function p(e, t, n, i, r, a, o, h, d, f) {
		Object.defineProperty(this, "id", {
			value: u++
		}), this.uuid = s.generateUUID(), this.name = "", this.image = void 0 !== e ? e : p.DEFAULT_IMAGE, this.mipmaps = [], this.mapping = void 0 !== t ? t : p.DEFAULT_MAPPING, this.wrapS = void 0 !== n ? n : 1001, this.wrapT = void 0 !== i ? i : 1001, this.magFilter = void 0 !== r ? r : 1006, this.minFilter = void 0 !== a ? a : 1008, this.anisotropy = void 0 !== d ? d : 1, this.format = void 0 !== o ? o : 1023, this.internalFormat = null, this.type = void 0 !== h ? h : 1009, this.offset = new c(0, 0), this.repeat = new c(1, 1), this.center = new c(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new l, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = void 0 !== f ? f : 3e3, this.version = 0, this.onUpdate = null
	}

	function d(e, t, n, i) {
		this.x = e || 0, this.y = t || 0, this.z = n || 0, this.w = void 0 !== i ? i : 1
	}

	function f(e, t, n) {
		this.width = e, this.height = t, this.scissor = new d(0, 0, e, t), this.scissorTest = !1, this.viewport = new d(0, 0, e, t), n = n || {}, this.texture = new p(void 0, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.encoding), this.texture.image = {}, this.texture.image.width = e, this.texture.image.height = t, this.texture.generateMipmaps = void 0 !== n.generateMipmaps && n.generateMipmaps, this.texture.minFilter = void 0 !== n.minFilter ? n.minFilter : 1006, this.depthBuffer = void 0 === n.depthBuffer || n.depthBuffer, this.stencilBuffer = void 0 === n.stencilBuffer || n.stencilBuffer, this.depthTexture = void 0 !== n.depthTexture ? n.depthTexture : null
	}

	function m(e, t, n) {
		f.call(this, e, t, n), this.samples = 4
	}

	function v(e, t, n, i) {
		this._x = e || 0, this._y = t || 0, this._z = n || 0, this._w = void 0 !== i ? i : 1
	}
	p.DEFAULT_IMAGE = void 0, p.DEFAULT_MAPPING = 300, p.prototype = Object.assign(Object.create(i.prototype), {
		constructor: p,
		isTexture: !0,
		updateMatrix: function () {
			this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.name = e.name, this.image = e.image, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.encoding = e.encoding, this
		},
		toJSON: function (e) {
			var t = void 0 === e || "string" == typeof e;
			if (!t && void 0 !== e.textures[this.uuid]) return e.textures[this.uuid];
			var n = {
				metadata: {
					version: 4.5,
					type: "Texture",
					generator: "Texture.toJSON"
				},
				uuid: this.uuid,
				name: this.name,
				mapping: this.mapping,
				repeat: [this.repeat.x, this.repeat.y],
				offset: [this.offset.x, this.offset.y],
				center: [this.center.x, this.center.y],
				rotation: this.rotation,
				wrap: [this.wrapS, this.wrapT],
				format: this.format,
				type: this.type,
				encoding: this.encoding,
				minFilter: this.minFilter,
				magFilter: this.magFilter,
				anisotropy: this.anisotropy,
				flipY: this.flipY,
				premultiplyAlpha: this.premultiplyAlpha,
				unpackAlignment: this.unpackAlignment
			};
			if (void 0 !== this.image) {
				var i = this.image;
				if (void 0 === i.uuid && (i.uuid = s.generateUUID()), !t && void 0 === e.images[i.uuid]) {
					var r;
					if (Array.isArray(i)) {
						r = [];
						for (var a = 0, o = i.length; a < o; a++) r.push(h.getDataURL(i[a]))
					} else r = h.getDataURL(i);
					e.images[i.uuid] = {
						uuid: i.uuid,
						url: r
					}
				}
				n.image = i.uuid
			}
			return t || (e.textures[this.uuid] = n), n
		},
		dispose: function () {
			this.dispatchEvent({
				type: "dispose"
			})
		},
		transformUv: function (e) {
			if (300 !== this.mapping) return e;
			if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
				case 1e3:
					e.x = e.x - Math.floor(e.x);
					break;
				case 1001:
					e.x = e.x < 0 ? 0 : 1;
					break;
				case 1002:
					1 === Math.abs(Math.floor(e.x) % 2) ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x)
			}
			if (e.y < 0 || e.y > 1) switch (this.wrapT) {
				case 1e3:
					e.y = e.y - Math.floor(e.y);
					break;
				case 1001:
					e.y = e.y < 0 ? 0 : 1;
					break;
				case 1002:
					1 === Math.abs(Math.floor(e.y) % 2) ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y)
			}
			return this.flipY && (e.y = 1 - e.y), e
		}
	}), Object.defineProperty(p.prototype, "needsUpdate", {
		set: function (e) {
			!0 === e && this.version++
		}
	}), Object.defineProperties(d.prototype, {
		width: {
			get: function () {
				return this.z
			},
			set: function (e) {
				this.z = e
			}
		},
		height: {
			get: function () {
				return this.w
			},
			set: function (e) {
				this.w = e
			}
		}
	}), Object.assign(d.prototype, {
		isVector4: !0,
		set: function (e, t, n, i) {
			return this.x = e, this.y = t, this.z = n, this.w = i, this
		},
		setScalar: function (e) {
			return this.x = e, this.y = e, this.z = e, this.w = e, this
		},
		setX: function (e) {
			return this.x = e, this
		},
		setY: function (e) {
			return this.y = e, this
		},
		setZ: function (e) {
			return this.z = e, this
		},
		setW: function (e) {
			return this.w = e, this
		},
		setComponent: function (e, t) {
			switch (e) {
				case 0:
					this.x = t;
					break;
				case 1:
					this.y = t;
					break;
				case 2:
					this.z = t;
					break;
				case 3:
					this.w = t;
					break;
				default:
					throw new Error("index is out of range: " + e)
			}
			return this
		},
		getComponent: function (e) {
			switch (e) {
				case 0:
					return this.x;
				case 1:
					return this.y;
				case 2:
					return this.z;
				case 3:
					return this.w;
				default:
					throw new Error("index is out of range: " + e)
			}
		},
		clone: function () {
			return new this.constructor(this.x, this.y, this.z, this.w)
		},
		copy: function (e) {
			return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 !== e.w ? e.w : 1, this
		},
		add: function (e, t) {
			return void 0 !== t ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this)
		},
		addScalar: function (e) {
			return this.x += e, this.y += e, this.z += e, this.w += e, this
		},
		addVectors: function (e, t) {
			return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this
		},
		addScaledVector: function (e, t) {
			return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this
		},
		sub: function (e, t) {
			return void 0 !== t ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this)
		},
		subScalar: function (e) {
			return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this
		},
		subVectors: function (e, t) {
			return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this
		},
		multiplyScalar: function (e) {
			return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this
		},
		applyMatrix4: function (e) {
			var t = this.x,
				n = this.y,
				i = this.z,
				r = this.w,
				a = e.elements;
			return this.x = a[0] * t + a[4] * n + a[8] * i + a[12] * r, this.y = a[1] * t + a[5] * n + a[9] * i + a[13] * r, this.z = a[2] * t + a[6] * n + a[10] * i + a[14] * r, this.w = a[3] * t + a[7] * n + a[11] * i + a[15] * r, this
		},
		divideScalar: function (e) {
			return this.multiplyScalar(1 / e)
		},
		setAxisAngleFromQuaternion: function (e) {
			this.w = 2 * Math.acos(e.w);
			var t = Math.sqrt(1 - e.w * e.w);
			return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this
		},
		setAxisAngleFromRotationMatrix: function (e) {
			var t, n, i, r, a = e.elements,
				o = a[0],
				s = a[4],
				c = a[8],
				l = a[1],
				h = a[5],
				u = a[9],
				p = a[2],
				d = a[6],
				f = a[10];
			if (Math.abs(s - l) < .01 && Math.abs(c - p) < .01 && Math.abs(u - d) < .01) {
				if (Math.abs(s + l) < .1 && Math.abs(c + p) < .1 && Math.abs(u + d) < .1 && Math.abs(o + h + f - 3) < .1) return this.set(1, 0, 0, 0), this;
				t = Math.PI;
				var m = (o + 1) / 2,
					v = (h + 1) / 2,
					g = (f + 1) / 2,
					y = (s + l) / 4,
					x = (c + p) / 4,
					b = (u + d) / 4;
				return m > v && m > g ? m < .01 ? (n = 0, i = .707106781, r = .707106781) : (i = y / (n = Math.sqrt(m)), r = x / n) : v > g ? v < .01 ? (n = .707106781, i = 0, r = .707106781) : (n = y / (i = Math.sqrt(v)), r = b / i) : g < .01 ? (n = .707106781, i = .707106781, r = 0) : (n = x / (r = Math.sqrt(g)), i = b / r), this.set(n, i, r, t), this
			}
			var w = Math.sqrt((d - u) * (d - u) + (c - p) * (c - p) + (l - s) * (l - s));
			return Math.abs(w) < .001 && (w = 1), this.x = (d - u) / w, this.y = (c - p) / w, this.z = (l - s) / w, this.w = Math.acos((o + h + f - 1) / 2), this
		},
		min: function (e) {
			return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this
		},
		max: function (e) {
			return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this
		},
		clamp: function (e, t) {
			return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this
		},
		clampScalar: function (e, t) {
			return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this
		},
		clampLength: function (e, t) {
			var n = this.length();
			return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)))
		},
		floor: function () {
			return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
		},
		ceil: function () {
			return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
		},
		round: function () {
			return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
		},
		roundToZero: function () {
			return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this
		},
		negate: function () {
			return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
		},
		dot: function (e) {
			return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
		},
		lengthSq: function () {
			return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
		},
		length: function () {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
		},
		manhattanLength: function () {
			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
		},
		normalize: function () {
			return this.divideScalar(this.length() || 1)
		},
		setLength: function (e) {
			return this.normalize().multiplyScalar(e)
		},
		lerp: function (e, t) {
			return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this
		},
		lerpVectors: function (e, t, n) {
			return this.subVectors(t, e).multiplyScalar(n).add(e)
		},
		equals: function (e) {
			return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
		},
		fromArray: function (e, t) {
			return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this
		},
		toArray: function (e, t) {
			return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e
		},
		fromBufferAttribute: function (e, t, n) {
			return void 0 !== n && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this
		}
	}), f.prototype = Object.assign(Object.create(i.prototype), {
		constructor: f,
		isWebGLRenderTarget: !0,
		setSize: function (e, t) {
			this.width === e && this.height === t || (this.width = e, this.height = t, this.texture.image.width = e, this.texture.image.height = t, this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t)
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.width = e.width, this.height = e.height, this.viewport.copy(e.viewport), this.texture = e.texture.clone(), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.depthTexture = e.depthTexture, this
		},
		dispose: function () {
			this.dispatchEvent({
				type: "dispose"
			})
		}
	}), m.prototype = Object.assign(Object.create(f.prototype), {
		constructor: m,
		isWebGLMultisampleRenderTarget: !0,
		copy: function (e) {
			return f.prototype.copy.call(this, e), this.samples = e.samples, this
		}
	}), Object.assign(v, {
		slerp: function (e, t, n, i) {
			return n.copy(e).slerp(t, i)
		},
		slerpFlat: function (e, t, n, i, r, a, o) {
			var s = n[i + 0],
				c = n[i + 1],
				l = n[i + 2],
				h = n[i + 3],
				u = r[a + 0],
				p = r[a + 1],
				d = r[a + 2],
				f = r[a + 3];
			if (h !== f || s !== u || c !== p || l !== d) {
				var m = 1 - o,
					v = s * u + c * p + l * d + h * f,
					g = v >= 0 ? 1 : -1,
					y = 1 - v * v;
				if (y > Number.EPSILON) {
					var x = Math.sqrt(y),
						b = Math.atan2(x, v * g);
					m = Math.sin(m * b) / x, o = Math.sin(o * b) / x
				}
				var w = o * g;
				if (s = s * m + u * w, c = c * m + p * w, l = l * m + d * w, h = h * m + f * w, m === 1 - o) {
					var _ = 1 / Math.sqrt(s * s + c * c + l * l + h * h);
					s *= _, c *= _, l *= _, h *= _
				}
			}
			e[t] = s, e[t + 1] = c, e[t + 2] = l, e[t + 3] = h
		}
	}), Object.defineProperties(v.prototype, {
		x: {
			get: function () {
				return this._x
			},
			set: function (e) {
				this._x = e, this._onChangeCallback()
			}
		},
		y: {
			get: function () {
				return this._y
			},
			set: function (e) {
				this._y = e, this._onChangeCallback()
			}
		},
		z: {
			get: function () {
				return this._z
			},
			set: function (e) {
				this._z = e, this._onChangeCallback()
			}
		},
		w: {
			get: function () {
				return this._w
			},
			set: function (e) {
				this._w = e, this._onChangeCallback()
			}
		}
	}), Object.assign(v.prototype, {
		isQuaternion: !0,
		set: function (e, t, n, i) {
			return this._x = e, this._y = t, this._z = n, this._w = i, this._onChangeCallback(), this
		},
		clone: function () {
			return new this.constructor(this._x, this._y, this._z, this._w)
		},
		copy: function (e) {
			return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this
		},
		setFromEuler: function (e, t) {
			if (!e || !e.isEuler) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
			var n = e._x,
				i = e._y,
				r = e._z,
				a = e.order,
				o = Math.cos,
				s = Math.sin,
				c = o(n / 2),
				l = o(i / 2),
				h = o(r / 2),
				u = s(n / 2),
				p = s(i / 2),
				d = s(r / 2);
			return "XYZ" === a ? (this._x = u * l * h + c * p * d, this._y = c * p * h - u * l * d, this._z = c * l * d + u * p * h, this._w = c * l * h - u * p * d) : "YXZ" === a ? (this._x = u * l * h + c * p * d, this._y = c * p * h - u * l * d, this._z = c * l * d - u * p * h, this._w = c * l * h + u * p * d) : "ZXY" === a ? (this._x = u * l * h - c * p * d, this._y = c * p * h + u * l * d, this._z = c * l * d + u * p * h, this._w = c * l * h - u * p * d) : "ZYX" === a ? (this._x = u * l * h - c * p * d, this._y = c * p * h + u * l * d, this._z = c * l * d - u * p * h, this._w = c * l * h + u * p * d) : "YZX" === a ? (this._x = u * l * h + c * p * d, this._y = c * p * h + u * l * d, this._z = c * l * d - u * p * h, this._w = c * l * h - u * p * d) : "XZY" === a && (this._x = u * l * h - c * p * d, this._y = c * p * h - u * l * d, this._z = c * l * d + u * p * h, this._w = c * l * h + u * p * d), !1 !== t && this._onChangeCallback(), this
		},
		setFromAxisAngle: function (e, t) {
			var n = t / 2,
				i = Math.sin(n);
			return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(n), this._onChangeCallback(), this
		},
		setFromRotationMatrix: function (e) {
			var t, n = e.elements,
				i = n[0],
				r = n[4],
				a = n[8],
				o = n[1],
				s = n[5],
				c = n[9],
				l = n[2],
				h = n[6],
				u = n[10],
				p = i + s + u;
			return p > 0 ? (t = .5 / Math.sqrt(p + 1), this._w = .25 / t, this._x = (h - c) * t, this._y = (a - l) * t, this._z = (o - r) * t) : i > s && i > u ? (t = 2 * Math.sqrt(1 + i - s - u), this._w = (h - c) / t, this._x = .25 * t, this._y = (r + o) / t, this._z = (a + l) / t) : s > u ? (t = 2 * Math.sqrt(1 + s - i - u), this._w = (a - l) / t, this._x = (r + o) / t, this._y = .25 * t, this._z = (c + h) / t) : (t = 2 * Math.sqrt(1 + u - i - s), this._w = (o - r) / t, this._x = (a + l) / t, this._y = (c + h) / t, this._z = .25 * t), this._onChangeCallback(), this
		},
		setFromUnitVectors: function (e, t) {
			var n = e.dot(t) + 1;
			return n < 1e-6 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize()
		},
		angleTo: function (e) {
			return 2 * Math.acos(Math.abs(s.clamp(this.dot(e), -1, 1)))
		},
		rotateTowards: function (e, t) {
			var n = this.angleTo(e);
			if (0 === n) return this;
			var i = Math.min(1, t / n);
			return this.slerp(e, i), this
		},
		inverse: function () {
			return this.conjugate()
		},
		conjugate: function () {
			return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this
		},
		dot: function (e) {
			return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
		},
		lengthSq: function () {
			return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
		},
		length: function () {
			return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
		},
		normalize: function () {
			var e = this.length();
			return 0 === e ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this
		},
		multiply: function (e, t) {
			return void 0 !== t ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t)) : this.multiplyQuaternions(this, e)
		},
		premultiply: function (e) {
			return this.multiplyQuaternions(e, this)
		},
		multiplyQuaternions: function (e, t) {
			var n = e._x,
				i = e._y,
				r = e._z,
				a = e._w,
				o = t._x,
				s = t._y,
				c = t._z,
				l = t._w;
			return this._x = n * l + a * o + i * c - r * s, this._y = i * l + a * s + r * o - n * c, this._z = r * l + a * c + n * s - i * o, this._w = a * l - n * o - i * s - r * c, this._onChangeCallback(), this
		},
		slerp: function (e, t) {
			if (0 === t) return this;
			if (1 === t) return this.copy(e);
			var n = this._x,
				i = this._y,
				r = this._z,
				a = this._w,
				o = a * e._w + n * e._x + i * e._y + r * e._z;
			if (o < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, o = -o) : this.copy(e), o >= 1) return this._w = a, this._x = n, this._y = i, this._z = r, this;
			var s = 1 - o * o;
			if (s <= Number.EPSILON) {
				var c = 1 - t;
				return this._w = c * a + t * this._w, this._x = c * n + t * this._x, this._y = c * i + t * this._y, this._z = c * r + t * this._z, this.normalize(), this._onChangeCallback(), this
			}
			var l = Math.sqrt(s),
				h = Math.atan2(l, o),
				u = Math.sin((1 - t) * h) / l,
				p = Math.sin(t * h) / l;
			return this._w = a * u + this._w * p, this._x = n * u + this._x * p, this._y = i * u + this._y * p, this._z = r * u + this._z * p, this._onChangeCallback(), this
		},
		equals: function (e) {
			return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
		},
		fromArray: function (e, t) {
			return void 0 === t && (t = 0), this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this
		},
		toArray: function (e, t) {
			return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e
		},
		fromBufferAttribute: function (e, t) {
			return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this
		},
		_onChange: function (e) {
			return this._onChangeCallback = e, this
		},
		_onChangeCallback: function () {}
	});
	var g = new x,
		y = new v;

	function x(e, t, n) {
		this.x = e || 0, this.y = t || 0, this.z = n || 0
	}
	Object.assign(x.prototype, {
		isVector3: !0,
		set: function (e, t, n) {
			return this.x = e, this.y = t, this.z = n, this
		},
		setScalar: function (e) {
			return this.x = e, this.y = e, this.z = e, this
		},
		setX: function (e) {
			return this.x = e, this
		},
		setY: function (e) {
			return this.y = e, this
		},
		setZ: function (e) {
			return this.z = e, this
		},
		setComponent: function (e, t) {
			switch (e) {
				case 0:
					this.x = t;
					break;
				case 1:
					this.y = t;
					break;
				case 2:
					this.z = t;
					break;
				default:
					throw new Error("index is out of range: " + e)
			}
			return this
		},
		getComponent: function (e) {
			switch (e) {
				case 0:
					return this.x;
				case 1:
					return this.y;
				case 2:
					return this.z;
				default:
					throw new Error("index is out of range: " + e)
			}
		},
		clone: function () {
			return new this.constructor(this.x, this.y, this.z)
		},
		copy: function (e) {
			return this.x = e.x, this.y = e.y, this.z = e.z, this
		},
		add: function (e, t) {
			return void 0 !== t ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this)
		},
		addScalar: function (e) {
			return this.x += e, this.y += e, this.z += e, this
		},
		addVectors: function (e, t) {
			return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this
		},
		addScaledVector: function (e, t) {
			return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this
		},
		sub: function (e, t) {
			return void 0 !== t ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this)
		},
		subScalar: function (e) {
			return this.x -= e, this.y -= e, this.z -= e, this
		},
		subVectors: function (e, t) {
			return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this
		},
		multiply: function (e, t) {
			return void 0 !== t ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t)) : (this.x *= e.x, this.y *= e.y, this.z *= e.z, this)
		},
		multiplyScalar: function (e) {
			return this.x *= e, this.y *= e, this.z *= e, this
		},
		multiplyVectors: function (e, t) {
			return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this
		},
		applyEuler: function (e) {
			return e && e.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(y.setFromEuler(e))
		},
		applyAxisAngle: function (e, t) {
			return this.applyQuaternion(y.setFromAxisAngle(e, t))
		},
		applyMatrix3: function (e) {
			var t = this.x,
				n = this.y,
				i = this.z,
				r = e.elements;
			return this.x = r[0] * t + r[3] * n + r[6] * i, this.y = r[1] * t + r[4] * n + r[7] * i, this.z = r[2] * t + r[5] * n + r[8] * i, this
		},
		applyNormalMatrix: function (e) {
			return this.applyMatrix3(e).normalize()
		},
		applyMatrix4: function (e) {
			var t = this.x,
				n = this.y,
				i = this.z,
				r = e.elements,
				a = 1 / (r[3] * t + r[7] * n + r[11] * i + r[15]);
			return this.x = (r[0] * t + r[4] * n + r[8] * i + r[12]) * a, this.y = (r[1] * t + r[5] * n + r[9] * i + r[13]) * a, this.z = (r[2] * t + r[6] * n + r[10] * i + r[14]) * a, this
		},
		applyQuaternion: function (e) {
			var t = this.x,
				n = this.y,
				i = this.z,
				r = e.x,
				a = e.y,
				o = e.z,
				s = e.w,
				c = s * t + a * i - o * n,
				l = s * n + o * t - r * i,
				h = s * i + r * n - a * t,
				u = -r * t - a * n - o * i;
			return this.x = c * s + u * -r + l * -o - h * -a, this.y = l * s + u * -a + h * -r - c * -o, this.z = h * s + u * -o + c * -a - l * -r, this
		},
		project: function (e) {
			return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)
		},
		unproject: function (e) {
			return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)
		},
		transformDirection: function (e) {
			var t = this.x,
				n = this.y,
				i = this.z,
				r = e.elements;
			return this.x = r[0] * t + r[4] * n + r[8] * i, this.y = r[1] * t + r[5] * n + r[9] * i, this.z = r[2] * t + r[6] * n + r[10] * i, this.normalize()
		},
		divide: function (e) {
			return this.x /= e.x, this.y /= e.y, this.z /= e.z, this
		},
		divideScalar: function (e) {
			return this.multiplyScalar(1 / e)
		},
		min: function (e) {
			return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this
		},
		max: function (e) {
			return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this
		},
		clamp: function (e, t) {
			return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this
		},
		clampScalar: function (e, t) {
			return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this
		},
		clampLength: function (e, t) {
			var n = this.length();
			return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)))
		},
		floor: function () {
			return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
		},
		ceil: function () {
			return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
		},
		round: function () {
			return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
		},
		roundToZero: function () {
			return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
		},
		negate: function () {
			return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
		},
		dot: function (e) {
			return this.x * e.x + this.y * e.y + this.z * e.z
		},
		lengthSq: function () {
			return this.x * this.x + this.y * this.y + this.z * this.z
		},
		length: function () {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
		},
		manhattanLength: function () {
			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
		},
		normalize: function () {
			return this.divideScalar(this.length() || 1)
		},
		setLength: function (e) {
			return this.normalize().multiplyScalar(e)
		},
		lerp: function (e, t) {
			return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this
		},
		lerpVectors: function (e, t, n) {
			return this.subVectors(t, e).multiplyScalar(n).add(e)
		},
		cross: function (e, t) {
			return void 0 !== t ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t)) : this.crossVectors(this, e)
		},
		crossVectors: function (e, t) {
			var n = e.x,
				i = e.y,
				r = e.z,
				a = t.x,
				o = t.y,
				s = t.z;
			return this.x = i * s - r * o, this.y = r * a - n * s, this.z = n * o - i * a, this
		},
		projectOnVector: function (e) {
			var t = e.lengthSq();
			if (0 === t) return this.set(0, 0, 0);
			var n = e.dot(this) / t;
			return this.copy(e).multiplyScalar(n)
		},
		projectOnPlane: function (e) {
			return g.copy(this).projectOnVector(e), this.sub(g)
		},
		reflect: function (e) {
			return this.sub(g.copy(e).multiplyScalar(2 * this.dot(e)))
		},
		angleTo: function (e) {
			var t = Math.sqrt(this.lengthSq() * e.lengthSq());
			if (0 === t) return Math.PI / 2;
			var n = this.dot(e) / t;
			return Math.acos(s.clamp(n, -1, 1))
		},
		distanceTo: function (e) {
			return Math.sqrt(this.distanceToSquared(e))
		},
		distanceToSquared: function (e) {
			var t = this.x - e.x,
				n = this.y - e.y,
				i = this.z - e.z;
			return t * t + n * n + i * i
		},
		manhattanDistanceTo: function (e) {
			return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
		},
		setFromSpherical: function (e) {
			return this.setFromSphericalCoords(e.radius, e.phi, e.theta)
		},
		setFromSphericalCoords: function (e, t, n) {
			var i = Math.sin(t) * e;
			return this.x = i * Math.sin(n), this.y = Math.cos(t) * e, this.z = i * Math.cos(n), this
		},
		setFromCylindrical: function (e) {
			return this.setFromCylindricalCoords(e.radius, e.theta, e.y)
		},
		setFromCylindricalCoords: function (e, t, n) {
			return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this
		},
		setFromMatrixPosition: function (e) {
			var t = e.elements;
			return this.x = t[12], this.y = t[13], this.z = t[14], this
		},
		setFromMatrixScale: function (e) {
			var t = this.setFromMatrixColumn(e, 0).length(),
				n = this.setFromMatrixColumn(e, 1).length(),
				i = this.setFromMatrixColumn(e, 2).length();
			return this.x = t, this.y = n, this.z = i, this
		},
		setFromMatrixColumn: function (e, t) {
			return this.fromArray(e.elements, 4 * t)
		},
		setFromMatrix3Column: function (e, t) {
			return this.fromArray(e.elements, 3 * t)
		},
		equals: function (e) {
			return e.x === this.x && e.y === this.y && e.z === this.z
		},
		fromArray: function (e, t) {
			return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this
		},
		toArray: function (e, t) {
			return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e
		},
		fromBufferAttribute: function (e, t, n) {
			return void 0 !== n && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this
		}
	});
	var b = new x,
		w = new A,
		_ = new x(0, 0, 0),
		M = new x(1, 1, 1),
		S = new x,
		T = new x,
		E = new x;

	function A() {
		this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
	}
	Object.assign(A.prototype, {
		isMatrix4: !0,
		set: function (e, t, n, i, r, a, o, s, c, l, h, u, p, d, f, m) {
			var v = this.elements;
			return v[0] = e, v[4] = t, v[8] = n, v[12] = i, v[1] = r, v[5] = a, v[9] = o, v[13] = s, v[2] = c, v[6] = l, v[10] = h, v[14] = u, v[3] = p, v[7] = d, v[11] = f, v[15] = m, this
		},
		identity: function () {
			return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		},
		clone: function () {
			return (new A).fromArray(this.elements)
		},
		copy: function (e) {
			var t = this.elements,
				n = e.elements;
			return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this
		},
		copyPosition: function (e) {
			var t = this.elements,
				n = e.elements;
			return t[12] = n[12], t[13] = n[13], t[14] = n[14], this
		},
		extractBasis: function (e, t, n) {
			return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this
		},
		makeBasis: function (e, t, n) {
			return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this
		},
		extractRotation: function (e) {
			var t = this.elements,
				n = e.elements,
				i = 1 / b.setFromMatrixColumn(e, 0).length(),
				r = 1 / b.setFromMatrixColumn(e, 1).length(),
				a = 1 / b.setFromMatrixColumn(e, 2).length();
			return t[0] = n[0] * i, t[1] = n[1] * i, t[2] = n[2] * i, t[3] = 0, t[4] = n[4] * r, t[5] = n[5] * r, t[6] = n[6] * r, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
		},
		makeRotationFromEuler: function (e) {
			e && e.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
			var t = this.elements,
				n = e.x,
				i = e.y,
				r = e.z,
				a = Math.cos(n),
				o = Math.sin(n),
				s = Math.cos(i),
				c = Math.sin(i),
				l = Math.cos(r),
				h = Math.sin(r);
			if ("XYZ" === e.order) {
				var u = a * l,
					p = a * h,
					d = o * l,
					f = o * h;
				t[0] = s * l, t[4] = -s * h, t[8] = c, t[1] = p + d * c, t[5] = u - f * c, t[9] = -o * s, t[2] = f - u * c, t[6] = d + p * c, t[10] = a * s
			} else if ("YXZ" === e.order) {
				var m = s * l,
					v = s * h,
					g = c * l,
					y = c * h;
				t[0] = m + y * o, t[4] = g * o - v, t[8] = a * c, t[1] = a * h, t[5] = a * l, t[9] = -o, t[2] = v * o - g, t[6] = y + m * o, t[10] = a * s
			} else if ("ZXY" === e.order) {
				m = s * l, v = s * h, g = c * l, y = c * h;
				t[0] = m - y * o, t[4] = -a * h, t[8] = g + v * o, t[1] = v + g * o, t[5] = a * l, t[9] = y - m * o, t[2] = -a * c, t[6] = o, t[10] = a * s
			} else if ("ZYX" === e.order) {
				u = a * l, p = a * h, d = o * l, f = o * h;
				t[0] = s * l, t[4] = d * c - p, t[8] = u * c + f, t[1] = s * h, t[5] = f * c + u, t[9] = p * c - d, t[2] = -c, t[6] = o * s, t[10] = a * s
			} else if ("YZX" === e.order) {
				var x = a * s,
					b = a * c,
					w = o * s,
					_ = o * c;
				t[0] = s * l, t[4] = _ - x * h, t[8] = w * h + b, t[1] = h, t[5] = a * l, t[9] = -o * l, t[2] = -c * l, t[6] = b * h + w, t[10] = x - _ * h
			} else if ("XZY" === e.order) {
				x = a * s, b = a * c, w = o * s, _ = o * c;
				t[0] = s * l, t[4] = -h, t[8] = c * l, t[1] = x * h + _, t[5] = a * l, t[9] = b * h - w, t[2] = w * h - b, t[6] = o * l, t[10] = _ * h + x
			}
			return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
		},
		makeRotationFromQuaternion: function (e) {
			return this.compose(_, e, M)
		},
		lookAt: function (e, t, n) {
			var i = this.elements;
			return E.subVectors(e, t), 0 === E.lengthSq() && (E.z = 1), E.normalize(), S.crossVectors(n, E), 0 === S.lengthSq() && (1 === Math.abs(n.z) ? E.x += 1e-4 : E.z += 1e-4, E.normalize(), S.crossVectors(n, E)), S.normalize(), T.crossVectors(E, S), i[0] = S.x, i[4] = T.x, i[8] = E.x, i[1] = S.y, i[5] = T.y, i[9] = E.y, i[2] = S.z, i[6] = T.z, i[10] = E.z, this
		},
		multiply: function (e, t) {
			return void 0 !== t ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(e, t)) : this.multiplyMatrices(this, e)
		},
		premultiply: function (e) {
			return this.multiplyMatrices(e, this)
		},
		multiplyMatrices: function (e, t) {
			var n = e.elements,
				i = t.elements,
				r = this.elements,
				a = n[0],
				o = n[4],
				s = n[8],
				c = n[12],
				l = n[1],
				h = n[5],
				u = n[9],
				p = n[13],
				d = n[2],
				f = n[6],
				m = n[10],
				v = n[14],
				g = n[3],
				y = n[7],
				x = n[11],
				b = n[15],
				w = i[0],
				_ = i[4],
				M = i[8],
				S = i[12],
				T = i[1],
				E = i[5],
				A = i[9],
				L = i[13],
				R = i[2],
				P = i[6],
				C = i[10],
				O = i[14],
				D = i[3],
				I = i[7],
				N = i[11],
				U = i[15];
			return r[0] = a * w + o * T + s * R + c * D, r[4] = a * _ + o * E + s * P + c * I, r[8] = a * M + o * A + s * C + c * N, r[12] = a * S + o * L + s * O + c * U, r[1] = l * w + h * T + u * R + p * D, r[5] = l * _ + h * E + u * P + p * I, r[9] = l * M + h * A + u * C + p * N, r[13] = l * S + h * L + u * O + p * U, r[2] = d * w + f * T + m * R + v * D, r[6] = d * _ + f * E + m * P + v * I, r[10] = d * M + f * A + m * C + v * N, r[14] = d * S + f * L + m * O + v * U, r[3] = g * w + y * T + x * R + b * D, r[7] = g * _ + y * E + x * P + b * I, r[11] = g * M + y * A + x * C + b * N, r[15] = g * S + y * L + x * O + b * U, this
		},
		multiplyScalar: function (e) {
			var t = this.elements;
			return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this
		},
		determinant: function () {
			var e = this.elements,
				t = e[0],
				n = e[4],
				i = e[8],
				r = e[12],
				a = e[1],
				o = e[5],
				s = e[9],
				c = e[13],
				l = e[2],
				h = e[6],
				u = e[10],
				p = e[14];
			return e[3] * (+r * s * h - i * c * h - r * o * u + n * c * u + i * o * p - n * s * p) + e[7] * (+t * s * p - t * c * u + r * a * u - i * a * p + i * c * l - r * s * l) + e[11] * (+t * c * h - t * o * p - r * a * h + n * a * p + r * o * l - n * c * l) + e[15] * (-i * o * l - t * s * h + t * o * u + i * a * h - n * a * u + n * s * l)
		},
		transpose: function () {
			var e, t = this.elements;
			return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this
		},
		setPosition: function (e, t, n) {
			var i = this.elements;
			return e.isVector3 ? (i[12] = e.x, i[13] = e.y, i[14] = e.z) : (i[12] = e, i[13] = t, i[14] = n), this
		},
		getInverse: function (e, t) {
			void 0 !== t && console.warn("THREE.Matrix4: .getInverse() can no longer be configured to throw on degenerate.");
			var n = this.elements,
				i = e.elements,
				r = i[0],
				a = i[1],
				o = i[2],
				s = i[3],
				c = i[4],
				l = i[5],
				h = i[6],
				u = i[7],
				p = i[8],
				d = i[9],
				f = i[10],
				m = i[11],
				v = i[12],
				g = i[13],
				y = i[14],
				x = i[15],
				b = d * y * u - g * f * u + g * h * m - l * y * m - d * h * x + l * f * x,
				w = v * f * u - p * y * u - v * h * m + c * y * m + p * h * x - c * f * x,
				_ = p * g * u - v * d * u + v * l * m - c * g * m - p * l * x + c * d * x,
				M = v * d * h - p * g * h - v * l * f + c * g * f + p * l * y - c * d * y,
				S = r * b + a * w + o * _ + s * M;
			if (0 === S) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
			var T = 1 / S;
			return n[0] = b * T, n[1] = (g * f * s - d * y * s - g * o * m + a * y * m + d * o * x - a * f * x) * T, n[2] = (l * y * s - g * h * s + g * o * u - a * y * u - l * o * x + a * h * x) * T, n[3] = (d * h * s - l * f * s - d * o * u + a * f * u + l * o * m - a * h * m) * T, n[4] = w * T, n[5] = (p * y * s - v * f * s + v * o * m - r * y * m - p * o * x + r * f * x) * T, n[6] = (v * h * s - c * y * s - v * o * u + r * y * u + c * o * x - r * h * x) * T, n[7] = (c * f * s - p * h * s + p * o * u - r * f * u - c * o * m + r * h * m) * T, n[8] = _ * T, n[9] = (v * d * s - p * g * s - v * a * m + r * g * m + p * a * x - r * d * x) * T, n[10] = (c * g * s - v * l * s + v * a * u - r * g * u - c * a * x + r * l * x) * T, n[11] = (p * l * s - c * d * s - p * a * u + r * d * u + c * a * m - r * l * m) * T, n[12] = M * T, n[13] = (p * g * o - v * d * o + v * a * f - r * g * f - p * a * y + r * d * y) * T, n[14] = (v * l * o - c * g * o - v * a * h + r * g * h + c * a * y - r * l * y) * T, n[15] = (c * d * o - p * l * o + p * a * h - r * d * h - c * a * f + r * l * f) * T, this
		},
		scale: function (e) {
			var t = this.elements,
				n = e.x,
				i = e.y,
				r = e.z;
			return t[0] *= n, t[4] *= i, t[8] *= r, t[1] *= n, t[5] *= i, t[9] *= r, t[2] *= n, t[6] *= i, t[10] *= r, t[3] *= n, t[7] *= i, t[11] *= r, this
		},
		getMaxScaleOnAxis: function () {
			var e = this.elements,
				t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
				n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
				i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
			return Math.sqrt(Math.max(t, n, i))
		},
		makeTranslation: function (e, t, n) {
			return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this
		},
		makeRotationX: function (e) {
			var t = Math.cos(e),
				n = Math.sin(e);
			return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this
		},
		makeRotationY: function (e) {
			var t = Math.cos(e),
				n = Math.sin(e);
			return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this
		},
		makeRotationZ: function (e) {
			var t = Math.cos(e),
				n = Math.sin(e);
			return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		},
		makeRotationAxis: function (e, t) {
			var n = Math.cos(t),
				i = Math.sin(t),
				r = 1 - n,
				a = e.x,
				o = e.y,
				s = e.z,
				c = r * a,
				l = r * o;
			return this.set(c * a + n, c * o - i * s, c * s + i * o, 0, c * o + i * s, l * o + n, l * s - i * a, 0, c * s - i * o, l * s + i * a, r * s * s + n, 0, 0, 0, 0, 1), this
		},
		makeScale: function (e, t, n) {
			return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this
		},
		makeShear: function (e, t, n) {
			return this.set(1, t, n, 0, e, 1, n, 0, e, t, 1, 0, 0, 0, 0, 1), this
		},
		compose: function (e, t, n) {
			var i = this.elements,
				r = t._x,
				a = t._y,
				o = t._z,
				s = t._w,
				c = r + r,
				l = a + a,
				h = o + o,
				u = r * c,
				p = r * l,
				d = r * h,
				f = a * l,
				m = a * h,
				v = o * h,
				g = s * c,
				y = s * l,
				x = s * h,
				b = n.x,
				w = n.y,
				_ = n.z;
			return i[0] = (1 - (f + v)) * b, i[1] = (p + x) * b, i[2] = (d - y) * b, i[3] = 0, i[4] = (p - x) * w, i[5] = (1 - (u + v)) * w, i[6] = (m + g) * w, i[7] = 0, i[8] = (d + y) * _, i[9] = (m - g) * _, i[10] = (1 - (u + f)) * _, i[11] = 0, i[12] = e.x, i[13] = e.y, i[14] = e.z, i[15] = 1, this
		},
		decompose: function (e, t, n) {
			var i = this.elements,
				r = b.set(i[0], i[1], i[2]).length(),
				a = b.set(i[4], i[5], i[6]).length(),
				o = b.set(i[8], i[9], i[10]).length();
			this.determinant() < 0 && (r = -r), e.x = i[12], e.y = i[13], e.z = i[14], w.copy(this);
			var s = 1 / r,
				c = 1 / a,
				l = 1 / o;
			return w.elements[0] *= s, w.elements[1] *= s, w.elements[2] *= s, w.elements[4] *= c, w.elements[5] *= c, w.elements[6] *= c, w.elements[8] *= l, w.elements[9] *= l, w.elements[10] *= l, t.setFromRotationMatrix(w), n.x = r, n.y = a, n.z = o, this
		},
		makePerspective: function (e, t, n, i, r, a) {
			void 0 === a && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
			var o = this.elements,
				s = 2 * r / (t - e),
				c = 2 * r / (n - i),
				l = (t + e) / (t - e),
				h = (n + i) / (n - i),
				u = -(a + r) / (a - r),
				p = -2 * a * r / (a - r);
			return o[0] = s, o[4] = 0, o[8] = l, o[12] = 0, o[1] = 0, o[5] = c, o[9] = h, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = u, o[14] = p, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this
		},
		makeOrthographic: function (e, t, n, i, r, a) {
			var o = this.elements,
				s = 1 / (t - e),
				c = 1 / (n - i),
				l = 1 / (a - r),
				h = (t + e) * s,
				u = (n + i) * c,
				p = (a + r) * l;
			return o[0] = 2 * s, o[4] = 0, o[8] = 0, o[12] = -h, o[1] = 0, o[5] = 2 * c, o[9] = 0, o[13] = -u, o[2] = 0, o[6] = 0, o[10] = -2 * l, o[14] = -p, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this
		},
		equals: function (e) {
			for (var t = this.elements, n = e.elements, i = 0; i < 16; i++)
				if (t[i] !== n[i]) return !1;
			return !0
		},
		fromArray: function (e, t) {
			void 0 === t && (t = 0);
			for (var n = 0; n < 16; n++) this.elements[n] = e[n + t];
			return this
		},
		toArray: function (e, t) {
			void 0 === e && (e = []), void 0 === t && (t = 0);
			var n = this.elements;
			return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e
		}
	});
	var L = new A,
		R = new v;

	function P(e, t, n, i) {
		this._x = e || 0, this._y = t || 0, this._z = n || 0, this._order = i || P.DefaultOrder
	}

	function C() {
		this.mask = 1
	}
	P.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], P.DefaultOrder = "XYZ", Object.defineProperties(P.prototype, {
		x: {
			get: function () {
				return this._x
			},
			set: function (e) {
				this._x = e, this._onChangeCallback()
			}
		},
		y: {
			get: function () {
				return this._y
			},
			set: function (e) {
				this._y = e, this._onChangeCallback()
			}
		},
		z: {
			get: function () {
				return this._z
			},
			set: function (e) {
				this._z = e, this._onChangeCallback()
			}
		},
		order: {
			get: function () {
				return this._order
			},
			set: function (e) {
				this._order = e, this._onChangeCallback()
			}
		}
	}), Object.assign(P.prototype, {
		isEuler: !0,
		set: function (e, t, n, i) {
			return this._x = e, this._y = t, this._z = n, this._order = i || this._order, this._onChangeCallback(), this
		},
		clone: function () {
			return new this.constructor(this._x, this._y, this._z, this._order)
		},
		copy: function (e) {
			return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this
		},
		setFromRotationMatrix: function (e, t, n) {
			var i = s.clamp,
				r = e.elements,
				a = r[0],
				o = r[4],
				c = r[8],
				l = r[1],
				h = r[5],
				u = r[9],
				p = r[2],
				d = r[6],
				f = r[10];
			return "XYZ" === (t = t || this._order) ? (this._y = Math.asin(i(c, -1, 1)), Math.abs(c) < .9999999 ? (this._x = Math.atan2(-u, f), this._z = Math.atan2(-o, a)) : (this._x = Math.atan2(d, h), this._z = 0)) : "YXZ" === t ? (this._x = Math.asin(-i(u, -1, 1)), Math.abs(u) < .9999999 ? (this._y = Math.atan2(c, f), this._z = Math.atan2(l, h)) : (this._y = Math.atan2(-p, a), this._z = 0)) : "ZXY" === t ? (this._x = Math.asin(i(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-p, f), this._z = Math.atan2(-o, h)) : (this._y = 0, this._z = Math.atan2(l, a))) : "ZYX" === t ? (this._y = Math.asin(-i(p, -1, 1)), Math.abs(p) < .9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(l, a)) : (this._x = 0, this._z = Math.atan2(-o, h))) : "YZX" === t ? (this._z = Math.asin(i(l, -1, 1)), Math.abs(l) < .9999999 ? (this._x = Math.atan2(-u, h), this._y = Math.atan2(-p, a)) : (this._x = 0, this._y = Math.atan2(c, f))) : "XZY" === t ? (this._z = Math.asin(-i(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(d, h), this._y = Math.atan2(c, a)) : (this._x = Math.atan2(-u, f), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + t), this._order = t, !1 !== n && this._onChangeCallback(), this
		},
		setFromQuaternion: function (e, t, n) {
			return L.makeRotationFromQuaternion(e), this.setFromRotationMatrix(L, t, n)
		},
		setFromVector3: function (e, t) {
			return this.set(e.x, e.y, e.z, t || this._order)
		},
		reorder: function (e) {
			return R.setFromEuler(this), this.setFromQuaternion(R, e)
		},
		equals: function (e) {
			return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
		},
		fromArray: function (e) {
			return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this._onChangeCallback(), this
		},
		toArray: function (e, t) {
			return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e
		},
		toVector3: function (e) {
			return e ? e.set(this._x, this._y, this._z) : new x(this._x, this._y, this._z)
		},
		_onChange: function (e) {
			return this._onChangeCallback = e, this
		},
		_onChangeCallback: function () {}
	}), Object.assign(C.prototype, {
		set: function (e) {
			this.mask = 1 << e | 0
		},
		enable: function (e) {
			this.mask |= 1 << e | 0
		},
		enableAll: function () {
			this.mask = -1
		},
		toggle: function (e) {
			this.mask ^= 1 << e | 0
		},
		disable: function (e) {
			this.mask &= ~(1 << e | 0)
		},
		disableAll: function () {
			this.mask = 0
		},
		test: function (e) {
			return 0 != (this.mask & e.mask)
		}
	});
	var O = 0,
		D = new x,
		I = new v,
		N = new A,
		U = new x,
		z = new x,
		F = new x,
		B = new v,
		H = new x(1, 0, 0),
		G = new x(0, 1, 0),
		k = new x(0, 0, 1),
		V = {
			type: "added"
		},
		j = {
			type: "removed"
		};

	function W() {
		Object.defineProperty(this, "id", {
			value: O++
		}), this.uuid = s.generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = W.DefaultUp.clone();
		var e = new x,
			t = new P,
			n = new v,
			i = new x(1, 1, 1);
		t._onChange((function () {
			n.setFromEuler(t, !1)
		})), n._onChange((function () {
			t.setFromQuaternion(n, void 0, !1)
		})), Object.defineProperties(this, {
			position: {
				configurable: !0,
				enumerable: !0,
				value: e
			},
			rotation: {
				configurable: !0,
				enumerable: !0,
				value: t
			},
			quaternion: {
				configurable: !0,
				enumerable: !0,
				value: n
			},
			scale: {
				configurable: !0,
				enumerable: !0,
				value: i
			},
			modelViewMatrix: {
				value: new A
			},
			normalMatrix: {
				value: new l
			}
		}), this.matrix = new A, this.matrixWorld = new A, this.matrixAutoUpdate = W.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new C, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {}
	}

	function q() {
		W.call(this), this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
			detail: this
		}))
	}
	W.DefaultUp = new x(0, 1, 0), W.DefaultMatrixAutoUpdate = !0, W.prototype = Object.assign(Object.create(i.prototype), {
		constructor: W,
		isObject3D: !0,
		onBeforeRender: function () {},
		onAfterRender: function () {},
		applyMatrix4: function (e) {
			this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale)
		},
		applyQuaternion: function (e) {
			return this.quaternion.premultiply(e), this
		},
		setRotationFromAxisAngle: function (e, t) {
			this.quaternion.setFromAxisAngle(e, t)
		},
		setRotationFromEuler: function (e) {
			this.quaternion.setFromEuler(e, !0)
		},
		setRotationFromMatrix: function (e) {
			this.quaternion.setFromRotationMatrix(e)
		},
		setRotationFromQuaternion: function (e) {
			this.quaternion.copy(e)
		},
		rotateOnAxis: function (e, t) {
			return I.setFromAxisAngle(e, t), this.quaternion.multiply(I), this
		},
		rotateOnWorldAxis: function (e, t) {
			return I.setFromAxisAngle(e, t), this.quaternion.premultiply(I), this
		},
		rotateX: function (e) {
			return this.rotateOnAxis(H, e)
		},
		rotateY: function (e) {
			return this.rotateOnAxis(G, e)
		},
		rotateZ: function (e) {
			return this.rotateOnAxis(k, e)
		},
		translateOnAxis: function (e, t) {
			return D.copy(e).applyQuaternion(this.quaternion), this.position.add(D.multiplyScalar(t)), this
		},
		translateX: function (e) {
			return this.translateOnAxis(H, e)
		},
		translateY: function (e) {
			return this.translateOnAxis(G, e)
		},
		translateZ: function (e) {
			return this.translateOnAxis(k, e)
		},
		localToWorld: function (e) {
			return e.applyMatrix4(this.matrixWorld)
		},
		worldToLocal: function (e) {
			return e.applyMatrix4(N.getInverse(this.matrixWorld))
		},
		lookAt: function (e, t, n) {
			e.isVector3 ? U.copy(e) : U.set(e, t, n);
			var i = this.parent;
			this.updateWorldMatrix(!0, !1), z.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? N.lookAt(z, U, this.up) : N.lookAt(U, z, this.up), this.quaternion.setFromRotationMatrix(N), i && (N.extractRotation(i.matrixWorld), I.setFromRotationMatrix(N), this.quaternion.premultiply(I.inverse()))
		},
		add: function (e) {
			if (arguments.length > 1) {
				for (var t = 0; t < arguments.length; t++) this.add(arguments[t]);
				return this
			}
			return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (null !== e.parent && e.parent.remove(e), e.parent = this, this.children.push(e), e.dispatchEvent(V)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this)
		},
		remove: function (e) {
			if (arguments.length > 1) {
				for (var t = 0; t < arguments.length; t++) this.remove(arguments[t]);
				return this
			}
			var n = this.children.indexOf(e);
			return -1 !== n && (e.parent = null, this.children.splice(n, 1), e.dispatchEvent(j)), this
		},
		attach: function (e) {
			return this.updateWorldMatrix(!0, !1), N.getInverse(this.matrixWorld), null !== e.parent && (e.parent.updateWorldMatrix(!0, !1), N.multiply(e.parent.matrixWorld)), e.applyMatrix4(N), e.updateWorldMatrix(!1, !1), this.add(e), this
		},
		getObjectById: function (e) {
			return this.getObjectByProperty("id", e)
		},
		getObjectByName: function (e) {
			return this.getObjectByProperty("name", e)
		},
		getObjectByProperty: function (e, t) {
			if (this[e] === t) return this;
			for (var n = 0, i = this.children.length; n < i; n++) {
				var r = this.children[n].getObjectByProperty(e, t);
				if (void 0 !== r) return r
			}
		},
		getWorldPosition: function (e) {
			return void 0 === e && (console.warn("THREE.Object3D: .getWorldPosition() target is now required"), e = new x), this.updateMatrixWorld(!0), e.setFromMatrixPosition(this.matrixWorld)
		},
		getWorldQuaternion: function (e) {
			return void 0 === e && (console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"), e = new v), this.updateMatrixWorld(!0), this.matrixWorld.decompose(z, e, F), e
		},
		getWorldScale: function (e) {
			return void 0 === e && (console.warn("THREE.Object3D: .getWorldScale() target is now required"), e = new x), this.updateMatrixWorld(!0), this.matrixWorld.decompose(z, B, e), e
		},
		getWorldDirection: function (e) {
			void 0 === e && (console.warn("THREE.Object3D: .getWorldDirection() target is now required"), e = new x), this.updateMatrixWorld(!0);
			var t = this.matrixWorld.elements;
			return e.set(t[8], t[9], t[10]).normalize()
		},
		raycast: function () {},
		traverse: function (e) {
			e(this);
			for (var t = this.children, n = 0, i = t.length; n < i; n++) t[n].traverse(e)
		},
		traverseVisible: function (e) {
			if (!1 !== this.visible) {
				e(this);
				for (var t = this.children, n = 0, i = t.length; n < i; n++) t[n].traverseVisible(e)
			}
		},
		traverseAncestors: function (e) {
			var t = this.parent;
			null !== t && (e(t), t.traverseAncestors(e))
		},
		updateMatrix: function () {
			this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
		},
		updateMatrixWorld: function (e) {
			this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
			for (var t = this.children, n = 0, i = t.length; n < i; n++) t[n].updateMatrixWorld(e)
		},
		updateWorldMatrix: function (e, t) {
			var n = this.parent;
			if (!0 === e && null !== n && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), !0 === t)
				for (var i = this.children, r = 0, a = i.length; r < a; r++) i[r].updateWorldMatrix(!1, !0)
		},
		toJSON: function (e) {
			var t = void 0 === e || "string" == typeof e,
				n = {};
			t && (e = {
				geometries: {},
				materials: {},
				textures: {},
				images: {},
				shapes: {}
			}, n.metadata = {
				version: 4.5,
				type: "Object",
				generator: "Object3D.toJSON"
			});
			var i = {};

			function r(t, n) {
				return void 0 === t[n.uuid] && (t[n.uuid] = n.toJSON(e)), n.uuid
			}
			if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), !0 === this.castShadow && (i.castShadow = !0), !0 === this.receiveShadow && (i.receiveShadow = !0), !1 === this.visible && (i.visible = !1), !1 === this.frustumCulled && (i.frustumCulled = !1), 0 !== this.renderOrder && (i.renderOrder = this.renderOrder), "{}" !== JSON.stringify(this.userData) && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1), this.isInstancedMesh && (i.type = "InstancedMesh", i.count = this.count, i.instanceMatrix = this.instanceMatrix.toJSON()), this.isMesh || this.isLine || this.isPoints) {
				i.geometry = r(e.geometries, this.geometry);
				var a = this.geometry.parameters;
				if (void 0 !== a && void 0 !== a.shapes) {
					var o = a.shapes;
					if (Array.isArray(o))
						for (var s = 0, c = o.length; s < c; s++) {
							var l = o[s];
							r(e.shapes, l)
						} else r(e.shapes, o)
				}
			}
			if (void 0 !== this.material)
				if (Array.isArray(this.material)) {
					var h = [];
					for (s = 0, c = this.material.length; s < c; s++) h.push(r(e.materials, this.material[s]));
					i.material = h
				} else i.material = r(e.materials, this.material);
			if (this.children.length > 0) {
				i.children = [];
				for (s = 0; s < this.children.length; s++) i.children.push(this.children[s].toJSON(e).object)
			}
			if (t) {
				var u = m(e.geometries),
					p = m(e.materials),
					d = m(e.textures),
					f = m(e.images);
				o = m(e.shapes);
				u.length > 0 && (n.geometries = u), p.length > 0 && (n.materials = p), d.length > 0 && (n.textures = d), f.length > 0 && (n.images = f), o.length > 0 && (n.shapes = o)
			}
			return n.object = i, n;

			function m(e) {
				var t = [];
				for (var n in e) {
					var i = e[n];
					delete i.metadata, t.push(i)
				}
				return t
			}
		},
		clone: function (e) {
			return (new this.constructor).copy(this, e)
		},
		copy: function (e, t) {
			if (void 0 === t && (t = !0), this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.userData = JSON.parse(JSON.stringify(e.userData)), !0 === t)
				for (var n = 0; n < e.children.length; n++) {
					var i = e.children[n];
					this.add(i.clone())
				}
			return this
		}
	}), q.prototype = Object.assign(Object.create(W.prototype), {
		constructor: q,
		isScene: !0,
		copy: function (e, t) {
			return W.prototype.copy.call(this, e, t), null !== e.background && (this.background = e.background.clone()), null !== e.environment && (this.environment = e.environment.clone()), null !== e.fog && (this.fog = e.fog.clone()), null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()), this.autoUpdate = e.autoUpdate, this.matrixAutoUpdate = e.matrixAutoUpdate, this
		},
		toJSON: function (e) {
			var t = W.prototype.toJSON.call(this, e);
			return null !== this.background && (t.object.background = this.background.toJSON(e)), null !== this.environment && (t.object.environment = this.environment.toJSON(e)), null !== this.fog && (t.object.fog = this.fog.toJSON()), t
		},
		dispose: function () {
			this.dispatchEvent({
				type: "dispose"
			})
		}
	});
	var X = [new x, new x, new x, new x, new x, new x, new x, new x],
		Y = new x,
		Z = new oe,
		J = new x,
		K = new x,
		Q = new x,
		$ = new x,
		ee = new x,
		te = new x,
		ne = new x,
		ie = new x,
		re = new x,
		ae = new x;

	function oe(e, t) {
		this.min = void 0 !== e ? e : new x(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== t ? t : new x(-1 / 0, -1 / 0, -1 / 0)
	}

	function se(e, t, n, i, r) {
		var a, o;
		for (a = 0, o = e.length - 3; a <= o; a += 3) {
			ae.fromArray(e, a);
			var s = r.x * Math.abs(ae.x) + r.y * Math.abs(ae.y) + r.z * Math.abs(ae.z),
				c = t.dot(ae),
				l = n.dot(ae),
				h = i.dot(ae);
			if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > s) return !1
		}
		return !0
	}
	Object.assign(oe.prototype, {
		isBox3: !0,
		set: function (e, t) {
			return this.min.copy(e), this.max.copy(t), this
		},
		setFromArray: function (e) {
			for (var t = 1 / 0, n = 1 / 0, i = 1 / 0, r = -1 / 0, a = -1 / 0, o = -1 / 0, s = 0, c = e.length; s < c; s += 3) {
				var l = e[s],
					h = e[s + 1],
					u = e[s + 2];
				l < t && (t = l), h < n && (n = h), u < i && (i = u), l > r && (r = l), h > a && (a = h), u > o && (o = u)
			}
			return this.min.set(t, n, i), this.max.set(r, a, o), this
		},
		setFromBufferAttribute: function (e) {
			for (var t = 1 / 0, n = 1 / 0, i = 1 / 0, r = -1 / 0, a = -1 / 0, o = -1 / 0, s = 0, c = e.count; s < c; s++) {
				var l = e.getX(s),
					h = e.getY(s),
					u = e.getZ(s);
				l < t && (t = l), h < n && (n = h), u < i && (i = u), l > r && (r = l), h > a && (a = h), u > o && (o = u)
			}
			return this.min.set(t, n, i), this.max.set(r, a, o), this
		},
		setFromPoints: function (e) {
			this.makeEmpty();
			for (var t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
			return this
		},
		setFromCenterAndSize: function (e, t) {
			var n = Y.copy(t).multiplyScalar(.5);
			return this.min.copy(e).sub(n), this.max.copy(e).add(n), this
		},
		setFromObject: function (e) {
			return this.makeEmpty(), this.expandByObject(e)
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.min.copy(e.min), this.max.copy(e.max), this
		},
		makeEmpty: function () {
			return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this
		},
		isEmpty: function () {
			return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
		},
		getCenter: function (e) {
			return void 0 === e && (console.warn("THREE.Box3: .getCenter() target is now required"), e = new x), this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
		},
		getSize: function (e) {
			return void 0 === e && (console.warn("THREE.Box3: .getSize() target is now required"), e = new x), this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min)
		},
		expandByPoint: function (e) {
			return this.min.min(e), this.max.max(e), this
		},
		expandByVector: function (e) {
			return this.min.sub(e), this.max.add(e), this
		},
		expandByScalar: function (e) {
			return this.min.addScalar(-e), this.max.addScalar(e), this
		},
		expandByObject: function (e) {
			e.updateWorldMatrix(!1, !1);
			var t = e.geometry;
			void 0 !== t && (null === t.boundingBox && t.computeBoundingBox(), Z.copy(t.boundingBox), Z.applyMatrix4(e.matrixWorld), this.union(Z));
			for (var n = e.children, i = 0, r = n.length; i < r; i++) this.expandByObject(n[i]);
			return this
		},
		containsPoint: function (e) {
			return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z)
		},
		containsBox: function (e) {
			return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z
		},
		getParameter: function (e, t) {
			return void 0 === t && (console.warn("THREE.Box3: .getParameter() target is now required"), t = new x), t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
		},
		intersectsBox: function (e) {
			return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z)
		},
		intersectsSphere: function (e) {
			return this.clampPoint(e.center, Y), Y.distanceToSquared(e.center) <= e.radius * e.radius
		},
		intersectsPlane: function (e) {
			var t, n;
			return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant
		},
		intersectsTriangle: function (e) {
			if (this.isEmpty()) return !1;
			this.getCenter(ne), ie.subVectors(this.max, ne), J.subVectors(e.a, ne), K.subVectors(e.b, ne), Q.subVectors(e.c, ne), $.subVectors(K, J), ee.subVectors(Q, K), te.subVectors(J, Q);
			var t = [0, -$.z, $.y, 0, -ee.z, ee.y, 0, -te.z, te.y, $.z, 0, -$.x, ee.z, 0, -ee.x, te.z, 0, -te.x, -$.y, $.x, 0, -ee.y, ee.x, 0, -te.y, te.x, 0];
			return !!se(t, J, K, Q, ie) && (!!se(t = [1, 0, 0, 0, 1, 0, 0, 0, 1], J, K, Q, ie) && (re.crossVectors($, ee), se(t = [re.x, re.y, re.z], J, K, Q, ie)))
		},
		clampPoint: function (e, t) {
			return void 0 === t && (console.warn("THREE.Box3: .clampPoint() target is now required"), t = new x), t.copy(e).clamp(this.min, this.max)
		},
		distanceToPoint: function (e) {
			return Y.copy(e).clamp(this.min, this.max).sub(e).length()
		},
		getBoundingSphere: function (e) {
			return void 0 === e && console.error("THREE.Box3: .getBoundingSphere() target is now required"), this.getCenter(e.center), e.radius = .5 * this.getSize(Y).length(), e
		},
		intersect: function (e) {
			return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this
		},
		union: function (e) {
			return this.min.min(e.min), this.max.max(e.max), this
		},
		applyMatrix4: function (e) {
			return this.isEmpty() || (X[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), X[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), X[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), X[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), X[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), X[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), X[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), X[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(X)), this
		},
		translate: function (e) {
			return this.min.add(e), this.max.add(e), this
		},
		equals: function (e) {
			return e.min.equals(this.min) && e.max.equals(this.max)
		}
	});
	var ce = new oe;

	function le(e, t) {
		this.center = void 0 !== e ? e : new x, this.radius = void 0 !== t ? t : 0
	}
	Object.assign(le.prototype, {
		set: function (e, t) {
			return this.center.copy(e), this.radius = t, this
		},
		setFromPoints: function (e, t) {
			var n = this.center;
			void 0 !== t ? n.copy(t) : ce.setFromPoints(e).getCenter(n);
			for (var i = 0, r = 0, a = e.length; r < a; r++) i = Math.max(i, n.distanceToSquared(e[r]));
			return this.radius = Math.sqrt(i), this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.center.copy(e.center), this.radius = e.radius, this
		},
		empty: function () {
			return this.radius <= 0
		},
		containsPoint: function (e) {
			return e.distanceToSquared(this.center) <= this.radius * this.radius
		},
		distanceToPoint: function (e) {
			return e.distanceTo(this.center) - this.radius
		},
		intersectsSphere: function (e) {
			var t = this.radius + e.radius;
			return e.center.distanceToSquared(this.center) <= t * t
		},
		intersectsBox: function (e) {
			return e.intersectsSphere(this)
		},
		intersectsPlane: function (e) {
			return Math.abs(e.distanceToPoint(this.center)) <= this.radius
		},
		clampPoint: function (e, t) {
			var n = this.center.distanceToSquared(e);
			return void 0 === t && (console.warn("THREE.Sphere: .clampPoint() target is now required"), t = new x), t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t
		},
		getBoundingBox: function (e) {
			return void 0 === e && (console.warn("THREE.Sphere: .getBoundingBox() target is now required"), e = new oe), e.set(this.center, this.center), e.expandByScalar(this.radius), e
		},
		applyMatrix4: function (e) {
			return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this
		},
		translate: function (e) {
			return this.center.add(e), this
		},
		equals: function (e) {
			return e.center.equals(this.center) && e.radius === this.radius
		}
	});
	var he = new x,
		ue = new x,
		pe = new x,
		de = new x,
		fe = new x,
		me = new x,
		ve = new x;

	function ge(e, t) {
		this.origin = void 0 !== e ? e : new x, this.direction = void 0 !== t ? t : new x(0, 0, -1)
	}
	Object.assign(ge.prototype, {
		set: function (e, t) {
			return this.origin.copy(e), this.direction.copy(t), this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.origin.copy(e.origin), this.direction.copy(e.direction), this
		},
		at: function (e, t) {
			return void 0 === t && (console.warn("THREE.Ray: .at() target is now required"), t = new x), t.copy(this.direction).multiplyScalar(e).add(this.origin)
		},
		lookAt: function (e) {
			return this.direction.copy(e).sub(this.origin).normalize(), this
		},
		recast: function (e) {
			return this.origin.copy(this.at(e, he)), this
		},
		closestPointToPoint: function (e, t) {
			void 0 === t && (console.warn("THREE.Ray: .closestPointToPoint() target is now required"), t = new x), t.subVectors(e, this.origin);
			var n = t.dot(this.direction);
			return n < 0 ? t.copy(this.origin) : t.copy(this.direction).multiplyScalar(n).add(this.origin)
		},
		distanceToPoint: function (e) {
			return Math.sqrt(this.distanceSqToPoint(e))
		},
		distanceSqToPoint: function (e) {
			var t = he.subVectors(e, this.origin).dot(this.direction);
			return t < 0 ? this.origin.distanceToSquared(e) : (he.copy(this.direction).multiplyScalar(t).add(this.origin), he.distanceToSquared(e))
		},
		distanceSqToSegment: function (e, t, n, i) {
			ue.copy(e).add(t).multiplyScalar(.5), pe.copy(t).sub(e).normalize(), de.copy(this.origin).sub(ue);
			var r, a, o, s, c = .5 * e.distanceTo(t),
				l = -this.direction.dot(pe),
				h = de.dot(this.direction),
				u = -de.dot(pe),
				p = de.lengthSq(),
				d = Math.abs(1 - l * l);
			if (d > 0)
				if (a = l * h - u, s = c * d, (r = l * u - h) >= 0)
					if (a >= -s)
						if (a <= s) {
							var f = 1 / d;
							o = (r *= f) * (r + l * (a *= f) + 2 * h) + a * (l * r + a + 2 * u) + p
						} else a = c, o = -(r = Math.max(0, -(l * a + h))) * r + a * (a + 2 * u) + p;
			else a = -c, o = -(r = Math.max(0, -(l * a + h))) * r + a * (a + 2 * u) + p;
			else a <= -s ? o = -(r = Math.max(0, -(-l * c + h))) * r + (a = r > 0 ? -c : Math.min(Math.max(-c, -u), c)) * (a + 2 * u) + p : a <= s ? (r = 0, o = (a = Math.min(Math.max(-c, -u), c)) * (a + 2 * u) + p) : o = -(r = Math.max(0, -(l * c + h))) * r + (a = r > 0 ? c : Math.min(Math.max(-c, -u), c)) * (a + 2 * u) + p;
			else a = l > 0 ? -c : c, o = -(r = Math.max(0, -(l * a + h))) * r + a * (a + 2 * u) + p;
			return n && n.copy(this.direction).multiplyScalar(r).add(this.origin), i && i.copy(pe).multiplyScalar(a).add(ue), o
		},
		intersectSphere: function (e, t) {
			he.subVectors(e.center, this.origin);
			var n = he.dot(this.direction),
				i = he.dot(he) - n * n,
				r = e.radius * e.radius;
			if (i > r) return null;
			var a = Math.sqrt(r - i),
				o = n - a,
				s = n + a;
			return o < 0 && s < 0 ? null : o < 0 ? this.at(s, t) : this.at(o, t)
		},
		intersectsSphere: function (e) {
			return this.distanceSqToPoint(e.center) <= e.radius * e.radius
		},
		distanceToPlane: function (e) {
			var t = e.normal.dot(this.direction);
			if (0 === t) return 0 === e.distanceToPoint(this.origin) ? 0 : null;
			var n = -(this.origin.dot(e.normal) + e.constant) / t;
			return n >= 0 ? n : null
		},
		intersectPlane: function (e, t) {
			var n = this.distanceToPlane(e);
			return null === n ? null : this.at(n, t)
		},
		intersectsPlane: function (e) {
			var t = e.distanceToPoint(this.origin);
			return 0 === t || e.normal.dot(this.direction) * t < 0
		},
		intersectBox: function (e, t) {
			var n, i, r, a, o, s, c = 1 / this.direction.x,
				l = 1 / this.direction.y,
				h = 1 / this.direction.z,
				u = this.origin;
			return c >= 0 ? (n = (e.min.x - u.x) * c, i = (e.max.x - u.x) * c) : (n = (e.max.x - u.x) * c, i = (e.min.x - u.x) * c), l >= 0 ? (r = (e.min.y - u.y) * l, a = (e.max.y - u.y) * l) : (r = (e.max.y - u.y) * l, a = (e.min.y - u.y) * l), n > a || r > i ? null : ((r > n || n != n) && (n = r), (a < i || i != i) && (i = a), h >= 0 ? (o = (e.min.z - u.z) * h, s = (e.max.z - u.z) * h) : (o = (e.max.z - u.z) * h, s = (e.min.z - u.z) * h), n > s || o > i ? null : ((o > n || n != n) && (n = o), (s < i || i != i) && (i = s), i < 0 ? null : this.at(n >= 0 ? n : i, t)))
		},
		intersectsBox: function (e) {
			return null !== this.intersectBox(e, he)
		},
		intersectTriangle: function (e, t, n, i, r) {
			fe.subVectors(t, e), me.subVectors(n, e), ve.crossVectors(fe, me);
			var a, o = this.direction.dot(ve);
			if (o > 0) {
				if (i) return null;
				a = 1
			} else {
				if (!(o < 0)) return null;
				a = -1, o = -o
			}
			de.subVectors(this.origin, e);
			var s = a * this.direction.dot(me.crossVectors(de, me));
			if (s < 0) return null;
			var c = a * this.direction.dot(fe.cross(de));
			if (c < 0) return null;
			if (s + c > o) return null;
			var l = -a * de.dot(ve);
			return l < 0 ? null : this.at(l / o, r)
		},
		applyMatrix4: function (e) {
			return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this
		},
		equals: function (e) {
			return e.origin.equals(this.origin) && e.direction.equals(this.direction)
		}
	});
	var ye = new x,
		xe = new x,
		be = new l;

	function we(e, t) {
		this.normal = void 0 !== e ? e : new x(1, 0, 0), this.constant = void 0 !== t ? t : 0
	}
	Object.assign(we.prototype, {
		isPlane: !0,
		set: function (e, t) {
			return this.normal.copy(e), this.constant = t, this
		},
		setComponents: function (e, t, n, i) {
			return this.normal.set(e, t, n), this.constant = i, this
		},
		setFromNormalAndCoplanarPoint: function (e, t) {
			return this.normal.copy(e), this.constant = -t.dot(this.normal), this
		},
		setFromCoplanarPoints: function (e, t, n) {
			var i = ye.subVectors(n, t).cross(xe.subVectors(e, t)).normalize();
			return this.setFromNormalAndCoplanarPoint(i, e), this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.normal.copy(e.normal), this.constant = e.constant, this
		},
		normalize: function () {
			var e = 1 / this.normal.length();
			return this.normal.multiplyScalar(e), this.constant *= e, this
		},
		negate: function () {
			return this.constant *= -1, this.normal.negate(), this
		},
		distanceToPoint: function (e) {
			return this.normal.dot(e) + this.constant
		},
		distanceToSphere: function (e) {
			return this.distanceToPoint(e.center) - e.radius
		},
		projectPoint: function (e, t) {
			return void 0 === t && (console.warn("THREE.Plane: .projectPoint() target is now required"), t = new x), t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)
		},
		intersectLine: function (e, t) {
			void 0 === t && (console.warn("THREE.Plane: .intersectLine() target is now required"), t = new x);
			var n = e.delta(ye),
				i = this.normal.dot(n);
			if (0 === i) return 0 === this.distanceToPoint(e.start) ? t.copy(e.start) : void 0;
			var r = -(e.start.dot(this.normal) + this.constant) / i;
			return r < 0 || r > 1 ? void 0 : t.copy(n).multiplyScalar(r).add(e.start)
		},
		intersectsLine: function (e) {
			var t = this.distanceToPoint(e.start),
				n = this.distanceToPoint(e.end);
			return t < 0 && n > 0 || n < 0 && t > 0
		},
		intersectsBox: function (e) {
			return e.intersectsPlane(this)
		},
		intersectsSphere: function (e) {
			return e.intersectsPlane(this)
		},
		coplanarPoint: function (e) {
			return void 0 === e && (console.warn("THREE.Plane: .coplanarPoint() target is now required"), e = new x), e.copy(this.normal).multiplyScalar(-this.constant)
		},
		applyMatrix4: function (e, t) {
			var n = t || be.getNormalMatrix(e),
				i = this.coplanarPoint(ye).applyMatrix4(e),
				r = this.normal.applyMatrix3(n).normalize();
			return this.constant = -i.dot(r), this
		},
		translate: function (e) {
			return this.constant -= e.dot(this.normal), this
		},
		equals: function (e) {
			return e.normal.equals(this.normal) && e.constant === this.constant
		}
	});
	var _e = new x,
		Me = new x,
		Se = new x,
		Te = new x,
		Ee = new x,
		Ae = new x,
		Le = new x,
		Re = new x,
		Pe = new x,
		Ce = new x;

	function Oe(e, t, n) {
		this.a = void 0 !== e ? e : new x, this.b = void 0 !== t ? t : new x, this.c = void 0 !== n ? n : new x
	}
	Object.assign(Oe, {
		getNormal: function (e, t, n, i) {
			void 0 === i && (console.warn("THREE.Triangle: .getNormal() target is now required"), i = new x), i.subVectors(n, t), _e.subVectors(e, t), i.cross(_e);
			var r = i.lengthSq();
			return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0)
		},
		getBarycoord: function (e, t, n, i, r) {
			_e.subVectors(i, t), Me.subVectors(n, t), Se.subVectors(e, t);
			var a = _e.dot(_e),
				o = _e.dot(Me),
				s = _e.dot(Se),
				c = Me.dot(Me),
				l = Me.dot(Se),
				h = a * c - o * o;
			if (void 0 === r && (console.warn("THREE.Triangle: .getBarycoord() target is now required"), r = new x), 0 === h) return r.set(-2, -1, -1);
			var u = 1 / h,
				p = (c * s - o * l) * u,
				d = (a * l - o * s) * u;
			return r.set(1 - p - d, d, p)
		},
		containsPoint: function (e, t, n, i) {
			return Oe.getBarycoord(e, t, n, i, Te), Te.x >= 0 && Te.y >= 0 && Te.x + Te.y <= 1
		},
		getUV: function (e, t, n, i, r, a, o, s) {
			return this.getBarycoord(e, t, n, i, Te), s.set(0, 0), s.addScaledVector(r, Te.x), s.addScaledVector(a, Te.y), s.addScaledVector(o, Te.z), s
		},
		isFrontFacing: function (e, t, n, i) {
			return _e.subVectors(n, t), Me.subVectors(e, t), _e.cross(Me).dot(i) < 0
		}
	}), Object.assign(Oe.prototype, {
		set: function (e, t, n) {
			return this.a.copy(e), this.b.copy(t), this.c.copy(n), this
		},
		setFromPointsAndIndices: function (e, t, n, i) {
			return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[i]), this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
		},
		getArea: function () {
			return _e.subVectors(this.c, this.b), Me.subVectors(this.a, this.b), .5 * _e.cross(Me).length()
		},
		getMidpoint: function (e) {
			return void 0 === e && (console.warn("THREE.Triangle: .getMidpoint() target is now required"), e = new x), e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
		},
		getNormal: function (e) {
			return Oe.getNormal(this.a, this.b, this.c, e)
		},
		getPlane: function (e) {
			return void 0 === e && (console.warn("THREE.Triangle: .getPlane() target is now required"), e = new we), e.setFromCoplanarPoints(this.a, this.b, this.c)
		},
		getBarycoord: function (e, t) {
			return Oe.getBarycoord(e, this.a, this.b, this.c, t)
		},
		getUV: function (e, t, n, i, r) {
			return Oe.getUV(e, this.a, this.b, this.c, t, n, i, r)
		},
		containsPoint: function (e) {
			return Oe.containsPoint(e, this.a, this.b, this.c)
		},
		isFrontFacing: function (e) {
			return Oe.isFrontFacing(this.a, this.b, this.c, e)
		},
		intersectsBox: function (e) {
			return e.intersectsTriangle(this)
		},
		closestPointToPoint: function (e, t) {
			void 0 === t && (console.warn("THREE.Triangle: .closestPointToPoint() target is now required"), t = new x);
			var n, i, r = this.a,
				a = this.b,
				o = this.c;
			Ee.subVectors(a, r), Ae.subVectors(o, r), Re.subVectors(e, r);
			var s = Ee.dot(Re),
				c = Ae.dot(Re);
			if (s <= 0 && c <= 0) return t.copy(r);
			Pe.subVectors(e, a);
			var l = Ee.dot(Pe),
				h = Ae.dot(Pe);
			if (l >= 0 && h <= l) return t.copy(a);
			var u = s * h - l * c;
			if (u <= 0 && s >= 0 && l <= 0) return n = s / (s - l), t.copy(r).addScaledVector(Ee, n);
			Ce.subVectors(e, o);
			var p = Ee.dot(Ce),
				d = Ae.dot(Ce);
			if (d >= 0 && p <= d) return t.copy(o);
			var f = p * c - s * d;
			if (f <= 0 && c >= 0 && d <= 0) return i = c / (c - d), t.copy(r).addScaledVector(Ae, i);
			var m = l * d - p * h;
			if (m <= 0 && h - l >= 0 && p - d >= 0) return Le.subVectors(o, a), i = (h - l) / (h - l + (p - d)), t.copy(a).addScaledVector(Le, i);
			var v = 1 / (m + f + u);
			return n = f * v, i = u * v, t.copy(r).addScaledVector(Ee, n).addScaledVector(Ae, i)
		},
		equals: function (e) {
			return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
		}
	});
	var De = {
			aliceblue: 15792383,
			antiquewhite: 16444375,
			aqua: 65535,
			aquamarine: 8388564,
			azure: 15794175,
			beige: 16119260,
			bisque: 16770244,
			black: 0,
			blanchedalmond: 16772045,
			blue: 255,
			blueviolet: 9055202,
			brown: 10824234,
			burlywood: 14596231,
			cadetblue: 6266528,
			chartreuse: 8388352,
			chocolate: 13789470,
			coral: 16744272,
			cornflowerblue: 6591981,
			cornsilk: 16775388,
			crimson: 14423100,
			cyan: 65535,
			darkblue: 139,
			darkcyan: 35723,
			darkgoldenrod: 12092939,
			darkgray: 11119017,
			darkgreen: 25600,
			darkgrey: 11119017,
			darkkhaki: 12433259,
			darkmagenta: 9109643,
			darkolivegreen: 5597999,
			darkorange: 16747520,
			darkorchid: 10040012,
			darkred: 9109504,
			darksalmon: 15308410,
			darkseagreen: 9419919,
			darkslateblue: 4734347,
			darkslategray: 3100495,
			darkslategrey: 3100495,
			darkturquoise: 52945,
			darkviolet: 9699539,
			deeppink: 16716947,
			deepskyblue: 49151,
			dimgray: 6908265,
			dimgrey: 6908265,
			dodgerblue: 2003199,
			firebrick: 11674146,
			floralwhite: 16775920,
			forestgreen: 2263842,
			fuchsia: 16711935,
			gainsboro: 14474460,
			ghostwhite: 16316671,
			gold: 16766720,
			goldenrod: 14329120,
			gray: 8421504,
			green: 32768,
			greenyellow: 11403055,
			grey: 8421504,
			honeydew: 15794160,
			hotpink: 16738740,
			indianred: 13458524,
			indigo: 4915330,
			ivory: 16777200,
			khaki: 15787660,
			lavender: 15132410,
			lavenderblush: 16773365,
			lawngreen: 8190976,
			lemonchiffon: 16775885,
			lightblue: 11393254,
			lightcoral: 15761536,
			lightcyan: 14745599,
			lightgoldenrodyellow: 16448210,
			lightgray: 13882323,
			lightgreen: 9498256,
			lightgrey: 13882323,
			lightpink: 16758465,
			lightsalmon: 16752762,
			lightseagreen: 2142890,
			lightskyblue: 8900346,
			lightslategray: 7833753,
			lightslategrey: 7833753,
			lightsteelblue: 11584734,
			lightyellow: 16777184,
			lime: 65280,
			limegreen: 3329330,
			linen: 16445670,
			magenta: 16711935,
			maroon: 8388608,
			mediumaquamarine: 6737322,
			mediumblue: 205,
			mediumorchid: 12211667,
			mediumpurple: 9662683,
			mediumseagreen: 3978097,
			mediumslateblue: 8087790,
			mediumspringgreen: 64154,
			mediumturquoise: 4772300,
			mediumvioletred: 13047173,
			midnightblue: 1644912,
			mintcream: 16121850,
			mistyrose: 16770273,
			moccasin: 16770229,
			navajowhite: 16768685,
			navy: 128,
			oldlace: 16643558,
			olive: 8421376,
			olivedrab: 7048739,
			orange: 16753920,
			orangered: 16729344,
			orchid: 14315734,
			palegoldenrod: 15657130,
			palegreen: 10025880,
			paleturquoise: 11529966,
			palevioletred: 14381203,
			papayawhip: 16773077,
			peachpuff: 16767673,
			peru: 13468991,
			pink: 16761035,
			plum: 14524637,
			powderblue: 11591910,
			purple: 8388736,
			rebeccapurple: 6697881,
			red: 16711680,
			rosybrown: 12357519,
			royalblue: 4286945,
			saddlebrown: 9127187,
			salmon: 16416882,
			sandybrown: 16032864,
			seagreen: 3050327,
			seashell: 16774638,
			sienna: 10506797,
			silver: 12632256,
			skyblue: 8900331,
			slateblue: 6970061,
			slategray: 7372944,
			slategrey: 7372944,
			snow: 16775930,
			springgreen: 65407,
			steelblue: 4620980,
			tan: 13808780,
			teal: 32896,
			thistle: 14204888,
			tomato: 16737095,
			turquoise: 4251856,
			violet: 15631086,
			wheat: 16113331,
			white: 16777215,
			whitesmoke: 16119285,
			yellow: 16776960,
			yellowgreen: 10145074
		},
		Ie = {
			h: 0,
			s: 0,
			l: 0
		},
		Ne = {
			h: 0,
			s: 0,
			l: 0
		};

	function Ue(e, t, n) {
		return void 0 === t && void 0 === n ? this.set(e) : this.setRGB(e, t, n)
	}

	function ze(e, t, n) {
		return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + 6 * (t - e) * (2 / 3 - n) : e
	}

	function Fe(e) {
		return e < .04045 ? .0773993808 * e : Math.pow(.9478672986 * e + .0521327014, 2.4)
	}

	function Be(e) {
		return e < .0031308 ? 12.92 * e : 1.055 * Math.pow(e, .41666) - .055
	}

	function He(e, t, n, i, r, a) {
		this.a = e, this.b = t, this.c = n, this.normal = i && i.isVector3 ? i : new x, this.vertexNormals = Array.isArray(i) ? i : [], this.color = r && r.isColor ? r : new Ue, this.vertexColors = Array.isArray(r) ? r : [], this.materialIndex = void 0 !== a ? a : 0
	}
	Object.assign(Ue.prototype, {
		isColor: !0,
		r: 1,
		g: 1,
		b: 1,
		set: function (e) {
			return e && e.isColor ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e), this
		},
		setScalar: function (e) {
			return this.r = e, this.g = e, this.b = e, this
		},
		setHex: function (e) {
			return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (255 & e) / 255, this
		},
		setRGB: function (e, t, n) {
			return this.r = e, this.g = t, this.b = n, this
		},
		setHSL: function (e, t, n) {
			if (e = s.euclideanModulo(e, 1), t = s.clamp(t, 0, 1), n = s.clamp(n, 0, 1), 0 === t) this.r = this.g = this.b = n;
			else {
				var i = n <= .5 ? n * (1 + t) : n + t - n * t,
					r = 2 * n - i;
				this.r = ze(r, i, e + 1 / 3), this.g = ze(r, i, e), this.b = ze(r, i, e - 1 / 3)
			}
			return this
		},
		setStyle: function (e) {
			function t(t) {
				void 0 !== t && parseFloat(t) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.")
			}
			var n;
			if (n = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(e)) {
				var i, r = n[1],
					a = n[2];
				switch (r) {
					case "rgb":
					case "rgba":
						if (i = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) return this.r = Math.min(255, parseInt(i[1], 10)) / 255, this.g = Math.min(255, parseInt(i[2], 10)) / 255, this.b = Math.min(255, parseInt(i[3], 10)) / 255, t(i[5]), this;
						if (i = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) return this.r = Math.min(100, parseInt(i[1], 10)) / 100, this.g = Math.min(100, parseInt(i[2], 10)) / 100, this.b = Math.min(100, parseInt(i[3], 10)) / 100, t(i[5]), this;
						break;
					case "hsl":
					case "hsla":
						if (i = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) {
							var o = parseFloat(i[1]) / 360,
								s = parseInt(i[2], 10) / 100,
								c = parseInt(i[3], 10) / 100;
							return t(i[5]), this.setHSL(o, s, c)
						}
				}
			} else if (n = /^\#([A-Fa-f0-9]+)$/.exec(e)) {
				var l = n[1],
					h = l.length;
				if (3 === h) return this.r = parseInt(l.charAt(0) + l.charAt(0), 16) / 255, this.g = parseInt(l.charAt(1) + l.charAt(1), 16) / 255, this.b = parseInt(l.charAt(2) + l.charAt(2), 16) / 255, this;
				if (6 === h) return this.r = parseInt(l.charAt(0) + l.charAt(1), 16) / 255, this.g = parseInt(l.charAt(2) + l.charAt(3), 16) / 255, this.b = parseInt(l.charAt(4) + l.charAt(5), 16) / 255, this
			}
			return e && e.length > 0 ? this.setColorName(e) : this
		},
		setColorName: function (e) {
			var t = De[e];
			return void 0 !== t ? this.setHex(t) : console.warn("THREE.Color: Unknown color " + e), this
		},
		clone: function () {
			return new this.constructor(this.r, this.g, this.b)
		},
		copy: function (e) {
			return this.r = e.r, this.g = e.g, this.b = e.b, this
		},
		copyGammaToLinear: function (e, t) {
			return void 0 === t && (t = 2), this.r = Math.pow(e.r, t), this.g = Math.pow(e.g, t), this.b = Math.pow(e.b, t), this
		},
		copyLinearToGamma: function (e, t) {
			void 0 === t && (t = 2);
			var n = t > 0 ? 1 / t : 1;
			return this.r = Math.pow(e.r, n), this.g = Math.pow(e.g, n), this.b = Math.pow(e.b, n), this
		},
		convertGammaToLinear: function (e) {
			return this.copyGammaToLinear(this, e), this
		},
		convertLinearToGamma: function (e) {
			return this.copyLinearToGamma(this, e), this
		},
		copySRGBToLinear: function (e) {
			return this.r = Fe(e.r), this.g = Fe(e.g), this.b = Fe(e.b), this
		},
		copyLinearToSRGB: function (e) {
			return this.r = Be(e.r), this.g = Be(e.g), this.b = Be(e.b), this
		},
		convertSRGBToLinear: function () {
			return this.copySRGBToLinear(this), this
		},
		convertLinearToSRGB: function () {
			return this.copyLinearToSRGB(this), this
		},
		getHex: function () {
			return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
		},
		getHexString: function () {
			return ("000000" + this.getHex().toString(16)).slice(-6)
		},
		getHSL: function (e) {
			void 0 === e && (console.warn("THREE.Color: .getHSL() target is now required"), e = {
				h: 0,
				s: 0,
				l: 0
			});
			var t, n, i = this.r,
				r = this.g,
				a = this.b,
				o = Math.max(i, r, a),
				s = Math.min(i, r, a),
				c = (s + o) / 2;
			if (s === o) t = 0, n = 0;
			else {
				var l = o - s;
				switch (n = c <= .5 ? l / (o + s) : l / (2 - o - s), o) {
					case i:
						t = (r - a) / l + (r < a ? 6 : 0);
						break;
					case r:
						t = (a - i) / l + 2;
						break;
					case a:
						t = (i - r) / l + 4
				}
				t /= 6
			}
			return e.h = t, e.s = n, e.l = c, e
		},
		getStyle: function () {
			return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
		},
		offsetHSL: function (e, t, n) {
			return this.getHSL(Ie), Ie.h += e, Ie.s += t, Ie.l += n, this.setHSL(Ie.h, Ie.s, Ie.l), this
		},
		add: function (e) {
			return this.r += e.r, this.g += e.g, this.b += e.b, this
		},
		addColors: function (e, t) {
			return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this
		},
		addScalar: function (e) {
			return this.r += e, this.g += e, this.b += e, this
		},
		sub: function (e) {
			return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this
		},
		multiply: function (e) {
			return this.r *= e.r, this.g *= e.g, this.b *= e.b, this
		},
		multiplyScalar: function (e) {
			return this.r *= e, this.g *= e, this.b *= e, this
		},
		lerp: function (e, t) {
			return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this
		},
		lerpHSL: function (e, t) {
			this.getHSL(Ie), e.getHSL(Ne);
			var n = s.lerp(Ie.h, Ne.h, t),
				i = s.lerp(Ie.s, Ne.s, t),
				r = s.lerp(Ie.l, Ne.l, t);
			return this.setHSL(n, i, r), this
		},
		equals: function (e) {
			return e.r === this.r && e.g === this.g && e.b === this.b
		},
		fromArray: function (e, t) {
			return void 0 === t && (t = 0), this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this
		},
		toArray: function (e, t) {
			return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e
		},
		toJSON: function () {
			return this.getHex()
		}
	}), Ue.NAMES = De, Object.assign(He.prototype, {
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			this.a = e.a, this.b = e.b, this.c = e.c, this.normal.copy(e.normal), this.color.copy(e.color), this.materialIndex = e.materialIndex;
			for (var t = 0, n = e.vertexNormals.length; t < n; t++) this.vertexNormals[t] = e.vertexNormals[t].clone();
			for (t = 0, n = e.vertexColors.length; t < n; t++) this.vertexColors[t] = e.vertexColors[t].clone();
			return this
		}
	});
	var Ge = 0;

	function ke() {
		Object.defineProperty(this, "id", {
			value: Ge++
		}), this.uuid = s.generateUUID(), this.name = "", this.type = "Material", this.fog = !0, this.blending = 1, this.side = 0, this.flatShading = !1, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaTest = 0, this.premultipliedAlpha = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0
	}

	function Ve(e) {
		ke.call(this), this.type = "MeshBasicMaterial", this.color = new Ue(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.setValues(e)
	}
	ke.prototype = Object.assign(Object.create(i.prototype), {
		constructor: ke,
		isMaterial: !0,
		onBeforeCompile: function () {},
		setValues: function (e) {
			if (void 0 !== e)
				for (var t in e) {
					var n = e[t];
					if (void 0 !== n)
						if ("shading" !== t) {
							var i = this[t];
							void 0 !== i ? i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[t] = n : console.warn("THREE." + this.type + ": '" + t + "' is not a property of this material.")
						} else console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === n;
					else console.warn("THREE.Material: '" + t + "' parameter is undefined.")
				}
		},
		toJSON: function (e) {
			var t = void 0 === e || "string" == typeof e;
			t && (e = {
				textures: {},
				images: {}
			});
			var n = {
				metadata: {
					version: 4.5,
					type: "Material",
					generator: "Material.toJSON"
				}
			};

			function i(e) {
				var t = [];
				for (var n in e) {
					var i = e[n];
					delete i.metadata, t.push(i)
				}
				return t
			}
			if (n.uuid = this.uuid, n.type = this.type, "" !== this.name && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), void 0 !== this.roughness && (n.roughness = this.roughness), void 0 !== this.metalness && (n.metalness = this.metalness), this.sheen && this.sheen.isColor && (n.sheen = this.sheen.getHex()), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity && 1 !== this.emissiveIntensity && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), void 0 !== this.shininess && (n.shininess = this.shininess), void 0 !== this.clearcoat && (n.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, n.reflectivity = this.reflectivity, n.refractionRatio = this.refractionRatio, void 0 !== this.combine && (n.combine = this.combine), void 0 !== this.envMapIntensity && (n.envMapIntensity = this.envMapIntensity)), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), void 0 !== this.size && (n.size = this.size), void 0 !== this.sizeAttenuation && (n.sizeAttenuation = this.sizeAttenuation), 1 !== this.blending && (n.blending = this.blending), !0 === this.flatShading && (n.flatShading = this.flatShading), 0 !== this.side && (n.side = this.side), this.vertexColors && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), !0 === this.transparent && (n.transparent = this.transparent), n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.stencilWrite = this.stencilWrite, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, this.rotation && 0 !== this.rotation && (n.rotation = this.rotation), !0 === this.polygonOffset && (n.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (n.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth && 1 !== this.linewidth && (n.linewidth = this.linewidth), void 0 !== this.dashSize && (n.dashSize = this.dashSize), void 0 !== this.gapSize && (n.gapSize = this.gapSize), void 0 !== this.scale && (n.scale = this.scale), !0 === this.dithering && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), !0 === this.premultipliedAlpha && (n.premultipliedAlpha = this.premultipliedAlpha), !0 === this.wireframe && (n.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (n.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (n.wireframeLinejoin = this.wireframeLinejoin), !0 === this.morphTargets && (n.morphTargets = !0), !0 === this.morphNormals && (n.morphNormals = !0), !0 === this.skinning && (n.skinning = !0), !1 === this.visible && (n.visible = !1), !1 === this.toneMapped && (n.toneMapped = !1), "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData), t) {
				var r = i(e.textures),
					a = i(e.images);
				r.length > 0 && (n.textures = r), a.length > 0 && (n.images = a)
			}
			return n
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			this.name = e.name, this.fog = e.fog, this.blending = e.blending, this.side = e.side, this.flatShading = e.flatShading, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
			var t = e.clippingPlanes,
				n = null;
			if (null !== t) {
				var i = t.length;
				n = new Array(i);
				for (var r = 0; r !== i; ++r) n[r] = t[r].clone()
			}
			return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.premultipliedAlpha = e.premultipliedAlpha, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this
		},
		dispose: function () {
			this.dispatchEvent({
				type: "dispose"
			})
		}
	}), Object.defineProperty(ke.prototype, "needsUpdate", {
		set: function (e) {
			!0 === e && this.version++
		}
	}), Ve.prototype = Object.create(ke.prototype), Ve.prototype.constructor = Ve, Ve.prototype.isMeshBasicMaterial = !0, Ve.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this
	};
	var je = new x;

	function We(e, t, n) {
		if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
		this.name = "", this.array = e, this.itemSize = t, this.count = void 0 !== e ? e.length / t : 0, this.normalized = !0 === n, this.usage = 35044, this.updateRange = {
			offset: 0,
			count: -1
		}, this.version = 0
	}

	function qe(e, t, n) {
		We.call(this, new Int8Array(e), t, n)
	}

	function Xe(e, t, n) {
		We.call(this, new Uint8Array(e), t, n)
	}

	function Ye(e, t, n) {
		We.call(this, new Uint8ClampedArray(e), t, n)
	}

	function Ze(e, t, n) {
		We.call(this, new Int16Array(e), t, n)
	}

	function Je(e, t, n) {
		We.call(this, new Uint16Array(e), t, n)
	}

	function Ke(e, t, n) {
		We.call(this, new Int32Array(e), t, n)
	}

	function Qe(e, t, n) {
		We.call(this, new Uint32Array(e), t, n)
	}

	function $e(e, t, n) {
		We.call(this, new Float32Array(e), t, n)
	}

	function et(e, t, n) {
		We.call(this, new Float64Array(e), t, n)
	}

	function tt() {
		this.vertices = [], this.normals = [], this.colors = [], this.uvs = [], this.uvs2 = [], this.groups = [], this.morphTargets = {}, this.skinWeights = [], this.skinIndices = [], this.boundingBox = null, this.boundingSphere = null, this.verticesNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.groupsNeedUpdate = !1
	}

	function nt(e) {
		if (0 === e.length) return -1 / 0;
		for (var t = e[0], n = 1, i = e.length; n < i; ++n) e[n] > t && (t = e[n]);
		return t
	}
	Object.defineProperty(We.prototype, "needsUpdate", {
		set: function (e) {
			!0 === e && this.version++
		}
	}), Object.assign(We.prototype, {
		isBufferAttribute: !0,
		onUploadCallback: function () {},
		setUsage: function (e) {
			return this.usage = e, this
		},
		copy: function (e) {
			return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this
		},
		copyAt: function (e, t, n) {
			e *= this.itemSize, n *= t.itemSize;
			for (var i = 0, r = this.itemSize; i < r; i++) this.array[e + i] = t.array[n + i];
			return this
		},
		copyArray: function (e) {
			return this.array.set(e), this
		},
		copyColorsArray: function (e) {
			for (var t = this.array, n = 0, i = 0, r = e.length; i < r; i++) {
				var a = e[i];
				void 0 === a && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", i), a = new Ue), t[n++] = a.r, t[n++] = a.g, t[n++] = a.b
			}
			return this
		},
		copyVector2sArray: function (e) {
			for (var t = this.array, n = 0, i = 0, r = e.length; i < r; i++) {
				var a = e[i];
				void 0 === a && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", i), a = new c), t[n++] = a.x, t[n++] = a.y
			}
			return this
		},
		copyVector3sArray: function (e) {
			for (var t = this.array, n = 0, i = 0, r = e.length; i < r; i++) {
				var a = e[i];
				void 0 === a && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", i), a = new x), t[n++] = a.x, t[n++] = a.y, t[n++] = a.z
			}
			return this
		},
		copyVector4sArray: function (e) {
			for (var t = this.array, n = 0, i = 0, r = e.length; i < r; i++) {
				var a = e[i];
				void 0 === a && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", i), a = new d), t[n++] = a.x, t[n++] = a.y, t[n++] = a.z, t[n++] = a.w
			}
			return this
		},
		applyMatrix3: function (e) {
			for (var t = 0, n = this.count; t < n; t++) je.x = this.getX(t), je.y = this.getY(t), je.z = this.getZ(t), je.applyMatrix3(e), this.setXYZ(t, je.x, je.y, je.z);
			return this
		},
		applyMatrix4: function (e) {
			for (var t = 0, n = this.count; t < n; t++) je.x = this.getX(t), je.y = this.getY(t), je.z = this.getZ(t), je.applyMatrix4(e), this.setXYZ(t, je.x, je.y, je.z);
			return this
		},
		applyNormalMatrix: function (e) {
			for (var t = 0, n = this.count; t < n; t++) je.x = this.getX(t), je.y = this.getY(t), je.z = this.getZ(t), je.applyNormalMatrix(e), this.setXYZ(t, je.x, je.y, je.z);
			return this
		},
		transformDirection: function (e) {
			for (var t = 0, n = this.count; t < n; t++) je.x = this.getX(t), je.y = this.getY(t), je.z = this.getZ(t), je.transformDirection(e), this.setXYZ(t, je.x, je.y, je.z);
			return this
		},
		set: function (e, t) {
			return void 0 === t && (t = 0), this.array.set(e, t), this
		},
		getX: function (e) {
			return this.array[e * this.itemSize]
		},
		setX: function (e, t) {
			return this.array[e * this.itemSize] = t, this
		},
		getY: function (e) {
			return this.array[e * this.itemSize + 1]
		},
		setY: function (e, t) {
			return this.array[e * this.itemSize + 1] = t, this
		},
		getZ: function (e) {
			return this.array[e * this.itemSize + 2]
		},
		setZ: function (e, t) {
			return this.array[e * this.itemSize + 2] = t, this
		},
		getW: function (e) {
			return this.array[e * this.itemSize + 3]
		},
		setW: function (e, t) {
			return this.array[e * this.itemSize + 3] = t, this
		},
		setXY: function (e, t, n) {
			return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = n, this
		},
		setXYZ: function (e, t, n, i) {
			return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this
		},
		setXYZW: function (e, t, n, i, r) {
			return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this.array[e + 3] = r, this
		},
		onUpload: function (e) {
			return this.onUploadCallback = e, this
		},
		clone: function () {
			return new this.constructor(this.array, this.itemSize).copy(this)
		},
		toJSON: function () {
			return {
				itemSize: this.itemSize,
				type: this.array.constructor.name,
				array: Array.prototype.slice.call(this.array),
				normalized: this.normalized
			}
		}
	}), qe.prototype = Object.create(We.prototype), qe.prototype.constructor = qe, Xe.prototype = Object.create(We.prototype), Xe.prototype.constructor = Xe, Ye.prototype = Object.create(We.prototype), Ye.prototype.constructor = Ye, Ze.prototype = Object.create(We.prototype), Ze.prototype.constructor = Ze, Je.prototype = Object.create(We.prototype), Je.prototype.constructor = Je, Ke.prototype = Object.create(We.prototype), Ke.prototype.constructor = Ke, Qe.prototype = Object.create(We.prototype), Qe.prototype.constructor = Qe, $e.prototype = Object.create(We.prototype), $e.prototype.constructor = $e, et.prototype = Object.create(We.prototype), et.prototype.constructor = et, Object.assign(tt.prototype, {
		computeGroups: function (e) {
			for (var t, n = [], i = void 0, r = e.faces, a = 0; a < r.length; a++) {
				var o = r[a];
				o.materialIndex !== i && (i = o.materialIndex, void 0 !== t && (t.count = 3 * a - t.start, n.push(t)), t = {
					start: 3 * a,
					materialIndex: i
				})
			}
			void 0 !== t && (t.count = 3 * a - t.start, n.push(t)), this.groups = n
		},
		fromGeometry: function (e) {
			var t, n = e.faces,
				i = e.vertices,
				r = e.faceVertexUvs,
				a = r[0] && r[0].length > 0,
				o = r[1] && r[1].length > 0,
				s = e.morphTargets,
				l = s.length;
			if (l > 0) {
				t = [];
				for (var h = 0; h < l; h++) t[h] = {
					name: s[h].name,
					data: []
				};
				this.morphTargets.position = t
			}
			var u, p = e.morphNormals,
				d = p.length;
			if (d > 0) {
				u = [];
				for (h = 0; h < d; h++) u[h] = {
					name: p[h].name,
					data: []
				};
				this.morphTargets.normal = u
			}
			var f = e.skinIndices,
				m = e.skinWeights,
				v = f.length === i.length,
				g = m.length === i.length;
			i.length > 0 && 0 === n.length && console.error("THREE.DirectGeometry: Faceless geometries are not supported.");
			for (h = 0; h < n.length; h++) {
				var y = n[h];
				this.vertices.push(i[y.a], i[y.b], i[y.c]);
				var x = y.vertexNormals;
				if (3 === x.length) this.normals.push(x[0], x[1], x[2]);
				else {
					var b = y.normal;
					this.normals.push(b, b, b)
				}
				var w, _ = y.vertexColors;
				if (3 === _.length) this.colors.push(_[0], _[1], _[2]);
				else {
					var M = y.color;
					this.colors.push(M, M, M)
				}
				if (!0 === a) void 0 !== (w = r[0][h]) ? this.uvs.push(w[0], w[1], w[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", h), this.uvs.push(new c, new c, new c));
				if (!0 === o) void 0 !== (w = r[1][h]) ? this.uvs2.push(w[0], w[1], w[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", h), this.uvs2.push(new c, new c, new c));
				for (var S = 0; S < l; S++) {
					var T = s[S].vertices;
					t[S].data.push(T[y.a], T[y.b], T[y.c])
				}
				for (S = 0; S < d; S++) {
					var E = p[S].vertexNormals[h];
					u[S].data.push(E.a, E.b, E.c)
				}
				v && this.skinIndices.push(f[y.a], f[y.b], f[y.c]), g && this.skinWeights.push(m[y.a], m[y.b], m[y.c])
			}
			return this.computeGroups(e), this.verticesNeedUpdate = e.verticesNeedUpdate, this.normalsNeedUpdate = e.normalsNeedUpdate, this.colorsNeedUpdate = e.colorsNeedUpdate, this.uvsNeedUpdate = e.uvsNeedUpdate, this.groupsNeedUpdate = e.groupsNeedUpdate, null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), this
		}
	});
	var it = 1,
		rt = new A,
		at = new W,
		ot = new x,
		st = new oe,
		ct = new oe,
		lt = new x;

	function ht() {
		Object.defineProperty(this, "id", {
			value: it += 2
		}), this.uuid = s.generateUUID(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
			start: 0,
			count: 1 / 0
		}, this.userData = {}
	}
	ht.prototype = Object.assign(Object.create(i.prototype), {
		constructor: ht,
		isBufferGeometry: !0,
		getIndex: function () {
			return this.index
		},
		setIndex: function (e) {
			Array.isArray(e) ? this.index = new(nt(e) > 65535 ? Qe : Je)(e, 1) : this.index = e
		},
		getAttribute: function (e) {
			return this.attributes[e]
		},
		setAttribute: function (e, t) {
			return this.attributes[e] = t, this
		},
		deleteAttribute: function (e) {
			return delete this.attributes[e], this
		},
		addGroup: function (e, t, n) {
			this.groups.push({
				start: e,
				count: t,
				materialIndex: void 0 !== n ? n : 0
			})
		},
		clearGroups: function () {
			this.groups = []
		},
		setDrawRange: function (e, t) {
			this.drawRange.start = e, this.drawRange.count = t
		},
		applyMatrix4: function (e) {
			var t = this.attributes.position;
			void 0 !== t && (t.applyMatrix4(e), t.needsUpdate = !0);
			var n = this.attributes.normal;
			if (void 0 !== n) {
				var i = (new l).getNormalMatrix(e);
				n.applyNormalMatrix(i), n.needsUpdate = !0
			}
			var r = this.attributes.tangent;
			return void 0 !== r && (r.transformDirection(e), r.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
		},
		rotateX: function (e) {
			return rt.makeRotationX(e), this.applyMatrix4(rt), this
		},
		rotateY: function (e) {
			return rt.makeRotationY(e), this.applyMatrix4(rt), this
		},
		rotateZ: function (e) {
			return rt.makeRotationZ(e), this.applyMatrix4(rt), this
		},
		translate: function (e, t, n) {
			return rt.makeTranslation(e, t, n), this.applyMatrix4(rt), this
		},
		scale: function (e, t, n) {
			return rt.makeScale(e, t, n), this.applyMatrix4(rt), this
		},
		lookAt: function (e) {
			return at.lookAt(e), at.updateMatrix(), this.applyMatrix4(at.matrix), this
		},
		center: function () {
			return this.computeBoundingBox(), this.boundingBox.getCenter(ot).negate(), this.translate(ot.x, ot.y, ot.z), this
		},
		setFromObject: function (e) {
			var t = e.geometry;
			if (e.isPoints || e.isLine) {
				var n = new $e(3 * t.vertices.length, 3),
					i = new $e(3 * t.colors.length, 3);
				if (this.setAttribute("position", n.copyVector3sArray(t.vertices)), this.setAttribute("color", i.copyColorsArray(t.colors)), t.lineDistances && t.lineDistances.length === t.vertices.length) {
					var r = new $e(t.lineDistances.length, 1);
					this.setAttribute("lineDistance", r.copyArray(t.lineDistances))
				}
				null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone())
			} else e.isMesh && t && t.isGeometry && this.fromGeometry(t);
			return this
		},
		setFromPoints: function (e) {
			for (var t = [], n = 0, i = e.length; n < i; n++) {
				var r = e[n];
				t.push(r.x, r.y, r.z || 0)
			}
			return this.setAttribute("position", new $e(t, 3)), this
		},
		updateFromObject: function (e) {
			var t, n = e.geometry;
			if (e.isMesh) {
				var i = n.__directGeometry;
				if (!0 === n.elementsNeedUpdate && (i = void 0, n.elementsNeedUpdate = !1), void 0 === i) return this.fromGeometry(n);
				i.verticesNeedUpdate = n.verticesNeedUpdate, i.normalsNeedUpdate = n.normalsNeedUpdate, i.colorsNeedUpdate = n.colorsNeedUpdate, i.uvsNeedUpdate = n.uvsNeedUpdate, i.groupsNeedUpdate = n.groupsNeedUpdate, n.verticesNeedUpdate = !1, n.normalsNeedUpdate = !1, n.colorsNeedUpdate = !1, n.uvsNeedUpdate = !1, n.groupsNeedUpdate = !1, n = i
			}
			return !0 === n.verticesNeedUpdate && (void 0 !== (t = this.attributes.position) && (t.copyVector3sArray(n.vertices), t.needsUpdate = !0), n.verticesNeedUpdate = !1), !0 === n.normalsNeedUpdate && (void 0 !== (t = this.attributes.normal) && (t.copyVector3sArray(n.normals), t.needsUpdate = !0), n.normalsNeedUpdate = !1), !0 === n.colorsNeedUpdate && (void 0 !== (t = this.attributes.color) && (t.copyColorsArray(n.colors), t.needsUpdate = !0), n.colorsNeedUpdate = !1), n.uvsNeedUpdate && (void 0 !== (t = this.attributes.uv) && (t.copyVector2sArray(n.uvs), t.needsUpdate = !0), n.uvsNeedUpdate = !1), n.lineDistancesNeedUpdate && (void 0 !== (t = this.attributes.lineDistance) && (t.copyArray(n.lineDistances), t.needsUpdate = !0), n.lineDistancesNeedUpdate = !1), n.groupsNeedUpdate && (n.computeGroups(e.geometry), this.groups = n.groups, n.groupsNeedUpdate = !1), this
		},
		fromGeometry: function (e) {
			return e.__directGeometry = (new tt).fromGeometry(e), this.fromDirectGeometry(e.__directGeometry)
		},
		fromDirectGeometry: function (e) {
			var t = new Float32Array(3 * e.vertices.length);
			if (this.setAttribute("position", new We(t, 3).copyVector3sArray(e.vertices)), e.normals.length > 0) {
				var n = new Float32Array(3 * e.normals.length);
				this.setAttribute("normal", new We(n, 3).copyVector3sArray(e.normals))
			}
			if (e.colors.length > 0) {
				var i = new Float32Array(3 * e.colors.length);
				this.setAttribute("color", new We(i, 3).copyColorsArray(e.colors))
			}
			if (e.uvs.length > 0) {
				var r = new Float32Array(2 * e.uvs.length);
				this.setAttribute("uv", new We(r, 2).copyVector2sArray(e.uvs))
			}
			if (e.uvs2.length > 0) {
				var a = new Float32Array(2 * e.uvs2.length);
				this.setAttribute("uv2", new We(a, 2).copyVector2sArray(e.uvs2))
			}
			for (var o in this.groups = e.groups, e.morphTargets) {
				for (var s = [], c = e.morphTargets[o], l = 0, h = c.length; l < h; l++) {
					var u = c[l],
						p = new $e(3 * u.data.length, 3);
					p.name = u.name, s.push(p.copyVector3sArray(u.data))
				}
				this.morphAttributes[o] = s
			}
			if (e.skinIndices.length > 0) {
				var d = new $e(4 * e.skinIndices.length, 4);
				this.setAttribute("skinIndex", d.copyVector4sArray(e.skinIndices))
			}
			if (e.skinWeights.length > 0) {
				var f = new $e(4 * e.skinWeights.length, 4);
				this.setAttribute("skinWeight", f.copyVector4sArray(e.skinWeights))
			}
			return null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), this
		},
		computeBoundingBox: function () {
			null === this.boundingBox && (this.boundingBox = new oe);
			var e = this.attributes.position,
				t = this.morphAttributes.position;
			if (void 0 !== e) {
				if (this.boundingBox.setFromBufferAttribute(e), t)
					for (var n = 0, i = t.length; n < i; n++) {
						var r = t[n];
						st.setFromBufferAttribute(r), this.morphTargetsRelative ? (lt.addVectors(this.boundingBox.min, st.min), this.boundingBox.expandByPoint(lt), lt.addVectors(this.boundingBox.max, st.max), this.boundingBox.expandByPoint(lt)) : (this.boundingBox.expandByPoint(st.min), this.boundingBox.expandByPoint(st.max))
					}
			} else this.boundingBox.makeEmpty();
			(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
		},
		computeBoundingSphere: function () {
			null === this.boundingSphere && (this.boundingSphere = new le);
			var e = this.attributes.position,
				t = this.morphAttributes.position;
			if (e) {
				var n = this.boundingSphere.center;
				if (st.setFromBufferAttribute(e), t)
					for (var i = 0, r = t.length; i < r; i++) {
						var a = t[i];
						ct.setFromBufferAttribute(a), this.morphTargetsRelative ? (lt.addVectors(st.min, ct.min), st.expandByPoint(lt), lt.addVectors(st.max, ct.max), st.expandByPoint(lt)) : (st.expandByPoint(ct.min), st.expandByPoint(ct.max))
					}
				st.getCenter(n);
				var o = 0;
				for (i = 0, r = e.count; i < r; i++) lt.fromBufferAttribute(e, i), o = Math.max(o, n.distanceToSquared(lt));
				if (t)
					for (i = 0, r = t.length; i < r; i++) {
						a = t[i];
						for (var s = this.morphTargetsRelative, c = 0, l = a.count; c < l; c++) lt.fromBufferAttribute(a, c), s && (ot.fromBufferAttribute(e, c), lt.add(ot)), o = Math.max(o, n.distanceToSquared(lt))
					}
				this.boundingSphere.radius = Math.sqrt(o), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
			}
		},
		computeFaceNormals: function () {},
		computeVertexNormals: function () {
			var e = this.index,
				t = this.attributes;
			if (t.position) {
				var n = t.position.array;
				if (void 0 === t.normal) this.setAttribute("normal", new We(new Float32Array(n.length), 3));
				else
					for (var i = t.normal.array, r = 0, a = i.length; r < a; r++) i[r] = 0;
				var o, s, c, l = t.normal.array,
					h = new x,
					u = new x,
					p = new x,
					d = new x,
					f = new x;
				if (e) {
					var m = e.array;
					for (r = 0, a = e.count; r < a; r += 3) o = 3 * m[r + 0], s = 3 * m[r + 1], c = 3 * m[r + 2], h.fromArray(n, o), u.fromArray(n, s), p.fromArray(n, c), d.subVectors(p, u), f.subVectors(h, u), d.cross(f), l[o] += d.x, l[o + 1] += d.y, l[o + 2] += d.z, l[s] += d.x, l[s + 1] += d.y, l[s + 2] += d.z, l[c] += d.x, l[c + 1] += d.y, l[c + 2] += d.z
				} else
					for (r = 0, a = n.length; r < a; r += 9) h.fromArray(n, r), u.fromArray(n, r + 3), p.fromArray(n, r + 6), d.subVectors(p, u), f.subVectors(h, u), d.cross(f), l[r] = d.x, l[r + 1] = d.y, l[r + 2] = d.z, l[r + 3] = d.x, l[r + 4] = d.y, l[r + 5] = d.z, l[r + 6] = d.x, l[r + 7] = d.y, l[r + 8] = d.z;
				this.normalizeNormals(), t.normal.needsUpdate = !0
			}
		},
		merge: function (e, t) {
			if (e && e.isBufferGeometry) {
				void 0 === t && (t = 0, console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
				var n = this.attributes;
				for (var i in n)
					if (void 0 !== e.attributes[i])
						for (var r = n[i].array, a = e.attributes[i], o = a.array, s = a.itemSize * t, c = Math.min(o.length, r.length - s), l = 0, h = s; l < c; l++, h++) r[h] = o[l];
				return this
			}
			console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", e)
		},
		normalizeNormals: function () {
			for (var e = this.attributes.normal, t = 0, n = e.count; t < n; t++) lt.x = e.getX(t), lt.y = e.getY(t), lt.z = e.getZ(t), lt.normalize(), e.setXYZ(t, lt.x, lt.y, lt.z)
		},
		toNonIndexed: function () {
			function e(e, t) {
				for (var n = e.array, i = e.itemSize, r = new n.constructor(t.length * i), a = 0, o = 0, s = 0, c = t.length; s < c; s++) {
					a = t[s] * i;
					for (var l = 0; l < i; l++) r[o++] = n[a++]
				}
				return new We(r, i)
			}
			if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
			var t = new ht,
				n = this.index.array,
				i = this.attributes;
			for (var r in i) {
				var a = e(i[r], n);
				t.setAttribute(r, a)
			}
			var o = this.morphAttributes;
			for (r in o) {
				for (var s = [], c = o[r], l = 0, h = c.length; l < h; l++) {
					a = e(c[l], n);
					s.push(a)
				}
				t.morphAttributes[r] = s
			}
			t.morphTargetsRelative = this.morphTargetsRelative;
			for (var u = this.groups, p = (l = 0, u.length); l < p; l++) {
				var d = u[l];
				t.addGroup(d.start, d.count, d.materialIndex)
			}
			return t
		},
		toJSON: function () {
			var e = {
				metadata: {
					version: 4.5,
					type: "BufferGeometry",
					generator: "BufferGeometry.toJSON"
				}
			};
			if (e.uuid = this.uuid, e.type = this.type, "" !== this.name && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), void 0 !== this.parameters) {
				var t = this.parameters;
				for (var n in t) void 0 !== t[n] && (e[n] = t[n]);
				return e
			}
			e.data = {
				attributes: {}
			};
			var i = this.index;
			null !== i && (e.data.index = {
				type: i.array.constructor.name,
				array: Array.prototype.slice.call(i.array)
			});
			var r = this.attributes;
			for (var n in r) {
				var a = (p = r[n]).toJSON();
				"" !== p.name && (a.name = p.name), e.data.attributes[n] = a
			}
			var o = {},
				s = !1;
			for (var n in this.morphAttributes) {
				for (var c = this.morphAttributes[n], l = [], h = 0, u = c.length; h < u; h++) {
					var p;
					a = (p = c[h]).toJSON();
					"" !== p.name && (a.name = p.name), l.push(a)
				}
				l.length > 0 && (o[n] = l, s = !0)
			}
			s && (e.data.morphAttributes = o, e.data.morphTargetsRelative = this.morphTargetsRelative);
			var d = this.groups;
			d.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(d)));
			var f = this.boundingSphere;
			return null !== f && (e.data.boundingSphere = {
				center: f.center.toArray(),
				radius: f.radius
			}), e
		},
		clone: function () {
			return (new ht).copy(this)
		},
		copy: function (e) {
			var t, n, i;
			this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.name = e.name;
			var r = e.index;
			null !== r && this.setIndex(r.clone());
			var a = e.attributes;
			for (t in a) {
				var o = a[t];
				this.setAttribute(t, o.clone())
			}
			var s = e.morphAttributes;
			for (t in s) {
				var c = [],
					l = s[t];
				for (n = 0, i = l.length; n < i; n++) c.push(l[n].clone());
				this.morphAttributes[t] = c
			}
			this.morphTargetsRelative = e.morphTargetsRelative;
			var h = e.groups;
			for (n = 0, i = h.length; n < i; n++) {
				var u = h[n];
				this.addGroup(u.start, u.count, u.materialIndex)
			}
			var p = e.boundingBox;
			null !== p && (this.boundingBox = p.clone());
			var d = e.boundingSphere;
			return null !== d && (this.boundingSphere = d.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this
		},
		dispose: function () {
			this.dispatchEvent({
				type: "dispose"
			})
		}
	});
	var ut = new A,
		pt = new ge,
		dt = new le,
		ft = new x,
		mt = new x,
		vt = new x,
		gt = new x,
		yt = new x,
		xt = new x,
		bt = new x,
		wt = new x,
		_t = new x,
		Mt = new c,
		St = new c,
		Tt = new c,
		Et = new x,
		At = new x;

	function Lt(e, t) {
		W.call(this), this.type = "Mesh", this.geometry = void 0 !== e ? e : new ht, this.material = void 0 !== t ? t : new Ve, this.updateMorphTargets()
	}

	function Rt(e, t, n, i, r, a, o, s) {
		if (null === (1 === t.side ? i.intersectTriangle(o, a, r, !0, s) : i.intersectTriangle(r, a, o, 2 !== t.side, s))) return null;
		At.copy(s), At.applyMatrix4(e.matrixWorld);
		var c = n.ray.origin.distanceTo(At);
		return c < n.near || c > n.far ? null : {
			distance: c,
			point: At.clone(),
			object: e
		}
	}

	function Pt(e, t, n, i, r, a, o, s, l, h, u, p) {
		ft.fromBufferAttribute(r, h), mt.fromBufferAttribute(r, u), vt.fromBufferAttribute(r, p);
		var d = e.morphTargetInfluences;
		if (t.morphTargets && a && d) {
			bt.set(0, 0, 0), wt.set(0, 0, 0), _t.set(0, 0, 0);
			for (var f = 0, m = a.length; f < m; f++) {
				var v = d[f],
					g = a[f];
				0 !== v && (gt.fromBufferAttribute(g, h), yt.fromBufferAttribute(g, u), xt.fromBufferAttribute(g, p), o ? (bt.addScaledVector(gt, v), wt.addScaledVector(yt, v), _t.addScaledVector(xt, v)) : (bt.addScaledVector(gt.sub(ft), v), wt.addScaledVector(yt.sub(mt), v), _t.addScaledVector(xt.sub(vt), v)))
			}
			ft.add(bt), mt.add(wt), vt.add(_t)
		}
		var y = Rt(e, t, n, i, ft, mt, vt, Et);
		if (y) {
			s && (Mt.fromBufferAttribute(s, h), St.fromBufferAttribute(s, u), Tt.fromBufferAttribute(s, p), y.uv = Oe.getUV(Et, ft, mt, vt, Mt, St, Tt, new c)), l && (Mt.fromBufferAttribute(l, h), St.fromBufferAttribute(l, u), Tt.fromBufferAttribute(l, p), y.uv2 = Oe.getUV(Et, ft, mt, vt, Mt, St, Tt, new c));
			var x = new He(h, u, p);
			Oe.getNormal(ft, mt, vt, x.normal), y.face = x
		}
		return y
	}
	Lt.prototype = Object.assign(Object.create(W.prototype), {
		constructor: Lt,
		isMesh: !0,
		copy: function (e) {
			return W.prototype.copy.call(this, e), void 0 !== e.morphTargetInfluences && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), void 0 !== e.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this
		},
		updateMorphTargets: function () {
			var e, t, n, i = this.geometry;
			if (i.isBufferGeometry) {
				var r = i.morphAttributes,
					a = Object.keys(r);
				if (a.length > 0) {
					var o = r[a[0]];
					if (void 0 !== o)
						for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, e = 0, t = o.length; e < t; e++) n = o[e].name || String(e), this.morphTargetInfluences.push(0), this.morphTargetDictionary[n] = e
				}
			} else {
				var s = i.morphTargets;
				void 0 !== s && s.length > 0 && console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
			}
		},
		raycast: function (e, t) {
			var n, i = this.geometry,
				r = this.material,
				a = this.matrixWorld;
			if (void 0 !== r && (null === i.boundingSphere && i.computeBoundingSphere(), dt.copy(i.boundingSphere), dt.applyMatrix4(a), !1 !== e.ray.intersectsSphere(dt) && (ut.getInverse(a), pt.copy(e.ray).applyMatrix4(ut), null === i.boundingBox || !1 !== pt.intersectsBox(i.boundingBox))))
				if (i.isBufferGeometry) {
					var o, s, l, h, u, p, d, f, m, v = i.index,
						g = i.attributes.position,
						y = i.morphAttributes.position,
						x = i.morphTargetsRelative,
						b = i.attributes.uv,
						w = i.attributes.uv2,
						_ = i.groups,
						M = i.drawRange;
					if (null !== v)
						if (Array.isArray(r))
							for (h = 0, p = _.length; h < p; h++)
								for (m = r[(f = _[h]).materialIndex], u = Math.max(f.start, M.start), d = Math.min(f.start + f.count, M.start + M.count); u < d; u += 3) o = v.getX(u), s = v.getX(u + 1), l = v.getX(u + 2), (n = Pt(this, m, e, pt, g, y, x, b, w, o, s, l)) && (n.faceIndex = Math.floor(u / 3), n.face.materialIndex = f.materialIndex, t.push(n));
						else
							for (h = Math.max(0, M.start), p = Math.min(v.count, M.start + M.count); h < p; h += 3) o = v.getX(h), s = v.getX(h + 1), l = v.getX(h + 2), (n = Pt(this, r, e, pt, g, y, x, b, w, o, s, l)) && (n.faceIndex = Math.floor(h / 3), t.push(n));
					else if (void 0 !== g)
						if (Array.isArray(r))
							for (h = 0, p = _.length; h < p; h++)
								for (m = r[(f = _[h]).materialIndex], u = Math.max(f.start, M.start), d = Math.min(f.start + f.count, M.start + M.count); u < d; u += 3)(n = Pt(this, m, e, pt, g, y, x, b, w, o = u, s = u + 1, l = u + 2)) && (n.faceIndex = Math.floor(u / 3), n.face.materialIndex = f.materialIndex, t.push(n));
						else
							for (h = Math.max(0, M.start), p = Math.min(g.count, M.start + M.count); h < p; h += 3)(n = Pt(this, r, e, pt, g, y, x, b, w, o = h, s = h + 1, l = h + 2)) && (n.faceIndex = Math.floor(h / 3), t.push(n))
				} else if (i.isGeometry) {
				var S, T, E, A, L = Array.isArray(r),
					R = i.vertices,
					P = i.faces,
					C = i.faceVertexUvs[0];
				C.length > 0 && (A = C);
				for (var O = 0, D = P.length; O < D; O++) {
					var I = P[O],
						N = L ? r[I.materialIndex] : r;
					if (void 0 !== N && (S = R[I.a], T = R[I.b], E = R[I.c], n = Rt(this, N, e, pt, S, T, E, Et))) {
						if (A && A[O]) {
							var U = A[O];
							Mt.copy(U[0]), St.copy(U[1]), Tt.copy(U[2]), n.uv = Oe.getUV(Et, S, T, E, Mt, St, Tt, new c)
						}
						n.face = I, n.faceIndex = O, t.push(n)
					}
				}
			}
		},
		clone: function () {
			return new this.constructor(this.geometry, this.material).copy(this)
		}
	});
	var Ct = 0,
		Ot = new A,
		Dt = new W,
		It = new x;

	function Nt() {
		Object.defineProperty(this, "id", {
			value: Ct += 2
		}), this.uuid = s.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
			[]
		], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.elementsNeedUpdate = !1, this.verticesNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1
	}
	Nt.prototype = Object.assign(Object.create(i.prototype), {
		constructor: Nt,
		isGeometry: !0,
		applyMatrix4: function (e) {
			for (var t = (new l).getNormalMatrix(e), n = 0, i = this.vertices.length; n < i; n++) {
				this.vertices[n].applyMatrix4(e)
			}
			for (n = 0, i = this.faces.length; n < i; n++) {
				var r = this.faces[n];
				r.normal.applyMatrix3(t).normalize();
				for (var a = 0, o = r.vertexNormals.length; a < o; a++) r.vertexNormals[a].applyMatrix3(t).normalize()
			}
			return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0, this
		},
		rotateX: function (e) {
			return Ot.makeRotationX(e), this.applyMatrix4(Ot), this
		},
		rotateY: function (e) {
			return Ot.makeRotationY(e), this.applyMatrix4(Ot), this
		},
		rotateZ: function (e) {
			return Ot.makeRotationZ(e), this.applyMatrix4(Ot), this
		},
		translate: function (e, t, n) {
			return Ot.makeTranslation(e, t, n), this.applyMatrix4(Ot), this
		},
		scale: function (e, t, n) {
			return Ot.makeScale(e, t, n), this.applyMatrix4(Ot), this
		},
		lookAt: function (e) {
			return Dt.lookAt(e), Dt.updateMatrix(), this.applyMatrix4(Dt.matrix), this
		},
		fromBufferGeometry: function (e) {
			var t = this,
				n = null !== e.index ? e.index.array : void 0,
				i = e.attributes;
			if (void 0 === i.position) return console.error("THREE.Geometry.fromBufferGeometry(): Position attribute required for conversion."), this;
			var r = i.position.array,
				a = void 0 !== i.normal ? i.normal.array : void 0,
				o = void 0 !== i.color ? i.color.array : void 0,
				s = void 0 !== i.uv ? i.uv.array : void 0,
				l = void 0 !== i.uv2 ? i.uv2.array : void 0;
			void 0 !== l && (this.faceVertexUvs[1] = []);
			for (var h = 0; h < r.length; h += 3) t.vertices.push((new x).fromArray(r, h)), void 0 !== o && t.colors.push((new Ue).fromArray(o, h));

			function u(e, n, i, r) {
				var h = void 0 === o ? [] : [t.colors[e].clone(), t.colors[n].clone(), t.colors[i].clone()],
					u = new He(e, n, i, void 0 === a ? [] : [(new x).fromArray(a, 3 * e), (new x).fromArray(a, 3 * n), (new x).fromArray(a, 3 * i)], h, r);
				t.faces.push(u), void 0 !== s && t.faceVertexUvs[0].push([(new c).fromArray(s, 2 * e), (new c).fromArray(s, 2 * n), (new c).fromArray(s, 2 * i)]), void 0 !== l && t.faceVertexUvs[1].push([(new c).fromArray(l, 2 * e), (new c).fromArray(l, 2 * n), (new c).fromArray(l, 2 * i)])
			}
			var p = e.groups;
			if (p.length > 0)
				for (h = 0; h < p.length; h++)
					for (var d = p[h], f = d.start, m = f, v = f + d.count; m < v; m += 3) void 0 !== n ? u(n[m], n[m + 1], n[m + 2], d.materialIndex) : u(m, m + 1, m + 2, d.materialIndex);
			else if (void 0 !== n)
				for (h = 0; h < n.length; h += 3) u(n[h], n[h + 1], n[h + 2]);
			else
				for (h = 0; h < r.length / 3; h += 3) u(h, h + 1, h + 2);
			return this.computeFaceNormals(), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), this
		},
		center: function () {
			return this.computeBoundingBox(), this.boundingBox.getCenter(It).negate(), this.translate(It.x, It.y, It.z), this
		},
		normalize: function () {
			this.computeBoundingSphere();
			var e = this.boundingSphere.center,
				t = this.boundingSphere.radius,
				n = 0 === t ? 1 : 1 / t,
				i = new A;
			return i.set(n, 0, 0, -n * e.x, 0, n, 0, -n * e.y, 0, 0, n, -n * e.z, 0, 0, 0, 1), this.applyMatrix4(i), this
		},
		computeFaceNormals: function () {
			for (var e = new x, t = new x, n = 0, i = this.faces.length; n < i; n++) {
				var r = this.faces[n],
					a = this.vertices[r.a],
					o = this.vertices[r.b],
					s = this.vertices[r.c];
				e.subVectors(s, o), t.subVectors(a, o), e.cross(t), e.normalize(), r.normal.copy(e)
			}
		},
		computeVertexNormals: function (e) {
			var t, n, i, r, a, o;
			for (void 0 === e && (e = !0), o = new Array(this.vertices.length), t = 0, n = this.vertices.length; t < n; t++) o[t] = new x;
			if (e) {
				var s, c, l, h = new x,
					u = new x;
				for (i = 0, r = this.faces.length; i < r; i++) a = this.faces[i], s = this.vertices[a.a], c = this.vertices[a.b], l = this.vertices[a.c], h.subVectors(l, c), u.subVectors(s, c), h.cross(u), o[a.a].add(h), o[a.b].add(h), o[a.c].add(h)
			} else
				for (this.computeFaceNormals(), i = 0, r = this.faces.length; i < r; i++) o[(a = this.faces[i]).a].add(a.normal), o[a.b].add(a.normal), o[a.c].add(a.normal);
			for (t = 0, n = this.vertices.length; t < n; t++) o[t].normalize();
			for (i = 0, r = this.faces.length; i < r; i++) {
				var p = (a = this.faces[i]).vertexNormals;
				3 === p.length ? (p[0].copy(o[a.a]), p[1].copy(o[a.b]), p[2].copy(o[a.c])) : (p[0] = o[a.a].clone(), p[1] = o[a.b].clone(), p[2] = o[a.c].clone())
			}
			this.faces.length > 0 && (this.normalsNeedUpdate = !0)
		},
		computeFlatVertexNormals: function () {
			var e, t, n;
			for (this.computeFaceNormals(), e = 0, t = this.faces.length; e < t; e++) {
				var i = (n = this.faces[e]).vertexNormals;
				3 === i.length ? (i[0].copy(n.normal), i[1].copy(n.normal), i[2].copy(n.normal)) : (i[0] = n.normal.clone(), i[1] = n.normal.clone(), i[2] = n.normal.clone())
			}
			this.faces.length > 0 && (this.normalsNeedUpdate = !0)
		},
		computeMorphNormals: function () {
			var e, t, n, i, r;
			for (n = 0, i = this.faces.length; n < i; n++)
				for ((r = this.faces[n]).__originalFaceNormal ? r.__originalFaceNormal.copy(r.normal) : r.__originalFaceNormal = r.normal.clone(), r.__originalVertexNormals || (r.__originalVertexNormals = []), e = 0, t = r.vertexNormals.length; e < t; e++) r.__originalVertexNormals[e] ? r.__originalVertexNormals[e].copy(r.vertexNormals[e]) : r.__originalVertexNormals[e] = r.vertexNormals[e].clone();
			var a = new Nt;
			for (a.faces = this.faces, e = 0, t = this.morphTargets.length; e < t; e++) {
				if (!this.morphNormals[e]) {
					this.morphNormals[e] = {}, this.morphNormals[e].faceNormals = [], this.morphNormals[e].vertexNormals = [];
					var o = this.morphNormals[e].faceNormals,
						s = this.morphNormals[e].vertexNormals;
					for (n = 0, i = this.faces.length; n < i; n++) c = new x, l = {
						a: new x,
						b: new x,
						c: new x
					}, o.push(c), s.push(l)
				}
				var c, l, h = this.morphNormals[e];
				for (a.vertices = this.morphTargets[e].vertices, a.computeFaceNormals(), a.computeVertexNormals(), n = 0, i = this.faces.length; n < i; n++) r = this.faces[n], c = h.faceNormals[n], l = h.vertexNormals[n], c.copy(r.normal), l.a.copy(r.vertexNormals[0]), l.b.copy(r.vertexNormals[1]), l.c.copy(r.vertexNormals[2])
			}
			for (n = 0, i = this.faces.length; n < i; n++)(r = this.faces[n]).normal = r.__originalFaceNormal, r.vertexNormals = r.__originalVertexNormals
		},
		computeBoundingBox: function () {
			null === this.boundingBox && (this.boundingBox = new oe), this.boundingBox.setFromPoints(this.vertices)
		},
		computeBoundingSphere: function () {
			null === this.boundingSphere && (this.boundingSphere = new le), this.boundingSphere.setFromPoints(this.vertices)
		},
		merge: function (e, t, n) {
			if (e && e.isGeometry) {
				var i, r = this.vertices.length,
					a = this.vertices,
					o = e.vertices,
					s = this.faces,
					c = e.faces,
					h = this.colors,
					u = e.colors;
				void 0 === n && (n = 0), void 0 !== t && (i = (new l).getNormalMatrix(t));
				for (var p = 0, d = o.length; p < d; p++) {
					var f = o[p].clone();
					void 0 !== t && f.applyMatrix4(t), a.push(f)
				}
				for (p = 0, d = u.length; p < d; p++) h.push(u[p].clone());
				for (p = 0, d = c.length; p < d; p++) {
					var m, v, g, y = c[p],
						x = y.vertexNormals,
						b = y.vertexColors;
					(m = new He(y.a + r, y.b + r, y.c + r)).normal.copy(y.normal), void 0 !== i && m.normal.applyMatrix3(i).normalize();
					for (var w = 0, _ = x.length; w < _; w++) v = x[w].clone(), void 0 !== i && v.applyMatrix3(i).normalize(), m.vertexNormals.push(v);
					m.color.copy(y.color);
					for (w = 0, _ = b.length; w < _; w++) g = b[w], m.vertexColors.push(g.clone());
					m.materialIndex = y.materialIndex + n, s.push(m)
				}
				for (p = 0, d = e.faceVertexUvs.length; p < d; p++) {
					var M = e.faceVertexUvs[p];
					void 0 === this.faceVertexUvs[p] && (this.faceVertexUvs[p] = []);
					for (w = 0, _ = M.length; w < _; w++) {
						for (var S = M[w], T = [], E = 0, A = S.length; E < A; E++) T.push(S[E].clone());
						this.faceVertexUvs[p].push(T)
					}
				}
			} else console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", e)
		},
		mergeMesh: function (e) {
			e && e.isMesh ? (e.matrixAutoUpdate && e.updateMatrix(), this.merge(e.geometry, e.matrix)) : console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", e)
		},
		mergeVertices: function () {
			var e, t, n, i, r, a, o, s, c = {},
				l = [],
				h = [],
				u = Math.pow(10, 4);
			for (n = 0, i = this.vertices.length; n < i; n++) e = this.vertices[n], void 0 === c[t = Math.round(e.x * u) + "_" + Math.round(e.y * u) + "_" + Math.round(e.z * u)] ? (c[t] = n, l.push(this.vertices[n]), h[n] = l.length - 1) : h[n] = h[c[t]];
			var p = [];
			for (n = 0, i = this.faces.length; n < i; n++) {
				(r = this.faces[n]).a = h[r.a], r.b = h[r.b], r.c = h[r.c], a = [r.a, r.b, r.c];
				for (var d = 0; d < 3; d++)
					if (a[d] === a[(d + 1) % 3]) {
						p.push(n);
						break
					}
			}
			for (n = p.length - 1; n >= 0; n--) {
				var f = p[n];
				for (this.faces.splice(f, 1), o = 0, s = this.faceVertexUvs.length; o < s; o++) this.faceVertexUvs[o].splice(f, 1)
			}
			var m = this.vertices.length - l.length;
			return this.vertices = l, m
		},
		setFromPoints: function (e) {
			this.vertices = [];
			for (var t = 0, n = e.length; t < n; t++) {
				var i = e[t];
				this.vertices.push(new x(i.x, i.y, i.z || 0))
			}
			return this
		},
		sortFacesByMaterialIndex: function () {
			for (var e = this.faces, t = e.length, n = 0; n < t; n++) e[n]._id = n;
			e.sort((function (e, t) {
				return e.materialIndex - t.materialIndex
			}));
			var i, r, a = this.faceVertexUvs[0],
				o = this.faceVertexUvs[1];
			a && a.length === t && (i = []), o && o.length === t && (r = []);
			for (n = 0; n < t; n++) {
				var s = e[n]._id;
				i && i.push(a[s]), r && r.push(o[s])
			}
			i && (this.faceVertexUvs[0] = i), r && (this.faceVertexUvs[1] = r)
		},
		toJSON: function () {
			var e = {
				metadata: {
					version: 4.5,
					type: "Geometry",
					generator: "Geometry.toJSON"
				}
			};
			if (e.uuid = this.uuid, e.type = this.type, "" !== this.name && (e.name = this.name), void 0 !== this.parameters) {
				var t = this.parameters;
				for (var n in t) void 0 !== t[n] && (e[n] = t[n]);
				return e
			}
			for (var i = [], r = 0; r < this.vertices.length; r++) {
				var a = this.vertices[r];
				i.push(a.x, a.y, a.z)
			}
			var o = [],
				s = [],
				c = {},
				l = [],
				h = {},
				u = [],
				p = {};
			for (r = 0; r < this.faces.length; r++) {
				var d = this.faces[r],
					f = void 0 !== this.faceVertexUvs[0][r],
					m = d.normal.length() > 0,
					v = d.vertexNormals.length > 0,
					g = 1 !== d.color.r || 1 !== d.color.g || 1 !== d.color.b,
					y = d.vertexColors.length > 0,
					x = 0;
				if (x = M(x, 0, 0), x = M(x, 1, !0), x = M(x, 2, !1), x = M(x, 3, f), x = M(x, 4, m), x = M(x, 5, v), x = M(x, 6, g), x = M(x, 7, y), o.push(x), o.push(d.a, d.b, d.c), o.push(d.materialIndex), f) {
					var b = this.faceVertexUvs[0][r];
					o.push(E(b[0]), E(b[1]), E(b[2]))
				}
				if (m && o.push(S(d.normal)), v) {
					var w = d.vertexNormals;
					o.push(S(w[0]), S(w[1]), S(w[2]))
				}
				if (g && o.push(T(d.color)), y) {
					var _ = d.vertexColors;
					o.push(T(_[0]), T(_[1]), T(_[2]))
				}
			}

			function M(e, t, n) {
				return n ? e | 1 << t : e & ~(1 << t)
			}

			function S(e) {
				var t = e.x.toString() + e.y.toString() + e.z.toString();
				return void 0 !== c[t] || (c[t] = s.length / 3, s.push(e.x, e.y, e.z)), c[t]
			}

			function T(e) {
				var t = e.r.toString() + e.g.toString() + e.b.toString();
				return void 0 !== h[t] || (h[t] = l.length, l.push(e.getHex())), h[t]
			}

			function E(e) {
				var t = e.x.toString() + e.y.toString();
				return void 0 !== p[t] || (p[t] = u.length / 2, u.push(e.x, e.y)), p[t]
			}
			return e.data = {}, e.data.vertices = i, e.data.normals = s, l.length > 0 && (e.data.colors = l), u.length > 0 && (e.data.uvs = [u]), e.data.faces = o, e
		},
		clone: function () {
			return (new Nt).copy(this)
		},
		copy: function (e) {
			var t, n, i, r, a, o;
			this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
				[]
			], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.name = e.name;
			var s = e.vertices;
			for (t = 0, n = s.length; t < n; t++) this.vertices.push(s[t].clone());
			var c = e.colors;
			for (t = 0, n = c.length; t < n; t++) this.colors.push(c[t].clone());
			var l = e.faces;
			for (t = 0, n = l.length; t < n; t++) this.faces.push(l[t].clone());
			for (t = 0, n = e.faceVertexUvs.length; t < n; t++) {
				var h = e.faceVertexUvs[t];
				for (void 0 === this.faceVertexUvs[t] && (this.faceVertexUvs[t] = []), i = 0, r = h.length; i < r; i++) {
					var u = h[i],
						p = [];
					for (a = 0, o = u.length; a < o; a++) {
						var d = u[a];
						p.push(d.clone())
					}
					this.faceVertexUvs[t].push(p)
				}
			}
			var f = e.morphTargets;
			for (t = 0, n = f.length; t < n; t++) {
				var m = {};
				if (m.name = f[t].name, void 0 !== f[t].vertices)
					for (m.vertices = [], i = 0, r = f[t].vertices.length; i < r; i++) m.vertices.push(f[t].vertices[i].clone());
				if (void 0 !== f[t].normals)
					for (m.normals = [], i = 0, r = f[t].normals.length; i < r; i++) m.normals.push(f[t].normals[i].clone());
				this.morphTargets.push(m)
			}
			var v = e.morphNormals;
			for (t = 0, n = v.length; t < n; t++) {
				var g = {};
				if (void 0 !== v[t].vertexNormals)
					for (g.vertexNormals = [], i = 0, r = v[t].vertexNormals.length; i < r; i++) {
						var y = v[t].vertexNormals[i],
							x = {};
						x.a = y.a.clone(), x.b = y.b.clone(), x.c = y.c.clone(), g.vertexNormals.push(x)
					}
				if (void 0 !== v[t].faceNormals)
					for (g.faceNormals = [], i = 0, r = v[t].faceNormals.length; i < r; i++) g.faceNormals.push(v[t].faceNormals[i].clone());
				this.morphNormals.push(g)
			}
			var b = e.skinWeights;
			for (t = 0, n = b.length; t < n; t++) this.skinWeights.push(b[t].clone());
			var w = e.skinIndices;
			for (t = 0, n = w.length; t < n; t++) this.skinIndices.push(w[t].clone());
			var _ = e.lineDistances;
			for (t = 0, n = _.length; t < n; t++) this.lineDistances.push(_[t]);
			var M = e.boundingBox;
			null !== M && (this.boundingBox = M.clone());
			var S = e.boundingSphere;
			return null !== S && (this.boundingSphere = S.clone()), this.elementsNeedUpdate = e.elementsNeedUpdate, this.verticesNeedUpdate = e.verticesNeedUpdate, this.uvsNeedUpdate = e.uvsNeedUpdate, this.normalsNeedUpdate = e.normalsNeedUpdate, this.colorsNeedUpdate = e.colorsNeedUpdate, this.lineDistancesNeedUpdate = e.lineDistancesNeedUpdate, this.groupsNeedUpdate = e.groupsNeedUpdate, this
		},
		dispose: function () {
			this.dispatchEvent({
				type: "dispose"
			})
		}
	});
	class Ut extends Nt {
		constructor(e, t, n, i, r, a) {
			super(), this.type = "BoxGeometry", this.parameters = {
				width: e,
				height: t,
				depth: n,
				widthSegments: i,
				heightSegments: r,
				depthSegments: a
			}, this.fromBufferGeometry(new zt(e, t, n, i, r, a)), this.mergeVertices()
		}
	}
	class zt extends ht {
		constructor(e, t, n, i, r, a) {
			super(), this.type = "BoxBufferGeometry", this.parameters = {
				width: e,
				height: t,
				depth: n,
				widthSegments: i,
				heightSegments: r,
				depthSegments: a
			};
			var o = this;
			e = e || 1, t = t || 1, n = n || 1, i = Math.floor(i) || 1, r = Math.floor(r) || 1, a = Math.floor(a) || 1;
			var s = [],
				c = [],
				l = [],
				h = [],
				u = 0,
				p = 0;

			function d(e, t, n, i, r, a, d, f, m, v, g) {
				var y, b, w = a / m,
					_ = d / v,
					M = a / 2,
					S = d / 2,
					T = f / 2,
					E = m + 1,
					A = v + 1,
					L = 0,
					R = 0,
					P = new x;
				for (b = 0; b < A; b++) {
					var C = b * _ - S;
					for (y = 0; y < E; y++) {
						var O = y * w - M;
						P[e] = O * i, P[t] = C * r, P[n] = T, c.push(P.x, P.y, P.z), P[e] = 0, P[t] = 0, P[n] = f > 0 ? 1 : -1, l.push(P.x, P.y, P.z), h.push(y / m), h.push(1 - b / v), L += 1
					}
				}
				for (b = 0; b < v; b++)
					for (y = 0; y < m; y++) {
						var D = u + y + E * b,
							I = u + y + E * (b + 1),
							N = u + (y + 1) + E * (b + 1),
							U = u + (y + 1) + E * b;
						s.push(D, I, U), s.push(I, N, U), R += 6
					}
				o.addGroup(p, R, g), p += R, u += L
			}
			d("z", "y", "x", -1, -1, n, t, e, a, r, 0), d("z", "y", "x", 1, -1, n, t, -e, a, r, 1), d("x", "z", "y", 1, 1, e, n, t, i, a, 2), d("x", "z", "y", 1, -1, e, n, -t, i, a, 3), d("x", "y", "z", 1, -1, e, t, n, i, r, 4), d("x", "y", "z", -1, -1, e, t, -n, i, r, 5), this.setIndex(s), this.setAttribute("position", new $e(c, 3)), this.setAttribute("normal", new $e(l, 3)), this.setAttribute("uv", new $e(h, 2))
		}
	}

	function Ft(e) {
		var t = {};
		for (var n in e)
			for (var i in t[n] = {}, e[n]) {
				var r = e[n][i];
				r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture) ? t[n][i] = r.clone() : Array.isArray(r) ? t[n][i] = r.slice() : t[n][i] = r
			}
		return t
	}

	function Bt(e) {
		for (var t = {}, n = 0; n < e.length; n++) {
			var i = Ft(e[n]);
			for (var r in i) t[r] = i[r]
		}
		return t
	}
	var Ht = {
		clone: Ft,
		merge: Bt
	};

	function Gt(e) {
		ke.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.extensions = {
			derivatives: !1,
			fragDepth: !1,
			drawBuffers: !1,
			shaderTextureLOD: !1
		}, this.defaultAttributeValues = {
			color: [1, 1, 1],
			uv: [0, 0],
			uv2: [0, 0]
		}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, void 0 !== e && (void 0 !== e.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(e))
	}

	function kt() {
		W.call(this), this.type = "Camera", this.matrixWorldInverse = new A, this.projectionMatrix = new A, this.projectionMatrixInverse = new A
	}

	function Vt(e, t, n, i) {
		kt.call(this), this.type = "PerspectiveCamera", this.fov = void 0 !== e ? e : 50, this.zoom = 1, this.near = void 0 !== n ? n : .1, this.far = void 0 !== i ? i : 2e3, this.focus = 10, this.aspect = void 0 !== t ? t : 1, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
	}
	Gt.prototype = Object.create(ke.prototype), Gt.prototype.constructor = Gt, Gt.prototype.isShaderMaterial = !0, Gt.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Ft(e.uniforms), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.lights = e.lights, this.clipping = e.clipping, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this.extensions = e.extensions, this
	}, Gt.prototype.toJSON = function (e) {
		var t = ke.prototype.toJSON.call(this, e);
		for (var n in t.uniforms = {}, this.uniforms) {
			var i = this.uniforms[n].value;
			i && i.isTexture ? t.uniforms[n] = {
				type: "t",
				value: i.toJSON(e).uuid
			} : i && i.isColor ? t.uniforms[n] = {
				type: "c",
				value: i.getHex()
			} : i && i.isVector2 ? t.uniforms[n] = {
				type: "v2",
				value: i.toArray()
			} : i && i.isVector3 ? t.uniforms[n] = {
				type: "v3",
				value: i.toArray()
			} : i && i.isVector4 ? t.uniforms[n] = {
				type: "v4",
				value: i.toArray()
			} : i && i.isMatrix3 ? t.uniforms[n] = {
				type: "m3",
				value: i.toArray()
			} : i && i.isMatrix4 ? t.uniforms[n] = {
				type: "m4",
				value: i.toArray()
			} : t.uniforms[n] = {
				value: i
			}
		}
		Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader;
		var r = {};
		for (var a in this.extensions) !0 === this.extensions[a] && (r[a] = !0);
		return Object.keys(r).length > 0 && (t.extensions = r), t
	}, kt.prototype = Object.assign(Object.create(W.prototype), {
		constructor: kt,
		isCamera: !0,
		copy: function (e, t) {
			return W.prototype.copy.call(this, e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this
		},
		getWorldDirection: function (e) {
			void 0 === e && (console.warn("THREE.Camera: .getWorldDirection() target is now required"), e = new x), this.updateMatrixWorld(!0);
			var t = this.matrixWorld.elements;
			return e.set(-t[8], -t[9], -t[10]).normalize()
		},
		updateMatrixWorld: function (e) {
			W.prototype.updateMatrixWorld.call(this, e), this.matrixWorldInverse.getInverse(this.matrixWorld)
		},
		updateWorldMatrix: function (e, t) {
			W.prototype.updateWorldMatrix.call(this, e, t), this.matrixWorldInverse.getInverse(this.matrixWorld)
		},
		clone: function () {
			return (new this.constructor).copy(this)
		}
	}), Vt.prototype = Object.assign(Object.create(kt.prototype), {
		constructor: Vt,
		isPerspectiveCamera: !0,
		copy: function (e, t) {
			return kt.prototype.copy.call(this, e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = null === e.view ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this
		},
		setFocalLength: function (e) {
			var t = .5 * this.getFilmHeight() / e;
			this.fov = 2 * s.RAD2DEG * Math.atan(t), this.updateProjectionMatrix()
		},
		getFocalLength: function () {
			var e = Math.tan(.5 * s.DEG2RAD * this.fov);
			return .5 * this.getFilmHeight() / e
		},
		getEffectiveFOV: function () {
			return 2 * s.RAD2DEG * Math.atan(Math.tan(.5 * s.DEG2RAD * this.fov) / this.zoom)
		},
		getFilmWidth: function () {
			return this.filmGauge * Math.min(this.aspect, 1)
		},
		getFilmHeight: function () {
			return this.filmGauge / Math.max(this.aspect, 1)
		},
		setViewOffset: function (e, t, n, i, r, a) {
			this.aspect = e / t, null === this.view && (this.view = {
				enabled: !0,
				fullWidth: 1,
				fullHeight: 1,
				offsetX: 0,
				offsetY: 0,
				width: 1,
				height: 1
			}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = a, this.updateProjectionMatrix()
		},
		clearViewOffset: function () {
			null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
		},
		updateProjectionMatrix: function () {
			var e = this.near,
				t = e * Math.tan(.5 * s.DEG2RAD * this.fov) / this.zoom,
				n = 2 * t,
				i = this.aspect * n,
				r = -.5 * i,
				a = this.view;
			if (null !== this.view && this.view.enabled) {
				var o = a.fullWidth,
					c = a.fullHeight;
				r += a.offsetX * i / o, t -= a.offsetY * n / c, i *= a.width / o, n *= a.height / c
			}
			var l = this.filmOffset;
			0 !== l && (r += e * l / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + i, t, t - n, e, this.far), this.projectionMatrixInverse.getInverse(this.projectionMatrix)
		},
		toJSON: function (e) {
			var t = W.prototype.toJSON.call(this, e);
			return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, null !== this.view && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t
		}
	});

	function jt(e, t, n, i) {
		W.call(this), this.type = "CubeCamera";
		var r = new Vt(90, 1, e, t);
		r.up.set(0, -1, 0), r.lookAt(new x(1, 0, 0)), this.add(r);
		var a = new Vt(90, 1, e, t);
		a.up.set(0, -1, 0), a.lookAt(new x(-1, 0, 0)), this.add(a);
		var o = new Vt(90, 1, e, t);
		o.up.set(0, 0, 1), o.lookAt(new x(0, 1, 0)), this.add(o);
		var s = new Vt(90, 1, e, t);
		s.up.set(0, 0, -1), s.lookAt(new x(0, -1, 0)), this.add(s);
		var c = new Vt(90, 1, e, t);
		c.up.set(0, -1, 0), c.lookAt(new x(0, 0, 1)), this.add(c);
		var l = new Vt(90, 1, e, t);
		l.up.set(0, -1, 0), l.lookAt(new x(0, 0, -1)), this.add(l), i = i || {
			format: 1022,
			magFilter: 1006,
			minFilter: 1006
		}, this.renderTarget = new Wt(n, i), this.renderTarget.texture.name = "CubeCamera", this.update = function (e, t) {
			null === this.parent && this.updateMatrixWorld();
			var n = e.getRenderTarget(),
				i = this.renderTarget,
				h = i.texture.generateMipmaps;
			i.texture.generateMipmaps = !1, e.setRenderTarget(i, 0), e.render(t, r), e.setRenderTarget(i, 1), e.render(t, a), e.setRenderTarget(i, 2), e.render(t, o), e.setRenderTarget(i, 3), e.render(t, s), e.setRenderTarget(i, 4), e.render(t, c), i.texture.generateMipmaps = h, e.setRenderTarget(i, 5), e.render(t, l), e.setRenderTarget(n)
		}, this.clear = function (e, t, n, i) {
			for (var r = e.getRenderTarget(), a = this.renderTarget, o = 0; o < 6; o++) e.setRenderTarget(a, o), e.clear(t, n, i);
			e.setRenderTarget(r)
		}
	}

	function Wt(e, t, n) {
		Number.isInteger(t) && (console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"), t = n), f.call(this, e, e, t)
	}

	function qt(e, t, n, i, r, a, o, s, c, l, h, u) {
		p.call(this, null, a, o, s, c, l, i, r, h, u), this.image = {
			data: e || null,
			width: t || 1,
			height: n || 1
		}, this.magFilter = void 0 !== c ? c : 1003, this.minFilter = void 0 !== l ? l : 1003, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0
	}
	jt.prototype = Object.create(W.prototype), jt.prototype.constructor = jt, Wt.prototype = Object.create(f.prototype), Wt.prototype.constructor = Wt, Wt.prototype.isWebGLCubeRenderTarget = !0, Wt.prototype.fromEquirectangularTexture = function (e, t) {
		this.texture.type = t.type, this.texture.format = t.format, this.texture.encoding = t.encoding;
		var n = new q,
			i = {
				uniforms: {
					tEquirect: {
						value: null
					}
				},
				vertexShader: ["varying vec3 vWorldDirection;", "vec3 transformDirection( in vec3 dir, in mat4 matrix ) {", "\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );", "}", "void main() {", "\tvWorldDirection = transformDirection( position, modelMatrix );", "\t#include <begin_vertex>", "\t#include <project_vertex>", "}"].join("\n"),
				fragmentShader: ["uniform sampler2D tEquirect;", "varying vec3 vWorldDirection;", "#define RECIPROCAL_PI 0.31830988618", "#define RECIPROCAL_PI2 0.15915494", "void main() {", "\tvec3 direction = normalize( vWorldDirection );", "\tvec2 sampleUV;", "\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;", "\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;", "\tgl_FragColor = texture2D( tEquirect, sampleUV );", "}"].join("\n")
			},
			r = new Gt({
				type: "CubemapFromEquirect",
				uniforms: Ft(i.uniforms),
				vertexShader: i.vertexShader,
				fragmentShader: i.fragmentShader,
				side: 1,
				blending: 0
			});
		r.uniforms.tEquirect.value = t;
		var a = new Lt(new zt(5, 5, 5), r);
		n.add(a);
		var o = new jt(1, 10, 1);
		return o.renderTarget = this, o.renderTarget.texture.name = "CubeCameraTexture", o.update(e, n), a.geometry.dispose(), a.material.dispose(), this
	}, qt.prototype = Object.create(p.prototype), qt.prototype.constructor = qt, qt.prototype.isDataTexture = !0;
	var Xt = new le,
		Yt = new x;

	function Zt(e, t, n, i, r, a) {
		this.planes = [void 0 !== e ? e : new we, void 0 !== t ? t : new we, void 0 !== n ? n : new we, void 0 !== i ? i : new we, void 0 !== r ? r : new we, void 0 !== a ? a : new we]
	}
	Object.assign(Zt.prototype, {
		set: function (e, t, n, i, r, a) {
			var o = this.planes;
			return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(i), o[4].copy(r), o[5].copy(a), this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			for (var t = this.planes, n = 0; n < 6; n++) t[n].copy(e.planes[n]);
			return this
		},
		setFromProjectionMatrix: function (e) {
			var t = this.planes,
				n = e.elements,
				i = n[0],
				r = n[1],
				a = n[2],
				o = n[3],
				s = n[4],
				c = n[5],
				l = n[6],
				h = n[7],
				u = n[8],
				p = n[9],
				d = n[10],
				f = n[11],
				m = n[12],
				v = n[13],
				g = n[14],
				y = n[15];
			return t[0].setComponents(o - i, h - s, f - u, y - m).normalize(), t[1].setComponents(o + i, h + s, f + u, y + m).normalize(), t[2].setComponents(o + r, h + c, f + p, y + v).normalize(), t[3].setComponents(o - r, h - c, f - p, y - v).normalize(), t[4].setComponents(o - a, h - l, f - d, y - g).normalize(), t[5].setComponents(o + a, h + l, f + d, y + g).normalize(), this
		},
		intersectsObject: function (e) {
			var t = e.geometry;
			return null === t.boundingSphere && t.computeBoundingSphere(), Xt.copy(t.boundingSphere).applyMatrix4(e.matrixWorld), this.intersectsSphere(Xt)
		},
		intersectsSprite: function (e) {
			return Xt.center.set(0, 0, 0), Xt.radius = .7071067811865476, Xt.applyMatrix4(e.matrixWorld), this.intersectsSphere(Xt)
		},
		intersectsSphere: function (e) {
			for (var t = this.planes, n = e.center, i = -e.radius, r = 0; r < 6; r++) {
				if (t[r].distanceToPoint(n) < i) return !1
			}
			return !0
		},
		intersectsBox: function (e) {
			for (var t = this.planes, n = 0; n < 6; n++) {
				var i = t[n];
				if (Yt.x = i.normal.x > 0 ? e.max.x : e.min.x, Yt.y = i.normal.y > 0 ? e.max.y : e.min.y, Yt.z = i.normal.z > 0 ? e.max.z : e.min.z, i.distanceToPoint(Yt) < 0) return !1
			}
			return !0
		},
		containsPoint: function (e) {
			for (var t = this.planes, n = 0; n < 6; n++)
				if (t[n].distanceToPoint(e) < 0) return !1;
			return !0
		}
	});
	var Jt = {
		common: {
			diffuse: {
				value: new Ue(15658734)
			},
			opacity: {
				value: 1
			},
			map: {
				value: null
			},
			uvTransform: {
				value: new l
			},
			uv2Transform: {
				value: new l
			},
			alphaMap: {
				value: null
			}
		},
		specularmap: {
			specularMap: {
				value: null
			}
		},
		envmap: {
			envMap: {
				value: null
			},
			flipEnvMap: {
				value: -1
			},
			reflectivity: {
				value: 1
			},
			refractionRatio: {
				value: .98
			},
			maxMipLevel: {
				value: 0
			}
		},
		aomap: {
			aoMap: {
				value: null
			},
			aoMapIntensity: {
				value: 1
			}
		},
		lightmap: {
			lightMap: {
				value: null
			},
			lightMapIntensity: {
				value: 1
			}
		},
		emissivemap: {
			emissiveMap: {
				value: null
			}
		},
		bumpmap: {
			bumpMap: {
				value: null
			},
			bumpScale: {
				value: 1
			}
		},
		normalmap: {
			normalMap: {
				value: null
			},
			normalScale: {
				value: new c(1, 1)
			}
		},
		displacementmap: {
			displacementMap: {
				value: null
			},
			displacementScale: {
				value: 1
			},
			displacementBias: {
				value: 0
			}
		},
		roughnessmap: {
			roughnessMap: {
				value: null
			}
		},
		metalnessmap: {
			metalnessMap: {
				value: null
			}
		},
		gradientmap: {
			gradientMap: {
				value: null
			}
		},
		fog: {
			fogDensity: {
				value: 25e-5
			},
			fogNear: {
				value: 1
			},
			fogFar: {
				value: 2e3
			},
			fogColor: {
				value: new Ue(16777215)
			}
		},
		lights: {
			ambientLightColor: {
				value: []
			},
			lightProbe: {
				value: []
			},
			directionalLights: {
				value: [],
				properties: {
					direction: {},
					color: {}
				}
			},
			directionalLightShadows: {
				value: [],
				properties: {
					shadowBias: {},
					shadowRadius: {},
					shadowMapSize: {}
				}
			},
			directionalShadowMap: {
				value: []
			},
			directionalShadowMatrix: {
				value: []
			},
			spotLights: {
				value: [],
				properties: {
					color: {},
					position: {},
					direction: {},
					distance: {},
					coneCos: {},
					penumbraCos: {},
					decay: {}
				}
			},
			spotLightShadows: {
				value: [],
				properties: {
					shadowBias: {},
					shadowRadius: {},
					shadowMapSize: {}
				}
			},
			spotShadowMap: {
				value: []
			},
			spotShadowMatrix: {
				value: []
			},
			pointLights: {
				value: [],
				properties: {
					color: {},
					position: {},
					decay: {},
					distance: {}
				}
			},
			pointLightShadows: {
				value: [],
				properties: {
					shadowBias: {},
					shadowRadius: {},
					shadowMapSize: {},
					shadowCameraNear: {},
					shadowCameraFar: {}
				}
			},
			pointShadowMap: {
				value: []
			},
			pointShadowMatrix: {
				value: []
			},
			hemisphereLights: {
				value: [],
				properties: {
					direction: {},
					skyColor: {},
					groundColor: {}
				}
			},
			rectAreaLights: {
				value: [],
				properties: {
					color: {},
					position: {},
					width: {},
					height: {}
				}
			}
		},
		points: {
			diffuse: {
				value: new Ue(15658734)
			},
			opacity: {
				value: 1
			},
			size: {
				value: 1
			},
			scale: {
				value: 1
			},
			map: {
				value: null
			},
			alphaMap: {
				value: null
			},
			uvTransform: {
				value: new l
			}
		},
		sprite: {
			diffuse: {
				value: new Ue(15658734)
			},
			opacity: {
				value: 1
			},
			center: {
				value: new c(.5, .5)
			},
			rotation: {
				value: 0
			},
			map: {
				value: null
			},
			alphaMap: {
				value: null
			},
			uvTransform: {
				value: new l
			}
		}
	};

	function Kt() {
		var e = null,
			t = !1,
			n = null;

		function i(r, a) {
			!1 !== t && (n(r, a), e.requestAnimationFrame(i))
		}
		return {
			start: function () {
				!0 !== t && null !== n && (e.requestAnimationFrame(i), t = !0)
			},
			stop: function () {
				t = !1
			},
			setAnimationLoop: function (e) {
				n = e
			},
			setContext: function (t) {
				e = t
			}
		}
	}

	function Qt(e, t) {
		var n = t.isWebGL2,
			i = new WeakMap;
		return {
			get: function (e) {
				return e.isInterleavedBufferAttribute && (e = e.data), i.get(e)
			},
			remove: function (t) {
				t.isInterleavedBufferAttribute && (t = t.data);
				var n = i.get(t);
				n && (e.deleteBuffer(n.buffer), i.delete(t))
			},
			update: function (t, r) {
				t.isInterleavedBufferAttribute && (t = t.data);
				var a = i.get(t);
				void 0 === a ? i.set(t, function (t, n) {
					var i = t.array,
						r = t.usage,
						a = e.createBuffer();
					e.bindBuffer(n, a), e.bufferData(n, i, r), t.onUploadCallback();
					var o = 5126;
					return i instanceof Float32Array ? o = 5126 : i instanceof Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : i instanceof Uint16Array ? o = 5123 : i instanceof Int16Array ? o = 5122 : i instanceof Uint32Array ? o = 5125 : i instanceof Int32Array ? o = 5124 : i instanceof Int8Array ? o = 5120 : i instanceof Uint8Array && (o = 5121), {
						buffer: a,
						type: o,
						bytesPerElement: i.BYTES_PER_ELEMENT,
						version: t.version
					}
				}(t, r)) : a.version < t.version && (! function (t, i, r) {
					var a = i.array,
						o = i.updateRange;
					e.bindBuffer(r, t), -1 === o.count ? e.bufferSubData(r, 0, a) : (n ? e.bufferSubData(r, o.offset * a.BYTES_PER_ELEMENT, a, o.offset, o.count) : e.bufferSubData(r, o.offset * a.BYTES_PER_ELEMENT, a.subarray(o.offset, o.offset + o.count)), o.count = -1)
				}(a.buffer, t, r), a.version = t.version)
			}
		}
	}

	function $t(e, t, n, i) {
		Nt.call(this), this.type = "PlaneGeometry", this.parameters = {
			width: e,
			height: t,
			widthSegments: n,
			heightSegments: i
		}, this.fromBufferGeometry(new en(e, t, n, i)), this.mergeVertices()
	}

	function en(e, t, n, i) {
		ht.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
			width: e,
			height: t,
			widthSegments: n,
			heightSegments: i
		};
		var r, a, o = (e = e || 1) / 2,
			s = (t = t || 1) / 2,
			c = Math.floor(n) || 1,
			l = Math.floor(i) || 1,
			h = c + 1,
			u = l + 1,
			p = e / c,
			d = t / l,
			f = [],
			m = [],
			v = [],
			g = [];
		for (a = 0; a < u; a++) {
			var y = a * d - s;
			for (r = 0; r < h; r++) {
				var x = r * p - o;
				m.push(x, -y, 0), v.push(0, 0, 1), g.push(r / c), g.push(1 - a / l)
			}
		}
		for (a = 0; a < l; a++)
			for (r = 0; r < c; r++) {
				var b = r + h * a,
					w = r + h * (a + 1),
					_ = r + 1 + h * (a + 1),
					M = r + 1 + h * a;
				f.push(b, w, M), f.push(w, _, M)
			}
		this.setIndex(f), this.setAttribute("position", new $e(m, 3)), this.setAttribute("normal", new $e(v, 3)), this.setAttribute("uv", new $e(g, 2))
	}
	$t.prototype = Object.create(Nt.prototype), $t.prototype.constructor = $t, en.prototype = Object.create(ht.prototype), en.prototype.constructor = en;
	var tn = {
			alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif",
			alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
			alphatest_fragment: "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif",
			aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif",
			aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
			begin_vertex: "vec3 transformed = vec3( position );",
			beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",
			bsdfs: "vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha  = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif",
			bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",
			clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif",
			clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
			clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",
			clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",
			color_fragment: "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
			color_pars_fragment: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
			color_pars_vertex: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
			color_vertex: "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",
			common: "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n  return m[ 2 ][ 3 ] == - 1.0;\n}",
			cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_maxMipLevel 8.0\n#define cubeUV_minMipLevel 4.0\n#define cubeUV_maxTileSize 256.0\n#define cubeUV_minTileSize 16.0\nfloat getFace(vec3 direction) {\n    vec3 absDirection = abs(direction);\n    float face = -1.0;\n    if (absDirection.x > absDirection.z) {\n      if (absDirection.x > absDirection.y)\n        face = direction.x > 0.0 ? 0.0 : 3.0;\n      else\n        face = direction.y > 0.0 ? 1.0 : 4.0;\n    } else {\n      if (absDirection.z > absDirection.y)\n        face = direction.z > 0.0 ? 2.0 : 5.0;\n      else\n        face = direction.y > 0.0 ? 1.0 : 4.0;\n    }\n    return face;\n}\nvec2 getUV(vec3 direction, float face) {\n    vec2 uv;\n    if (face == 0.0) {\n      uv = vec2(-direction.z, direction.y) / abs(direction.x);\n    } else if (face == 1.0) {\n      uv = vec2(direction.x, -direction.z) / abs(direction.y);\n    } else if (face == 2.0) {\n      uv = direction.xy / abs(direction.z);\n    } else if (face == 3.0) {\n      uv = vec2(direction.z, direction.y) / abs(direction.x);\n    } else if (face == 4.0) {\n      uv = direction.xz / abs(direction.y);\n    } else {\n      uv = vec2(-direction.x, direction.y) / abs(direction.z);\n    }\n    return 0.5 * (uv + 1.0);\n}\nvec3 bilinearCubeUV(sampler2D envMap, vec3 direction, float mipInt) {\n  float face = getFace(direction);\n  float filterInt = max(cubeUV_minMipLevel - mipInt, 0.0);\n  mipInt = max(mipInt, cubeUV_minMipLevel);\n  float faceSize = exp2(mipInt);\n  float texelSize = 1.0 / (3.0 * cubeUV_maxTileSize);\n  vec2 uv = getUV(direction, face) * (faceSize - 1.0);\n  vec2 f = fract(uv);\n  uv += 0.5 - f;\n  if (face > 2.0) {\n    uv.y += faceSize;\n    face -= 3.0;\n  }\n  uv.x += face * faceSize;\n  if(mipInt < cubeUV_maxMipLevel){\n    uv.y += 2.0 * cubeUV_maxTileSize;\n  }\n  uv.y += filterInt * 2.0 * cubeUV_minTileSize;\n  uv.x += 3.0 * max(0.0, cubeUV_maxTileSize - 2.0 * faceSize);\n  uv *= texelSize;\n  vec3 tl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  uv.x += texelSize;\n  vec3 tr = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  uv.y += texelSize;\n  vec3 br = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  uv.x -= texelSize;\n  vec3 bl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  vec3 tm = mix(tl, tr, f.x);\n  vec3 bm = mix(bl, br, f.x);\n  return mix(tm, bm, f.y);\n}\n#define r0 1.0\n#define v0 0.339\n#define m0 -2.0\n#define r1 0.8\n#define v1 0.276\n#define m1 -1.0\n#define r4 0.4\n#define v4 0.046\n#define m4 2.0\n#define r5 0.305\n#define v5 0.016\n#define m5 3.0\n#define r6 0.21\n#define v6 0.0038\n#define m6 4.0\nfloat roughnessToMip(float roughness) {\n  float mip = 0.0;\n  if (roughness >= r1) {\n    mip = (r0 - roughness) * (m1 - m0) / (r0 - r1) + m0;\n  } else if (roughness >= r4) {\n    mip = (r1 - roughness) * (m4 - m1) / (r1 - r4) + m1;\n  } else if (roughness >= r5) {\n    mip = (r4 - roughness) * (m5 - m4) / (r4 - r5) + m4;\n  } else if (roughness >= r6) {\n    mip = (r5 - roughness) * (m6 - m5) / (r5 - r6) + m5;\n  } else {\n    mip = -2.0 * log2(1.16 * roughness);  }\n  return mip;\n}\nvec4 textureCubeUV(sampler2D envMap, vec3 sampleDir, float roughness) {\n  float mip = clamp(roughnessToMip(roughness), m0, cubeUV_maxMipLevel);\n  float mipF = fract(mip);\n  float mipInt = floor(mip);\n  vec3 color0 = bilinearCubeUV(envMap, sampleDir, mipInt);\n  if (mipF == 0.0) {\n    return vec4(color0, 1.0);\n  } else {\n    vec3 color1 = bilinearCubeUV(envMap, sampleDir, mipInt + 1.0);\n    return vec4(mix(color0, color1, mipF), 1.0);\n  }\n}\n#endif",
			defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",
			displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",
			displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif",
			emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
			emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",
			encodings_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
			encodings_pars_fragment: "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}",
			envmap_fragment: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\t\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t}  else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",
			envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",
			envmap_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",
			envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",
			envmap_physical_pars_fragment: "#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t  vec3 reflectVec = reflect( -viewDir, normal );\n\t\t  reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t  vec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif",
			envmap_vertex: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) { \n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",
			fog_vertex: "#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif",
			fog_pars_vertex: "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif",
			fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
			fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
			gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}",
			lightmap_fragment: "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\treflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n#endif",
			lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
			lights_lambert_vertex: "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif",
			lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif",
			lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
			lights_toon_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct ToonMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)",
			lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
			lights_phong_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)",
			lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;\nmaterial.specularRoughness = min( material.specularRoughness, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif",
			lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
			lights_fragment_begin: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
			lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif",
			lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif",
			logdepthbuf_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
			logdepthbuf_pars_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",
			logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif",
			logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif",
			map_fragment: "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif",
			map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",
			map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
			map_particle_pars_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
			metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",
			metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
			morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n#endif",
			morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
			morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t#endif\n#endif",
			normal_fragment_begin: "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\tbitangent = bitangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;",
			normal_fragment_maps: "#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, mapN );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif",
			normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\tvec3 N = normalize( surf_norm );\n\t\tmat3 tsn = mat3( S, T, N );\n\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif",
			clearcoat_normal_fragment_begin: "#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif",
			clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN );\n\t#endif\n#endif",
			clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif",
			packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}",
			premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",
			project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
			dithering_fragment: "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
			dithering_pars_fragment: "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",
			roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",
			roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
			shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif",
			shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",
			shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif",
			shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",
			skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
			skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif",
			skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
			skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",
			specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
			specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
			tonemapping_fragment: "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
			tonemapping_pars_fragment: "#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );\n}",
			uv_pars_fragment: "#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif",
			uv_pars_vertex: "#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif",
			uv_vertex: "#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",
			uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
			uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif",
			uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif",
			worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",
			background_frag: "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
			background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
			cube_frag: "#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
			cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
			depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}",
			depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}",
			distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",
			distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",
			equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
			equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",
			linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
			linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
			meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
			meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",
			meshlambert_frag: "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
			meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
			meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
			meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",
			meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
			meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
			meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
			meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
			meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSPARENCY\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSPARENCY\n\tuniform float transparency;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSPARENCY\n\t\tdiffuseColor.a *= saturate( 1. - transparency + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
			meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
			normal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}",
			normal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",
			points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
			points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",
			shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
			shadow_vert: "#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
			sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
			sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}"
		},
		nn = {
			basic: {
				uniforms: Bt([Jt.common, Jt.specularmap, Jt.envmap, Jt.aomap, Jt.lightmap, Jt.fog]),
				vertexShader: tn.meshbasic_vert,
				fragmentShader: tn.meshbasic_frag
			},
			lambert: {
				uniforms: Bt([Jt.common, Jt.specularmap, Jt.envmap, Jt.aomap, Jt.lightmap, Jt.emissivemap, Jt.fog, Jt.lights, {
					emissive: {
						value: new Ue(0)
					}
				}]),
				vertexShader: tn.meshlambert_vert,
				fragmentShader: tn.meshlambert_frag
			},
			phong: {
				uniforms: Bt([Jt.common, Jt.specularmap, Jt.envmap, Jt.aomap, Jt.lightmap, Jt.emissivemap, Jt.bumpmap, Jt.normalmap, Jt.displacementmap, Jt.fog, Jt.lights, {
					emissive: {
						value: new Ue(0)
					},
					specular: {
						value: new Ue(1118481)
					},
					shininess: {
						value: 30
					}
				}]),
				vertexShader: tn.meshphong_vert,
				fragmentShader: tn.meshphong_frag
			},
			standard: {
				uniforms: Bt([Jt.common, Jt.envmap, Jt.aomap, Jt.lightmap, Jt.emissivemap, Jt.bumpmap, Jt.normalmap, Jt.displacementmap, Jt.roughnessmap, Jt.metalnessmap, Jt.fog, Jt.lights, {
					emissive: {
						value: new Ue(0)
					},
					roughness: {
						value: .5
					},
					metalness: {
						value: .5
					},
					envMapIntensity: {
						value: 1
					}
				}]),
				vertexShader: tn.meshphysical_vert,
				fragmentShader: tn.meshphysical_frag
			},
			toon: {
				uniforms: Bt([Jt.common, Jt.specularmap, Jt.aomap, Jt.lightmap, Jt.emissivemap, Jt.bumpmap, Jt.normalmap, Jt.displacementmap, Jt.gradientmap, Jt.fog, Jt.lights, {
					emissive: {
						value: new Ue(0)
					},
					specular: {
						value: new Ue(1118481)
					},
					shininess: {
						value: 30
					}
				}]),
				vertexShader: tn.meshtoon_vert,
				fragmentShader: tn.meshtoon_frag
			},
			matcap: {
				uniforms: Bt([Jt.common, Jt.bumpmap, Jt.normalmap, Jt.displacementmap, Jt.fog, {
					matcap: {
						value: null
					}
				}]),
				vertexShader: tn.meshmatcap_vert,
				fragmentShader: tn.meshmatcap_frag
			},
			points: {
				uniforms: Bt([Jt.points, Jt.fog]),
				vertexShader: tn.points_vert,
				fragmentShader: tn.points_frag
			},
			dashed: {
				uniforms: Bt([Jt.common, Jt.fog, {
					scale: {
						value: 1
					},
					dashSize: {
						value: 1
					},
					totalSize: {
						value: 2
					}
				}]),
				vertexShader: tn.linedashed_vert,
				fragmentShader: tn.linedashed_frag
			},
			depth: {
				uniforms: Bt([Jt.common, Jt.displacementmap]),
				vertexShader: tn.depth_vert,
				fragmentShader: tn.depth_frag
			},
			normal: {
				uniforms: Bt([Jt.common, Jt.bumpmap, Jt.normalmap, Jt.displacementmap, {
					opacity: {
						value: 1
					}
				}]),
				vertexShader: tn.normal_vert,
				fragmentShader: tn.normal_frag
			},
			sprite: {
				uniforms: Bt([Jt.sprite, Jt.fog]),
				vertexShader: tn.sprite_vert,
				fragmentShader: tn.sprite_frag
			},
			background: {
				uniforms: {
					uvTransform: {
						value: new l
					},
					t2D: {
						value: null
					}
				},
				vertexShader: tn.background_vert,
				fragmentShader: tn.background_frag
			},
			cube: {
				uniforms: Bt([Jt.envmap, {
					opacity: {
						value: 1
					}
				}]),
				vertexShader: tn.cube_vert,
				fragmentShader: tn.cube_frag
			},
			equirect: {
				uniforms: {
					tEquirect: {
						value: null
					}
				},
				vertexShader: tn.equirect_vert,
				fragmentShader: tn.equirect_frag
			},
			distanceRGBA: {
				uniforms: Bt([Jt.common, Jt.displacementmap, {
					referencePosition: {
						value: new x
					},
					nearDistance: {
						value: 1
					},
					farDistance: {
						value: 1e3
					}
				}]),
				vertexShader: tn.distanceRGBA_vert,
				fragmentShader: tn.distanceRGBA_frag
			},
			shadow: {
				uniforms: Bt([Jt.lights, Jt.fog, {
					color: {
						value: new Ue(0)
					},
					opacity: {
						value: 1
					}
				}]),
				vertexShader: tn.shadow_vert,
				fragmentShader: tn.shadow_frag
			}
		};

	function rn(e, t, n, i) {
		var r, a, o = new Ue(0),
			s = 0,
			c = null,
			l = 0,
			h = null;

		function u(e, n) {
			t.buffers.color.setClear(e.r, e.g, e.b, n, i)
		}
		return {
			getClearColor: function () {
				return o
			},
			setClearColor: function (e, t) {
				o.set(e), u(o, s = void 0 !== t ? t : 1)
			},
			getClearAlpha: function () {
				return s
			},
			setClearAlpha: function (e) {
				u(o, s = e)
			},
			render: function (t, i, p, d) {
				var f = i.background,
					m = e.xr,
					v = m.getSession && m.getSession();
				if (v && "additive" === v.environmentBlendMode && (f = null), null === f ? u(o, s) : f && f.isColor && (u(f, 1), d = !0), (e.autoClear || d) && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), f && (f.isCubeTexture || f.isWebGLCubeRenderTarget || 306 === f.mapping)) {
					void 0 === a && ((a = new Lt(new zt(1, 1, 1), new Gt({
						type: "BackgroundCubeMaterial",
						uniforms: Ft(nn.cube.uniforms),
						vertexShader: nn.cube.vertexShader,
						fragmentShader: nn.cube.fragmentShader,
						side: 1,
						depthTest: !1,
						depthWrite: !1,
						fog: !1
					}))).geometry.deleteAttribute("normal"), a.geometry.deleteAttribute("uv"), a.onBeforeRender = function (e, t, n) {
						this.matrixWorld.copyPosition(n.matrixWorld)
					}, Object.defineProperty(a.material, "envMap", {
						get: function () {
							return this.uniforms.envMap.value
						}
					}), n.update(a));
					var g = f.isWebGLCubeRenderTarget ? f.texture : f;
					a.material.uniforms.envMap.value = g, a.material.uniforms.flipEnvMap.value = g.isCubeTexture ? -1 : 1, c === f && l === g.version && h === e.toneMapping || (a.material.needsUpdate = !0, c = f, l = g.version, h = e.toneMapping), t.unshift(a, a.geometry, a.material, 0, 0, null)
				} else f && f.isTexture && (void 0 === r && ((r = new Lt(new en(2, 2), new Gt({
					type: "BackgroundMaterial",
					uniforms: Ft(nn.background.uniforms),
					vertexShader: nn.background.vertexShader,
					fragmentShader: nn.background.fragmentShader,
					side: 0,
					depthTest: !1,
					depthWrite: !1,
					fog: !1
				}))).geometry.deleteAttribute("normal"), Object.defineProperty(r.material, "map", {
					get: function () {
						return this.uniforms.t2D.value
					}
				}), n.update(r)), r.material.uniforms.t2D.value = f, !0 === f.matrixAutoUpdate && f.updateMatrix(), r.material.uniforms.uvTransform.value.copy(f.matrix), c === f && l === f.version && h === e.toneMapping || (r.material.needsUpdate = !0, c = f, l = f.version, h = e.toneMapping), t.unshift(r, r.geometry, r.material, 0, 0, null))
			}
		}
	}

	function an(e, t, n, i) {
		var r, a = i.isWebGL2;
		this.setMode = function (e) {
			r = e
		}, this.render = function (t, i) {
			e.drawArrays(r, t, i), n.update(i, r)
		}, this.renderInstances = function (i, o, s, c) {
			if (0 !== c) {
				var l, h;
				if (a) l = e, h = "drawArraysInstanced";
				else if (h = "drawArraysInstancedANGLE", null === (l = t.get("ANGLE_instanced_arrays"))) return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
				l[h](r, o, s, c), n.update(s, r, c)
			}
		}
	}

	function on(e, t, n) {
		var i;

		function r(t) {
			if ("highp" === t) {
				if (e.getShaderPrecisionFormat(35633, 36338).precision > 0 && e.getShaderPrecisionFormat(35632, 36338).precision > 0) return "highp";
				t = "mediump"
			}
			return "mediump" === t && e.getShaderPrecisionFormat(35633, 36337).precision > 0 && e.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp"
		}
		var a = "undefined" != typeof WebGL2RenderingContext && e instanceof WebGL2RenderingContext || "undefined" != typeof WebGL2ComputeRenderingContext && e instanceof WebGL2ComputeRenderingContext,
			o = void 0 !== n.precision ? n.precision : "highp",
			s = r(o);
		s !== o && (console.warn("THREE.WebGLRenderer:", o, "not supported, using", s, "instead."), o = s);
		var c = !0 === n.logarithmicDepthBuffer,
			l = e.getParameter(34930),
			h = e.getParameter(35660),
			u = e.getParameter(3379),
			p = e.getParameter(34076),
			d = e.getParameter(34921),
			f = e.getParameter(36347),
			m = e.getParameter(36348),
			v = e.getParameter(36349),
			g = h > 0,
			y = a || !!t.get("OES_texture_float");
		return {
			isWebGL2: a,
			getMaxAnisotropy: function () {
				if (void 0 !== i) return i;
				var n = t.get("EXT_texture_filter_anisotropic");
				return i = null !== n ? e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
			},
			getMaxPrecision: r,
			precision: o,
			logarithmicDepthBuffer: c,
			maxTextures: l,
			maxVertexTextures: h,
			maxTextureSize: u,
			maxCubemapSize: p,
			maxAttributes: d,
			maxVertexUniforms: f,
			maxVaryings: m,
			maxFragmentUniforms: v,
			vertexTextures: g,
			floatFragmentTextures: y,
			floatVertexTextures: g && y,
			maxSamples: a ? e.getParameter(36183) : 0
		}
	}

	function sn() {
		var e = this,
			t = null,
			n = 0,
			i = !1,
			r = !1,
			a = new we,
			o = new l,
			s = {
				value: null,
				needsUpdate: !1
			};

		function c() {
			s.value !== t && (s.value = t, s.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0
		}

		function h(t, n, i, r) {
			var c = null !== t ? t.length : 0,
				l = null;
			if (0 !== c) {
				if (l = s.value, !0 !== r || null === l) {
					var h = i + 4 * c,
						u = n.matrixWorldInverse;
					o.getNormalMatrix(u), (null === l || l.length < h) && (l = new Float32Array(h));
					for (var p = 0, d = i; p !== c; ++p, d += 4) a.copy(t[p]).applyMatrix4(u, o), a.normal.toArray(l, d), l[d + 3] = a.constant
				}
				s.value = l, s.needsUpdate = !0
			}
			return e.numPlanes = c, e.numIntersection = 0, l
		}
		this.uniform = s, this.numPlanes = 0, this.numIntersection = 0, this.init = function (e, r, a) {
			var o = 0 !== e.length || r || 0 !== n || i;
			return i = r, t = h(e, a, 0), n = e.length, o
		}, this.beginShadows = function () {
			r = !0, h(null)
		}, this.endShadows = function () {
			r = !1, c()
		}, this.setState = function (e, a, o, l, u, p) {
			if (!i || null === e || 0 === e.length || r && !o) r ? h(null) : c();
			else {
				var d = r ? 0 : n,
					f = 4 * d,
					m = u.clippingState || null;
				s.value = m, m = h(e, l, f, p);
				for (var v = 0; v !== f; ++v) m[v] = t[v];
				u.clippingState = m, this.numIntersection = a ? this.numPlanes : 0, this.numPlanes += d
			}
		}
	}

	function cn(e) {
		var t = {};
		return {
			get: function (n) {
				if (void 0 !== t[n]) return t[n];
				var i;
				switch (n) {
					case "WEBGL_depth_texture":
						i = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
						break;
					case "EXT_texture_filter_anisotropic":
						i = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
						break;
					case "WEBGL_compressed_texture_s3tc":
						i = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
						break;
					case "WEBGL_compressed_texture_pvrtc":
						i = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
						break;
					default:
						i = e.getExtension(n)
				}
				return null === i && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), t[n] = i, i
			}
		}
	}

	function ln(e, t, n) {
		var i = new WeakMap,
			r = new WeakMap;

		function a(e) {
			var o = e.target,
				s = i.get(o);
			for (var c in null !== s.index && t.remove(s.index), s.attributes) t.remove(s.attributes[c]);
			o.removeEventListener("dispose", a), i.delete(o);
			var l = r.get(s);
			l && (t.remove(l), r.delete(s)), n.memory.geometries--
		}

		function o(e) {
			var n = [],
				i = e.index,
				a = e.attributes.position,
				o = 0;
			if (null !== i) {
				var s = i.array;
				o = i.version;
				for (var c = 0, l = s.length; c < l; c += 3) {
					var h = s[c + 0],
						u = s[c + 1],
						p = s[c + 2];
					n.push(h, u, u, p, p, h)
				}
			} else {
				s = a.array;
				o = a.version;
				for (c = 0, l = s.length / 3 - 1; c < l; c += 3) {
					h = c + 0, u = c + 1, p = c + 2;
					n.push(h, u, u, p, p, h)
				}
			}
			var d = new(nt(n) > 65535 ? Qe : Je)(n, 1);
			d.version = o, t.update(d, 34963);
			var f = r.get(e);
			f && t.remove(f), r.set(e, d)
		}
		return {
			get: function (e, t) {
				var r = i.get(t);
				return r || (t.addEventListener("dispose", a), t.isBufferGeometry ? r = t : t.isGeometry && (void 0 === t._bufferGeometry && (t._bufferGeometry = (new ht).setFromObject(e)), r = t._bufferGeometry), i.set(t, r), n.memory.geometries++, r)
			},
			update: function (e) {
				var n = e.index,
					i = e.attributes;
				for (var r in null !== n && t.update(n, 34963), i) t.update(i[r], 34962);
				var a = e.morphAttributes;
				for (var r in a)
					for (var o = a[r], s = 0, c = o.length; s < c; s++) t.update(o[s], 34962)
			},
			getWireframeAttribute: function (e) {
				var t = r.get(e);
				if (t) {
					var n = e.index;
					null !== n && t.version < n.version && o(e)
				} else o(e);
				return r.get(e)
			}
		}
	}

	function hn(e, t, n, i) {
		var r, a, o, s = i.isWebGL2;
		this.setMode = function (e) {
			r = e
		}, this.setIndex = function (e) {
			a = e.type, o = e.bytesPerElement
		}, this.render = function (t, i) {
			e.drawElements(r, i, a, t * o), n.update(i, r)
		}, this.renderInstances = function (i, c, l, h) {
			if (0 !== h) {
				var u, p;
				if (s) u = e, p = "drawElementsInstanced";
				else if (p = "drawElementsInstancedANGLE", null === (u = t.get("ANGLE_instanced_arrays"))) return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
				u[p](r, l, a, c * o, h), n.update(l, r, h)
			}
		}
	}

	function un(e) {
		var t = {
			frame: 0,
			calls: 0,
			triangles: 0,
			points: 0,
			lines: 0
		};
		return {
			memory: {
				geometries: 0,
				textures: 0
			},
			render: t,
			programs: null,
			autoReset: !0,
			reset: function () {
				t.frame++, t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0
			},
			update: function (e, n, i) {
				switch (i = i || 1, t.calls++, n) {
					case 4:
						t.triangles += i * (e / 3);
						break;
					case 1:
						t.lines += i * (e / 2);
						break;
					case 3:
						t.lines += i * (e - 1);
						break;
					case 2:
						t.lines += i * e;
						break;
					case 0:
						t.points += i * e;
						break;
					default:
						console.error("THREE.WebGLInfo: Unknown draw mode:", n)
				}
			}
		}
	}

	function pn(e, t) {
		return Math.abs(t[1]) - Math.abs(e[1])
	}

	function dn(e) {
		var t = {},
			n = new Float32Array(8);
		return {
			update: function (i, r, a, o) {
				var s = i.morphTargetInfluences,
					c = void 0 === s ? 0 : s.length,
					l = t[r.id];
				if (void 0 === l) {
					l = [];
					for (var h = 0; h < c; h++) l[h] = [h, 0];
					t[r.id] = l
				}
				var u = a.morphTargets && r.morphAttributes.position,
					p = a.morphNormals && r.morphAttributes.normal;
				for (h = 0; h < c; h++) {
					0 !== (f = l[h])[1] && (u && r.deleteAttribute("morphTarget" + h), p && r.deleteAttribute("morphNormal" + h))
				}
				for (h = 0; h < c; h++) {
					(f = l[h])[0] = h, f[1] = s[h]
				}
				l.sort(pn);
				var d = 0;
				for (h = 0; h < 8; h++) {
					var f;
					if (f = l[h]) {
						var m = f[0],
							v = f[1];
						if (v) {
							u && r.setAttribute("morphTarget" + h, u[m]), p && r.setAttribute("morphNormal" + h, p[m]), n[h] = v, d += v;
							continue
						}
					}
					n[h] = 0
				}
				var g = r.morphTargetsRelative ? 1 : 1 - d;
				o.getUniforms().setValue(e, "morphTargetBaseInfluence", g), o.getUniforms().setValue(e, "morphTargetInfluences", n)
			}
		}
	}

	function fn(e, t, n, i) {
		var r = new WeakMap;
		return {
			update: function (e) {
				var a = i.render.frame,
					o = e.geometry,
					s = t.get(e, o);
				return r.get(s) !== a && (o.isGeometry && s.updateFromObject(e), t.update(s), r.set(s, a)), e.isInstancedMesh && n.update(e.instanceMatrix, 34962), s
			},
			dispose: function () {
				r = new WeakMap
			}
		}
	}

	function mn(e, t, n, i, r, a, o, s, c, l) {
		e = void 0 !== e ? e : [], t = void 0 !== t ? t : 301, o = void 0 !== o ? o : 1022, p.call(this, e, t, n, i, r, a, o, s, c, l), this.flipY = !1
	}

	function vn(e, t, n, i) {
		p.call(this, null), this.image = {
			data: e || null,
			width: t || 1,
			height: n || 1,
			depth: i || 1
		}, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.needsUpdate = !0
	}

	function gn(e, t, n, i) {
		p.call(this, null), this.image = {
			data: e || null,
			width: t || 1,
			height: n || 1,
			depth: i || 1
		}, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.needsUpdate = !0
	}
	nn.physical = {
		uniforms: Bt([nn.standard.uniforms, {
			clearcoat: {
				value: 0
			},
			clearcoatMap: {
				value: null
			},
			clearcoatRoughness: {
				value: 0
			},
			clearcoatRoughnessMap: {
				value: null
			},
			clearcoatNormalScale: {
				value: new c(1, 1)
			},
			clearcoatNormalMap: {
				value: null
			},
			sheen: {
				value: new Ue(0)
			},
			transparency: {
				value: 0
			}
		}]),
		vertexShader: tn.meshphysical_vert,
		fragmentShader: tn.meshphysical_frag
	}, mn.prototype = Object.create(p.prototype), mn.prototype.constructor = mn, mn.prototype.isCubeTexture = !0, Object.defineProperty(mn.prototype, "images", {
		get: function () {
			return this.image
		},
		set: function (e) {
			this.image = e
		}
	}), vn.prototype = Object.create(p.prototype), vn.prototype.constructor = vn, vn.prototype.isDataTexture2DArray = !0, gn.prototype = Object.create(p.prototype), gn.prototype.constructor = gn, gn.prototype.isDataTexture3D = !0;
	var yn = new p,
		xn = new vn,
		bn = new gn,
		wn = new mn,
		_n = [],
		Mn = [],
		Sn = new Float32Array(16),
		Tn = new Float32Array(9),
		En = new Float32Array(4);

	function An(e, t, n) {
		var i = e[0];
		if (i <= 0 || i > 0) return e;
		var r = t * n,
			a = _n[r];
		if (void 0 === a && (a = new Float32Array(r), _n[r] = a), 0 !== t) {
			i.toArray(a, 0);
			for (var o = 1, s = 0; o !== t; ++o) s += n, e[o].toArray(a, s)
		}
		return a
	}

	function Ln(e, t) {
		if (e.length !== t.length) return !1;
		for (var n = 0, i = e.length; n < i; n++)
			if (e[n] !== t[n]) return !1;
		return !0
	}

	function Rn(e, t) {
		for (var n = 0, i = t.length; n < i; n++) e[n] = t[n]
	}

	function Pn(e, t) {
		var n = Mn[t];
		void 0 === n && (n = new Int32Array(t), Mn[t] = n);
		for (var i = 0; i !== t; ++i) n[i] = e.allocateTextureUnit();
		return n
	}

	function Cn(e, t) {
		var n = this.cache;
		n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t)
	}

	function On(e, t) {
		var n = this.cache;
		if (void 0 !== t.x) n[0] === t.x && n[1] === t.y || (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
		else {
			if (Ln(n, t)) return;
			e.uniform2fv(this.addr, t), Rn(n, t)
		}
	}

	function Dn(e, t) {
		var n = this.cache;
		if (void 0 !== t.x) n[0] === t.x && n[1] === t.y && n[2] === t.z || (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
		else if (void 0 !== t.r) n[0] === t.r && n[1] === t.g && n[2] === t.b || (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
		else {
			if (Ln(n, t)) return;
			e.uniform3fv(this.addr, t), Rn(n, t)
		}
	}

	function In(e, t) {
		var n = this.cache;
		if (void 0 !== t.x) n[0] === t.x && n[1] === t.y && n[2] === t.z && n[3] === t.w || (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
		else {
			if (Ln(n, t)) return;
			e.uniform4fv(this.addr, t), Rn(n, t)
		}
	}

	function Nn(e, t) {
		var n = this.cache,
			i = t.elements;
		if (void 0 === i) {
			if (Ln(n, t)) return;
			e.uniformMatrix2fv(this.addr, !1, t), Rn(n, t)
		} else {
			if (Ln(n, i)) return;
			En.set(i), e.uniformMatrix2fv(this.addr, !1, En), Rn(n, i)
		}
	}

	function Un(e, t) {
		var n = this.cache,
			i = t.elements;
		if (void 0 === i) {
			if (Ln(n, t)) return;
			e.uniformMatrix3fv(this.addr, !1, t), Rn(n, t)
		} else {
			if (Ln(n, i)) return;
			Tn.set(i), e.uniformMatrix3fv(this.addr, !1, Tn), Rn(n, i)
		}
	}

	function zn(e, t) {
		var n = this.cache,
			i = t.elements;
		if (void 0 === i) {
			if (Ln(n, t)) return;
			e.uniformMatrix4fv(this.addr, !1, t), Rn(n, t)
		} else {
			if (Ln(n, i)) return;
			Sn.set(i), e.uniformMatrix4fv(this.addr, !1, Sn), Rn(n, i)
		}
	}

	function Fn(e, t, n) {
		var i = this.cache,
			r = n.allocateTextureUnit();
		i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r), n.safeSetTexture2D(t || yn, r)
	}

	function Bn(e, t, n) {
		var i = this.cache,
			r = n.allocateTextureUnit();
		i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r), n.setTexture2DArray(t || xn, r)
	}

	function Hn(e, t, n) {
		var i = this.cache,
			r = n.allocateTextureUnit();
		i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r), n.setTexture3D(t || bn, r)
	}

	function Gn(e, t, n) {
		var i = this.cache,
			r = n.allocateTextureUnit();
		i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r), n.safeSetTextureCube(t || wn, r)
	}

	function kn(e, t) {
		var n = this.cache;
		n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t)
	}

	function Vn(e, t) {
		var n = this.cache;
		Ln(n, t) || (e.uniform2iv(this.addr, t), Rn(n, t))
	}

	function jn(e, t) {
		var n = this.cache;
		Ln(n, t) || (e.uniform3iv(this.addr, t), Rn(n, t))
	}

	function Wn(e, t) {
		var n = this.cache;
		Ln(n, t) || (e.uniform4iv(this.addr, t), Rn(n, t))
	}

	function qn(e, t) {
		var n = this.cache;
		n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t)
	}

	function Xn(e, t) {
		e.uniform1fv(this.addr, t)
	}

	function Yn(e, t) {
		e.uniform1iv(this.addr, t)
	}

	function Zn(e, t) {
		e.uniform2iv(this.addr, t)
	}

	function Jn(e, t) {
		e.uniform3iv(this.addr, t)
	}

	function Kn(e, t) {
		e.uniform4iv(this.addr, t)
	}

	function Qn(e, t) {
		var n = An(t, this.size, 2);
		e.uniform2fv(this.addr, n)
	}

	function $n(e, t) {
		var n = An(t, this.size, 3);
		e.uniform3fv(this.addr, n)
	}

	function ei(e, t) {
		var n = An(t, this.size, 4);
		e.uniform4fv(this.addr, n)
	}

	function ti(e, t) {
		var n = An(t, this.size, 4);
		e.uniformMatrix2fv(this.addr, !1, n)
	}

	function ni(e, t) {
		var n = An(t, this.size, 9);
		e.uniformMatrix3fv(this.addr, !1, n)
	}

	function ii(e, t) {
		var n = An(t, this.size, 16);
		e.uniformMatrix4fv(this.addr, !1, n)
	}

	function ri(e, t, n) {
		var i = t.length,
			r = Pn(n, i);
		e.uniform1iv(this.addr, r);
		for (var a = 0; a !== i; ++a) n.safeSetTexture2D(t[a] || yn, r[a])
	}

	function ai(e, t, n) {
		var i = t.length,
			r = Pn(n, i);
		e.uniform1iv(this.addr, r);
		for (var a = 0; a !== i; ++a) n.safeSetTextureCube(t[a] || wn, r[a])
	}

	function oi(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.setValue = function (e) {
			switch (e) {
				case 5126:
					return Cn;
				case 35664:
					return On;
				case 35665:
					return Dn;
				case 35666:
					return In;
				case 35674:
					return Nn;
				case 35675:
					return Un;
				case 35676:
					return zn;
				case 5124:
				case 35670:
					return kn;
				case 35667:
				case 35671:
					return Vn;
				case 35668:
				case 35672:
					return jn;
				case 35669:
				case 35673:
					return Wn;
				case 5125:
					return qn;
				case 35678:
				case 36198:
				case 36298:
				case 36306:
				case 35682:
					return Fn;
				case 35679:
				case 36299:
				case 36307:
					return Hn;
				case 35680:
				case 36300:
				case 36308:
				case 36293:
					return Gn;
				case 36289:
				case 36303:
				case 36311:
				case 36292:
					return Bn
			}
		}(t.type)
	}

	function si(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.size = t.size, this.setValue = function (e) {
			switch (e) {
				case 5126:
					return Xn;
				case 35664:
					return Qn;
				case 35665:
					return $n;
				case 35666:
					return ei;
				case 35674:
					return ti;
				case 35675:
					return ni;
				case 35676:
					return ii;
				case 5124:
				case 35670:
					return Yn;
				case 35667:
				case 35671:
					return Zn;
				case 35668:
				case 35672:
					return Jn;
				case 35669:
				case 35673:
					return Kn;
				case 35678:
				case 36198:
				case 36298:
				case 36306:
				case 35682:
					return ri;
				case 35680:
				case 36300:
				case 36308:
				case 36293:
					return ai
			}
		}(t.type)
	}

	function ci(e) {
		this.id = e, this.seq = [], this.map = {}
	}
	si.prototype.updateCache = function (e) {
		var t = this.cache;
		e instanceof Float32Array && t.length !== e.length && (this.cache = new Float32Array(e.length)), Rn(t, e)
	}, ci.prototype.setValue = function (e, t, n) {
		for (var i = this.seq, r = 0, a = i.length; r !== a; ++r) {
			var o = i[r];
			o.setValue(e, t[o.id], n)
		}
	};
	var li = /([\w\d_]+)(\])?(\[|\.)?/g;

	function hi(e, t) {
		e.seq.push(t), e.map[t.id] = t
	}

	function ui(e, t, n) {
		var i = e.name,
			r = i.length;
		for (li.lastIndex = 0;;) {
			var a = li.exec(i),
				o = li.lastIndex,
				s = a[1],
				c = "]" === a[2],
				l = a[3];
			if (c && (s |= 0), void 0 === l || "[" === l && o + 2 === r) {
				hi(n, void 0 === l ? new oi(s, e, t) : new si(s, e, t));
				break
			}
			var h = n.map[s];
			void 0 === h && hi(n, h = new ci(s)), n = h
		}
	}

	function pi(e, t) {
		this.seq = [], this.map = {};
		for (var n = e.getProgramParameter(t, 35718), i = 0; i < n; ++i) {
			var r = e.getActiveUniform(t, i);
			ui(r, e.getUniformLocation(t, r.name), this)
		}
	}

	function di(e, t, n) {
		var i = e.createShader(t);
		return e.shaderSource(i, n), e.compileShader(i), i
	}
	pi.prototype.setValue = function (e, t, n, i) {
		var r = this.map[t];
		void 0 !== r && r.setValue(e, n, i)
	}, pi.prototype.setOptional = function (e, t, n) {
		var i = t[n];
		void 0 !== i && this.setValue(e, n, i)
	}, pi.upload = function (e, t, n, i) {
		for (var r = 0, a = t.length; r !== a; ++r) {
			var o = t[r],
				s = n[o.id];
			!1 !== s.needsUpdate && o.setValue(e, s.value, i)
		}
	}, pi.seqWithValue = function (e, t) {
		for (var n = [], i = 0, r = e.length; i !== r; ++i) {
			var a = e[i];
			a.id in t && n.push(a)
		}
		return n
	};
	var fi = 0;

	function mi(e) {
		switch (e) {
			case 3e3:
				return ["Linear", "( value )"];
			case 3001:
				return ["sRGB", "( value )"];
			case 3002:
				return ["RGBE", "( value )"];
			case 3004:
				return ["RGBM", "( value, 7.0 )"];
			case 3005:
				return ["RGBM", "( value, 16.0 )"];
			case 3006:
				return ["RGBD", "( value, 256.0 )"];
			case 3007:
				return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
			case 3003:
				return ["LogLuv", "( value )"];
			default:
				throw new Error("unsupported encoding: " + e)
		}
	}

	function vi(e, t, n) {
		var i = e.getShaderParameter(t, 35713),
			r = e.getShaderInfoLog(t).trim();
		return i && "" === r ? "" : "THREE.WebGLShader: gl.getShaderInfoLog() " + n + "\n" + r + function (e) {
			for (var t = e.split("\n"), n = 0; n < t.length; n++) t[n] = n + 1 + ": " + t[n];
			return t.join("\n")
		}(e.getShaderSource(t))
	}

	function gi(e, t) {
		var n = mi(t);
		return "vec4 " + e + "( vec4 value ) { return " + n[0] + "ToLinear" + n[1] + "; }"
	}

	function yi(e, t) {
		var n;
		switch (t) {
			case 1:
				n = "Linear";
				break;
			case 2:
				n = "Reinhard";
				break;
			case 3:
				n = "Uncharted2";
				break;
			case 4:
				n = "OptimizedCineon";
				break;
			case 5:
				n = "ACESFilmic";
				break;
			default:
				throw new Error("unsupported toneMapping: " + t)
		}
		return "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }"
	}

	function xi(e) {
		return "" !== e
	}

	function bi(e, t) {
		return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows)
	}

	function wi(e, t) {
		return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection)
	}
	var _i = /^[ \t]*#include +<([\w\d./]+)>/gm;

	function Mi(e) {
		return e.replace(_i, Si)
	}

	function Si(e, t) {
		var n = tn[t];
		if (void 0 === n) throw new Error("Can not resolve #include <" + t + ">");
		return Mi(n)
	}
	var Ti = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
		Ei = /#pragma unroll_loop_start[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}[\s]+?#pragma unroll_loop_end/g;

	function Ai(e) {
		return e.replace(Ei, Ri).replace(Ti, Li)
	}

	function Li(e, t, n, i) {
		return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."), Ri(e, t, n, i)
	}

	function Ri(e, t, n, i) {
		for (var r = "", a = parseInt(t); a < parseInt(n); a++) r += i.replace(/\[ i \]/g, "[ " + a + " ]").replace(/UNROLLED_LOOP_INDEX/g, a);
		return r
	}

	function Pi(e) {
		var t = "precision " + e.precision + " float;\nprecision " + e.precision + " int;";
		return "highp" === e.precision ? t += "\n#define HIGH_PRECISION" : "mediump" === e.precision ? t += "\n#define MEDIUM_PRECISION" : "lowp" === e.precision && (t += "\n#define LOW_PRECISION"), t
	}

	function Ci(e, t, n) {
		var i, r, a, o, s, c = e.getContext(),
			l = n.defines,
			h = n.vertexShader,
			u = n.fragmentShader,
			p = function (e) {
				var t = "SHADOWMAP_TYPE_BASIC";
				return 1 === e.shadowMapType ? t = "SHADOWMAP_TYPE_PCF" : 2 === e.shadowMapType ? t = "SHADOWMAP_TYPE_PCF_SOFT" : 3 === e.shadowMapType && (t = "SHADOWMAP_TYPE_VSM"), t
			}(n),
			d = function (e) {
				var t = "ENVMAP_TYPE_CUBE";
				if (e.envMap) switch (e.envMapMode) {
					case 301:
					case 302:
						t = "ENVMAP_TYPE_CUBE";
						break;
					case 306:
					case 307:
						t = "ENVMAP_TYPE_CUBE_UV";
						break;
					case 303:
					case 304:
						t = "ENVMAP_TYPE_EQUIREC";
						break;
					case 305:
						t = "ENVMAP_TYPE_SPHERE"
				}
				return t
			}(n),
			f = function (e) {
				var t = "ENVMAP_MODE_REFLECTION";
				if (e.envMap) switch (e.envMapMode) {
					case 302:
					case 304:
						t = "ENVMAP_MODE_REFRACTION"
				}
				return t
			}(n),
			m = function (e) {
				var t = "ENVMAP_BLENDING_NONE";
				if (e.envMap) switch (e.combine) {
					case 0:
						t = "ENVMAP_BLENDING_MULTIPLY";
						break;
					case 1:
						t = "ENVMAP_BLENDING_MIX";
						break;
					case 2:
						t = "ENVMAP_BLENDING_ADD"
				}
				return t
			}(n),
			v = e.gammaFactor > 0 ? e.gammaFactor : 1,
			g = n.isWebGL2 ? "" : function (e) {
				return [e.extensionDerivatives || e.envMapCubeUV || e.bumpMap || e.tangentSpaceNormalMap || e.clearcoatNormalMap || e.flatShading || "physical" === e.shaderID ? "#extension GL_OES_standard_derivatives : enable" : "", (e.extensionFragDepth || e.logarithmicDepthBuffer) && e.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", e.extensionDrawBuffers && e.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (e.extensionShaderTextureLOD || e.envMap) && e.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(xi).join("\n")
			}(n),
			y = function (e) {
				var t = [];
				for (var n in e) {
					var i = e[n];
					!1 !== i && t.push("#define " + n + " " + i)
				}
				return t.join("\n")
			}(l),
			x = c.createProgram();
		if (n.isRawShaderMaterial ? ((i = [y].filter(xi).join("\n")).length > 0 && (i += "\n"), (r = [g, y].filter(xi).join("\n")).length > 0 && (r += "\n")) : (i = [Pi(n), "#define SHADER_NAME " + n.shaderName, y, n.instancing ? "#define USE_INSTANCING" : "", n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + v, "#define MAX_BONES " + n.maxBones, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + f : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.displacementMap && n.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.vertexTangents ? "#define USE_TANGENT" : "", n.vertexColors ? "#define USE_COLOR" : "", n.vertexUvs ? "#define USE_UV" : "", n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.useVertexTexture ? "#define BONE_TEXTURE" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals && !1 === n.flatShading ? "#define USE_MORPHNORMALS" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + p : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", " attribute mat4 instanceMatrix;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_TANGENT", "\tattribute vec4 tangent;", "#endif", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(xi).join("\n"), r = [g, Pi(n), "#define SHADER_NAME " + n.shaderName, y, n.alphaTest ? "#define ALPHATEST " + n.alphaTest + (n.alphaTest % 1 ? "" : ".0") : "", "#define GAMMA_FACTOR " + v, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.matcap ? "#define USE_MATCAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + d : "", n.envMap ? "#define " + f : "", n.envMap ? "#define " + m : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.sheen ? "#define USE_SHEEN" : "", n.vertexTangents ? "#define USE_TANGENT" : "", n.vertexColors ? "#define USE_COLOR" : "", n.vertexUvs ? "#define USE_UV" : "", n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", n.gradientMap ? "#define USE_GRADIENTMAP" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + p : "", n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", n.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", (n.extensionShaderTextureLOD || n.envMap) && n.rendererExtensionShaderTextureLod ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", 0 !== n.toneMapping ? "#define TONE_MAPPING" : "", 0 !== n.toneMapping ? tn.tonemapping_pars_fragment : "", 0 !== n.toneMapping ? yi("toneMapping", n.toneMapping) : "", n.dithering ? "#define DITHERING" : "", n.outputEncoding || n.mapEncoding || n.matcapEncoding || n.envMapEncoding || n.emissiveMapEncoding || n.lightMapEncoding ? tn.encodings_pars_fragment : "", n.mapEncoding ? gi("mapTexelToLinear", n.mapEncoding) : "", n.matcapEncoding ? gi("matcapTexelToLinear", n.matcapEncoding) : "", n.envMapEncoding ? gi("envMapTexelToLinear", n.envMapEncoding) : "", n.emissiveMapEncoding ? gi("emissiveMapTexelToLinear", n.emissiveMapEncoding) : "", n.lightMapEncoding ? gi("lightMapTexelToLinear", n.lightMapEncoding) : "", n.outputEncoding ? (a = "linearToOutputTexel", o = n.outputEncoding, s = mi(o), "vec4 " + a + "( vec4 value ) { return LinearTo" + s[0] + s[1] + "; }") : "", n.depthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", "\n"].filter(xi).join("\n")), h = wi(h = bi(h = Mi(h), n), n), u = wi(u = bi(u = Mi(u), n), n), h = Ai(h), u = Ai(u), n.isWebGL2 && !n.isRawShaderMaterial) {
			var b = !1,
				w = /^\s*#version\s+300\s+es\s*\n/;
			n.isShaderMaterial && null !== h.match(w) && null !== u.match(w) && (b = !0, h = h.replace(w, ""), u = u.replace(w, "")), i = ["#version 300 es\n", "#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + i, r = ["#version 300 es\n", "#define varying in", b ? "" : "out highp vec4 pc_fragColor;", b ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + r
		}
		var _, M, S = r + u,
			T = di(c, 35633, i + h),
			E = di(c, 35632, S);
		if (c.attachShader(x, T), c.attachShader(x, E), void 0 !== n.index0AttributeName ? c.bindAttribLocation(x, 0, n.index0AttributeName) : !0 === n.morphTargets && c.bindAttribLocation(x, 0, "position"), c.linkProgram(x), e.debug.checkShaderErrors) {
			var A = c.getProgramInfoLog(x).trim(),
				L = c.getShaderInfoLog(T).trim(),
				R = c.getShaderInfoLog(E).trim(),
				P = !0,
				C = !0;
			if (!1 === c.getProgramParameter(x, 35714)) {
				P = !1;
				var O = vi(c, T, "vertex"),
					D = vi(c, E, "fragment");
				console.error("THREE.WebGLProgram: shader error: ", c.getError(), "35715", c.getProgramParameter(x, 35715), "gl.getProgramInfoLog", A, O, D)
			} else "" !== A ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", A) : "" !== L && "" !== R || (C = !1);
			C && (this.diagnostics = {
				runnable: P,
				programLog: A,
				vertexShader: {
					log: L,
					prefix: i
				},
				fragmentShader: {
					log: R,
					prefix: r
				}
			})
		}
		return c.detachShader(x, T), c.detachShader(x, E), c.deleteShader(T), c.deleteShader(E), this.getUniforms = function () {
			return void 0 === _ && (_ = new pi(c, x)), _
		}, this.getAttributes = function () {
			return void 0 === M && (M = function (e, t) {
				for (var n = {}, i = e.getProgramParameter(t, 35721), r = 0; r < i; r++) {
					var a = e.getActiveAttrib(t, r).name;
					n[a] = e.getAttribLocation(t, a)
				}
				return n
			}(c, x)), M
		}, this.destroy = function () {
			c.deleteProgram(x), this.program = void 0
		}, this.name = n.shaderName, this.id = fi++, this.cacheKey = t, this.usedTimes = 1, this.program = x, this.vertexShader = T, this.fragmentShader = E, this
	}

	function Oi(e, t, n) {
		var i = [],
			r = n.isWebGL2,
			a = n.logarithmicDepthBuffer,
			o = n.floatVertexTextures,
			s = n.precision,
			c = n.maxVertexUniforms,
			l = n.vertexTextures,
			h = {
				MeshDepthMaterial: "depth",
				MeshDistanceMaterial: "distanceRGBA",
				MeshNormalMaterial: "normal",
				MeshBasicMaterial: "basic",
				MeshLambertMaterial: "lambert",
				MeshPhongMaterial: "phong",
				MeshToonMaterial: "toon",
				MeshStandardMaterial: "physical",
				MeshPhysicalMaterial: "physical",
				MeshMatcapMaterial: "matcap",
				LineBasicMaterial: "basic",
				LineDashedMaterial: "dashed",
				PointsMaterial: "points",
				ShadowMaterial: "shadow",
				SpriteMaterial: "sprite"
			},
			u = ["precision", "isWebGL2", "supportsVertexTextures", "outputEncoding", "instancing", "map", "mapEncoding", "matcap", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding", "envMapCubeUV", "lightMap", "lightMapEncoding", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "tangentSpaceNormalMap", "clearcoatMap", "clearcoatRoughnessMap", "clearcoatNormalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "vertexTangents", "vertexUvs", "uvsVertexOnly", "fog", "useFog", "fogExp2", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "numDirLightShadows", "numPointLightShadows", "numSpotLightShadows", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering", "sheen"];

		function p(e) {
			var t;
			return e ? e.isTexture ? t = e.encoding : e.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), t = e.texture.encoding) : t = 3e3, t
		}
		this.getParameters = function (i, u, d, f, m, v, g) {
			var y = f.fog,
				x = i.isMeshStandardMaterial ? f.environment : null,
				b = i.envMap || x,
				w = h[i.type],
				_ = g.isSkinnedMesh ? function (e) {
					var t = e.skeleton.bones;
					if (o) return 1024;
					var n = c,
						i = Math.floor((n - 20) / 4),
						r = Math.min(i, t.length);
					return r < t.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + t.length + " bones. This GPU supports " + r + "."), 0) : r
				}(g) : 0;
			null !== i.precision && (s = n.getMaxPrecision(i.precision)) !== i.precision && console.warn("THREE.WebGLProgram.getParameters:", i.precision, "not supported, using", s, "instead.");
			var M = function (e, t) {
				var n;
				if (t) {
					var i = nn[t];
					n = {
						name: e.type,
						uniforms: Ht.clone(i.uniforms),
						vertexShader: i.vertexShader,
						fragmentShader: i.fragmentShader
					}
				} else n = {
					name: e.type,
					uniforms: e.uniforms,
					vertexShader: e.vertexShader,
					fragmentShader: e.fragmentShader
				};
				return n
			}(i, w);
			i.onBeforeCompile(M, e);
			var S = e.getRenderTarget();
			return {
				isWebGL2: r,
				shaderID: w,
				shaderName: M.name,
				uniforms: M.uniforms,
				vertexShader: M.vertexShader,
				fragmentShader: M.fragmentShader,
				defines: i.defines,
				isRawShaderMaterial: i.isRawShaderMaterial,
				isShaderMaterial: i.isShaderMaterial,
				precision: s,
				instancing: !0 === g.isInstancedMesh,
				supportsVertexTextures: l,
				outputEncoding: null !== S ? p(S.texture) : e.outputEncoding,
				map: !!i.map,
				mapEncoding: p(i.map),
				matcap: !!i.matcap,
				matcapEncoding: p(i.matcap),
				envMap: !!b,
				envMapMode: b && b.mapping,
				envMapEncoding: p(b),
				envMapCubeUV: !!b && (306 === b.mapping || 307 === b.mapping),
				lightMap: !!i.lightMap,
				lightMapEncoding: p(i.lightMap),
				aoMap: !!i.aoMap,
				emissiveMap: !!i.emissiveMap,
				emissiveMapEncoding: p(i.emissiveMap),
				bumpMap: !!i.bumpMap,
				normalMap: !!i.normalMap,
				objectSpaceNormalMap: 1 === i.normalMapType,
				tangentSpaceNormalMap: 0 === i.normalMapType,
				clearcoatMap: !!i.clearcoatMap,
				clearcoatRoughnessMap: !!i.clearcoatRoughnessMap,
				clearcoatNormalMap: !!i.clearcoatNormalMap,
				displacementMap: !!i.displacementMap,
				roughnessMap: !!i.roughnessMap,
				metalnessMap: !!i.metalnessMap,
				specularMap: !!i.specularMap,
				alphaMap: !!i.alphaMap,
				gradientMap: !!i.gradientMap,
				sheen: !!i.sheen,
				combine: i.combine,
				vertexTangents: i.normalMap && i.vertexTangents,
				vertexColors: i.vertexColors,
				vertexUvs: !!(i.map || i.bumpMap || i.normalMap || i.specularMap || i.alphaMap || i.emissiveMap || i.roughnessMap || i.metalnessMap || i.clearcoatMap || i.clearcoatRoughnessMap || i.clearcoatNormalMap || i.displacementMap),
				uvsVertexOnly: !(i.map || i.bumpMap || i.normalMap || i.specularMap || i.alphaMap || i.emissiveMap || i.roughnessMap || i.metalnessMap || i.clearcoatNormalMap || !i.displacementMap),
				fog: !!y,
				useFog: i.fog,
				fogExp2: y && y.isFogExp2,
				flatShading: i.flatShading,
				sizeAttenuation: i.sizeAttenuation,
				logarithmicDepthBuffer: a,
				skinning: i.skinning && _ > 0,
				maxBones: _,
				useVertexTexture: o,
				morphTargets: i.morphTargets,
				morphNormals: i.morphNormals,
				maxMorphTargets: e.maxMorphTargets,
				maxMorphNormals: e.maxMorphNormals,
				numDirLights: u.directional.length,
				numPointLights: u.point.length,
				numSpotLights: u.spot.length,
				numRectAreaLights: u.rectArea.length,
				numHemiLights: u.hemi.length,
				numDirLightShadows: u.directionalShadowMap.length,
				numPointLightShadows: u.pointShadowMap.length,
				numSpotLightShadows: u.spotShadowMap.length,
				numClippingPlanes: m,
				numClipIntersection: v,
				dithering: i.dithering,
				shadowMapEnabled: e.shadowMap.enabled && d.length > 0,
				shadowMapType: e.shadowMap.type,
				toneMapping: i.toneMapped ? e.toneMapping : 0,
				physicallyCorrectLights: e.physicallyCorrectLights,
				premultipliedAlpha: i.premultipliedAlpha,
				alphaTest: i.alphaTest,
				doubleSided: 2 === i.side,
				flipSided: 1 === i.side,
				depthPacking: void 0 !== i.depthPacking && i.depthPacking,
				index0AttributeName: i.index0AttributeName,
				extensionDerivatives: i.extensions && i.extensions.derivatives,
				extensionFragDepth: i.extensions && i.extensions.fragDepth,
				extensionDrawBuffers: i.extensions && i.extensions.drawBuffers,
				extensionShaderTextureLOD: i.extensions && i.extensions.shaderTextureLOD,
				rendererExtensionFragDepth: r || null !== t.get("EXT_frag_depth"),
				rendererExtensionDrawBuffers: r || null !== t.get("WEBGL_draw_buffers"),
				rendererExtensionShaderTextureLod: r || null !== t.get("EXT_shader_texture_lod"),
				onBeforeCompile: i.onBeforeCompile
			}
		}, this.getProgramCacheKey = function (t) {
			var n = [];
			if (t.shaderID ? n.push(t.shaderID) : (n.push(t.fragmentShader), n.push(t.vertexShader)), void 0 !== t.defines)
				for (var i in t.defines) n.push(i), n.push(t.defines[i]);
			if (void 0 === t.isRawShaderMaterial) {
				for (var r = 0; r < u.length; r++) n.push(t[u[r]]);
				n.push(e.outputEncoding), n.push(e.gammaFactor)
			}
			return n.push(t.onBeforeCompile.toString()), n.join()
		}, this.acquireProgram = function (t, n) {
			for (var r, a = 0, o = i.length; a < o; a++) {
				var s = i[a];
				if (s.cacheKey === n) {
					++(r = s).usedTimes;
					break
				}
			}
			return void 0 === r && (r = new Ci(e, n, t), i.push(r)), r
		}, this.releaseProgram = function (e) {
			if (0 == --e.usedTimes) {
				var t = i.indexOf(e);
				i[t] = i[i.length - 1], i.pop(), e.destroy()
			}
		}, this.programs = i
	}

	function Di() {
		var e = new WeakMap;
		return {
			get: function (t) {
				var n = e.get(t);
				return void 0 === n && (n = {}, e.set(t, n)), n
			},
			remove: function (t) {
				e.delete(t)
			},
			update: function (t, n, i) {
				e.get(t)[n] = i
			},
			dispose: function () {
				e = new WeakMap
			}
		}
	}

	function Ii(e, t) {
		return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.program !== t.program ? e.program.id - t.program.id : e.material.id !== t.material.id ? e.material.id - t.material.id : e.z !== t.z ? e.z - t.z : e.id - t.id
	}

	function Ni(e, t) {
		return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id
	}

	function Ui() {
		var e = [],
			t = 0,
			n = [],
			i = [],
			r = {
				id: -1
			};

		function a(n, i, a, o, s, c) {
			var l = e[t];
			return void 0 === l ? (l = {
				id: n.id,
				object: n,
				geometry: i,
				material: a,
				program: a.program || r,
				groupOrder: o,
				renderOrder: n.renderOrder,
				z: s,
				group: c
			}, e[t] = l) : (l.id = n.id, l.object = n, l.geometry = i, l.material = a, l.program = a.program || r, l.groupOrder = o, l.renderOrder = n.renderOrder, l.z = s, l.group = c), t++, l
		}
		return {
			opaque: n,
			transparent: i,
			init: function () {
				t = 0, n.length = 0, i.length = 0
			},
			push: function (e, t, r, o, s, c) {
				var l = a(e, t, r, o, s, c);
				(!0 === r.transparent ? i : n).push(l)
			},
			unshift: function (e, t, r, o, s, c) {
				var l = a(e, t, r, o, s, c);
				(!0 === r.transparent ? i : n).unshift(l)
			},
			finish: function () {
				for (var n = t, i = e.length; n < i; n++) {
					var r = e[n];
					if (null === r.id) break;
					r.id = null, r.object = null, r.geometry = null, r.material = null, r.program = null, r.group = null
				}
			},
			sort: function (e, t) {
				n.length > 1 && n.sort(e || Ii), i.length > 1 && i.sort(t || Ni)
			}
		}
	}

	function zi() {
		var e = new WeakMap;

		function t(n) {
			var i = n.target;
			i.removeEventListener("dispose", t), e.delete(i)
		}
		return {
			get: function (n, i) {
				var r, a = e.get(n);
				return void 0 === a ? (r = new Ui, e.set(n, new WeakMap), e.get(n).set(i, r), n.addEventListener("dispose", t)) : void 0 === (r = a.get(i)) && (r = new Ui, a.set(i, r)), r
			},
			dispose: function () {
				e = new WeakMap
			}
		}
	}

	function Fi() {
		var e = {};
		return {
			get: function (t) {
				if (void 0 !== e[t.id]) return e[t.id];
				var n;
				switch (t.type) {
					case "DirectionalLight":
						n = {
							direction: new x,
							color: new Ue
						};
						break;
					case "SpotLight":
						n = {
							position: new x,
							direction: new x,
							color: new Ue,
							distance: 0,
							coneCos: 0,
							penumbraCos: 0,
							decay: 0
						};
						break;
					case "PointLight":
						n = {
							position: new x,
							color: new Ue,
							distance: 0,
							decay: 0
						};
						break;
					case "HemisphereLight":
						n = {
							direction: new x,
							skyColor: new Ue,
							groundColor: new Ue
						};
						break;
					case "RectAreaLight":
						n = {
							color: new Ue,
							position: new x,
							halfWidth: new x,
							halfHeight: new x
						}
				}
				return e[t.id] = n, n
			}
		}
	}
	var Bi = 0;

	function Hi(e, t) {
		return (t.castShadow ? 1 : 0) - (e.castShadow ? 1 : 0)
	}

	function Gi() {
		for (var e, t = new Fi, n = (e = {}, {
				get: function (t) {
					if (void 0 !== e[t.id]) return e[t.id];
					var n;
					switch (t.type) {
						case "DirectionalLight":
						case "SpotLight":
							n = {
								shadowBias: 0,
								shadowRadius: 1,
								shadowMapSize: new c
							};
							break;
						case "PointLight":
							n = {
								shadowBias: 0,
								shadowRadius: 1,
								shadowMapSize: new c,
								shadowCameraNear: 1,
								shadowCameraFar: 1e3
							}
					}
					return e[t.id] = n, n
				}
			}), i = {
				version: 0,
				hash: {
					directionalLength: -1,
					pointLength: -1,
					spotLength: -1,
					rectAreaLength: -1,
					hemiLength: -1,
					numDirectionalShadows: -1,
					numPointShadows: -1,
					numSpotShadows: -1
				},
				ambient: [0, 0, 0],
				probe: [],
				directional: [],
				directionalShadow: [],
				directionalShadowMap: [],
				directionalShadowMatrix: [],
				spot: [],
				spotShadow: [],
				spotShadowMap: [],
				spotShadowMatrix: [],
				rectArea: [],
				point: [],
				pointShadow: [],
				pointShadowMap: [],
				pointShadowMatrix: [],
				hemi: []
			}, r = 0; r < 9; r++) i.probe.push(new x);
		var a = new x,
			o = new A,
			s = new A;
		return {
			setup: function (e, r, c) {
				for (var l = 0, h = 0, u = 0, p = 0; p < 9; p++) i.probe[p].set(0, 0, 0);
				var d = 0,
					f = 0,
					m = 0,
					v = 0,
					g = 0,
					y = 0,
					x = 0,
					b = 0,
					w = c.matrixWorldInverse;
				e.sort(Hi), p = 0;
				for (var _ = e.length; p < _; p++) {
					var M = e[p],
						S = M.color,
						T = M.intensity,
						E = M.distance,
						A = M.shadow && M.shadow.map ? M.shadow.map.texture : null;
					if (M.isAmbientLight) l += S.r * T, h += S.g * T, u += S.b * T;
					else if (M.isLightProbe)
						for (var L = 0; L < 9; L++) i.probe[L].addScaledVector(M.sh.coefficients[L], T);
					else if (M.isDirectionalLight) {
						if ((C = t.get(M)).color.copy(M.color).multiplyScalar(M.intensity), C.direction.setFromMatrixPosition(M.matrixWorld), a.setFromMatrixPosition(M.target.matrixWorld), C.direction.sub(a), C.direction.transformDirection(w), M.castShadow) {
							var R = M.shadow;
							(P = n.get(M)).shadowBias = R.bias, P.shadowRadius = R.radius, P.shadowMapSize = R.mapSize, i.directionalShadow[d] = P, i.directionalShadowMap[d] = A, i.directionalShadowMatrix[d] = M.shadow.matrix, y++
						}
						i.directional[d] = C, d++
					} else if (M.isSpotLight) {
						if ((C = t.get(M)).position.setFromMatrixPosition(M.matrixWorld), C.position.applyMatrix4(w), C.color.copy(S).multiplyScalar(T), C.distance = E, C.direction.setFromMatrixPosition(M.matrixWorld), a.setFromMatrixPosition(M.target.matrixWorld), C.direction.sub(a), C.direction.transformDirection(w), C.coneCos = Math.cos(M.angle), C.penumbraCos = Math.cos(M.angle * (1 - M.penumbra)), C.decay = M.decay, M.castShadow) {
							R = M.shadow;
							(P = n.get(M)).shadowBias = R.bias, P.shadowRadius = R.radius, P.shadowMapSize = R.mapSize, i.spotShadow[m] = P, i.spotShadowMap[m] = A, i.spotShadowMatrix[m] = M.shadow.matrix, b++
						}
						i.spot[m] = C, m++
					} else if (M.isRectAreaLight) {
						(C = t.get(M)).color.copy(S).multiplyScalar(T), C.position.setFromMatrixPosition(M.matrixWorld), C.position.applyMatrix4(w), s.identity(), o.copy(M.matrixWorld), o.premultiply(w), s.extractRotation(o), C.halfWidth.set(.5 * M.width, 0, 0), C.halfHeight.set(0, .5 * M.height, 0), C.halfWidth.applyMatrix4(s), C.halfHeight.applyMatrix4(s), i.rectArea[v] = C, v++
					} else if (M.isPointLight) {
						if ((C = t.get(M)).position.setFromMatrixPosition(M.matrixWorld), C.position.applyMatrix4(w), C.color.copy(M.color).multiplyScalar(M.intensity), C.distance = M.distance, C.decay = M.decay, M.castShadow) {
							var P;
							R = M.shadow;
							(P = n.get(M)).shadowBias = R.bias, P.shadowRadius = R.radius, P.shadowMapSize = R.mapSize, P.shadowCameraNear = R.camera.near, P.shadowCameraFar = R.camera.far, i.pointShadow[f] = P, i.pointShadowMap[f] = A, i.pointShadowMatrix[f] = M.shadow.matrix, x++
						}
						i.point[f] = C, f++
					} else if (M.isHemisphereLight) {
						var C;
						(C = t.get(M)).direction.setFromMatrixPosition(M.matrixWorld), C.direction.transformDirection(w), C.direction.normalize(), C.skyColor.copy(M.color).multiplyScalar(T), C.groundColor.copy(M.groundColor).multiplyScalar(T), i.hemi[g] = C, g++
					}
				}
				i.ambient[0] = l, i.ambient[1] = h, i.ambient[2] = u;
				var O = i.hash;
				O.directionalLength === d && O.pointLength === f && O.spotLength === m && O.rectAreaLength === v && O.hemiLength === g && O.numDirectionalShadows === y && O.numPointShadows === x && O.numSpotShadows === b || (i.directional.length = d, i.spot.length = m, i.rectArea.length = v, i.point.length = f, i.hemi.length = g, i.directionalShadow.length = y, i.directionalShadowMap.length = y, i.pointShadow.length = x, i.pointShadowMap.length = x, i.spotShadow.length = b, i.spotShadowMap.length = b, i.directionalShadowMatrix.length = y, i.pointShadowMatrix.length = x, i.spotShadowMatrix.length = b, O.directionalLength = d, O.pointLength = f, O.spotLength = m, O.rectAreaLength = v, O.hemiLength = g, O.numDirectionalShadows = y, O.numPointShadows = x, O.numSpotShadows = b, i.version = Bi++)
			},
			state: i
		}
	}

	function ki() {
		var e = new Gi,
			t = [],
			n = [];
		return {
			init: function () {
				t.length = 0, n.length = 0
			},
			state: {
				lightsArray: t,
				shadowsArray: n,
				lights: e
			},
			setupLights: function (i) {
				e.setup(t, n, i)
			},
			pushLight: function (e) {
				t.push(e)
			},
			pushShadow: function (e) {
				n.push(e)
			}
		}
	}

	function Vi() {
		var e = new WeakMap;

		function t(n) {
			var i = n.target;
			i.removeEventListener("dispose", t), e.delete(i)
		}
		return {
			get: function (n, i) {
				var r;
				return !1 === e.has(n) ? (r = new ki, e.set(n, new WeakMap), e.get(n).set(i, r), n.addEventListener("dispose", t)) : !1 === e.get(n).has(i) ? (r = new ki, e.get(n).set(i, r)) : r = e.get(n).get(i), r
			},
			dispose: function () {
				e = new WeakMap
			}
		}
	}

	function ji(e) {
		ke.call(this), this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.setValues(e)
	}

	function Wi(e) {
		ke.call(this), this.type = "MeshDistanceMaterial", this.referencePosition = new x, this.nearDistance = 1, this.farDistance = 1e3, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.fog = !1, this.setValues(e)
	}
	ji.prototype = Object.create(ke.prototype), ji.prototype.constructor = ji, ji.prototype.isMeshDepthMaterial = !0, ji.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.depthPacking = e.depthPacking, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this
	}, Wi.prototype = Object.create(ke.prototype), Wi.prototype.constructor = Wi, Wi.prototype.isMeshDistanceMaterial = !0, Wi.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.referencePosition.copy(e.referencePosition), this.nearDistance = e.nearDistance, this.farDistance = e.farDistance, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this
	};

	function qi(e, t, n) {
		var i = new Zt,
			r = new c,
			a = new c,
			o = new d,
			s = [],
			l = [],
			h = {},
			u = {
				0: 1,
				1: 0,
				2: 2
			},
			p = new Gt({
				defines: {
					SAMPLE_RATE: 2 / 8,
					HALF_SAMPLE_RATE: 1 / 8
				},
				uniforms: {
					shadow_pass: {
						value: null
					},
					resolution: {
						value: new c
					},
					radius: {
						value: 4
					}
				},
				vertexShader: "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",
				fragmentShader: "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n  float mean = 0.0;\n  float squared_mean = 0.0;\n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy  ) / resolution ) );\n  for ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n    #ifdef HORIZONAL_PASS\n      vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n      mean += distribution.x;\n      squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n    #else\n      float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0,  i )  * radius ) / resolution ) );\n      mean += depth;\n      squared_mean += depth * depth;\n    #endif\n  }\n  mean = mean * HALF_SAMPLE_RATE;\n  squared_mean = squared_mean * HALF_SAMPLE_RATE;\n  float std_dev = sqrt( squared_mean - mean * mean );\n  gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}"
			}),
			m = p.clone();
		m.defines.HORIZONAL_PASS = 1;
		var v = new ht;
		v.setAttribute("position", new We(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));
		var g = new Lt(v, p),
			y = this;

		function x(n, i) {
			var r = t.update(g);
			p.uniforms.shadow_pass.value = n.map.texture, p.uniforms.resolution.value = n.mapSize, p.uniforms.radius.value = n.radius, e.setRenderTarget(n.mapPass), e.clear(), e.renderBufferDirect(i, null, r, p, g, null), m.uniforms.shadow_pass.value = n.mapPass.texture, m.uniforms.resolution.value = n.mapSize, m.uniforms.radius.value = n.radius, e.setRenderTarget(n.map), e.clear(), e.renderBufferDirect(i, null, r, m, g, null)
		}

		function b(e, t, n) {
			var i = e << 0 | t << 1 | n << 2,
				r = s[i];
			return void 0 === r && (r = new ji({
				depthPacking: 3201,
				morphTargets: e,
				skinning: t
			}), s[i] = r), r
		}

		function w(e, t, n) {
			var i = e << 0 | t << 1 | n << 2,
				r = l[i];
			return void 0 === r && (r = new Wi({
				morphTargets: e,
				skinning: t
			}), l[i] = r), r
		}

		function _(t, n, i, r, a, o) {
			var s = t.geometry,
				c = null,
				l = b,
				p = t.customDepthMaterial;
			if (!0 === i.isPointLight && (l = w, p = t.customDistanceMaterial), void 0 === p) {
				var d = !1;
				!0 === n.morphTargets && (!0 === s.isBufferGeometry ? d = s.morphAttributes && s.morphAttributes.position && s.morphAttributes.position.length > 0 : !0 === s.isGeometry && (d = s.morphTargets && s.morphTargets.length > 0));
				var f = !1;
				!0 === t.isSkinnedMesh && (!0 === n.skinning ? f = !0 : console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", t)), c = l(d, f, !0 === t.isInstancedMesh)
			} else c = p;
			if (e.localClippingEnabled && !0 === n.clipShadows && 0 !== n.clippingPlanes.length) {
				var m = c.uuid,
					v = n.uuid,
					g = h[m];
				void 0 === g && (g = {}, h[m] = g);
				var y = g[v];
				void 0 === y && (y = c.clone(), g[v] = y), c = y
			}
			return c.visible = n.visible, c.wireframe = n.wireframe, c.side = 3 === o ? null !== n.shadowSide ? n.shadowSide : n.side : null !== n.shadowSide ? n.shadowSide : u[n.side], c.clipShadows = n.clipShadows, c.clippingPlanes = n.clippingPlanes, c.clipIntersection = n.clipIntersection, c.wireframeLinewidth = n.wireframeLinewidth, c.linewidth = n.linewidth, !0 === i.isPointLight && !0 === c.isMeshDistanceMaterial && (c.referencePosition.setFromMatrixPosition(i.matrixWorld), c.nearDistance = r, c.farDistance = a), c
		}

		function M(n, r, a, o, s) {
			if (!1 !== n.visible) {
				if (n.layers.test(r.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && 3 === s) && (!n.frustumCulled || i.intersectsObject(n))) {
					n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld);
					var c = t.update(n),
						l = n.material;
					if (Array.isArray(l))
						for (var h = c.groups, u = 0, p = h.length; u < p; u++) {
							var d = h[u],
								f = l[d.materialIndex];
							if (f && f.visible) {
								var m = _(n, f, o, a.near, a.far, s);
								e.renderBufferDirect(a, null, c, m, n, d)
							}
						} else if (l.visible) {
							m = _(n, l, o, a.near, a.far, s);
							e.renderBufferDirect(a, null, c, m, n, null)
						}
				}
				for (var v = n.children, g = 0, y = v.length; g < y; g++) M(v[g], r, a, o, s)
			}
		}
		this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1, this.render = function (t, s, c) {
			if (!1 !== y.enabled && (!1 !== y.autoUpdate || !1 !== y.needsUpdate) && 0 !== t.length) {
				var l = e.getRenderTarget(),
					h = e.getActiveCubeFace(),
					u = e.getActiveMipmapLevel(),
					p = e.state;
				p.setBlending(0), p.buffers.color.setClear(1, 1, 1, 1), p.buffers.depth.setTest(!0), p.setScissorTest(!1);
				for (var d = 0, m = t.length; d < m; d++) {
					var v = t[d],
						g = v.shadow;
					if (void 0 !== g) {
						r.copy(g.mapSize);
						var b = g.getFrameExtents();
						if (r.multiply(b), a.copy(g.mapSize), (r.x > n || r.y > n) && (console.warn("THREE.WebGLShadowMap:", v, "has shadow exceeding max texture size, reducing"), r.x > n && (a.x = Math.floor(n / b.x), r.x = a.x * b.x, g.mapSize.x = a.x), r.y > n && (a.y = Math.floor(n / b.y), r.y = a.y * b.y, g.mapSize.y = a.y)), null === g.map && !g.isPointLightShadow && 3 === this.type) {
							var w = {
								minFilter: 1006,
								magFilter: 1006,
								format: 1023
							};
							g.map = new f(r.x, r.y, w), g.map.texture.name = v.name + ".shadowMap", g.mapPass = new f(r.x, r.y, w), g.camera.updateProjectionMatrix()
						}
						if (null === g.map) {
							w = {
								minFilter: 1003,
								magFilter: 1003,
								format: 1023
							};
							g.map = new f(r.x, r.y, w), g.map.texture.name = v.name + ".shadowMap", g.camera.updateProjectionMatrix()
						}
						e.setRenderTarget(g.map), e.clear();
						for (var _ = g.getViewportCount(), S = 0; S < _; S++) {
							var T = g.getViewport(S);
							o.set(a.x * T.x, a.y * T.y, a.x * T.z, a.y * T.w), p.viewport(o), g.updateMatrices(v, S), i = g.getFrustum(), M(s, c, g.camera, v, this.type)
						}
						g.isPointLightShadow || 3 !== this.type || x(g, c)
					} else console.warn("THREE.WebGLShadowMap:", v, "has no shadow.")
				}
				y.needsUpdate = !1, e.setRenderTarget(l, h, u)
			}
		}
	}

	function Xi(e, t, n) {
		var i = n.isWebGL2;
		var r = new function () {
				var t = !1,
					n = new d,
					i = null,
					r = new d(0, 0, 0, 0);
				return {
					setMask: function (n) {
						i === n || t || (e.colorMask(n, n, n, n), i = n)
					},
					setLocked: function (e) {
						t = e
					},
					setClear: function (t, i, a, o, s) {
						!0 === s && (t *= o, i *= o, a *= o), n.set(t, i, a, o), !1 === r.equals(n) && (e.clearColor(t, i, a, o), r.copy(n))
					},
					reset: function () {
						t = !1, i = null, r.set(-1, 0, 0, 0)
					}
				}
			},
			a = new function () {
				var t = !1,
					n = null,
					i = null,
					r = null;
				return {
					setTest: function (e) {
						e ? B(2929) : H(2929)
					},
					setMask: function (i) {
						n === i || t || (e.depthMask(i), n = i)
					},
					setFunc: function (t) {
						if (i !== t) {
							if (t) switch (t) {
								case 0:
									e.depthFunc(512);
									break;
								case 1:
									e.depthFunc(519);
									break;
								case 2:
									e.depthFunc(513);
									break;
								case 3:
									e.depthFunc(515);
									break;
								case 4:
									e.depthFunc(514);
									break;
								case 5:
									e.depthFunc(518);
									break;
								case 6:
									e.depthFunc(516);
									break;
								case 7:
									e.depthFunc(517);
									break;
								default:
									e.depthFunc(515)
							} else e.depthFunc(515);
							i = t
						}
					},
					setLocked: function (e) {
						t = e
					},
					setClear: function (t) {
						r !== t && (e.clearDepth(t), r = t)
					},
					reset: function () {
						t = !1, n = null, i = null, r = null
					}
				}
			},
			o = new function () {
				var t = !1,
					n = null,
					i = null,
					r = null,
					a = null,
					o = null,
					s = null,
					c = null,
					l = null;
				return {
					setTest: function (e) {
						t || (e ? B(2960) : H(2960))
					},
					setMask: function (i) {
						n === i || t || (e.stencilMask(i), n = i)
					},
					setFunc: function (t, n, o) {
						i === t && r === n && a === o || (e.stencilFunc(t, n, o), i = t, r = n, a = o)
					},
					setOp: function (t, n, i) {
						o === t && s === n && c === i || (e.stencilOp(t, n, i), o = t, s = n, c = i)
					},
					setLocked: function (e) {
						t = e
					},
					setClear: function (t) {
						l !== t && (e.clearStencil(t), l = t)
					},
					reset: function () {
						t = !1, n = null, i = null, r = null, a = null, o = null, s = null, c = null, l = null
					}
				}
			},
			s = e.getParameter(34921),
			c = new Uint8Array(s),
			l = new Uint8Array(s),
			h = new Uint8Array(s),
			u = {},
			p = null,
			f = null,
			m = null,
			v = null,
			g = null,
			y = null,
			x = null,
			b = null,
			w = null,
			_ = !1,
			M = null,
			S = null,
			T = null,
			E = null,
			A = null,
			L = e.getParameter(35661),
			R = !1,
			P = 0,
			C = e.getParameter(7938); - 1 !== C.indexOf("WebGL") ? (P = parseFloat(/^WebGL\ ([0-9])/.exec(C)[1]), R = P >= 1) : -1 !== C.indexOf("OpenGL ES") && (P = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(C)[1]), R = P >= 2);
		var O = null,
			D = {},
			I = new d,
			N = new d;

		function U(t, n, i) {
			var r = new Uint8Array(4),
				a = e.createTexture();
			e.bindTexture(t, a), e.texParameteri(t, 10241, 9728), e.texParameteri(t, 10240, 9728);
			for (var o = 0; o < i; o++) e.texImage2D(n + o, 0, 6408, 1, 1, 0, 6408, 5121, r);
			return a
		}
		var z = {};

		function F(n, r) {
			(c[n] = 1, 0 === l[n] && (e.enableVertexAttribArray(n), l[n] = 1), h[n] !== r) && ((i ? e : t.get("ANGLE_instanced_arrays"))[i ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](n, r), h[n] = r)
		}

		function B(t) {
			!0 !== u[t] && (e.enable(t), u[t] = !0)
		}

		function H(t) {
			!1 !== u[t] && (e.disable(t), u[t] = !1)
		}
		z[3553] = U(3553, 3553, 1), z[34067] = U(34067, 34069, 6), r.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), B(2929), a.setFunc(3), W(!1), q(1), B(2884), j(0);
		var G = {
			100: 32774,
			101: 32778,
			102: 32779
		};
		if (i) G[103] = 32775, G[104] = 32776;
		else {
			var k = t.get("EXT_blend_minmax");
			null !== k && (G[103] = k.MIN_EXT, G[104] = k.MAX_EXT)
		}
		var V = {
			200: 0,
			201: 1,
			202: 768,
			204: 770,
			210: 776,
			208: 774,
			206: 772,
			203: 769,
			205: 771,
			209: 775,
			207: 773
		};

		function j(t, n, i, r, a, o, s, c) {
			if (0 !== t) {
				if (f || (B(3042), f = !0), 5 === t) a = a || n, o = o || i, s = s || r, n === v && a === x || (e.blendEquationSeparate(G[n], G[a]), v = n, x = a), i === g && r === y && o === b && s === w || (e.blendFuncSeparate(V[i], V[r], V[o], V[s]), g = i, y = r, b = o, w = s), m = t, _ = null;
				else if (t !== m || c !== _) {
					if (100 === v && 100 === x || (e.blendEquation(32774), v = 100, x = 100), c) switch (t) {
						case 1:
							e.blendFuncSeparate(1, 771, 1, 771);
							break;
						case 2:
							e.blendFunc(1, 1);
							break;
						case 3:
							e.blendFuncSeparate(0, 0, 769, 771);
							break;
						case 4:
							e.blendFuncSeparate(0, 768, 0, 770);
							break;
						default:
							console.error("THREE.WebGLState: Invalid blending: ", t)
					} else switch (t) {
						case 1:
							e.blendFuncSeparate(770, 771, 1, 771);
							break;
						case 2:
							e.blendFunc(770, 1);
							break;
						case 3:
							e.blendFunc(0, 769);
							break;
						case 4:
							e.blendFunc(0, 768);
							break;
						default:
							console.error("THREE.WebGLState: Invalid blending: ", t)
					}
					g = null, y = null, b = null, w = null, m = t, _ = c
				}
			} else f && (H(3042), f = !1)
		}

		function W(t) {
			M !== t && (t ? e.frontFace(2304) : e.frontFace(2305), M = t)
		}

		function q(t) {
			0 !== t ? (B(2884), t !== S && (1 === t ? e.cullFace(1029) : 2 === t ? e.cullFace(1028) : e.cullFace(1032))) : H(2884), S = t
		}

		function X(t, n, i) {
			t ? (B(32823), E === n && A === i || (e.polygonOffset(n, i), E = n, A = i)) : H(32823)
		}

		function Y(t) {
			void 0 === t && (t = 33984 + L - 1), O !== t && (e.activeTexture(t), O = t)
		}
		return {
			buffers: {
				color: r,
				depth: a,
				stencil: o
			},
			initAttributes: function () {
				for (var e = 0, t = c.length; e < t; e++) c[e] = 0
			},
			enableAttribute: function (e) {
				F(e, 0)
			},
			enableAttributeAndDivisor: F,
			disableUnusedAttributes: function () {
				for (var t = 0, n = l.length; t !== n; ++t) l[t] !== c[t] && (e.disableVertexAttribArray(t), l[t] = 0)
			},
			enable: B,
			disable: H,
			useProgram: function (t) {
				return p !== t && (e.useProgram(t), p = t, !0)
			},
			setBlending: j,
			setMaterial: function (e, t) {
				2 === e.side ? H(2884) : B(2884);
				var n = 1 === e.side;
				t && (n = !n), W(n), 1 === e.blending && !1 === e.transparent ? j(0) : j(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha), a.setFunc(e.depthFunc), a.setTest(e.depthTest), a.setMask(e.depthWrite), r.setMask(e.colorWrite);
				var i = e.stencilWrite;
				o.setTest(i), i && (o.setMask(e.stencilWriteMask), o.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask), o.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass)), X(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits)
			},
			setFlipSided: W,
			setCullFace: q,
			setLineWidth: function (t) {
				t !== T && (R && e.lineWidth(t), T = t)
			},
			setPolygonOffset: X,
			setScissorTest: function (e) {
				e ? B(3089) : H(3089)
			},
			activeTexture: Y,
			bindTexture: function (t, n) {
				null === O && Y();
				var i = D[O];
				void 0 === i && (i = {
					type: void 0,
					texture: void 0
				}, D[O] = i), i.type === t && i.texture === n || (e.bindTexture(t, n || z[t]), i.type = t, i.texture = n)
			},
			unbindTexture: function () {
				var t = D[O];
				void 0 !== t && void 0 !== t.type && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0)
			},
			compressedTexImage2D: function () {
				try {
					e.compressedTexImage2D.apply(e, arguments)
				} catch (e) {
					console.error("THREE.WebGLState:", e)
				}
			},
			texImage2D: function () {
				try {
					e.texImage2D.apply(e, arguments)
				} catch (e) {
					console.error("THREE.WebGLState:", e)
				}
			},
			texImage3D: function () {
				try {
					e.texImage3D.apply(e, arguments)
				} catch (e) {
					console.error("THREE.WebGLState:", e)
				}
			},
			scissor: function (t) {
				!1 === I.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), I.copy(t))
			},
			viewport: function (t) {
				!1 === N.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), N.copy(t))
			},
			reset: function () {
				for (var t = 0; t < l.length; t++) 1 === l[t] && (e.disableVertexAttribArray(t), l[t] = 0);
				u = {}, O = null, D = {}, p = null, m = null, M = null, S = null, r.reset(), a.reset(), o.reset()
			}
		}
	}

	function Yi(e, t, n, i, r, a, o) {
		var c, l = r.isWebGL2,
			h = r.maxTextures,
			u = r.maxCubemapSize,
			p = r.maxTextureSize,
			d = r.maxSamples,
			f = new WeakMap,
			m = !1;
		try {
			m = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d")
		} catch (e) {}

		function v(e, t) {
			return m ? new OffscreenCanvas(e, t) : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")
		}

		function g(e, t, n, i) {
			var r = 1;
			if ((e.width > i || e.height > i) && (r = i / Math.max(e.width, e.height)), r < 1 || !0 === t) {
				if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap) {
					var a = t ? s.floorPowerOfTwo : Math.floor,
						o = a(r * e.width),
						l = a(r * e.height);
					void 0 === c && (c = v(o, l));
					var h = n ? v(o, l) : c;
					return h.width = o, h.height = l, h.getContext("2d").drawImage(e, 0, 0, o, l), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + e.width + "x" + e.height + ") to (" + o + "x" + l + ")."), h
				}
				return "data" in e && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + e.width + "x" + e.height + ")."), e
			}
			return e
		}

		function y(e) {
			return s.isPowerOfTwo(e.width) && s.isPowerOfTwo(e.height)
		}

		function x(e, t) {
			return e.generateMipmaps && t && 1003 !== e.minFilter && 1006 !== e.minFilter
		}

		function b(t, n, r, a) {
			e.generateMipmap(t), i.get(n).__maxMipLevel = Math.log(Math.max(r, a)) * Math.LOG2E
		}

		function w(n, i, r) {
			if (!1 === l) return i;
			if (null !== n) {
				if (void 0 !== e[n]) return e[n];
				console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'")
			}
			var a = i;
			return 6403 === i && (5126 === r && (a = 33326), 5131 === r && (a = 33325), 5121 === r && (a = 33321)), 6407 === i && (5126 === r && (a = 34837), 5131 === r && (a = 34843), 5121 === r && (a = 32849)), 6408 === i && (5126 === r && (a = 34836), 5131 === r && (a = 34842), 5121 === r && (a = 32856)), 33325 !== a && 33326 !== a && 34842 !== a && 34836 !== a || t.get("EXT_color_buffer_float"), a
		}

		function _(e) {
			return 1003 === e || 1004 === e || 1005 === e ? 9728 : 9729
		}

		function M(t) {
			var n = t.target;
			n.removeEventListener("dispose", M),
				function (t) {
					var n = i.get(t);
					if (void 0 === n.__webglInit) return;
					e.deleteTexture(n.__webglTexture), i.remove(t)
				}(n), n.isVideoTexture && f.delete(n), o.memory.textures--
		}

		function S(t) {
			var n = t.target;
			n.removeEventListener("dispose", S),
				function (t) {
					var n = i.get(t),
						r = i.get(t.texture);
					if (!t) return;
					void 0 !== r.__webglTexture && e.deleteTexture(r.__webglTexture);
					t.depthTexture && t.depthTexture.dispose();
					if (t.isWebGLCubeRenderTarget)
						for (var a = 0; a < 6; a++) e.deleteFramebuffer(n.__webglFramebuffer[a]), n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer[a]);
					else e.deleteFramebuffer(n.__webglFramebuffer), n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer), n.__webglMultisampledFramebuffer && e.deleteFramebuffer(n.__webglMultisampledFramebuffer), n.__webglColorRenderbuffer && e.deleteRenderbuffer(n.__webglColorRenderbuffer), n.__webglDepthRenderbuffer && e.deleteRenderbuffer(n.__webglDepthRenderbuffer);
					i.remove(t.texture), i.remove(t)
				}(n), o.memory.textures--
		}
		var T = 0;

		function E(e, t) {
			var r = i.get(e);
			if (e.isVideoTexture && function (e) {
					var t = o.render.frame;
					f.get(e) !== t && (f.set(e, t), e.update())
				}(e), e.version > 0 && r.__version !== e.version) {
				var a = e.image;
				if (void 0 === a) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");
				else {
					if (!1 !== a.complete) return void D(r, e, t);
					console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")
				}
			}
			n.activeTexture(33984 + t), n.bindTexture(3553, r.__webglTexture)
		}

		function A(t, r) {
			if (6 === t.image.length) {
				var o = i.get(t);
				if (t.version > 0 && o.__version !== t.version) {
					O(o, t), n.activeTexture(33984 + r), n.bindTexture(34067, o.__webglTexture), e.pixelStorei(37440, t.flipY);
					for (var s = t && (t.isCompressedTexture || t.image[0].isCompressedTexture), c = t.image[0] && t.image[0].isDataTexture, h = [], p = 0; p < 6; p++) h[p] = s || c ? c ? t.image[p].image : t.image[p] : g(t.image[p], !1, !0, u);
					var d, f = h[0],
						m = y(f) || l,
						v = a.convert(t.format),
						_ = a.convert(t.type),
						M = w(t.internalFormat, v, _);
					if (C(34067, t, m), s) {
						for (p = 0; p < 6; p++) {
							d = h[p].mipmaps;
							for (var S = 0; S < d.length; S++) {
								var T = d[S];
								1023 !== t.format && 1022 !== t.format ? null !== v ? n.compressedTexImage2D(34069 + p, S, M, T.width, T.height, 0, T.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : n.texImage2D(34069 + p, S, M, T.width, T.height, 0, v, _, T.data)
							}
						}
						o.__maxMipLevel = d.length - 1
					} else {
						d = t.mipmaps;
						for (p = 0; p < 6; p++)
							if (c) {
								n.texImage2D(34069 + p, 0, M, h[p].width, h[p].height, 0, v, _, h[p].data);
								for (S = 0; S < d.length; S++) {
									var E = (T = d[S]).image[p].image;
									n.texImage2D(34069 + p, S + 1, M, E.width, E.height, 0, v, _, E.data)
								}
							} else {
								n.texImage2D(34069 + p, 0, M, v, _, h[p]);
								for (S = 0; S < d.length; S++) {
									T = d[S];
									n.texImage2D(34069 + p, S + 1, M, v, _, T.image[p])
								}
							}
						o.__maxMipLevel = d.length
					}
					x(t, m) && b(34067, t, f.width, f.height), o.__version = t.version, t.onUpdate && t.onUpdate(t)
				} else n.activeTexture(33984 + r), n.bindTexture(34067, o.__webglTexture)
			}
		}

		function L(e, t) {
			n.activeTexture(33984 + t), n.bindTexture(34067, i.get(e).__webglTexture)
		}
		var R = {
				1e3: 10497,
				1001: 33071,
				1002: 33648
			},
			P = {
				1003: 9728,
				1004: 9984,
				1005: 9986,
				1006: 9729,
				1007: 9985,
				1008: 9987
			};

		function C(n, a, o) {
			o ? (e.texParameteri(n, 10242, R[a.wrapS]), e.texParameteri(n, 10243, R[a.wrapT]), 32879 !== n && 35866 !== n || e.texParameteri(n, 32882, R[a.wrapR]), e.texParameteri(n, 10240, P[a.magFilter]), e.texParameteri(n, 10241, P[a.minFilter])) : (e.texParameteri(n, 10242, 33071), e.texParameteri(n, 10243, 33071), 32879 !== n && 35866 !== n || e.texParameteri(n, 32882, 33071), 1001 === a.wrapS && 1001 === a.wrapT || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), e.texParameteri(n, 10240, _(a.magFilter)), e.texParameteri(n, 10241, _(a.minFilter)), 1003 !== a.minFilter && 1006 !== a.minFilter && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."));
			var s = t.get("EXT_texture_filter_anisotropic");
			if (s) {
				if (1015 === a.type && null === t.get("OES_texture_float_linear")) return;
				if (1016 === a.type && null === (l || t.get("OES_texture_half_float_linear"))) return;
				(a.anisotropy > 1 || i.get(a).__currentAnisotropy) && (e.texParameterf(n, s.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, r.getMaxAnisotropy())), i.get(a).__currentAnisotropy = a.anisotropy)
			}
		}

		function O(t, n) {
			void 0 === t.__webglInit && (t.__webglInit = !0, n.addEventListener("dispose", M), t.__webglTexture = e.createTexture(), o.memory.textures++)
		}

		function D(t, i, r) {
			var o = 3553;
			i.isDataTexture2DArray && (o = 35866), i.isDataTexture3D && (o = 32879), O(t, i), n.activeTexture(33984 + r), n.bindTexture(o, t.__webglTexture), e.pixelStorei(37440, i.flipY), e.pixelStorei(37441, i.premultiplyAlpha), e.pixelStorei(3317, i.unpackAlignment);
			var s = function (e) {
					return !l && (1001 !== e.wrapS || 1001 !== e.wrapT || 1003 !== e.minFilter && 1006 !== e.minFilter)
				}(i) && !1 === y(i.image),
				c = g(i.image, s, !1, p),
				h = y(c) || l,
				u = a.convert(i.format),
				d = a.convert(i.type),
				f = w(i.internalFormat, u, d);
			C(o, i, h);
			var m, v = i.mipmaps;
			if (i.isDepthTexture) f = 6402, l ? f = 1015 === i.type ? 36012 : 1014 === i.type ? 33190 : 1020 === i.type ? 35056 : 33189 : 1015 === i.type && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), 1026 === i.format && 6402 === f && 1012 !== i.type && 1014 !== i.type && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), i.type = 1012, d = a.convert(i.type)), 1027 === i.format && 6402 === f && (f = 34041, 1020 !== i.type && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), i.type = 1020, d = a.convert(i.type))), n.texImage2D(3553, 0, f, c.width, c.height, 0, u, d, null);
			else if (i.isDataTexture)
				if (v.length > 0 && h) {
					for (var _ = 0, M = v.length; _ < M; _++) m = v[_], n.texImage2D(3553, _, f, m.width, m.height, 0, u, d, m.data);
					i.generateMipmaps = !1, t.__maxMipLevel = v.length - 1
				} else n.texImage2D(3553, 0, f, c.width, c.height, 0, u, d, c.data), t.__maxMipLevel = 0;
			else if (i.isCompressedTexture) {
				for (_ = 0, M = v.length; _ < M; _++) m = v[_], 1023 !== i.format && 1022 !== i.format ? null !== u ? n.compressedTexImage2D(3553, _, f, m.width, m.height, 0, m.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : n.texImage2D(3553, _, f, m.width, m.height, 0, u, d, m.data);
				t.__maxMipLevel = v.length - 1
			} else if (i.isDataTexture2DArray) n.texImage3D(35866, 0, f, c.width, c.height, c.depth, 0, u, d, c.data), t.__maxMipLevel = 0;
			else if (i.isDataTexture3D) n.texImage3D(32879, 0, f, c.width, c.height, c.depth, 0, u, d, c.data), t.__maxMipLevel = 0;
			else if (v.length > 0 && h) {
				for (_ = 0, M = v.length; _ < M; _++) m = v[_], n.texImage2D(3553, _, f, u, d, m);
				i.generateMipmaps = !1, t.__maxMipLevel = v.length - 1
			} else n.texImage2D(3553, 0, f, u, d, c), t.__maxMipLevel = 0;
			x(i, h) && b(o, i, c.width, c.height), t.__version = i.version, i.onUpdate && i.onUpdate(i)
		}

		function I(t, r, o, s) {
			var c = a.convert(r.texture.format),
				l = a.convert(r.texture.type),
				h = w(r.texture.internalFormat, c, l);
			n.texImage2D(s, 0, h, r.width, r.height, 0, c, l, null), e.bindFramebuffer(36160, t), e.framebufferTexture2D(36160, o, s, i.get(r.texture).__webglTexture, 0), e.bindFramebuffer(36160, null)
		}

		function N(t, n, i) {
			if (e.bindRenderbuffer(36161, t), n.depthBuffer && !n.stencilBuffer) {
				var r = 33189;
				if (i) {
					var o = n.depthTexture;
					o && o.isDepthTexture && (1015 === o.type ? r = 36012 : 1014 === o.type && (r = 33190));
					var s = z(n);
					e.renderbufferStorageMultisample(36161, s, r, n.width, n.height)
				} else e.renderbufferStorage(36161, r, n.width, n.height);
				e.framebufferRenderbuffer(36160, 36096, 36161, t)
			} else if (n.depthBuffer && n.stencilBuffer) {
				if (i) {
					s = z(n);
					e.renderbufferStorageMultisample(36161, s, 35056, n.width, n.height)
				} else e.renderbufferStorage(36161, 34041, n.width, n.height);
				e.framebufferRenderbuffer(36160, 33306, 36161, t)
			} else {
				var c = a.convert(n.texture.format),
					l = a.convert(n.texture.type);
				r = w(n.texture.internalFormat, c, l);
				if (i) {
					s = z(n);
					e.renderbufferStorageMultisample(36161, s, r, n.width, n.height)
				} else e.renderbufferStorage(36161, r, n.width, n.height)
			}
			e.bindRenderbuffer(36161, null)
		}

		function U(t) {
			var n = i.get(t),
				r = !0 === t.isWebGLCubeRenderTarget;
			if (t.depthTexture) {
				if (r) throw new Error("target.depthTexture not supported in Cube render targets");
				! function (t, n) {
					if (n && n.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
					if (e.bindFramebuffer(36160, t), !n.depthTexture || !n.depthTexture.isDepthTexture) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
					i.get(n.depthTexture).__webglTexture && n.depthTexture.image.width === n.width && n.depthTexture.image.height === n.height || (n.depthTexture.image.width = n.width, n.depthTexture.image.height = n.height, n.depthTexture.needsUpdate = !0), E(n.depthTexture, 0);
					var r = i.get(n.depthTexture).__webglTexture;
					if (1026 === n.depthTexture.format) e.framebufferTexture2D(36160, 36096, 3553, r, 0);
					else {
						if (1027 !== n.depthTexture.format) throw new Error("Unknown depthTexture format");
						e.framebufferTexture2D(36160, 33306, 3553, r, 0)
					}
				}(n.__webglFramebuffer, t)
			} else if (r) {
				n.__webglDepthbuffer = [];
				for (var a = 0; a < 6; a++) e.bindFramebuffer(36160, n.__webglFramebuffer[a]), n.__webglDepthbuffer[a] = e.createRenderbuffer(), N(n.__webglDepthbuffer[a], t, !1)
			} else e.bindFramebuffer(36160, n.__webglFramebuffer), n.__webglDepthbuffer = e.createRenderbuffer(), N(n.__webglDepthbuffer, t, !1);
			e.bindFramebuffer(36160, null)
		}

		function z(e) {
			return l && e.isWebGLMultisampleRenderTarget ? Math.min(d, e.samples) : 0
		}
		var F = !1,
			B = !1;
		this.allocateTextureUnit = function () {
			var e = T;
			return e >= h && console.warn("THREE.WebGLTextures: Trying to use " + e + " texture units while this GPU supports only " + h), T += 1, e
		}, this.resetTextureUnits = function () {
			T = 0
		}, this.setTexture2D = E, this.setTexture2DArray = function (e, t) {
			var r = i.get(e);
			e.version > 0 && r.__version !== e.version ? D(r, e, t) : (n.activeTexture(33984 + t), n.bindTexture(35866, r.__webglTexture))
		}, this.setTexture3D = function (e, t) {
			var r = i.get(e);
			e.version > 0 && r.__version !== e.version ? D(r, e, t) : (n.activeTexture(33984 + t), n.bindTexture(32879, r.__webglTexture))
		}, this.setTextureCube = A, this.setTextureCubeDynamic = L, this.setupRenderTarget = function (t) {
			var r = i.get(t),
				s = i.get(t.texture);
			t.addEventListener("dispose", S), s.__webglTexture = e.createTexture(), o.memory.textures++;
			var c = !0 === t.isWebGLCubeRenderTarget,
				h = !0 === t.isWebGLMultisampleRenderTarget,
				u = y(t) || l;
			if (!l || 1022 !== t.texture.format || 1015 !== t.texture.type && 1016 !== t.texture.type || (t.texture.format = 1023, console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")), c) {
				r.__webglFramebuffer = [];
				for (var p = 0; p < 6; p++) r.__webglFramebuffer[p] = e.createFramebuffer()
			} else if (r.__webglFramebuffer = e.createFramebuffer(), h)
				if (l) {
					r.__webglMultisampledFramebuffer = e.createFramebuffer(), r.__webglColorRenderbuffer = e.createRenderbuffer(), e.bindRenderbuffer(36161, r.__webglColorRenderbuffer);
					var d = a.convert(t.texture.format),
						f = a.convert(t.texture.type),
						m = w(t.texture.internalFormat, d, f),
						v = z(t);
					e.renderbufferStorageMultisample(36161, v, m, t.width, t.height), e.bindFramebuffer(36160, r.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(36160, 36064, 36161, r.__webglColorRenderbuffer), e.bindRenderbuffer(36161, null), t.depthBuffer && (r.__webglDepthRenderbuffer = e.createRenderbuffer(), N(r.__webglDepthRenderbuffer, t, !0)), e.bindFramebuffer(36160, null)
				} else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
			if (c) {
				n.bindTexture(34067, s.__webglTexture), C(34067, t.texture, u);
				for (p = 0; p < 6; p++) I(r.__webglFramebuffer[p], t, 36064, 34069 + p);
				x(t.texture, u) && b(34067, t.texture, t.width, t.height), n.bindTexture(34067, null)
			} else n.bindTexture(3553, s.__webglTexture), C(3553, t.texture, u), I(r.__webglFramebuffer, t, 36064, 3553), x(t.texture, u) && b(3553, t.texture, t.width, t.height), n.bindTexture(3553, null);
			t.depthBuffer && U(t)
		}, this.updateRenderTargetMipmap = function (e) {
			var t = e.texture;
			if (x(t, y(e) || l)) {
				var r = e.isWebGLCubeRenderTarget ? 34067 : 3553,
					a = i.get(t).__webglTexture;
				n.bindTexture(r, a), b(r, t, e.width, e.height), n.bindTexture(r, null)
			}
		}, this.updateMultisampleRenderTarget = function (t) {
			if (t.isWebGLMultisampleRenderTarget)
				if (l) {
					var n = i.get(t);
					e.bindFramebuffer(36008, n.__webglMultisampledFramebuffer), e.bindFramebuffer(36009, n.__webglFramebuffer);
					var r = t.width,
						a = t.height,
						o = 16384;
					t.depthBuffer && (o |= 256), t.stencilBuffer && (o |= 1024), e.blitFramebuffer(0, 0, r, a, 0, 0, r, a, o, 9728), e.bindFramebuffer(36160, n.__webglMultisampledFramebuffer)
				} else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")
		}, this.safeSetTexture2D = function (e, t) {
			e && e.isWebGLRenderTarget && (!1 === F && (console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."), F = !0), e = e.texture), E(e, t)
		}, this.safeSetTextureCube = function (e, t) {
			e && e.isWebGLCubeRenderTarget && (!1 === B && (console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."), B = !0), e = e.texture), e && e.isCubeTexture || Array.isArray(e.image) && 6 === e.image.length ? A(e, t) : L(e, t)
		}
	}

	function Zi(e, t, n) {
		var i = n.isWebGL2;
		return {
			convert: function (e) {
				var n;
				if (1009 === e) return 5121;
				if (1017 === e) return 32819;
				if (1018 === e) return 32820;
				if (1019 === e) return 33635;
				if (1010 === e) return 5120;
				if (1011 === e) return 5122;
				if (1012 === e) return 5123;
				if (1013 === e) return 5124;
				if (1014 === e) return 5125;
				if (1015 === e) return 5126;
				if (1016 === e) return i ? 5131 : null !== (n = t.get("OES_texture_half_float")) ? n.HALF_FLOAT_OES : null;
				if (1021 === e) return 6406;
				if (1022 === e) return 6407;
				if (1023 === e) return 6408;
				if (1024 === e) return 6409;
				if (1025 === e) return 6410;
				if (1026 === e) return 6402;
				if (1027 === e) return 34041;
				if (1028 === e) return 6403;
				if (1029 === e) return 36244;
				if (1030 === e) return 33319;
				if (1031 === e) return 33320;
				if (1032 === e) return 36248;
				if (1033 === e) return 36249;
				if (33776 === e || 33777 === e || 33778 === e || 33779 === e) {
					if (null === (n = t.get("WEBGL_compressed_texture_s3tc"))) return null;
					if (33776 === e) return n.COMPRESSED_RGB_S3TC_DXT1_EXT;
					if (33777 === e) return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;
					if (33778 === e) return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;
					if (33779 === e) return n.COMPRESSED_RGBA_S3TC_DXT5_EXT
				}
				if (35840 === e || 35841 === e || 35842 === e || 35843 === e) {
					if (null === (n = t.get("WEBGL_compressed_texture_pvrtc"))) return null;
					if (35840 === e) return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
					if (35841 === e) return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
					if (35842 === e) return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
					if (35843 === e) return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
				}
				if (36196 === e) return null !== (n = t.get("WEBGL_compressed_texture_etc1")) ? n.COMPRESSED_RGB_ETC1_WEBGL : null;
				if ((37492 === e || 37496 === e) && null !== (n = t.get("WEBGL_compressed_texture_etc"))) {
					if (37492 === e) return n.COMPRESSED_RGB8_ETC2;
					if (37496 === e) return n.COMPRESSED_RGBA8_ETC2_EAC
				}
				return 37808 === e || 37809 === e || 37810 === e || 37811 === e || 37812 === e || 37813 === e || 37814 === e || 37815 === e || 37816 === e || 37817 === e || 37818 === e || 37819 === e || 37820 === e || 37821 === e || 37840 === e || 37841 === e || 37842 === e || 37843 === e || 37844 === e || 37845 === e || 37846 === e || 37847 === e || 37848 === e || 37849 === e || 37850 === e || 37851 === e || 37852 === e || 37853 === e ? null !== (n = t.get("WEBGL_compressed_texture_astc")) ? e : null : 36492 === e ? null !== (n = t.get("EXT_texture_compression_bptc")) ? e : null : 1020 === e ? i ? 34042 : null !== (n = t.get("WEBGL_depth_texture")) ? n.UNSIGNED_INT_24_8_WEBGL : null : void 0
			}
		}
	}

	function Ji(e) {
		Vt.call(this), this.cameras = e || []
	}

	function Ki() {
		W.call(this), this.type = "Group"
	}

	function Qi(e, t) {
		var n = this,
			i = null,
			r = 1,
			a = null,
			o = "local-floor",
			s = null,
			c = [],
			l = new Map,
			h = new Vt;
		h.layers.enable(1), h.viewport = new d;
		var u = new Vt;
		u.layers.enable(2), u.viewport = new d;
		var p = new Ji([h, u]);
		p.layers.enable(1), p.layers.enable(2);
		var f = null,
			m = null;

		function v(e) {
			var t = l.get(e.inputSource);
			t && (t.targetRay && t.targetRay.dispatchEvent({
				type: e.type
			}), t.grip && t.grip.dispatchEvent({
				type: e.type
			}))
		}

		function g() {
			l.forEach((function (e, t) {
				e.targetRay && (e.targetRay.dispatchEvent({
					type: "disconnected",
					data: t
				}), e.targetRay.visible = !1), e.grip && (e.grip.dispatchEvent({
					type: "disconnected",
					data: t
				}), e.grip.visible = !1)
			})), l.clear(), e.setFramebuffer(null), e.setRenderTarget(e.getRenderTarget()), T.stop(), n.isPresenting = !1, n.dispatchEvent({
				type: "sessionend"
			})
		}

		function y(e) {
			a = e, T.setContext(i), T.start(), n.isPresenting = !0, n.dispatchEvent({
				type: "sessionstart"
			})
		}

		function b(e) {
			for (var t = i.inputSources, n = 0; n < c.length; n++) l.set(t[n], c[n]);
			for (n = 0; n < e.removed.length; n++) {
				var r = e.removed[n];
				(a = l.get(r)) && (a.targetRay && a.targetRay.dispatchEvent({
					type: "disconnected",
					data: r
				}), a.grip && a.grip.dispatchEvent({
					type: "disconnected",
					data: r
				}), l.delete(r))
			}
			for (n = 0; n < e.added.length; n++) {
				var a;
				r = e.added[n];
				(a = l.get(r)) && (a.targetRay && a.targetRay.dispatchEvent({
					type: "connected",
					data: r
				}), a.grip && a.grip.dispatchEvent({
					type: "connected",
					data: r
				}))
			}
		}
		this.enabled = !1, this.isPresenting = !1, this.getController = function (e) {
			var t = c[e];
			return void 0 === t && (t = {}, c[e] = t), void 0 === t.targetRay && (t.targetRay = new Ki, t.targetRay.matrixAutoUpdate = !1, t.targetRay.visible = !1), t.targetRay
		}, this.getControllerGrip = function (e) {
			var t = c[e];
			return void 0 === t && (t = {}, c[e] = t), void 0 === t.grip && (t.grip = new Ki, t.grip.matrixAutoUpdate = !1, t.grip.visible = !1), t.grip
		}, this.setFramebufferScaleFactor = function (e) {
			r = e, 1 == n.isPresenting && console.warn("WebXRManager: Cannot change framebuffer scale while presenting VR content")
		}, this.setReferenceSpaceType = function (e) {
			o = e
		}, this.getReferenceSpace = function () {
			return a
		}, this.getSession = function () {
			return i
		}, this.setSession = function (e) {
			if (null !== (i = e)) {
				i.addEventListener("select", v), i.addEventListener("selectstart", v), i.addEventListener("selectend", v), i.addEventListener("squeeze", v), i.addEventListener("squeezestart", v), i.addEventListener("squeezeend", v), i.addEventListener("end", g);
				var n = t.getContextAttributes(),
					a = {
						antialias: n.antialias,
						alpha: n.alpha,
						depth: n.depth,
						stencil: n.stencil,
						framebufferScaleFactor: r
					},
					s = new XRWebGLLayer(i, t, a);
				i.updateRenderState({
					baseLayer: s
				}), i.requestReferenceSpace(o).then(y), i.addEventListener("inputsourceschange", b)
			}
		};
		var w = new x,
			_ = new x;

		function M(e, t) {
			null === t ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.getInverse(e.matrixWorld)
		}
		this.getCamera = function (e) {
			p.near = u.near = h.near = e.near, p.far = u.far = h.far = e.far, f === p.near && m === p.far || (i.updateRenderState({
				depthNear: p.near,
				depthFar: p.far
			}), f = p.near, m = p.far);
			var t = e.parent,
				n = p.cameras;
			M(p, t);
			for (var r = 0; r < n.length; r++) M(n[r], t);
			e.matrixWorld.copy(p.matrixWorld);
			for (var a = e.children, o = (r = 0, a.length); r < o; r++) a[r].updateMatrixWorld(!0);
			return function (e, t, n) {
				w.setFromMatrixPosition(t.matrixWorld), _.setFromMatrixPosition(n.matrixWorld);
				var i = w.distanceTo(_),
					r = t.projectionMatrix.elements,
					a = n.projectionMatrix.elements,
					o = r[14] / (r[10] - 1),
					s = r[14] / (r[10] + 1),
					c = (r[9] + 1) / r[5],
					l = (r[9] - 1) / r[5],
					h = (r[8] - 1) / r[0],
					u = (a[8] + 1) / a[0],
					p = o * h,
					d = o * u,
					f = i / (-h + u),
					m = f * -h;
				t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(m), e.translateZ(f), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.getInverse(e.matrixWorld);
				var v = o + f,
					g = s + f,
					y = p - m,
					x = d + (i - m),
					b = c * s / g * v,
					M = l * s / g * v;
				e.projectionMatrix.makePerspective(y, x, b, M, v, g)
			}(p, h, u), p
		};
		var S = null;
		var T = new Kt;
		T.setAnimationLoop((function (t, n) {
			if (null !== (s = n.getViewerPose(a))) {
				var r = s.views,
					o = i.renderState.baseLayer;
				e.setFramebuffer(o.framebuffer);
				for (var l = 0; l < r.length; l++) {
					var h = r[l],
						u = o.getViewport(h),
						d = p.cameras[l];
					d.matrix.fromArray(h.transform.matrix), d.projectionMatrix.fromArray(h.projectionMatrix), d.viewport.set(u.x, u.y, u.width, u.height), 0 === l && p.matrix.copy(d.matrix)
				}
			}
			var f = i.inputSources;
			for (l = 0; l < c.length; l++) {
				var m = c[l],
					v = f[l],
					g = null,
					y = null;
				v && (m.targetRay && null !== (g = n.getPose(v.targetRaySpace, a)) && (m.targetRay.matrix.fromArray(g.transform.matrix), m.targetRay.matrix.decompose(m.targetRay.position, m.targetRay.rotation, m.targetRay.scale)), m.grip && v.gripSpace && null !== (y = n.getPose(v.gripSpace, a)) && (m.grip.matrix.fromArray(y.transform.matrix), m.grip.matrix.decompose(m.grip.position, m.grip.rotation, m.grip.scale))), m.targetRay && (m.targetRay.visible = null !== g), m.grip && (m.grip.visible = null !== y)
			}
			S && S(t, n)
		})), this.setAnimationLoop = function (e) {
			S = e
		}, this.dispose = function () {}
	}

	function $i(e) {
		var t = void 0 !== (e = e || {}).canvas ? e.canvas : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"),
			n = void 0 !== e.context ? e.context : null,
			i = void 0 !== e.alpha && e.alpha,
			r = void 0 === e.depth || e.depth,
			a = void 0 === e.stencil || e.stencil,
			o = void 0 !== e.antialias && e.antialias,
			l = void 0 === e.premultipliedAlpha || e.premultipliedAlpha,
			h = void 0 !== e.preserveDrawingBuffer && e.preserveDrawingBuffer,
			u = void 0 !== e.powerPreference ? e.powerPreference : "default",
			p = void 0 !== e.failIfMajorPerformanceCaveat && e.failIfMajorPerformanceCaveat,
			f = null,
			m = null;
		this.domElement = t, this.debug = {
			checkShaderErrors: !0
		}, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.outputEncoding = 3e3, this.physicallyCorrectLights = !1, this.toneMapping = 1, this.toneMappingExposure = 1, this.toneMappingWhitePoint = 1, this.maxMorphTargets = 8, this.maxMorphNormals = 4;
		var v, g, y, b, w, _, M, S, T, E, L, R, P, C, O, D, I, N, U = this,
			z = !1,
			F = null,
			B = 0,
			H = 0,
			G = null,
			k = null,
			V = -1,
			j = {
				geometry: null,
				program: null,
				wireframe: !1
			},
			W = null,
			X = null,
			Y = new d,
			Z = new d,
			J = null,
			K = t.width,
			Q = t.height,
			$ = 1,
			ee = null,
			te = null,
			ne = new d(0, 0, K, Q),
			ie = new d(0, 0, K, Q),
			re = !1,
			ae = new Zt,
			oe = new sn,
			se = !1,
			ce = !1,
			le = new A,
			he = new x;

		function ue() {
			return null === G ? $ : 1
		}
		try {
			var pe = {
				alpha: i,
				depth: r,
				stencil: a,
				antialias: o,
				premultipliedAlpha: l,
				preserveDrawingBuffer: h,
				powerPreference: u,
				failIfMajorPerformanceCaveat: p,
				xrCompatible: !0
			};
			if (t.addEventListener("webglcontextlost", ve, !1), t.addEventListener("webglcontextrestored", ge, !1), null === (v = n || t.getContext("webgl", pe) || t.getContext("experimental-webgl", pe))) throw null !== t.getContext("webgl") ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
			void 0 === v.getShaderPrecisionFormat && (v.getShaderPrecisionFormat = function () {
				return {
					rangeMin: 1,
					rangeMax: 1,
					precision: 1
				}
			})
		} catch (e) {
			throw console.error("THREE.WebGLRenderer: " + e.message), e
		}

		function de() {
			g = new cn(v), !1 === (y = new on(v, g, e)).isWebGL2 && (g.get("WEBGL_depth_texture"), g.get("OES_texture_float"), g.get("OES_texture_half_float"), g.get("OES_texture_half_float_linear"), g.get("OES_standard_derivatives"), g.get("OES_element_index_uint"), g.get("ANGLE_instanced_arrays")), g.get("OES_texture_float_linear"), N = new Zi(v, g, y), (b = new Xi(v, g, y)).scissor(Z.copy(ie).multiplyScalar($).floor()), b.viewport(Y.copy(ne).multiplyScalar($).floor()), w = new un(v), _ = new Di, M = new Yi(v, g, b, _, y, N, w), S = new Qt(v, y), T = new ln(v, S, w), E = new fn(v, T, S, w), O = new dn(v), L = new Oi(U, g, y), R = new zi, P = new Vi, C = new rn(U, b, E, l), D = new an(v, g, w, y), I = new hn(v, g, w, y), w.programs = L.programs, U.capabilities = y, U.extensions = g, U.properties = _, U.renderLists = R, U.state = b, U.info = w
		}
		de();
		var fe = new Qi(U, v);
		this.xr = fe;
		var me = new qi(U, E, y.maxTextureSize);

		function ve(e) {
			e.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), z = !0
		}

		function ge() {
			console.log("THREE.WebGLRenderer: Context Restored."), z = !1, de()
		}

		function ye(e) {
			var t = e.target;
			t.removeEventListener("dispose", ye),
				function (e) {
					xe(e), _.remove(e)
				}(t)
		}

		function xe(e) {
			var t = _.get(e).program;
			e.program = void 0, void 0 !== t && L.releaseProgram(t)
		}
		this.shadowMap = me, this.getContext = function () {
			return v
		}, this.getContextAttributes = function () {
			return v.getContextAttributes()
		}, this.forceContextLoss = function () {
			var e = g.get("WEBGL_lose_context");
			e && e.loseContext()
		}, this.forceContextRestore = function () {
			var e = g.get("WEBGL_lose_context");
			e && e.restoreContext()
		}, this.getPixelRatio = function () {
			return $
		}, this.setPixelRatio = function (e) {
			void 0 !== e && ($ = e, this.setSize(K, Q, !1))
		}, this.getSize = function (e) {
			return void 0 === e && (console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"), e = new c), e.set(K, Q)
		}, this.setSize = function (e, n, i) {
			fe.isPresenting ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (K = e, Q = n, t.width = Math.floor(e * $), t.height = Math.floor(n * $), !1 !== i && (t.style.width = e + "px", t.style.height = n + "px"), this.setViewport(0, 0, e, n))
		}, this.getDrawingBufferSize = function (e) {
			return void 0 === e && (console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"), e = new c), e.set(K * $, Q * $).floor()
		}, this.setDrawingBufferSize = function (e, n, i) {
			K = e, Q = n, $ = i, t.width = Math.floor(e * i), t.height = Math.floor(n * i), this.setViewport(0, 0, e, n)
		}, this.getCurrentViewport = function (e) {
			return void 0 === e && (console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"), e = new d), e.copy(Y)
		}, this.getViewport = function (e) {
			return e.copy(ne)
		}, this.setViewport = function (e, t, n, i) {
			e.isVector4 ? ne.set(e.x, e.y, e.z, e.w) : ne.set(e, t, n, i), b.viewport(Y.copy(ne).multiplyScalar($).floor())
		}, this.getScissor = function (e) {
			return e.copy(ie)
		}, this.setScissor = function (e, t, n, i) {
			e.isVector4 ? ie.set(e.x, e.y, e.z, e.w) : ie.set(e, t, n, i), b.scissor(Z.copy(ie).multiplyScalar($).floor())
		}, this.getScissorTest = function () {
			return re
		}, this.setScissorTest = function (e) {
			b.setScissorTest(re = e)
		}, this.setOpaqueSort = function (e) {
			ee = e
		}, this.setTransparentSort = function (e) {
			te = e
		}, this.getClearColor = function () {
			return C.getClearColor()
		}, this.setClearColor = function () {
			C.setClearColor.apply(C, arguments)
		}, this.getClearAlpha = function () {
			return C.getClearAlpha()
		}, this.setClearAlpha = function () {
			C.setClearAlpha.apply(C, arguments)
		}, this.clear = function (e, t, n) {
			var i = 0;
			(void 0 === e || e) && (i |= 16384), (void 0 === t || t) && (i |= 256), (void 0 === n || n) && (i |= 1024), v.clear(i)
		}, this.clearColor = function () {
			this.clear(!0, !1, !1)
		}, this.clearDepth = function () {
			this.clear(!1, !0, !1)
		}, this.clearStencil = function () {
			this.clear(!1, !1, !0)
		}, this.dispose = function () {
			t.removeEventListener("webglcontextlost", ve, !1), t.removeEventListener("webglcontextrestored", ge, !1), R.dispose(), P.dispose(), _.dispose(), E.dispose(), fe.dispose(), _e.stop(), this.forceContextLoss()
		}, this.renderBufferImmediate = function (e, t) {
			b.initAttributes();
			var n = _.get(e);
			e.hasPositions && !n.position && (n.position = v.createBuffer()), e.hasNormals && !n.normal && (n.normal = v.createBuffer()), e.hasUvs && !n.uv && (n.uv = v.createBuffer()), e.hasColors && !n.color && (n.color = v.createBuffer());
			var i = t.getAttributes();
			e.hasPositions && (v.bindBuffer(34962, n.position), v.bufferData(34962, e.positionArray, 35048), b.enableAttribute(i.position), v.vertexAttribPointer(i.position, 3, 5126, !1, 0, 0)), e.hasNormals && (v.bindBuffer(34962, n.normal), v.bufferData(34962, e.normalArray, 35048), b.enableAttribute(i.normal), v.vertexAttribPointer(i.normal, 3, 5126, !1, 0, 0)), e.hasUvs && (v.bindBuffer(34962, n.uv), v.bufferData(34962, e.uvArray, 35048), b.enableAttribute(i.uv), v.vertexAttribPointer(i.uv, 2, 5126, !1, 0, 0)), e.hasColors && (v.bindBuffer(34962, n.color), v.bufferData(34962, e.colorArray, 35048), b.enableAttribute(i.color), v.vertexAttribPointer(i.color, 3, 5126, !1, 0, 0)), b.disableUnusedAttributes(), v.drawArrays(4, 0, e.count), e.count = 0
		};
		var be = new q;
		this.renderBufferDirect = function (e, t, n, i, r, a) {
			null === t && (t = be);
			var o = r.isMesh && r.matrixWorld.determinant() < 0,
				s = Ae(e, t, i, r);
			b.setMaterial(i, o);
			var c = !1;
			j.geometry === n.id && j.program === s.id && j.wireframe === (!0 === i.wireframe) || (j.geometry = n.id, j.program = s.id, j.wireframe = !0 === i.wireframe, c = !0), (i.morphTargets || i.morphNormals) && (O.update(r, n, i, s), c = !0);
			var l = n.index,
				h = n.attributes.position;
			if (null === l) {
				if (void 0 === h || 0 === h.count) return
			} else if (0 === l.count) return;
			var u, p = 1;
			!0 === i.wireframe && (l = T.getWireframeAttribute(n), p = 2);
			var d = D;
			null !== l && (u = S.get(l), (d = I).setIndex(u)), c && (! function (e, t, n, i) {
				if (!1 === y.isWebGL2 && (e.isInstancedMesh || t.isInstancedBufferGeometry) && null === g.get("ANGLE_instanced_arrays")) return;
				b.initAttributes();
				var r = t.attributes,
					a = i.getAttributes(),
					o = n.defaultAttributeValues;
				for (var s in a) {
					var c = a[s];
					if (c >= 0) {
						var l = r[s];
						if (void 0 !== l) {
							var h = l.normalized,
								u = l.itemSize;
							if (void 0 === (_ = S.get(l))) continue;
							var p = _.buffer,
								d = _.type,
								f = _.bytesPerElement;
							if (l.isInterleavedBufferAttribute) {
								var m = l.data,
									x = m.stride,
									w = l.offset;
								m && m.isInstancedInterleavedBuffer ? (b.enableAttributeAndDivisor(c, m.meshPerAttribute), void 0 === t.maxInstancedCount && (t.maxInstancedCount = m.meshPerAttribute * m.count)) : b.enableAttribute(c), v.bindBuffer(34962, p), v.vertexAttribPointer(c, u, d, h, x * f, w * f)
							} else l.isInstancedBufferAttribute ? (b.enableAttributeAndDivisor(c, l.meshPerAttribute), void 0 === t.maxInstancedCount && (t.maxInstancedCount = l.meshPerAttribute * l.count)) : b.enableAttribute(c), v.bindBuffer(34962, p), v.vertexAttribPointer(c, u, d, h, 0, 0)
						} else if ("instanceMatrix" === s) {
							var _;
							if (void 0 === (_ = S.get(e.instanceMatrix))) continue;
							p = _.buffer, d = _.type;
							b.enableAttributeAndDivisor(c + 0, 1), b.enableAttributeAndDivisor(c + 1, 1), b.enableAttributeAndDivisor(c + 2, 1), b.enableAttributeAndDivisor(c + 3, 1), v.bindBuffer(34962, p), v.vertexAttribPointer(c + 0, 4, d, !1, 64, 0), v.vertexAttribPointer(c + 1, 4, d, !1, 64, 16), v.vertexAttribPointer(c + 2, 4, d, !1, 64, 32), v.vertexAttribPointer(c + 3, 4, d, !1, 64, 48)
						} else if (void 0 !== o) {
							var M = o[s];
							if (void 0 !== M) switch (M.length) {
								case 2:
									v.vertexAttrib2fv(c, M);
									break;
								case 3:
									v.vertexAttrib3fv(c, M);
									break;
								case 4:
									v.vertexAttrib4fv(c, M);
									break;
								default:
									v.vertexAttrib1fv(c, M)
							}
						}
					}
				}
				b.disableUnusedAttributes()
			}(r, n, i, s), null !== l && v.bindBuffer(34963, u.buffer));
			var f = null !== l ? l.count : h.count,
				m = n.drawRange.start * p,
				x = n.drawRange.count * p,
				w = null !== a ? a.start * p : 0,
				_ = null !== a ? a.count * p : 1 / 0,
				M = Math.max(m, w),
				E = Math.min(f, m + x, w + _) - 1,
				A = Math.max(0, E - M + 1);
			if (0 !== A) {
				if (r.isMesh) !0 === i.wireframe ? (b.setLineWidth(i.wireframeLinewidth * ue()), d.setMode(1)) : d.setMode(4);
				else if (r.isLine) {
					var L = i.linewidth;
					void 0 === L && (L = 1), b.setLineWidth(L * ue()), r.isLineSegments ? d.setMode(1) : r.isLineLoop ? d.setMode(2) : d.setMode(3)
				} else r.isPoints ? d.setMode(0) : r.isSprite && d.setMode(4);
				r.isInstancedMesh ? d.renderInstances(n, M, A, r.count) : n.isInstancedBufferGeometry ? d.renderInstances(n, M, A, n.maxInstancedCount) : d.render(M, A)
			}
		}, this.compile = function (e, t) {
			(m = P.get(e, t)).init(), e.traverse((function (e) {
				e.isLight && (m.pushLight(e), e.castShadow && m.pushShadow(e))
			})), m.setupLights(t);
			var n = {};
			e.traverse((function (t) {
				if (t.material)
					if (Array.isArray(t.material))
						for (var i = 0; i < t.material.length; i++) t.material[i].uuid in n == !1 && (Ee(t.material[i], e, t), n[t.material[i].uuid] = !0);
					else t.material.uuid in n == !1 && (Ee(t.material, e, t), n[t.material.uuid] = !0)
			}))
		};
		var we = null;
		var _e = new Kt;

		function Me(e, t, n, i) {
			if (!1 !== e.visible) {
				if (e.layers.test(t.layers))
					if (e.isGroup) n = e.renderOrder;
					else if (e.isLOD) !0 === e.autoUpdate && e.update(t);
				else if (e.isLight) m.pushLight(e), e.castShadow && m.pushShadow(e);
				else if (e.isSprite) {
					if (!e.frustumCulled || ae.intersectsSprite(e)) {
						i && he.setFromMatrixPosition(e.matrixWorld).applyMatrix4(le);
						var r = E.update(e);
						(a = e.material).visible && f.push(e, r, a, n, he.z, null)
					}
				} else if (e.isImmediateRenderObject) i && he.setFromMatrixPosition(e.matrixWorld).applyMatrix4(le), f.push(e, null, e.material, n, he.z, null);
				else if ((e.isMesh || e.isLine || e.isPoints) && (e.isSkinnedMesh && e.skeleton.frame !== w.render.frame && (e.skeleton.update(), e.skeleton.frame = w.render.frame), !e.frustumCulled || ae.intersectsObject(e))) {
					i && he.setFromMatrixPosition(e.matrixWorld).applyMatrix4(le);
					r = E.update(e);
					var a = e.material;
					if (Array.isArray(a))
						for (var o = r.groups, s = 0, c = o.length; s < c; s++) {
							var l = o[s],
								h = a[l.materialIndex];
							h && h.visible && f.push(e, r, h, n, he.z, l)
						} else a.visible && f.push(e, r, a, n, he.z, null)
				}
				var u = e.children;
				for (s = 0, c = u.length; s < c; s++) Me(u[s], t, n, i)
			}
		}

		function Se(e, t, n, i) {
			for (var r = 0, a = e.length; r < a; r++) {
				var o = e[r],
					s = o.object,
					c = o.geometry,
					l = void 0 === i ? o.material : i,
					h = o.group;
				if (n.isArrayCamera) {
					X = n;
					for (var u = n.cameras, p = 0, d = u.length; p < d; p++) {
						var f = u[p];
						s.layers.test(f.layers) && (b.viewport(Y.copy(f.viewport)), m.setupLights(f), Te(s, t, f, c, l, h))
					}
				} else X = null, Te(s, t, n, c, l, h)
			}
		}

		function Te(e, t, n, i, r, a) {
			if (e.onBeforeRender(U, t, n, i, r, a), m = P.get(t, X || n), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), e.isImmediateRenderObject) {
				var o = Ae(n, t, r, e);
				b.setMaterial(r), j.geometry = null, j.program = null, j.wireframe = !1,
					function (e, t) {
						e.render((function (e) {
							U.renderBufferImmediate(e, t)
						}))
					}(e, o)
			} else U.renderBufferDirect(n, t, i, r, e, a);
			e.onAfterRender(U, t, n, i, r, a), m = P.get(t, X || n)
		}

		function Ee(e, t, n) {
			var i = _.get(e),
				r = m.state.lights,
				a = m.state.shadowsArray,
				o = r.state.version,
				s = L.getParameters(e, r.state, a, t, oe.numPlanes, oe.numIntersection, n),
				c = L.getProgramCacheKey(s),
				l = i.program,
				h = !0;
			if (void 0 === l) e.addEventListener("dispose", ye);
			else if (l.cacheKey !== c) xe(e);
			else if (i.lightsStateVersion !== o) i.lightsStateVersion = o, h = !1;
			else {
				if (void 0 !== s.shaderID) return;
				h = !1
			}
			h && (l = L.acquireProgram(s, c), i.program = l, i.uniforms = s.uniforms, i.environment = e.isMeshStandardMaterial ? t.environment : null, i.outputEncoding = U.outputEncoding, e.program = l);
			var u = l.getAttributes();
			if (e.morphTargets) {
				e.numSupportedMorphTargets = 0;
				for (var p = 0; p < U.maxMorphTargets; p++) u["morphTarget" + p] >= 0 && e.numSupportedMorphTargets++
			}
			if (e.morphNormals) {
				e.numSupportedMorphNormals = 0;
				for (p = 0; p < U.maxMorphNormals; p++) u["morphNormal" + p] >= 0 && e.numSupportedMorphNormals++
			}
			var d = i.uniforms;
			(e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping || (i.numClippingPlanes = oe.numPlanes, i.numIntersection = oe.numIntersection, d.clippingPlanes = oe.uniform), i.fog = t.fog, i.needsLights = function (e) {
				return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && !0 === e.lights
			}(e), i.lightsStateVersion = o, i.needsLights && (d.ambientLightColor.value = r.state.ambient, d.lightProbe.value = r.state.probe, d.directionalLights.value = r.state.directional, d.directionalLightShadows.value = r.state.directionalShadow, d.spotLights.value = r.state.spot, d.spotLightShadows.value = r.state.spotShadow, d.rectAreaLights.value = r.state.rectArea, d.pointLights.value = r.state.point, d.pointLightShadows.value = r.state.pointShadow, d.hemisphereLights.value = r.state.hemi, d.directionalShadowMap.value = r.state.directionalShadowMap, d.directionalShadowMatrix.value = r.state.directionalShadowMatrix, d.spotShadowMap.value = r.state.spotShadowMap, d.spotShadowMatrix.value = r.state.spotShadowMatrix, d.pointShadowMap.value = r.state.pointShadowMap, d.pointShadowMatrix.value = r.state.pointShadowMatrix);
			var f = i.program.getUniforms(),
				v = pi.seqWithValue(f.seq, d);
			i.uniformsList = v
		}

		function Ae(e, t, n, i) {
			M.resetTextureUnits();
			var r = t.fog,
				a = n.isMeshStandardMaterial ? t.environment : null,
				o = _.get(n),
				c = m.state.lights;
			if (se && (ce || e !== W)) {
				var l = e === W && n.id === V;
				oe.setState(n.clippingPlanes, n.clipIntersection, n.clipShadows, e, o, l)
			}
			n.version === o.__version ? void 0 === o.program || n.fog && o.fog !== r || o.environment !== a || o.needsLights && o.lightsStateVersion !== c.state.version ? Ee(n, t, i) : void 0 === o.numClippingPlanes || o.numClippingPlanes === oe.numPlanes && o.numIntersection === oe.numIntersection ? o.outputEncoding !== U.outputEncoding && Ee(n, t, i) : Ee(n, t, i) : (Ee(n, t, i), o.__version = n.version);
			var h, u, p = !1,
				d = !1,
				f = !1,
				g = o.program,
				x = g.getUniforms(),
				w = o.uniforms;
			if (b.useProgram(g.program) && (p = !0, d = !0, f = !0), n.id !== V && (V = n.id, d = !0), p || W !== e) {
				if (x.setValue(v, "projectionMatrix", e.projectionMatrix), y.logarithmicDepthBuffer && x.setValue(v, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), W !== e && (W = e, d = !0, f = !0), n.isShaderMaterial || n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshStandardMaterial || n.envMap) {
					var S = x.map.cameraPosition;
					void 0 !== S && S.setValue(v, he.setFromMatrixPosition(e.matrixWorld))
				}(n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial) && x.setValue(v, "isOrthographic", !0 === e.isOrthographicCamera), (n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial || n.skinning) && x.setValue(v, "viewMatrix", e.matrixWorldInverse)
			}
			if (n.skinning) {
				x.setOptional(v, i, "bindMatrix"), x.setOptional(v, i, "bindMatrixInverse");
				var T = i.skeleton;
				if (T) {
					var E = T.bones;
					if (y.floatVertexTextures) {
						if (void 0 === T.boneTexture) {
							var A = Math.sqrt(4 * E.length);
							A = s.ceilPowerOfTwo(A), A = Math.max(A, 4);
							var L = new Float32Array(A * A * 4);
							L.set(T.boneMatrices);
							var R = new qt(L, A, A, 1023, 1015);
							T.boneMatrices = L, T.boneTexture = R, T.boneTextureSize = A
						}
						x.setValue(v, "boneTexture", T.boneTexture, M), x.setValue(v, "boneTextureSize", T.boneTextureSize)
					} else x.setOptional(v, T, "boneMatrices")
				}
			}
			return (d || o.receiveShadow !== i.receiveShadow) && (o.receiveShadow = i.receiveShadow, x.setValue(v, "receiveShadow", i.receiveShadow)), d && (x.setValue(v, "toneMappingExposure", U.toneMappingExposure), x.setValue(v, "toneMappingWhitePoint", U.toneMappingWhitePoint), o.needsLights && (u = f, (h = w).ambientLightColor.needsUpdate = u, h.lightProbe.needsUpdate = u, h.directionalLights.needsUpdate = u, h.directionalLightShadows.needsUpdate = u, h.pointLights.needsUpdate = u, h.pointLightShadows.needsUpdate = u, h.spotLights.needsUpdate = u, h.spotLightShadows.needsUpdate = u, h.rectAreaLights.needsUpdate = u, h.hemisphereLights.needsUpdate = u), r && n.fog && function (e, t) {
				e.fogColor.value.copy(t.color), t.isFog ? (e.fogNear.value = t.near, e.fogFar.value = t.far) : t.isFogExp2 && (e.fogDensity.value = t.density)
			}(w, r), n.isMeshBasicMaterial ? Le(w, n) : n.isMeshLambertMaterial ? (Le(w, n), function (e, t) {
				t.emissiveMap && (e.emissiveMap.value = t.emissiveMap)
			}(w, n)) : n.isMeshToonMaterial ? (Le(w, n), function (e, t) {
				e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4), t.gradientMap && (e.gradientMap.value = t.gradientMap);
				t.emissiveMap && (e.emissiveMap.value = t.emissiveMap);
				t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1));
				t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
				t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
			}(w, n)) : n.isMeshPhongMaterial ? (Le(w, n), function (e, t) {
				e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4), t.emissiveMap && (e.emissiveMap.value = t.emissiveMap);
				t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1));
				t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
				t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
			}(w, n)) : n.isMeshStandardMaterial ? (Le(w, n, a), n.isMeshPhysicalMaterial ? function (e, t, n) {
				Re(e, t, n), e.reflectivity.value = t.reflectivity, e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.sheen && e.sheen.value.copy(t.sheen);
				t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap);
				t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap);
				t.clearcoatNormalMap && (e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), e.clearcoatNormalMap.value = t.clearcoatNormalMap, 1 === t.side && e.clearcoatNormalScale.value.negate());
				e.transparency.value = t.transparency
			}(w, n, a) : Re(w, n, a)) : n.isMeshMatcapMaterial ? (Le(w, n), function (e, t) {
				t.matcap && (e.matcap.value = t.matcap);
				t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1));
				t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
				t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
			}(w, n)) : n.isMeshDepthMaterial ? (Le(w, n), function (e, t) {
				t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
			}(w, n)) : n.isMeshDistanceMaterial ? (Le(w, n), function (e, t) {
				t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias);
				e.referencePosition.value.copy(t.referencePosition), e.nearDistance.value = t.nearDistance, e.farDistance.value = t.farDistance
			}(w, n)) : n.isMeshNormalMaterial ? (Le(w, n), function (e, t) {
				t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1));
				t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
				t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
			}(w, n)) : n.isLineBasicMaterial ? (function (e, t) {
				e.diffuse.value.copy(t.color), e.opacity.value = t.opacity
			}(w, n), n.isLineDashedMaterial && function (e, t) {
				e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale
			}(w, n)) : n.isPointsMaterial ? function (e, t) {
				e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * $, e.scale.value = .5 * Q, t.map && (e.map.value = t.map);
				t.alphaMap && (e.alphaMap.value = t.alphaMap);
				var n;
				t.map ? n = t.map : t.alphaMap && (n = t.alphaMap);
				void 0 !== n && (!0 === n.matrixAutoUpdate && n.updateMatrix(), e.uvTransform.value.copy(n.matrix))
			}(w, n) : n.isSpriteMaterial ? function (e, t) {
				e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map);
				t.alphaMap && (e.alphaMap.value = t.alphaMap);
				var n;
				t.map ? n = t.map : t.alphaMap && (n = t.alphaMap);
				void 0 !== n && (!0 === n.matrixAutoUpdate && n.updateMatrix(), e.uvTransform.value.copy(n.matrix))
			}(w, n) : n.isShadowMaterial && (w.color.value.copy(n.color), w.opacity.value = n.opacity), void 0 !== w.ltc_1 && (w.ltc_1.value = Jt.LTC_1), void 0 !== w.ltc_2 && (w.ltc_2.value = Jt.LTC_2), pi.upload(v, o.uniformsList, w, M), n.isShaderMaterial && (n.uniformsNeedUpdate = !1)), n.isShaderMaterial && !0 === n.uniformsNeedUpdate && (pi.upload(v, o.uniformsList, w, M), n.uniformsNeedUpdate = !1), n.isSpriteMaterial && x.setValue(v, "center", i.center), x.setValue(v, "modelViewMatrix", i.modelViewMatrix), x.setValue(v, "normalMatrix", i.normalMatrix), x.setValue(v, "modelMatrix", i.matrixWorld), g
		}

		function Le(e, t, n) {
			e.opacity.value = t.opacity, t.color && e.diffuse.value.copy(t.color), t.emissive && e.emissive.value.copy(t.emissive).multiplyScalar(t.emissiveIntensity), t.map && (e.map.value = t.map), t.alphaMap && (e.alphaMap.value = t.alphaMap), t.specularMap && (e.specularMap.value = t.specularMap);
			var i, r, a = t.envMap || n;
			a && (e.envMap.value = a, e.flipEnvMap.value = a.isCubeTexture ? -1 : 1, e.reflectivity.value = t.reflectivity, e.refractionRatio.value = t.refractionRatio, e.maxMipLevel.value = _.get(a).__maxMipLevel), t.lightMap && (e.lightMap.value = t.lightMap, e.lightMapIntensity.value = t.lightMapIntensity), t.aoMap && (e.aoMap.value = t.aoMap, e.aoMapIntensity.value = t.aoMapIntensity), t.map ? i = t.map : t.specularMap ? i = t.specularMap : t.displacementMap ? i = t.displacementMap : t.normalMap ? i = t.normalMap : t.bumpMap ? i = t.bumpMap : t.roughnessMap ? i = t.roughnessMap : t.metalnessMap ? i = t.metalnessMap : t.alphaMap ? i = t.alphaMap : t.emissiveMap && (i = t.emissiveMap), void 0 !== i && (i.isWebGLRenderTarget && (i = i.texture), !0 === i.matrixAutoUpdate && i.updateMatrix(), e.uvTransform.value.copy(i.matrix)), t.aoMap ? r = t.aoMap : t.lightMap && (r = t.lightMap), void 0 !== r && (r.isWebGLRenderTarget && (r = r.texture), !0 === r.matrixAutoUpdate && r.updateMatrix(), e.uv2Transform.value.copy(r.matrix))
		}

		function Re(e, t, n) {
			e.roughness.value = t.roughness, e.metalness.value = t.metalness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap), t.metalnessMap && (e.metalnessMap.value = t.metalnessMap), t.emissiveMap && (e.emissiveMap.value = t.emissiveMap), t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1)), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate()), t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias), (t.envMap || n) && (e.envMapIntensity.value = t.envMapIntensity)
		}
		_e.setAnimationLoop((function (e) {
			fe.isPresenting || we && we(e)
		})), "undefined" != typeof window && _e.setContext(window), this.setAnimationLoop = function (e) {
			we = e, fe.setAnimationLoop(e), _e.start()
		}, this.render = function (e, t) {
			var n, i;
			if (void 0 !== arguments[2] && (console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."), n = arguments[2]), void 0 !== arguments[3] && (console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."), i = arguments[3]), t && t.isCamera) {
				if (!z) {
					j.geometry = null, j.program = null, j.wireframe = !1, V = -1, W = null, !0 === e.autoUpdate && e.updateMatrixWorld(), null === t.parent && t.updateMatrixWorld(), fe.enabled && fe.isPresenting && (t = fe.getCamera(t)), (m = P.get(e, t)).init(), e.onBeforeRender(U, e, t, n || G), le.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), ae.setFromProjectionMatrix(le), ce = this.localClippingEnabled, se = oe.init(this.clippingPlanes, ce, t), (f = R.get(e, t)).init(), Me(e, t, 0, U.sortObjects), f.finish(), !0 === U.sortObjects && f.sort(ee, te), se && oe.beginShadows();
					var r = m.state.shadowsArray;
					me.render(r, e, t), m.setupLights(t), se && oe.endShadows(), this.info.autoReset && this.info.reset(), void 0 !== n && this.setRenderTarget(n), C.render(f, e, t, i);
					var a = f.opaque,
						o = f.transparent;
					if (e.overrideMaterial) {
						var s = e.overrideMaterial;
						a.length && Se(a, e, t, s), o.length && Se(o, e, t, s)
					} else a.length && Se(a, e, t), o.length && Se(o, e, t);
					e.onAfterRender(U, e, t), null !== G && (M.updateRenderTargetMipmap(G), M.updateMultisampleRenderTarget(G)), b.buffers.depth.setTest(!0), b.buffers.depth.setMask(!0), b.buffers.color.setMask(!0), b.setPolygonOffset(!1), f = null, m = null
				}
			} else console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.")
		}, this.setFramebuffer = function (e) {
			F !== e && null === G && v.bindFramebuffer(36160, e), F = e
		}, this.getActiveCubeFace = function () {
			return B
		}, this.getActiveMipmapLevel = function () {
			return H
		}, this.getRenderTarget = function () {
			return G
		}, this.setRenderTarget = function (e, t, n) {
			G = e, B = t, H = n, e && void 0 === _.get(e).__webglFramebuffer && M.setupRenderTarget(e);
			var i = F,
				r = !1;
			if (e) {
				var a = _.get(e).__webglFramebuffer;
				e.isWebGLCubeRenderTarget ? (i = a[t || 0], r = !0) : i = e.isWebGLMultisampleRenderTarget ? _.get(e).__webglMultisampledFramebuffer : a, Y.copy(e.viewport), Z.copy(e.scissor), J = e.scissorTest
			} else Y.copy(ne).multiplyScalar($).floor(), Z.copy(ie).multiplyScalar($).floor(), J = re;
			if (k !== i && (v.bindFramebuffer(36160, i), k = i), b.viewport(Y), b.scissor(Z), b.setScissorTest(J), r) {
				var o = _.get(e.texture);
				v.framebufferTexture2D(36160, 36064, 34069 + (t || 0), o.__webglTexture, n || 0)
			}
		}, this.readRenderTargetPixels = function (e, t, n, i, r, a, o) {
			if (e && e.isWebGLRenderTarget) {
				var s = _.get(e).__webglFramebuffer;
				if (e.isWebGLCubeRenderTarget && void 0 !== o && (s = s[o]), s) {
					var c = !1;
					s !== k && (v.bindFramebuffer(36160, s), c = !0);
					try {
						var l = e.texture,
							h = l.format,
							u = l.type;
						if (1023 !== h && N.convert(h) !== v.getParameter(35739)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
						if (!(1009 === u || N.convert(u) === v.getParameter(35738) || 1015 === u && (y.isWebGL2 || g.get("OES_texture_float") || g.get("WEBGL_color_buffer_float")) || 1016 === u && (y.isWebGL2 ? g.get("EXT_color_buffer_float") : g.get("EXT_color_buffer_half_float")))) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
						36053 === v.checkFramebufferStatus(36160) ? t >= 0 && t <= e.width - i && n >= 0 && n <= e.height - r && v.readPixels(t, n, i, r, N.convert(h), N.convert(u), a) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
					} finally {
						c && v.bindFramebuffer(36160, k)
					}
				}
			} else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.")
		}, this.copyFramebufferToTexture = function (e, t, n) {
			void 0 === n && (n = 0);
			var i = Math.pow(2, -n),
				r = Math.floor(t.image.width * i),
				a = Math.floor(t.image.height * i),
				o = N.convert(t.format);
			M.setTexture2D(t, 0), v.copyTexImage2D(3553, n, o, e.x, e.y, r, a, 0), b.unbindTexture()
		}, this.copyTextureToTexture = function (e, t, n, i) {
			var r = t.image.width,
				a = t.image.height,
				o = N.convert(n.format),
				s = N.convert(n.type);
			M.setTexture2D(n, 0), t.isDataTexture ? v.texSubImage2D(3553, i || 0, e.x, e.y, r, a, o, s, t.image.data) : v.texSubImage2D(3553, i || 0, e.x, e.y, o, s, t.image), b.unbindTexture()
		}, this.initTexture = function (e) {
			M.setTexture2D(e, 0), b.unbindTexture()
		}, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
			detail: this
		}))
	}

	function er(e, t) {
		this.name = "", this.color = new Ue(e), this.density = void 0 !== t ? t : 25e-5
	}

	function tr(e, t, n) {
		this.name = "", this.color = new Ue(e), this.near = void 0 !== t ? t : 1, this.far = void 0 !== n ? n : 1e3
	}

	function nr(e, t) {
		this.array = e, this.stride = t, this.count = void 0 !== e ? e.length / t : 0, this.usage = 35044, this.updateRange = {
			offset: 0,
			count: -1
		}, this.version = 0
	}
	Ji.prototype = Object.assign(Object.create(Vt.prototype), {
		constructor: Ji,
		isArrayCamera: !0
	}), Ki.prototype = Object.assign(Object.create(W.prototype), {
		constructor: Ki,
		isGroup: !0
	}), Object.assign(Qi.prototype, i.prototype), Object.assign(er.prototype, {
		isFogExp2: !0,
		clone: function () {
			return new er(this.color, this.density)
		},
		toJSON: function () {
			return {
				type: "FogExp2",
				color: this.color.getHex(),
				density: this.density
			}
		}
	}), Object.assign(tr.prototype, {
		isFog: !0,
		clone: function () {
			return new tr(this.color, this.near, this.far)
		},
		toJSON: function () {
			return {
				type: "Fog",
				color: this.color.getHex(),
				near: this.near,
				far: this.far
			}
		}
	}), Object.defineProperty(nr.prototype, "needsUpdate", {
		set: function (e) {
			!0 === e && this.version++
		}
	}), Object.assign(nr.prototype, {
		isInterleavedBuffer: !0,
		onUploadCallback: function () {},
		setUsage: function (e) {
			return this.usage = e, this
		},
		copy: function (e) {
			return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this
		},
		copyAt: function (e, t, n) {
			e *= this.stride, n *= t.stride;
			for (var i = 0, r = this.stride; i < r; i++) this.array[e + i] = t.array[n + i];
			return this
		},
		set: function (e, t) {
			return void 0 === t && (t = 0), this.array.set(e, t), this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		onUpload: function (e) {
			return this.onUploadCallback = e, this
		}
	});
	var ir, rr = new x;

	function ar(e, t, n, i) {
		this.data = e, this.itemSize = t, this.offset = n, this.normalized = !0 === i
	}

	function or(e) {
		ke.call(this), this.type = "SpriteMaterial", this.color = new Ue(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.setValues(e)
	}
	Object.defineProperties(ar.prototype, {
		count: {
			get: function () {
				return this.data.count
			}
		},
		array: {
			get: function () {
				return this.data.array
			}
		}
	}), Object.assign(ar.prototype, {
		isInterleavedBufferAttribute: !0,
		applyMatrix4: function (e) {
			for (var t = 0, n = this.data.count; t < n; t++) rr.x = this.getX(t), rr.y = this.getY(t), rr.z = this.getZ(t), rr.applyMatrix4(e), this.setXYZ(t, rr.x, rr.y, rr.z);
			return this
		},
		setX: function (e, t) {
			return this.data.array[e * this.data.stride + this.offset] = t, this
		},
		setY: function (e, t) {
			return this.data.array[e * this.data.stride + this.offset + 1] = t, this
		},
		setZ: function (e, t) {
			return this.data.array[e * this.data.stride + this.offset + 2] = t, this
		},
		setW: function (e, t) {
			return this.data.array[e * this.data.stride + this.offset + 3] = t, this
		},
		getX: function (e) {
			return this.data.array[e * this.data.stride + this.offset]
		},
		getY: function (e) {
			return this.data.array[e * this.data.stride + this.offset + 1]
		},
		getZ: function (e) {
			return this.data.array[e * this.data.stride + this.offset + 2]
		},
		getW: function (e) {
			return this.data.array[e * this.data.stride + this.offset + 3]
		},
		setXY: function (e, t, n) {
			return e = e * this.data.stride + this.offset, this.data.array[e + 0] = t, this.data.array[e + 1] = n, this
		},
		setXYZ: function (e, t, n, i) {
			return e = e * this.data.stride + this.offset, this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = i, this
		},
		setXYZW: function (e, t, n, i, r) {
			return e = e * this.data.stride + this.offset, this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = i, this.data.array[e + 3] = r, this
		}
	}), or.prototype = Object.create(ke.prototype), or.prototype.constructor = or, or.prototype.isSpriteMaterial = !0, or.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this
	};
	var sr = new x,
		cr = new x,
		lr = new x,
		hr = new c,
		ur = new c,
		pr = new A,
		dr = new x,
		fr = new x,
		mr = new x,
		vr = new c,
		gr = new c,
		yr = new c;

	function xr(e) {
		if (W.call(this), this.type = "Sprite", void 0 === ir) {
			ir = new ht;
			var t = new nr(new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1]), 5);
			ir.setIndex([0, 1, 2, 0, 2, 3]), ir.setAttribute("position", new ar(t, 3, 0, !1)), ir.setAttribute("uv", new ar(t, 2, 3, !1))
		}
		this.geometry = ir, this.material = void 0 !== e ? e : new or, this.center = new c(.5, .5)
	}

	function br(e, t, n, i, r, a) {
		hr.subVectors(e, n).addScalar(.5).multiply(i), void 0 !== r ? (ur.x = a * hr.x - r * hr.y, ur.y = r * hr.x + a * hr.y) : ur.copy(hr), e.copy(t), e.x += ur.x, e.y += ur.y, e.applyMatrix4(pr)
	}
	xr.prototype = Object.assign(Object.create(W.prototype), {
		constructor: xr,
		isSprite: !0,
		raycast: function (e, t) {
			null === e.camera && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), cr.setFromMatrixScale(this.matrixWorld), pr.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), lr.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && !1 === this.material.sizeAttenuation && cr.multiplyScalar(-lr.z);
			var n, i, r = this.material.rotation;
			0 !== r && (i = Math.cos(r), n = Math.sin(r));
			var a = this.center;
			br(dr.set(-.5, -.5, 0), lr, a, cr, n, i), br(fr.set(.5, -.5, 0), lr, a, cr, n, i), br(mr.set(.5, .5, 0), lr, a, cr, n, i), vr.set(0, 0), gr.set(1, 0), yr.set(1, 1);
			var o = e.ray.intersectTriangle(dr, fr, mr, !1, sr);
			if (null !== o || (br(fr.set(-.5, .5, 0), lr, a, cr, n, i), gr.set(0, 1), null !== (o = e.ray.intersectTriangle(dr, mr, fr, !1, sr)))) {
				var s = e.ray.origin.distanceTo(sr);
				s < e.near || s > e.far || t.push({
					distance: s,
					point: sr.clone(),
					uv: Oe.getUV(sr, dr, fr, mr, vr, gr, yr, new c),
					face: null,
					object: this
				})
			}
		},
		clone: function () {
			return new this.constructor(this.material).copy(this)
		},
		copy: function (e) {
			return W.prototype.copy.call(this, e), void 0 !== e.center && this.center.copy(e.center), this
		}
	});
	var wr = new x,
		_r = new x;

	function Mr() {
		W.call(this), this._currentLevel = 0, this.type = "LOD", Object.defineProperties(this, {
			levels: {
				enumerable: !0,
				value: []
			}
		}), this.autoUpdate = !0
	}

	function Sr(e, t) {
		e && e.isGeometry && console.error("THREE.SkinnedMesh no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."), Lt.call(this, e, t), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new A, this.bindMatrixInverse = new A
	}
	Mr.prototype = Object.assign(Object.create(W.prototype), {
		constructor: Mr,
		isLOD: !0,
		copy: function (e) {
			W.prototype.copy.call(this, e, !1);
			for (var t = e.levels, n = 0, i = t.length; n < i; n++) {
				var r = t[n];
				this.addLevel(r.object.clone(), r.distance)
			}
			return this.autoUpdate = e.autoUpdate, this
		},
		addLevel: function (e, t) {
			void 0 === t && (t = 0), t = Math.abs(t);
			for (var n = this.levels, i = 0; i < n.length && !(t < n[i].distance); i++);
			return n.splice(i, 0, {
				distance: t,
				object: e
			}), this.add(e), this
		},
		getCurrentLevel: function () {
			return this._currentLevel
		},
		getObjectForDistance: function (e) {
			var t = this.levels;
			if (t.length > 0) {
				for (var n = 1, i = t.length; n < i && !(e < t[n].distance); n++);
				return t[n - 1].object
			}
			return null
		},
		raycast: function (e, t) {
			if (this.levels.length > 0) {
				wr.setFromMatrixPosition(this.matrixWorld);
				var n = e.ray.origin.distanceTo(wr);
				this.getObjectForDistance(n).raycast(e, t)
			}
		},
		update: function (e) {
			var t = this.levels;
			if (t.length > 1) {
				wr.setFromMatrixPosition(e.matrixWorld), _r.setFromMatrixPosition(this.matrixWorld);
				var n = wr.distanceTo(_r) / e.zoom;
				t[0].object.visible = !0;
				for (var i = 1, r = t.length; i < r && n >= t[i].distance; i++) t[i - 1].object.visible = !1, t[i].object.visible = !0;
				for (this._currentLevel = i - 1; i < r; i++) t[i].object.visible = !1
			}
		},
		toJSON: function (e) {
			var t = W.prototype.toJSON.call(this, e);
			!1 === this.autoUpdate && (t.object.autoUpdate = !1), t.object.levels = [];
			for (var n = this.levels, i = 0, r = n.length; i < r; i++) {
				var a = n[i];
				t.object.levels.push({
					object: a.object.uuid,
					distance: a.distance
				})
			}
			return t
		}
	}), Sr.prototype = Object.assign(Object.create(Lt.prototype), {
		constructor: Sr,
		isSkinnedMesh: !0,
		bind: function (e, t) {
			this.skeleton = e, void 0 === t && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.getInverse(t)
		},
		pose: function () {
			this.skeleton.pose()
		},
		normalizeSkinWeights: function () {
			for (var e = new d, t = this.geometry.attributes.skinWeight, n = 0, i = t.count; n < i; n++) {
				e.x = t.getX(n), e.y = t.getY(n), e.z = t.getZ(n), e.w = t.getW(n);
				var r = 1 / e.manhattanLength();
				r !== 1 / 0 ? e.multiplyScalar(r) : e.set(1, 0, 0, 0), t.setXYZW(n, e.x, e.y, e.z, e.w)
			}
		},
		updateMatrixWorld: function (e) {
			Lt.prototype.updateMatrixWorld.call(this, e), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode)
		},
		clone: function () {
			return new this.constructor(this.geometry, this.material).copy(this)
		}
	});
	var Tr = new A,
		Er = new A;

	function Ar(e, t) {
		if (e = e || [], this.bones = e.slice(0), this.boneMatrices = new Float32Array(16 * this.bones.length), this.frame = -1, void 0 === t) this.calculateInverses();
		else if (this.bones.length === t.length) this.boneInverses = t.slice(0);
		else {
			console.warn("THREE.Skeleton boneInverses is the wrong length."), this.boneInverses = [];
			for (var n = 0, i = this.bones.length; n < i; n++) this.boneInverses.push(new A)
		}
	}

	function Lr() {
		W.call(this), this.type = "Bone"
	}
	Object.assign(Ar.prototype, {
		calculateInverses: function () {
			this.boneInverses = [];
			for (var e = 0, t = this.bones.length; e < t; e++) {
				var n = new A;
				this.bones[e] && n.getInverse(this.bones[e].matrixWorld), this.boneInverses.push(n)
			}
		},
		pose: function () {
			var e, t, n;
			for (t = 0, n = this.bones.length; t < n; t++)(e = this.bones[t]) && e.matrixWorld.getInverse(this.boneInverses[t]);
			for (t = 0, n = this.bones.length; t < n; t++)(e = this.bones[t]) && (e.parent && e.parent.isBone ? (e.matrix.getInverse(e.parent.matrixWorld), e.matrix.multiply(e.matrixWorld)) : e.matrix.copy(e.matrixWorld), e.matrix.decompose(e.position, e.quaternion, e.scale))
		},
		update: function () {
			for (var e = this.bones, t = this.boneInverses, n = this.boneMatrices, i = this.boneTexture, r = 0, a = e.length; r < a; r++) {
				var o = e[r] ? e[r].matrixWorld : Er;
				Tr.multiplyMatrices(o, t[r]), Tr.toArray(n, 16 * r)
			}
			void 0 !== i && (i.needsUpdate = !0)
		},
		clone: function () {
			return new Ar(this.bones, this.boneInverses)
		},
		getBoneByName: function (e) {
			for (var t = 0, n = this.bones.length; t < n; t++) {
				var i = this.bones[t];
				if (i.name === e) return i
			}
		},
		dispose: function () {
			this.boneTexture && (this.boneTexture.dispose(), this.boneTexture = void 0)
		}
	}), Lr.prototype = Object.assign(Object.create(W.prototype), {
		constructor: Lr,
		isBone: !0
	});
	var Rr = new A,
		Pr = new A,
		Cr = [],
		Or = new Lt;

	function Dr(e, t, n) {
		Lt.call(this, e, t), this.instanceMatrix = new We(new Float32Array(16 * n), 16), this.count = n, this.frustumCulled = !1
	}

	function Ir(e) {
		ke.call(this), this.type = "LineBasicMaterial", this.color = new Ue(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.setValues(e)
	}
	Dr.prototype = Object.assign(Object.create(Lt.prototype), {
		constructor: Dr,
		isInstancedMesh: !0,
		getMatrixAt: function (e, t) {
			t.fromArray(this.instanceMatrix.array, 16 * e)
		},
		raycast: function (e, t) {
			var n = this.matrixWorld,
				i = this.count;
			if (Or.geometry = this.geometry, Or.material = this.material, void 0 !== Or.material)
				for (var r = 0; r < i; r++) this.getMatrixAt(r, Rr), Pr.multiplyMatrices(n, Rr), Or.matrixWorld = Pr, Or.raycast(e, Cr), Cr.length > 0 && (Cr[0].instanceId = r, Cr[0].object = this, t.push(Cr[0]), Cr.length = 0)
		},
		setMatrixAt: function (e, t) {
			t.toArray(this.instanceMatrix.array, 16 * e)
		},
		updateMorphTargets: function () {}
	}), Ir.prototype = Object.create(ke.prototype), Ir.prototype.constructor = Ir, Ir.prototype.isLineBasicMaterial = !0, Ir.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.color.copy(e.color), this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this
	};
	var Nr = new x,
		Ur = new x,
		zr = new A,
		Fr = new ge,
		Br = new le;

	function Hr(e, t, n) {
		1 === n && console.error("THREE.Line: parameter THREE.LinePieces no longer supported. Use THREE.LineSegments instead."), W.call(this), this.type = "Line", this.geometry = void 0 !== e ? e : new ht, this.material = void 0 !== t ? t : new Ir
	}
	Hr.prototype = Object.assign(Object.create(W.prototype), {
		constructor: Hr,
		isLine: !0,
		computeLineDistances: function () {
			var e = this.geometry;
			if (e.isBufferGeometry)
				if (null === e.index) {
					for (var t = e.attributes.position, n = [0], i = 1, r = t.count; i < r; i++) Nr.fromBufferAttribute(t, i - 1), Ur.fromBufferAttribute(t, i), n[i] = n[i - 1], n[i] += Nr.distanceTo(Ur);
					e.setAttribute("lineDistance", new $e(n, 1))
				} else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
			else if (e.isGeometry) {
				var a = e.vertices;
				(n = e.lineDistances)[0] = 0;
				for (i = 1, r = a.length; i < r; i++) n[i] = n[i - 1], n[i] += a[i - 1].distanceTo(a[i])
			}
			return this
		},
		raycast: function (e, t) {
			var n = this.geometry,
				i = this.matrixWorld,
				r = e.params.Line.threshold;
			if (null === n.boundingSphere && n.computeBoundingSphere(), Br.copy(n.boundingSphere), Br.applyMatrix4(i), Br.radius += r, !1 !== e.ray.intersectsSphere(Br)) {
				zr.getInverse(i), Fr.copy(e.ray).applyMatrix4(zr);
				var a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
					o = a * a,
					s = new x,
					c = new x,
					l = new x,
					h = new x,
					u = this && this.isLineSegments ? 2 : 1;
				if (n.isBufferGeometry) {
					var p = n.index,
						d = n.attributes.position.array;
					if (null !== p)
						for (var f = p.array, m = 0, v = f.length - 1; m < v; m += u) {
							var g = f[m],
								y = f[m + 1];
							if (s.fromArray(d, 3 * g), c.fromArray(d, 3 * y), !(Fr.distanceSqToSegment(s, c, h, l) > o)) h.applyMatrix4(this.matrixWorld), (_ = e.ray.origin.distanceTo(h)) < e.near || _ > e.far || t.push({
								distance: _,
								point: l.clone().applyMatrix4(this.matrixWorld),
								index: m,
								face: null,
								faceIndex: null,
								object: this
							})
						} else
							for (m = 0, v = d.length / 3 - 1; m < v; m += u) {
								if (s.fromArray(d, 3 * m), c.fromArray(d, 3 * m + 3), !(Fr.distanceSqToSegment(s, c, h, l) > o)) h.applyMatrix4(this.matrixWorld), (_ = e.ray.origin.distanceTo(h)) < e.near || _ > e.far || t.push({
									distance: _,
									point: l.clone().applyMatrix4(this.matrixWorld),
									index: m,
									face: null,
									faceIndex: null,
									object: this
								})
							}
				} else if (n.isGeometry) {
					var b = n.vertices,
						w = b.length;
					for (m = 0; m < w - 1; m += u) {
						var _;
						if (!(Fr.distanceSqToSegment(b[m], b[m + 1], h, l) > o)) h.applyMatrix4(this.matrixWorld), (_ = e.ray.origin.distanceTo(h)) < e.near || _ > e.far || t.push({
							distance: _,
							point: l.clone().applyMatrix4(this.matrixWorld),
							index: m,
							face: null,
							faceIndex: null,
							object: this
						})
					}
				}
			}
		},
		clone: function () {
			return new this.constructor(this.geometry, this.material).copy(this)
		}
	});
	var Gr = new x,
		kr = new x;

	function Vr(e, t) {
		Hr.call(this, e, t), this.type = "LineSegments"
	}

	function jr(e, t) {
		Hr.call(this, e, t), this.type = "LineLoop"
	}

	function Wr(e) {
		ke.call(this), this.type = "PointsMaterial", this.color = new Ue(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.morphTargets = !1, this.setValues(e)
	}
	Vr.prototype = Object.assign(Object.create(Hr.prototype), {
		constructor: Vr,
		isLineSegments: !0,
		computeLineDistances: function () {
			var e = this.geometry;
			if (e.isBufferGeometry)
				if (null === e.index) {
					for (var t = e.attributes.position, n = [], i = 0, r = t.count; i < r; i += 2) Gr.fromBufferAttribute(t, i), kr.fromBufferAttribute(t, i + 1), n[i] = 0 === i ? 0 : n[i - 1], n[i + 1] = n[i] + Gr.distanceTo(kr);
					e.setAttribute("lineDistance", new $e(n, 1))
				} else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
			else if (e.isGeometry) {
				var a = e.vertices;
				for (n = e.lineDistances, i = 0, r = a.length; i < r; i += 2) Gr.copy(a[i]), kr.copy(a[i + 1]), n[i] = 0 === i ? 0 : n[i - 1], n[i + 1] = n[i] + Gr.distanceTo(kr)
			}
			return this
		}
	}), jr.prototype = Object.assign(Object.create(Hr.prototype), {
		constructor: jr,
		isLineLoop: !0
	}), Wr.prototype = Object.create(ke.prototype), Wr.prototype.constructor = Wr, Wr.prototype.isPointsMaterial = !0, Wr.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.morphTargets = e.morphTargets, this
	};
	var qr = new A,
		Xr = new ge,
		Yr = new le,
		Zr = new x;

	function Jr(e, t) {
		W.call(this), this.type = "Points", this.geometry = void 0 !== e ? e : new ht, this.material = void 0 !== t ? t : new Wr, this.updateMorphTargets()
	}

	function Kr(e, t, n, i, r, a, o) {
		var s = Xr.distanceSqToPoint(e);
		if (s < n) {
			var c = new x;
			Xr.closestPointToPoint(e, c), c.applyMatrix4(i);
			var l = r.ray.origin.distanceTo(c);
			if (l < r.near || l > r.far) return;
			a.push({
				distance: l,
				distanceToRay: Math.sqrt(s),
				point: c,
				index: t,
				face: null,
				object: o
			})
		}
	}

	function Qr(e, t, n, i, r, a, o, s, c) {
		p.call(this, e, t, n, i, r, a, o, s, c), this.format = void 0 !== o ? o : 1022, this.minFilter = void 0 !== a ? a : 1006, this.magFilter = void 0 !== r ? r : 1006, this.generateMipmaps = !1
	}

	function $r(e, t, n, i, r, a, o, s, c, l, h, u) {
		p.call(this, null, a, o, s, c, l, i, r, h, u), this.image = {
			width: t,
			height: n
		}, this.mipmaps = e, this.flipY = !1, this.generateMipmaps = !1
	}

	function ea(e, t, n, i, r, a, o, s, c) {
		p.call(this, e, t, n, i, r, a, o, s, c), this.needsUpdate = !0
	}

	function ta(e, t, n, i, r, a, o, s, c, l) {
		if (1026 !== (l = void 0 !== l ? l : 1026) && 1027 !== l) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
		void 0 === n && 1026 === l && (n = 1012), void 0 === n && 1027 === l && (n = 1020), p.call(this, null, i, r, a, o, s, l, n, c), this.image = {
			width: e,
			height: t
		}, this.magFilter = void 0 !== o ? o : 1003, this.minFilter = void 0 !== s ? s : 1003, this.flipY = !1, this.generateMipmaps = !1
	}

	function na(e) {
		ht.call(this), this.type = "WireframeGeometry";
		var t, n, i, r, a, o, s, c, l, h, u = [],
			p = [0, 0],
			d = {},
			f = ["a", "b", "c"];
		if (e && e.isGeometry) {
			var m = e.faces;
			for (t = 0, i = m.length; t < i; t++) {
				var v = m[t];
				for (n = 0; n < 3; n++) s = v[f[n]], c = v[f[(n + 1) % 3]], p[0] = Math.min(s, c), p[1] = Math.max(s, c), void 0 === d[l = p[0] + "," + p[1]] && (d[l] = {
					index1: p[0],
					index2: p[1]
				})
			}
			for (l in d) o = d[l], h = e.vertices[o.index1], u.push(h.x, h.y, h.z), h = e.vertices[o.index2], u.push(h.x, h.y, h.z)
		} else if (e && e.isBufferGeometry) {
			var g, y, b, w, _, M, S;
			if (h = new x, null !== e.index) {
				for (g = e.attributes.position, y = e.index, 0 === (b = e.groups).length && (b = [{
						start: 0,
						count: y.count,
						materialIndex: 0
					}]), r = 0, a = b.length; r < a; ++r)
					for (t = _ = (w = b[r]).start, i = _ + w.count; t < i; t += 3)
						for (n = 0; n < 3; n++) s = y.getX(t + n), c = y.getX(t + (n + 1) % 3), p[0] = Math.min(s, c), p[1] = Math.max(s, c), void 0 === d[l = p[0] + "," + p[1]] && (d[l] = {
							index1: p[0],
							index2: p[1]
						});
				for (l in d) o = d[l], h.fromBufferAttribute(g, o.index1), u.push(h.x, h.y, h.z), h.fromBufferAttribute(g, o.index2), u.push(h.x, h.y, h.z)
			} else
				for (t = 0, i = (g = e.attributes.position).count / 3; t < i; t++)
					for (n = 0; n < 3; n++) M = 3 * t + n, h.fromBufferAttribute(g, M), u.push(h.x, h.y, h.z), S = 3 * t + (n + 1) % 3, h.fromBufferAttribute(g, S), u.push(h.x, h.y, h.z)
		}
		this.setAttribute("position", new $e(u, 3))
	}

	function ia(e, t, n) {
		Nt.call(this), this.type = "ParametricGeometry", this.parameters = {
			func: e,
			slices: t,
			stacks: n
		}, this.fromBufferGeometry(new ra(e, t, n)), this.mergeVertices()
	}

	function ra(e, t, n) {
		ht.call(this), this.type = "ParametricBufferGeometry", this.parameters = {
			func: e,
			slices: t,
			stacks: n
		};
		var i, r, a = [],
			o = [],
			s = [],
			c = [],
			l = 1e-5,
			h = new x,
			u = new x,
			p = new x,
			d = new x,
			f = new x;
		e.length < 3 && console.error("THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.");
		var m = t + 1;
		for (i = 0; i <= n; i++) {
			var v = i / n;
			for (r = 0; r <= t; r++) {
				var g = r / t;
				e(g, v, u), o.push(u.x, u.y, u.z), g - l >= 0 ? (e(g - l, v, p), d.subVectors(u, p)) : (e(g + l, v, p), d.subVectors(p, u)), v - l >= 0 ? (e(g, v - l, p), f.subVectors(u, p)) : (e(g, v + l, p), f.subVectors(p, u)), h.crossVectors(d, f).normalize(), s.push(h.x, h.y, h.z), c.push(g, v)
			}
		}
		for (i = 0; i < n; i++)
			for (r = 0; r < t; r++) {
				var y = i * m + r,
					b = i * m + r + 1,
					w = (i + 1) * m + r + 1,
					_ = (i + 1) * m + r;
				a.push(y, b, _), a.push(b, w, _)
			}
		this.setIndex(a), this.setAttribute("position", new $e(o, 3)), this.setAttribute("normal", new $e(s, 3)), this.setAttribute("uv", new $e(c, 2))
	}

	function aa(e, t, n, i) {
		Nt.call(this), this.type = "PolyhedronGeometry", this.parameters = {
			vertices: e,
			indices: t,
			radius: n,
			detail: i
		}, this.fromBufferGeometry(new oa(e, t, n, i)), this.mergeVertices()
	}

	function oa(e, t, n, i) {
		ht.call(this), this.type = "PolyhedronBufferGeometry", this.parameters = {
			vertices: e,
			indices: t,
			radius: n,
			detail: i
		}, n = n || 1;
		var r = [],
			a = [];

		function o(e, t, n, i) {
			var r, a, o = Math.pow(2, i),
				c = [];
			for (r = 0; r <= o; r++) {
				c[r] = [];
				var l = e.clone().lerp(n, r / o),
					h = t.clone().lerp(n, r / o),
					u = o - r;
				for (a = 0; a <= u; a++) c[r][a] = 0 === a && r === o ? l : l.clone().lerp(h, a / u)
			}
			for (r = 0; r < o; r++)
				for (a = 0; a < 2 * (o - r) - 1; a++) {
					var p = Math.floor(a / 2);
					a % 2 == 0 ? (s(c[r][p + 1]), s(c[r + 1][p]), s(c[r][p])) : (s(c[r][p + 1]), s(c[r + 1][p + 1]), s(c[r + 1][p]))
				}
		}

		function s(e) {
			r.push(e.x, e.y, e.z)
		}

		function l(t, n) {
			var i = 3 * t;
			n.x = e[i + 0], n.y = e[i + 1], n.z = e[i + 2]
		}

		function h(e, t, n, i) {
			i < 0 && 1 === e.x && (a[t] = e.x - 1), 0 === n.x && 0 === n.z && (a[t] = i / 2 / Math.PI + .5)
		}

		function u(e) {
			return Math.atan2(e.z, -e.x)
		}! function (e) {
			for (var n = new x, i = new x, r = new x, a = 0; a < t.length; a += 3) l(t[a + 0], n), l(t[a + 1], i), l(t[a + 2], r), o(n, i, r, e)
		}(i = i || 0),
		function (e) {
			for (var t = new x, n = 0; n < r.length; n += 3) t.x = r[n + 0], t.y = r[n + 1], t.z = r[n + 2], t.normalize().multiplyScalar(e), r[n + 0] = t.x, r[n + 1] = t.y, r[n + 2] = t.z
		}(n),
		function () {
			for (var e = new x, t = 0; t < r.length; t += 3) {
				e.x = r[t + 0], e.y = r[t + 1], e.z = r[t + 2];
				var n = u(e) / 2 / Math.PI + .5,
					i = (o = e, Math.atan2(-o.y, Math.sqrt(o.x * o.x + o.z * o.z)) / Math.PI + .5);
				a.push(n, 1 - i)
			}
			var o;
			(function () {
				for (var e = new x, t = new x, n = new x, i = new x, o = new c, s = new c, l = new c, p = 0, d = 0; p < r.length; p += 9, d += 6) {
					e.set(r[p + 0], r[p + 1], r[p + 2]), t.set(r[p + 3], r[p + 4], r[p + 5]), n.set(r[p + 6], r[p + 7], r[p + 8]), o.set(a[d + 0], a[d + 1]), s.set(a[d + 2], a[d + 3]), l.set(a[d + 4], a[d + 5]), i.copy(e).add(t).add(n).divideScalar(3);
					var f = u(i);
					h(o, d + 0, e, f), h(s, d + 2, t, f), h(l, d + 4, n, f)
				}
			})(),
			function () {
				for (var e = 0; e < a.length; e += 6) {
					var t = a[e + 0],
						n = a[e + 2],
						i = a[e + 4],
						r = Math.max(t, n, i),
						o = Math.min(t, n, i);
					r > .9 && o < .1 && (t < .2 && (a[e + 0] += 1), n < .2 && (a[e + 2] += 1), i < .2 && (a[e + 4] += 1))
				}
			}()
		}(), this.setAttribute("position", new $e(r, 3)), this.setAttribute("normal", new $e(r.slice(), 3)), this.setAttribute("uv", new $e(a, 2)), 0 === i ? this.computeVertexNormals() : this.normalizeNormals()
	}

	function sa(e, t) {
		Nt.call(this), this.type = "TetrahedronGeometry", this.parameters = {
			radius: e,
			detail: t
		}, this.fromBufferGeometry(new ca(e, t)), this.mergeVertices()
	}

	function ca(e, t) {
		oa.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], e, t), this.type = "TetrahedronBufferGeometry", this.parameters = {
			radius: e,
			detail: t
		}
	}

	function la(e, t) {
		Nt.call(this), this.type = "OctahedronGeometry", this.parameters = {
			radius: e,
			detail: t
		}, this.fromBufferGeometry(new ha(e, t)), this.mergeVertices()
	}

	function ha(e, t) {
		oa.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], e, t), this.type = "OctahedronBufferGeometry", this.parameters = {
			radius: e,
			detail: t
		}
	}

	function ua(e, t) {
		Nt.call(this), this.type = "IcosahedronGeometry", this.parameters = {
			radius: e,
			detail: t
		}, this.fromBufferGeometry(new pa(e, t)), this.mergeVertices()
	}

	function pa(e, t) {
		var n = (1 + Math.sqrt(5)) / 2,
			i = [-1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, 0, 0, -1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, n, 0, -1, n, 0, 1, -n, 0, -1, -n, 0, 1];
		oa.call(this, i, [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], e, t), this.type = "IcosahedronBufferGeometry", this.parameters = {
			radius: e,
			detail: t
		}
	}

	function da(e, t) {
		Nt.call(this), this.type = "DodecahedronGeometry", this.parameters = {
			radius: e,
			detail: t
		}, this.fromBufferGeometry(new fa(e, t)), this.mergeVertices()
	}

	function fa(e, t) {
		var n = (1 + Math.sqrt(5)) / 2,
			i = 1 / n,
			r = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -i, -n, 0, -i, n, 0, i, -n, 0, i, n, -i, -n, 0, -i, n, 0, i, -n, 0, i, n, 0, -n, 0, -i, n, 0, -i, -n, 0, i, n, 0, i];
		oa.call(this, r, [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], e, t), this.type = "DodecahedronBufferGeometry", this.parameters = {
			radius: e,
			detail: t
		}
	}

	function ma(e, t, n, i, r, a) {
		Nt.call(this), this.type = "TubeGeometry", this.parameters = {
			path: e,
			tubularSegments: t,
			radius: n,
			radialSegments: i,
			closed: r
		}, void 0 !== a && console.warn("THREE.TubeGeometry: taper has been removed.");
		var o = new va(e, t, n, i, r);
		this.tangents = o.tangents, this.normals = o.normals, this.binormals = o.binormals, this.fromBufferGeometry(o), this.mergeVertices()
	}

	function va(e, t, n, i, r) {
		ht.call(this), this.type = "TubeBufferGeometry", this.parameters = {
			path: e,
			tubularSegments: t,
			radius: n,
			radialSegments: i,
			closed: r
		}, t = t || 64, n = n || 1, i = i || 8, r = r || !1;
		var a = e.computeFrenetFrames(t, r);
		this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
		var o, s, l = new x,
			h = new x,
			u = new c,
			p = new x,
			d = [],
			f = [],
			m = [],
			v = [];

		function g(r) {
			p = e.getPointAt(r / t, p);
			var o = a.normals[r],
				c = a.binormals[r];
			for (s = 0; s <= i; s++) {
				var u = s / i * Math.PI * 2,
					m = Math.sin(u),
					v = -Math.cos(u);
				h.x = v * o.x + m * c.x, h.y = v * o.y + m * c.y, h.z = v * o.z + m * c.z, h.normalize(), f.push(h.x, h.y, h.z), l.x = p.x + n * h.x, l.y = p.y + n * h.y, l.z = p.z + n * h.z, d.push(l.x, l.y, l.z)
			}
		}! function () {
			for (o = 0; o < t; o++) g(o);
			g(!1 === r ? t : 0),
				function () {
					for (o = 0; o <= t; o++)
						for (s = 0; s <= i; s++) u.x = o / t, u.y = s / i, m.push(u.x, u.y)
				}(),
				function () {
					for (s = 1; s <= t; s++)
						for (o = 1; o <= i; o++) {
							var e = (i + 1) * (s - 1) + (o - 1),
								n = (i + 1) * s + (o - 1),
								r = (i + 1) * s + o,
								a = (i + 1) * (s - 1) + o;
							v.push(e, n, a), v.push(n, r, a)
						}
				}()
		}(), this.setIndex(v), this.setAttribute("position", new $e(d, 3)), this.setAttribute("normal", new $e(f, 3)), this.setAttribute("uv", new $e(m, 2))
	}

	function ga(e, t, n, i, r, a, o) {
		Nt.call(this), this.type = "TorusKnotGeometry", this.parameters = {
			radius: e,
			tube: t,
			tubularSegments: n,
			radialSegments: i,
			p: r,
			q: a
		}, void 0 !== o && console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead."), this.fromBufferGeometry(new ya(e, t, n, i, r, a)), this.mergeVertices()
	}

	function ya(e, t, n, i, r, a) {
		ht.call(this), this.type = "TorusKnotBufferGeometry", this.parameters = {
			radius: e,
			tube: t,
			tubularSegments: n,
			radialSegments: i,
			p: r,
			q: a
		}, e = e || 1, t = t || .4, n = Math.floor(n) || 64, i = Math.floor(i) || 8, r = r || 2, a = a || 3;
		var o, s, c = [],
			l = [],
			h = [],
			u = [],
			p = new x,
			d = new x,
			f = new x,
			m = new x,
			v = new x,
			g = new x,
			y = new x;
		for (o = 0; o <= n; ++o) {
			var b = o / n * r * Math.PI * 2;
			for (L(b, r, a, e, f), L(b + .01, r, a, e, m), g.subVectors(m, f), y.addVectors(m, f), v.crossVectors(g, y), y.crossVectors(v, g), v.normalize(), y.normalize(), s = 0; s <= i; ++s) {
				var w = s / i * Math.PI * 2,
					_ = -t * Math.cos(w),
					M = t * Math.sin(w);
				p.x = f.x + (_ * y.x + M * v.x), p.y = f.y + (_ * y.y + M * v.y), p.z = f.z + (_ * y.z + M * v.z), l.push(p.x, p.y, p.z), d.subVectors(p, f).normalize(), h.push(d.x, d.y, d.z), u.push(o / n), u.push(s / i)
			}
		}
		for (s = 1; s <= n; s++)
			for (o = 1; o <= i; o++) {
				var S = (i + 1) * (s - 1) + (o - 1),
					T = (i + 1) * s + (o - 1),
					E = (i + 1) * s + o,
					A = (i + 1) * (s - 1) + o;
				c.push(S, T, A), c.push(T, E, A)
			}

		function L(e, t, n, i, r) {
			var a = Math.cos(e),
				o = Math.sin(e),
				s = n / t * e,
				c = Math.cos(s);
			r.x = i * (2 + c) * .5 * a, r.y = i * (2 + c) * o * .5, r.z = i * Math.sin(s) * .5
		}
		this.setIndex(c), this.setAttribute("position", new $e(l, 3)), this.setAttribute("normal", new $e(h, 3)), this.setAttribute("uv", new $e(u, 2))
	}

	function xa(e, t, n, i, r) {
		Nt.call(this), this.type = "TorusGeometry", this.parameters = {
			radius: e,
			tube: t,
			radialSegments: n,
			tubularSegments: i,
			arc: r
		}, this.fromBufferGeometry(new ba(e, t, n, i, r)), this.mergeVertices()
	}

	function ba(e, t, n, i, r) {
		ht.call(this), this.type = "TorusBufferGeometry", this.parameters = {
			radius: e,
			tube: t,
			radialSegments: n,
			tubularSegments: i,
			arc: r
		}, e = e || 1, t = t || .4, n = Math.floor(n) || 8, i = Math.floor(i) || 6, r = r || 2 * Math.PI;
		var a, o, s = [],
			c = [],
			l = [],
			h = [],
			u = new x,
			p = new x,
			d = new x;
		for (a = 0; a <= n; a++)
			for (o = 0; o <= i; o++) {
				var f = o / i * r,
					m = a / n * Math.PI * 2;
				p.x = (e + t * Math.cos(m)) * Math.cos(f), p.y = (e + t * Math.cos(m)) * Math.sin(f), p.z = t * Math.sin(m), c.push(p.x, p.y, p.z), u.x = e * Math.cos(f), u.y = e * Math.sin(f), d.subVectors(p, u).normalize(), l.push(d.x, d.y, d.z), h.push(o / i), h.push(a / n)
			}
		for (a = 1; a <= n; a++)
			for (o = 1; o <= i; o++) {
				var v = (i + 1) * a + o - 1,
					g = (i + 1) * (a - 1) + o - 1,
					y = (i + 1) * (a - 1) + o,
					b = (i + 1) * a + o;
				s.push(v, g, b), s.push(g, y, b)
			}
		this.setIndex(s), this.setAttribute("position", new $e(c, 3)), this.setAttribute("normal", new $e(l, 3)), this.setAttribute("uv", new $e(h, 2))
	}
	Jr.prototype = Object.assign(Object.create(W.prototype), {
		constructor: Jr,
		isPoints: !0,
		raycast: function (e, t) {
			var n = this.geometry,
				i = this.matrixWorld,
				r = e.params.Points.threshold;
			if (null === n.boundingSphere && n.computeBoundingSphere(), Yr.copy(n.boundingSphere), Yr.applyMatrix4(i), Yr.radius += r, !1 !== e.ray.intersectsSphere(Yr)) {
				qr.getInverse(i), Xr.copy(e.ray).applyMatrix4(qr);
				var a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
					o = a * a;
				if (n.isBufferGeometry) {
					var s = n.index,
						c = n.attributes.position.array;
					if (null !== s)
						for (var l = s.array, h = 0, u = l.length; h < u; h++) {
							var p = l[h];
							Zr.fromArray(c, 3 * p), Kr(Zr, p, o, i, e, t, this)
						} else {
							h = 0;
							for (var d = c.length / 3; h < d; h++) Zr.fromArray(c, 3 * h), Kr(Zr, h, o, i, e, t, this)
						}
				} else {
					var f = n.vertices;
					for (h = 0, d = f.length; h < d; h++) Kr(f[h], h, o, i, e, t, this)
				}
			}
		},
		updateMorphTargets: function () {
			var e, t, n, i = this.geometry;
			if (i.isBufferGeometry) {
				var r = i.morphAttributes,
					a = Object.keys(r);
				if (a.length > 0) {
					var o = r[a[0]];
					if (void 0 !== o)
						for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, e = 0, t = o.length; e < t; e++) n = o[e].name || String(e), this.morphTargetInfluences.push(0), this.morphTargetDictionary[n] = e
				}
			} else {
				var s = i.morphTargets;
				void 0 !== s && s.length > 0 && console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")
			}
		},
		clone: function () {
			return new this.constructor(this.geometry, this.material).copy(this)
		}
	}), Qr.prototype = Object.assign(Object.create(p.prototype), {
		constructor: Qr,
		isVideoTexture: !0,
		update: function () {
			var e = this.image;
			e.readyState >= e.HAVE_CURRENT_DATA && (this.needsUpdate = !0)
		}
	}), $r.prototype = Object.create(p.prototype), $r.prototype.constructor = $r, $r.prototype.isCompressedTexture = !0, ea.prototype = Object.create(p.prototype), ea.prototype.constructor = ea, ea.prototype.isCanvasTexture = !0, ta.prototype = Object.create(p.prototype), ta.prototype.constructor = ta, ta.prototype.isDepthTexture = !0, na.prototype = Object.create(ht.prototype), na.prototype.constructor = na, ia.prototype = Object.create(Nt.prototype), ia.prototype.constructor = ia, ra.prototype = Object.create(ht.prototype), ra.prototype.constructor = ra, aa.prototype = Object.create(Nt.prototype), aa.prototype.constructor = aa, oa.prototype = Object.create(ht.prototype), oa.prototype.constructor = oa, sa.prototype = Object.create(Nt.prototype), sa.prototype.constructor = sa, ca.prototype = Object.create(oa.prototype), ca.prototype.constructor = ca, la.prototype = Object.create(Nt.prototype), la.prototype.constructor = la, ha.prototype = Object.create(oa.prototype), ha.prototype.constructor = ha, ua.prototype = Object.create(Nt.prototype), ua.prototype.constructor = ua, pa.prototype = Object.create(oa.prototype), pa.prototype.constructor = pa, da.prototype = Object.create(Nt.prototype), da.prototype.constructor = da, fa.prototype = Object.create(oa.prototype), fa.prototype.constructor = fa, ma.prototype = Object.create(Nt.prototype), ma.prototype.constructor = ma, va.prototype = Object.create(ht.prototype), va.prototype.constructor = va, va.prototype.toJSON = function () {
		var e = ht.prototype.toJSON.call(this);
		return e.path = this.parameters.path.toJSON(), e
	}, ga.prototype = Object.create(Nt.prototype), ga.prototype.constructor = ga, ya.prototype = Object.create(ht.prototype), ya.prototype.constructor = ya, xa.prototype = Object.create(Nt.prototype), xa.prototype.constructor = xa, ba.prototype = Object.create(ht.prototype), ba.prototype.constructor = ba;
	var wa = function (e, t, n) {
		n = n || 2;
		var i, r, a, o, s, c, l, h = t && t.length,
			u = h ? t[0] * n : e.length,
			p = _a(e, 0, u, n, !0),
			d = [];
		if (!p || p.next === p.prev) return d;
		if (h && (p = function (e, t, n, i) {
				var r, a, o, s, c, l = [];
				for (r = 0, a = t.length; r < a; r++) o = t[r] * i, s = r < a - 1 ? t[r + 1] * i : e.length, (c = _a(e, o, s, i, !1)) === c.next && (c.steiner = !0), l.push(Oa(c));
				for (l.sort(Ra), r = 0; r < l.length; r++) Pa(l[r], n), n = Ma(n, n.next);
				return n
			}(e, t, p, n)), e.length > 80 * n) {
			i = a = e[0], r = o = e[1];
			for (var f = n; f < u; f += n)(s = e[f]) < i && (i = s), (c = e[f + 1]) < r && (r = c), s > a && (a = s), c > o && (o = c);
			l = 0 !== (l = Math.max(a - i, o - r)) ? 1 / l : 0
		}
		return Sa(p, d, n, i, r, l), d
	};

	function _a(e, t, n, i, r) {
		var a, o;
		if (r === function (e, t, n, i) {
				for (var r = 0, a = t, o = n - i; a < n; a += i) r += (e[o] - e[a]) * (e[a + 1] + e[o + 1]), o = a;
				return r
			}(e, t, n, i) > 0)
			for (a = t; a < n; a += i) o = Ha(a, e[a], e[a + 1], o);
		else
			for (a = n - i; a >= t; a -= i) o = Ha(a, e[a], e[a + 1], o);
		return o && Ua(o, o.next) && (Ga(o), o = o.next), o
	}

	function Ma(e, t) {
		if (!e) return e;
		t || (t = e);
		var n, i = e;
		do {
			if (n = !1, i.steiner || !Ua(i, i.next) && 0 !== Na(i.prev, i, i.next)) i = i.next;
			else {
				if (Ga(i), (i = t = i.prev) === i.next) break;
				n = !0
			}
		} while (n || i !== t);
		return t
	}

	function Sa(e, t, n, i, r, a, o) {
		if (e) {
			!o && a && function (e, t, n, i) {
				var r = e;
				do {
					null === r.z && (r.z = Ca(r.x, r.y, t, n, i)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next
				} while (r !== e);
				r.prevZ.nextZ = null, r.prevZ = null,
					function (e) {
						var t, n, i, r, a, o, s, c, l = 1;
						do {
							for (n = e, e = null, a = null, o = 0; n;) {
								for (o++, i = n, s = 0, t = 0; t < l && (s++, i = i.nextZ); t++);
								for (c = l; s > 0 || c > 0 && i;) 0 !== s && (0 === c || !i || n.z <= i.z) ? (r = n, n = n.nextZ, s--) : (r = i, i = i.nextZ, c--), a ? a.nextZ = r : e = r, r.prevZ = a, a = r;
								n = i
							}
							a.nextZ = null, l *= 2
						} while (o > 1)
					}(r)
			}(e, i, r, a);
			for (var s, c, l = e; e.prev !== e.next;)
				if (s = e.prev, c = e.next, a ? Ea(e, i, r, a) : Ta(e)) t.push(s.i / n), t.push(e.i / n), t.push(c.i / n), Ga(e), e = c.next, l = c.next;
				else if ((e = c) === l) {
				o ? 1 === o ? Sa(e = Aa(e, t, n), t, n, i, r, a, 2) : 2 === o && La(e, t, n, i, r, a) : Sa(Ma(e), t, n, i, r, a, 1);
				break
			}
		}
	}

	function Ta(e) {
		var t = e.prev,
			n = e,
			i = e.next;
		if (Na(t, n, i) >= 0) return !1;
		for (var r = e.next.next; r !== e.prev;) {
			if (Da(t.x, t.y, n.x, n.y, i.x, i.y, r.x, r.y) && Na(r.prev, r, r.next) >= 0) return !1;
			r = r.next
		}
		return !0
	}

	function Ea(e, t, n, i) {
		var r = e.prev,
			a = e,
			o = e.next;
		if (Na(r, a, o) >= 0) return !1;
		for (var s = r.x < a.x ? r.x < o.x ? r.x : o.x : a.x < o.x ? a.x : o.x, c = r.y < a.y ? r.y < o.y ? r.y : o.y : a.y < o.y ? a.y : o.y, l = r.x > a.x ? r.x > o.x ? r.x : o.x : a.x > o.x ? a.x : o.x, h = r.y > a.y ? r.y > o.y ? r.y : o.y : a.y > o.y ? a.y : o.y, u = Ca(s, c, t, n, i), p = Ca(l, h, t, n, i), d = e.prevZ, f = e.nextZ; d && d.z >= u && f && f.z <= p;) {
			if (d !== e.prev && d !== e.next && Da(r.x, r.y, a.x, a.y, o.x, o.y, d.x, d.y) && Na(d.prev, d, d.next) >= 0) return !1;
			if (d = d.prevZ, f !== e.prev && f !== e.next && Da(r.x, r.y, a.x, a.y, o.x, o.y, f.x, f.y) && Na(f.prev, f, f.next) >= 0) return !1;
			f = f.nextZ
		}
		for (; d && d.z >= u;) {
			if (d !== e.prev && d !== e.next && Da(r.x, r.y, a.x, a.y, o.x, o.y, d.x, d.y) && Na(d.prev, d, d.next) >= 0) return !1;
			d = d.prevZ
		}
		for (; f && f.z <= p;) {
			if (f !== e.prev && f !== e.next && Da(r.x, r.y, a.x, a.y, o.x, o.y, f.x, f.y) && Na(f.prev, f, f.next) >= 0) return !1;
			f = f.nextZ
		}
		return !0
	}

	function Aa(e, t, n) {
		var i = e;
		do {
			var r = i.prev,
				a = i.next.next;
			!Ua(r, a) && za(r, i, i.next, a) && Fa(r, a) && Fa(a, r) && (t.push(r.i / n), t.push(i.i / n), t.push(a.i / n), Ga(i), Ga(i.next), i = e = a), i = i.next
		} while (i !== e);
		return i
	}

	function La(e, t, n, i, r, a) {
		var o = e;
		do {
			for (var s = o.next.next; s !== o.prev;) {
				if (o.i !== s.i && Ia(o, s)) {
					var c = Ba(o, s);
					return o = Ma(o, o.next), c = Ma(c, c.next), Sa(o, t, n, i, r, a), void Sa(c, t, n, i, r, a)
				}
				s = s.next
			}
			o = o.next
		} while (o !== e)
	}

	function Ra(e, t) {
		return e.x - t.x
	}

	function Pa(e, t) {
		if (t = function (e, t) {
				var n, i = t,
					r = e.x,
					a = e.y,
					o = -1 / 0;
				do {
					if (a <= i.y && a >= i.next.y && i.next.y !== i.y) {
						var s = i.x + (a - i.y) * (i.next.x - i.x) / (i.next.y - i.y);
						if (s <= r && s > o) {
							if (o = s, s === r) {
								if (a === i.y) return i;
								if (a === i.next.y) return i.next
							}
							n = i.x < i.next.x ? i : i.next
						}
					}
					i = i.next
				} while (i !== t);
				if (!n) return null;
				if (r === o) return n.prev;
				var c, l = n,
					h = n.x,
					u = n.y,
					p = 1 / 0;
				i = n.next;
				for (; i !== l;) r >= i.x && i.x >= h && r !== i.x && Da(a < u ? r : o, a, h, u, a < u ? o : r, a, i.x, i.y) && ((c = Math.abs(a - i.y) / (r - i.x)) < p || c === p && i.x > n.x) && Fa(i, e) && (n = i, p = c), i = i.next;
				return n
			}(e, t)) {
			var n = Ba(t, e);
			Ma(n, n.next)
		}
	}

	function Ca(e, t, n, i, r) {
		return (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - n) * r) | e << 8)) | e << 4)) | e << 2)) | e << 1)) | (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - i) * r) | t << 8)) | t << 4)) | t << 2)) | t << 1)) << 1
	}

	function Oa(e) {
		var t = e,
			n = e;
		do {
			(t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next
		} while (t !== e);
		return n
	}

	function Da(e, t, n, i, r, a, o, s) {
		return (r - o) * (t - s) - (e - o) * (a - s) >= 0 && (e - o) * (i - s) - (n - o) * (t - s) >= 0 && (n - o) * (a - s) - (r - o) * (i - s) >= 0
	}

	function Ia(e, t) {
		return e.next.i !== t.i && e.prev.i !== t.i && ! function (e, t) {
			var n = e;
			do {
				if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && za(n, n.next, e, t)) return !0;
				n = n.next
			} while (n !== e);
			return !1
		}(e, t) && Fa(e, t) && Fa(t, e) && function (e, t) {
			var n = e,
				i = !1,
				r = (e.x + t.x) / 2,
				a = (e.y + t.y) / 2;
			do {
				n.y > a != n.next.y > a && n.next.y !== n.y && r < (n.next.x - n.x) * (a - n.y) / (n.next.y - n.y) + n.x && (i = !i), n = n.next
			} while (n !== e);
			return i
		}(e, t)
	}

	function Na(e, t, n) {
		return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y)
	}

	function Ua(e, t) {
		return e.x === t.x && e.y === t.y
	}

	function za(e, t, n, i) {
		return !!(Ua(e, n) && Ua(t, i) || Ua(e, i) && Ua(n, t)) || Na(e, t, n) > 0 != Na(e, t, i) > 0 && Na(n, i, e) > 0 != Na(n, i, t) > 0
	}

	function Fa(e, t) {
		return Na(e.prev, e, e.next) < 0 ? Na(e, t, e.next) >= 0 && Na(e, e.prev, t) >= 0 : Na(e, t, e.prev) < 0 || Na(e, e.next, t) < 0
	}

	function Ba(e, t) {
		var n = new ka(e.i, e.x, e.y),
			i = new ka(t.i, t.x, t.y),
			r = e.next,
			a = t.prev;
		return e.next = t, t.prev = e, n.next = r, r.prev = n, i.next = n, n.prev = i, a.next = i, i.prev = a, i
	}

	function Ha(e, t, n, i) {
		var r = new ka(e, t, n);
		return i ? (r.next = i.next, r.prev = i, i.next.prev = r, i.next = r) : (r.prev = r, r.next = r), r
	}

	function Ga(e) {
		e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ)
	}

	function ka(e, t, n) {
		this.i = e, this.x = t, this.y = n, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
	}
	var Va = {
		area: function (e) {
			for (var t = e.length, n = 0, i = t - 1, r = 0; r < t; i = r++) n += e[i].x * e[r].y - e[r].x * e[i].y;
			return .5 * n
		},
		isClockWise: function (e) {
			return Va.area(e) < 0
		},
		triangulateShape: function (e, t) {
			var n = [],
				i = [],
				r = [];
			ja(e), Wa(n, e);
			var a = e.length;
			t.forEach(ja);
			for (var o = 0; o < t.length; o++) i.push(a), a += t[o].length, Wa(n, t[o]);
			var s = wa(n, i);
			for (o = 0; o < s.length; o += 3) r.push(s.slice(o, o + 3));
			return r
		}
	};

	function ja(e) {
		var t = e.length;
		t > 2 && e[t - 1].equals(e[0]) && e.pop()
	}

	function Wa(e, t) {
		for (var n = 0; n < t.length; n++) e.push(t[n].x), e.push(t[n].y)
	}

	function qa(e, t) {
		Nt.call(this), this.type = "ExtrudeGeometry", this.parameters = {
			shapes: e,
			options: t
		}, this.fromBufferGeometry(new Xa(e, t)), this.mergeVertices()
	}

	function Xa(e, t) {
		ht.call(this), this.type = "ExtrudeBufferGeometry", this.parameters = {
			shapes: e,
			options: t
		}, e = Array.isArray(e) ? e : [e];
		for (var n = this, i = [], r = [], a = 0, o = e.length; a < o; a++) {
			s(e[a])
		}

		function s(e) {
			var a = [],
				o = void 0 !== t.curveSegments ? t.curveSegments : 12,
				s = void 0 !== t.steps ? t.steps : 1,
				l = void 0 !== t.depth ? t.depth : 100,
				h = void 0 === t.bevelEnabled || t.bevelEnabled,
				u = void 0 !== t.bevelThickness ? t.bevelThickness : 6,
				p = void 0 !== t.bevelSize ? t.bevelSize : u - 2,
				d = void 0 !== t.bevelOffset ? t.bevelOffset : 0,
				f = void 0 !== t.bevelSegments ? t.bevelSegments : 3,
				m = t.extrudePath,
				v = void 0 !== t.UVGenerator ? t.UVGenerator : Ya;
			void 0 !== t.amount && (console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."), l = t.amount);
			var g, y, b, w, _, M, S, T, E = !1;
			m && (g = m.getSpacedPoints(s), E = !0, h = !1, y = m.computeFrenetFrames(s, !1), b = new x, w = new x, _ = new x), h || (f = 0, u = 0, p = 0, d = 0);
			var A = e.extractPoints(o),
				L = A.shape,
				R = A.holes;
			if (!Va.isClockWise(L))
				for (L = L.reverse(), S = 0, T = R.length; S < T; S++) M = R[S], Va.isClockWise(M) && (R[S] = M.reverse());
			var P = Va.triangulateShape(L, R),
				C = L;
			for (S = 0, T = R.length; S < T; S++) M = R[S], L = L.concat(M);

			function O(e, t, n) {
				return t || console.error("THREE.ExtrudeGeometry: vec does not exist"), t.clone().multiplyScalar(n).add(e)
			}
			var D, I, N, U, z, F, B = L.length,
				H = P.length;

			function G(e, t, n) {
				var i, r, a, o = e.x - t.x,
					s = e.y - t.y,
					l = n.x - e.x,
					h = n.y - e.y,
					u = o * o + s * s,
					p = o * h - s * l;
				if (Math.abs(p) > Number.EPSILON) {
					var d = Math.sqrt(u),
						f = Math.sqrt(l * l + h * h),
						m = t.x - s / d,
						v = t.y + o / d,
						g = ((n.x - h / f - m) * h - (n.y + l / f - v) * l) / (o * h - s * l),
						y = (i = m + o * g - e.x) * i + (r = v + s * g - e.y) * r;
					if (y <= 2) return new c(i, r);
					a = Math.sqrt(y / 2)
				} else {
					var x = !1;
					o > Number.EPSILON ? l > Number.EPSILON && (x = !0) : o < -Number.EPSILON ? l < -Number.EPSILON && (x = !0) : Math.sign(s) === Math.sign(h) && (x = !0), x ? (i = -s, r = o, a = Math.sqrt(u)) : (i = o, r = s, a = Math.sqrt(u / 2))
				}
				return new c(i / a, r / a)
			}
			for (var k = [], V = 0, j = C.length, W = j - 1, q = V + 1; V < j; V++, W++, q++) W === j && (W = 0), q === j && (q = 0), k[V] = G(C[V], C[W], C[q]);
			var X, Y, Z = [],
				J = k.concat();
			for (S = 0, T = R.length; S < T; S++) {
				for (M = R[S], X = [], V = 0, W = (j = M.length) - 1, q = V + 1; V < j; V++, W++, q++) W === j && (W = 0), q === j && (q = 0), X[V] = G(M[V], M[W], M[q]);
				Z.push(X), J = J.concat(X)
			}
			for (D = 0; D < f; D++) {
				for (N = D / f, U = u * Math.cos(N * Math.PI / 2), I = p * Math.sin(N * Math.PI / 2) + d, V = 0, j = C.length; V < j; V++) Q((z = O(C[V], k[V], I)).x, z.y, -U);
				for (S = 0, T = R.length; S < T; S++)
					for (M = R[S], X = Z[S], V = 0, j = M.length; V < j; V++) Q((z = O(M[V], X[V], I)).x, z.y, -U)
			}
			for (I = p + d, V = 0; V < B; V++) z = h ? O(L[V], J[V], I) : L[V], E ? (w.copy(y.normals[0]).multiplyScalar(z.x), b.copy(y.binormals[0]).multiplyScalar(z.y), _.copy(g[0]).add(w).add(b), Q(_.x, _.y, _.z)) : Q(z.x, z.y, 0);
			for (Y = 1; Y <= s; Y++)
				for (V = 0; V < B; V++) z = h ? O(L[V], J[V], I) : L[V], E ? (w.copy(y.normals[Y]).multiplyScalar(z.x), b.copy(y.binormals[Y]).multiplyScalar(z.y), _.copy(g[Y]).add(w).add(b), Q(_.x, _.y, _.z)) : Q(z.x, z.y, l / s * Y);
			for (D = f - 1; D >= 0; D--) {
				for (N = D / f, U = u * Math.cos(N * Math.PI / 2), I = p * Math.sin(N * Math.PI / 2) + d, V = 0, j = C.length; V < j; V++) Q((z = O(C[V], k[V], I)).x, z.y, l + U);
				for (S = 0, T = R.length; S < T; S++)
					for (M = R[S], X = Z[S], V = 0, j = M.length; V < j; V++) z = O(M[V], X[V], I), E ? Q(z.x, z.y + g[s - 1].y, g[s - 1].x + U) : Q(z.x, z.y, l + U)
			}

			function K(e, t) {
				var n, i;
				for (V = e.length; --V >= 0;) {
					n = V, (i = V - 1) < 0 && (i = e.length - 1);
					var r = 0,
						a = s + 2 * f;
					for (r = 0; r < a; r++) {
						var o = B * r,
							c = B * (r + 1);
						ee(t + n + o, t + i + o, t + i + c, t + n + c)
					}
				}
			}

			function Q(e, t, n) {
				a.push(e), a.push(t), a.push(n)
			}

			function $(e, t, r) {
				te(e), te(t), te(r);
				var a = i.length / 3,
					o = v.generateTopUV(n, i, a - 3, a - 2, a - 1);
				ne(o[0]), ne(o[1]), ne(o[2])
			}

			function ee(e, t, r, a) {
				te(e), te(t), te(a), te(t), te(r), te(a);
				var o = i.length / 3,
					s = v.generateSideWallUV(n, i, o - 6, o - 3, o - 2, o - 1);
				ne(s[0]), ne(s[1]), ne(s[3]), ne(s[1]), ne(s[2]), ne(s[3])
			}

			function te(e) {
				i.push(a[3 * e + 0]), i.push(a[3 * e + 1]), i.push(a[3 * e + 2])
			}

			function ne(e) {
				r.push(e.x), r.push(e.y)
			}! function () {
				var e = i.length / 3;
				if (h) {
					var t = 0,
						r = B * t;
					for (V = 0; V < H; V++) $((F = P[V])[2] + r, F[1] + r, F[0] + r);
					for (r = B * (t = s + 2 * f), V = 0; V < H; V++) $((F = P[V])[0] + r, F[1] + r, F[2] + r)
				} else {
					for (V = 0; V < H; V++) $((F = P[V])[2], F[1], F[0]);
					for (V = 0; V < H; V++) $((F = P[V])[0] + B * s, F[1] + B * s, F[2] + B * s)
				}
				n.addGroup(e, i.length / 3 - e, 0)
			}(),
			function () {
				var e = i.length / 3,
					t = 0;
				for (K(C, t), t += C.length, S = 0, T = R.length; S < T; S++) K(M = R[S], t), t += M.length;
				n.addGroup(e, i.length / 3 - e, 1)
			}()
		}
		this.setAttribute("position", new $e(i, 3)), this.setAttribute("uv", new $e(r, 2)), this.computeVertexNormals()
	}
	qa.prototype = Object.create(Nt.prototype), qa.prototype.constructor = qa, qa.prototype.toJSON = function () {
		var e = Nt.prototype.toJSON.call(this);
		return Za(this.parameters.shapes, this.parameters.options, e)
	}, Xa.prototype = Object.create(ht.prototype), Xa.prototype.constructor = Xa, Xa.prototype.toJSON = function () {
		var e = ht.prototype.toJSON.call(this);
		return Za(this.parameters.shapes, this.parameters.options, e)
	};
	var Ya = {
		generateTopUV: function (e, t, n, i, r) {
			var a = t[3 * n],
				o = t[3 * n + 1],
				s = t[3 * i],
				l = t[3 * i + 1],
				h = t[3 * r],
				u = t[3 * r + 1];
			return [new c(a, o), new c(s, l), new c(h, u)]
		},
		generateSideWallUV: function (e, t, n, i, r, a) {
			var o = t[3 * n],
				s = t[3 * n + 1],
				l = t[3 * n + 2],
				h = t[3 * i],
				u = t[3 * i + 1],
				p = t[3 * i + 2],
				d = t[3 * r],
				f = t[3 * r + 1],
				m = t[3 * r + 2],
				v = t[3 * a],
				g = t[3 * a + 1],
				y = t[3 * a + 2];
			return Math.abs(s - u) < .01 ? [new c(o, 1 - l), new c(h, 1 - p), new c(d, 1 - m), new c(v, 1 - y)] : [new c(s, 1 - l), new c(u, 1 - p), new c(f, 1 - m), new c(g, 1 - y)]
		}
	};

	function Za(e, t, n) {
		if (n.shapes = [], Array.isArray(e))
			for (var i = 0, r = e.length; i < r; i++) {
				var a = e[i];
				n.shapes.push(a.uuid)
			} else n.shapes.push(e.uuid);
		return void 0 !== t.extrudePath && (n.options.extrudePath = t.extrudePath.toJSON()), n
	}

	function Ja(e, t) {
		Nt.call(this), this.type = "TextGeometry", this.parameters = {
			text: e,
			parameters: t
		}, this.fromBufferGeometry(new Ka(e, t)), this.mergeVertices()
	}

	function Ka(e, t) {
		var n = (t = t || {}).font;
		if (!n || !n.isFont) return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."), new Nt;
		var i = n.generateShapes(e, t.size);
		t.depth = void 0 !== t.height ? t.height : 50, void 0 === t.bevelThickness && (t.bevelThickness = 10), void 0 === t.bevelSize && (t.bevelSize = 8), void 0 === t.bevelEnabled && (t.bevelEnabled = !1), Xa.call(this, i, t), this.type = "TextBufferGeometry"
	}

	function Qa(e, t, n, i, r, a, o) {
		Nt.call(this), this.type = "SphereGeometry", this.parameters = {
			radius: e,
			widthSegments: t,
			heightSegments: n,
			phiStart: i,
			phiLength: r,
			thetaStart: a,
			thetaLength: o
		}, this.fromBufferGeometry(new $a(e, t, n, i, r, a, o)), this.mergeVertices()
	}

	function $a(e, t, n, i, r, a, o) {
		ht.call(this), this.type = "SphereBufferGeometry", this.parameters = {
			radius: e,
			widthSegments: t,
			heightSegments: n,
			phiStart: i,
			phiLength: r,
			thetaStart: a,
			thetaLength: o
		}, e = e || 1, t = Math.max(3, Math.floor(t) || 8), n = Math.max(2, Math.floor(n) || 6), i = void 0 !== i ? i : 0, r = void 0 !== r ? r : 2 * Math.PI, a = void 0 !== a ? a : 0, o = void 0 !== o ? o : Math.PI;
		var s, c, l = Math.min(a + o, Math.PI),
			h = 0,
			u = [],
			p = new x,
			d = new x,
			f = [],
			m = [],
			v = [],
			g = [];
		for (c = 0; c <= n; c++) {
			var y = [],
				b = c / n,
				w = 0;
			for (0 == c && 0 == a ? w = .5 / t : c == n && l == Math.PI && (w = -.5 / t), s = 0; s <= t; s++) {
				var _ = s / t;
				p.x = -e * Math.cos(i + _ * r) * Math.sin(a + b * o), p.y = e * Math.cos(a + b * o), p.z = e * Math.sin(i + _ * r) * Math.sin(a + b * o), m.push(p.x, p.y, p.z), d.copy(p).normalize(), v.push(d.x, d.y, d.z), g.push(_ + w, 1 - b), y.push(h++)
			}
			u.push(y)
		}
		for (c = 0; c < n; c++)
			for (s = 0; s < t; s++) {
				var M = u[c][s + 1],
					S = u[c][s],
					T = u[c + 1][s],
					E = u[c + 1][s + 1];
				(0 !== c || a > 0) && f.push(M, S, E), (c !== n - 1 || l < Math.PI) && f.push(S, T, E)
			}
		this.setIndex(f), this.setAttribute("position", new $e(m, 3)), this.setAttribute("normal", new $e(v, 3)), this.setAttribute("uv", new $e(g, 2))
	}

	function eo(e, t, n, i, r, a) {
		Nt.call(this), this.type = "RingGeometry", this.parameters = {
			innerRadius: e,
			outerRadius: t,
			thetaSegments: n,
			phiSegments: i,
			thetaStart: r,
			thetaLength: a
		}, this.fromBufferGeometry(new to(e, t, n, i, r, a)), this.mergeVertices()
	}

	function to(e, t, n, i, r, a) {
		ht.call(this), this.type = "RingBufferGeometry", this.parameters = {
			innerRadius: e,
			outerRadius: t,
			thetaSegments: n,
			phiSegments: i,
			thetaStart: r,
			thetaLength: a
		}, e = e || .5, t = t || 1, r = void 0 !== r ? r : 0, a = void 0 !== a ? a : 2 * Math.PI, n = void 0 !== n ? Math.max(3, n) : 8;
		var o, s, l, h = [],
			u = [],
			p = [],
			d = [],
			f = e,
			m = (t - e) / (i = void 0 !== i ? Math.max(1, i) : 1),
			v = new x,
			g = new c;
		for (s = 0; s <= i; s++) {
			for (l = 0; l <= n; l++) o = r + l / n * a, v.x = f * Math.cos(o), v.y = f * Math.sin(o), u.push(v.x, v.y, v.z), p.push(0, 0, 1), g.x = (v.x / t + 1) / 2, g.y = (v.y / t + 1) / 2, d.push(g.x, g.y);
			f += m
		}
		for (s = 0; s < i; s++) {
			var y = s * (n + 1);
			for (l = 0; l < n; l++) {
				var b = o = l + y,
					w = o + n + 1,
					_ = o + n + 2,
					M = o + 1;
				h.push(b, w, M), h.push(w, _, M)
			}
		}
		this.setIndex(h), this.setAttribute("position", new $e(u, 3)), this.setAttribute("normal", new $e(p, 3)), this.setAttribute("uv", new $e(d, 2))
	}

	function no(e, t, n, i) {
		Nt.call(this), this.type = "LatheGeometry", this.parameters = {
			points: e,
			segments: t,
			phiStart: n,
			phiLength: i
		}, this.fromBufferGeometry(new io(e, t, n, i)), this.mergeVertices()
	}

	function io(e, t, n, i) {
		ht.call(this), this.type = "LatheBufferGeometry", this.parameters = {
			points: e,
			segments: t,
			phiStart: n,
			phiLength: i
		}, t = Math.floor(t) || 12, n = n || 0, i = i || 2 * Math.PI, i = s.clamp(i, 0, 2 * Math.PI);
		var r, a, o, l = [],
			h = [],
			u = [],
			p = 1 / t,
			d = new x,
			f = new c;
		for (a = 0; a <= t; a++) {
			var m = n + a * p * i,
				v = Math.sin(m),
				g = Math.cos(m);
			for (o = 0; o <= e.length - 1; o++) d.x = e[o].x * v, d.y = e[o].y, d.z = e[o].x * g, h.push(d.x, d.y, d.z), f.x = a / t, f.y = o / (e.length - 1), u.push(f.x, f.y)
		}
		for (a = 0; a < t; a++)
			for (o = 0; o < e.length - 1; o++) {
				var y = r = o + a * e.length,
					b = r + e.length,
					w = r + e.length + 1,
					_ = r + 1;
				l.push(y, b, _), l.push(b, w, _)
			}
		if (this.setIndex(l), this.setAttribute("position", new $e(h, 3)), this.setAttribute("uv", new $e(u, 2)), this.computeVertexNormals(), i === 2 * Math.PI) {
			var M = this.attributes.normal.array,
				S = new x,
				T = new x,
				E = new x;
			for (r = t * e.length * 3, a = 0, o = 0; a < e.length; a++, o += 3) S.x = M[o + 0], S.y = M[o + 1], S.z = M[o + 2], T.x = M[r + o + 0], T.y = M[r + o + 1], T.z = M[r + o + 2], E.addVectors(S, T).normalize(), M[o + 0] = M[r + o + 0] = E.x, M[o + 1] = M[r + o + 1] = E.y, M[o + 2] = M[r + o + 2] = E.z
		}
	}

	function ro(e, t) {
		Nt.call(this), this.type = "ShapeGeometry", "object" == typeof t && (console.warn("THREE.ShapeGeometry: Options parameter has been removed."), t = t.curveSegments), this.parameters = {
			shapes: e,
			curveSegments: t
		}, this.fromBufferGeometry(new ao(e, t)), this.mergeVertices()
	}

	function ao(e, t) {
		ht.call(this), this.type = "ShapeBufferGeometry", this.parameters = {
			shapes: e,
			curveSegments: t
		}, t = t || 12;
		var n = [],
			i = [],
			r = [],
			a = [],
			o = 0,
			s = 0;
		if (!1 === Array.isArray(e)) l(e);
		else
			for (var c = 0; c < e.length; c++) l(e[c]), this.addGroup(o, s, c), o += s, s = 0;

		function l(e) {
			var o, c, l, h = i.length / 3,
				u = e.extractPoints(t),
				p = u.shape,
				d = u.holes;
			for (!1 === Va.isClockWise(p) && (p = p.reverse()), o = 0, c = d.length; o < c; o++) l = d[o], !0 === Va.isClockWise(l) && (d[o] = l.reverse());
			var f = Va.triangulateShape(p, d);
			for (o = 0, c = d.length; o < c; o++) l = d[o], p = p.concat(l);
			for (o = 0, c = p.length; o < c; o++) {
				var m = p[o];
				i.push(m.x, m.y, 0), r.push(0, 0, 1), a.push(m.x, m.y)
			}
			for (o = 0, c = f.length; o < c; o++) {
				var v = f[o],
					g = v[0] + h,
					y = v[1] + h,
					x = v[2] + h;
				n.push(g, y, x), s += 3
			}
		}
		this.setIndex(n), this.setAttribute("position", new $e(i, 3)), this.setAttribute("normal", new $e(r, 3)), this.setAttribute("uv", new $e(a, 2))
	}

	function oo(e, t) {
		if (t.shapes = [], Array.isArray(e))
			for (var n = 0, i = e.length; n < i; n++) {
				var r = e[n];
				t.shapes.push(r.uuid)
			} else t.shapes.push(e.uuid);
		return t
	}

	function so(e, t) {
		ht.call(this), this.type = "EdgesGeometry", this.parameters = {
			thresholdAngle: t
		}, t = void 0 !== t ? t : 1;
		var n, i, r, a, o = [],
			c = Math.cos(s.DEG2RAD * t),
			l = [0, 0],
			h = {},
			u = ["a", "b", "c"];
		e.isBufferGeometry ? (a = new Nt).fromBufferGeometry(e) : a = e.clone(), a.mergeVertices(), a.computeFaceNormals();
		for (var p = a.vertices, d = a.faces, f = 0, m = d.length; f < m; f++)
			for (var v = d[f], g = 0; g < 3; g++) n = v[u[g]], i = v[u[(g + 1) % 3]], l[0] = Math.min(n, i), l[1] = Math.max(n, i), void 0 === h[r = l[0] + "," + l[1]] ? h[r] = {
				index1: l[0],
				index2: l[1],
				face1: f,
				face2: void 0
			} : h[r].face2 = f;
		for (r in h) {
			var y = h[r];
			if (void 0 === y.face2 || d[y.face1].normal.dot(d[y.face2].normal) <= c) {
				var x = p[y.index1];
				o.push(x.x, x.y, x.z), x = p[y.index2], o.push(x.x, x.y, x.z)
			}
		}
		this.setAttribute("position", new $e(o, 3))
	}

	function co(e, t, n, i, r, a, o, s) {
		Nt.call(this), this.type = "CylinderGeometry", this.parameters = {
			radiusTop: e,
			radiusBottom: t,
			height: n,
			radialSegments: i,
			heightSegments: r,
			openEnded: a,
			thetaStart: o,
			thetaLength: s
		}, this.fromBufferGeometry(new lo(e, t, n, i, r, a, o, s)), this.mergeVertices()
	}

	function lo(e, t, n, i, r, a, o, s) {
		ht.call(this), this.type = "CylinderBufferGeometry", this.parameters = {
			radiusTop: e,
			radiusBottom: t,
			height: n,
			radialSegments: i,
			heightSegments: r,
			openEnded: a,
			thetaStart: o,
			thetaLength: s
		};
		var l = this;
		e = void 0 !== e ? e : 1, t = void 0 !== t ? t : 1, n = n || 1, i = Math.floor(i) || 8, r = Math.floor(r) || 1, a = void 0 !== a && a, o = void 0 !== o ? o : 0, s = void 0 !== s ? s : 2 * Math.PI;
		var h = [],
			u = [],
			p = [],
			d = [],
			f = 0,
			m = [],
			v = n / 2,
			g = 0;

		function y(n) {
			var r, a, m, y = new c,
				b = new x,
				w = 0,
				_ = !0 === n ? e : t,
				M = !0 === n ? 1 : -1;
			for (a = f, r = 1; r <= i; r++) u.push(0, v * M, 0), p.push(0, M, 0), d.push(.5, .5), f++;
			for (m = f, r = 0; r <= i; r++) {
				var S = r / i * s + o,
					T = Math.cos(S),
					E = Math.sin(S);
				b.x = _ * E, b.y = v * M, b.z = _ * T, u.push(b.x, b.y, b.z), p.push(0, M, 0), y.x = .5 * T + .5, y.y = .5 * E * M + .5, d.push(y.x, y.y), f++
			}
			for (r = 0; r < i; r++) {
				var A = a + r,
					L = m + r;
				!0 === n ? h.push(L, L + 1, A) : h.push(L + 1, L, A), w += 3
			}
			l.addGroup(g, w, !0 === n ? 1 : 2), g += w
		}! function () {
			var a, c, y = new x,
				b = new x,
				w = 0,
				_ = (t - e) / n;
			for (c = 0; c <= r; c++) {
				var M = [],
					S = c / r,
					T = S * (t - e) + e;
				for (a = 0; a <= i; a++) {
					var E = a / i,
						A = E * s + o,
						L = Math.sin(A),
						R = Math.cos(A);
					b.x = T * L, b.y = -S * n + v, b.z = T * R, u.push(b.x, b.y, b.z), y.set(L, _, R).normalize(), p.push(y.x, y.y, y.z), d.push(E, 1 - S), M.push(f++)
				}
				m.push(M)
			}
			for (a = 0; a < i; a++)
				for (c = 0; c < r; c++) {
					var P = m[c][a],
						C = m[c + 1][a],
						O = m[c + 1][a + 1],
						D = m[c][a + 1];
					h.push(P, C, D), h.push(C, O, D), w += 6
				}
			l.addGroup(g, w, 0), g += w
		}(), !1 === a && (e > 0 && y(!0), t > 0 && y(!1)), this.setIndex(h), this.setAttribute("position", new $e(u, 3)), this.setAttribute("normal", new $e(p, 3)), this.setAttribute("uv", new $e(d, 2))
	}

	function ho(e, t, n, i, r, a, o) {
		co.call(this, 0, e, t, n, i, r, a, o), this.type = "ConeGeometry", this.parameters = {
			radius: e,
			height: t,
			radialSegments: n,
			heightSegments: i,
			openEnded: r,
			thetaStart: a,
			thetaLength: o
		}
	}

	function uo(e, t, n, i, r, a, o) {
		lo.call(this, 0, e, t, n, i, r, a, o), this.type = "ConeBufferGeometry", this.parameters = {
			radius: e,
			height: t,
			radialSegments: n,
			heightSegments: i,
			openEnded: r,
			thetaStart: a,
			thetaLength: o
		}
	}

	function po(e, t, n, i) {
		Nt.call(this), this.type = "CircleGeometry", this.parameters = {
			radius: e,
			segments: t,
			thetaStart: n,
			thetaLength: i
		}, this.fromBufferGeometry(new fo(e, t, n, i)), this.mergeVertices()
	}

	function fo(e, t, n, i) {
		ht.call(this), this.type = "CircleBufferGeometry", this.parameters = {
			radius: e,
			segments: t,
			thetaStart: n,
			thetaLength: i
		}, e = e || 1, t = void 0 !== t ? Math.max(3, t) : 8, n = void 0 !== n ? n : 0, i = void 0 !== i ? i : 2 * Math.PI;
		var r, a, o = [],
			s = [],
			l = [],
			h = [],
			u = new x,
			p = new c;
		for (s.push(0, 0, 0), l.push(0, 0, 1), h.push(.5, .5), a = 0, r = 3; a <= t; a++, r += 3) {
			var d = n + a / t * i;
			u.x = e * Math.cos(d), u.y = e * Math.sin(d), s.push(u.x, u.y, u.z), l.push(0, 0, 1), p.x = (s[r] / e + 1) / 2, p.y = (s[r + 1] / e + 1) / 2, h.push(p.x, p.y)
		}
		for (r = 1; r <= t; r++) o.push(r, r + 1, 0);
		this.setIndex(o), this.setAttribute("position", new $e(s, 3)), this.setAttribute("normal", new $e(l, 3)), this.setAttribute("uv", new $e(h, 2))
	}
	Ja.prototype = Object.create(Nt.prototype), Ja.prototype.constructor = Ja, Ka.prototype = Object.create(Xa.prototype), Ka.prototype.constructor = Ka, Qa.prototype = Object.create(Nt.prototype), Qa.prototype.constructor = Qa, $a.prototype = Object.create(ht.prototype), $a.prototype.constructor = $a, eo.prototype = Object.create(Nt.prototype), eo.prototype.constructor = eo, to.prototype = Object.create(ht.prototype), to.prototype.constructor = to, no.prototype = Object.create(Nt.prototype), no.prototype.constructor = no, io.prototype = Object.create(ht.prototype), io.prototype.constructor = io, ro.prototype = Object.create(Nt.prototype), ro.prototype.constructor = ro, ro.prototype.toJSON = function () {
		var e = Nt.prototype.toJSON.call(this);
		return oo(this.parameters.shapes, e)
	}, ao.prototype = Object.create(ht.prototype), ao.prototype.constructor = ao, ao.prototype.toJSON = function () {
		var e = ht.prototype.toJSON.call(this);
		return oo(this.parameters.shapes, e)
	}, so.prototype = Object.create(ht.prototype), so.prototype.constructor = so, co.prototype = Object.create(Nt.prototype), co.prototype.constructor = co, lo.prototype = Object.create(ht.prototype), lo.prototype.constructor = lo, ho.prototype = Object.create(co.prototype), ho.prototype.constructor = ho, uo.prototype = Object.create(lo.prototype), uo.prototype.constructor = uo, po.prototype = Object.create(Nt.prototype), po.prototype.constructor = po, fo.prototype = Object.create(ht.prototype), fo.prototype.constructor = fo;
	var mo = Object.freeze({
		__proto__: null,
		WireframeGeometry: na,
		ParametricGeometry: ia,
		ParametricBufferGeometry: ra,
		TetrahedronGeometry: sa,
		TetrahedronBufferGeometry: ca,
		OctahedronGeometry: la,
		OctahedronBufferGeometry: ha,
		IcosahedronGeometry: ua,
		IcosahedronBufferGeometry: pa,
		DodecahedronGeometry: da,
		DodecahedronBufferGeometry: fa,
		PolyhedronGeometry: aa,
		PolyhedronBufferGeometry: oa,
		TubeGeometry: ma,
		TubeBufferGeometry: va,
		TorusKnotGeometry: ga,
		TorusKnotBufferGeometry: ya,
		TorusGeometry: xa,
		TorusBufferGeometry: ba,
		TextGeometry: Ja,
		TextBufferGeometry: Ka,
		SphereGeometry: Qa,
		SphereBufferGeometry: $a,
		RingGeometry: eo,
		RingBufferGeometry: to,
		PlaneGeometry: $t,
		PlaneBufferGeometry: en,
		LatheGeometry: no,
		LatheBufferGeometry: io,
		ShapeGeometry: ro,
		ShapeBufferGeometry: ao,
		ExtrudeGeometry: qa,
		ExtrudeBufferGeometry: Xa,
		EdgesGeometry: so,
		ConeGeometry: ho,
		ConeBufferGeometry: uo,
		CylinderGeometry: co,
		CylinderBufferGeometry: lo,
		CircleGeometry: po,
		CircleBufferGeometry: fo,
		BoxGeometry: Ut,
		BoxBufferGeometry: zt
	});

	function vo(e) {
		ke.call(this), this.type = "ShadowMaterial", this.color = new Ue(0), this.transparent = !0, this.setValues(e)
	}

	function go(e) {
		Gt.call(this, e), this.type = "RawShaderMaterial"
	}

	function yo(e) {
		ke.call(this), this.defines = {
			STANDARD: ""
		}, this.type = "MeshStandardMaterial", this.color = new Ue(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ue(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new c(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.vertexTangents = !1, this.setValues(e)
	}

	function xo(e) {
		yo.call(this), this.defines = {
			STANDARD: "",
			PHYSICAL: ""
		}, this.type = "MeshPhysicalMaterial", this.clearcoat = 0, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new c(1, 1), this.clearcoatNormalMap = null, this.reflectivity = .5, this.sheen = null, this.transparency = 0, this.setValues(e)
	}

	function bo(e) {
		ke.call(this), this.type = "MeshPhongMaterial", this.color = new Ue(16777215), this.specular = new Ue(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ue(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new c(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e)
	}

	function wo(e) {
		ke.call(this), this.defines = {
			TOON: ""
		}, this.type = "MeshToonMaterial", this.color = new Ue(16777215), this.specular = new Ue(1118481), this.shininess = 30, this.map = null, this.gradientMap = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ue(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new c(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e)
	}

	function _o(e) {
		ke.call(this), this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new c(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e)
	}

	function Mo(e) {
		ke.call(this), this.type = "MeshLambertMaterial", this.color = new Ue(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ue(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e)
	}

	function So(e) {
		ke.call(this), this.defines = {
			MATCAP: ""
		}, this.type = "MeshMatcapMaterial", this.color = new Ue(16777215), this.matcap = null, this.map = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new c(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e)
	}

	function To(e) {
		Ir.call(this), this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.setValues(e)
	}
	vo.prototype = Object.create(ke.prototype), vo.prototype.constructor = vo, vo.prototype.isShadowMaterial = !0, vo.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.color.copy(e.color), this
	}, go.prototype = Object.create(Gt.prototype), go.prototype.constructor = go, go.prototype.isRawShaderMaterial = !0, yo.prototype = Object.create(ke.prototype), yo.prototype.constructor = yo, yo.prototype.isMeshStandardMaterial = !0, yo.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.defines = {
			STANDARD: ""
		}, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapIntensity = e.envMapIntensity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this.vertexTangents = e.vertexTangents, this
	}, xo.prototype = Object.create(yo.prototype), xo.prototype.constructor = xo, xo.prototype.isMeshPhysicalMaterial = !0, xo.prototype.copy = function (e) {
		return yo.prototype.copy.call(this, e), this.defines = {
			STANDARD: "",
			PHYSICAL: ""
		}, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.reflectivity = e.reflectivity, e.sheen ? this.sheen = (this.sheen || new Ue).copy(e.sheen) : this.sheen = null, this.transparency = e.transparency, this
	}, bo.prototype = Object.create(ke.prototype), bo.prototype.constructor = bo, bo.prototype.isMeshPhongMaterial = !0, bo.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.color.copy(e.color), this.specular.copy(e.specular), this.shininess = e.shininess, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this
	}, wo.prototype = Object.create(ke.prototype), wo.prototype.constructor = wo, wo.prototype.isMeshToonMaterial = !0, wo.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.color.copy(e.color), this.specular.copy(e.specular), this.shininess = e.shininess, this.map = e.map, this.gradientMap = e.gradientMap, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this
	}, _o.prototype = Object.create(ke.prototype), _o.prototype.constructor = _o, _o.prototype.isMeshNormalMaterial = !0, _o.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this
	}, Mo.prototype = Object.create(ke.prototype), Mo.prototype.constructor = Mo, Mo.prototype.isMeshLambertMaterial = !0, Mo.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this
	}, So.prototype = Object.create(ke.prototype), So.prototype.constructor = So, So.prototype.isMeshMatcapMaterial = !0, So.prototype.copy = function (e) {
		return ke.prototype.copy.call(this, e), this.defines = {
			MATCAP: ""
		}, this.color.copy(e.color), this.matcap = e.matcap, this.map = e.map, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.alphaMap = e.alphaMap, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this
	}, To.prototype = Object.create(Ir.prototype), To.prototype.constructor = To, To.prototype.isLineDashedMaterial = !0, To.prototype.copy = function (e) {
		return Ir.prototype.copy.call(this, e), this.scale = e.scale, this.dashSize = e.dashSize, this.gapSize = e.gapSize, this
	};
	var Eo = Object.freeze({
			__proto__: null,
			ShadowMaterial: vo,
			SpriteMaterial: or,
			RawShaderMaterial: go,
			ShaderMaterial: Gt,
			PointsMaterial: Wr,
			MeshPhysicalMaterial: xo,
			MeshStandardMaterial: yo,
			MeshPhongMaterial: bo,
			MeshToonMaterial: wo,
			MeshNormalMaterial: _o,
			MeshLambertMaterial: Mo,
			MeshDepthMaterial: ji,
			MeshDistanceMaterial: Wi,
			MeshBasicMaterial: Ve,
			MeshMatcapMaterial: So,
			LineDashedMaterial: To,
			LineBasicMaterial: Ir,
			Material: ke
		}),
		Ao = {
			arraySlice: function (e, t, n) {
				return Ao.isTypedArray(e) ? new e.constructor(e.subarray(t, void 0 !== n ? n : e.length)) : e.slice(t, n)
			},
			convertArray: function (e, t, n) {
				return !e || !n && e.constructor === t ? e : "number" == typeof t.BYTES_PER_ELEMENT ? new t(e) : Array.prototype.slice.call(e)
			},
			isTypedArray: function (e) {
				return ArrayBuffer.isView(e) && !(e instanceof DataView)
			},
			getKeyframeOrder: function (e) {
				for (var t = e.length, n = new Array(t), i = 0; i !== t; ++i) n[i] = i;
				return n.sort((function (t, n) {
					return e[t] - e[n]
				})), n
			},
			sortedArray: function (e, t, n) {
				for (var i = e.length, r = new e.constructor(i), a = 0, o = 0; o !== i; ++a)
					for (var s = n[a] * t, c = 0; c !== t; ++c) r[o++] = e[s + c];
				return r
			},
			flattenJSON: function (e, t, n, i) {
				for (var r = 1, a = e[0]; void 0 !== a && void 0 === a[i];) a = e[r++];
				if (void 0 !== a) {
					var o = a[i];
					if (void 0 !== o)
						if (Array.isArray(o))
							do {
								void 0 !== (o = a[i]) && (t.push(a.time), n.push.apply(n, o)), a = e[r++]
							} while (void 0 !== a);
						else if (void 0 !== o.toArray)
						do {
							void 0 !== (o = a[i]) && (t.push(a.time), o.toArray(n, n.length)), a = e[r++]
						} while (void 0 !== a);
					else
						do {
							void 0 !== (o = a[i]) && (t.push(a.time), n.push(o)), a = e[r++]
						} while (void 0 !== a)
				}
			},
			subclip: function (e, t, n, i, r) {
				r = r || 30;
				var a = e.clone();
				a.name = t;
				for (var o = [], s = 0; s < a.tracks.length; ++s) {
					for (var c = a.tracks[s], l = c.getValueSize(), h = [], u = [], p = 0; p < c.times.length; ++p) {
						var d = c.times[p] * r;
						if (!(d < n || d >= i)) {
							h.push(c.times[p]);
							for (var f = 0; f < l; ++f) u.push(c.values[p * l + f])
						}
					}
					0 !== h.length && (c.times = Ao.convertArray(h, c.times.constructor), c.values = Ao.convertArray(u, c.values.constructor), o.push(c))
				}
				a.tracks = o;
				var m = 1 / 0;
				for (s = 0; s < a.tracks.length; ++s) m > a.tracks[s].times[0] && (m = a.tracks[s].times[0]);
				for (s = 0; s < a.tracks.length; ++s) a.tracks[s].shift(-1 * m);
				return a.resetDuration(), a
			}
		};

	function Lo(e, t, n, i) {
		this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = void 0 !== i ? i : new t.constructor(n), this.sampleValues = t, this.valueSize = n
	}

	function Ro(e, t, n, i) {
		Lo.call(this, e, t, n, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0
	}

	function Po(e, t, n, i) {
		Lo.call(this, e, t, n, i)
	}

	function Co(e, t, n, i) {
		Lo.call(this, e, t, n, i)
	}

	function Oo(e, t, n, i) {
		if (void 0 === e) throw new Error("THREE.KeyframeTrack: track name is undefined");
		if (void 0 === t || 0 === t.length) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
		this.name = e, this.times = Ao.convertArray(t, this.TimeBufferType), this.values = Ao.convertArray(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation)
	}

	function Do(e, t, n) {
		Oo.call(this, e, t, n)
	}

	function Io(e, t, n, i) {
		Oo.call(this, e, t, n, i)
	}

	function No(e, t, n, i) {
		Oo.call(this, e, t, n, i)
	}

	function Uo(e, t, n, i) {
		Lo.call(this, e, t, n, i)
	}

	function zo(e, t, n, i) {
		Oo.call(this, e, t, n, i)
	}

	function Fo(e, t, n, i) {
		Oo.call(this, e, t, n, i)
	}

	function Bo(e, t, n, i) {
		Oo.call(this, e, t, n, i)
	}

	function Ho(e, t, n) {
		this.name = e, this.tracks = n, this.duration = void 0 !== t ? t : -1, this.uuid = s.generateUUID(), this.duration < 0 && this.resetDuration()
	}

	function Go(e) {
		if (void 0 === e.type) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
		var t = function (e) {
			switch (e.toLowerCase()) {
				case "scalar":
				case "double":
				case "float":
				case "number":
				case "integer":
					return No;
				case "vector":
				case "vector2":
				case "vector3":
				case "vector4":
					return Bo;
				case "color":
					return Io;
				case "quaternion":
					return zo;
				case "bool":
				case "boolean":
					return Do;
				case "string":
					return Fo
			}
			throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + e)
		}(e.type);
		if (void 0 === e.times) {
			var n = [],
				i = [];
			Ao.flattenJSON(e.keys, n, i, "value"), e.times = n, e.values = i
		}
		return void 0 !== t.parse ? t.parse(e) : new t(e.name, e.times, e.values, e.interpolation)
	}
	Object.assign(Lo.prototype, {
		evaluate: function (e) {
			var t = this.parameterPositions,
				n = this._cachedIndex,
				i = t[n],
				r = t[n - 1];
			e: {
				t: {
					var a;n: {
						i: if (!(e < i)) {
							for (var o = n + 2;;) {
								if (void 0 === i) {
									if (e < r) break i;
									return n = t.length, this._cachedIndex = n, this.afterEnd_(n - 1, e, r)
								}
								if (n === o) break;
								if (r = i, e < (i = t[++n])) break t
							}
							a = t.length;
							break n
						}if (e >= r) break e;
						var s = t[1];e < s && (n = 2, r = s);
						for (o = n - 2;;) {
							if (void 0 === r) return this._cachedIndex = 0, this.beforeStart_(0, e, i);
							if (n === o) break;
							if (i = r, e >= (r = t[--n - 1])) break t
						}
						a = n,
						n = 0
					}
					for (; n < a;) {
						var c = n + a >>> 1;
						e < t[c] ? a = c : n = c + 1
					}
					if (i = t[n], void 0 === (r = t[n - 1])) return this._cachedIndex = 0, this.beforeStart_(0, e, i);
					if (void 0 === i) return n = t.length, this._cachedIndex = n, this.afterEnd_(n - 1, r, e)
				}
				this._cachedIndex = n,
				this.intervalChanged_(n, r, i)
			}
			return this.interpolate_(n, r, e, i)
		},
		settings: null,
		DefaultSettings_: {},
		getSettings_: function () {
			return this.settings || this.DefaultSettings_
		},
		copySampleValue_: function (e) {
			for (var t = this.resultBuffer, n = this.sampleValues, i = this.valueSize, r = e * i, a = 0; a !== i; ++a) t[a] = n[r + a];
			return t
		},
		interpolate_: function () {
			throw new Error("call to abstract method")
		},
		intervalChanged_: function () {}
	}), Object.assign(Lo.prototype, {
		beforeStart_: Lo.prototype.copySampleValue_,
		afterEnd_: Lo.prototype.copySampleValue_
	}), Ro.prototype = Object.assign(Object.create(Lo.prototype), {
		constructor: Ro,
		DefaultSettings_: {
			endingStart: 2400,
			endingEnd: 2400
		},
		intervalChanged_: function (e, t, n) {
			var i = this.parameterPositions,
				r = e - 2,
				a = e + 1,
				o = i[r],
				s = i[a];
			if (void 0 === o) switch (this.getSettings_().endingStart) {
				case 2401:
					r = e, o = 2 * t - n;
					break;
				case 2402:
					o = t + i[r = i.length - 2] - i[r + 1];
					break;
				default:
					r = e, o = n
			}
			if (void 0 === s) switch (this.getSettings_().endingEnd) {
				case 2401:
					a = e, s = 2 * n - t;
					break;
				case 2402:
					a = 1, s = n + i[1] - i[0];
					break;
				default:
					a = e - 1, s = t
			}
			var c = .5 * (n - t),
				l = this.valueSize;
			this._weightPrev = c / (t - o), this._weightNext = c / (s - n), this._offsetPrev = r * l, this._offsetNext = a * l
		},
		interpolate_: function (e, t, n, i) {
			for (var r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this._offsetPrev, h = this._offsetNext, u = this._weightPrev, p = this._weightNext, d = (n - t) / (i - t), f = d * d, m = f * d, v = -u * m + 2 * u * f - u * d, g = (1 + u) * m + (-1.5 - 2 * u) * f + (-.5 + u) * d + 1, y = (-1 - p) * m + (1.5 + p) * f + .5 * d, x = p * m - p * f, b = 0; b !== o; ++b) r[b] = v * a[l + b] + g * a[c + b] + y * a[s + b] + x * a[h + b];
			return r
		}
	}), Po.prototype = Object.assign(Object.create(Lo.prototype), {
		constructor: Po,
		interpolate_: function (e, t, n, i) {
			for (var r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = (n - t) / (i - t), h = 1 - l, u = 0; u !== o; ++u) r[u] = a[c + u] * h + a[s + u] * l;
			return r
		}
	}), Co.prototype = Object.assign(Object.create(Lo.prototype), {
		constructor: Co,
		interpolate_: function (e) {
			return this.copySampleValue_(e - 1)
		}
	}), Object.assign(Oo, {
		toJSON: function (e) {
			var t, n = e.constructor;
			if (void 0 !== n.toJSON) t = n.toJSON(e);
			else {
				t = {
					name: e.name,
					times: Ao.convertArray(e.times, Array),
					values: Ao.convertArray(e.values, Array)
				};
				var i = e.getInterpolation();
				i !== e.DefaultInterpolation && (t.interpolation = i)
			}
			return t.type = e.ValueTypeName, t
		}
	}), Object.assign(Oo.prototype, {
		constructor: Oo,
		TimeBufferType: Float32Array,
		ValueBufferType: Float32Array,
		DefaultInterpolation: 2301,
		InterpolantFactoryMethodDiscrete: function (e) {
			return new Co(this.times, this.values, this.getValueSize(), e)
		},
		InterpolantFactoryMethodLinear: function (e) {
			return new Po(this.times, this.values, this.getValueSize(), e)
		},
		InterpolantFactoryMethodSmooth: function (e) {
			return new Ro(this.times, this.values, this.getValueSize(), e)
		},
		setInterpolation: function (e) {
			var t;
			switch (e) {
				case 2300:
					t = this.InterpolantFactoryMethodDiscrete;
					break;
				case 2301:
					t = this.InterpolantFactoryMethodLinear;
					break;
				case 2302:
					t = this.InterpolantFactoryMethodSmooth
			}
			if (void 0 === t) {
				var n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
				if (void 0 === this.createInterpolant) {
					if (e === this.DefaultInterpolation) throw new Error(n);
					this.setInterpolation(this.DefaultInterpolation)
				}
				return console.warn("THREE.KeyframeTrack:", n), this
			}
			return this.createInterpolant = t, this
		},
		getInterpolation: function () {
			switch (this.createInterpolant) {
				case this.InterpolantFactoryMethodDiscrete:
					return 2300;
				case this.InterpolantFactoryMethodLinear:
					return 2301;
				case this.InterpolantFactoryMethodSmooth:
					return 2302
			}
		},
		getValueSize: function () {
			return this.values.length / this.times.length
		},
		shift: function (e) {
			if (0 !== e)
				for (var t = this.times, n = 0, i = t.length; n !== i; ++n) t[n] += e;
			return this
		},
		scale: function (e) {
			if (1 !== e)
				for (var t = this.times, n = 0, i = t.length; n !== i; ++n) t[n] *= e;
			return this
		},
		trim: function (e, t) {
			for (var n = this.times, i = n.length, r = 0, a = i - 1; r !== i && n[r] < e;) ++r;
			for (; - 1 !== a && n[a] > t;) --a;
			if (++a, 0 !== r || a !== i) {
				r >= a && (r = (a = Math.max(a, 1)) - 1);
				var o = this.getValueSize();
				this.times = Ao.arraySlice(n, r, a), this.values = Ao.arraySlice(this.values, r * o, a * o)
			}
			return this
		},
		validate: function () {
			var e = !0,
				t = this.getValueSize();
			t - Math.floor(t) != 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), e = !1);
			var n = this.times,
				i = this.values,
				r = n.length;
			0 === r && (console.error("THREE.KeyframeTrack: Track is empty.", this), e = !1);
			for (var a = null, o = 0; o !== r; o++) {
				var s = n[o];
				if ("number" == typeof s && isNaN(s)) {
					console.error("THREE.KeyframeTrack: Time is not a valid number.", this, o, s), e = !1;
					break
				}
				if (null !== a && a > s) {
					console.error("THREE.KeyframeTrack: Out of order keys.", this, o, s, a), e = !1;
					break
				}
				a = s
			}
			if (void 0 !== i && Ao.isTypedArray(i)) {
				o = 0;
				for (var c = i.length; o !== c; ++o) {
					var l = i[o];
					if (isNaN(l)) {
						console.error("THREE.KeyframeTrack: Value is not a valid number.", this, o, l), e = !1;
						break
					}
				}
			}
			return e
		},
		optimize: function () {
			for (var e = Ao.arraySlice(this.times), t = Ao.arraySlice(this.values), n = this.getValueSize(), i = 2302 === this.getInterpolation(), r = 1, a = e.length - 1, o = 1; o < a; ++o) {
				var s = !1,
					c = e[o];
				if (c !== e[o + 1] && (1 !== o || c !== c[0]))
					if (i) s = !0;
					else
						for (var l = o * n, h = l - n, u = l + n, p = 0; p !== n; ++p) {
							var d = t[l + p];
							if (d !== t[h + p] || d !== t[u + p]) {
								s = !0;
								break
							}
						}
				if (s) {
					if (o !== r) {
						e[r] = e[o];
						var f = o * n,
							m = r * n;
						for (p = 0; p !== n; ++p) t[m + p] = t[f + p]
					}++r
				}
			}
			if (a > 0) {
				e[r] = e[a];
				for (f = a * n, m = r * n, p = 0; p !== n; ++p) t[m + p] = t[f + p];
				++r
			}
			return r !== e.length ? (this.times = Ao.arraySlice(e, 0, r), this.values = Ao.arraySlice(t, 0, r * n)) : (this.times = e, this.values = t), this
		},
		clone: function () {
			var e = Ao.arraySlice(this.times, 0),
				t = Ao.arraySlice(this.values, 0),
				n = new(0, this.constructor)(this.name, e, t);
			return n.createInterpolant = this.createInterpolant, n
		}
	}), Do.prototype = Object.assign(Object.create(Oo.prototype), {
		constructor: Do,
		ValueTypeName: "bool",
		ValueBufferType: Array,
		DefaultInterpolation: 2300,
		InterpolantFactoryMethodLinear: void 0,
		InterpolantFactoryMethodSmooth: void 0
	}), Io.prototype = Object.assign(Object.create(Oo.prototype), {
		constructor: Io,
		ValueTypeName: "color"
	}), No.prototype = Object.assign(Object.create(Oo.prototype), {
		constructor: No,
		ValueTypeName: "number"
	}), Uo.prototype = Object.assign(Object.create(Lo.prototype), {
		constructor: Uo,
		interpolate_: function (e, t, n, i) {
			for (var r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = (n - t) / (i - t), l = s + o; s !== l; s += 4) v.slerpFlat(r, 0, a, s - o, a, s, c);
			return r
		}
	}), zo.prototype = Object.assign(Object.create(Oo.prototype), {
		constructor: zo,
		ValueTypeName: "quaternion",
		DefaultInterpolation: 2301,
		InterpolantFactoryMethodLinear: function (e) {
			return new Uo(this.times, this.values, this.getValueSize(), e)
		},
		InterpolantFactoryMethodSmooth: void 0
	}), Fo.prototype = Object.assign(Object.create(Oo.prototype), {
		constructor: Fo,
		ValueTypeName: "string",
		ValueBufferType: Array,
		DefaultInterpolation: 2300,
		InterpolantFactoryMethodLinear: void 0,
		InterpolantFactoryMethodSmooth: void 0
	}), Bo.prototype = Object.assign(Object.create(Oo.prototype), {
		constructor: Bo,
		ValueTypeName: "vector"
	}), Object.assign(Ho, {
		parse: function (e) {
			for (var t = [], n = e.tracks, i = 1 / (e.fps || 1), r = 0, a = n.length; r !== a; ++r) t.push(Go(n[r]).scale(i));
			return new Ho(e.name, e.duration, t)
		},
		toJSON: function (e) {
			for (var t = [], n = e.tracks, i = {
					name: e.name,
					duration: e.duration,
					tracks: t,
					uuid: e.uuid
				}, r = 0, a = n.length; r !== a; ++r) t.push(Oo.toJSON(n[r]));
			return i
		},
		CreateFromMorphTargetSequence: function (e, t, n, i) {
			for (var r = t.length, a = [], o = 0; o < r; o++) {
				var s = [],
					c = [];
				s.push((o + r - 1) % r, o, (o + 1) % r), c.push(0, 1, 0);
				var l = Ao.getKeyframeOrder(s);
				s = Ao.sortedArray(s, 1, l), c = Ao.sortedArray(c, 1, l), i || 0 !== s[0] || (s.push(r), c.push(c[0])), a.push(new No(".morphTargetInfluences[" + t[o].name + "]", s, c).scale(1 / n))
			}
			return new Ho(e, -1, a)
		},
		findByName: function (e, t) {
			var n = e;
			if (!Array.isArray(e)) {
				var i = e;
				n = i.geometry && i.geometry.animations || i.animations
			}
			for (var r = 0; r < n.length; r++)
				if (n[r].name === t) return n[r];
			return null
		},
		CreateClipsFromMorphTargetSequences: function (e, t, n) {
			for (var i = {}, r = /^([\w-]*?)([\d]+)$/, a = 0, o = e.length; a < o; a++) {
				var s = e[a],
					c = s.name.match(r);
				if (c && c.length > 1) {
					var l = i[u = c[1]];
					l || (i[u] = l = []), l.push(s)
				}
			}
			var h = [];
			for (var u in i) h.push(Ho.CreateFromMorphTargetSequence(u, i[u], t, n));
			return h
		},
		parseAnimation: function (e, t) {
			if (!e) return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
			for (var n = function (e, t, n, i, r) {
					if (0 !== n.length) {
						var a = [],
							o = [];
						Ao.flattenJSON(n, a, o, i), 0 !== a.length && r.push(new e(t, a, o))
					}
				}, i = [], r = e.name || "default", a = e.length || -1, o = e.fps || 30, s = e.hierarchy || [], c = 0; c < s.length; c++) {
				var l = s[c].keys;
				if (l && 0 !== l.length)
					if (l[0].morphTargets) {
						for (var h = {}, u = 0; u < l.length; u++)
							if (l[u].morphTargets)
								for (var p = 0; p < l[u].morphTargets.length; p++) h[l[u].morphTargets[p]] = -1;
						for (var d in h) {
							var f = [],
								m = [];
							for (p = 0; p !== l[u].morphTargets.length; ++p) {
								var v = l[u];
								f.push(v.time), m.push(v.morphTarget === d ? 1 : 0)
							}
							i.push(new No(".morphTargetInfluence[" + d + "]", f, m))
						}
						a = h.length * (o || 1)
					} else {
						var g = ".bones[" + t[c].name + "]";
						n(Bo, g + ".position", l, "pos", i), n(zo, g + ".quaternion", l, "rot", i), n(Bo, g + ".scale", l, "scl", i)
					}
			}
			return 0 === i.length ? null : new Ho(r, a, i)
		}
	}), Object.assign(Ho.prototype, {
		resetDuration: function () {
			for (var e = 0, t = 0, n = this.tracks.length; t !== n; ++t) {
				var i = this.tracks[t];
				e = Math.max(e, i.times[i.times.length - 1])
			}
			return this.duration = e, this
		},
		trim: function () {
			for (var e = 0; e < this.tracks.length; e++) this.tracks[e].trim(0, this.duration);
			return this
		},
		validate: function () {
			for (var e = !0, t = 0; t < this.tracks.length; t++) e = e && this.tracks[t].validate();
			return e
		},
		optimize: function () {
			for (var e = 0; e < this.tracks.length; e++) this.tracks[e].optimize();
			return this
		},
		clone: function () {
			for (var e = [], t = 0; t < this.tracks.length; t++) e.push(this.tracks[t].clone());
			return new Ho(this.name, this.duration, e)
		}
	});
	var ko = {
		enabled: !1,
		files: {},
		add: function (e, t) {
			!1 !== this.enabled && (this.files[e] = t)
		},
		get: function (e) {
			if (!1 !== this.enabled) return this.files[e]
		},
		remove: function (e) {
			delete this.files[e]
		},
		clear: function () {
			this.files = {}
		}
	};

	function Vo(e, t, n) {
		var i = this,
			r = !1,
			a = 0,
			o = 0,
			s = void 0,
			c = [];
		this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this.itemStart = function (e) {
			o++, !1 === r && void 0 !== i.onStart && i.onStart(e, a, o), r = !0
		}, this.itemEnd = function (e) {
			a++, void 0 !== i.onProgress && i.onProgress(e, a, o), a === o && (r = !1, void 0 !== i.onLoad && i.onLoad())
		}, this.itemError = function (e) {
			void 0 !== i.onError && i.onError(e)
		}, this.resolveURL = function (e) {
			return s ? s(e) : e
		}, this.setURLModifier = function (e) {
			return s = e, this
		}, this.addHandler = function (e, t) {
			return c.push(e, t), this
		}, this.removeHandler = function (e) {
			var t = c.indexOf(e);
			return -1 !== t && c.splice(t, 2), this
		}, this.getHandler = function (e) {
			for (var t = 0, n = c.length; t < n; t += 2) {
				var i = c[t],
					r = c[t + 1];
				if (i.global && (i.lastIndex = 0), i.test(e)) return r
			}
			return null
		}
	}
	var jo = new Vo;

	function Wo(e) {
		this.manager = void 0 !== e ? e : jo, this.crossOrigin = "anonymous", this.path = "", this.resourcePath = ""
	}
	Object.assign(Wo.prototype, {
		load: function () {},
		parse: function () {},
		setCrossOrigin: function (e) {
			return this.crossOrigin = e, this
		},
		setPath: function (e) {
			return this.path = e, this
		},
		setResourcePath: function (e) {
			return this.resourcePath = e, this
		}
	});
	var qo = {};

	function Xo(e) {
		Wo.call(this, e)
	}

	function Yo(e) {
		Wo.call(this, e)
	}

	function Zo(e) {
		Wo.call(this, e)
	}

	function Jo(e) {
		Wo.call(this, e)
	}

	function Ko(e) {
		Wo.call(this, e)
	}

	function Qo(e) {
		Wo.call(this, e)
	}

	function $o(e) {
		Wo.call(this, e)
	}

	function es() {
		this.type = "Curve", this.arcLengthDivisions = 200
	}

	function ts(e, t, n, i, r, a, o, s) {
		es.call(this), this.type = "EllipseCurve", this.aX = e || 0, this.aY = t || 0, this.xRadius = n || 1, this.yRadius = i || 1, this.aStartAngle = r || 0, this.aEndAngle = a || 2 * Math.PI, this.aClockwise = o || !1, this.aRotation = s || 0
	}

	function ns(e, t, n, i, r, a) {
		ts.call(this, e, t, n, n, i, r, a), this.type = "ArcCurve"
	}

	function is() {
		var e = 0,
			t = 0,
			n = 0,
			i = 0;

		function r(r, a, o, s) {
			e = r, t = o, n = -3 * r + 3 * a - 2 * o - s, i = 2 * r - 2 * a + o + s
		}
		return {
			initCatmullRom: function (e, t, n, i, a) {
				r(t, n, a * (n - e), a * (i - t))
			},
			initNonuniformCatmullRom: function (e, t, n, i, a, o, s) {
				var c = (t - e) / a - (n - e) / (a + o) + (n - t) / o,
					l = (n - t) / o - (i - t) / (o + s) + (i - n) / s;
				r(t, n, c *= o, l *= o)
			},
			calc: function (r) {
				var a = r * r;
				return e + t * r + n * a + i * (a * r)
			}
		}
	}
	Xo.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: Xo,
		load: function (e, t, n, i) {
			void 0 === e && (e = ""), void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
			var r = this,
				a = ko.get(e);
			if (void 0 !== a) return r.manager.itemStart(e), setTimeout((function () {
				t && t(a), r.manager.itemEnd(e)
			}), 0), a;
			if (void 0 === qo[e]) {
				var o = e.match(/^data:(.*?)(;base64)?,(.*)$/);
				if (o) {
					var s = o[1],
						c = !!o[2],
						l = o[3];
					l = decodeURIComponent(l), c && (l = atob(l));
					try {
						var h, u = (this.responseType || "").toLowerCase();
						switch (u) {
							case "arraybuffer":
							case "blob":
								for (var p = new Uint8Array(l.length), d = 0; d < l.length; d++) p[d] = l.charCodeAt(d);
								h = "blob" === u ? new Blob([p.buffer], {
									type: s
								}) : p.buffer;
								break;
							case "document":
								var f = new DOMParser;
								h = f.parseFromString(l, s);
								break;
							case "json":
								h = JSON.parse(l);
								break;
							default:
								h = l
						}
						setTimeout((function () {
							t && t(h), r.manager.itemEnd(e)
						}), 0)
					} catch (t) {
						setTimeout((function () {
							i && i(t), r.manager.itemError(e), r.manager.itemEnd(e)
						}), 0)
					}
				} else {
					qo[e] = [], qo[e].push({
						onLoad: t,
						onProgress: n,
						onError: i
					});
					var m = new XMLHttpRequest;
					for (var v in m.open("GET", e, !0), m.addEventListener("load", (function (t) {
							var n = this.response,
								i = qo[e];
							if (delete qo[e], 200 === this.status || 0 === this.status) {
								0 === this.status && console.warn("THREE.FileLoader: HTTP Status 0 received."), ko.add(e, n);
								for (var a = 0, o = i.length; a < o; a++) {
									(s = i[a]).onLoad && s.onLoad(n)
								}
								r.manager.itemEnd(e)
							} else {
								for (a = 0, o = i.length; a < o; a++) {
									var s;
									(s = i[a]).onError && s.onError(t)
								}
								r.manager.itemError(e), r.manager.itemEnd(e)
							}
						}), !1), m.addEventListener("progress", (function (t) {
							for (var n = qo[e], i = 0, r = n.length; i < r; i++) {
								var a = n[i];
								a.onProgress && a.onProgress(t)
							}
						}), !1), m.addEventListener("error", (function (t) {
							var n = qo[e];
							delete qo[e];
							for (var i = 0, a = n.length; i < a; i++) {
								var o = n[i];
								o.onError && o.onError(t)
							}
							r.manager.itemError(e), r.manager.itemEnd(e)
						}), !1), m.addEventListener("abort", (function (t) {
							var n = qo[e];
							delete qo[e];
							for (var i = 0, a = n.length; i < a; i++) {
								var o = n[i];
								o.onError && o.onError(t)
							}
							r.manager.itemError(e), r.manager.itemEnd(e)
						}), !1), void 0 !== this.responseType && (m.responseType = this.responseType), void 0 !== this.withCredentials && (m.withCredentials = this.withCredentials), m.overrideMimeType && m.overrideMimeType(void 0 !== this.mimeType ? this.mimeType : "text/plain"), this.requestHeader) m.setRequestHeader(v, this.requestHeader[v]);
					m.send(null)
				}
				return r.manager.itemStart(e), m
			}
			qo[e].push({
				onLoad: t,
				onProgress: n,
				onError: i
			})
		},
		setResponseType: function (e) {
			return this.responseType = e, this
		},
		setWithCredentials: function (e) {
			return this.withCredentials = e, this
		},
		setMimeType: function (e) {
			return this.mimeType = e, this
		},
		setRequestHeader: function (e) {
			return this.requestHeader = e, this
		}
	}), Yo.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: Yo,
		load: function (e, t, n, i) {
			var r = this,
				a = new Xo(r.manager);
			a.setPath(r.path), a.load(e, (function (e) {
				t(r.parse(JSON.parse(e)))
			}), n, i)
		},
		parse: function (e) {
			for (var t = [], n = 0; n < e.length; n++) {
				var i = Ho.parse(e[n]);
				t.push(i)
			}
			return t
		}
	}), Zo.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: Zo,
		load: function (e, t, n, i) {
			var r = this,
				a = [],
				o = new $r;
			o.image = a;
			var s = new Xo(this.manager);

			function c(c) {
				s.load(e[c], (function (e) {
					var n = r.parse(e, !0);
					a[c] = {
						width: n.width,
						height: n.height,
						format: n.format,
						mipmaps: n.mipmaps
					}, 6 === (l += 1) && (1 === n.mipmapCount && (o.minFilter = 1006), o.format = n.format, o.needsUpdate = !0, t && t(o))
				}), n, i)
			}
			if (s.setPath(this.path), s.setResponseType("arraybuffer"), Array.isArray(e))
				for (var l = 0, h = 0, u = e.length; h < u; ++h) c(h);
			else s.load(e, (function (e) {
				var n = r.parse(e, !0);
				if (n.isCubemap)
					for (var i = n.mipmaps.length / n.mipmapCount, s = 0; s < i; s++) {
						a[s] = {
							mipmaps: []
						};
						for (var c = 0; c < n.mipmapCount; c++) a[s].mipmaps.push(n.mipmaps[s * n.mipmapCount + c]), a[s].format = n.format, a[s].width = n.width, a[s].height = n.height
					} else o.image.width = n.width, o.image.height = n.height, o.mipmaps = n.mipmaps;
				1 === n.mipmapCount && (o.minFilter = 1006), o.format = n.format, o.needsUpdate = !0, t && t(o)
			}), n, i);
			return o
		}
	}), Jo.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: Jo,
		load: function (e, t, n, i) {
			var r = this,
				a = new qt,
				o = new Xo(this.manager);
			return o.setResponseType("arraybuffer"), o.setPath(this.path), o.load(e, (function (e) {
				var n = r.parse(e);
				n && (void 0 !== n.image ? a.image = n.image : void 0 !== n.data && (a.image.width = n.width, a.image.height = n.height, a.image.data = n.data), a.wrapS = void 0 !== n.wrapS ? n.wrapS : 1001, a.wrapT = void 0 !== n.wrapT ? n.wrapT : 1001, a.magFilter = void 0 !== n.magFilter ? n.magFilter : 1006, a.minFilter = void 0 !== n.minFilter ? n.minFilter : 1006, a.anisotropy = void 0 !== n.anisotropy ? n.anisotropy : 1, void 0 !== n.format && (a.format = n.format), void 0 !== n.type && (a.type = n.type), void 0 !== n.mipmaps && (a.mipmaps = n.mipmaps, a.minFilter = 1008), 1 === n.mipmapCount && (a.minFilter = 1006), a.needsUpdate = !0, t && t(a, n))
			}), n, i), a
		}
	}), Ko.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: Ko,
		load: function (e, t, n, i) {
			void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
			var r = this,
				a = ko.get(e);
			if (void 0 !== a) return r.manager.itemStart(e), setTimeout((function () {
				t && t(a), r.manager.itemEnd(e)
			}), 0), a;
			var o = document.createElementNS("http://www.w3.org/1999/xhtml", "img");

			function s() {
				o.removeEventListener("load", s, !1), o.removeEventListener("error", c, !1), ko.add(e, this), t && t(this), r.manager.itemEnd(e)
			}

			function c(t) {
				o.removeEventListener("load", s, !1), o.removeEventListener("error", c, !1), i && i(t), r.manager.itemError(e), r.manager.itemEnd(e)
			}
			return o.addEventListener("load", s, !1), o.addEventListener("error", c, !1), "data:" !== e.substr(0, 5) && void 0 !== this.crossOrigin && (o.crossOrigin = this.crossOrigin), r.manager.itemStart(e), o.src = e, o
		}
	}), Qo.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: Qo,
		load: function (e, t, n, i) {
			var r = new mn,
				a = new Ko(this.manager);
			a.setCrossOrigin(this.crossOrigin), a.setPath(this.path);
			var o = 0;

			function s(n) {
				a.load(e[n], (function (e) {
					r.images[n] = e, 6 === ++o && (r.needsUpdate = !0, t && t(r))
				}), void 0, i)
			}
			for (var c = 0; c < e.length; ++c) s(c);
			return r
		}
	}), $o.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: $o,
		load: function (e, t, n, i) {
			var r = new p,
				a = new Ko(this.manager);
			return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, (function (n) {
				r.image = n;
				var i = e.search(/\.jpe?g($|\?)/i) > 0 || 0 === e.search(/^data\:image\/jpeg/);
				r.format = i ? 1022 : 1023, r.needsUpdate = !0, void 0 !== t && t(r)
			}), n, i), r
		}
	}), Object.assign(es.prototype, {
		getPoint: function () {
			return console.warn("THREE.Curve: .getPoint() not implemented."), null
		},
		getPointAt: function (e, t) {
			var n = this.getUtoTmapping(e);
			return this.getPoint(n, t)
		},
		getPoints: function (e) {
			void 0 === e && (e = 5);
			for (var t = [], n = 0; n <= e; n++) t.push(this.getPoint(n / e));
			return t
		},
		getSpacedPoints: function (e) {
			void 0 === e && (e = 5);
			for (var t = [], n = 0; n <= e; n++) t.push(this.getPointAt(n / e));
			return t
		},
		getLength: function () {
			var e = this.getLengths();
			return e[e.length - 1]
		},
		getLengths: function (e) {
			if (void 0 === e && (e = this.arcLengthDivisions), this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate) return this.cacheArcLengths;
			this.needsUpdate = !1;
			var t, n, i = [],
				r = this.getPoint(0),
				a = 0;
			for (i.push(0), n = 1; n <= e; n++) a += (t = this.getPoint(n / e)).distanceTo(r), i.push(a), r = t;
			return this.cacheArcLengths = i, i
		},
		updateArcLengths: function () {
			this.needsUpdate = !0, this.getLengths()
		},
		getUtoTmapping: function (e, t) {
			var n, i = this.getLengths(),
				r = 0,
				a = i.length;
			n = t || e * i[a - 1];
			for (var o, s = 0, c = a - 1; s <= c;)
				if ((o = i[r = Math.floor(s + (c - s) / 2)] - n) < 0) s = r + 1;
				else {
					if (!(o > 0)) {
						c = r;
						break
					}
					c = r - 1
				}
			if (i[r = c] === n) return r / (a - 1);
			var l = i[r];
			return (r + (n - l) / (i[r + 1] - l)) / (a - 1)
		},
		getTangent: function (e) {
			var t = e - 1e-4,
				n = e + 1e-4;
			t < 0 && (t = 0), n > 1 && (n = 1);
			var i = this.getPoint(t);
			return this.getPoint(n).clone().sub(i).normalize()
		},
		getTangentAt: function (e) {
			var t = this.getUtoTmapping(e);
			return this.getTangent(t)
		},
		computeFrenetFrames: function (e, t) {
			var n, i, r, a = new x,
				o = [],
				c = [],
				l = [],
				h = new x,
				u = new A;
			for (n = 0; n <= e; n++) i = n / e, o[n] = this.getTangentAt(i), o[n].normalize();
			c[0] = new x, l[0] = new x;
			var p = Number.MAX_VALUE,
				d = Math.abs(o[0].x),
				f = Math.abs(o[0].y),
				m = Math.abs(o[0].z);
			for (d <= p && (p = d, a.set(1, 0, 0)), f <= p && (p = f, a.set(0, 1, 0)), m <= p && a.set(0, 0, 1), h.crossVectors(o[0], a).normalize(), c[0].crossVectors(o[0], h), l[0].crossVectors(o[0], c[0]), n = 1; n <= e; n++) c[n] = c[n - 1].clone(), l[n] = l[n - 1].clone(), h.crossVectors(o[n - 1], o[n]), h.length() > Number.EPSILON && (h.normalize(), r = Math.acos(s.clamp(o[n - 1].dot(o[n]), -1, 1)), c[n].applyMatrix4(u.makeRotationAxis(h, r))), l[n].crossVectors(o[n], c[n]);
			if (!0 === t)
				for (r = Math.acos(s.clamp(c[0].dot(c[e]), -1, 1)), r /= e, o[0].dot(h.crossVectors(c[0], c[e])) > 0 && (r = -r), n = 1; n <= e; n++) c[n].applyMatrix4(u.makeRotationAxis(o[n], r * n)), l[n].crossVectors(o[n], c[n]);
			return {
				tangents: o,
				normals: c,
				binormals: l
			}
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.arcLengthDivisions = e.arcLengthDivisions, this
		},
		toJSON: function () {
			var e = {
				metadata: {
					version: 4.5,
					type: "Curve",
					generator: "Curve.toJSON"
				}
			};
			return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e
		},
		fromJSON: function (e) {
			return this.arcLengthDivisions = e.arcLengthDivisions, this
		}
	}), ts.prototype = Object.create(es.prototype), ts.prototype.constructor = ts, ts.prototype.isEllipseCurve = !0, ts.prototype.getPoint = function (e, t) {
		for (var n = t || new c, i = 2 * Math.PI, r = this.aEndAngle - this.aStartAngle, a = Math.abs(r) < Number.EPSILON; r < 0;) r += i;
		for (; r > i;) r -= i;
		r < Number.EPSILON && (r = a ? 0 : i), !0 !== this.aClockwise || a || (r === i ? r = -i : r -= i);
		var o = this.aStartAngle + e * r,
			s = this.aX + this.xRadius * Math.cos(o),
			l = this.aY + this.yRadius * Math.sin(o);
		if (0 !== this.aRotation) {
			var h = Math.cos(this.aRotation),
				u = Math.sin(this.aRotation),
				p = s - this.aX,
				d = l - this.aY;
			s = p * h - d * u + this.aX, l = p * u + d * h + this.aY
		}
		return n.set(s, l)
	}, ts.prototype.copy = function (e) {
		return es.prototype.copy.call(this, e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this
	}, ts.prototype.toJSON = function () {
		var e = es.prototype.toJSON.call(this);
		return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e
	}, ts.prototype.fromJSON = function (e) {
		return es.prototype.fromJSON.call(this, e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this
	}, ns.prototype = Object.create(ts.prototype), ns.prototype.constructor = ns, ns.prototype.isArcCurve = !0;
	var rs = new x,
		as = new is,
		os = new is,
		ss = new is;

	function cs(e, t, n, i) {
		es.call(this), this.type = "CatmullRomCurve3", this.points = e || [], this.closed = t || !1, this.curveType = n || "centripetal", this.tension = i || .5
	}

	function ls(e, t, n, i, r) {
		var a = .5 * (i - t),
			o = .5 * (r - n),
			s = e * e;
		return (2 * n - 2 * i + a + o) * (e * s) + (-3 * n + 3 * i - 2 * a - o) * s + a * e + n
	}

	function hs(e, t, n, i) {
		return function (e, t) {
			var n = 1 - e;
			return n * n * t
		}(e, t) + function (e, t) {
			return 2 * (1 - e) * e * t
		}(e, n) + function (e, t) {
			return e * e * t
		}(e, i)
	}

	function us(e, t, n, i, r) {
		return function (e, t) {
			var n = 1 - e;
			return n * n * n * t
		}(e, t) + function (e, t) {
			var n = 1 - e;
			return 3 * n * n * e * t
		}(e, n) + function (e, t) {
			return 3 * (1 - e) * e * e * t
		}(e, i) + function (e, t) {
			return e * e * e * t
		}(e, r)
	}

	function ps(e, t, n, i) {
		es.call(this), this.type = "CubicBezierCurve", this.v0 = e || new c, this.v1 = t || new c, this.v2 = n || new c, this.v3 = i || new c
	}

	function ds(e, t, n, i) {
		es.call(this), this.type = "CubicBezierCurve3", this.v0 = e || new x, this.v1 = t || new x, this.v2 = n || new x, this.v3 = i || new x
	}

	function fs(e, t) {
		es.call(this), this.type = "LineCurve", this.v1 = e || new c, this.v2 = t || new c
	}

	function ms(e, t) {
		es.call(this), this.type = "LineCurve3", this.v1 = e || new x, this.v2 = t || new x
	}

	function vs(e, t, n) {
		es.call(this), this.type = "QuadraticBezierCurve", this.v0 = e || new c, this.v1 = t || new c, this.v2 = n || new c
	}

	function gs(e, t, n) {
		es.call(this), this.type = "QuadraticBezierCurve3", this.v0 = e || new x, this.v1 = t || new x, this.v2 = n || new x
	}

	function ys(e) {
		es.call(this), this.type = "SplineCurve", this.points = e || []
	}
	cs.prototype = Object.create(es.prototype), cs.prototype.constructor = cs, cs.prototype.isCatmullRomCurve3 = !0, cs.prototype.getPoint = function (e, t) {
		var n, i, r, a, o = t || new x,
			s = this.points,
			c = s.length,
			l = (c - (this.closed ? 0 : 1)) * e,
			h = Math.floor(l),
			u = l - h;
		if (this.closed ? h += h > 0 ? 0 : (Math.floor(Math.abs(h) / c) + 1) * c : 0 === u && h === c - 1 && (h = c - 2, u = 1), this.closed || h > 0 ? n = s[(h - 1) % c] : (rs.subVectors(s[0], s[1]).add(s[0]), n = rs), i = s[h % c], r = s[(h + 1) % c], this.closed || h + 2 < c ? a = s[(h + 2) % c] : (rs.subVectors(s[c - 1], s[c - 2]).add(s[c - 1]), a = rs), "centripetal" === this.curveType || "chordal" === this.curveType) {
			var p = "chordal" === this.curveType ? .5 : .25,
				d = Math.pow(n.distanceToSquared(i), p),
				f = Math.pow(i.distanceToSquared(r), p),
				m = Math.pow(r.distanceToSquared(a), p);
			f < 1e-4 && (f = 1), d < 1e-4 && (d = f), m < 1e-4 && (m = f), as.initNonuniformCatmullRom(n.x, i.x, r.x, a.x, d, f, m), os.initNonuniformCatmullRom(n.y, i.y, r.y, a.y, d, f, m), ss.initNonuniformCatmullRom(n.z, i.z, r.z, a.z, d, f, m)
		} else "catmullrom" === this.curveType && (as.initCatmullRom(n.x, i.x, r.x, a.x, this.tension), os.initCatmullRom(n.y, i.y, r.y, a.y, this.tension), ss.initCatmullRom(n.z, i.z, r.z, a.z, this.tension));
		return o.set(as.calc(u), os.calc(u), ss.calc(u)), o
	}, cs.prototype.copy = function (e) {
		es.prototype.copy.call(this, e), this.points = [];
		for (var t = 0, n = e.points.length; t < n; t++) {
			var i = e.points[t];
			this.points.push(i.clone())
		}
		return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this
	}, cs.prototype.toJSON = function () {
		var e = es.prototype.toJSON.call(this);
		e.points = [];
		for (var t = 0, n = this.points.length; t < n; t++) {
			var i = this.points[t];
			e.points.push(i.toArray())
		}
		return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e
	}, cs.prototype.fromJSON = function (e) {
		es.prototype.fromJSON.call(this, e), this.points = [];
		for (var t = 0, n = e.points.length; t < n; t++) {
			var i = e.points[t];
			this.points.push((new x).fromArray(i))
		}
		return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this
	}, ps.prototype = Object.create(es.prototype), ps.prototype.constructor = ps, ps.prototype.isCubicBezierCurve = !0, ps.prototype.getPoint = function (e, t) {
		var n = t || new c,
			i = this.v0,
			r = this.v1,
			a = this.v2,
			o = this.v3;
		return n.set(us(e, i.x, r.x, a.x, o.x), us(e, i.y, r.y, a.y, o.y)), n
	}, ps.prototype.copy = function (e) {
		return es.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this
	}, ps.prototype.toJSON = function () {
		var e = es.prototype.toJSON.call(this);
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e
	}, ps.prototype.fromJSON = function (e) {
		return es.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this
	}, ds.prototype = Object.create(es.prototype), ds.prototype.constructor = ds, ds.prototype.isCubicBezierCurve3 = !0, ds.prototype.getPoint = function (e, t) {
		var n = t || new x,
			i = this.v0,
			r = this.v1,
			a = this.v2,
			o = this.v3;
		return n.set(us(e, i.x, r.x, a.x, o.x), us(e, i.y, r.y, a.y, o.y), us(e, i.z, r.z, a.z, o.z)), n
	}, ds.prototype.copy = function (e) {
		return es.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this
	}, ds.prototype.toJSON = function () {
		var e = es.prototype.toJSON.call(this);
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e
	}, ds.prototype.fromJSON = function (e) {
		return es.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this
	}, fs.prototype = Object.create(es.prototype), fs.prototype.constructor = fs, fs.prototype.isLineCurve = !0, fs.prototype.getPoint = function (e, t) {
		var n = t || new c;
		return 1 === e ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n
	}, fs.prototype.getPointAt = function (e, t) {
		return this.getPoint(e, t)
	}, fs.prototype.getTangent = function () {
		return this.v2.clone().sub(this.v1).normalize()
	}, fs.prototype.copy = function (e) {
		return es.prototype.copy.call(this, e), this.v1.copy(e.v1), this.v2.copy(e.v2), this
	}, fs.prototype.toJSON = function () {
		var e = es.prototype.toJSON.call(this);
		return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
	}, fs.prototype.fromJSON = function (e) {
		return es.prototype.fromJSON.call(this, e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
	}, ms.prototype = Object.create(es.prototype), ms.prototype.constructor = ms, ms.prototype.isLineCurve3 = !0, ms.prototype.getPoint = function (e, t) {
		var n = t || new x;
		return 1 === e ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n
	}, ms.prototype.getPointAt = function (e, t) {
		return this.getPoint(e, t)
	}, ms.prototype.copy = function (e) {
		return es.prototype.copy.call(this, e), this.v1.copy(e.v1), this.v2.copy(e.v2), this
	}, ms.prototype.toJSON = function () {
		var e = es.prototype.toJSON.call(this);
		return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
	}, ms.prototype.fromJSON = function (e) {
		return es.prototype.fromJSON.call(this, e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
	}, vs.prototype = Object.create(es.prototype), vs.prototype.constructor = vs, vs.prototype.isQuadraticBezierCurve = !0, vs.prototype.getPoint = function (e, t) {
		var n = t || new c,
			i = this.v0,
			r = this.v1,
			a = this.v2;
		return n.set(hs(e, i.x, r.x, a.x), hs(e, i.y, r.y, a.y)), n
	}, vs.prototype.copy = function (e) {
		return es.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this
	}, vs.prototype.toJSON = function () {
		var e = es.prototype.toJSON.call(this);
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
	}, vs.prototype.fromJSON = function (e) {
		return es.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
	}, gs.prototype = Object.create(es.prototype), gs.prototype.constructor = gs, gs.prototype.isQuadraticBezierCurve3 = !0, gs.prototype.getPoint = function (e, t) {
		var n = t || new x,
			i = this.v0,
			r = this.v1,
			a = this.v2;
		return n.set(hs(e, i.x, r.x, a.x), hs(e, i.y, r.y, a.y), hs(e, i.z, r.z, a.z)), n
	}, gs.prototype.copy = function (e) {
		return es.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this
	}, gs.prototype.toJSON = function () {
		var e = es.prototype.toJSON.call(this);
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
	}, gs.prototype.fromJSON = function (e) {
		return es.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
	}, ys.prototype = Object.create(es.prototype), ys.prototype.constructor = ys, ys.prototype.isSplineCurve = !0, ys.prototype.getPoint = function (e, t) {
		var n = t || new c,
			i = this.points,
			r = (i.length - 1) * e,
			a = Math.floor(r),
			o = r - a,
			s = i[0 === a ? a : a - 1],
			l = i[a],
			h = i[a > i.length - 2 ? i.length - 1 : a + 1],
			u = i[a > i.length - 3 ? i.length - 1 : a + 2];
		return n.set(ls(o, s.x, l.x, h.x, u.x), ls(o, s.y, l.y, h.y, u.y)), n
	}, ys.prototype.copy = function (e) {
		es.prototype.copy.call(this, e), this.points = [];
		for (var t = 0, n = e.points.length; t < n; t++) {
			var i = e.points[t];
			this.points.push(i.clone())
		}
		return this
	}, ys.prototype.toJSON = function () {
		var e = es.prototype.toJSON.call(this);
		e.points = [];
		for (var t = 0, n = this.points.length; t < n; t++) {
			var i = this.points[t];
			e.points.push(i.toArray())
		}
		return e
	}, ys.prototype.fromJSON = function (e) {
		es.prototype.fromJSON.call(this, e), this.points = [];
		for (var t = 0, n = e.points.length; t < n; t++) {
			var i = e.points[t];
			this.points.push((new c).fromArray(i))
		}
		return this
	};
	var xs = Object.freeze({
		__proto__: null,
		ArcCurve: ns,
		CatmullRomCurve3: cs,
		CubicBezierCurve: ps,
		CubicBezierCurve3: ds,
		EllipseCurve: ts,
		LineCurve: fs,
		LineCurve3: ms,
		QuadraticBezierCurve: vs,
		QuadraticBezierCurve3: gs,
		SplineCurve: ys
	});

	function bs() {
		es.call(this), this.type = "CurvePath", this.curves = [], this.autoClose = !1
	}

	function ws(e) {
		bs.call(this), this.type = "Path", this.currentPoint = new c, e && this.setFromPoints(e)
	}

	function _s(e) {
		ws.call(this, e), this.uuid = s.generateUUID(), this.type = "Shape", this.holes = []
	}

	function Ms(e, t) {
		W.call(this), this.type = "Light", this.color = new Ue(e), this.intensity = void 0 !== t ? t : 1, this.receiveShadow = void 0
	}

	function Ss(e, t, n) {
		Ms.call(this, e, n), this.type = "HemisphereLight", this.castShadow = void 0, this.position.copy(W.DefaultUp), this.updateMatrix(), this.groundColor = new Ue(t)
	}

	function Ts(e) {
		this.camera = e, this.bias = 0, this.radius = 1, this.mapSize = new c(512, 512), this.map = null, this.mapPass = null, this.matrix = new A, this._frustum = new Zt, this._frameExtents = new c(1, 1), this._viewportCount = 1, this._viewports = [new d(0, 0, 1, 1)]
	}

	function Es() {
		Ts.call(this, new Vt(50, 1, .5, 500))
	}

	function As(e, t, n, i, r, a) {
		Ms.call(this, e, t), this.type = "SpotLight", this.position.copy(W.DefaultUp), this.updateMatrix(), this.target = new W, Object.defineProperty(this, "power", {
			get: function () {
				return this.intensity * Math.PI
			},
			set: function (e) {
				this.intensity = e / Math.PI
			}
		}), this.distance = void 0 !== n ? n : 0, this.angle = void 0 !== i ? i : Math.PI / 3, this.penumbra = void 0 !== r ? r : 0, this.decay = void 0 !== a ? a : 1, this.shadow = new Es
	}

	function Ls() {
		Ts.call(this, new Vt(90, 1, .5, 500)), this._frameExtents = new c(4, 2), this._viewportCount = 6, this._viewports = [new d(2, 1, 1, 1), new d(0, 1, 1, 1), new d(3, 1, 1, 1), new d(1, 1, 1, 1), new d(3, 0, 1, 1), new d(1, 0, 1, 1)], this._cubeDirections = [new x(1, 0, 0), new x(-1, 0, 0), new x(0, 0, 1), new x(0, 0, -1), new x(0, 1, 0), new x(0, -1, 0)], this._cubeUps = [new x(0, 1, 0), new x(0, 1, 0), new x(0, 1, 0), new x(0, 1, 0), new x(0, 0, 1), new x(0, 0, -1)]
	}

	function Rs(e, t, n, i) {
		Ms.call(this, e, t), this.type = "PointLight", Object.defineProperty(this, "power", {
			get: function () {
				return 4 * this.intensity * Math.PI
			},
			set: function (e) {
				this.intensity = e / (4 * Math.PI)
			}
		}), this.distance = void 0 !== n ? n : 0, this.decay = void 0 !== i ? i : 1, this.shadow = new Ls
	}

	function Ps(e, t, n, i, r, a) {
		kt.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = void 0 !== e ? e : -1, this.right = void 0 !== t ? t : 1, this.top = void 0 !== n ? n : 1, this.bottom = void 0 !== i ? i : -1, this.near = void 0 !== r ? r : .1, this.far = void 0 !== a ? a : 2e3, this.updateProjectionMatrix()
	}

	function Cs() {
		Ts.call(this, new Ps(-5, 5, 5, -5, .5, 500))
	}

	function Os(e, t) {
		Ms.call(this, e, t), this.type = "DirectionalLight", this.position.copy(W.DefaultUp), this.updateMatrix(), this.target = new W, this.shadow = new Cs
	}

	function Ds(e, t) {
		Ms.call(this, e, t), this.type = "AmbientLight", this.castShadow = void 0
	}

	function Is(e, t, n, i) {
		Ms.call(this, e, t), this.type = "RectAreaLight", this.width = void 0 !== n ? n : 10, this.height = void 0 !== i ? i : 10
	}

	function Ns(e) {
		Wo.call(this, e), this.textures = {}
	}
	bs.prototype = Object.assign(Object.create(es.prototype), {
		constructor: bs,
		add: function (e) {
			this.curves.push(e)
		},
		closePath: function () {
			var e = this.curves[0].getPoint(0),
				t = this.curves[this.curves.length - 1].getPoint(1);
			e.equals(t) || this.curves.push(new fs(t, e))
		},
		getPoint: function (e) {
			for (var t = e * this.getLength(), n = this.getCurveLengths(), i = 0; i < n.length;) {
				if (n[i] >= t) {
					var r = n[i] - t,
						a = this.curves[i],
						o = a.getLength(),
						s = 0 === o ? 0 : 1 - r / o;
					return a.getPointAt(s)
				}
				i++
			}
			return null
		},
		getLength: function () {
			var e = this.getCurveLengths();
			return e[e.length - 1]
		},
		updateArcLengths: function () {
			this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths()
		},
		getCurveLengths: function () {
			if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
			for (var e = [], t = 0, n = 0, i = this.curves.length; n < i; n++) t += this.curves[n].getLength(), e.push(t);
			return this.cacheLengths = e, e
		},
		getSpacedPoints: function (e) {
			void 0 === e && (e = 40);
			for (var t = [], n = 0; n <= e; n++) t.push(this.getPoint(n / e));
			return this.autoClose && t.push(t[0]), t
		},
		getPoints: function (e) {
			e = e || 12;
			for (var t, n = [], i = 0, r = this.curves; i < r.length; i++)
				for (var a = r[i], o = a && a.isEllipseCurve ? 2 * e : a && (a.isLineCurve || a.isLineCurve3) ? 1 : a && a.isSplineCurve ? e * a.points.length : e, s = a.getPoints(o), c = 0; c < s.length; c++) {
					var l = s[c];
					t && t.equals(l) || (n.push(l), t = l)
				}
			return this.autoClose && n.length > 1 && !n[n.length - 1].equals(n[0]) && n.push(n[0]), n
		},
		copy: function (e) {
			es.prototype.copy.call(this, e), this.curves = [];
			for (var t = 0, n = e.curves.length; t < n; t++) {
				var i = e.curves[t];
				this.curves.push(i.clone())
			}
			return this.autoClose = e.autoClose, this
		},
		toJSON: function () {
			var e = es.prototype.toJSON.call(this);
			e.autoClose = this.autoClose, e.curves = [];
			for (var t = 0, n = this.curves.length; t < n; t++) {
				var i = this.curves[t];
				e.curves.push(i.toJSON())
			}
			return e
		},
		fromJSON: function (e) {
			es.prototype.fromJSON.call(this, e), this.autoClose = e.autoClose, this.curves = [];
			for (var t = 0, n = e.curves.length; t < n; t++) {
				var i = e.curves[t];
				this.curves.push((new xs[i.type]).fromJSON(i))
			}
			return this
		}
	}), ws.prototype = Object.assign(Object.create(bs.prototype), {
		constructor: ws,
		setFromPoints: function (e) {
			this.moveTo(e[0].x, e[0].y);
			for (var t = 1, n = e.length; t < n; t++) this.lineTo(e[t].x, e[t].y);
			return this
		},
		moveTo: function (e, t) {
			return this.currentPoint.set(e, t), this
		},
		lineTo: function (e, t) {
			var n = new fs(this.currentPoint.clone(), new c(e, t));
			return this.curves.push(n), this.currentPoint.set(e, t), this
		},
		quadraticCurveTo: function (e, t, n, i) {
			var r = new vs(this.currentPoint.clone(), new c(e, t), new c(n, i));
			return this.curves.push(r), this.currentPoint.set(n, i), this
		},
		bezierCurveTo: function (e, t, n, i, r, a) {
			var o = new ps(this.currentPoint.clone(), new c(e, t), new c(n, i), new c(r, a));
			return this.curves.push(o), this.currentPoint.set(r, a), this
		},
		splineThru: function (e) {
			var t = new ys([this.currentPoint.clone()].concat(e));
			return this.curves.push(t), this.currentPoint.copy(e[e.length - 1]), this
		},
		arc: function (e, t, n, i, r, a) {
			var o = this.currentPoint.x,
				s = this.currentPoint.y;
			return this.absarc(e + o, t + s, n, i, r, a), this
		},
		absarc: function (e, t, n, i, r, a) {
			return this.absellipse(e, t, n, n, i, r, a), this
		},
		ellipse: function (e, t, n, i, r, a, o, s) {
			var c = this.currentPoint.x,
				l = this.currentPoint.y;
			return this.absellipse(e + c, t + l, n, i, r, a, o, s), this
		},
		absellipse: function (e, t, n, i, r, a, o, s) {
			var c = new ts(e, t, n, i, r, a, o, s);
			if (this.curves.length > 0) {
				var l = c.getPoint(0);
				l.equals(this.currentPoint) || this.lineTo(l.x, l.y)
			}
			this.curves.push(c);
			var h = c.getPoint(1);
			return this.currentPoint.copy(h), this
		},
		copy: function (e) {
			return bs.prototype.copy.call(this, e), this.currentPoint.copy(e.currentPoint), this
		},
		toJSON: function () {
			var e = bs.prototype.toJSON.call(this);
			return e.currentPoint = this.currentPoint.toArray(), e
		},
		fromJSON: function (e) {
			return bs.prototype.fromJSON.call(this, e), this.currentPoint.fromArray(e.currentPoint), this
		}
	}), _s.prototype = Object.assign(Object.create(ws.prototype), {
		constructor: _s,
		getPointsHoles: function (e) {
			for (var t = [], n = 0, i = this.holes.length; n < i; n++) t[n] = this.holes[n].getPoints(e);
			return t
		},
		extractPoints: function (e) {
			return {
				shape: this.getPoints(e),
				holes: this.getPointsHoles(e)
			}
		},
		copy: function (e) {
			ws.prototype.copy.call(this, e), this.holes = [];
			for (var t = 0, n = e.holes.length; t < n; t++) {
				var i = e.holes[t];
				this.holes.push(i.clone())
			}
			return this
		},
		toJSON: function () {
			var e = ws.prototype.toJSON.call(this);
			e.uuid = this.uuid, e.holes = [];
			for (var t = 0, n = this.holes.length; t < n; t++) {
				var i = this.holes[t];
				e.holes.push(i.toJSON())
			}
			return e
		},
		fromJSON: function (e) {
			ws.prototype.fromJSON.call(this, e), this.uuid = e.uuid, this.holes = [];
			for (var t = 0, n = e.holes.length; t < n; t++) {
				var i = e.holes[t];
				this.holes.push((new ws).fromJSON(i))
			}
			return this
		}
	}), Ms.prototype = Object.assign(Object.create(W.prototype), {
		constructor: Ms,
		isLight: !0,
		copy: function (e) {
			return W.prototype.copy.call(this, e), this.color.copy(e.color), this.intensity = e.intensity, this
		},
		toJSON: function (e) {
			var t = W.prototype.toJSON.call(this, e);
			return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, void 0 !== this.groundColor && (t.object.groundColor = this.groundColor.getHex()), void 0 !== this.distance && (t.object.distance = this.distance), void 0 !== this.angle && (t.object.angle = this.angle), void 0 !== this.decay && (t.object.decay = this.decay), void 0 !== this.penumbra && (t.object.penumbra = this.penumbra), void 0 !== this.shadow && (t.object.shadow = this.shadow.toJSON()), t
		}
	}), Ss.prototype = Object.assign(Object.create(Ms.prototype), {
		constructor: Ss,
		isHemisphereLight: !0,
		copy: function (e) {
			return Ms.prototype.copy.call(this, e), this.groundColor.copy(e.groundColor), this
		}
	}), Object.assign(Ts.prototype, {
		_projScreenMatrix: new A,
		_lightPositionWorld: new x,
		_lookTarget: new x,
		getViewportCount: function () {
			return this._viewportCount
		},
		getFrustum: function () {
			return this._frustum
		},
		updateMatrices: function (e) {
			var t = this.camera,
				n = this.matrix,
				i = this._projScreenMatrix,
				r = this._lookTarget,
				a = this._lightPositionWorld;
			a.setFromMatrixPosition(e.matrixWorld), t.position.copy(a), r.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(r), t.updateMatrixWorld(), i.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(i), n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), n.multiply(t.projectionMatrix), n.multiply(t.matrixWorldInverse)
		},
		getViewport: function (e) {
			return this._viewports[e]
		},
		getFrameExtents: function () {
			return this._frameExtents
		},
		copy: function (e) {
			return this.camera = e.camera.clone(), this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		toJSON: function () {
			var e = {};
			return 0 !== this.bias && (e.bias = this.bias), 1 !== this.radius && (e.radius = this.radius), 512 === this.mapSize.x && 512 === this.mapSize.y || (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e
		}
	}), Es.prototype = Object.assign(Object.create(Ts.prototype), {
		constructor: Es,
		isSpotLightShadow: !0,
		updateMatrices: function (e) {
			var t = this.camera,
				n = 2 * s.RAD2DEG * e.angle,
				i = this.mapSize.width / this.mapSize.height,
				r = e.distance || t.far;
			n === t.fov && i === t.aspect && r === t.far || (t.fov = n, t.aspect = i, t.far = r, t.updateProjectionMatrix()), Ts.prototype.updateMatrices.call(this, e)
		}
	}), As.prototype = Object.assign(Object.create(Ms.prototype), {
		constructor: As,
		isSpotLight: !0,
		copy: function (e) {
			return Ms.prototype.copy.call(this, e), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.shadow = e.shadow.clone(), this
		}
	}), Ls.prototype = Object.assign(Object.create(Ts.prototype), {
		constructor: Ls,
		isPointLightShadow: !0,
		updateMatrices: function (e, t) {
			void 0 === t && (t = 0);
			var n = this.camera,
				i = this.matrix,
				r = this._lightPositionWorld,
				a = this._lookTarget,
				o = this._projScreenMatrix;
			r.setFromMatrixPosition(e.matrixWorld), n.position.copy(r), a.copy(n.position), a.add(this._cubeDirections[t]), n.up.copy(this._cubeUps[t]), n.lookAt(a), n.updateMatrixWorld(), i.makeTranslation(-r.x, -r.y, -r.z), o.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(o)
		}
	}), Rs.prototype = Object.assign(Object.create(Ms.prototype), {
		constructor: Rs,
		isPointLight: !0,
		copy: function (e) {
			return Ms.prototype.copy.call(this, e), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this
		}
	}), Ps.prototype = Object.assign(Object.create(kt.prototype), {
		constructor: Ps,
		isOrthographicCamera: !0,
		copy: function (e, t) {
			return kt.prototype.copy.call(this, e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = null === e.view ? null : Object.assign({}, e.view), this
		},
		setViewOffset: function (e, t, n, i, r, a) {
			null === this.view && (this.view = {
				enabled: !0,
				fullWidth: 1,
				fullHeight: 1,
				offsetX: 0,
				offsetY: 0,
				width: 1,
				height: 1
			}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = a, this.updateProjectionMatrix()
		},
		clearViewOffset: function () {
			null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
		},
		updateProjectionMatrix: function () {
			var e = (this.right - this.left) / (2 * this.zoom),
				t = (this.top - this.bottom) / (2 * this.zoom),
				n = (this.right + this.left) / 2,
				i = (this.top + this.bottom) / 2,
				r = n - e,
				a = n + e,
				o = i + t,
				s = i - t;
			if (null !== this.view && this.view.enabled) {
				var c = (this.right - this.left) / this.view.fullWidth / this.zoom,
					l = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
				a = (r += c * this.view.offsetX) + c * this.view.width, s = (o -= l * this.view.offsetY) - l * this.view.height
			}
			this.projectionMatrix.makeOrthographic(r, a, o, s, this.near, this.far), this.projectionMatrixInverse.getInverse(this.projectionMatrix)
		},
		toJSON: function (e) {
			var t = W.prototype.toJSON.call(this, e);
			return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, null !== this.view && (t.object.view = Object.assign({}, this.view)), t
		}
	}), Cs.prototype = Object.assign(Object.create(Ts.prototype), {
		constructor: Cs,
		isDirectionalLightShadow: !0,
		updateMatrices: function (e) {
			Ts.prototype.updateMatrices.call(this, e)
		}
	}), Os.prototype = Object.assign(Object.create(Ms.prototype), {
		constructor: Os,
		isDirectionalLight: !0,
		copy: function (e) {
			return Ms.prototype.copy.call(this, e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this
		}
	}), Ds.prototype = Object.assign(Object.create(Ms.prototype), {
		constructor: Ds,
		isAmbientLight: !0
	}), Is.prototype = Object.assign(Object.create(Ms.prototype), {
		constructor: Is,
		isRectAreaLight: !0,
		copy: function (e) {
			return Ms.prototype.copy.call(this, e), this.width = e.width, this.height = e.height, this
		},
		toJSON: function (e) {
			var t = Ms.prototype.toJSON.call(this, e);
			return t.object.width = this.width, t.object.height = this.height, t
		}
	}), Ns.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: Ns,
		load: function (e, t, n, i) {
			var r = this,
				a = new Xo(r.manager);
			a.setPath(r.path), a.load(e, (function (e) {
				t(r.parse(JSON.parse(e)))
			}), n, i)
		},
		parse: function (e) {
			var t = this.textures;

			function n(e) {
				return void 0 === t[e] && console.warn("THREE.MaterialLoader: Undefined texture", e), t[e]
			}
			var i = new Eo[e.type];
			if (void 0 !== e.uuid && (i.uuid = e.uuid), void 0 !== e.name && (i.name = e.name), void 0 !== e.color && i.color.setHex(e.color), void 0 !== e.roughness && (i.roughness = e.roughness), void 0 !== e.metalness && (i.metalness = e.metalness), void 0 !== e.sheen && (i.sheen = (new Ue).setHex(e.sheen)), void 0 !== e.emissive && i.emissive.setHex(e.emissive), void 0 !== e.specular && i.specular.setHex(e.specular), void 0 !== e.shininess && (i.shininess = e.shininess), void 0 !== e.clearcoat && (i.clearcoat = e.clearcoat), void 0 !== e.clearcoatRoughness && (i.clearcoatRoughness = e.clearcoatRoughness), void 0 !== e.fog && (i.fog = e.fog), void 0 !== e.flatShading && (i.flatShading = e.flatShading), void 0 !== e.blending && (i.blending = e.blending), void 0 !== e.combine && (i.combine = e.combine), void 0 !== e.side && (i.side = e.side), void 0 !== e.opacity && (i.opacity = e.opacity), void 0 !== e.transparent && (i.transparent = e.transparent), void 0 !== e.alphaTest && (i.alphaTest = e.alphaTest), void 0 !== e.depthTest && (i.depthTest = e.depthTest), void 0 !== e.depthWrite && (i.depthWrite = e.depthWrite), void 0 !== e.colorWrite && (i.colorWrite = e.colorWrite), void 0 !== e.stencilWrite && (i.stencilWrite = e.stencilWrite), void 0 !== e.stencilWriteMask && (i.stencilWriteMask = e.stencilWriteMask), void 0 !== e.stencilFunc && (i.stencilFunc = e.stencilFunc), void 0 !== e.stencilRef && (i.stencilRef = e.stencilRef), void 0 !== e.stencilFuncMask && (i.stencilFuncMask = e.stencilFuncMask), void 0 !== e.stencilFail && (i.stencilFail = e.stencilFail), void 0 !== e.stencilZFail && (i.stencilZFail = e.stencilZFail), void 0 !== e.stencilZPass && (i.stencilZPass = e.stencilZPass), void 0 !== e.wireframe && (i.wireframe = e.wireframe), void 0 !== e.wireframeLinewidth && (i.wireframeLinewidth = e.wireframeLinewidth), void 0 !== e.wireframeLinecap && (i.wireframeLinecap = e.wireframeLinecap), void 0 !== e.wireframeLinejoin && (i.wireframeLinejoin = e.wireframeLinejoin), void 0 !== e.rotation && (i.rotation = e.rotation), 1 !== e.linewidth && (i.linewidth = e.linewidth), void 0 !== e.dashSize && (i.dashSize = e.dashSize), void 0 !== e.gapSize && (i.gapSize = e.gapSize), void 0 !== e.scale && (i.scale = e.scale), void 0 !== e.polygonOffset && (i.polygonOffset = e.polygonOffset), void 0 !== e.polygonOffsetFactor && (i.polygonOffsetFactor = e.polygonOffsetFactor), void 0 !== e.polygonOffsetUnits && (i.polygonOffsetUnits = e.polygonOffsetUnits), void 0 !== e.skinning && (i.skinning = e.skinning), void 0 !== e.morphTargets && (i.morphTargets = e.morphTargets), void 0 !== e.morphNormals && (i.morphNormals = e.morphNormals), void 0 !== e.dithering && (i.dithering = e.dithering), void 0 !== e.vertexTangents && (i.vertexTangents = e.vertexTangents), void 0 !== e.visible && (i.visible = e.visible), void 0 !== e.toneMapped && (i.toneMapped = e.toneMapped), void 0 !== e.userData && (i.userData = e.userData), void 0 !== e.vertexColors && ("number" == typeof e.vertexColors ? i.vertexColors = e.vertexColors > 0 : i.vertexColors = e.vertexColors), void 0 !== e.uniforms)
				for (var r in e.uniforms) {
					var a = e.uniforms[r];
					switch (i.uniforms[r] = {}, a.type) {
						case "t":
							i.uniforms[r].value = n(a.value);
							break;
						case "c":
							i.uniforms[r].value = (new Ue).setHex(a.value);
							break;
						case "v2":
							i.uniforms[r].value = (new c).fromArray(a.value);
							break;
						case "v3":
							i.uniforms[r].value = (new x).fromArray(a.value);
							break;
						case "v4":
							i.uniforms[r].value = (new d).fromArray(a.value);
							break;
						case "m3":
							i.uniforms[r].value = (new l).fromArray(a.value);
						case "m4":
							i.uniforms[r].value = (new A).fromArray(a.value);
							break;
						default:
							i.uniforms[r].value = a.value
					}
				}
			if (void 0 !== e.defines && (i.defines = e.defines), void 0 !== e.vertexShader && (i.vertexShader = e.vertexShader), void 0 !== e.fragmentShader && (i.fragmentShader = e.fragmentShader), void 0 !== e.extensions)
				for (var o in e.extensions) i.extensions[o] = e.extensions[o];
			if (void 0 !== e.shading && (i.flatShading = 1 === e.shading), void 0 !== e.size && (i.size = e.size), void 0 !== e.sizeAttenuation && (i.sizeAttenuation = e.sizeAttenuation), void 0 !== e.map && (i.map = n(e.map)), void 0 !== e.matcap && (i.matcap = n(e.matcap)), void 0 !== e.alphaMap && (i.alphaMap = n(e.alphaMap)), void 0 !== e.bumpMap && (i.bumpMap = n(e.bumpMap)), void 0 !== e.bumpScale && (i.bumpScale = e.bumpScale), void 0 !== e.normalMap && (i.normalMap = n(e.normalMap)), void 0 !== e.normalMapType && (i.normalMapType = e.normalMapType), void 0 !== e.normalScale) {
				var s = e.normalScale;
				!1 === Array.isArray(s) && (s = [s, s]), i.normalScale = (new c).fromArray(s)
			}
			return void 0 !== e.displacementMap && (i.displacementMap = n(e.displacementMap)), void 0 !== e.displacementScale && (i.displacementScale = e.displacementScale), void 0 !== e.displacementBias && (i.displacementBias = e.displacementBias), void 0 !== e.roughnessMap && (i.roughnessMap = n(e.roughnessMap)), void 0 !== e.metalnessMap && (i.metalnessMap = n(e.metalnessMap)), void 0 !== e.emissiveMap && (i.emissiveMap = n(e.emissiveMap)), void 0 !== e.emissiveIntensity && (i.emissiveIntensity = e.emissiveIntensity), void 0 !== e.specularMap && (i.specularMap = n(e.specularMap)), void 0 !== e.envMap && (i.envMap = n(e.envMap)), void 0 !== e.envMapIntensity && (i.envMapIntensity = e.envMapIntensity), void 0 !== e.reflectivity && (i.reflectivity = e.reflectivity), void 0 !== e.refractionRatio && (i.refractionRatio = e.refractionRatio), void 0 !== e.lightMap && (i.lightMap = n(e.lightMap)), void 0 !== e.lightMapIntensity && (i.lightMapIntensity = e.lightMapIntensity), void 0 !== e.aoMap && (i.aoMap = n(e.aoMap)), void 0 !== e.aoMapIntensity && (i.aoMapIntensity = e.aoMapIntensity), void 0 !== e.gradientMap && (i.gradientMap = n(e.gradientMap)), void 0 !== e.clearcoatMap && (i.clearcoatMap = n(e.clearcoatMap)), void 0 !== e.clearcoatRoughnessMap && (i.clearcoatRoughnessMap = n(e.clearcoatRoughnessMap)), void 0 !== e.clearcoatNormalMap && (i.clearcoatNormalMap = n(e.clearcoatNormalMap)), void 0 !== e.clearcoatNormalScale && (i.clearcoatNormalScale = (new c).fromArray(e.clearcoatNormalScale)), i
		},
		setTextures: function (e) {
			return this.textures = e, this
		}
	});
	var Us = function (e) {
			if ("undefined" != typeof TextDecoder) return (new TextDecoder).decode(e);
			for (var t = "", n = 0, i = e.length; n < i; n++) t += String.fromCharCode(e[n]);
			try {
				return decodeURIComponent(escape(t))
			} catch (e) {
				return t
			}
		},
		zs = function (e) {
			var t = e.lastIndexOf("/");
			return -1 === t ? "./" : e.substr(0, t + 1)
		};

	function Fs() {
		ht.call(this), this.type = "InstancedBufferGeometry", this.maxInstancedCount = void 0
	}

	function Bs(e, t, n, i) {
		"number" == typeof n && (i = n, n = !1, console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")), We.call(this, e, t, n), this.meshPerAttribute = i || 1
	}

	function Hs(e) {
		Wo.call(this, e)
	}
	Fs.prototype = Object.assign(Object.create(ht.prototype), {
		constructor: Fs,
		isInstancedBufferGeometry: !0,
		copy: function (e) {
			return ht.prototype.copy.call(this, e), this.maxInstancedCount = e.maxInstancedCount, this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		toJSON: function () {
			var e = ht.prototype.toJSON.call(this);
			return e.maxInstancedCount = this.maxInstancedCount, e.isInstancedBufferGeometry = !0, e
		}
	}), Bs.prototype = Object.assign(Object.create(We.prototype), {
		constructor: Bs,
		isInstancedBufferAttribute: !0,
		copy: function (e) {
			return We.prototype.copy.call(this, e), this.meshPerAttribute = e.meshPerAttribute, this
		},
		toJSON: function () {
			var e = We.prototype.toJSON.call(this);
			return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e
		}
	}), Hs.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: Hs,
		load: function (e, t, n, i) {
			var r = this,
				a = new Xo(r.manager);
			a.setPath(r.path), a.load(e, (function (e) {
				t(r.parse(JSON.parse(e)))
			}), n, i)
		},
		parse: function (e) {
			var t = e.isInstancedBufferGeometry ? new Fs : new ht,
				n = e.data.index;
			if (void 0 !== n) {
				var i = new Gs[n.type](n.array);
				t.setIndex(new We(i, 1))
			}
			var r = e.data.attributes;
			for (var a in r) {
				var o = r[a],
					s = (i = new Gs[o.type](o.array), new(o.isInstancedBufferAttribute ? Bs : We)(i, o.itemSize, o.normalized));
				void 0 !== o.name && (s.name = o.name), t.setAttribute(a, s)
			}
			var c = e.data.morphAttributes;
			if (c)
				for (var a in c) {
					for (var l = c[a], h = [], u = 0, p = l.length; u < p; u++) {
						o = l[u], s = new We(i = new Gs[o.type](o.array), o.itemSize, o.normalized);
						void 0 !== o.name && (s.name = o.name), h.push(s)
					}
					t.morphAttributes[a] = h
				}
			e.data.morphTargetsRelative && (t.morphTargetsRelative = !0);
			var d = e.data.groups || e.data.drawcalls || e.data.offsets;
			if (void 0 !== d) {
				u = 0;
				for (var f = d.length; u !== f; ++u) {
					var m = d[u];
					t.addGroup(m.start, m.count, m.materialIndex)
				}
			}
			var v = e.data.boundingSphere;
			if (void 0 !== v) {
				var g = new x;
				void 0 !== v.center && g.fromArray(v.center), t.boundingSphere = new le(g, v.radius)
			}
			return e.name && (t.name = e.name), e.userData && (t.userData = e.userData), t
		}
	});
	var Gs = {
		Int8Array: Int8Array,
		Uint8Array: Uint8Array,
		Uint8ClampedArray: "undefined" != typeof Uint8ClampedArray ? Uint8ClampedArray : Uint8Array,
		Int16Array: Int16Array,
		Uint16Array: Uint16Array,
		Int32Array: Int32Array,
		Uint32Array: Uint32Array,
		Float32Array: Float32Array,
		Float64Array: Float64Array
	};

	function ks(e) {
		Wo.call(this, e)
	}
	ks.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: ks,
		load: function (e, t, n, i) {
			var r = this,
				a = "" === this.path ? zs(e) : this.path;
			this.resourcePath = this.resourcePath || a;
			var o = new Xo(r.manager);
			o.setPath(this.path), o.load(e, (function (n) {
				var a = null;
				try {
					a = JSON.parse(n)
				} catch (t) {
					return void 0 !== i && i(t), void console.error("THREE:ObjectLoader: Can't parse " + e + ".", t.message)
				}
				var o = a.metadata;
				void 0 !== o && void 0 !== o.type && "geometry" !== o.type.toLowerCase() ? r.parse(a, t) : console.error("THREE.ObjectLoader: Can't load " + e)
			}), n, i)
		},
		parse: function (e, t) {
			var n = this.parseShape(e.shapes),
				i = this.parseGeometries(e.geometries, n),
				r = this.parseImages(e.images, (function () {
					void 0 !== t && t(s)
				})),
				a = this.parseTextures(e.textures, r),
				o = this.parseMaterials(e.materials, a),
				s = this.parseObject(e.object, i, o);
			return e.animations && (s.animations = this.parseAnimations(e.animations)), void 0 !== e.images && 0 !== e.images.length || void 0 !== t && t(s), s
		},
		parseShape: function (e) {
			var t = {};
			if (void 0 !== e)
				for (var n = 0, i = e.length; n < i; n++) {
					var r = (new _s).fromJSON(e[n]);
					t[r.uuid] = r
				}
			return t
		},
		parseGeometries: function (e, t) {
			var n = {};
			if (void 0 !== e)
				for (var i = new Hs, r = 0, a = e.length; r < a; r++) {
					var o, s = e[r];
					switch (s.type) {
						case "PlaneGeometry":
						case "PlaneBufferGeometry":
							o = new mo[s.type](s.width, s.height, s.widthSegments, s.heightSegments);
							break;
						case "BoxGeometry":
						case "BoxBufferGeometry":
						case "CubeGeometry":
							o = new mo[s.type](s.width, s.height, s.depth, s.widthSegments, s.heightSegments, s.depthSegments);
							break;
						case "CircleGeometry":
						case "CircleBufferGeometry":
							o = new mo[s.type](s.radius, s.segments, s.thetaStart, s.thetaLength);
							break;
						case "CylinderGeometry":
						case "CylinderBufferGeometry":
							o = new mo[s.type](s.radiusTop, s.radiusBottom, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
							break;
						case "ConeGeometry":
						case "ConeBufferGeometry":
							o = new mo[s.type](s.radius, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
							break;
						case "SphereGeometry":
						case "SphereBufferGeometry":
							o = new mo[s.type](s.radius, s.widthSegments, s.heightSegments, s.phiStart, s.phiLength, s.thetaStart, s.thetaLength);
							break;
						case "DodecahedronGeometry":
						case "DodecahedronBufferGeometry":
						case "IcosahedronGeometry":
						case "IcosahedronBufferGeometry":
						case "OctahedronGeometry":
						case "OctahedronBufferGeometry":
						case "TetrahedronGeometry":
						case "TetrahedronBufferGeometry":
							o = new mo[s.type](s.radius, s.detail);
							break;
						case "RingGeometry":
						case "RingBufferGeometry":
							o = new mo[s.type](s.innerRadius, s.outerRadius, s.thetaSegments, s.phiSegments, s.thetaStart, s.thetaLength);
							break;
						case "TorusGeometry":
						case "TorusBufferGeometry":
							o = new mo[s.type](s.radius, s.tube, s.radialSegments, s.tubularSegments, s.arc);
							break;
						case "TorusKnotGeometry":
						case "TorusKnotBufferGeometry":
							o = new mo[s.type](s.radius, s.tube, s.tubularSegments, s.radialSegments, s.p, s.q);
							break;
						case "TubeGeometry":
						case "TubeBufferGeometry":
							o = new mo[s.type]((new xs[s.path.type]).fromJSON(s.path), s.tubularSegments, s.radius, s.radialSegments, s.closed);
							break;
						case "LatheGeometry":
						case "LatheBufferGeometry":
							o = new mo[s.type](s.points, s.segments, s.phiStart, s.phiLength);
							break;
						case "PolyhedronGeometry":
						case "PolyhedronBufferGeometry":
							o = new mo[s.type](s.vertices, s.indices, s.radius, s.details);
							break;
						case "ShapeGeometry":
						case "ShapeBufferGeometry":
							for (var c = [], l = 0, h = s.shapes.length; l < h; l++) {
								var u = t[s.shapes[l]];
								c.push(u)
							}
							o = new mo[s.type](c, s.curveSegments);
							break;
						case "ExtrudeGeometry":
						case "ExtrudeBufferGeometry":
							for (c = [], l = 0, h = s.shapes.length; l < h; l++) {
								u = t[s.shapes[l]];
								c.push(u)
							}
							var p = s.options.extrudePath;
							void 0 !== p && (s.options.extrudePath = (new xs[p.type]).fromJSON(p)), o = new mo[s.type](c, s.options);
							break;
						case "BufferGeometry":
						case "InstancedBufferGeometry":
							o = i.parse(s);
							break;
						case "Geometry":
							console.error('THREE.ObjectLoader: Loading "Geometry" is not supported anymore.');
							break;
						default:
							console.warn('THREE.ObjectLoader: Unsupported geometry type "' + s.type + '"');
							continue
					}
					o.uuid = s.uuid, void 0 !== s.name && (o.name = s.name), !0 === o.isBufferGeometry && void 0 !== s.userData && (o.userData = s.userData), n[s.uuid] = o
				}
			return n
		},
		parseMaterials: function (e, t) {
			var n = {},
				i = {};
			if (void 0 !== e) {
				var r = new Ns;
				r.setTextures(t);
				for (var a = 0, o = e.length; a < o; a++) {
					var s = e[a];
					if ("MultiMaterial" === s.type) {
						for (var c = [], l = 0; l < s.materials.length; l++) {
							var h = s.materials[l];
							void 0 === n[h.uuid] && (n[h.uuid] = r.parse(h)), c.push(n[h.uuid])
						}
						i[s.uuid] = c
					} else void 0 === n[s.uuid] && (n[s.uuid] = r.parse(s)), i[s.uuid] = n[s.uuid]
				}
			}
			return i
		},
		parseAnimations: function (e) {
			for (var t = [], n = 0; n < e.length; n++) {
				var i = e[n],
					r = Ho.parse(i);
				void 0 !== i.uuid && (r.uuid = i.uuid), t.push(r)
			}
			return t
		},
		parseImages: function (e, t) {
			var n = this,
				i = {};

			function r(e) {
				return n.manager.itemStart(e), a.load(e, (function () {
					n.manager.itemEnd(e)
				}), void 0, (function () {
					n.manager.itemError(e), n.manager.itemEnd(e)
				}))
			}
			if (void 0 !== e && e.length > 0) {
				var a = new Ko(new Vo(t));
				a.setCrossOrigin(this.crossOrigin);
				for (var o = 0, s = e.length; o < s; o++) {
					var c = e[o],
						l = c.url;
					if (Array.isArray(l)) {
						i[c.uuid] = [];
						for (var h = 0, u = l.length; h < u; h++) {
							var p = l[h],
								d = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(p) ? p : n.resourcePath + p;
							i[c.uuid].push(r(d))
						}
					} else {
						d = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(c.url) ? c.url : n.resourcePath + c.url;
						i[c.uuid] = r(d)
					}
				}
			}
			return i
		},
		parseTextures: function (e, t) {
			function n(e, t) {
				return "number" == typeof e ? e : (console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", e), t[e])
			}
			var i = {};
			if (void 0 !== e)
				for (var r = 0, a = e.length; r < a; r++) {
					var o, s = e[r];
					void 0 === s.image && console.warn('THREE.ObjectLoader: No "image" specified for', s.uuid), void 0 === t[s.image] && console.warn("THREE.ObjectLoader: Undefined image", s.image), (o = Array.isArray(t[s.image]) ? new mn(t[s.image]) : new p(t[s.image])).needsUpdate = !0, o.uuid = s.uuid, void 0 !== s.name && (o.name = s.name), void 0 !== s.mapping && (o.mapping = n(s.mapping, js)), void 0 !== s.offset && o.offset.fromArray(s.offset), void 0 !== s.repeat && o.repeat.fromArray(s.repeat), void 0 !== s.center && o.center.fromArray(s.center), void 0 !== s.rotation && (o.rotation = s.rotation), void 0 !== s.wrap && (o.wrapS = n(s.wrap[0], Ws), o.wrapT = n(s.wrap[1], Ws)), void 0 !== s.format && (o.format = s.format), void 0 !== s.type && (o.type = s.type), void 0 !== s.encoding && (o.encoding = s.encoding), void 0 !== s.minFilter && (o.minFilter = n(s.minFilter, qs)), void 0 !== s.magFilter && (o.magFilter = n(s.magFilter, qs)), void 0 !== s.anisotropy && (o.anisotropy = s.anisotropy), void 0 !== s.flipY && (o.flipY = s.flipY), void 0 !== s.premultiplyAlpha && (o.premultiplyAlpha = s.premultiplyAlpha), void 0 !== s.unpackAlignment && (o.unpackAlignment = s.unpackAlignment), i[s.uuid] = o
				}
			return i
		},
		parseObject: function (e, t, n) {
			var i;

			function r(e) {
				return void 0 === t[e] && console.warn("THREE.ObjectLoader: Undefined geometry", e), t[e]
			}

			function a(e) {
				if (void 0 !== e) {
					if (Array.isArray(e)) {
						for (var t = [], i = 0, r = e.length; i < r; i++) {
							var a = e[i];
							void 0 === n[a] && console.warn("THREE.ObjectLoader: Undefined material", a), t.push(n[a])
						}
						return t
					}
					return void 0 === n[e] && console.warn("THREE.ObjectLoader: Undefined material", e), n[e]
				}
			}
			switch (e.type) {
				case "Scene":
					i = new q, void 0 !== e.background && Number.isInteger(e.background) && (i.background = new Ue(e.background)), void 0 !== e.fog && ("Fog" === e.fog.type ? i.fog = new tr(e.fog.color, e.fog.near, e.fog.far) : "FogExp2" === e.fog.type && (i.fog = new er(e.fog.color, e.fog.density)));
					break;
				case "PerspectiveCamera":
					i = new Vt(e.fov, e.aspect, e.near, e.far), void 0 !== e.focus && (i.focus = e.focus), void 0 !== e.zoom && (i.zoom = e.zoom), void 0 !== e.filmGauge && (i.filmGauge = e.filmGauge), void 0 !== e.filmOffset && (i.filmOffset = e.filmOffset), void 0 !== e.view && (i.view = Object.assign({}, e.view));
					break;
				case "OrthographicCamera":
					i = new Ps(e.left, e.right, e.top, e.bottom, e.near, e.far), void 0 !== e.zoom && (i.zoom = e.zoom), void 0 !== e.view && (i.view = Object.assign({}, e.view));
					break;
				case "AmbientLight":
					i = new Ds(e.color, e.intensity);
					break;
				case "DirectionalLight":
					i = new Os(e.color, e.intensity);
					break;
				case "PointLight":
					i = new Rs(e.color, e.intensity, e.distance, e.decay);
					break;
				case "RectAreaLight":
					i = new Is(e.color, e.intensity, e.width, e.height);
					break;
				case "SpotLight":
					i = new As(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay);
					break;
				case "HemisphereLight":
					i = new Ss(e.color, e.groundColor, e.intensity);
					break;
				case "SkinnedMesh":
					console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.");
				case "Mesh":
					i = new Lt(o = r(e.geometry), s = a(e.material));
					break;
				case "InstancedMesh":
					var o = r(e.geometry),
						s = a(e.material),
						c = e.count,
						l = e.instanceMatrix;
					(i = new Dr(o, s, c)).instanceMatrix = new We(new Float32Array(l.array), 16);
					break;
				case "LOD":
					i = new Mr;
					break;
				case "Line":
					i = new Hr(r(e.geometry), a(e.material), e.mode);
					break;
				case "LineLoop":
					i = new jr(r(e.geometry), a(e.material));
					break;
				case "LineSegments":
					i = new Vr(r(e.geometry), a(e.material));
					break;
				case "PointCloud":
				case "Points":
					i = new Jr(r(e.geometry), a(e.material));
					break;
				case "Sprite":
					i = new xr(a(e.material));
					break;
				case "Group":
					i = new Ki;
					break;
				default:
					i = new W
			}
			if (i.uuid = e.uuid, void 0 !== e.name && (i.name = e.name), void 0 !== e.matrix ? (i.matrix.fromArray(e.matrix), void 0 !== e.matrixAutoUpdate && (i.matrixAutoUpdate = e.matrixAutoUpdate), i.matrixAutoUpdate && i.matrix.decompose(i.position, i.quaternion, i.scale)) : (void 0 !== e.position && i.position.fromArray(e.position), void 0 !== e.rotation && i.rotation.fromArray(e.rotation), void 0 !== e.quaternion && i.quaternion.fromArray(e.quaternion), void 0 !== e.scale && i.scale.fromArray(e.scale)), void 0 !== e.castShadow && (i.castShadow = e.castShadow), void 0 !== e.receiveShadow && (i.receiveShadow = e.receiveShadow), e.shadow && (void 0 !== e.shadow.bias && (i.shadow.bias = e.shadow.bias), void 0 !== e.shadow.radius && (i.shadow.radius = e.shadow.radius), void 0 !== e.shadow.mapSize && i.shadow.mapSize.fromArray(e.shadow.mapSize), void 0 !== e.shadow.camera && (i.shadow.camera = this.parseObject(e.shadow.camera))), void 0 !== e.visible && (i.visible = e.visible), void 0 !== e.frustumCulled && (i.frustumCulled = e.frustumCulled), void 0 !== e.renderOrder && (i.renderOrder = e.renderOrder), void 0 !== e.userData && (i.userData = e.userData), void 0 !== e.layers && (i.layers.mask = e.layers), void 0 !== e.children)
				for (var h = e.children, u = 0; u < h.length; u++) i.add(this.parseObject(h[u], t, n));
			if ("LOD" === e.type) {
				void 0 !== e.autoUpdate && (i.autoUpdate = e.autoUpdate);
				for (var p = e.levels, d = 0; d < p.length; d++) {
					var f = p[d],
						m = i.getObjectByProperty("uuid", f.object);
					void 0 !== m && i.addLevel(m, f.distance)
				}
			}
			return i
		}
	});
	var Vs, js = {
			UVMapping: 300,
			CubeReflectionMapping: 301,
			CubeRefractionMapping: 302,
			EquirectangularReflectionMapping: 303,
			EquirectangularRefractionMapping: 304,
			SphericalReflectionMapping: 305,
			CubeUVReflectionMapping: 306,
			CubeUVRefractionMapping: 307
		},
		Ws = {
			RepeatWrapping: 1e3,
			ClampToEdgeWrapping: 1001,
			MirroredRepeatWrapping: 1002
		},
		qs = {
			NearestFilter: 1003,
			NearestMipmapNearestFilter: 1004,
			NearestMipmapLinearFilter: 1005,
			LinearFilter: 1006,
			LinearMipmapNearestFilter: 1007,
			LinearMipmapLinearFilter: 1008
		};

	function Xs(e) {
		"undefined" == typeof createImageBitmap && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), "undefined" == typeof fetch && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), Wo.call(this, e), this.options = void 0
	}

	function Ys() {
		this.type = "ShapePath", this.color = new Ue, this.subPaths = [], this.currentPath = null
	}

	function Zs(e) {
		this.type = "Font", this.data = e
	}

	function Js(e, t, n, i, r) {
		var a = r.glyphs[e] || r.glyphs["?"];
		if (a) {
			var o, s, c, l, h, u, p, d, f = new Ys;
			if (a.o)
				for (var m = a._cachedOutline || (a._cachedOutline = a.o.split(" ")), v = 0, g = m.length; v < g;) {
					switch (m[v++]) {
						case "m":
							o = m[v++] * t + n, s = m[v++] * t + i, f.moveTo(o, s);
							break;
						case "l":
							o = m[v++] * t + n, s = m[v++] * t + i, f.lineTo(o, s);
							break;
						case "q":
							c = m[v++] * t + n, l = m[v++] * t + i, h = m[v++] * t + n, u = m[v++] * t + i, f.quadraticCurveTo(h, u, c, l);
							break;
						case "b":
							c = m[v++] * t + n, l = m[v++] * t + i, h = m[v++] * t + n, u = m[v++] * t + i, p = m[v++] * t + n, d = m[v++] * t + i, f.bezierCurveTo(h, u, p, d, c, l)
					}
				}
			return {
				offsetX: a.ha * t,
				path: f
			}
		}
		console.error('THREE.Font: character "' + e + '" does not exists in font family ' + r.familyName + ".")
	}

	function Ks(e) {
		Wo.call(this, e)
	}
	Xs.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: Xs,
		setOptions: function (e) {
			return this.options = e, this
		},
		load: function (e, t, n, i) {
			void 0 === e && (e = ""), void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
			var r = this,
				a = ko.get(e);
			if (void 0 !== a) return r.manager.itemStart(e), setTimeout((function () {
				t && t(a), r.manager.itemEnd(e)
			}), 0), a;
			fetch(e).then((function (e) {
				return e.blob()
			})).then((function (e) {
				return void 0 === r.options ? createImageBitmap(e) : createImageBitmap(e, r.options)
			})).then((function (n) {
				ko.add(e, n), t && t(n), r.manager.itemEnd(e)
			})).catch((function (t) {
				i && i(t), r.manager.itemError(e), r.manager.itemEnd(e)
			})), r.manager.itemStart(e)
		}
	}), Object.assign(Ys.prototype, {
		moveTo: function (e, t) {
			return this.currentPath = new ws, this.subPaths.push(this.currentPath), this.currentPath.moveTo(e, t), this
		},
		lineTo: function (e, t) {
			return this.currentPath.lineTo(e, t), this
		},
		quadraticCurveTo: function (e, t, n, i) {
			return this.currentPath.quadraticCurveTo(e, t, n, i), this
		},
		bezierCurveTo: function (e, t, n, i, r, a) {
			return this.currentPath.bezierCurveTo(e, t, n, i, r, a), this
		},
		splineThru: function (e) {
			return this.currentPath.splineThru(e), this
		},
		toShapes: function (e, t) {
			function n(e) {
				for (var t = [], n = 0, i = e.length; n < i; n++) {
					var r = e[n],
						a = new _s;
					a.curves = r.curves, t.push(a)
				}
				return t
			}

			function i(e, t) {
				for (var n = t.length, i = !1, r = n - 1, a = 0; a < n; r = a++) {
					var o = t[r],
						s = t[a],
						c = s.x - o.x,
						l = s.y - o.y;
					if (Math.abs(l) > Number.EPSILON) {
						if (l < 0 && (o = t[a], c = -c, s = t[r], l = -l), e.y < o.y || e.y > s.y) continue;
						if (e.y === o.y) {
							if (e.x === o.x) return !0
						} else {
							var h = l * (e.x - o.x) - c * (e.y - o.y);
							if (0 === h) return !0;
							if (h < 0) continue;
							i = !i
						}
					} else {
						if (e.y !== o.y) continue;
						if (s.x <= e.x && e.x <= o.x || o.x <= e.x && e.x <= s.x) return !0
					}
				}
				return i
			}
			var r = Va.isClockWise,
				a = this.subPaths;
			if (0 === a.length) return [];
			if (!0 === t) return n(a);
			var o, s, c, l = [];
			if (1 === a.length) return s = a[0], (c = new _s).curves = s.curves, l.push(c), l;
			var h = !r(a[0].getPoints());
			h = e ? !h : h;
			var u, p, d = [],
				f = [],
				m = [],
				v = 0;
			f[v] = void 0, m[v] = [];
			for (var g = 0, y = a.length; g < y; g++) o = r(u = (s = a[g]).getPoints()), (o = e ? !o : o) ? (!h && f[v] && v++, f[v] = {
				s: new _s,
				p: u
			}, f[v].s.curves = s.curves, h && v++, m[v] = []) : m[v].push({
				h: s,
				p: u[0]
			});
			if (!f[0]) return n(a);
			if (f.length > 1) {
				for (var x = !1, b = [], w = 0, _ = f.length; w < _; w++) d[w] = [];
				for (w = 0, _ = f.length; w < _; w++)
					for (var M = m[w], S = 0; S < M.length; S++) {
						for (var T = M[S], E = !0, A = 0; A < f.length; A++) i(T.p, f[A].p) && (w !== A && b.push({
							froms: w,
							tos: A,
							hole: S
						}), E ? (E = !1, d[A].push(T)) : x = !0);
						E && d[w].push(T)
					}
				b.length > 0 && (x || (m = d))
			}
			g = 0;
			for (var L = f.length; g < L; g++) {
				c = f[g].s, l.push(c);
				for (var R = 0, P = (p = m[g]).length; R < P; R++) c.holes.push(p[R].h)
			}
			return l
		}
	}), Object.assign(Zs.prototype, {
		isFont: !0,
		generateShapes: function (e, t) {
			void 0 === t && (t = 100);
			for (var n = [], i = function (e, t, n) {
					for (var i = Array.from ? Array.from(e) : String(e).split(""), r = t / n.resolution, a = (n.boundingBox.yMax - n.boundingBox.yMin + n.underlineThickness) * r, o = [], s = 0, c = 0, l = 0; l < i.length; l++) {
						var h = i[l];
						if ("\n" === h) s = 0, c -= a;
						else {
							var u = Js(h, r, s, c, n);
							s += u.offsetX, o.push(u.path)
						}
					}
					return o
				}(e, t, this.data), r = 0, a = i.length; r < a; r++) Array.prototype.push.apply(n, i[r].toShapes());
			return n
		}
	}), Ks.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: Ks,
		load: function (e, t, n, i) {
			var r = this,
				a = new Xo(this.manager);
			a.setPath(this.path), a.load(e, (function (e) {
				var n;
				try {
					n = JSON.parse(e)
				} catch (t) {
					console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."), n = JSON.parse(e.substring(65, e.length - 2))
				}
				var i = r.parse(n);
				t && t(i)
			}), n, i)
		},
		parse: function (e) {
			return new Zs(e)
		}
	});
	var Qs = function () {
		return void 0 === Vs && (Vs = new(window.AudioContext || window.webkitAudioContext)), Vs
	};

	function $s(e) {
		Wo.call(this, e)
	}

	function ec() {
		this.coefficients = [];
		for (var e = 0; e < 9; e++) this.coefficients.push(new x)
	}

	function tc(e, t) {
		Ms.call(this, void 0, t), this.sh = void 0 !== e ? e : new ec
	}

	function nc(e, t, n) {
		tc.call(this, void 0, n);
		var i = (new Ue).set(e),
			r = (new Ue).set(t),
			a = new x(i.r, i.g, i.b),
			o = new x(r.r, r.g, r.b),
			s = Math.sqrt(Math.PI),
			c = s * Math.sqrt(.75);
		this.sh.coefficients[0].copy(a).add(o).multiplyScalar(s), this.sh.coefficients[1].copy(a).sub(o).multiplyScalar(c)
	}

	function ic(e, t) {
		tc.call(this, void 0, t);
		var n = (new Ue).set(e);
		this.sh.coefficients[0].set(n.r, n.g, n.b).multiplyScalar(2 * Math.sqrt(Math.PI))
	}
	$s.prototype = Object.assign(Object.create(Wo.prototype), {
		constructor: $s,
		load: function (e, t, n, i) {
			var r = new Xo(this.manager);
			r.setResponseType("arraybuffer"), r.setPath(this.path), r.load(e, (function (e) {
				var n = e.slice(0);
				Qs().decodeAudioData(n, (function (e) {
					t(e)
				}))
			}), n, i)
		}
	}), Object.assign(ec.prototype, {
		isSphericalHarmonics3: !0,
		set: function (e) {
			for (var t = 0; t < 9; t++) this.coefficients[t].copy(e[t]);
			return this
		},
		zero: function () {
			for (var e = 0; e < 9; e++) this.coefficients[e].set(0, 0, 0);
			return this
		},
		getAt: function (e, t) {
			var n = e.x,
				i = e.y,
				r = e.z,
				a = this.coefficients;
			return t.copy(a[0]).multiplyScalar(.282095), t.addScaledVector(a[1], .488603 * i), t.addScaledVector(a[2], .488603 * r), t.addScaledVector(a[3], .488603 * n), t.addScaledVector(a[4], n * i * 1.092548), t.addScaledVector(a[5], i * r * 1.092548), t.addScaledVector(a[6], .315392 * (3 * r * r - 1)), t.addScaledVector(a[7], n * r * 1.092548), t.addScaledVector(a[8], .546274 * (n * n - i * i)), t
		},
		getIrradianceAt: function (e, t) {
			var n = e.x,
				i = e.y,
				r = e.z,
				a = this.coefficients;
			return t.copy(a[0]).multiplyScalar(.886227), t.addScaledVector(a[1], 1.023328 * i), t.addScaledVector(a[2], 1.023328 * r), t.addScaledVector(a[3], 1.023328 * n), t.addScaledVector(a[4], .858086 * n * i), t.addScaledVector(a[5], .858086 * i * r), t.addScaledVector(a[6], .743125 * r * r - .247708), t.addScaledVector(a[7], .858086 * n * r), t.addScaledVector(a[8], .429043 * (n * n - i * i)), t
		},
		add: function (e) {
			for (var t = 0; t < 9; t++) this.coefficients[t].add(e.coefficients[t]);
			return this
		},
		addScaledSH: function (e, t) {
			for (var n = 0; n < 9; n++) this.coefficients[n].addScaledVector(e.coefficients[n], t);
			return this
		},
		scale: function (e) {
			for (var t = 0; t < 9; t++) this.coefficients[t].multiplyScalar(e);
			return this
		},
		lerp: function (e, t) {
			for (var n = 0; n < 9; n++) this.coefficients[n].lerp(e.coefficients[n], t);
			return this
		},
		equals: function (e) {
			for (var t = 0; t < 9; t++)
				if (!this.coefficients[t].equals(e.coefficients[t])) return !1;
			return !0
		},
		copy: function (e) {
			return this.set(e.coefficients)
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		fromArray: function (e, t) {
			void 0 === t && (t = 0);
			for (var n = this.coefficients, i = 0; i < 9; i++) n[i].fromArray(e, t + 3 * i);
			return this
		},
		toArray: function (e, t) {
			void 0 === e && (e = []), void 0 === t && (t = 0);
			for (var n = this.coefficients, i = 0; i < 9; i++) n[i].toArray(e, t + 3 * i);
			return e
		}
	}), Object.assign(ec, {
		getBasisAt: function (e, t) {
			var n = e.x,
				i = e.y,
				r = e.z;
			t[0] = .282095, t[1] = .488603 * i, t[2] = .488603 * r, t[3] = .488603 * n, t[4] = 1.092548 * n * i, t[5] = 1.092548 * i * r, t[6] = .315392 * (3 * r * r - 1), t[7] = 1.092548 * n * r, t[8] = .546274 * (n * n - i * i)
		}
	}), tc.prototype = Object.assign(Object.create(Ms.prototype), {
		constructor: tc,
		isLightProbe: !0,
		copy: function (e) {
			return Ms.prototype.copy.call(this, e), this.sh.copy(e.sh), this.intensity = e.intensity, this
		},
		toJSON: function (e) {
			return Ms.prototype.toJSON.call(this, e)
		}
	}), nc.prototype = Object.assign(Object.create(tc.prototype), {
		constructor: nc,
		isHemisphereLightProbe: !0,
		copy: function (e) {
			return tc.prototype.copy.call(this, e), this
		},
		toJSON: function (e) {
			return tc.prototype.toJSON.call(this, e)
		}
	}), ic.prototype = Object.assign(Object.create(tc.prototype), {
		constructor: ic,
		isAmbientLightProbe: !0,
		copy: function (e) {
			return tc.prototype.copy.call(this, e), this
		},
		toJSON: function (e) {
			return tc.prototype.toJSON.call(this, e)
		}
	});
	var rc = new A,
		ac = new A;

	function oc(e) {
		this.autoStart = void 0 === e || e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
	}
	Object.assign(function () {
		this.type = "StereoCamera", this.aspect = 1, this.eyeSep = .064, this.cameraL = new Vt, this.cameraL.layers.enable(1), this.cameraL.matrixAutoUpdate = !1, this.cameraR = new Vt, this.cameraR.layers.enable(2), this.cameraR.matrixAutoUpdate = !1, this._cache = {
			focus: null,
			fov: null,
			aspect: null,
			near: null,
			far: null,
			zoom: null,
			eyeSep: null
		}
	}.prototype, {
		update: function (e) {
			var t = this._cache;
			if (t.focus !== e.focus || t.fov !== e.fov || t.aspect !== e.aspect * this.aspect || t.near !== e.near || t.far !== e.far || t.zoom !== e.zoom || t.eyeSep !== this.eyeSep) {
				t.focus = e.focus, t.fov = e.fov, t.aspect = e.aspect * this.aspect, t.near = e.near, t.far = e.far, t.zoom = e.zoom, t.eyeSep = this.eyeSep;
				var n, i, r = e.projectionMatrix.clone(),
					a = t.eyeSep / 2,
					o = a * t.near / t.focus,
					c = t.near * Math.tan(s.DEG2RAD * t.fov * .5) / t.zoom;
				ac.elements[12] = -a, rc.elements[12] = a, n = -c * t.aspect + o, i = c * t.aspect + o, r.elements[0] = 2 * t.near / (i - n), r.elements[8] = (i + n) / (i - n), this.cameraL.projectionMatrix.copy(r), n = -c * t.aspect - o, i = c * t.aspect - o, r.elements[0] = 2 * t.near / (i - n), r.elements[8] = (i + n) / (i - n), this.cameraR.projectionMatrix.copy(r)
			}
			this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(ac), this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(rc)
		}
	}), Object.assign(oc.prototype, {
		start: function () {
			this.startTime = ("undefined" == typeof performance ? Date : performance).now(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0
		},
		stop: function () {
			this.getElapsedTime(), this.running = !1, this.autoStart = !1
		},
		getElapsedTime: function () {
			return this.getDelta(), this.elapsedTime
		},
		getDelta: function () {
			var e = 0;
			if (this.autoStart && !this.running) return this.start(), 0;
			if (this.running) {
				var t = ("undefined" == typeof performance ? Date : performance).now();
				e = (t - this.oldTime) / 1e3, this.oldTime = t, this.elapsedTime += e
			}
			return e
		}
	});
	var sc = new x,
		cc = new v,
		lc = new x,
		hc = new x;

	function uc() {
		W.call(this), this.type = "AudioListener", this.context = Qs(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.filter = null, this.timeDelta = 0, this._clock = new oc
	}

	function pc(e) {
		W.call(this), this.type = "Audio", this.listener = e, this.context = e.context, this.gain = this.context.createGain(), this.gain.connect(e.getInput()), this.autoplay = !1, this.buffer = null, this.detune = 0, this.loop = !1, this.loopStart = 0, this.loopEnd = 0, this.offset = 0, this.duration = void 0, this.playbackRate = 1, this.isPlaying = !1, this.hasPlaybackControl = !0, this.sourceType = "empty", this._startedAt = 0, this._pausedAt = 0, this.filters = []
	}
	uc.prototype = Object.assign(Object.create(W.prototype), {
		constructor: uc,
		getInput: function () {
			return this.gain
		},
		removeFilter: function () {
			return null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), this.gain.connect(this.context.destination), this.filter = null), this
		},
		getFilter: function () {
			return this.filter
		},
		setFilter: function (e) {
			return null !== this.filter ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination), this.filter = e, this.gain.connect(this.filter), this.filter.connect(this.context.destination), this
		},
		getMasterVolume: function () {
			return this.gain.gain.value
		},
		setMasterVolume: function (e) {
			return this.gain.gain.setTargetAtTime(e, this.context.currentTime, .01), this
		},
		updateMatrixWorld: function (e) {
			W.prototype.updateMatrixWorld.call(this, e);
			var t = this.context.listener,
				n = this.up;
			if (this.timeDelta = this._clock.getDelta(), this.matrixWorld.decompose(sc, cc, lc), hc.set(0, 0, -1).applyQuaternion(cc), t.positionX) {
				var i = this.context.currentTime + this.timeDelta;
				t.positionX.linearRampToValueAtTime(sc.x, i), t.positionY.linearRampToValueAtTime(sc.y, i), t.positionZ.linearRampToValueAtTime(sc.z, i), t.forwardX.linearRampToValueAtTime(hc.x, i), t.forwardY.linearRampToValueAtTime(hc.y, i), t.forwardZ.linearRampToValueAtTime(hc.z, i), t.upX.linearRampToValueAtTime(n.x, i), t.upY.linearRampToValueAtTime(n.y, i), t.upZ.linearRampToValueAtTime(n.z, i)
			} else t.setPosition(sc.x, sc.y, sc.z), t.setOrientation(hc.x, hc.y, hc.z, n.x, n.y, n.z)
		}
	}), pc.prototype = Object.assign(Object.create(W.prototype), {
		constructor: pc,
		getOutput: function () {
			return this.gain
		},
		setNodeSource: function (e) {
			return this.hasPlaybackControl = !1, this.sourceType = "audioNode", this.source = e, this.connect(), this
		},
		setMediaElementSource: function (e) {
			return this.hasPlaybackControl = !1, this.sourceType = "mediaNode", this.source = this.context.createMediaElementSource(e), this.connect(), this
		},
		setMediaStreamSource: function (e) {
			return this.hasPlaybackControl = !1, this.sourceType = "mediaStreamNode", this.source = this.context.createMediaStreamSource(e), this.connect(), this
		},
		setBuffer: function (e) {
			return this.buffer = e, this.sourceType = "buffer", this.autoplay && this.play(), this
		},
		play: function (e) {
			if (void 0 === e && (e = 0), !0 !== this.isPlaying) {
				if (!1 !== this.hasPlaybackControl) {
					this._startedAt = this.context.currentTime + e;
					var t = this.context.createBufferSource();
					return t.buffer = this.buffer, t.loop = this.loop, t.loopStart = this.loopStart, t.loopEnd = this.loopEnd, t.onended = this.onEnded.bind(this), t.start(this._startedAt, this._pausedAt + this.offset, this.duration), this.isPlaying = !0, this.source = t, this.setDetune(this.detune), this.setPlaybackRate(this.playbackRate), this.connect()
				}
				console.warn("THREE.Audio: this Audio has no playback control.")
			} else console.warn("THREE.Audio: Audio is already playing.")
		},
		pause: function () {
			if (!1 !== this.hasPlaybackControl) return !0 === this.isPlaying && (this._pausedAt += Math.max(this.context.currentTime - this._startedAt, 0) * this.playbackRate, this.source.stop(), this.source.onended = null, this.isPlaying = !1), this;
			console.warn("THREE.Audio: this Audio has no playback control.")
		},
		stop: function () {
			if (!1 !== this.hasPlaybackControl) return this._pausedAt = 0, this.source.stop(), this.source.onended = null, this.isPlaying = !1, this;
			console.warn("THREE.Audio: this Audio has no playback control.")
		},
		connect: function () {
			if (this.filters.length > 0) {
				this.source.connect(this.filters[0]);
				for (var e = 1, t = this.filters.length; e < t; e++) this.filters[e - 1].connect(this.filters[e]);
				this.filters[this.filters.length - 1].connect(this.getOutput())
			} else this.source.connect(this.getOutput());
			return this
		},
		disconnect: function () {
			if (this.filters.length > 0) {
				this.source.disconnect(this.filters[0]);
				for (var e = 1, t = this.filters.length; e < t; e++) this.filters[e - 1].disconnect(this.filters[e]);
				this.filters[this.filters.length - 1].disconnect(this.getOutput())
			} else this.source.disconnect(this.getOutput());
			return this
		},
		getFilters: function () {
			return this.filters
		},
		setFilters: function (e) {
			return e || (e = []), !0 === this.isPlaying ? (this.disconnect(), this.filters = e, this.connect()) : this.filters = e, this
		},
		setDetune: function (e) {
			if (this.detune = e, void 0 !== this.source.detune) return !0 === this.isPlaying && this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, .01), this
		},
		getDetune: function () {
			return this.detune
		},
		getFilter: function () {
			return this.getFilters()[0]
		},
		setFilter: function (e) {
			return this.setFilters(e ? [e] : [])
		},
		setPlaybackRate: function (e) {
			if (!1 !== this.hasPlaybackControl) return this.playbackRate = e, !0 === this.isPlaying && this.source.playbackRate.setTargetAtTime(this.playbackRate, this.context.currentTime, .01), this;
			console.warn("THREE.Audio: this Audio has no playback control.")
		},
		getPlaybackRate: function () {
			return this.playbackRate
		},
		onEnded: function () {
			this.isPlaying = !1
		},
		getLoop: function () {
			return !1 === this.hasPlaybackControl ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.loop
		},
		setLoop: function (e) {
			if (!1 !== this.hasPlaybackControl) return this.loop = e, !0 === this.isPlaying && (this.source.loop = this.loop), this;
			console.warn("THREE.Audio: this Audio has no playback control.")
		},
		setLoopStart: function (e) {
			return this.loopStart = e, this
		},
		setLoopEnd: function (e) {
			return this.loopEnd = e, this
		},
		getVolume: function () {
			return this.gain.gain.value
		},
		setVolume: function (e) {
			return this.gain.gain.setTargetAtTime(e, this.context.currentTime, .01), this
		}
	});
	var dc = new x,
		fc = new v,
		mc = new x,
		vc = new x;

	function gc(e) {
		pc.call(this, e), this.panner = this.context.createPanner(), this.panner.panningModel = "HRTF", this.panner.connect(this.gain)
	}

	function yc(e, t) {
		this.analyser = e.context.createAnalyser(), this.analyser.fftSize = void 0 !== t ? t : 2048, this.data = new Uint8Array(this.analyser.frequencyBinCount), e.getOutput().connect(this.analyser)
	}

	function xc(e, t, n) {
		this.binding = e, this.valueSize = n;
		var i, r = Float64Array;
		switch (t) {
			case "quaternion":
				i = this._slerp;
				break;
			case "string":
			case "bool":
				r = Array, i = this._select;
				break;
			default:
				i = this._lerp
		}
		this.buffer = new r(4 * n), this._mixBufferRegion = i, this.cumulativeWeight = 0, this.useCount = 0, this.referenceCount = 0
	}
	gc.prototype = Object.assign(Object.create(pc.prototype), {
		constructor: gc,
		getOutput: function () {
			return this.panner
		},
		getRefDistance: function () {
			return this.panner.refDistance
		},
		setRefDistance: function (e) {
			return this.panner.refDistance = e, this
		},
		getRolloffFactor: function () {
			return this.panner.rolloffFactor
		},
		setRolloffFactor: function (e) {
			return this.panner.rolloffFactor = e, this
		},
		getDistanceModel: function () {
			return this.panner.distanceModel
		},
		setDistanceModel: function (e) {
			return this.panner.distanceModel = e, this
		},
		getMaxDistance: function () {
			return this.panner.maxDistance
		},
		setMaxDistance: function (e) {
			return this.panner.maxDistance = e, this
		},
		setDirectionalCone: function (e, t, n) {
			return this.panner.coneInnerAngle = e, this.panner.coneOuterAngle = t, this.panner.coneOuterGain = n, this
		},
		updateMatrixWorld: function (e) {
			if (W.prototype.updateMatrixWorld.call(this, e), !0 !== this.hasPlaybackControl || !1 !== this.isPlaying) {
				this.matrixWorld.decompose(dc, fc, mc), vc.set(0, 0, 1).applyQuaternion(fc);
				var t = this.panner;
				if (t.positionX) {
					var n = this.context.currentTime + this.listener.timeDelta;
					t.positionX.linearRampToValueAtTime(dc.x, n), t.positionY.linearRampToValueAtTime(dc.y, n), t.positionZ.linearRampToValueAtTime(dc.z, n), t.orientationX.linearRampToValueAtTime(vc.x, n), t.orientationY.linearRampToValueAtTime(vc.y, n), t.orientationZ.linearRampToValueAtTime(vc.z, n)
				} else t.setPosition(dc.x, dc.y, dc.z), t.setOrientation(vc.x, vc.y, vc.z)
			}
		}
	}), Object.assign(yc.prototype, {
		getFrequencyData: function () {
			return this.analyser.getByteFrequencyData(this.data), this.data
		},
		getAverageFrequency: function () {
			for (var e = 0, t = this.getFrequencyData(), n = 0; n < t.length; n++) e += t[n];
			return e / t.length
		}
	}), Object.assign(xc.prototype, {
		accumulate: function (e, t) {
			var n = this.buffer,
				i = this.valueSize,
				r = e * i + i,
				a = this.cumulativeWeight;
			if (0 === a) {
				for (var o = 0; o !== i; ++o) n[r + o] = n[o];
				a = t
			} else {
				var s = t / (a += t);
				this._mixBufferRegion(n, r, 0, s, i)
			}
			this.cumulativeWeight = a
		},
		apply: function (e) {
			var t = this.valueSize,
				n = this.buffer,
				i = e * t + t,
				r = this.cumulativeWeight,
				a = this.binding;
			if (this.cumulativeWeight = 0, r < 1) {
				var o = 3 * t;
				this._mixBufferRegion(n, i, o, 1 - r, t)
			}
			for (var s = t, c = t + t; s !== c; ++s)
				if (n[s] !== n[s + t]) {
					a.setValue(n, i);
					break
				}
		},
		saveOriginalState: function () {
			var e = this.binding,
				t = this.buffer,
				n = this.valueSize,
				i = 3 * n;
			e.getValue(t, i);
			for (var r = n, a = i; r !== a; ++r) t[r] = t[i + r % n];
			this.cumulativeWeight = 0
		},
		restoreOriginalState: function () {
			var e = 3 * this.valueSize;
			this.binding.setValue(this.buffer, e)
		},
		_select: function (e, t, n, i, r) {
			if (i >= .5)
				for (var a = 0; a !== r; ++a) e[t + a] = e[n + a]
		},
		_slerp: function (e, t, n, i) {
			v.slerpFlat(e, t, e, t, e, n, i)
		},
		_lerp: function (e, t, n, i, r) {
			for (var a = 1 - i, o = 0; o !== r; ++o) {
				var s = t + o;
				e[s] = e[s] * a + e[n + o] * i
			}
		}
	});
	var bc = new RegExp("[\\[\\]\\.:\\/]", "g"),
		wc = "[^" + "\\[\\]\\.:\\/".replace("\\.", "") + "]",
		_c = /((?:WC+[\/:])*)/.source.replace("WC", "[^\\[\\]\\.:\\/]"),
		Mc = /(WCOD+)?/.source.replace("WCOD", wc),
		Sc = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", "[^\\[\\]\\.:\\/]"),
		Tc = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", "[^\\[\\]\\.:\\/]"),
		Ec = new RegExp("^" + _c + Mc + Sc + Tc + "$"),
		Ac = ["material", "materials", "bones"];

	function Lc(e, t, n) {
		var i = n || Rc.parseTrackName(t);
		this._targetGroup = e, this._bindings = e.subscribe_(t, i)
	}

	function Rc(e, t, n) {
		this.path = t, this.parsedPath = n || Rc.parseTrackName(t), this.node = Rc.findNode(e, this.parsedPath.nodeName) || e, this.rootNode = e
	}

	function Pc(e, t, n) {
		this._mixer = e, this._clip = t, this._localRoot = n || null;
		for (var i = t.tracks, r = i.length, a = new Array(r), o = {
				endingStart: 2400,
				endingEnd: 2400
			}, s = 0; s !== r; ++s) {
			var c = i[s].createInterpolant(null);
			a[s] = c, c.settings = o
		}
		this._interpolantSettings = o, this._interpolants = a, this._propertyBindings = new Array(r), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = 2201, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0
	}

	function Cc(e) {
		this._root = e, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1
	}

	function Oc(e) {
		"string" == typeof e && (console.warn("THREE.Uniform: Type parameter is no longer needed."), e = arguments[1]), this.value = e
	}

	function Dc(e, t, n) {
		nr.call(this, e, t), this.meshPerAttribute = n || 1
	}

	function Ic(e, t, n, i) {
		this.ray = new ge(e, t), this.near = n || 0, this.far = i || 1 / 0, this.camera = null, this.layers = new C, this.params = {
			Mesh: {},
			Line: {
				threshold: 1
			},
			LOD: {},
			Points: {
				threshold: 1
			},
			Sprite: {}
		}, Object.defineProperties(this.params, {
			PointCloud: {
				get: function () {
					return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."), this.Points
				}
			}
		})
	}

	function Nc(e, t) {
		return e.distance - t.distance
	}

	function Uc(e, t, n, i) {
		if (e.layers.test(t.layers) && e.raycast(t, n), !0 === i)
			for (var r = e.children, a = 0, o = r.length; a < o; a++) Uc(r[a], t, n, !0)
	}
	Object.assign(Lc.prototype, {
		getValue: function (e, t) {
			this.bind();
			var n = this._targetGroup.nCachedObjects_,
				i = this._bindings[n];
			void 0 !== i && i.getValue(e, t)
		},
		setValue: function (e, t) {
			for (var n = this._bindings, i = this._targetGroup.nCachedObjects_, r = n.length; i !== r; ++i) n[i].setValue(e, t)
		},
		bind: function () {
			for (var e = this._bindings, t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind()
		},
		unbind: function () {
			for (var e = this._bindings, t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind()
		}
	}), Object.assign(Rc, {
		Composite: Lc,
		create: function (e, t, n) {
			return e && e.isAnimationObjectGroup ? new Rc.Composite(e, t, n) : new Rc(e, t, n)
		},
		sanitizeNodeName: function (e) {
			return e.replace(/\s/g, "_").replace(bc, "")
		},
		parseTrackName: function (e) {
			var t = Ec.exec(e);
			if (!t) throw new Error("PropertyBinding: Cannot parse trackName: " + e);
			var n = {
					nodeName: t[2],
					objectName: t[3],
					objectIndex: t[4],
					propertyName: t[5],
					propertyIndex: t[6]
				},
				i = n.nodeName && n.nodeName.lastIndexOf(".");
			if (void 0 !== i && -1 !== i) {
				var r = n.nodeName.substring(i + 1); - 1 !== Ac.indexOf(r) && (n.nodeName = n.nodeName.substring(0, i), n.objectName = r)
			}
			if (null === n.propertyName || 0 === n.propertyName.length) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + e);
			return n
		},
		findNode: function (e, t) {
			if (!t || "" === t || "." === t || -1 === t || t === e.name || t === e.uuid) return e;
			if (e.skeleton) {
				var n = e.skeleton.getBoneByName(t);
				if (void 0 !== n) return n
			}
			if (e.children) {
				var i = function (e) {
						for (var n = 0; n < e.length; n++) {
							var r = e[n];
							if (r.name === t || r.uuid === t) return r;
							var a = i(r.children);
							if (a) return a
						}
						return null
					},
					r = i(e.children);
				if (r) return r
			}
			return null
		}
	}), Object.assign(Rc.prototype, {
		_getValue_unavailable: function () {},
		_setValue_unavailable: function () {},
		BindingType: {
			Direct: 0,
			EntireArray: 1,
			ArrayElement: 2,
			HasFromToArray: 3
		},
		Versioning: {
			None: 0,
			NeedsUpdate: 1,
			MatrixWorldNeedsUpdate: 2
		},
		GetterByBindingType: [function (e, t) {
			e[t] = this.node[this.propertyName]
		}, function (e, t) {
			for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) e[t++] = n[i]
		}, function (e, t) {
			e[t] = this.resolvedProperty[this.propertyIndex]
		}, function (e, t) {
			this.resolvedProperty.toArray(e, t)
		}],
		SetterByBindingTypeAndVersioning: [
			[function (e, t) {
				this.targetObject[this.propertyName] = e[t]
			}, function (e, t) {
				this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0
			}, function (e, t) {
				this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0
			}],
			[function (e, t) {
				for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) n[i] = e[t++]
			}, function (e, t) {
				for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) n[i] = e[t++];
				this.targetObject.needsUpdate = !0
			}, function (e, t) {
				for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) n[i] = e[t++];
				this.targetObject.matrixWorldNeedsUpdate = !0
			}],
			[function (e, t) {
				this.resolvedProperty[this.propertyIndex] = e[t]
			}, function (e, t) {
				this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0
			}, function (e, t) {
				this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0
			}],
			[function (e, t) {
				this.resolvedProperty.fromArray(e, t)
			}, function (e, t) {
				this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0
			}, function (e, t) {
				this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0
			}]
		],
		getValue: function (e, t) {
			this.bind(), this.getValue(e, t)
		},
		setValue: function (e, t) {
			this.bind(), this.setValue(e, t)
		},
		bind: function () {
			var e = this.node,
				t = this.parsedPath,
				n = t.objectName,
				i = t.propertyName,
				r = t.propertyIndex;
			if (e || (e = Rc.findNode(this.rootNode, t.nodeName) || this.rootNode, this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, e) {
				if (n) {
					var a = t.objectIndex;
					switch (n) {
						case "materials":
							if (!e.material) return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
							if (!e.material.materials) return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
							e = e.material.materials;
							break;
						case "bones":
							if (!e.skeleton) return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
							e = e.skeleton.bones;
							for (var o = 0; o < e.length; o++)
								if (e[o].name === a) {
									a = o;
									break
								}
							break;
						default:
							if (void 0 === e[n]) return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
							e = e[n]
					}
					if (void 0 !== a) {
						if (void 0 === e[a]) return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e);
						e = e[a]
					}
				}
				var s = e[i];
				if (void 0 !== s) {
					var c = this.Versioning.None;
					this.targetObject = e, void 0 !== e.needsUpdate ? c = this.Versioning.NeedsUpdate : void 0 !== e.matrixWorldNeedsUpdate && (c = this.Versioning.MatrixWorldNeedsUpdate);
					var l = this.BindingType.Direct;
					if (void 0 !== r) {
						if ("morphTargetInfluences" === i) {
							if (!e.geometry) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
							if (e.geometry.isBufferGeometry) {
								if (!e.geometry.morphAttributes) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
								for (o = 0; o < this.node.geometry.morphAttributes.position.length; o++)
									if (e.geometry.morphAttributes.position[o].name === r) {
										r = o;
										break
									}
							} else {
								if (!e.geometry.morphTargets) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.", this);
								for (o = 0; o < this.node.geometry.morphTargets.length; o++)
									if (e.geometry.morphTargets[o].name === r) {
										r = o;
										break
									}
							}
						}
						l = this.BindingType.ArrayElement, this.resolvedProperty = s, this.propertyIndex = r
					} else void 0 !== s.fromArray && void 0 !== s.toArray ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = s) : Array.isArray(s) ? (l = this.BindingType.EntireArray, this.resolvedProperty = s) : this.propertyName = i;
					this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][c]
				} else {
					var h = t.nodeName;
					console.error("THREE.PropertyBinding: Trying to update property for track: " + h + "." + i + " but it wasn't found.", e)
				}
			} else console.error("THREE.PropertyBinding: Trying to update node for track: " + this.path + " but it wasn't found.")
		},
		unbind: function () {
			this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound
		}
	}), Object.assign(Rc.prototype, {
		_getValue_unbound: Rc.prototype.getValue,
		_setValue_unbound: Rc.prototype.setValue
	}), Object.assign(function () {
		this.uuid = s.generateUUID(), this._objects = Array.prototype.slice.call(arguments), this.nCachedObjects_ = 0;
		var e = {};
		this._indicesByUUID = e;
		for (var t = 0, n = arguments.length; t !== n; ++t) e[arguments[t].uuid] = t;
		this._paths = [], this._parsedPaths = [], this._bindings = [], this._bindingsIndicesByPath = {};
		var i = this;
		this.stats = {
			objects: {
				get total() {
					return i._objects.length
				},
				get inUse() {
					return this.total - i.nCachedObjects_
				}
			},
			get bindingsPerObject() {
				return i._bindings.length
			}
		}
	}.prototype, {
		isAnimationObjectGroup: !0,
		add: function () {
			for (var e = this._objects, t = e.length, n = this.nCachedObjects_, i = this._indicesByUUID, r = this._paths, a = this._parsedPaths, o = this._bindings, s = o.length, c = void 0, l = 0, h = arguments.length; l !== h; ++l) {
				var u = arguments[l],
					p = u.uuid,
					d = i[p];
				if (void 0 === d) {
					d = t++, i[p] = d, e.push(u);
					for (var f = 0, m = s; f !== m; ++f) o[f].push(new Rc(u, r[f], a[f]))
				} else if (d < n) {
					c = e[d];
					var v = --n,
						g = e[v];
					i[g.uuid] = d, e[d] = g, i[p] = v, e[v] = u;
					for (f = 0, m = s; f !== m; ++f) {
						var y = o[f],
							x = y[v],
							b = y[d];
						y[d] = x, void 0 === b && (b = new Rc(u, r[f], a[f])), y[v] = b
					}
				} else e[d] !== c && console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")
			}
			this.nCachedObjects_ = n
		},
		remove: function () {
			for (var e = this._objects, t = this.nCachedObjects_, n = this._indicesByUUID, i = this._bindings, r = i.length, a = 0, o = arguments.length; a !== o; ++a) {
				var s = arguments[a],
					c = s.uuid,
					l = n[c];
				if (void 0 !== l && l >= t) {
					var h = t++,
						u = e[h];
					n[u.uuid] = l, e[l] = u, n[c] = h, e[h] = s;
					for (var p = 0, d = r; p !== d; ++p) {
						var f = i[p],
							m = f[h],
							v = f[l];
						f[l] = m, f[h] = v
					}
				}
			}
			this.nCachedObjects_ = t
		},
		uncache: function () {
			for (var e = this._objects, t = e.length, n = this.nCachedObjects_, i = this._indicesByUUID, r = this._bindings, a = r.length, o = 0, s = arguments.length; o !== s; ++o) {
				var c = arguments[o],
					l = c.uuid,
					h = i[l];
				if (void 0 !== h)
					if (delete i[l], h < n) {
						var u = --n,
							p = e[u],
							d = e[y = --t];
						i[p.uuid] = h, e[h] = p, i[d.uuid] = u, e[u] = d, e.pop();
						for (var f = 0, m = a; f !== m; ++f) {
							var v = (x = r[f])[u],
								g = x[y];
							x[h] = v, x[u] = g, x.pop()
						}
					} else {
						var y;
						i[(d = e[y = --t]).uuid] = h, e[h] = d, e.pop();
						for (f = 0, m = a; f !== m; ++f) {
							var x;
							(x = r[f])[h] = x[y], x.pop()
						}
					}
			}
			this.nCachedObjects_ = n
		},
		subscribe_: function (e, t) {
			var n = this._bindingsIndicesByPath,
				i = n[e],
				r = this._bindings;
			if (void 0 !== i) return r[i];
			var a = this._paths,
				o = this._parsedPaths,
				s = this._objects,
				c = s.length,
				l = this.nCachedObjects_,
				h = new Array(c);
			i = r.length, n[e] = i, a.push(e), o.push(t), r.push(h);
			for (var u = l, p = s.length; u !== p; ++u) {
				var d = s[u];
				h[u] = new Rc(d, e, t)
			}
			return h
		},
		unsubscribe_: function (e) {
			var t = this._bindingsIndicesByPath,
				n = t[e];
			if (void 0 !== n) {
				var i = this._paths,
					r = this._parsedPaths,
					a = this._bindings,
					o = a.length - 1,
					s = a[o];
				t[e[o]] = n, a[n] = s, a.pop(), r[n] = r[o], r.pop(), i[n] = i[o], i.pop()
			}
		}
	}), Object.assign(Pc.prototype, {
		play: function () {
			return this._mixer._activateAction(this), this
		},
		stop: function () {
			return this._mixer._deactivateAction(this), this.reset()
		},
		reset: function () {
			return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping()
		},
		isRunning: function () {
			return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this)
		},
		isScheduled: function () {
			return this._mixer._isActiveAction(this)
		},
		startAt: function (e) {
			return this._startTime = e, this
		},
		setLoop: function (e, t) {
			return this.loop = e, this.repetitions = t, this
		},
		setEffectiveWeight: function (e) {
			return this.weight = e, this._effectiveWeight = this.enabled ? e : 0, this.stopFading()
		},
		getEffectiveWeight: function () {
			return this._effectiveWeight
		},
		fadeIn: function (e) {
			return this._scheduleFading(e, 0, 1)
		},
		fadeOut: function (e) {
			return this._scheduleFading(e, 1, 0)
		},
		crossFadeFrom: function (e, t, n) {
			if (e.fadeOut(t), this.fadeIn(t), n) {
				var i = this._clip.duration,
					r = e._clip.duration,
					a = r / i,
					o = i / r;
				e.warp(1, a, t), this.warp(o, 1, t)
			}
			return this
		},
		crossFadeTo: function (e, t, n) {
			return e.crossFadeFrom(this, t, n)
		},
		stopFading: function () {
			var e = this._weightInterpolant;
			return null !== e && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(e)), this
		},
		setEffectiveTimeScale: function (e) {
			return this.timeScale = e, this._effectiveTimeScale = this.paused ? 0 : e, this.stopWarping()
		},
		getEffectiveTimeScale: function () {
			return this._effectiveTimeScale
		},
		setDuration: function (e) {
			return this.timeScale = this._clip.duration / e, this.stopWarping()
		},
		syncWith: function (e) {
			return this.time = e.time, this.timeScale = e.timeScale, this.stopWarping()
		},
		halt: function (e) {
			return this.warp(this._effectiveTimeScale, 0, e)
		},
		warp: function (e, t, n) {
			var i = this._mixer,
				r = i.time,
				a = this._timeScaleInterpolant,
				o = this.timeScale;
			null === a && (a = i._lendControlInterpolant(), this._timeScaleInterpolant = a);
			var s = a.parameterPositions,
				c = a.sampleValues;
			return s[0] = r, s[1] = r + n, c[0] = e / o, c[1] = t / o, this
		},
		stopWarping: function () {
			var e = this._timeScaleInterpolant;
			return null !== e && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(e)), this
		},
		getMixer: function () {
			return this._mixer
		},
		getClip: function () {
			return this._clip
		},
		getRoot: function () {
			return this._localRoot || this._mixer._root
		},
		_update: function (e, t, n, i) {
			if (this.enabled) {
				var r = this._startTime;
				if (null !== r) {
					var a = (e - r) * n;
					if (a < 0 || 0 === n) return;
					this._startTime = null, t = n * a
				}
				t *= this._updateTimeScale(e);
				var o = this._updateTime(t),
					s = this._updateWeight(e);
				if (s > 0)
					for (var c = this._interpolants, l = this._propertyBindings, h = 0, u = c.length; h !== u; ++h) c[h].evaluate(o), l[h].accumulate(i, s)
			} else this._updateWeight(e)
		},
		_updateWeight: function (e) {
			var t = 0;
			if (this.enabled) {
				t = this.weight;
				var n = this._weightInterpolant;
				if (null !== n) {
					var i = n.evaluate(e)[0];
					t *= i, e > n.parameterPositions[1] && (this.stopFading(), 0 === i && (this.enabled = !1))
				}
			}
			return this._effectiveWeight = t, t
		},
		_updateTimeScale: function (e) {
			var t = 0;
			if (!this.paused) {
				t = this.timeScale;
				var n = this._timeScaleInterpolant;
				if (null !== n) t *= n.evaluate(e)[0], e > n.parameterPositions[1] && (this.stopWarping(), 0 === t ? this.paused = !0 : this.timeScale = t)
			}
			return this._effectiveTimeScale = t, t
		},
		_updateTime: function (e) {
			var t = this.time + e,
				n = this._clip.duration,
				i = this.loop,
				r = this._loopCount,
				a = 2202 === i;
			if (0 === e) return -1 === r ? t : a && 1 == (1 & r) ? n - t : t;
			if (2200 === i) {
				-1 === r && (this._loopCount = 0, this._setEndings(!0, !0, !1));
				e: {
					if (t >= n) t = n;
					else {
						if (!(t < 0)) {
							this.time = t;
							break e
						}
						t = 0
					}
					this.clampWhenFinished ? this.paused = !0 : this.enabled = !1,
					this.time = t,
					this._mixer.dispatchEvent({
						type: "finished",
						action: this,
						direction: e < 0 ? -1 : 1
					})
				}
			} else {
				if (-1 === r && (e >= 0 ? (r = 0, this._setEndings(!0, 0 === this.repetitions, a)) : this._setEndings(0 === this.repetitions, !0, a)), t >= n || t < 0) {
					var o = Math.floor(t / n);
					t -= n * o, r += Math.abs(o);
					var s = this.repetitions - r;
					if (s <= 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, t = e > 0 ? n : 0, this.time = t, this._mixer.dispatchEvent({
						type: "finished",
						action: this,
						direction: e > 0 ? 1 : -1
					});
					else {
						if (1 === s) {
							var c = e < 0;
							this._setEndings(c, !c, a)
						} else this._setEndings(!1, !1, a);
						this._loopCount = r, this.time = t, this._mixer.dispatchEvent({
							type: "loop",
							action: this,
							loopDelta: o
						})
					}
				} else this.time = t;
				if (a && 1 == (1 & r)) return n - t
			}
			return t
		},
		_setEndings: function (e, t, n) {
			var i = this._interpolantSettings;
			n ? (i.endingStart = 2401, i.endingEnd = 2401) : (i.endingStart = e ? this.zeroSlopeAtStart ? 2401 : 2400 : 2402, i.endingEnd = t ? this.zeroSlopeAtEnd ? 2401 : 2400 : 2402)
		},
		_scheduleFading: function (e, t, n) {
			var i = this._mixer,
				r = i.time,
				a = this._weightInterpolant;
			null === a && (a = i._lendControlInterpolant(), this._weightInterpolant = a);
			var o = a.parameterPositions,
				s = a.sampleValues;
			return o[0] = r, s[0] = t, o[1] = r + e, s[1] = n, this
		}
	}), Cc.prototype = Object.assign(Object.create(i.prototype), {
		constructor: Cc,
		_bindAction: function (e, t) {
			var n = e._localRoot || this._root,
				i = e._clip.tracks,
				r = i.length,
				a = e._propertyBindings,
				o = e._interpolants,
				s = n.uuid,
				c = this._bindingsByRootAndName,
				l = c[s];
			void 0 === l && (l = {}, c[s] = l);
			for (var h = 0; h !== r; ++h) {
				var u = i[h],
					p = u.name,
					d = l[p];
				if (void 0 !== d) a[h] = d;
				else {
					if (void 0 !== (d = a[h])) {
						null === d._cacheIndex && (++d.referenceCount, this._addInactiveBinding(d, s, p));
						continue
					}
					var f = t && t._propertyBindings[h].binding.parsedPath;
					++(d = new xc(Rc.create(n, p, f), u.ValueTypeName, u.getValueSize())).referenceCount, this._addInactiveBinding(d, s, p), a[h] = d
				}
				o[h].resultBuffer = d.buffer
			}
		},
		_activateAction: function (e) {
			if (!this._isActiveAction(e)) {
				if (null === e._cacheIndex) {
					var t = (e._localRoot || this._root).uuid,
						n = e._clip.uuid,
						i = this._actionsByClip[n];
					this._bindAction(e, i && i.knownActions[0]), this._addInactiveAction(e, n, t)
				}
				for (var r = e._propertyBindings, a = 0, o = r.length; a !== o; ++a) {
					var s = r[a];
					0 == s.useCount++ && (this._lendBinding(s), s.saveOriginalState())
				}
				this._lendAction(e)
			}
		},
		_deactivateAction: function (e) {
			if (this._isActiveAction(e)) {
				for (var t = e._propertyBindings, n = 0, i = t.length; n !== i; ++n) {
					var r = t[n];
					0 == --r.useCount && (r.restoreOriginalState(), this._takeBackBinding(r))
				}
				this._takeBackAction(e)
			}
		},
		_initMemoryManager: function () {
			this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
			var e = this;
			this.stats = {
				actions: {
					get total() {
						return e._actions.length
					},
					get inUse() {
						return e._nActiveActions
					}
				},
				bindings: {
					get total() {
						return e._bindings.length
					},
					get inUse() {
						return e._nActiveBindings
					}
				},
				controlInterpolants: {
					get total() {
						return e._controlInterpolants.length
					},
					get inUse() {
						return e._nActiveControlInterpolants
					}
				}
			}
		},
		_isActiveAction: function (e) {
			var t = e._cacheIndex;
			return null !== t && t < this._nActiveActions
		},
		_addInactiveAction: function (e, t, n) {
			var i = this._actions,
				r = this._actionsByClip,
				a = r[t];
			if (void 0 === a) a = {
				knownActions: [e],
				actionByRoot: {}
			}, e._byClipCacheIndex = 0, r[t] = a;
			else {
				var o = a.knownActions;
				e._byClipCacheIndex = o.length, o.push(e)
			}
			e._cacheIndex = i.length, i.push(e), a.actionByRoot[n] = e
		},
		_removeInactiveAction: function (e) {
			var t = this._actions,
				n = t[t.length - 1],
				i = e._cacheIndex;
			n._cacheIndex = i, t[i] = n, t.pop(), e._cacheIndex = null;
			var r = e._clip.uuid,
				a = this._actionsByClip,
				o = a[r],
				s = o.knownActions,
				c = s[s.length - 1],
				l = e._byClipCacheIndex;
			c._byClipCacheIndex = l, s[l] = c, s.pop(), e._byClipCacheIndex = null, delete o.actionByRoot[(e._localRoot || this._root).uuid], 0 === s.length && delete a[r], this._removeInactiveBindingsForAction(e)
		},
		_removeInactiveBindingsForAction: function (e) {
			for (var t = e._propertyBindings, n = 0, i = t.length; n !== i; ++n) {
				var r = t[n];
				0 == --r.referenceCount && this._removeInactiveBinding(r)
			}
		},
		_lendAction: function (e) {
			var t = this._actions,
				n = e._cacheIndex,
				i = this._nActiveActions++,
				r = t[i];
			e._cacheIndex = i, t[i] = e, r._cacheIndex = n, t[n] = r
		},
		_takeBackAction: function (e) {
			var t = this._actions,
				n = e._cacheIndex,
				i = --this._nActiveActions,
				r = t[i];
			e._cacheIndex = i, t[i] = e, r._cacheIndex = n, t[n] = r
		},
		_addInactiveBinding: function (e, t, n) {
			var i = this._bindingsByRootAndName,
				r = i[t],
				a = this._bindings;
			void 0 === r && (r = {}, i[t] = r), r[n] = e, e._cacheIndex = a.length, a.push(e)
		},
		_removeInactiveBinding: function (e) {
			var t = this._bindings,
				n = e.binding,
				i = n.rootNode.uuid,
				r = n.path,
				a = this._bindingsByRootAndName,
				o = a[i],
				s = t[t.length - 1],
				c = e._cacheIndex;
			s._cacheIndex = c, t[c] = s, t.pop(), delete o[r], 0 === Object.keys(o).length && delete a[i]
		},
		_lendBinding: function (e) {
			var t = this._bindings,
				n = e._cacheIndex,
				i = this._nActiveBindings++,
				r = t[i];
			e._cacheIndex = i, t[i] = e, r._cacheIndex = n, t[n] = r
		},
		_takeBackBinding: function (e) {
			var t = this._bindings,
				n = e._cacheIndex,
				i = --this._nActiveBindings,
				r = t[i];
			e._cacheIndex = i, t[i] = e, r._cacheIndex = n, t[n] = r
		},
		_lendControlInterpolant: function () {
			var e = this._controlInterpolants,
				t = this._nActiveControlInterpolants++,
				n = e[t];
			return void 0 === n && ((n = new Po(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer)).__cacheIndex = t, e[t] = n), n
		},
		_takeBackControlInterpolant: function (e) {
			var t = this._controlInterpolants,
				n = e.__cacheIndex,
				i = --this._nActiveControlInterpolants,
				r = t[i];
			e.__cacheIndex = i, t[i] = e, r.__cacheIndex = n, t[n] = r
		},
		_controlInterpolantsResultBuffer: new Float32Array(1),
		clipAction: function (e, t) {
			var n = t || this._root,
				i = n.uuid,
				r = "string" == typeof e ? Ho.findByName(n, e) : e,
				a = null !== r ? r.uuid : e,
				o = this._actionsByClip[a],
				s = null;
			if (void 0 !== o) {
				var c = o.actionByRoot[i];
				if (void 0 !== c) return c;
				s = o.knownActions[0], null === r && (r = s._clip)
			}
			if (null === r) return null;
			var l = new Pc(this, r, t);
			return this._bindAction(l, s), this._addInactiveAction(l, a, i), l
		},
		existingAction: function (e, t) {
			var n = t || this._root,
				i = n.uuid,
				r = "string" == typeof e ? Ho.findByName(n, e) : e,
				a = r ? r.uuid : e,
				o = this._actionsByClip[a];
			return void 0 !== o && o.actionByRoot[i] || null
		},
		stopAllAction: function () {
			var e = this._actions,
				t = this._nActiveActions,
				n = this._bindings,
				i = this._nActiveBindings;
			this._nActiveActions = 0, this._nActiveBindings = 0;
			for (var r = 0; r !== t; ++r) e[r].reset();
			for (r = 0; r !== i; ++r) n[r].useCount = 0;
			return this
		},
		update: function (e) {
			e *= this.timeScale;
			for (var t = this._actions, n = this._nActiveActions, i = this.time += e, r = Math.sign(e), a = this._accuIndex ^= 1, o = 0; o !== n; ++o) {
				t[o]._update(i, e, r, a)
			}
			var s = this._bindings,
				c = this._nActiveBindings;
			for (o = 0; o !== c; ++o) s[o].apply(a);
			return this
		},
		setTime: function (e) {
			this.time = 0;
			for (var t = 0; t < this._actions.length; t++) this._actions[t].time = 0;
			return this.update(e)
		},
		getRoot: function () {
			return this._root
		},
		uncacheClip: function (e) {
			var t = this._actions,
				n = e.uuid,
				i = this._actionsByClip,
				r = i[n];
			if (void 0 !== r) {
				for (var a = r.knownActions, o = 0, s = a.length; o !== s; ++o) {
					var c = a[o];
					this._deactivateAction(c);
					var l = c._cacheIndex,
						h = t[t.length - 1];
					c._cacheIndex = null, c._byClipCacheIndex = null, h._cacheIndex = l, t[l] = h, t.pop(), this._removeInactiveBindingsForAction(c)
				}
				delete i[n]
			}
		},
		uncacheRoot: function (e) {
			var t = e.uuid,
				n = this._actionsByClip;
			for (var i in n) {
				var r = n[i].actionByRoot[t];
				void 0 !== r && (this._deactivateAction(r), this._removeInactiveAction(r))
			}
			var a = this._bindingsByRootAndName[t];
			if (void 0 !== a)
				for (var o in a) {
					var s = a[o];
					s.restoreOriginalState(), this._removeInactiveBinding(s)
				}
		},
		uncacheAction: function (e, t) {
			var n = this.existingAction(e, t);
			null !== n && (this._deactivateAction(n), this._removeInactiveAction(n))
		}
	}), Oc.prototype.clone = function () {
		return new Oc(void 0 === this.value.clone ? this.value : this.value.clone())
	}, Dc.prototype = Object.assign(Object.create(nr.prototype), {
		constructor: Dc,
		isInstancedInterleavedBuffer: !0,
		copy: function (e) {
			return nr.prototype.copy.call(this, e), this.meshPerAttribute = e.meshPerAttribute, this
		}
	}), Object.assign(Ic.prototype, {
		set: function (e, t) {
			this.ray.set(e, t)
		},
		setFromCamera: function (e, t) {
			t && t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, .5).unproject(t).sub(this.ray.origin).normalize(), this.camera = t) : t && t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, (t.near + t.far) / (t.near - t.far)).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld), this.camera = t) : console.error("THREE.Raycaster: Unsupported camera type.")
		},
		intersectObject: function (e, t, n) {
			var i = n || [];
			return Uc(e, this, i, t), i.sort(Nc), i
		},
		intersectObjects: function (e, t, n) {
			var i = n || [];
			if (!1 === Array.isArray(e)) return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), i;
			for (var r = 0, a = e.length; r < a; r++) Uc(e[r], this, i, t);
			return i.sort(Nc), i
		}
	}), Object.assign(function (e, t, n) {
		return this.radius = void 0 !== e ? e : 1, this.phi = void 0 !== t ? t : 0, this.theta = void 0 !== n ? n : 0, this
	}.prototype, {
		set: function (e, t, n) {
			return this.radius = e, this.phi = t, this.theta = n, this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this
		},
		makeSafe: function () {
			return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this
		},
		setFromVector3: function (e) {
			return this.setFromCartesianCoords(e.x, e.y, e.z)
		},
		setFromCartesianCoords: function (e, t, n) {
			return this.radius = Math.sqrt(e * e + t * t + n * n), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(s.clamp(t / this.radius, -1, 1))), this
		}
	}), Object.assign(function (e, t, n) {
		return this.radius = void 0 !== e ? e : 1, this.theta = void 0 !== t ? t : 0, this.y = void 0 !== n ? n : 0, this
	}.prototype, {
		set: function (e, t, n) {
			return this.radius = e, this.theta = t, this.y = n, this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.radius = e.radius, this.theta = e.theta, this.y = e.y, this
		},
		setFromVector3: function (e) {
			return this.setFromCartesianCoords(e.x, e.y, e.z)
		},
		setFromCartesianCoords: function (e, t, n) {
			return this.radius = Math.sqrt(e * e + n * n), this.theta = Math.atan2(e, n), this.y = t, this
		}
	});
	var zc = new c;

	function Fc(e, t) {
		this.min = void 0 !== e ? e : new c(1 / 0, 1 / 0), this.max = void 0 !== t ? t : new c(-1 / 0, -1 / 0)
	}
	Object.assign(Fc.prototype, {
		set: function (e, t) {
			return this.min.copy(e), this.max.copy(t), this
		},
		setFromPoints: function (e) {
			this.makeEmpty();
			for (var t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
			return this
		},
		setFromCenterAndSize: function (e, t) {
			var n = zc.copy(t).multiplyScalar(.5);
			return this.min.copy(e).sub(n), this.max.copy(e).add(n), this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.min.copy(e.min), this.max.copy(e.max), this
		},
		makeEmpty: function () {
			return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -1 / 0, this
		},
		isEmpty: function () {
			return this.max.x < this.min.x || this.max.y < this.min.y
		},
		getCenter: function (e) {
			return void 0 === e && (console.warn("THREE.Box2: .getCenter() target is now required"), e = new c), this.isEmpty() ? e.set(0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
		},
		getSize: function (e) {
			return void 0 === e && (console.warn("THREE.Box2: .getSize() target is now required"), e = new c), this.isEmpty() ? e.set(0, 0) : e.subVectors(this.max, this.min)
		},
		expandByPoint: function (e) {
			return this.min.min(e), this.max.max(e), this
		},
		expandByVector: function (e) {
			return this.min.sub(e), this.max.add(e), this
		},
		expandByScalar: function (e) {
			return this.min.addScalar(-e), this.max.addScalar(e), this
		},
		containsPoint: function (e) {
			return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y)
		},
		containsBox: function (e) {
			return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y
		},
		getParameter: function (e, t) {
			return void 0 === t && (console.warn("THREE.Box2: .getParameter() target is now required"), t = new c), t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y))
		},
		intersectsBox: function (e) {
			return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y)
		},
		clampPoint: function (e, t) {
			return void 0 === t && (console.warn("THREE.Box2: .clampPoint() target is now required"), t = new c), t.copy(e).clamp(this.min, this.max)
		},
		distanceToPoint: function (e) {
			return zc.copy(e).clamp(this.min, this.max).sub(e).length()
		},
		intersect: function (e) {
			return this.min.max(e.min), this.max.min(e.max), this
		},
		union: function (e) {
			return this.min.min(e.min), this.max.max(e.max), this
		},
		translate: function (e) {
			return this.min.add(e), this.max.add(e), this
		},
		equals: function (e) {
			return e.min.equals(this.min) && e.max.equals(this.max)
		}
	});
	var Bc = new x,
		Hc = new x;

	function Gc(e, t) {
		this.start = void 0 !== e ? e : new x, this.end = void 0 !== t ? t : new x
	}

	function kc(e) {
		W.call(this), this.material = e, this.render = function () {}
	}
	Object.assign(Gc.prototype, {
		set: function (e, t) {
			return this.start.copy(e), this.end.copy(t), this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		},
		copy: function (e) {
			return this.start.copy(e.start), this.end.copy(e.end), this
		},
		getCenter: function (e) {
			return void 0 === e && (console.warn("THREE.Line3: .getCenter() target is now required"), e = new x), e.addVectors(this.start, this.end).multiplyScalar(.5)
		},
		delta: function (e) {
			return void 0 === e && (console.warn("THREE.Line3: .delta() target is now required"), e = new x), e.subVectors(this.end, this.start)
		},
		distanceSq: function () {
			return this.start.distanceToSquared(this.end)
		},
		distance: function () {
			return this.start.distanceTo(this.end)
		},
		at: function (e, t) {
			return void 0 === t && (console.warn("THREE.Line3: .at() target is now required"), t = new x), this.delta(t).multiplyScalar(e).add(this.start)
		},
		closestPointToPointParameter: function (e, t) {
			Bc.subVectors(e, this.start), Hc.subVectors(this.end, this.start);
			var n = Hc.dot(Hc),
				i = Hc.dot(Bc) / n;
			return t && (i = s.clamp(i, 0, 1)), i
		},
		closestPointToPoint: function (e, t, n) {
			var i = this.closestPointToPointParameter(e, t);
			return void 0 === n && (console.warn("THREE.Line3: .closestPointToPoint() target is now required"), n = new x), this.delta(n).multiplyScalar(i).add(this.start)
		},
		applyMatrix4: function (e) {
			return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this
		},
		equals: function (e) {
			return e.start.equals(this.start) && e.end.equals(this.end)
		}
	}), kc.prototype = Object.create(W.prototype), kc.prototype.constructor = kc, kc.prototype.isImmediateRenderObject = !0;
	var Vc = new x;

	function jc(e, t) {
		W.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.color = t;
		for (var n = new ht, i = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1], r = 0, a = 1; r < 32; r++, a++) {
			var o = r / 32 * Math.PI * 2,
				s = a / 32 * Math.PI * 2;
			i.push(Math.cos(o), Math.sin(o), 1, Math.cos(s), Math.sin(s), 1)
		}
		n.setAttribute("position", new $e(i, 3));
		var c = new Ir({
			fog: !1,
			toneMapped: !1
		});
		this.cone = new Vr(n, c), this.add(this.cone), this.update()
	}
	jc.prototype = Object.create(W.prototype), jc.prototype.constructor = jc, jc.prototype.dispose = function () {
		this.cone.geometry.dispose(), this.cone.material.dispose()
	}, jc.prototype.update = function () {
		this.light.updateMatrixWorld();
		var e = this.light.distance ? this.light.distance : 1e3,
			t = e * Math.tan(this.light.angle);
		this.cone.scale.set(t, t, e), Vc.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(Vc), void 0 !== this.color ? this.cone.material.color.set(this.color) : this.cone.material.color.copy(this.light.color)
	};
	var Wc = new x,
		qc = new A,
		Xc = new A;

	function Yc(e) {
		for (var t = function e(t) {
				var n = [];
				t && t.isBone && n.push(t);
				for (var i = 0; i < t.children.length; i++) n.push.apply(n, e(t.children[i]));
				return n
			}(e), n = new ht, i = [], r = [], a = new Ue(0, 0, 1), o = new Ue(0, 1, 0), s = 0; s < t.length; s++) {
			var c = t[s];
			c.parent && c.parent.isBone && (i.push(0, 0, 0), i.push(0, 0, 0), r.push(a.r, a.g, a.b), r.push(o.r, o.g, o.b))
		}
		n.setAttribute("position", new $e(i, 3)), n.setAttribute("color", new $e(r, 3));
		var l = new Ir({
			vertexColors: !0,
			depthTest: !1,
			depthWrite: !1,
			toneMapped: !1,
			transparent: !0
		});
		Vr.call(this, n, l), this.root = e, this.bones = t, this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
	}

	function Zc(e, t, n) {
		this.light = e, this.light.updateMatrixWorld(), this.color = n;
		var i = new $a(t, 4, 2),
			r = new Ve({
				wireframe: !0,
				fog: !1,
				toneMapped: !1
			});
		Lt.call(this, i, r), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1, this.update()
	}
	Yc.prototype = Object.create(Vr.prototype), Yc.prototype.constructor = Yc, Yc.prototype.isSkeletonHelper = !0, Yc.prototype.updateMatrixWorld = function (e) {
		var t = this.bones,
			n = this.geometry,
			i = n.getAttribute("position");
		Xc.getInverse(this.root.matrixWorld);
		for (var r = 0, a = 0; r < t.length; r++) {
			var o = t[r];
			o.parent && o.parent.isBone && (qc.multiplyMatrices(Xc, o.matrixWorld), Wc.setFromMatrixPosition(qc), i.setXYZ(a, Wc.x, Wc.y, Wc.z), qc.multiplyMatrices(Xc, o.parent.matrixWorld), Wc.setFromMatrixPosition(qc), i.setXYZ(a + 1, Wc.x, Wc.y, Wc.z), a += 2)
		}
		n.getAttribute("position").needsUpdate = !0, W.prototype.updateMatrixWorld.call(this, e)
	}, Zc.prototype = Object.create(Lt.prototype), Zc.prototype.constructor = Zc, Zc.prototype.dispose = function () {
		this.geometry.dispose(), this.material.dispose()
	}, Zc.prototype.update = function () {
		void 0 !== this.color ? this.material.color.set(this.color) : this.material.color.copy(this.light.color)
	};
	var Jc = new x,
		Kc = new Ue,
		Qc = new Ue;

	function $c(e, t, n) {
		W.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.color = n;
		var i = new ha(t);
		i.rotateY(.5 * Math.PI), this.material = new Ve({
			wireframe: !0,
			fog: !1,
			toneMapped: !1
		}), void 0 === this.color && (this.material.vertexColors = !0);
		var r = i.getAttribute("position"),
			a = new Float32Array(3 * r.count);
		i.setAttribute("color", new We(a, 3)), this.add(new Lt(i, this.material)), this.update()
	}

	function el(e, t, n, i) {
		e = e || 10, t = t || 10, n = new Ue(void 0 !== n ? n : 4473924), i = new Ue(void 0 !== i ? i : 8947848);
		for (var r = t / 2, a = e / t, o = e / 2, s = [], c = [], l = 0, h = 0, u = -o; l <= t; l++, u += a) {
			s.push(-o, 0, u, o, 0, u), s.push(u, 0, -o, u, 0, o);
			var p = l === r ? n : i;
			p.toArray(c, h), h += 3, p.toArray(c, h), h += 3, p.toArray(c, h), h += 3, p.toArray(c, h), h += 3
		}
		var d = new ht;
		d.setAttribute("position", new $e(s, 3)), d.setAttribute("color", new $e(c, 3));
		var f = new Ir({
			vertexColors: !0,
			toneMapped: !1
		});
		Vr.call(this, d, f)
	}

	function tl(e, t, n, i, r, a) {
		e = e || 10, t = t || 16, n = n || 8, i = i || 64, r = new Ue(void 0 !== r ? r : 4473924), a = new Ue(void 0 !== a ? a : 8947848);
		var o, s, c, l, h, u, p, d = [],
			f = [];
		for (l = 0; l <= t; l++) c = l / t * (2 * Math.PI), o = Math.sin(c) * e, s = Math.cos(c) * e, d.push(0, 0, 0), d.push(o, 0, s), p = 1 & l ? r : a, f.push(p.r, p.g, p.b), f.push(p.r, p.g, p.b);
		for (l = 0; l <= n; l++)
			for (p = 1 & l ? r : a, u = e - e / n * l, h = 0; h < i; h++) c = h / i * (2 * Math.PI), o = Math.sin(c) * u, s = Math.cos(c) * u, d.push(o, 0, s), f.push(p.r, p.g, p.b), c = (h + 1) / i * (2 * Math.PI), o = Math.sin(c) * u, s = Math.cos(c) * u, d.push(o, 0, s), f.push(p.r, p.g, p.b);
		var m = new ht;
		m.setAttribute("position", new $e(d, 3)), m.setAttribute("color", new $e(f, 3));
		var v = new Ir({
			vertexColors: !0,
			toneMapped: !1
		});
		Vr.call(this, m, v)
	}
	$c.prototype = Object.create(W.prototype), $c.prototype.constructor = $c, $c.prototype.dispose = function () {
		this.children[0].geometry.dispose(), this.children[0].material.dispose()
	}, $c.prototype.update = function () {
		var e = this.children[0];
		if (void 0 !== this.color) this.material.color.set(this.color);
		else {
			var t = e.geometry.getAttribute("color");
			Kc.copy(this.light.color), Qc.copy(this.light.groundColor);
			for (var n = 0, i = t.count; n < i; n++) {
				var r = n < i / 2 ? Kc : Qc;
				t.setXYZ(n, r.r, r.g, r.b)
			}
			t.needsUpdate = !0
		}
		e.lookAt(Jc.setFromMatrixPosition(this.light.matrixWorld).negate())
	}, el.prototype = Object.assign(Object.create(Vr.prototype), {
		constructor: el,
		copy: function (e) {
			return Vr.prototype.copy.call(this, e), this.geometry.copy(e.geometry), this.material.copy(e.material), this
		},
		clone: function () {
			return (new this.constructor).copy(this)
		}
	}), tl.prototype = Object.create(Vr.prototype), tl.prototype.constructor = tl;
	var nl = new x,
		il = new x,
		rl = new x;

	function al(e, t, n) {
		W.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.color = n, void 0 === t && (t = 1);
		var i = new ht;
		i.setAttribute("position", new $e([-t, t, 0, t, t, 0, t, -t, 0, -t, -t, 0, -t, t, 0], 3));
		var r = new Ir({
			fog: !1,
			toneMapped: !1
		});
		this.lightPlane = new Hr(i, r), this.add(this.lightPlane), (i = new ht).setAttribute("position", new $e([0, 0, 0, 0, 0, 1], 3)), this.targetLine = new Hr(i, r), this.add(this.targetLine), this.update()
	}
	al.prototype = Object.create(W.prototype), al.prototype.constructor = al, al.prototype.dispose = function () {
		this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose()
	}, al.prototype.update = function () {
		nl.setFromMatrixPosition(this.light.matrixWorld), il.setFromMatrixPosition(this.light.target.matrixWorld), rl.subVectors(il, nl), this.lightPlane.lookAt(il), void 0 !== this.color ? (this.lightPlane.material.color.set(this.color), this.targetLine.material.color.set(this.color)) : (this.lightPlane.material.color.copy(this.light.color), this.targetLine.material.color.copy(this.light.color)), this.targetLine.lookAt(il), this.targetLine.scale.z = rl.length()
	};
	var ol = new x,
		sl = new kt;

	function cl(e) {
		var t = new ht,
			n = new Ir({
				color: 16777215,
				vertexColors: !0,
				toneMapped: !1
			}),
			i = [],
			r = [],
			a = {},
			o = new Ue(16755200),
			s = new Ue(16711680),
			c = new Ue(43775),
			l = new Ue(16777215),
			h = new Ue(3355443);

		function u(e, t, n) {
			p(e, n), p(t, n)
		}

		function p(e, t) {
			i.push(0, 0, 0), r.push(t.r, t.g, t.b), void 0 === a[e] && (a[e] = []), a[e].push(i.length / 3 - 1)
		}
		u("n1", "n2", o), u("n2", "n4", o), u("n4", "n3", o), u("n3", "n1", o), u("f1", "f2", o), u("f2", "f4", o), u("f4", "f3", o), u("f3", "f1", o), u("n1", "f1", o), u("n2", "f2", o), u("n3", "f3", o), u("n4", "f4", o), u("p", "n1", s), u("p", "n2", s), u("p", "n3", s), u("p", "n4", s), u("u1", "u2", c), u("u2", "u3", c), u("u3", "u1", c), u("c", "t", l), u("p", "c", h), u("cn1", "cn2", h), u("cn3", "cn4", h), u("cf1", "cf2", h), u("cf3", "cf4", h), t.setAttribute("position", new $e(i, 3)), t.setAttribute("color", new $e(r, 3)), Vr.call(this, t, n), this.camera = e, this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = a, this.update()
	}

	function ll(e, t, n, i, r, a, o) {
		ol.set(r, a, o).unproject(i);
		var s = t[e];
		if (void 0 !== s)
			for (var c = n.getAttribute("position"), l = 0, h = s.length; l < h; l++) c.setXYZ(s[l], ol.x, ol.y, ol.z)
	}
	cl.prototype = Object.create(Vr.prototype), cl.prototype.constructor = cl, cl.prototype.update = function () {
		var e = this.geometry,
			t = this.pointMap;
		sl.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse), ll("c", t, e, sl, 0, 0, -1), ll("t", t, e, sl, 0, 0, 1), ll("n1", t, e, sl, -1, -1, -1), ll("n2", t, e, sl, 1, -1, -1), ll("n3", t, e, sl, -1, 1, -1), ll("n4", t, e, sl, 1, 1, -1), ll("f1", t, e, sl, -1, -1, 1), ll("f2", t, e, sl, 1, -1, 1), ll("f3", t, e, sl, -1, 1, 1), ll("f4", t, e, sl, 1, 1, 1), ll("u1", t, e, sl, .7, 1.1, -1), ll("u2", t, e, sl, -.7, 1.1, -1), ll("u3", t, e, sl, 0, 2, -1), ll("cf1", t, e, sl, -1, 0, 1), ll("cf2", t, e, sl, 1, 0, 1), ll("cf3", t, e, sl, 0, -1, 1), ll("cf4", t, e, sl, 0, 1, 1), ll("cn1", t, e, sl, -1, 0, -1), ll("cn2", t, e, sl, 1, 0, -1), ll("cn3", t, e, sl, 0, -1, -1), ll("cn4", t, e, sl, 0, 1, -1), e.getAttribute("position").needsUpdate = !0
	};
	var hl = new oe;

	function ul(e, t) {
		this.object = e, void 0 === t && (t = 16776960);
		var n = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
			i = new Float32Array(24),
			r = new ht;
		r.setIndex(new We(n, 1)), r.setAttribute("position", new We(i, 3)), Vr.call(this, r, new Ir({
			color: t,
			toneMapped: !1
		})), this.matrixAutoUpdate = !1, this.update()
	}

	function pl(e, t) {
		this.type = "Box3Helper", this.box = e, t = t || 16776960;
		var n = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
			i = new ht;
		i.setIndex(new We(n, 1)), i.setAttribute("position", new $e([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1], 3)), Vr.call(this, i, new Ir({
			color: t,
			toneMapped: !1
		})), this.geometry.computeBoundingSphere()
	}

	function dl(e, t, n) {
		this.type = "PlaneHelper", this.plane = e, this.size = void 0 === t ? 1 : t;
		var i = void 0 !== n ? n : 16776960,
			r = new ht;
		r.setAttribute("position", new $e([1, -1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0], 3)), r.computeBoundingSphere(), Hr.call(this, r, new Ir({
			color: i,
			toneMapped: !1
		}));
		var a = new ht;
		a.setAttribute("position", new $e([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1], 3)), a.computeBoundingSphere(), this.add(new Lt(a, new Ve({
			color: i,
			opacity: .2,
			transparent: !0,
			depthWrite: !1,
			toneMapped: !1
		})))
	}
	ul.prototype = Object.create(Vr.prototype), ul.prototype.constructor = ul, ul.prototype.update = function (e) {
		if (void 0 !== e && console.warn("THREE.BoxHelper: .update() has no longer arguments."), void 0 !== this.object && hl.setFromObject(this.object), !hl.isEmpty()) {
			var t = hl.min,
				n = hl.max,
				i = this.geometry.attributes.position,
				r = i.array;
			r[0] = n.x, r[1] = n.y, r[2] = n.z, r[3] = t.x, r[4] = n.y, r[5] = n.z, r[6] = t.x, r[7] = t.y, r[8] = n.z, r[9] = n.x, r[10] = t.y, r[11] = n.z, r[12] = n.x, r[13] = n.y, r[14] = t.z, r[15] = t.x, r[16] = n.y, r[17] = t.z, r[18] = t.x, r[19] = t.y, r[20] = t.z, r[21] = n.x, r[22] = t.y, r[23] = t.z, i.needsUpdate = !0, this.geometry.computeBoundingSphere()
		}
	}, ul.prototype.setFromObject = function (e) {
		return this.object = e, this.update(), this
	}, ul.prototype.copy = function (e) {
		return Vr.prototype.copy.call(this, e), this.object = e.object, this
	}, ul.prototype.clone = function () {
		return (new this.constructor).copy(this)
	}, pl.prototype = Object.create(Vr.prototype), pl.prototype.constructor = pl, pl.prototype.updateMatrixWorld = function (e) {
		var t = this.box;
		t.isEmpty() || (t.getCenter(this.position), t.getSize(this.scale), this.scale.multiplyScalar(.5), W.prototype.updateMatrixWorld.call(this, e))
	}, dl.prototype = Object.create(Hr.prototype), dl.prototype.constructor = dl, dl.prototype.updateMatrixWorld = function (e) {
		var t = -this.plane.constant;
		Math.abs(t) < 1e-8 && (t = 1e-8), this.scale.set(.5 * this.size, .5 * this.size, t), this.children[0].material.side = t < 0 ? 1 : 0, this.lookAt(this.plane.normal), W.prototype.updateMatrixWorld.call(this, e)
	};
	var fl, ml, vl = new x;

	function gl(e, t, n, i, r, a) {
		W.call(this), void 0 === e && (e = new x(0, 0, 1)), void 0 === t && (t = new x(0, 0, 0)), void 0 === n && (n = 1), void 0 === i && (i = 16776960), void 0 === r && (r = .2 * n), void 0 === a && (a = .2 * r), void 0 === fl && ((fl = new ht).setAttribute("position", new $e([0, 0, 0, 0, 1, 0], 3)), (ml = new lo(0, .5, 1, 5, 1)).translate(0, -.5, 0)), this.position.copy(t), this.line = new Hr(fl, new Ir({
			color: i,
			toneMapped: !1
		})), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new Lt(ml, new Ve({
			color: i,
			toneMapped: !1
		})), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(e), this.setLength(n, r, a)
	}

	function yl(e) {
		var t = [0, 0, 0, e = e || 1, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e],
			n = new ht;
		n.setAttribute("position", new $e(t, 3)), n.setAttribute("color", new $e([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1], 3));
		var i = new Ir({
			vertexColors: !0,
			toneMapped: !1
		});
		Vr.call(this, n, i)
	}
	gl.prototype = Object.create(W.prototype), gl.prototype.constructor = gl, gl.prototype.setDirection = function (e) {
		if (e.y > .99999) this.quaternion.set(0, 0, 0, 1);
		else if (e.y < -.99999) this.quaternion.set(1, 0, 0, 0);
		else {
			vl.set(e.z, 0, -e.x).normalize();
			var t = Math.acos(e.y);
			this.quaternion.setFromAxisAngle(vl, t)
		}
	}, gl.prototype.setLength = function (e, t, n) {
		void 0 === t && (t = .2 * e), void 0 === n && (n = .2 * t), this.line.scale.set(1, Math.max(1e-4, e - t), 1), this.line.updateMatrix(), this.cone.scale.set(n, t, n), this.cone.position.y = e, this.cone.updateMatrix()
	}, gl.prototype.setColor = function (e) {
		this.line.material.color.set(e), this.cone.material.color.set(e)
	}, gl.prototype.copy = function (e) {
		return W.prototype.copy.call(this, e, !1), this.line.copy(e.line), this.cone.copy(e.cone), this
	}, gl.prototype.clone = function () {
		return (new this.constructor).copy(this)
	}, yl.prototype = Object.create(Vr.prototype), yl.prototype.constructor = yl;
	var xl, bl, wl, _l, Ml = Math.pow(2, 8),
		Sl = [.125, .215, .35, .446, .526, .582],
		Tl = 5 + Sl.length,
		El = {
			3e3: 0,
			3001: 1,
			3002: 2,
			3004: 3,
			3005: 4,
			3006: 5,
			3007: 6
		},
		Al = new Ps,
		Ll = (xl = 20, bl = new Float32Array(xl), wl = new x(0, 1, 0), (_l = new go({
			defines: {
				n: xl
			},
			uniforms: {
				envMap: {
					value: null
				},
				samples: {
					value: 1
				},
				weights: {
					value: bl
				},
				latitudinal: {
					value: !1
				},
				dTheta: {
					value: 0
				},
				mipInt: {
					value: 0
				},
				poleAxis: {
					value: wl
				},
				inputEncoding: {
					value: El[3e3]
				},
				outputEncoding: {
					value: El[3e3]
				}
			},
			vertexShader: Kl(),
			fragmentShader: `\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform sampler2D envMap;\nuniform int samples;\nuniform float weights[n];\nuniform bool latitudinal;\nuniform float dTheta;\nuniform float mipInt;\nuniform vec3 poleAxis;\n\n${Ql()}\n\n#define ENVMAP_TYPE_CUBE_UV\n#include <cube_uv_reflection_fragment>\n\nvec3 getSample(float theta, vec3 axis) {\n\tfloat cosTheta = cos(theta);\n\t// Rodrigues' axis-angle rotation\n\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t+ cross(axis, vOutputDirection) * sin(theta)\n\t\t+ axis * dot(axis, vOutputDirection) * (1.0 - cosTheta);\n\treturn bilinearCubeUV(envMap, sampleDirection, mipInt);\n}\n\nvoid main() {\n\tvec3 axis = latitudinal ? poleAxis : cross(poleAxis, vOutputDirection);\n\tif (all(equal(axis, vec3(0.0))))\n\t\taxis = vec3(vOutputDirection.z, 0.0, - vOutputDirection.x);\n\taxis = normalize(axis);\n\tgl_FragColor = vec4(0.0);\n\tgl_FragColor.rgb += weights[0] * getSample(0.0, axis);\n\tfor (int i = 1; i < n; i++) {\n\t\tif (i >= samples)\n\t\t\tbreak;\n\t\tfloat theta = dTheta * float(i);\n\t\tgl_FragColor.rgb += weights[i] * getSample(-1.0 * theta, axis);\n\t\tgl_FragColor.rgb += weights[i] * getSample(theta, axis);\n\t}\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t`,
			blending: 0,
			depthTest: !1,
			depthWrite: !1
		})).type = "SphericalGaussianBlur", _l),
		Rl = null,
		Pl = null,
		{
			_lodPlanes: Cl,
			_sizeLods: Ol,
			_sigmas: Dl
		} = function () {
			for (var e = [], t = [], n = [], i = 8, r = 0; r < Tl; r++) {
				var a = Math.pow(2, i);
				t.push(a);
				var o = 1 / a;
				r > 4 ? o = Sl[r - 8 + 4 - 1] : 0 == r && (o = 0), n.push(o);
				for (var s = 1 / (a - 1), c = -s / 2, l = 1 + s / 2, h = [c, c, l, c, l, l, c, c, l, l, c, l], u = new Float32Array(108), p = new Float32Array(72), d = new Float32Array(36), f = 0; f < 6; f++) {
					var m = f % 3 * 2 / 3 - 1,
						v = f > 2 ? 0 : -1,
						g = [m, v, 0, m + 2 / 3, v, 0, m + 2 / 3, v + 1, 0, m, v, 0, m + 2 / 3, v + 1, 0, m, v + 1, 0];
					u.set(g, 18 * f), p.set(h, 12 * f);
					var y = [f, f, f, f, f, f];
					d.set(y, 6 * f)
				}
				var x = new ht;
				x.setAttribute("position", new We(u, 3)), x.setAttribute("uv", new We(p, 2)), x.setAttribute("faceIndex", new We(d, 1)), e.push(x), i > 4 && i--
			}
			return {
				_lodPlanes: e,
				_sizeLods: t,
				_sigmas: n
			}
		}(),
		Il = null,
		Nl = null,
		Ul = null,
		zl = (1 + Math.sqrt(5)) / 2,
		Fl = 1 / zl,
		Bl = [new x(1, 1, 1), new x(-1, 1, 1), new x(1, 1, -1), new x(-1, 1, -1), new x(0, zl, Fl), new x(0, zl, -Fl), new x(Fl, 0, zl), new x(-Fl, 0, zl), new x(zl, Fl, 0), new x(-zl, Fl, 0)];

	function Hl(e) {
		Nl = e, Vl(Ll)
	}

	function Gl(e) {
		var t = {
				magFilter: 1003,
				minFilter: 1003,
				generateMipmaps: !1,
				type: e ? e.type : 1009,
				format: e ? e.format : 1023,
				encoding: e ? e.encoding : 3002,
				depthBuffer: !1,
				stencilBuffer: !1
			},
			n = jl(t);
		return n.depthBuffer = !e, Il = jl(t), n
	}

	function kl(e) {
		Il.dispose(), Nl.setRenderTarget(Ul), e.scissorTest = !1, e.setSize(e.width, e.height)
	}

	function Vl(e) {
		var t = new q;
		t.add(new Lt(Cl[0], e)), Nl.compile(t, Al)
	}

	function jl(e) {
		var t = new f(3 * Ml, 3 * Ml, e);
		return t.texture.mapping = 306, t.texture.name = "PMREM.cubeUv", t.scissorTest = !0, t
	}

	function Wl(e, t, n, i, r) {
		e.viewport.set(t, n, i, r), e.scissor.set(t, n, i, r)
	}

	function ql(e) {
		var t = Nl.autoClear;
		Nl.autoClear = !1;
		for (var n = 1; n < Tl; n++) {
			Xl(e, n - 1, n, Math.sqrt(Dl[n] * Dl[n] - Dl[n - 1] * Dl[n - 1]), Bl[(n - 1) % Bl.length])
		}
		Nl.autoClear = t
	}

	function Xl(e, t, n, i, r) {
		Yl(e, Il, t, n, i, "latitudinal", r), Yl(Il, e, n, n, i, "longitudinal", r)
	}

	function Yl(e, t, n, i, r, a, o) {
		"latitudinal" !== a && "longitudinal" !== a && console.error("blur direction must be either latitudinal or longitudinal!");
		var s = new q;
		s.add(new Lt(Cl[i], Ll));
		var c = Ll.uniforms,
			l = Ol[n] - 1,
			h = isFinite(r) ? Math.PI / (2 * l) : 2 * Math.PI / 39,
			u = r / h,
			p = isFinite(r) ? 1 + Math.floor(3 * u) : 20;
		p > 20 && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to 20`);
		for (var d = [], f = 0, m = 0; m < 20; ++m) {
			var v = m / u,
				g = Math.exp(-v * v / 2);
			d.push(g), 0 == m ? f += g : m < p && (f += 2 * g)
		}
		for (m = 0; m < d.length; m++) d[m] = d[m] / f;
		c.envMap.value = e.texture, c.samples.value = p, c.weights.value = d, c.latitudinal.value = "latitudinal" === a, o && (c.poleAxis.value = o), c.dTheta.value = h, c.mipInt.value = 8 - n, c.inputEncoding.value = El[e.texture.encoding], c.outputEncoding.value = El[e.texture.encoding];
		var y = Ol[i];
		Wl(t, v = 3 * Math.max(0, Ml - 2 * y), (0 === i ? 0 : 2 * Ml) + 2 * y * (i > 4 ? i - 8 + 4 : 0), 3 * y, 2 * y), Nl.setRenderTarget(t), Nl.render(s, Al)
	}

	function Zl() {
		var e = new go({
			uniforms: {
				envMap: {
					value: null
				},
				texelSize: {
					value: new c(1, 1)
				},
				inputEncoding: {
					value: El[3e3]
				},
				outputEncoding: {
					value: El[3e3]
				}
			},
			vertexShader: Kl(),
			fragmentShader: `\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform sampler2D envMap;\nuniform vec2 texelSize;\n\n${Ql()}\n\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n\nvoid main() {\n\tgl_FragColor = vec4(0.0);\n\tvec3 outputDirection = normalize(vOutputDirection);\n\tvec2 uv;\n\tuv.y = asin(clamp(outputDirection.y, -1.0, 1.0)) * RECIPROCAL_PI + 0.5;\n\tuv.x = atan(outputDirection.z, outputDirection.x) * RECIPROCAL_PI2 + 0.5;\n\tvec2 f = fract(uv / texelSize - 0.5);\n\tuv -= f * texelSize;\n\tvec3 tl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.x += texelSize.x;\n\tvec3 tr = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.y += texelSize.y;\n\tvec3 br = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.x -= texelSize.x;\n\tvec3 bl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tvec3 tm = mix(tl, tr, f.x);\n\tvec3 bm = mix(bl, br, f.x);\n\tgl_FragColor.rgb = mix(tm, bm, f.y);\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t`,
			blending: 0,
			depthTest: !1,
			depthWrite: !1
		});
		return e.type = "EquirectangularToCubeUV", e
	}

	function Jl() {
		var e = new go({
			uniforms: {
				envMap: {
					value: null
				},
				inputEncoding: {
					value: El[3e3]
				},
				outputEncoding: {
					value: El[3e3]
				}
			},
			vertexShader: Kl(),
			fragmentShader: `\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform samplerCube envMap;\n\n${Ql()}\n\nvoid main() {\n\tgl_FragColor = vec4(0.0);\n\tgl_FragColor.rgb = envMapTexelToLinear(textureCube(envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ))).rgb;\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t`,
			blending: 0,
			depthTest: !1,
			depthWrite: !1
		});
		return e.type = "CubemapToCubeUV", e
	}

	function Kl() {
		return "\nprecision mediump float;\nprecision mediump int;\nattribute vec3 position;\nattribute vec2 uv;\nattribute float faceIndex;\nvarying vec3 vOutputDirection;\nvec3 getDirection(vec2 uv, float face) {\n\tuv = 2.0 * uv - 1.0;\n\tvec3 direction = vec3(uv, 1.0);\n\tif (face == 0.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 1.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 3.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.x *= -1.0;\n\t} else if (face == 4.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.y *= -1.0;\n\t} else if (face == 5.0) {\n\t\tdirection.xz *= -1.0;\n\t}\n\treturn direction;\n}\nvoid main() {\n\tvOutputDirection = getDirection(uv, faceIndex);\n\tgl_Position = vec4( position, 1.0 );\n}\n\t"
	}

	function Ql() {
		return "\nuniform int inputEncoding;\nuniform int outputEncoding;\n\n#include <encodings_pars_fragment>\n\nvec4 inputTexelToLinear(vec4 value){\n\tif(inputEncoding == 0){\n\t\treturn value;\n\t}else if(inputEncoding == 1){\n\t\treturn sRGBToLinear(value);\n\t}else if(inputEncoding == 2){\n\t\treturn RGBEToLinear(value);\n\t}else if(inputEncoding == 3){\n\t\treturn RGBMToLinear(value, 7.0);\n\t}else if(inputEncoding == 4){\n\t\treturn RGBMToLinear(value, 16.0);\n\t}else if(inputEncoding == 5){\n\t\treturn RGBDToLinear(value, 256.0);\n\t}else{\n\t\treturn GammaToLinear(value, 2.2);\n\t}\n}\n\nvec4 linearToOutputTexel(vec4 value){\n\tif(outputEncoding == 0){\n\t\treturn value;\n\t}else if(outputEncoding == 1){\n\t\treturn LinearTosRGB(value);\n\t}else if(outputEncoding == 2){\n\t\treturn LinearToRGBE(value);\n\t}else if(outputEncoding == 3){\n\t\treturn LinearToRGBM(value, 7.0);\n\t}else if(outputEncoding == 4){\n\t\treturn LinearToRGBM(value, 16.0);\n\t}else if(outputEncoding == 5){\n\t\treturn LinearToRGBD(value, 256.0);\n\t}else{\n\t\treturn LinearToGamma(value, 2.2);\n\t}\n}\n\nvec4 envMapTexelToLinear(vec4 color) {\n\treturn inputTexelToLinear(color);\n}\n\t"
	}
	Hl.prototype = {
		constructor: Hl,
		fromScene: function (e, t = 0, n = .1, i = 100) {
			Ul = Nl.getRenderTarget();
			var r = Gl();
			return function (e, t, n, i) {
				var r = new Vt(90, 1, t, n),
					a = [1, 1, 1, 1, -1, 1],
					o = [1, 1, -1, -1, -1, 1],
					s = Nl.outputEncoding,
					c = Nl.toneMapping,
					l = Nl.toneMappingExposure,
					h = Nl.getClearColor(),
					u = Nl.getClearAlpha();
				Nl.toneMapping = 1, Nl.toneMappingExposure = 1, Nl.outputEncoding = 3e3, e.scale.z *= -1;
				var p = e.background;
				if (p && p.isColor) {
					p.convertSRGBToLinear();
					var d = Math.max(p.r, p.g, p.b),
						f = Math.min(Math.max(Math.ceil(Math.log2(d)), -128), 127);
					p = p.multiplyScalar(Math.pow(2, -f));
					var m = (f + 128) / 255;
					Nl.setClearColor(p, m), e.background = null
				}
				for (var v = 0; v < 6; v++) {
					var g = v % 3;
					0 == g ? (r.up.set(0, a[v], 0), r.lookAt(o[v], 0, 0)) : 1 == g ? (r.up.set(0, 0, a[v]), r.lookAt(0, o[v], 0)) : (r.up.set(0, a[v], 0), r.lookAt(0, 0, o[v])), Wl(i, g * Ml, v > 2 ? Ml : 0, Ml, Ml), Nl.setRenderTarget(i), Nl.render(e, r)
				}
				Nl.toneMapping = c, Nl.toneMappingExposure = l, Nl.outputEncoding = s, Nl.setClearColor(h, u), e.scale.z *= -1
			}(e, n, i, r), t > 0 && Xl(r, 0, 0, t), ql(r), kl(r), r
		},
		fromEquirectangular: function (e) {
			return e.magFilter = 1003, e.minFilter = 1003, e.generateMipmaps = !1, this.fromCubemap(e)
		},
		fromCubemap: function (e) {
			Ul = Nl.getRenderTarget();
			var t = Gl(e);
			return function (e, t) {
				var n = new q;
				e.isCubeTexture ? null == Pl && (Pl = Jl()) : null == Rl && (Rl = Zl());
				var i = e.isCubeTexture ? Pl : Rl;
				n.add(new Lt(Cl[0], i));
				var r = i.uniforms;
				r.envMap.value = e, e.isCubeTexture || r.texelSize.value.set(1 / e.image.width, 1 / e.image.height);
				r.inputEncoding.value = El[e.encoding], r.outputEncoding.value = El[e.encoding], Wl(t, 0, 0, 3 * Ml, 2 * Ml), Nl.setRenderTarget(t), Nl.render(n, Al)
			}(e, t), ql(t), kl(t), t
		},
		compileCubemapShader: function () {
			null == Pl && Vl(Pl = Jl())
		},
		compileEquirectangularShader: function () {
			null == Rl && Vl(Rl = Zl())
		},
		dispose: function () {
			Ll.dispose(), null != Pl && Pl.dispose(), null != Rl && Rl.dispose();
			for (var e = 0; e < Cl.length; e++) Cl[e].dispose()
		}
	};

	function $l(e) {
		console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead."), cs.call(this, e), this.type = "catmullrom"
	}
	es.create = function (e, t) {
		return console.log("THREE.Curve.create() has been deprecated"), e.prototype = Object.create(es.prototype), e.prototype.constructor = e, e.prototype.getPoint = t, e
	}, Object.assign(bs.prototype, {
		createPointsGeometry: function (e) {
			console.warn("THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
			var t = this.getPoints(e);
			return this.createGeometry(t)
		},
		createSpacedPointsGeometry: function (e) {
			console.warn("THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
			var t = this.getSpacedPoints(e);
			return this.createGeometry(t)
		},
		createGeometry: function (e) {
			console.warn("THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
			for (var t = new Nt, n = 0, i = e.length; n < i; n++) {
				var r = e[n];
				t.vertices.push(new x(r.x, r.y, r.z || 0))
			}
			return t
		}
	}), Object.assign(ws.prototype, {
		fromPoints: function (e) {
			return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."), this.setFromPoints(e)
		}
	}), Object.create(cs.prototype), Object.create(cs.prototype), $l.prototype = Object.create(cs.prototype), Object.assign($l.prototype, {
		initFromArray: function () {
			console.error("THREE.Spline: .initFromArray() has been removed.")
		},
		getControlPointsArray: function () {
			console.error("THREE.Spline: .getControlPointsArray() has been removed.")
		},
		reparametrizeByArcLength: function () {
			console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.")
		}
	}), el.prototype.setColors = function () {
		console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")
	}, Yc.prototype.update = function () {
		console.error("THREE.SkeletonHelper: update() no longer needs to be called.")
	}, Object.assign(Wo.prototype, {
		extractUrlBase: function (e) {
			return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."), zs(e)
		}
	}), Wo.Handlers = {
		add: function () {
			console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")
		},
		get: function () {
			console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")
		}
	}, Object.assign(ks.prototype, {
		setTexturePath: function (e) {
			return console.warn("THREE.ObjectLoader: .setTexturePath() has been renamed to .setResourcePath()."), this.setResourcePath(e)
		}
	}), Object.assign(Fc.prototype, {
		center: function (e) {
			return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."), this.getCenter(e)
		},
		empty: function () {
			return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."), this.isEmpty()
		},
		isIntersectionBox: function (e) {
			return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(e)
		},
		size: function (e) {
			return console.warn("THREE.Box2: .size() has been renamed to .getSize()."), this.getSize(e)
		}
	}), Object.assign(oe.prototype, {
		center: function (e) {
			return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."), this.getCenter(e)
		},
		empty: function () {
			return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."), this.isEmpty()
		},
		isIntersectionBox: function (e) {
			return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(e)
		},
		isIntersectionSphere: function (e) {
			return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(e)
		},
		size: function (e) {
			return console.warn("THREE.Box3: .size() has been renamed to .getSize()."), this.getSize(e)
		}
	}), Zt.prototype.setFromMatrix = function (e) {
		return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."), this.setFromProjectionMatrix(e)
	}, Gc.prototype.center = function (e) {
		return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."), this.getCenter(e)
	}, Object.assign(s, {
		random16: function () {
			return console.warn("THREE.Math: .random16() has been deprecated. Use Math.random() instead."), Math.random()
		},
		nearestPowerOfTwo: function (e) {
			return console.warn("THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo()."), s.floorPowerOfTwo(e)
		},
		nextPowerOfTwo: function (e) {
			return console.warn("THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo()."), s.ceilPowerOfTwo(e)
		}
	}), Object.assign(l.prototype, {
		flattenToArrayOffset: function (e, t) {
			return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(e, t)
		},
		multiplyVector3: function (e) {
			return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), e.applyMatrix3(this)
		},
		multiplyVector3Array: function () {
			console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")
		},
		applyToBufferAttribute: function (e) {
			return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."), e.applyMatrix3(this)
		},
		applyToVector3Array: function () {
			console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")
		}
	}), Object.assign(A.prototype, {
		extractPosition: function (e) {
			return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(e)
		},
		flattenToArrayOffset: function (e, t) {
			return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(e, t)
		},
		getPosition: function () {
			return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."), (new x).setFromMatrixColumn(this, 3)
		},
		setRotationFromQuaternion: function (e) {
			return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(e)
		},
		multiplyToArray: function () {
			console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")
		},
		multiplyVector3: function (e) {
			return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
		},
		multiplyVector4: function (e) {
			return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
		},
		multiplyVector3Array: function () {
			console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")
		},
		rotateAxis: function (e) {
			console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), e.transformDirection(this)
		},
		crossVector: function (e) {
			return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
		},
		translate: function () {
			console.error("THREE.Matrix4: .translate() has been removed.")
		},
		rotateX: function () {
			console.error("THREE.Matrix4: .rotateX() has been removed.")
		},
		rotateY: function () {
			console.error("THREE.Matrix4: .rotateY() has been removed.")
		},
		rotateZ: function () {
			console.error("THREE.Matrix4: .rotateZ() has been removed.")
		},
		rotateByAxis: function () {
			console.error("THREE.Matrix4: .rotateByAxis() has been removed.")
		},
		applyToBufferAttribute: function (e) {
			return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
		},
		applyToVector3Array: function () {
			console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")
		},
		makeFrustum: function (e, t, n, i, r, a) {
			return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."), this.makePerspective(e, t, i, n, r, a)
		}
	}), we.prototype.isIntersectionLine = function (e) {
		return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."), this.intersectsLine(e)
	}, v.prototype.multiplyVector3 = function (e) {
		return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), e.applyQuaternion(this)
	}, Object.assign(ge.prototype, {
		isIntersectionBox: function (e) {
			return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(e)
		},
		isIntersectionPlane: function (e) {
			return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."), this.intersectsPlane(e)
		},
		isIntersectionSphere: function (e) {
			return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(e)
		}
	}), Object.assign(Oe.prototype, {
		area: function () {
			return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."), this.getArea()
		},
		barycoordFromPoint: function (e, t) {
			return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."), this.getBarycoord(e, t)
		},
		midpoint: function (e) {
			return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."), this.getMidpoint(e)
		},
		normal: function (e) {
			return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."), this.getNormal(e)
		},
		plane: function (e) {
			return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."), this.getPlane(e)
		}
	}), Object.assign(Oe, {
		barycoordFromPoint: function (e, t, n, i, r) {
			return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."), Oe.getBarycoord(e, t, n, i, r)
		},
		normal: function (e, t, n, i) {
			return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."), Oe.getNormal(e, t, n, i)
		}
	}), Object.assign(_s.prototype, {
		extractAllPoints: function (e) {
			return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."), this.extractPoints(e)
		},
		extrude: function (e) {
			return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."), new qa(this, e)
		},
		makeGeometry: function (e) {
			return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."), new ro(this, e)
		}
	}), Object.assign(c.prototype, {
		fromAttribute: function (e, t, n) {
			return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(e, t, n)
		},
		distanceToManhattan: function (e) {
			return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), this.manhattanDistanceTo(e)
		},
		lengthManhattan: function () {
			return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
		}
	}), Object.assign(x.prototype, {
		setEulerFromRotationMatrix: function () {
			console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
		},
		setEulerFromQuaternion: function () {
			console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
		},
		getPositionFromMatrix: function (e) {
			return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(e)
		},
		getScaleFromMatrix: function (e) {
			return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(e)
		},
		getColumnFromMatrix: function (e, t) {
			return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(t, e)
		},
		applyProjection: function (e) {
			return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."), this.applyMatrix4(e)
		},
		fromAttribute: function (e, t, n) {
			return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(e, t, n)
		},
		distanceToManhattan: function (e) {
			return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), this.manhattanDistanceTo(e)
		},
		lengthManhattan: function () {
			return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
		}
	}), Object.assign(d.prototype, {
		fromAttribute: function (e, t, n) {
			return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(e, t, n)
		},
		lengthManhattan: function () {
			return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
		}
	}), Object.assign(Nt.prototype, {
		computeTangents: function () {
			console.error("THREE.Geometry: .computeTangents() has been removed.")
		},
		computeLineDistances: function () {
			console.error("THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.")
		},
		applyMatrix: function (e) {
			return console.warn("THREE.Geometry: .applyMatrix() has been renamed to .applyMatrix4()."), this.applyMatrix4(e)
		}
	}), Object.assign(W.prototype, {
		getChildByName: function (e) {
			return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(e)
		},
		renderDepth: function () {
			console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")
		},
		translate: function (e, t) {
			return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(t, e)
		},
		getWorldRotation: function () {
			console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")
		},
		applyMatrix: function (e) {
			return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."), this.applyMatrix4(e)
		}
	}), Object.defineProperties(W.prototype, {
		eulerOrder: {
			get: function () {
				return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order
			},
			set: function (e) {
				console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order = e
			}
		},
		useQuaternion: {
			get: function () {
				console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
			},
			set: function () {
				console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
			}
		}
	}), Object.assign(Lt.prototype, {
		setDrawMode: function () {
			console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")
		}
	}), Object.defineProperties(Lt.prototype, {
		drawMode: {
			get: function () {
				return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."), 0
			},
			set: function () {
				console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")
			}
		}
	}), Object.defineProperties(Mr.prototype, {
		objects: {
			get: function () {
				return console.warn("THREE.LOD: .objects has been renamed to .levels."), this.levels
			}
		}
	}), Object.defineProperty(Ar.prototype, "useVertexTexture", {
		get: function () {
			console.warn("THREE.Skeleton: useVertexTexture has been removed.")
		},
		set: function () {
			console.warn("THREE.Skeleton: useVertexTexture has been removed.")
		}
	}), Sr.prototype.initBones = function () {
		console.error("THREE.SkinnedMesh: initBones() has been removed.")
	}, Object.defineProperty(es.prototype, "__arcLengthDivisions", {
		get: function () {
			return console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."), this.arcLengthDivisions
		},
		set: function (e) {
			console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."), this.arcLengthDivisions = e
		}
	}), Vt.prototype.setLens = function (e, t) {
		console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."), void 0 !== t && (this.filmGauge = t), this.setFocalLength(e)
	}, Object.defineProperties(Ms.prototype, {
		onlyShadow: {
			set: function () {
				console.warn("THREE.Light: .onlyShadow has been removed.")
			}
		},
		shadowCameraFov: {
			set: function (e) {
				console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."), this.shadow.camera.fov = e
			}
		},
		shadowCameraLeft: {
			set: function (e) {
				console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."), this.shadow.camera.left = e
			}
		},
		shadowCameraRight: {
			set: function (e) {
				console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."), this.shadow.camera.right = e
			}
		},
		shadowCameraTop: {
			set: function (e) {
				console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."), this.shadow.camera.top = e
			}
		},
		shadowCameraBottom: {
			set: function (e) {
				console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."), this.shadow.camera.bottom = e
			}
		},
		shadowCameraNear: {
			set: function (e) {
				console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."), this.shadow.camera.near = e
			}
		},
		shadowCameraFar: {
			set: function (e) {
				console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."), this.shadow.camera.far = e
			}
		},
		shadowCameraVisible: {
			set: function () {
				console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")
			}
		},
		shadowBias: {
			set: function (e) {
				console.warn("THREE.Light: .shadowBias is now .shadow.bias."), this.shadow.bias = e
			}
		},
		shadowDarkness: {
			set: function () {
				console.warn("THREE.Light: .shadowDarkness has been removed.")
			}
		},
		shadowMapWidth: {
			set: function (e) {
				console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."), this.shadow.mapSize.width = e
			}
		},
		shadowMapHeight: {
			set: function (e) {
				console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."), this.shadow.mapSize.height = e
			}
		}
	}), Object.defineProperties(We.prototype, {
		length: {
			get: function () {
				return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."), this.array.length
			}
		},
		dynamic: {
			get: function () {
				return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."), 35048 === this.usage
			},
			set: function () {
				console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."), this.setUsage(35048)
			}
		}
	}), Object.assign(We.prototype, {
		setDynamic: function (e) {
			return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."), this.setUsage(!0 === e ? 35048 : 35044), this
		},
		copyIndicesArray: function () {
			console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")
		},
		setArray: function () {
			console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")
		}
	}), Object.assign(ht.prototype, {
		addIndex: function (e) {
			console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."), this.setIndex(e)
		},
		addAttribute: function (e, t) {
			return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."), t && t.isBufferAttribute || t && t.isInterleavedBufferAttribute ? "index" === e ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), this.setIndex(t), this) : this.setAttribute(e, t) : (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), this.setAttribute(e, new We(arguments[1], arguments[2])))
		},
		addDrawCall: function (e, t, n) {
			void 0 !== n && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."), console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."), this.addGroup(e, t)
		},
		clearDrawCalls: function () {
			console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."), this.clearGroups()
		},
		computeTangents: function () {
			console.warn("THREE.BufferGeometry: .computeTangents() has been removed.")
		},
		computeOffsets: function () {
			console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")
		},
		removeAttribute: function (e) {
			return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."), this.deleteAttribute(e)
		},
		applyMatrix: function (e) {
			return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."), this.applyMatrix4(e)
		}
	}), Object.defineProperties(ht.prototype, {
		drawcalls: {
			get: function () {
				return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."), this.groups
			}
		},
		offsets: {
			get: function () {
				return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."), this.groups
			}
		}
	}), Object.defineProperties(Ic.prototype, {
		linePrecision: {
			get: function () {
				return console.warn("THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."), this.params.Line.threshold
			},
			set: function (e) {
				console.warn("THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."), this.params.Line.threshold = e
			}
		}
	}), Object.defineProperties(nr.prototype, {
		dynamic: {
			get: function () {
				return console.warn("THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."), 35048 === this.usage
			},
			set: function (e) {
				console.warn("THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."), this.setUsage(e)
			}
		}
	}), Object.assign(nr.prototype, {
		setDynamic: function (e) {
			return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."), this.setUsage(!0 === e ? 35048 : 35044), this
		},
		setArray: function () {
			console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")
		}
	}), Object.assign(Xa.prototype, {
		getArrays: function () {
			console.error("THREE.ExtrudeBufferGeometry: .getArrays() has been removed.")
		},
		addShapeList: function () {
			console.error("THREE.ExtrudeBufferGeometry: .addShapeList() has been removed.")
		},
		addShape: function () {
			console.error("THREE.ExtrudeBufferGeometry: .addShape() has been removed.")
		}
	}), Object.defineProperties(Oc.prototype, {
		dynamic: {
			set: function () {
				console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.")
			}
		},
		onUpdate: {
			value: function () {
				return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."), this
			}
		}
	}), Object.defineProperties(ke.prototype, {
		wrapAround: {
			get: function () {
				console.warn("THREE.Material: .wrapAround has been removed.")
			},
			set: function () {
				console.warn("THREE.Material: .wrapAround has been removed.")
			}
		},
		overdraw: {
			get: function () {
				console.warn("THREE.Material: .overdraw has been removed.")
			},
			set: function () {
				console.warn("THREE.Material: .overdraw has been removed.")
			}
		},
		wrapRGB: {
			get: function () {
				return console.warn("THREE.Material: .wrapRGB has been removed."), new Ue
			}
		},
		shading: {
			get: function () {
				console.error("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead.")
			},
			set: function (e) {
				console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === e
			}
		},
		stencilMask: {
			get: function () {
				return console.warn("THREE." + this.type + ": .stencilMask has been removed. Use .stencilFuncMask instead."), this.stencilFuncMask
			},
			set: function (e) {
				console.warn("THREE." + this.type + ": .stencilMask has been removed. Use .stencilFuncMask instead."), this.stencilFuncMask = e
			}
		}
	}), Object.defineProperties(bo.prototype, {
		metal: {
			get: function () {
				return console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."), !1
			},
			set: function () {
				console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")
			}
		}
	}), Object.defineProperties(Gt.prototype, {
		derivatives: {
			get: function () {
				return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives
			},
			set: function (e) {
				console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives = e
			}
		}
	}), Object.assign($i.prototype, {
		clearTarget: function (e, t, n, i) {
			console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."), this.setRenderTarget(e), this.clear(t, n, i)
		},
		animate: function (e) {
			console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."), this.setAnimationLoop(e)
		},
		getCurrentRenderTarget: function () {
			return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."), this.getRenderTarget()
		},
		getMaxAnisotropy: function () {
			return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."), this.capabilities.getMaxAnisotropy()
		},
		getPrecision: function () {
			return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."), this.capabilities.precision
		},
		resetGLState: function () {
			return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."), this.state.reset()
		},
		supportsFloatTextures: function () {
			return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."), this.extensions.get("OES_texture_float")
		},
		supportsHalfFloatTextures: function () {
			return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."), this.extensions.get("OES_texture_half_float")
		},
		supportsStandardDerivatives: function () {
			return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."), this.extensions.get("OES_standard_derivatives")
		},
		supportsCompressedTextureS3TC: function () {
			return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."), this.extensions.get("WEBGL_compressed_texture_s3tc")
		},
		supportsCompressedTexturePVRTC: function () {
			return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."), this.extensions.get("WEBGL_compressed_texture_pvrtc")
		},
		supportsBlendMinMax: function () {
			return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."), this.extensions.get("EXT_blend_minmax")
		},
		supportsVertexTextures: function () {
			return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."), this.capabilities.vertexTextures
		},
		supportsInstancedArrays: function () {
			return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."), this.extensions.get("ANGLE_instanced_arrays")
		},
		enableScissorTest: function (e) {
			console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."), this.setScissorTest(e)
		},
		initMaterial: function () {
			console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
		},
		addPrePlugin: function () {
			console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
		},
		addPostPlugin: function () {
			console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
		},
		updateShadowMap: function () {
			console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
		},
		setFaceCulling: function () {
			console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")
		},
		allocTextureUnit: function () {
			console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")
		},
		setTexture: function () {
			console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")
		},
		setTexture2D: function () {
			console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")
		},
		setTextureCube: function () {
			console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")
		},
		getActiveMipMapLevel: function () {
			return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."), this.getActiveMipmapLevel()
		}
	}), Object.defineProperties($i.prototype, {
		shadowMapEnabled: {
			get: function () {
				return this.shadowMap.enabled
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."), this.shadowMap.enabled = e
			}
		},
		shadowMapType: {
			get: function () {
				return this.shadowMap.type
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."), this.shadowMap.type = e
			}
		},
		shadowMapCullFace: {
			get: function () {
				console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")
			},
			set: function () {
				console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")
			}
		},
		context: {
			get: function () {
				return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."), this.getContext()
			}
		},
		vr: {
			get: function () {
				return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"), this.xr
			}
		},
		gammaInput: {
			get: function () {
				return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."), !1
			},
			set: function () {
				console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")
			}
		},
		gammaOutput: {
			get: function () {
				return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."), !1
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."), this.outputEncoding = !0 === e ? 3001 : 3e3
			}
		}
	}), Object.defineProperties(qi.prototype, {
		cullFace: {
			get: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")
			},
			set: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")
			}
		},
		renderReverseSided: {
			get: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")
			},
			set: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")
			}
		},
		renderSingleSided: {
			get: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")
			},
			set: function () {
				console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")
			}
		}
	}), Object.defineProperties(f.prototype, {
		wrapS: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS = e
			}
		},
		wrapT: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT = e
			}
		},
		magFilter: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter = e
			}
		},
		minFilter: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter = e
			}
		},
		anisotropy: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy = e
			}
		},
		offset: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset = e
			}
		},
		repeat: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat = e
			}
		},
		format: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format = e
			}
		},
		type: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type = e
			}
		},
		generateMipmaps: {
			get: function () {
				return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps
			},
			set: function (e) {
				console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps = e
			}
		}
	}), Object.defineProperties(pc.prototype, {
		load: {
			value: function (e) {
				console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");
				var t = this;
				return (new $s).load(e, (function (e) {
					t.setBuffer(e)
				})), this
			}
		},
		startTime: {
			set: function () {
				console.warn("THREE.Audio: .startTime is now .play( delay ).")
			}
		}
	}), yc.prototype.getData = function () {
		return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."), this.getFrequencyData()
	}, jt.prototype.updateCubeMap = function (e, t) {
		return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."), this.update(e, t)
	};
	h.crossOrigin = void 0, h.loadTexture = function (e, t, n, i) {
		console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
		var r = new $o;
		r.setCrossOrigin(this.crossOrigin);
		var a = r.load(e, n, void 0, i);
		return t && (a.mapping = t), a
	}, h.loadTextureCube = function (e, t, n, i) {
		console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
		var r = new Qo;
		r.setCrossOrigin(this.crossOrigin);
		var a = r.load(e, n, void 0, i);
		return t && (a.mapping = t), a
	}, h.loadCompressedTexture = function () {
		console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
	}, h.loadCompressedTextureCube = function () {
		console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
	};
	"undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", {
		detail: {
			revision: "115"
		}
	}));
	const eh = new x(1, 0, 0),
		th = new x(0, 1, 0),
		nh = new x(0, 0, 1),
		ih = new x(-1, 0, 0),
		rh = new x(0, -1, 0),
		ah = new x(0, 0, -1),
		oh = {
			subtract(e, t) {
				for (var n = 0; n < 9; n++) e.elements[n] -= t.elements[n];
				return e
			},
			getInverse(e, t) {
				const n = t.elements,
					i = e.elements,
					r = n[0],
					a = n[1],
					o = n[2],
					s = n[3],
					c = n[4],
					l = n[5],
					h = n[6],
					u = n[7],
					p = n[8],
					d = p * c - l * u,
					f = -p * s + l * h,
					m = u * s - c * h,
					v = r * d + a * f + o * m;
				if (!v) throw new Error("0 determinant");
				return i[0] = d, i[1] = -p * a + o * u, i[2] = l * a - o * c, i[3] = f, i[4] = p * r - o * h, i[5] = -l * r + o * s, i[6] = m, i[7] = -u * r + a * h, i[8] = c * r - a * s, e.multiplyScalar(1 / v), e
			}
		},
		sh = new x,
		ch = new x,
		lh = new x,
		hh = new x,
		uh = new l,
		ph = new l,
		dh = new x,
		fh = new l,
		mh = new l,
		vh = new l,
		gh = new x,
		yh = new x,
		xh = new l,
		bh = new l,
		wh = new A;
	class _h {
		constructor(e, t) {
			this.radius = e, this.throatLength = t
		}
		get radiusSquared() {
			return this.radius * this.radius
		}
		adjustCartesianDirection(e, t) {
			const n = Math.max(0, Math.abs(e.x) - this.throatLength),
				i = Math.sqrt(n * n + this.radiusSquared);
			t.y /= i, t.z /= i * Math.sin(e.y)
		}
		adjustSphericalDirection(e, t) {
			const n = Math.max(0, Math.abs(e.x) - this.throatLength),
				i = Math.sqrt(n * n + this.radiusSquared);
			t.y *= i, t.z *= i * Math.sin(e.y)
		}
		step(e, t, n) {
			const i = e.position,
				r = Math.max(0, Math.abs(i.x) - this.throatLength),
				a = this.radiusSquared,
				o = i.x / Math.abs(i.x) * r,
				s = i.y,
				c = t.x,
				l = t.y,
				h = t.z,
				u = o * o,
				p = l * l,
				d = h * h,
				f = Math.sin(s),
				m = Math.cos(s),
				v = Math.sin(2 * s),
				g = Math.cos(2 * s),
				y = f * f,
				x = m * f,
				b = 1 / Math.tan(s),
				w = 1 / f,
				_ = a,
				M = 1 / (_ + o * o),
				S = M * M;
			if (hh.set(o * (p + y * d), -2 * o * c * l * M + x * d, -2 * o * c * h * M - 2 * b * l * h), uh.set(0, 2 * l * o, 2 * h * o * y, -2 * l * o * M, -2 * c * o * M, h * v, -2 * h * o * M, -2 * h * b, -2 * c * o * M - 2 * l * b), ph.set(p + d * y, d * o * v, 0, 2 * c * l * (u - _) * S, d * g, 0, 2 * c * h * (u - _) * S, 2 * l * h * w * w, 0), xh.identity(), oh.subtract(xh, uh.multiplyScalar(n)), oh.subtract(xh, ph.multiplyScalar(n * n)), oh.getInverse(bh, xh), ch.copy(hh).addScaledVector(t.clone().applyMatrix3(ph), n).multiplyScalar(n), ch.applyMatrix3(bh), sh.copy(t.clone().add(ch).multiplyScalar(n)), e.__tetrad)
				for (let t = 0; t < 2; t++) {
					const i = e.__tetrad[t],
						r = i.x,
						a = i.y,
						s = i.z;
					dh.set(o * (l * a + y * h * s), -o * (c * a + r * l) * M + x * h * s, -o * (c * s + r * h) * M - b * (l * s + a * h)), fh.set(0, o * a, o * s * y, -o * a * M, -o * r * M, s * x, -o * s * M, -s * b, -o * r * M - a * b), mh.set(l * a + h * s * y, h * o * s * v, 0, (l * r + c * a) * (u - _) * S, h * s * g, 0, (h * r + c * s) * (u - _) * S, (h * a + l * s) * w * w, 0), vh.set(0, l * o, h * o * y, -l * o * M, -c * o * M, h * x, -h * o * M, -h * b, -c * o * M - l * b), xh.identity(), oh.subtract(xh, vh.multiplyScalar(n)), oh.getInverse(bh, xh), gh.copy(sh).applyMatrix3(mh), yh.copy(ch).applyMatrix3(fh), lh.copy(dh).add(gh).add(yh).multiplyScalar(n).applyMatrix3(bh), i.add(lh)
				}
			t.add(ch), i.add(sh)
		}
		quaternionToTetrad(e, t) {
			wh.makeRotationFromQuaternion(e), t[0].set(wh.elements[0], wh.elements[1], wh.elements[2]), t[1].set(wh.elements[4], wh.elements[5], wh.elements[6])
		}
		tetradToQuaternion(e, t) {
			e[2].crossVectors(e[0], e[1]);
			for (let t = 0; t < 3; t++) e[t].normalize();
			wh.elements[0] = e[0].x, wh.elements[1] = e[0].y, wh.elements[2] = e[0].z, wh.elements[4] = e[1].x, wh.elements[5] = e[1].y, wh.elements[6] = e[1].z, wh.elements[8] = e[2].x, wh.elements[9] = e[2].y, wh.elements[10] = e[2].z, t.setFromRotationMatrix(wh).normalize()
		}
		move(e, t, n) {
			this.adjustCartesianDirection(e.position, t), e.quaternion && (e.__tetrad || (e.__tetrad = [new x, new x, new x]), this.quaternionToTetrad(e.quaternion, e.__tetrad), this.adjustCartesianDirection(e.position, e.__tetrad[0]), this.adjustCartesianDirection(e.position, e.__tetrad[1]));
			for (let i = 0; i < 10; i++) this.step(e, t, n / 10);
			this.adjustSphericalDirection(e.position, t), e.quaternion && (this.adjustSphericalDirection(e.position, e.__tetrad[0]), this.adjustSphericalDirection(e.position, e.__tetrad[1]), this.tetradToQuaternion(e.__tetrad, e.quaternion)), e.position.z = e.position.z % (2 * Math.PI)
		}
	}
	class Mh extends W {
		constructor(e) {
			super(), this.space = e, this.eyes = new Vt(60, 1, .1, 100), this.add(this.eyes)
		}
		move(e) {
			const t = e.length();
			e = e.clone().normalize(), this.space.move(this, e, t)
		}
	}
	const Sh = new en(2, 2);
	Sh.deleteAttribute("normal");
	class Th extends Lt {
		constructor(e) {
			super(Sh, e), this.frustumCulled = !1
		}
	}
	class Eh {
		constructor(e, t) {
			this.renderTarget = t, this.camera = new Ps(-1, 1, 1, -1, 0, 1), this.scene = new q, this.scene.add(new Th(e))
		}
		render(e) {
			const t = e.getRenderTarget(),
				n = e.xr.enabled;
			e.setRenderTarget(this.renderTarget), e.xr.enabled = !1, e.shadowMap.autoUpdate = !1, e.state.buffers.depth.setMask(!0), !1 === e.autoClear && e.clear(), e.render(this.scene, this.camera), e.xr.enabled = n, e.setRenderTarget(t)
		}
	}
	const Ah = document.createElement("canvas").getContext("webgl"),
		Lh = Ah.createTexture(),
		Rh = Ah.createFramebuffer(),
		Ph = Ah.getExtension("OES_texture_float"),
		Ch = Ah.getExtension("OES_texture_half_float");
	const Oh = {
		renderTargetType: function () {
			const e = [{
				extension: Ph,
				test: Ah.FLOAT,
				type: 1015
			}, {
				extension: Ch,
				test: null == Ch ? void 0 : Ch.HALF_FLOAT_OES,
				type: 1016
			}];
			Ah.bindFramebuffer(Ah.FRAMEBUFFER, Rh);
			for (let t of e)
				if (t.extension && t.test && (Ah.bindTexture(Ah.TEXTURE_2D, Lh), Ah.texImage2D(Ah.TEXTURE_2D, 0, Ah.RGBA, 16, 16, 0, Ah.RGBA, t.test, null), Ah.framebufferTexture2D(Ah.FRAMEBUFFER, Ah.COLOR_ATTACHMENT0, Ah.TEXTURE_2D, Lh, 0), Ah.checkFramebufferStatus(Ah.FRAMEBUFFER) === Ah.FRAMEBUFFER_COMPLETE)) return t.type;
			return 1009
		}(),
		smallPotRendering: function () {
			var e = Ah.createTexture(),
				t = Ah.createFramebuffer();
			return Ah.bindFramebuffer(Ah.FRAMEBUFFER, t), Ah.bindTexture(Ah.TEXTURE_2D, e), Ah.texImage2D(Ah.TEXTURE_2D, 0, Ah.RGBA, 16, 1, 0, Ah.RGBA, Ah.UNSIGNED_BYTE, null), Ah.framebufferTexture2D(Ah.FRAMEBUFFER, Ah.COLOR_ATTACHMENT0, Ah.TEXTURE_2D, e, 0), Ah.checkFramebufferStatus(Ah.FRAMEBUFFER) == Ah.FRAMEBUFFER_COMPLETE
		}()
	};
	var Dh = n(0),
		Ih = n.n(Dh),
		Nh = n(1),
		Uh = n.n(Nh),
		zh = n(2),
		Fh = n.n(zh),
		Bh = n(3),
		Hh = n.n(Bh),
		Gh = function (e, t, n, i) {
			return new(n || (n = Promise))((function (r, a) {
				function o(e) {
					try {
						c(i.next(e))
					} catch (e) {
						a(e)
					}
				}

				function s(e) {
					try {
						c(i.throw(e))
					} catch (e) {
						a(e)
					}
				}

				function c(e) {
					var t;
					e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
						e(t)
					}))).then(o, s)
				}
				c((i = i.apply(e, t || [])).next())
			}))
		};
	const kh = document.createElement("canvas"),
		Vh = kh.getContext("2d");

	function jh(e) {
		return Gh(this, void 0, void 0, (function* () {
			kh.width = kh.height = e.naturalWidth, Vh.drawImage(e, 0, 0);
			const t = Vh.getImageData(0, 0, kh.width, kh.width);
			return new Promise(e => {
				const n = new Worker("dist/mipmapWorker.js");
				n.onmessage = t => {
					e(t.data)
				}, n.postMessage(t, [t.data.buffer])
			})
		}))
	}
	var Wh = function (e, t, n, i) {
		return new(n || (n = Promise))((function (r, a) {
			function o(e) {
				try {
					c(i.next(e))
				} catch (e) {
					a(e)
				}
			}

			function s(e) {
				try {
					c(i.throw(e))
				} catch (e) {
					a(e)
				}
			}

			function c(e) {
				var t;
				e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
					e(t)
				}))).then(o, s)
			}
			c((i = i.apply(e, t || [])).next())
		}))
	};

	function qh(e, t = "jpg") {
		const n = ["sky_pos_x", "sky_neg_x", "sky_pos_y", "sky_neg_y", "sky_pos_z", "sky_neg_z"].map(e => e + "." + t),
			i = (new Qo).setPath(e).load(n, () => Wh(this, void 0, void 0, (function* () {
				const e = i.images,
					t = yield Promise.all(e.map(jh)),
					n = t[0].length;
				i.mipmaps = [];
				for (let e = 0; e < n; e++) i.mipmaps.push(new mn([t[0][e], t[1][e], t[2][e], t[3][e], t[4][e], t[5][e]]));
				i.generateMipmaps = !1, i.needsUpdate = !0
			})));
		return i
	}
	const Xh = new x,
		Yh = new v,
		Zh = new x,
		Jh = new A,
		Kh = new A,
		Qh = new A;
	class $h extends Lt {
		constructor(e, t) {
			super(), this.space = e, this.player = t, this.frustumCulled = !1;
			const n = qh("textures/skybox1/"),
				i = qh("textures/skybox2/");
			this.commonUniforms = {
				uRadiusSquared: {
					type: "f",
					value: e.radiusSquared
				},
				uThroatLength: {
					type: "f",
					value: e.throatLength
				},
				uCameraPosition: {
					type: "v3",
					value: new x
				},
				uCameraOrientation: {
					type: "m4",
					value: new A
				},
				uAngleRange: {
					type: "v2",
					value: new c
				}
			};
			const r = {
					RENDER_TO_FLOAT_TEXTURE: ~~(1015 === Oh.renderTargetType || 1016 === Oh.renderTargetType)
				},
				a = Oh.smallPotRendering ? 2048 : 1024,
				o = Oh.smallPotRendering ? 1 : 3;
			this.integrationBuffer = new f(a, o, {
				wrapS: 1001,
				wrapT: 1001,
				format: 1023,
				type: Oh.renderTargetType,
				depthBuffer: !1,
				stencilBuffer: !1,
				generateMipmaps: !1
			});
			const s = new go({
				uniforms: Object.assign({}, this.commonUniforms),
				defines: r,
				vertexShader: Ih.a,
				fragmentShader: Uh.a
			});
			this.integrationStep = new Eh(s, this.integrationBuffer);
			const l = new go({
				uniforms: Object.assign({
					uIntegrationBuffer: {
						type: "t",
						value: this.integrationBuffer.texture
					},
					uSkybox1: {
						type: "t",
						value: n
					},
					uSkybox2: {
						type: "t",
						value: i
					}
				}, this.commonUniforms),
				defines: r,
				vertexShader: Fh.a,
				fragmentShader: Hh.a
			});
			this.renderResultBuffer = new f(1024, 1024, {
				depthBuffer: !1,
				stencilBuffer: !1,
				generateMipmaps: !1
			}), this.renderStep = new Eh(l, this.renderResultBuffer), this.onBeforeRender = this.beforeRender.bind(this), this.geometry = new en(2, 2, 32, 32), this.material = new Ve({
				map: this.renderResultBuffer.texture,
				depthWrite: !1
			}), this.renderOrder = -1
		}
		beforeRender(e, t, n) {
			const i = n;
			i.matrixWorld.decompose(Xh, Yh, Zh), Jh.getInverse(i.projectionMatrix);
			const r = Jh.elements[0],
				a = Jh.elements[5],
				o = r / a;
			if (Qh.elements[0] = r, Qh.elements[5] = a, this.position.copy(Xh), this.quaternion.copy(Yh), this.scale.set(r, a, 1), this.translateZ(-1), this.updateMatrixWorld(), 4 & i.layers.mask) return;
			Kh.makeRotationFromQuaternion(Yh);
			const s = new x;
			s.setFromMatrixColumn(Kh, 2);
			const c = s.angleTo(ih),
				l = Math.atan(a * Math.sqrt(o * o + 1));
			this.commonUniforms.uAngleRange.value.set(Math.max(0, c - l), Math.min(Math.PI, c + l)), this.commonUniforms.uCameraPosition.value.copy(this.player.position), this.commonUniforms.uCameraOrientation.value.copy(Kh), this.commonUniforms.uCameraOrientation.value.multiply(Qh), this.integrationStep.render(e), this.renderStep.render(e);
			const h = n.viewport;
			h && e.state.viewport(h)
		}
		setSize(e, t) {
			this.renderResultBuffer.setSize(e, t)
		}
	}
	class eu extends Nt {
		constructor(e, t, n) {
			super(), this.space = e, this.build(t, n)
		}
		build(e, t) {
			const n = (t - e) / 80,
				i = 2 * Math.PI / 32,
				r = [],
				a = [];
			let o = 0;
			for (let s = 0; s <= 32; s++)
				for (let l = 0; l <= 80; l++) {
					const h = e + l * n,
						u = t + s * i;
					r[o] = new c(h, u), a[o] = this.getNormal(h, u), this.vertices[o] = this.getPoint(h, u), o++
				}
			o = 0;
			for (let e = 1; e <= 32; e++)
				for (let t = 1; t <= 80; t++) {
					const n = 81 * e + t - 1,
						i = 81 * (e - 1) + t - 1,
						s = 81 * (e - 1) + t,
						c = 81 * e + t;
					this.faces[o] = new He(i, n, c, [a[i].clone(), a[n].clone(), a[c].clone()]), this.faceVertexUvs[0][o] = [r[i].clone(), r[n].clone(), r[c].clone()], o++, this.faces[o] = new He(i, c, s, [a[i].clone(), a[c].clone(), a[s].clone()]), this.faceVertexUvs[0][o] = [r[i].clone(), r[c].clone(), r[s].clone()], o++
				}
			this.computeFaceNormals(), this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0, this.uvsNeedUpdate = !0
		}
		getPoint(e, t, n = new x) {
			const i = Math.abs(e) - this.space.throatLength;
			if (i < 0) return n.set(this.space.radius * Math.cos(t), this.space.radius * Math.sin(t), e);
			const r = Math.sqrt(i * i + this.space.radiusSquared),
				a = r / this.space.radius;
			return n.set(r * Math.cos(t), r * Math.sin(t), this.space.throatLength + this.space.radius * Math.log(a + Math.sqrt(a * a - 1))), e < 0 && (n.z *= -1), n
		}
		getXTangent(e, t, n = new x) {
			const i = Math.max(Math.abs(e) - this.space.throatLength, 0);
			return n.set(i * Math.cos(t) * (e < 0 ? -1 : 1), i * Math.sin(t) * (e < 0 ? -1 : 1), this.space.radius), n.normalize()
		}
		getNormal(e, t, n = new x) {
			const i = Math.abs(e) - this.space.throatLength;
			if (i < 0) return n.set(Math.cos(t), Math.sin(t), 0);
			const r = Math.sqrt(i * i + this.space.radiusSquared),
				a = new x(i * Math.cos(t) * (e < 0 ? -1 : 1), i * Math.sin(t) * (e < 0 ? -1 : 1), this.space.radius);
			a.divideScalar(r);
			const o = new x(-r * Math.sin(t), r * Math.cos(t), 0);
			return n.crossVectors(o, a).normalize()
		}
	}
	var tu = n(4),
		nu = n.n(tu),
		iu = n(5),
		ru = n.n(iu);
	const au = new x,
		ou = new x,
		su = new x;
	class cu {
		constructor(e, t) {
			this.space = e, this.limit = t, this.scene = new q, this.camera = new Vt(60, 1, 1, 1e3), this.playerMesh = new W, this.camera.up.set(0, 0, 1), this.geometry = new eu(e, -t, t);
			const n = new Ve;
			this.dotMesh = new Lt(new Qa(.1, 32, 32), n), this.playerMesh.add(this.dotMesh), this.directionMesh = new Lt(new Ut(.1, .1, .4), n), this.directionMesh.position.z = .2, this.playerMesh.add(this.directionMesh), this.scene.add(this.playerMesh);
			const i = (new $o).load("textures/grid.png");
			i.anisotropy = 4, i.wrapS = 1002, i.wrapT = 1002;
			const r = new Gt({
				uniforms: {
					map: {
						type: "t",
						value: i
					}
				},
				vertexShader: nu.a,
				fragmentShader: ru.a,
				side: 2,
				blending: 2,
				transparent: !0,
				depthTest: !1
			});
			this.scene.add(new Lt(this.geometry, r))
		}
		setRatio(e) {
			this.camera.aspect = e, this.camera.updateProjectionMatrix()
		}
		render(e, t) {
			const n = t.position,
				i = (new P).setFromQuaternion(t.eyes.getWorldQuaternion(new v)),
				r = this.geometry.getPoint(n.x, n.z),
				a = Math.sqrt(r.x * r.x + r.y * r.y),
				o = this.limit + 1;
			this.camera.position.set(r.x / a * o, r.y / a * o, 0), this.camera.lookAt(r), this.playerMesh.position.copy(r), this.geometry.getNormal(n.x, n.z, au), this.geometry.getXTangent(n.x, n.z, ou), su.crossVectors(au, ou);
			const s = new A;
			s.elements[0] = au.x, s.elements[1] = au.y, s.elements[2] = au.z, s.elements[4] = ou.x, s.elements[5] = ou.y, s.elements[6] = ou.z, s.elements[8] = su.x, s.elements[9] = su.y, s.elements[10] = su.z, this.playerMesh.quaternion.setFromRotationMatrix(s), this.playerMesh.rotateY(i.x), this.playerMesh.rotateX(i.y), e.render(this.scene, this.camera)
		}
	}
	const lu = new v,
		hu = new x;
	class uu extends W {
		constructor(e) {
			super(), this.player = e, this.resetPosition = !0;
			const t = document.createElement("canvas");
			t.width = 1e3;
			const n = t.getContext("2d");
			n.font = "48px -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif", n.fillStyle = "#fff", n.textAlign = "center", n.beginPath(),
				function (e, t, n, i, r, a) {
					let o = "";
					const s = t.split("\n");
					for (let t = 0; t < s.length; t++) {
						const c = s[t].split(" ");
						for (let t = 0; t < c.length; t++) {
							const s = o + c[t] + " ";
							e.measureText(s).width > r && t > 0 ? (e.fillText(o, n, i), o = c[t] + " ", i += a) : o = s
						}
						e.fillText(o, n, i), i += a, o = ""
					}
				}(n, "Press the trigger button to move yourself towards the controller.", t.width / 2, 50, t.width, 50), this.material = new Ve({
					map: new ea(t),
					color: 16777215,
					transparent: !0,
					side: 2
				}), this.mesh = new Lt(new en(t.width / t.height * 2, 2), this.material), this.material.opacity = this.targetOpacity = 0, this.add(this.mesh), this.mesh.position.set(0, 0, -10)
		}
		hide() {
			this.targetOpacity = 0
		}
		show() {
			this.resetPosition = !0, this.targetOpacity = 1
		}
		update(e) {
			this.player.eyes.getWorldPosition(hu), this.player.eyes.getWorldQuaternion(lu);
			const t = this.resetPosition ? 1 : 1 - Math.exp(-e);
			this.position.lerp(hu, t), this.quaternion.slerp(lu, t), this.material.opacity += (this.targetOpacity - this.material.opacity) * (1 - Math.exp(10 * -e)), this.resetPosition = !1
		}
	}
	class pu {
		constructor(e, t, n, i) {
			this.webglRenderer = e, this.space = t, this.diagramMax = n, this.player = i, this.showDiagram = !0, this.scene = new q, this.light = new Rs(5588019, 1, 4), this.isXr = !1, this.webglRenderer.autoClear = !1, this.showDiagram = !0, this.world = new $h(t, i), this.diagramRenderer = new cu(t, n), this.scene.add(this.world), this.scene.add(this.player), this.scene.add(new Ds(16777215, 2)), this.scene.add(this.light), this.vrInstructions = new uu(this.player), this.vrInstructions.hide();
			const r = () => this.vrInstructions.hide();
			this.webglRenderer.xr.getController(0).addEventListener("selectstart", r), this.webglRenderer.xr.getController(1).addEventListener("selectstart", r), this.scene.add(this.vrInstructions), this.resize(), window.addEventListener("resize", this.resize.bind(this), !1)
		}
		getWidth() {
			return this.webglRenderer.xr.isPresenting ? 1024 : window.innerWidth
		}
		getHeight() {
			return this.webglRenderer.xr.isPresenting ? 1024 : window.innerHeight
		}
		update(e) {
			this.vrInstructions.update(e)
		}
		render() {
			this.webglRenderer.xr.isPresenting ? (this.isXr || (this.resize(), this.vrInstructions.show(), this.isXr = !0), this.renderVr()) : (this.isXr && (this.resize(), this.vrInstructions.visible = !1, this.isXr = !1), this.renderNormal())
		}
		renderNormal() {
			this.webglRenderer.clearColor(), this.webglRenderer.setViewport(0, 0, this.getWidth(), this.getHeight()), this.webglRenderer.render(this.scene, this.player.eyes), this.showDiagram && (this.webglRenderer.setViewport(0, 0, this.getWidth() / 3, this.getHeight() / 3), this.webglRenderer.clearDepth(), this.diagramRenderer.render(this.webglRenderer, this.player))
		}
		renderVr() {
			this.webglRenderer.clearColor(), this.webglRenderer.render(this.scene, this.player.eyes), this.player.eyes.getWorldPosition(this.light.position)
		}
		resize() {
			const e = this.getWidth(),
				t = this.getHeight(),
				n = this.webglRenderer.getPixelRatio(),
				i = e / t;
			this.webglRenderer.setSize(e, t), this.world.setSize(e * n, t * n), this.diagramRenderer.setRatio(i), this.player.eyes.aspect = i;
			this.player.eyes.fov = this.player.eyes.aspect < 1 ? 2 * s.RAD2DEG * Math.atan(Math.tan(30 * s.DEG2RAD) / this.player.eyes.aspect) : 60, this.player.eyes.updateProjectionMatrix()
		}
	}
	class du {
		constructor() {
			this.listeners = new Set
		}
		addListener(e) {
			this.listeners.add(e)
		}
		removeListener(e) {
			this.listeners.delete(e)
		}
		dispatch(e) {
			for (let t of this.listeners) t(e)
		}
	}
	var fu = function (e, t, n, i) {
		return new(n || (n = Promise))((function (r, a) {
			function o(e) {
				try {
					c(i.next(e))
				} catch (e) {
					a(e)
				}
			}

			function s(e) {
				try {
					c(i.throw(e))
				} catch (e) {
					a(e)
				}
			}

			function c(e) {
				var t;
				e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
					e(t)
				}))).then(o, s)
			}
			c((i = i.apply(e, t || [])).next())
		}))
	};
	class mu {
		constructor(e) {
			this.player = e, this.velocity = new x, this.freeMovement = !1, this.enabled = !1, this.enableAction = new du, this.disableAction = new du
		}
		enable() {
			return fu(this, void 0, void 0, (function* () {
				this.enabled || (yield this.onEnable(), this.enabled = !0, this.enableAction.dispatch(void 0))
			}))
		}
		disable() {
			return fu(this, void 0, void 0, (function* () {
				this.enabled && (yield this.onDisable(), this.enabled = !1, this.disableAction.dispatch(void 0))
			}))
		}
		beforeUpdate(e) {}
		afterUpdate(e) {}
		update(e) {
			this.enabled && (this.beforeUpdate(e), this.updateOrientation(e), this.updateVelocity(e), this.afterUpdate(e), this.velocity.lengthSq() > 0 && this.player.move(this.velocity.clone().multiplyScalar(e)))
		}
		requestFreeMovement() {
			return fu(this, void 0, void 0, (function* () {
				this.freeMovement = !0
			}))
		}
		stopFreeMovement() {
			this.freeMovement = !1
		}
	}
	class vu extends mu {
		constructor(e, t) {
			super(e), this.domElement = t, this.moveForward = !0, this.moveBackward = !1, this.moveLeft = !1, this.moveRight = !1, this.moveUp = !1, this.moveDown = !1, this.rotateLeft = !1, this.rotateRight = !1, this.rotationSpeedX = 0, this.rotationSpeedY = 0, this.onMouseMove = this.onMouseMove.bind(this), this.onKeyDown = this.onKeyDown.bind(this), this.onKeyUp = this.onKeyUp.bind(this)
		}
		onEnable() {
			this.moveForward = !1, this.moveBackward = !1, this.moveLeft = !1, this.moveRight = !1, this.moveUp = !1, this.moveDown = !1, this.rotateLeft = !1, this.rotateRight = !1, this.rotationSpeedX = 0, this.rotationSpeedY = 0, document.addEventListener("mousemove", this.onMouseMove, !1), document.addEventListener("keydown", this.onKeyDown, !1), document.addEventListener("keyup", this.onKeyUp, !1)
		}
		onDisable() {
			document.removeEventListener("mousemove", this.onMouseMove, !1), document.removeEventListener("keydown", this.onKeyDown, !1), document.removeEventListener("keyup", this.onKeyUp, !1)
		}
		updateOrientation(e) {
			this.rotationSpeedX -= 4 * this.rotationSpeedX * e, this.rotationSpeedY -= 4 * this.rotationSpeedY * e;
			var t = new x(this.rotationSpeedX * e, -this.rotationSpeedY * e, 100);
			t.normalize();
			const n = new v;
			n.setFromUnitVectors(nh, t), this.player.quaternion.multiply(n), this.freeMovement && (this.rotateLeft && (n.setFromAxisAngle(nh, e), this.player.quaternion.multiply(n)), this.rotateRight && (n.setFromAxisAngle(nh, -e), this.player.quaternion.multiply(n)))
		}
		updateVelocity(e) {
			const t = new x;
			this.moveForward && t.add(ah), this.moveBackward && t.add(nh), this.moveLeft && t.add(ih), this.moveRight && t.add(eh), this.freeMovement && (this.moveUp && t.add(th), this.moveDown && t.add(rh)), t.lengthSq() > 0 && t.normalize().applyQuaternion(this.player.quaternion), this.velocity.lerp(t, 1 - Math.exp(10 * -e))
		}
		onMouseMove(e) {
			document.pointerLockElement === this.domElement && (this.rotationSpeedX -= 4 * (e.movementX || 0), this.freeMovement && (this.rotationSpeedY -= 4 * (e.movementY || 0)))
		}
		onKeyDown(e) {
			switch (e.keyCode) {
				case 37:
				case 65:
					this.moveLeft = !0;
					break;
				case 39:
				case 68:
					this.moveRight = !0;
					break;
				case 38:
				case 87:
					this.moveForward = !0;
					break;
				case 40:
				case 83:
					this.moveBackward = !0;
					break;
				case 82:
					this.moveUp = !0;
					break;
				case 70:
					this.moveDown = !0;
					break;
				case 81:
					this.rotateLeft = !0;
					break;
				case 69:
					this.rotateRight = !0
			}
		}
		onKeyUp(e) {
			switch (e.keyCode) {
				case 37:
				case 65:
					this.moveLeft = !1;
					break;
				case 39:
				case 68:
					this.moveRight = !1;
					break;
				case 38:
				case 87:
					this.moveForward = !1;
					break;
				case 40:
				case 83:
					this.moveBackward = !1;
					break;
				case 82:
					this.moveUp = !1;
					break;
				case 70:
					this.moveDown = !1;
					break;
				case 81:
					this.rotateLeft = !1;
					break;
				case 69:
					this.rotateRight = !1
			}
		}
	}
	var gu = function (e, t, n, i) {
		return new(n || (n = Promise))((function (r, a) {
			function o(e) {
				try {
					c(i.next(e))
				} catch (e) {
					a(e)
				}
			}

			function s(e) {
				try {
					c(i.throw(e))
				} catch (e) {
					a(e)
				}
			}

			function c(e) {
				var t;
				e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
					e(t)
				}))).then(o, s)
			}
			c((i = i.apply(e, t || [])).next())
		}))
	};
	const yu = new v,
		xu = new v(-Math.SQRT1_2, 0, 0, Math.SQRT1_2);
	class bu extends mu {
		constructor(e, t) {
			super(e), this.domElement = t, this.currentTouches = {}, this.velocityTouches = {}, this.screenOrientation = 0, this.forwardSpeed = 0, this.rotationSpeedX = 0, this.onContextMenu = this.onContextMenu.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this), this.onScreenOrientationChange = this.onScreenOrientationChange.bind(this), this.onDeviceOrientationChange = this.onDeviceOrientationChange.bind(this)
		}
		onEnable() {
			this.currentTouches = {}, this.velocityTouches = {}, this.forwardSpeed = 0, this.rotationSpeedX = 0, this.domElement.addEventListener("contextmenu", this.onContextMenu, !1), this.domElement.addEventListener("touchstart", this.onTouchStart, !1), this.domElement.addEventListener("touchmove", this.onTouchMove, !1), this.domElement.addEventListener("touchend", this.onTouchEnd, !1), this.domElement.addEventListener("touchcancel", this.onTouchEnd, !1)
		}
		onDisable() {
			this.domElement.removeEventListener("contextmenu", this.onContextMenu, !1), this.domElement.removeEventListener("touchstart", this.onTouchStart, !1), this.domElement.removeEventListener("touchmove", this.onTouchMove, !1), this.domElement.removeEventListener("touchend", this.onTouchEnd, !1), this.domElement.removeEventListener("touchcancel", this.onTouchEnd, !1)
		}
		requestFreeMovement() {
			return gu(this, void 0, void 0, (function* () {
				window.DeviceOrientationEvent && window.DeviceOrientationEvent.requestPermission && (yield window.DeviceOrientationEvent.requestPermission()), window.addEventListener("orientationchange", this.onScreenOrientationChange, !1), window.addEventListener("deviceorientation", this.onDeviceOrientationChange, !1), this.freeMovement = !0
			}))
		}
		stopFreeMovement() {
			window.removeEventListener("orientationchange", this.onScreenOrientationChange, !1), window.removeEventListener("deviceorientation", this.onDeviceOrientationChange, !1), this.freeMovement = !1
		}
		onContextMenu(e) {
			e.preventDefault()
		}
		onTouchStart(e) {
			e.preventDefault();
			for (let t = 0; t < e.changedTouches.length; t++) {
				const n = e.changedTouches[t];
				this.currentTouches[n.identifier] = {
					start: {
						x: n.clientX,
						y: n.clientY
					},
					previous: {
						x: n.clientX,
						y: n.clientY
					},
					current: {
						x: n.clientX,
						y: n.clientY
					}
				}
			}
		}
		setRotationSpeed(e) {
			const t = this.currentTouches[e.identifier],
				n = 2 * Math.atan(Math.tan(this.player.eyes.fov * s.DEG2RAD * .5) * this.player.eyes.aspect);
			this.rotationSpeedX = n * (t.current.x - t.previous.x) / this.domElement.clientWidth
		}
		addVelocityTouch(e) {
			const t = this.currentTouches[e.identifier];
			this.forwardSpeed = 4 * (t.current.y - t.start.y) / this.domElement.clientHeight, this.velocityTouches[e.identifier] = !0
		}
		removeVelocityTouch(e) {
			delete this.velocityTouches[e.identifier], 0 === Object.keys(this.velocityTouches).length && (this.forwardSpeed = 0)
		}
		onTouchMove(e) {
			for (let t, n, i = 0; i < e.changedTouches.length; i++) {
				t = e.changedTouches[i], n = this.currentTouches[t.identifier], n.previous = n.current, n.current = {
					x: t.clientX,
					y: t.clientY
				};
				const r = n.current.x - n.start.x,
					a = n.current.y - n.start.y;
				Math.abs(r) > Math.abs(a) ? (this.setRotationSpeed(t), this.removeVelocityTouch(t)) : this.addVelocityTouch(t)
			}
		}
		onTouchEnd(e) {
			for (let t, n = 0; n < e.changedTouches.length; n++) t = e.changedTouches[n], delete this.currentTouches[t.identifier], this.removeVelocityTouch(t)
		}
		onDeviceOrientationChange(e) {
			this.deviceOrientation = e
		}
		onScreenOrientationChange() {
			this.screenOrientation = Number(window.orientation) || 0
		}
		updateEyeOrientation() {
			if (!this.deviceOrientation || null === this.deviceOrientation.alpha) return;
			const e = this.deviceOrientation.alpha ? s.DEG2RAD * this.deviceOrientation.alpha : 0,
				t = this.deviceOrientation.beta ? s.DEG2RAD * this.deviceOrientation.beta : 0,
				n = this.deviceOrientation.gamma ? s.DEG2RAD * this.deviceOrientation.gamma : 0,
				i = this.screenOrientation ? s.DEG2RAD * this.screenOrientation : 0,
				r = new P(t, e, -n, "YXZ");
			this.player.eyes.quaternion.setFromEuler(r), this.player.eyes.quaternion.multiply(xu), this.player.eyes.quaternion.multiply(yu.setFromAxisAngle(nh, -i))
		}
		updateOrientation(e) {
			const t = this.player,
				n = new x(this.rotationSpeedX, 0, 1);
			n.normalize(), t.quaternion.multiply(yu.setFromUnitVectors(nh, n)), this.rotationSpeedX -= 4 * this.rotationSpeedX * e, this.freeMovement && this.updateEyeOrientation()
		}
		updateVelocity(e) {
			this.velocity.set(0, 0, this.forwardSpeed).applyQuaternion(this.player.eyes.getWorldQuaternion(yu))
		}
	}
	var wu = function () {
		function e(e) {
			Wo.call(this, e), this.dracoLoader = null, this.ddsLoader = null
		}

		function t() {
			var e = {};
			return {
				get: function (t) {
					return e[t]
				},
				add: function (t, n) {
					e[t] = n
				},
				remove: function (t) {
					delete e[t]
				},
				removeAll: function () {
					e = {}
				}
			}
		}
		e.prototype = Object.assign(Object.create(Wo.prototype), {
			constructor: e,
			load: function (e, t, n, i) {
				var r, a = this;
				r = "" !== this.resourcePath ? this.resourcePath : "" !== this.path ? this.path : zs(e), a.manager.itemStart(e);
				var o = function (t) {
						i ? i(t) : console.error(t), a.manager.itemError(e), a.manager.itemEnd(e)
					},
					s = new Xo(a.manager);
				s.setPath(this.path), s.setResponseType("arraybuffer"), "use-credentials" === a.crossOrigin && s.setWithCredentials(!0), s.load(e, (function (n) {
					try {
						a.parse(n, r, (function (n) {
							t(n), a.manager.itemEnd(e)
						}), o)
					} catch (e) {
						o(e)
					}
				}), n, o)
			},
			setDRACOLoader: function (e) {
				return this.dracoLoader = e, this
			},
			setDDSLoader: function (e) {
				return this.ddsLoader = e, this
			},
			parse: function (e, t, s, c) {
				var h, u = {};
				if ("string" == typeof e) h = e;
				else if (Us(new Uint8Array(e, 0, 4)) === l) {
					try {
						u[n.KHR_BINARY_GLTF] = new p(e)
					} catch (e) {
						return void(c && c(e))
					}
					h = u[n.KHR_BINARY_GLTF].content
				} else h = Us(new Uint8Array(e));
				var m = JSON.parse(h);
				if (void 0 === m.asset || m.asset.version[0] < 2) c && c(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
				else {
					if (m.extensionsUsed)
						for (var y = 0; y < m.extensionsUsed.length; ++y) {
							var x = m.extensionsUsed[y],
								b = m.extensionsRequired || [];
							switch (x) {
								case n.KHR_LIGHTS_PUNCTUAL:
									u[x] = new r(m);
									break;
								case n.KHR_MATERIALS_CLEARCOAT:
									u[x] = new o;
									break;
								case n.KHR_MATERIALS_UNLIT:
									u[x] = new a;
									break;
								case n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
									u[x] = new v;
									break;
								case n.KHR_DRACO_MESH_COMPRESSION:
									u[x] = new d(m, this.dracoLoader);
									break;
								case n.MSFT_TEXTURE_DDS:
									u[x] = new i(this.ddsLoader);
									break;
								case n.KHR_TEXTURE_TRANSFORM:
									u[x] = new f;
									break;
								case n.KHR_MESH_QUANTIZATION:
									u[x] = new g;
									break;
								default:
									b.indexOf(x) >= 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + x + '".')
							}
						}
					new j(m, u, {
						path: t || this.resourcePath || "",
						crossOrigin: this.crossOrigin,
						manager: this.manager
					}).parse(s, c)
				}
			}
		});
		var n = {
			KHR_BINARY_GLTF: "KHR_binary_glTF",
			KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
			KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
			KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
			KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
			KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
			KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
			KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
			MSFT_TEXTURE_DDS: "MSFT_texture_dds"
		};

		function i(e) {
			if (!e) throw new Error("THREE.GLTFLoader: Attempting to load .dds texture without importing DDSLoader");
			this.name = n.MSFT_TEXTURE_DDS, this.ddsLoader = e
		}

		function r(e) {
			this.name = n.KHR_LIGHTS_PUNCTUAL;
			var t = e.extensions && e.extensions[n.KHR_LIGHTS_PUNCTUAL] || {};
			this.lightDefs = t.lights || []
		}

		function a() {
			this.name = n.KHR_MATERIALS_UNLIT
		}

		function o() {
			this.name = n.KHR_MATERIALS_CLEARCOAT
		}
		r.prototype.loadLight = function (e) {
			var t, n = this.lightDefs[e],
				i = new Ue(16777215);
			void 0 !== n.color && i.fromArray(n.color);
			var r = void 0 !== n.range ? n.range : 0;
			switch (n.type) {
				case "directional":
					(t = new Os(i)).target.position.set(0, 0, -1), t.add(t.target);
					break;
				case "point":
					(t = new Rs(i)).distance = r;
					break;
				case "spot":
					(t = new As(i)).distance = r, n.spot = n.spot || {}, n.spot.innerConeAngle = void 0 !== n.spot.innerConeAngle ? n.spot.innerConeAngle : 0, n.spot.outerConeAngle = void 0 !== n.spot.outerConeAngle ? n.spot.outerConeAngle : Math.PI / 4, t.angle = n.spot.outerConeAngle, t.penumbra = 1 - n.spot.innerConeAngle / n.spot.outerConeAngle, t.target.position.set(0, 0, -1), t.add(t.target);
					break;
				default:
					throw new Error('THREE.GLTFLoader: Unexpected light type, "' + n.type + '".')
			}
			return t.position.set(0, 0, 0), t.decay = 2, void 0 !== n.intensity && (t.intensity = n.intensity), t.name = n.name || "light_" + e, Promise.resolve(t)
		}, a.prototype.getMaterialType = function () {
			return Ve
		}, a.prototype.extendParams = function (e, t, n) {
			var i = [];
			e.color = new Ue(1, 1, 1), e.opacity = 1;
			var r = t.pbrMetallicRoughness;
			if (r) {
				if (Array.isArray(r.baseColorFactor)) {
					var a = r.baseColorFactor;
					e.color.fromArray(a), e.opacity = a[3]
				}
				void 0 !== r.baseColorTexture && i.push(n.assignTexture(e, "map", r.baseColorTexture))
			}
			return Promise.all(i)
		}, o.prototype.getMaterialType = function () {
			return xo
		}, o.prototype.extendParams = function (e, t, n) {
			var i = [],
				r = t.extensions[this.name];
			if (void 0 !== r.clearcoatFactor && (e.clearcoat = r.clearcoatFactor), void 0 !== r.clearcoatTexture && i.push(n.assignTexture(e, "clearcoatMap", r.clearcoatTexture)), void 0 !== r.clearcoatRoughnessFactor && (e.clearcoatRoughness = r.clearcoatRoughnessFactor), void 0 !== r.clearcoatRoughnessTexture && i.push(n.assignTexture(e, "clearcoatRoughnessMap", r.clearcoatRoughnessTexture)), void 0 !== r.clearcoatNormalTexture && (i.push(n.assignTexture(e, "clearcoatNormalMap", r.clearcoatNormalTexture)), void 0 !== r.clearcoatNormalTexture.scale)) {
				var a = r.clearcoatNormalTexture.scale;
				e.clearcoatNormalScale = new c(a, a)
			}
			return Promise.all(i)
		};
		var l = "glTF",
			h = 1313821514,
			u = 5130562;

		function p(e) {
			this.name = n.KHR_BINARY_GLTF, this.content = null, this.body = null;
			var t = new DataView(e, 0, 12);
			if (this.header = {
					magic: Us(new Uint8Array(e.slice(0, 4))),
					version: t.getUint32(4, !0),
					length: t.getUint32(8, !0)
				}, this.header.magic !== l) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
			if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
			for (var i = new DataView(e, 12), r = 0; r < i.byteLength;) {
				var a = i.getUint32(r, !0);
				r += 4;
				var o = i.getUint32(r, !0);
				if (r += 4, o === h) {
					var s = new Uint8Array(e, 12 + r, a);
					this.content = Us(s)
				} else if (o === u) {
					var c = 12 + r;
					this.body = e.slice(c, c + a)
				}
				r += a
			}
			if (null === this.content) throw new Error("THREE.GLTFLoader: JSON content not found.")
		}

		function d(e, t) {
			if (!t) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
			this.name = n.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload()
		}

		function f() {
			this.name = n.KHR_TEXTURE_TRANSFORM
		}

		function m(e) {
			yo.call(this), this.isGLTFSpecularGlossinessMaterial = !0;
			var t = ["#ifdef USE_SPECULARMAP", "\tuniform sampler2D specularMap;", "#endif"].join("\n"),
				n = ["#ifdef USE_GLOSSINESSMAP", "\tuniform sampler2D glossinessMap;", "#endif"].join("\n"),
				i = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "\tvec4 texelSpecular = texture2D( specularMap, vUv );", "\ttexelSpecular = sRGBToLinear( texelSpecular );", "\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tspecularFactor *= texelSpecular.rgb;", "#endif"].join("\n"),
				r = ["float glossinessFactor = glossiness;", "#ifdef USE_GLOSSINESSMAP", "\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );", "\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tglossinessFactor *= texelGlossiness.a;", "#endif"].join("\n"),
				a = ["PhysicalMaterial material;", "material.diffuseColor = diffuseColor.rgb;", "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );", "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );", "material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.", "material.specularRoughness += geometryRoughness;", "material.specularRoughness = min( material.specularRoughness, 1.0 );", "material.specularColor = specularFactor.rgb;"].join("\n"),
				o = {
					specular: {
						value: (new Ue).setHex(16777215)
					},
					glossiness: {
						value: 1
					},
					specularMap: {
						value: null
					},
					glossinessMap: {
						value: null
					}
				};
			this._extraUniforms = o, this.onBeforeCompile = function (e) {
				for (var s in o) e.uniforms[s] = o[s];
				e.fragmentShader = e.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;"), e.fragmentShader = e.fragmentShader.replace("uniform float metalness;", "uniform float glossiness;"), e.fragmentShader = e.fragmentShader.replace("#include <roughnessmap_pars_fragment>", t), e.fragmentShader = e.fragmentShader.replace("#include <metalnessmap_pars_fragment>", n), e.fragmentShader = e.fragmentShader.replace("#include <roughnessmap_fragment>", i), e.fragmentShader = e.fragmentShader.replace("#include <metalnessmap_fragment>", r), e.fragmentShader = e.fragmentShader.replace("#include <lights_physical_fragment>", a)
			}, Object.defineProperties(this, {
				specular: {
					get: function () {
						return o.specular.value
					},
					set: function (e) {
						o.specular.value = e
					}
				},
				specularMap: {
					get: function () {
						return o.specularMap.value
					},
					set: function (e) {
						o.specularMap.value = e
					}
				},
				glossiness: {
					get: function () {
						return o.glossiness.value
					},
					set: function (e) {
						o.glossiness.value = e
					}
				},
				glossinessMap: {
					get: function () {
						return o.glossinessMap.value
					},
					set: function (e) {
						o.glossinessMap.value = e, e ? (this.defines.USE_GLOSSINESSMAP = "", this.defines.USE_ROUGHNESSMAP = "") : (delete this.defines.USE_ROUGHNESSMAP, delete this.defines.USE_GLOSSINESSMAP)
					}
				}
			}), delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this.setValues(e)
		}

		function v() {
			return {
				name: n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,
				specularGlossinessParams: ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity", "refractionRatio"],
				getMaterialType: function () {
					return m
				},
				extendParams: function (e, t, n) {
					var i = t.extensions[this.name];
					e.color = new Ue(1, 1, 1), e.opacity = 1;
					var r = [];
					if (Array.isArray(i.diffuseFactor)) {
						var a = i.diffuseFactor;
						e.color.fromArray(a), e.opacity = a[3]
					}
					if (void 0 !== i.diffuseTexture && r.push(n.assignTexture(e, "map", i.diffuseTexture)), e.emissive = new Ue(0, 0, 0), e.glossiness = void 0 !== i.glossinessFactor ? i.glossinessFactor : 1, e.specular = new Ue(1, 1, 1), Array.isArray(i.specularFactor) && e.specular.fromArray(i.specularFactor), void 0 !== i.specularGlossinessTexture) {
						var o = i.specularGlossinessTexture;
						r.push(n.assignTexture(e, "glossinessMap", o)), r.push(n.assignTexture(e, "specularMap", o))
					}
					return Promise.all(r)
				},
				createMaterial: function (e) {
					var t = new m(e);
					return t.fog = !0, t.color = e.color, t.map = void 0 === e.map ? null : e.map, t.lightMap = null, t.lightMapIntensity = 1, t.aoMap = void 0 === e.aoMap ? null : e.aoMap, t.aoMapIntensity = 1, t.emissive = e.emissive, t.emissiveIntensity = 1, t.emissiveMap = void 0 === e.emissiveMap ? null : e.emissiveMap, t.bumpMap = void 0 === e.bumpMap ? null : e.bumpMap, t.bumpScale = 1, t.normalMap = void 0 === e.normalMap ? null : e.normalMap, t.normalMapType = 0, e.normalScale && (t.normalScale = e.normalScale), t.displacementMap = null, t.displacementScale = 1, t.displacementBias = 0, t.specularMap = void 0 === e.specularMap ? null : e.specularMap, t.specular = e.specular, t.glossinessMap = void 0 === e.glossinessMap ? null : e.glossinessMap, t.glossiness = e.glossiness, t.alphaMap = null, t.envMap = void 0 === e.envMap ? null : e.envMap, t.envMapIntensity = 1, t.refractionRatio = .98, t
				}
			}
		}

		function g() {
			this.name = n.KHR_MESH_QUANTIZATION
		}

		function y(e, t, n, i) {
			Lo.call(this, e, t, n, i)
		}
		d.prototype.decodePrimitive = function (e, t) {
			var n = this.json,
				i = this.dracoLoader,
				r = e.extensions[this.name].bufferView,
				a = e.extensions[this.name].attributes,
				o = {},
				s = {},
				c = {};
			for (var l in a) {
				var h = O[l] || l.toLowerCase();
				o[h] = a[l]
			}
			for (l in e.attributes) {
				h = O[l] || l.toLowerCase();
				if (void 0 !== a[l]) {
					var u = n.accessors[e.attributes[l]],
						p = L[u.componentType];
					c[h] = p, s[h] = !0 === u.normalized
				}
			}
			return t.getDependency("bufferView", r).then((function (e) {
				return new Promise((function (t) {
					i.decodeDracoFile(e, (function (e) {
						for (var n in e.attributes) {
							var i = e.attributes[n],
								r = s[n];
							void 0 !== r && (i.normalized = r)
						}
						t(e)
					}), o, c)
				}))
			}))
		}, f.prototype.extendTexture = function (e, t) {
			return e = e.clone(), void 0 !== t.offset && e.offset.fromArray(t.offset), void 0 !== t.rotation && (e.rotation = t.rotation), void 0 !== t.scale && e.repeat.fromArray(t.scale), void 0 !== t.texCoord && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'), e.needsUpdate = !0, e
		}, m.prototype = Object.create(yo.prototype), m.prototype.constructor = m, m.prototype.copy = function (e) {
			return yo.prototype.copy.call(this, e), this.specularMap = e.specularMap, this.specular.copy(e.specular), this.glossinessMap = e.glossinessMap, this.glossiness = e.glossiness, delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this
		}, y.prototype = Object.create(Lo.prototype), y.prototype.constructor = y, y.prototype.copySampleValue_ = function (e) {
			for (var t = this.resultBuffer, n = this.sampleValues, i = this.valueSize, r = e * i * 3 + i, a = 0; a !== i; a++) t[a] = n[r + a];
			return t
		}, y.prototype.beforeStart_ = y.prototype.copySampleValue_, y.prototype.afterEnd_ = y.prototype.copySampleValue_, y.prototype.interpolate_ = function (e, t, n, i) {
			for (var r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = 2 * o, c = 3 * o, l = i - t, h = (n - t) / l, u = h * h, p = u * h, d = e * c, f = d - c, m = -2 * p + 3 * u, v = p - u, g = 1 - m, y = v - u + h, x = 0; x !== o; x++) {
				var b = a[f + x + o],
					w = a[f + x + s] * l,
					_ = a[d + x + o],
					M = a[d + x] * l;
				r[x] = g * b + y * w + m * _ + v * M
			}
			return r
		};
		var b = 0,
			w = 1,
			_ = 2,
			M = 3,
			S = 4,
			T = 5,
			E = 6,
			L = {
				5120: Int8Array,
				5121: Uint8Array,
				5122: Int16Array,
				5123: Uint16Array,
				5125: Uint32Array,
				5126: Float32Array
			},
			R = {
				9728: 1003,
				9729: 1006,
				9984: 1004,
				9985: 1007,
				9986: 1005,
				9987: 1008
			},
			P = {
				33071: 1001,
				33648: 1002,
				10497: 1e3
			},
			C = {
				SCALAR: 1,
				VEC2: 2,
				VEC3: 3,
				VEC4: 4,
				MAT2: 4,
				MAT3: 9,
				MAT4: 16
			},
			O = {
				POSITION: "position",
				NORMAL: "normal",
				TANGENT: "tangent",
				TEXCOORD_0: "uv",
				TEXCOORD_1: "uv2",
				COLOR_0: "color",
				WEIGHTS_0: "skinWeight",
				JOINTS_0: "skinIndex"
			},
			D = {
				scale: "scale",
				translation: "position",
				rotation: "quaternion",
				weights: "morphTargetInfluences"
			},
			I = {
				CUBICSPLINE: void 0,
				LINEAR: 2301,
				STEP: 2300
			},
			N = "OPAQUE",
			U = "MASK",
			z = "BLEND",
			F = {
				"image/png": 1023,
				"image/jpeg": 1022
			};

		function B(e, t) {
			return "string" != typeof e || "" === e ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e)
		}

		function H(e, t, n) {
			for (var i in n.extensions) void 0 === e[i] && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[i] = n.extensions[i])
		}

		function G(e, t) {
			void 0 !== t.extras && ("object" == typeof t.extras ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras))
		}

		function k(e, t) {
			if (e.updateMorphTargets(), void 0 !== t.weights)
				for (var n = 0, i = t.weights.length; n < i; n++) e.morphTargetInfluences[n] = t.weights[n];
			if (t.extras && Array.isArray(t.extras.targetNames)) {
				var r = t.extras.targetNames;
				if (e.morphTargetInfluences.length === r.length) {
					e.morphTargetDictionary = {};
					for (n = 0, i = r.length; n < i; n++) e.morphTargetDictionary[r[n]] = n
				} else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")
			}
		}

		function V(e) {
			for (var t = "", n = Object.keys(e).sort(), i = 0, r = n.length; i < r; i++) t += n[i] + ":" + e[n[i]] + ";";
			return t
		}

		function j(e, n, i) {
			this.json = e || {}, this.extensions = n || {}, this.options = i || {}, this.cache = new t, this.primitiveCache = {}, this.textureLoader = new $o(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.fileLoader = new Xo(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(!0)
		}

		function q(e, t, n) {
			var i = t.attributes,
				r = [];

			function a(t, i) {
				return n.getDependency("accessor", t).then((function (t) {
					e.setAttribute(i, t)
				}))
			}
			for (var o in i) {
				var s = O[o] || o.toLowerCase();
				s in e.attributes || r.push(a(i[o], s))
			}
			if (void 0 !== t.indices && !e.index) {
				var c = n.getDependency("accessor", t.indices).then((function (t) {
					e.setIndex(t)
				}));
				r.push(c)
			}
			return G(e, t),
				function (e, t, n) {
					var i = t.attributes,
						r = new oe;
					if (void 0 !== i.POSITION) {
						var a = (d = n.json.accessors[i.POSITION]).min,
							o = d.max;
						if (void 0 !== a && void 0 !== o) {
							r.set(new x(a[0], a[1], a[2]), new x(o[0], o[1], o[2]));
							var s = t.targets;
							if (void 0 !== s) {
								for (var c = new x, l = new x, h = 0, u = s.length; h < u; h++) {
									var p = s[h];
									if (void 0 !== p.POSITION) {
										var d;
										a = (d = n.json.accessors[p.POSITION]).min, o = d.max;
										void 0 !== a && void 0 !== o ? (l.setX(Math.max(Math.abs(a[0]), Math.abs(o[0]))), l.setY(Math.max(Math.abs(a[1]), Math.abs(o[1]))), l.setZ(Math.max(Math.abs(a[2]), Math.abs(o[2]))), c.max(l)) : console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
									}
								}
								r.expandByVector(c)
							}
							e.boundingBox = r;
							var f = new le;
							r.getCenter(f.center), f.radius = r.min.distanceTo(r.max) / 2, e.boundingSphere = f
						} else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
					}
				}(e, t, n), Promise.all(r).then((function () {
					return void 0 !== t.targets ? function (e, t, n) {
						for (var i = !1, r = !1, a = 0, o = t.length; a < o; a++) {
							if (void 0 !== (l = t[a]).POSITION && (i = !0), void 0 !== l.NORMAL && (r = !0), i && r) break
						}
						if (!i && !r) return Promise.resolve(e);
						var s = [],
							c = [];
						for (a = 0, o = t.length; a < o; a++) {
							var l = t[a];
							if (i) {
								var h = void 0 !== l.POSITION ? n.getDependency("accessor", l.POSITION) : e.attributes.position;
								s.push(h)
							}
							if (r) {
								h = void 0 !== l.NORMAL ? n.getDependency("accessor", l.NORMAL) : e.attributes.normal;
								c.push(h)
							}
						}
						return Promise.all([Promise.all(s), Promise.all(c)]).then((function (t) {
							var n = t[0],
								a = t[1];
							return i && (e.morphAttributes.position = n), r && (e.morphAttributes.normal = a), e.morphTargetsRelative = !0, e
						}))
					}(e, t.targets, n) : e
				}))
		}

		function X(e, t) {
			var n = e.getIndex();
			if (null === n) {
				var i = [],
					r = e.getAttribute("position");
				if (void 0 === r) return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), e;
				for (var a = 0; a < r.count; a++) i.push(a);
				e.setIndex(i), n = e.getIndex()
			}
			var o = n.count - 2,
				s = [];
			if (2 === t)
				for (a = 1; a <= o; a++) s.push(n.getX(0)), s.push(n.getX(a)), s.push(n.getX(a + 1));
			else
				for (a = 0; a < o; a++) a % 2 == 0 ? (s.push(n.getX(a)), s.push(n.getX(a + 1)), s.push(n.getX(a + 2))) : (s.push(n.getX(a + 2)), s.push(n.getX(a + 1)), s.push(n.getX(a)));
			s.length / 3 !== o && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
			var c = e.clone();
			return c.setIndex(s), c
		}
		return j.prototype.parse = function (e, t) {
			var n = this,
				i = this.json,
				r = this.extensions;
			this.cache.removeAll(), this.markDefs(), Promise.all([this.getDependencies("scene"), this.getDependencies("animation"), this.getDependencies("camera")]).then((function (t) {
				var a = {
					scene: t[0][i.scene || 0],
					scenes: t[0],
					animations: t[1],
					cameras: t[2],
					asset: i.asset,
					parser: n,
					userData: {}
				};
				H(r, a, i), G(a, i), e(a)
			})).catch(t)
		}, j.prototype.markDefs = function () {
			for (var e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || [], i = {}, r = {}, a = 0, o = t.length; a < o; a++)
				for (var s = t[a].joints, c = 0, l = s.length; c < l; c++) e[s[c]].isBone = !0;
			for (var h = 0, u = e.length; h < u; h++) {
				var p = e[h];
				void 0 !== p.mesh && (void 0 === i[p.mesh] && (i[p.mesh] = r[p.mesh] = 0), i[p.mesh]++, void 0 !== p.skin && (n[p.mesh].isSkinnedMesh = !0))
			}
			this.json.meshReferences = i, this.json.meshUses = r
		}, j.prototype.getDependency = function (e, t) {
			var i = e + ":" + t,
				r = this.cache.get(i);
			if (!r) {
				switch (e) {
					case "scene":
						r = this.loadScene(t);
						break;
					case "node":
						r = this.loadNode(t);
						break;
					case "mesh":
						r = this.loadMesh(t);
						break;
					case "accessor":
						r = this.loadAccessor(t);
						break;
					case "bufferView":
						r = this.loadBufferView(t);
						break;
					case "buffer":
						r = this.loadBuffer(t);
						break;
					case "material":
						r = this.loadMaterial(t);
						break;
					case "texture":
						r = this.loadTexture(t);
						break;
					case "skin":
						r = this.loadSkin(t);
						break;
					case "animation":
						r = this.loadAnimation(t);
						break;
					case "camera":
						r = this.loadCamera(t);
						break;
					case "light":
						r = this.extensions[n.KHR_LIGHTS_PUNCTUAL].loadLight(t);
						break;
					default:
						throw new Error("Unknown type: " + e)
				}
				this.cache.add(i, r)
			}
			return r
		}, j.prototype.getDependencies = function (e) {
			var t = this.cache.get(e);
			if (!t) {
				var n = this,
					i = this.json[e + ("mesh" === e ? "es" : "s")] || [];
				t = Promise.all(i.map((function (t, i) {
					return n.getDependency(e, i)
				}))), this.cache.add(e, t)
			}
			return t
		}, j.prototype.loadBuffer = function (e) {
			var t = this.json.buffers[e],
				i = this.fileLoader;
			if (t.type && "arraybuffer" !== t.type) throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
			if (void 0 === t.uri && 0 === e) return Promise.resolve(this.extensions[n.KHR_BINARY_GLTF].body);
			var r = this.options;
			return new Promise((function (e, n) {
				i.load(B(t.uri, r.path), e, void 0, (function () {
					n(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'))
				}))
			}))
		}, j.prototype.loadBufferView = function (e) {
			var t = this.json.bufferViews[e];
			return this.getDependency("buffer", t.buffer).then((function (e) {
				var n = t.byteLength || 0,
					i = t.byteOffset || 0;
				return e.slice(i, i + n)
			}))
		}, j.prototype.loadAccessor = function (e) {
			var t = this,
				n = this.json,
				i = this.json.accessors[e];
			if (void 0 === i.bufferView && void 0 === i.sparse) return Promise.resolve(null);
			var r = [];
			return void 0 !== i.bufferView ? r.push(this.getDependency("bufferView", i.bufferView)) : r.push(null), void 0 !== i.sparse && (r.push(this.getDependency("bufferView", i.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", i.sparse.values.bufferView))), Promise.all(r).then((function (e) {
				var r, a = e[0],
					o = C[i.type],
					s = L[i.componentType],
					c = s.BYTES_PER_ELEMENT,
					l = c * o,
					h = i.byteOffset || 0,
					u = void 0 !== i.bufferView ? n.bufferViews[i.bufferView].byteStride : void 0,
					p = !0 === i.normalized;
				if (u && u !== l) {
					var d = Math.floor(h / u),
						f = "InterleavedBuffer:" + i.bufferView + ":" + i.componentType + ":" + d + ":" + i.count,
						m = t.cache.get(f);
					m || (m = new nr(new s(a, d * u, i.count * u / c), u / c), t.cache.add(f, m)), r = new ar(m, o, h % u / c, p)
				} else r = new We(null === a ? new s(i.count * o) : new s(a, h, i.count * o), o, p);
				if (void 0 !== i.sparse) {
					var v = C.SCALAR,
						g = L[i.sparse.indices.componentType],
						y = i.sparse.indices.byteOffset || 0,
						x = i.sparse.values.byteOffset || 0,
						b = new g(e[1], y, i.sparse.count * v),
						w = new s(e[2], x, i.sparse.count * o);
					null !== a && (r = new We(r.array.slice(), r.itemSize, r.normalized));
					for (var _ = 0, M = b.length; _ < M; _++) {
						var S = b[_];
						if (r.setX(S, w[_ * o]), o >= 2 && r.setY(S, w[_ * o + 1]), o >= 3 && r.setZ(S, w[_ * o + 2]), o >= 4 && r.setW(S, w[_ * o + 3]), o >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")
					}
				}
				return r
			}))
		}, j.prototype.loadTexture = function (e) {
			var t, i = this,
				r = this.json,
				a = this.options,
				o = this.textureLoader,
				s = self.URL || self.webkitURL,
				c = r.textures[e],
				l = c.extensions || {},
				h = (t = l[n.MSFT_TEXTURE_DDS] ? r.images[l[n.MSFT_TEXTURE_DDS].source] : r.images[c.source]).uri,
				u = !1;
			return void 0 !== t.bufferView && (h = i.getDependency("bufferView", t.bufferView).then((function (e) {
				u = !0;
				var n = new Blob([e], {
					type: t.mimeType
				});
				return h = s.createObjectURL(n)
			}))), Promise.resolve(h).then((function (e) {
				var t = a.manager.getHandler(e);
				return t || (t = l[n.MSFT_TEXTURE_DDS] ? i.extensions[n.MSFT_TEXTURE_DDS].ddsLoader : o), new Promise((function (n, i) {
					t.load(B(e, a.path), n, void 0, i)
				}))
			})).then((function (e) {
				!0 === u && s.revokeObjectURL(h), e.flipY = !1, c.name && (e.name = c.name), t.mimeType in F && (e.format = F[t.mimeType]);
				var n = (r.samplers || {})[c.sampler] || {};
				return e.magFilter = R[n.magFilter] || 1006, e.minFilter = R[n.minFilter] || 1008, e.wrapS = P[n.wrapS] || 1e3, e.wrapT = P[n.wrapT] || 1e3, e
			}))
		}, j.prototype.assignTexture = function (e, t, i) {
			var r = this;
			return this.getDependency("texture", i.index).then((function (a) {
				if (!a.isCompressedTexture) switch (t) {
					case "aoMap":
					case "emissiveMap":
					case "metalnessMap":
					case "normalMap":
					case "roughnessMap":
						a.format = 1022
				}
				if (void 0 === i.texCoord || 0 == i.texCoord || "aoMap" === t && 1 == i.texCoord || console.warn("THREE.GLTFLoader: Custom UV set " + i.texCoord + " for texture " + t + " not yet supported."), r.extensions[n.KHR_TEXTURE_TRANSFORM]) {
					var o = void 0 !== i.extensions ? i.extensions[n.KHR_TEXTURE_TRANSFORM] : void 0;
					o && (a = r.extensions[n.KHR_TEXTURE_TRANSFORM].extendTexture(a, o))
				}
				e[t] = a
			}))
		}, j.prototype.assignFinalMaterial = function (e) {
			var t = e.geometry,
				n = e.material,
				i = void 0 !== t.attributes.tangent,
				r = void 0 !== t.attributes.color,
				a = void 0 === t.attributes.normal,
				o = !0 === e.isSkinnedMesh,
				s = Object.keys(t.morphAttributes).length > 0,
				c = s && void 0 !== t.morphAttributes.normal;
			if (e.isPoints) {
				var l = "PointsMaterial:" + n.uuid,
					h = this.cache.get(l);
				h || (h = new Wr, ke.prototype.copy.call(h, n), h.color.copy(n.color), h.map = n.map, h.sizeAttenuation = !1, this.cache.add(l, h)), n = h
			} else if (e.isLine) {
				l = "LineBasicMaterial:" + n.uuid;
				var u = this.cache.get(l);
				u || (u = new Ir, ke.prototype.copy.call(u, n), u.color.copy(n.color), this.cache.add(l, u)), n = u
			}
			if (i || r || a || o || s) {
				l = "ClonedMaterial:" + n.uuid + ":";
				n.isGLTFSpecularGlossinessMaterial && (l += "specular-glossiness:"), o && (l += "skinning:"), i && (l += "vertex-tangents:"), r && (l += "vertex-colors:"), a && (l += "flat-shading:"), s && (l += "morph-targets:"), c && (l += "morph-normals:");
				var p = this.cache.get(l);
				p || (p = n.clone(), o && (p.skinning = !0), i && (p.vertexTangents = !0), r && (p.vertexColors = !0), a && (p.flatShading = !0), s && (p.morphTargets = !0), c && (p.morphNormals = !0), this.cache.add(l, p)), n = p
			}
			n.aoMap && void 0 === t.attributes.uv2 && void 0 !== t.attributes.uv && t.setAttribute("uv2", new We(t.attributes.uv.array, 2)), n.normalScale && !i && (n.normalScale.y = -n.normalScale.y), n.clearcoatNormalScale && !i && (n.clearcoatNormalScale.y = -n.clearcoatNormalScale.y), e.material = n
		}, j.prototype.loadMaterial = function (e) {
			var t, i = this.json,
				r = this.extensions,
				a = i.materials[e],
				o = {},
				s = a.extensions || {},
				l = [];
			if (s[n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
				var h = r[n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
				t = h.getMaterialType(), l.push(h.extendParams(o, a, this))
			} else if (s[n.KHR_MATERIALS_UNLIT]) {
				var u = r[n.KHR_MATERIALS_UNLIT];
				t = u.getMaterialType(), l.push(u.extendParams(o, a, this))
			} else {
				t = yo;
				var p = a.pbrMetallicRoughness || {};
				if (o.color = new Ue(1, 1, 1), o.opacity = 1, Array.isArray(p.baseColorFactor)) {
					var d = p.baseColorFactor;
					o.color.fromArray(d), o.opacity = d[3]
				}
				void 0 !== p.baseColorTexture && l.push(this.assignTexture(o, "map", p.baseColorTexture)), o.metalness = void 0 !== p.metallicFactor ? p.metallicFactor : 1, o.roughness = void 0 !== p.roughnessFactor ? p.roughnessFactor : 1, void 0 !== p.metallicRoughnessTexture && (l.push(this.assignTexture(o, "metalnessMap", p.metallicRoughnessTexture)), l.push(this.assignTexture(o, "roughnessMap", p.metallicRoughnessTexture)))
			}!0 === a.doubleSided && (o.side = 2);
			var f = a.alphaMode || N;
			if (f === z ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, f === U && (o.alphaTest = void 0 !== a.alphaCutoff ? a.alphaCutoff : .5)), void 0 !== a.normalTexture && t !== Ve && (l.push(this.assignTexture(o, "normalMap", a.normalTexture)), o.normalScale = new c(1, 1), void 0 !== a.normalTexture.scale && o.normalScale.set(a.normalTexture.scale, a.normalTexture.scale)), void 0 !== a.occlusionTexture && t !== Ve && (l.push(this.assignTexture(o, "aoMap", a.occlusionTexture)), void 0 !== a.occlusionTexture.strength && (o.aoMapIntensity = a.occlusionTexture.strength)), void 0 !== a.emissiveFactor && t !== Ve && (o.emissive = (new Ue).fromArray(a.emissiveFactor)), void 0 !== a.emissiveTexture && t !== Ve && l.push(this.assignTexture(o, "emissiveMap", a.emissiveTexture)), s[n.KHR_MATERIALS_CLEARCOAT]) {
				var v = r[n.KHR_MATERIALS_CLEARCOAT];
				t = v.getMaterialType(), l.push(v.extendParams(o, {
					extensions: s
				}, this))
			}
			return Promise.all(l).then((function () {
				var e;
				return e = t === m ? r[n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(o) : new t(o), a.name && (e.name = a.name), e.map && (e.map.encoding = 3001), e.emissiveMap && (e.emissiveMap.encoding = 3001), G(e, a), a.extensions && H(r, e, a), e
			}))
		}, j.prototype.loadGeometries = function (e) {
			var t = this,
				i = this.extensions,
				r = this.primitiveCache;

			function a(e) {
				return i[n.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then((function (n) {
					return q(n, e, t)
				}))
			}
			for (var o, s, c = [], l = 0, h = e.length; l < h; l++) {
				var u, p = e[l],
					d = (s = void 0, (s = (o = p).extensions && o.extensions[n.KHR_DRACO_MESH_COMPRESSION]) ? "draco:" + s.bufferView + ":" + s.indices + ":" + V(s.attributes) : o.indices + ":" + V(o.attributes) + ":" + o.mode),
					f = r[d];
				if (f) c.push(f.promise);
				else u = p.extensions && p.extensions[n.KHR_DRACO_MESH_COMPRESSION] ? a(p) : q(new ht, p, t), r[d] = {
					primitive: p,
					promise: u
				}, c.push(u)
			}
			return Promise.all(c)
		}, j.prototype.loadMesh = function (e) {
			for (var t, n = this, i = this.json.meshes[e], r = i.primitives, a = [], o = 0, s = r.length; o < s; o++) {
				var c = void 0 === r[o].material ? (void 0 === (t = this.cache).DefaultMaterial && (t.DefaultMaterial = new yo({
					color: 16777215,
					emissive: 0,
					metalness: 1,
					roughness: 1,
					transparent: !1,
					depthTest: !0,
					side: 0
				})), t.DefaultMaterial) : this.getDependency("material", r[o].material);
				a.push(c)
			}
			return a.push(n.loadGeometries(r)), Promise.all(a).then((function (t) {
				for (var a = t.slice(0, t.length - 1), o = t[t.length - 1], s = [], c = 0, l = o.length; c < l; c++) {
					var h, u = o[c],
						p = r[c],
						d = a[c];
					if (p.mode === S || p.mode === T || p.mode === E || void 0 === p.mode) !0 !== (h = !0 === i.isSkinnedMesh ? new Sr(u, d) : new Lt(u, d)).isSkinnedMesh || h.geometry.attributes.skinWeight.normalized || h.normalizeSkinWeights(), p.mode === T ? h.geometry = X(h.geometry, 1) : p.mode === E && (h.geometry = X(h.geometry, 2));
					else if (p.mode === w) h = new Vr(u, d);
					else if (p.mode === M) h = new Hr(u, d);
					else if (p.mode === _) h = new jr(u, d);
					else {
						if (p.mode !== b) throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + p.mode);
						h = new Jr(u, d)
					}
					Object.keys(h.geometry.morphAttributes).length > 0 && k(h, i), h.name = i.name || "mesh_" + e, o.length > 1 && (h.name += "_" + c), G(h, i), n.assignFinalMaterial(h), s.push(h)
				}
				if (1 === s.length) return s[0];
				var f = new Ki;
				for (c = 0, l = s.length; c < l; c++) f.add(s[c]);
				return f
			}))
		}, j.prototype.loadCamera = function (e) {
			var t, n = this.json.cameras[e],
				i = n[n.type];
			if (i) return "perspective" === n.type ? t = new Vt(s.radToDeg(i.yfov), i.aspectRatio || 1, i.znear || 1, i.zfar || 2e6) : "orthographic" === n.type && (t = new Ps(i.xmag / -2, i.xmag / 2, i.ymag / 2, i.ymag / -2, i.znear, i.zfar)), n.name && (t.name = n.name), G(t, n), Promise.resolve(t);
			console.warn("THREE.GLTFLoader: Missing camera parameters.")
		}, j.prototype.loadSkin = function (e) {
			var t = this.json.skins[e],
				n = {
					joints: t.joints
				};
			return void 0 === t.inverseBindMatrices ? Promise.resolve(n) : this.getDependency("accessor", t.inverseBindMatrices).then((function (e) {
				return n.inverseBindMatrices = e, n
			}))
		}, j.prototype.loadAnimation = function (e) {
			for (var t = this.json.animations[e], n = [], i = [], r = [], a = [], o = [], s = 0, c = t.channels.length; s < c; s++) {
				var l = t.channels[s],
					h = t.samplers[l.sampler],
					u = l.target,
					p = void 0 !== u.node ? u.node : u.id,
					d = void 0 !== t.parameters ? t.parameters[h.input] : h.input,
					f = void 0 !== t.parameters ? t.parameters[h.output] : h.output;
				n.push(this.getDependency("node", p)), i.push(this.getDependency("accessor", d)), r.push(this.getDependency("accessor", f)), a.push(h), o.push(u)
			}
			return Promise.all([Promise.all(n), Promise.all(i), Promise.all(r), Promise.all(a), Promise.all(o)]).then((function (n) {
				for (var i = n[0], r = n[1], a = n[2], o = n[3], s = n[4], c = [], l = 0, h = i.length; l < h; l++) {
					var u = i[l],
						p = r[l],
						d = a[l],
						f = o[l],
						m = s[l];
					if (void 0 !== u) {
						var v;
						switch (u.updateMatrix(), u.matrixAutoUpdate = !0, D[m.path]) {
							case D.weights:
								v = No;
								break;
							case D.rotation:
								v = zo;
								break;
							case D.position:
							case D.scale:
							default:
								v = Bo
						}
						var g = u.name ? u.name : u.uuid,
							x = void 0 !== f.interpolation ? I[f.interpolation] : 2301,
							b = [];
						D[m.path] === D.weights ? u.traverse((function (e) {
							!0 === e.isMesh && e.morphTargetInfluences && b.push(e.name ? e.name : e.uuid)
						})) : b.push(g);
						var w = d.array;
						if (d.normalized) {
							var _;
							if (w.constructor === Int8Array) _ = 1 / 127;
							else if (w.constructor === Uint8Array) _ = 1 / 255;
							else if (w.constructor == Int16Array) _ = 1 / 32767;
							else {
								if (w.constructor !== Uint16Array) throw new Error("THREE.GLTFLoader: Unsupported output accessor component type.");
								_ = 1 / 65535
							}
							for (var M = new Float32Array(w.length), S = 0, T = w.length; S < T; S++) M[S] = w[S] * _;
							w = M
						}
						for (S = 0, T = b.length; S < T; S++) {
							var E = new v(b[S] + "." + D[m.path], p.array, w, x);
							"CUBICSPLINE" === f.interpolation && (E.createInterpolant = function (e) {
								return new y(this.times, this.values, this.getValueSize() / 3, e)
							}, E.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0), c.push(E)
						}
					}
				}
				return new Ho(t.name ? t.name : "animation_" + e, void 0, c)
			}))
		}, j.prototype.loadNode = function (e) {
			var t, i = this.json,
				r = this.extensions,
				a = this,
				o = i.meshReferences,
				s = i.meshUses,
				c = i.nodes[e];
			return (t = [], void 0 !== c.mesh && t.push(a.getDependency("mesh", c.mesh).then((function (e) {
				var t;
				if (o[c.mesh] > 1) {
					var n = s[c.mesh]++;
					(t = e.clone()).name += "_instance_" + n
				} else t = e;
				return void 0 !== c.weights && t.traverse((function (e) {
					if (e.isMesh)
						for (var t = 0, n = c.weights.length; t < n; t++) e.morphTargetInfluences[t] = c.weights[t]
				})), t
			}))), void 0 !== c.camera && t.push(a.getDependency("camera", c.camera)), c.extensions && c.extensions[n.KHR_LIGHTS_PUNCTUAL] && void 0 !== c.extensions[n.KHR_LIGHTS_PUNCTUAL].light && t.push(a.getDependency("light", c.extensions[n.KHR_LIGHTS_PUNCTUAL].light)), Promise.all(t)).then((function (e) {
				var t;
				if ((t = !0 === c.isBone ? new Lr : e.length > 1 ? new Ki : 1 === e.length ? e[0] : new W) !== e[0])
					for (var n = 0, i = e.length; n < i; n++) t.add(e[n]);
				if (c.name && (t.userData.name = c.name, t.name = Rc.sanitizeNodeName(c.name)), G(t, c), c.extensions && H(r, t, c), void 0 !== c.matrix) {
					var a = new A;
					a.fromArray(c.matrix), t.applyMatrix4(a)
				} else void 0 !== c.translation && t.position.fromArray(c.translation), void 0 !== c.rotation && t.quaternion.fromArray(c.rotation), void 0 !== c.scale && t.scale.fromArray(c.scale);
				return t
			}))
		}, j.prototype.loadScene = function () {
			function e(t, n, i, r) {
				var a = i.nodes[t];
				return r.getDependency("node", t).then((function (e) {
					return void 0 === a.skin ? e : r.getDependency("skin", a.skin).then((function (e) {
						for (var n = [], i = 0, a = (t = e).joints.length; i < a; i++) n.push(r.getDependency("node", t.joints[i]));
						return Promise.all(n)
					})).then((function (n) {
						return e.traverse((function (e) {
							if (e.isMesh) {
								for (var i = [], r = [], a = 0, o = n.length; a < o; a++) {
									var s = n[a];
									if (s) {
										i.push(s);
										var c = new A;
										void 0 !== t.inverseBindMatrices && c.fromArray(t.inverseBindMatrices.array, 16 * a), r.push(c)
									} else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[a])
								}
								e.bind(new Ar(i, r), e.matrixWorld)
							}
						})), e
					}));
					var t
				})).then((function (t) {
					n.add(t);
					var o = [];
					if (a.children)
						for (var s = a.children, c = 0, l = s.length; c < l; c++) {
							var h = s[c];
							o.push(e(h, t, i, r))
						}
					return Promise.all(o)
				}))
			}
			return function (t) {
				var n = this.json,
					i = this.extensions,
					r = this.json.scenes[t],
					a = new Ki;
				r.name && (a.name = r.name), G(a, r), r.extensions && H(i, a, r);
				for (var o = r.nodes || [], s = [], c = 0, l = o.length; c < l; c++) s.push(e(o[c], a, n, this));
				return Promise.all(s).then((function () {
					return a
				}))
			}
		}(), e
	}();
	const _u = {
		Handedness: Object.freeze({
			NONE: "none",
			LEFT: "left",
			RIGHT: "right"
		}),
		ComponentState: Object.freeze({
			DEFAULT: "default",
			TOUCHED: "touched",
			PRESSED: "pressed"
		}),
		ComponentProperty: Object.freeze({
			BUTTON: "button",
			X_AXIS: "xAxis",
			Y_AXIS: "yAxis",
			STATE: "state"
		}),
		ComponentType: Object.freeze({
			TRIGGER: "trigger",
			SQUEEZE: "squeeze",
			TOUCHPAD: "touchpad",
			THUMBSTICK: "thumbstick",
			BUTTON: "button"
		}),
		ButtonTouchThreshold: .05,
		AxisTouchThreshold: .1,
		VisualResponseProperty: Object.freeze({
			TRANSFORM: "transform",
			VISIBILITY: "visibility"
		})
	};
	async function Mu(e) {
		const t = await fetch(e);
		if (t.ok) return t.json();
		throw new Error(t.statusText)
	}
	async function Su(e, t, n = null, i = !0) {
		if (!e) throw new Error("No xrInputSource supplied");
		if (!t) throw new Error("No basePath supplied");
		const r = await async function (e) {
			if (!e) throw new Error("No basePath supplied");
			return await Mu(e + "/profilesList.json")
		}(t);
		let a;
		if (e.profiles.some(e => {
				const n = r[e];
				return n && (a = {
					profileId: e,
					profilePath: `${t}/${n.path}`,
					deprecated: !!n.deprecated
				}), !!a
			}), !a) {
			if (!n) throw new Error("No matching profile name found");
			const e = r[n];
			if (!e) throw new Error(`No matching profile name found and default profile "${n}" missing.`);
			a = {
				profileId: n,
				profilePath: `${t}/${e.path}`,
				deprecated: !!e.deprecated
			}
		}
		const o = await Mu(a.profilePath);
		let s;
		if (i) {
			let t;
			if (t = "any" === e.handedness ? o.layouts[Object.keys(o.layouts)[0]] : o.layouts[e.handedness], !t) throw new Error(`No matching handedness, ${e.handedness}, in profile ${a.profileId}`);
			t.assetPath && (s = a.profilePath.replace("profile.json", t.assetPath))
		}
		return {
			profile: o,
			assetPath: s
		}
	}
	const Tu = {
		xAxis: 0,
		yAxis: 0,
		button: 0,
		state: _u.ComponentState.DEFAULT
	};
	class Eu {
		constructor(e) {
			this.componentProperty = e.componentProperty, this.states = e.states, this.valueNodeName = e.valueNodeName, this.valueNodeProperty = e.valueNodeProperty, this.valueNodeProperty === _u.VisualResponseProperty.TRANSFORM && (this.minNodeName = e.minNodeName, this.maxNodeName = e.maxNodeName), this.value = 0, this.updateFromComponent(Tu)
		}
		updateFromComponent({
			xAxis: e,
			yAxis: t,
			button: n,
			state: i
		}) {
			const {
				normalizedXAxis: r,
				normalizedYAxis: a
			} = function (e = 0, t = 0) {
				let n = e,
					i = t;
				if (Math.sqrt(e * e + t * t) > 1) {
					const r = Math.atan2(t, e);
					n = Math.cos(r), i = Math.sin(r)
				}
				return {
					normalizedXAxis: .5 * n + .5,
					normalizedYAxis: .5 * i + .5
				}
			}(e, t);
			switch (this.componentProperty) {
				case _u.ComponentProperty.X_AXIS:
					this.value = this.states.includes(i) ? r : .5;
					break;
				case _u.ComponentProperty.Y_AXIS:
					this.value = this.states.includes(i) ? a : .5;
					break;
				case _u.ComponentProperty.BUTTON:
					this.value = this.states.includes(i) ? n : 0;
					break;
				case _u.ComponentProperty.STATE:
					this.valueNodeProperty === _u.VisualResponseProperty.VISIBILITY ? this.value = this.states.includes(i) : this.value = this.states.includes(i) ? 1 : 0;
					break;
				default:
					throw new Error("Unexpected visualResponse componentProperty " + this.componentProperty)
			}
		}
	}
	class Au {
		constructor(e, t) {
			if (!(e && t && t.visualResponses && t.gamepadIndices && 0 !== Object.keys(t.gamepadIndices).length)) throw new Error("Invalid arguments supplied");
			this.id = e, this.type = t.type, this.rootNodeName = t.rootNodeName, this.touchPointNodeName = t.touchPointNodeName, this.visualResponses = {}, Object.keys(t.visualResponses).forEach(e => {
				const n = new Eu(t.visualResponses[e]);
				this.visualResponses[e] = n
			}), this.gamepadIndices = Object.assign({}, t.gamepadIndices), this.values = {
				state: _u.ComponentState.DEFAULT,
				button: void 0 !== this.gamepadIndices.button ? 0 : void 0,
				xAxis: void 0 !== this.gamepadIndices.xAxis ? 0 : void 0,
				yAxis: void 0 !== this.gamepadIndices.yAxis ? 0 : void 0
			}
		}
		get data() {
			return {
				id: this.id,
				...this.values
			}
		}
		updateFromGamepad(e) {
			if (this.values.state = _u.ComponentState.DEFAULT, void 0 !== this.gamepadIndices.button && e.buttons.length > this.gamepadIndices.button) {
				const t = e.buttons[this.gamepadIndices.button];
				this.values.button = t.value, this.values.button = this.values.button < 0 ? 0 : this.values.button, this.values.button = this.values.button > 1 ? 1 : this.values.button, t.pressed || 1 === this.values.button ? this.values.state = _u.ComponentState.PRESSED : (t.touched || this.values.button > _u.ButtonTouchThreshold) && (this.values.state = _u.ComponentState.TOUCHED)
			}
			void 0 !== this.gamepadIndices.xAxis && e.axes.length > this.gamepadIndices.xAxis && (this.values.xAxis = e.axes[this.gamepadIndices.xAxis], this.values.xAxis = this.values.xAxis < -1 ? -1 : this.values.xAxis, this.values.xAxis = this.values.xAxis > 1 ? 1 : this.values.xAxis, this.values.state === _u.ComponentState.DEFAULT && Math.abs(this.values.xAxis) > _u.AxisTouchThreshold && (this.values.state = _u.ComponentState.TOUCHED)), void 0 !== this.gamepadIndices.yAxis && e.axes.length > this.gamepadIndices.yAxis && (this.values.yAxis = e.axes[this.gamepadIndices.yAxis], this.values.yAxis = this.values.yAxis < -1 ? -1 : this.values.yAxis, this.values.yAxis = this.values.yAxis > 1 ? 1 : this.values.yAxis, this.values.state === _u.ComponentState.DEFAULT && Math.abs(this.values.yAxis) > _u.AxisTouchThreshold && (this.values.state = _u.ComponentState.TOUCHED)), Object.values(this.visualResponses).forEach(e => {
				e.updateFromComponent(this.values)
			})
		}
	}
	class Lu {
		constructor(e, t, n) {
			if (!e) throw new Error("No xrInputSource supplied");
			if (!t) throw new Error("No profile supplied");
			this.xrInputSource = e, this.assetUrl = n, this.id = t.profileId, this.layoutDescription = t.layouts[e.handedness], this.components = {}, Object.keys(this.layoutDescription.components).forEach(e => {
				const t = this.layoutDescription.components[e];
				this.components[e] = new Au(e, t)
			}), this.updateFromGamepad()
		}
		get gripSpace() {
			return this.xrInputSource.gripSpace
		}
		get targetRaySpace() {
			return this.xrInputSource.targetRaySpace
		}
		get data() {
			const e = [];
			return Object.values(this.components).forEach(t => {
				e.push(t.data)
			}), e
		}
		updateFromGamepad() {
			Object.values(this.components).forEach(e => {
				e.updateFromGamepad(this.xrInputSource.gamepad)
			})
		}
	}

	function Ru() {
		W.call(this), this.motionController = null, this.envMap = null
	}

	function Pu(e, t) {
		! function (e, t) {
			Object.values(e.components).forEach(e => {
				const {
					type: n,
					touchPointNodeName: i,
					visualResponses: r
				} = e;
				if (n === _u.ComponentType.TOUCHPAD)
					if (e.touchPointNode = t.getObjectByName(i), e.touchPointNode) {
						const t = new Lt(new Qa(.001), new Ve({
							color: 255
						}));
						e.touchPointNode.add(t)
					} else console.warn(`Could not find touch dot, ${e.touchPointNodeName}, in touchpad component ${e.id}`);
				Object.values(r).forEach(e => {
					const {
						valueNodeName: n,
						minNodeName: i,
						maxNodeName: r,
						valueNodeProperty: a
					} = e;
					if (a === _u.VisualResponseProperty.TRANSFORM) {
						if (e.minNode = t.getObjectByName(i), e.maxNode = t.getObjectByName(r), !e.minNode) return void console.warn(`Could not find ${i} in the model`);
						if (!e.maxNode) return void console.warn(`Could not find ${r} in the model`)
					}
					e.valueNode = t.getObjectByName(n), e.valueNode || console.warn(`Could not find ${n} in the model`)
				})
			})
		}(e.motionController, t), e.envMap && t.traverse(t => {
			t.isMesh && (t.material.envMap = e.envMap, t.material.needsUpdate = !0)
		}), e.add(t)
	}
	Ru.prototype = Object.assign(Object.create(W.prototype), {
		constructor: Ru,
		setEnvironmentMap: function (e) {
			return this.envMap == e || (this.envMap = e, this.traverse(e => {
				e.isMesh && (e.material.envMap = this.envMap, e.material.needsUpdate = !0)
			})), this
		},
		updateMatrixWorld: function (e) {
			W.prototype.updateMatrixWorld.call(this, e), this.motionController && (this.motionController.updateFromGamepad(), Object.values(this.motionController.components).forEach(e => {
				Object.values(e.visualResponses).forEach(e => {
					const {
						valueNode: t,
						minNode: n,
						maxNode: i,
						value: r,
						valueNodeProperty: a
					} = e;
					t && (a === _u.VisualResponseProperty.VISIBILITY ? t.visible = r : a === _u.VisualResponseProperty.TRANSFORM && (v.slerp(n.quaternion, i.quaternion, t.quaternion, r), t.position.lerpVectors(n.position, i.position, r)))
				})
			}))
		}
	});
	const Cu = new(function () {
		function e(e = null) {
			this.gltfLoader = e, this.path = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles", this._assetCache = {}, this.gltfLoader || (this.gltfLoader = new wu)
		}
		return e.prototype = {
			constructor: e,
			createControllerModel: function (e) {
				const t = new Ru;
				let n = null;
				return e.addEventListener("connected", e => {
					const i = e.data;
					"tracked-pointer" === i.targetRayMode && i.gamepad && Su(i, this.path, "generic-trigger").then(({
						profile: e,
						assetPath: r
					}) => {
						t.motionController = new Lu(i, e, r);
						let a = this._assetCache[t.motionController.assetUrl];
						if (a) n = a.scene.clone(), Pu(t, n);
						else {
							if (!this.gltfLoader) throw new Error("GLTFLoader not set.");
							this.gltfLoader.setPath(""), this.gltfLoader.load(t.motionController.assetUrl, e => {
								this._assetCache[t.motionController.assetUrl] = e, n = e.scene.clone(), Pu(t, n)
							}, null, () => {
								throw new Error(`Asset ${t.motionController.assetUrl} missing or malformed.`)
							})
						}
					}).catch(e => {
						console.warn(e)
					})
				}), e.addEventListener("disconnected", () => {
					t.motionController = null, t.remove(n), n = null
				}), t
			}
		}, e
	}());
	class Ou {
		constructor(e, t) {
			this.disconnectAction = new du, this.previousAxes = [], this.triggerPressed = !1, this.controller = e.getController(t), this.onSelectStart = this.onSelectStart.bind(this), this.onSelectEnd = this.onSelectEnd.bind(this), this.onControllerConnect = this.onControllerConnect.bind(this), this.onControllerDisconnect = this.onControllerDisconnect.bind(this), this.controller.addEventListener("selectstart", this.onSelectStart), this.controller.addEventListener("selectend", this.onSelectEnd), this.controller.addEventListener("connected", this.onControllerConnect), this.controller.addEventListener("disconnected", this.onControllerDisconnect), this.grip = e.getControllerGrip(t), this.grip.add(Cu.createControllerModel(this.grip))
		}
		delete() {
			this.controller.removeEventListener("selectstart", this.onSelectStart), this.controller.removeEventListener("selectend", this.onSelectEnd), this.controller.removeEventListener("connected", this.onControllerConnect), this.controller.removeEventListener("disconnected", this.onControllerDisconnect)
		}
		update() {
			this.gamepad && (this.previousAxes = [...this.gamepad.axes])
		}
		onControllerConnect(e) {
			e.data.gamepad && (this.gamepad = e.data.gamepad)
		}
		onControllerDisconnect(e) {
			e.data.gamepad && this.disconnectAction.dispatch(void 0)
		}
		onSelectStart(e) {
			this.triggerPressed = !0
		}
		onSelectEnd(e) {
			this.triggerPressed = !1
		}
	}
	var Du = function (e, t, n, i) {
		return new(n || (n = Promise))((function (r, a) {
			function o(e) {
				try {
					c(i.next(e))
				} catch (e) {
					a(e)
				}
			}

			function s(e) {
				try {
					c(i.throw(e))
				} catch (e) {
					a(e)
				}
			}

			function c(e) {
				var t;
				e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
					e(t)
				}))).then(o, s)
			}
			c((i = i.apply(e, t || [])).next())
		}))
	};
	const Iu = new x,
		Nu = new x,
		Uu = new v,
		zu = new Vt;
	class Fu extends mu {
		constructor(e, t) {
			super(e), this.renderer = t, this.controllers = [], this.controllerJoystickTriggered = new Map, this.disable = this.disable.bind(this)
		}
		onEnable() {
			return Du(this, void 0, void 0, (function* () {
				this.session = yield navigator.xr.requestSession("immersive-vr", {
					optionalFeatures: ["local-floor", "bounded-floor"]
				}), this.session.addEventListener("end", this.disable), this.renderer.xr.setSession(this.session);
				for (let e = 0; e < 2; e++) this.controllers[e] = new Ou(this.renderer.xr, e), this.player.add(this.controllers[e].grip)
			}))
		}
		onDisable() {
			this.session && (this.controllers.forEach(e => {
				e.delete()
			}), this.controllers.length = 0, this.session.removeEventListener("end", this.disable), this.session = null)
		}
		beforeUpdate(e) {
			const t = this.renderer.xr.getCamera(zu);
			this.player.eyes.position.copy(t.position), this.player.eyes.quaternion.copy(t.quaternion)
		}
		afterUpdate(e) {
			this.controllers.forEach(e => e.update())
		}
		updateOrientation(e) {
			for (let e of this.controllers) {
				if (!e.gamepad) continue;
				const t = new c(-e.gamepad.axes[2], e.gamepad.axes[3]),
					n = t.length();
				n < .4 ? this.controllerJoystickTriggered.set(e, !1) : n > .8 && !this.controllerJoystickTriggered.get(e) && (Iu.copy(nh).applyQuaternion(this.player.eyes.quaternion), Nu.set(t.x, t.y, 3).normalize().applyQuaternion(this.player.eyes.quaternion), Uu.setFromUnitVectors(Iu, Nu), this.player.quaternion.multiply(Uu), this.controllerJoystickTriggered.set(e, !0))
			}
		}
		updateVelocity(e) {
			const t = Iu.set(0, 0, 0);
			for (let e of this.controllers) e.triggerPressed && (Nu.subVectors(e.grip.position, this.player.eyes.position).normalize().applyQuaternion(this.player.quaternion), t.add(Nu));
			this.velocity.lerp(t, 1 - Math.exp(10 * -e))
		}
	}
	var Bu = function (e, t, n, i) {
		return new(n || (n = Promise))((function (r, a) {
			function o(e) {
				try {
					c(i.next(e))
				} catch (e) {
					a(e)
				}
			}

			function s(e) {
				try {
					c(i.throw(e))
				} catch (e) {
					a(e)
				}
			}

			function c(e) {
				var t;
				e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
					e(t)
				}))).then(o, s)
			}
			c((i = i.apply(e, t || [])).next())
		}))
	};
	class Hu {
		constructor(e) {
			this.main = e, this.vrButton = document.querySelector(".start-vr"), this.movementToggle = document.querySelector("[name=hide-ui]")
		}
		showElement(e) {
			e.classList.remove("hidden")
		}
		hideElement(e) {
			e.classList.add("hidden")
		}
		toggleElement(e, t) {
			e.classList.toggle("hidden", t)
		}
		startListening() {
			this.removeSplashScreen = this.removeSplashScreen.bind(this), this.updateFreeMovement = this.updateFreeMovement.bind(this), this.showVrButton = this.showVrButton.bind(this), this.hideVrButton = this.hideVrButton.bind(this), document.body.addEventListener("click", e => {
				"A" !== e.target.tagName && this.removeSplashScreen()
			}, !1), this.movementToggle.checked = !1, this.movementToggle.addEventListener("click", this.updateFreeMovement, !1), this.startListeningForMobileControls(), this.startListeningForDesktopControls(), this.startListeningForVrControls(), this.main.allControls.vr.disableAction.addListener(() => {
				this.showVrButton()
			})
		}
		startListeningForMobileControls() {
			document.addEventListener("touchstart", e => {
				"A" !== e.target.tagName && this.setControls("mobile")
			})
		}
		startListeningForDesktopControls() {
			const e = this.main.canvas;
			e.addEventListener("click", () => {
				this.main.currentControls !== this.main.allControls.vr && e.requestPointerLock()
			}, !1), document.addEventListener("pointerlockchange", t => {
				document.pointerLockElement === e && this.setControls("desktop")
			}, !1)
		}
		startListeningForVrControls() {
			return Bu(this, void 0, void 0, (function* () {
				if (!navigator.xr) {
					const {
						default: e
					} = yield n.e(2).then(n.bind(null, 9));
					new e({
						cardboard: !1
					})
				}
				const e = navigator.xr;
				e && (yield e.isSessionSupported("immersive-vr")) && (this.showElement(this.vrButton), this.vrButton.addEventListener("click", () => this.setControls("vr")))
			}))
		}
		setControls(e) {
			switch (this.main.setControls(e), this.updateFreeMovement(), e) {
				case "mobile":
					this.showMobileControls();
					break;
				case "vr":
					this.hideVrButton()
			}
		}
		removeSplashScreen() {
			this.hideElement(document.querySelector(".splash")), document.body.removeEventListener("click", this.removeSplashScreen, !1)
		}
		showVrButton() {
			this.showElement(this.vrButton)
		}
		hideVrButton() {
			this.hideElement(this.vrButton)
		}
		showMobileControls() {
			this.removeSplashScreen();
			const e = document.querySelector(".mobile-instructions");
			this.showElement(e);
			const t = () => {
				this.hideElement(e), document.removeEventListener("touchstart", t, !1)
			};
			document.addEventListener("touchstart", t, !1)
		}
		updateFreeMovement() {
			return Bu(this, void 0, void 0, (function* () {
				if (this.movementToggle.checked) try {
					yield this.requestFreeMovement(), this.main.renderer.showDiagram = !1
				} catch (e) {
					this.movementToggle.checked = !1
				} else this.main.renderer.showDiagram = !0, this.clearFreeMovement();
				this.toggleElement(document.querySelector(".ui"), this.movementToggle.checked)
			}))
		}
		requestFreeMovement() {
			var e;
			return null === (e = this.main.currentControls) || void 0 === e ? void 0 : e.requestFreeMovement()
		}
		clearFreeMovement() {
			var e;
			const t = this.main.player;
			t.position.y = .5 * Math.PI, t.quaternion.x = 0, t.quaternion.z = 0, t.quaternion.normalize(), t.eyes.quaternion.x = 0, t.eyes.quaternion.z = 0, t.eyes.quaternion.normalize(), null === (e = this.main.currentControls) || void 0 === e || e.stopFreeMovement()
		}
	}
	var Gu = function (e, t, n, i) {
		return new(n || (n = Promise))((function (r, a) {
			function o(e) {
				try {
					c(i.next(e))
				} catch (e) {
					a(e)
				}
			}

			function s(e) {
				try {
					c(i.throw(e))
				} catch (e) {
					a(e)
				}
			}

			function c(e) {
				var t;
				e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
					e(t)
				}))).then(o, s)
			}
			c((i = i.apply(e, t || [])).next())
		}))
	};
	class ku {
		constructor() {
			this.wormholeSpace = new _h(1.5, 5), this.prevTime = 0;
			const e = new $i;
			this.canvas = e.domElement, document.querySelector("#canvas-wrapper").appendChild(this.canvas), e.setPixelRatio(window.devicePixelRatio), e.xr.enabled = !0, this.maxX = 5.5 * this.wormholeSpace.radius + this.wormholeSpace.throatLength;
			const t = 2 * this.wormholeSpace.radius + this.wormholeSpace.throatLength;
			this.player = new Mh(this.wormholeSpace), this.player.position.set(t, .5 * Math.PI, 0), this.player.rotateY(.5 * Math.PI), this.renderer = new pu(e, this.wormholeSpace, this.maxX, this.player), this.allControls = {
				desktop: new vu(this.player, this.canvas),
				mobile: new bu(this.player, this.canvas),
				vr: new Fu(this.player, e)
			}, this.allControls.vr.disableAction.addListener(() => this.clearControls()), e.setAnimationLoop(this.loop.bind(this)), this.ui = new Hu(this), this.ui.startListening()
		}
		setControls(e) {
			var t;
			return Gu(this, void 0, void 0, (function* () {
				this.currentControls !== this.allControls[e] && (yield null === (t = this.currentControls) || void 0 === t ? void 0 : t.disable(), this.currentControls = this.allControls[e], yield this.currentControls.enable())
			}))
		}
		clearControls() {
			var e;
			null === (e = this.currentControls) || void 0 === e || e.disable(), this.currentControls = void 0
		}
		loop(e) {
			var t;
			let n = (e - this.prevTime) / 1e3;
			this.prevTime = e, n < .001 || (n > .1 && (n = .1), null === (t = this.currentControls) || void 0 === t || t.update(n), this.player.updateMatrixWorld(), this.player.position.x > this.maxX ? this.player.position.x = this.maxX : this.player.position.x < -this.maxX && (this.player.position.x = -this.maxX), this.renderer.update(n), this.renderer.render())
		}
	}
	"http:" === location.protocol ? location.replace(location.href.replace("http:", "https:")) : new ku
}]);