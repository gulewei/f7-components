/**
 * Scroll Behaiver
 * @typedef {Object} ScrollerState
 * @prop {boolean} isTouched
 * @prop {number} startY
 * @prop {number} startTranslate
 * @prop {number} startTime
 * @prop {number} currentY
 * @prop {number} currentTranslate
 * @prop {number} currentTime
 * @prop {number} velocityTranslate
 */
export default class BaseScroller {
  /**
   * @param {number} maxTranslate Translate value when scroll content on the top
   * @param {number} minTranslate Translate value when content on the bottom
   */
  initializeSize (maxTranslate, minTranslate) {
    this.size = { maxTranslate, minTranslate }
  }

  /**
   * @param {number} currentTranslate Initial translate value
   */
  initializeState (currentTranslate) {
    const n = Date.now()

    /** @type {ScrollerState} */
    this.state = {
      isTouched: false,
      startY: 0,
      startTime: n,
      startTranslate: 0,
      currentY: 0,
      currentTime: n,
      currentTranslate,
      velocityTranslate: 0
    }
  }

  /**
   * @param {ScrollerState} nextState
   */
  _setState (nextState) {
    const prevState = this.state
    this.state = {
      ...prevState,
      ...nextState
    }
  }

  /**
   * @param {Touch[]} touches
   * @param {number} startTime
   */
  onTouchStart (touches, startTime) {
    this._setState({
      isTouched: true,
      startY: touches[0].pageY,
      startTime,
      startTranslate: this.state.currentTranslate
    })
  }

  /**
   * @param {Touch[]} touches
   * @param {number} currentTime
   */
  onTouchMove (touches, currentTime) {
    if (!this.state.isTouched) {
      return
    }

    const currentY = touches[0].pageY
    const newTranslate = this.state.startTranslate + currentY - this.state.startY
    const currentTranslate = this._normalize(newTranslate)

    this._setState({
      currentY,
      currentTime,
      currentTranslate,
      velocityTranslate: currentTranslate - this.state.currentTranslate
    })
  }

  /**
   * @param {Touch[]} touches
   * @param {number} endTime
   */
  onTouchEnd (touches, endTime) {
    if (!this.state.isTouched) {
      this._setState({ isTouched: false })
      return
    }

    const acc = this._accelerate(endTime)

    this._setState({
      isTouched: false,
      currentTranslate: acc
    })
  }

  getTranslate () {
    return this.state.currentTranslate
  }

  /**
   * @param {number} finalTranslate
   */
  updateTranslate (finalTranslate) {
    if (this.state.isTouched) {
      throw new Error('Do not update translate until touch end !')
    }

    this._setState({
      currentTranslate: finalTranslate
    })
  }

  /**
   * @param {number} translate
   */
  _normalize (translate) {
    const { minTranslate: min, maxTranslate: max } = this.size

    if (translate < min) {
      return min - Math.pow((min - translate), 0.8)
    } else if (translate > max) {
      return max + Math.pow((translate - max), 0.8)
    } else {
      return translate
    }
  }

  /**
   * @param {Date} endTime
   */
  _accelerate (endTime) {
    const momentumRatio = 7
    const {
      startTime,
      currentTranslate: curr,
      velocityTranslate: v
    } = this.state

    let newTranslate
    if (endTime - startTime > 300) {
      newTranslate = curr
    } else {
      newTranslate = curr + v * momentumRatio
    }

    return newTranslate
  }
}
