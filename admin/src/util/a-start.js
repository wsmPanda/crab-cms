/**
 * 通用 A* 寻径算法
 * 待完善
 * -可以注入的流程
 * 查询当前的扩展点
 * 扩展点可用性判断
 * 路径成本G的计算
 * 估算值计算
 * 路径权重计算
 * 
 * 
 */

// 二叉堆对象 
class DataHeap {
  constructor (compare) {
    this.data = []
    this.top = []
    if (compare) {
      this.compare = compare
    } else {
      this.compare = function (i, j) {
        return this.data[i] > this.data[j]
      }
    }
  }
  push (i) {
    this.data.push(i)
    this.downChange(this.data.length - 1)
  }
  pop () {
    this.downChange(0)
    return this.data.pop()
  }
  // 向上调整,新增元素或数字变大时可用
  upChange (i) {
    var index = i
    var parent = ((index + 1) << 1) - 1
    while (index > 0 && this.compare(index, parent)) {
      this.swap(index, parent)
      index = parent
      parent = ((index + 1) << 1) - 1
    }
  }
  // 向下调整，弹出首位或数字变小时可用
  downChange (i) {
    var index = i
    var child = (index + 1) >> 1
    while (index < this.data.length - 1) {
      if (this.compare(child - 1, child)) {
        child = child - 1
      }
      this.data[index] = this.data[child]
      index = child
      child = (index + 1) >> 1
    }
  }
  swap (i, j) {
    let temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }
}

class PathFinder {
  constructor () {
    var closeList = []
    var openList = new DataHeap(function (i, j) {
      return weight(i) > weight(j)
    })
    openList.push(0)
    while (openList.data.length) {
      // 取出openList中f最大的点进行扩展
      let index = heap.pop()
      extend(index)
      // 将扩展节点加入closeList
      closeList.push(index)
    }
  }
  work (point) {}
  // 扩展当前点
  extend (i) {
    var data = point[i]
    var points = extendPoints(i)
    for (let item of points) {
      if (pointIndex(item) >= 0) {} else {
        point.push(item)
      }
    }
  }

  // 路径成本f计算
  cost (i) {
    return (opint[i].g || 0) + (option[i].h || 0)
  }

  // 路径全职f计算
  weight (i) {
    return (opint[i].g || 0) + (option[i].h || 0)
  }

}
