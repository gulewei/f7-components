/**
 * Scroll Behaiver
 * @typedef {Object} ScrollerState
 * @prop {boolean} isTouched
 * @prop {boolean} isMoved
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
   * @param {number} currentTranslate
   */
  initializeState (currentTranslate) {
    if (this.__initialized) {
      return
    }

    const n = Date.now()

    /**
     *  @type {ScrollerState}
     */
    this.state = {
      isTouched: false,
      /**
       * move end
       */
      isMoved: false,
      startY: 0,
      startTime: n,
      startTranslate: 0,
      currentY: 0,
      currentTime: n,
      currentTranslate,
      velocityTranslate: 0
    }

    this.__initialized = true
  }

  /**
   * @param {number} maxTranslate Translate value when scroll content on the top
   * @param {number} minTranslate Translate value when content on the bottom
   */
  setSize (maxTranslate, minTranslate) {
    this.size = { maxTranslate, minTranslate }
  }

  /**
   * @param {number} finalTranslate
   */
  updateTranslate (finalTranslate) {
    if (this.state.isTouched || this.state.isMoved) {
      throw new Error('Do not update translate until touch end !')
    }

    this._setState({
      currentTranslate: finalTranslate
    })
  }

  /**
   * publish translate to render
   * @param {(translate: number, isMove: boolean) => void} callback
   */
  setCallback (callback) {
    this._callback = callback
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

    const isMoved = true
    const currentY = touches[0].pageY
    const newTranslate = this.state.startTranslate + currentY - this.state.startY
    const currentTranslate = this._normalize(newTranslate)

    this._setState({
      isMoved,
      currentY,
      currentTime,
      currentTranslate,
      velocityTranslate: currentTranslate - this.state.currentTranslate
    })

    this._publish(currentTranslate, isMoved)
  }

  /**
   * @param {Touch[]} touches
   * @param {number} endTime
   */
  onTouchEnd (touches, endTime) {
    const isTouched = false
    const isMoved = false

    if (!this.state.isTouched || !this.state.isMoved) {
      this._setState({ isTouched, isMoved })
      return
    }

    const currentTranslate = this._accelerate(endTime)

    this._setState({
      isTouched,
      isMoved,
      currentTranslate
    })

    this._publish(currentTranslate, isMoved)
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

  _publish (translate, isMoved) {
    if (this._callback) {
      this._callback(translate, isMoved)
    }
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

    const newTranslate = endTime - startTime > 300
      ? curr
      : curr + v * momentumRatio

    return newTranslate
  }

  // bindEvents () {
  //   throw new Error('bindEvents should be implemented by subClass')
  // }

  // update () {
  //   throw new Error('update should be implemented by subClass')
  // }

  // render () {
  //   throw new Error('render should be implemented by sub-class')
  // }
}
