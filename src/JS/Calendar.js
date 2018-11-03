import Event from "./Event";

/**
 *
 * Calendar
 * @export
 * @class Calendar
 */
export default class Calendar {
  constructor(events) {
    this.events = events;
  }
  /**
   *
   *
   * @returns
   * @memberof Calendar
   */
  getEvents() {
    // sort all events
    this.events.sort((a, b) => a.start - b.start);

    const groups = [];
    let output = [];
    const totalWidth = 600;
    let currentGroup;
    let lastEnd = -1;

    this.events.forEach((event, index) => {
      if (!currentGroup || lastEnd <= event.start) {
        currentGroup = [];
        groups.push(currentGroup);
      }
      currentGroup.push(event);
      lastEnd = Math.max(lastEnd, event.end);
    });

    groups.forEach(group => {
      const width = totalWidth / group.length;
      output = group.reduce((acc, item, index) => {
        acc.push({
          ...item,
          bottom: `${item.start * 2}px`, // 1min = 2px;
          height: `${(item.end - item.start) * 2}px`,
          left: `${width * index}px`,
          width: `${width}px`
        });
        return acc;
      }, output);
    });

    return output;
  }
  /**
   *
   * Add new meeting
   * @param {any} event
   * @memberof Calendar
   */
  addEvent(event) {
    this.events.push(event);
  }
  /**
   * Create calendar
   *
   * @param {any} root
   * @memberof Calendar
   */
  createCalendar(root) {
    const eventSlots = this.getEvents();
    root.innerHTML = "";
    eventSlots.forEach(slot => {
      const event = new Event(
        slot.id,
        slot.start,
        slot.end,
        slot.width,
        slot.height,
        slot.top,
        slot.left,
        slot.bottom
      );
      event.createEventElement(root);
    });
  }
}
