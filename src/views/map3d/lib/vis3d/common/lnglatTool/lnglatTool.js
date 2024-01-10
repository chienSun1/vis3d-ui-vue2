import "./lnglatTool.css"
/**
 * 底部鼠标及相机信息提示栏
 * @class
 */
class LnglatTool {
    /**
     * 
     * @param {Cesium.viewer} viewer 地图viewer对象 
     * @param {Object} [opt] 其它配置 
     */
    constructor(viewer, opt) {
        this.viewer = viewer;
        this.opt = opt || {};
        this.moveHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        this.initHtml();
        this.bindMouseMoveHandler();
        this.ellipsoid = this.viewer.scene.globe.ellipsoid;
        this.scale = this.opt.scale || [1, 1];
    }

    bindMouseMoveHandler() {
        let that = this;
        this.moveHandler.setInputAction(function (evt) { //单击开始绘制
            const cartesian = that.getCatesian3FromPX(evt.endPosition);
            if (!cartesian) return;
            const lnglat = that.ellipsoid.cartesianToCartographic(cartesian);
            const lat = Cesium.Math.toDegrees(lnglat.latitude);
            const lng = Cesium.Math.toDegrees(lnglat.longitude);
            const height = lnglat.height;
            const cameraV = that.getCameraView();
            that.setHtml({ lng, lat, height }, cameraV);
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

    /**
     * 销毁
     */
    destroy() {
        if (this.moveHandler) {
            this.moveHandler.destroy();
            this.moveHandler = null;
        }

        let doms = document.getElementsByClassName("vis3d-lnglatNavigation");
        doms[0].parentNode.removeChild(doms[0])
    }

    /**
     * 控制坐标显示隐藏
     * @param {Boolean} visible true显示/false隐藏
     */
    setVisible(visible) {
        let doms = document.getElementsByClassName("vis3d-lnglatNavigation");
        if (!doms[0]) return;
        let dom = doms[0];
        /* const display = dom.style.display;
        const displayVisible = display == "block" ? true : false; */
        dom.style.display = visible ? "block" : "none";;

    }

    initHtml() {
        const id = this.viewer.container.id;
        const mapDom = document.getElementById(id);
        let ele = document.createElement("div");
        ele.className = 'vis3d-lnglatNavigation';
        ele.innerHTML = ` <ul>
                            <li style="width:120px;"></li>   
                            <li style="width:120px;"></li>
                            <li style="width:120px;"></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        <ul>`;
        mapDom.appendChild(ele);
    }
    getCatesian3FromPX(px) {
        if (!px) return;
        px.x = px.x / this.scale[0];
        px.y = px.y / this.scale[1];
        let pick = this.viewer.scene.pick(px);
        let cartesian = undefined;

        if (pick && pick.primitive instanceof Cesium.Cesium3DTileset) {
            cartesian = this.viewer.scene.pickPosition(px);
        } else {
            const ray = this.viewer.camera.getPickRay(px);
            if (!ray) return null;
            cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
        }
        return cartesian;
    }
    setHtml(latlngOpt, cameraView) {
        const lng = Number(latlngOpt.lng).toFixed(6);
        const lat = Number(latlngOpt.lat).toFixed(6);
        const height = Number(latlngOpt.height).toFixed(2);
        const heading = Number(cameraView.heading).toFixed(2);
        const pitch = Number(cameraView.pitch).toFixed(2);
        const roll = Number(cameraView.roll).toFixed(2);
        const z = Number(cameraView.z).toFixed(2);
        let eles = document.getElementsByClassName('vis3d-lnglatNavigation');
        if (!eles || eles.length < 1) return;
        let ele = eles[0];
        let lis = ele.children[0].children;
        lis[0].innerHTML = `经度：${lng}`;
        lis[1].innerHTML = `纬度：${lat}`;
        lis[2].innerHTML = `高度：${height}`;
        lis[3].innerHTML = `偏转角：${heading}`;
        lis[4].innerHTML = `仰俯角：${pitch}`;
        lis[5].innerHTML = `翻滚角：${roll}`;
        lis[6].innerHTML = `相机高度：${z}`;
    }

    getCameraView() {
        const camera = this.viewer.camera;
        const position = camera.position;
        const heading = camera.heading;
        const pitch = camera.pitch;
        const roll = camera.roll;
        const lnglat = Cesium.Cartographic.fromCartesian(position);

        return {
            "x": Cesium.Math.toDegrees(lnglat.longitude),
            "y": Cesium.Math.toDegrees(lnglat.latitude),
            "z": lnglat.height,
            "heading": Cesium.Math.toDegrees(heading),
            "pitch": Cesium.Math.toDegrees(pitch),
            "roll": Cesium.Math.toDegrees(roll)
        };
    }
}

export default LnglatTool;