var THREE = require("three");

var PixelShaderRenderer = require("./pixelshaderrenderer");

var glSupport = require("../util/glsupport");
var floatRenderTargetSupported = glSupport.floatRenderTargetSupported;
var smallPOTRenderingSupported = glSupport.smallPOTRenderingSupported;
var useEquirectangularTextures = true

function SceneRenderer(space) {

  // Init skybox textures
  function loadSkybox(path) {
    if (useEquirectangularTextures) {
      return new THREE.TextureLoader().load(path + "equi.png");
    } else {
      var files = [
        "sky_pos_x", "sky_neg_x",
        "sky_pos_y", "sky_neg_y",
        "sky_pos_z", "sky_neg_z"
      ].map(function(file) {
        return file + ".jpg";
      });

      return new THREE.CubeTextureLoader()
        .setPath(path)
        .load(files);
    }
  }

  var skybox1 = loadSkybox("textures/skybox1/"),
      skybox2 = loadSkybox("textures/skybox2/");

  // Init uniforms
  this.commonUniforms = {
    uRadiusSquared: { type: "f", value: space.radiusSquared },
    uThroatLength: { type: "f", value: space.throatLength },
    uCameraPosition: { type: "v3", value: new THREE.Vector3() },
    uCameraOrientation: { type: "m4", value: new THREE.Matrix4() },
    uAngleRange: { type: "v2", value: new THREE.Vector2() },
  };

  // Init defines
  var commonDefines = {
    RENDER_TO_FLOAT_TEXTURE: ~~floatRenderTargetSupported
  };

  if (useEquirectangularTextures) {
    commonDefines.EQUIRECTANGULAR = 1
  }

  // Init integration stuff

  // Quirk: some older GPUs do not support rendering to textures with a side of 1, 2, 4 or 8 pixels long.
  var width = smallPOTRenderingSupported ? 2048 : 1024;
  var height = smallPOTRenderingSupported ? 1 : 3;
  this._integrationBuffer = new THREE.WebGLRenderTarget(width, height, {
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    format: THREE.RGBAFormat,
    type: floatRenderTargetSupported ? THREE.FloatType : THREE.UnsignedByteType
  });

  var integrationShader = new THREE.RawShaderMaterial({
    uniforms: Object.assign({}, this.commonUniforms),
    defines: commonDefines,

    // Prepend with a newline as a workaround due to a THREE.js bug
    vertexShader: "\n" + require('../shaders/integration.vs.glsl'),
    fragmentShader: "\n" + require('../shaders/integration.fs.glsl')
  });

  this._integrationStep = new PixelShaderRenderer(integrationShader);

  // Init render stuff
  var renderShader = new THREE.RawShaderMaterial({
    uniforms: Object.assign({
      uIntegrationBuffer: { type: "t", value: this._integrationBuffer.texture },
      uSkybox1: { type: "t", value: skybox1 },
      uSkybox2: { type: "t", value: skybox2 }
    }, this.commonUniforms),
    defines: commonDefines,

    // Prepend with a newline as a workaround due to a THREE.js bug
    vertexShader: "\n" + require('../shaders/render.vs.glsl'),
    fragmentShader: "\n" + require('../shaders/render.fs.glsl')
  });

  this._renderStep = new PixelShaderRenderer(renderShader);

  // The minimum field of view (horizontal and vertical)
  this._minFov = 1.0;

  // Variables required for rendering
  this._aspectFix = new THREE.Matrix4();
}

SceneRenderer.prototype = {

  render: function(renderer, camera) {

    // Update the angle range
    var orientation = new THREE.Matrix4;
    orientation.makeRotationFromQuaternion(camera.quaternion);

    var zAxis = new THREE.Vector3;
    zAxis.setFromMatrixColumn(orientation, 2);

    var angleFromZ = zAxis.angleTo(new THREE.Vector3(1, 0, 0));

    this.commonUniforms.uAngleRange.value.set(
      Math.max(0, angleFromZ - this._halfDiagFov),
      Math.min(Math.PI, angleFromZ + this._halfDiagFov)
    );

    // Update the camera-related uniforms
    this.commonUniforms.uCameraPosition.value.copy(camera.position);
    this.commonUniforms.uCameraOrientation.value.copy(orientation);
    this.commonUniforms.uCameraOrientation.value.multiply(this._aspectFix);

    // Integrate...
    this._integrationStep.render(renderer, this._integrationBuffer);

    // And render.
    this._renderStep.render(renderer);
  },

  setSize: function(width, height) {
    this._renderWidth = width;
    this._renderHeight = height;

    var vx, vy;
    if (width > height)
    {
      vx = width / height;
      vy = 1;
    }
    else
    {
      vx = 1;
      vy = height / width;
    }

    var tanHalfFov = Math.tan(this._minFov / 2);
    var vz = 1 / tanHalfFov;

    // Half the diagonal FOV
    this._halfDiagFov = Math.atan(Math.sqrt(vx * vx + vy * vy) * tanHalfFov);

    this._aspectFix.set(vx,  0, 0, 0,
                        0, vy, 0, 0,
                        0,  0, vz, 0,
                        0,  0, 0, 1);
  }

};

module.exports = SceneRenderer;
