<template>
  <Card :title="title" :position="position" :size="size" :iconfont="iconfont" @close="close">
    <div class="plot-btn-box basic-plot">
      <ul class="plot-btn">
        <el-tooltip v-for="(item, index) in plotBtn" :key="index" class="item" effect="dark" :content="item.name"
          placement="top">
          <li>
            <i :class="['iconfont', item.icon]" @click="btnClick(item)"></i>
          </li>
        </el-tooltip>
      </ul>
      <span></span>
      <ul class="plot-btn">
        <el-tooltip v-for="(item, index) in plotBtn2" :key="index" class="item" effect="dark" :content="item.name"
          placement="top">
          <li>
            <i :class="['iconfont', item.icon]" @click="btnClick(item)"></i>
          </li>
        </el-tooltip>
      </ul>
    </div>
    <div class="plot-select basic-select">
      <el-select v-model="plotInitValue" @change="onChangePlot" placeholder="请选择">
        <el-option v-for="(item, index) in plotTypeList" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>

    <ul class="plot-box basic-tool">
      <li v-for="(item, index) in plotList" :key="index" :class="[index === isPlotActive ? 'tool-active' : '']"
        @click="onChangePlotType(index, item)">
        <span><img :src="item.iconImg" /></span>
        <label>{{ item.name }}</label>
      </li>
    </ul>

    <!-- 打开文件 -->
    <input type="file" accept=".json" style="display: none" id="plot-loadFile" @change="loadFileChange" />
  </Card>
</template>
<script>
import plotList from "./plotList.js";

// 地图标注 基础组件
window.plotDrawTool = null;
let nowPlotEntObj = null; //当前编辑的对象
export default {
  name: "plot",
  components: {

  },
  props: {
    title: "",
    position: {},
    size: {},
    iconfont: {
      type: String,
      default: "icon-tushangcehui",
    },
  },
  data() {
    return {
      cardDialog: false, // 是否打开弹窗
      plotBtn: [
        {
          name: "打开",
          icon: "icon-dakaiwenjian",
          type: "loadFile",
        },
        {
          name: "保存",
          icon: "icon-baocun",
          type: "saveFile",
        },
      ],
      plotBtn2: [
        {
          name: "删除",
          icon: "icon-shanchu",
          type: "plotDelete",
        },
        {
          name: "关闭编辑",
          icon: "icon-shifoubianji",
          type: "plotEdit",
        },
      ],
      plotInitValue: "",
      isPlotActive: -1,
      plotTypeList: [], // 标绘类型
      plotList: [], // 标绘列表
    };
  },

  mounted() {

    // 设置下拉框
    this.$set(this, "plotTypeList", Object.keys(plotList));
    this.$set(
      this,
      "plotInitValue",
      this.plotTypeList.length ? this.plotTypeList[0] : ""
    );
    this.$set(
      this,
      "plotList",
      this.plotTypeList.length ? plotList[this.plotTypeList[0]] : []
    );

    let that = this;
    if (!window.plotDrawTool) {
      window.plotDrawTool = new window.vis3d.plot.Tool(window.viewer, {
        canEdit: true,
      });
      window.plotDrawTool.on("endCreate", function (entObj, ent) {
        // 创建完成后 打开控制面板
        nowPlotEntObj = entObj;
        that.isPlotActive = -1;
        /* let positions = entObj.getPositions(true);
        console.log("plot positions-->", positions); */
      });
      window.plotDrawTool.on("startEdit", function (entObj, ent) {
        // 开始编辑
        nowPlotEntObj = entObj;
        window.workControl.openToolByName("plotStyle", {
          plotEntityObjId: entObj.attr.id
        });
      });
      window.plotDrawTool.on("endEdit", function (entObj, ent) {
        // 编辑完成后
        nowPlotEntObj = null;
        let lnglats = entObj.getPositions(true);
        window.workControl.closeToolByName("plotStyle");
      });
    }
  },

  destroyed() {
    if (window.plotDrawTool) {
      window.plotDrawTool.destroy();
      window.plotDrawTool = null;
    }
    window.workControl.closeToolByName("plotStyle");
  },
  methods: {
    // 选择标绘类型
    onChangePlot(data) {
      this.$set(this, "plotList", plotList[data]);
      this.$set(this, "isPlotActive", -1);
    },
    /**
     * 选择绘制样式
     */
    onChangePlotType(index, item) {
      this.$set(this, "isPlotActive", index);
      this.startDraw(item);
    },

    // 绘制
    startDraw(item, index) {
      item = JSON.parse(JSON.stringify(item)); // 数据隔离
      if (!window.plotDrawTool) return;
      console.log(item);
      window.plotDrawTool.start(item);
      this.$set(this, "cardDialog", true);
    },

    close() {
      window.workControl.closeToolByName(this.$options.name)
    },

    btnClick(item) {
      if (item.type == "loadFile") {
        let dom = document.getElementById("plot-loadFile");
        if (dom) dom.click();
      }

      if (item.type == "saveFile") {
        let jsondata = window.plotDrawTool.toGeojson();
        if (!jsondata) return;
        window.vis3d.tool.downloadFile(
          "图上标绘.json",
          JSON.stringify(jsondata)
        );
      }

      if (item.type == "plotDelete") {
        window.plotDrawTool.removeAll();
      }

      if (item.type == "plotEdit") {
        if (item.name == "关闭编辑") {
          window.plotDrawTool.closeEdit();
        } else {
          window.plotDrawTool.openEdit();
        }
        item.name = item.name == "关闭编辑" ? "开启编辑" : "关闭编辑";
      }
    },

    loadFileChange(e) {
      let file = e.target.files[0];
      let fileName = file.name;
      let fileType = fileName
        .substring(fileName.lastIndexOf(".") + 1, fileName.length)
        .toLowerCase();
      if (fileType != "json") {
        console.warn("文件类型不合法,请选择json格式标注文件！");
        return;
      }
      if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onloadend = function (e) {
          let strjson = this.result;
          strjson = JSON.parse(strjson);
          window.plotDrawTool.createByGeojson(strjson);
        };
      }
      e.target.value = "";
    },

    setEntityStyle(style) {
      window.plotDrawTool.updateOneStyle(nowPlotEntObj, style);
    }
  }

};
</script>

<style lang="less">
.plot-btn-box {
  display: flex;
  align-items: center;

  span {
    width: 1px;
    height: 10px;
    background: #6f768c;
    margin: 0 20px;
  }

  .plot-btn {
    justify-content: space-between;
    width: 50%;
    margin: 0 10px;
    display: flex;
    align-items: center;

    li {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      i {
        font-size: 20px;
      }
    }
  }
}

.basic-plot li:hover {
  background: var(--btnStyleColor);
}

.plot-select {
  margin: 20px 0;

  .el-select {
    width: 100%;
  }

  .el-input__inner {
    border-radius: 20px;
  }
}

.plot-box {
  display: flex;
  flex-wrap: wrap;

  li {
    width: 90px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 16px 10px 0;
    cursor: pointer;

    span {
      font-size: 26px;
      margin-bottom: 10px;
    }

    label {
      cursor: pointer;
      height: 40px;
    }
  }

  img {
    width: 88px;
    height: 78px;
  }
}
</style>
