import App from '../src/JS/App';
import DomUtils from '../src/JS/Dom-utils';

describe('App module', () => {
  const config = {
    type: 'div',
    props: {
      id: 'root'
    }
  }

  DomUtils.createElement(document.body, config);

  DomUtils.createElement(document.body,  {
    type: 'div',
    props: {
      className: 'add'
    }
  });

  DomUtils.createElement(document.body,  {
    type: 'div',
    props: {
      id: 'modal',
      className: 'modal'
    }
  });
  
  const myMockFn = jest.fn((text) => text);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(myMockFn);
  jest.useFakeTimers();
  App.init();
  jest.runAllTimers();
  window.requestAnimationFrame.mockRestore();

  it('test scroll fn', () => {
    expect(myMockFn).toBeCalled();
  })

  it('open modal', () => {
    const addEle  = document.querySelector('.add');
    addEle.click();
    expect(
      document.getElementById('modal')
    ).toBeDefined();
  })

  it('onSuccess fn', () => {
    App.onSuccess({
      id: 'meeting', 
      start: 0,
      end: 60,
    });
  })
});