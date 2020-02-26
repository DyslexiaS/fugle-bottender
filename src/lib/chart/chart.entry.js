/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// data
	var candle_chart = __webpack_require__(1);

	var candle = __webpack_require__(4);
	var line = __webpack_require__(6);
	var lineGen = __webpack_require__(8);

	var bar = __webpack_require__(10);
	var area = __webpack_require__(12);
	var stem = __webpack_require__(14);
	var dots = __webpack_require__(16);
	var model = __webpack_require__(18);
	var instimodel = __webpack_require__(20);
	var gmodel = __webpack_require__(22).default;
	var combinator = __webpack_require__(24);
	var reducer = __webpack_require__(26);
	var plotFuns = __webpack_require__(28);

	// d3.selection.prototype.dblTap = function(callback) {
	//   var last = 0;
	//   return this.each(function() {
	//     d3.select(this).on("touchstart", function(e) {
	//         if ((d3.event.timeStamp - last) < 500) {
	//           return callback(e);
	//         }
	//         last = d3.event.timeStamp;
	//     });
	//   });
	// }

	// var pressTimer;

	// d3.selection.prototype.taphold = function(callback) {
	//   return this.each(function() {
	//     d3.select(this).on("touchstart", function(){
	// 		pressTimer = window.setTimeout(function() { callback() },500)
	// 		return false;
	// 	}).on("touchmove", function(){
	// 		clearTimeout(pressTimer)
	// 		return false;	
	// 	}).on("touchend", function(){
	// 		clearTimeout(pressTimer)
	// 		return false;	
	// 	})
	//   });
	// }

	// to remove
	// var insti   =  require('expose?insti!./testData/institution.js');
	// var line_gen   =  require('expose?line_gen!./lib/line_gen.js').lineGen;

	// var rawdata = candleData;

	// var data = rawdata.rawContent.slice(-200);
	// data.forEach(function(row){
	// 	row.date = new Date(row.date)
	// 	row.y1 = row.close;
	// 	row.y2 = row.close*2;
	// 	row.y3 = row.close*3;
	// });

	// // models
	// var close_model = new gmodel(data, function(d){return d.close;});

	// var mixModel = new combinator(new gmodel(data, function(d){return d.close;}), insti_model2);

	// plots

	// var line2 = line_gen(insti_model2);
	// var line3 = line_gen(new gmodel(instii, function(d){return d.FIsell;}));

	// var custumBar = [bar.decorator( close_model, {
	//     fillColor : "#00ff00",
	//     barWidth : (d) => d*0.5,
	//     offset : (d)=> d/2,
	// }), bar.decorator(close_model, {
	//     fillColor : "#0000ff",
	//     barWidth : (d) => d*0.5,
	//     offset : (d)=> -1*d/2,
	//     className : "bar2"
	// })];

	// var chart3 = new candle_chart({
	// 	//data : data,
	// 	model : mixModel,
	// 	target : '.chart',
	// 	plotFuns : custumBar.concat(line3.plot),
	// 	updateFuns : bar.update,
	// 	enableEvents : false,
	//     cursorMessage : function(message){
	//         console.log(message)
	//     }
	// });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["candle_chart"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _defaultOption = __webpack_require__(3);

	var _defaultOption2 = _interopRequireDefault(_defaultOption);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var default_margin = _defaultOption2.default.default_margin;
	var default_height = _defaultOption2.default.default_height;
	var default_width = _defaultOption2.default.default_width;
	var default_yScale = _defaultOption2.default.default_yScale;
	var default_xScale = _defaultOption2.default.default_xScale;
	var default_xAxis = _defaultOption2.default.default_xAxis;
	var default_yAxis = _defaultOption2.default.default_yAxis;
	var default_xAxisOffset = _defaultOption2.default.default_xAxisOffset;
	var default_yAxisOffset = _defaultOption2.default.default_yAxisOffset;


	d3.selection.prototype.taphold = function (oncallback, offcallback) {
	    var pressTimer;
	    var iscounting = false;
	    this.each(function () {
	        d3.select(this).on("touchstart", function () {
	            var mouseX = d3.touches(this)[0][0];
	            //offcallback();
	            iscounting = true;
	            // console.log(iscounting)
	            pressTimer = setTimeout(function () {
	                iscounting = false;
	                oncallback(mouseX);
	            }, 800);
	            return false;
	        }).on("touchmove", function () {
	            if (iscounting) {
	                iscounting = false;
	                clearTimeout(pressTimer);
	                pressTimer = null;
	                offcallback();
	            }
	            return false;
	        }).on("touchend", function () {
	            iscounting = false;
	            clearTimeout(pressTimer);
	            offcallback();
	            return false;
	        });
	    });

	    function disableCounter() {
	        // console.log('disableCounter')
	        // // if(iscounting){
	        //     iscounting = false;
	        //     clearTimeout(pressTimer);
	        //     pressTimer = null;
	        //     offcallback();
	        // // }
	    }
	    return { disableCounter: disableCounter };
	};

	var candle_chart = function () {
	    function candle_chart() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, candle_chart);

	        this.options = _.extend({
	            target: "target",
	            enableEvents: true,
	            onScreenDataNum: 80,
	            xArrangement: null,
	            xScaleFun: default_xScale,
	            xAxisFun: default_xAxis,
	            xAxisFormat: '%Y%m%d',
	            xAxisOffset: default_xAxisOffset,
	            yAxisOffset: default_yAxisOffset,
	            yScaleTicks: [5, 2],
	            yAxisFuns: [null, null],

	            yAxisFormat: ['.2s'],
	            yTitle: null,
	            cursorMessage: function cursorMessage() {},
	            zoomCallback: function zoomCallback() {}
	        }, options);
	        this.chartId = 'chart' + Math.random().toString(36).substring(2, 8);
	        this.translate = [0, 0];
	        this.scale = 1;
	        this.barSpace = 0;
	        this.cursorPosition = 0;
	        this.prevScale = null;
	        this.yAxisFormat = null;
	        this.xAxisFormat = null;
	        this.isZooming = false;
	        this.shouldDragging = true;
	        // hooks
	        this.didPlotAxis = null;
	        this.model = this.options.model;
	        this.checkOptions();
	        this.prepareAxisFormat();
	        this.prepareChart();
	        this.analyzeData();
	        this.plotAxis();
	        this.plotAxisTitle();
	        this.plotChartFun();
	        if (this.options.enableEvents) {
	            this.initZoom();
	            //this.updateZoomFromChart();
	        }
	        this.setOverlay();
	        this.setDefaultCursor();
	    }

	    // some options should be consistent


	    _createClass(candle_chart, [{
	        key: "checkOptions",
	        value: function checkOptions() {
	            // 1. xAxis Fun, xAxisOffset
	            var _options = this.options;
	            var xAxisFun = _options.xAxisFun;
	            var xAxisOffset = _options.xAxisOffset;

	            if (_.isArray(xAxisFun) !== _.isArray(xAxisOffset)) {
	                console.error("xAxisfun and xAxisoffset should be same type");
	                throw 'error';
	            }
	            if (_.isArray(xAxisFun)) {
	                if (xAxisFun.length !== xAxisOffset.length) {
	                    console.error("xAxisfun and xAxisoffset length should be same");
	                    throw 'error';
	                }
	            } else {
	                this.options.xAxisFun = [xAxisFun];
	                this.options.xAxisOffset = [xAxisOffset];
	            }

	            var _options2 = this.options;
	            var yAxisFuns = _options2.yAxisFuns;
	            var yAxisOffset = _options2.yAxisOffset;

	            if (_.isArray(yAxisFuns) !== _.isArray(yAxisOffset)) {
	                console.error("yAxisfuns and yAxisoffset should be same type");
	                // throw('error');
	            }
	            if (_.isArray(yAxisFuns)) {
	                if (yAxisFuns.length !== yAxisOffset.length) {
	                    console.error("yAxisfuns and yAxisoffset length should be same");
	                    // throw('error');
	                }
	            } else {
	                    this.options.yAxisFuns = [yAxisFuns];
	                    this.options.yAxisOffset = [yAxisOffset];
	                }

	            if (this.options.didPlotAxis && _.isFunction(this.options.didPlotAxis)) {
	                this.didPlotAxis = this.options.didPlotAxis;
	            }

	            // 2. yAxis
	        }
	    }, {
	        key: "prepareAxisFormat",
	        value: function prepareAxisFormat() {
	            var _this = this;

	            if (_.isArray(this.options.yAxisFormat)) {} else {
	                this.options.yAxisFormat = [this.options.yAxisFormat];
	            }
	            this.yAxisFormat = [];
	            this.options.yAxisFormat.forEach(function (yAxisFormat) {
	                if (_.isFunction(yAxisFormat)) {
	                    _this.yAxisFormat.push(yAxisFormat);
	                } else {
	                    _this.yAxisFormat.push(d3.format(yAxisFormat));
	                }
	            });

	            if (_.isFunction(this.options.xAxisFormat)) {
	                this.xAxisFormat = this.options.xAxisFormat;
	            } else {
	                this.xAxisFormat = d3.time.format(this.options.xAxisFormat);
	            }
	        }
	    }, {
	        key: "prepareChart",
	        value: function prepareChart() {
	            var _this2 = this;

	            // chart html control
	            var d3target = d3.select(this.options.target);
	            var margin = this.options.margin || default_margin;
	            this.options.margin = margin;
	            var targetWidth = d3target.node().getBoundingClientRect().width;

	            var width = targetWidth ? targetWidth - margin.left - margin.right : default_width;
	            width = this.options.width || width;
	            this.options.width = width;

	            var height = this.options.height || default_height;
	            this.options.height = height;

	            this.svg = d3target.classed('fortuna-chart', true).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
	            var plotChart = this.plotChart = this.svg.append('g').attr('transform', "translate(  " + margin.left + " , " + margin.top + " )");

	            this.graphYAxis = this._yscale_fun().map(function () {
	                return plotChart.append('g').attr('class', 'y axis');
	            });

	            var defs = plotChart.append("defs");

	            this.yTitle = plotChart.append("text").attr('class', 'yTitle');

	            this.plotClip = defs.append('clipPath').attr('id', 'clip-' + this.chartId).append('rect').attr({ width: width, height: height + 20 });

	            this.plotArea = plotChart.append('g').attr('clip-path', 'url(' + window.location.href + '#clip-' + this.chartId + ')').attr("id", "clip-path").attr("class", "clip-path");

	            this.graphXAxis = this.options.xAxisFun.map(function () {
	                return _this2.plotArea.append('g').attr('class', 'x axis');
	            });

	            this.dataSeries = this.plotArea.append('g');

	            this.crossX = this.plotArea.append('line').classed('crossX', true).attr({
	                x1: width,
	                x2: width,
	                y1: 0,
	                y2: height
	            }).attr("stroke", "black");

	            // create filter with id #drop-shadow
	            // height=130% so that the shadow is not clipped
	            var filter = defs.append("filter").attr("id", "drop-shadow").attr("height", "130%");

	            // SourceAlpha refers to opacity of graphic that this filter will be applied to
	            // convolve that with a Gaussian with standard deviation 3 and store result
	            // in blur
	            filter.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", 3).attr("result", "blur");

	            // translate output of Gaussian blur to the right and downwards with 2px
	            // store result in offsetBlur
	            filter.append("feOffset").attr("in", "blur").attr("dx", 1).attr("dy", 1).attr("result", "offsetBlur");

	            // overlay original SourceGraphic over translated blurred opacity by using
	            // feMerge filter. Order of specifying inputs is important!
	            var feMerge = filter.append("feMerge");

	            feMerge.append("feMergeNode").attr("in", "offsetBlur");
	            feMerge.append("feMergeNode").attr("in", "SourceGraphic");
	        }
	    }, {
	        key: "_genXrange",
	        value: function _genXrange(type) {
	            var width = this.options.width;
	            var spanWidth = width / this.options.onScreenDataNum * this.model.length;
	            if (type === "span") {
	                return [0, width];
	            } else if (type === "left") {
	                return [0, spanWidth];
	            } else {
	                return [width - spanWidth, width];
	            }
	        }
	    }, {
	        key: "_yscale_fun",
	        value: function _yscale_fun() {
	            var in_data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            var height = this.options.height;
	            var model = this.model;
	            var yscale_fun = void 0;
	            var options = _.extend(in_data, this.options);

	            if (options.yScale && Array.isArray(options.yScale)) {
	                yscale_fun = options.yScale;
	            } else {
	                yscale_fun = options.yScale ? [options.yScale] : [default_yScale];
	            }

	            var yScale = yscale_fun.map(function (func) {
	                return func(options, height, model);
	            });
	            return yScale;
	        }
	    }, {
	        key: "analyzeData",
	        value: function analyzeData() {
	            this.yScale = this._yscale_fun();
	            var domain = this.model.xDomain;
	            this.tmpxScale = d3.scale.ordinal().domain(domain);
	            var initDataNum = this.options.onScreenDataNum;
	            if (this.model.data.length < this.options.onScreenDataNum) {
	                initDataNum = this.model.data.length;
	            }

	            this.onScreenData = this.model.data.slice(-1 * initDataNum);
	            this.xScale = this.options.xScaleFun(this.model, this._genXrange(this.options.xArrangement));
	        }
	    }, {
	        key: "plotAxis",
	        value: function plotAxis() {
	            var _this3 = this;

	            var self = this;
	            var height = this.options.height;
	            var width = this.options.width;

	            this.graphXAxis.forEach(function (gxAxis, idx) {
	                var xAxisOffset = _this3.options.xAxisOffset[idx](height);
	                var xAxis = _this3.options.xAxisFun[idx].call(_this3, height);
	                gxAxis.attr('transform', "translate(0, " + xAxisOffset + " )").call(xAxis);
	            });

	            this.graphYAxis.forEach(function (gyAxis, idx) {
	                var yAxisFun = self.options.yAxisFuns[idx];
	                if (!yAxisFun) {
	                    yAxisFun = default_yAxis;
	                }
	                var yAxis = yAxisFun.call(self, idx, width);
	                var yAxisOffsetFun = _this3.options.yAxisOffset[idx] || default_yAxisOffset;
	                gyAxis.attr('transform', "translate(" + yAxisOffsetFun(width) + ", 0)").call(yAxis);
	            });

	            if (this.didPlotAxis && _.isFunction(this.didPlotAxis)) {
	                this.didPlotAxis({
	                    graphXAxis: this.graphXAxis,
	                    graphYAxis: this.graphYAxis
	                });
	            }
	        }
	    }, {
	        key: "plotAxisTitle",
	        value: function plotAxisTitle() {
	            //     yTitle = {
	            // text : "(123)",
	            // position : function(width, height){
	            //     return {
	            //         x: width+0,
	            //         y: height+0
	            //     }
	            // },
	            // font_size : 30}
	            var height = this.options.height;
	            var width = this.options.width;
	            var default_position = {
	                x: width + 10,
	                y: height + 25
	            };
	            var default_size = 10;

	            if (this.options.yTitle) {
	                var options = this.options.yTitle;
	                var position = void 0;
	                if (_.isFunction(options.position)) {
	                    position = options.position(width, height) || default_position;
	                } else {
	                    position = options.position || default_position;
	                }
	                var font_size = options.font_size || default_size;

	                this.yTitle.attr("text-anchor", "middle").attr("transform", "translate( " + position.x + "  , " + position.y + ")").attr("style", "font-size: " + font_size + "px").text(options.text);
	            }
	        }
	    }, {
	        key: "xScaleType",
	        value: function xScaleType() {
	            var xScale = this.xScale;
	            var data = this.model.data;

	            if (data.length === xScale.domain().length) {
	                return "ordinal";
	            } else {
	                return "time";
	            }
	        }
	    }, {
	        key: "setCursorByDate",
	        value: function setCursorByDate(rawdate) {
	            var firedByDevice = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            if (this.isZooming) {
	                return;
	            }
	            // add some disturb
	            var date = _.cloneDeep(rawdate);
	            date.setSeconds(date.getSeconds() + 10);
	            var self = this;
	            var data = this.model.data;
	            var dataStart = self.xScale.range()[0];
	            var bisectDate = d3.bisector(function (d) {
	                return d.dateKey;
	            }).left;
	            var x1 = bisectDate(data, date.getTime()) - 1;
	            if (x1 < 0) x1 = 0;
	            var mouseX = void 0;
	            if (this.xScaleType() === "time") {
	                mouseX = self.xScale(date);
	            } else {
	                mouseX = self.transform((x1 + 0.5) * self.barSpace + dataStart);
	            }

	            self.crossX.attr({ x1: mouseX, x2: mouseX });
	            self.options.cursorMessage(self.model.getDataByIdx(x1), firedByDevice);
	        }
	    }, {
	        key: "setCursorByDevice",
	        value: function setCursorByDevice(mouseX) {
	            var firedByDevice = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	            if (this.isZooming) {
	                return;
	            }
	            var cursorPosition = this.cursorPosition;
	            if (mouseX > this.options.width) {
	                return;
	            }

	            if (this.xScaleType() === "time") {
	                var data = this.model.data;
	                var xScale = this.xScale;
	                var bisectDate = d3.bisector(function (d) {
	                    return d.date;
	                }).left;

	                var x0 = xScale.invert(mouseX);
	                var i = bisectDate(data, x0, 1);
	                this.options.cursorMessage(data[i], firedByDevice);
	                this.crossX.attr({ x1: mouseX, x2: mouseX });
	            } else {
	                var x1 = this.reverse(mouseX);
	                var dataStart = this.xScale.range()[0];

	                x1 = Math.floor((x1 - dataStart) / this.barSpace);
	                x1 = x1 < 0 ? 0 : x1;
	                if (x1 != cursorPosition) {
	                    mouseX = this.transform((x1 + 0.5) * this.barSpace + dataStart);
	                    this.crossX.attr({ x1: mouseX, x2: mouseX });
	                    this.cursorPosition = x1;
	                    this.options.cursorMessage(this.model.getDataByIdx(x1), firedByDevice);
	                }
	            }
	        }
	    }, {
	        key: "plotChartFun",
	        value: function plotChartFun() {
	            var self = this;
	            var plotArea = this.plotArea;
	            var dataSeries = this.dataSeries;

	            if (Modernizr.touchevents) {
	                plotArea.on("touchmove", function () {
	                    if (!self.shouldDragging) {
	                        var mouseX = d3.touches(this)[0][0];
	                        self.setCursorByDevice(mouseX);
	                    }
	                    return false;
	                });
	            } else {
	                plotArea.on('mousemove', function () {
	                    var mouseX = d3.mouse(this)[0];
	                    self.setCursorByDevice(mouseX);
	                });
	            }

	            //this.dataSeries = dataSeries;

	            this.options.plotFuns = this.options.plotFuns.map(function (plotFun) {
	                return plotFun.bind(self);
	            });

	            this.options.updateFuns = this.options.updateFuns.map(function (plotFun) {
	                return plotFun.bind(self);
	            });

	            this.options.plotFuns.forEach(function (plotFun) {
	                dataSeries.call(plotFun);
	            });
	        }
	    }, {
	        key: "reverse",
	        value: function reverse(value) {
	            return (value - this.translate[0]) / this.scale;
	        }
	    }, {
	        key: "transform",
	        value: function transform(value) {
	            return value * this.scale + this.translate[0];
	        }
	    }, {
	        key: "initZoom",
	        value: function initZoom() {
	            var self = this;
	            var width = self.options.width;
	            var xRange = self._genXrange(self.options.xArrangement);
	            var minZoom = width / (xRange[1] - xRange[0]);
	            var counter = 1;
	            var tmpVector = [0, 0];
	            var base = [0, 0];
	            var currentScrollY = 0;
	            var prevPosition = [0, 0];
	            if (minZoom < 0.25) {
	                minZoom = 0.25;
	            }

	            var zoom = d3.behavior.zoom().scaleExtent([minZoom, 10])
	            // .x(xScale)
	            .on('zoomstart', function (e) {
	                if (d3.event.sourceEvent.type != 'touchstart') {
	                    self.isZooming = true;
	                }
	                if (Modernizr.touchevents) {
	                    self.crossX.attr({ x1: -1, x2: -1 });
	                }
	            }).on('zoom', function () {
	                if (Modernizr.touchevents) {}

	                if (!self.shouldDragging) {
	                    return false;
	                }

	                var translate = d3.event.translate;
	                var scale = d3.event.scale;
	                // check translate out of range
	                self.checkChartBoundary(scale, translate, zoom);

	                var _self$_calX1X2fromSca = self._calX1X2fromScaleTranslate(scale, translate, false);

	                var x1 = _self$_calX1X2fromSca.x1;
	                var x2 = _self$_calX1X2fromSca.x2;

	                self._redrawAxisScale(x1, x2);
	                if (x2 >= self.model.data.length) x2 = self.model.data.length - 1;
	                self.options.zoomCallback(self.scale, self.translate, [self.model.data[x1].date, self.model.data[x2].date]);
	                return false;
	            }).on('zoomend', function () {
	                self.isZooming = false;
	            });
	            this.zoom = zoom;
	        }
	    }, {
	        key: "checkChartBoundary",
	        value: function checkChartBoundary(scale, translate) {
	            var zoom = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	            var isFromZoom = true;
	            if (!zoom) {
	                zoom = this.zoom;isFromZoom = false;
	            }
	            var width = this.options.width;
	            var xRange = this._genXrange(this.options.xArrangement);
	            var newXRange = xRange.map(function (x) {
	                return x * scale;
	            });
	            // check translate out of range
	            if (translate[0] > -1 * newXRange[0]) {
	                if (zoom) {
	                    zoom.translate([-1 * newXRange[0], 0]);
	                }
	                translate[0] = -1 * newXRange[0];
	            }

	            if (translate[0] < -1 * newXRange[1] + width) {
	                if (zoom) {
	                    zoom.translate([-1 * newXRange[1] + width, 0]);
	                }
	                translate[0] = -1 * newXRange[1] + width;
	            }

	            if (!isFromZoom) {
	                var dataWidth = xRange[1] - xRange[0];
	                var minZoom = width / dataWidth;
	                if (minZoom < 0.25) {
	                    minZoom = 0.25;
	                }
	                if (this.zoom) {
	                    this.zoom.scaleExtent([minZoom, 10]);
	                }
	            }
	        }
	    }, {
	        key: "setChartViewArea",
	        value: function setChartViewArea(scale, translate) {
	            var _calX1X2fromScaleTran = this._calX1X2fromScaleTranslate(scale, translate);

	            var x1 = _calX1X2fromScaleTran.x1;
	            var x2 = _calX1X2fromScaleTran.x2;

	            this._redrawAxisScale(x1, x2);
	        }
	    }, {
	        key: "setChartViewAreaByIdx",
	        value: function setChartViewAreaByIdx(x1, x2) {
	            this._calScaleTranslatefromX1X2(x1, x2);
	            this._redrawAxisScale(x1, x2);
	        }
	    }, {
	        key: "setChartViewAreaByDate",
	        value: function setChartViewAreaByDate(date1, date2) {
	            date1 = _.cloneDeep(date1);
	            date2 = _.cloneDeep(date2);
	            date1.setSeconds(date1.getSeconds() + 10);
	            date2.setSeconds(date2.getSeconds() - 10);
	            var data = this.model.data;
	            var dataStart = this.xScale.range()[0];
	            var bisectLeft = d3.bisector(function (d) {
	                return d.dateKey;
	            }).left;
	            var bisectRight = d3.bisector(function (d) {
	                return d.dateKey;
	            }).right;

	            var x1 = bisectLeft(data, date1.getTime()) - 1;
	            var x2 = bisectRight(data, date2.getTime()) - 1;
	            if (x1 < 0) x1 = 0;
	            if (x2 > data.length - 1) x2 = data.length - 1;
	            if (x1 < x2) {
	                this.setChartViewAreaByIdx(x1, x2);
	            }
	        }
	    }, {
	        key: "setOverlay",
	        value: function setOverlay() {
	            var self = this;
	            var xScale = this.xScale;
	            var zoom = this.zoom;
	            var dataLen = this.model.data.length;
	            var _options3 = this.options;
	            var height = _options3.height;
	            var width = _options3.width;

	            var overlay = d3.svg.area().x(function (d, i) {
	                var offset = 0;
	                if (i == dataLen - 1) {
	                    return width;
	                }
	                if (i == 0) {
	                    return 0;
	                }
	                return xScale(d.date);
	            }).y0(0).y1(height);

	            if (!this.overlay) {
	                this.overlay = this.plotArea.append('path');
	            }

	            this.overlay = this.overlay.attr('class', 'overlay').attr("fill-opacity", 0).attr('d', overlay(this.model.data));

	            if (this.options.enableEvents) {
	                this.overlay.call(zoom);
	                if (Modernizr.touchevents) {
	                    this.tabholdEvents = this.overlay.taphold(function (mouseX) {
	                        self.shouldDragging = false;
	                        self.setCursorByDevice(mouseX);
	                    }, function () {
	                        self.shouldDragging = true;
	                    });
	                }
	            } else {
	                if (Modernizr.touchevents) {
	                    self.shouldDragging = false;
	                }
	            }
	        }
	    }, {
	        key: "setOnScreenDataNum",
	        value: function setOnScreenDataNum(num) {
	            if (this.zoom) {
	                var self = this;
	                var x1 = this.model.data.length - num;
	                var x2 = this.model.data.length;
	                var scale = self.options.width / num / this.barSpace;
	                this.scale = scale;
	                this.translate = [-1 * (this.options.onScreenDataNum - num) * this.barSpace * this.scale, 0];
	                this.zoom.scale(scale);
	                this.zoom.translate(this.translate);
	                this.onScreenData = this.model.data.slice(x1, x2);
	                this._redrawAxisScale(x1, x2);
	            } else {
	                this.options.onScreenDataNum = num;
	                this.redraw();
	            }
	        }
	    }, {
	        key: "redraw",
	        value: function redraw() {
	            if (this.xScaleType() !== "time") {

	                this.yScale = this._yscale_fun();
	                this.xScale = this.options.xScaleFun(this.model, this._genXrange(this.options.xArrangement));
	                var x1x2 = this._calX1X2fromScaleTranslate(this.scale, this.translate);
	                this.onScreenData = this.model.data.slice(x1x2.x1, x1x2.x2);

	                this.dataSeries.selectAll("rect").remove();
	                this.dataSeries.selectAll("line").remove();
	                this.dataSeries.selectAll("circle").remove();
	                this.checkChartBoundary(this.scale, this.translate);
	                this._redrawAxisScale(x1x2.x1, x1x2.x2);
	            } else {
	                this.redrawChart();
	            }
	            // this.redrawChart();
	            this.plotAxisTitle();
	        }
	    }, {
	        key: "redrawChart",
	        value: function redrawChart() {
	            var _this4 = this;

	            this.options.updateFuns.forEach(function (updateFuns) {
	                return _this4.dataSeries.call(updateFuns);
	            });
	        }
	    }, {
	        key: "setDefaultCursor",
	        value: function setDefaultCursor() {
	            var width = this.options.width;
	            this.options.cursorMessage(this.model.data[this.model.data.length - 1], false);
	            if (!Modernizr.touchevents) {
	                this.crossX.attr({ x1: width - 1, x2: width - 1 });
	            }
	        }
	    }, {
	        key: "updateChartParam",
	        value: function updateChartParam(options) {
	            this.options = _.extend(this.options, options);
	            var _options4 = this.options;
	            var width = _options4.width;
	            var height = _options4.height;
	            var margin = _options4.margin;

	            this.svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
	            this.plotClip.attr({ width: width, height: height + 20 });
	            if (this.model.data.length === this.options.onScreenDataNum) {} else {
	                this.options.onScreenDataNum = Math.floor(width / this.barSpace);
	            }
	            this.redraw();
	            this.setOverlay();
	        }
	    }, {
	        key: "changeModel",
	        value: function changeModel(newModel) {
	            this.model = newModel;
	            this.analyzeData();

	            var width = this.options.width;
	            var xRange = this._genXrange(this.options.xArrangement);
	            var dataWidth = xRange[1] - xRange[0];
	            var minZoom = width / dataWidth;
	            if (minZoom < 0.25) {
	                minZoom = 0.25;
	            }
	            if (minZoom > 1) {
	                //  data length smaller than chart width
	                this.translate = [(dataWidth - this.options.width) * minZoom, 0];
	                this.scale = minZoom;
	            } else {
	                this.translate = [0, 0];
	                this.scale = 1;
	            }
	            if (this.zoom) {
	                this.zoom.scale(this.scale);
	                this.zoom.translate(this.translate);
	                this.zoom.scaleExtent([minZoom, 10]);
	            }
	            // force xAxis to redraw
	            this.prevScale = -1;

	            this.redraw();
	            this.setOverlay();
	        }
	    }, {
	        key: "changeModelTimeScale",
	        value: function changeModelTimeScale(newModel) {
	            this.model = newModel;
	            this.analyzeData();
	            this.redraw();
	            this.setOverlay();
	        }
	    }, {
	        key: "setDragging",
	        value: function setDragging() {
	            this.shouldDragging = !this.shouldDragging;
	        }
	    }, {
	        key: "_redrawAxisScale",
	        value: function _redrawAxisScale(x1, x2) {
	            var _this5 = this;

	            var self = this;
	            var xRange = self._genXrange(self.options.xArrangement);
	            var _self$options = self.options;
	            var height = _self$options.height;
	            var width = _self$options.width;

	            var data = self.model.data;
	            var scale = self.scale;

	            this.yScale = this._yscale_fun({ x1: x1, x2: x2 });

	            // recalc yAxis
	            this.graphYAxis.forEach(function (gyAxis, idx) {
	                var yAxisFun = _this5.options.yAxisFuns[idx];
	                if (!yAxisFun) {
	                    yAxisFun = default_yAxis;
	                }
	                var yAxis = yAxisFun.call(_this5, idx, width);
	                var yAxisOffsetFun = _this5.options.yAxisOffset[idx] || default_yAxisOffset;
	                gyAxis.attr('transform', "translate(" + yAxisOffsetFun(width) + ", 0)").call(yAxis);
	            });
	            // recalc xAxis
	            var newXRange = xRange.map(function (x) {
	                return x * scale;
	            });
	            var xAxisOffset = this.options.xAxisOffset.map(function (offsetFun) {
	                return offsetFun(height);
	            });
	            this.xAxis = null;
	            // if(scale === this.prevScale){
	            //     this.graphXAxis.forEach((gxAxis, idx)=>{
	            //         gxAxis.attr("transform", `translate(  ${this.translate[0]} , ${xAxisOffset[idx]})`);
	            //     });
	            // }else {
	            var xScale = this.tmpxScale.rangeBands(newXRange);
	            this.graphXAxis.forEach(function (gxAxis, idx) {
	                var xAxis = _this5.options.xAxisFun[idx].call(_this5, height);
	                if (!_this5.xAxis) {
	                    _this5.xAxis = xAxis;
	                }
	                gxAxis.attr('transform', "translate(  " + _this5.translate[0] + " , " + xAxisOffset[idx] + " )").call(xAxis.scale(xScale));
	            });
	            // }

	            // callback
	            if (this.didPlotAxis) {
	                this.didPlotAxis({
	                    graphXAxis: this.graphXAxis,
	                    graphYAxis: this.graphYAxis
	                });
	            }

	            // reset onScreenData
	            this.onScreenData = this.model.data.slice(x1, x2);
	            this.prevScale = scale;
	            this.redrawChart();
	        }
	    }, {
	        key: "_calX1X2fromScaleTranslate",
	        value: function _calX1X2fromScaleTranslate(scale, translate) {
	            var setZoom = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	            var self = this;
	            var data = self.model.data;

	            self.translate = translate;;
	            self.scale = scale;

	            if (this.zoom && setZoom) {
	                this.zoom.scale(scale);
	                this.zoom.translate(translate);
	            }

	            var width = self.options.width;
	            var x1 = self.reverse(0);
	            var x2 = self.reverse(width);
	            var offset = data.length - self.options.onScreenDataNum;

	            x1 = Math.floor(x1 / self.barSpace) + offset;
	            x2 = Math.ceil(x2 / self.barSpace) + offset;
	            // if(x1 < 0 ){console.log('x1 < 0')}
	            var diff = x2 - x1;
	            if (diff > data.length) {
	                diff = data.length;
	            }
	            if (x1 < 0) {
	                x1 = 0;
	                x2 = diff;
	            }
	            if (x2 > data.length) {
	                x2 = data.length;
	                x1 = x2 - diff;
	            }

	            return { x1: x1, x2: x2 };
	        }
	    }, {
	        key: "_calScaleTranslatefromX1X2",
	        value: function _calScaleTranslatefromX1X2(X1, X2) {
	            // check X1, X2 boundary
	            var barSpace = this.barSpace;
	            var width = this.options.width;
	            var data = this.model.data;
	            var self = this;
	            var scale = width / (barSpace * (X2 - X1));

	            var translateX = (data.length - X1 - this.options.onScreenDataNum) * barSpace * scale;
	            var translate = [translateX, 0];

	            this.translate = translate;;
	            this.scale = scale;
	            this.prevScale = -1;

	            if (this.zoom) {
	                this.zoom.scale(scale);
	                this.zoom.translate(translate);
	            }
	        }
	    }, {
	        key: "xScale",
	        set: function set(xScale) {
	            this._xScale = xScale;
	            var options = this.options;
	            var sDomain = xScale.domain();
	            this.barSpace = xScale(sDomain[1]) - xScale(sDomain[0]) || this.options.width;
	            this.model.data.forEach(function (row, i) {
	                row.x = xScale(row.date);
	            });
	        },
	        get: function get() {
	            return this._xScale;
	        }
	    }]);

	    return candle_chart;
	}();

	exports.default = candle_chart;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var default_margin = exports.default_margin = { top: 20, right: 50, bottom: 30, left: 20 };
	var default_height = exports.default_height = 255 - default_margin.top - default_margin.bottom;
	var width = window.innerWidth - default_margin.left - default_margin.right;
	if (width < 0) {
	    width = 480;
	}
	var default_width = exports.default_width = width;

	var default_yScale = exports.default_yScale = function default_yScale(options, height, model) {
	    var extent = model.yExtentRange(-1 * options.onScreenDataNum, 0);
	    var yScale = d3.scale.linear().domain(extent).nice().range([height, 0]);
	    return yScale;
	};

	var default_xAxisOffset = exports.default_xAxisOffset = function default_xAxisOffset(height) {
	    return height;
	};

	var default_yAxisOffset = exports.default_yAxisOffset = function default_yAxisOffset(width) {
	    return width;
	};

	var default_xScale = exports.default_xScale = function default_xScale(model, rangeBands) {
	    return d3.scale.ordinal().domain(model.xDomain).rangeBands(rangeBands);
	};

	var default_xAxis = exports.default_xAxis = function default_xAxis(height) {
	    var self = this;
	    var xScale = this.xScale;
	    var unit = Math.ceil(this.options.onScreenDataNum / 4.5);

	    return d3.svg.axis().scale(xScale).orient('bottom')
	    // .tickSize(-1*height, 0)
	    .tickValues(self.model.xDomain.filter(function (d, i) {
	        return i % unit == 0;
	    }).map(function (d) {
	        return new Date(d);
	    })).tickFormat(self.xAxisFormat);
	};

	var default_yAxis = exports.default_yAxis = function default_yAxis(idx, width) {
	    var self = this;
	    var yScale = this.yScale;

	    return d3.svg.axis().scale(yScale[idx]).ticks(self.options.yScaleTicks[idx]).orient('right').tickSize(-1 * width, 0).tickFormat(self.yAxisFormat[idx]);
	};

	exports.default = {
	    default_margin: default_margin,
	    default_height: default_height,
	    default_width: default_width,
	    default_yScale: default_yScale,
	    default_xScale: default_xScale,
	    default_xAxis: default_xAxis,
	    default_yAxis: default_yAxis,
	    default_xAxisOffset: default_xAxisOffset,
	    default_yAxisOffset: [default_yAxisOffset, default_yAxisOffset]
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["candle"] = __webpack_require__(5);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
					value: true
	});
	var keyFunction = function keyFunction(d) {
					return d.date;
	};

	function makeYScale(options, height, model) {

					var extent = model.yExtentRange(-1 * options.onScreenDataNum, 0);
					// var extent = model.yER(options.x1, options.x2);
					var yScale = d3.scale.linear().domain(extent).nice().range([height * 0.68, 0]);
					return yScale;
	}

	function makeYVolumnScale(options, height, model) {
					var extent = model.yVolumeExtentRange(-1 * options.onScreenDataNum, 0);
					var yScale = d3.scale.linear().domain(extent).nice().range([height, height * 0.75]);
					return yScale;
	}

	function makeStem(selection) {
					var scope = this;
					var data = scope.model.data,
					    x = scope.xScale,
					    y = scope.yScale[0];
					var model = scope.model;
					var stroke_witdth = d3.event ? 0.8 / d3.event.scale : 0.8;

					var barWidth = x.rangeBand();
					// barWidth*=0.8
					var offset = barWidth / 2;

					var stems = selection.selectAll('.candleStem').data(data, keyFunction);
					stems.enter().append("line");
					stems.classed('candleStem', true).attr("x1", function (d) {
									return x(d.date) + offset;
					}).attr("x2", function (d) {
									return x(d.date) + offset;
					}).attr("y1", function (d) {
									return y(d.high);
					}).attr("y2", function (d) {
									return y(d.low);
					}).attr("data-value", function (d) {
									return JSON.stringify(d);
					}).attr("stroke", "black").attr("stroke-width", stroke_witdth);

					if (d3.event) {
									stems.attr("transform", "translate(" + d3.event.translate[0] + ",0)scale(" + d3.event.scale + ",1)");
					}
	}

	function makeRect(selection) {
					// console.log(d3.event);
					var scope = this;
					var data = scope.model.data,
					    x = scope.xScale,
					    y = scope.yScale[0];
					var barWidth = x.rangeBand();
					barWidth *= 0.8;
					var offset = barWidth / 2;
					offset = -0.1 * barWidth;

					var rect = selection.selectAll('.candleRect').data(data, keyFunction);
					rect.enter().append("svg:rect");
					rect.classed('candleRect', true).attr("x", function (d) {
									return x(new Date(d.date)) - offset;
					}).attr("y", function (d) {
									return y(Math.max(Number(d.open), Number(d.close)));
					}).attr("height", function (d) {
									var diff = Math.abs(y(Number(d.close)) - y(Number(d.open)));
									return diff === 0 ? 1 : diff;
					}).attr("width", function () {
									return barWidth;
					}).attr("fill", function (d) {
									return Number(d.open) < Number(d.close) ? "#ed5a51" : "#89bc61";
					});

					if (d3.event) {
									rect.attr("transform", "translate(" + d3.event.translate[0] + ",0)scale(" + d3.event.scale + ",1)");
					}
					rect.exit().remove();
	}

	function makeVolume(selection) {
					var scope = this;
					var data = this.model.data,
					    x = scope.xScale,
					    y = scope.yScale[1];

					var barWidth = x.rangeBand();
					barWidth *= 0.8;
					var offset = barWidth / 2;
					offset = -0.1 * barWidth;

					var rect = selection.selectAll('.candleVolume').data(data, keyFunction);
					rect.enter().append("svg:rect");
					rect.classed('candleVolume', true).attr("x", function (d) {
									return x(new Date(d.date)) - offset;
					}).attr("y", function (d) {
									return y(d.volume);
					}).attr("height", function (d) {
									return scope.options.height - y(d.volume);
					}).attr("width", function () {
									return barWidth;
					}).attr("fill", function (d) {
									return Number(d.open) < Number(d.close) ? "#5acdea" : "#5acdea";
					});

					if (d3.event) {
									rect.attr("transform", 'translate(' + d3.event.translate[0] + ',0)scale(' + d3.event.scale + ',1)');
					}
					rect.exit().remove();
	}

	function drawLine() {
					var scope = this;
					var data = scope.data,
					    x = scope.xScale,
					    y = scope.yScale[0];

					return d3.svg.line().interpolate("basic").x(function (d) {
									return x(d.date);
					}).y(function (d) {
									return y(d.close);
					});
	}

	function makeLine(selection) {
					var scope = this;
					var data = scope.model.data,
					    x = scope.xScale,
					    y = scope.yScale[0];
					var stems = selection.selectAll('.line').data([data]);
					stems.enter().append("svg:path");
					stems.classed('line', true).attr("stroke", "black").attr("stroke-width", 1.3).attr("fill", "none").attr("d", drawLine.bind(scope)());
	}

	var candle = {
					plot: [makeStem, makeRect, makeVolume],
					update: [makeStem, makeRect, makeVolume],
					makeYScale: [makeYScale, makeYVolumnScale]

	};

	exports.default = candle;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["line"] = __webpack_require__(7);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function drawLine() {
		var scope = this;
		var data = scope.model.data,
		    x = scope.xScale,
		    y = scope.yScale[0];

		return d3.svg.line().interpolate("basic").x(function (d) {
			return x(d.date);
		}).y(scope.model.keyFun(y));
	}

	function makeLine(selection) {
		var scope = this;
		var data = scope.model.data,
		    x = scope.xScale,
		    y = scope.yScale[0];

		var stems = selection.selectAll('.line').data([data]);
		stems.enter().append("svg:path");
		stems.classed('line', true).attr("stroke", "black").attr("stroke-width", 1.3).attr("fill", "none").attr("d", drawLine.bind(scope)());
	}

	function updateLine(selection) {
		var scope = this;
		var data = scope.model.data,
		    x = scope.xScale,
		    y = scope.yScale[0];

		var stems = selection.selectAll('.line').data([data]);
		stems.attr("d", drawLine.bind(scope)());
		if (d3.event) {
			stems.attr("transform", "translate(" + scope.translate[0] + ",0)scale(" + scope.scale + ",1)");
		}
	}

	var line = {
		plot: [makeLine],
		update: [updateLine]

	};

	exports.default = line;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["lineGen"] = __webpack_require__(9);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var default_options = {
	    stroke: "#5acdea",
	    strokeWidth: 1.3,
	    className: "line" + Math.random().toString(36).substring(2, 8),
	    showShadow: false,
	    alwayDrawNewLine: false,
	    useChartModel: false
	};

	function decorator(model) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


	    var _options = _.extend(_.clone(default_options), options);
	    var line = void 0;
	    var drawlineCache = void 0;
	    var closureModel = model;
	    function drawLine() {
	        // console.log('drawline')
	        var scope = this;
	        // debugger
	        var _model = closureModel ? closureModel : scope.model;
	        var x = scope.xScale;
	        var yScaleIdx = options.yScaleIdx || 0;
	        var y = scope.yScale[yScaleIdx];
	        var yUpdate = _model.keyFun(y);

	        var barWidth = void 0;
	        if ('rangeBand' in x) {
	            barWidth = x.rangeBand();
	        } else {
	            barWidth = 1;
	        }
	        var offset = barWidth / 2;
	        // debugger

	        function xUpdate(d) {

	            return d.x + offset || x(d.date) + offset;
	        }
	        return d3.svg.line().interpolate("basic").x(xUpdate).y(yUpdate);
	    }

	    function makeLine(selection) {
	        var scope = this;
	        var _model = closureModel ? closureModel : scope.model;

	        var data = _model.data;
	        var x = scope.xScale;
	        var yScaleIdx = _options.yScaleIdx || 0;
	        var y = scope.yScale[yScaleIdx];
	        var yFunction = _model.keyFun();
	        // data = data.filter(function())

	        var idx = 0;
	        for (idx = 0; idx < data.length; idx++) {
	            if (yFunction(data[idx])) {
	                break;
	            }
	        };
	        data = data.slice(idx);

	        var stems = selection.selectAll('.' + _options.className);

	        // .data([data],(d,i)=> i);
	        stems = selection.append("path").classed(_options.className, true).attr("stroke", _options.stroke).attr("stroke-width", _options.strokeWidth).attr("fill", "none").attr("d", drawLine.bind(scope)()(data));

	        if (_options.showShadow) {
	            stems.style("filter", "url(#drop-shadow)");
	        }
	        line = stems;
	    }

	    function updateLine(selection) {
	        var scope = this;
	        var _model = closureModel ? closureModel : scope.model;

	        var data = void 0;
	        var yFunction = void 0;

	        if (_options.useChartModel) {
	            _model = scope.model;
	            yFunction = closureModel.keyFun();
	            data = scope.onScreenData;
	        } else {
	            yFunction = _model.keyFun();
	            data = _model.data || scope.onScreenData;
	        }

	        drawlineCache = drawlineCache || drawLine.bind(scope);

	        // check null from data start , then slice it ,  may caused by ma function
	        var idx = 0;

	        for (idx = 0; idx < data.length; idx++) {

	            if (yFunction(data[idx])) {
	                break;
	            }
	        };

	        data = data.slice(idx);
	        var stems;
	        if (_options.alwayDrawNewLine) {
	            line.remove();
	            stems = selection.append("path").classed(_options.className, true).attr("stroke", _options.stroke).attr("stroke-width", _options.strokeWidth).attr("fill", "none").attr("d", drawLine.bind(scope)()(data));
	        } else {
	            stems = line;
	            stems.attr("d", drawlineCache()(data));
	        }

	        // var stems = selection.select('.'+_options.className)

	        // if(d3.event){
	        stems.attr("transform", "translate(" + scope.translate[0] + ",0)scale(" + scope.scale + ",1)");
	        // }

	        line = stems;
	    }

	    function removeLine() {
	        line.remove();
	    }

	    function changeModel(model) {
	        closureModel = model;
	    }

	    return {
	        makeLine: makeLine,
	        updateLine: updateLine,
	        removeLine: removeLine,
	        make: makeLine,
	        update: updateLine,
	        remove: removeLine,
	        changeModel: changeModel
	    };
	}

	var defaultDecorator = decorator();
	var lineGen = {
	    // lineGen : lineGen,
	    decorator: decorator,
	    plot: [defaultDecorator.makeLine],
	    update: [defaultDecorator.updateLine]
	};

	exports.default = lineGen;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["bar"] = __webpack_require__(11);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var keyFunction = function keyFunction(d) {
	    return d.dateKey;
	};
	var options;
	var default_options = {
	    className: "bar",
	    fillColor: "#ed5a51",
	    "fill-opacity": 0.2,
	    barWidth: function barWidth(d) {
	        return d * 0.8;
	    },
	    offset: function offset(d) {
	        return d / 2;
	    },
	    zero_height: 0
	};

	function decorator(model) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var _options = _.extend(_.clone(default_options), options);
	    var yScaleIdx = options.yScaleIdx || 0;
	    var x = void 0,
	        y = void 0;
	    var rect = void 0;
	    var barHeightFun = void 0,
	        barYFun = void 0;
	    var closureModel = model;

	    function makeBar(selection) {
	        var scope = this;
	        var _model = closureModel ? closureModel : scope.model;
	        var data = _model.data;
	        x = scope.xScale;

	        y = scope.yScale[yScaleIdx];

	        var tmp1 = void 0,
	            tmp2 = void 0;

	        var barWidth = void 0;
	        if ('rangeBand' in x) {
	            barWidth = _options.barWidth(x.rangeBand());
	        } else {
	            barWidth = _options.barWidth(1);
	        }

	        // let
	        var offset = _options.offset(barWidth);
	        var height = y(0);

	        if (!barHeightFun) {
	            if (_options.barHeightParam) {
	                (function () {
	                    var barHeightParam = _options.barHeightParam;
	                    if (barHeightParam.length == 1) {
	                        barHeightFun = function barHeightFun(d) {
	                            return Math.abs(y(0) - y(d[barHeightParam[0]]));
	                        };
	                    } else {
	                        barHeightFun = function barHeightFun(d) {
	                            var diff = Math.abs(y(d[barHeightParam[0]]) - y(d[barHeightParam[1]]));
	                            return diff == 0 ? _options.zero_height : diff;
	                        };
	                    }
	                })();
	            } else {
	                barHeightFun = _model.keyFun(function (d) {
	                    return height - y(d);
	                });
	            }
	        }

	        if (!barYFun) {
	            if (_options.barYParam) {
	                barYFun = function barYFun(d) {
	                    return y(d[_options.barYParam]);
	                };
	            } else {
	                barYFun = _model.keyFun(y);
	            }
	        }

	        // if(!bars){
	        rect = selection.selectAll("." + _options.className).data(scope.onScreenData || data, keyFunction);
	        // rect =
	        rect.enter().append("svg:rect").attr('class', _options.className).attr("x", function (d) {
	            return d.x - offset;
	        }).attr("y", barYFun).attr("height", barHeightFun).attr("width", barWidth).attr("fill", _options.fillColor).attr("fill-opacity", _options.fillColor);
	        rect.attr("y", barYFun).attr("height", barHeightFun).attr("x", function (d) {
	            return d.x - offset;
	        });
	        // .style("display", "");
	        // if(d3.event){  
	        rect.attr("transform", "translate(" + scope.translate[0] + ",0)scale(" + scope.scale + ",1)");
	        // }
	        rect.exit()
	        // .style("display", "none");
	        .remove();
	    }

	    function removeBar() {
	        rect.remove();
	    }

	    function changeModel(model) {
	        closureModel = model;
	    }

	    return {
	        make: makeBar,
	        update: makeBar,
	        remove: removeBar,
	        changeModel: changeModel
	    };
	}

	var bar = {
	    plot: [decorator()],
	    update: [decorator()],
	    decorator: decorator
	};

	exports.default = bar;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["area"] = __webpack_require__(13);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var keyFunction = function keyFunction(d) {
	    return d.dateKey;
	};
	var options;
	var default_options = {
	    fillColor: "#ed5a51",
	    barWidth: function barWidth(d) {
	        return d * 0.9;
	    },
	    offset: function offset(d) {
	        return d / 2;
	    },
	    className: "bar",
	    "fillOpacity": 1
	};

	function decorator(model, options) {
	    var area = void 0;
	    var closureModel = model;
	    function makeArea(selection) {
	        var scope = this;
	        var _model = closureModel ? closureModel : scope.model;

	        var data = _model.data;
	        var x = scope.xScale;
	        var y = scope.yScale[0];
	        var tmp1 = void 0,
	            tmp2 = void 0;
	        var _options = _.extend(_.clone(default_options), options);
	        var barWidth = _options.barWidth(x.rangeBand());

	        var offset = _options.offset(barWidth);
	        var height = y(0);

	        var barHeightFun = void 0,
	            barYFun = void 0;

	        if (_options.barHeightParam) {
	            (function () {
	                var barHeightParam = _options.barHeightParam;
	                if (barHeightParam.length == 1) {
	                    barHeightFun = function barHeightFun(d) {
	                        return y(d[barHeightParam[0]]);
	                    };
	                }
	            })();
	        } else {
	            barHeightFun = function barHeightFun(d) {

	                return y(0);
	            };
	        }

	        if (_options.barYParam) {
	            barYFun = function barYFun(d) {

	                // console.log(d[_options.barYParam])
	                return y(d[_options.barYParam]);
	            };
	        } else {
	            barYFun = _model.keyFun(y);
	        }

	        var areaFun = d3.svg.area().x(function (d) {
	            return x(d.date) + offset;
	        }).y0(barHeightFun).y1(barYFun);

	        area = selection.selectAll("." + _options.className).data([data], function (d, i) {
	            return options.className + "_" + i + 1;
	        });
	        area.enter().append("svg:path");
	        area.classed(_options.className, true)
	        // .attr("stroke", "black")
	        // .attr("stroke-width", 1.3)
	        .attr("fill", _options.fillColor).attr("fill-opacity", _options.fillOpacity)
	        // .attr("fill", "black")
	        .attr("d", areaFun);

	        area.attr("transform", "translate(" + scope.translate[0] + ",0)scale(" + scope.scale + ",1)");

	        // area.exit().remove()
	    }

	    function removeArea() {
	        area.remove();
	    }

	    function changeModel(model) {
	        closureModel = model;
	    }

	    return {
	        make: makeArea,
	        update: makeArea,
	        remove: removeArea,
	        changeModel: changeModel
	    };
	}

	var area = {
	    plot: [decorator()],
	    update: [decorator()],
	    decorator: decorator
	};

	exports.default = area;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["stem"] = __webpack_require__(15);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var keyFunction = function keyFunction(d) {
	    return d.dateKey;
	};
	var options;
	var default_options = {
	    className: "stem",
	    strokeColor: "black",
	    strokeWidth: function strokeWidth(scope) {
	        return scope.scale ? 0.8 / scope.scale : 0.8;
	    },
	    offset: function offset(d) {
	        return d / 2;
	    },
	    barWidth: function barWidth(d) {
	        return d * 0.8;
	    }
	};

	function decorator(model) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var stems;
	    function makeStem(selection) {
	        var scope = this;
	        var _model = model ? model : scope.model;

	        var data = _model.data;
	        var x = scope.xScale;
	        var yScaleIdx = options.yScaleIdx || 0;
	        var y = scope.yScale[yScaleIdx];
	        var _options = _.extend(_.clone(default_options), options);
	        var barWidth = void 0;
	        var barRange = void 0;
	        if ('rangeBand' in x) {
	            barRange = x.rangeBand();
	            barWidth = _options.barWidth(barRange);
	        } else {
	            barRange = 1;
	            barWidth = _options.barWidth(1);
	        }

	        var offset = _options.offset(barRange);
	        var height = y(0);
	        var stroke_witdth = _options.strokeWidth(scope);

	        var y1Fun = void 0,
	            y2Fun = void 0;
	        if (_options.y1Param) {
	            y1Fun = function y1Fun(d) {
	                return y(d[_options.y1Param]);
	            };
	        } else {
	            console.warn("must set y1Param");
	        }

	        if (_options.y2Param) {
	            y2Fun = function y2Fun(d) {
	                return y(d[_options.y2Param]);
	            };
	        } else {
	            console.warn("must set y2Param");
	        }

	        // console.log(scope.onScreenData.length)
	        stems = selection.selectAll("." + _options.className).data(scope.onScreenData || data, keyFunction);
	        stems.enter().append("line").classed(_options.className, true).attr("x1", function (d) {
	            return d.x - offset;
	        }).attr("x2", function (d) {
	            return d.x - offset;
	        }).attr("y1", y1Fun).attr("y2", y2Fun).attr("stroke", _options.strokeColor).attr("stroke-width", stroke_witdth);

	        stems.attr("y1", y1Fun).attr("y2", y2Fun).attr("stroke-width", stroke_witdth);
	        // .style("display", "")
	        // if(d3.event){
	        stems.attr("transform", "translate(" + scope.translate[0] + ",0)scale(" + scope.scale + ",1)");
	        // }
	        stems.exit()
	        // .style("display", "none");
	        .remove();
	    };
	    function removeStems() {
	        stems.remove();
	    }

	    return {
	        make: makeStem,
	        update: makeStem,
	        remove: removeStems
	    };
	}

	var stem = {
	    plot: [decorator()],
	    update: [decorator()],
	    decorator: decorator
	};

	exports.default = stem;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["dots"] = __webpack_require__(17);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var keyFunction = function keyFunction(d) {
	    return d.dateKey;
	};
	var options;
	var default_options = {
	    className: "circle",
	    fill: "black",
	    offset: function offset(d) {
	        return d / 2;
	    },
	    barWidth: function barWidth(d) {
	        return d;
	    },
	    r: 5
	};

	function decorator(model) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var closureModel = model;
	    var circles = void 0;
	    function makeDots(selection) {
	        var scope = this;
	        var _model = closureModel ? closureModel : scope.model;
	        var data = _model.data;
	        var x = scope.xScale;
	        var yScaleIdx = options.yScaleIdx || 0;
	        var y = scope.yScale[yScaleIdx];
	        var _options = _.extend(_.clone(default_options), options);
	        var barWidth = void 0;
	        var barRange = void 0;
	        if ('rangeBand' in x) {
	            barRange = x.rangeBand();
	        } else {
	            barRange = 1;
	        }

	        var offset = _options.offset(barRange);
	        var fill = _options.fill;
	        var r = _options.r;
	        var yUpdate = _model.keyFun(y);

	        circles = selection.selectAll("." + _options.className).data(data || scope.onScreenData, keyFunction);
	        circles.enter().append("circle").classed(_options.className, true).attr("cx", function (d) {
	            return (d.x || x(d.date)) + offset;
	        }).attr("cy", yUpdate).attr("r", r).attr("fill", fill);

	        circles.attr("cy", yUpdate).attr("fill", fill).attr("r", r);
	        circles.attr("transform", "translate(" + scope.translate[0] + ",0)scale(" + scope.scale + ",1)");
	        circles.exit().remove();
	    };

	    function removeDots() {
	        circles.remove();
	    }

	    function changeModel(model) {
	        closureModel = model;
	    }

	    return {
	        make: makeDots,
	        update: makeDots,
	        remove: removeDots,
	        changeModel: changeModel
	    };
	}

	var dots = {
	    decorator: decorator
	};

	exports.default = dots;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["model"] = __webpack_require__(19);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function memoize(f) {
	  var cache = {};
	  return function () {
	    var key = Array.prototype.join.call(arguments, ',');
	    if (key in cache) return cache[key];else return cache[key] = f.apply(this, arguments);
	  };
	}

	var candle = function () {
	  function candle(data) {
	    _classCallCheck(this, candle);

	    this.data = data;
	    this._xDomain = this.data.map(function (val) {
	      return val.date.toString();
	    });
	    this.yER = memoize(this.yExtentRange);
	    this.yVER = memoize(this.yVolumeExtentRange);
	    // this.yER = this.yExtentRange;
	    this.data.forEach(function (row, i) {
	      row.dateKey = row.date.getTime();
	    });
	  }

	  _createClass(candle, [{
	    key: 'getData',
	    value: function getData() {
	      return this.data;
	    }
	  }, {
	    key: 'getDataByIdx',
	    value: function getDataByIdx(idx) {
	      return this.data[idx];
	    }
	  }, {
	    key: 'xExtent',
	    value: function xExtent() {
	      var data = this.data;
	      var minN = data[0].date.getTime(),
	          maxN = data[data.length - 1].date.getTime();
	      return [minN, maxN];
	    }
	  }, {
	    key: 'yExtentRange',
	    value: function yExtentRange(start, end) {
	      if (end <= start) {
	        end = start + 1;
	      }
	      var data = this.data;
	      var yMin, yMax;

	      if (start < 0 && end === 0) {
	        yMin = d3.min(data.slice(start), function (d) {
	          return d.min || d.low;
	        });
	        yMax = d3.max(data.slice(start), function (d) {
	          return d.max || d.high;
	        });
	      } else {

	        yMax = Number.MIN_VALUE;
	        yMin = Number.MAX_VALUE;
	        for (var i = start; i < end; i++) {
	          if (data[i].max > yMax) {
	            yMax = data[i].max;
	          }
	          if (data[i].min < yMin) {
	            yMin = data[i].min;
	          }
	        };
	        // var onscreen = data.slice(start, end);
	        // yMin = d3.min(onscreen,  (d) => d.min),
	        // yMax = d3.max(onscreen,  (d) => d.max);
	      }
	      return [yMin, yMax];
	    }
	  }, {
	    key: 'yVolumeExtentRange',
	    value: function yVolumeExtentRange(start, end) {
	      var data = this.data;
	      var yMax;
	      if (start < 0 && end === 0) {
	        yMax = d3.max(data.slice(start), function (d) {
	          return d.volume;
	        });
	      } else {
	        yMax = d3.max(data.slice(start, end), function (d) {
	          return d.volume;
	        });
	      }
	      return [0, yMax];
	    }
	  }, {
	    key: 'calcArea',
	    value: function calcArea() {
	      return this.height * this.width;
	    }
	  }, {
	    key: 'xDomain',
	    get: function get() {
	      return this._xDomain;
	    }
	  }, {
	    key: 'yExtent',
	    get: function get() {
	      return this.calcArea();
	    }
	  }, {
	    key: 'length',
	    get: function get() {
	      return this.data.length;
	    }
	  }]);

	  return candle;
	}();

	exports.default = candle;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["instimodel"] = __webpack_require__(21);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var insti = function () {
	  function insti(data) {
	    _classCallCheck(this, insti);

	    this.data = data;
	    this._xDomain = this.data.map(function (val) {
	      return val.date;
	    });
	  }

	  _createClass(insti, [{
	    key: "keyFun",
	    value: function keyFun() {
	      var args = Array.prototype.slice.call(arguments);

	      var funcs = [function (d) {
	        return d.FIsell;
	      }];
	      if (args.length > 0) {
	        funcs = funcs.concat(args);
	      }

	      return _.flowRight.apply(null, funcs.reverse());
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      return this.data;
	    }
	  }, {
	    key: "getDataByIdx",
	    value: function getDataByIdx(idx) {
	      return this.data[idx];
	    }
	  }, {
	    key: "xExtent",
	    value: function xExtent() {
	      var data = this.data;
	      var minN = data[0].date.getTime(),
	          maxN = data[data.length - 1].date.getTime();
	      return [minN, maxN];
	    }
	  }, {
	    key: "yExtentRange",
	    value: function yExtentRange(start, end) {
	      var data = this.data;
	      var yMin, yMax;
	      if (start < 0 && end === 0) {
	        yMin = 0;
	        yMax = d3.max(data.slice(start), this.keyFun());
	      } else {
	        yMin = 0, yMax = d3.max(data.slice(start, end), this.keyFun());
	      }
	      return [yMin, yMax];
	    }
	  }, {
	    key: "xDomain",
	    get: function get() {
	      return this._xDomain;
	    }
	  }, {
	    key: "yExtent",
	    get: function get() {
	      return this.calcArea();
	    }
	  }, {
	    key: "length",
	    get: function get() {
	      return this.data.length;
	    }
	  }]);

	  return insti;
	}();

	exports.default = insti;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["gmodel"] = __webpack_require__(23);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function memoize(f) {
	  var cache = {};
	  return function () {
	    var key = Array.prototype.join.call(arguments, ',');
	    if (key in cache) return cache[key];else return cache[key] = f.apply(this, arguments);
	  };
	}

	var general = function () {
	  function general(data, yFunction, options) {
	    _classCallCheck(this, general);

	    this.data = data;
	    this._xDomain = this.data.map(function (val) {
	      return val.date.toString();
	    });
	    this._yFunction = yFunction;
	    this.yER = memoize(this.yExtentRange);
	    this._options = options;
	    this.data.forEach(function (row, i) {
	      row.dateKey = row.date.getTime();
	    });
	  }
	  /* two parts 
	    1. xExtent , yExtent , xDomain to set global charts info
	    2. others for plot chart 
	  */


	  _createClass(general, [{
	    key: 'keyFun',
	    value: function keyFun() {
	      var args = Array.prototype.slice.call(arguments);

	      var funcs = [this._yFunction];
	      if (args.length > 0) {
	        funcs = funcs.concat(args);
	      }

	      return _.flowRight.apply(null, funcs.reverse());
	    }
	  }, {
	    key: 'getData',
	    value: function getData() {
	      return this.data;
	    }
	  }, {
	    key: 'getDataByIdx',
	    value: function getDataByIdx(idx) {
	      return this.data[idx];
	    }
	  }, {
	    key: 'xExtent',
	    value: function xExtent() {
	      var data = this.data;
	      var minN = data[0].date.getTime(),
	          maxN = data[data.length - 1].date.getTime();
	      return [minN, maxN];
	    }
	  }, {
	    key: 'yExtentRange',
	    value: function yExtentRange(start, end) {
	      var fullRange = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	      var data = this.data;
	      var yMin, yMax;
	      if (start < 0 && end === 0) {
	        if (fullRange) {
	          yMin = d3.min(data.slice(start), this.keyFun());
	        } else {
	          yMin = 0;
	        }

	        yMax = d3.max(data.slice(start), this.keyFun());
	      } else {
	        if (fullRange) {
	          yMin = d3.min(data.slice(start, end), this.keyFun());
	        } else {
	          yMin = 0;
	        }

	        yMax = d3.max(data.slice(start, end), this.keyFun());
	      }
	      return [yMin, yMax];
	    }
	  }, {
	    key: 'options',
	    get: function get() {
	      return this._options;
	    }
	  }, {
	    key: 'xDomain',
	    get: function get() {
	      return this._xDomain;
	    }
	  }, {
	    key: 'yExtent',
	    get: function get() {
	      return this.calcArea();
	    }
	  }, {
	    key: 'length',
	    get: function get() {
	      return this.data.length;
	    }
	  }]);

	  return general;
	}();

	exports.default = general;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["combinator"] = __webpack_require__(25);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var combinator = function () {
	  function combinator() {
	    _classCallCheck(this, combinator);

	    this.models = Array.prototype.slice.call(arguments);
	    this.map = new Map();
	    var map = this.map;
	    this.models.forEach(function (model) {
	      model.data.forEach(function (row) {
	        var rowtime = row.date.getTime();
	        if (map.has(rowtime)) {
	          map.get(rowtime).push(row);
	        } else {
	          map.set(rowtime, [row]);
	        }
	      });
	    });
	    this._xDomain = Array.from(this.map.keys()).map(function (x) {
	      return new Date(x);
	    });
	  }

	  _createClass(combinator, [{
	    key: 'xExtent',
	    value: function xExtent() {
	      var _models$0$xExtent = this.models[0].xExtent();

	      var _models$0$xExtent2 = _slicedToArray(_models$0$xExtent, 2);

	      var xMin = _models$0$xExtent2[0];
	      var xMax = _models$0$xExtent2[1];

	      this.models.forEach(function (model) {
	        var xExtent = model.xExtent();

	        if (xExtent[0] <= xMin) {
	          xMin = xExtent[0];
	        }
	        if (xExtent[1] >= xMax) {
	          xMax = xExtent[1];
	        }
	      });
	      return [xMin, xMax];
	    }
	  }, {
	    key: 'yExtentRange',
	    value: function yExtentRange(start, end) {
	      // use binary search find mapping
	      var yMin = Number.MAX_VALUE,
	          yMax = -1 * Number.MAX_VALUE;

	      this.models.forEach(function (model) {
	        var yExtent = model.yExtentRange(start, end);
	        if (yExtent[0] <= yMin) {
	          yMin = yExtent[0];
	        }
	        if (yExtent[1] >= yMax) {
	          yMax = yExtent[1];
	        }
	      });

	      return [yMin, yMax];
	    }
	  }, {
	    key: 'getDataByIdx',
	    value: function getDataByIdx(idx) {
	      var key = this.xDomain[idx].getTime();
	      return this.map.get(key);
	    }
	  }, {
	    key: 'xDomain',
	    get: function get() {
	      // return _.union.apply(null, this.models.map(x=>x.xDomain)).sort(function(a,b){
	      //   return new Date(a) - new Date(b);
	      // });
	      return this._xDomain;
	    }
	  }, {
	    key: 'data',
	    get: function get() {
	      // for use case in overlap
	      return this.xDomain.map(function (x) {
	        return { 'date': x };
	      });
	    }
	  }, {
	    key: 'length',
	    get: function get() {
	      return this.xDomain.length;
	    }
	  }]);

	  return combinator;
	}();

	exports.default = combinator;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["reducer"] = __webpack_require__(27);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function compose() {
	    for (var _len = arguments.length, composeFuns = Array(_len), _key = 0; _key < _len; _key++) {
	        composeFuns[_key] = arguments[_key];
	    }

	    return function () {
	        var _this = this;

	        for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            arg[_key2] = arguments[_key2];
	        }

	        composeFuns.forEach(function (composeFun) {
	            return composeFun.bind(_this).apply(undefined, arg);
	        });
	    };
	}

	function composePlot() {
	    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	    }

	    return {
	        make: compose.apply(undefined, _toConsumableArray(args.map(function (x) {
	            return x.make;
	        }))),
	        update: compose.apply(undefined, _toConsumableArray(args.map(function (x) {
	            return x.update;
	        }))),
	        remove: compose.apply(undefined, _toConsumableArray(args.map(function (x) {
	            return x.remove;
	        }))),
	        changeModel: compose.apply(undefined, _toConsumableArray(args.map(function (x) {
	            return x.changeModel;
	        })))
	    };
	}

	exports.default = {
	    composePlot: composePlot
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["plotFuns"] = __webpack_require__(29);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
		"river-chart": __webpack_require__(30),
		"candle-chart": __webpack_require__(31),
		"month-revenue": __webpack_require__(32),
		"test-line": __webpack_require__(33),
		"test-bar": __webpack_require__(34),
		"institution-tx": __webpack_require__(35),
		"realtime-price": __webpack_require__(36),
		"commodity-page": __webpack_require__(37),
		"stock-distribution": __webpack_require__(38),
		"candle-chart-new": __webpack_require__(39)
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	function genChartOptions(rawdata) {
		var data = rawdata[0].rawContent;
		var min = 100000,
		    max = 0;
		data.forEach(function (row) {
			row.date = new Date(row.date);
			row.close = Number(row.close);
			row.close = Number(row.close);
			row.per = Number(row.per);
			row.e = row.close / row.per;
			if (row.per > max) max = row.per;
			if (row.per < min) min = row.per;
		});
		var inter = d3.interpolate(min, max);
		var range = _.range(7).map(function (val) {
			return inter(val / 6);
		});

		min = 100000, max = 0;

		data.forEach(function (row) {
			for (var i = 0; i < 7; i++) {
				row['y' + i] = row.e * range[i];
				if (row['y' + i] > max) max = row['y' + i];
				if (row['y' + i] < min) min = row['y' + i];
			};
		});

		var candle_model2 = new gmodel(data, function (d) {
			return d.close;
		});

		// var line3 = lineGen.decorator();

		var line3 = lineGen.decorator(new gmodel(data, function (d) {
			return d.close;
		}), {
			stroke: "#ff612a",
			strokeWidth: 2,
			className: "line3",
			showShadow: true
		});

		// #d8f7ff , #93f3f9 , #baffc0 , #fff8b9, #ffe3ea , #ffb5c6

		var instiArea = [area.decorator(candle_model2, {
			fillColor: "#d8f7ff",
			className: "area1",
			// barHeightParam : ['y0'] ,
			barYParam: 'y1',
			"fillOpacity": 0.8
		}), area.decorator(candle_model2, {
			fillColor: "#93f3f9",
			className: "area2",
			barHeightParam: ['y1'],
			barYParam: 'y2',
			"fillOpacity": 0.8
		}), area.decorator(candle_model2, {
			fillColor: "#baffc0",
			className: "area3",
			barHeightParam: ['y2'],
			barYParam: 'y3',
			"fillOpacity": 0.8
		}), area.decorator(candle_model2, {
			fillColor: "#fff8b9",
			className: "area4",
			barHeightParam: ['y3'],
			barYParam: 'y4',
			"fillOpacity": 0.8
		}), area.decorator(candle_model2, {
			fillColor: "#ffe3ea",
			className: "area5",
			barHeightParam: ['y4'],
			barYParam: 'y5',
			"fillOpacity": 0.8
		}), area.decorator(candle_model2, {
			fillColor: "#ffb5c6",
			className: "area6",
			barHeightParam: ['y5'],
			barYParam: 'y6',
			"fillOpacity": 0.8
		})];

		var yScale = function yScale(options, height, model) {
			var extent = model.yExtentRange(-1 * options.onScreenDataNum, 0);
			var yScale = d3.scale.linear().domain([min, max]).nice().range([height, 0]);
			return yScale;
		};

		return {
			//data : data,
			model: candle_model2,
			target: '.chart2',
			plotFuns: instiArea.concat(line3.makeLine),
			updateFuns: instiArea.concat(line3.updateLine),
			enableEvents: false,
			yScale: [yScale],
			cursorMessage: function cursorMessage(message) {
				console.log(message);
			}
		};
	}

	module.exports = genChartOptions;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	var volumeyAxis = function volumeyAxis(idx, width) {
		var self = this;
		var yScale = this.yScale;
		var formatString = d3.format("s");

		return d3.svg.axis().scale(yScale[idx]).orient('right').tickSize(-1 * width, 0).ticks(4).tickFormat(formatString);
	};

	function genChartOptions(rawdata) {
		var data = rawdata[0].rawContent;
		data.forEach(function (val) {
			val.open = Number(val.open);
			val.high = Number(val.high);
			val.low = Number(val.low);
			val.close = Number(val.close);
			val.date = new Date(val.date);
		});
		var candle_model = new model(data);
		return {
			model: candle_model,
			plotFuns: candle.plot,
			updateFuns: candle.update,
			target: '.chart2',
			onScreenDataNum: 66,
			enableEvents: false,
			yScale: candle.makeYScale,
			yAxisFuns: [null, volumeyAxis],
			cursorMessage: function cursorMessage(message) {
				console.log(message.date, message);
			}
		};
	}

	module.exports = genChartOptions;

	// export default {};

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	function makeYScale(options, height, model) {
	    var extent = d3.extent(model.data, model._yFunction);
	    if (extent[0] > 0) {
	        extent[0] = 0;
	    }
	    var yScale = d3.scale.linear().domain(extent).nice().range([height, 0]);
	    return yScale;
	}

	function makeYScale2(options, height, model) {
	    var extent = options.subModels[0].yER(-1 * options.onScreenDataNum, 0, true);
	    if (extent[0] > 0) {
	        extent[0] = 0;
	    }
	    var yScale = d3.scale.linear().domain(extent).nice().range([height, 0]);
	    return yScale;
	}

	function defaultYAxis(idx, width) {
	    var self = this;
	    var yScale = this.yScale;
	    return d3.svg.axis().scale(yScale[idx]).ticks(self.options.yScaleTicks[idx]).orient('right').tickSize(-1 * width, 0).tickFormat(self.yAxisFormat[idx]);
	}

	function defaultYAxis2(idx, width) {
	    var self = this;
	    var yScale = this.yScale;
	    return d3.svg.axis().scale(yScale[idx]).ticks(self.options.yScaleTicks[idx]).orient('left')
	    // .tickSize(-1*width, 0)
	    .tickFormat(self.yAxisFormat[idx]);
	}

	function genChartOptions(rawdata, priceData) {

	    var data = rawdata.reverse();
	    var bisect = d3.bisector(function (d) {
	        return d.date;
	    }).left;

	    var chartData = data.map(function (row) {
	        var result = {
	            date: new Date(row.year, row.month - 1),
	            dateShow: row.year + '-' + row.month,
	            value: row.data['current'].revenue * 1000,
	            yoy: row.data['current'].yoy
	        };
	        result.zero = 0;
	        if (result.value < 0) {
	            result.y1 = result.value;
	            result.y2 = 0;
	        } else {
	            result.y1 = 0;
	            result.y2 = result.value;
	        }
	        console.log(result);
	        return result;
	    });

	    // var revenueModel = new gmodel(data, function(d){return d.value;});
	    // var revenueModel2 = new gmodel(data, function(d){return d.value;});

	    // var revenueModel3 = new gmodel(priceData, function(d){return d.close;});

	    var revenueModels = [new gmodel(chartData, function (d) {
	        return d.value;
	    }), new gmodel(chartData, function (d) {
	        return d.yoy;
	    })];

	    var customBar = bar.decorator(revenueModels[1], {
	        fillColor: "#E5C362",
	        offset: function offset(d) {
	            return -0.1 * d;
	        },
	        barWidth: function barWidth(d) {
	            return d * 0.8;
	        },
	        barHeightParam: ['y1', 'y2'],
	        barYParam: 'y2',
	        yScaleIdx: 0
	    });

	    var customLine = lineGen.decorator(revenueModels[1], {
	        stroke: '#4d4d4d',
	        strokeWidth: 1,
	        className: "line1",
	        yScaleIdx: 1,
	        alwayDrawNewLine: true
	    });

	    // var custumBar = dots.decorator( revenueModel2, {
	    //     fill : "green",
	    //     // barWidth : (d) => d*0.9,
	    //     r : 2.5
	    // });

	    // var line2 =  lineGen.decorator(revenueModel2, {
	    //     stroke : "green",
	    //     strokeWidth : 2,
	    //     className : "linexx2",
	    //     yScaleIdx : 1,
	    //     alwayDrawNewLine : true
	    // });

	    // var areaa = area.decorator( revenueModel2, {
	    //         fillColor : "green",
	    //         className : "area1",
	    //         // barHeightParam : ['val'] ,
	    //         barWidth : (d) =>d,
	    //         offset : (d)=> d/2,
	    //         barYParam: 'val',
	    //         "fillOpacity" : 0.2,
	    //     });

	    // var line =  lineGen.decorator(revenueModel, {
	    //     stroke : "black",
	    //     strokeWidth : 2,
	    //     className : "linexx",
	    //     yScaleIdx : 0,
	    //     alwayDrawNewLine : true
	    // });

	    // var line3 =  lineGen.decorator(revenueModel3, {
	    //     stroke : "blue",
	    //     strokeWidth : 2,
	    //     className : "linexx3",
	    //     yScaleIdx : 0
	    // });

	    // var comb = reducer.composePlot(custumBar, line2, areaa);

	    return {
	        margin: { top: 5, right: 30, bottom: 30, left: 30 },
	        model: revenueModels[0],
	        target: '.chart2',
	        plotFuns: [customBar.make, customLine.make],
	        updateFuns: [customBar.update, customLine.update],
	        enableEvents: false,
	        onScreenDataNum: chartData.length,
	        xAxisFormat: '%Y/%m',

	        subModels: [revenueModels[1]],
	        yScaleTicks: [5, 5],
	        yAxisFormat: [function (d) {
	            return d3.format(".2s")(d).replace('G', 'B');
	        }, function (d) {
	            return d + "%";
	        }],
	        yScale: [makeYScale, makeYScale2],
	        yAxisFuns: [defaultYAxis, defaultYAxis2],
	        yAxisOffset: [function (w) {
	            return w;
	        }, function (w) {
	            return 0;
	        }],

	        cursorMessage: function cursorMessage(message) {
	            console.log(message);
	        },
	        // tmp : [line.removeLine,line2.removeLine],
	        // subModels : [revenueModel2,revenueModel3],
	        data: data,
	        updateModels: function updateModels(newModel) {
	            // console.log('inin',newModel)
	            comb.changeModel(newModel);
	        }
	    };
	}

	module.exports = genChartOptions;

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";

	function lineYScale(options, height, model) {
		// var initPrice = model.data[0].price;
		//    var extent = model.yExtentRange(-1* options.onScreenDataNum, 0);
		//    console.log(extent)
		var stackExtent = [150000, 200000];
		var yScale = d3.scale.linear().domain(stackExtent).nice().range([height, 0]);
		return yScale;
	}

	function genChartOptions(rawdata) {
		var data = rawdata[0].rawContent.history;
		data.forEach(function (val) {
			val.net_o_bal = Number(val.net_o_bal);
			val.mar_ysd_q = Number(val.mar_ysd_q);
			val.date = new Date(val.date);
		});

		var close_model1 = new gmodel(data, function (d) {
			return d.net_o_bal * 1;
		});
		var close_model2 = new gmodel(data, function (d) {
			return d.mar_ysd_q;
		});

		var lineFuns = [lineGen.decorator(close_model1, {
			stroke: "#763539",
			strokeWidth: 1,
			className: "line3"
		}), lineGen.decorator(close_model2, {
			stroke: "#127a79",
			strokeWidth: 1,
			className: "line2"
		})];

		return {
			model: close_model1,
			plotFuns: lineFuns.map(function (x) {
				return x.makeLine;
			}),
			updateFuns: lineFuns.map(function (x) {
				return x.updateLine;
			}),
			target: '.chart2',
			enableEvents: true,
			yScale: [lineYScale],
			cursorMessage: function cursorMessage(message) {
				console.log(message);
			}
		};
	}
	module.exports = genChartOptions;

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";

	function makeYScale(options, height, model) {

					var extent = model.yExtentRange(-1 * options.onScreenDataNum, 0);
					// var extent = model.yER(options.x1, options.x2);
					var yScale = d3.scale.linear().domain(extent).nice().range([height * 0.68, 0]);
					return yScale;
	}

	function makeYVolumnScale(options, height, model) {
					var extent = model.yVolumeExtentRange(-1 * options.onScreenDataNum, 0);
					var yScale = d3.scale.linear().domain(extent).nice().range([height, height * 0.75]);
					return yScale;
	}

	function volumeYScale(options, height, model) {
					var extent = d3.extent(model.data.map(function (x) {
									return x.volume;
					}));
					var stackExtent = extent;
					var yScale = d3.scale.linear().domain(stackExtent).nice().range([height, height * 0.7]);
					return yScale;
	}

	function lineYScale(options, height, model) {
					var initPrice = model.data[0].price;
					var extent = model.yExtentRange(-1 * options.onScreenDataNum, 0);
					var stackExtent = [initPrice * 0.9, initPrice * 1.1];
					var yScale = d3.scale.linear().domain(stackExtent).nice().range([height * 0.65, 0]);
					return yScale;
	}

	function genChartOptions(data) {
					data = data.rawContent;
					data = data.slice(0, -20);
					data.forEach(function (val) {

									val.open = Number(val.open);
									val.high = Number(val.high);
									val.low = Number(val.low);
									val.close = Number(val.close);

									val.barbottom = val.open > val.close ? val.close : val.open;
									val.bartop = val.open > val.close ? val.open : val.close;
									val.date = new Date(val.date);
					});

					var candle_model = new model(data);

					var close_model1 = new gmodel(data, function (d) {
									return d.close * 1;
					});

					var barFun = bar.decorator(close_model1, {
									fillColor: function fillColor(d) {
													return d.open < d.close ? "#ed5a51" : "#89bc61";
									},

									className: "bar3",
									barHeightParam: ['barbottom', 'bartop'],
									barYParam: 'bartop'
					});

					var barFun2 = bar.decorator(close_model1, {
									fillColor: "#000",
									className: "bar4",
									barHeightParam: ['low', 'high'],
									barYParam: 'high',
									barWidth: function barWidth(x) {
													return 1;
									}
					});

					return {
									model: candle_model,
									plotFuns: [barFun2, barFun],
									updateFuns: [barFun2, barFun],
									target: '.chart2',
									enableEvents: true,
									makeYScale: [makeYScale, makeYVolumnScale],
									// yScale : candle.makeYScale,
									cursorMessage: function cursorMessage(message) {
													console.log(message);
									}
					};
	}

	module.exports = genChartOptions;

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";

	function stackYScale(options, height, model) {
		var extent = model.yExtentRange(-1 * options.onScreenDataNum, 0);
		var stackExtent = [-1 * extent[1], extent[1]];
		var yScale = d3.scale.linear().domain(stackExtent).nice().range([height, 0]);
		return yScale;
	}

	// dlr_net 自營商買賣超
	// ith_net 投信買賣超
	// frn_net: 外資買賣超

	module.exports = function (rawdata) {
		console.log(rawdata);
		var data = rawdata[0].rawContent;
		// 1. process data
		// let instii = data.rawContent.slice(-200)
		data.forEach(function (row) {
			row.date = new Date(row.date);
			row.FI = row.frn_net || 0;
			row.IT = row.ith_net / 1000 || 0;
			row.DL = row.dlr_net / 1000 || 0;
			row.y1 = row.FI > 0 ? row.FI : 0;
			row.y2 = row.IT > 0 ? row.y1 + row.IT : row.y1;
			row.y3 = row.DL > 0 ? row.y2 + row.DL : row.y2;
			row.zero = 0;
			row.my1 = row.FI < 0 ? row.FI : 0;
			row.my2 = row.IT < 0 ? row.my1 + row.IT : row.my1;
			row.my3 = row.DL < 0 ? row.my2 + row.DL : row.my2;
		});

		// console.log(instii)
		// 2. gen model
		var insti_model4 = new gmodel(data, function (d) {
			return Math.max(d.y3, -1 * d.my3);
		});

		// 3. gen chart options
		var instiBar = [bar.decorator(insti_model4, {
			fillColor: "#E5C362",
			className: "bar1",
			barHeightParam: ['y1'],
			barYParam: 'y1',
			offset: function offset(d) {
				return -0.1 * d;
			}
		}), bar.decorator(insti_model4, {
			fillColor: "#EE8379",
			className: "bar2",
			barHeightParam: ['y1', 'y2'],
			barYParam: 'y2',
			offset: function offset(d) {
				return -0.1 * d;
			}
		}), bar.decorator(insti_model4, {
			fillColor: "#64A0DD",
			className: "bar3",
			barHeightParam: ['y2', 'y3'],
			barYParam: 'y3',
			offset: function offset(d) {
				return -0.1 * d;
			}
		}), bar.decorator(insti_model4, {
			fillColor: "#E5C362",
			className: "bar4",
			barHeightParam: ['my1', 'zero'],
			barYParam: ['zero'],
			offset: function offset(d) {
				return -0.1 * d;
			}
		}), bar.decorator(insti_model4, {
			fillColor: "#EE8379",
			className: "bar5",
			barHeightParam: ['my2', 'my1'],
			barYParam: ['my1'],
			offset: function offset(d) {
				return -0.1 * d;
			}
		}), bar.decorator(insti_model4, {
			fillColor: "#64A0DD",
			className: "bar6",
			barHeightParam: ['my3', 'my2'],
			barYParam: ['my2'],
			offset: function offset(d) {
				return -0.1 * d;
			}
		})];

		return {
			//data : data,
			model: insti_model4,
			target: '.chart2',
			plotFuns: instiBar,
			updateFuns: instiBar,
			enableEvents: false,
			// xArrangement : 'right',
			onScreenDataNum: data.length,
			yScale: [stackYScale],
			cursorMessage: function cursorMessage(message) {
				console.log(message.FI, message.DL, message.IT, message);
			}
		};
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	var today = moment().format("YYYYMMDD") + " ";

	function volumeYScale(options, height, model) {
		var extent = d3.extent(model.data.map(function (x) {
			return x.volume;
		}));
		var stackExtent = extent;
		var yScale = d3.scale.linear().domain([0, stackExtent[1]]).nice().range([height, height * 0.7]);
		return yScale;
	}

	function lineYScale(options, height, model) {
		var initPrice = model.data[0].price;
		var extent = d3.extent(model.data.map(function (x) {
			return x.price;
		}));

		var lowMargin = extent[0] < initPrice ? initPrice - extent[0] : 0;
		var highMargin = extent[1] > initPrice ? extent[1] - initPrice : 0;
		var margin = Math.max(lowMargin, highMargin);

		var stackExtent = [initPrice - margin * 1.05, initPrice + margin * 1.05];
		var yScale = d3.scale.linear().domain(stackExtent).nice().range([height * 0.65, 0]);
		return yScale;
	}

	var lineyAxis = function lineyAxis(idx, width) {
		var self = this;
		var yScale = this.yScale;
		var initPrice = this.model.data[0].price;
		var extent = d3.extent(this.model.data.map(function (x) {
			return x.price;
		}));
		// var stackExtent = [initPrice * 0.9 , initPrice * 1.1];

		var lowMargin = extent[0] < initPrice ? initPrice - extent[0] : 0;
		var highMargin = extent[1] > initPrice ? extent[1] - initPrice : 0;
		var margin = Math.max(lowMargin, highMargin);
		var stackExtent = [initPrice - margin * 1.05, initPrice + margin * 1.05];

		var inter = d3.interpolate.apply(null, stackExtent);
		var range = _.range(7).map(function (val) {
			return inter(val / 6);
		});
		var formatPercent = d3.format(".1f");

		return d3.svg.axis().scale(yScale[idx]).tickValues(range).orient('right').tickSize(-1 * width, 0).tickFormat(formatPercent);
	};

	var timexScale = function timexScale(model, rangeBands) {
		// console.log(rangeBands)
		return d3.time.scale().domain([moment(today + "090000", "YYYYMMDD HHmmss").toDate(), moment(today + "133000", "YYYYMMDD HHmmss").toDate()]).rangeRound([5, rangeBands[1]]);
	};

	var timexAxis = function timexAxis(height) {
		var self = this;
		var xScale = this.xScale;
		return d3.svg.axis().scale(xScale).orient('bottom').tickSize(-1 * height, 0).ticks(d3.time.minutes, 60000);
	};

	module.exports = function (rawdata) {
		var data = rawdata[0].rawContent;
		// 1. process data
		// let instii = data.rawContent.slice(-200)
		data = data.filter(function (x) {
			return x.time > "090000.000.000";
		});
		data.forEach(function (row) {
			var tmp = row.time.split(".")[0];
			row.date = moment(today + tmp, "YYYYMMDD HHmmss").toDate();
			row.price = Number(row.price);
			row.volume = Number(row.volume);
			row.zero = 0;
			// if(tmp > "132500"){
			// 	row.volume = 0;
			// }
		});

		// 2. gen model
		var line_model = new gmodel(data, function (d) {
			return d.price;
		});
		var bar_model = new gmodel(data, function (d) {
			return d.volume;
		});

		var lineFuns = [lineGen.decorator(line_model, {
			stroke: "#5acdea",
			strokeWidth: 1,
			className: "line3",
			yScaleIdx: 0
		})];

		var barFun = bar.decorator(bar_model, {
			fillColor: "#5acdea",
			className: "bar3",
			barHeightParam: ['volume'],
			barYParam: 'volume',
			yScaleIdx: 1
		});

		return {
			model: line_model,
			target: '.chart2',
			plotFuns: lineFuns.map(function (x) {
				return x.makeLine;
			}).concat([barFun]),
			updateFuns: lineFuns.map(function (x) {
				return x.updateLine;
			}).concat([barFun]),
			enableEvents: false,
			onScreenDataNum: 2639,
			xArrangement: 'span',
			yScale: [lineYScale, volumeYScale],
			xScaleFun: timexScale,
			xAxisFun: timexAxis,
			yAxisFuns: [lineyAxis, null],
			cursorMessage: function cursorMessage(message) {
				console.log(message);
			}
		};
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	function genChartOptions(rawdata) {
		var data = rawdata[0].rawContent;
		data.forEach(function (val, idx) {
			val.high_price = Number(val.high_price);
			val.date = new Date(val.date);
			if (idx > 0) {

				val.changeValue = data[idx].high_price - data[idx - 1].high_price;
				val.changeRate = val.changeValue / data[idx - 1].high_price * 100;
			} else {
				val.changeValue = "";
				val.changeRate = "";
			}
		});

		var close_model1 = new gmodel(data, function (d) {
			return d.high_price * 1;
		});

		var lineFuns = [lineGen.decorator(close_model1, {
			stroke: "#5acdea",
			strokeWidth: 1,
			className: "line3"
		})];

		return {
			model: close_model1,
			plotFuns: lineFuns.map(function (x) {
				return x.makeLine;
			}),
			updateFuns: lineFuns.map(function (x) {
				return x.updateLine;
			}),
			target: '.chart2',
			enableEvents: false,
			onScreenDataNum: data.length,
			// yScale : [lineYScale],
			cursorMessage: function cursorMessage(message) {
				console.log(message);
			}
		};
	}
	module.exports = genChartOptions;

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";

	function stackYScale(options, height, model) {
		var extent = model.yExtentRange(-1 * options.onScreenDataNum, 0);
		var stackExtent = [0, extent[1]];
		var yScale = d3.scale.linear().domain(stackExtent).nice().range([height, 0]);
		return yScale;
	}

	module.exports = function (rawdata) {

		var data = rawdata[0].rawContent;
		data = data.reverse();
		// 1. process data
		// let instii = data.rawContent.slice(-200)
		var ranges = [[0, 1, 2, 3, 4], [5, 6, 7], [8, 9, 10], [11, 12, 13], [14]];
		ranges = ranges.reverse();
		data.forEach(function (row) {
			row.date = new moment(row.ym, "YYYYMM").toDate();
			row.hold_info = row.hold_info.filter(function (val) {
				return val.hold_rate < 100;
			});
			var accu = 0;
			for (var i = 0; i < ranges.length; i++) {
				var accuRate = ranges[i].reduce(function (prev, val) {
					return prev + row.hold_info[val].hold_rate;
				}, 0);
				row["y" + i] = accu + accuRate;
				row["val" + i] = accuRate;
				accu = row["y" + i];
			};
			row.zero = 0;
		});

		// console.log(instii)
		// 2. gen model
		var insti_model4 = new gmodel(data, function (d) {
			return 100;
		});

		var colors = ['#93f3f9', '#baffc0', '#fff8b9', '#ffe3ea', '#ffb5c6'];
		var colorfun = function colorfun(idx) {
			return colors[idx % colors.length];
		};

		var bars = [0, 1, 2, 3].map(function (idx) {
			return bar.decorator(insti_model4, {
				fillColor: colorfun(idx),
				className: "bar" + (idx + 1),
				barHeightParam: ['y' + idx, 'y' + (idx + 1)],
				barYParam: 'y' + (idx + 1),
				offset: function offset(d) {
					return -0.3 * d;
				},
				barWidth: function barWidth(d) {
					return d * 0.6;
				}
			});
		});

		// 3. gen chart options
		var instiBar = [bar.decorator(insti_model4, {
			fillColor: "#d8f7ff",
			className: "bar0",
			barHeightParam: ['y0'],
			barYParam: 'y0',
			offset: function offset(d) {
				return -0.3 * d;
			},
			barWidth: function barWidth(d) {
				return d * 0.6;
			}
		})].concat(bars);

		return {
			//data : data,
			model: insti_model4,
			target: '.chart2',
			plotFuns: instiBar,
			updateFuns: instiBar,
			enableEvents: false,
			xArrangement: 'span',
			onScreenDataNum: data.length,
			xAxisFormat: '%Y%m',
			yScale: [stackYScale],
			cursorMessage: function cursorMessage(message) {
				console.log(message);
			}
		};
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	function makeYScale(options, height, model) {
	    if (options.x1 >= 0 && options.x2) {
	        var extent = model.yER(options.x1, options.x2);
	    } else {
	        var extent = model.yER(-1 * options.onScreenDataNum, 0);
	    }
	    var yScale = d3.scale.linear().domain(extent).nice().range([height * 0.68, 0]);
	    return yScale;
	}

	function makeYVolumnScale(options, height, model) {
	    if (options.x1 >= 0 && options.x2) {
	        // var extent = model.yER(options.x1, options.x2);
	        var extent = model.yVER(options.x1, options.x2);
	    } else {
	        var extent = model.yVER(-1 * options.onScreenDataNum, 0);
	    }

	    var yScale = d3.scale.linear().domain(extent).nice().range([height, height * 0.75]);
	    return yScale;
	}

	var volumeyAxis = function volumeyAxis(idx, width) {
	    var self = this;
	    var yScale = this.yScale;
	    var formatString = d3.format("s");

	    return d3.svg.axis().scale(yScale[idx]).orient('right').tickSize(-1 * width, 0).ticks(4).tickFormat(formatString);
	};

	var default_xAxis = function default_xAxis(height) {
	    var self = this;
	    var xScale = this.xScale;
	    var dataNum = this.onScreenData.length;
	    var unit = Math.ceil(dataNum / 3);
	    var dates = [];
	    for (var i = self.model.xDomain.length - parseInt(unit / 2); i > 0; i -= unit) {
	        dates.unshift(self.model.data[i].date);
	    }

	    if (this.xAxis) {
	        this.xAxis.tickValues(dates);
	        return this.xAxis;
	    } else {
	        return d3.svg.axis().scale(xScale).orient('bottom').tickSize(-1 * height, -1 * height * 0.68).tickValues(dates).tickFormat(d3.time.format(self.options.xAxisFormat));
	    }
	};

	function calcMa(period) {
	    var nums = [];
	    var result = [];
	    var calc = function calc(num, xVal) {
	        nums.push(num);
	        if (nums.length > period) {
	            nums.splice(0, 1); // remove the first element of the array
	        }
	        var n = period;
	        if (nums.length < period) {
	            return null;
	        } else {
	            var total = 0;
	            for (var i = 0; i < period; i++) {
	                total += nums[i];
	            }
	            result.push({ date: new Date(xVal), value: total / n });
	            return total / n;
	        }
	    };
	    var clean = function clean() {
	        nums = [];
	        result = [];
	    };
	    var getResult = function getResult() {
	        return result;
	    };
	    return { calc: calc, clean: clean, getResult: getResult };
	}

	var nMas = [5, 10, 20, 60];

	module.exports = function (data) {
	    // var data = rawdata[0].rawContent.day;

	    var maDateExtreme = {};
	    var maVals = {};
	    var maFuns = nMas.map(function (val) {
	        return calcMa(val);
	    });
	    var nMasName = nMas.map(function (val) {
	        return 'ma' + val;
	    });
	    for (var idx = 0, len = data.length; idx < len - 1; idx++) {
	        var val = data[idx];
	        var maVal = [];
	        for (var i = 0; i < maFuns.length; i++) {
	            var ma = maFuns[i].calc(Number(val.close), data[idx + 1].date);
	            data[idx + 1]['ma' + nMas[i]] = Math.round(ma * 100) / 100;
	            maVal.push(Math.round(ma * 100) / 100);
	        }
	        var maExtent = d3.extent(maVal.filter(_.identity));
	        maDateExtreme[data[idx + 1].date] = { max: maExtent[1], min: maExtent[0] };
	        maVals[data[idx + 1].date] = _.fromPairs(nMasName, maVal);
	    }
	    var maData = maFuns.map(function (maFun) {
	        return maFun.getResult();
	    });

	    var line_models = maData.map(function (ma) {
	        return new gmodel(ma, function (d) {
	            return d.value;
	        });
	    });

	    var maColors = ['#E5C362', '#EE8379', '#64A0DD', '#49B8BB', '#8CC229'];

	    data.forEach(function (val) {
	        var extreme;
	        val.open = Number(val.open);
	        val.high = Number(val.high);
	        val.low = Number(val.low);
	        val.close = Number(val.close);

	        var extreme = maDateExtreme[val.date] ? maDateExtreme[val.date] : { max: Number.MIN_VALUE, min: Number.MAX_VALUE };
	        val.max = Math.max(extreme.max, val.high);
	        val.min = Math.min(extreme.min, val.low);

	        val.maVals = maVals[val.date];

	        val.date = new Date(val.date);
	        val.rectBase = Math.max(val.open, val.close);
	    });
	    if (data.length > 0 && data[0].open === 0) {
	        data[0].min = 0.1;
	    }
	    var candle_model = new model(data);

	    var lineFuns = nMas.map(function (nMa, idx) {
	        return lineGen.decorator(new gmodel(data.slice(1), function (d) {
	            return d["ma" + nMa];
	        }), {
	            stroke: maColors[idx],
	            strokeWidth: 1,
	            className: "line" + idx,
	            yScaleIdx: 0,
	            useChartModel: true
	        });
	    });

	    var volumeBar = bar.decorator(candle_model, {
	        fillColor: function fillColor(d) {
	            return Number(d.open) < Number(d.close) ? "#ed5a51" : "#89bc61";
	        },
	        className: "candleVolume",
	        barHeightParam: ['volume'],
	        barYParam: 'volume',
	        yScaleIdx: 1,
	        offset: function offset(d) {
	            return -0.1 * d;
	        },
	        barWidth: function barWidth(d) {
	            return d * 0.8;
	        }
	    });

	    var priceStem = stem.decorator(candle_model, {
	        className: "candleStem",
	        y1Param: "high",
	        y2Param: "low",
	        offset: function offset(d) {
	            return -d / 2;
	        }
	    });

	    var rectBar = bar.decorator(candle_model, {
	        fillColor: function fillColor(d) {
	            return Number(d.open) < Number(d.close) ? "#ed5a51" : "#89bc61";
	        },
	        className: "candleRect",
	        barHeightParam: ['open', 'close'],
	        barYParam: 'rectBase',
	        yScaleIdx: 0,
	        offset: function offset(d) {
	            return -0.1 * d;
	        },
	        barWidth: function barWidth(d) {
	            return d * 0.8;
	        }
	    });

	    var testarea = area.decorator(candle_model, {
	        fillColor: "black",
	        className: "area3",
	        barHeightParam: ['close'],
	        barYParam: 'open',
	        "fillOpacity": 0.8
	    });

	    return {
	        height: 700,
	        model: candle_model,
	        target: '.chart2',
	        plotFuns: [priceStem, rectBar, volumeBar].concat(lineFuns).map(function (x) {
	            return x.make;
	        }),
	        updateFuns: [priceStem, rectBar, volumeBar].concat(lineFuns).map(function (x) {
	            return x.update;
	        }),
	        enableEvents: false,
	        onScreenDataNum: data.length > 66 ? 66 : data.length,
	        yScale: [makeYScale, makeYVolumnScale],
	        // xScaleFun : timexScale,
	        yAxisFormat : 's',
	        xAxisFun: [default_xAxis, default_xAxis],
	        xAxisOffset: [function (height) {
	            return height * 0.68;
	        }, function (height) {
	            return height;
	        }],
	        yAxisFuns: [null, volumeyAxis],
	        cursorMessage: function cursorMessage(message) {
	            // testarea.remove()
	            // console.log(message);

	        }
	    };
	};

/***/ }
/******/ ]);