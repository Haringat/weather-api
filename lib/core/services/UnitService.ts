import * as util from "util";
import * as uuid from "uuid";
import Unit from "../dataAccess/Unit";
import RawUnit from "../storage/model/Unit";
import StorageService from "../storage/StorageService";

const uuid4 = uuid.v4;
const isNullOrUndefined = util.isNullOrUndefined;

export default class UnitService {

    constructor(private _storageService: StorageService) {
    }

    public async unitExists(unitName: string) {
        const units = await this._storageService.getAllUnits();
        return units.some((unit) => unit.name === unitName);
    }

    public async create({
        id,
        name
    }: {
        id?: string,
        name: string
    }) {
        if (isNullOrUndefined(id)) {
            id = uuid();
        }
        if (isNullOrUndefined(name)) {
            const e = new Error("tried to create station from incomplete station data.");
            e.name = "IncompleteModelError";
            throw e;
        }
        return Object.create(Unit.prototype, {
            _id: {
                value: id,
                enumerable: true,
                writable: true,
                configurable: true
            },
            _name: {
                value: name,
                enumerable: true,
                writable: true,
                configurable: true
            }
        }) as Unit;
    }

    public async addUnit(unit: Unit) {
        const rawUnit = new RawUnit();
        rawUnit.id = unit.id;
        rawUnit.name = unit.name;
        this._storageService.addUnit(rawUnit);
    }

    public getOne(idOrName: string) {
        if (/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(idOrName)) {
            return this.getById(idOrName);
        } else {
            return this.getByName(idOrName);
        }
    }

    public async getById(id: string) {
        const units = await this._storageService.getAllUnits();
        const foundUnit = units.find((unit) => unit.id === id);
        if (foundUnit !== null) {
            return foundUnit;
        } else {
            throw {
                status: 204
            };
        }
    }

    public async getByName(name: string) {
        const units = await this._storageService.getAllUnits();
        const foundUnit = units.find((unit) => unit.name === name);
        if (foundUnit !== null) {
            return foundUnit;
        } else {
            throw {
                status: 204
            };
        }
    }

}
