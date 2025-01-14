// 内置工具栏配置文件
export default {
    "panel": {
        create: true,
        visible: true
    }, // 是否创建面板
    "tools": [
        {
            "title": "自定义面板",
            "show": false,
            "toolName": "custom",
            "position": {
                "top": 60,
                "left": 10
            },
            "size": {
                "width": 380,
                "height": 480
            },
            "closeDisableSelf": false,
            "closeDisableExcept": [],
            "openDisableAnothers": true,
            "component" : import("@/views/map3d/baseTools/custom/Index.vue")
        },
        {
            "title": "图上标绘",
            "show": false,
            "toolName": "plot",
            "position": {
                "top": 60,
                "left": 10
            },
            "size": {
                "width": 380,
                "height": 480
            },
            "closeDisableSelf": false,
            "closeDisableExcept": [
                "plotStyle"
            ],
            "openDisableAnothers": true,
            "component" : import("@/views/map3d/baseTools/plot/Index.vue")
        },
        {
            "title": "标绘属性",
            "show": false,
            "toolName": "plotStyle",
            "position": {
                "bottom": 40,
                "right": 10
            },
            "size": {
                "width": 350,
                "height": 400
            },
            "closeDisableSelf": true,
            "closeDisableExcept": [],
            "openDisableAnothers": false,
            "component" : import("@/views/map3d/baseTools/plotStyle/Index.vue")
        },
        {
            "title": "图上量算",
            "show": false,
            "toolName": "measure",
            "position": {
                "top": 60,
                "left": 10
            },
            "size": {
                "width": 352,
                "height": 380
            },
            "closeDisableSelf": true,
            "openDisableAnothers": true,
            "component" : import("@/views/map3d/baseTools/measure/Index.vue")
        },
        {
            "title": "底图设置",
            "show": false,
            "toolName": "baseMap",
            "position": {
                "top": 60,
                "right": 120
            },
            "size": {
                "width": 350,
                "height": 300
            },
            "closeDisableSelf": false,
            "openDisableAnothers": false,
            "component" : import("@/views/map3d/baseTools/baseMap/Index.vue")
        },
        {
            "title": "帮助说明",
            "show": false,
            "toolName": "help",
            "position": {
                "top": 50,
                "right": 160
            },
            "size": {
                "width": 350,
                "height": 200
            },
            "closeDisableSelf": false,
            "openDisableAnothers": false,
            "component" : import("@/views/map3d/baseTools/help/Index.vue")
        },
        {
            "title": "图层管理",
            "show": false,
            "toolName": "layers",
            "position": {
                "top": 60,
                "left": 10
            },
            "size": {
                "width": 300,
                "height": 600
            },
            "closeDisableSelf": false,
            "openDisableAnothers": false,
            "disableByOthers": false,
            "component" : import("@/views/map3d/baseTools/layers/Index.vue")
        },
        {
            "title": "空间分析",
            "show": false,
            "toolName": "analysis",
            "position": {
                "top": 60,
                "left": 10
            },
            "size": {
                "width": 350,
                "height": 400
            },
            "closeDisableSelf": false,
            "openDisableAnothers": false,
            "component" : import("@/views/map3d/baseTools/analysis/Index.vue")
        },
        {
            "title": "坐标定位",
            "show": false,
            "toolName": "coordinate",
            "position": {
                "top": 60,
                "left": 10
            },
            "size": {
                "width": 350,
                "height": 300
            },
            "closeDisableSelf": true,
            "openDisableAnothers": false,
            "component" : import("@/views/map3d/baseTools/coordinate/Index.vue")
        },
        {
            "title": "分屏对比",
            "show": false,
            "size": {
                "width": 350,
                "height": 180
            },
            "position": {
                "top": 40,
                "right": 80
            },
            "toolName": "twoScreen",
            "closeDisableSelf": true,
            "openDisableAnothers": false,
            "component" : import("@/views/map3d/baseTools/twoScreen/Index.vue")
        },
        {
            "title": "区域导航",
            "show": false,
            "toolName": "region",
            "closeDisableSelf": true,
            "openDisableAnothers": false,
            "size": {
                "height": 120,
                "width": 300
            },
            "position": {
                "top": 60,
                "left": 10
            },
            "component" : import("@/views/map3d/baseTools/region/Index.vue")
        },
        {
            "title": "路径规划",
            "show": false,
            "toolName": "pathPlan",
            "position": {
                "top": 60,
                "left": 10
            },
            "closeDisableSelf": true,
            "openDisableAnothers": false,
            "component" : import("@/views/map3d/baseTools/pathPlan/Index.vue")
        },
        {
            "title": "视角书签",
            "show": false,
            "toolName": "viewBook",
            "closeDisableSelf": true,
            "openDisableAnothers": false,
            "position": {
                "top": 60,
                "left": 10
            },
            "component" : import("@/views/map3d/baseTools/viewBook/Index.vue")
        },
        {
            "title": "飞行漫游",
            "show": false,
            "toolName": "roam",
            "closeDisableSelf": true,
            "openDisableAnothers": true,
            "closeDisableExcept": [
                "roamStyle"
            ],
            "position": {
                "top": 60,
                "left": 10
            },
            "component" : import("@/views/map3d/baseTools/roam/Index.vue")
        },
        {
            "title": "漫游属性",
            "show": false,
            "toolName": "roamStyle",
            "closeDisableSelf": false,
            "openDisableAnothers": false,
            "position": {
                "bottom": 40,
                "right": 10
            },
            "size": {
                "width": 350,
                "height": 400
            },
            "component" : import("@/views/map3d/baseTools/roamStyle/Index.vue")
        },
        {
            "title": "卷帘对比",
            "show": false,
            "toolName": "layerSplit",
            "closeDisableSelf": true,
            "openDisableAnothers": false,
            "position": {
                "top": 60,
                "left": 10
            },
            "size": {
                "width": 350,
                "height": 180
            },
            "component" : import("@/views/map3d/baseTools/layerSplit/Index.vue")
        },
        {
            "title": "单体化",
            "show": false,
            "toolName": "monomer",
            "closeDisableSelf": true,
            "openDisableAnothers": false,
            "size": {
                "width": 350,
                "height": 320
            },
            "position": {
                "top": 60,
                "left": 10
            },
            "component" : import("@/views/map3d/baseTools/monomer/Index.vue")
        }
    ]
}