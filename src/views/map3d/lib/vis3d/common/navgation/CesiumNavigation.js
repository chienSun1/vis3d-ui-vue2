/* eslint-disable no-unused-vars */
let Cesium = window.Cesium; // 用于Cesium.js src引入
let { defined, Event, knockout, DeveloperError } = Cesium;
import registerKnockoutBindings from './core/registerKnockoutBindings'
import DistanceLegendViewModel from './viewModels/DistanceLegendViewModel'
import NavigationViewModel from './viewModels/NavigationViewModel'

var CesiumEvent = Event

/**
 * @alias CesiumNavigation
 * @constructor
 * @example
 * new CesiumNavigation(viewer, {
        enableCompass: true, // 罗盘
        enableZoomControls: true, // 缩放控制器
        enableDistanceLegend: true, // 比例尺
        enableCompassOuterRing: true, // 罗盘外环
        view: { // 初始化视角
          "x": 109.7884118470029,
          "y": 39.590384952017764,
          "z": 1565.7899788867958,
          "heading": 331.1978494043747,
          "pitch": -8.45296669256617,
          "roll": 0.00043210090111595544
        }
    });

 * @param {Cesium.Viewer} viewerCesiumWidget 地图viewer对象 
 * @param {Object} options 相关配置
 * @param {Boolean} [options.enableCompass=true] 是否创建罗盘
 * @param {Object} [options.compass] 罗盘样式设置
 * @param {Object} [options.compass.style=='leftBottom'] 罗盘位置
 * @param {Boolean} [options.enableZoomControls=true] 是否创建缩放控制器
 * @param {Boolean} [options.enableDistanceLegend=true] 是否创建比例尺
 * @param {Object} [options.distanceLegend] 比例尺样式设置
 * @param {Object} [options.distanceLegend.style=='leftBottom'] 比例尺位置
 * @param {Boolean} [options.enableCompassOuterRing=true] 是否创建罗盘外环
 * @param {Object} [options.view] 初始化视角
 */
var CesiumNavigation = function (viewerCesiumWidget, options) {
  initialize.apply(this, arguments)
  this._onDestroyListeners = []
}

CesiumNavigation.prototype.distanceLegendViewModel = undefined
CesiumNavigation.prototype.navigationViewModel = undefined
CesiumNavigation.prototype.navigationDiv = undefined
CesiumNavigation.prototype.distanceLegendDiv = undefined
CesiumNavigation.prototype.terria = undefined
CesiumNavigation.prototype.container = undefined
CesiumNavigation.prototype._onDestroyListeners = undefined
CesiumNavigation.prototype._navigationLocked = false

CesiumNavigation.prototype.setNavigationLocked = function (locked) {
  this._navigationLocked = locked
  this.navigationViewModel.setNavigationLocked(this._navigationLocked)
}

CesiumNavigation.prototype.getNavigationLocked = function () {
  return this._navigationLocked
}

// CesiumNavigation.prototype.bindObserver = function () {
//   let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
//   let dom_legend = document.querySelector('.distance-legend');
//   let dom_compass = document.querySelector('.compass');
//   let dom_controls = document.querySelector('.navigation-controls');



//   let observer = new MutationObserver((mutationList) => {
//     let width_legend = getComputedStyle(dom_legend).getPropertyValue('width');
//     let height_legend = getComputedStyle(dom_legend).getPropertyValue('height');

//     let width_compass = getComputedStyle(dom_compass).getPropertyValue('width');
//     let height_compass = getComputedStyle(dom_compass).getPropertyValue('height');

//     let width_controls = getComputedStyle(dom_controls).getPropertyValue('width');
//     let height_controls = getComputedStyle(dom_controls).getPropertyValue('height')

//     width_legend = parseInt(width_legend);
//     if (width_legend <= 180) {
//       dom_legend.style.display = "none";
//     } else {
//       dom_legend.style.display = "flex";
//     }

//     width_compass = parseInt(width_compass);
//     height_compass = parseInt(height_compass);
//     if (width_compass <= 180 || height_compass <=180) {
//       dom_compass.style.display = "none";
//     } else {
//       dom_legend.style.display = "flex";
//     }

//     width_controls = parseInt(width_controls);
//     height_controls = parseInt(height_controls);
//     if (width_controls <= 180) {
//       dom_legend.style.display = "none";
//     } else {
//       dom_legend.style.display = "flex";
//     }

//   })
//   observer.observe(element, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })
// }

/**
 * 是否显示
 * @param {Boolean} visible 
 */
CesiumNavigation.prototype.setVisible = function (visible) {
  let dom_legend = document.querySelector('.distance-legend');
  let dom_compass = document.querySelector('.compass');
  let dom_controls = document.querySelector('.navigation-controls');

  dom_legend.style.display = visible ? "block" : "none";
  dom_compass.style.display = visible ? "block" : "none";
  dom_controls.style.display = visible ? "block" : "none";
}

/**
 * 销毁
 */
CesiumNavigation.prototype.destroy = function () {
  if (defined(this.navigationViewModel)) {
    this.navigationViewModel.destroy()
  }
  if (defined(this.distanceLegendViewModel)) {
    this.distanceLegendViewModel.destroy()
  }

  if (defined(this.navigationDiv)) {
    this.navigationDiv.parentNode.removeChild(this.navigationDiv)
  }
  delete this.navigationDiv

  if (defined(this.distanceLegendDiv)) {
    this.distanceLegendDiv.parentNode.removeChild(this.distanceLegendDiv)
  }
  delete this.distanceLegendDiv

  if (defined(this.container)) {
    this.container.parentNode.removeChild(this.container)
  }
  delete this.container

  for (var i = 0; i < this._onDestroyListeners.length; i++) {
    this._onDestroyListeners[i]()
  }
}

CesiumNavigation.prototype.addOnDestroyListener = function (callback) {
  if (typeof callback === 'function') {
    this._onDestroyListeners.push(callback)
  }
}

/**
 
 */
function initialize(viewerCesiumWidget, options) {
  if (!defined(viewerCesiumWidget)) {
    throw new DeveloperError('CesiumWidget or Viewer is required.')
  }

  var cesiumWidget = defined(viewerCesiumWidget.cesiumWidget) ? viewerCesiumWidget.cesiumWidget : viewerCesiumWidget

  // 构件导航球容器
  var container = document.createElement('div')
  container.className = 'cesium-widget-cesiumNavigationContainer';
  container.style.position = 'absolute';
  container.style.bottom = '0px';
  container.style.zIndex = '99';

  const mapDom = document.getElementById(viewerCesiumWidget._container.id);
  mapDom.appendChild(container)
  this.container = container;

  this.terria = viewerCesiumWidget
  this.terria.options = (defined(options)) ? options : {}

  // 定义viewer的事件 供其它模块调用
  this.terria.afterWidgetChanged = new CesiumEvent()
  this.terria.beforeWidgetChanged = new CesiumEvent()

  // 比例尺
  this.distanceLegendDiv = document.createElement('div')
  container.appendChild(this.distanceLegendDiv)
  this.distanceLegendDiv.setAttribute('id', 'distanceLegendDiv')

  let distanceStyleAttr = (options.distanceLegend && options.distanceLegend.style) || "leftBottom";
  distanceStyleAttr = (typeof (distanceStyleAttr) == "string") ? getDistanceStyleByAttr(distanceStyleAttr) : distanceStyleAttr;

  this.distanceLegendViewModel = DistanceLegendViewModel.create({
    container: this.distanceLegendDiv,
    style: distanceStyleAttr,
    terria: this.terria,
    enableDistanceLegend: this.terria.options.enableDistanceLegend == undefined ? true : this.terria.options.enableDistanceLegend
  })

  // 指北针及缩放按钮
  this.navigationDiv = document.createElement('div')
  this.navigationDiv.setAttribute('id', 'navigationDiv')
  container.appendChild(this.navigationDiv)

  let compassStyleAttr = (options.compass && options.compass.style) || "leftBottom";
  compassStyleAttr = (typeof (compassStyleAttr) == "string") ? getCompassStyleByAttr(compassStyleAttr) : compassStyleAttr;

  this.navigationViewModel = NavigationViewModel.create({
    container: this.navigationDiv,
    terria: this.terria,
    style: compassStyleAttr,
    enableZoomControls: this.terria.options.enableZoomControls == undefined ? true : this.terria.options.enableZoomControls,
    enableCompass: this.terria.options.enableCompass == undefined ? true : this.terria.options.enableCompass
  })

  registerKnockoutBindings();
}

function getDistanceStyleByAttr(type) {
  type = type || "leftBottom";
  let defaultStyle = {};
  if (type == "leftBottom") {
    defaultStyle = {
      left: "0px",
      bottom: "4px",
    }
  } else if (type == "leftTop") {
    defaultStyle = {
      left: "0px",
      top: "20px",
    }
  } else if (type == "rightBottom") {
    defaultStyle = {
      right: "20px",
      bottom: "4px",
    }
  } else if (type == "rightTop") {
    defaultStyle = {
      right: "20px",
      top: "20px"
    }
  } else {
    defaultStyle = type
  }
  defaultStyle.zIndex = 99999;
  return defaultStyle;
}

function getCompassStyleByAttr(type) {
  type = type || "rightTop";
  let defaultStyle = {};
  if (type == "leftBottom") {
    defaultStyle = {
      left: "20px",
      bottom: "60px",
    }
  } else if (type == "leftTop") {
    defaultStyle = {
      left: "20px",
      top: "20px",
    }
  } else if (type == "rightBottom") {
    defaultStyle = {
      right: "20px",
      bottom: "60px",
    }
  } else if (type == "rightTop") {
    defaultStyle = {
      right: "20px",
      top: "20px"
    }
  } else {
    defaultStyle = type
  }
  defaultStyle.zIndex = 99999;
  return defaultStyle;
}

export default CesiumNavigation