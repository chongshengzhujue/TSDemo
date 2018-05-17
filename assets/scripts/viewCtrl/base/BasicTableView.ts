// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
import BasicTableViewCell from "./BasicTableViewCell";

import BasicTableDataClass from "./BasicTableDataClass";
import UserComponent from "./UserComponent";
import BasicViewCtrl from "./BasicViewCtrl";
import ViewManager from "../ViewManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BasicTableView extends UserComponent {

    @property(cc.Prefab)
    cellPrefab: cc.Prefab = null;

    @property
    cellComponent: string = "";

    cellNodePool: BasicViewCtrl[] = null;

    scrollView: cc.ScrollView = null;

    scrollPos: cc.Vec2 = cc.p(0, 0);

    inCellMap: BasicViewCtrl[] = null;

    beginCellIndex: 0;

    dataList: BasicTableDataClass[];

    maxCellIdx: number = 0;
    minCellIdx: number = 0;

    maxCellNum: number = 5;

    cellNum: number = 0;

    viewCtrl: BasicViewCtrl;

    onLoad () {
        this.scrollView = this.node.getComponent("cc.ScrollView");
        this.scrollView.setContentPosition(cc.p(0, 0));

        this.cellNodePool = new Array<BasicViewCtrl>();
        this.inCellMap = new Array<BasicViewCtrl>();
    }

    start () {
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
    }

    reloadData (dataList: BasicTableDataClass[], isResetPos?: boolean) {
        this.dataList = dataList;
        for (let i in this.inCellMap) {
            let idx = parseInt(i);
            this._putTableCellByIdx(idx);
        }
        this._resetScrollContentSize();
        this._resetTableView(isResetPos);
    }

    cellIsInScroll (cellRect: cc.Rect) {
        let originPos = cellRect.origin;
    }

    setContentOffset (offset: cc.Vec2) {
        let scrollSize = this.scrollView.content.getContentSize();
        if (this.scrollView.horizontal) {
            this.scrollView.scrollToPercentHorizontal(offset.x / scrollSize.height, 0);
        } else if(this.scrollView.vertical) {
            this.scrollView.scrollToPercentHorizontal(offset.y / scrollSize.width, 0);
        }

        this.reloadData(this.dataList, false);
    }

    tableCellAtIndex (idx) {

    }

    private onScrollEvent (scrollview, event) {
        if(event === cc.ScrollView.EventType.SCROLLING) {
            this._onScrollMove(scrollview);
        }
    }

   

    private _onScrollMove (scrollview: cc.ScrollView) {
        let contentOff = scrollview.getContentPosition();
        let contentSize = scrollview.node.getContentSize();
        this._updateTableView();
    }

    private _getTableCell (): BasicViewCtrl {
        let cell = null;
        if (this.cellNodePool.length > 0) {
            cell = this.cellNodePool[this.cellNodePool.length - 1];
            this.cellNodePool.splice(this.cellNodePool.length - 1)
            cell.rootView.active = true;
        } else if(this.cellNum < this.maxCellNum) {
            cell = ViewManager.getInstance().showPrefab(this.cellPrefab.name, this.cellPrefab, {}, this.scrollView.content, this.viewCtrl);
            this.cellNum++;
            cc.log("========================new cell")
        }

        return cell;
    }

    private _resetTableView (isResetPos?: boolean) {
        let viewSize = this.scrollView.node.getContentSize();
        let isBegin = false;
        if (this.scrollView.horizontal) {
            let contenWidth = 0;
            if (isResetPos) {
                this.scrollView.setContentPosition(cc.p(viewSize.width*0.5, 0));
            }
            let contentPosX = (<any>(this.scrollView.getContentPosition())).x;
            for (let i = 0; i < this.dataList.length; i++) {
                if (contenWidth > contentPosX + viewSize.width) {
                    if (isBegin) {
                        this.maxCellIdx = i - 1;
                    }
                    break;
                }

                let data: BasicTableDataClass = this.dataList[i];
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
        } else if (this.scrollView.vertical) {
            let contenHeight = 0;
            if (isResetPos) {
                this.scrollView.setContentPosition(cc.p(0, viewSize.height*0.5));
            }

            let contentPosY = this.scrollView.getContentPosition().y;
            for (let i = 0; i < this.dataList.length; i++) {
                if (contenHeight > contentPosY + viewSize.height) {
                    if (isBegin) {
                        this.maxCellIdx = i - 1;
                    }
                    break;
                }

                let data: BasicTableDataClass = this.dataList[i];
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
    }

    private _updateTableView () {
        let viewSize = this.scrollView.node.getContentSize();
        
        let beginCell = this.inCellMap[this.minCellIdx];
        let endCell = this.inCellMap[this.maxCellIdx];
        
        if (!beginCell || !endCell) {
            return;
        }

        let beginCellBox = beginCell.rootView.getBoundingBox();
        let beginCellSize = beginCellBox.size;
        let beginCellOrigin = beginCellBox.origin;

        let endCellBox = endCell.rootView.getBoundingBox();
        let endCellSize = endCellBox.size;
        let endCellOrigin = endCellBox.origin;

        let isChangeLayout: boolean = false;

        if (this.scrollView.horizontal) {
            let contentPosX = -(this.scrollView.getContentPosition().x);
            if (beginCellOrigin.x + beginCellSize.width < contentPosX - 100) {
                this._putTableCellByIdx(this.minCellIdx);
                this.minCellIdx++;
                cc.log("=======================================put cell left" + this.minCellIdx)
            } else if (endCellOrigin.x > contentPosX + viewSize.width + 100) {
                this._putTableCellByIdx(this.maxCellIdx);
                this.maxCellIdx--;
                cc.log("=======================================put cell right" + this.maxCellIdx)                
                //emptyCellSize.height += beginCellSize.height;
            } else if(endCellOrigin.x + endCellSize.width < contentPosX + viewSize.width + 100) {
                this.maxCellIdx++;
                if (this.maxCellIdx < this.dataList.length) {
                    let cell = this._setCellData(this.maxCellIdx);
                    cc.log("=======================================new cell right" + this.maxCellIdx);
                    this._resetMaxCellNum(true, viewSize, endCellSize);
                } else {
                    this.maxCellIdx = this.dataList.length - 1
                }
            } else if(contentPosX < beginCellOrigin.x + 100) {
                this.minCellIdx--;
                if (this.minCellIdx >= 0) {
                    let cell = this._setCellData(this.minCellIdx);
                    cc.log("=======================================new cell left" + this.minCellIdx)
                } else {
                    this.minCellIdx = 0;
                }
            }

        } else if (this.scrollView.vertical) {
            let contentPosY = -(this.scrollView.getContentPosition().y);
            if (beginCellOrigin.y > contentPosY + 100) {
                this._putTableCellByIdx(this.minCellIdx);
                this.minCellIdx++;
                cc.log("=======================================put cell up" + this.minCellIdx)
            } else if (endCellOrigin.y + endCellSize.height < contentPosY - viewSize.height - 100) {
                this._putTableCellByIdx(this.maxCellIdx);
                this.maxCellIdx--;
                cc.log("=======================================put cell down" + this.maxCellIdx)                
                //emptyCellSize.height += beginCellSize.height;
            } else if(endCellOrigin.y > contentPosY - viewSize.height - 100) {
                this.maxCellIdx++;
                if (this.maxCellIdx < this.dataList.length) {
                    let cell = this._setCellData(this.maxCellIdx);
                    cc.log("=======================================new cell down" + this.maxCellIdx);
                    this._resetMaxCellNum(true, viewSize, endCellSize);
                } else {
                    this.maxCellIdx = this.dataList.length - 1
                }
            } else if(contentPosY > beginCellOrigin.y + beginCellSize.height-100) {
                this.minCellIdx--;
                if (this.minCellIdx >= 0) {
                    let cell = this._setCellData(this.minCellIdx);
                    cc.log("=======================================new cell up" + this.minCellIdx)
                } else {
                    this.minCellIdx = 0;
                }
            }
        }
    }

    private _putTableCellByIdx (idx: number) {
        let cell = this.inCellMap[idx];
        this.inCellMap[idx] = undefined;
        if (cell) {
            cell.rootView.active = false;
            cell.parentNode = undefined;
            cell.parentViewCtrl = undefined;
            this.cellNodePool.splice(this.cellNodePool.length - 1, 0, cell);
            //cc.log("=======================================put cell" + this.cellNodePool.size());
        }
        
    }

    private _setCellData (idx: number) {
        let cell = this._getTableCell();
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
        let pos = this._getCellPosByIndex(idx);
        cell.rootView.setPosition(pos);
        let cellComponent = cell.rootView.getComponent(this.cellComponent);
        if (cellComponent) {
            let data = this.dataList[idx];
            cellComponent.setData(data);
        }
    }

    private _resetMaxCellNum(isVertical: boolean, scrollSize: cc.Size, cellSize: cc.Size) {
        let tempValue = 0;
        if (isVertical) {
            tempValue = Math.ceil(scrollSize.height / cellSize.height) + 3;
        } else {
            tempValue = Math.ceil(scrollSize.width / cellSize.width) + 3;
        }

        this.maxCellNum = Math.max(tempValue, this.maxCellNum);
    }

    private _sortInCellMap() {
        for (let i in this.inCellMap) {
            let cell = this.inCellMap[i];

            if (cell) {
                cell.rootView.removeFromParent(false);
                this.scrollView.content.addChild(cell.rootView, parseInt(i));
            }
        }
    }

    private _resetScrollContentSize() {
        let contentSize = this.scrollView.node.getContentSize();
        if (this.scrollView.horizontal) {
            contentSize.width = 0;
        } else {
            contentSize.height = 0;
        }
        for (let i = 0; i < this.dataList.length; i++) {
            let data = this.dataList[i];
            if (this.scrollView.horizontal) {
                contentSize.width += data.cellSize.width;
            } else {
                contentSize.height += data.cellSize.height;
            }
        }

        this.scrollView.content.setContentSize(contentSize);
    }

    private _getCellPosByIndex(index: number) {
        let lastIndex = index - 1;
        let nextIndex = index + 1;
        let lastCell;
        let nextCell;
        if (lastIndex < 0 || this.inCellMap[lastIndex] == undefined) {
            nextCell = this.inCellMap[nextIndex];
            if (nextCell === undefined) {
                return cc.p(0, 0);
            }
            let pos = nextCell.rootView.getPosition();
            let nowCellData = this.dataList[index];
            if (nowCellData === undefined) {
                return pos;
            }
            if (this.scrollView.horizontal) {
                let resPos = cc.p(pos.x - nowCellData.cellSize.width, pos.y);
                return resPos;
            } else {
                let resPos = cc.p(pos.x, pos.y + nowCellData.cellSize.height);
                return resPos;
            }

        } else {
            lastCell = this.inCellMap[lastIndex];
            let pos = lastCell.rootView.getPosition();
            let lastCellData = this.dataList[lastIndex];
            if (lastCellData === undefined) {
                return pos;
            }
            if (this.scrollView.horizontal) {
                let resPos = cc.p(pos.x + lastCellData.cellSize.width, pos.y);
                return resPos;
            } else {
                let resPos = cc.p(pos.x, pos.y - lastCellData.cellSize.height);
                return resPos;
            }
        }

        return cc.p(0, 0);
    }
    // update (dt) {},
}   