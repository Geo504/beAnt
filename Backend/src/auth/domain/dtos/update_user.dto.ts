

export class UpdateUserDto {
  private constructor(
    public name?: string,
    public lastName?: string,
    public profession?: string,
    public phone?: string,
    public birth?: Date,
  ) {}
  
  static create(object: {[key: string]: any}): [string?, UpdateUserDto?] {
    const { name, lastName, profession, phone, birth, ...extraKeys } = object;

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];

    if (name) {
      if (typeof name !== 'string') return ['name must be a string'];
      if (name.length < 2 || name.length > 25) return ['name too short or too long'];
    }

    if (lastName) {
      if (typeof lastName !== 'string') return ['lastName must be a string'];
      if (lastName.length === 0 || lastName.length > 25) return ['lastName too large or too short'];
    }

    if (profession) {
      if (typeof profession !== 'string') return ['profession must be a string'];
      if (profession.length === 0 || profession.length > 25) return ['profession too large or too short'];
    }

    if (phone) {
      if (typeof phone !== 'string') return ['phone must be a string'];
      if (phone.length < 5 || phone.length > 25) return ['phone too large or too short'];
    }

    if (birth) {
      const parsedDate = new Date(birth);
      if (isNaN(parsedDate.getTime())) return ['invalid date'];
    }
    

    return [
      undefined,
      new UpdateUserDto(name, lastName, profession, phone, birth)
    ]
  }
}


