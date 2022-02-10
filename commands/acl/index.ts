import { Layer } from "@koa/router";
import router from "../../src/routes";
import PermissionResource from "../../src/models/permission-resource";

function startCase(str: string): string {
  return str.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
}

function normalizedResources(routeLayers: Array<Layer>) {
  const resources: { [key: string]: any } = {};

  let i = 1;

  routeLayers.forEach((route: Layer) => {
    const slug = route.name;
    if (!slug) return;

    const s = slug.split('.');
    const resourceName = s[0];
    if(!resources[resourceName]) {
      resources[resourceName] = {
        name: startCase(resourceName),
        permissions: []
      };
    }

    resources[resourceName].permissions.push({
      id: s.join('.'),
      name: s.slice(1).map(startCase).join(' '),
    });
  });

  return resources;
}

async function syncResources(resources: { [key: string]: any }) {
  const names = Object.values(resources).map((resource: any) => resource.name);

  // Delete resources that are not in the routes //
  const obsolete = await new PermissionResource
    .where('name', 'not in', names)
    .fetchAll({ withRelated: ['permissions'] });

    // .destroy()
    // .catch(error => null);

  const existing = await new PermissionResource()
    .where('name', 'in', names)
    .fetchAll();

  let serializedExisting: any = {};

  existing.forEach((resource: any) => {
    serializedExisting[resource.attributes.name] = resource.toJSON();
  });

  const newResources = Object.values(resources)
    .filter((resource: any) => !serializedExisting[resource.name])
    .map((resource: any) => ({ name: resource.name }));

  const knex = Database.getInstance().getKnex();

  // Insert new resources //
  if(newResources.length) {
    console.log('Creating new resources');
    await knex(new PermissionResource().tableName).insert(newResources);
  }

  console.log('New Resources:', newResources.length, '\nExisting Resources:', existing.length);
}

async function syncPermissions(resources: { [key: string]: any }) {
  
}

const commands: { [key: string]: Function } = {

  // Permission synchronizer //
  async sync(args?: Array<string>) {
    console.log('Generating permissions from route names...');

    const resources = normalizedResources(router.stack);

    await syncResources(resources);
    await syncPermissions(resources);
  }

};

export default async (subCommand?: string, args?: Array<string>) => {
  console.log('\nACL Module');
  await commands[subCommand](args);
  console.log('Synchonization complete');
}
