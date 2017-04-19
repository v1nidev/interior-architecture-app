import { Service } from './service';
import { ProjectStatus } from './project-status.enum';
import { Client } from '../../client/shared/client';

export class Project {
    id?: number;
    title: string;
    briefing?: string;
    client?: Client;
    wasPaid?: boolean;
    status?: ProjectStatus;
    received?: number;
    professionalPartnersIds?: number[];
    services?: Service[];
}