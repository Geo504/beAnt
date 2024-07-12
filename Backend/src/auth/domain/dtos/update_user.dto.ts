

export class UpdateUserDto {
  private constructor(
    public name: string,
  ) {}
  
  static create(object: {[key: string]: any}): [string?, UpdateUserDto?] {
    const { name, ...extraKeys } = object;

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];
    
    if (!name) return ['name is required'];
    if (typeof name !== 'string') return ['name must be a string'];
    if (name.length < 2) return ['name too short'];

    return [
      undefined,
      new UpdateUserDto(name)
    ]
  }
}


