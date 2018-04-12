const ANY_METHOD_ACCEPTED = '*';

let availableRoles = {};

export const available = rolesList => (availableRoles = rolesList);
export const verify = (role, resource, method) => {
  if (!availableRoles[role]) throw new Error(`Unknown role: ${role}`);
  if (!availableRoles[role][resource]) throw new Error(`Unknown resource: ${resource} in role "${role}"`);
  if (!availableRoles[role][resource].includes(method) && !availableRoles[role][resource].includes(ANY_METHOD_ACCEPTED))
    throw new Error(`Unavailble method: ${method} for resource "${resource}" in role "${role}"`);
};
