import Event from "./Event";
import data from "./eventsData";

/**
 * Calendar
 *
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
    
    const results = [];
    const totalEvents = this.events.length;

    // find overlapping events
    for (let i = 0; i < totalEvents; i++) {
      let pEvent = this.events[i];
      let nOverlaps = 0;
      for (let j = 0; j < totalEvents; j++) {
        var nEvent = this.events[j];
        if (
          (nEvent.start < pEvent.end && nEvent.end > pEvent.start) ||
          (nEvent.end < pEvent.start && nEvent.start > pEvent.end)
        ) {
          nOverlaps++;
        }
      }

      results.push({
        ...pEvent,
        eventCount: nOverlaps
      });
    }

    let totalOverlap = 600;
    let prevEventCount;
    return results.reduce((acc, item) => {
      prevEventCount = item.eventCount;
      const width = 600 / item.eventCount;
      let left = 0;
      if (item.eventCount !== 1) {
        left = `${totalOverlap - width}px`;
        totalOverlap -= width;
      }
      acc.push({
        ...item,
        bottom: `${item.start * 2}px`,
        height: `${(item.end - item.start) * 2}px`,
        left,
        width: `${width}px`
      });

      if (totalOverlap === 0) {
        totalOverlap = 600;
      }
      return acc;
    }, []);
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
