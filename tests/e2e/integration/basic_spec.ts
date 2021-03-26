// https://docs.cypress.io/api/introduction/api.html
/// <reference types="cypress" />

describe('Homepage', () => {
  it('Shows correct text', () => {
    cy.visit('/')

    cy.contains('h1', 'Hello Vue 3 + Vite + Tailwind CSS')
  })
})
