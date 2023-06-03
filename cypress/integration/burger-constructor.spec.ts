describe('Stellar burger constructor page test', () => {
  const burgerConstructorSelector = '[class^=BurgerConstructor_burgerConstructor]';
  const modalCloseButtonSelector = '[class^=Modal_closeButton]';

  beforeEach(() => {
    cy.viewport(1920, 1024);
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('should have ingredients and constructor sections', () => {
    cy.visit('/');
    cy.get('[class^=BurgerIngredients_burgerIngredients]').contains('Соберите бургер');
    cy.get(burgerConstructorSelector).contains('Оформить заказ');
  });

  it('ingredient details modal manage', () => {
    const openIngredientModal = () => cy.get('li').contains('Краторная булка N-200i').click();

    openIngredientModal();
    cy.contains('Детали ингредиента');
    cy.get(modalCloseButtonSelector).click();
    openIngredientModal();
    cy.get(modalCloseButtonSelector).click(-50, -50, { force: true });
  });

  it('should make a burger from the ingredients', () => {
    cy.visit('/');
    const getIngredientsList = () => cy.get('[class^=BurgerIngredient_burgerIngredientsListItem]');

    getIngredientsList().eq(0).drag(burgerConstructorSelector);
    getIngredientsList().eq(2).drag(burgerConstructorSelector);
    getIngredientsList().eq(3).drag(burgerConstructorSelector);
    getIngredientsList().eq(4).drag(burgerConstructorSelector);
    getIngredientsList().eq(5).drag(burgerConstructorSelector);
    getIngredientsList().eq(6).drag(burgerConstructorSelector);
  });

  it('should swap topping ingredients', function () {
    const getToppingList = () => cy.get('[class^=BurgerConstructorToppingElement_burgerIngredient]');

    getToppingList().eq(2).drag(burgerConstructorSelector);
  });

  it('should remove constructor topping ingredient ', () => {
    cy.get('[class^=constructor-element__action]').eq(0).click();
  });

  it('should redirect to login page', () => {
    cy.get('button').contains('Оформить заказ').click();
  });

  it('should authorize', () => {
    const email = '123123@gmail.com';
    const password = '123123';

    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').last().type(password);
    cy.get('button').contains('Войти').click();
  });

  it('should display modal with loader', () => {
    cy.wait(2000).get('button').contains('Оформить заказ').click();
  });

  it('should display order details modal', () => {
    cy.wait(17000).get('[class^=OrderDetails_orderDetails__title]')
      .invoke('text')
      .then((text) => {
        expect(text.length).to.be.at.least(4)
      });
  });

  it('should close order details modal', () => {
    cy.wait(500).get(modalCloseButtonSelector).click();
    cy.get('[class^=OrderDetails_orderDetails]').and('not.exist');
  });
});
