// 定义面板中标绘类别及默认样式
const list = {
    "基础标绘": [
        {
            "name": "点",
            "type": "point",
            "iconImg": require('../../images/plot/point.png'),
            "styleType": "point"
        },
        {
            "name": "线",
            "type": "polyline",
            "iconImg": require('../../images/plot/polyline.png'),
            "styleType": "polyline",
            "style": {
                "clampToGround": true,
                "color": "#ffff00"
            }
        },
        {
            "name": "面",
            "type": "polygon",
            "iconImg": require('../../images/plot/polygon.png'),
            "styleType": "polygon",
            "style": {
                "color": "#0000ff",
                "outline": true,
                "outlineColor": "#ff0000",
                "heightReference": 1
            }
        },
        {
            "name": "矩形",
            "type": "rectangle",
            "iconImg": require('../../images/plot/rectangle.png'),
            "styleType": "polygon",
            "style": {
                "outline" : true,
                "fill" : true,
                "color": "#0000ff",
                "outlineColor": "#ff0000",
                "heightReference": 1
            }
        },
        {
            "name": "图标",
            "type": "billboard",
            "iconImg": require('../../images/plot/billboard.png'),
            "style": {
                "image": require('../../images/plot/start.png')
            },
            "styleType": "billboard"
        },
        {
            "name": "文字",
            "type": "label",
            "iconImg": require('../../images/plot/label.png'),
            "style": {
                "text": "未命名",
                "fillColor": "#fff",
                "outline": false,
                "outlineWidth": 1,
                "outlineColor": "#ff0000",
                "heightReference": 0,
                "showBackground": true,
                "backgroundColor": "#000",
                "scale": 1
            },
            "styleType": "label"
        },
        {
            "name": "动态线",
            "type": "polyline",
            "iconImg": require('../../images/plot/flowline.png'),
            "styleType": "polyline",
            "style": {
                "clampToGround": true,
                "color": "#0EFCDC",
                "animateType": "flowline",
                "duration": 1000,
                "image": require('../../images/texture/glow.png')
            }
        },
        {
            "name": "流动线",
            "type": "polyline",
            "iconImg": require('../../images/plot/waterline.png'),
            "styleType": "polyline",
            "style": {
                "clampToGround": true,
                "color": "#F9F507",
                "animateType": "flowline",
                "duration": 1000,
                "image": require('../../images/texture/water.png')
            }
        }
    ],
    "军事标绘": [
        {
            "name": "攻击箭头",
            "iconImg": require('../../images/plot/gjjt.png'),
            "type": "arrow",
            "arrowType": 1,
            "style": {
                "color": "#fc1100",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "攻击箭头(平尾)",
            "iconImg": require('../../images/plot/gjjtpw.png'),
            "type": "arrow",
            "arrowType": 2,
            "style": {
                "color": "#ddff00",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "攻击箭头(燕尾)",
            "iconImg": require('../../images/plot/gjjtyw.png'),
            "type": "arrow",
            "arrowType": 3,
            "style": {
                "color": "#00e41b",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "钳击箭头",
            "iconImg": require('../../images/plot/qjjt.png'),
            "type": "arrow",
            "arrowType": 5,
            "style": {
                "color": "#00ffe5",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "单尖直箭头",
            "iconImg": require('../../images/plot/zjt.png'),
            "type": "arrow",
            "arrowType": 6,
            "style": {
                "color": "#f200ff",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "单尖直箭头（燕尾）",
            "iconImg": require('../../images/plot/zjtyw.png'),
            "type": "arrow",
            "arrowType": 7,
            "style": {
                "color": "#D07900",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "闭合曲面",
            "iconImg": require('../../images/plot/bhqm.png'),
            "type": "arrow",
            "arrowType": 4,
            "style": {
                "color": "#001CF4",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "弓形面",
            "iconImg": require('../../images/plot/gxm.png'),
            "type": "arrow",
            "arrowType": 9,
            "style": {
                "color": "#00B038",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "直箭头",
            "iconImg": require('../../images/plot/czjt.png'),
            "type": "arrow",
            "arrowType": 10,
            "style": {
                "color": "#C8CB99",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "矩形旗",
            "iconImg": require('../../images/plot/jxq.png'),
            "type": "arrow",
            "arrowType": 11,
            "style": {
                "color": "#0094DE",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "扇形",
            "iconImg": require('../../images/plot/sx.png'),
            "type": "arrow",
            "arrowType": 12,
            "style": {
                "color": "#5902BC",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "三角旗",
            "iconImg": require('../../images/plot/sjq.png'),
            "type": "arrow",
            "arrowType": 13,
            "style": {
                "color": "#029A8B",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "矩形波浪旗",
            "iconImg": require('../../images/plot/jxblq.png'),
            "type": "arrow",
            "arrowType": 14,
            "style": {
                "color": "#F47600",
                "heightReference": 1
            },
            "styleType": "arrow"
        },
        {
            "name": "单线箭头",
            "iconImg": require('../../images/plot/zxjt.png'),
            "type": "arrow",
            "arrowType": 16,
            "style": {
                "color": "#D0CD00",
                "heightReference": 1
            },
            "styleType": "arrow"
        }
    ],
    "模型标绘": [
        {
            "name": "战斗机",
            "type": "gltfModel",
            "styleType": "gltfModel",
            "iconImg": require('../../images/plot/zhandouji.png'),
            "style": {
                "heightReference": 0,
                "uri": "./gltf/zhanji.glb",
                "minimumPixelSize": 24,
                "scale": 1,
                "heading": 0,
                "pitch": 0,
                "roll": 0
            }
        },
        {
            "name": "雷达",
            "type": "gltfModel",
            "styleType": "gltfModel",
            "iconImg": require('../../images/plot/leida.png'),
            "style": {
                "heightReference": 0,
                "uri": "./gltf/leida.glb",
                "minimumPixelSize": 24,
                "scale": 5,
                "heading": -30,
                "pitch": 0,
                "roll": 0
            }
        },
        {
            "name": "越野车",
            "type": "gltfModel",
            "styleType": "gltfModel",
            "iconImg": require('../../images/plot/yueyeche.png'),
            "style": {
                "heightReference": 0,
                "uri": "./gltf/gongchengche.glb",
                "minimumPixelSize": 24,
                "scale": 1,
                "heading": -30,
                "pitch": 0,
                "roll": 0
            }
        },
        {
            "name": "无人机",
            "type": "gltfModel",
            "styleType": "gltfModel",
            "iconImg": require('../../images/plot/wurenji.png'),
            "style": {
                "heightReference": 0,
                "uri": "./gltf/dajiang.gltf",
                "minimumPixelSize": 24,
                "scale": 1,
                "heading": -30,
                "pitch": 0,
                "roll": 0
            }
        }
    ]
}

export default list