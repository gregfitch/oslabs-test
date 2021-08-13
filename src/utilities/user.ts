import faker from 'faker'

class Student {
  first: string
  last: string
  id: string
  username: string
  email: string
  password: string

  constructor(domain = 'restmail.net', log = false) {
    this.first = faker.name.firstName()
    this.last = faker.name.lastName()
    this.id = this.genRandomHex(5)
    this.username = `${this.first}.${this.last}.${this.id}`.toLowerCase()
    this.email = `${this.username}@${domain}`
    this.password = this.genRandomHex(12)
    if (log) {
      console.log(`User: ${this.first} ${this.last} ${this.email} ${this.password}`)
    }
  }

  private genRandomHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}

export { Student }
