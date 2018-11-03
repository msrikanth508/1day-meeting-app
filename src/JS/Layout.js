import DomUtils from "./Dom-utils";

/**
 * App Layout module
 *
 * @export
 * @class Layout
 */
export default class Layout {
  /**
   * Creates an instance of Layout.
   * @param {any} root
   * @memberof Layout
   */
  constructor(root) {
    this.width = 600;
    this.minuteHeight = 2;
    this.totalMinutes = 720;
    this.height = this.minuteHeight * this.totalMinutes;
    this.root = root;
  }
  /**
   *
   * Create layout
   * @param {any} root
   * @returns
   * @memberof Layout
   */
  createLayout(root) {
    return DomUtils.createElement(root, {
      type: "div",
      props: {
        className: "app__layout",
        style: {
          height: `${this.height}px`,
          width: `${this.width + 100}px`
        }
      }
    });
  }
  /**
   *
   * Create lables
   * @param {any} root
   * @returns
   * @memberof Layout
   */
  createRuler(root) {
    const rulerElement = DomUtils.createElement(root, {
      type: "div",
      props: {
        className: "app__ruler"
      }
    });

    for (let i = 0; i < 12; i++) {
      DomUtils.createElement(rulerElement, {
        type: "div",
        props: {
          innerText: `${DomUtils.formatAsTwoDigits(9 + i)}:00--`,
          className: "app__ruler--label"
        }
      });
    }
    return rulerElement;
  }
  /**
   *
   * Create body
   * @param {any} root
   * @returns
   * @memberof Layout
   */
  createBody(root) {
    return DomUtils.createElement(root, {
      type: "div",
      props: {
        className: "app__body",
        style: {
          width: `${this.width}px`
        }
      }
    });
  }
}
