// 根据styleType属性来获取对象的样式列表
export default {
    "point": {
        "pixelSize": {
            "name": "尺寸",
            "value": 10,
            "type": "input-number"
        },
        "color": {
            "name": "颜色",
            "value": "#00ffff",
            "type": "color-picker"
        },
        "colorAlpha": {
            "name": "透明度",
            "value": 1,
            "step": 0.01,
            "min": 0,
            "max": 1,
            "type": "slider"
        },
        "outlineWidth": {
            "name": "轮廓线宽度",
            "value": 1,
            "type": "input-number"
        },
        "outlineColor": {
            "name": "轮廓线颜色",
            "value": "#000000",
            "type": "color-picker"
        },
        "outlineColorAlpha": {
            "name": "轮廓线透明度",
            "value": 1,
            "step": 0.01,
            "min": 0,
            "max": 1,
            "type": "slider"
        }
    },
    "polyline": {
        "clampToGround": {
            "name": "是否贴地",
            "value": true,
            "type": "radio-boolean"
        },
        "width": {
            "name": "宽度",
            "value": 1,
            "type": "input-number"
        },
        "color": {
            "name": "颜色",
            "value": "#ffffff",
            "type": "color-picker"
        },
        "colorAlpha": {
            "name": "透明度",
            "value": 1,
            "type": "slider",
            "min": 0,
            "max": 1,
            "step": 0.01
        },
        "material": {
            "name": "材质",
            "value": "common",
            "type": "checkbox",
            "options": {
                "common": {
                    "name": "普通",
                    "value": "common"
                },
                "flowline": {
                    "name": "流动线",
                    "value": "flowline",
                    "duration": {
                        "name": "流动速度",
                        "type": "input-number",
                        "value": 1000
                    },
                    "image": {
                        "name": "材质路径",
                        "value": require("../../images/texture/water.png"),
                        "type": "input-text",
                        "disable": "disabled"
                    }
                },
                "flyline": {
                    "name": "飞行线",
                    "value": "flyline",
                    "duration": {
                        "name": "流动速度",
                        "type": "input-number",
                        "value": 1000
                    },
                    "image": {
                        "name": "材质路径",
                        "value": require("../../images/texture/glow.png"),
                        "type": "input-text",
                        "disable": "disabled"
                    }
                }
            }
        }
    },
    "polygon": {
        "heightReference": {
            "name": "是否贴地",
            "value": 1,
            "type": "radio-number"
        },
        "fill": {
            "name": "是否填充",
            "value": true,
            "type": "radio-boolean"
        },
        "color": {
            "name": "颜色",
            "value": "#ffffff",
            "type": "color-picker"
        },
        "colorAlpha": {
            "name": "透明度",
            "value": 1,
            "type": "slider",
            "min": 0,
            "max": 1,
            "step": 0.01
        },
        "material": {
            "name": "材质",
            "type": "checkbox",
            "value": "common",
            "options": {
                "common": {
                    "name": "普通"
                }
            }
        },
        "outline": {
            "name": "轮廓线",
            "value": "hide",
            "type": "checkbox",
            "options": {
                "show": {
                    "name": "显示",
                    "value": true,
                    "outlineColor": {
                        "name": "轮廓线颜色",
                        "value": "#ffffff",
                        "type": "color-picker"
                    },
                    "outlineWidth": {
                        "name": "轮廓线宽度",
                        "value": 1,
                        "type": "input-number",
                        "minVal": 0,
                        "maxVal": 999
                    },
                    "outlineColorAlpha": {
                        "name": "轮廓线透明度",
                        "value": 1,
                        "type": "slider",
                        "min": 0,
                        "max": 1,
                        "step": 0.01
                    }
                },
                "hide": {
                    "name": "隐藏",
                    "value": false
                }
            }
        }
    },
    "billboard": {
        "heightReference": {
            "name": "是否贴地",
            "value": 1,
            "type": "radio-number"
        },
        "color": {
            "name": "颜色",
            "value": "#ffffff",
            "type": "color-picker"
        },
        "colorAlpha": {
            "name": "透明度",
            "value": 1,
            "type": "slider",
            "min": 0,
            "max": 1,
            "step": 0.01
        },
        "scale": {
            "name": "缩放比例",
            "value": 1,
            "type": "input-number",
            "minVal": 0,
            "maxVal": 99999999
        }
    },
    "label": {
        "text": {
            "name": "标注名称",
            "value": "--",
            "type": "input-text"
        },
        "heightReference": {
            "name": "是否贴地",
            "value": 1,
            "type": "radio-number"
        },
        "fillColor": {
            "name": "颜色",
            "value": "#FCFEF7",
            "type": "color-picker"
        },
        "fillColorAlpha": {
            "name": "透明度",
            "type": "slider",
            "value": 1,
            "min": 0,
            "max": 1,
            "step": 0.01
        },
        "scale": {
            "name": "缩放比例",
            "value": 1,
            "type": "input-number",
            "minVal": 0,
            "maxVal": 99999999
        },
        "outlineColor": {
            "name": "轮廓线颜色",
            "value": "#ffffff",
            "type": "color-picker"
        },
        "outlineWidth": {
            "name": "轮廓线宽度",
            "value": 1,
            "type": "input-number",
            "minVal": 0,
            "maxVal": 999
        },
        "outlineColorAlpha": {
            "name": "轮廓线透明度",
            "value": 1,
            "type": "slider",
            "min": 0,
            "max": 1,
            "step": 0.01
        },
        "showBackground": {
            "name": "展示背景色",
            "value": "show",
            "type": "checkbox",
            "options": {
                "show": {
                    "name": "显示",
                    "value": true,
                    "backgroundColor": {
                        "name": "背景色",
                        "value": "#ffffff",
                        "type": "color-picker"
                    },
                    "backgroundColorAlpha": {
                        "name": "背景色透明度",
                        "type": "slider",
                        "min": 0,
                        "max": 1,
                        "step": 0.01
                    }
                },
                "hide": {
                    "name": "隐藏",
                    "value": false
                }
            }
        }
    },
    "arrow": {
        "color": {
            "name": "颜色",
            "value": "#ffffff",
            "type": "color-picker"
        },
        "colorAlpha": {
            "name": "透明度",
            "value": 1,
            "type": "slider",
            "min": 0,
            "max": 1,
            "step": 0.01
        }
    },
    "gltfModel": {
        "heightReference": {
            "name": "是否贴地",
            "value": 1,
            "type": "radio-number"
        },
        "heading": {
            "name": "偏转角",
            "value": 0,
            "type": "slider",
            "min": 0,
            "max": 360,
            "step": 1
        },
        "pitch": {
            "name": "仰俯角",
            "value": 0,
            "type": "slider",
            "min": 0,
            "max": 360,
            "step": 1
        },
        "roll": {
            "name": "翻滚角",
            "value": 0,
            "type": "slider",
            "min": 0,
            "max": 360,
            "step": 1
        },
        "scale": {
            "name": "缩放比例",
            "value": 1,
            "type": "input-number",
            "minVal": 0,
            "maxVal": 999999
        }
    }
}