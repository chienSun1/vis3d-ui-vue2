<template>
  <div class="map-box" ref="mapbox">
    <!-- 地图容器 -->
    <div id="mapContainer" ref="mapContainer"></div>
    <!-- 侧边工具栏 -->
    <Tools v-if="iscrate && toolsType == 'default'"></Tools>
    <ToolsDP v-if="iscrate && toolsType == 'dropdown'"></ToolsDP>
    <ToolsFade v-if="iscrate && toolsType == 'fade'" />
  </div>
</template>
<script>

// 引入配置文件 
import { mapConfig } from "./config/export"
import Tools from "@/views/map3d/Tools-default.vue";
import ToolsDP from "@/views/map3d/Tools-dropdown.vue";
import ToolsFade from "@/views/map3d/Tools-fade.vue";
import "./css/basic.less"
import setThemeStyle from "./css/theme";
window.viewer = null;
window.mapViewer = null;
export default {
  name: "Map",
  components: {
    Tools,
    ToolsDP,
    ToolsFade
  },
  data() {
    return {
      toolsType: 'default',
      iscrate: false, // 是否创建侧边栏 
      workConfig: {},
      plotEntityObjId: null,
      nowStartRoamAttr: null, // 当前漫游的数据
    };
  },

  created() { },

  mounted() {
    // 设置主题样式
    setThemeStyle(this.toolStyle.themeType);
    this.toolsType = this.toolStyle.toolsType;
    // 构建基础地图
    let mapViewer = (window.mapViewer = new window.vis3d.MapViewer(
      "mapContainer",
      mapConfig
    ));
    window.viewer = mapViewer._viewer;
    mapViewer.mapConfig = mapConfig;
    this.iscrate = true;
  },
  destroyed() {
    if (window.viewer) {
      window.viewer.destroy();
      window.viewer = null;
    }
  },
  methods: {
    initWork() { },
    // 工具关闭
    close(name) {
      this.$store.commit("setOperateTool", {
        toolName: name,
        openState: false,
      });
    }
  }

};
</script>
<style scoped>
.map-box {
  width: 100%;
  height: 100%;
}

#mapContainer {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  /* 
  top: 0;
  position: absolute; */
}
</style>
