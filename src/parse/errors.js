import FastObject from "../fast-object.js"

import { getLineInfo } from "../vendor/acorn/src/locutil.js"

function createClass(Super) {
  return class AcornError extends Super {
    constructor(parser, pos, message) {
      super(message)
      const { column, line } = getLineInfo(parser.input, pos)
      this.message = message + " (" + line + ":" + column + ")"
    }
  }
}

const errors = new FastObject
const supers = [SyntaxError, TypeError]

supers.forEach((Super) => errors[Super.name] = createClass(Super))

export default errors