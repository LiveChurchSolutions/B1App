import { Permissions as BasePermissions } from "../appBase/interfaces";

export interface LinkInterface { id?: string, churchId: string, category: string, url?: string, text: string, sort: number, linkType: string, linkData: string, icon: string }
export interface PageInterface { id?: string, churchId?: string, name?: string, lastModified?: Date, content?: string }

export class Permissions extends BasePermissions {
    static b1Api = {
      settings: {
        edit: { api: "B1Api", contentType: "Settings", action: "Edit" }
      }
    };
}
