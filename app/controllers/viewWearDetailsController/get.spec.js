'use strict'

const request = require('super-request')
const models = require('../../models/mongoose')
const app = require('../../app')

const url = '/item/:id'

describe(`GET ${url}`, () => {
  const wearDetails = {
    _id: '1',
    name: 'AO TEST',
    color: 'test_color',
    size: 'X',
    price: '6969000',
    quantity: '11',
    detail: 'Thuong hieu test',
    image: 'a.jpg'
  }

  beforeEach(() => {
    models.Wears.getItemDetails = jest.fn(async () => wearDetails)
  })

  it('should return every single detail of the wear', async () => {
    const response = await request(app.listen())
      .get(url.replace(':id', '1'))
      .expect('Content-Type', /html/)
      .expect(200)
      .end()

    const expectedResponse =
    `ID: ${wearDetails._id}
Name: ${wearDetails.name}
Color: ${wearDetails.color}
Size: ${wearDetails.size}
Price: ${wearDetails.price}
Quantity: ${wearDetails.quantity}
Detail: ${wearDetails.detail}
Image: ${wearDetails.image}`

    expect(response.body).toEqual(expectedResponse)
    expect(models.Wears.getItemDetails).toBeCalledWith('1')
  })
})
