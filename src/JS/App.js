import Event from "./Event";
import Layout from "./Layout";
import Calendar from "./Calendar";
import Modal from "./Modal";
import data from "./eventsData";

/**
 *
 * App module to initiate entire application layout
 * @class App
 * @extends {Calendar}
 */
class App extends Calendar {
  constructor() {
    // call Calendar class constructor
    super(data);
  }
  /**
   *
   *
   * @memberof App
   */
  init() {
    const root = document.getElementById("root");
    const layout = new Layout(root);

    // create layout
    const layoutElement = layout.createLayout(root);
    // create ruler
    const rulerElement = layout.createRuler(layoutElement);
    // create body content
    const bodyElement = layout.createBody(layoutElement);
    // add events to dom
    this.createCalendar(bodyElement);
    //
    const addEle = document.querySelector(".add");
    const modal = new Modal(this.onSuccess.bind(this));
    addEle.addEventListener("click", function(e) {
      modal.show();
    });

    requestAnimationFrame(() => {
      // scroll to bottom of the page
      // window.scrollTo(0, document.body.scrollHeight);
    });
  }
  /**
   *
   * Handle on new meeting creation event
   * @param {any} meeting
   * @memberof App
   */
  onSuccess(meeting) {
    this.addEvent(meeting);
    // refresh Calendar
    const bodyElement = document.querySelector(".app__body");
    this.createCalendar(bodyElement);
  }
}

export default new App();
