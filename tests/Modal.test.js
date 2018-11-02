import Modal from '../src/JS/Modal';

describe('Modal module', () => {
  const cb = () => {};
  let modal;

  beforeEach(() => {
    modal = new Modal(cb);
    document.write(`<header>1Day-Meeting</header>
    <div id="root"></div>
    <div id="modal" class="modal"></div>
    <div class="add">&#43;</div>
    <! Modal template -->
    <template id="modal-template">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h2>Meeting</h2>
              </div>
              <div class="modal-body">
                <form>
                    <section>
                        <h3>Title</h3>
                        <input type="text" id="meeting-title" />
                    </section>
                    <section>
                        <h3>Start Time</h3>
                        <span id="start-time"></span>
                    </section>
                    <section>
                        <h3>End Time</h3>
                        <span id="end-time"></span>
                    </section>
                </form>
              </div>
              <div class="modal-footer">
                <button class="btn close">Cancel</button>
                <button class="btn submit">Create</button>
              </div>
          </div>
      </template>`);
  })

  afterEach(() => {
    document.body.innerHTML = '';
  })
  

    
  it('Check options', () => {
    expect(modal.options.length).toBe(25);
  });

  it('show Modal', () => {
    modal.show();
    expect(
      document.getElementById(modal.modalId).style.display
    ).toBe('block');
  })

  it('Check form ', () => {
    modal.show();
    expect(
      document.forms.length
    ).toBe(1);
  })
  it('Hide Modal', () => {
    modal.hide();
    expect(
      document.getElementById(modal.modalId).style.display
    ).toBe('none');
  })

  it('Fill form ', () => {
    modal.show();

    const [title, startTime, endTime] = document.forms[0].elements;

    title.value = 'Meeting 2',
    startTime.value = '0';
    endTime.value = '60';
    document.querySelector(".btn.submit").click();

    expect(
      document.getElementById(modal.modalId).style.display
    ).toBe('none');
  })

  it('Close Modal', () => {
    modal.show();
    document.querySelectorAll(".close")[1].click();
    expect(
      document.getElementById(modal.modalId).style.display
    ).toBe('none');
  })

  it('Check empty form errors 1', () => {
    modal.show();
    const [title, startTime, endTime] = document.forms[0].elements;
    const myMockFn = jest.fn((text) => text);
    jest.spyOn(window, "alert").mockImplementation(myMockFn);

    title.value = '',
    document.querySelector(".btn.submit").click();
    window.alert.mockRestore();
    expect(
      myMockFn
    ).toBeCalled();
  })

  it('Check empty form errors 2', () => {
    modal.show();
    const [title, startTime, endTime] = document.forms[0].elements;
    const myMockFn = jest.fn((text) => text);
    jest.spyOn(window, "alert").mockImplementation(myMockFn);
    
    title.value = 'meeting';
    startTime.value = '60'; 
    endTime.value = '0';
    
    document.querySelector(".btn.submit").click();
    window.alert.mockRestore();
    expect(
      myMockFn
    ).toBeCalled();
  });

  it('Reopen modal', () => {
    modal.show();
    modal.hide();
    modal.show();
    
    expect(
      document.getElementById(modal.modalId).style.display
    ).toBe('block');
  })
});