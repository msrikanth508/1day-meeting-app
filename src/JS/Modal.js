import DomUtils from "./Dom-utils";

/**
 * Modal module
 */
class Modal {
  /**
   *
   * @param {*} cb
   */
  constructor(cb) {
    this.modalId = "modal";
    this.options = this.generateOptions();
    this.onSuccess = cb;
  }
  /**
   *
   * Generate select control options
   * @returns
   * @memberof Modal
   */
  generateOptions() {
    let minutesCounter = 0;

    return Array.from({ length: 13 })
      .fill(null)
      .reduce((acc, item, i, arr) => {
        acc.push(
          {
            label: `${DomUtils.formatAsTwoDigits(9 + i)}:00`,
            value: minutesCounter
          },
          {
            label: `${DomUtils.formatAsTwoDigits(9 + i)}:30`,
            value: minutesCounter + 30
          }
        );

        minutesCounter += 60;

        if (i === arr.length - 1) {
          acc.pop();
        }
        return acc;
      }, []);
  }
  /**
   *
   * create select control dom object config
   * @param {any} root
   * @memberof Modal
   */
  createSelectControl(startTimeControlEle, endTimeControlEle) {
    const options = this.options.map(option => ({
      type: "option",
      props: {
        value: option.value,
        label: option.label
      }
    }));

    DomUtils.createElement(startTimeControlEle, {
      type: "select",
      props: {
        children: options
      }
    });

    DomUtils.createElement(endTimeControlEle, {
      type: "select",
      props: {
        children: options
      }
    });
  }
  /**
   *
   * Get all form elements
   * @returns
   * @memberof Modal
   */
  getFormElements() {
    if(document.forms.length) {
      const [title, startTime, endTime] = document.forms[0].elements;
      return {
        title,
        startTime,
        endTime
      };
    }
    return null;
  }
  /**
   *
   * Handle create btn action
   * @param {any} e
   * @memberof Modal
   */
  onCreate(e) {
    const { title, startTime, endTime } = this.getFormElements();

    const meeting = {
      id: title.value,
      start: parseInt(startTime.value, 10),
      end: parseInt(endTime.value, 10)
    };

    if (!meeting.id.length) {
      alert("Please fill all fields");
    } else if (meeting.start >= meeting.end) {
      alert("End tate should be greater than start time.");
    } else {
      this.onSuccess(meeting);
      this.hide();
    }
  }
  /**
   *
   * Handle modal show action
   * @memberof Modal
   */
  show() {
    const modalContent = document.querySelector(".modal-content");
    const ele = document.getElementById(this.modalId);

    let content;
    if (!modalContent) {
      const template = document.querySelector("#modal-template");
      if (template) {
        // get template
        content = document.importNode(template.content, true);
        const closeEles = content.querySelectorAll(".close");
        const submitBtn = content.querySelector(".btn.submit");
        const startTimeControlEle = content.querySelector("#start-time");
        const endTimeControlEle = content.querySelector("#end-time");

        this.createSelectControl(startTimeControlEle, endTimeControlEle);
        submitBtn.addEventListener("click", this.onCreate.bind(this));

        closeEles.forEach(ele => {
          ele.addEventListener("click", () => {
            this.hide();
          });
        });

        ele.append(content);
      }
    }

    if (ele) {
      ele.style.display = "block";
      // clear all values & set default values
      const formFields = this.getFormElements();
      if(formFields) {
        const { title, startTime, endTime } = formFields;
        title.value = "";
        // set focus
        title.focus();
        startTime.value = "0";
        endTime.value = "0";
      }
    }
  }
  /**
   *
   * Handle modal hide action
   * @memberof Modal
   */
  hide() {
    const ele = document.getElementById(this.modalId);
    if (ele) {
      ele.style.display = "none";
    }
  }
}

export default Modal;
