import DomUtils from '../src/JS/Dom-utils';

describe('Test Dom Utils module', () => {
  it('format fun-1', () => {
    expect(
      DomUtils.formatAsTwoDigits(9)
    ).toBe('09');
  })

  it('format fun-2', () => {
    expect(
      DomUtils.formatAsTwoDigits(90)
    ).toBe(90);
  })

  it('Create element - 1', () => {
    const root = document.createElement('div');
    const config = {
      type: 'div',
      props: {
        title: 'title',
        className: 'div-tag',
        children:[{
          type: 'span',
          props: {
            children: [{
              type: 'TEXT ELEMENT',
              props: {
                nodeValue: 'value'
              }
            }]
          }
        }]
      }
    }

    DomUtils.createElement(root, config);
    expect(root.querySelector('.div-tag')).toBeDefined();
  })

  it('Create element - 2', () => {
    const root = document.createElement('div');
    const config = {
      type: 'div',
      props: {
        title: 'title',
        className: 'div-tag',
        children:[{
          type: 'span',
          props: {
            className: 'span-tag',
            style: {
              color: '#fff',
            },
            children: [{
              type: 'TEXT ELEMENT',
              props: {
                nodeValue: 'value'
              }
            }]
          }
        }]
      }
    }

    DomUtils.createElement(root, config);
    expect(root.querySelector('.span-tag').style.color).toBe('rgb(255, 255, 255)');
  })
})