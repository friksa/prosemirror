import {Pos} from "../../src/model"

export function allPositions(doc, block) {
  let found = [], path = []
  function scan(node) {
    let p = path.slice()
    if (node.type.block) {
      let size = node.size
      for (let i = 0; i <= size; i++) found.push(new Pos(p, i))
    } else if (node.type.contains) {
      for (let i = 0;; i++) {
        if (!block) found.push(new Pos(p, i))
        if (i == node.content.length) break
        path.push(i)
        scan(node.content[i])
        path.pop()
      }
    }
  }
  scan(doc)
  return found
}

export function randomPos(doc, block) {
  let path = []
  function walk(node) {
    if (node.type.block) {
      return new Pos(path, Math.floor(Math.random() * (node.size + 1)))
    } else if (!node.content.length) {
      return null
    } else if (!block && Math.random() < .2) {
      return new Pos(path, Math.floor(Math.random() * (node.content.length + 1)))
    } else {
      let child = Math.floor(Math.random() * node.content.length)
      path.push(child)
      return walk(node.content[child])
    }
  }
  for (let i = 0; i < 5; i++) {
    let found = walk(doc)
    if (found) return found
    path.length = 0
  }
}
