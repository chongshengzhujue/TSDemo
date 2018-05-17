"use strict";
cc._RF.push(module, 'b7fc6AycVVLBoAPYzaaFKbx', 'BasicTableView');
// scripts/viewCtrl/base/BasicTableView.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UserComponent_1 = require("./UserComponent");
var ViewManager_1 = require("../ViewManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BasicTableView = /** @class */ (function (_super) {
    __extends(BasicTableView, _super);
    function BasicTableView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cellPrefab = null;
        _this.cellComponent = "";
        _this.cellNodePool = null;
        _this.scrollView = null;
        _this.scrollPos = cc.p(0, 0);
        _this.inCellMap = null;
        _this.maxCellIdx = 0;
        _this.minCellIdx = 0;
        _this.maxCellNum = 5;
        _this.cellNum = 0;
        return _this;
        // update (dt) {},
    }
    BasicTableView.prototype.onLoad = function () {
        this.scrollView = this.node.getComponent("cc.ScrollView");
        this.scrollView.setContentPosition(cc.p(0, 0));
        this.cellNodePool = new Array();
        this.inCellMap = new Array();
    };
    BasicTableView.prototype.start = function () {
        // this.reloadData([
        //     new BasicTableDataClass({id : 1, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 2, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 3, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 4, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 5, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 6, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 7, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 8, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 9, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 9, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 10, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 11, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 12, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 13, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 14, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 15, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 16, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 17, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 18, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 19, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 20, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 21, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 22, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 23, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 24, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 25, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 26, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 27, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 28, cellSize : cc.size(200, 200)}),
        //     new BasicTableDataClass({id : 29, cellSize : cc.size(200, 200)}),
        // ]);
    };
    BasicTableView.prototype.reloadData = function (dataList, isResetPos) {
        this.dataList = dataList;
        for (var i in this.inCellMap) {
            var idx = parseInt(i);
            this._putTableCellByIdx(idx);
        }
        this._resetScrollContentSize();
        this._resetTableView(isResetPos);
    };
    BasicTableView.prototype.cellIsInScroll = function (cellRect) {
        var originPos = cellRect.origin;
    };
    BasicTableView.prototype.setContentOffset = function (offset) {
        var scrollSize = this.scrollView.content.getContentSize();
        if (this.scrollView.horizontal) {
            this.scrollView.scrollToPercentHorizontal(offset.x / scrollSize.height, 0);
        }
        else if (this.scrollView.vertical) {
            this.scrollView.scrollToPercentHorizontal(offset.y / scrollSize.width, 0);
        }
        this.reloadData(this.dataList, false);
    };
    BasicTableView.prototype.tableCellAtIndex = function (idx) {
    };
    BasicTableView.prototype.onScrollEvent = function (scrollview, event) {
        if (event === cc.ScrollView.EventType.SCROLLING) {
            this._onScrollMove(scrollview);
        }
    };
    BasicTableView.prototype._onScrollMove = function (scrollview) {
        var contentOff = scrollview.getContentPosition();
        var contentSize = scrollview.node.getContentSize();
        this._updateTableView();
    };
    BasicTableView.prototype._getTableCell = function () {
        var cell = null;
        if (this.cellNodePool.length > 0) {
            cell = this.cellNodePool[this.cellNodePool.length - 1];
            this.cellNodePool.splice(this.cellNodePool.length - 1);
            cell.rootView.active = true;
        }
        else if (this.cellNum < this.maxCellNum) {
            cell = ViewManager_1.default.getInstance().showPrefab(this.cellPrefab.name, this.cellPrefab, {}, this.scrollView.content, this.viewCtrl);
            this.cellNum++;
            cc.log("========================new cell");
        }
        return cell;
    };
    BasicTableView.prototype._resetTableView = function (isResetPos) {
        var viewSize = this.scrollView.node.getContentSize();
        var isBegin = false;
        if (this.scrollView.horizontal) {
            var contenWidth = 0;
            if (isResetPos) {
                this.scrollView.setContentPosition(cc.p(viewSize.width * 0.5, 0));
            }
            var contentPosX = (this.scrollView.getContentPosition()).x;
            for (var i = 0; i < this.dataList.length; i++) {
                if (contenWidth > contentPosX + viewSize.width) {
                    if (isBegin) {
                        this.maxCellIdx = i - 1;
                    }
                    break;
                }
                var data = this.dataList[i];
                contenWidth += data.cellSize.width;
                this._resetMaxCellNum(false, viewSize, data.cellSize);
                if (contenWidth > contentPosX) {
                    this._setCellData(i);
                    if (!isBegin) {
                        this.minCellIdx = i;
                        isBegin = true;
                    }
                }
            }
        }
        else if (this.scrollView.vertical) {
            var contenHeight = 0;
            if (isResetPos) {
                this.scrollView.setContentPosition(cc.p(0, viewSize.height * 0.5));
            }
            var contentPosY = this.scrollView.getContentPosition().y;
            for (var i = 0; i < this.dataList.length; i++) {
                if (contenHeight > contentPosY + viewSize.height) {
                    if (isBegin) {
                        this.maxCellIdx = i - 1;
                    }
                    break;
                }
                var data = this.dataList[i];
                contenHeight += data.cellSize.height;
                this._resetMaxCellNum(true, viewSize, data.cellSize);
                if (contenHeight > contentPosY) {
                    this._setCellData(i);
                    if (!isBegin) {
                        this.minCellIdx = i;
                        isBegin = true;
                    }
                }
            }
        }
    };
    BasicTableView.prototype._updateTableView = function () {
        var viewSize = this.scrollView.node.getContentSize();
        var beginCell = this.inCellMap[this.minCellIdx];
        var endCell = this.inCellMap[this.maxCellIdx];
        if (!beginCell || !endCell) {
            return;
        }
        var beginCellBox = beginCell.rootView.getBoundingBox();
        var beginCellSize = beginCellBox.size;
        var beginCellOrigin = beginCellBox.origin;
        var endCellBox = endCell.rootView.getBoundingBox();
        var endCellSize = endCellBox.size;
        var endCellOrigin = endCellBox.origin;
        var isChangeLayout = false;
        if (this.scrollView.horizontal) {
            var contentPosX = -(this.scrollView.getContentPosition().x);
            if (beginCellOrigin.x + beginCellSize.width < contentPosX - 100) {
                this._putTableCellByIdx(this.minCellIdx);
                this.minCellIdx++;
                cc.log("=======================================put cell left" + this.minCellIdx);
            }
            else if (endCellOrigin.x > contentPosX + viewSize.width + 100) {
                this._putTableCellByIdx(this.maxCellIdx);
                this.maxCellIdx--;
                cc.log("=======================================put cell right" + this.maxCellIdx);
                //emptyCellSize.height += beginCellSize.height;
            }
            else if (endCellOrigin.x + endCellSize.width < contentPosX + viewSize.width + 100) {
                this.maxCellIdx++;
                if (this.maxCellIdx < this.dataList.length) {
                    var cell = this._setCellData(this.maxCellIdx);
                    cc.log("=======================================new cell right" + this.maxCellIdx);
                    this._resetMaxCellNum(true, viewSize, endCellSize);
                }
                else {
                    this.maxCellIdx = this.dataList.length - 1;
                }
            }
            else if (contentPosX < beginCellOrigin.x + 100) {
                this.minCellIdx--;
                if (this.minCellIdx >= 0) {
                    var cell = this._setCellData(this.minCellIdx);
                    cc.log("=======================================new cell left" + this.minCellIdx);
                }
                else {
                    this.minCellIdx = 0;
                }
            }
        }
        else if (this.scrollView.vertical) {
            var contentPosY = -(this.scrollView.getContentPosition().y);
            if (beginCellOrigin.y > contentPosY + 100) {
                this._putTableCellByIdx(this.minCellIdx);
                this.minCellIdx++;
                cc.log("=======================================put cell up" + this.minCellIdx);
            }
            else if (endCellOrigin.y + endCellSize.height < contentPosY - viewSize.height - 100) {
                this._putTableCellByIdx(this.maxCellIdx);
                this.maxCellIdx--;
                cc.log("=======================================put cell down" + this.maxCellIdx);
                //emptyCellSize.height += beginCellSize.height;
            }
            else if (endCellOrigin.y > contentPosY - viewSize.height - 100) {
                this.maxCellIdx++;
                if (this.maxCellIdx < this.dataList.length) {
                    var cell = this._setCellData(this.maxCellIdx);
                    cc.log("=======================================new cell down" + this.maxCellIdx);
                    this._resetMaxCellNum(true, viewSize, endCellSize);
                }
                else {
                    this.maxCellIdx = this.dataList.length - 1;
                }
            }
            else if (contentPosY > beginCellOrigin.y + beginCellSize.height - 100) {
                this.minCellIdx--;
                if (this.minCellIdx >= 0) {
                    var cell = this._setCellData(this.minCellIdx);
                    cc.log("=======================================new cell up" + this.minCellIdx);
                }
                else {
                    this.minCellIdx = 0;
                }
            }
        }
    };
    BasicTableView.prototype._putTableCellByIdx = function (idx) {
        var cell = this.inCellMap[idx];
        this.inCellMap[idx] = undefined;
        if (cell) {
            cell.rootView.active = false;
            cell.parentNode = undefined;
            cell.parentViewCtrl = undefined;
            this.cellNodePool.splice(this.cellNodePool.length - 1, 0, cell);
            //cc.log("=======================================put cell" + this.cellNodePool.size());
        }
    };
    BasicTableView.prototype._setCellData = function (idx) {
        var cell = this._getTableCell();
        if (!cell) {
            return;
        }
        this.inCellMap[idx] = cell;
        if (cell.rootView.parent == undefined) {
            this.scrollView.content.addChild(cell.rootView, idx);
            cell.parentNode = this.scrollView.content;
        }
        if (cell.parentViewCtrl == undefined) {
            cell.parentViewCtrl = this.viewCtrl;
        }
        var pos = this._getCellPosByIndex(idx);
        cell.rootView.setPosition(pos);
        var cellComponent = cell.rootView.getComponent(this.cellComponent);
        if (cellComponent) {
            var data = this.dataList[idx];
            cellComponent.setData(data);
        }
    };
    BasicTableView.prototype._resetMaxCellNum = function (isVertical, scrollSize, cellSize) {
        var tempValue = 0;
        if (isVertical) {
            tempValue = Math.ceil(scrollSize.height / cellSize.height) + 3;
        }
        else {
            tempValue = Math.ceil(scrollSize.width / cellSize.width) + 3;
        }
        this.maxCellNum = Math.max(tempValue, this.maxCellNum);
    };
    BasicTableView.prototype._sortInCellMap = function () {
        for (var i in this.inCellMap) {
            var cell = this.inCellMap[i];
            if (cell) {
                cell.rootView.removeFromParent(false);
                this.scrollView.content.addChild(cell.rootView, parseInt(i));
            }
        }
    };
    BasicTableView.prototype._resetScrollContentSize = function () {
        var contentSize = this.scrollView.node.getContentSize();
        if (this.scrollView.horizontal) {
            contentSize.width = 0;
        }
        else {
            contentSize.height = 0;
        }
        for (var i = 0; i < this.dataList.length; i++) {
            var data = this.dataList[i];
            if (this.scrollView.horizontal) {
                contentSize.width += data.cellSize.width;
            }
            else {
                contentSize.height += data.cellSize.height;
            }
        }
        this.scrollView.content.setContentSize(contentSize);
    };
    BasicTableView.prototype._getCellPosByIndex = function (index) {
        var lastIndex = index - 1;
        var nextIndex = index + 1;
        var lastCell;
        var nextCell;
        if (lastIndex < 0 || this.inCellMap[lastIndex] == undefined) {
            nextCell = this.inCellMap[nextIndex];
            if (nextCell === undefined) {
                return cc.p(0, 0);
            }
            var pos = nextCell.rootView.getPosition();
            var nowCellData = this.dataList[index];
            if (nowCellData === undefined) {
                return pos;
            }
            if (this.scrollView.horizontal) {
                var resPos = cc.p(pos.x - nowCellData.cellSize.width, pos.y);
                return resPos;
            }
            else {
                var resPos = cc.p(pos.x, pos.y + nowCellData.cellSize.height);
                return resPos;
            }
        }
        else {
            lastCell = this.inCellMap[lastIndex];
            var pos = lastCell.rootView.getPosition();
            var lastCellData = this.dataList[lastIndex];
            if (lastCellData === undefined) {
                return pos;
            }
            if (this.scrollView.horizontal) {
                var resPos = cc.p(pos.x + lastCellData.cellSize.width, pos.y);
                return resPos;
            }
            else {
                var resPos = cc.p(pos.x, pos.y - lastCellData.cellSize.height);
                return resPos;
            }
        }
        return cc.p(0, 0);
    };
    __decorate([
        property(cc.Prefab)
    ], BasicTableView.prototype, "cellPrefab", void 0);
    __decorate([
        property
    ], BasicTableView.prototype, "cellComponent", void 0);
    BasicTableView = __decorate([
        ccclass
    ], BasicTableView);
    return BasicTableView;
}(UserComponent_1.default));
exports.default = BasicTableView;

cc._RF.pop();