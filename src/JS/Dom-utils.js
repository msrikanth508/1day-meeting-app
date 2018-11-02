class DomUtils {
  static assignAttrs(ele, props) {
    Object.keys(props).forEach(key => {
      if (key !== "children") {
        if (typeof props[key] === "object") {
          if (typeof ele[key] !== "object") {
            ele[key] = {};
          }
          this.assignAttrs(ele[key], props[key]);
        } else {
          ele[key] = props[key];
        }
      }
    });
    return ele;
  }

  static createElement(root, element) {
    const { type, props } = element;
    let ele;
    // create element
    if (type === "TEXT ELEMENT") {
      ele = document.createTextNode(props.nodeValue);
    } else {
      ele = document.createElement(type);
    }
    // assing element attributes
    DomUtils.assignAttrs(ele, props);

    (props.children || []).forEach(child => {
      DomUtils.createElement(ele, child);
    });
    // append to root
    root.appendChild(ele);
    return ele;
  }
  static formatAsTwoDigits(number) {
    return number < 10 ? `0${number}` : number;
  }
}

export default DomUtils;
