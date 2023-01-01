beforeEach(function(){
    cy.visit('./src/index.html')
   });

it.only('Testa a página da política de privacidade de forma independente', () => {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
    cy.get('#white-background').contains('HTML, CSS e JavaScript')
   
});