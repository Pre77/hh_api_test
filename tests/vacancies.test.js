const consts = require('./constants.js');
const expect = require('expect')
const express = require('express');
const request = require('supertest')



describe('GET /vacancies', () => {
  console.log(`${consts.apiHost}/vacancies`);
  it('should get without filters and not present Bearer JWT: HTTP status 200 - OK', (done) => {
    request(consts.apiHost)
      .get(`/vacancies`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length) //.toBe(2)
      })
      .end(done)
  })
  it('should get without filters and present broken JWT: HTTP status 403 - Forbidden', (done) => {
    request(consts.apiHost)
      .get(`/vacancies`)
      .set('Authorization', `Bearer ${consts.apiHost}`)
      .expect(403)
      .expect((res) => {
        expect(res.body.length) //.toBe(2)
      })
      .end(done)
  })
  it('should get without filters: HTTP status 200 - OK', (done) => {
    request(consts.apiHost)
      .get(`/vacancies`)
      .set('Authorization', `Bearer ${consts.token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length) //.toBe(2)
      })
      .end(done)
  })
  it('should get text filter #1: unicode char á in query: HTTP status 200 - OK', (done) => {
    request(consts.apiHost)
      .get(encodeURI(`/vacancies?text=Lá`))
      .set('Authorization', `Bearer ${consts.token}`)
      .expect(200)
      .expect((res) => {
        //console.log(res.body) //.toBe(2)
      })
      .end(done)
  })
  it('should get text filter #2: non pair sysmbol \' in query: HTTP status 200 - OK', (done) => {
    request(consts.apiHost)
      .get(encodeURI(`/vacancies?text='Программист''`))
      .set('Authorization', `Bearer ${consts.token}`)
      .expect(200)
      .expect((res) => {
      //  console.log(res.body) //.toBe(2)
      })
      .end(done)
  })
  it('should get text filter #3: bad symbol \` in query: HTTP status 400 - BAD request', (done) => {
    request(consts.apiHost)
      .get(encodeURI(`/vacancies?text='Программист'&text='ин\`женер'`))
      .set('Authorization', `Bearer ${consts.token}`)
      .expect(400)
      .expect((res) => {
        //console.log(res.body) //.toBe(2)
      })
      .end(done)
  })
})
