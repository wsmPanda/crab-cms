import $ from 'util'
import action from 'action/lib'
export function nodeParser(data, extra, datasetCode) {
  var model = $.copyJson(data)
  model.facets.forEach((facet, index) => {
    facet.model = billParser(facet.model, extra, datasetCode)
  })
  return model
}

export function billParser(data, extra, datasetCode) {
  if (data.hasParse) return data
  var model = {
    ...data,
    main: true,
    slaves: data.slaves || []
  }
  var events = model.events
  var mainCode
  var tableSet = {}
  model.structs && model.structs.forEach((table) => {
    tableSet[table.code] = table
    table.events = []
    if (table.enable_main || (model.structs.length === 1)) {
      if (!datasetCode) {
        let code = data.code
        table.path = `/service/{app}/bill/data/${code}/list`
        table.bill_code = code
      } else {
        let code = datasetCode
        table.path = `/service/{app}/dataset/data/${code}`
        table.bill_code = null
        table.dataset_code = datasetCode
      }
      mainCode = table.code
      $.setProp(model, table)
    } else {
      model.slaves.push(table)
    }
  })
  //对于预处理model的特殊处理
  if (!model.structs) {
    mainCode = model.code
    tableSet[model.code] = model
    model.events = []
    for (let table of model.slaves) {
      tableSet[table.code] = table
      table.events = []
    }
  }
  if (events) {
    for (let e of events) {
      var tempSet = {}
      var paramSet = $.valueParam(e.condition)
      e.params = paramSet
      for (let i in paramSet) {
        let tableCode = mainCode
        if (i.indexOf('.') > -1) {
          let m = i.split('.')
          if (m && m[0]) {
            tableCode = m[0]
          }
        }
        if (!tableSet[tableCode]) {
          tableCode = mainCode
        }
        if (!tempSet[i]) {
          //记录目标子表编码，可用于判断event触发位置
          if (tableCode !== mainCode) {
            e.targetCode = tableCode
          }
          tableSet[tableCode].events.push(e)
          tempSet[i] = true
        }
      }
    }
  }
  model.actions = actionsParser(model.actions)
  model.hasParse = true
  return model
}

export function actionsParser(data = [], ext = []) {
  var actionTypeCount = {}
  var actionSet = {}
  var actionList = []
  //扩展方法ext在后，设值是优先度将会低于，处理时需注意，亦可0根据情况调换位置
  var actions = [...$.copy(data), ...$.copy(ext)]
  actions.forEach((action) => {
    //转化action表示法，从action_type到actionType以便于统一处理
    action.type = $.toCamelCase(action.type, '_')
    if (action.code) {
      actionSet[action.code] = action
      if (!action.type) {
        action.type = action.code
      }
    }
  })
  actions.forEach((action) => {
    if (!action.code) {
      //清理前后空格，防止误输入
      if (action.type) {
        action.type = $.trim(action.type)
        action.type = $.toCamelCase(action.type, "_")
      }
      if (!actionTypeCount[action.type]) {
        actionTypeCount[action.type] = 0
        if (!actionSet[action.type]) {
          action.code = action.type
        } else {
          action.code = `${action.type}_${actionTypeCount[action.type]}`
        }
      } else {
        action.code = `${action.type}_${actionTypeCount[action.type]}`
      }
      actionTypeCount[action.type]++
    } else {
      action.code = $.trim(action.code)
    }
    actionSet[action.code] = $.setObj(actionSet[action.code] || {}, action)
  })
  for (let i in actionSet) {
    let item = actionSet[i]
    actionList.push(action[item.type] ? $.setObj(item, action[item.type].proto || {}) : item)
  }
  return actionList
}

export function nodeParamParser(node) {
  let param = {}
  if (node && node.param && node.param.split) {
    let arr = node.param.split(';')
    arr.forEach((item) => {
      let itemArr = item.split('=')
      if (itemArr.length >= 2) {
        param[itemArr[0]] = itemArr[1]
      }
    })
  }
  return param
}
