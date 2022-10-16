// TODO : use localstorage to handle form's inputs

import typeOf from './typeOf';

type Option = {
  immutable: boolean;
  type: StringConstructor | BooleanConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor;
};

/**
 * wrapper for window.localStorage
 * @constructor
 * @param {string} key - unique key to store your datas.
 * @param {Object} Option -
 * @param {string} option.immutable - helper for migration and if you want your key to change over app's version. Default false, your key will be prefixed with __STORAGE_VERSION__ from ./vite.config.ts file.
 */
class LocalStorage {
  private _key: string;
  private _dataType: unknown;

  constructor(key: string, { immutable = true, type = String }: Option) {
    if (immutable) this._key = `${key}`;
    else this._key = `${__STORAGE_VERSION__}${key}`;
    this._dataType = new type();
  }

  get key(): string {
    return this._key;
  }

  get dataTypeToString(): string {
    return typeOf(this._dataType);
  }

  get data(): any {
    const data = localStorage.getItem(this._key);
    if (!data) return this._dataType;

    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  set data(data: any) {
    const newDataType = typeOf(data);
    if (newDataType !== this.dataTypeToString) throw new Error(`LocalStorage : data must be typeof ${this.dataType}`);

    if (newDataType === 'array') {
      localStorage.setItem(this._key, JSON.stringify([...this.data, ...data]));
    } else if (newDataType === 'object') {
      localStorage.setItem(this._key, JSON.stringify({ ...this.data, ...data }));
    } else {
      localStorage.setItem(this._key, data);
    }
  }

  flush(): void {
    localStorage.removeItem(this._key);
  }
}

export default LocalStorage;
