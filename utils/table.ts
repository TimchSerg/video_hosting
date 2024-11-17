/**
 * Simple table data structure
 * TODO: optimize table realization
 */
export class Table<C, R, V> {

  /**
   * Make a copy of table
   */
  static copy<C, R, V>(original: Table<C, R, V>): Table<C, R, V> {
    const copy = new Table<C, R, V>(original._defaultValue)
    copy._data = new Map<C, Map<R, V>>()
    original._data.forEach((rowMap, col) => {
      copy._data.set(col, new Map(rowMap))
    })
    copy._cols = new Set<C>(original._cols)
    copy._rows = new Set<R>(original._rows)
    return copy
  }

  private _cols: Set<C>
  private _rows: Set<R>
  private _data: Map<C, Map<R, V>>
  private _defaultValue: V

   /**
   * Create new empty table with specific default value
   * Default value will be used as value in new cells
   */
  constructor(defaultValue: V, data?: Array<[C, R, V]>) {
    this._cols = new Set<C>()
    this._rows = new Set<R>()
    this._data = new Map<C, Map<R, V>>()
    this._defaultValue = defaultValue

    if (data !== undefined) {
      data.forEach((record) => {
        this.set(record[0], record[1], record[2])
      })
    }
  }

  /**
   * Set value to table.
   * If column or row was not exists they will be created.
   */
  set(col: C, row: R, value: V): Table<C, R, V> {
    this._cols.add(col)
    this._rows.add(row)
    this._setValue(col, row, value)
    return this
  }

  /**
   * Fill table's column with specific value.
   * If column was not exists it will be created.
   */
  setCol(col: C, value: V | undefined = undefined): Table<C, R, V> {
    this._cols.add(col)
    if (value !== undefined) {
      this._rows.forEach((row) => { 
        this._setValue(col, row, value)
      })
    }
    return this
  }

  /**
   * Fill table's row with specific value.
   * If row was not exists it will be created.
   */
  setRow(row: R, value: V | undefined = undefined): Table<C, R, V> {
    this._rows.add(row)
    if (value !== undefined) {
      this._cols.forEach((col) => {
        this._setValue(col, row, value)
      })
    }
    return this
  }

  /**
   * Get value from specific column and row.
   * If column or row was no exists yet return undefined
   */
  get(col: C, row: R): V | undefined {
    if (!this.hasCol(col) || !this.hasRow(row)) return undefined
    return this._getValue(col, row)
  }

  /**
   * Get all values of specific row
   * If row was not exists yet return undefined
   */
  getRow(row: R): Map<C, V> | undefined {
    if (!this.hasRow(row)) return undefined
    const map = new Map<C, V>()
    this._cols.forEach((col) => {
      map.set(col, this._getValue(col, row))
    })
    return map
  }

  /**
   * Get all values of specific column
   */
  getCol(col: C): Map<R, V> | undefined {
    if (!this.hasCol(col)) return undefined
    const map = new Map<R, V>()
    this._rows.forEach((row) => {
      map.set(row, this._getValue(col, row))
    })
    return map
  }

  /**
   * Delete value from table.
   * Return true only if value has been deleted
   */
  delete(col: C, row: R): boolean {
    const rowMap = this._data.get(col)
    if (rowMap === undefined) return false
    return rowMap.delete(row)
  }

  /**
   * Delete entire column and its values
   * Return true only if column has been deleted
   */
  deleteCol(col: C): boolean {
    if (!this.hasCol(col)) return false
    this._cols.delete(col)
    this._data.delete(col)
    return true
  }

  /**
   * Delete entire row and its values
   * Return true only if row has been deleted
   */
  deleteRow(row: R): boolean {
    if (!this.hasRow(row)) return false
    this._rows.delete(row)
    this._cols.forEach((col) => {
      const rowMap = this._data.get(col)
      if (rowMap !== undefined) {
        rowMap.delete(row)
      }
    })
    return true
  }

  /**
   * Return true if column exists
   */
  hasCol(col: C): boolean {
    return this._cols.has(col)
  }

  /**
   * Return true if row exists
   */
  hasRow(row: R): boolean {
    return this._rows.has(row)
  }

  /**
   * Return total size of the table
   */
  size(): number {
    return this.colSize() * this.rowSize()
  }

  /**
   * Return table's columns size
   */
  colSize(): number {
    return this._cols.size
  }

  /**
   * Return table's rows size
   */
  rowSize(): number {
    return this._rows.size
  }

  /**
   * Return set of columns
   */
  cols(): Set<C> {
    return new Set<C>(this._cols)
  }

  /**
   * Return set of rows
   */
  rows(): Set<R> {
    return new Set<R>(this._rows)
  }

  /**
   * Return copy of current table
   */
  clone(): Table<C, R, V> {
    const copy = new Table<C, R, V>(this._defaultValue)
    copy._data = new Map<C, Map<R, V>>()
    this._data.forEach((rowMap, col) => {
      copy._data.set(col, new Map(rowMap))
    })
    copy._cols = new Set<C>(this._cols)
    copy._rows = new Set<R>(this._rows)
    return copy
  }

  /**
   * Return string representation of table
   */
  toString(): string {
    return this._data.toString()
  }

  /**
   * Convert table in array format
   */
  toArray(): Array<[C, R, V]> {
    const array = new Array<[C, R, V]>()
    this._cols.forEach((col) => {
      this._rows.forEach((row) => {
        array.push([col, row, this._getValue(col, row)])
      })
    })
    return array
  }

  /**
   * Convert table in object format
   * Table's keys converted to strings
   */
  toObject(): {[key: string]: {[key: string]: V | null}} {
    const object = {}
    this._cols.forEach((col) => {
      const colStr = String(col)
      this._rows.forEach((row) => {
        if (object[colStr] === undefined) { object[colStr] = {} }
        object[colStr][String(row)] = this._getValue(col, row) 
      })
    })
    return object
  }

  private _setValue(col: C, row: R, value: V) {
    let rowMap = this._data.get(col)
    if (rowMap === undefined) {
      rowMap = new Map<R, V>()
      this._data.set(col, rowMap)
    }

    rowMap.set(row, value)
  }

  private _getValue(col: C, row: R): V {
    const rowMap = this._data.get(col)
    if (rowMap === undefined) return this._defaultValue

    const value = rowMap.get(row)
    if (value === undefined) return this._defaultValue
    
    return value
  }
}
