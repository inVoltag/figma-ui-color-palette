export default class LocalVariable {
  collection: VariableCollection | undefined
  variable: Variable | undefined

  constructor(collection?: VariableCollection, variable?: Variable) {
    this.collection = collection
    this.variable = variable
  }

  makeCollection = (name: string) => {
    this.collection = figma.variables.createVariableCollection(name)

    return this.collection
  }

  makeVariable = (name: string, description: string) => {
    this.variable = figma.variables.createVariable(
      name,
      this.collection != undefined ? this.collection.id : '',
      'COLOR'
    )
    this.variable.description = description

    return this.variable
  }
}
