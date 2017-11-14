'use strict'

const request = require('super-request')
const { Wears } = require('../../models/mongoose')
const app = require('../../app')
const wearsData = require('./item_mock.json')

const url = '/'

describe(`GET ${url}`, () => {
  it('should return 1st page items if no param is parsed', async () => {
    Wears.getAllItemsByPage = jest.fn(async () => wearsData)
    const response = await request(app.listen())
      .get(url)
      .expect('Content-Type', /html/)
      .expect(200)
      .end()

    const expectedNumOfPages = wearsData.itemsCount > 9 ? Math.ceil(wearsData.itemsCount / 9) : 0
    const expectedResponse = `\n${wearsData.items.map((w) => `${w.name} - ${w.price} - ${w.image}`).join('\n\n')}\nItems count: ${wearsData.itemsCount}\nPage: 0\nNumber of pages: ${expectedNumOfPages}`

    expect(response.body).toEqual(expectedResponse)
    expect(Wears.getAllItemsByPage).toBeCalledWith(0)
  })
})
