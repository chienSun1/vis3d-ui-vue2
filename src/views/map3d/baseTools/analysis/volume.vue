<template>
  <div>
    <p class="basic-tooltip">
      提示：请首先单击“绘制区域按钮”，再在图上绘制分析区域，此处仅针对地形可进行方量分析。
    </p>
    <div class="analysis-btn analysis-top-btn basic-analysis-btn">
      <span @click="draw">绘制区域</span>
      <span class="basic-analysis-btn-clear" @click="clear">清除</span>
    </div>
    <ul class="volume-body basic-number">
      <li>
        <label>基准面高：</label>
        <el-input-number :controls="false" v-model="jzmHeight" placeholder="请输入内容"></el-input-number>
        <span> &nbsp;m </span>
        <span class="volume-btn" @click="flfxSetHeight">点选高度</span>
      </li>
      <li>
        <label>挖方体积：</label>
        <el-input-number :controls="false" v-model="digTotalV"></el-input-number>
        <span> &nbsp;m³</span>
      </li>
      <li>
        <label>填方体积：</label>
        <el-input-number :controls="false" v-model="fillTotalV"></el-input-number>
        <span> &nbsp;m³</span>
      </li>
    </ul>
  </div>
</template>
<script>
/* 方量分析 */
window.volumeDrawTool = null;
let wall = null;
let bzmPlane = null;
let bzdPoints = [];
let polygonPositions;
let setHeightHandler = null;

export default {
  name: "Volume",
  data() {
    return {
      jzmHeight: 0,
      digTotalV: 0,
      fillTotalV: 0,
    };
  },
  mounted() {
    let that = this;
    if (!window.volumeDrawTool) {
      window.volumeDrawTool = new window.vis3d.plot.Tool(window.viewer, {
        canEdit: true,
      });
      window.volumeDrawTool.on("endCreate", function (entObj, ent) {
        // 创建完成后 打开控制面板
      });
      window.volumeDrawTool.on("startEdit", function (entObj, ent) {
        // 开始编辑
      });
      window.volumeDrawTool.on("endEdit", function (entObj, ent) {
        polygonPositions = entObj.getPositions();
        // 编辑完成后
        that.clear();
        that.flfxStartCompute(that.jzmHeight);
      });
    }
  },
  destroyed() {
    if (!window.volumeDrawTool) {
      window.volumeDrawTool.destroy();
      window.volumeDrawTool = null;
    }
    if (wall) {
      window.viewer.entities.remove(wall);
      wall = null;
    }
    if (bzmPlane) {
      viewer.entities.remove(bzmPlane);
      bzmPlane = null;
    }
    for (var z = 0; z < bzdPoints.length; z++) {
      var item = bzdPoints[z];
      if (item) {
        viewer.entities.remove(item);
        item = null;
      }
    }
    bzdPoints = [];
  },
  methods: {
    draw() {
      if (!window.volumeDrawTool) return;
      window.volumeDrawTool.start({
        type: "polygon",
        styleType: "polygon",
        style: {
          color: "#00FFFF",
          colorAlpha: 0.5,
          outline: true,
          outlineColor: "#ff0000",
          heightReference: 1,
        },
      });
    },
    clear() {
      if (window.volumeDrawTool) {
        window.volumeDrawTool.removeAll();
      }
      if (wall) {
        window.viewer.entities.remove(wall);
        wall = null;
      }
      if (bzmPlane) {
        viewer.entities.remove(bzmPlane);
        bzmPlane = null;
      }
      for (var z = 0; z < bzdPoints.length; z++) {
        var item = bzdPoints[z];
        if (item) {
          viewer.entities.remove(item);
          item = null;
        }
      }
      bzdPoints = [];
      this.jzmHeight = 0;
      this.digTotalV = 0;
      this.fillTotalV = 0;
    },
    flfxStartCompute(h) {
      let uniformData = window.vis3d.util.computeUniforms(
        polygonPositions,
        false,
        window.viewer
      );
      let minh = uniformData.minHeight;
      let maxh = uniformData.maxHeight;
      if (h) {
        if (h > maxh) {
          maxh = h;
        }
        if (h < minh) {
          minh = h;
        }
      }

      this.createWall(polygonPositions, minh, maxh);
      this.digTotalV = this.digV(uniformData, minh);
      this.fillTotalV = this.fillV(uniformData, maxh);
      // 构建标准面
      this.createBZM(polygonPositions, h || uniformData.minHeight);
    },
    // 挖方体积
    digV(data, minh) {
      if (!data) return;
      var uniforms = data.uniformArr;
      if (!uniforms || uniforms.length == 0 || !minh) return;
      var totalV = 0;
      for (var i = 0; i < uniforms.length; i++) {
        var item = uniforms[i];
        if (item.height > minh) {
          var v = item.area * (item.height - minh);
          totalV += v;
        }
      }
      totalV = totalV.toFixed(2);
      return totalV;
    },
    // 填方体积
    fillV(data, maxh) {
      if (!data) return;
      var uniforms = data.uniformArr;
      if (!uniforms || uniforms.length == 0 || !maxh) return;
      var totalV = 0;
      for (var i = 0; i < uniforms.length; i++) {
        var item = uniforms[i];
        if (maxh > item.height) {
          var v = item.area * (maxh - item.height);
          totalV += v;
        }
      }
      totalV = totalV.toFixed(2);
      return totalV;
    },
    // 构建墙体
    createWall(positions, minheight, maxheight) {
      if (wall) {
        viewer.entities.remove(wall);
        wall = null;
      }
      positions = positions.concat([positions[0]]);
      var minimumHeights = [],
        maximumHeights = [];
      for (var i = 0; i < positions.length; i++) {
        minimumHeights.push(minheight);
        maximumHeights.push(maxheight);
      }

      wall = viewer.entities.add({
        wall: {
          positions: positions,
          minimumHeights: minimumHeights,
          maximumHeights: maximumHeights,
          material: Cesium.Color.fromRandom({
            alpha: 0.7,
          }),
        },
      });
    },
    // 创建标准面
    createBZM(positions, height) {
      if (bzmPlane) {
        viewer.entities.remove(bzmPlane);
        bzmPlane = null;
      }
      for (var z = 0; z < bzdPoints.length; z++) {
        var item = bzdPoints[z];
        if (item) viewer.entities.remove(item);
      }
      bzdPoints = [];
      var positions = window.vis3d.util.updatePositionsHeight(positions, height);
      bzmPlane = viewer.entities.add({
        polygon: {
          hierarchy: new Cesium.PolygonHierarchy(positions),
          material: Cesium.Color.AQUA.withAlpha(0.5),
          height: height,
        },
      });
      var text = "基准面高度为：" + Number(height).toFixed(2) + "米";
      for (var i = 0; i < positions.length; i = i + 1) {
        var bzd = viewer.entities.add({
          position: positions[i],
          label: {
            text: text || "",
            font: "16px Helvetica",
            fillColor: Cesium.Color.YELLOW,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -20),
          },
        });
        bzdPoints.push(bzd);
      }
    },
    flfxSetHeight(callback) {
      let that = this;
      if (!setHeightHandler) {
        setHeightHandler = new Cesium.ScreenSpaceEventHandler(
          window.viewer.scene.canvas
        );
      }

      setHeightHandler.setInputAction(function (evt) {
        //单击开始绘制
        debugger
        let ray = viewer.camera.getPickRay(evt.position);
        if (!ray) return null;
        let cartesian = viewer.scene.globe.pick(ray, viewer.scene);
        let lnglat = window.vis3d.util.cartesianToLnglat(cartesian);
        that.jzmHeight = Number(lnglat[2].toFixed(2));
        that.flfxStartCompute(that.jzmHeight);
        setHeightHandler.destroy();
        setHeightHandler = null;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
  },
};
</script>

<style lang="less">
.volume-body {
  margin-top: 15px;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    label {
      display: flex;
      align-items: center;
    }

    .el-input-number {
      width: 100px;
    }

    .volume-btn {
      height: 40px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-radius: 2px;
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
</style>
