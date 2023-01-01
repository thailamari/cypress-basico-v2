// <reference types="Cypress" />

beforeEach(function(){
    cy.visit('./src/index.html')
   });
describe('Central de Atendimento ao Cliente TAT',function () {
    it('verifica o título da aplicação', function() {  
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
      
    });
        
    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Ola Humano, Ola Humano, Ola Humano, Ola Humano, Ola Humano, Ola Humano, Ola Humano, Ola Humano, Ola Humano, Ola Humano, Ola Humano, '
        cy.get('#firstName').type('Thaila')
        cy.get('#lastName').type('Agard')
        cy.get('#email').type('thailamari@thaila.com')
        cy.get('#open-text-area').type(longText, {delay: 1})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
            
    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Thaila')
        cy.get('#lastName').type('Agard')
        cy.get('#email').type('thailamathaila.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });

    it('Validação campo do telefone não numérico', () => {
        cy.get('#phone')
        .type('abc')
        .should('have.value', '')
        
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Thaila')
        cy.get('#lastName').type('Agard')
        cy.get('#email').type('thailamari@thaila.com')
        cy.get('#open-text-area').type('teste')
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        //cy.get('.error.error > strong').should('be.equal', 'Valide os campos obrigatórios!')    
    });

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Thaila')
            .should('have.value', 'Thaila')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Agard')
            .should('have.value', 'Agard')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('thailamari@thaila.com')
            .should('have.value', 'thailamari@thaila.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone-checkbox')
            .click()

        cy.get('#phone')
            .type('32525415')
            .should('have.value', '32525415')
            .clear()
            .should('have.value', '')

            cy.contains('button', 'Enviar')
            .click()
        
    });

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });

    it('Envia o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit(),
        cy.get('.success').should('be.visible')
    });

    it('Seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('Seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    });

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })       
    });

    it('Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
        .should('have.length', 2)
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')  
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#phone-checkbox')
        .check()
        cy.contains('button', 'Enviar')
        .click()
        cy.get('.error').should('be.visible')
    });

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })        

    });

    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
            })      
    });

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile') //alias
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })    
    });

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    });
    
    
});