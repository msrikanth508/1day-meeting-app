import DomUtils from "./Dom-utils";

/**
 *
 * Meeting slot module
 * @class Event
 */
class Event {
  /**
   * Meeting properties
   * @param {any} id
   * @param {any} start
   * @param {any} end
   * @param {any} width
   * @param {any} height
   * @param {any} top
   * @param {any} left
   * @param {any} bottom
   * @memberof Event
   */
  constructor(id, start, end, width, height, top, left, bottom) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.bottom = bottom;
  }
  /**
   *
   * Get meeting name
   * @returns
   * @memberof Event
   */
  getDisplayName() {
    return `Meeting - ${this.id}`;
  }
  /**
   *
   * Formate time into HH:mm format
   * @param {any} input
   * @returns
   * @memberof Event
   */
  formatAsHHmm(input) {
    return `${DomUtils.formatAsTwoDigits(
      9 + parseInt(input / 60, 10)
    )}:${DomUtils.formatAsTwoDigits(parseInt(input % 60, 10))}`;
  }
  /**
   *
   * Get start time
   * @returns
   * @memberof Event
   */
  getStartTime() {
    return this.formatAsHHmm(this.start);
  }
  /**
   *
   * Get end time
   * @returns
   * @memberof Event
   */
  getEndTime() {
    return this.formatAsHHmm(this.end);
  }
  /**
   *
   * Create meeting DOM element
   * @param {any} root
   * @memberof Event
   */
  createEventElement(root) {
    const { height, width, top, left, bottom } = this;
    DomUtils.createElement(root, {
      type: "div",
      props: {
        className: "app__body--slot",
        children: [
          {
            type: "span",
            props: {
              className: "app__body--title",
              children: [
                {
                  type: "TEXT ELEMENT",
                  props: {
                    nodeValue: this.getDisplayName()
                  }
                }
              ]
            }
          },
          {
            type: "span",
            props: {
              className: "app__body--value",
              children: [
                {
                  type: "TEXT ELEMENT",
                  props: {
                    nodeValue: `${this.getStartTime()} - ${this.getEndTime()}`
                  }
                }
              ]
            }
          }
        ],
        style: {
          height,
          width,
          top,
          left,
          bottom
        }
      }
    });
  }
}

export default Event;
