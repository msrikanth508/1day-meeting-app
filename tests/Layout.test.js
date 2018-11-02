import Layout from '../src/JS/Layout';

describe('Layout module', () => {
  const root = document.createDocumentFragment('div');
  const layout  = new Layout();

  it('CreateLayout fn', () => {
    layout.createLayout(root);
    expect(
      root.querySelector('app__layout')
    ).toBeDefined()
  })

  it('Check layout width', () => {
    expect(
      layout.width
    ).toBe(600)
  })

  it('createRuler fn', () => {
    layout.createRuler(root);
    expect(
      root.querySelector('app__ruler')
    ).toBeDefined()
  })


  it('createBody fn', () => {
    layout.createBody(root);
    expect(
      root.querySelector('app__body')
    ).toBeDefined()
  })
});