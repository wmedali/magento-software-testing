const faker = require('@faker-js/faker')

export function newUser() {
    const firstName = faker.faker.person.firstName()
    const lastName = faker.faker.person.lastName()
    const company = faker.faker.company.name()
    const address = faker.faker.location.streetAddress()
    const phoneNumber = faker.faker.phone.number('0766666666')
    return {
        email: `${firstName}.${lastName}@yopmail.com`,
        firstName: firstName,
        lastName: lastName,
        password: 'Azerty123*',
        company: company,
        country: 'Morocco',
        address: address,
        city: 'Rabat',
        postalCode: '10000',
        phoneNumber: phoneNumber
    }
}    