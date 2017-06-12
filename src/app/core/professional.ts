import { Client } from '../client/shared/client';
import { User } from './user';
import { Profession } from '../shared/profession.enum';

export class Professional extends User {
    description?: string;

    logoUrl?: string;
    // cpfCnpj?: string;
    celular?: string;
    profession?: Profession;
    clients?: Client[];
    CAU?: string;
    gender?: string;
    maritalStatus?: string;
    iuguId?: string;
    paying?: boolean;
    CEP?: string;

    addressArea?: string;
    addressNumber?: number;
    nacionality?: string;

    constructor(name?: string, email?: string, id?: string) {
        super(name, email, id);

        this.clients = [];
    }
}