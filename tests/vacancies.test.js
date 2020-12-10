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
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.length)
      })
      .end((err, res) => {
        return done(err);
                done();
      });
  })
  it('should get without filters and present broken JWT: HTTP status 403 - Forbidden', (done) => {
    request(consts.apiHost)
      .get(`/vacancies`)
      .set('Authorization', `Bearer ${consts.apiHost}`)
      .expect(403)
      .expect((res) => {
        expect(res.body.length)
      })
      .end((err, res) => {
        return done(err);
                done();
      });
  })
  it('should get without filters: HTTP status 200 - OK', (done) => {
    request(consts.apiHost)
      .get(`/vacancies`)
      .set('Authorization', `Bearer ${consts.token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length)
      })
      .end((err, res) => {
        return done(err);
                done();
      });
  })
  it('should get without filters and Content type as XML: HTTP status 200 - OK', (done) => {
    request(consts.apiHost)
      .get(`/vacancies`)
      .set('Authorization', `Bearer ${consts.token}`)
      .set('Accept', 'application/xml')
      .expect('Content-Type', /xml/)
      .expect(200)
      .end((err, res) => {
        return done(err);
                done();
      });
  })
  it('should get text filter #1: unicode char á in query: HTTP status 200 - OK', (done) => {
    request(consts.apiHost)
      .get(encodeURI(`/vacancies?text=Lá`))
      .set('Authorization', `Bearer ${consts.token}`)
      .expect(200)
      .expect((res) => {
      })
      .end((err, res) => {
        return done(err);
                done();
      });
  })
  it('should get text filter #2: non pair sysmbol \' in query: HTTP status 200 - OK', (done) => {
    request(consts.apiHost)
      .get(encodeURI(`/vacancies?text='Программист''`))
      .set('Authorization', `Bearer ${consts.token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.items.length > 0) // Такие вакансии есть всегда +-
      })
      .end((err, res) => {
        return done(err);
                done();
      });
  })
  it('should get text filter #3: bad symbol \` in query: HTTP status 400 - BAD request', (done) => {
    request(consts.apiHost)
      .get(encodeURI(`/vacancies?text='Программист'&text='ин\`женер'`))
      .set('Authorization', `Bearer ${consts.token}`)
      .expect(400)
      .expect((res) => {
        expect(res.body.bad_argument, /text/)
        expect(res.body.errors.find(t => t.type === 'bad_argument'))
      })
      .end((err, res) => {
        return done(err);
                done();
      });
  })
})
